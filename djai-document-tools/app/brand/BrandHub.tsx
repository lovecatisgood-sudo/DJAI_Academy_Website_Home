/* The shared static export serves pre-optimized brand WebP assets directly. */
/* eslint-disable @next/next/no-img-element */
import { ArrowRight, ImageIcon, PackageCheck, ShieldCheck } from "lucide-react";

const copy = {
  th: {
    languageHref: "/tools/brand/en/",
    languageLabel: "English",
    eyebrow: "เครื่องมือแบรนด์ฟรี",
    title: "เตรียมไอคอนเว็บไซต์ให้ครบในครั้งเดียว",
    intro: "เริ่มจากรูปเดียว แล้วสร้าง favicon, app icon, Apple touch icon, maskable icon และโค้ดติดตั้งที่พร้อมใช้ ไฟล์ทั้งหมดประมวลผลใน browser ของคุณ",
    button: "สร้าง Favicon",
    trust: ["ไม่ต้องสมัคร", "ไม่อัปโหลดรูป", "ดาวน์โหลด ZIP", "รองรับ PNG, JPG, WebP และ SVG"],
    sectionEyebrow: "พร้อมใช้งาน",
    sectionTitle: "เครื่องมือสำหรับเปิดตัวเว็บไซต์และแบรนด์",
    cardTitle: "Favicon Generator",
    cardText: "สร้างไฟล์ .ico, PNG หลายขนาด, Apple touch icon, maskable icon, web manifest และ HTML snippet จากโลโก้หรือรูปภาพ",
    cardLink: "เปิดเครื่องมือ",
    nextTitle: "เครื่องมือถัดไปในชุดนี้",
    nextText: "App Icon Generator และ Favicon Checker จะต่อยอดจาก workflow เดียวกัน เพื่อสร้างไฟล์แล้วตรวจการติดตั้งได้ทันที",
    privacyTitle: "ออกแบบให้ private ตั้งแต่ต้น",
    privacyText: "รูปต้นฉบับถูกอ่านและแปลงภายใน browser ไม่มีการส่งชื่อไฟล์หรือเนื้อหารูปไปยัง DJAI",
    back: "เครื่องมือฟรีทั้งหมด"
  },
  en: {
    languageHref: "/tools/brand/",
    languageLabel: "ไทย",
    eyebrow: "Free brand tools",
    title: "Prepare every website icon in one workflow",
    intro: "Start with one image and generate favicons, app icons, an Apple touch icon, a maskable icon, and ready-to-use installation code. Every file is processed in your browser.",
    button: "Create a favicon",
    trust: ["No sign-up", "No image upload", "ZIP download", "PNG, JPG, WebP, and SVG"],
    sectionEyebrow: "Available now",
    sectionTitle: "Tools for launching a website and brand",
    cardTitle: "Favicon Generator",
    cardText: "Generate a multi-size .ico file, PNG icons, an Apple touch icon, a maskable icon, a web manifest, and an HTML snippet from a logo or image.",
    cardLink: "Open the tool",
    nextTitle: "Next in this toolkit",
    nextText: "An App Icon Generator and Favicon Checker will extend the same workflow so you can create the files, then verify the installation.",
    privacyTitle: "Private by design",
    privacyText: "Your source image is read and converted inside your browser. DJAI does not receive its filename or image content.",
    back: "All free tools"
  },
  vi: {
    languageHref: "/tools/brand/",
    languageLabel: "ไทย",
    eyebrow: "Công cụ thương hiệu miễn phí",
    title: "Chuẩn bị đầy đủ biểu tượng website trong một quy trình",
    intro: "Bắt đầu với một hình ảnh để tạo favicon, biểu tượng ứng dụng, Apple touch icon, maskable icon và mã cài đặt sẵn dùng. Mọi tệp đều được xử lý trong trình duyệt của bạn.",
    button: "Tạo favicon",
    trust: ["Không cần đăng ký", "Không tải ảnh lên", "Tải xuống ZIP", "Hỗ trợ PNG, JPG, WebP và SVG"],
    sectionEyebrow: "Dùng ngay",
    sectionTitle: "Công cụ để ra mắt website và thương hiệu",
    cardTitle: "Trình tạo Favicon",
    cardText: "Tạo tệp .ico nhiều kích thước, biểu tượng PNG, Apple touch icon, maskable icon, web manifest và đoạn mã HTML từ logo hoặc hình ảnh.",
    cardLink: "Mở công cụ",
    nextTitle: "Tiếp theo trong bộ công cụ",
    nextText: "Trình tạo biểu tượng ứng dụng và công cụ kiểm tra favicon sẽ nối tiếp quy trình này để bạn tạo tệp rồi kiểm tra việc cài đặt.",
    privacyTitle: "Riêng tư ngay từ thiết kế",
    privacyText: "Ảnh nguồn được đọc và chuyển đổi trong trình duyệt. DJAI không nhận tên tệp hay nội dung hình ảnh.",
    back: "Tất cả công cụ miễn phí"
  }
} as const;

