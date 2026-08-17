# Current State — DJAI Multi-Page Deployment

## Latest Handoff — 2026-08-13, Vietnamese Public Pages and Free Tools

This is the newest checkpoint. It supersedes older claims about Vietnamese coverage and the local
Hostinger build when they conflict. It does **not** claim that the changes are deployed.

### Repository and deployment boundary

- Workspace: `/home/siamesedev/Documents/codex/Academy_Educational_Platform_DJAI/website_DJAI_HOME`
- Branch: `main`; starting `HEAD` for this working session: `11a6cf0`.
- The worktree is intentionally dirty and contains many earlier user/agent changes and untracked
  reference files. At this checkpoint `git status --short` reports 142 entries. Preserve them and
  do not mass-stage, reset, or overwrite unrelated work.
- The Vietnamese implementation is local-only in this checkout. It has not been pushed, merged, or
  deployed during this task.
- No browser, GUI, Hostinger dashboard, or authenticated account was accessed.

### Vietnamese coverage completed

Genuine Vietnamese public pages, UI copy, route discovery, and SEO signals now cover:

- `/web_promo/vi/`, including commercial package copy, voucher experience, navigation, voice-agent
  language selection, API locale handling, and deployment-proxy routing;
- `/tools/qrgen/vi/` plus all seven QR task pages;
- `/tools/resizeimg/vi/` plus all 17 image task pages;
- `/tools/PDFTools/vi/` plus the 11 core PDF task pages;
- `/tools/media/vi/` plus all 28 audio/video task pages;
- Vietnamese hubs for document, AI, and spreadsheet tools plus all 19 task pages; and
- `/tools/brand/vi/` and `/tools/brand/favicon-generator/vi/`.

This is 92 Vietnamese commercial/tool URLs across the families above. The main `/tools/vi/` page
now links to the Vietnamese family hubs and representative Vietnamese workflows instead of sending
visitors to English pages.

The work includes localized interactive controls, validation and result messages, promo modals,
mobile-app callouts, navigation, discovery directories, footers, CTAs, and natural search phrasing
such as free/no-sign-up/no-watermark where the actual tool behavior supports it. English technical
terms such as PDF, QR, CSV, codec, RAG, and WebAssembly are retained where they help users match the
interface or task.

### Technical SEO and deployment integration

- Vietnamese pages use `html lang="vi"`, self-referencing canonicals, and reciprocal self-inclusive
  `th`, `en`, `vi`, and `x-default` hreflang sets.
- The main sitemap now includes the indexable Vietnamese commercial and tool URLs. PDF alias pages
  that do not have genuine Vietnamese equivalents remain Thai/English only and are not falsely
  listed as Vietnamese.
- Tool discovery links and the Vietnamese tools hub point to existing locale-equivalent routes.
- `/web_promo/vi/` keeps the public trailing-slash URL while the root proxy rewrites it to the
  internal Next.js `/vi` route, avoiding the redirect that originally failed the route audit.
- The root audit now checks representative Vietnamese pages from every family for HTTP 200,
  `lang="vi"`, a self-canonical, and Vietnamese hreflang.
- The previous image build's network-dependent model download no longer failed; cached/packaged
  assets allowed the complete Hostinger-shaped build to finish.

### Validation completed

- Individual production builds passed for the homepage, web promo/voice app, QR, image, PDF, media,
  document/AI/spreadsheet, course, and Siamese Cat Dev applications.
- Focused test suites passed:
  - PDF: 5/5;
  - document/AI/spreadsheet and favicon: 10/10;
  - image: 6/6;
  - media: 1/1; and
  - QR static export: 1/1.
- `node scripts/build-hostinger.mjs` completed successfully and printed `Hostinger build completed`.
- `node scripts/audit-hostinger.mjs` passed with **347 pages, 14 redirects, and 527 internal
  links/assets**, including admin authentication and canonical-host checks.
- `git diff --check` passed.

### Remaining boundaries and next action

- Existing npm audit warnings remain in several Next.js child applications. They did not cause the
  earlier image-build outage and were not force-fixed because that could introduce breaking
  dependency changes. Handle them as a separate reviewed upgrade task.
- Before release, review the release diff and intentionally select only the desired files.
- If the user authorizes publication, commit/push through the normal repository workflow, let
  Hostinger perform a clean build, then verify representative Vietnamese URLs and `/healthz` in
  production. Browser/dashboard access still requires explicit action-specific permission.

## Latest Handoff — 2026-08-11, Recurring Hostinger Child-Process Outage

This is the newest checkpoint and supersedes older production-health claims below when they
conflict.

### Current production condition

- Canonical host: `https://www.djai.academy`.
- The root Hostinger Node proxy is alive, but both internal Next.js child services have repeatedly
  stopped listening. Hostinger logs show `ECONNREFUSED` to the homepage on `127.0.0.1:3001` and the
  voice service on `127.0.0.1:3002`.
- The user restarted the Hostinger application and the homepage temporarily recovered. At 17:45 ICT
  on 2026-08-11, terminal verification found the failure had recurred:
  - `/` returned HTTP 502;
  - `/web_promo/api/health` returned HTTP 502;
  - `/healthz` incorrectly returned HTTP 200; and
  - static `/tools/qrgen/` returned HTTP 200.
- The `/wp-admin/install.php` request in the log was an automated WordPress scan and was not the
  cause of the outage.
- Confirmed application defect: the production `server.js` starts each child once and only logs an
  exit. It does not restart a failed child. Its health endpoint checks build files rather than
  runtime child availability. The trigger that kills the children is not yet proven; Hostinger
  memory/resource pressure is a leading hypothesis only until OOM, SIGKILL, or platform termination
  evidence is captured.

### Prepared hotfix

