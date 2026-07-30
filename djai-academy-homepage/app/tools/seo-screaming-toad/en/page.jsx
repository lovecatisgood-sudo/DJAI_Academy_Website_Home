import ProductLanding from "../ProductLanding";

export const metadata = {
  title: "Open-Source SEO Crawler with MCP | Screaming Toad",
  description:
    "Use SEO Screaming Toad for technical and JavaScript SEO audits, local evidence, crawl comparisons, reports, and 23 bounded MCP tools for AI agents.",
  alternates: {
    canonical: "/tools/seo-screaming-toad/en/",
    languages: {
      th: "/tools/seo-screaming-toad/",
      en: "/tools/seo-screaming-toad/en/",
      "x-default": "/tools/seo-screaming-toad/"
    }
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SEO Screaming Toad — Open-Source SEO Crawler + MCP",
    description:
      "A local-first technical SEO crawler with JavaScript audits, evidence-backed findings, reports, and an MCP server for AI agents.",
    url: "/tools/seo-screaming-toad/en/",
    siteName: "DJAI Academy",
    locale: "en_US",
    images: [{ url: "/social/djai-tools.webp", width: 1200, height: 630, alt: "SEO Screaming Toad open-source SEO crawler and MCP server" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Screaming Toad — Open SEO Crawler + MCP",
    description: "Technical SEO and JavaScript audits with local evidence and 23 MCP tools for AI agents.",
    images: ["/social/djai-tools.webp"]
  }
};

export default function EnglishScreamingToadPage() {
  return <ProductLanding locale="en" />;
}
