# DJAI Free Tools: Product, UX, Engineering, and SEO Plan

**Date:** 2026-08-13
**Property:** `https://www.djai.academy/`
**Status:** Planning document; no routes, production behavior, or public claims are approved by this document
**Scope:** Website/app icon tools and high-fidelity Office-to-PDF tools

## Executive decision

Build two connected tool suites:

1. **Website & App Icon Tools**
   - Favicon Generator
   - App Icon Generator
   - Favicon Checker
   - Web App Manifest output inside the generator, not a separate indexable page at launch
2. **Office-to-PDF Tools**
   - Upgrade the existing DOCX-to-PDF page with an optional layout-preserving mode
   - Add PPTX-to-PDF
   - Add XLSX-to-PDF
   - Add mixed/batch Office-to-PDF only after the three format workflows pass quality and operations gates

Launch the icon suite first. It is a smaller engineering surface, matches DJAI's browser-tool model, creates a coherent developer/startup journey, and has credible demand evidence. Treat Office conversion as a separate, higher-risk workstream because real layout fidelity requires controlled server-side conversion, font management, resource isolation, and a truthful privacy model.

Do not promise rankings, “pixel-perfect” conversion, “100% private,” “no upload,” or “low competition” until the corresponding evidence exists.

## 1. Verified current-state gap

### Already implemented

DJAI currently has:

- a general image converter/resizer cluster;
- a PDF tool cluster;
- a document cluster with DOCX-to-PDF, DOCX-to-HTML, DOCX-to-Markdown, DOCX-to-text, PDF-to-text, PDF-to-Word, and OCR;
- spreadsheet conversion between CSV, JSON, and XLSX;
- the main tools hub and bilingual Thai/English discovery paths.

The current DOCX-to-PDF implementation converts DOCX to HTML, renders that HTML to a canvas, then writes JPEG page images into a PDF. Its public warning correctly states that complex layout, floating objects, equations, and custom fonts may differ from Word. It is a private browser conversion, not a high-fidelity Office renderer.

### Not implemented

| Proposed capability | Current state | Product decision |
| --- | --- | --- |
| Favicon Generator | No working route or tool | Build |
| App Icon Generator | No working route or tool | Build after or with favicon MVP |
| Favicon Checker | No working route or tool | Build after generator; it needs a secure public-URL fetch service |
| Web App Manifest Generator | No workflow | Include in favicon/app-icon result; do not create a separate page initially |
| PPT/PPTX to PDF | No working route | Build after conversion benchmark |
| XLS/XLSX to PDF | No working route | Build after conversion benchmark |
| High-fidelity DOCX to PDF | Existing route is lower-fidelity browser rendering | Upgrade existing canonical; do not create a second Word-to-PDF page |
| Mixed/batch Office to PDF | No working route | Later phase only |

### Explicit non-goals for the first release

- AI-generated logos or icons;
- a full logo editor comparable to Canva or Figma;
- native visionOS/tvOS layered icon authoring;
- editable Office round-trip conversion;
- PDF-to-Office layout reconstruction;
- macros, ActiveX, embedded executable content, or password cracking;
- dozens of pages for spelling, file-extension, size, or device variants.

## 2. Audience, jobs, and suite positioning

### Icon suite

**Primary reader:** a developer, vibe coder, founder, student, or small business owner who has one logo/image but does not know which web and app icon files are required.

**Job:** turn one source image into a verified, install-ready asset package without manually resizing or writing manifest markup.

**Promise:** upload once, preview common display contexts, fix cropping, and download the correct files plus copy-ready code.

**Differentiator to prove:** one workflow covers browser favicon, Apple touch icon, PWA/maskable assets, and implementation validation, with Thai and English guidance and local image processing.

### Office suite

**Primary reader:** a student, office worker, teacher, founder, or small business user whose Word, PowerPoint, or Excel file must remain readable and printable as PDF.

**Job:** convert an Office file while controlling the failure points that matter for that format.

**Promise:** preview the PDF, receive specific warnings about fonts/layout, and continue directly into DJAI's existing PDF tools.

**Differentiator to prove:** transparent choice between private browser conversion and a layout-preserving upload mode, format-specific controls, a visible fidelity report, Thai/English support, and immediate PDF follow-up actions.

## 3. Information architecture and canonical URL map

Use one new category hub for the icon suite and the existing document category for Office. This matches the current category-based tools architecture and avoids unrelated flat pages.

| URL | Primary job | Index? | Notes |
| --- | --- | --- | --- |
| `/tools/brand/` | Browse website/app asset tools | Yes | New category hub; choose a better public label during copy review if “Brand Tools” is unclear in Thai |
| `/tools/brand/en/` | English category equivalent | Yes | Reciprocal locale pair |
| `/tools/brand/favicon-generator/` | Produce a website favicon/PWA bundle | Yes | Main favicon intent owner |
| `/tools/brand/favicon-generator/en/` | English equivalent | Yes | Thai remains deliberate `x-default` if current policy is retained |
| `/tools/brand/app-icon-generator/` | Produce iOS/Android app assets | Yes | Distinct store/native-app output and controls |
| `/tools/brand/app-icon-generator/en/` | English equivalent | Yes | — |
| `/tools/brand/favicon-checker/` | Inspect a public site's icon declarations and assets | Yes | Must return actionable evidence, not only pass/fail |
| `/tools/brand/favicon-checker/en/` | English equivalent | Yes | — |
| `/tools/document/docx-to-pdf/` | Existing Word/DOCX conversion | Yes; preserve | Upgrade in place; retain Word-to-PDF synonym coverage |
| `/tools/document/docx-to-pdf/en/` | English equivalent | Yes; preserve | — |
| `/tools/document/pptx-to-pdf/` | Convert presentation slides with slide-specific controls | Yes | Cover PPT/PPTX and PowerPoint terms on one canonical |
| `/tools/document/pptx-to-pdf/en/` | English equivalent | Yes | — |
| `/tools/document/xlsx-to-pdf/` | Convert workbooks with sheet/print controls | Yes | Cover XLS/XLSX and Excel terms on one canonical |
| `/tools/document/xlsx-to-pdf/en/` | English equivalent | Yes | — |
| `/tools/document/office-to-pdf/` | Convert a mixed batch of Office files | Later; index only when batch is real | Must accept mixed formats and produce a queue/ZIP; otherwise redirect to the category hub |
| `/tools/document/office-to-pdf/en/` | English equivalent | Later | — |