- Repository: `lovecatisgood-sudo/DJAI_Academy_Website_Home`.
- Clean worktree:
  `/home/siamesedev/Documents/codex/Academy_Educational_Platform_DJAI/website_DJAI_HOME/.worktrees/hostinger-child-supervision`.
- Branch: `fix/hostinger-child-supervision`, based on production `origin/main` at `afbc38b`.
- Commit: `3776db1 fix(hosting): restart failed child services`.
- Draft PR: `https://github.com/lovecatisgood-sudo/DJAI_Academy_Website_Home/pull/2`, targeting
  `main`.
- The branch is pushed, but the PR is not merged and the fix is not deployed. A manual Hostinger
  restart is only a temporary recovery until this hotfix reaches production.

The hotfix:

- supervises both child services and restarts either after an unexpected exit;
- uses exponential retry backoff capped at 30 seconds;
- suppresses restarts during intentional root shutdown;
- returns HTTP 503 from `/healthz` unless build artifacts and both child services are ready; and
- reports readiness, restart count, and last-exit details for each child.

Validation completed:

- Four supervisor regression tests passed.
- `node --check server.js` and `git diff --check` passed.
- A production-shaped local failure drill launched both real built Next.js services, terminated the
  homepage child, observed its supervised one-second restart with a new PID, and confirmed
  `/healthz` returned `servicesReady: true` and `restartCount: 1` afterward.
- The complete local Hostinger build was blocked before compilation by this machine's npm
  `EALLOWSCRIPTS` configuration. This is a local package-manager policy error, not an application
  test failure. Hostinger must still complete its normal clean build before release.

### Required next actions

1. Review and merge PR #2 into `main` to trigger Hostinger's normal production build/deploy.
2. Confirm Hostinger reports a successful build and running application.
3. Verify `/`, `/healthz`, `/web_promo/api/health`, and `/tools/qrgen/`; the new health response must
   include `buildsReady: true` and `servicesReady: true`.
4. Monitor `services.*.restartCount` and Hostinger logs after deployment.
5. Inspect Hostinger memory/resource graphs and the log lines immediately before child termination.
   Record OOM, SIGKILL, or platform shutdown evidence if present; do not label memory as the root
   cause without that evidence.

## Latest Handoff — 2026-07-31, AdSense Non-Serving Diagnosis

- Publisher account: `pub-3624708289866566` / client `ca-pub-3624708289866566`.
- The Google AdSense troubleshooter reported that the AdSense for Content account is not active or
  verified, although the AdSense interface shows a separate `Verified` state.
- Live checks on `https://www.djai.academy` found no website-integration blocker:
  - the homepage and `/blog/` return HTTP 200;
  - the correct `google-adsense-account` meta tag and AdSense script are present;
  - `/blog/` renders the configured ad slots;
  - Google's AdSense script endpoint returns HTTP 200 for this client ID;
  - `/ads.txt` returns HTTP 200 with
    `google.com, pub-3624708289866566, DIRECT, f08c47fec0942fa0`;
  - `/robots.txt` allows crawling; and
  - the production CSP does not block the AdSense script.
- Diagnosis: `Verified` can refer to site ownership, identity, address/PIN, payments, or ads.txt;
  it does not prove that the AdSense for Content account is active or that the site approval status
  is `Ready`. This is currently an AdSense account/site-review issue, not a code issue.
- Required account-side checks: in AdSense, confirm `Sites > djai.academy` shows approval status
  `Ready` and ads.txt status `Authorized`; complete every Home/payment setup task; check Policy
  center; and use `Reactivate account` plus resubmit the site if the account was deactivated after
  six months without impressions. Do not remove and re-add a site already under review.
- Google states that site review normally takes a few days and can take 2–4 weeks. Once the account
  is active, the site is `Ready`, ads.txt is `Authorized`, and ads are configured, serving may take
  about an hour to begin. No AdSense source-code change is warranted from the current evidence.

## Latest Handoff — 2026-07-30, Screaming Toad Launch and News Publication

This is the newest checkpoint and supersedes older release-status claims below when they conflict.

### Repository and release state

- Workspace: `/home/siamesedev/Documents/codex/website_DJAI_HOME`
- Branch/remote: `main` at `lovecatisgood-sudo/DJAI_Academy_Website_Home`
- Current `HEAD`: `0fc5f2c content: add Screaming Toad audit screenshots`
- Screaming Toad landing-page commit: `9ae1bfe feat: add SEO Screaming Toad landing pages`
- Canonical production host: `https://www.djai.academy`
- Do not stage or overwrite the unrelated modified `djai-web-promo-voice/package.json` or the
  existing untracked user/reference files.

### Bilingual Screaming Toad product landing pages

- Thai: `https://www.djai.academy/tools/seo-screaming-toad/`
- English: `https://www.djai.academy/tools/seo-screaming-toad/en/`
- The Thai page links to the DJAI Academy Thai repository. The English page links to the original
  `lovecatisgood-sudo` repository.
- The release includes localized metadata and copy, self-canonicals, reciprocal hreflang and
  `x-default`, structured data, sitemap and `llms.txt` discovery, contextual links from the tools
  hub, and inclusion in the tool-only discovery navigation.
- The `/tools/` footer/discovery ordering was corrected: the tool directory is at the true page
  bottom, and Screaming Toad has a descriptive product card. The standard DJAI footer on non-tool
  pages remains unchanged.
- Local gates passed for the landing release: complete Hostinger build and deterministic audit of
  197 routes, 11 redirects, and 334 internal links/assets.
- The current upstream Screaming Toad README describes **27 bounded MCP tools**. If landing-page
  copy still says 23, update it to 27 only after reconfirming the current repository contract.

### Bilingual News articles published through the production Blog API

Translation group: `seo-screaming-toad-open-source-crawler-launch`

- English title: `SEO Screaming Toad: DJAI Launches an Open SEO Crawler`
- English URL:
  `https://www.djai.academy/blog/en/seo-screaming-toad-open-source-crawler-launch/`
