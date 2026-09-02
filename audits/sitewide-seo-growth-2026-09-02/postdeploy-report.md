# Sitewide SEO postdeployment report

Date: 2026-09-02

## Status

**NOT DEPLOYED — awaiting explicit production authorization and release-gate evidence.**

No branch was pushed or merged, no Hostinger deployment was triggered, and no production, Search Console, Analytics, Play Console, browser profile, or authenticated account surface was accessed. This report records the deployment boundary and the checks that must be completed after an authorized rollout; it is not postdeployment proof.

## Prepared candidate

- Application-source candidate: `2fdc495`
- Predeployment evidence commit: `75b1ddc`
- Branch: `codex/djai-sitewide-seo-growth`
- Local production assembly: PASS, 449 static index pages
- Local route audit: PASS, 323 pages and 345/345 sitemap URLs reachable from home
- Rollback procedure: `rollback.md`

## Required rollout record

When deployment is explicitly authorized, replace each `TBD` with evidence from that exact release:

| Field | Required value |
| --- | --- |
| Final release SHA | TBD |
| Production-before SHA | TBD |
| Hostinger deployment ID/time | TBD |
| `/healthz` result | TBD |
| Production crawl artifact | TBD |
| Structured-data validation artifact | TBD |
| Consented analytics validation | TBD |
| Thai/Vietnamese reviewer and approval | TBD |
| Rollback decision | TBD |

## Production smoke checklist

The authorized operator must verify:

1. canonical `www` redirect and `/healthz` readiness;
2. homepage, Development, Service, portfolio, Cam PDF, paid course, free course, and catalog;
3. one successful input/process/download flow for PDF, QR, image, media, document, AI, and spreadsheet families;
4. CSS/JavaScript plus PDF worker, FFmpeg, OCR, image-model, and other local runtime assets;
5. Google Play, Development enquiry, course registration, and DJAI School handoffs;
6. robots, sitemap, canonical, language/alternate, and JSON-LD signals;
7. no changed-route 4xx/5xx, accidental noindex, redirect loop, or mounted-app base-path error.

Any material failure invokes `rollback.md`.

## Monitoring windows

Monitoring starts from the successful production deployment timestamp, not from this local implementation date.

| Window | Required comparison | Metrics |
| --- | --- | --- |
| Day 7 | Release health vs production-before state | Index/canonical errors, crawl failures, tool completion/download events, Play clicks, enquiry starts, course starts |
| Day 28 | First full post-release period vs immediately preceding 28 days | Impressions, clicks, CTR, average position, query-owner URL, tool success, Play clicks, Development enquiries, course starts |
| Day 90 | Longer trend plus cannibalization review | Same metrics, owner-URL drift, duplicate-query landing pages, guide/service-child opportunities supported by first-party data, content refresh decisions |

Segment by route family and locale. Do not report a traffic increase as caused by this release without ruling out seasonality, campaign activity, index changes, and other site releases. Search-volume and keyword-difficulty assumptions remain hypotheses until first-party and reputable keyword evidence is available.

## Current monitoring baseline

Search Console query/page exports, analytics conversion exports, and Play acquisition exports have not been supplied. Therefore numeric baselines are `TBD`; no growth percentage has been manufactured. The versioned ownership map and local crawl provide the structural baseline only.
