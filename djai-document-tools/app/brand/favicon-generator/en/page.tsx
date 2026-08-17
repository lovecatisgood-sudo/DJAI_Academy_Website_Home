import type { Metadata } from "next";
import FaviconPage from "../FaviconPage";

const canonical = "https://www.djai.academy/tools/brand/favicon-generator/en/";
const faqs = [
  { q: "What size should a favicon be", a: "This package creates 16, 32, and 48 px browser icons, a 180 px Apple icon, and 192 and 512 px web app icons." },
  { q: "Can I make favicon.ico from a PNG", a: "Yes. The generator bundles 16, 32, and 48 px PNG images inside one favicon.ico file." },
  { q: "Is my image uploaded to a server", a: "No. Your image is read, rendered, and packaged as a ZIP inside your browser." }
];
export const metadata: Metadata = {
  title: "Free Favicon Generator: PNG to ICO and Website Icons | DJAI",
  description: "Generate favicon.ico from PNG, JPG, WebP, or SVG. Get Apple touch, maskable, web manifest, and HTML files free without uploading your image.",
  keywords: ["favicon generator", "free favicon generator", "png to ico", "favicon.ico generator", "website icon generator", "apple touch icon generator", "maskable icon generator", "favicon package generator"],
  alternates: { canonical, languages: { th: "https://www.djai.academy/tools/brand/favicon-generator/", en: canonical, vi: "https://www.djai.academy/tools/brand/favicon-generator/vi/", "x-default": "https://www.djai.academy/tools/brand/favicon-generator/" } },
  openGraph: { title: "Free Favicon Generator", description: "Generate a complete favicon and website icon package from one image in your browser.", url: canonical, siteName: "DJAI Academy", type: "website" }
};
export default function Page() {
  const jsonLd = [{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "DJAI Favicon Generator", applicationCategory: "DesignApplication", operatingSystem: "Web", url: canonical, inLanguage: "en", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["ICO generation", "PNG favicon sizes", "Apple touch icon", "Maskable icon", "Web manifest", "Local browser processing"] }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }];
  return <><FaviconPage language="en" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
