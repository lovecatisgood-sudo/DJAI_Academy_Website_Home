# Cam PDF Multilingual Guide Publication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the three Cam PDF workflow guides in English, Thai, Vietnamese, Simplified Chinese, and Traditional Chinese without changing the shared header/footer, breaking locale routing, creating duplicate keyword owners, or destabilizing the existing Hostinger application.

**Architecture:** Keep the guides as source-controlled Next.js routes under `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/`. Use one shared English shell and one shared localized shell, with route data supplying each locale's copy, metadata, canonical, hreflang, CTA, and related links. Publish through the repository-root Hostinger build; do not use the admin blog uploader for these guide URLs.

**Tech Stack:** Next.js App Router, React, `next/image`, shared `SiteHeader`/`SiteFooter`, JSON-LD Article/BreadcrumbList schema, repository sitemap, JSON keyword-ownership manifest, Node test runner, Hostinger root `server.js` supervisor.

**Spec:** `docs/seo/site-restructure/PROJECT_INTENT.md`, `HOSTINGER_DEPLOYMENT.md`, `BLOG_API.md`, and the current request to preserve the header and translations.

## Global Constraints

- Deploy only from the repository root with `npm run build` and `npm start`; never configure a child project as the Hostinger application root.
- Do not modify `SiteHeader`, `SiteFooter`, the global locale registry, or existing product/legal translations for this release.
- Keep exactly these guide locales: English, Thai (`th`), Vietnamese (`vi`), Simplified Chinese (`zh-cn`/`zh-CN`), and Traditional Chinese (`zh-tw`/`zh-TW`); do not create `/guides/en/` duplicates.
- Each guide/locale must have one canonical URL, one ownership row, one sitemap entry, and one language-alternate set; no new blog URL may target the same query family.
- Do not invent an App Store URL or claim a verified platform listing until the public listing is available; retain the verified Google Play destination and honest iPhone wording.
- Preserve the existing header/footer visual component structure and all existing navigation destinations; guide-specific changes may only pass page-appropriate language alternates into the existing header.
- Do not publish through `/admin/blog/` or `/api/admin/blog`; those paths are for ordinary `/blog/` editorial posts, not this custom guide cluster.
- No deployment, push to `main`, cache purge, or live data mutation occurs without explicit release authorization.

---

### Task 1: Freeze the release baseline before touching publication state

**Files:**
- Read: `git status`, `git diff --name-status`, `djai-academy-homepage/app/components/SiteHeader.jsx`, `djai-academy-homepage/app/components/SiteFooter.jsx`
- Read: `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/guideRoutes.js`
- Read: `djai-academy-homepage/app/sitemap.js`
- Read: `data/seo/keyword-ownership.json`
- Read: `HOSTINGER_DEPLOYMENT.md`, `BLOG_API.md`

**Interfaces:**
- Consumes: the current worktree containing the English and localized guide implementation.
- Produces: a recorded release baseline and a list of intended changed files; no source mutation.

- [ ] **Step 1: Confirm the worktree and deployment branch**

Run:

```bash
git branch --show-current
git status --short
git diff --name-status
```

Expected: only the Cam PDF guide, SEO ownership, sitemap, test, and planned documentation files are changed; `SiteHeader.jsx`, `SiteFooter.jsx`, and unrelated tool/app files are not changed.

- [ ] **Step 2: Confirm the root deployment contract**

Run:

```bash
rg -n "Build command|Start command|App root|DJAI_BLOG_ADMIN_PASSWORD|DJAI_BLOG_API_KEY" HOSTINGER_DEPLOYMENT.md
```

Expected: Hostinger uses the repository root, `npm run build`, and `npm start`; the admin credentials are described only for the blog system.

- [ ] **Step 3: Record a rollback point**

Run:

```bash
git rev-parse HEAD
git diff --check
```

Expected: the commit hash is saved in the release notes or deployment log, and `git diff --check` returns no whitespace errors.

### Task 2: Lock the route, locale, and header invariants

**Files:**
- Verify: `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/guideRoutes.js`
- Verify: `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/CamPdfGuideArticle.jsx`
- Verify: `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/LocalizedWorkflowGuideArticle.jsx`
- Test: `djai-academy-homepage/tests/cam-pdf-workflow-guides.test.mjs`

