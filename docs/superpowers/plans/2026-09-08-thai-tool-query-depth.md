# Thai Tool Query Depth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give all 92 indexable Thai tool pages distinct, natural Thai long-tail query ownership and strengthen the search-visible wording of the highest-value pages without adding URLs or changing the interface.

**Architecture:** Preserve the current Thai-unprefixed locale architecture and one canonical URL per real workflow. Store explicit route-level query assignments in a Thai query map, enrich the ownership manifest from that map, then update only existing titles, H1s, descriptions, and tool-hub labels on five priority pages.

**Tech Stack:** Node.js SEO scripts and tests, Next.js tool packages, generated static image-tool pages, JSON/static media configuration.

**Spec:** `seo/briefs/thai-tool-query-depth.yaml`

## Global Constraints

- Do not create keyword-variant URLs.
- Do not change tool algorithms, upload behavior, headers, footers, canonicals, hreflang, or sitemap membership.
- Do not invent search volume, difficulty, rank, traffic, or conversion estimates.
- Use claims such as free, no sign-up, no watermark, or local processing only where current code and behavior support them.
- Keep document, PDF, and QR tools routed to related tools then Cam PDF; route image, media, spreadsheet, and AI tools to related tools then Development.
- Production rollback remains commit `31f08652a126af69b33eb091cec1a01fec0e28e3`.

---

### Task 1: Enforce explicit Thai keyword ownership

**Files:**
- Create: `tests/thai-tool-search-contract.test.js`
- Create: `scripts/seo/thai-tool-query-map.mjs`
- Create: `scripts/seo/enrich-thai-tool-keywords.mjs`
- Modify: `scripts/seo/sync-keyword-ownership.mjs`
- Regenerate: `data/seo/keyword-ownership.json`

**Interfaces:**
- Consumes: the 92 Thai `working_tool` rows generated from the public route inventory.
- Produces: `THAI_TOOL_QUERY_TARGETS`, `enrichThaiToolKeyword(row)`, and `assignedThaiToolRoutes()`.

- [ ] Write tests requiring 92 explicit Thai assignments, three route-specific supporting queries, unique primary owners, dated directional evidence, and honest approximate wording for target-size tools.
- [ ] Run `node --test tests/thai-tool-search-contract.test.js` and confirm it fails because the Thai query map does not yet exist.
- [ ] Add a route-level Thai query map covering the exact existing inventory, including Thai search phrasing and recognizable English format terms.
- [ ] Wire Thai enrichment into `scripts/seo/sync-keyword-ownership.mjs`; throw when a Thai working-tool route lacks an explicit assignment.
- [ ] Run `node scripts/seo/sync-keyword-ownership.mjs --write` and rerun the focused test until all 92 rows pass.

### Task 2: Strengthen the five highest-value Thai search entries

**Files:**
- Create: `tests/thai-tool-metadata-opportunities.test.js`
- Modify: `djai-image-resizer/scripts/generate-seo-pages.mjs`
- Modify: `djai-document-tools/app/tool-data.ts`
- Modify: `djai-pdf-tools/app/tool-data.ts`
- Modify: `DJayTools-Free-QR-Generator-Source/app/qr-tool-data.ts`
- Regenerate: affected image-tool static output through the existing generator.

**Interfaces:**
- Consumes: the priority route targets in `seo/briefs/thai-tool-query-depth.yaml`.
- Produces: search-visible Thai title, H1, description, and keyword copy aligned with each actual tool.

- [ ] Write assertions for JPG/PNG/WebP background-removal wording, Word/DOCX-to-PDF wording, Thai OCR wording, PDF compression wording, and link-to-QR wording.
- [ ] Run the test and confirm the old wording fails the new assertions.
- [ ] Update only the existing localized copy fields; keep the interactive workspace and page hierarchy unchanged.
- [ ] Regenerate image-tool output and run the focused metadata tests.

### Task 3: Improve Thai hub anchors without changing layout

**Files:**
- Modify: `djai-academy-homepage/app/tools/page.jsx`
- Modify: `djai-academy-homepage/tests/tool-hub-taxonomy.test.mjs`

**Interfaces:**
- Consumes: the five priority tools and their existing hub cards.
- Produces: natural, destination-descriptive Thai anchor labels with unchanged routes and card structure.

- [ ] Add assertions for the priority Thai labels and hrefs.
- [ ] Run the hub test and confirm the old labels fail where wording changes.
- [ ] Update existing labels/descriptions only; add no cards or sections.
- [ ] Rerun the hub and metadata tests.

### Task 4: Regenerate and validate the SEO contracts

**Files:**
- Regenerate: `audits/site-restructure/public-route-inventory.json`
- Regenerate: `data/seo/keyword-ownership.json`

**Interfaces:**
- Consumes: built/rendered route metadata and explicit Thai query assignments.
- Produces: the current route inventory and one-owner keyword manifest.

- [ ] Run the existing route inventory command and `node scripts/seo/sync-keyword-ownership.mjs --write`.
- [ ] Run the ownership validator and both English and Thai query-contract tests.
- [ ] Confirm no new route, canonical, alternate, redirect, or sitemap entry exists.

### Task 5: Functional, technical, and visual verification

**Files:**
- Inspect: production build output and representative generated HTML.

**Interfaces:**
- Consumes: the exact candidate release tree.
- Produces: reproducible test, build, crawl, and screenshot evidence.

- [ ] Run `npm test` and the repository production build.
- [ ] Start the local production/static server and check the Thai tools hub plus the five priority pages at desktop and mobile widths.
- [ ] Verify HTTP status, `html lang`, title, description, one H1, self-canonical, reciprocal locale alternates, sitemap presence, primary tool interaction, and acquisition links.
- [ ] Confirm no horizontal overflow, clipping, missing assets, browser errors, header changes, or footer changes.

### Task 6: Commit, deploy, and verify the exact release

**Files:**
- Review: all changed files and generated artifacts.

**Interfaces:**
- Consumes: the exact test- and build-verified commit.
- Produces: a reversible production deployment with live evidence.

- [ ] Review the diff for unintended UI, route, claim, and locale changes.
- [ ] Commit the verified Thai SEO release and push the exact commit to `origin/main`.
- [ ] Wait for Hostinger to report that exact commit as the completed current deployment.
- [ ] Recheck the live Thai hub and five priority URLs for status, metadata, H1, canonicals, alternates, header/footer, and console errors.
- [ ] Report the deployed commit, verification evidence, research limitations, and rollback commit.
