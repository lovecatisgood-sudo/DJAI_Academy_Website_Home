/* The shared static export serves its pre-optimized brand WebP directly. */
/* eslint-disable @next/next/no-img-element */
import { ArrowLeft, CheckCircle2, Code2, Download, ShieldCheck } from "lucide-react";
import FaviconWorkspace from "./FaviconWorkspace";

const copy = {
  th: {
    back: "เครื่องมือแบรนด์",
    languageHref: "/tools/brand/favicon-generator/en/",
    languageLabel: "English",
    eyebrow: "Favicon Generator ฟรี",
    title: "สร้าง Favicon จากรูปภาพ พร้อมไฟล์ติดตั้งครบชุด",
    intro: "อัปโหลดโลโก้ครั้งเดียว ดูตัวอย่างขนาดจริง แล้วดาวน์โหลด favicon.ico, PNG, Apple touch icon, maskable icon, web manifest และ HTML snippet ใน ZIP เดียว",
    badges: ["ประมวลผลใน browser", "ไม่ต้องสมัคร", "ICO + PNG + Manifest"],
    howTitle: "วิธีสร้าง favicon สำหรับเว็บไซต์",
    steps: ["เลือกรูป PNG, JPG, WebP หรือ SVG ที่เป็นสี่เหลี่ยมและมีพื้นที่รอบโลโก้พอสมควร", "ปรับ padding และสีพื้นหลัง พร้อมตรวจตัวอย่างที่ 16, 32, 48 และ 180 px", "สร้างไฟล์ ดาวน์โหลด ZIP แล้ววางโค้ด HTML ใน <head> ของเว็บไซต์"],
    seoTitle: "ไฟล์ไหนใช้ทำอะไร",
    seoText: "favicon.ico รองรับ browser และระบบเดิม ส่วน PNG ขนาด 16 และ 32 px ใช้กับแท็บ browser, Apple touch icon ใช้เมื่อบันทึกเว็บไซต์บน iPhone และ iPad และ maskable icon ช่วยให้ไอคอน PWA ไม่ถูกครอปในรูปทรงของอุปกรณ์",
    faqTitle: "คำถามเกี่ยวกับ Favicon",
    faqs: [
      ["Favicon ควรมีขนาดเท่าไร", "ชุดนี้สร้าง 16, 32 และ 48 px สำหรับ browser พร้อม 180 px สำหรับ Apple และ 192 กับ 512 px สำหรับ web app"],
      ["สร้าง favicon.ico จาก PNG ได้ไหม", "ได้ เครื่องมือจะรวม PNG ขนาด 16, 32 และ 48 px ไว้ในไฟล์ favicon.ico เดียว"],
      ["รูปถูกอัปโหลดไปที่เซิร์ฟเวอร์หรือไม่", "ไม่ รูปถูกอ่าน วาด และรวมเป็น ZIP ภายใน browser ของคุณ"],
      ["ควรวางไฟล์ favicon ไว้ที่ไหน", "โดยทั่วไปวางไว้ที่ root หรือ public directory ของเว็บไซต์ แล้วเพิ่ม link tags จากไฟล์ favicon-snippet.html ภายใน head"]
    ],
    relatedTitle: "ทำงานต่อด้วยเครื่องมือฟรี",
    related: [["เครื่องมือรูปภาพ", "/tools/resizeimg/", "Resize, แปลง และบีบอัดรูปก่อนสร้างไอคอน"], ["QR Code พร้อมโลโก้", "/tools/qrgen/qr-code-generator-with-logo/", "สร้าง QR Code สำหรับแบรนด์และเว็บไซต์"], ["เครื่องมือแบรนด์", "/tools/brand/", "กลับไปดูชุดเครื่องมือสำหรับเปิดตัวแบรนด์"]]
  },
  en: {
    back: "Brand tools",
    languageHref: "/tools/brand/favicon-generator/",
    languageLabel: "ไทย",
    eyebrow: "Free favicon generator",
    title: "Generate a favicon from an image, with every installation file",
    intro: "Add one logo, inspect it at actual favicon sizes, then download favicon.ico, PNG icons, an Apple touch icon, a maskable icon, a web manifest, and an HTML snippet in one ZIP.",
    badges: ["Browser-based processing", "No sign-up", "ICO + PNG + Manifest"],
    howTitle: "How to create a favicon for a website",
    steps: ["Choose a square PNG, JPG, WebP, or SVG with enough clear space around the logo", "Adjust the padding and background, then inspect the 16, 32, 48, and 180 px previews", "Generate the files, download the ZIP, and add the supplied HTML tags inside your website <head>"],
    seoTitle: "What each favicon file is for",
    seoText: "favicon.ico supports browsers and older integrations. The 16 and 32 px PNG files serve browser tabs, the Apple touch icon is used when a site is saved on an iPhone or iPad, and the maskable icon helps a PWA icon survive device-specific cropping.",
    faqTitle: "Favicon questions",
    faqs: [
      ["What size should a favicon be", "This package creates 16, 32, and 48 px browser icons, a 180 px Apple icon, and 192 and 512 px web app icons."],
      ["Can I make favicon.ico from a PNG", "Yes. The generator bundles 16, 32, and 48 px PNG images inside one favicon.ico file."],
      ["Is my image uploaded to a server", "No. Your image is read, rendered, and packaged as a ZIP inside your browser."],
      ["Where should favicon files go", "In most projects, place them in the website root or public directory, then add the link tags from favicon-snippet.html inside the head."]
    ],
    relatedTitle: "Continue with another free workflow",
    related: [["Image tools", "/tools/resizeimg/en/", "Resize, convert, and compress an image before making icons."], ["QR code with logo", "/tools/qrgen/qr-code-generator-with-logo/en/", "Create a branded QR code for a website or campaign."], ["Brand tools", "/tools/brand/en/", "Return to the toolkit for launching a website and brand."]]
  },
  vi: {
    back: "Công cụ thương hiệu",
    languageHref: "/tools/brand/favicon-generator/",
    languageLabel: "ไทย",
    eyebrow: "Trình tạo favicon miễn phí",
    title: "Tạo favicon từ hình ảnh với đầy đủ tệp cài đặt",
    intro: "Thêm một logo, kiểm tra ở kích thước favicon thật rồi tải favicon.ico, biểu tượng PNG, Apple touch icon, maskable icon, web manifest và đoạn mã HTML trong một tệp ZIP.",
    badges: ["Xử lý trong trình duyệt", "Không cần đăng ký", "ICO + PNG + Manifest"],
    howTitle: "Cách tạo favicon cho website",
    steps: ["Chọn ảnh PNG, JPG, WebP hoặc SVG hình vuông, có đủ khoảng trống quanh logo", "Điều chỉnh khoảng đệm và màu nền, sau đó kiểm tra bản xem trước 16, 32, 48 và 180 px", "Tạo tệp, tải ZIP và thêm các thẻ HTML được cung cấp vào <head> của website"],
    seoTitle: "Công dụng của từng tệp favicon",
    seoText: "favicon.ico hỗ trợ trình duyệt và các hệ thống cũ. Tệp PNG 16 và 32 px dùng cho tab trình duyệt, Apple touch icon dùng khi lưu website trên iPhone hoặc iPad, còn maskable icon giúp biểu tượng PWA không bị cắt sai trên từng thiết bị.",
    faqTitle: "Câu hỏi về Favicon",
    faqs: [
      ["Favicon nên có kích thước bao nhiêu", "Bộ tệp này tạo biểu tượng 16, 32 và 48 px cho trình duyệt, 180 px cho Apple, cùng 192 và 512 px cho ứng dụng web."],
      ["Có thể tạo favicon.ico từ PNG không", "Có. Công cụ sẽ đóng gói ảnh PNG 16, 32 và 48 px vào một tệp favicon.ico."],
      ["Hình ảnh có được tải lên máy chủ không", "Không. Hình ảnh được đọc, kết xuất và đóng gói thành ZIP ngay trong trình duyệt của bạn."],
      ["Nên đặt các tệp favicon ở đâu", "Trong hầu hết dự án, hãy đặt chúng ở thư mục gốc hoặc thư mục public của website, rồi thêm các thẻ link từ favicon-snippet.html vào phần head."]
    ],
    relatedTitle: "Tiếp tục với một công cụ miễn phí khác",
    related: [["Công cụ hình ảnh", "/tools/resizeimg/en/", "Đổi kích thước, chuyển đổi và nén ảnh trước khi tạo biểu tượng."], ["QR code có logo", "/tools/qrgen/qr-code-generator-with-logo/en/", "Tạo QR code mang thương hiệu cho website hoặc chiến dịch."], ["Công cụ thương hiệu", "/tools/brand/vi/", "Quay lại bộ công cụ để ra mắt website và thương hiệu."]]
  }
} as const;