**Interfaces:**
- Consumes: `workflowGuidePaths`, `workflowGuideLanguageHrefs`, `workflowGuideHeaderHrefs`, `articlePaths`, and `hubPaths`.
- Produces: deterministic route-to-locale mappings consumed by page metadata, the language switcher, related links, and the sitemap.

- [ ] **Step 1: Verify the approved route matrix**

Run:

```bash
node - <<'NODE'
import { workflowGuidePaths, workflowGuideLanguageHrefs } from './djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/guideRoutes.js';
for (const key of ['multiPage', 'pdfQr', 'scanSign']) {
  console.log(key, Object.keys(workflowGuidePaths[key]).join(','));
  console.log(JSON.stringify(workflowGuideLanguageHrefs[key]));
}
NODE
```

Expected: each guide has exactly `en`, `th`, `vi`, `zh-CN`, and `zh-TW`, plus `x-default` only in metadata alternates; no `/guides/en/` path is emitted.

- [ ] **Step 2: Verify the shared header/footer boundary**

Run:

```bash
rg -n "SiteHeader|SiteFooter|languageHrefs|currentRoute=\"camPdf\"" \
  djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/CamPdfGuideArticle.jsx \
  djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/LocalizedWorkflowGuideArticle.jsx
git diff --name-only -- djai-academy-homepage/app/components/SiteHeader.jsx djai-academy-homepage/app/components/SiteFooter.jsx
```

Expected: both shells use the existing shared header/footer; the final command prints nothing.

- [ ] **Step 3: Keep a regression assertion for the header contract**

Ensure `djai-academy-homepage/tests/cam-pdf-workflow-guides.test.mjs` checks that the localized shell contains:

```js
assert.match(localizedShell, /SiteHeader/);
assert.match(localizedShell, /SiteFooter/);
assert.match(localizedShell, /languageHrefs=\{workflowGuideHeaderHrefs\[guideKey\]\}/);
```

Run:

```bash
node --test djai-academy-homepage/tests/cam-pdf-workflow-guides.test.mjs
```

Expected: all workflow-route subtests pass.

### Task 3: Review every translation before release

**Files:**
- Review: `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/localizedWorkflowGuideContent.js`
- Review: the 12 localized `page.jsx` files under `guides/th/`, `guides/vi/`, `guides/zh-cn/`, and `guides/zh-tw/`
- Review: `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/LocalizedGuideHub.jsx`

**Interfaces:**
- Consumes: the five-locale guide route map and the localized content object.
- Produces: complete locale-specific title, description, headings, alt text, CTA, FAQ, footer, and related-link content without English fallback copy.

- [ ] **Step 1: Validate the content key matrix**

Run:

```bash
node - <<'NODE'
import { localizedWorkflowGuideContent } from './djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/localizedWorkflowGuideContent.js';
for (const locale of ['th', 'vi', 'zh-CN', 'zh-TW']) {
  for (const key of ['multiPage', 'pdfQr', 'scanSign']) {
    const page = localizedWorkflowGuideContent[locale][key];
    for (const field of ['metaTitle', 'metaDescription', 'title', 'dek', 'heroAlt', 'toc', 'answer', 'sections', 'cta', 'faqs']) {
      if (!page[field]) throw new Error(`${locale}/${key} missing ${field}`);
    }
  }
}
console.log('localized workflow content matrix complete');
NODE
```

Expected: the matrix completes without a missing field.

- [ ] **Step 2: Check translation-specific truthfulness**

Review each locale's QR guide for the statement that a QR code points to a PDF URL rather than hosting the PDF itself, and each signing guide for the distinction between a signature annotation and a certificate-based electronic signature. Review each CTA for the account, advertising, and weekly-export conditions.

Expected: no locale promises unlimited use, a nonexistent App Store destination, or a certificate-based signature that the app does not provide.

- [ ] **Step 3: Check same-language internal links**

Verify `LocalizedWorkflowGuideArticle.jsx` uses `articlePaths[locale]` for the localized watermark guide and `workflowGuidePaths[relatedKey][locale]` for related workflow guides.

Expected: Thai pages link to Thai guide routes, Vietnamese pages to Vietnamese routes, and each Chinese market stays within its own regional route set.

### Task 4: Validate SEO ownership, sitemap, and indexability

