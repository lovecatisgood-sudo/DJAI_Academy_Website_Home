import test from "node:test";
import assert from "node:assert/strict";

import {
  CHINESE_LOCALES,
  getRouteById,
  localizedUrl,
  validatePublication
} from "../config/public-route-registry.mjs";

test("Chinese markets use explicit regional locale values", () => {
  assert.deepEqual(CHINESE_LOCALES, [
    { locale: "zh-CN", segment: "zh-cn", label: "简体中文", market: "中国大陆" },
    { locale: "zh-TW", segment: "zh-tw", label: "繁體中文", market: "台灣" }
  ]);
});

test("tool equivalents preserve suffix routing", () => {
  const route = getRouteById("qr.url-generator");

  assert.equal(
    localizedUrl(route, "zh-CN"),
    "/tools/qrgen/url-qr-code-generator/zh-cn/"
  );
  assert.equal(
    localizedUrl(route, "zh-TW"),
    "/tools/qrgen/url-qr-code-generator/zh-tw/"
  );
});

test("native review is required for indexation", () => {
  const result = validatePublication(getRouteById("home"), "zh-CN", {
    localized: true,
    keywordReviewed: true,
    nativeReviewed: false,
    qaApproved: true
  });

  assert.deepEqual(result, {
    indexable: false,
    reasons: ["native-review-required"]
  });
});

test("legal content also requires specialist review", () => {
  const result = validatePublication(getRouteById("cam-pdf.privacy"), "zh-TW", {
    localized: true,
    keywordReviewed: true,
    nativeReviewed: true,
    specialistReviewed: false,
    qaApproved: true
  });

  assert.deepEqual(result, {
    indexable: false,
    reasons: ["specialist-review-required"]
  });
});
