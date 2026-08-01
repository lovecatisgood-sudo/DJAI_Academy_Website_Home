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

## Voice agent troubleshooting

The root build runs only `next:build` for `djai-web-promo-voice`, so that project's `verify:env`
check never guards a production deploy. A bad environment value therefore builds and starts cleanly
and only fails when someone presses the call button. Work through these three steps in order.

### 1. Read the health endpoint

```bash
curl -s https://www.djai.academy/web_promo/api/health
```

`envMissing` and `envWarnings` list variable **names** only; values are never returned. Any entry in
`envMissing` means that variable is not reaching the app.

### 2. Read the agent status

```bash
curl -s https://www.djai.academy/web_promo/api/session
```

`agentEnabled:false` means the kill switch in `/voice_admin` > Settings is off. Nothing else will
work until it is on.

### 3. Run the full diagnosis from the Hostinger shell

```bash
cd djai-web-promo-voice
npm run diagnose
```

This validates every required variable, connects to Neon, prints the live settings row and today's
session usage against the daily cap, and calls the OpenAI API with the configured key to confirm the
key is valid and can see the configured Realtime model. It prints no secret values.

### Demo mode: running the voice agent with no database

Set `DJAI_VOICE_DEMO_MODE=1` in hPanel and restart. The public agent then runs entirely without a
database, using the same default settings the migration seeds.

This exists to demonstrate the agent before a database is provisioned. **Nothing is saved.**
Conversations, transcripts, and captured leads are written to the application log only, each marked
`[demo-mode] ... was NOT saved`. Voucher-form leads still send their email notification when SMTP is
configured, because that path does not need the database.

While demo mode is on:

- `/voice_admin` does not work. It reads and writes conversation and lead tables.
- The daily session cap is not enforced. The per-IP rate limit of 12 sessions per hour still applies.
- Post-call analysis is off, because it writes conversation rows.
- `/api/health` reports `"demoMode": true` with a warning, and returns 200.
- `DATABASE_URL`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` are not required.

Still required: `OPENAI_API_KEY`, `SESSION_PASSWORD`, `SESSION_SIGNING_SECRET`, and
`WIDGET_ALLOWED_ORIGINS`.

Because Admin Settings needs the database, the model and voice can be overridden from the
environment while demo mode is on:

| Variable | Default |
| --- | --- |
| `DJAI_VOICE_DEMO_MODEL_ID` | `gpt-realtime-2.1` |
| `DJAI_VOICE_DEMO_VOICE` | `marin` |
| `DJAI_VOICE_DEMO_TRANSCRIPTION_MODEL` | `gpt-realtime-whisper` |
| `DJAI_VOICE_DEMO_PROVIDER` | `openai` |

Remove `DJAI_VOICE_DEMO_MODE` once `DATABASE_URL` points at a migrated database. The application log
prints a warning banner on every start while it is set.

### Tuning the agent for a noisy room

Voice-activity detection decides when the visitor has started and stopped speaking. Its settings are
read from the environment so they can be adjusted without a database or a rebuild. Restart after
changing any of them.

| Variable | Default | Effect |
| --- | --- | --- |
| `DJAI_VOICE_VAD_THRESHOLD` | `0.7` | How loud speech must be to count. Raise toward `0.9` in a noisy room; lower toward `0.5` if a softly spoken visitor is missed. |
| `DJAI_VOICE_VAD_SILENCE_MS` | `800` | Silence before the visitor's turn is treated as finished. Raise if the agent cuts in while someone is still thinking. |
| `DJAI_VOICE_VAD_PREFIX_MS` | `300` | Audio kept from just before speech was detected. |
| `DJAI_VOICE_NOISE_REDUCTION` | `far_field` | Use `near_field` for a headset or a handheld phone; `far_field` for a laptop across a desk. |

| `DJAI_VOICE_ALLOW_BARGE_IN` | `true` | Whether the visitor can talk over the agent. |

Out-of-range and non-numeric values fall back to the defaults rather than failing the request.

Barge-in must stay enabled in normal use. With it off, a turn committed while the agent is still
speaking cannot produce a reply: the server refuses to cancel the active response, returns
`conversation_already_has_active_response`, and the visitor's turn is dropped, so the agent appears
to stop responding as soon as anyone speaks.

If background noise cuts the agent off, raise `DJAI_VOICE_VAD_THRESHOLD` rather than disabling
barge-in.

### After changing DATABASE_URL

A new Neon project or branch starts empty. The root build runs only `next:build`, so it never
migrates, and the app cannot create its own schema. Until the migration runs, `/api/health` returns
503 and `/api/session` returns 500 because `getCachedSettings()` cannot find the settings row.

The migration cannot be run on a deployed Hostinger server: the build deletes
`djai-web-promo-voice/node_modules`, and Next.js bundles the Neon driver into `.next/server/chunks`
rather than tracing it into `.next/standalone/node_modules`, so no importable copy is left behind.
The running app is unaffected because it uses the bundled copy.

Neon accepts connections from anywhere, so run the migration from any machine with dependencies
installed:

```bash
cd djai-web-promo-voice
npm ci
DATABASE_URL="<new Neon string>" npm run migrate
DATABASE_URL="<new Neon string>" npm run verify:live-schema
```

Conversations and leads live in the database, so pointing at a new one leaves the previous history
in the old database. Export anything worth keeping before decommissioning it.

### After rotating SESSION_PASSWORD

Admin cookies are signed with `SESSION_PASSWORD` (falling back to `SESSION_SIGNING_SECRET`), so
changing it signs every `/voice_admin` session out. That is expected. Log in again with
`ADMIN_USERNAME` and `ADMIN_PASSWORD`.

Call tokens are signed with `SESSION_SIGNING_SECRET` (falling back to `SESSION_PASSWORD`). While
`SESSION_SIGNING_SECRET` is set, rotating `SESSION_PASSWORD` does not affect public calls. If it is
not set, rotating `SESSION_PASSWORD` breaks calls that are already in progress; new calls are fine.

### After rotating OPENAI_API_KEY

`/api/session` returns HTTP 502 with a JSON `code` when minting fails. Check the app log for the
matching `OpenAI client secret error` entry, which records the upstream status and request id.

| Upstream status | Cause |
| --- | --- |
| 401 | Key revoked, mistyped, or truncated |
| 403 | Restricted key without Realtime write access |
| 404 | The new key's project cannot see the configured `model_id` |
| 429 | Project out of quota or credit |

A key from a different OpenAI project is the common case: `model_id` in `/voice_admin` > Settings
must name a Realtime model that the new project can actually use.

When pasting values into hPanel, paste the value only. Do not include surrounding quotes and do not
paste the whole `NAME=value` line.

## Verification

Run the production route audit after building:

```bash
npm run verify:hostinger
```

On the live domain, open `/healthz`. A correct root deployment returns HTTP 200 and includes:

```json
{"status":"ok","app":"djai-academy-website","version":"1.0.0","buildsReady":true}
```
