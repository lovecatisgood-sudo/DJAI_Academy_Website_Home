# DJAI low-value-content and ads.txt investigation - 26 October 2026

## What Google actually says

Signed-in AdSense, publisher pub-3624708289866566, lists djai.academy as Needs attention / Low value content, with ads.txt Not found and site last-updated31August2026. The expanded notice mentions authentic useful information/tools/services, ongoing curation/maintenance and genuine user interest. It does not identify a URL or prove that any specific current page caused rejection. Do not equate low value with number of tools, shared templates, use of AI, keyword competition, word count or domain authority.

## ads.txt findings

`ads-txt-access.json` records all four root/www HTTP/HTTPS paths resolving to the exact record displayed by the signed-in account, plain text200, ASCII, with robots allowing access. Apex and HTTP redirects end at www HTTPS. Simulated Googlebot and Mediapartners header requests return200; these are not real Google-IP crawler tests or server-log evidence. Correct file content was preserved. Stale Google status is plausible, not confirmed; Google's own guidance allows delayed recognition and advises against replacing a correct file. No Check for updates control was exposed in the inspected rejected-site detail view; ownership methods and Request review were visible. Do not claim Authorized or silently attest all policy issues are fixed.

Sources checked: https://support.google.com/adsense/answer/10015918 , https://support.google.com/adsense/answer/12171612 , https://support.google.com/adsense/answer/7679060 .

## Current site evidence

`live-after.json` is the post-runtime-repair, pre-content-update public crawl. All363sitemapURLs return intended public HTML, all363 are reachable from home, and the parser reports zero technical issues. This is not a qualitative AdSense acceptance score. The site has substantial original-product guides and technical articles; a Claude Opus5 article's release/pricing claims were checked against official Anthropic sources rather than presumed false.

Concrete defects: spreadsheet/AI pages reused a Word-layout FAQ; file-only tools instructed pasting without a text input; RAG instructions did not match its paste-only controls; some Word/PDF output claims overstated preservation or preview availability. Course pages still advertise22August2026 as upcoming with paid reservations. These are current quality/maintenance issues, not proven historical causes of Google's rejection.

## Scoped repair

See `content-repair-manifest.json` and `seo/briefs/2026-10-26-tool-help-quality.yaml`.
-18English pages receive task-specific steps, actual input/output details, useful limitations and FAQs. Correct misleading generic instructions/irrelevant FAQs on existing Thai/Vietnamese pages. Preserve current locale structure and Chinese review gate.
-Correct DOCX-to-PDF preview, DOCX-to-Markdown table, PDF-to-AI repeated-header and Context Optimizer page-boundary claims. Remove unverified3-minute HowTo duration. Freshness changes only55substantively changed suite pages; existing token-counter English/Thai content is preserved apart from unsupported schema duration removal.
-ExcelJS imports use the default export for consistent CommonJS interoperability. Algorithms and visible controls remain intact. An initial RAG-file finding was withdrawn after browser inspection showed an intentional paste-only UI; no RAG input/processor change remains.
-No mass noindex, merged tools, extra keyword pages, header/footer/style changes, new dates or price changes.

## Verification at preparation checkpoint

Document package tests20/20, lint/build and root localization checks pass. Independent Luna max re-review reports no remaining findings. Exact55-date sitemap test passes, with stale Thai app-policy expectations corrected to the existing noindex contract. Full root production builds and regression suite also passed, including the added sitemap/locale test and an updated exact-wording assertion that retains the PDF-for-RAG intent without unsupported cleanup promises. Composite route audit passed327routes,28redirects,363reachable sitemapURLs and562links/assets; final rebuild receives the same release audit before publication.

Local browser fixtures: CSV-to-JSON visibly preserves001 and a quoted comma; RAG pasted text produces a chunk and download link; CSV-to-XLSX creates a downloadable workbook. The actual downloaded sample.xlsx was reopened with ExcelJS and verified to contain two rows, the Data worksheet, code001 and Tea, green. Browser chunk-loading failure during an intermediate rebuild disappeared after reloading the completed build; do not classify that stale local-page state as a production defect. Screenshot proof: /tmp/djai-csv-quality-proof.png .

## Pending owner input and external decision

The owner answered that a new workshop date is confirmed and will provide it. Actual date/time has not arrived yet; venue/price changes were requested only if applicable. Do not mark the cohort archived or invent the replacement date. Leave course pages unchanged until it arrives, then update visible copy, metadata, schema and matching locale pages consistently and check the School reservation handoff before publication.

No AdSense review request has been submitted and ad serving stays paused. Once factual maintenance issues and release verification are complete, use the account's actual available recheck/review path once; preserve a pending review. Only Google can approve the site. This local report initially precedes the content release; append exact source/deployment evidence after publishing.
