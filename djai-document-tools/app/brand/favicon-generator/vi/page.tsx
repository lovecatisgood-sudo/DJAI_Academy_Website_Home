import type { Metadata } from "next";
import FaviconPage from "../FaviconPage";

const canonical = "https://www.djai.academy/tools/brand/favicon-generator/vi/";
const faqs = [
  { q: "Favicon nên có kích thước bao nhiêu", a: "Bộ tệp này tạo biểu tượng 16, 32 và 48 px cho trình duyệt, 180 px cho Apple, cùng 192 và 512 px cho ứng dụng web." },
  { q: "Có thể tạo favicon.ico từ PNG không", a: "Có. Công cụ sẽ đóng gói ảnh PNG 16, 32 và 48 px vào một tệp favicon.ico." },
  { q: "Hình ảnh có được tải lên máy chủ không", a: "Không. Hình ảnh được đọc, kết xuất và đóng gói thành ZIP ngay trong trình duyệt của bạn." }
];
export const metadata: Metadata = {
  title: "Trình tạo Favicon miễn phí: PNG sang ICO và biểu tượng web | DJAI",
  description: "Tạo favicon.ico từ PNG, JPG, WebP hoặc SVG. Nhận Apple touch icon, maskable icon, web manifest và mã HTML mà không cần tải ảnh lên.",
  keywords: ["tạo favicon", "trình tạo favicon miễn phí", "png sang ico", "tạo favicon.ico", "tạo biểu tượng website", "tạo apple touch icon", "tạo maskable icon"],
  alternates: { canonical, languages: { th: "https://www.djai.academy/tools/brand/favicon-generator/", en: "https://www.djai.academy/tools/brand/favicon-generator/en/", vi: canonical, "x-default": "https://www.djai.academy/tools/brand/favicon-generator/" } },
  openGraph: { title: "Trình tạo Favicon miễn phí", description: "Tạo trọn bộ favicon và biểu tượng website từ một hình ảnh ngay trong trình duyệt.", url: canonical, siteName: "DJAI Academy", type: "website", locale: "vi_VN" }
};
export default function Page() {
  const jsonLd = [{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Trình tạo Favicon DJAI", applicationCategory: "DesignApplication", operatingSystem: "Web", url: canonical, inLanguage: "vi", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["Tạo ICO", "Favicon PNG nhiều kích thước", "Apple touch icon", "Maskable icon", "Web manifest", "Xử lý cục bộ trong trình duyệt"] }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }];
  return <><FaviconPage language="vi" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
