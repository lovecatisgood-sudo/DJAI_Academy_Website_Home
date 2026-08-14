import ProductLanding from "../ProductLanding";

export const metadata = {
  title: "SEO crawler mã nguồn mở có MCP | Screaming Toad",
  description:
    "Dùng SEO Screaming Toad để kiểm tra SEO kỹ thuật, JavaScript, canonical, hreflang và structured data bằng bằng chứng cục bộ cùng 23 công cụ MCP cho AI agent.",
  alternates: {
    canonical: "/tools/seo-screaming-toad/vi/",
    languages: {
      th: "/tools/seo-screaming-toad/",
      en: "/tools/seo-screaming-toad/en/",
      vi: "/tools/seo-screaming-toad/vi/",
      "x-default": "/tools/seo-screaming-toad/"
    }
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SEO Screaming Toad — SEO crawler mã nguồn mở + MCP",
    description:
      "Công cụ SEO kỹ thuật ưu tiên dữ liệu cục bộ, có kiểm tra JavaScript, phát hiện kèm bằng chứng, báo cáo và MCP server cho AI agent.",
    url: "/tools/seo-screaming-toad/vi/",
    siteName: "DJAI Academy",
    locale: "vi_VN",
    images: [{ url: "/social/djai-tools.webp", width: 1200, height: 630, alt: "SEO Screaming Toad, SEO crawler mã nguồn mở và MCP server" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Screaming Toad — SEO crawler + MCP",
    description: "Kiểm tra SEO kỹ thuật và JavaScript bằng bằng chứng cục bộ cùng 23 công cụ MCP cho AI agent.",
    images: ["/social/djai-tools.webp"]
  }
};

export default function VietnameseScreamingToadPage() {
  return <ProductLanding locale="vi" />;
}
