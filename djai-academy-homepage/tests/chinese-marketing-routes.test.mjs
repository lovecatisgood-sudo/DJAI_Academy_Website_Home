import test from "node:test";
import assert from "node:assert/strict";
import { accessSync } from "node:fs";

import {
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  alternateFor,
  languageForPath,
  pathFor
} from "../app/lib/i18n.js";
import { zhCnMarketingContent } from "../app/lib/zhCnContent.js";
import { zhTwMarketingContent } from "../app/lib/zhTwContent.js";
import { consentCopy, privacyPathForLocale } from "../app/lib/consentCopy.js";

const routeFiles = [
  "app/zh-cn/page.jsx",
  "app/zh-tw/page.jsx",
  "app/portfolio/zh-cn/page.jsx",
  "app/portfolio/zh-tw/page.jsx",
  "app/tools/zh-cn/page.jsx",
  "app/tools/zh-tw/page.jsx",
  "app/service/zh-cn/page.jsx",
  "app/service/zh-tw/page.jsx",
  "app/development/zh-cn/page.jsx",
  "app/development/zh-tw/page.jsx",
  "app/academy/zh-cn/page.jsx",
  "app/academy/zh-tw/page.jsx",
  "app/contact-us/zh-cn/page.jsx",
  "app/contact-us/zh-tw/page.jsx",
  "app/privacy/zh-cn/page.jsx",
  "app/privacy/zh-tw/page.jsx",
  "app/tools/seo-screaming-toad/zh-cn/page.jsx",
  "app/tools/seo-screaming-toad/zh-tw/page.jsx"
];

test("main i18n exposes both Chinese markets", () => {
  assert.deepEqual(SUPPORTED_LOCALES, ["th", "en", "vi", "zh-CN", "zh-TW"]);
  assert.equal(pathFor("service", "zh-CN"), "/service/zh-cn/");
  assert.equal(pathFor("service", "zh-TW"), "/service/zh-tw/");
  assert.equal(LOCALE_LABELS["zh-CN"], "简体中文");
  assert.equal(LOCALE_LABELS["zh-TW"], "繁體中文");
});

test("Chinese alternates are reciprocal and Thai remains x-default", () => {
  assert.deepEqual(alternateFor("portfolio", "zh-CN").languages, {
    en: "/portfolio/en/",
    th: "/portfolio/",
    vi: "/portfolio/vi/",
    "zh-CN": "/portfolio/zh-cn/",
    "zh-TW": "/portfolio/zh-tw/",
    "x-default": "/portfolio/"
  });
});

test("request language detection recognizes both Chinese URL segments", () => {
  assert.equal(languageForPath("/zh-cn/"), "zh-CN");
  assert.equal(languageForPath("/tools/PDFTools/merge-pdf/zh-tw/"), "zh-TW");
  assert.equal(languageForPath("/service/en/"), "en");
  assert.equal(languageForPath("/"), "th");
});

test("market homepage copy is independently localized", () => {
  assert.match(zhCnMarketingContent.home.hero.title, /人工智能|AI/);
  assert.match(zhTwMarketingContent.home.hero.title, /人工智慧|AI/);
  assert.notEqual(
    zhCnMarketingContent.home.hero.description,
    zhTwMarketingContent.home.hero.description
  );
  assert.match(zhCnMarketingContent.tools.hero.description, /文件/);
  assert.match(zhTwMarketingContent.tools.hero.description, /檔案/);
});

test("every approved marketing route has both Chinese page modules", () => {
  for (const relativePath of routeFiles) {
    assert.doesNotThrow(() => accessSync(new URL(`../${relativePath}`, import.meta.url)));
  }
});

test("draft Chinese marketing pages remain non-indexable before native review", () => {
  for (const content of [zhCnMarketingContent, zhTwMarketingContent]) {
    for (const page of Object.values(content).filter((value) => value?.meta)) {
      assert.equal(page.indexable, false);
    }
  }
});

test("cookie consent is fully localized for both Chinese markets", () => {
  assert.match(consentCopy["zh-CN"].summary, /分析|广告/);
  assert.match(consentCopy["zh-TW"].summary, /分析|廣告/);
  assert.equal(privacyPathForLocale("zh-CN"), "/privacy/zh-cn/");
  assert.equal(privacyPathForLocale("zh-TW"), "/privacy/zh-tw/");
});
