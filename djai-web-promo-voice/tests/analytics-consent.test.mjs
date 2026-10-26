import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import test from "node:test";
import { readFileSync } from "node:fs";
import { analyticsConsentScript } from "../src/lib/analytics-consent.ts";

function run(choice, code = analyticsConsentScript("G-CGJ5BTR44T")) {
  const scripts = [];
  const window = { localStorage: { getItem: () => typeof choice === "string" ? choice : JSON.stringify(choice) } };
  const document = { getElementById: () => scripts[0] || null, createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) } };
  const context = { window, document };
  runInNewContext(code, context);
  return { scripts, window, rerun: () => runInNewContext(code, context) };
}

test("missing, refused, malformed, expired and future consent never load Analytics", () => {
  for (const choice of [null, "{bad", { version: 1, analytics: false, savedAt: Date.now() }, { version: 1, analytics: true, advertising: false, savedAt: Date.now() - 181 * 86400000 }, { version: 1, analytics: true, advertising: false, savedAt: Date.now() + 86400000 }, { version: 2, analytics: true, savedAt: Date.now() }]) {
    const result = run(choice);
    assert.equal(result.scripts.length, 0);
    assert.equal(result.window.dataLayer[0][2].ad_storage, "denied");
  }
});

test("current analytics consent loads once and never grants advertising consent", () => {
  const result = run({ version: 1, analytics: true, advertising: true, savedAt: Date.now() });
  assert.equal(result.scripts.length, 1);
  assert.match(result.scripts[0].src, /gtag\/js\?id=G-CGJ5BTR44T$/);
  assert.ok(result.window.dataLayer.some((entry) => entry[0] === "consent" && entry[1] === "update" && entry[2].analytics_storage === "granted" && entry[2].ad_storage === "denied"));
  result.rerun();
  assert.equal(result.scripts.length, 1);
});

test("invalid identifiers cannot be interpolated into executable script", () => {
  assert.throws(() => analyticsConsentScript("</script>"), /Invalid/);
});

const sharedScript = () => readFileSync(new URL("../../djai-academy-homepage/public/analytics-consent.js", import.meta.url), "utf8");
test("shared tool gate respects the persisted schema and never enables ads", () => {
  const script = sharedScript();
  for (const choice of [null, "{bad", { version: 1, analytics: true, savedAt: Date.now() }, { version: 1, analytics: true, advertising: false, savedAt: Date.now() + 86400000 }, { version: 1, analytics: true, advertising: false, savedAt: Date.now() - 181 * 86400000 }]) {
    assert.equal(run(choice, script).scripts.length, 0);
  }
  const result = run({ version: 1, analytics: true, advertising: false, savedAt: Date.now() }, script);
  assert.equal(result.scripts.length, 1);
  result.rerun();
  assert.equal(result.scripts.length, 1);
  assert.equal(result.window.dataLayer.find((entry) => entry[1] === "update")[2].ad_storage, "denied");
});

test("every mounted tool layout uses the shared gate instead of a direct Analytics loader", () => {
  for (const path of ["djai-pdf-tools/app/layout.tsx", "DJayTools-Free-QR-Generator-Source/app/layout.tsx", "djai-document-tools/app/layout.tsx", "djai-academy-course/app/layout.jsx", "djai-media-tools/scripts/build.mjs", "Siamese-Cat-Dev-Bio-Site/index.html", "djai-image-resizer/public/index.html", "djai-image-resizer/public/en/index.html"]) {
    const source = readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
    assert.ok(source.includes('/analytics-consent.js'), path);
    assert.ok(!source.includes('googletagmanager.com/gtag/js'), path);
  }
});