- Thai title: `เปิดตัว SEO Screaming Toad: Open SEO Crawler จากทีม DJAI`
- Thai URL:
  `https://www.djai.academy/blog/seo-screaming-toad-open-source-crawler-djai/`
- Both posts are published under `News`, authored by `DJAI Development Team`, and were created via
  the authorized production Blog API rather than hardcoded into Git.
- Post-publication checks passed: HTTP 200, correct document language, self-canonical, reciprocal
  en/th/`x-default` hreflang, localized News labels, Article/BlogPosting JSON-LD, product links,
  blog-hub discovery, and all seven localized audit screenshots with descriptive alt text.

Static story assets are deployed under:

`djai-academy-homepage/public/blog-assets/seo-screaming-toad-djai-audit-2026-07-30/`

The seven images cover crawl completion, the 94-finding summary, noindex review, indexability rule
evidence, near-duplicate review, the 222-page HTML inventory, and crawl history.

### Evidence and claims used in the announcement

The polished live audit used SEO Screaming Toad `2.0.0-rc.4`, crawl ID
`crawl_425921818cae33f4a03a417f7880cd3e`, raw-HTML mode, exact-www scope, robots enforcement,
compression disabled for Hostinger compatibility, and a 100,000-URL safety ceiling:

- 287 URLs discovered and fetched
- 222 HTML pages analysed
- 0 fetch failures; all fetched responses were 2xx
- 94 observations: 8 rule errors, 66 warnings, and 20 informational findings
- No confirmed high-priority technical failure
- The eight rule errors concerned intentional `noindex` blog category-filter URLs; human review
  found the duplicate-control alignment likely correct, so they were not blindly changed.
- The main medium-priority editorial queue was 24 near-duplicate similarity observations across
  QR, image, PDF, and media tool families.
- Metadata observations: 12 long titles, 3 short titles, 7 long descriptions, 13 short-description
  informational items, and 7 informational title/H1 matches.

An earlier raw screening remains available outside this workspace at:

`/home/siamesedev/Documents/codex/DJAI_WebDev_Landing_Page/open_crawler_audit/`

It covered 285 fetched URLs, 220 HTML pages, and 103 observations (75 warnings and 28 info). The
later course-grade audit package is at:

`/home/siamesedev/Documents/codex/SEO Auditor/docs/course/Course 4: SEO & ASO with AI Agent - top rank your site on search/Bonus Lesson - Real World DJAI Academy Audit/`

Claim boundary: there was no controlled side-by-side Screaming Frog comparison. Do not state that
Screaming Frog missed these findings, or claim parity/superiority. Describe Screaming Toad as an
open-source, local-first alternative and release candidate until a repeatable differential
benchmark is published. Also keep the 100M+ figure framed as theoretical architecture potential;
current synthetic production-path evidence extends to 5M URLs.

### Remaining post-publication check

- At the last verification, both articles were live and linked from their blog hubs, but the live
  XML sitemap was still serving its pre-publication Next.js cache (`revalidate = 3600`). Recheck
  that both new slugs appear after the one-hour revalidation window.
- If they remain absent, add targeted `revalidatePath` calls for `/sitemap.xml`, the affected blog
  hubs, and article routes to the Blog API mutation path, deploy, then update the posts through the
  API to trigger invalidation.
- Search Console remains authoritative for indexing and search performance; publication, a clean
  crawl, and sitemap inclusion do not guarantee indexing, ranking, traffic, or AI citations.

## Latest Handoff — 2026-07-30 18:02 ICT

This is the newest checkpoint and supersedes deployment-status claims below when they conflict.

- Workspace: `/home/siamesedev/Documents/codex/website_DJAI_HOME`
- Branch and remote: `main` at `lovecatisgood-sudo/DJAI_Academy_Website_Home`
- Local `HEAD`, `origin/main`, and GitHub `main`: `cb29acd`
- Latest commit: `cb29acd feat: add tool-only SEO discovery navigation`
- Canonical production host: `https://www.djai.academy`
- Production `/healthz` returns HTTP 200 with `buildsReady: true`; the homepage is the normal DJAI
  Academy page and has not been replaced by the Cam PDF application landing page.

Tool-only SEO discovery implementation at `cb29acd`:

- Added a complete bilingual `/tools/` directory covering 71 tools plus seven category links.
- Added contextual crawlable discovery sections to QR, image, PDF, media, document, AI, and
  spreadsheet pages without modifying the normal DJAI footer on non-tool pages.
- Local release gates passed: all 21 tool-suite tests, complete Hostinger build, `git diff --check`,
  and route audit for 195 pages, 11 redirects, and 330 internal links/assets.
- Browser checks at 390 px found no horizontal overflow on representative tool-family pages.
- The route audit now fails if a tool page lacks `data-tool-discovery` or if tool-only navigation
  leaks onto the homepage, blog, course, or service pages.

Important live-deployment state:

- Hostinger is not consistently serving the complete `cb29acd` artifact. Repeated cache-busted
  checks find `data-tool-discovery` on the media-tool family but not on `/tools/`, QR, image, PDF,
  or document pages. No internal-server errors are present.
- GitHub has no commit newer than `cb29acd`; the inconsistent production output is not caused by
  another agent pushing over the SEO commit. The next operation is a clean hPanel redeploy of
  `main` from the repository root followed by an application restart and live raw-HTML checks.
- Do not claim the tool-navigation production release complete until every representative family
  emits `data-tool-discovery` in initial HTML.

Cam PDF mobile application landing page:

- Live route: `https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/`
- The app page is intentionally separate from `/`; it was introduced by `d8a4769` and later
  updated by `77cdcb0`, `0651e14`, and `492fdfa`.
- It returns HTTP 200, has a clear English title and H1, a self-referencing canonical, and sitemap
  inclusion together with privacy, terms, and account-deletion routes.
