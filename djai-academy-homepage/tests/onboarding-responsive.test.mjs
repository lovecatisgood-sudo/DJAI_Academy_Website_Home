import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL("../app/academy/OnboardingFlow.jsx", import.meta.url);
const stylesPath = new URL("../app/academy/OnboardingFlow.module.css", import.meta.url);
const copyPath = new URL("../app/academy/onboarding-copy.js", import.meta.url);

const [component, styles, copy] = await Promise.all([
  readFile(componentPath, "utf8"),
  readFile(stylesPath, "utf8"),
  readFile(copyPath, "utf8")
]);

test("public Academy page sends onboarding to authenticated School routes", () => {
  assert.match(copy, /SIGNUP_DESTINATION = "https:\/\/school\.djai\.academy\/signup\?returnTo=%2Fonboarding%2Fprofile"/);
  assert.match(copy, /LOGIN_DESTINATION = "https:\/\/school\.djai\.academy\/login\?returnTo=%2Fonboarding%2Fprofile"/);
  assert.match(component, /href=\{SIGNUP_DESTINATION\}/);
  assert.match(component, /href=\{LOGIN_DESTINATION\}/);
});

test("public Academy page is not an anonymous survey or completion gate", () => {
  assert.doesNotMatch(component, /localStorage|academy-onboarding|fetch\(|DRAFT_KEY|COMPLETE_KEY/);
  assert.doesNotMatch(component, /"use client"/);
});

test("responsive teaser supports touch targets, safe areas, and reduced motion", () => {
  assert.match(styles, /min-height: 100vh/);
  assert.match(styles, /min-height: 100dvh/);
  assert.match(styles, /env\(safe-area-inset-top\)/);
  assert.match(styles, /min-height: 50px/);
  assert.match(styles, /@media \(max-width: 820px\)/);
  assert.match(styles, /@media \(max-width: 480px\)/);
  assert.match(styles, /orientation: landscape/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test("both languages explain authenticated, account-connected onboarding", () => {
  assert.match(copy, /Your onboarding answers are saved only after you sign in/);
  assert.match(copy, /คำตอบการเริ่มต้นใช้งานจะถูกบันทึกหลังจากเข้าสู่ระบบเท่านั้น/);
  assert.match(copy, /Complete the six-step learner survey securely/);
  assert.match(copy, /ทำแบบสำรวจผู้เรียน 6 ขั้นตอนอย่างปลอดภัย/);
});
