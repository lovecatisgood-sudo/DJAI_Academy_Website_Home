import PrivacyContent from "../PrivacyContent";

export const metadata = {
  title: "Chính sách quyền riêng tư và cookie | DJAI Academy",
  description: "Cách DJAI Academy sử dụng thông tin, dữ liệu trình duyệt và Google Analytics tùy chọn; quảng cáo hiện bị tắt.",
  alternates: { canonical: "/privacy/vi/", languages: { th: "/privacy/", en: "/privacy/en/", vi: "/privacy/vi/", "x-default": "/privacy/" } }
};

export default function VietnamesePrivacyPage() { return <PrivacyContent locale="vi" />; }
