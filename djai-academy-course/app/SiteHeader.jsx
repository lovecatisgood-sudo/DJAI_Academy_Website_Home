"use client";

import { useState } from "react";

const siteLinks = {
  th: {
    academy: "https://djai.academy/th/",
    tools: "https://djai.academy/tools/th/",
    service: "https://djai.academy/service/th/",
    course: "https://djai.academy/course/",
    community: "https://djai.academy/community/",
    portfolio: "https://djai.academy/portfolio/th/",
    promo: "https://djai.academy/promo/",
    development: "https://djai.academy/development/th/",
    blog: "https://djai.academy/blog/th/",
    switchLanguage: "https://djai.academy/course/EN/"
  },
  en: {
    academy: "https://djai.academy/EN/",
    tools: "https://djai.academy/tools/EN/",
    service: "https://djai.academy/service/EN/",
    course: "https://djai.academy/course/EN/",
    community: "https://djai.academy/community/",
    portfolio: "https://djai.academy/portfolio/EN/",
    promo: "https://djai.academy/promo/",
    development: "https://djai.academy/development/EN/",
    blog: "https://djai.academy/blog/EN/",
    switchLanguage: "https://djai.academy/course/"
  }
};

const labels = {
  th: {
    development: "พัฒนาโปรเจกต์",
    developmentAria: "ลิงก์พัฒนาโปรเจกต์",
    services: "บริการ",
    promo: "โปรโมชัน",
    portfolio: "ผลงาน",
    courses: "คอร์สเรียน",
    community: "Community",
    tools: "เครื่องมือ",
    blog: "บล็อก",
    join: "เข้าร่วม Community",
    open: "เปิดเมนู",
    close: "ปิดเมนู",
    nav: "เมนูหลัก",
    switchLanguage: "EN"
  },
  en: {
    development: "Development",
    developmentAria: "Development links",
    services: "Services",
    promo: "Promo",
    portfolio: "Portfolio",
    courses: "Upcoming Courses",
    community: "Community",
    tools: "Tools",
    blog: "Blog",
    join: "Join Community",
    open: "Open navigation",
    close: "Close navigation",
    nav: "Main navigation",
    switchLanguage: "ไทย"
  }
};

function DevelopmentDropdown({ links, copy }) {
  return (
    <div className="nav-dropdown">
      <a className="nav-dropdown-trigger" href={links.development}>
        {copy.development} <span aria-hidden="true">&gt;</span>
      </a>
      <div className="dropdown-panel" aria-label={copy.developmentAria}>
        {[
          [copy.services, links.service],
          [copy.promo, links.promo],
          [copy.portfolio, links.portfolio]
        ].map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SiteHeader({ locale = "th" }) {
  const [open, setOpen] = useState(false);
  const lang = locale === "en" ? "en" : "th";
  const links = siteLinks[lang];
  const copy = labels[lang];
  const headerLinks = [
    [copy.courses, links.course],
    [copy.community, links.community],
    [copy.tools, links.tools],
    [copy.blog, links.blog]
  ];

  return (
    <header className="site-header">
      <a className="brand" href={links.academy} aria-label="DJAI Academy">
        <img src="/course/assets/DJAI-logo.webp" alt="DJAI Academy" />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation"
        aria-label={open ? copy.close : copy.open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="site-navigation" className={open ? "nav is-open" : "nav"} aria-label={copy.nav}>
        {headerLinks.slice(0, 2).map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
        <DevelopmentDropdown links={links} copy={copy} />
        {headerLinks.slice(2).map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
        <a href={links.switchLanguage} hrefLang={lang === "en" ? "th" : "en"}>
          {copy.switchLanguage}
        </a>
        <a className="nav-subscribe" href={links.community}>
          {copy.join}
        </a>
      </nav>
    </header>
  );
}
