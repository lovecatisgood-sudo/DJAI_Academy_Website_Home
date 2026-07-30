# DJAI Deployment Memory

Updated: 2026-07-30

## Current Release

- Deployment branch: `main`
- Remote: `lovecatisgood-sudo/DJAI_Academy_Website_Home`
- Hostinger deployment source: Git push to `main`
- Root build command: `npm run build`
- Root start command: `npm start`
- Primary tool release commit: `744a857`
- Screaming Frog SEO remediation commit: `0651e14`
- Persistent blog hreflang compatibility commit: `cf3601d`
- Initial-head metadata compatibility commit: `59a375f`
- State and audit documentation base commit: `ce6fdaa`
- Web-promotion and voice-admin integration commit: `426924a`
- Web-promotion mobile and SEO remediation commit: `ab66f69`
- Live deployment verified on 2026-07-30 after Hostinger auto-deploy.

## Web Promotion and Voice Agent — Current Handoff

- Public page: `/web_promo/`; protected admin: `/voice_admin/`.
- Required production environment values were configured in hPanel and the live voice API health
  check confirms both database and settings connectivity.
- The short-phone mobile layout, header-aware positioning, metadata, crawlable bilingual content,
  Service/Offer structured data, social metadata, and `llms.txt` entry are pushed on `main` at
  `ab66f69`.
- The new origin responds correctly when the CDN cache is bypassed. The clean public URL was still
  serving the previous cached document at the checkpoint. Purge Hostinger CDN cache in hPanel,
  then verify the clean URL without query parameters and run the final Screaming Frog List crawl.
- Do not claim guaranteed ranking, indexing, or AI citations. Technical readiness is verified;
  Google Search Console and field performance data remain authoritative for actual search results.

## Included Tool Clusters

- PDF tools under `/tools/PDFTools/`
- QR tools under `/tools/qrgen/`
- Image tools under `/tools/resizeimg/`
- Audio and video tools under `/tools/media/`
- Document, AI, and spreadsheet tools under `/tools/document/`, `/tools/ai/`, and `/tools/spreadsheet/`

The media app uses the locally shipped single-thread FFmpeg WebAssembly core. Generated media and image route outputs are intentionally excluded from Git and recreated by `scripts/build-hostinger.mjs` during deployment.

## Release Verification Baseline

- Complete Hostinger build passed.
- Route audit passed 193 pages, 10 redirects, and 316 internal links/assets.
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

## Screaming Frog Baseline

- Installed edition: Screaming Frog SEO Spider 24.3, free/unlicensed.
- A normal crawl reached the free 500-URL ceiling because scripts and images count toward the allowance.
- For complete submitted-page coverage, download the live sitemap and use List Mode with its URLs. The 2026-07-29 list crawl covered all 205 sitemap URLs without exceeding the free limit.
- All 205 sitemap URLs returned HTTP 200 and were indexable.
- The final production crawl found no missing or duplicate page titles, meta descriptions, H1s, or canonicals; no missing hreflang return links or `x-default`; and no 4xx or 5xx sitemap URLs.
- Remediation commit `0651e14` added crawlable initial content to the client-rendered Siamese Cat Dev bio, repaired legacy blog hreflang data, added QR `x-default`, and supplied descriptive product-image alt text.
- Commit `cf3601d` makes English metadata resolve the actual seeded Thai post even when Hostinger's persistent blog file predates the compatibility field stored in the repository copy.
- Commit `59a375f` makes that seeded fallback synchronous so Next.js emits canonical and hreflang tags in the initial document head instead of streamed metadata that HTML-limited crawlers can miss.
- The default CLI configuration does not enable JavaScript rendering or Schema.org/Google structured-data validation. Do not interpret an empty structured-data error export from that configuration as a complete schema audit.