### URLs not to create

Do not create separate indexable pages for:

- `favicon-maker`, `favicon-creator`, `favicon-ico-generator`, `png-to-favicon`, or `jpg-to-favicon` if they use the same favicon workflow;
- `word-to-pdf` separate from `docx-to-pdf`;
- `powerpoint-to-pdf`, `ppt-to-pdf`, and `pptx-to-pdf` as three pages;
- `excel-to-pdf`, `xls-to-pdf`, and `xlsx-to-pdf` as three pages;
- each icon dimension, target platform, page orientation, spreadsheet sheet count, or Office version.

Use synonyms naturally in metadata, visible copy, controls, FAQ, examples, and internal-link anchors. Redirect any legacy synonym route to the canonical owner.

## 4. Product specifications

### 4.1 Favicon Generator

#### Required input

- PNG, JPG/JPEG, WebP, and a carefully sanitized or rasterized SVG;
- square and non-square source images;
- optional text/initial/emoji mode only if it produces accessible, predictable output;
- source preview before processing.

#### Required controls

- crop: contain, cover, and manual position;
- scale and padding;
- transparent or selected background color;
- light and dark tab preview;
- sharpness/legibility preview at 16, 32, and 48 pixels;
- PWA mask preview across circle, squircle, rounded square, and square;
- site/app name, short name, theme color, background color, start URL, and display mode for manifest output;
- reset and replace-source actions that do not silently retain prior files.

#### Required output

- multi-size `favicon.ico`;
- `favicon.svg` when a safe, valid SVG source/output exists;
- PNG favicon sizes needed by the chosen compatibility matrix;
- `apple-touch-icon.png`;
- 192×192 and 512×512 PWA icons;
- at least one 512×512 maskable icon with a verified safe zone;
- `site.webmanifest`;
- copy-ready HTML `<link>` declarations;
- a ZIP containing files, code snippet, and a short README;
- file manifest with names, dimensions, MIME type, and byte size.

#### Validation and result state

- warn when important pixels fall outside a maskable safe zone;
- warn when the source is too small for reliable large output;
- show whether transparency will be replaced by a platform background;
- show actual generated dimensions and file sizes;
- preview the generated assets, not only the source;
- allow download of individual files and one complete ZIP;
- link after success to Favicon Checker and App Icon Generator.

### 4.2 App Icon Generator

This is a separate user job, not merely a renamed favicon page.

#### Required controls and previews

- 1024×1024 master image validation;
- iOS/iPadOS/macOS rounded-mask preview without baking rounded corners into the source;
- Android adaptive foreground/background composition;
- Android 108×108 dp canvas and 66×66 dp safe-zone preview;
- optional monochrome/themed-icon layer;
- background color and foreground scale/position;
- preview at launcher, settings, notification, and store/listing contexts where supported;
- clear platform selector so users download only what they need.

#### Required output

- Apple 1024×1024 master and a valid asset-catalog package/`Contents.json` only after it is tested in Xcode;
- Android density assets and adaptive-icon XML/package only after it is tested in Android Studio;
- PWA assets may be included as a convenience, but the favicon page remains the owner of web-favicon intent;
- a ZIP and platform-specific README;
- no claim that every Apple platform is supported when layered tvOS/visionOS assets are not generated.

### 4.3 Favicon Checker

#### Required input and scan behavior

- public `http` or `https` URL only;
- follow a small bounded number of redirects;
- fetch HTML and declared icon/manifest resources without running page JavaScript;
- display the final URL and every inspected declaration;
- never use the user's signed-in browser, cookies, local storage, or authenticated session.

#### Required checks

- root `favicon.ico` response and content type;
- `<link rel="icon">`, `shortcut icon`, Apple touch, and manifest declarations;
- response status, redirect, MIME type, byte size, dimensions, and same/cross-origin location;
- duplicate or conflicting declarations;
- missing declared resources;
- SVG/ICO/PNG validity;
- PWA icon sizes and `purpose` values;
- maskable safe-zone risk where pixels can be analyzed;
- manifest parse errors and relative URL resolution;
- light/dark icon declarations where present;
- copy-ready correction, tailored to the observed issue.

#### Security gate

The checker is an SSRF-sensitive service. Before launch it must:

- resolve and block loopback, link-local, private, carrier-grade NAT, reserved, metadata-service, and internal destinations for IPv4 and IPv6;
- re-resolve and revalidate every redirect target;
- permit only HTTP(S) on approved ports;
- cap redirects, response bytes, decompressed bytes, image pixels, request duration, and total scan duration;
- reject credentials in URLs;
- send no cookies or authorization headers;
- use an isolated outbound worker with no access to production secrets or internal services;
- rate-limit by privacy-preserving abuse controls;
- escape all fetched text and never execute fetched markup or scripts.

### 4.4 DOCX-to-PDF upgrade

Preserve the current private browser mode and its canonical URL. Add an explicit second mode only after the server workflow passes the release gate:

