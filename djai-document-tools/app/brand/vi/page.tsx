import type { Metadata } from "next";
import BrandHub from "../BrandHub";

const canonical = "https://www.djai.academy/tools/brand/vi/";
export const metadata: Metadata = {
  title: "Công cụ tạo Favicon và biểu tượng website miễn phí | DJAI",
  description: "Tạo favicon và biểu tượng website riêng tư trong trình duyệt. Tải ICO, PNG, Apple touch icon, maskable icon, manifest và mã cài đặt.",
  alternates: { canonical, languages: { th: "https://www.djai.academy/tools/brand/", en: "https://www.djai.academy/tools/brand/en/", vi: canonical, "x-default": "https://www.djai.academy/tools/brand/" } },
  openGraph: { title: "Công cụ tạo Favicon và biểu tượng website miễn phí", description: "Tạo trọn bộ biểu tượng website từ một hình ảnh mà không cần tải ảnh lên.", url: canonical, siteName: "DJAI Academy", type: "website", locale: "vi_VN" }
};

export default function Page() {
  return <><BrandHub language="vi" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "Công cụ thương hiệu miễn phí", url: canonical, inLanguage: "vi", hasPart: [{ "@type": "SoftwareApplication", name: "Trình tạo Favicon", applicationCategory: "DesignApplication", operatingSystem: "Web", url: "https://www.djai.academy/tools/brand/favicon-generator/vi/", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] }) }} /></>;
}
