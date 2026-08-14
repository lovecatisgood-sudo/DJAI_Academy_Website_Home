import type { Metadata } from "next";

const BASE_PATH = "/tools/qrgen";

export const metadata: Metadata = {
  title: "Tạo mã QR miễn phí | DJayTools by DJAI Academy",
  description: "Tạo mã QR tùy chỉnh miễn phí ngay trong trình duyệt. Tải PNG hoặc SVG, không cần tài khoản, không watermark và không hết hạn.",
  alternates: {
    canonical: `${BASE_PATH}/vi/`,
    languages: {
      th: `${BASE_PATH}/`,
      en: `${BASE_PATH}/en/`,
      vi: `${BASE_PATH}/vi/`,
      "x-default": `${BASE_PATH}/`,
    },
  },
  openGraph: {
    title: "Tạo mã QR miễn phí | DJayTools by DJAI Academy",
    description: "Tạo mã QR cho website, Wi-Fi, liên hệ, email và văn bản. Tải PNG hoặc SVG miễn phí.",
    url: `${BASE_PATH}/vi/`,
    siteName: "DJAI Academy",
    images: [`${BASE_PATH}/djai-academy-logo.webp`],
    type: "website",
  },
};

export default function VietnameseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
