import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  validateKeywordRecord,
  validateTermbase
} from "../scripts/validate-localization.mjs";

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const zhCn = readJson("../content/localization/zh-CN/termbase.json");
const zhTw = readJson("../content/localization/zh-TW/termbase.json");
const keywordMap = readJson("../content/localization/keyword-map.json");

test("market termbases are independently authored", () => {
  assert.equal(zhCn.terms.file.preferred, "文件");
  assert.equal(zhTw.terms.file.preferred, "檔案");
  assert.equal(zhCn.terms.software.preferred, "软件");
  assert.equal(zhTw.terms.software.preferred, "軟體");
  assert.equal(zhCn.terms.artificialIntelligence.preferred, "人工智能");
  assert.equal(zhTw.terms.artificialIntelligence.preferred, "人工智慧");
  assert.notDeepEqual(zhCn.terms, zhTw.terms);
});

test("keyword records require intent and dated evidence", () => {
  assert.deepEqual(
    validateKeywordRecord({ locale: "zh-TW", query: "PDF 掃描器" }),
    [
      "semanticId-required",
      "intent-required",
      "evidence-required",
      "evidenceDate-required"
    ]
  );
});

test("current research records are qualitative and do not invent volume", () => {
  assert.ok(keywordMap.mappings.length >= 20);
  for (const record of keywordMap.mappings) {
    assert.deepEqual(validateKeywordRecord(record), []);
    assert.equal(record.evidenceKind, "qualitative");
    assert.equal("monthlyVolume" in record, false);
  }
});

test("both termbases satisfy the contextual term contract", () => {
  assert.deepEqual(validateTermbase(zhCn), []);
  assert.deepEqual(validateTermbase(zhTw), []);
});
