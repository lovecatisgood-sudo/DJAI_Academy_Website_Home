# Sitewide SEO predeployment report

Date: 2026-09-02

## Release candidate

- Branch: `codex/djai-sitewide-seo-growth`
- Tested content candidate: `2fdc495`
- Integration implementation commit: `e898e40`
- Reconciled source base: `6e17faf` (`origin/main` at program start)
- Production deploy: **not performed**

The deployable application source is represented by `2fdc495`; deployment must still use the final reviewed branch head so the audit record travels with the release. The last source-only cleanup removes an unreferenced legacy PDF promotion component and adds a focused absence contract; the built route graph is unchanged.

## Automated quality result

| Area | Result | Evidence |
| --- | --- | --- |
| Root regression and SEO contracts | PASS | Full `npm test` passed after the exact-source assembly, including ownership, conversion, commercial-intent, Cam PDF, PDF/QR routing, course ownership, and sitewide integration contracts. |
| Homepage content and boundaries | PASS | Blog (2), tool discovery (1), and onboarding/School-boundary (6) tests passed. The plan's `test:contact` command is not present; `test:onboarding` is the available route-boundary suite. |
| Homepage lint | PASS with baseline warnings | Zero errors; 12 existing `no-img-element` warnings. |
| PDF tools | PASS | 12 tests, zero-error lint, and 78-route production build. |
| QR tools | PASS | 11 tests, zero-error lint, and 42-route production build. Thirteen existing image-element warnings remain. |
| Document/AI/spreadsheet tools | PASS | 11 tests, zero-error lint, and 123-route production build. |
| Image tools | PASS | 46 tests and 85-page multilingual build. |
| Media tools | PASS | 8 tests and 116-page build. |
| Paid course | PASS | 5 registration tests and 12-route build, including locale post-processing verification. |
| Siamese Cat Dev courses | PASS | 10 tests and production build for public course discovery routes. |
| Formatting | PASS | `git diff --check` passed. |

The first package-test attempt after the root production build could not resolve several test libraries because `build-hostinger.mjs` deliberately removes child dependency trees after preserving production runtime dependencies. Running each affected package's lockfile-backed `npm ci` restored `pdf-lib`, `@libpdf/core`, and `gpt-tokenizer`; the complete PDF and document suites then passed. This is a test-environment sequencing constraint, not a product assertion failure.

## Assembled production output and crawl comparison

The final full local assembly built 449 static index pages and passed AdSense recovery checks.

| Measure | Reconciled baseline | Candidate | Result |
| --- | ---: | ---: | --- |
| Audited public pages | 323 | 323 | No route loss |
| Redirects | 22 | 22 | Stable |
| Sitemap URLs | 345 | 345 | Stable |
| Sitemap URLs reachable from home | 345 | 345 | No sitemap orphan |
| Slash redirects | 268 | 268 | Stable |
| Internal links/assets checked | 520 | 522 | Two additional valid graph edges |

The candidate audit also verifies the canonical host, mounted application paths, admin API authentication boundaries, representative language/H1/canonical metadata, sitemap last-modified expectations, and internal targets/assets. It passed with no introduced 4xx/5xx, missing mounted locale artifact, or unreachable sitemap URL.

The initial candidate crawl found two cross-application link problems before the pass: QR links could inherit the QR app base path, and document tools linked to nonexistent localized course catalogs. Both source defects were fixed and covered by the integration contract.

## DJAI publication scorecard

| Review area | Status | Finding |
| --- | --- | --- |
| Development vs Service intent | PASS in source/output | TH/EN/VI Development owns the product-build partnership; Service is a category chooser with a different promise, schema description, and conversion job. |
| Cam PDF product acquisition | PASS in source/output | The English Android product page uses verified capabilities, the published Play destination, tracked install CTAs, and page-matched MobileApplication data. Unsupported iOS copy is absent. |
| Cam PDF workflow guides | BLOCKED by evidence | No guide was published. Ordered workflow, output, failure/recovery evidence and Thai fluent review are still incomplete. This is the correct safe release state. |
| PDF and QR entry tasks | PASS in tests/output | Task controls remain primary; related tasks precede contextual Cam PDF acquisition. URL-to-QR and image-to-PDF promises remain distinct. |
| Other tool families | PASS in tests/output | Document, AI, spreadsheet, image, and media routes retain task-specific behavior and deterministic contextual routing. |
| Public courses vs School | PASS in source/output | Main-domain pages own discovery/evaluation. School is the account, reservation, and authenticated-learning destination. Paid landing/detail, free live course, and catalog jobs remain distinct. |
| Metadata, canonicals, sitemap, schema | PASS structurally | Integration and crawl contracts pass; course locale/Open Graph/schema inheritance was corrected. |
| CTA and measurement contract | PASS in source | Allowlisted payload-free events cover tool completion/download, Play clicks, Development enquiry starts, and course starts. |
| Accessibility and responsive presentation | PARTIAL | Semantic/source checks and zero-error lints pass, but mobile/desktop screenshots, keyboard flow, and browser accessibility inspection were not run. |
| Thai/Vietnamese editorial quality | BLOCKED for human approval | Technical locale signals pass. Fluent human editorial review is still required before production approval. |
| Rich-results eligibility | PARTIAL | JSON-LD parses and matches page URLs/types in local contracts; Google's Rich Results Test has not been run. |

## Open release blockers

1. Obtain fluent-human approval for changed Thai and Vietnamese public copy.
2. With action-specific browser permission, inspect representative desktop/mobile routes, keyboard/accessibility behavior, tool success flows, and CTA destinations.
3. In a consented non-production or staging session, verify analytics event names/parameters without uploading personal documents.
4. Validate eligible structured data with Google's Rich Results Test.
5. Confirm the exact production-before SHA and authorize deployment to the auto-deploying branch.

No browser, authenticated dashboard, Search Console, Analytics, Play Console, push, merge, or production deployment was performed.

## Dependency and forecast note

Package installation continues to report pre-existing high-severity advisories in several Next.js/application dependency trees. No automatic upgrade was attempted because it is outside this SEO release and may be breaking. Search Console, Analytics, and Play acquisition exports are still absent, so traffic uplift and keyword difficulty remain strategic estimates rather than measured forecasts.
