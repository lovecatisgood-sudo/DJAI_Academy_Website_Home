# DJAI Academy Website

This repository is one Hostinger Node.js application composed of the DJAI Academy website,
the web-development promotion and voice sales agent, and several tools mounted below it. Deploy
from the repository root; do not select an individual subfolder as the application.

The promotion is available at `/web_promo/`. Its authenticated voice-agent dashboard is available
at `/voice_admin/`; the dashboard is intentionally excluded from search indexing.

## Production commands

```bash
npm run build
npm start
```

The production entry file is `server.js`. It supervises the homepage and voice-promo Next.js
processes and restarts either process with capped exponential backoff if it exits. After deployment,
`GET /healthz` must return JSON with `"app":"djai-academy-website"`, `"buildsReady":true`, and
`"servicesReady":true`. A missing build or unavailable child process returns HTTP 503.

Run the supervisor regression tests with:

```bash
npm run test:supervisor
```

See `HOSTINGER_DEPLOYMENT.md` for the exact hPanel settings and troubleshooting checklist.

For agent blog publishing through API calls, see `BLOG_API.md`.
