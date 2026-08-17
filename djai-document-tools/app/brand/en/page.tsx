import type { Metadata } from "next";
import BrandHub from "../BrandHub";

const canonical = "https://www.djai.academy/tools/brand/en/";
export const metadata: Metadata = {
  title: "Free Favicon and Website Icon Tools | DJAI",
  description: "Create favicons and website icons privately in your browser. Download ICO, PNG, Apple touch, maskable icon, manifest, and installation code files.",
  alternates: { canonical, languages: { th: "https://www.djai.academy/tools/brand/", en: canonical, vi: "https://www.djai.academy/tools/brand/vi/", "x-default": "https://www.djai.academy/tools/brand/" } },
  openGraph: { title: "Free Favicon and Website Icon Tools", description: "Create a complete website icon package from one image without uploading it.", url: canonical, siteName: "DJAI Academy", type: "website" }
};

export default function Page() {
  return <><BrandHub language="en" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "Free brand tools", url: canonical, inLanguage: "en", hasPart: [{ "@type": "SoftwareApplication", name: "Favicon Generator", applicationCategory: "DesignApplication", operatingSystem: "Web", url: "https://www.djai.academy/tools/brand/favicon-generator/en/", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] }) }} /></>;
}
