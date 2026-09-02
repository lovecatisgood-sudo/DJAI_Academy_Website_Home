# Sitewide SEO integration baseline

Date: 2026-09-02

## Outcome

The implemented discovery clusters now assemble as one crawlable `www.djai.academy` property without inventing locale routes or moving authenticated learning onto the public site. Development remains the main commercial proposition, Service handles broader early-stage requests, tool routes preserve task intent, Cam PDF receives contextual Android acquisition, and public course pages hand authenticated learning to DJAI School.

## Locale and equivalence policy

- `locale-map.json` is the explicit source of truth for changed route families.
- Missing translations are omitted rather than generated or linked speculatively.
- Thai, English, and Vietnamese equivalents are mapped only where reviewed routes exist.
- The Cam PDF product page and the Siamese Cat Dev catalog remain English-only until reviewed translations exist.
- Chinese route families remain outside the indexable acquisition program pending native review.
- The paid course export now emits the correct `html lang`, self canonical, and self Open Graph URL for Thai, English, and Vietnamese landing/detail pages.
- Course structured data is page-specific and no longer inherited globally by unrelated course routes.

## Discovery and conversion graph

- Development links to proof, and proof links to the relevant service enquiry path.
- Service links back to the product-development proposition when the request is suitable.
- PDF and QR success journeys keep the related task first, then expose a contextual Cam PDF or Development bridge.
- Other tool families route by completed workflow instead of showing a universal app/course promotion.
- Public paid and free course pages emit the privacy-safe `course_start` event before the DJAI School or registration handoff.
- The event payload is limited to stable route, locale, cluster, course, and destination-type identifiers.

## Defects discovered by the assembled crawl

The first production-output audit found two real cross-boundary routing errors in addition to stale test expectations:

1. The Vietnamese QR hub used Next.js `Link` for routes owned by other mounted apps. Its configured base path could prefix those targets with `/tools/qrgen/`. Those links are now root-relative HTML anchors.
2. The document-tool bridge linked to nonexistent `/siamese_cat/dev/courses/en/` and `/vi/` catalogs. English and Vietnamese now link to the existing English catalog, with the Vietnamese label disclosing that it is English; Thai links to the existing Thai free-course route.

The audit was updated only after the source defects were corrected.

## Automated evidence

- Complete repository test suite: passed, including 6 sitewide integration contracts.
- Homepage: lint passed with zero errors (12 existing image warnings); 76-route build passed.
- PDF tools: 12 tests and 78-route build passed.
- QR tools: 11 tests and 42-route build passed.
- Paid course: 5 tests and 12-route build passed; locale post-processing verification passed.
- Siamese Cat Dev: 10 tests and production build passed.
- Document tools: 11 tests and 123-route build passed.
- Final clean Hostinger assembly from the exact candidate source: 449 static index pages built.
- Hostinger audit after routing corrections: passed for 323 pages, 22 redirects, 345 sitemap URLs, 268 slash redirects, and 522 internal links/assets; all sitemap URLs were reachable from the home-page crawl graph.
- Complete repository test suite was rerun after the final assembly and passed.
- `git diff --check`: passed.

## Remaining release gates

- Thai and Vietnamese editorial quality still require fluent human review before production publication is approved.
- Runtime mobile/desktop screenshots, consented analytics inspection, and Rich Results Test evidence require browser access. No browser or authenticated account surface was opened because action-specific permission was not granted.
- Dependency installation continues to report pre-existing high-severity advisories in several packages. They were not auto-upgraded because dependency remediation is a separate, potentially breaking change.
