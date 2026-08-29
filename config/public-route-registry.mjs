import {
  CHINESE_LOCALES,
  CHINESE_LOCALE_BY_ID
} from "./chinese-locales.mjs";

export { CHINESE_LOCALES };

const routes = Object.freeze([
  Object.freeze({
    semanticId: "home",
    application: "djai-academy-homepage",
    family: "marketing",
    pageKind: "marketing",
    chinesePathBase: "/",
    chinesePathStyle: "prefix",
    requiresSpecialistReview: false,
    isAlias: false
  }),
  Object.freeze({
    semanticId: "qr.url-generator",
    application: "DJayTools-Free-QR-Generator-Source",
    family: "tools",
    pageKind: "tool",
    chinesePathBase: "/tools/qrgen/url-qr-code-generator/",
    chinesePathStyle: "suffix",
    requiresSpecialistReview: false,
    isAlias: false
  }),
  Object.freeze({
    semanticId: "cam-pdf.privacy",
    application: "djai-academy-homepage",
    family: "cam-pdf",
    pageKind: "legal",
    chinesePathBase: "/Cam_PDF_Scan_Signer_QR-Gen/privacy/",
    chinesePathStyle: "suffix",
    requiresSpecialistReview: true,
    isAlias: false
  })
]);

const routeById = new Map(routes.map((route) => [route.semanticId, route]));

export function getRouteById(semanticId) {
  const route = routeById.get(semanticId);
  if (!route) throw new Error(`Unknown semantic route: ${semanticId}`);
  return route;
}

export function localizedUrl(route, locale) {
  const localeDefinition = CHINESE_LOCALE_BY_ID.get(locale);
  if (!localeDefinition) throw new Error(`Unsupported Chinese locale: ${locale}`);

  if (route.chinesePathStyle === "prefix") {
    return `/${localeDefinition.segment}/`;
  }

  return `${route.chinesePathBase}${localeDefinition.segment}/`;
}

export function validatePublication(route, locale, review = {}) {
  if (!CHINESE_LOCALE_BY_ID.has(locale)) {
    return { indexable: false, reasons: ["unsupported-locale"] };
  }

  const reasons = [];
  if (!review.localized) reasons.push("localization-required");
  if (!review.keywordReviewed) reasons.push("keyword-review-required");
  if (!review.nativeReviewed) reasons.push("native-review-required");
  if (route.requiresSpecialistReview && !review.specialistReviewed) {
    reasons.push("specialist-review-required");
  }
  if (!review.qaApproved) reasons.push("qa-approval-required");

  return { indexable: reasons.length === 0, reasons };
}

export function publicRouteRegistry() {
  return routes;
}
