import type { Metadata } from "next";
import PdfToolsApp from "../PdfToolsApp";

export const metadata: Metadata = {
  title: "Công cụ PDF miễn phí: ghép, tách, nén và chuyển đổi | DJTools",
  description: "11 công cụ PDF miễn phí: ghép, tách, nén, chuyển ảnh/PDF, xoay, watermark, đánh số trang, xóa metadata và khóa AES-256. Không đăng ký, không watermark.",
  keywords: ["công cụ PDF miễn phí", "ghép PDF", "tách PDF", "nén PDF", "chuyển PDF", "khóa PDF"],
  alternates: { canonical: "/tools/PDFTools/vi/", languages: { th: "/tools/PDFTools/", en: "/tools/PDFTools/en/", vi: "/tools/PDFTools/vi/", "x-default": "/tools/PDFTools/" } },
  openGraph: { title: "DJTools - Bộ công cụ PDF miễn phí", description: "Xử lý PDF riêng tư trong trình duyệt, không cần đăng ký và không watermark.", url: "/tools/PDFTools/vi/", siteName: "DJAI Academy", type: "website" },
};

export default function VietnamesePdfToolsPage() { return <PdfToolsApp language="vi" />; }
