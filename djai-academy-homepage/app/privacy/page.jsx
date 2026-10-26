import PrivacyContent from "./PrivacyContent";

export const metadata = {
  title: "นโยบายความเป็นส่วนตัวและคุกกี้ | DJAI Academy",
  description: "การใช้ข้อมูล พื้นที่จัดเก็บ และ Google Analytics แบบเลือกได้ของเว็บไซต์ DJAI Academy โดยขณะนี้ปิดการแสดงโฆษณา",
  alternates: {
    canonical: "/privacy/",
    languages: { th: "/privacy/", en: "/privacy/en/", vi: "/privacy/vi/", "x-default": "/privacy/" }
  }
};

export default function ThaiPrivacyPage() {
  return <PrivacyContent locale="th" />;
}
