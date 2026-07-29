# DJAI Tool SEO Roadmap

Updated: 2026-07-29

## Implementation Status

Completed on 2026-07-29: the PDF, QR, image, and media clusters in this roadmap were implemented, integrated into the sitemap and tool hubs, and verified through the root Hostinger build, route crawler, browser conversion tests, responsive checks, and Lighthouse. The detailed release evidence is in `IMPLEMENTATION_AUDIT_2026-07-29.md`.

## Objective

Grow qualified organic traffic to DJAI's free tools by publishing pages that solve distinct user tasks. Do not create near-duplicate pages only to target wording variations; combine synonyms on one strong canonical page.

## Core Decision

An indexable URL must provide a genuinely different workflow, input/output format, preset, or user outcome. Its title, H1, interface state, explanatory content, FAQ, and result must all match that intent.

Synonyms for the same task belong on one page in the title, description, visible copy, FAQ, and internal-link text. Redirect legacy synonym URLs to the canonical page.

## Priority 1: Strengthen Existing Pages

- Keep `word-to-pdf` redirected to the canonical `docx-to-pdf` tool. Optimize the canonical title and H1 for both "Word to PDF" and "DOCX to PDF".
- Consolidate equivalent terms such as `watermark-pdf` / `add-watermark-to-pdf`, `protect-pdf` / `password-protect-pdf`, and `remove-background-image` / `transparent-background-maker`.
- Give every indexable page a unique title, H1, meta description, canonical URL, useful visible content, related-tool links, and Thai/English alternate links.
- Add reciprocal `hreflang` annotations for every Thai/English pair.
- Use truthful sitemap `lastmod` values only when the page changed significantly.

## Priority 2: Distinct PDF Search Intents

Build only when the named operation works directly on that page:

- `png-to-pdf`
- `webp-to-pdf`
- `pdf-to-png`
- `delete-pages-from-pdf`
- `reorder-pdf-pages`
- `extract-pdf-pages`
- `remove-password-from-pdf` only if technically reliable and clearly limited to files whose password the user knows

Each format page must preload the matching input/output mode. Each operation page must open the relevant editor rather than acting as an intermediate landing page.

## Priority 3: Audio and Video Tools

Create a separate media-tools application and category hub. Initial high-value routes:

- `mp3-to-wav`
- `wav-to-mp3`
- `m4a-to-mp3`
- `mp4-to-mp3`
- `extract-audio-from-video`
- `mp4-to-webm`
- `webm-to-mp4`
- `mov-to-mp4`
- `compress-video`

Use browser-side processing where practical, with explicit file-size, device-memory, codec, and browser limitations. A page is indexable only after its conversion works reliably.

## Priority 4: Task-Specific QR Tools

- `url-qr-code-generator`
- `wifi-qr-code-generator`
- `vcard-qr-code-generator`
- `text-qr-code-generator`
- `email-qr-code-generator`
- `whatsapp-qr-code-generator`
- `qr-code-generator-with-logo`

These pages should expose task-specific fields and validation, not only change the heading above the same generic interface.

## Priority 5: Image Workflows

- `avif-to-jpg`
- `avif-to-png`
- `jpg-to-avif` when browser support and output reliability are verified
- `passport-photo-resizer` with real dimensions, crop ratios, and country/document presets
- Carefully selected target-size pages such as `resize-image-to-200kb` when the target is preconfigured and achievable

Do not create `jpeg-to-jpg` or `jpg-to-jpeg`; JPG and JPEG are the same format. Avoid mass-producing target-size pages with nearly identical content.

## Priority 6: AI and Token Tools

- `chatgpt-token-counter` only with model-appropriate tokenization
- Platform-specific token pages only when their calculations and limits genuinely differ
- Consider `pdf-to-markdown`, `pdf-to-chatgpt`, and `split-text-for-rag` only when each offers a distinct, complete workflow

Do not label an approximate character count as an exact model token count.

## Page Quality Requirements

Every new tool URL must include:

- A working, intent-specific tool above or near the primary content
- A concise unique title and one clear H1
- Supported inputs, outputs, privacy behavior, limitations, and troubleshooting
- Original Thai and English copy, not partially translated templates
- Self-referencing canonical metadata
- Reciprocal Thai/English `hreflang`
- Links from its category hub and contextually related tools
- Inclusion in the sitemap only after the production URL is usable
- Accurate structured data without invented reviews, ratings, or claims
- Mobile usability and acceptable Core Web Vitals

## Do Not Build as Separate Indexable Pages

- Pure spelling or naming variants
- Pages that only funnel users to another tool
- Pages sharing the same interface and content with only a keyword replaced
- Pages for unsupported conversions or misleading token calculations
- Large batches of thin, templated file-size or format combinations

These patterns risk keyword cannibalization, weak indexing, and Google's doorway-abuse classification.

## Measurement and Audit

- Use Google Search Console for indexing, queries, clicks, impressions, and page-level performance.
- Use Lighthouse during development and continuous checks for reproducible lab diagnostics.
- Use PageSpeed Insights and the Chrome UX Report for field Core Web Vitals when a URL has enough real-user data.
- Compare tool pages by query intent, organic landing-page traffic, conversion completion, and Core Web Vitals.
- Rework, consolidate, redirect, or remove pages that remain thin or duplicate instead of adding more variants.

## Implementation Order

1. Improve existing metadata, canonicals, `hreflang`, internal links, and sitemap accuracy.
2. Add distinct PDF format and page-operation tools.
3. Build the separate audio/video tools cluster.
4. Add task-specific QR workflows.
5. Add AVIF and specialized image workflows.
6. Add model-specific AI tools only after technical accuracy is verified.
