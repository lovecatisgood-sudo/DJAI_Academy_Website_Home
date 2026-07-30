"use client";

import { useEffect, useState } from "react";

type Locale = "th" | "en";

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
    switchLabel: "ไทย",
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
};

function localePath(locale: Locale, thaiPath: string, englishPath: string) {
  return locale === "th" ? thaiPath : englishPath;
}

export default function PromoHeader() {
  const [locale, setLocale] = useState<Locale>("th");
  const [open, setOpen] = useState(false);
  const labels = copy[locale];

  useEffect(() => {
    const queryLocale = new URLSearchParams(window.location.search).get("lang");
    const storedLocale = window.localStorage.getItem("djai-language");
    if (queryLocale === "en" || queryLocale === "th") setLocale(queryLocale);
    else if (storedLocale === "en" || storedLocale === "th") setLocale(storedLocale);
  }, []);

  function switchLanguage() {
    const nextLocale: Locale = locale === "th" ? "en" : "th";
    window.localStorage.setItem("djai-language", nextLocale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.location.assign(url.toString());
  }

  const developmentLinks = [
    [labels.services, localePath(locale, "/service/", "/service/en/")],
    [labels.promo, "/web_promo/"],
    [labels.portfolio, localePath(locale, "/portfolio/", "/portfolio/en/")],
    [labels.camPdf, "/Cam_PDF_Scan_Signer_QR-Gen/"],
  ];

  return (
    <header className="academy-header">
      <a
        className="academy-brand"
        href={localePath(locale, "/", "/en/")}
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
        <a href={localePath(locale, "/course/", "/course/en/")}>{labels.courses}</a>
        <a href="https://school.djai.academy/">{labels.community}</a>
        <div className="academy-nav-dropdown">
          <a
            className="academy-nav-dropdown-trigger"
            href={localePath(locale, "/development/", "/development/en/")}
          >
            {labels.development}
          </a>
          <div className="academy-dropdown-panel" aria-label="Development links">
            {developmentLinks.map(([label, href]) => (
              <a href={href} key={label}>{label}</a>
            ))}
          </div>
        </div>
        <a href={localePath(locale, "/tools/", "/tools/en/")}>{labels.tools}</a>
        <a href={localePath(locale, "/blog/", "/blog/en/")}>{labels.blog}</a>
        <button className="academy-language-switch" type="button" onClick={switchLanguage}>
          {labels.switchLabel}
        </button>
        <a className="academy-nav-subscribe" href="https://school.djai.academy/">
          {labels.join}
        </a>
      </nav>
    </header>
  );
}
