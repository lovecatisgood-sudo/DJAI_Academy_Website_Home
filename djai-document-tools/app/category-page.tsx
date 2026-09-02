import { ArrowRight, FileText, Sparkles, TableProperties } from "lucide-react";
import Image from "next/image";
import AdSenseAd from "./AdSenseAd";
import AcquisitionBridge from "./AcquisitionBridge";
import ShareButtons from "./ShareButtons";
import { categories, categoryHref, categoryOrder, toolHref, toolsFor, type Category, type Language, type ToolDefinition } from "./tool-data";

const icons = { document: FileText, ai: Sparkles, spreadsheet: TableProperties };

export default function CategoryPage({ category, language }: { category: Category; language: Language }) {
  const en = language === "en";
  const vi = language === "vi";
  const copy = categories[category];
  const selectedTools = toolsFor(category);
  const Icon = icons[category];
  const canonical = `https://www.djai.academy${categoryHref(category, language)}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.title[language],
      url: canonical,
      description: copy.description[language],
      hasPart: selectedTools.map((tool) => ({
        "@type": "SoftwareApplication",
        name: tool.title[language],
        url: `https://www.djai.academy${toolHref(tool, language)}`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: vi ? "https://www.djai.academy/vi/" : en ? "https://www.djai.academy/en/" : "https://www.djai.academy/" },
        { "@type": "ListItem", position: 2, name: vi ? "Tất cả công cụ" : en ? "All Tools" : "เครื่องมือทั้งหมด", item: vi ? "https://www.djai.academy/tools/vi/" : en ? "https://www.djai.academy/tools/en/" : "https://www.djai.academy/tools/" },
        { "@type": "ListItem", position: 3, name: copy.title[language], item: canonical }
      ]
    }
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SuiteHeader category={category} language={language} />
      <section className="suite-hero">
        <div>
          <p className="eyebrow">DJTOOLS BY DJAI ACADEMY</p>
          <h1>{copy.title[language]}</h1>
          <p>{copy.description[language]}</p>
          <ShareButtons url={canonical} title={copy.title[language]} language={language} compact />
          <a className="primary-button" href="#available-tools">{vi ? "Chọn công cụ" : en ? "Choose a tool" : "เลือกเครื่องมือ"}<ArrowRight /></a>
        </div>
        <div className="hero-emblem"><Icon /><strong>{category.toUpperCase()}</strong><span>PRIVATE · FREE</span></div>
      </section>
      <section className="trust-strip">
        <span>{vi ? "Dùng miễn phí" : en ? "Free to use" : "ใช้ฟรี"}</span><span>{vi ? "Không cần tài khoản" : en ? "No account" : "ไม่ต้องสมัคร"}</span><span>{vi ? "Xử lý cục bộ" : en ? "Local processing" : "ประมวลผลในเครื่อง"}</span><span>{vi ? "Không watermark" : en ? "No watermark" : "ไม่มี watermark"}</span>
      </section>
      <AdSenseAd label="Tools advertisement" />
      <section className="tool-directory" id="available-tools">
        <div className="section-heading"><p className="eyebrow">{vi ? "SẴN SÀNG" : en ? "AVAILABLE NOW" : "พร้อมใช้งาน"}</p><h2>{vi ? "Chọn công việc bạn cần hoàn thành" : en ? "Choose the job you need to complete" : "เลือกงานที่คุณต้องการทำ"}</h2></div>
        <div className="directory-grid">
          {selectedTools.map((tool, index) => (
            <a className="directory-item" href={toolHref(tool, language)} key={tool.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span><div><h2>{tool.label[language]}</h2><p>{tool.intent[language]}</p></div><ArrowRight />
            </a>
          ))}
        </div>
      </section>
      <AdSenseAd label="Tools advertisement" variant="display2" />
      <ToolEcosystemDirectory language={language} />
      <AcquisitionBridge language={language} category={category} />
      <SuiteFooter language={language} />
    </main>
  );
}

