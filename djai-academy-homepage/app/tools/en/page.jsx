export const metadata = {
  title: "Free DJAI Tools | PDF, DOCX, AI, CSV, QR and Image Tools",
  description:
    "Use free DJAI tools for PDF, DOCX, OCR, AI context, CSV, QR codes, and images. Private browser processing with no account.",
  alternates: {
    canonical: "/tools/en/",
    languages: {
      en: "/tools/en/",
      th: "/tools/"
    }
  },
  openGraph: {
    title: "Free DJAI Tools",
    description:
      "Free browser-based tools from DJAI Academy, built for creators, founders, students, and businesses.",
    url: "/tools/en/",
    siteName: "DJAI Academy",
    images: ["/djai-logo.webp"],
    type: "website"
  }
};

const tools = [
  {
    label: "QR Generator",
    title: "Free QR Code Generator",
    text: "Create custom QR codes for websites, menus, profiles, forms, and campaigns. Download PNG or SVG files with no sign-up.",
    href: "https://www.djai.academy/tools/qrgen/en/",
    tags: ["QR code", "PNG", "SVG"]
  },
  {
    label: "Image Tools",
    title: "Free Image Converter and Resizer",
    text: "Resize, compress, and convert JPG, PNG, WebP, and HEIC images. Process batches and download a ZIP while files stay on your device.",
    href: "https://www.djai.academy/tools/resizeimg/en/",
    tags: ["HEIC", "Batch", "Target KB"]
  },
  {
    label: "PDF Tools",
    title: "DJTools Free PDF Tool Set",
    text: "Merge, split, compress, convert, rotate, watermark, and password protect PDFs for free. Files stay on your device.",
    href: "https://www.djai.academy/tools/PDFTools/en/",
    tags: ["PDF", "AES-256", "Private"]
  },
  {
    label: "Document Tools",
    title: "DJAI Document Converter",
    text: "Convert DOCX to PDF, HTML, Markdown, and text, extract PDF text, or run Thai and English OCR in your browser.",
    href: "https://www.djai.academy/tools/document/en/",
    tags: ["DOCX", "OCR", "Private"]
  },
  {
    label: "AI Tools",
    title: "AI Context and Token Tools",
    text: "Count tokens, clean context, preview RAG chunks, and package multiple files for AI without uploading content.",
    href: "https://www.djai.academy/tools/ai/en/",
    tags: ["Tokens", "RAG", "Context"]
  },
  {
    label: "Spreadsheet Tools",
    title: "CSV, JSON and Excel Tools",
    text: "Convert, clean, merge, and split CSV, JSON, and XLSX files privately for data workflows and automation.",
    href: "https://www.djai.academy/tools/spreadsheet/en/",
    tags: ["CSV", "JSON", "XLSX"]
  }
];

const comingSoon = [
  "Background remover",
  "Favicon generator",
  "AVIF tools",
  "High-fidelity Office conversion"
];

const popularWorkflows = [
  ["JPG to PNG", "Convert an image without uploading", "https://www.djai.academy/tools/resizeimg/jpg-to-png/en/"],
  ["HEIC to JPG", "Convert an iPhone photo in your browser", "https://www.djai.academy/tools/resizeimg/heic-to-jpg/en/"],
  ["Image to 100 KB", "Prepare an image for upload forms", "https://www.djai.academy/tools/resizeimg/image-to-100kb/en/"],
  ["JPG to PDF", "Combine multiple images into a PDF", "https://www.djai.academy/tools/PDFTools/jpg-to-pdf/en/"],
  ["PDF to JPG", "Export every page as an image or ZIP", "https://www.djai.academy/tools/PDFTools/pdf-to-jpg/en/"],
  ["DOCX to PDF", "Convert Word privately in your browser", "https://www.djai.academy/tools/document/docx-to-pdf/en/"],
  ["PDF to Text", "Extract text from selected pages", "https://www.djai.academy/tools/document/pdf-to-text/en/"],
  ["Document Token Counter", "Check context use before AI", "https://www.djai.academy/tools/ai/token-counter/en/"],
  ["CSV to JSON", "Prepare data for APIs", "https://www.djai.academy/tools/spreadsheet/csv-to-json/en/"]
];

const ecosystem = [
  {
    title: "Develop With DJAI",
    text: "Custom web tools, apps, automation systems, and AI-powered platforms.",
    href: "https://www.djai.academy/service/en/"
  },
  {
    title: "Siamese Cat Dev",
    text: "Software development, product design, and technical implementation partner.",
    href: "https://www.djai.academy/siamese_cat/dev/en/"
  },
  {
    title: "Siamese Cat Cafe",
    text: "The community cafe and real-world brand connected to our builder ecosystem.",
    href: "https://siamesecat.cafe/"
  },
  {
    title: "Siamese Cat Creative Club",
    text: "Creative workflows, visual production, and creator-focused experiments.",
    href: "https://creative.siamesecat.cafe/"
  },
  {
    title: "Siamese Cat Hotel",
    text: "Hospitality projects, digital guest experiences, and business automation opportunities.",
    href: "https://hotel.siamesecat.cafe/"
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free DJAI Tools",
  url: "https://www.djai.academy/tools/en/",
  description:
    "A collection of free browser tools from DJAI Academy for PDFs, documents, AI context, spreadsheets, QR codes, and images.",
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

export default function ToolsPage() {
  return (
    <main className="tools-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="tools-nav">
        <a href="https://www.djai.academy/en/" aria-label="DJAI Academy home">
          <img src="/djai-logo.webp" alt="DJAI Academy" />
        </a>
        <nav aria-label="Tools navigation">
          <a href="https://www.djai.academy/course/en/">Courses</a>
          <a href="https://www.djai.academy/course/en/#community">Community</a>
          <a href="https://www.djai.academy/service/en/">Services</a>
          <a href="https://www.djai.academy/blog/en/">Blog</a>
          <a href="https://www.djai.academy/tools/" hrefLang="th">
            ไทย
          </a>
        </nav>
      </header>

      <section className="tools-hero">
        <p className="eyebrow">Free public tools by DJAI Academy</p>
        <h1>Useful tools for builders, creators, and businesses.</h1>
        <p>
          DJAI publishes free tools to help people build faster, work smarter, and solve everyday
          digital problems without accounts, paywalls, or unnecessary friction.
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
            <strong>Open tool</strong>
          </a>
        ))}
      </section>

      <section className="workflow-section" aria-labelledby="workflow-heading">
        <div>
          <p className="eyebrow">START WITH A TASK</p>
          <h2 id="workflow-heading">Shortcuts for popular workflows.</h2>
        </div>
        <div className="workflow-links">
          {popularWorkflows.map(([title, text, href]) => (
            <a href={href} key={href}><strong>{title}</strong><span>{text}</span></a>
          ))}
        </div>
      </section>

      <section className="tools-band">
        <div>
          <p className="eyebrow">Why free?</p>
          <h2>Free tools are how we build trust.</h2>
        </div>
        <p>
          These tools are part of the DJAI ecosystem: they help the public, demonstrate our product
          thinking, and create a practical bridge to custom development work for businesses that need
          their own internal tools or automation systems.
        </p>
      </section>

      <section className="coming-tools" aria-label="Future tool ideas">
        <div>
          <p className="eyebrow">Coming next</p>
          <h2>More tools are planned.</h2>
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
          <h2>Built by connected teams with real products.</h2>
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
