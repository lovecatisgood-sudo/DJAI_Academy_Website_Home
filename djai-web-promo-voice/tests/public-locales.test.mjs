import assert from "node:assert/strict";
import test from "node:test";
import { chinesePromoCopy, publicLocaleFromPath } from "../src/lib/public-locales.ts";

test("parses Chinese public paths without changing admin locale state", () => {
  assert.equal(publicLocaleFromPath("/zh-cn/"), "zh-CN");
  assert.equal(publicLocaleFromPath("/zh-tw/"), "zh-TW");
  assert.equal(publicLocaleFromPath("/voice_admin/"), "th");
});

test("ships independent Mainland China and Taiwan promo copy", () => {
  assert.match(chinesePromoCopy["zh-CN"].title, /网站/);
  assert.match(chinesePromoCopy["zh-TW"].title, /網站/);
  assert.notEqual(chinesePromoCopy["zh-CN"].description, chinesePromoCopy["zh-TW"].description);
  assert.equal(chinesePromoCopy["zh-CN"].packages.length, 3);
  assert.equal(chinesePromoCopy["zh-TW"].packages.length, 3);
});