- Known SEO issue: the English page currently emits `<html lang="th">`.
- Known enhancement: add truthful `SoftwareApplication` structured data and decide whether to
  create a genuine Thai/English language cluster before adding hreflang.

Local worktree preservation:

- Existing user modification: `djai-web-promo-voice/package.json` (do not overwrite or stage).
- Existing untracked user/reference files include `Open_Source_Repo/`,
  `claude_opus_audit_28jul.md`, `feature_list.md`, `yt_icon_red_digital.eps`, and multiple
  `djai-web-promo-voice` documents/assets. Do not commit them unless explicitly requested.
- No code change was made during the final deployment/Cam PDF review.

## Previous Authoritative Checkpoint — 2026-07-30

This checkpoint supersedes conflicting paths, route conventions, process IDs, and deployment notes
in the older 2026-07-18 history below.

- Active workspace: `/home/siamesedev/Documents/codex/website_DJAI_HOME`
- Deployment branch: `main`
- Remote: `lovecatisgood-sudo/DJAI_Academy_Website_Home`
- Latest deployed functional commit: `ab66f69`
- Latest functional SEO commit: `59a375f`
- Hostinger deploys automatically from pushes to `main` using root `npm run build` and `npm start`.
- Canonical production host: `https://www.djai.academy`
- No temporary local preview or audit server remains running.

Latest web-promotion and voice-agent release:

- Public service page: `https://www.djai.academy/web_promo/`
- Protected administration entry: `https://www.djai.academy/voice_admin/`
- Integration base commit: `426924a`
- Mobile and SEO remediation commit: `ab66f69`
- The mobile AI voice card is constrained below the fixed header and inside the safe viewport.
  At an emulated `360x640` viewport, the panel measured approximately `522px` high, its card
  ended at `614px`, all actions/privacy copy remained visible, and no horizontal overflow existed.
- `/web_promo/` now has a Thai-aligned title, description, H1, explicit `index, follow`, a
  self-referencing canonical, Open Graph/Twitter metadata, bilingual crawlable service copy,
  expanded `Service` JSON-LD linked to the main Organization entity, and three Offer entries.
- `llms.txt` now identifies the web-development promotion and OpenAI Realtime voice-agent service.
- The production voice health endpoint returned HTTP 200 with database and settings checks true.
- The new build is present at the Hostinger origin and was verified with a cache-busting query.
  However, at the time of this checkpoint, the clean canonical URL still returned the prior HTML
  from Hostinger CDN (`x-hcdn-cache-status: HIT`, long-lived `s-maxage`). The next required action
  is to purge the domain cache in hPanel, then recrawl the clean `/web_promo/` URL.
- A targeted Screaming Frog 24.3 List Mode crawl of the new origin returned HTTP 200, one H1,
  title and meta description, `index, follow`, and the intended canonical. It reported the
  cache-busting audit URL as canonicalised, which is expected. Its default CLI structured-data
  export was disabled/empty; JSON-LD was separately parsed successfully.
- Final local checks passed: voice Next.js production build, homepage production build,
  TypeScript, `git diff --check`, and the deterministic Hostinger audit (195 pages, 11 redirects,
  328 internal links/assets, admin API auth, and canonical host).

Current public tool clusters:

- QR: `/tools/qrgen/`
- Images, including background removal: `/tools/resizeimg/`
- PDF: `/tools/PDFTools/`
- Audio and video: `/tools/media/`
- Document, AI, and spreadsheet: `/tools/document/`, `/tools/ai/`, `/tools/spreadsheet/`
- Cam PDF mobile application page: `/Cam_PDF_Scan_Signer_QR-Gen/`
- Siamese Cat Dev bio and shared-backend blog: `/siamese_cat/dev/` and `/siamese_cat/dev/blog/`

Latest verification:

- Complete Hostinger production build passed.
- Deterministic route audit passed 193 pages, 10 redirects, and 316 internal links/assets.
- Screaming Frog SEO Spider 24.3 free edition crawled all 205 sitemap URLs in List Mode.
- Final production result: 205/205 HTTP 200 and indexable; zero missing or duplicate titles,
  descriptions, H1s, or canonicals; zero missing hreflang return links or `x-default`; zero
  internal 4xx or 5xx sitemap URLs.
- The Screaming Frog corrections cover crawlable Siamese Cat Dev bio content, QR `x-default`,
  descriptive product-image alt text, persistent legacy blog data, and Next.js metadata placement
  in the initial document head.
- Structured-data validation and JavaScript rendering were not enabled in the default Screaming
  Frog CLI configuration. CrUX field data also remains unavailable without sufficient field data
  and working API quota. Search Console remains authoritative for Google indexing coverage.

Release memory and detailed audit:

- `DEPLOYMENT_MEMORY.md`
- `IMPLEMENTATION_AUDIT_2026-07-29.md`
- Temporary crawl exports for this workstation session: `/tmp/sf-djai-sitemap-audit/`

Unrelated local reference material remains untracked and must not be committed unless explicitly
requested: `Open_Source_Repo/`, `claude_opus_audit_28jul.md`, `feature_list.md`, and
`yt_icon_red_digital.eps`.

Saved: 2026-07-18, Asia/Ho_Chi_Minh

## Latest verified release

- Canonical Vibe Coding token counter:
  - Thai default: `https://djai.academy/tools/ai/token-counter/`
  - English: `https://djai.academy/tools/ai/token-counter/en/`
