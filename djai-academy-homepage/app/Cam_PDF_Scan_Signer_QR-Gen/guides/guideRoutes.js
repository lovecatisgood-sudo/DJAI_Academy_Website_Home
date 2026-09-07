const BASE_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/guides/";
const ARTICLE_SLUG = "remove-camscanner-watermark-free/";

export const hubPaths = {
  en: BASE_PATH,
  th: "/Cam_PDF_Scan_Signer_QR-Gen/guides/th/",
  vi: "/Cam_PDF_Scan_Signer_QR-Gen/guides/vi/",
  "zh-CN": "/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-cn/",
  "zh-TW": "/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-tw/"
};

export const articlePaths = {
  en: `${BASE_PATH}${ARTICLE_SLUG}`,
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
