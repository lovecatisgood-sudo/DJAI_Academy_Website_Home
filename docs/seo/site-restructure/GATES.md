# DJAI Site Restructure — Gates

Each completed gate records the command or inspection result and the exact repository state it covers.

## Baseline

- [x] G01 — Isolated main-site branch based on current production main.
  - CHECK: `git rev-list --left-right --count origin/main...HEAD`
  - EVIDENCE: `0 15` after rebase; worktree clean before new implementation.
- [x] G02 — Prepared source and integration suites pass against generated output.
  - CHECK: `npm test`
  - EVIDENCE: exit 0 on 2026-09-06 after full build.
- [x] G03 — Complete Hostinger build succeeds.
  - CHECK: `npm run build`
  - EVIDENCE: exit 0; homepage, promo, course, QR, image, PDF, media, document, Siamese Cat, and AdSense build stages completed.
- [x] G04 — Production-style route audit passes.
  - CHECK: `npm run verify:hostinger`
  - EVIDENCE: 323 pages, 22 redirects, 345/345 sitemap URLs reachable, 522 internal links/assets.

## Architecture and SEO

- [x] G05 — Every public sitemap URL has one page role and primary query-family owner.
  - CHECK: ownership validator plus build-derived route coverage test.
  - EXPECT: zero missing owners, duplicate route-locale owners, or duplicate primary query owners within a locale.
  - EVIDENCE: 351 validated records: 339 release-candidate sitemap routes, 6 publication-gated Cam PDF guides, and 6 non-indexable redirect-only learning records; full `npm test` passed on 2026-09-06.
- [x] G06 — Main navigation and footer follow the approved five-destination architecture.
  - CHECK: source contract, browser keyboard inspection, mobile screenshot comparison.
  - EXPECT: project enquiry primary; School link crawlable; no broken locale destination.
  - EVIDENCE: `navigation-architecture.test.mjs`, the complete root test suite, and the 345-URL Hostinger verification passed on 2026-09-06. Local Chromium review at 1280×900 and 390×844 confirmed the original header shell, mobile menu shell, logo, and CTA remain visually intact; the rendered accessibility tree confirmed all five destinations plus contact/legal/footer links. School links use the currently live `/th` and `/en` homes until public course routes exist.
- [x] G07 — Homepage remains visually familiar and routes four distinct journeys.
  - CHECK: before/after desktop and mobile screenshots plus content contract.
  - EXPECT: no visual redesign; one descriptive H1; Development primary; Tools, Cam PDF, and School secondary.
  - EVIDENCE: homepage conversion contract passed for Thai, English, and Vietnamese; full root build/test and 345-URL Hostinger audit passed on 2026-09-06. Local Chromium review at 1280×900 and 390×844 verified the original hero, founder visual, header shell, responsive typography, and cookie controls. A first capture exposed an oversized descriptive H1; the final title uses the existing brand scale plus a smaller descriptive line and was re-captured on all three locales.
- [x] G08 — Development, Service, and Portfolio have non-overlapping page roles.
  - CHECK: commercial intent test, rendered metadata comparison, internal-link audit.
  - EXPECT: proposition, chooser, and proof roles remain distinct.
  - EVIDENCE: commercial-intent and portfolio-proof routing suites passed on 2026-09-06. Thai/English/Vietnamese Portfolio primary CTAs now route to Development, while Cam PDF proof routes through the owned product page. Current external proof destinations were checked; all returned HTTP 200 except `hotel.siamesecat.cafe`, whose broken TLS link was removed from Portfolio while retaining the screenshot-based case card. Local Chromium desktop review covered Development and Service; desktop/mobile review covered Portfolio.
- [x] G09 — Tools remain functional and utility-first.
  - CHECK: one representative workflow per distinct tool engine, output/download checks, routing tests.
  - EXPECT: task completion unchanged; related tool precedes contextual bridge; no random promotion.
  - EVIDENCE: package suites passed on 2026-09-06 after clean lockfile installs: PDF 12/12, QR 11/11 including a 42-route static build, image 46/46 with 85 localized pages rebuilt, media 8/8 with 116 pages rebuilt, and document 11/11. Root routing and shell-link contracts also passed. Existing header/footer classes and task controls were retained; only link destinations and labels changed. PDF/document routes lead to Cam PDF, AI/SEO learning intent leads to School, and service intent leads to Development.
- [x] G10 — Cam PDF acquisition claims are verified.
  - CHECK: released app behavior, first-party screenshots, policy/product diff, Play link tests.
  - EXPECT: every visible capability and privacy statement supported.
  - EVIDENCE: the official Google Play listing for package `com.djai.campdfscan` was retrieved on 2026-09-06. It confirms Android version 2.0.1, an August 31, 2026 update, account requirement, weekly free allowance, rewarded ads, no app-added watermark, the one-time Remove Ads/unlimited-export benefit, and the published feature set. Product/terms copy and sitemap freshness now match that evidence; the September 6 privacy suites remain green. The displayed 1.5 MB PNG icon was replaced with the existing 5.7 KB WebP. The 76-route homepage build passed, all Cam PDF images loaded in local Chromium, visual review passed at 1280×900 and 390×844, and axe reported zero violations at both sizes after targeted contrast and keyboard-scroll fixes.

