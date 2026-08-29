"use client";

import { useState } from "react";

const siteLinks = {
  th: {
    academy: "https://www.djai.academy/",
    tools: "https://www.djai.academy/tools/",
    service: "https://www.djai.academy/service/",
    course: "https://www.djai.academy/course/",
    community: "https://www.djai.academy/academy/",
    portfolio: "https://www.djai.academy/portfolio/",
    promo: "https://www.djai.academy/course/#pricing",
    development: "https://www.djai.academy/development/",
    blog: "https://www.djai.academy/blog/",
    switchLanguage: "https://www.djai.academy/course/en/"
  },
  en: {
    academy: "https://www.djai.academy/en/",
    tools: "https://www.djai.academy/tools/en/",
    service: "https://www.djai.academy/service/en/",
    course: "https://www.djai.academy/course/en/",
    community: "https://www.djai.academy/academy/en/",
    portfolio: "https://www.djai.academy/portfolio/en/",
    promo: "https://www.djai.academy/course/en/#pricing",
    development: "https://www.djai.academy/development/en/",
    blog: "https://www.djai.academy/blog/en/",
    switchLanguage: "https://www.djai.academy/course/"
  },
  vi: {
    academy: "https://www.djai.academy/vi/", tools: "https://www.djai.academy/tools/vi/", service: "https://www.djai.academy/service/vi/", course: "https://www.djai.academy/course/vi/", community: "https://www.djai.academy/academy/vi/", portfolio: "https://www.djai.academy/portfolio/vi/", promo: "https://www.djai.academy/course/vi/#pricing", development: "https://www.djai.academy/development/vi/", blog: "https://www.djai.academy/blog/vi/", switchLanguage: "https://www.djai.academy/course/"
  },
  "zh-CN": {
    academy: "https://www.djai.academy/zh-cn/", tools: "https://www.djai.academy/tools/zh-cn/", service: "https://www.djai.academy/service/zh-cn/", course: "https://www.djai.academy/course/zh-cn/", community: "https://www.djai.academy/academy/zh-cn/", portfolio: "https://www.djai.academy/portfolio/zh-cn/", promo: "https://www.djai.academy/course/zh-cn/#pricing", development: "https://www.djai.academy/development/zh-cn/", blog: "https://www.djai.academy/blog/zh-cn/", switchLanguage: "https://www.djai.academy/course/zh-tw/"
  },
  "zh-TW": {
    academy: "https://www.djai.academy/zh-tw/", tools: "https://www.djai.academy/tools/zh-tw/", service: "https://www.djai.academy/service/zh-tw/", course: "https://www.djai.academy/course/zh-tw/", community: "https://www.djai.academy/academy/zh-tw/", portfolio: "https://www.djai.academy/portfolio/zh-tw/", promo: "https://www.djai.academy/course/zh-tw/#pricing", development: "https://www.djai.academy/development/zh-tw/", blog: "https://www.djai.academy/blog/zh-tw/", switchLanguage: "https://www.djai.academy/course/zh-cn/"
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
  },
  vi: {
    development: "Phát triển sản phẩm", developmentAria: "Liên kết phát triển sản phẩm", services: "Dịch vụ", promo: "Ưu đãi", portfolio: "Dự án", courses: "Khóa học", community: "Cộng đồng", tools: "Công cụ", blog: "Bài viết", join: "Tham gia cộng đồng", open: "Mở menu", close: "Đóng menu", nav: "Điều hướng chính", switchLanguage: "ไทย"
  },
  "zh-CN": { development: "产品开发", developmentAria: "产品开发链接", services: "服务", promo: "课程信息", portfolio: "案例", courses: "课程", community: "学习社区", tools: "在线工具", blog: "文章", join: "加入学习社区", open: "打开菜单", close: "关闭菜单", nav: "主导航", switchLanguage: "繁體中文" },
  "zh-TW": { development: "產品開發", developmentAria: "產品開發連結", services: "服務", promo: "課程資訊", portfolio: "案例", courses: "課程", community: "學習社群", tools: "線上工具", blog: "文章", join: "加入學習社群", open: "開啟選單", close: "關閉選單", nav: "主選單", switchLanguage: "简体中文" }
};

function DevelopmentDropdown({ links, copy }) {
  return (
    <div className="nav-dropdown">
      <a className="nav-dropdown-trigger" href={links.development}>
        {copy.development}
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

export default function SiteHeader({ locale = "th", switchLanguageHref }) {
  const [open, setOpen] = useState(false);
  const lang = ["th", "en", "vi", "zh-CN", "zh-TW"].includes(locale) ? locale : "th";
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
        <img src="/course/assets/DJAI-logo-small.webp" alt="DJAI Academy" width="360" height="193" loading="eager" decoding="async" />
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
        {lang === "vi" ? <><a href="https://www.djai.academy/course/" hrefLang="th">TH</a><a href="https://www.djai.academy/course/en/" hrefLang="en">EN</a></> : <a href={switchLanguageHref || links.switchLanguage} hrefLang={lang === "zh-CN" ? "zh-TW" : lang === "zh-TW" ? "zh-CN" : lang === "en" ? "th" : "en"}>{copy.switchLanguage}</a>}
        <a className="nav-subscribe" href={links.community}>
          {copy.join}
        </a>
      </nav>
    </header>
  );
}
