import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
const base = new URL("../app/Cam_PDF_Scan_Signer_QR-Gen/", import.meta.url);
const policy = JSON.parse(await readFile(new URL("privacy/policy-content.json", base), "utf8"));
const text = JSON.stringify(policy);

test("current policy covers both platforms and discloses actual telemetry controls", () => {
  assert.equal(policy.date, "Revision date: September 28, 2026");
  assert.equal(policy.sections.length, 14);
  for (const expected of ["DEEJAI LAB Co., Ltd", "0105569117953", "Android and iOS", "Signing in does not add uses", "does not currently provide a separate Firebase Analytics switch", "these events can be linked to your account", "App Attest", "contact@djai.academy"]) assert.ok(text.includes(expected), expected);
  assert.doesNotMatch(text, /does not claim coverage for an iOS|Siamese Cat Cafe Company|TODO|TBD/);
});
test("retention and deletion do not promise immediate erasure", () => {
  assert.ok(text.includes("expiry target is not a guarantee of immediate physical deletion"));
  assert.ok(text.includes("Apple sign-in accounts may require fresh Apple authentication"));
  assert.ok(text.includes("does not delete documents on your device"));
  assert.doesNotMatch(text, /deleted within 24 hours|processed immediately/);
});
test("all linked privacy locales render the same current policy and disclose language", async () => {
  for (const path of ["privacy/page.jsx", "privacy/th/page.jsx", "zh-cn/privacy/page.jsx", "zh-tw/privacy/page.jsx"]) {
    assert.match(await readFile(new URL(path, base), "utf8"), /PrivacyPolicyDocument/);
  }
  const component = await readFile(new URL("privacy/PrivacyPolicyDocument.jsx", base), "utf8");
  assert.match(component, /lang="en"/);
  for (const locale of ['th:', '"zh-CN":', '"zh-TW":']) assert.ok(component.includes(locale));
});
