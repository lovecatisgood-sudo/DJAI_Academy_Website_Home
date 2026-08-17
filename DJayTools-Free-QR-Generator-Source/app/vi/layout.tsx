import type { Metadata } from "next";

const BASE_PATH = "/tools/qrgen";

export const metadata: Metadata = {
  title: "Tạo mã QR miễn phí, không cần đăng ký | DJayTools",
  description: "Tạo mã QR cho URL, Wi-Fi, danh bạ, văn bản, email và WhatsApp. Tải PNG hoặc SVG miễn phí, không cần đăng ký và không watermark.",
  alternates: { canonical: `${BASE_PATH}/vi/`, languages: { th: `${BASE_PATH}/`, en: `${BASE_PATH}/en/`, vi: `${BASE_PATH}/vi/`, "x-default": `${BASE_PATH}/` } },
  openGraph: { title: "Tạo mã QR miễn phí | DJayTools", description: "Tạo và tải mã QR PNG hoặc SVG miễn phí, không cần đăng ký.", url: `${BASE_PATH}/vi/`, siteName: "DJAI Academy", type: "website" },
  twitter: { card: "summary_large_image", title: "Tạo mã QR miễn phí | DJayTools", description: "Tạo QR cho URL, Wi-Fi, liên hệ và văn bản; tải PNG hoặc SVG không cần đăng ký.", images: [`${BASE_PATH}/djai-academy-logo.webp`] },
};

export default function VietnameseLayout({ children }: { children: React.ReactNode }) { return children; }
