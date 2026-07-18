# DJAI Academy Website

This repository is one Hostinger Node.js application composed of the DJAI Academy website and
several tools mounted below it. Deploy from the repository root; do not select an individual
subfolder as the application.

## Production commands

```bash
npm run build
npm start
```

The production entry file is `server.js`. After deployment, `GET /healthz` must return JSON with
`"app":"djai-academy-website"` and `"buildsReady":true`.

See `HOSTINGER_DEPLOYMENT.md` for the exact hPanel settings and troubleshooting checklist.

For agent blog publishing through API calls, see `BLOG_API.md`.
