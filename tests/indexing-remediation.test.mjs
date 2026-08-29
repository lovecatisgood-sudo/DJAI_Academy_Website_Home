import test from "node:test";
import assert from "node:assert/strict";
import { accessSync, readFileSync } from "node:fs";

import {
  alternateFor,
  languageForPath,
  localeLinksFor
} from "../djai-academy-homepage/app/lib/i18n.js";

const read = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

test("Cam PDF Thai privacy route keeps a Thai document language", () => {
  assert.equal(
    languageForPath("/Cam_PDF_Scan_Signer_QR-Gen/privacy/th/"),
    "th"
  );
});

test("review-gated Chinese pages do not advertise hreflang alternates", () => {
  assert.deepEqual(alternateFor("portfolio", "zh-CN"), {
    canonical: "/portfolio/zh-cn/"
  });
});

test("locale navigation does not expose nonexistent Siamese Cat routes", () => {
  assert.deepEqual(
    localeLinksFor("siameseCat", "en").map(({ locale }) => locale),
    ["th"]
  );
});

test("Chinese blog navigation targets real review-gated hub pages", () => {
  for (const segment of ["zh-cn", "zh-tw"]) {
    const route = `djai-academy-homepage/app/blog/${segment}/page.jsx`;
    assert.doesNotThrow(() => accessSync(new URL(`../${route}`, import.meta.url)));
  }
  assert.match(read("djai-academy-homepage/app/blog/ChineseBlogHub.jsx"), /index:\s*false/);
});

test("mounted promo locale routes are normalized before proxying to Next", () => {
  const source = read("server.js");
  assert.match(source, /\["vi",\s*"zh-cn",\s*"zh-tw"\]\.includes\(promoLocale\)/);
});
