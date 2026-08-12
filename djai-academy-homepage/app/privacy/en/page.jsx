import PrivacyContent from "../PrivacyContent";

export const metadata = {
  title: "Privacy & Cookie Policy | DJAI Academy",
  description: "How the DJAI Academy website uses information, browser storage, Google Analytics, and Google AdSense cookies.",
  alternates: {
    canonical: "/privacy/en/",
    languages: { th: "/privacy/", en: "/privacy/en/", vi: "/privacy/vi/", "x-default": "/privacy/" }
  }
};

export default function EnglishPrivacyPage() {
  return <PrivacyContent locale="en" />;
}