1. **Private browser mode:** no upload; faster; current known layout limits remain visible.
2. **Layout-preserving mode:** explicit upload to an isolated conversion worker; higher expected fidelity; clear retention and font limitations.

Do not preselect the upload mode. Do not describe the upload mode as private/local.

Required additions:

- mode comparison before file selection;
- source and result preview;
- font substitution report;
- detected warnings for unsupported/missing fonts, macros, embedded objects, tracked changes/comments, and password protection where detection is reliable;
- selectable page range and output PDF options supported by the chosen renderer;
- direct success links to compress, merge, protect, add page numbers, and remove metadata.

### 4.5 PPTX-to-PDF

Required distinct controls:

- slides or page range;
- standard slides versus handouts/notes only if the renderer genuinely supports them;
- include/exclude hidden slides where detectable and supported;
- one slide per page or supported handout layouts;
- orientation and page size when meaningful;
- font/media/animation limitation report;
- preview representative pages before download.

Animations, transitions, video playback, and unsupported embedded content must be disclosed as non-PDF behavior rather than silently claimed as preserved.

### 4.6 XLSX-to-PDF

Required distinct controls:

- worksheet selection and all-sheets mode;
- portrait/landscape;
- paper size;
- fit sheet to page, fit columns to page, and actual-size modes;
- print area and used-area behavior;
- gridlines, headings, margins, and repeated header rows where the renderer supports them;
- page-break preview;
- warnings for unsupported external links, macros, missing fonts, and clipped content.

This page earns a distinct URL because spreadsheet print configuration is a different workflow from Word and PowerPoint conversion.

### 4.7 Mixed/batch Office-to-PDF

Release only after the three single-format workflows are reliable.

It must provide:

- mixed DOCX/PPTX/XLSX queue;
- per-file settings and status;
- retry/cancel per file;
- individual downloads and one ZIP;
- optional merge into one PDF only through the existing Merge PDF operation;
- deterministic file naming and collision handling;
- honest free limits based on measured worker capacity.

## 5. Page layout and interaction design

### Shared utility-page layout

The tool must remain the primary content, above long explanations.

1. **Compact DJAI tool header**
   - logo, All Tools, relevant category, language switch;
   - do not let navigation dominate the task.
2. **Breadcrumbs and first-screen promise**
   - one H1 aligned to the exact task;
   - one sentence naming output and the key privacy/processing mode;
   - three proof chips only when verified, such as “No account,” “Runs in browser,” or “Preview before download.”
3. **Tool workspace**
   - desktop: controls/input on the left, live preview/result on the right;
   - mobile: input, controls, preview, result in that order;
   - drag/drop plus keyboard-accessible file picker;
   - keep Generate/Convert as the single visual primary action.
4. **Progress and recovery**
   - explicit stages: validating, processing, packaging, ready;
   - cancellable operation where technically possible;
   - error explains what happened, whether the source changed, and the next recovery action.
5. **Result and next action**
   - preview actual generated output;
   - file list and ZIP/download action;
   - after success, show one or two adjacent tools before any course/service CTA.
6. **Compatibility, privacy, and limitations**
   - short evidence-led table;
   - local/server processing explained in plain language;
   - no vague “secure” badge without details.
7. **Test evidence**
   - tested date, version/engine, sample files, screenshots, and known failures;
   - link to a maintained test methodology.
8. **How to use**
   - short, task-specific steps; not generic SEO padding.
9. **Questions and troubleshooting**
   - answer real failure modes and long-tail queries naturally.
10. **Related tools and contextual bridge**
    - tool first, relevant tutorial/build story second, custom development only when readiness fits.

### Favicon workspace layout

Use a three-step workspace:

`Source → Adjust & preview → Download package`

Desktop preview panel tabs:

- browser tab light/dark;
- iPhone home screen;
- Android mask shapes;
- file/code manifest.

The critical visual differentiator is the live small-size and mask-safe preview. A generic image cropper with a ZIP button is not enough.

### Favicon Checker layout

Use:

`URL field → scan summary → evidence table → prioritized fixes → copy-ready code`

Severity labels:

- Blocker: declared file missing/invalid or no usable icon;
- High: install/app icon requirement is broken;
- Medium: weak compatibility, missing size/purpose, or likely crop issue;
- Low: optional enhancement.

Never show a proprietary numeric “SEO score” as if it predicts rankings.

### Office workspace layout

Use:

`Choose mode → upload → format-specific options → preview/warnings → convert → PDF actions`

The privacy boundary must appear before upload, not below the tool. Show file deletion/retention behavior in the upload consent copy once the implementation is verified.

### Accessibility and mobile gates

- all controls keyboard-operable with visible focus;
- semantic labels and live-region progress updates;
- no color-only warning meaning;
- minimum 44×44 CSS-pixel touch targets where practical;
- previews have useful text alternatives/status summaries;
- no horizontal overflow at 320, 360, 390, 768, and desktop widths;
- drag/drop has an equivalent button flow;
- respect reduced motion;
- ads must not separate upload from the primary action, imitate controls, or cause layout shift.

## 6. Keyword strategy and evidence tiers

### Evidence rule

Keyword data below is directional, geography-specific third-party estimation—not a traffic promise. “Low competition” requires a current Keyword Planner/Semrush/Ahrefs export for the target country plus manual SERP review. Search volume alone cannot establish ranking difficulty.

Use three tiers:

- **Tier A — externally measured demand:** a dated third-party result exposes country, volume, and query.
- **Tier B — observed SERP/product demand:** current competitors and official platform requirements support the job, but volume/difficulty is not verified.
- **Tier C — candidate underrated query:** strong task fit and likely lower specificity competition; must be validated before being called low competition or used to justify a new URL.

