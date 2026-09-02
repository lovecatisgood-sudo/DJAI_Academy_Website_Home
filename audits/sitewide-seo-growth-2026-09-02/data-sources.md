# First-party SEO and acquisition data sources

## Import status on 2026-09-02

| Source | Status | Effect on implementation |
| --- | --- | --- |
| Google Search Console query/page export | Not supplied | Structural fixes, ownership contracts, technical SEO, and existing-route improvements may proceed. No `strategy_only` service child page may be published or described as validated demand. |
| Site analytics landing/conversion export | Not supplied | Privacy-safe event instrumentation may proceed. Baseline conversion rates and growth estimates remain unverified. |
| Google Play store-listing/acquisition export | Not supplied | The user-verified live listing may be linked. Country, search-term, visitor, acquisition, and conversion claims remain unavailable. |

Authenticated dashboard access was not requested or used. The implementation used repository evidence and terminal-only local verification.

## Required export schemas

CSV headers must use these fields before import:

```text
Search Console: date, page, query, country, device, clicks, impressions, ctr, position
Analytics: date, landing_page, sessions, tool_success, tool_download, cta_click, enquiry_start
Play: date, country, store_listing_visitors, acquisitions, conversion_rate, search_term when available
```

## Normalization rules

- Store dates as ISO `YYYY-MM-DD`.
- Normalize `page` and `landing_page` to a path with a leading slash and remove the origin only after preserving the raw export.
- Preserve query spelling in the source table; maintain a separate normalized query-family field for analysis.
- Keep locale, country, and device dimensions separate.
- Do not merge Thai, English, and Vietnamese query families merely because an English loanword appears in more than one locale.
- Do not record invented search volume, keyword difficulty, or conversion data in `keyword-ownership.json`.
- Promote an ownership entry to `verified_gsc` only when a dated import can be traced to the matching page/query evidence.
- Search terms, free-form user input, filenames, QR values, and document contents must never be sent through the new analytics event contract.

## Reconciliation procedure when exports arrive

1. Save the untouched exports outside public web roots.
2. Record export property, date range, filters, timezone, and retrieval date.
3. Normalize URLs to current canonical routes while retaining the raw source URL.
4. Compare query families by locale and landing page.
5. Flag multiple DJAI URLs receiving the same family for manual ownership review; do not automatically redirect or merge them.
6. Update only evidence-backed manifest rows to `verified_gsc` and record the supporting import filename and date in the execution ledger.
7. Re-run `node scripts/seo/validate-keyword-ownership.mjs` and the production crawl before publishing any new evidence-gated route.
