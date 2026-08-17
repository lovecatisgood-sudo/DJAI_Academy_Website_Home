import type { Metadata } from "next";
import BrandHub from "./BrandHub";

const canonical = "https://www.djai.academy/tools/brand/";
export const metadata: Metadata = {
  title: "เครื่องมือสร้าง Favicon และไอคอนเว็บไซต์ฟรี | DJAI",
  description: "สร้าง favicon และไอคอนเว็บไซต์จากรูปเดียวแบบ private ใน browser พร้อมไฟล์ ICO, PNG, Apple touch icon, maskable icon และโค้ดติดตั้ง",
  alternates: { canonical, languages: { th: canonical, en: `${canonical}en/`, vi: `${canonical}vi/`, "x-default": canonical } },
  openGraph: { title: "เครื่องมือสร้าง Favicon และไอคอนเว็บไซต์ฟรี", description: "สร้างชุดไอคอนเว็บไซต์ครบจากรูปเดียว โดยไฟล์ไม่ออกจากอุปกรณ์", url: canonical, siteName: "DJAI Academy", type: "website" }
};

export default function Page() {
  return <><BrandHub language="th" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "เครื่องมือแบรนด์ฟรี", url: canonical, inLanguage: "th", hasPart: [{ "@type": "SoftwareApplication", name: "Favicon Generator", applicationCategory: "DesignApplication", operatingSystem: "Web", url: `${canonical}favicon-generator/`, offers: { "@type": "Offer", price: "0", priceCurrency: "THB" } }] }) }} /></>;
}