### Measured directional demand

| Query | Market/date | Estimated volume | What it supports | Evidence caution |
| --- | --- | ---: | --- | --- |
| `favicon generator` | US, May 2026 | 12,100/month | Core favicon page | Semrush competitor overview; competitive incumbent |
| `icon checker` | US, May 2026 | 4,400/month | Favicon Checker | Semrush competitor overview; broader than favicon alone, so inspect query intent |
| `favicon generator` | UK, Jun 2026 | 3,600/month | Core favicon page | Semrush competitor overview |
| `favicon ico generator` | UK, Jun 2026 | 880/month | Secondary favicon copy/FAQ | Same workflow; no separate page |
| `png to favicon` | UK, Jun 2026 | 390/month | Input-format copy and examples | Same workflow; no separate page |
| `make favicon` | UK, Jun 2026 | 390/month | Natural secondary copy | Same workflow |
| `create a favicon .ico` | UK, Jun 2026 | 260/month | ICO output guidance | Same workflow |
| `app icon generator` | India, May 2026 | 6,600/month | Core app-icon page | Semrush competitor overview |
| `icon generator` | India, May 2026 | 2,900/month | Secondary term only; ambiguous | Do not make the page generic |
| `android app icon generator` | India, May 2026 | 880/month | Android section and metadata support | Same app-icon workflow |
| `word to pdf` | India, Jun 2026 | 3,350,000/month | Existing DOCX canonical | Extremely competitive; not a quick-win forecast |
| `excel to pdf` | India, Mar 2026 | 1,000,000/month | XLSX page demand | Country/month estimate from competitor overview; extremely competitive |
| `excel to pdf` | Turkey, Jan 2026 | 60,500/month | Cross-market demand signal | Not a Thailand estimate |

### Primary query ownership

| Canonical page | Primary family | Secondary terms to cover naturally |
| --- | --- | --- |
| Favicon Generator | `favicon generator` | favicon maker, create favicon, favicon ICO generator, PNG to favicon, JPG to favicon, SVG favicon, favicon package |
| App Icon Generator | `app icon generator` | iOS app icon generator, Android app icon generator, adaptive icon generator, app icon sizes, Xcode app icon asset catalog |
| Favicon Checker | `favicon checker` / `icon checker` after SERP validation | check favicon, test favicon, favicon not showing, inspect web app icons, manifest icon checker |
| DOCX to PDF | `word to pdf` / `docx to pdf` | convert Word to PDF, Word to PDF without losing formatting, preserve hyperlinks/fonts |
| PPTX to PDF | `powerpoint to pdf` / `pptx to pdf` | PPT to PDF, slides to PDF, PowerPoint to PDF with notes, include hidden slides |
| XLSX to PDF | `excel to pdf` / `xlsx to pdf` | XLS to PDF, Excel to PDF one page, all sheets to PDF, landscape, fit columns |
| Office to PDF | `office to pdf` / `batch office to pdf` | convert Word Excel PowerPoint to PDF, mixed Office files to PDF |

### Underrated long-tail candidates to validate and prioritize

These queries are attractive because they express a concrete failure or setting that the product can solve. They are not yet verified as high-volume/low-competition.

#### Icon suite candidates

- `maskable icon generator`
- `PWA icon generator`
- `web app manifest generator with icons`
- `favicon safe zone checker`
- `favicon checker online`
- `favicon not showing checker`
- `apple touch icon generator`
- `adaptive icon generator`
- `android monochrome icon generator`
- `favicon package generator`
- `favicon generator with preview`
- `SVG favicon generator`
- `favicon for dark mode`
- `Next.js favicon generator`
- `Vite favicon generator`
- `favicon HTML code generator`

#### Office candidates

- `word to pdf without losing formatting`
- `word to pdf keep hyperlinks`
- `word to pdf custom fonts`
- `powerpoint to pdf with speaker notes`
- `powerpoint to pdf include hidden slides`
- `pptx to pdf no upload`
- `excel to pdf fit all columns on one page`
- `excel to pdf all sheets`
- `excel to pdf landscape`
- `xlsx to pdf preserve page breaks`
- `batch office to pdf`
- `convert word excel powerpoint to pdf`
- `office to pdf font substitution`

#### Thai candidates

- `สร้าง favicon ฟรี`
- `สร้าง favicon จาก png`
- `ตรวจ favicon เว็บไซต์`
- `favicon ไม่ขึ้น แก้ยังไง`
- `สร้าง app icon android ios`
- `สร้าง PWA icon`
- `แปลง word เป็น pdf ไม่เพี้ยน`
- `แปลง word เป็น pdf ฟอนต์ไม่เพี้ยน`
- `แปลง powerpoint เป็น pdf พร้อมโน้ต`
- `แปลง pptx เป็น pdf ฟรี`
- `แปลง excel เป็น pdf ให้พอดีหน้า`
- `แปลง excel เป็น pdf ทุก sheet`
- `แปลง excel เป็น pdf แนวนอน`

### Keyword validation procedure before implementation freeze

1. Export the last 16 months of Search Console queries/pages for `/tools/`, image, document, PDF, and relevant blog pages.
2. Pull Keyword Planner data for Thailand and the chosen English markets; keep language and location explicit.
3. Pull one consistent third-party difficulty dataset for all candidates; do not mix incomparable KD scales.
4. Manually review desktop and mobile SERPs for the top 30 candidates:
   - intent and result type;
   - dominant brands and domain strength;
   - whether the tool works before signup;
   - privacy claims and processing model;
   - page speed and mobile usability;
   - unique controls, evidence, and content gaps;
   - Thai localization quality.