- The standalone `djai-token-counter` prototype was not deployed; its useful ideas were consolidated into the existing DJTools AI category to avoid duplicate SEO pages.
- Live private-browser analysis now includes `o200k_base`, `cl100k_base`, and `p50k_base` token estimates; multilingual word segmentation; grapheme-aware character counts; characters without spaces; sentences; paragraphs; lines; UTF-8 bytes; reading time; context use; context remaining; and optional input-cost estimation.
- Local import supports DOCX, selectable-text PDF, TXT, Markdown, CSV, JSON, and common source-code files. Scanned PDFs are directed to Document OCR.
- The page has tailored Thai/English titles, descriptions, keywords, HowTo content, FAQs, canonicals, hreflang, related AI tools, course and development CTAs, and linked Siamese Cat Dev credit.
- Tokenizer tables and the analyzer workspace are dynamically loaded only for token-counter visitors.
- Validation passed: project lint, seven automated tests, production static export, complete Hostinger build, zero dependency vulnerabilities, Hostinger route audit (`130` pages, `9` redirects, `246` internal links/assets), desktop/mobile browser interaction QA, local document import, and zero browser console errors.
- No temporary DJAI web server or QA browser remains running.

Workspace sandbox:

- Root folder: `/home/siamesedev/Documents/Siamese_Cat_Dev`
- Work has been kept inside this folder, with temporary preview files under `/tmp`.

## Deployment target map

| Page | Local project | Target URL | Build output |
| --- | --- | --- | --- |
| DJAI Homepage TH | `djai-academy-homepage` | `https://djai.academy/th/` | `.next/` |
| DJAI Homepage EN | `djai-academy-homepage` | `https://djai.academy/EN/` | `.next/` |
| DJAI Portfolio TH/EN | `djai-academy-homepage` | `https://djai.academy/portfolio/th/`, `https://djai.academy/portfolio/EN/` | `.next/` |
| DJAI Development TH/EN | `djai-academy-homepage` | `https://djai.academy/development/th/`, `https://djai.academy/development/EN/` | `.next/` |
| DJAI Services TH/EN | `djai-academy-homepage` | `https://djai.academy/service/th/`, `https://djai.academy/service/EN/` | `.next/` |
| QR Generator TH/EN | `DJayTools-Free-QR-Generator-Source` | `https://djai.academy/tools/qrgen/`, `https://djai.academy/tools/qrgen/en/` | `out/` |
| Image Resizer TH/EN | `djai-image-resizer` | `https://djai.academy/tools/resizeimg/`, `https://djai.academy/tools/resizeimg/en/` | `public/` |
| Siamese Cat Dev Bio TH/EN | `Siamese-Cat-Dev-Bio-Site` | `https://djai.academy/siamese_cat/dev/`, `https://djai.academy/siamese_cat/dev/EN/` | `dist/` |
| DJAI Course TH/EN | `djai-academy-course` | `https://djai.academy/course/`, `https://djai.academy/course/EN/` | `out/` |

## Current local preview servers

- QR Generator:
  - Target URLs: `https://djai.academy/tools/qrgen/`, `https://djai.academy/tools/qrgen/en/`
  - Process: `node node_modules/.bin/next dev --hostname 127.0.0.1 --port 3000`
  - PID observed: `1434347`

- DJAI Course:
  - URL: `http://127.0.0.1:4180/course/`
  - Process: `python3 -m http.server 4180 --bind 127.0.0.1`
  - PID observed: refreshed during course update
  - Static preview folder: `/tmp/djai-course-preview/course/`

- DJAI Homepage:
  - Current bilingual preview URL: `http://127.0.0.1:4196/th/`
  - English preview URL: `http://127.0.0.1:4196/EN/`
  - Process: `npm run start -- -H 127.0.0.1 -p 4196`
  - Updated tools-hub preview also running at: `http://127.0.0.1:4192/tools/`
  - Blog/admin preview running at: `http://127.0.0.1:4194/blog/`
  - Portfolio preview running at: `http://127.0.0.1:4196/portfolio/th/`

- Image Resizer:
  - Current preview URL: `http://127.0.0.1:4197/tools/resizeimg/`
  - English preview URL: `http://127.0.0.1:4197/tools/resizeimg/en/`
  - Process: `PORT=4201 npm start`
  - PID observed: `2439564`
  - Static target URLs: `/tools/resizeimg/` and `/tools/resizeimg/en/`

- Siamese Cat Dev Bio:
  - Target URLs: `https://djai.academy/siamese_cat/dev/`, `https://djai.academy/siamese_cat/dev/EN/`
  - Process: `npm run preview -- --host 127.0.0.1 --port 5174`

## DJAI Homepage state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/djai-academy-homepage`

Framework/version:

- Next.js `15.5.20`

Important additions:

- Homepage repo is now present in the workspace.
- App Router homepage now redirects `/` to `/th/`.
- English homepage is available at `/EN/`.
- Thai route set:
  - `/th/`
  - `/portfolio/th/`
  - `/development/th/`
  - `/service/th/`
  - `/tools/th/`
  - `/blog/th/`
  - `/blog/th/[slug]/`
- English route set:
  - `/EN/`
  - `/portfolio/EN/`
  - `/development/EN/`
  - `/service/EN/`
  - `/tools/EN/`
  - `/blog/EN/`
  - `/blog/EN/[slug]/`
- Bare section routes redirect to Thai:
  - `/portfolio/` -> `/portfolio/th/`
  - `/development/` -> `/development/th/`
  - `/service/` -> `/service/th/`
  - `/tools/` -> `/tools/th/`
  - `/blog/` -> `/blog/th/`
- Old English article routes redirect to `/blog/EN/[slug]/`.
- SEO files:
  - `public/robots.txt`
  - `public/sitemap.xml`
- Branded assets:
  - `public/djai-logo.webp`
  - `public/founder-djai.webp`
- Homepage includes:
  - Fixed header with DJAI Academy logo.
  - Header aligned with the course page:
    - Upcoming Courses
    - Community
    - Development dropdown:
      - Services
      - Promo
      - Portfolio
    - Tools
    - Blog
    - Primary button: `Join Community`
  - First-viewport DJAI Academy hero with founder image.
  - Route cards for Learn, Join, and Build.
  - Sections for Educate/Build/Deploy, team background, vibe coding, community tools, services, courses, and final CTA.
  - Footer aligned with the course page:
    - Learn
    - Build
    - Community
    - Contact
  - Contact email: `contact@djai.academy`.
  - Course-style newsletter card and modal.
  - Copyright line.
