# Cloudflare Worker setup

One Worker serves the Vite static build and three API routes. Deployed to https://selfbyt-site.fmbishu.workers.dev. All nine original Netlify variables are stored as Worker secrets: five Gmail/Mailchimp variables and four Sanity variables. The Sanity values are also needed separately in the build environment; runtime secrets do not automatically become Workers Builds variables. SANITY_API_TOKEN is stored server-side but is not required or used by the current published-content build. Public routes, OG assets, 404 behavior and invalid-input API responses were verified. No custom-domain/DNS changes have been performed. Automatic Sanity rebuilds remain disabled until their two secrets are configured; actual email delivery and signup success have not been exercised.

## Routes

- `POST /api/contact`: Gmail SMTP over TLS, fixed recipient `hello@selfbyt.com`, validated plain-text message and sender reply-to.
- `POST /api/newsletter`: Mailchimp list subscription, preserving the existing signup behavior.
- `POST /api/revalidate`: authenticated Sanity notification that triggers a Cloudflare Workers Builds deploy hook. This schedules a rebuild, not instant cache revalidation.

Only `/api/*` is configured to run the Worker first. Ordinary pages and OG assets use static hosting. Studio routes rewrite to its separate entry; missing public routes use the real 404 page.

## Local verification

1. `npm run build`
2. Copy `.dev.vars.example` to `.dev.vars` and fill only credentials needed for your test. A `.dev.vars` file isolates Worker credentials; without it Wrangler also loads `.env` and `.env.local`.
3. `npm run dev:worker`, then open `http://localhost:8787`.
4. `npm run test:worker` and `npm run check:worker` run mock-provider tests and a non-publishing bundle check.

`npm run dev` still uses the Node development API. Test the whole production frontend and Worker together on port 8787. Live form submissions send real email or subscribe real addresses; automated tests use mocks.

## GitHub deployments

Cloudflare Workers Builds is connected to `Selfbyt/site`, production branch `codex/vite-cloudflare`. Pushes to that branch run `npm run build` then `npx wrangler deploy`. Root directory is `/`, preview builds are disabled, and the three public Sanity variables are configured in the build environment. The existing `site build token` is selected. `main` remains unchanged for the existing Netlify site.

## Deployment configuration

Use `npx wrangler secret put NAME` separately for each required secret:

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `MAILCHIMP_API_KEY`
- `MAILCHIMP_SERVER_PREFIX`
- `MAILCHIMP_LIST_ID`
- `SANITY_WEBHOOK_SECRET`
- `CLOUDFLARE_DEPLOY_HOOK`

Do not place secrets in `wrangler.jsonc` or any `VITE_` variable. Missing configuration returns 503. Deploy-hook URLs are themselves secrets.

Confirm the Worker name in `wrangler.jsonc`. Namespace 41001 should be unused by other account rate limiters. Form submissions share a five-per-minute limit per client IP at each Cloudflare location. This is abuse mitigation, not a global quota; shared networks share the limit and distributed abuse can still require Turnstile or WAF controls.

When ready, `npm run deploy` builds and publishes. Connect Workers Builds to this repository, set build command `npm run build` and deploy command `npx wrangler deploy`, and supply the public Sanity build variables described in README. Create a deploy hook in Worker Settings > Builds and save its URL as `CLOUDFLARE_DEPLOY_HOOK`.

## Sanity webhook

Configure POST to `https://selfbyt.com/api/revalidate`, with JSON and a custom header `x-webhook-secret` matching `SANITY_WEBHOOK_SECRET`. This uses an explicit header, not Sanity's signature-secret field.

Enable create, update and delete for published post, researchPaper, author and category documents. Disable drafts. Project both current and deleted document identities:

```groq
{"_type": coalesce(after()._type, before()._type), "_id": coalesce(after()._id, before()._id)}
```

Use this filter:

```groq
coalesce(after()._type, before()._type) in ["post", "researchPaper", "author", "category"] && !(coalesce(after()._id, before()._id) in path("drafts.**"))
```

The hook acknowledges only after Cloudflare accepts the rebuild. Retries may schedule duplicate builds; no event is discarded using a naive cooldown. Add the eventual Worker/custom domain to Sanity's Studio CORS origins before use.

## Validation limits

Mocked provider tests verify payloads, validation, authentication, rate-limit rejection, failures and static fallback. Wrangler checks verify bundling/runtime compatibility. Actual Gmail delivery, Mailchimp credentials and deploy-hook acceptance need an intentional live smoke test after secrets and hosting are configured.

References: [static asset routing](https://developers.cloudflare.com/workers/static-assets/), [TLS support](https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/), [deploy hooks](https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/), [rate limits](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
