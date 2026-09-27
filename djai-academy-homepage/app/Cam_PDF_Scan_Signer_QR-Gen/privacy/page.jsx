import PrivacyPolicyDocument from "./PrivacyPolicyDocument";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PRIVACY_PATH = `${APP_PATH}privacy/`;

export const metadata = {
  title: "Privacy Policy | Cam PDF Scanner: Sign & QR",
  description:
    "How Cam PDF Scanner: Sign & QR processes account, analytics, advertising, purchase, and device data.",
  alternates: {
    canonical: PRIVACY_PATH,
    languages: { en: PRIVACY_PATH, "x-default": PRIVACY_PATH }
  },
  robots: { index: true, follow: true }
};

export default function CamPdfPrivacyPage() {
  return <PrivacyPolicyDocument locale="en" />;
}