**Files:**
- Verify: `djai-academy-homepage/app/sitemap.js`
- Verify: `data/seo/keyword-ownership.json`
- Verify: `seo/briefs/cam-pdf-workflow-guides.yaml`
- Verify: `seo/keyword-map.csv`
- Test: `tests/keyword-ownership-coverage.test.js`, `tests/sitewide-seo-integration.test.js`, `djai-academy-homepage/tests/sitemap-and-locale-policy.test.mjs`

**Interfaces:**
- Consumes: canonical route inventory and locale metadata.
- Produces: one indexable owner per guide/locale, one sitemap URL per canonical, and no competing `/blog/` owner for these query families.

- [ ] **Step 1: Count the intended indexable guide set**

Run:

```bash
node - <<'NODE'
const manifest = require('./data/seo/keyword-ownership.json');
const rows = manifest.entries.filter((row) => row.cluster === 'cam_pdf' && row.pageRole === 'workflow_guide' && row.indexable === true);
console.log(rows.length);
console.log(rows.map((row) => row.route).join('\n'));
NODE
```

Expected: 15 indexable guide routes (three topics across five locales); older publication-gated blog drafts remain non-indexable.

- [ ] **Step 2: Run ownership and sitemap tests**

Run:

```bash
node --test tests/keyword-ownership-coverage.test.js tests/sitewide-seo-integration.test.js \
  djai-academy-homepage/tests/sitemap-and-locale-policy.test.mjs
```

Expected: every sitemap URL has exactly one ownership row, all canonicals are self-owned, and gated blog drafts are not accidentally added to the sitemap.

- [ ] **Step 3: Verify metadata and structured data**

Run:

```bash
node --test djai-academy-homepage/tests/cam-pdf-workflow-guides.test.mjs \
  djai-academy-homepage/tests/cam-pdf-watermark-guide-locales.test.mjs
```

Expected: each route has a unique H1/canonical, Article schema, BreadcrumbList schema, generated visual, and language alternate set.

### Task 5: Run visual and navigation regression checks

**Files:**
- Verify: `djai-academy-homepage/app/components/SiteHeader.jsx`
- Verify: `djai-academy-homepage/app/components/SiteFooter.jsx`
- Verify: `djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/guides/*.module.css`
- Test: `djai-academy-homepage/tests/header-navigation-state.test.mjs`, `djai-academy-homepage/tests/navigation-architecture.test.mjs`, `djai-academy-homepage/tests/homepage-conversion-hierarchy.test.mjs`

**Interfaces:**
- Consumes: the built homepage and guide routes.
- Produces: visual evidence that the shared shell is unchanged and guide-specific CSS has not altered global navigation.

- [ ] **Step 1: Run navigation regression tests**

Run:

```bash
node --test djai-academy-homepage/tests/header-navigation-state.test.mjs \
  djai-academy-homepage/tests/navigation-architecture.test.mjs \
  djai-academy-homepage/tests/homepage-conversion-hierarchy.test.mjs
```

Expected: all navigation destinations, locale switch behavior, header/footer composition, and homepage hierarchy checks pass.

- [ ] **Step 2: Inspect representative pages at desktop and mobile widths**

Using the local production server or internal browser, inspect these URLs at 1280×900 and 390×844:

```text
/
/Cam_PDF_Scan_Signer_QR-Gen/guides/
/Cam_PDF_Scan_Signer_QR-Gen/guides/scan-multiple-pages-to-pdf-android/
/Cam_PDF_Scan_Signer_QR-Gen/guides/th/scan-multiple-pages-to-pdf-android/
/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-tw/share-pdf-with-qr-code/
```

Expected: the existing header height, logo, navigation destinations, mobile menu, footer grid, and CTA remain intact; only the article body and localized text differ.

- [ ] **Step 3: Check accessibility-critical labels**

Expected: each page has one descriptive H1, localized breadcrumb label, localized hero/body image alt text, keyboard-reachable language switch, and no clipped header text at 390px width.

### Task 6: Build and audit the complete Hostinger application

**Files:**
- Build: repository root `package.json`, `scripts/build-hostinger.mjs`
- Audit: `scripts/audit-hostinger.mjs`

**Interfaces:**
- Consumes: all source-controlled guide routes and existing child applications.
- Produces: a deployable root artifact with all existing applications and the 15 guide routes.

