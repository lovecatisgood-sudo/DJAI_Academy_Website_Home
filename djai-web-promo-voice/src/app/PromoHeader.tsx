"use client";

import { useEffect, useState } from "react";

type Locale = "th" | "en" | "vi" | "zh-CN" | "zh-TW";

const copy = {
  en: {
    courses: "Upcoming Courses",
    community: "Community",
    development: "Development",
    services: "Services",
    promo: "Web Development Promo",
    portfolio: "Portfolio",
    tools: "Tools",
    blog: "Blog",
    camPdf: "Cam PDF App",
    join: "Join Community",
    switchLabel: "VI",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
  },
  th: {
    courses: "คอร์สเรียน",
    community: "ชุมชน",
    development: "พัฒนาโปรเจกต์",
    services: "บริการ",
    promo: "โปรโมชันพัฒนาเว็บไซต์",
    portfolio: "ผลงาน",
    tools: "เครื่องมือ",
    blog: "บล็อก",
    camPdf: "แอป Cam PDF",
    join: "เข้าร่วมชุมชน",
    switchLabel: "EN",
    openMenu: "เปิดเมนูนำทาง",
    closeMenu: "ปิดเมนูนำทาง",
  },
  vi: {
    courses: "Khóa học sắp tới",
    community: "Cộng đồng",
    development: "Phát triển sản phẩm",
    services: "Dịch vụ",
    promo: "Ưu đãi phát triển website",
    portfolio: "Dự án",
    tools: "Công cụ",
    blog: "Bài viết",
    camPdf: "Ứng dụng Cam PDF",
    join: "Tham gia cộng đồng",
    switchLabel: "ไทย",
    openMenu: "Mở điều hướng",
    closeMenu: "Đóng điều hướng",
  },
  "zh-CN": { courses: "课程", community: "学习社区", development: "项目开发", services: "服务", promo: "网站开发优惠", portfolio: "案例", tools: "工具", blog: "文章", camPdf: "Cam PDF 应用", join: "加入社区", switchLabel: "繁體中文", openMenu: "打开导航", closeMenu: "关闭导航" },
  "zh-TW": { courses: "課程", community: "學習社群", development: "專案開發", services: "服務", promo: "網站開發優惠", portfolio: "案例", tools: "工具", blog: "文章", camPdf: "Cam PDF 應用程式", join: "加入社群", switchLabel: "简体中文", openMenu: "開啟導覽", closeMenu: "關閉導覽" },
};

function localePath(locale: Locale, thaiPath: string, englishPath: string, vietnamesePath: string, chinesePath: string, taiwanPath: string) {
  return locale === "th" ? thaiPath : locale === "en" ? englishPath : locale === "vi" ? vietnamesePath : locale === "zh-CN" ? chinesePath : taiwanPath;
}

export default function PromoHeader({ initialLocale = "th" }: { initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [open, setOpen] = useState(false);
  const labels = copy[locale];

  useEffect(() => {
    const queryLocale = new URLSearchParams(window.location.search).get("lang");
    const storedLocale = window.localStorage.getItem("djai-language");
    if (["en", "th", "vi", "zh-CN", "zh-TW"].includes(queryLocale || "")) setLocale(queryLocale as Locale);
    else if (["en", "th", "vi", "zh-CN", "zh-TW"].includes(storedLocale || "")) setLocale(storedLocale as Locale);
  }, [initialLocale]);

  function switchLanguage() {
    const nextLocale: Locale = locale === "zh-CN" ? "zh-TW" : locale === "zh-TW" ? "zh-CN" : locale === "th" ? "en" : locale === "en" ? "vi" : "th";
    window.localStorage.setItem("djai-language", nextLocale);
    const destination = nextLocale === "zh-CN" ? "/web_promo/zh-cn/" : nextLocale === "zh-TW" ? "/web_promo/zh-tw/" : nextLocale === "vi" ? "/web_promo/vi/" : "/web_promo/";
    window.location.assign(`${destination}?lang=${nextLocale}`);
  }

  const developmentLinks = [
    [labels.services, localePath(locale, "/service/", "/service/en/", "/service/vi/", "/service/zh-cn/", "/service/zh-tw/")],
    [labels.promo, locale === "zh-CN" ? "/web_promo/zh-cn/" : locale === "zh-TW" ? "/web_promo/zh-tw/" : locale === "vi" ? "/web_promo/vi/" : "/web_promo/"],
    [labels.portfolio, localePath(locale, "/portfolio/", "/portfolio/en/", "/portfolio/vi/", "/portfolio/zh-cn/", "/portfolio/zh-tw/")],
    [labels.camPdf, localePath(locale, "/Cam_PDF_Scan_Signer_QR-Gen/", "/Cam_PDF_Scan_Signer_QR-Gen/en/", "/Cam_PDF_Scan_Signer_QR-Gen/vi/", "/Cam_PDF_Scan_Signer_QR-Gen/zh-cn/", "/Cam_PDF_Scan_Signer_QR-Gen/zh-tw/")],
  ];

  return (
    <header className="academy-header">
      <a
        className="academy-brand"
        href={localePath(locale, "/", "/en/", "/vi/", "/zh-cn/", "/zh-tw/")}
        aria-label="DJAI Academy"
      >
        <img
          src="/djai-logo-small.webp"
          alt="DJAI Academy"
          width="180"
          height="97"
          fetchPriority="high"
        />
      </a>

      <button
        className="academy-menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="academy-site-navigation"
        aria-label={open ? labels.closeMenu : labels.openMenu}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="academy-site-navigation"
        className={`academy-nav${open ? " is-open" : ""}`}
        aria-label="DJAI Academy navigation"
      >
        <a href={localePath(locale, "/course/", "/course/en/", "/course/vi/", "/course/zh-cn/", "/course/zh-tw/")}>{labels.courses}</a>
        <a href={localePath(locale, "/academy/", "/academy/en/", "/academy/vi/", "/academy/zh-cn/", "/academy/zh-tw/")}>{labels.community}</a>
        <div className="academy-nav-dropdown">
          <a
            className="academy-nav-dropdown-trigger"
            href={localePath(locale, "/development/", "/development/en/", "/development/vi/", "/development/zh-cn/", "/development/zh-tw/")}
          >
            {labels.development}
          </a>
          <div className="academy-dropdown-panel" aria-label="Development links">
            {developmentLinks.map(([label, href]) => (
              <a href={href} key={label}>{label}</a>
            ))}
          </div>
        </div>
        <a href={localePath(locale, "/tools/", "/tools/en/", "/tools/vi/", "/tools/zh-cn/", "/tools/zh-tw/")}>{labels.tools}</a>
        <a href={localePath(locale, "/blog/", "/blog/en/", "/blog/vi/", "/blog/zh-cn/", "/blog/zh-tw/")}>{labels.blog}</a>
        <button className="academy-language-switch" type="button" onClick={switchLanguage}>
          {labels.switchLabel}
        </button>
        <a className="academy-nav-subscribe" href={localePath(locale, "/academy/", "/academy/en/", "/academy/vi/", "/academy/zh-cn/", "/academy/zh-tw/")}>
          {labels.join}
        </a>
      </nav>
    </header>
  );
}