const localeRoutes = {
  th: { home: "/", tools: "/tools/", hub: "/tools/brand/", tool: "/tools/brand/favicon-generator/", nav: "เมนูเครื่องมือแบรนด์" },
  en: { home: "/en/", tools: "/tools/en/", hub: "/tools/brand/en/", tool: "/tools/brand/favicon-generator/en/", nav: "Brand tools navigation" },
  vi: { home: "/vi/", tools: "/tools/vi/", hub: "/tools/brand/vi/", tool: "/tools/brand/favicon-generator/vi/", nav: "Điều hướng công cụ thương hiệu" }
} as const;

export default function BrandHub({ language }: { language: keyof typeof copy }) {
  const c = copy[language];
  const routes = localeRoutes[language];
  const languageLabels = { th: "ไทย", en: "English", vi: "Tiếng Việt" } as const;
  return (
    <main className="brand-page">
      <header className="brand-header">
        <a className="brand-logo" href={routes.home} aria-label="DJAI Academy">
          <img src="/tools/djai-assets/djai-academy-logo-display.webp" alt="DJAI Academy" />
        </a>
        <nav aria-label={routes.nav}>
          <a href={routes.tools}>{c.back}</a>
          {(Object.keys(localeRoutes) as Array<keyof typeof localeRoutes>).filter((locale) => locale !== language).map((locale) => <a className="brand-language" href={localeRoutes[locale].hub} hrefLang={locale} key={locale}>{languageLabels[locale]}</a>)}
        </nav>
      </header>

      <section className="brand-hub-hero">
        <div>
          <p className="brand-kicker">{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
          <a className="brand-primary" href={routes.tool}>{c.button}<ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="brand-icon-board" aria-hidden="true">
          <span className="brand-icon-tile tile-16">16</span>
          <span className="brand-icon-tile tile-32">32</span>
          <span className="brand-icon-tile tile-180">180</span>
          <span className="brand-icon-tile tile-512">512</span>
          <strong>ICO + PNG</strong>
        </div>
      </section>

      <div className="brand-trust" aria-label={language === "en" ? "Tool benefits" : "จุดเด่นของเครื่องมือ"}>
        {c.trust.map((item, index) => <span key={item}>{index === 1 ? <ShieldCheck aria-hidden="true" /> : index === 2 ? <PackageCheck aria-hidden="true" /> : <ImageIcon aria-hidden="true" />}{item}</span>)}
      </div>

      <section className="brand-hub-tools" data-tool-discovery>
        <div className="brand-section-heading">
          <p className="brand-kicker">{c.sectionEyebrow}</p>
          <h2>{c.sectionTitle}</h2>
        </div>
        <a className="brand-feature-card" href={routes.tool}>
          <div className="brand-feature-number">01</div>
          <div><h3>{c.cardTitle}</h3><p>{c.cardText}</p><strong>{c.cardLink}<ArrowRight aria-hidden="true" /></strong></div>
          <div className="brand-favicon-mark" aria-hidden="true">D</div>
        </a>
        <div className="brand-note-grid">
          <article><h3>{c.privacyTitle}</h3><p>{c.privacyText}</p></article>
          <article><h3>{c.nextTitle}</h3><p>{c.nextText}</p></article>
        </div>
      </section>
    </main>
  );
}
