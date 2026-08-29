import PrivacyPolicyDocument from "./PrivacyPolicyDocument";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PRIVACY_PATH = `${APP_PATH}privacy/`;
const THAI_PATH = `${PRIVACY_PATH}th/`;

export const metadata = {
  title: "Privacy Policy | Cam PDF Scan Signer QR Gen",
  description:
    "How Cam PDF Scan Signer QR Gen processes account, analytics, advertising, purchase, and device data.",
  alternates: {
    canonical: PRIVACY_PATH,
    languages: { en: PRIVACY_PATH, th: THAI_PATH, "x-default": PRIVACY_PATH }
  },
  robots: { index: true, follow: true }
};

export default function CamPdfPrivacyPage() {
  return <PrivacyPolicyDocument locale="en" />;
}
