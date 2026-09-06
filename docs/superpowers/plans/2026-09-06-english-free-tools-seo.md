# English Free Tools SEO Implementation Plan

> Scope: English working-tool routes on `www.djai.academy` only. Thai, Vietnamese, Simplified Chinese, and Traditional Chinese copy are deliberately out of scope for this phase.

**Goal:** Give every English working tool one non-competing long-tail search intent, improve the highest-opportunity result titles and descriptions with verified benefits, and strengthen crawl paths from the English tools hub to those pages and onward to Cam PDF or development services.

**Architecture:** Keep each tool's existing source generator and runtime behavior. Enrich the central keyword-ownership manifest from one deterministic English tool-intent module, validate it with a dedicated contract test, then update only English metadata and English hub links in the owning packages. Do not post-process deployed HTML.

**Safety rules:** Never claim exact target size where output is approximate; never claim unlimited use or no file-size limit; use no-upload, no-account, no-watermark, static/no-expiry, and local-processing language only where the implementation supports it.

## Task 1: Lock the English keyword and claim contract

**Files:**
- Create: `tests/english-tool-search-contract.test.js`
- Create: `scripts/seo/enrich-english-tool-keywords.mjs`
- Modify: `scripts/seo/sync-keyword-ownership.mjs`
- Modify: `data/seo/keyword-ownership.json`

1. Add a failing contract requiring all 92 indexable English `working_tool` rows to have one distinct long-tail primary query, at least three distinct supporting queries, a non-strategy evidence level, and no unsafe claim language.
2. Add hand-curated primary intents for every tool family with custom overrides for exact-size compression, frame extraction, favicon generation, email QR, and video-to-text.
3. Enrich only English working-tool rows during the existing ownership sync; preserve every non-English row byte-for-byte in meaning and values.
4. Run the focused contract and keyword-ownership validator.

## Task 2: Improve English search-result copy at proven opportunity pages

**Files:**
- Modify: `djai-media-tools/src/video-tools-config.json`
- Modify: `djai-image-resizer/scripts/generate-seo-pages.mjs`
- Modify: `DJayTools-Free-QR-Generator-Source/app/qr-tool-data.ts`
- Modify: `djai-document-tools/app/brand/favicon-generator/en/page.tsx`
- Test the owning package outputs and metadata.

1. Improve titles/descriptions for the English GIF-to-MP4, video cropper, video resizer, frame extractor, and 10/25/50/100 MB target pages.
2. Make 100/200/500 KB image descriptions explicitly state approximate output and browser processing.
3. Strengthen the email QR description around recipient, subject, message, static output, PNG/SVG, and no sign-up.
4. Strengthen favicon copy around the complete ICO/Apple/PWA/manifest ZIP package.
5. Keep visible tool controls, layout, and non-English records unchanged.

## Task 3: Strengthen English crawl paths and conversion journeys

**Files:**
- Modify: `djai-academy-homepage/app/tools/en/page.jsx`
- Modify existing tests where necessary.

1. Keep all category hub links.
2. Reorder the existing popular-workflow link list around Search Console opportunity pages, while retaining coverage for PDF, QR, image, document, AI, spreadsheet, and core media tasks.
3. Use descriptive anchor text that matches each page's owned intent.
4. Keep the existing Cam PDF callout and development bridge; no visual redesign.

## Task 4: Build and verify the assembled site

1. Run focused English SEO tests first.
2. Run package tests for modified generators.
3. Run `npm run build`, `npm run verify:hostinger`, and `npm test`.
4. Inspect generated English titles, descriptions, canonicals, hreflang, direct links, and response routes.
5. Review `git diff` for non-English changes and unsafe claims. Do not deploy in this phase.

