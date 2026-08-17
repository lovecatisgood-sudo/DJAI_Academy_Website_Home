import PrivacyContent from "../PrivacyContent";

export const metadata = {
  title: "Chính sách quyền riêng tư và cookie | DJAI Academy",
  description: "Cách website DJAI Academy sử dụng thông tin, dữ liệu trình duyệt, Google Analytics và cookie Google AdSense.",
  alternates: { canonical: "/privacy/vi/", languages: { th: "/privacy/", en: "/privacy/en/", vi: "/privacy/vi/", "x-default": "/privacy/" } }
};

export default function VietnamesePrivacyPage() { return <PrivacyContent locale="vi" />; }