export function SuiteHeader({ category, language, tool }: { category: Category; language: Language; tool?: ToolDefinition }) {
  const en = language === "en";
  const vi = language === "vi";
  const languageTarget = tool ? toolHref(tool, en ? "th" : "en") : categoryHref(category, en ? "th" : "en");
  return <header className="suite-header">
    <a className="suite-brand" href={categoryHref(category, language)}><Image src="/tools/djai-assets/djai-academy-logo-small.webp" alt="DJAI Academy" width={84} height={45} loading="eager" /><span><strong>DJTools</strong><small>{vi ? "Công cụ miễn phí trên trình duyệt" : en ? "Free browser tools" : "เครื่องมือฟรีบน browser"}</small></span></a>
    <nav aria-label="Tool categories">
      <a href={vi ? "/tools/PDFTools/vi/" : en ? "/tools/PDFTools/en/" : "/tools/PDFTools/"}>PDF</a>
      <a href={vi ? "/tools/resizeimg/vi/" : en ? "/tools/resizeimg/en/" : "/tools/resizeimg/"}>{vi ? "Hình ảnh" : en ? "Image" : "รูปภาพ"}</a>
      {categoryOrder.map((item) => <a className={item === category ? "active" : ""} href={categoryHref(item, language)} key={item}>{item === "document" ? (vi ? "Tài liệu" : en ? "Document" : "เอกสาร") : item === "ai" ? "AI" : (vi ? "Bảng tính" : en ? "Spreadsheet" : "ตารางข้อมูล")}</a>)}
      <a href={vi ? "/tools/vi/" : en ? "/tools/en/" : "/tools/"}>{vi ? "Tất cả" : en ? "All tools" : "ทั้งหมด"}</a>
      {vi ? <><a className="language-switch" href={tool ? toolHref(tool, "th") : categoryHref(category, "th")}>ไทย</a><a className="language-switch" href={tool ? toolHref(tool, "en") : categoryHref(category, "en")}>EN</a></> : <a className="language-switch" href={languageTarget}>{en ? "ไทย" : "EN"}</a>}
    </nav>
  </header>;
}

export function ToolEcosystemDirectory({ language }: { language: Language }) {
  const en = language === "en";
  const vi = language === "vi";
  const links = vi ? [
    ["Tất cả công cụ miễn phí", "/tools/vi/", "Duyệt mọi công cụ DJAI theo công việc."],
    ["Công cụ QR", "/tools/qrgen/vi/", "Tạo QR cho đường dẫn, Wi-Fi, liên hệ và tin nhắn."],
    ["Công cụ hình ảnh", "/tools/resizeimg/vi/", "Đổi định dạng, resize, nén và xóa nền ảnh."],
    ["Công cụ PDF", "/tools/PDFTools/vi/", "Ghép, tách, chuyển đổi, sắp xếp và bảo vệ PDF."],
    ["Âm thanh và video", "/tools/media/", "Đổi định dạng media, tách âm thanh và nén video."],
    ["Công cụ tài liệu", "/tools/document/vi/", "Chuyển DOCX, trích xuất văn bản PDF và OCR."],
    ["Công cụ ngữ cảnh AI", "/tools/ai/vi/", "Đếm token, làm sạch context và chia RAG chunk."],
    ["Công cụ bảng tính", "/tools/spreadsheet/vi/", "Chuyển đổi và xử lý CSV, JSON và XLSX."]
  ] : en ? [
    ["All free tools", "/tools/en/", "Browse every free DJAI tool by task."],
    ["QR code tools", "/tools/qrgen/en/", "Create QR codes for links, Wi-Fi, contacts, and messages."],
    ["Image tools", "/tools/resizeimg/en/", "Convert, resize, compress, and remove image backgrounds."],
    ["PDF tools", "/tools/PDFTools/en/", "Merge, split, convert, organize, and protect PDF files."],
    ["Audio and video", "/tools/media/en/", "Convert media, extract audio, and compress video."],
    ["Document tools", "/tools/document/en/", "Convert DOCX, extract PDF text, and run OCR."],
    ["AI context tools", "/tools/ai/en/", "Count tokens, clean context, and plan RAG chunks."],
    ["Spreadsheet tools", "/tools/spreadsheet/en/", "Convert and process CSV, JSON, and XLSX data."]
  ] : [
    ["เครื่องมือทั้งหมด", "/tools/", "รวมเครื่องมือฟรีทุกหมวดจาก DJAI"],
    ["เครื่องมือ QR Code", "/tools/qrgen/", "สร้าง QR สำหรับลิงก์ Wi-Fi ผู้ติดต่อ และข้อความ"],
    ["เครื่องมือรูปภาพ", "/tools/resizeimg/", "แปลง resize บีบอัด และลบพื้นหลังรูป"],
    ["เครื่องมือ PDF", "/tools/PDFTools/", "รวม แยก แปลง จัดหน้า และป้องกัน PDF"],
    ["เครื่องมือเสียงและวิดีโอ", "/tools/media/", "แปลงไฟล์ ดึงเสียง และบีบอัดวิดีโอ"],
    ["เครื่องมือเอกสาร", "/tools/document/", "แปลง DOCX ดึงข้อความ PDF และทำ OCR"],
    ["เครื่องมือ AI Context", "/tools/ai/", "นับ token ทำความสะอาด context และแบ่ง RAG chunk"],
    ["เครื่องมือ Spreadsheet", "/tools/spreadsheet/", "แปลงและจัดการ CSV JSON และ XLSX"]
  ];
  return <nav className="tool-ecosystem-directory" aria-labelledby={`tool-ecosystem-${language}`} data-tool-discovery><div><p className="eyebrow">{vi ? "KHÁM PHÁ CÔNG CỤ DJAI" : en ? "EXPLORE DJAI TOOLS" : "สำรวจเครื่องมือ DJAI"}</p><h2 id={`tool-ecosystem-${language}`}>{vi ? "Tiếp tục với một công cụ miễn phí khác" : en ? "Continue with another free workflow" : "ทำงานต่อด้วยเครื่องมือฟรีหมวดอื่น"}</h2></div><div>{links.map(([label, href, description]) => <a href={href} key={href}><strong>{label}</strong><span>{description}</span><ArrowRight /></a>)}</div></nav>;
}

