import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const policySource = await readFile(
  new URL("../app/Cam_PDF_Scan_Signer_QR-Gen/privacy/PrivacyPolicyDocument.jsx", import.meta.url),
  "utf8"
);

test("English Cam PDF policy contains the authoritative August 21 revision", () => {
  const requiredText = [
    "Privacy Policy for Cam PDF Scan Signer QR Gen",
    "Effective date: August 21, 2026 · Last updated: August 21, 2026",
    "The App sends the Google Play purchase token to DJAI's protected Firebase backend.",
    "DJAI stores the raw purchase token only in a server-restricted purchase record",
    "DJAI receives Google Play Real-time Developer Notifications",
    "Google Play purchase and refund records may be retained after account deletion",
    "Account deletion also removes the active billing-entitlement record"
  ];

  for (const text of requiredText) {
    assert.match(policySource, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("English Cam PDF policy does not contain the superseded purchase paragraph", () => {
  assert.doesNotMatch(policySource, /In the currently published implementation/);
  assert.doesNotMatch(policySource, /requires migration to server-side Google Play verification/);
});
