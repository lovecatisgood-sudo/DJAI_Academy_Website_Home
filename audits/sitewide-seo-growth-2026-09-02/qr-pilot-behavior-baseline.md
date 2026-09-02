# QR acquisition pilot behavior baseline

Captured: 2026-09-02

Pre-change source reference: `90169b5`

Pilot focus: `/tools/qrgen/url-qr-code-generator/` with the shared Thai, English, and Vietnamese generator interfaces.

## Preserved QR contract

- URL values are trimmed and receive `https://` when no HTTP/HTTPS scheme is present.
- Wi-Fi, vCard, text, email, WhatsApp, and logo modes keep separate payload builders and validation rules.
- QR rendering remains 280 × 280 with error correction level Q, a 12-pixel margin, and the existing dot, corner, color, frame, and logo controls.
- The output filename remains `DJayTools-QR-Code` with the selected PNG or SVG extension.
- The input payload remains only in component/browser state and is passed to `qr-code-styling`; the acquisition change does not modify `qr-payload.ts` or `QrTaskFields.tsx`.
- Existing payload fixtures still produce the exact URL, Wi-Fi, vCard, email, and WhatsApp strings asserted by `tests/qr-payload.test.mjs`.

## Acquisition change

- The URL route now explicitly covers Thai variants for making a QR code from a link or URL while preserving one canonical task page.
- A successful download sets a local success state.
- The success journey shows one deterministic related QR type first, then the Cam PDF Android bridge.
- Business-oriented URL, vCard, email, WhatsApp, and logo routes also expose Development as a secondary text link after the Cam context.
- The localStorage-based alternating course/development modal and its unused styles were removed.
- The always-visible pre-download Cam banner was removed from Thai and English pages.
- Thai, English, and Vietnamese downloads emit `tool_start`, `tool_success`, and `tool_download`; the Cam link emits `play_store_click`.
- Events contain only source path, locale, `cluster: qr`, stable tool slug, and outbound destination fields. URL, QR payload, message, email, phone, and logo data are never passed.

## Verification

- 11 package tests pass, including exact payload fixtures, acquisition-order checks, distinct task metadata, and static HTML checks.
- The 42-page Next static build passes.
- ESLint reports zero errors and 13 pre-existing `no-img-element` warnings.
- Initial static HTML contains no Google Play CTA because the Cam bridge is rendered only after a successful client-side download.

## Evidence limitation

No browser or GUI interaction was performed because action-specific permission has not been granted. Live decoded-image comparison, click/download behavior, responsive screenshots, and network-panel inspection remain open for G4/G10. The passing payload fixtures and unchanged payload/rendering modules are source evidence, not a claim that runtime browser review occurred.
