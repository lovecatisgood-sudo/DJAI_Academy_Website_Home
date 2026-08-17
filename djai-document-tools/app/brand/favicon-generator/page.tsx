import type { Metadata } from "next";
import FaviconPage from "./FaviconPage";

const canonical = "https://www.djai.academy/tools/brand/favicon-generator/";
const faqs = [
  { q: "Favicon ควรมีขนาดเท่าไร", a: "ชุดนี้สร้าง 16, 32 และ 48 px สำหรับ browser พร้อม 180 px สำหรับ Apple และ 192 กับ 512 px สำหรับ web app" },
  { q: "สร้าง favicon.ico จาก PNG ได้ไหม", a: "ได้ เครื่องมือจะรวม PNG ขนาด 16, 32 และ 48 px ไว้ในไฟล์ favicon.ico เดียว" },
  { q: "รูปถูกอัปโหลดไปที่เซิร์ฟเวอร์หรือไม่", a: "ไม่ รูปถูกอ่าน วาด และรวมเป็น ZIP ภายใน browser ของคุณ" }
];
export const metadata: Metadata = {
  title: "Favicon Generator ฟรี สร้าง ICO และไอคอนเว็บจากรูป | DJAI",
  description: "สร้าง favicon.ico จาก PNG, JPG, WebP หรือ SVG ฟรี พร้อม Apple touch icon, maskable icon, web manifest และ HTML snippet โดยไม่อัปโหลดรูป",
  keywords: ["favicon generator", "สร้าง favicon", "สร้าง favicon ico", "png to ico", "favicon.ico generator", "สร้างไอคอนเว็บไซต์", "apple touch icon generator", "maskable icon generator"],
  alternates: { canonical, languages: { th: canonical, en: `${canonical}en/`, vi: `${canonical}vi/`, "x-default": canonical } },
  openGraph: { title: "Favicon Generator ฟรี", description: "สร้างชุด favicon และไอคอนเว็บไซต์ครบจากรูปเดียวใน browser", url: canonical, siteName: "DJAI Academy", type: "website" }
};
export default function Page() {
  const jsonLd = [{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "DJAI Favicon Generator", applicationCategory: "DesignApplication", operatingSystem: "Web", url: canonical, inLanguage: "th", offers: { "@type": "Offer", price: "0", priceCurrency: "THB" }, featureList: ["ICO generation", "PNG favicon sizes", "Apple touch icon", "Maskable icon", "Web manifest", "Local browser processing"] }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }];
  return <><FaviconPage language="th" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
