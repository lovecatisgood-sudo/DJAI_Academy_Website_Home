import PrivacyContent from "./PrivacyContent";

export const metadata = {
  title: "นโยบายความเป็นส่วนตัวและคุกกี้ | DJAI Academy",
  description: "นโยบายความเป็นส่วนตัว คุกกี้ Google Analytics และ Google AdSense ของเว็บไซต์ DJAI Academy",
  alternates: {
    canonical: "/privacy/",
    languages: { th: "/privacy/", en: "/privacy/en/", vi: "/privacy/vi/", "x-default": "/privacy/" }
  }
};

export default function ThaiPrivacyPage() {
  return <PrivacyContent locale="th" />;
}
