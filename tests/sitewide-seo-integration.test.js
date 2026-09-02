const assert = require("node:assert/strict");
const { existsSync, readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => readFileSync(path.join(root, relativePath), "utf8");
const localeMap = JSON.parse(read("audits/sitewide-seo-growth-2026-09-02/locale-map.json"));
const ownership = JSON.parse(read("data/seo/keyword-ownership.json"));

function localeRoute(base, member, locale) {
  const stem = member ? `${base}${member}/` : base;
  return locale === "th" ? stem : `${stem}${locale}/`;
}

function mappedRoutes() {
  const routes = [];
  for (const group of localeMap.equivalentGroups) {
    for (const [locale, route] of Object.entries(group.variants)) routes.push({ route, locale, group: group.id });
  }
  for (const family of localeMap.toolFamilies) {
    for (const member of family.members) {
      for (const locale of family.locales) routes.push({ route: localeRoute(family.base, member, locale), locale, group: family.id });
    }
    for (const [locale, members] of Object.entries(family.additionalLocaleMembers || {})) {
      for (const member of members) routes.push({ route: localeRoute(family.base, member, locale), locale, group: family.id });
    }
  }
  for (const item of localeMap.singleLocaleRoutes) routes.push({ ...item, group: "single" });
  return routes;
}

function htmlAttribute(html, tagName, attribute) {
  const tag = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "i"))?.[0] || "";
  return tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"))?.[1] || "";
}

function linkHref(html, rel) {
  const tag = [...html.matchAll(/<link\b[^>]*>/gi)].map(([value]) => value)
    .find((value) => new RegExp(`\\brel=["']${rel}["']`, "i").test(value));
  return tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
}

function metaContent(html, property) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([value]) => value);
  const tag = tags.find((value) => new RegExp(`\\b(?:property|name)=["']${property}["']`, "i").test(value));
  return tag?.match(/\bcontent=["']([^"']+)["']/i)?.[1] || "";
}

test("the locale map covers one owned indexable route-locale per changed public route", () => {
  const mapped = mappedRoutes();
  assert.ok(mapped.length > 200);
  assert.equal(new Set(mapped.map(({ route }) => route)).size, mapped.length);
  const owned = new Set(ownership.entries.filter((entry) => entry.indexable).map((entry) => `${entry.route}|${entry.locale}`));
  const explicitlyOwned = [
    ...localeMap.equivalentGroups.flatMap((group) => Object.entries(group.variants).map(([locale, route]) => ({ locale, route }))),
    ...localeMap.singleLocaleRoutes
  ];
  for (const item of explicitlyOwned) {
    assert.ok(owned.has(`${item.route}|${item.locale}`), `missing ownership for ${item.locale} ${item.route}`);
  }
  const routing = JSON.parse(read("data/seo/acquisition-routing.json"));
  for (const family of localeMap.toolFamilies) assert.ok(routing.clusters[family.id], `missing routing cluster ${family.id}`);
  assert.equal(localeMap.policy.missingTranslations, "omit");
  assert.equal(localeMap.policy.reviewGates["zh-CN"], "noindex");
  assert.equal(localeMap.policy.reviewGates["zh-TW"], "noindex");
});

test("paid course exports have correct document language and self social URLs", () => {
  const cases = [
    ["djai-academy-course/out/index.html", "th", "https://www.djai.academy/course/"],
    ["djai-academy-course/out/en/index.html", "en", "https://www.djai.academy/course/en/"],
    ["djai-academy-course/out/vi/index.html", "vi", "https://www.djai.academy/course/vi/"],
    ["djai-academy-course/out/detail/index.html", "th", "https://www.djai.academy/course/detail/"],
    ["djai-academy-course/out/detail/en/index.html", "en", "https://www.djai.academy/course/detail/en/"],
    ["djai-academy-course/out/detail/vi/index.html", "vi", "https://www.djai.academy/course/detail/vi/"]
  ];
  for (const [file, locale, canonical] of cases) {
    assert.ok(existsSync(path.join(root, file)), `${file} must be built before this contract runs`);
    const html = read(file);
    assert.equal(htmlAttribute(html, "html", "lang"), locale, file);
    assert.equal(linkHref(html, "canonical"), canonical, file);
    assert.equal(metaContent(html, "og:url"), canonical, file);
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, file);
  }
});