- [ ] **Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected: exit code 0; existing warnings may be reported, but no test failure is allowed.

- [ ] **Step 2: Run the complete root build**

Run:

```bash
npm run build
```

Expected: `Hostinger build completed` and no missing route, TypeScript, asset, or child-application build error.

- [ ] **Step 3: Run the deterministic Hostinger audit**

Run:

```bash
npm run verify:hostinger
```

Expected: all built public pages/assets are reachable, no new broken internal links are reported, and the sitemap contains the intended guide family.

- [ ] **Step 4: Re-run whitespace and status checks**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors; only intended release files remain.

### Task 7: Gate publication and deploy through the root application

**Files:**
- Release: all intended source files in the current worktree
- Do not modify: `/admin/blog/`, `data/blog-posts.json`, or runtime blog storage for this guide release

**Interfaces:**
- Consumes: successful Tasks 1–6 and explicit user approval to publish.
- Produces: one versioned Hostinger deployment containing the English and four localized guide sets.

- [ ] **Step 1: Create a reviewable commit**

Run only after the user authorizes publication:

```bash
git add data/seo/keyword-ownership.json djai-academy-homepage seo package.json
git commit -m "feat(seo): publish multilingual Cam PDF workflow guides"
```

Expected: the commit contains guide source, metadata, sitemap/ownership, visuals, tests, and no unrelated header/footer changes.

- [ ] **Step 2: Push/merge through the configured deployment branch**

Use the repository's normal review workflow to merge the commit into `main`; do not upload a child-project folder or manually replace `public_html` files. Hostinger must run the root `npm run build` and `npm start` commands from `HOSTINGER_DEPLOYMENT.md`.

Expected: Hostinger reports a successful root build and running application.

- [ ] **Step 3: Verify production health and representative routes**

Check:

```text
https://www.djai.academy/healthz
https://www.djai.academy/sitemap.xml
https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/guides/scan-multiple-pages-to-pdf-android/
https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/guides/th/scan-multiple-pages-to-pdf-android/
https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-cn/share-pdf-with-qr-code/
https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-tw/scan-sign-send-pdf-android/
```

Expected: `/healthz` reports `buildsReady` and `servicesReady`, every representative URL returns 200, canonical/hreflang tags point to the intended locale set, and the sitemap exposes the guide URLs.

- [ ] **Step 4: Request indexing only after live verification**

Submit the sitemap and the highest-priority English/Thai/Chinese/Vietnamese guide URLs in Google Search Console after confirming the live HTML, not before deployment.

### Task 8: Roll back safely if any release gate fails

**Files:**
- Release history: Git commit and Hostinger deployment history
- Verify after rollback: `/healthz`, `/sitemap.xml`, homepage, existing product/legal routes

**Interfaces:**
- Consumes: a failed build, route, translation, header, or service-health check.
- Produces: restored previous production revision with an incident note; no partial admin-blog publication.

- [ ] **Step 1: Stop publication on the first critical failure**

Critical failures include a non-200 health check, a missing existing route, a header/footer regression, a locale mismatch, a broken canonical/hreflang set, or a failed child-app build.

- [ ] **Step 2: Restore the last known-good Git/Hostinger revision**

Use Hostinger's previous deployment/redeploy control or revert the release commit through the normal reviewed Git workflow. Do not use `git reset --hard` or delete production files.

- [ ] **Step 3: Re-run the production smoke checks**

Verify `/healthz`, `/`, `/Cam_PDF_Scan_Signer_QR-Gen/`, `/blog/`, `/tools/`, and one route from each existing locale before declaring the rollback complete.

## Acceptance Criteria

- The shared header/footer files are unchanged and existing navigation tests pass.
- English, Thai, Vietnamese, Simplified Chinese, and Traditional Chinese guide pages render without fallback or missing content.
- Exactly 15 workflow guide routes are indexable and present in the sitemap, with one ownership row each.
- Existing blog, tool, product, privacy, terms, and translation routes remain reachable and unchanged in purpose.
- Full tests, complete root build, and Hostinger audit pass before release.
- Publication occurs only through the repository-root Hostinger deployment; the admin uploader is not used for these guides.
- A previous deployment/commit remains available for immediate rollback.

---

Plan complete and saved to `docs/superpowers/plans/2026-09-09-cam-pdf-multilingual-guide-publication.md`.
