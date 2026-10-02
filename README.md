# Selfbyt

React + Vite website, with Sanity Studio and prerendered public pages.

## Run locally

Use Node 22.12+ and `npm ci --legacy-peer-deps` (the existing Sanity/UI dependency tree has peer-version conflicts).

- `npm run dev`: Vite on port 3001, local form API on port 3002.
- `npm run build`: fetch published Sanity content and produce static HTML in `dist/`.
- `npm run preview`: serve the production build and local form API on port 3001.
- `npm run check`: TypeScript checks.
- `npm test`: API validation and prerender checks; build first.
- `npm run assets`: regenerate social image and Apple icon.

Set `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and optionally `VITE_SANITY_API_VERSION` in `.env.local`. Existing `NEXT_PUBLIC_SANITY_*` names remain supported during transition. These three values are public. Never prefix server secrets with `VITE_`.

Contact uses server-only `GMAIL_USER` and `GMAIL_APP_PASSWORD`. Newsletter uses `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, and `MAILCHIMP_LIST_ID`. These are read by the local Node API, never embedded in the frontend.

## Content and routing

Public routes and published article slugs are generated as HTML with canonical URLs, Open Graph/Twitter metadata, sitemap, and robots rules. Publishing content requires rebuilding; ISR has been removed. Restart local development to refresh its CMS snapshot. Builds fail if Sanity cannot be fetched.

Sanity Studio has its own entry at `/studio/`. A future static host must resolve extensionless public URLs to their `index.html`, serve `404.html` with status 404, and rewrite `/studio/*` to `/studio/index.html`. Do not apply a global SPA rewrite, which would hide real 404s and article metadata.

## Cloudflare setup

The Worker implementation and static-host configuration are in `worker/` and `wrangler.jsonc`. See [CLOUDFLARE.md](CLOUDFLARE.md) for local testing, secrets, deployment and Sanity rebuild hooks. Deployed at https://selfbyt-site.fmbishu.workers.dev with Gmail and Mailchimp secrets. DNS is unchanged; automatic Sanity rebuilds still need configuration.

The Node server remains a local development/preview backend. Its legacy revalidation route remains disabled; the Cloudflare Worker provides the production rebuild integration.