test("course schema is page-specific rather than inherited globally", () => {
  const layout = read("djai-academy-course/app/layout.jsx");
  assert.doesNotMatch(layout, /"@type": "Course"/);
  const schema = read("djai-academy-course/app/CourseLandingSchema.jsx");
  assert.match(schema, /"@type": "Course"/);
  assert.match(schema, /courseRegistrationUrls\.signup/);
  for (const source of [
    read("djai-academy-course/app/page.jsx"),
    read("djai-academy-course/app/en/page.jsx"),
    read("djai-academy-course/app/vi/page.jsx")
  ]) {
    assert.match(source, /CourseLandingSchema/);
  }
});

test("Siamese Cat Dev course outputs keep public discovery and self canonicals", () => {
  const cases = [
    ["Siamese-Cat-Dev-Bio-Site/dist/course/index.html", "en", "https://www.djai.academy/siamese_cat/dev/course/"],
    ["Siamese-Cat-Dev-Bio-Site/dist/course/th/index.html", "th", "https://www.djai.academy/siamese_cat/dev/course/th/"],
    ["Siamese-Cat-Dev-Bio-Site/dist/courses/index.html", "en", "https://www.djai.academy/siamese_cat/dev/courses/"],
    ["Siamese-Cat-Dev-Bio-Site/dist/courses/build-first-app/index.html", "en", "https://www.djai.academy/siamese_cat/dev/courses/build-first-app/"]
  ];
  for (const [file, locale, canonical] of cases) {
    const html = read(file);
    assert.equal(htmlAttribute(html, "html", "lang"), locale, file);
    assert.equal(linkHref(html, "canonical"), canonical, file);
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, file);
    assert.match(html, /<title>[^<]+<\/title>/);
  }
  assert.match(read(cases[0][0]), /school\.djai\.academy/);
  assert.match(read(cases[2][0]), /school\.djai\.academy/);
});

test("sitemap source includes every approved acquisition family and omits gated guides", () => {
  const sitemap = read("djai-academy-homepage/app/sitemap.js");
  for (const expected of ["corePaths", "qrTools", "imageTools", "pdfTools", "mediaTools", "suiteTools"]) {
    assert.match(sitemap, new RegExp(expected));
  }
  for (const route of localeMap.singleLocaleRoutes.map((item) => item.route)) {
    assert.match(sitemap, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(sitemap, /scan-documents-to-pdf-android|sign-pdf-on-android|create-qr-code-on-android/);
});

test("the discovery graph exposes the required contextual journeys", () => {
  const development = read("djai-academy-homepage/app/development/en/page.jsx");
  const portfolio = read("djai-academy-homepage/app/portfolio/en/page.jsx");
  const service = read("djai-academy-homepage/app/service/en/page.jsx");
  const cam = read("djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/page.jsx");
  const pdfJourney = read("djai-pdf-tools/app/PdfToolsApp.tsx");
  const qrJourney = read("DJayTools-Free-QR-Generator-Source/app/QrSuccessJourney.tsx");

  assert.match(development, /\/portfolio\/en\//);
  assert.match(portfolio, /\/service\/en\//);
  assert.match(service, /\/development\/en\//);
  assert.match(cam, /play\.google\.com\/store\/apps\/details\?id=com\.djai\.campdfscan/);
  assert.match(pdfJourney, /related/i);
  assert.match(pdfJourney, /Cam PDF/);
  assert.match(qrJourney, /related/i);
  assert.match(qrJourney, /Cam PDF/);
  assert.match(read("djai-academy-course/app/en/page.jsx"), /course\/detail\/en/);
  assert.match(read("djai-academy-course/app/lib/courseRegistration.js"), /school\.djai\.academy/);
  const paidCourseStart = read("djai-academy-course/app/CourseRegistrationLink.jsx");
  const freeCourseStart = read("Siamese-Cat-Dev-Bio-Site/src/CourseApp.tsx");
  const catalogStart = read("Siamese-Cat-Dev-Bio-Site/src/CoursesApp.tsx");
  for (const source of [paidCourseStart, freeCourseStart, catalogStart]) {
    assert.match(source, /['"]course_start['"]/);
    assert.match(source, /destination_type/);
    assert.doesNotMatch(source, /\bdestination:/);
  }
  const documentBridge = read("djai-document-tools/app/AcquisitionBridge.tsx");
  assert.doesNotMatch(documentBridge, /\/siamese_cat\/dev\/courses\/(?:en|vi)\//);
  assert.match(documentBridge, /\/siamese_cat\/dev\/course\/th\//);
  const qrVietnamese = read("DJayTools-Free-QR-Generator-Source/app/vi/page.tsx");
  assert.doesNotMatch(qrVietnamese, /from "next\/link"|<Link/);
  assert.match(qrVietnamese, /<a href="\/development\/vi\/"/);
});
