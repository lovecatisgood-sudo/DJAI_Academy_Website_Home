# PDF acquisition pilot behavior baseline

Captured: 2026-09-02

Pre-change source reference: `326d669`

Pilot routes:

- `/tools/PDFTools/images-to-pdf/`
- `/tools/PDFTools/compress-pdf/`
- `/tools/PDFTools/jpg-to-pdf/`
- `/tools/PDFTools/png-to-pdf/`
- `/tools/PDFTools/webp-to-pdf/`

## Source-observed task contract

| Behavior | Images to PDF | Compress PDF |
| --- | --- | --- |
| Accepted input | JPG, PNG, and WebP; aliases restrict the file picker and MIME filter to their named format | One PDF |
| File count | One or more images | One PDF |
| Maximum size | 100 MB per file, enforced by `processFiles` | 100 MB, enforced by `processFiles` |
| Ordering | Up/down controls change the image array before processing | Not applicable |
| Options | Auto/A4/Letter and auto/portrait/landscape | Light, Recommended, or Strong |
| Output | One PDF named `DJTools-images.pdf`; result count equals input image count | A `-compressed.pdf` copy; result count equals PDF page count |
| Important boundary | Source images are fitted to their pages; mixed JPG, PNG, and WebP are supported | Light performs structural optimization. Recommended/Strong flatten pages, so links, forms, and searchable text may be lost. If recompression is not smaller, the smallest source/optimized representation is retained. |
| Reset | Revokes the result object URL, clears files/result/error, restores configured defaults, and resets the file input | Same |
| Error path | Empty selection and files over 100 MB are rejected; processing errors are shown in an alert region | Same, plus browser canvas/PDF decode failures surface through the alert region |

## Privacy and network boundary

- `pdf-actions.ts` reads browser `File` objects and creates `Blob` results locally.
- The PDF renderer loads its worker from `/tools/PDFTools/pdf.worker.min.mjs`.
- The processing path contains no upload, `fetch`, XHR, or document-content analytics call.
- Advertising and aggregate analytics may make ordinary page-level network requests, but the SEO event contract permits only stable route, locale, cluster, tool, and destination dimensions. It rejects file names, file content, document content, payloads, email, and phone data.

## Implementation comparison

The acquisition pilot does not modify `pdf-actions.ts`, input filtering, ordering controls, settings, result construction, reset logic, error handling, or the local worker path. It changes only:

- intent copy for the multi-format image-to-PDF route;
- the broad-query assignment between the multi-format route and JPG-only alias;
- privacy-safe start/success/download/outbound events;
- post-success ordering; and
- removal of the random promotion modal and unrelated course conversion band.

## Evidence limitation

No browser or GUI interaction was performed because the repository requires action-specific permission before browser access, and that permission has not been given. Source tests, existing PDF behavior tests, static export tests, lint, and the production build provide the current evidence. Mobile screenshots, live input/process/download/reset/error interaction, and network-panel comparison remain open for G4/G10 and must not be represented as completed.
