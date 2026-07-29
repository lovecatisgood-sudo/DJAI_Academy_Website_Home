# DJAI Deployment Memory

Updated: 2026-07-29

## Current Release

- Deployment branch: `main`
- Remote: `lovecatisgood-sudo/DJAI_Academy_Website_Home`
- Hostinger deployment source: Git push to `main`
- Root build command: `npm run build`
- Root start command: `npm start`
- Primary release commit: `744a857`
- Live deployment verified on 2026-07-29 after Hostinger auto-deploy.

## Included Tool Clusters

- PDF tools under `/tools/PDFTools/`
- QR tools under `/tools/qrgen/`
- Image tools under `/tools/resizeimg/`
- Audio and video tools under `/tools/media/`
- Document, AI, and spreadsheet tools under `/tools/document/`, `/tools/ai/`, and `/tools/spreadsheet/`

The media app uses the locally shipped single-thread FFmpeg WebAssembly core. Generated media and image route outputs are intentionally excluded from Git and recreated by `scripts/build-hostinger.mjs` during deployment.

## Release Verification Baseline

- Complete Hostinger build passed.
- Route audit passed 193 pages, 10 redirects, and 315 internal links/assets.
- Representative mobile Lighthouse scores: Performance 98-100, Accessibility 100, SEO 100.
- Real browser WAV-to-MP3 conversion passed with no console errors.
- Homepage lint has zero errors.

## Post-Deployment Operations

- Verify `/healthz`, `/llms.txt`, `/sitemap.xml`, and representative new tool URLs after Hostinger reports the deployment complete.
- Submit the refreshed sitemap in Google Search Console.
- Use Search Console URL Inspection for new PDF, QR, image, and media routes. Search indexing cannot be proven through a `site:` query.
- Do not commit local donor/reference material in `Open_Source_Repo/`, `claude_opus_audit_28jul.md`, `feature_list.md`, or design-source files unless explicitly requested.

## Live Verification

The following production endpoints returned HTTP 200 after deployment:

- `/healthz`
- `/llms.txt`
- `/sitemap.xml`
- `/tools/media/mp3-to-wav/`
- `/tools/qrgen/wifi-qr-code-generator/en/`
- `/tools/resizeimg/avif-to-jpg/en/`
- `/tools/PDFTools/delete-pages-from-pdf/`

Live HTML checks confirmed one H1, correct self-referencing canonicals, DJAI organization schema on the homepage, non-blocking AdSense markup, and all new route families in the sitemap. A follow-up regression fix makes every exported English QR task page emit `<html lang="en">`.