5. Score each candidate using:
   - verified demand (25%);
   - intent/product fit (25%);
   - realistic competitiveness (20%);
   - unique value DJAI can prove (20%);
   - operational cost/risk (10%).
6. Use long-tail candidates as headings, controls, examples, and FAQs first. Create a new URL only when the task and interface are materially distinct.

## 7. Metadata briefs

Final character lengths and Thai wording require rendered review; these are direction drafts.

### Favicon Generator EN

- **Title:** `Favicon Generator — ICO, SVG, PWA Icons & Manifest | DJAI`
- **H1:** `Free Favicon Generator and Web Icon Pack`
- **Description:** `Turn one image into favicon.ico, SVG and PNG favicons, Apple touch and maskable PWA icons, a web manifest, and copy-ready HTML.`

### Favicon Generator TH

- **Title:** `สร้าง Favicon ฟรี พร้อม ICO, PWA Icon และ Manifest | DJAI`
- **H1:** `สร้าง Favicon และชุดไอคอนเว็บฟรี`
- **Description:** `อัปโหลดรูปครั้งเดียวแล้วสร้าง favicon.ico, SVG, PNG, Apple touch icon, PWA icon แบบ maskable, web manifest และโค้ด HTML พร้อมใช้`

### App Icon Generator EN

- **Title:** `App Icon Generator for iOS and Android | DJAI`
- **H1:** `Generate iOS and Android App Icon Assets`
- **Description:** `Create tested iOS and Android icon packages from one master image, with adaptive-mask previews, safe-zone checks, and platform-ready downloads.`

### Favicon Checker EN

- **Title:** `Favicon Checker — Test Icons, Manifest and PWA Assets | DJAI`
- **H1:** `Check a Website's Favicon and App Icons`
- **Description:** `Inspect favicon declarations, files, dimensions, redirects, Apple touch icons, and web manifest assets, then get evidence-based fixes.`

### PPTX to PDF EN

- **Title:** `PowerPoint to PDF — Convert PPT and PPTX with Preview | DJAI`
- **H1:** `Convert PowerPoint PPTX to PDF`
- **Description:** `Convert PPT or PPTX slides to PDF with page options, preview, font and layout warnings, and direct access to DJAI PDF tools.`

### XLSX to PDF EN

- **Title:** `Excel to PDF — Convert XLS and XLSX with Sheet Controls | DJAI`
- **H1:** `Convert Excel XLSX to PDF`
- **Description:** `Choose worksheets, orientation, paper size and fit-to-page settings, preview page breaks, and convert Excel files to PDF.`

### DOCX to PDF EN upgrade

- retain the existing canonical and synonym redirects;
- title should cover Word and DOCX without stuffing;
- opening must explain the two modes and privacy difference;
- do not write “high fidelity” in the title until benchmark thresholds pass.

## 8. Content and evidence strategy

### On-page content that earns trust

Each tool page needs:

- exact accepted inputs and generated outputs;
- observed processing location and file lifecycle;
- tested browser/engine/version and date;
- original screenshots of source, settings, result, and a known failure;
- one format-specific limitations table;
- troubleshooting tied to actual errors;
- a maintained change log or tested-date note;
- authorship/reviewer information where useful.

### Link-worthy evidence assets

Create assets that competitors rarely expose:

1. **Favicon compatibility test repository**
   - generated fixture bundle;
   - expected declarations;
   - screenshots across current browsers/platforms;
   - machine-readable validation cases.
2. **Office fidelity benchmark**
   - licensed/synthetic test corpus with simple, medium, and adversarial documents;
   - reference PDFs exported by the source application where legally available;
   - visual-diff images and structural checks;
   - documented renderer/version/fonts;
   - published failures, not only winners.
3. **Thai implementation guides**
   - adding favicon assets to Next.js, Vite, WordPress, and plain HTML;
   - fixing Thai font substitutions in Office-to-PDF;
   - fitting an Excel sheet to one PDF page;
   - exporting PowerPoint with notes.

Do not publish all guides at once. Start with the guide required to complete the first released tool, then expand using Search Console evidence.

### Blog/support cluster

Potential articles, only after the corresponding tool works:

- “Favicon vs app icon vs PWA icon: which files do you actually need?”
- “Why your favicon is not showing: a test-and-fix checklist”
- “How to add favicon and manifest files in Next.js”
- “Why Word-to-PDF formatting changes and how to diagnose it”
- “How to fit every Excel column onto one PDF page”
- “How to export PowerPoint notes to PDF without losing the slide order”

Every article should link to one exact tool action. Every tool should link back only to the guide that resolves its user's next friction.

## 9. Ranking strategy

Ranking ahead of established converter sites is not a metadata exercise. The strategy is to win narrower tasks with a better product and documented evidence, then expand.

### 9.1 Product-led advantage

- complete the task before signup;
- show actual output before download;
- make small-size/mask previews better than generic favicon resizers;
- make Office controls format-specific rather than one generic upload box;
- report font/layout problems instead of hiding them;
- connect successful outputs to existing DJAI tools;
- provide natural Thai localization, not machine-translated English templates.

### 9.2 Intent-first page quality

- one task owner per canonical URL;
- meaningful server-visible title, H1, description, limitations, and instructions;
- no long SEO essay before the tool;
- unique controls, examples, errors, and result state on every indexable page;
- no pages created only for synonyms or file extensions;
- descriptive internal anchors without exact-match repetition.

### 9.3 Technical SEO