- `/tools/th/` and `/tools/EN/` hubs include:
  - Free QR Code Generator card linking to `https://djai.academy/tools/qrgen/` and `https://djai.academy/tools/qrgen/en/`
  - Free Image Converter and Resizer card linking to `https://djai.academy/tools/resizeimg/` and `https://djai.academy/tools/resizeimg/en/`
  - CollectionPage JSON-LD with SoftwareApplication entries.
  - Contextual ecosystem links to DJAI services, Siamese Cat Dev, Siamese Cat Cafe, Siamese Cat Creative Club, and Siamese Cat Hotel.
- `/portfolio/th/` and `/portfolio/EN/` now include:
  - Shared DJAI homepage header and footer.
  - Metadata, canonical URL, Open Graph image, and CollectionPage JSON-LD with CreativeWork entries.
  - Three portfolio categories from `DJAI_Portfolio`: Websites, Games, and Web3/Crypto Apps.
  - 18 selected authorized showcase projects with cleaned descriptions, service tags, and screenshots.
  - Live website links for the website projects that have URLs in the source description file.
  - Public assets copied to `public/portfolio/websites/`, `public/portfolio/games/`, and `public/portfolio/crypto_apps/`.
  - Sitemap entries for Thai and English portfolio URLs.
- `/development/th/`, `/development/EN/`, `/service/th/`, and `/service/EN/` now include:
  - Service positioning for websites, web apps, mobile apps, SaaS, AI automation, CRM, POS, fintech/payment apps, crypto wallets, games, and Web3 products.
  - Cost-aware MVP and fast execution messaging.
  - Links to portfolio, tools, blog, and contact email.
  - Localized metadata and structured data.
- `/blog/th/` and `/blog/EN/` now include:
  - Category filters for `News`, `Guides`, and `Tutorial`.
  - Dynamic localized blog article routes at `/blog/th/[slug]/` and `/blog/EN/[slug]/`.
  - Blog schema on the listing page and Article schema on post pages.
  - Sitemap entries for the blog index and seeded tutorial posts.
- `/admin/blog/` now includes:
  - Password-protected post creation form.
  - Category, status, SEO title, SEO description, keywords, excerpt, slug, and markdown-style content fields.
  - `noindex, nofollow` metadata.
- Blog backend:
  - API route: `/api/admin/blog/`
  - Storage file: `djai-academy-homepage/data/blog-posts.json`
  - Required production environment variable: `DJAI_BLOG_ADMIN_PASSWORD`
  - Supports body password, `x-admin-password`, and `Authorization: Bearer ...`.
- Seeded Tutorial posts are available in English and Thai:
  - `/blog/EN/how-to-create-free-qr-code/`
  - `/blog/th/how-to-create-free-qr-code/`
  - `/blog/EN/how-to-convert-jpg-png-webp-free/`
  - `/blog/th/how-to-convert-jpg-png-webp-free/`
  - `/blog/EN/compress-image-to-100kb-500kb/`
  - `/blog/th/compress-image-to-100kb-500kb/`

Readiness changes applied:

- Migrated lint script from deprecated `next lint` to `eslint .`.
- Added `eslint.config.mjs` using `next/core-web-vitals`.
- Added homepage metadata base, canonical URL, and Open Graph metadata.
- Enabled `trailingSlash: true`; after bilingual migration, bare section routes redirect to Thai canonical routes such as `/tools/th/`.
- Added bilingual route metadata with canonical and `hreflang` alternates for Thai and English pages.
- Updated `public/sitemap.xml` to include the Thai and English canonical URLs instead of the old bare page URLs.

Validation completed:

- `npm ci` completed from the lockfile.
- `npm run lint` passed.
- `npm run build` passed.
- `npm run lint` passed again after SEO/tools-hub updates.
- `npm run build` passed again after SEO/tools-hub updates.
- `npm run lint` passed after blog/admin implementation.
- `npm run build` passed after blog/admin implementation.
- `npm run lint` passed after portfolio implementation.
- `npm run build` passed after portfolio implementation.
- `npm run lint` passed after bilingual Thai/English route migration.
- `npm run build` passed after bilingual Thai/English route migration.
- Production preview redirects `/` to `/th/`.
- Production preview returned `200 OK` at `/th/` and `/EN/`.
- Production preview rendered `/tools/` and screenshot was captured at `/tmp/djai-tools-hub.png`.
- After enabling trailing slashes, `/tools/` returns `200 OK` and `/tools` redirects to `/tools/`.
- Updated screenshot captured at `/tmp/djai-tools-hub-4192.png`.
- Rendered HTML contains the course-aligned header/footer labels and `mailto:contact@djai.academy`.
- Rendered HTML no longer contains `sales@djai.academy` or `Contact@djai.academy`.
- Desktop and mobile screenshots were captured under `/tmp` for visual inspection.
- Blog preview returned `200 OK` at `/blog/th/` and `/blog/EN/`.
- Blog article preview returned `200 OK` at `/blog/th/how-to-create-free-qr-code/`.
- Old English blog article URL `/blog/how-to-create-free-qr-code/` redirects to `/blog/EN/how-to-create-free-qr-code/`.
- Admin page preview returned `200 OK` at `/admin/blog/`.
- Portfolio preview returned `200 OK` at `/portfolio/th/` and `/portfolio/EN/`; `/portfolio/` redirects to `/portfolio/th/`.
- Services preview returned `200 OK` at `/service/th/`.
- Tools preview returned `200 OK` at `/tools/th/` and `/tools/EN/`; `/tools/` redirects to `/tools/th/`.
- Blog screenshots captured at:
  - `/tmp/djai-blog-page.png`
  - `/tmp/djai-blog-article.png`
  - `/tmp/djai-blog-admin.png`
