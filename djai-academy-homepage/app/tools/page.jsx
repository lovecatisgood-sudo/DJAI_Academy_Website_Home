export const metadata = {
  title: "เครื่องมือฟรีจาก DJAI | PDF, DOCX, AI, CSV, QR และรูปภาพ",
  description:
    "ใช้เครื่องมือฟรีจาก DJAI สำหรับ PDF, DOCX, OCR, AI context, CSV, QR code และรูปภาพ แบบ private ใน browser",
  alternates: {
    canonical: "/tools/",
    languages: {
      en: "/tools/en/",
      th: "/tools/"
    }
  },
  openGraph: {
    title: "เครื่องมือฟรีจาก DJAI",
    description:
      "เครื่องมือฟรีบนเว็บจาก DJAI Academy สำหรับ creator, founder, นักเรียน และธุรกิจ",
    url: "/tools/",
    siteName: "DJAI Academy",
    images: ["/djai-logo.webp"],
    type: "website"
  }
};

const tools = [
  {
    label: "QR Generator",
    title: "Free QR Code Generator",
    text: "สร้าง QR code สำหรับเว็บไซต์ เมนู โปรไฟล์ ฟอร์ม งาน event และ campaign แล้วดาวน์โหลด PNG หรือ SVG ได้ฟรี",
    href: "https://www.djai.academy/tools/qrgen/",
    tags: ["QR code", "PNG", "SVG"]
  },
  {
    label: "Image Tools",
    title: "Free Image Converter and Resizer",
    text: "Resize, compress และ convert JPG, PNG, WebP, HEIC ผ่าน browser รองรับหลายไฟล์และดาวน์โหลด ZIP โดยไฟล์อยู่ในเครื่องของคุณ",
    href: "https://www.djai.academy/tools/resizeimg/",
    tags: ["HEIC", "Batch", "Target KB"]
  },
  {
    label: "PDF Tools",
    title: "DJTools Free PDF Tool Set",
    text: "รวม แยก บีบอัด แปลง หมุน ใส่ลายน้ำ และล็อก PDF ใน browser ฟรี โดยไฟล์ไม่ออกจากอุปกรณ์ของคุณ",
    href: "https://www.djai.academy/tools/PDFTools/",
    tags: ["PDF", "AES-256", "Private"]
  },
  {
    label: "Document Tools",
    title: "DJAI Document Converter",
    text: "แปลง DOCX เป็น PDF, HTML, Markdown และข้อความ ดึงข้อความจาก PDF หรือใช้ OCR ภาษาไทยและอังกฤษใน browser",
    href: "https://www.djai.academy/tools/document/",
    tags: ["DOCX", "OCR", "Private"]
  },
  {
    label: "AI Tools",
    title: "AI Context and Token Tools",
    text: "นับ token ทำความสะอาด context แบ่ง RAG chunk และจัดหลายไฟล์เป็น prompt package โดยข้อมูลไม่ออกจากอุปกรณ์",
    href: "https://www.djai.academy/tools/ai/",
    tags: ["Tokens", "RAG", "Context"]
  },
  {
    label: "Spreadsheet Tools",
    title: "CSV, JSON and Excel Tools",
    text: "แปลง ทำความสะอาด รวม และแบ่ง CSV, JSON และ XLSX แบบ private สำหรับ data workflow และ automation",
    href: "https://www.djai.academy/tools/spreadsheet/",
    tags: ["CSV", "JSON", "XLSX"]
  }
];

const comingSoon = ["Background remover", "Favicon generator", "AVIF tools", "High-fidelity Office conversion"];

const popularWorkflows = [
  ["JPG เป็น PNG", "แปลงไฟล์รูปโดยไม่ upload", "https://www.djai.academy/tools/resizeimg/jpg-to-png/"],
  ["HEIC เป็น JPG", "แปลงรูปจาก iPhone ใน browser", "https://www.djai.academy/tools/resizeimg/heic-to-jpg/"],
  ["ลดรูปใกล้ 100 KB", "เตรียมรูปสำหรับแบบฟอร์ม", "https://www.djai.academy/tools/resizeimg/image-to-100kb/"],
  ["JPG เป็น PDF", "รวมรูปหลายหน้าเป็น PDF", "https://www.djai.academy/tools/PDFTools/jpg-to-pdf/"],
  ["PDF เป็น JPG", "ส่งออกทุกหน้าเป็นรูปหรือ ZIP", "https://www.djai.academy/tools/PDFTools/pdf-to-jpg/"],
  ["DOCX เป็น PDF", "แปลง Word แบบ private", "https://www.djai.academy/tools/document/docx-to-pdf/"],
  ["PDF เป็นข้อความ", "ดึงข้อความตามช่วงหน้า", "https://www.djai.academy/tools/document/pdf-to-text/"],
  ["นับ Token เอกสาร", "ตรวจ context ก่อนใช้กับ AI", "https://www.djai.academy/tools/ai/token-counter/"],
  ["CSV เป็น JSON", "เตรียมข้อมูลสำหรับ API", "https://www.djai.academy/tools/spreadsheet/csv-to-json/"]
];

