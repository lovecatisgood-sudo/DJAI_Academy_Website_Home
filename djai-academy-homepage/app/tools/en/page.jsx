import AdSenseAd from "../../components/AdSenseAd";
import ShareButtons from "../../components/ShareButtons";
import { schoolUrlFor } from "../../lib/i18n";
import ToolDirectorySection from "../ToolDirectorySection";

export const metadata = {
  title: "90+ Free Online Tools — No Sign-Up | DJAI Academy",
  description:
    "Use 90+ free tools for video, PDFs, images, QR codes, documents, AI, and data. No account required; many files process privately in your browser.",
  alternates: {
    canonical: "/tools/en/",
    languages: {
      en: "/tools/en/",
      th: "/tools/",
      vi: "/tools/vi/",
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
    title: "Free Online Tools for Video, Audio, PDFs, Images, and AI",
    description:
      "Convert and manage video, audio, PDFs, images, documents, QR codes, and data with browser tools from DJAI Academy.",
    url: "/tools/en/",
    siteName: "DJAI Academy",
    locale: "en_US",
    alternateLocale: ["th_TH"],
    images: [{ url: "/social/djai-academy.webp", width: 1200, height: 630, alt: "Free online tools from DJAI Academy" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools from DJAI",
    description: "Browser tools for video, audio, PDFs, images, documents, QR codes, and AI workflows.",
    images: ["/social/djai-academy.webp"]
  }
};

const tools = [
  {
    label: "Video to Text",
    title: "Video to Text Converter — Free, No Sign-Up",
    text: "Transcribe video or audio with AI in your browser. No email, no account, and no media upload to DJAI. Download TXT, SRT, VTT, or JSON.",
    href: "https://www.djai.academy/tools/video-to-text/en/",
    tags: ["Video to Text", "No Sign-Up", "Local AI"]
  },
  {
    label: "Open SEO Tool",
    title: "SEO Screaming Toad — SEO Crawler + MCP",
    text: "Audit technical SEO, JavaScript, canonicals, hreflang, sitemaps, and structured data with local evidence and 23 MCP tools for AI agents.",
    href: "https://www.djai.academy/tools/seo-screaming-toad/en/",
    tags: ["SEO Crawler", "MCP", "Open Source"]
  },
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
    text: "Resize, compress, remove backgrounds, and convert JPG, PNG, WebP, and HEIC images. Process batches and download a ZIP while files stay on your device.",
    href: "https://www.djai.academy/tools/resizeimg/en/",
    tags: ["Background", "HEIC", "Batch"]
  },
  {
    label: "PDF Tools",
    title: "DJTools Free PDF Tool Set",
    text: "Merge, split, compress, convert, rotate, watermark, and password protect PDFs for free. Files stay on your device.",
    href: "https://www.djai.academy/tools/PDFTools/en/",
    tags: ["PDF", "AES-256", "Private"]
  },
  {
    label: "Media Tools",
    title: "Free Audio and Video Converter",
    text: "Convert MP3, WAV, M4A, MP4, MOV, and WebM, extract audio, or compress video with FFmpeg in your browser without uploading files.",
    href: "https://www.djai.academy/tools/media/en/",
    tags: ["MP3", "MP4", "FFmpeg"]
  },
  {
    label: "Document Tools",
    title: "DJAI Document Converter",
    text: "Convert Word (DOCX) to PDF, HTML, Markdown, and text, extract PDF text, or run Thai and English OCR in your browser.",
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

const comingSoon = ["High-fidelity Office conversion"];

const popularWorkflows = [
  ["GIF to MP4 converter", "Make animated GIFs smaller without uploading", "https://www.djai.academy/tools/media/gif-to-mp4/en/"],
  ["Compress video toward 10 MB", "Set an approximate 10 MB target in your browser", "https://www.djai.academy/tools/media/compress-video-to-10mb/en/"],
  ["Compress video toward 25 MB", "Prepare video for a 25 MB upload limit", "https://www.djai.academy/tools/media/compress-video-to-25mb/en/"],
  ["Compress video toward 50 MB", "Reduce video toward an approximate 50 MB target", "https://www.djai.academy/tools/media/compress-video-to-50mb/en/"],
  ["Compress video toward 100 MB", "Reduce larger video without sending it to a server", "https://www.djai.academy/tools/media/compress-video-to-100mb/en/"],
  ["Crop video to 16:9 or 9:16", "Create a centered crop for web or social video", "https://www.djai.academy/tools/media/video-cropper/en/"],
  ["Resize video to 1080p or 720p", "Change resolution while preserving aspect ratio", "https://www.djai.academy/tools/media/video-resizer/en/"],
  ["Extract video frames at intervals", "Save up to 100 JPG or PNG frames as a ZIP", "https://www.djai.academy/tools/media/extract-frames-from-video/en/"],
  ["Resize an image toward 200 KB", "Meet form and email targets with an approximate result", "https://www.djai.academy/tools/resizeimg/resize-image-to-200kb/en/"],
  ["Compress an image toward 100 KB", "Prepare an image for smaller upload limits", "https://www.djai.academy/tools/resizeimg/image-to-100kb/en/"],
  ["Remove JPG, PNG or WebP backgrounds", "Create a transparent PNG in your browser", "https://www.djai.academy/tools/resizeimg/remove-background-image/en/"],
  ["Convert Word (DOCX) to PDF", "Create a private PDF with paper, margin, and page-number controls", "https://www.djai.academy/tools/document/docx-to-pdf/en/"],
  ["Create an email QR code", "Prefill the recipient, subject, and message", "https://www.djai.academy/tools/qrgen/email-qr-code-generator/en/"],
  ["Generate a complete favicon package", "Download ICO, Apple, PWA, manifest, and HTML files", "https://www.djai.academy/tools/brand/favicon-generator/en/"],
  ["Combine JPG images into one PDF", "Build a PDF privately in your browser", "https://www.djai.academy/tools/PDFTools/jpg-to-pdf/en/"],
  ["Convert PDF pages to JPG", "Export every page as an image or ZIP", "https://www.djai.academy/tools/PDFTools/pdf-to-jpg/en/"],
  ["Video to text", "Transcribe in your browser with no sign-up", "https://www.djai.academy/tools/video-to-text/en/"],
  ["OCR scanned PDFs and images", "Recognize Thai or English text in your browser", "https://www.djai.academy/tools/document/ocr/en/"],
  ["Count document tokens for AI", "Check context use without uploading content", "https://www.djai.academy/tools/ai/token-counter/en/"],
  ["CSV to JSON", "Prepare data for APIs", "https://www.djai.academy/tools/spreadsheet/csv-to-json/en/"]
];

const ecosystem = [
  {
    title: "Develop With DJAI",
    text: "Custom web tools, apps, automation systems, and AI-powered platforms.",
    href: "https://www.djai.academy/development/en/"
  },
  {
    title: "DJAI × Siamese Cat",
    text: "The technology, product, and business-growth partnership across the Siamese Cat ecosystem.",
    href: "https://www.djai.academy/siamese_cat/en/"
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
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Online Tools from DJAI",
  url: "https://www.djai.academy/tools/en/",
  description:
    "A collection of free browser tools from DJAI Academy for video, audio, PDFs, images, documents, AI context, spreadsheets, and QR codes.",
  inLanguage: "en",
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
          <img src="/djai-logo-small.webp" alt="DJAI Academy" width="360" height="193" loading="lazy" decoding="async" />
        </a>
        <nav aria-label="Tools navigation">
          <a href="https://www.djai.academy/development/en/">Development</a>
          <a href="/Cam_PDF_Scan_Signer_QR-Gen/">Cam PDF</a>
          <a href={schoolUrlFor("en")}>DJAI School</a>
          <a href="https://www.djai.academy/blog/en/">Resources</a>
          <a href="https://www.djai.academy/tools/" hrefLang="th">
            ไทย
          </a>
        </nav>
      </header>

      <section className="tools-hero">
        <p className="eyebrow">Free public tools by DJAI Academy</p>
        <h1>Free online tools for video, PDFs, images, AI, and digital work.</h1>
        <p>
          Convert, cut, compress, or manage video, audio, PDFs, images, documents, QR codes, and
          data immediately. Core tools run in your browser with no account required.
        </p>
        <ShareButtons url="https://www.djai.academy/tools/en/" title="Free DJAI Tools" locale="en" compact />
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
            <strong>Open tool</strong>
          </a>
        ))}
      </section>

      <AdSenseAd label="Tools advertisement" variant="display2" />

      <section className="tools-app-callout" aria-labelledby="cam-pdf-app-title">
        <div className="app-device-mark" aria-hidden="true"><span>▯</span><b>⌁</b></div>
        <div>
          <p className="eyebrow">MOBILE APP</p>
          <h2 id="cam-pdf-app-title">Use advanced document tools on your phone.</h2>
          <p>Cam PDF Scan, Signer & QR Generator brings a scanner, PDF signer, QR generator, and productivity workflows into one mobile app.</p>
        </div>
        <a className="button" href="/Cam_PDF_Scan_Signer_QR-Gen/">See the Cam PDF app</a>
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

      <AdSenseAd label="Related tools advertisement" variant="multiplex" />

      <ToolDirectorySection locale="en" />
    </main>
  );
}
