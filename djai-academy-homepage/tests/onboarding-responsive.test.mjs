import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL("../app/academy/OnboardingFlow.jsx", import.meta.url);
const stylesPath = new URL("../app/academy/OnboardingFlow.module.css", import.meta.url);
const copyPath = new URL("../app/academy/onboarding-copy.js", import.meta.url);
const thaiRoutePath = new URL("../app/academy/page.jsx", import.meta.url);
const englishRoutePath = new URL("../app/academy/en/page.jsx", import.meta.url);
const legacyApiPath = new URL("../app/api/academy-onboarding/route.js", import.meta.url);

const [component, styles, copy, thaiRoute, englishRoute, legacyApi] = await Promise.all([
  readFile(componentPath, "utf8"),
  readFile(stylesPath, "utf8"),
  readFile(copyPath, "utf8"),
  readFile(thaiRoutePath, "utf8"),
  readFile(englishRoutePath, "utf8"),
  readFile(legacyApiPath, "utf8")
]);

test("public Academy routes delegate onboarding to the account-authoritative School", () => {
  for (const route of [thaiRoute, englishRoute]) {
    assert.match(route, /permanentRedirect\(COMMUNITY_DESTINATION\)/);
    assert.match(route, /https:\/\/school\.djai\.academy\//);
    assert.doesNotMatch(route, /OnboardingFlow/);
  }
  assert.match(legacyApi, /status: 410/);
  assert.doesNotMatch(legacyApi, /appendFile|randomUUID|DJAI_ONBOARDING_DATA_FILE/);
});

test("mobile onboarding uses six semantic steps without changing the five-step desktop flow", () => {
  assert.match(component, /const DESKTOP_STEPS = \["guidelines", "profile", "experience", "goals", "commitment"\]/);
  assert.match(component, /const MOBILE_STEPS = \["guidelines", "profile", "experience", "programming", "goals", "commitment"\]/);
  assert.match(component, /stepId: draft\.stepId|JSON\.stringify\(\{ form, stepId \}\)/);
});

test("mobile layout covers narrow phones, normal phones, tablets, and short landscape screens", () => {
  assert.match(styles, /@media \(max-width: 820px\)/);
  assert.match(styles, /@media \(max-width: 359px\)/);
  assert.match(styles, /orientation: landscape/);
  assert.match(styles, /max-height: 520px/);
  assert.match(styles, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles, /\.goalGrid\s*\{[\s\S]*?grid-template-columns: 1fr/);
});

test("mobile controls include viewport, keyboard, touch, and safe-area protections", () => {
  assert.match(styles, /min-height: 100vh/);
  assert.match(styles, /min-height: 100dvh/);
  assert.match(styles, /env\(safe-area-inset-top\)/);
  assert.match(styles, /env\(safe-area-inset-bottom\)/);
  assert.match(styles, /font-size: 16px/);
  assert.match(styles, /position: fixed/);
  assert.match(styles, /min-height: 50px/);
});

test("browser compatibility does not depend on :has and retains older matchMedia listeners", () => {
  assert.doesNotMatch(styles, /:has\(/);
  assert.match(component, /mediaQuery\.addEventListener/);
  assert.match(component, /mediaQuery\.addListener/);
  assert.match(styles, /@supports \(backdrop-filter: blur\(14px\)\)/);
});

test("both languages include mobile-specific guideline and programming copy", () => {
  assert.match(copy, /guidelineDetails: "Read details"/);
  assert.match(copy, /programmingTitle: "Your programming background"/);
  assert.match(copy, /guidelineDetails: "ดูรายละเอียด"/);
  assert.match(copy, /programmingTitle: "พื้นฐานด้านการเขียนโปรแกรมของคุณ"/);
});
