import PrivacyContent from "../PrivacyContent";

export const metadata = {
  title: "Privacy & Cookie Policy | DJAI Academy",
  description: "How DJAI Academy uses information, browser storage and optional Google Analytics, with advertising currently disabled.",
  alternates: {
    canonical: "/privacy/en/",
    languages: { th: "/privacy/", en: "/privacy/en/", vi: "/privacy/vi/", "x-default": "/privacy/" }
  }
};

export default function EnglishPrivacyPage() {
  return <PrivacyContent locale="en" />;
}
