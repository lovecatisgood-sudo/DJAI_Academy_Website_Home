# Source reconciliation — 2026-09-02

## Execution base

- Clean worktree: `website_DJAI_HOME/.worktrees/djai-sitewide-seo-growth`
- Branch: `codex/djai-sitewide-seo-growth`
- Baseline: `6e17faf` (`origin/main` at reconciliation time)
- Shared checkout: left untouched on its existing dirty `main` branch

## Relevant shared-checkout changes

| Source | Classification | Reconciliation |
| --- | --- | --- |
| `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/page.jsx` | Partly already on `origin/main`; remaining edits require claim/support review | The published Google Play URL, live-release wording, and `installUrl` already exist upstream. The shared edit removes the unverified planned-iOS claim and changes support from email to the contact route; those two details will be handled through claim verification and the later product-page task, not copied wholesale. Formatting-only changes are excluded. |
| `djai-academy-homepage/app/components/blog/ScannerBuildStoryEvidence.jsx` | Already represented upstream or requires editorial verification | Upstream already treats Cam PDF as released. No prose was copied because feature, watermark, and release claims must be checked before publication. |
| `djai-academy-homepage/data/blog-posts.json` | Requires verification and planned editorial implementation | The shared checkout contains an English/Thai release article with product-feature, free/no-watermark, and roadmap claims. It is not copied. The approved guide cluster will be created from verified evidence in Task 5, with Thai held for fluent-human review. |
| `tests/cam-pdf-play-store-links.test.js` | Already superseded on `origin/main` | Upstream contains `tests/cam-pdf-play-store-links.test.mjs`, which passes and verifies the published listing across the existing acquisition surfaces. Future tests will prefer rendered/behavior contracts where practical. |
| `djai-academy-homepage/tests/cam-pdf-release-article.test.mjs` | Not applied; planned coverage requires verified content | The test expects English, Thai, and Vietnamese release content that is not present on the clean baseline. Locale publication and journey coverage will be implemented only with reviewed content and corresponding production routes. |
| `djai-pdf-tools/app/PdfToolsApp.tsx` | Already on `origin/main` | The existing Cam PDF CTA already uses the published Play listing. Placement and deterministic post-success routing remain part of the PDF pilot. |
| `DJayTools-Free-QR-Generator-Source/app/page.tsx` | Already on `origin/main` | The Thai QR surface already uses the published Play listing. Its random promotion flow remains scheduled for deterministic routing in the QR pilot. |

## Baseline evidence

Executed from the clean worktree before SEO implementation:

- `npm ci` — PASS
- `npm run test:cam-pdf-links` — PASS
- `npm run test:supervisor` — PASS
- `npm run test:localization` — PASS
- `npm run test:course-interest` — PASS
- `npm run build` — PASS; Hostinger assembly completed and AdSense recovery verified across 449 static index pages

The build reported existing dependency audit warnings in several packages. They are recorded as baseline maintenance debt and were not changed as part of source reconciliation.

## Claim decisions carried forward

- The Google Play listing URL is verified by the user and existing source.
- The iOS roadmap is not treated as verified and must not be amplified.
- “Free,” “no watermark,” exact privacy behavior, supported formats, and individual feature claims require product or repository evidence before new public copy is published.
