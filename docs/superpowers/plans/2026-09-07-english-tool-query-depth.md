# English Tool Query Depth Release Plan

> **Execution mode:** Follow `superpowers:executing-plans` task by task, with test-first changes and a verified deployment of the exact tested commit.

**Goal:** Give every one of the 92 indexable English tools a distinct, search-intent-specific long-tail query set, strengthen the visible wording of the highest-opportunity pages, preserve current URLs and layout, and deploy without breaking the site.

**Architecture:** Keep one canonical page per real tool workflow. Keyword variants such as “remove PNG background,” “remove JPG background,” “Word to PDF,” and “DOCX to PDF” belong on the existing relevant page as natural title, H1, body, FAQ, metadata, and anchor language—not as separate thin URLs. The ownership manifest remains the machine-readable source of truth, generated from explicit route-level research assignments.

**Rollback:** Production currently points to `31f0865`. If the new exact commit fails after deployment, redeploy or revert to `31f0865`.

---

## Task 1: Make query quality and evidence traceability enforceable

**Files:**
- Modify: `tests/english-tool-search-contract.test.js`
- Modify: `scripts/seo/enrich-english-tool-keywords.mjs`
- Create: `scripts/seo/english-tool-query-map.mjs`
- Regenerate: `data/seo/keyword-ownership.json`

1. Add a failing test that rejects the old generic supporting-query signature and requires every English working tool to have at least three route-specific supporting queries.
2. Add a failing test that prevents `verified_gsc` evidence unless a traceable Search Console artifact is present. Because no export is supplied in this repository, the current 11 untraceable labels must be downgraded to dated directional evidence.
3. Move all 92 primary and supporting query assignments into `english-tool-query-map.mjs`. Keep exact route ownership for conversion pairs and separate overlapping workflows such as split/extract/delete/reorder PDF.
4. Remove the generic fallback. Throw when a working English route lacks an explicit assignment so future tools cannot silently ship generic research placeholders.
5. Run `npm run seo:sync`, then run `node --test tests/english-tool-search-contract.test.js` and confirm the new contract passes.

## Task 2: Strengthen high-opportunity visible wording without new pages

**Files:**
- Modify: `tests/english-tool-metadata-opportunities.test.js`
- Modify: `djai-image-resizer/scripts/generate-seo-pages.mjs`
- Modify: `djai-document-tools/app/tool-data.ts`
- Regenerate affected static tool outputs using existing package scripts

1. Add failing assertions for the intended rendered/search-visible wording.
2. On the background remover, naturally include JPG, PNG, and WebP in the title/H1/instructions. Explain that inputs such as JPG can be exported as transparent PNG; retain the verified free, no-sign-up, no-added-watermark, batch, and on-device facts only where the interface already supports them.
3. On DOCX converters, expose the familiar “Word” synonym beside “DOCX” in titles/H1s: Word (DOCX) to PDF, HTML, Markdown, and text. Do not claim perfect formatting preservation.
4. Clarify the existing CSV cleaner around removing duplicate and empty rows, and clarify protect-PDF copy around locking/encrypting with a password.
5. Run the relevant generators and focused tests. Check title lengths and verify the generated HTML includes the expected canonical, H1, title, and description.

## Task 3: Improve internal anchor language while preserving UI structure

**Files:**
- Modify: `djai-academy-homepage/app/tools/en/page.jsx`
- Modify: `djai-academy-homepage/tests/tool-hub-taxonomy.test.mjs`

1. Add failing assertions that the English tools hub links the background remover and Word-to-PDF page with descriptive, user-readable anchor text.
2. Update only existing labels/descriptions; do not add cards, sections, or alter the header/footer/layout.
3. Run `node --test djai-academy-homepage/tests/tool-hub-taxonomy.test.mjs tests/english-tool-metadata-opportunities.test.js`.

## Task 4: Regenerate ownership and validate no cannibalization

**Files:**
- Regenerate: `audits/site-restructure/public-route-inventory.json`
- Regenerate: `data/seo/keyword-ownership.json`
- Inspect: sitemap sources and built English tool pages

1. Run the repository’s route inventory and ownership sync commands.
2. Run the ownership validator and verify 92/92 English working tools remain mapped, with one owner per primary family.
3. Confirm no new routes, canonicals, redirects, or sitemap entries were introduced for keyword variants.

## Task 5: Full technical, functional, and visual verification

1. Run `npm test`.
2. Run the production build command used by the repository.
3. Start the local production/static server and verify representative pages at desktop and mobile widths: English tools hub, background remover, Word-to-PDF, CSV cleaner, password-protect PDF, one QR tool, one media tool, Cam PDF product page, homepage, and a Thai page.
4. Check no horizontal overflow, clipped titles/buttons, missing assets, browser errors, or header/footer regressions.
5. Verify HTTP status, canonical, title, description, H1, structured data where applicable, robots behavior, and sitemap inclusion.

## Task 6: Review, commit, deploy, and verify production

1. Review the final diff for unintended UI, URL, locale, or claim changes.
2. Commit the verified release on `codex/english-tool-query-depth`.
3. Push the exact commit to `origin/main` as already authorized.
4. Monitor Hostinger until that exact commit is shown as the current completed deployment.
5. Verify the live representative URLs and sitemap, including title/H1/canonical/description and current header/footer.
6. Report the deployed commit, tests, live evidence, and rollback commit `31f0865`.
