# Hostinger Deployment

Use the repository root as the Hostinger application root.

## Required settings

- Node.js version: `22.13.0` or newer
- Build command: `npm run build`
- Start command: `npm start`
- App root / working directory: repository root
- Domain: `www.djai.academy`

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