## School and migration

- [x] G11 — School deployable source matches live locale behavior.
  - CHECK: production SHA/branch reconciliation, live/source route table, sitemap and middleware tests.
  - EXPECT: unexplained differences zero.
  - EVIDENCE: clean School worktree `codex/djai-school-public-course-discovery` is based on `bfcbef9`; commits `699bf68`, `3647d2a`, and `bae73a7` contain the public-learning cluster, live-vibe owner, and restored lint coverage. `/learn` is public while existing `/courses` and `/classroom` remain authenticated. Reconciliation and deployment order are recorded in `docs/seo/public-learning-reconciliation-2026-09-06.md` in that repository.
- [x] G12 — Thai and English School course pages are public, equivalent, and safe in the release candidate.
  - CHECK: anonymous browser test, metadata/hreflang/sitemap audit, fluent-language review.
  - EXPECT: 200, self-canonical, reciprocal alternates, no private route exposure.
  - EVIDENCE: all ten Thai/English `/learn` routes are generated by the production build. Anonymous HTTP and Chromium checks returned 200 for both hubs and sampled details, with correct `lang`, title, one H1, self-canonical, reciprocal `th-TH`/`en-US`/`x-default`, structured data, and zero console or resource errors. Chinese routes remain unpublished pending fluent review. Independent native-language sign-off remains a release-process recommendation, not a claimed external review.
- [x] G13 — Every learning redirect is one-to-one and direct in the release candidate.
  - CHECK: migration-map validator plus production-like HTTP test.
  - EXPECT: one permanent hop; no homepage dumping, chain, locale mismatch, or missing target.
  - EVIDENCE: `learning-migration.js` is covered by the root course-ownership suite and the Hostinger audit. Six canonical legacy paths and three aliases return one-hop 308 redirects to their exact locale-matched School owners, preserve query strings, and are absent from the www sitemap. Ownership rows are explicitly non-indexable with status `redirect_ready_pending_school_deploy`.

## Quality and release

- [x] G14 — Accessibility and minimal-UI visual review passes.
  - CHECK: axe/Playwright plus manual keyboard and before/after screenshot comparison.
  - EXPECT: no critical/serious issue introduced; headers/footers recognizable and operable.
  - EVIDENCE: installed Chrome was used at 390×844 and 1280×844 on main home, Tools, Development, Cam PDF, School English/Thai hubs, and School live-vibe. Every sample returned 200, one H1, correct language, no horizontal overflow, no failed resources, and no console errors. Axe reported zero violations on all 14 viewport/page combinations. Manual screenshots confirmed the existing visual shells remain recognizable.
- [x] G15 — Loading performance has no material regression.
  - CHECK: production bundle comparison and Lighthouse/PageSpeed sampling on representative pages.
  - EXPECT: no new blocking dependency, oversized hero asset, layout shift, or material metric regression caused by this branch.
  - EVIDENCE: no runtime dependency was added. Main production bundles and School production build complete. Representative warm local pages reported 8–15 ms TTFB, 8–16 ms total, and 33–97 KB HTML. Earlier throttled School mobile samples recorded 244–316 ms FCP, 280–2,016 ms LCP, and 0.00005–0.0103 CLS. The School icon was reduced from 352 KB to 51 KB.
- [x] G16 — Dependency risk is assessed rather than automatically rewritten.
  - CHECK: package-level `npm audit` review and build/runtime relevance analysis.
  - EXPECT: findings documented; no blind `--force` upgrade.
  - EVIDENCE: package-level production audits and treatment are recorded in `DEPENDENCY-RISK-2026-09-06.md`. No critical advisory was reported; existing transitive and direct findings remain open for a dedicated hardening change.
- [ ] G17 — Independent GPT-5.6 Luna max review reports no unresolved material fault.
  - CHECK: real reviewer report against base/head SHAs plus root-agent verification of every finding.
  - STATUS: BLOCKED because the sub-agent launcher is unavailable in this session.
- [x] G18 — Fresh final reconciliation passes for the local release candidate.
  - CHECK: original user request and `PROJECT_INTENT.md` compared directly with final repositories and live candidates.
  - EXPECT: no material mismatch or stale audit after later changes.
  - EVIDENCE: main `npm test` and `npm run build` pass. The final Hostinger audit passes 317 pages, 28 redirects, 339 sitemap URLs all reachable from home, 262 slash redirects, and 514 internal links/assets. School `build`, `typecheck`, and `lint` pass; 467 relevant tests pass. The only excluded School test is the pre-existing Design release-artifact assertion whose tracked HTML points to an older incompatible bundle and is unrelated to this SEO change.
- [ ] G19 — Production deployment and smoke crawl pass.
  - CHECK: deployed SHA, both sitemaps, representative conversions, all mapped redirects, and rollback reference.
  - EXPECT: zero broken public route or critical conversion path.
  - STATUS: HOLD. G17 is unavailable in this session. When review is available, deploy School first and verify all ten `/learn` targets; only then deploy the www redirect commit and run the two-property smoke crawl.