const localeRoutes = {
  th: { home: "/", hub: "/tools/brand/", tool: "/tools/brand/favicon-generator/" },
  en: { home: "/en/", hub: "/tools/brand/en/", tool: "/tools/brand/favicon-generator/en/" },
  vi: { home: "/vi/", hub: "/tools/brand/vi/", tool: "/tools/brand/favicon-generator/vi/" }
} as const;

export default function FaviconPage({ language }: { language: keyof typeof copy }) {
  const c = copy[language];
  const routes = localeRoutes[language];
  const languageLabels = { th: "ไทย", en: "English", vi: "Tiếng Việt" } as const;
  return <main className="brand-page">
    <header className="brand-header"><a className="brand-logo" href={routes.home}><img src="/tools/djai-assets/djai-academy-logo-display.webp" alt="DJAI Academy" /></a><nav><a href={routes.hub}><ArrowLeft aria-hidden="true" />{c.back}</a>{(Object.keys(localeRoutes) as Array<keyof typeof localeRoutes>).filter((locale) => locale !== language).map((locale) => <a className="brand-language" href={localeRoutes[locale].tool} hrefLang={locale} key={locale}>{languageLabels[locale]}</a>)}</nav></header>
    <section className="favicon-hero"><p className="brand-kicker">{c.eyebrow}</p><h1>{c.title}</h1><p>{c.intro}</p><div>{c.badges.map((badge, index) => <span key={badge}>{index === 0 ? <ShieldCheck aria-hidden="true" /> : index === 1 ? <CheckCircle2 aria-hidden="true" /> : <Code2 aria-hidden="true" />}{badge}</span>)}</div></section>
    <FaviconWorkspace language={language} />
    <section className="favicon-explainer"><div><p className="brand-kicker">3 steps</p><h2>{c.howTitle}</h2></div><ol>{c.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>
    <section className="favicon-file-guide"><Download aria-hidden="true" /><div><h2>{c.seoTitle}</h2><p>{c.seoText}</p></div></section>
    <section className="favicon-faq"><div><p className="brand-kicker">FAQ</p><h2>{c.faqTitle}</h2></div><div>{c.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <nav className="brand-discovery" aria-label={c.relatedTitle} data-tool-discovery><h2>{c.relatedTitle}</h2><div>{c.related.map(([title, href, description]) => <a href={href} key={href}><strong>{title}</strong><span>{description}</span></a>)}</div></nav>
  </main>;
}
