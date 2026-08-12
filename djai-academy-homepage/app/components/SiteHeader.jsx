"use client";

import Image from "next/image";
import { useState } from "react";
import { localeLinksFor, LOCALE_LABELS, oppositeLocale, pathFor, urlFor } from "../lib/i18n";

const navCopy = {
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
    switchLabel: "ไทย",
    brandLabel: "DJAI Academy"
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
    brandLabel: "DJAI Academy"
  },
  vi: {
    courses: "Khóa học",
    community: "Cộng đồng",
    development: "Phát triển sản phẩm",
    services: "Dịch vụ",
    promo: "Ưu đãi làm website",
    portfolio: "Dự án",
    tools: "Công cụ",
    blog: "Bài viết",
    camPdf: "Ứng dụng Cam PDF",
    join: "Tham gia cộng đồng",
    switchLabel: "Ngôn ngữ",
    brandLabel: "DJAI Academy"
  }
};

function DevelopmentDropdown({ copy, locale }) {
  const developmentLinks = [
    [copy.services, urlFor("service", locale)],
    [copy.promo, urlFor("promo", locale)],
    [copy.portfolio, urlFor("portfolio", locale)],
    [copy.camPdf, "/Cam_PDF_Scan_Signer_QR-Gen/"]
  ];

  return (
    <div className="nav-dropdown">
      <a className="nav-dropdown-trigger" href={urlFor("development", locale)}>
        {copy.development}
      </a>
      <div className="dropdown-panel" aria-label="Development links">
        {developmentLinks.map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SiteHeader({ locale = "en", currentRoute = "home", languageHref, languageHrefs }) {
  const [open, setOpen] = useState(false);
  const copy = navCopy[locale] || navCopy.en;
  const switchLocale = oppositeLocale(locale);
  const switchHref = languageHref || pathFor(currentRoute, switchLocale);
  const localeLinks = languageHrefs
    ? Object.entries(languageHrefs)
        .filter(([candidate, href]) => candidate !== locale && href)
        .map(([candidate, href]) => ({ locale: candidate, label: LOCALE_LABELS[candidate] || candidate.toUpperCase(), href }))
    : languageHref
      ? [{ locale: switchLocale, label: LOCALE_LABELS[switchLocale], href: switchHref }]
      : localeLinksFor(currentRoute, locale);
  const headerLinks = [
    [copy.courses, urlFor("course", locale)],
    [copy.community, urlFor("community", locale)],
    [copy.tools, urlFor("tools", locale)],
    [copy.blog, urlFor("blog", locale)]
  ];

  return (
    <header className="site-header">
      <a className="brand" href={urlFor("home", locale)} aria-label={copy.brandLabel}>
        <Image src="/djai-logo-small.webp" alt={copy.brandLabel} width={180} height={97} loading="eager" />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="site-navigation" className={open ? "nav is-open" : "nav"} aria-label="Main navigation">
        {headerLinks.slice(0, 2).map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
        <DevelopmentDropdown copy={copy} locale={locale} />
        {headerLinks.slice(2).map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
        <div className="language-options" aria-label={locale === "vi" ? "Chọn ngôn ngữ" : "Choose language"}>
          {localeLinks.map((item) => (
            <a className="language-switch" href={item.href} hrefLang={item.locale} key={item.locale}>
              {item.locale.toUpperCase()}
            </a>
          ))}
        </div>
        <a className="nav-subscribe" href={urlFor("community", locale)}>
          {copy.join}
        </a>
      </nav>
    </header>
  );
}