- Portfolio screenshots captured at:
  - `/tmp/djai-portfolio-desktop-fixed.png`
  - `/tmp/djai-portfolio-mobile-fixed.png`
- Bilingual screenshots captured at:
  - `/tmp/djai-th-home.png`
  - `/tmp/djai-th-home-mobile.png`
  - `/tmp/djai-en-home.png`
  - `/tmp/djai-th-portfolio-delayed.png`
  - `/tmp/djai-th-service.png`
  - `/tmp/djai-th-service-mobile.png`
  - `/tmp/djai-th-blog-article.png`

Deployment note:

- The homepage currently builds as a standard Next.js app into `.next/`.
- It is not configured for static export yet.
- If the root Hostinger deployment must be static-only, add `output: "export"` and validate an `out/` upload.
- The admin blog backend requires a Node-capable deployment with write access to `data/blog-posts.json`.
- If deployed as static-only, `/blog/` can be generated from seeded data, but `/admin/blog/` and `/api/admin/blog/` cannot create posts.

## QR Generator state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/DJayTools-Free-QR-Generator-Source`

Framework/version:

- Next.js `16.2.6`

Important changes:

- Configured static export for `/tools/qrgen`.
- Thai default page is `/tools/qrgen/`; English page is `/tools/qrgen/en/`.
- Fixed base path and asset prefix.
- Fixed logo/image paths to work under `/tools/qrgen/`.
- Preserved old Vinext/Sites build command as `npm run build:sites`.
- Default Hostinger/static build now uses `npm run build`.
- Added production metadata:
  - canonical `https://djai.academy/tools/qrgen/` and English canonical `https://djai.academy/tools/qrgen/en/`
  - Open Graph/Twitter card metadata
  - SoftwareApplication JSON-LD with free `Offer`
- Added contextual internal links to:
  - `https://djai.academy/tools/resizeimg/`
  - `https://djai.academy/tools/th/`
  - `https://djai.academy/service/th/`
- Added footer ecosystem links to Siamese Cat Dev, Siamese Cat Creative Club, Siamese Cat Cafe, and Siamese Cat Hotel.

Validation completed:

- `npm run test:hostinger` passed.
- Static preview showed the QR UI and assets correctly.
- `npm run lint` passed with existing `<img>` performance warnings only.
- `npm run build` passed after SEO/link updates.
- Local rendered HTML contains the canonical, metadata, SoftwareApplication JSON-LD, and ecosystem links.
- Screenshot captured at `/tmp/djai-qr-tool.png`.

Hostinger upload target:

`public_html/tools/qrgen/`

Upload the contents of:

`DJayTools-Free-QR-Generator-Source/out/`

## Image Resizer state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/djai-image-resizer`

Framework:

- Dependency-free Node/static app.
- Browser-side image processing with Canvas and Blob APIs.

Important deployment changes:

- Target production paths: `/tools/resizeimg/` for Thai and `/tools/resizeimg/en/` for English.
- Added explicit HTML base path: `/tools/resizeimg/`.
- Confirmed server fallback supports `/tools/resizeimg/`, `/tools/resizeimg/en/`, and the old `/tools/Resizeimg/` path during transition.
- Updated README/server comments from the old `/tools/image-resizer/` wording.
- Corrected DJAI links:
  - Upcoming Courses: `https://djai.academy/course/`
  - Services: `https://djai.academy/service/`
  - Contact email: `contact@djai.academy`
  - Siamese Cat Dev credit: `https://djai.academy/siamese_cat/dev/`
- Added production SEO:
  - canonical `https://djai.academy/tools/resizeimg/` and English canonical `https://djai.academy/tools/resizeimg/en/`
  - Open Graph/Twitter metadata
  - SoftwareApplication JSON-LD with free `Offer`
- Repositioned the tool as a broader free image converter/resizer/compressor for JPG, PNG, and WebP.
- Added contextual ecosystem section with links to DJAI services, Siamese Cat Creative Club, Siamese Cat Cafe, and Siamese Cat Hotel.

Validation completed:

- Local preview returned `200 OK` at `/tools/resizeimg/`.
- Local preview returned `200 OK` at `/tools/resizeimg/en/`.
- Local preview returned `200 OK` at old `/tools/Resizeimg/` compatibility path.
- CSS, JS, and image assets returned `200 OK` under `/tools/resizeimg/`.
- Browser screenshot showed the image resizer UI and assets correctly.
- Static route strategy now targets lowercase `/tools/resizeimg/`; old `/tools/Resizeimg/` is compatibility only.
- Static Hostinger-style preview loaded CSS and JS correctly.
- `node --check public/app.js` passed.
- `node --check server.js` passed.
- Refreshed static route checks for `/tools/resizeimg/` and `/tools/resizeimg/en/`.
- Screenshot captured at `/tmp/djai-resize-tool.png`.

Hostinger upload target:

`public_html/tools/resizeimg/`

Upload the contents of:

`djai-image-resizer/public/`

## Siamese Cat Dev Bio state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/Siamese-Cat-Dev-Bio-Site`

Framework:

- Vite/React

Important changes:

- Configured Vite base path as `/siamese_cat/dev/`.
- Thai default page is `/siamese_cat/dev/`.
- English page is `/siamese_cat/dev/EN/`.
- Build script now copies a static English entry to `dist/EN/index.html` with English metadata.
- Fixed public image references to use the configured base URL.
- Added canonical URL, Open Graph/Twitter metadata, and Organization JSON-LD.
- Replaced public-facing Google share URLs with direct website links for:
  - `https://siamesecat.cafe/`
  - `https://creative.siamesecat.cafe/`
  - `https://hotel.siamesecat.cafe/`
