export const metadata = {
  title: "เครื่องมือฟรีจาก DJAI | QR Generator และ Image Tools",
  description:
    "ใช้เครื่องมือฟรีจาก DJAI สำหรับสร้าง QR code แปลงรูป resize รูป compress รูป และ workflow สำหรับ creator และธุรกิจ",
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
    text: "Resize, compress และ convert JPG, PNG, WebP ผ่าน browser โดยไฟล์อยู่ในเครื่องของคุณ",
    href: "https://www.djai.academy/tools/resizeimg/",
    tags: ["JPG", "PNG", "WebP"]
  }
];

const comingSoon = ["PDF tools", "Background remover", "Favicon generator", "Social media image presets"];

const ecosystem = [
  {
    title: "พัฒนาโปรเจกต์กับ DJAI",
    text: "Custom web tools, apps, automation systems และ AI-powered platforms",
    href: "https://www.djai.academy/service/"
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
    "ชุดเครื่องมือฟรีบน browser จาก DJAI Academy เช่น QR code generator และ image converter",
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
          <img src="/djai-logo.webp" alt="DJAI Academy" />
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
