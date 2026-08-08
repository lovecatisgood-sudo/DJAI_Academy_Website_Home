import AdSenseAd from "../components/AdSenseAd";
import ShareButtons from "../components/ShareButtons";
import ToolDirectorySection from "./ToolDirectorySection";

export const metadata = {
  title: "เครื่องมือออนไลน์ฟรี | วิดีโอ เสียง PDF รูปภาพ และ AI | DJAI",
  description:
    "ใช้เครื่องมือออนไลน์ฟรีจาก DJAI เพื่อแปลง ตัด บีบอัด และจัดการวิดีโอ เสียง PDF รูปภาพ เอกสาร QR และข้อมูล โดยหลาย workflow ทำงานใน browser ของคุณ",
  alternates: {
    canonical: "/tools/",
    languages: {
      en: "/tools/en/",
      th: "/tools/",
      "x-default": "/tools/"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "เครื่องมือออนไลน์ฟรีสำหรับวิดีโอ เสียง PDF รูปภาพ และ AI",
    description:
      "แปลงและจัดการวิดีโอ เสียง PDF รูปภาพ เอกสาร QR และข้อมูลด้วยเครื่องมือ browser จาก DJAI Academy",
    url: "/tools/",
    siteName: "DJAI Academy",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    images: [{ url: "/social/djai-academy.webp", width: 1200, height: 630, alt: "เครื่องมือออนไลน์ฟรีจาก DJAI Academy" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "เครื่องมือออนไลน์ฟรีจาก DJAI",
    description: "เครื่องมือ browser สำหรับวิดีโอ เสียง PDF รูปภาพ เอกสาร QR และ AI",
    images: ["/social/djai-academy.webp"]
  }
};

const tools = [
  {
    label: "Open SEO Tool",
    title: "SEO Screaming Toad — SEO Crawler + MCP",
    text: "ตรวจ Technical SEO, JavaScript, Canonical, Hreflang, Sitemap และ Structured Data พร้อมหลักฐานในเครื่องและ MCP 23 เครื่องมือสำหรับ AI Agent",
    href: "https://www.djai.academy/tools/seo-screaming-toad/",
    tags: ["SEO Crawler", "MCP", "Open Source"]
  },
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
    text: "Resize, compress, remove background และ convert JPG, PNG, WebP, HEIC ผ่าน browser รองรับหลายไฟล์และดาวน์โหลด ZIP โดยไฟล์อยู่ในเครื่องของคุณ",
    href: "https://www.djai.academy/tools/resizeimg/",
    tags: ["Background", "HEIC", "Batch"]
  },
  {
    label: "PDF Tools",
    title: "DJTools Free PDF Tool Set",
    text: "รวม แยก บีบอัด แปลง หมุน ใส่ลายน้ำ และล็อก PDF ใน browser ฟรี โดยไฟล์ไม่ออกจากอุปกรณ์ของคุณ",
    href: "https://www.djai.academy/tools/PDFTools/",
    tags: ["PDF", "AES-256", "Private"]
  },
  {
    label: "Media Tools",
    title: "แปลงไฟล์เสียงและวิดีโอฟรี",
    text: "แปลง MP3, WAV, M4A, MP4, MOV และ WebM ดึงเสียงหรือบีบอัดวิดีโอด้วย FFmpeg ใน browser โดยไม่ upload ไฟล์",
    href: "https://www.djai.academy/tools/media/",
    tags: ["MP3", "MP4", "FFmpeg"]
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

const comingSoon = ["Favicon generator", "High-fidelity Office conversion"];

const popularWorkflows = [
  ["ลบพื้นหลังรูป", "สร้าง PNG โปร่งใสใน browser", "https://www.djai.academy/tools/resizeimg/remove-background-image/"],
  ["JPG เป็น PNG", "แปลงไฟล์รูปโดยไม่ upload", "https://www.djai.academy/tools/resizeimg/jpg-to-png/"],
  ["HEIC เป็น JPG", "แปลงรูปจาก iPhone ใน browser", "https://www.djai.academy/tools/resizeimg/heic-to-jpg/"],
  ["ลดรูปใกล้ 100 KB", "เตรียมรูปสำหรับแบบฟอร์ม", "https://www.djai.academy/tools/resizeimg/image-to-100kb/"],
  ["JPG เป็น PDF", "รวมรูปหลายหน้าเป็น PDF", "https://www.djai.academy/tools/PDFTools/jpg-to-pdf/"],
  ["PDF เป็น JPG", "ส่งออกทุกหน้าเป็นรูปหรือ ZIP", "https://www.djai.academy/tools/PDFTools/pdf-to-jpg/"],
  ["MP4 เป็น MP3", "ดึงเสียงจากวิดีโอใน browser", "https://www.djai.academy/tools/media/mp4-to-mp3/"],
  ["บีบอัดวิดีโอ", "ลดขนาด MP4 MOV และ WebM", "https://www.djai.academy/tools/media/compress-video/"],
  ["แปลงวิดีโอ", "เปลี่ยนระหว่าง MP4 MOV MKV WebM และ AVI", "https://www.djai.academy/tools/media/video-converter/"],
  ["ตัดวิดีโอ", "เลือกเวลาเริ่มและจบแล้ว export เป็น MP4", "https://www.djai.academy/tools/media/video-cutter/"],
  ["ดึงภาพจากวิดีโอ", "สร้าง JPG หรือ PNG พร้อมดาวน์โหลด ZIP", "https://www.djai.academy/tools/media/extract-frames-from-video/"],
  ["รวมวิดีโอ", "เรียงหลายคลิปแล้วรวมเป็น MP4", "https://www.djai.academy/tools/media/video-merger/"],
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
  name: "เครื่องมือออนไลน์ฟรีจาก DJAI",
  url: "https://www.djai.academy/tools/",
  description:
    "ชุดเครื่องมือฟรีบน browser จาก DJAI Academy สำหรับวิดีโอ เสียง PDF รูปภาพ เอกสาร AI context, spreadsheet และ QR code",
  inLanguage: "th",
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
          <a href="/academy/">ชุมชน</a>
          <a href="https://www.djai.academy/service/">บริการ</a>
          <a href="https://www.djai.academy/blog/">บล็อก</a>
          <a href="https://www.djai.academy/tools/en/" hrefLang="en">
            EN
          </a>
        </nav>
      </header>

      <section className="tools-hero">
        <p className="eyebrow">เครื่องมือฟรีจาก DJAI Academy</p>
        <h1>เครื่องมือออนไลน์ฟรีสำหรับวิดีโอ PDF รูปภาพ AI และงานดิจิทัล</h1>
        <p>
          แปลง ตัด บีบอัด หรือจัดการวิดีโอ เสียง PDF รูปภาพ เอกสาร QR และข้อมูลได้ทันที
          เครื่องมือหลักทำงานใน browser โดยไม่ต้องสมัครบัญชี
        </p>
        <ShareButtons url="https://www.djai.academy/tools/" title="เครื่องมือฟรีจาก DJAI" locale="th" compact />
      </section>

      <AdSenseAd label="Tools advertisement" />

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

      <AdSenseAd label="Tools advertisement" variant="display2" />

      <section className="tools-app-callout" aria-labelledby="cam-pdf-app-title">
        <div className="app-device-mark" aria-hidden="true"><span>▯</span><b>⌁</b></div>
        <div>
          <p className="eyebrow">แอปมือถือ</p>
          <h2 id="cam-pdf-app-title">ใช้เครื่องมือเอกสารขั้นสูงบนมือถือ</h2>
          <p>Cam PDF Scan, Signer & QR Generator รวม scanner, PDF signer, QR generator และ workflow productivity สำหรับงานเอกสารในแอปเดียว</p>
        </div>
        <a className="button" href="https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/">ดาวน์โหลดแอป</a>
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

      <AdSenseAd label="Related tools advertisement" variant="multiplex" />

      <ToolDirectorySection locale="th" />
    </main>
  );
}