- Footer now includes direct links to DJAI Academy, Free DJAI Tools, Siamese Cat Cafe, Creative Club, and Cat Hotel & Learning Center.
- Added Siamese Cat Creative Club as a third ecosystem/place card.

Validation completed:

- `npm run build` passed.
- Static preview showed the bio UI and assets correctly.
- `npm run build` passed after SEO/link updates.
- Vite build passed after Thai/English split.
- Generated `dist/index.html` has Thai metadata.
- Generated `dist/EN/index.html` has English metadata.
- Vite preview served metadata and direct ecosystem links at `/siamese_cat/dev/`.
- Headless Chrome rendered the page shell; Framer Motion keeps initial opacity in immediate headless screenshots, but the served DOM contains the expected hero/content/link markup.

## SEO and backlink strategy now applied

The implemented approach is intentionally conservative:

- Use free tools as indexable, useful content pages with clear titles, descriptions, canonical URLs, and structured data.
- Link between related tools through a `/tools/` hub instead of scattering keyword-heavy links everywhere.
- Add ecosystem links only where a visitor would reasonably expect them:
  - tools hub
  - tool footer/ecosystem sections
  - Siamese Cat Dev profile places/footer
- Keep outbound links editorial and normal; do not use paid-link patterns, automated link exchanges, or large repeated footer blocks.
- DA/DR can be tracked as third-party metrics, but the practical goal is useful indexed pages, internal discoverability, and legitimate referral paths.

Hostinger upload target:

`public_html/siamese_cat/dev/`

Upload the contents of:

`Siamese-Cat-Dev-Bio-Site/dist/`

## DJAI Course state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/djai-academy-course`

Framework/version:

- Next.js `15.5.20`

Important deployment changes:

- Configured static export for `/course`.
- Thai default page is `/course/`.
- English page is `/course/en/`.
- Added `basePath: "/course"` and matching asset prefix.
- Fixed image paths to use `/course/assets/...`.
- Added `/course`-safe icon metadata.

Header/footer changes applied only to this course project:

- Header now uses the same homepage-style glass navigation pattern:
  - DJAI Academy logo link
  - Upcoming Courses
  - Community
  - Development dropdown:
    - Services
    - Promo
    - Portfolio
  - Tools
  - Blog
  - Primary button: `Join Community`
  - Mobile hamburger menu behavior via `app/SiteHeader.jsx`

- Corrected header/footer links:
  - Tools: Thai `/tools/`, English `/tools/en/`
  - Services: Thai `/service/`, English `/service/en/`
  - Courses: Thai `/course/`, English `/course/en/`
  - Community: Thai `/course/#community`, English `/course/en/#community`
  - Portfolio: Thai `/portfolio/`, English `/portfolio/en/`
  - Promo: Thai `/course/#pricing`, English `/course/en/#pricing`
  - Development: Thai `/development/`, English `/development/en/`
  - Blog: Thai `/blog/`, English `/blog/en/`

- Footer now uses 4 columns:
  - Learn
  - Build
  - Community
  - Contact

- Newsletter section added:
  - Text: `Subscribe to our weekly newsletter`
  - Email input
  - Subscribe button
  - Popup form

Newsletter limitation:

- The popup is frontend-only for now because no newsletter backend/form endpoint was provided.

Contact limitation:

- WhatsApp, LINE, Facebook, Instagram, TikTok, and X are labels only because exact profile/contact URLs were not provided.
- Email is linked with `mailto:contact@djai.academy`.

Latest pricing/payment update:

- Course price changed to `THB 5,999` per pax.
- Previous comparison price changed to `THB 8,999`.
- All course reservation CTAs now point to Stripe checkout:
  - `https://buy.stripe.com/aFa28r2F21L7dkxb0LgIo01`
- FAQ reservation answer now references secure Stripe payment instead of email reservation.

Validation completed:

- `npm run build` passed.
- `npm run build` passed again after header/footer, price, and Stripe CTA updates.
- `npm run build` passed after Thai default and `/course/EN/` implementation.
- Static preview returned `200 OK` at `/course/`.
- Exported HTML contains the requested header/footer/newsletter text.
- Exported HTML contains corrected DJAI links.
- Exported HTML has no root `/assets/...` references.
- Header screenshot check looked intact.
- Refreshed static preview folder at `/tmp/djai-course-preview/course/`.
- Static preview returned `200 OK` at `http://127.0.0.1:4180/course/`.
- Desktop screenshot captured at `/tmp/djai-course-updated-desktop.png`.
- Mobile screenshot captured at `/tmp/djai-course-updated-mobile.png`.

Hostinger upload target:

`public_html/course/`

Upload the contents of:

`djai-academy-course/out/`

## Main deployment note

The DJAI homepage repo is now present in this workspace. It currently builds as a standard Next.js app.

Production routing must serve these static folders before the homepage Next.js app catches routes:

- `/tools/qrgen/`
- `/tools/resizeimg/`
- `/siamese_cat/dev/`
- `/course/`

If Hostinger managed Node routes all traffic to the homepage app, either:

1. Configure static path exclusions for these folders, or
2. Integrate these pages into the homepage Next.js project.

If the homepage is deployed as static files instead of a managed Node app, validate a static homepage export and upload it to `public_html/` without overwriting the existing subpage folders.

## Useful build commands

Homepage:

```bash
cd /home/siamesedev/Documents/Siamese_Cat_Dev/djai-academy-homepage
npm run build
```

QR Generator:

```bash
cd /home/siamesedev/Documents/Siamese_Cat_Dev/DJayTools-Free-QR-Generator-Source
npm run build
```

Bio Site:

```bash
cd /home/siamesedev/Documents/Siamese_Cat_Dev/Siamese-Cat-Dev-Bio-Site
npm run build
```

Course Site:

```bash
cd /home/siamesedev/Documents/Siamese_Cat_Dev/djai-academy-course
npm run build
```
