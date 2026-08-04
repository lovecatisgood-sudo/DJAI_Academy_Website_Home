# DJAI Deployment Memory

Updated: 2026-08-05

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
- Account-first offline-course integration commit after rebase: `0109d3c`
- Free-course landing and account handoff commit after rebase: `67660fa`
- Bilingual course branding and two-trainer design commit: `d6a5d93`
- Public `main` and `origin/main` are synchronized. The visual implementation is `d6a5d93`; later
  commits only correct the English-session wording and preserve this deployment memory.
- Academy School production reports SHA `db369be4ed6c06dccb0a3caa175a4801bfdf0e06`.
- At the 2026-08-05 checkpoint, the live English course page returned 200 from the previous public
  deployment, while the new Thai route returned 404. Redeploy the `www.djai.academy` Hostinger
  application from current `main`, then verify both routes and the campaign redirect through CLI.

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

### Account-authoritative onboarding

- The legacy public onboarding pages now redirect to `school.djai.academy`; they are no longer the
  owner of completion state.
- School production stores the versioned survey against the authenticated user and checks
  `onboarding_completed_at` plus `onboarding_version`. A completed account is not prompted again
  unless a future onboarding version explicitly requires it.
- Registration and course-intent continuations remain server-authoritative. Do not reintroduce a
  browser-only `localStorage` completion decision or mark completion after a failed save.

### Account-first offline-course integration — released to source

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
- The former release gate is satisfied: production migrations `0115` and `0116` are present,
  Academy production runs `db369be`, and both session GET and OPTIONS return
  `Access-Control-Allow-Origin: https://www.djai.academy` with credential support.
- The rebased public implementation is on `main` at `0109d3c`. Re-verify all four public course
  routes after every `www.djai.academy` deployment; none may expose direct Stripe checkout CTAs.

### Free English money-making product course — source ready, latest public deploy pending

- Crawlable landing page: `/siamese_cat/dev/course/`; campaign handoff:
  `/MONEY_MAKING_PRODUCT/` redirects to the allowlisted School signup intent
  `free-course` with course ID `money-making-product-2026-08-22`.
- Thai-language landing page: `/siamese_cat/dev/course/th/`. It markets the same English-taught
  session; it does not promise a separate Thai-language class. The English and Thai routes form a reciprocal
  `hreflang` cluster with English as `x-default`; both use the DJAI Academy header logo and feature
  Mr. A with the existing founder portrait as DJAI founder, CTO, and offline-course instructor.
- Event details are fixed at 22 August 2026, 1:00–2:00 PM ICT, online, in English, and free.
  The public page contains truthful `EducationEvent` data and never publishes the Google Meet or
  participant WhatsApp links.
- Academy source commit `a88e288`, merged as production SHA `db369be`, adds account-preserving auth intent, the post-survey confirmation
  route, idempotent user-bound registration, confirmation email, Google Calendar action, and
  authenticated participant links. Its production dependency is migration
  `0117_free_course_event_registration.sql`.
- Production migration `0117` is applied and verified: the registration table exists, RLS is
  enabled, the own-record read policy exists, and the onboarding-gated registration RPC exists.
- The operator reported configuring `MONEY_MAKING_PRODUCT_MEET_URL` in Hostinger. Keep the actual
  meeting URL out of Git, public HTML, committed memory, and unauthenticated responses.
- Public `main` contains the campaign at `67660fa` and the DJAI-logo, Mr. A founder portrait, and
  reciprocal Thai landing enhancement at `d6a5d93`. The latest enhancement was not live at the
  checkpoint; redeploy `www.djai.academy` from latest `main` and verify English 200, Thai 200, and
  campaign 307.
- Validation passed: Academy typecheck, lint, full 342-test suite, production build, and database
  integration assertions; public course tests, homepage lint/build, root Hostinger build, and the
  201-page/13-redirect/364-link composite audit. With `DJAI_BLOG_DATA_FILE` deliberately missing,
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
