import assert from "node:assert/strict";
import test from "node:test";

async function loadHeaderNavigation() {
  return import("../app/lib/header-navigation.js");
}

test("compact header state keeps every locale route and identifies the active intent", async () => {
  const navigation = await loadHeaderNavigation();

  assert.equal(typeof navigation.headerStateFor, "function");
  assert.deepEqual(navigation.headerStateFor({ locale: "en", currentRoute: "service" }), {
    activeItem: "build",
    currentLanguage: { code: "EN", label: "English" },
    languageOptions: [
      { locale: "th", code: "TH", label: "ไทย", href: "/service/" },
      { locale: "vi", code: "VI", label: "Tiếng Việt", href: "/service/vi/" },
      { locale: "zh-CN", code: "简", label: "简体中文", href: "/service/zh-cn/" },
      { locale: "zh-TW", code: "繁", label: "繁體中文", href: "/service/zh-tw/" },
    ],
  });
});

test("compact header state preserves a page-specific language alternate", async () => {
  const navigation = await loadHeaderNavigation();

  assert.equal(typeof navigation.headerStateFor, "function");
  assert.deepEqual(
    navigation.headerStateFor({
      locale: "en",
      currentRoute: "camPdf",
      languageHref: "/Cam_PDF_Scan_Signer_QR-Gen/",
    }),
    {
      activeItem: "camPdf",
      currentLanguage: { code: "EN", label: "English" },
      languageOptions: [
        {
          locale: "th",
          code: "TH",
          label: "ไทย",
          href: "/Cam_PDF_Scan_Signer_QR-Gen/",
        },
      ],
    },
  );
});

test("compact header state filters the current locale from explicit Cam PDF alternates", async () => {
  const navigation = await loadHeaderNavigation();

  assert.deepEqual(
    navigation.headerStateFor({
      locale: "en",
      currentRoute: "camPdf",
      languageHrefs: {
        en: "/Cam_PDF_Scan_Signer_QR-Gen/",
        th: "/Cam_PDF_Scan_Signer_QR-Gen/privacy/th/",
        "zh-CN": "/Cam_PDF_Scan_Signer_QR-Gen/zh-cn/privacy/"
      }
    }).languageOptions,
    [
      {
        locale: "th",
        code: "TH",
        label: "ไทย",
        href: "/Cam_PDF_Scan_Signer_QR-Gen/privacy/th/"
      },
      {
        locale: "zh-CN",
        code: "简",
        label: "简体中文",
        href: "/Cam_PDF_Scan_Signer_QR-Gen/zh-cn/privacy/"
      }
    ]
  );
});
