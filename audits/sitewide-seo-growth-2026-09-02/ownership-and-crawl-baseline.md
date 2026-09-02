# Ownership and local production crawl baseline — 2026-09-02

## Ownership contract

`data/seo/keyword-ownership.json` records 110 route-locale decisions for the first implementation wave:

| Locale | Entries | Notable coverage |
| --- | ---: | --- |
| English | 42 | Brand, Development/Service, portfolio, Cam PDF, course/vibe pages, 20 PDF surfaces, 8 QR surfaces, planned Cam guides |
| Thai | 39 | Brand, Development/Service, portfolio, courses, 20 PDF surfaces, 8 QR surfaces, planned Cam guides |
| Vietnamese | 29 | Brand, Development/Service, portfolio, courses, 12 PDF surfaces, and 8 QR surfaces |

The count reflects real route availability. PDF aliases currently exist in English and Thai, not Vietnamese. Cam PDF has one legacy English canonical product URL. Planned Cam guides remain `indexable: false` until their evidence and locale review gates pass.

## Current-to-proposed role reconciliation

| Surface | Current risk observed in source | Contracted owner/role |
| --- | --- | --- |
| `/development/` | Broad commercial copy overlaps the service overview | Primary build-partnership proposition and project-enquiry owner |
| `/service/` | Can repeat Development rather than help a visitor choose | Service-category chooser; it routes into Development without duplicating its hero |
| PDF tools and aliases | Similar templates make query-family collisions easy | One task or format family per canonical route; aliases retain narrow promises and declare competing routes |
| QR tools | Tool type is distinct, but post-task promotion is not deterministic | Each tool owns one QR input intent; cluster routing is Cam PDF first, Development second, after a related tool |
| Cam PDF | Product-name-led page, live Play listing, incomplete measurement | English product/install owner for Android document scanner, signing, and QR workflows |
| Cam workflow guides | Not yet published as evidence-backed guides | Distinct scan, signature, and document-photo problems; held from indexing until verified |
| Public vibe/course pages | Several learning offers could blur together | Paid masterclass, curriculum detail, free live course, catalog, and build-outcome pages each retain a separate role |
| `school.djai.academy` | Potential temptation to duplicate public discovery | Authenticated learning delivery only; public acquisition stays on `www` |

No search volume or keyword-difficulty figure was invented. All unmeasured commercial terms remain `strategy_only`; the four researched Thai opportunity families are `directional_external` until Search Console evidence is supplied.

## Local production crawl

Command:

```text
npm run verify:hostinger
```

Final result: PASS.

```text
Hostinger route audit passed: 323 pages, 22 redirects, 345 sitemap URLs
(345 reachable from home), 268 slash redirects, 520 internal links/assets,
admin API auth, and canonical host.
```

The first run exposed an existing broken internal link from the Vietnamese web-promo header to `/Cam_PDF_Scan_Signer_QR-Gen/vi/`. Root-cause tracing found that the promo locale mapper had invented locale-specific Cam PDF routes when Chinese navigation was added. The mapping now falls back to the real English canonical product URL for Thai, English, and Vietnamese while retaining the existing Chinese preview paths. The same production-route audit passed after the isolated change.

## Evidence limitations

- This is a local production-output crawl, not an authenticated Search Console index-coverage export.
- Search Console, analytics, and Play acquisition exports are still absent; see `data-sources.md`.
- Strategy-only service expansion, traffic forecasts, and keyword validation remain blocked on first-party evidence.
