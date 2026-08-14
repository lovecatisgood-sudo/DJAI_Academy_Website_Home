import type { Metadata } from "next";
import PdfToolsApp from "../../PdfToolsApp";
import type { PdfSeoPage } from "../../seo-alias-data";

const copy: PdfSeoPage = {
  slug: "pdf-to-jpg",
  label: "PDF sang JPG",
  title: "Chuyển PDF sang JPG online miễn phí",
  short: "Xuất từng trang PDF thành ảnh JPG chất lượng cao rồi tải riêng hoặc tải trong tệp ZIP.",
  description: "Chuyển các trang PDF sang JPG miễn phí trong trình duyệt và tải ảnh hoặc ZIP mà không upload tài liệu.",
  guide: { title: "Cách chuyển PDF sang JPG", intro: "Tạo ảnh JPG từ PDF để dùng trong slide, mạng xã hội, bản xem trước hoặc hệ thống không nhận PDF.", steps: ["Chọn tệp PDF", "Chọn JPG và độ phân giải", "Tải ảnh hoặc tệp ZIP"] },
};
const canonical = "/tools/PDFTools/pdf-to-jpg/vi/";

export const metadata: Metadata = {
  title: `${copy.title} | DJTools by DJAI Academy`, description: copy.description,
  keywords: ["PDF sang JPG", "chuyển PDF sang ảnh", "PDF sang JPG miễn phí"],
  alternates: { canonical, languages: { th: "/tools/PDFTools/pdf-to-jpg/", en: "/tools/PDFTools/pdf-to-jpg/en/", vi: canonical, "x-default": "/tools/PDFTools/pdf-to-jpg/" } },
  openGraph: { title: copy.title, description: copy.description, url: canonical, siteName: "DJAI Academy", type: "website" },
};

export default function PdfToJpgVietnamesePage() {
  return <PdfToolsApp language="vi" initialTool="pdf-to-images" seoPage={copy} />;
}
