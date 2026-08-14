import type { Metadata } from "next";
import PdfToolsApp from "../../PdfToolsApp";
import type { PdfSeoPage } from "../../seo-alias-data";

const copy: PdfSeoPage = {
  slug: "jpg-to-pdf",
  label: "JPG sang PDF",
  title: "Chuyển JPG sang PDF online miễn phí",
  short: "Ghép một hoặc nhiều ảnh JPG thành một tệp PDF, có thể sắp xếp trang và chọn khổ giấy.",
  description: "Chuyển JPG sang PDF miễn phí ngay trong trình duyệt. Ghép và sắp xếp nhiều ảnh mà không upload file lên máy chủ.",
  guide: { title: "Cách chuyển JPG sang PDF", intro: "Phù hợp để ghép biên lai, ảnh tài liệu hoặc nhiều trang chụp thành một PDF dễ chia sẻ.", steps: ["Chọn một hoặc nhiều ảnh JPG", "Sắp xếp ảnh và chọn khổ giấy", "Tạo rồi tải tệp PDF"] },
};
const canonical = "/tools/PDFTools/jpg-to-pdf/vi/";

export const metadata: Metadata = {
  title: `${copy.title} | DJTools by DJAI Academy`, description: copy.description,
  keywords: ["JPG sang PDF", "chuyển JPG sang PDF miễn phí", "ghép ảnh thành PDF"],
  alternates: { canonical, languages: { th: "/tools/PDFTools/jpg-to-pdf/", en: "/tools/PDFTools/jpg-to-pdf/en/", vi: canonical, "x-default": "/tools/PDFTools/jpg-to-pdf/" } },
  openGraph: { title: copy.title, description: copy.description, url: canonical, siteName: "DJAI Academy", type: "website" },
};

export default function JpgToPdfVietnamesePage() {
  return <PdfToolsApp language="vi" initialTool="images-to-pdf" seoPage={copy} />;
}
