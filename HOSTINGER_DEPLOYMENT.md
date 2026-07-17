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
- `djai-image-resizer`
- `Siamese-Cat-Dev-Bio-Site`

If only `/tools/qrgen/` works while `/` returns a QR-branded Next.js 404 page, Hostinger is running
`DJayTools-Free-QR-Generator-Source` as the website. Reconnect or recreate the Node.js web app from
the repository root and redeploy the `main` branch.

## Why the root entry point exists

This repository contains several apps:

- `djai-academy-homepage` serves the main DJAI site and blog admin backend.
- `djai-academy-course` is mounted at `/course/`.
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

Legacy `/th/` and uppercase `/EN/` routes redirect to the canonical paths.

## Environment variables

Set `DJAI_BLOG_ADMIN_PASSWORD` in hPanel before using `/admin/blog/`. Keep it out of Git.

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