- final HTTP 200 and useful initial HTML;
- absolute self-canonical consistent with redirects, links, and sitemap;
- reciprocal self-inclusive Thai/English hreflang plus deliberate `x-default`;
- correct `html lang` and completely localized UI/copy;
- add Vietnamese only when the complete tool, metadata, help, errors, and QA are localized; do not point a Vietnamese hub to English as if equivalent;
- BreadcrumbList plus accurate WebApplication/SoftwareApplication structured data only when visible properties and Google's current requirements are met;
- never invent ratings or reviews to satisfy structured-data eligibility;
- include in sitemap only after the production workflow works;
- update `lastmod` only for substantive changes;
- crawlable links from `/tools/`, the category hub, related tools, and relevant articles;
- preserve the current trailing-slash and locale conventions.

### 9.4 Performance

- server-render the first-screen copy and tool shell;
- lazy-load image encoders, ZIP, Office preview, and heavy WASM only after intent;
- run heavy image work in Web Workers where practical;
- avoid shipping Office libraries to icon pages or icon libraries to document pages;
- reserve preview/ad/result dimensions to prevent layout shift;
- optimize to current good thresholds: LCP ≤2.5s, INP <200ms, CLS <0.1 at the 75th percentile when field data exists;
- measure real task completion time and failure rate, not only Lighthouse.

### 9.5 Internal linking

Icon journey:

`Tools hub → Brand Tools hub → Favicon Generator → Favicon Checker → App Icon Generator`

Office journey:

`Tools hub → Document Tools → format converter → PDF result → Compress/Merge/Protect/Page Numbers/Metadata`

Add contextual links from:

- image tools after a user creates or resizes a square logo;
- technical SEO/Screaming Toad content when favicon discovery is relevant;
- relevant beginner website/app-building articles;
- PDF tools after Office conversion success, not before conversion.

### 9.6 Authority and distribution

After release and with separate approval for external actions:

- publish the test fixtures and non-sensitive validator logic as open source;
- offer a stable documentation page that developers can cite;
- submit the working tools to relevant developer/tool directories selectively;
- demonstrate the tools with original short videos/screenshots;
- contact authors of genuinely relevant favicon/PWA and Thai Office guides with the evidence resource, not a generic link request;
- seek inclusion in course/resource lists by making the tool useful without requiring a backlink;
- avoid purchased links, automated directory blasts, reciprocal-link schemes, and mass guest posts.

### 9.7 Search and AI retrieval

- answer the primary task and limitations in clear initial HTML;
- expose exact formats, processing mode, tested date, and outputs in concise tables;
- maintain organization/product identity and author/reviewer information;
- cite current Apple, Android, MDN/web.dev, LibreOffice, Microsoft, and Google guidance near claims;
- keep `llms.txt` accurate as a discovery aid, without calling it a ranking mechanism;
- publish reproducible evidence that search and AI systems can cite.

## 10. Engineering architecture

### Icon suite

Recommended shape:

- new static-exportable `djai-brand-tools` application mounted under `/tools/brand/`;
- browser-side image processing and ZIP generation;
- shared visual/navigation/analytics conventions with existing tool apps;
- a small isolated root/server API only for Favicon Checker public URL inspection;
- category/route data added to the homepage tool directory, sitemap generator, root build, root server, and deterministic audit.

Do not reuse the general image resizer interface if it prevents task-specific previews and output manifests. Shared image primitives are appropriate; the user workflow must remain distinct.

### Office suite

Recommended shape:

- keep the existing static document-tool UI and browser mode;
- add a separately deployable, containerized Office conversion worker for layout-preserving mode;
- do not add LibreOffice conversion load to the current Hostinger homepage/tool child-process topology until capacity and isolation are proven;
- use a bounded job API with an opaque job ID;
- conversion container has no outbound network, no production secrets, a read-only base filesystem, a per-job temporary directory, CPU/memory/process/time limits, and destruction after completion;
- use a pinned LibreOffice version and a documented, licensed font set;
- production hosting target is a later infrastructure decision based on measured cost, sandbox support, and regional latency.

Local development currently has LibreOffice available, but that does not prove Hostinger production capability or capacity.

### Office file lifecycle

Define and test before public copy is written:

- maximum file and batch size;
- accepted signatures/extensions;
- upload encryption in transit;
- at-rest behavior, if any;
- automatic deletion deadline;
- whether failed jobs retain artifacts temporarily;
- log redaction and telemetry fields;
- user-initiated deletion/cancel behavior;
- backup exclusion;
- incident response and deletion verification.

Telemetry must not include document content, filenames, URLs embedded in documents, or generated file bytes.

### Conversion safety

- reject or isolate macros and embedded executables;
- defend against ZIP bombs, oversized XML, decompression bombs, huge image dimensions, and excessive page/sheet/slide counts;
- never resolve external document links during conversion;
- sanitize output filenames;
- prevent command injection by passing file paths as arguments, never shell-concatenated strings;
- enforce job quotas and concurrency;
- scan output where proportionate;
- return generic user errors and detailed internal error codes without leaking paths or worker details.

## 11. Fidelity benchmark and release thresholds

### Test corpus

At minimum, include synthetic/licensed files covering:

- Thai and English standard fonts;
- missing/custom font substitution;
- headings, lists, tables, links, headers, footers, comments, tracked changes;
- floating images, text boxes, equations, charts, SmartArt-like objects, and page breaks;
- PPTX themes, masters, hidden slides, notes, charts, media placeholders, and mixed aspect ratios;
- XLSX multiple sheets, merged cells, print areas, page breaks, formulas, charts, wide tables, repeated rows, and landscape layouts;
- malformed, encrypted, macro-enabled, oversized, and adversarial inputs.

### Comparison method

- generate reference PDF with the originating Office application where possible and licensed;
- generate candidate output using the pinned renderer and font set;
- compare page count, page dimensions, extracted text, link presence, and visual diff;
- inspect representative failures manually;
- record renderer/version, OS/container, fonts, options, duration, peak memory, and output size;
- publish the method and representative results without exposing private user files.

