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
  },
  "zh-CN": {
    languageHref: "/tools/brand/zh-tw/", languageLabel: "繁體中文", eyebrow: "免费品牌工具", title: "一次生成网站所需的整套图标", intro: "从一张图片生成 favicon、应用图标、Apple touch icon、maskable icon 和可直接使用的安装代码。所有文件都在浏览器中处理。", button: "生成 Favicon", trust: ["无需注册", "图片无需上传", "下载 ZIP", "支持 PNG、JPG、WebP 和 SVG"], sectionEyebrow: "立即使用", sectionTitle: "网站与品牌上线工具", cardTitle: "Favicon 生成器", cardText: "从品牌标志或图片生成多尺寸 .ico、PNG 图标、Apple touch icon、maskable icon、web manifest 和 HTML 代码。", cardLink: "打开工具", nextTitle: "后续品牌工具", nextText: "App Icon Generator 和 Favicon Checker 将沿用同一套工作流，方便创建文件后检查安装状态。", privacyTitle: "以隐私为先", privacyText: "原始图片只在浏览器中读取和转换，DJAI 不会接收文件名或图片内容。", back: "全部免费工具"
  },
  "zh-TW": {
    languageHref: "/tools/brand/zh-cn/", languageLabel: "简体中文", eyebrow: "免費品牌工具", title: "一次產生網站所需的整套圖示", intro: "從一張圖片產生 favicon、應用程式圖示、Apple touch icon、maskable icon 與可直接使用的安裝程式碼。所有檔案都在瀏覽器中處理。", button: "產生 Favicon", trust: ["免註冊", "圖片不需上傳", "下載 ZIP", "支援 PNG、JPG、WebP 與 SVG"], sectionEyebrow: "立即使用", sectionTitle: "網站與品牌上線工具", cardTitle: "Favicon 產生器", cardText: "從品牌標誌或圖片產生多尺寸 .ico、PNG 圖示、Apple touch icon、maskable icon、web manifest 與 HTML 程式碼。", cardLink: "開啟工具", nextTitle: "後續品牌工具", nextText: "App Icon Generator 與 Favicon Checker 將沿用同一套工作流程，方便建立檔案後檢查安裝狀態。", privacyTitle: "以隱私為先", privacyText: "原始圖片只在瀏覽器中讀取與轉換，DJAI 不會收到檔名或圖片內容。", back: "全部免費工具"
  }
} as const;

const localeRoutes = {
  th: { home: "/", tools: "/tools/", hub: "/tools/brand/", tool: "/tools/brand/favicon-generator/", nav: "เมนูเครื่องมือแบรนด์" },
  en: { home: "/en/", tools: "/tools/en/", hub: "/tools/brand/en/", tool: "/tools/brand/favicon-generator/en/", nav: "Brand tools navigation" },
  vi: { home: "/vi/", tools: "/tools/vi/", hub: "/tools/brand/vi/", tool: "/tools/brand/favicon-generator/vi/", nav: "Điều hướng công cụ thương hiệu" },
  "zh-CN": { home: "/zh-cn/", tools: "/tools/zh-cn/", hub: "/tools/brand/zh-cn/", tool: "/tools/brand/favicon-generator/zh-cn/", nav: "品牌工具导航" },
  "zh-TW": { home: "/zh-tw/", tools: "/tools/zh-tw/", hub: "/tools/brand/zh-tw/", tool: "/tools/brand/favicon-generator/zh-tw/", nav: "品牌工具導覽" }
} as const;

export default function BrandHub({ language }: { language: keyof typeof copy }) {
  const c = copy[language];
  const routes = localeRoutes[language];
  const languageLabels = { th: "ไทย", en: "English", vi: "Tiếng Việt", "zh-CN": "简体中文", "zh-TW": "繁體中文" } as const;
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
