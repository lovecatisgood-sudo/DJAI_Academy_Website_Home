# DJAI Deployment Memory

Updated: 2026-08-02

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
- Offline AI Masterclass August 22 date update commit: `47860c3`
- Bilingual Academy onboarding release commit: `1fed087`
- Academy onboarding mobile optimization commit: `1d541f8`
- Account-first offline-course integration commit (local, release-gated): `a7cb611`
- Release-gate documentation commit (local, release-gated): `65d9029`
- Current deployed `main` checkpoint: `1d541f8`
- Local `main` is intentionally three commits ahead of `origin/main`; do not push these local commits
  until the Academy migration, deployment, CORS, and health-SHA gates below are confirmed.
- Live deployment verified on 2026-08-02 after Hostinger auto-deploy.

## Google AdSense Account

- Publisher ID: `pub-3624708289866566`
- AdSense code/client value: `ca-pub-3624708289866566`
- The ID is already present in the website advertising integrations, `ads.txt`, and `app-ads.txt`.
- Do not report this Publisher ID as missing or not yet supplied. The workspace-level reference is
  `../ADSENSE_ACCOUNT_INFO.md`.

## Academy Onboarding — Current Handoff

- Public onboarding routes: `/academy/` (Thai) and `/academy/en/` (English); community destination:
  `https://school.djai.academy/`.
- Mobile uses six compact steps (guidelines, profile, technical experience, programming, goals,
  commitment); desktop uses five steps and combines the two technical questions.
- Mobile release includes sticky progress, fixed safe-area-aware actions, touch-friendly controls,
  narrow-phone and short-landscape layouts, `vh`/`dvh` fallbacks, legacy `matchMedia` support, and
  reduced-motion handling.
- Focused responsive tests passed 5/5. Homepage lint had zero errors (with 10 pre-existing image
  optimization warnings), the homepage and root Hostinger production builds passed, and the
  composite audit passed 201 pages, 11 redirects, and 362 internal links/assets.
- Clean Thai and English production URLs returned HTTP 200 and served the new CSS
  `2nsagz4_ktbag.css` and JavaScript `1baalob89wr30.js`. Live assets contained the safe-area,
  narrow/landscape responsive rules, and bilingual mobile copy.

### Important account-persistence limitation

- The onboarding is currently remembered only by browser `localStorage` key
  `djai-academy-onboarding-complete-v1`; it is not stored as completion on a DJAI user account.
- API responses are appended with a random response ID but no authenticated immutable user ID.
- A different device/browser, private browsing, or cleared site data can show onboarding again;
  direct navigation to `school.djai.academy` can bypass the landing-page gate.
- The current client sets local completion even if the response API fails. Therefore do not claim
  that a completed response was necessarily saved or that onboarding is enforced once per account.
- Required fix: integrate the school authentication system, save the response against the
  authenticated user in a transaction, store `onboarding_completed_at` plus a version, enforce the
  gate server-side before community access, and set completion only after a successful save.

### Account-first offline-course integration — ready but not released

- Academy source commit `85c2b64` implements the server-authoritative onboarding fix, offline-course
  intent, and authenticated seat-registration flow. Its production dependency is migration
  `0115_account_onboarding_and_course_intent.sql`.
- Public-site commit `a7cb611` replaces direct Stripe links across Thai/English course landing and
  detail pages with:
  - signup: `https://school.djai.academy/signup?intent=offline-course&course_id=ai-masterclass`
  - login: `https://school.djai.academy/login?intent=offline-course&course_id=ai-masterclass`
  - signed-in destination: `https://school.djai.academy/reserve-seat?course_id=ai-masterclass`
- The CTA performs the minimal credentialed session check. Signed-in users continue directly to
  seat registration; unauthenticated users and any session-check failure fall back to the safe
  signup URL. Existing users also receive a visible login link.
- Validation passed: 3 focused registration-flow tests, the final composite Hostinger build, and
  the 201-page/11-redirect/362-link Hostinger audit. The audit now prevents direct Stripe course
  CTAs and requires account-first signup/login URLs on all four course routes.
- **Release gate:** do not push public-site commit `a7cb611` until migration `0115` is applied and
  Academy commit `85c2b64` is confirmed deployed. On 2026-08-02, the new session route and its
  `OPTIONS` behavior appeared live, but `/api/health` still reported stale Academy SHA
  `04a5fd8c2e158a051b0141d668795bb26ffa1c0b`; the production migration remained unconfirmed.
- Academy production must set `PUBLIC_WEBSITE_ORIGIN=https://www.djai.academy`. The live session
  response did not include `Access-Control-Allow-Origin`, and the matching preflight returned HTTP
  403, proving that the public-site origin was not yet configured.

### Free English money-making product course — ready but not released

- Crawlable landing page: `/siamese_cat/dev/course/`; campaign handoff:
  `/MONEY_MAKING_PRODUCT/` redirects to the allowlisted School signup intent
  `free-course` with course ID `money-making-product-2026-08-22`.
- Event details are fixed at 22 August 2026, 1:00–2:00 PM ICT, online, in English, and free.
  The public page contains truthful `EducationEvent` data and never publishes the Google Meet or
  participant WhatsApp links.
- Academy source commit `a88e288` adds account-preserving auth intent, the post-survey confirmation
  route, idempotent user-bound registration, confirmation email, Google Calendar action, and
  authenticated participant links. Its production dependency is migration
  `0117_free_course_event_registration.sql`.
- **Release gate:** Academy production must apply migration `0117`, deploy commit `a88e288` or a
  descendant, and set a valid `MONEY_MAKING_PRODUCT_MEET_URL` whose host is `meet.google.com`
  before the public campaign is released. Do not invent or expose a meeting URL.
- Validation passed: Academy typecheck, lint, full 342-test suite, production build, and database
  integration assertions; public course tests, homepage lint/build, root Hostinger build, and the
  200-page/13-redirect/362-link composite audit. With `DJAI_BLOG_DATA_FILE` deliberately missing,
  both indexes still exposed 16 articles and all 32 article routes returned 200 with sitemap
  coverage.

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
