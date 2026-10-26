# Hostinger Deployment

Use the repository root as the Hostinger application root. The root contains its own
`package.json`, lockfile, build command, start command, and `server.js` entry file.

## Required settings

- Node.js version: `22.13.0` or newer
- Framework: `Other` (custom Node.js application)
- Build command: `npm run build`
- Start command: `npm start`
- App root / working directory: repository root
- Entry file: `server.js`
- Domain: `www.djai.academy`

The apex host `djai.academy` redirects to the canonical `www.djai.academy` host after the root app
is deployed.

Do not configure any of these folders as the application root:

- `DJayTools-Free-QR-Generator-Source`
- `djai-academy-homepage`
- `djai-academy-course`
- `djai-web-promo-voice`
- `djai-image-resizer`
- `Siamese-Cat-Dev-Bio-Site`

If only `/tools/qrgen/` works while `/` returns a QR-branded Next.js 404 page, Hostinger is running
`DJayTools-Free-QR-Generator-Source` as the website. Reconnect or recreate the Node.js web app from
the repository root and redeploy the `main` branch. The QR subproject also contains guarded
compatibility build/start scripts that launch the root application when Hostinger remains anchored
to that folder.

## Why the root entry point exists

This repository contains several apps:

- `djai-academy-homepage` serves the main DJAI site and blog admin backend.
- `djai-academy-course` is mounted at `/course/`.
- `djai-web-promo-voice` serves the web-development offer at `/web_promo/` and its protected
  dashboard at `/voice_admin/`.
- `DJayTools-Free-QR-Generator-Source` is mounted at `/tools/qrgen/`.
- `djai-image-resizer` is mounted at `/tools/resizeimg/`.
- `Siamese-Cat-Dev-Bio-Site` is mounted at `/siamese_cat/dev/`.

Hostinger must not deploy one subfolder directly. The root `server.js` is the production entry point
that serves the main Next.js app and mounts the static tools at their public paths.

Both the homepage and promotion app execute inside that public process. The root
build must keep both applications' `node_modules/next` packages and `.next` build
directories. Do not apply the old voice-app dependency cleanup or launch the
promotion app as a child server. Internal port overrides are no longer required.

## Public routes

- `/`
- `/en/`
- `/portfolio/`
- `/portfolio/en/`
- `/development/`
- `/development/en/`
- `/web_promo/`
- `/service/`
- `/service/en/`
- `/tools/`
- `/tools/en/`
- `/tools/qrgen/`
- `/tools/qrgen/en/`
- `/tools/resizeimg/`
- `/tools/resizeimg/en/`
- `/blog/`
- `/blog/en/`
- `/course/`
- `/course/en/`
- `/siamese_cat/dev/`
- `/siamese_cat/dev/en/`
- `/siamese_cat/dev/blog/`
- `/siamese_cat/dev/blog/en/`

Legacy `/th/` and uppercase `/EN/` routes redirect to the canonical paths.

## Environment variables

Set `DJAI_BLOG_ADMIN_PASSWORD` in hPanel before using `/admin/blog/`. Keep it out of Git.

Set `DJAI_BLOG_API_KEY` if Codex, Hermes, OpenClaw, or another harness agent should publish blog
posts through API calls. Use a long random secret and send it as `Authorization: Bearer ...` or
`X-DJAI-Blog-API-Key`.

The voice sales agent also requires these server-only variables:

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SESSION_PASSWORD` (at least 32 random characters)
- `SESSION_SIGNING_SECRET` (at least 32 random characters)
- `WIDGET_ALLOWED_ORIGINS=https://www.djai.academy,https://djai.academy`

`GEMINI_API_KEY` is optional and is only needed when the voice provider is switched from OpenAI
Realtime to Gemini Live. Run the database migration from `djai-web-promo-voice` once before using
the agent in production; the integrated root build deliberately does not mutate a live database.

For blog content that must persist across deployments, set `DJAI_BLOG_DATA_FILE` to an absolute,
writable, persistent server path. Without this override, posts are stored in
`djai-academy-homepage/data/blog-posts.json` inside the deployed application.

## Verification

Run the production route audit after building:

```bash
npm run verify:hostinger
```

On the live domain, open `/healthz`. A correct root deployment returns HTTP 200 and includes:

```json
{"status":"ok","app":"djai-academy-website","version":"1.0.0","buildsReady":true}
```

Confirm `servicesReady` is also `true`, both `homepage` and `voicePromo` service
snapshots have `mode: "in-process"`, and `/web_promo/` plus `/web_promo/vi/` return
200 with their localized content. The public server can bind before preparation;
an initial 503 is retryable, but persistent 503 or 502 responses are a failed deployment.

Run `npm run audit:adsense -- --report audits/adsense-recovery-2026-10-26/live-check.json`
with a fresh report filename for the passive public-site check after publication.
This HTTP audit cannot confirm Google's AdSense account status or submit a review.

### AdSense recovery runtime release checks (2026-10-26)

The root production entry point enforces `NODE_ENV=production` before loading either Next app. Each handler gets at most three preparation attempts with a fresh app; `/healthz` reports attempts, actual retry count and readiness. Preparation is capped at 45 seconds and close at 5 seconds; process shutdown has a 10-second hard limit. A persistent failure or uncancelable preparation timeout exits the public process with status 1 and requires provider/operator recovery. `restartCount` remains zero for compatibility; `retryCount` reports preparation retries. Fatal process failures rely on the hosting process lifecycle; verify Hostinger restart behavior rather than assuming an application-level process supervisor remains.

Keep both apps' runtime dependencies and normal `.next` outputs. Build caches and duplicate standalone outputs are discarded. Check provider disk limits before release; local artifact sizes do not prove the account's quota. After release, check health, both promotion locales, the shared `/analytics-consent.js` asset, and the existing API authentication boundary. The separate promotion package's `hostinger:build` performs database migrations; the root website build intentionally uses `next:build` and does not authorize a database migration.