const ecosystem = [
  {
    title: "พัฒนาโปรเจกต์กับ DJAI",
    text: "Custom web tools, apps, automation systems และ AI-powered platforms",
    href: "https://www.djai.academy/service/"
  },
  {
    title: "DJAI × Siamese Cat",
    text: "ความร่วมมือด้านเทคโนโลยี product และการเติบโตของธุรกิจใน Siamese Cat ecosystem",
    href: "https://www.djai.academy/siamese_cat/"
  },
  {
    title: "Siamese Cat Dev",
    text: "Software development, product design และ technical implementation partner",
    href: "https://www.djai.academy/siamese_cat/dev/"
  },
  {
    title: "Siamese Cat Cafe",
    text: "ธุรกิจคาเฟ่จริงใน ecosystem ที่ DJAI ช่วยสร้าง digital presence",
    href: "https://siamesecat.cafe/"
  },
  {
    title: "Siamese Cat Creative Club",
    text: "Creative learning, visual production และ creator-focused workflows",
    href: "https://creative.siamesecat.cafe/"
  },
  {
    title: "Siamese Cat Hotel",
    text: "Pet hospitality project และโอกาสด้าน booking/automation",
    href: "https://hotel.siamesecat.cafe/"
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "เครื่องมือฟรีจาก DJAI",
  url: "https://www.djai.academy/tools/",
  description:
    "ชุดเครื่องมือฟรีบน browser จาก DJAI Academy สำหรับ PDF, เอกสาร, AI context, spreadsheet, QR code และรูปภาพ",
  publisher: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/"
  },
  hasPart: tools.map((tool) => ({
    "@type": "SoftwareApplication",
    name: tool.title,
    url: tool.href,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  }))
};

export default function ThaiToolsPage() {
  return (
    <main className="tools-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="tools-nav">
        <a href="https://www.djai.academy/" aria-label="DJAI Academy home">
          <img src="/djai-logo-small.webp" alt="DJAI Academy" width="360" height="193" loading="lazy" decoding="async" />
        </a>
        <nav aria-label="Tools navigation">
          <a href="https://www.djai.academy/course/">คอร์สเรียน</a>
          <a href="https://www.djai.academy/course/#community">ชุมชน</a>
          <a href="https://www.djai.academy/service/">บริการ</a>
          <a href="https://www.djai.academy/blog/">บล็อก</a>
          <a href="https://www.djai.academy/tools/en/" hrefLang="en">
            EN
          </a>
        </nav>
      </header>

      <section className="tools-hero">
        <p className="eyebrow">เครื่องมือฟรีจาก DJAI Academy</p>
        <h1>เครื่องมือใช้งานจริงสำหรับคนสร้างงาน ครีเอเตอร์ และธุรกิจ</h1>
        <p>
          DJAI สร้างเครื่องมือฟรีเพื่อช่วยให้คนทำงานเร็วขึ้น แก้ปัญหาดิจิทัลในชีวิตประจำวัน
          และเห็นแนวคิดการสร้าง product ที่ใช้งานได้จริง
        </p>
      </section>

      <section className="tools-grid" aria-label="Free DJAI tools">
        {tools.map((tool) => (
          <a className="tool-listing" href={tool.href} key={tool.title}>
            <span>{tool.label}</span>
            <h2>{tool.title}</h2>
            <p>{tool.text}</p>
            <div>
              {tool.tags.map((tag) => (
                <small key={tag}>{tag}</small>
              ))}
            </div>
            <strong>เปิดเครื่องมือ</strong>
          </a>
        ))}
      </section>

      <section className="workflow-section" aria-labelledby="workflow-heading">
        <div>
          <p className="eyebrow">เปิดตามงานที่ต้องการ</p>
          <h2 id="workflow-heading">ทางลัดสำหรับงานยอดนิยม</h2>
        </div>
        <div className="workflow-links">
          {popularWorkflows.map(([title, text, href]) => (
            <a href={href} key={href}><strong>{title}</strong><span>{text}</span></a>
          ))}
        </div>
      </section>

      <section className="tools-band">
        <div>
          <p className="eyebrow">ทำไมถึงฟรี?</p>
          <h2>เครื่องมือฟรีคือวิธีที่เราสร้างความเชื่อมั่น</h2>
        </div>
        <p>
          เครื่องมือเหล่านี้ช่วยคนทั่วไป แสดงวิธีคิดด้าน product ของ DJAI และเป็นสะพานไปสู่
          งานพัฒนา custom tool หรือ automation สำหรับธุรกิจที่ต้องการระบบของตัวเอง
        </p>
      </section>

      <section className="coming-tools" aria-label="Future tool ideas">
        <div>
          <p className="eyebrow">ต่อไป</p>
          <h2>เรายังมีเครื่องมืออื่นที่กำลังวางแผน</h2>
        </div>
        <ul>
          {comingSoon.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="ecosystem-hub" aria-label="DJAI and Siamese Cat ecosystem">
        <div className="section-heading">
          <p className="eyebrow">Ecosystem</p>
          <h2>สร้างโดยทีมที่มี product จริงและธุรกิจจริง</h2>
        </div>
        <div className="ecosystem-links">
          {ecosystem.map((item) => (
            <a href={item.href} key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