### Go/no-go thresholds

Set numeric thresholds after the baseline corpus is run, not before. At minimum, block “layout-preserving” wording if:

- page count changes unexpectedly on ordinary fixtures;
- text is missing or unreadable;
- Thai shaping/fonts fail on the standard supported set;
- links or required content disappear silently;
- severe clipping occurs without a warning;
- conversion can reach internal network/resources;
- deletion or resource limits are not verified.

Use “higher-fidelity” or “layout-preserving mode” only when supported by the benchmark. Never use “perfect” or “pixel-perfect.”

## 12. Analytics and measurement

### Privacy-safe product events

Common events:

- `tool_viewed`
- `file_select_started`
- `file_validated`
- `processing_started`
- `processing_succeeded`
- `processing_failed` with bounded error code
- `preview_viewed`
- `individual_file_downloaded`
- `bundle_downloaded`
- `related_tool_clicked`
- `guide_clicked`

Additional icon events:

- export profile selected;
- mask-safe warning shown/resolved;
- manifest copied;
- checker scan completed and issue counts by severity.

Additional Office events:

- browser versus layout-preserving mode selected;
- warning category shown;
- follow-up PDF operation selected;
- queue duration and conversion duration buckets.

Never capture filenames, source contents, generated contents, full checked URLs, document metadata, or free-text fields in analytics.

### Search measures

Track by locale and canonical page:

- index status and canonical selection;
- impressions, clicks, CTR, and average position;
- query mix: core versus long-tail/problem queries;
- branded versus non-branded queries;
- image-search visibility where relevant;
- device and country;
- rich-result validity/appearance where eligible.

### Product success measures

- valid-input-to-success rate;
- median and p95 time to result;
- failure rate by bounded reason;
- preview-to-download rate;
- ZIP versus individual download rate;
- checker scan-to-fix-copy rate;
- Office conversion warning rate;
- next-useful-tool click rate;
- repeat use within a privacy-appropriate window.

Do not use bounce rate as a ranking factor or treat a fast successful one-page session as failure.

## 13. Delivery plan

### Phase 0 — evidence and architecture gate

Deliverables:

- Search Console and keyword export;
- SERP/competitor matrix for the prioritized countries/languages;
- approved canonical/locale map;
- baseline screenshots and analytics for the shared tools hub/template;
- favicon/app-icon compatibility matrix from current official sources;
- Office fidelity corpus and first benchmark;
- conversion worker threat model and cost/capacity test;
- go/no-go decision for server-side Office mode.

Exit: keyword claims are labelled, routes do not cannibalize existing pages, and Office architecture has a safe feasible path.

### Phase 1 — Favicon Generator MVP

Deliverables:

- `/tools/brand/` hub and Thai/English pair;
- Favicon Generator Thai/English pair;
- local browser processing;
- ICO/PNG/Apple/PWA/maskable/manifest/HTML/ZIP output;
- small-size and mask previews;
- unit, integration, static export, metadata, locale, accessibility, and browser conversion tests;
- tools hub/directory/sitemap/build/server/audit integration;
- one original implementation guide and tested evidence page.

Exit: generated bundle passes automated validation and manual checks in the supported browser/platform matrix.

### Phase 2 — App Icon Generator and Favicon Checker

Deliverables:

- distinct App Icon Generator routes and platform packages;
- Xcode and Android Studio import verification;
- checker fetch service with SSRF test suite;
- checker evidence table and correction snippets;
- internal links among all three workflows;
- performance and abuse/load tests.

Exit: app packages import successfully and checker security tests cannot access internal/reserved destinations.

### Phase 3 — DOCX fidelity pilot

Deliverables:

- isolated conversion worker pilot;
- dual-mode UX on existing DOCX canonical;
- font/layout report;
- file lifecycle implementation and deletion proof;
- golden-corpus benchmark and regression suite;
- capacity, latency, and cost measurements;
- rollback flag that leaves private browser mode available.

Exit: benchmark and safety thresholds pass without degrading current browser mode.

### Phase 4 — PPTX and XLSX workflows

Deliverables:

- format-specific routes, controls, warnings, previews, and tests;
- Thai/English localization and metadata;
- success handoff to existing PDF tools;
- updated corpus and benchmark results;
- sitemap/discovery only after production workflows pass.

Exit: each page performs a distinct complete job and passes its format-specific corpus.

### Phase 5 — Batch and growth

Deliverables:

- mixed batch queue if worker capacity supports it;
- published test methodology and open fixtures;
- first evidence-led outreach/distribution campaign;
- Search Console review at 2, 4, 8, and 12 weeks;
- page/content changes based on query and task-success evidence;
- consolidate or noindex anything that does not provide distinct value.

## 14. Test and release matrix

### Functional

- each accepted input and output;
- wrong extension/signature, corrupt file, oversized input, zero-byte input;
- transparent background, tiny source, extreme aspect ratio, animated image;
- cancel, reset, retry, replace source, repeated conversions;
- ZIP contents and deterministic filenames;
- Office format-specific settings and warnings;
- output opens in target applications.

### SEO and locale

- HTTP status, canonical, title, description, H1, `html lang`;
- reciprocal Thai/English hreflang and `x-default`;
- sitemap membership only for working canonicals;
- no synonym duplicate routes;
- crawlable links from category/main hubs;
- structured data matches visible content and passes applicable validation;
- initial HTML remains meaningful without tool JavaScript.

### Accessibility and responsive

- keyboard-only and screen-reader smoke tests;
- progress/error announcements;
- contrast, focus, touch targets, reduced motion;
- 320/360/390/768/desktop widths;
- no overflow or preview traps.

### Security and privacy

