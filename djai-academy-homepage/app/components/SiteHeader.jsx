"use client";

import Image from "next/image";
import { useState } from "react";
import { localeLinksFor, LOCALE_LABELS, oppositeLocale, pathFor, schoolUrlFor, urlFor } from "../lib/i18n";

const navCopy = {
  en: {
    build: "Build with DJAI",
    mainNavigation: "Main navigation",
    services: "Services",
    promo: "Web Development Promo",
    portfolio: "Portfolio",
    tools: "Free Tools",
    resources: "Resources",
    camPdf: "Cam PDF",
    school: "Learn at DJAI School",
    discussProject: "Discuss a project",
    switchLabel: "ไทย",
    brandLabel: "DJAI Academy"
  },
  th: {
    build: "พัฒนากับ DJAI",
    mainNavigation: "เมนูหลัก",
    services: "บริการ",
    promo: "โปรโมชันพัฒนาเว็บไซต์",
    portfolio: "ผลงาน",
    tools: "เครื่องมือฟรี",
    resources: "บทความและคู่มือ",
    camPdf: "Cam PDF",
    school: "เรียนกับ DJAI School",
    discussProject: "คุยเรื่องโปรเจกต์",
    switchLabel: "EN",
    brandLabel: "DJAI Academy"
  },
  vi: {
    build: "Xây dựng cùng DJAI",
    mainNavigation: "Điều hướng chính",
    services: "Dịch vụ",
    promo: "Ưu đãi làm website",
    portfolio: "Dự án",
    tools: "Công cụ miễn phí",
    resources: "Tài nguyên",
    camPdf: "Cam PDF",
    school: "Học tại DJAI School",
    discussProject: "Trao đổi dự án",
    switchLabel: "Ngôn ngữ",
    brandLabel: "DJAI Academy"
  },
  "zh-CN": {
    build: "与 DJAI 一起开发",
    mainNavigation: "主导航",
    services: "开发服务",
    promo: "网站开发优惠",
    portfolio: "项目案例",
    tools: "免费工具",
    resources: "资源",
    camPdf: "Cam PDF",
    school: "在 DJAI School 学习",
    discussProject: "洽谈项目",
    switchLabel: "选择语言",
    brandLabel: "DJAI Academy"
  },
  "zh-TW": {
    build: "與 DJAI 一起開發",
    mainNavigation: "主選單",
    services: "開發服務",
    promo: "網站開發優惠",
    portfolio: "專案案例",
    tools: "免費工具",
    resources: "資源",
    camPdf: "Cam PDF",
    school: "在 DJAI School 學習",
    discussProject: "洽談專案",
    switchLabel: "選擇語言",
    brandLabel: "DJAI Academy"
  }
};

function DevelopmentDropdown({ copy, locale }) {
  const developmentLinks = [
    [copy.services, urlFor("service", locale)],
    [copy.promo, urlFor("promo", locale)],
    [copy.portfolio, urlFor("portfolio", locale)]
  ];

  return (
    <div className="nav-dropdown">
      <a className="nav-dropdown-trigger" href={urlFor("development", locale)}>
        {copy.build}
      </a>
      <div className="dropdown-panel" aria-label={copy.build}>
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
        aria-label={
          locale === "zh-CN"
            ? open ? "关闭导航" : "打开导航"
            : locale === "zh-TW"
              ? open ? "關閉導覽" : "開啟導覽"
              : open ? "Close navigation" : "Open navigation"
        }
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="site-navigation" className={open ? "nav is-open" : "nav"} aria-label={copy.mainNavigation}>
        <DevelopmentDropdown copy={copy} locale={locale} />
        <a href={urlFor("tools", locale)}>{copy.tools}</a>
        <a href="/Cam_PDF_Scan_Signer_QR-Gen/">{copy.camPdf}</a>
        <a href={schoolUrlFor(locale)}>{copy.school}</a>
        <a href={urlFor("blog", locale)}>{copy.resources}</a>
        <div className="language-options" aria-label={copy.switchLabel}>
          {localeLinks.map((item) => (
            <a className="language-switch" href={item.href} hrefLang={item.locale} key={item.locale}>
              {item.label}
            </a>
          ))}
        </div>
        <a className="nav-subscribe" href="mailto:contact@djai.academy">
          {copy.discussProject}
        </a>
      </nav>
    </header>
  );
}
