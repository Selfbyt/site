import {timingSafeEqual} from "node:crypto";
import {Buffer} from "node:buffer";

const reply = (status, message, success = false, headers = {}) => Response.json(
  {success, message}, {status, headers: {"Cache-Control": "no-store", ...headers}},
);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY = 16384;

async function readJson(request) {
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json"))
    throw {status: 415, message: "JSON is required"};
  const reader = request.body?.getReader();
  if (!reader) throw {status: 400, message: "Invalid JSON"};
  const chunks = []; let size = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); throw {status: 413, message: "Message is too large"}; }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try {
    const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) throw Error();
    return data;
  } catch { throw {status: 400, message: "Invalid JSON"}; }
}

function validSecret(actual, expected) {
  const a = Buffer.from(actual || ""); const b = Buffer.from(expected || "");
  return b.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

export function createHandler({sendContact, fetchUpstream = fetch}) {
  return async function handle(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    if (!["/api/contact", "/api/newsletter", "/api/revalidate"].includes(url.pathname)) return reply(404, "Not found");
    if (request.method !== "POST") return reply(405, "Method not allowed", false, {Allow: "POST"});
    try {
      if (url.pathname === "/api/revalidate") {
        if (!env.SANITY_WEBHOOK_SECRET) return reply(503, "Webhook is not configured");
        if (!validSecret(request.headers.get("x-webhook-secret"), env.SANITY_WEBHOOK_SECRET)) return reply(401, "Unauthorized");
        const data = await readJson(request);
        // Ignore drafts; accept deletion events when the webhook projects before().
        if (typeof data._id === "string" && data._id.startsWith("drafts.")) return reply(200, "Draft ignored", true);
        if (!["post", "researchPaper", "author", "category"].includes(data._type)) return reply(200, "No rebuild needed", true);
        if (!/^https:\/\/api\.cloudflare\.com\/client\/v4\/workers\/builds\/deploy_hooks\/[a-zA-Z0-9_-]+$/.test(env.CLOUDFLARE_DEPLOY_HOOK || "")) return reply(503, "Rebuild hook is not configured");
        const result = await fetchUpstream(env.CLOUDFLARE_DEPLOY_HOOK, {method: "POST", redirect: "error", signal: AbortSignal.timeout(15000)});
        const body = await result.json();
        if (!result.ok || body.success !== true) return reply(502, "Unable to schedule rebuild");
        return reply(202, "Rebuild scheduled. Changes appear after the build completes.", true);
      }

      // Same-origin browser forms only; non-browser clients still face validation and rate limits.
      const origin = request.headers.get("origin");
      const allowed = new Set([url.origin, env.SITE_URL]);
      if (origin && !allowed.has(origin)) return reply(403, "Origin is not allowed");
      if (!env.FORM_RATE_LIMITER) return reply(503, "Form protection is not configured");
      const key = `forms:${request.headers.get("CF-Connecting-IP") || "local"}`;
      if (!(await env.FORM_RATE_LIMITER.limit({key})).success) return reply(429, "Please wait a minute before trying again", false, {"Retry-After": "60"});
      const data = await readJson(request);
      if (typeof data.email !== "string" || data.email.length > 254 || !emailPattern.test(data.email)) return reply(400, "Please enter a valid email address");
      data.email = data.email.trim();
      if (url.pathname === "/api/contact") {
        for (const [field, max] of [["name", 200], ["subject", 200], ["message", 10000]]) {
          if (typeof data[field] !== "string" || !data[field].trim() || data[field].length > max) return reply(400, "Please complete all fields within the allowed length");
        }
        if (/[\r\n\0]/.test(data.name + data.subject)) return reply(400, "Invalid name or subject");
        if (!env.GMAIL_USER || !env.GMAIL_APP_PASSWORD) return reply(503, "Contact email is not configured");
        await sendContact(env, data);
        return reply(200, "Message sent successfully! We'll get back to you soon.", true);
      }
      if (!env.MAILCHIMP_API_KEY || !/^us\d+$/.test(env.MAILCHIMP_SERVER_PREFIX || "") || !env.MAILCHIMP_LIST_ID) return reply(503, "Newsletter is not configured");
      const result = await fetchUpstream(`https://${env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${encodeURIComponent(env.MAILCHIMP_LIST_ID)}/members`, {
        method: "POST", redirect: "error", signal: AbortSignal.timeout(15000),
        headers: {Authorization: `Basic ${Buffer.from("selfbyt:" + env.MAILCHIMP_API_KEY).toString("base64")}`, "Content-Type": "application/json"},
        body: JSON.stringify({email_address: data.email, status: "subscribed"}),
      });
      if (result.ok) return reply(200, "Successfully subscribed to the newsletter!", true);
      const body = await result.json();
      if (result.status === 400 && body.title === "Member Exists") return reply(200, "This email is already subscribed to our newsletter");
      return reply(502, "Unable to subscribe. Please try again later.");
    } catch (error) {
      if ([400, 413, 415].includes(error?.status)) return reply(error.status, error.message);
      // Never expose provider responses, credentials, or submitted personal information.
      return reply(502, "Unable to process your request. Please try again later.");
    }
  };
}