- malicious SVG and image decompression tests;
- ZIP/Office bomb tests;
- SSRF IPv4/IPv6/DNS-rebinding/redirect test cases;
- worker isolation, no-network conversion, resource exhaustion, cleanup/deletion;
- analytics payload inspection;
- CSP and dependency/license audit.

### Performance and reliability

- cold/warm bundle load;
- worker processing time and memory across input tiers;
- concurrent conversion queue;
- failure recovery and process restart;
- LCP/INP/CLS lab checks plus field monitoring when eligible;
- verify current homepage/tool child services are not destabilized.

### Release evidence

Before any push to the auto-deploying production branch:

- code diff and ownership review;
- focused tests, lint, builds, root Hostinger build, deterministic route audit;
- screenshots and browser checks for one representative page per distinct workflow and locale;
- artifact inventory and licenses;
- rollback instructions and feature flags;
- post-deploy HTTP, asset, canonical, locale, conversion, analytics, and sitemap checks;
- no production dashboard/browser access without separate explicit authorization.

## 15. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Thin keyword pages | Cannibalization/indexing weakness | One distinct task per URL; synonyms on canonical pages |
| Overclaiming privacy | Trust/legal harm | Observe implementation; explain browser versus upload mode before file selection |
| Office layout mismatch | Broken user output | Golden corpus, font report, preview, honest limits, no “perfect” claim |
| Worker resource exhaustion | Site outage/cost spike | Separate service, quotas, timeouts, concurrency limits, load test |
| Hostinger child-process instability | Existing site degradation | Do not colocate heavy Office conversion until isolation/capacity is proven |
| SSRF in checker | Internal system exposure | Isolated fetcher, IP/redirect revalidation, strict limits, test suite |
| Malicious documents/images | Worker/client compromise | signature checks, sandbox, no network, resource caps, dependency hardening |
| Stale platform icon requirements | Incorrect packages | official-source matrix, pinned tested date, scheduled review |
| Poor Thai localization | Weak trust/intent match | natural Thai review and Thai-specific examples/queries |
| Heavy client bundles | Weak UX/CWV | route isolation, lazy imports, Web Workers, size budgets |
| Ads disrupt the task | Lower completion/trust | reserve space; keep ads away from upload/primary action/result controls |
| Ranking expectations | Bad prioritization | use Search Console and task success; no position/date guarantee |

## 16. Decision checklist

Before implementation begins, approve:

- [ ] the two-suite scope;
- [ ] `/tools/brand/` as the category route and public category name;
- [ ] Thai and English as launch locales;
- [ ] favicon-first release order;
- [ ] no AI icon/logo generation in v1;
- [ ] no separate manifest-generator page at launch;
- [ ] upgrade of the existing DOCX canonical rather than a duplicate Word page;
- [ ] dual private-browser/layout-preserving mode model;
- [ ] separate isolated Office conversion worker;
- [ ] keyword data acquisition for Thailand and target English markets;
- [ ] publication of non-sensitive compatibility/fidelity evidence;
- [ ] free limits only after measured capacity and cost;
- [ ] release cannot push/deploy without explicit authorization.

## 17. Source and evidence register

### Repository evidence

- `djai-document-tools/app/tool-data.ts`: existing document inventory and DOCX layout warning.
- `djai-document-tools/app/processors.ts`: current HTML/canvas/JPEG DOCX-to-PDF implementation.
- `djai-document-tools/tests/build.test.mjs`: current document route inventory.
- `djai-academy-homepage/app/tools/tool-directory.js`: current public tool directory.
- `SEO_TOOL_ROADMAP.md`: existing canonicalization and distinct-workflow policy.
- `CURRENT_STATE.md`: Hostinger topology and operational cautions.

### Current primary guidance checked on 2026-08-13

- MDN, web app manifest icons: `https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons`
- MDN, defining PWA app icons: `https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Define_app_icons`
- web.dev, web app manifest: `https://web.dev/learn/pwa/web-app-manifest`
- Apple Human Interface Guidelines, app icons: `https://developer.apple.com/design/human-interface-guidelines/app-icons/`
- Apple Xcode, configuring app icons: `https://developer.apple.com/documentation/xcode/configuring-your-app-icon`
- Android Developers, adaptive icons: `https://developer.android.com/develop/ui/compose/system/icon_design_adaptive`
- Microsoft Support, Office export to PDF: `https://support.microsoft.com/en-us/office/save-or-convert-to-pdf-or-xps-in-office-desktop-apps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110`
- LibreOffice Help, PDF CLI parameters: `https://help.libreoffice.org/latest/en-US/text/shared/guide/pdf_params.html`
- Google, people-first content: `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
- Google, spam policies: `https://developers.google.com/search/docs/essentials/spam-policies`
- Google, SoftwareApplication structured data: `https://developers.google.com/search/docs/appearance/structured-data/software-app`
- Google, Core Web Vitals: `https://developers.google.com/search/docs/appearance/core-web-vitals`

### Directional third-party demand checked on 2026-08-13

- Semrush competitor overview for `realfavicongenerator.net`: US May 2026 query estimates for `favicon generator` and `icon checker`.
- Semrush competitor overview for `favicon-generator.org`: UK June 2026 favicon query estimates.
- Semrush competitor overview for `appicon.co`: India May 2026 app-icon query estimates.
- Semrush competitor overview for `smallpdf.com`: India June 2026 file-conversion query estimates.
- Semrush competitor overview for `workzly.in`: India March 2026 `excel to pdf` estimate.
- Semrush competitor overview for `easepdf.com`: Turkey January 2026 `excel to pdf` estimate.

These third-party values must be refreshed and reconciled with DJAI Search Console and target-market Keyword Planner data before they are used for budget forecasts or described as low competition.
