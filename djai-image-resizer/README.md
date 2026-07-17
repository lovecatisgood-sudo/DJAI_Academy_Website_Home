# DJAI Image Resizer

A dependency-free Node.js web app for resizing and compressing JPG, PNG, and WebP images.

## Features

- Compress toward a target KB size
- Resize by percentage while preserving aspect ratio
- Resize using exact pixel dimensions
- JPG, PNG, and WebP output
- Browser-only image processing: files are never uploaded
- Responsive DJAI Academy / DJTool design
- Siamese Cat Dev transparent branding asset

## Run locally

```bash
npm start
```

Open `http://localhost:3000/tools/resizeimg/` for Thai or `http://localhost:3000/tools/resizeimg/en/` for English.

For live reload while editing server-side files:

```bash
npm run dev
```

## Deploy

This project runs on Node.js 18 or newer and has no package dependencies. It can be deployed to any Node host. Set the `PORT` environment variable when required by the host.

The production target paths are `/tools/resizeimg/` for Thai and `/tools/resizeimg/en/` for English.

## Privacy

All image processing is performed in the user's browser with Canvas and Blob APIs. The Node server only serves static files.
