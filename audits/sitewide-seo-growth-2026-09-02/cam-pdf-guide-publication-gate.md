# Cam PDF guide publication gate

Decision date: 2026-09-02

Decision: do not publish the proposed Cam PDF workflow guides yet.

The live Google Play listing, DJAI privacy policy, and five product screenshots verify that Cam PDF supports scanning, edge correction, signatures, PDF tools, image-to-PDF conversion, export controls, and QR creation. They do not prove every ordered action, result, failure state, and recovery step required by the guide specification.

## Guide-by-guide evidence status

| Proposed guide | Verified now | Missing before publication |
| --- | --- | --- |
| Scan documents to PDF on Android | Scan entry point, edge-correction screen, multi-page support, naming and export controls | One observed end-to-end capture → correction → reorder → export → reopen workflow; low-light or missed-edge failure and recovery evidence |
| Sign a PDF on Android | Sign & fill capability and signature placement are stated in the Play listing | Screens showing import, signature creation or selection, placement/resizing, named-copy export, original preservation, and a failed placement/recovery case |
| Combine document photos into one PDF | Import photos, reorder, image-to-PDF, and export formats are stated in the Play listing | One observed multi-select → reorder → export → reopen workflow and evidence for correcting wrong order or an unreadable source image |

## Localization status

- English remains unpublished because the workflow evidence is incomplete.
- Thai remains unpublished because the workflow evidence is incomplete and fluent-human editorial review has not occurred.
- Vietnamese remains unpublished because no reviewed translation exists.
- The six reserved keyword-ownership records remain `indexable: false`.
- No sitemap entries or reciprocal alternates should be added until the matching locale is actually reviewed and publishable.

## Evidence needed to reopen this task

For each guide, capture a version-identifiable app test with:

1. the starting state and test file or paper pages;
2. every visible action in order;
3. the resulting filename, page count, and output format;
4. reopening or independently checking the exported result;
5. one realistic failure state;
6. the exact recovery action and recovered result;
7. dated screenshots that do not expose personal document content; and
8. fluent-human review for each non-English locale.

Until that evidence exists, publishing detailed steps would turn supported capabilities into unverified instructions. The product page may describe the verified capabilities, but the guide routes must remain absent and non-indexable.
