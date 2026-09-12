import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const policySource = await readFile(
  new URL("../app/Cam_PDF_Scan_Signer_QR-Gen/privacy/PrivacyPolicyDocument.jsx", import.meta.url),
  "utf8"
);

test("English Cam PDF policy contains the authoritative September 6 revision", () => {
  const requiredText = [
    "Privacy Policy for Cam PDF Scanner: Sign & QR",
    "Effective date: September 6, 2026 · Last updated: September 6, 2026",
    "This revision describes the Android release",
    "your age bracket;",
    "your gender selection;",
    "your country or region;",
    "your broad profession;",
    "whether you drive;",
    "your vehicle preference;",
    "may incidentally contain a local file path, file URI, or filename",
    "The current Android release does not send a separate purchase record to DJAI's backend.",
    "Deleting your App account does not cancel, refund, or erase Google Play's transaction record."
  ];

  for (const text of requiredText) {
    assert.match(policySource, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("Cam PDF policy omits unverified platform and backend claims", () => {
  assert.doesNotMatch(policySource, /Sign in with Apple/);
  assert.doesNotMatch(policySource, /App Attest/);
  assert.doesNotMatch(policySource, /Railway/);
  assert.doesNotMatch(policySource, /deletion guard/i);
  assert.doesNotMatch(policySource, /server-restricted purchase record/i);
  assert.doesNotMatch(policySource, /Real-time Developer Notifications/i);
  assert.doesNotMatch(policySource, /saniti[sz]es telemetry to remove local file/i);
});

test("Thai Cam PDF policy mirrors the corrected material disclosures", () => {
  const requiredText = [
    "วันที่มีผลบังคับใช้: 6 กันยายน 2026 · ปรับปรุงล่าสุด: 6 กันยายน 2026",
    "ช่วงอายุที่คุณเลือก",
    "เพศที่คุณเลือก",
    "ประเทศหรือภูมิภาค",
    "กลุ่มอาชีพ",
    "คุณขับรถหรือไม่",
    "ประเภทยานพาหนะที่ชอบ",
    "อาจมีเส้นทางไฟล์ URI ของไฟล์ หรือชื่อไฟล์ติดไปโดยไม่ตั้งใจ",
    "รุ่น Android ปัจจุบันไม่ส่งบันทึกการซื้อแยกต่างหากไปยัง backend ของ DJAI"
  ];

  for (const text of requiredText) {
    assert.match(policySource, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
