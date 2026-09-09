const BASE_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/guides/";
const ARTICLE_SLUG = "remove-camscanner-watermark-free/";

export const guideArticlePaths = {
  watermark: `${BASE_PATH}${ARTICLE_SLUG}`,
  multiPage: `${BASE_PATH}scan-multiple-pages-to-pdf-android/`,
  pdfQr: `${BASE_PATH}share-pdf-with-qr-code/`,
  scanSign: `${BASE_PATH}scan-sign-send-pdf-android/`
};

const workflowSlugs = {
  multiPage: "scan-multiple-pages-to-pdf-android/",
  pdfQr: "share-pdf-with-qr-code/",
  scanSign: "scan-sign-send-pdf-android/"
};

const localeSegments = {
  en: "",
  th: "th/",
  vi: "vi/",
  "zh-CN": "zh-cn/",
  "zh-TW": "zh-tw/"
};

export const workflowGuidePaths = Object.fromEntries(
  Object.entries(workflowSlugs).map(([key, slug]) => [
    key,
    Object.fromEntries(Object.entries(localeSegments).map(([locale, segment]) => [
      locale,
      `${BASE_PATH}${segment}${slug}`
    ]))
  ])
);

export const workflowGuideLanguageHrefs = Object.fromEntries(
  Object.keys(workflowSlugs).map((key) => [key, {
      en: workflowGuidePaths[key].en,
      th: workflowGuidePaths[key].th,
      vi: workflowGuidePaths[key].vi,
      "zh-CN": workflowGuidePaths[key]["zh-CN"],
      "zh-TW": workflowGuidePaths[key]["zh-TW"],
      "x-default": workflowGuidePaths[key].en
    }])
);

export const workflowGuideHeaderHrefs = Object.fromEntries(
  Object.keys(workflowSlugs).map((key) => [key, {
    en: workflowGuidePaths[key].en,
    th: workflowGuidePaths[key].th,
    vi: workflowGuidePaths[key].vi,
    "zh-CN": workflowGuidePaths[key]["zh-CN"],
    "zh-TW": workflowGuidePaths[key]["zh-TW"]
  }])
);

export const hubPaths = {
  en: BASE_PATH,
  th: "/Cam_PDF_Scan_Signer_QR-Gen/guides/th/",
  vi: "/Cam_PDF_Scan_Signer_QR-Gen/guides/vi/",
  "zh-CN": "/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-cn/",
  "zh-TW": "/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-tw/"
};

export const articlePaths = {
  en: guideArticlePaths.watermark,
  th: "/Cam_PDF_Scan_Signer_QR-Gen/guides/th/remove-camscanner-watermark-free/",
  vi: "/Cam_PDF_Scan_Signer_QR-Gen/guides/vi/remove-camscanner-watermark-free/",
  "zh-CN": "/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-cn/remove-camscanner-watermark-free/",
  "zh-TW": "/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-tw/remove-camscanner-watermark-free/"
};

export const hubLanguageHrefs = {
  "en": hubPaths.en,
  "th": hubPaths.th,
  "vi": hubPaths.vi,
  "zh-CN": hubPaths["zh-CN"],
  "zh-TW": hubPaths["zh-TW"],
  "x-default": hubPaths.en
};

export const articleLanguageHrefs = {
  "en": articlePaths.en,
  "th": articlePaths.th,
  "vi": articlePaths.vi,
  "zh-CN": articlePaths["zh-CN"],
  "zh-TW": articlePaths["zh-TW"],
  "x-default": articlePaths.en
};

export const hubHeaderHrefs = {
  "en": hubPaths.en,
  "th": hubPaths.th,
  "vi": hubPaths.vi,
  "zh-CN": hubPaths["zh-CN"],
  "zh-TW": hubPaths["zh-TW"]
};

export const articleHeaderHrefs = {
  "en": articlePaths.en,
  "th": articlePaths.th,
  "vi": articlePaths.vi,
  "zh-CN": articlePaths["zh-CN"],
  "zh-TW": articlePaths["zh-TW"]
};
