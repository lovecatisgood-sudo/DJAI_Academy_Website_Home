import ProductLanding from "./ProductLanding";

export const metadata = {
  title: "SEO Crawler ฟรี พร้อม MCP สำหรับ AI | Screaming Toad",
  description:
    "ใช้ SEO Screaming Toad ตรวจ Technical SEO, JavaScript, Canonical, Hreflang และ Structured Data พร้อม MCP 23 เครื่องมือสำหรับ AI Agent",
  alternates: {
    canonical: "/tools/seo-screaming-toad/",
    languages: {
      th: "/tools/seo-screaming-toad/",
      en: "/tools/seo-screaming-toad/en/",
      vi: "/tools/seo-screaming-toad/vi/",
      "x-default": "/tools/seo-screaming-toad/"
    }
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SEO Screaming Toad — Open SEO Crawler + MCP ภาษาไทย",
    description:
      "Technical SEO crawler แบบโอเพนซอร์ส เก็บหลักฐานในเครื่อง พร้อม JavaScript Audit, Reports และ MCP สำหรับ AI SEO",
    url: "/tools/seo-screaming-toad/",
    siteName: "DJAI Academy",
    locale: "th_TH",
    images: [{ url: "/social/djai-tools.webp", width: 1200, height: 630, alt: "SEO Screaming Toad เครื่องมือ SEO crawler และ MCP" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Screaming Toad — SEO Crawler + MCP ภาษาไทย",
    description: "Open-source SEO crawler และ MCP สำหรับ AI Agent จากชุมชน DJAI Academy",
    images: ["/social/djai-tools.webp"]
  }
};

export default function ThaiScreamingToadPage() {
  return <ProductLanding locale="th" />;
}
