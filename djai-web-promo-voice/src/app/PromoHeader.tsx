"use client";

import { useEffect, useState } from "react";

type Locale = "th" | "en" | "vi";

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
};

function localePath(locale: Locale, thaiPath: string, englishPath: string, vietnamesePath: string) {
  return locale === "th" ? thaiPath : locale === "en" ? englishPath : vietnamesePath;
}

export default function PromoHeader({ initialLocale = "th" }: { initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [open, setOpen] = useState(false);
  const labels = copy[locale];

  useEffect(() => {
    const queryLocale = new URLSearchParams(window.location.search).get("lang");
    const storedLocale = window.localStorage.getItem("djai-language");
    if (queryLocale === "en" || queryLocale === "th" || queryLocale === "vi") setLocale(queryLocale);
    else if (storedLocale === "en" || storedLocale === "th" || storedLocale === "vi") setLocale(storedLocale);
  }, [initialLocale]);

  function switchLanguage() {
    const nextLocale: Locale = locale === "th" ? "en" : locale === "en" ? "vi" : "th";
    window.localStorage.setItem("djai-language", nextLocale);
    const destination = nextLocale === "vi" ? "/web_promo/vi/" : "/web_promo/";
    window.location.assign(`${destination}?lang=${nextLocale}`);
  }

  const developmentLinks = [
    [labels.services, localePath(locale, "/service/", "/service/en/", "/service/vi/")],
    [labels.promo, locale === "vi" ? "/web_promo/vi/" : "/web_promo/"],
    [labels.portfolio, localePath(locale, "/portfolio/", "/portfolio/en/", "/portfolio/vi/")],
    [labels.camPdf, "/Cam_PDF_Scan_Signer_QR-Gen/"],
  ];

  return (
    <header className="academy-header">
      <a
        className="academy-brand"
        href={localePath(locale, "/", "/en/", "/vi/")}
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
        <a href={localePath(locale, "/course/", "/course/en/", "/course/vi/")}>{labels.courses}</a>
        <a href={localePath(locale, "/academy/", "/academy/en/", "/academy/vi/")}>{labels.community}</a>
        <div className="academy-nav-dropdown">
          <a
            className="academy-nav-dropdown-trigger"
            href={localePath(locale, "/development/", "/development/en/", "/development/vi/")}
          >
            {labels.development}
          </a>
          <div className="academy-dropdown-panel" aria-label="Development links">
            {developmentLinks.map(([label, href]) => (
              <a href={href} key={label}>{label}</a>
            ))}
          </div>
        </div>
        <a href={localePath(locale, "/tools/", "/tools/en/", "/tools/vi/")}>{labels.tools}</a>
        <a href={localePath(locale, "/blog/", "/blog/en/", "/blog/vi/")}>{labels.blog}</a>
        <button className="academy-language-switch" type="button" onClick={switchLanguage}>
          {labels.switchLabel}
        </button>
        <a className="academy-nav-subscribe" href={localePath(locale, "/academy/", "/academy/en/", "/academy/vi/")}>
          {labels.join}
        </a>
      </nav>
    </header>
  );
}