export function SuiteFooter({ language }: { language: Language }) {
  const en = language === "en";
  const vi = language === "vi";
  const devHref = en ? "/siamese_cat/dev/en/" : "/siamese_cat/dev/";
  return <footer className="suite-footer"><div><a href={devHref} aria-label={vi ? "Tìm hiểu Siamese Cat Dev" : en ? "Meet Siamese Cat Dev" : "รู้จัก Siamese Cat Dev"}><Image src="/tools/djai-assets/siamese-cat-dev-logo.webp" alt="Siamese Cat Dev" width={130} height={109} loading="lazy" /></a><p>{vi ? <>Được xây dựng cẩn thận bởi <a href={devHref}>Siamese Cat Dev</a>, đối tác sản phẩm và phát triển của DJAI Academy.</> : en ? <>Created with intention by <a href={devHref}>Siamese Cat Dev</a>, DJAI Academy&apos;s product and development partner.</> : <>สร้างด้วยความตั้งใจโดย <a href={devHref}>Siamese Cat Dev</a> พันธมิตรด้าน product และ development ของ DJAI Academy</>}</p></div><div><strong>DJAI</strong><a href={vi ? "/vi/" : en ? "/en/" : "/"}>DJAI Academy</a><a href={vi ? "/service/vi/" : en ? "/service/en/" : "/service/"}>{vi ? "Dịch vụ" : en ? "Services" : "บริการ"}</a><a href={vi ? "/portfolio/vi/" : en ? "/portfolio/en/" : "/portfolio/"}>{vi ? "Dự án" : en ? "Portfolio" : "ผลงาน"}</a></div><div><strong>{vi ? "CÔNG CỤ" : en ? "TOOLS" : "เครื่องมือ"}</strong><a href={categoryHref("document", language)}>{vi ? "Công cụ tài liệu" : en ? "Document tools" : "เครื่องมือเอกสาร"}</a><a href={categoryHref("ai", language)}>AI Tools</a><a href={categoryHref("spreadsheet", language)}>{vi ? "Công cụ bảng tính" : en ? "Spreadsheet tools" : "เครื่องมือตารางข้อมูล"}</a></div><small>© 2026 DJAI Academy · {vi ? "Tệp được xử lý cục bộ trừ khi trang ghi rõ điều khác." : en ? "Files are processed locally unless clearly stated otherwise." : "ไฟล์ประมวลผลในอุปกรณ์ เว้นแต่มีการแจ้งอย่างชัดเจน"}</small></footer>;
}
