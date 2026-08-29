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
  },
  "zh-CN": {
    back: "品牌工具", languageHref: "/tools/brand/favicon-generator/zh-tw/", languageLabel: "繁體中文", eyebrow: "免费 Favicon 生成器", title: "从图片生成 Favicon 与完整安装文件", intro: "添加一张品牌标志图片，查看真实尺寸预览，然后一次下载 favicon.ico、PNG 图标、Apple touch icon、maskable icon、web manifest 和 HTML 代码。", badges: ["浏览器本地处理", "无需注册", "ICO + PNG + Manifest"], howTitle: "如何为网站制作 Favicon", steps: ["选择正方形 PNG、JPG、WebP 或 SVG，并为品牌标志保留适当留白", "调整边距和背景颜色，检查 16、32、48 和 180 px 预览", "生成文件、下载 ZIP，并将提供的 HTML 标签放进网站 <head>"], seoTitle: "每种 Favicon 文件的用途", seoText: "favicon.ico 用于浏览器及旧系统；16 和 32 px PNG 用于浏览器标签页；Apple touch icon 用于 iPhone 和 iPad 主屏幕；maskable icon 可减少 PWA 图标被设备裁切的问题。", faqTitle: "Favicon 常见问题", faqs: [["Favicon 应该使用多大尺寸？", "工具会生成 16、32、48、180、192 和 512 px 等常用尺寸。"], ["可以从 PNG 生成 favicon.ico 吗？", "可以。工具会把 16、32 和 48 px PNG 打包进同一个 favicon.ico。"], ["图片会上传到服务器吗？", "不会。图片只在浏览器中读取、绘制并打包成 ZIP。"], ["Favicon 文件应放在哪里？", "通常放在网站根目录或 public 目录，再把 favicon-snippet.html 中的标签加入 head。"]], relatedTitle: "继续使用其他免费工具", related: [["图片工具", "/tools/resizeimg/zh-cn/", "生成图标前调整尺寸、转换或压缩图片。"], ["带品牌标志的二维码", "/tools/qrgen/qr-code-generator-with-logo/zh-cn/", "为网站或活动制作品牌二维码。"], ["品牌工具", "/tools/brand/zh-cn/", "返回网站与品牌上线工具。"]]
  },
  "zh-TW": {
    back: "品牌工具", languageHref: "/tools/brand/favicon-generator/zh-cn/", languageLabel: "简体中文", eyebrow: "免費 Favicon 產生器", title: "從圖片產生 Favicon 與完整安裝檔案", intro: "加入一張品牌標誌圖片，查看實際尺寸預覽，然後一次下載 favicon.ico、PNG 圖示、Apple touch icon、maskable icon、web manifest 與 HTML 程式碼。", badges: ["瀏覽器本機處理", "免註冊", "ICO + PNG + Manifest"], howTitle: "如何為網站製作 Favicon", steps: ["選擇正方形 PNG、JPG、WebP 或 SVG，並在品牌標誌周圍保留適當留白", "調整邊距與背景顏色，檢查 16、32、48 與 180 px 預覽", "產生檔案、下載 ZIP，並將提供的 HTML 標籤放進網站 <head>"], seoTitle: "每種 Favicon 檔案的用途", seoText: "favicon.ico 用於瀏覽器與舊系統；16 和 32 px PNG 用於瀏覽器分頁；Apple touch icon 用於 iPhone 與 iPad 主畫面；maskable icon 可減少 PWA 圖示被裝置裁切的問題。", faqTitle: "Favicon 常見問題", faqs: [["Favicon 應該使用多大尺寸？", "工具會產生 16、32、48、180、192 與 512 px 等常用尺寸。"], ["可以從 PNG 產生 favicon.ico 嗎？", "可以。工具會把 16、32 與 48 px PNG 封裝進同一個 favicon.ico。"], ["圖片會上傳至伺服器嗎？", "不會。圖片只在瀏覽器中讀取、繪製並封裝成 ZIP。"], ["Favicon 檔案應放在哪裡？", "通常放在網站根目錄或 public 目錄，再把 favicon-snippet.html 中的標籤加入 head。"]], relatedTitle: "繼續使用其他免費工具", related: [["圖片工具", "/tools/resizeimg/zh-tw/", "產生圖示前調整尺寸、轉檔或壓縮圖片。"], ["含品牌標誌的 QR Code", "/tools/qrgen/qr-code-generator-with-logo/zh-tw/", "為網站或活動製作品牌 QR Code。"], ["品牌工具", "/tools/brand/zh-tw/", "返回網站與品牌上線工具。"]]
  }
} as const;

const localeRoutes = {
  th: { home: "/", hub: "/tools/brand/", tool: "/tools/brand/favicon-generator/" },
  en: { home: "/en/", hub: "/tools/brand/en/", tool: "/tools/brand/favicon-generator/en/" },
  vi: { home: "/vi/", hub: "/tools/brand/vi/", tool: "/tools/brand/favicon-generator/vi/" },
  "zh-CN": { home: "/zh-cn/", hub: "/tools/brand/zh-cn/", tool: "/tools/brand/favicon-generator/zh-cn/" },
  "zh-TW": { home: "/zh-tw/", hub: "/tools/brand/zh-tw/", tool: "/tools/brand/favicon-generator/zh-tw/" }
} as const;

export default function FaviconPage({ language }: { language: keyof typeof copy }) {
  const c = copy[language];
  const routes = localeRoutes[language];
  const languageLabels = { th: "ไทย", en: "English", vi: "Tiếng Việt", "zh-CN": "简体中文", "zh-TW": "繁體中文" } as const;
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
