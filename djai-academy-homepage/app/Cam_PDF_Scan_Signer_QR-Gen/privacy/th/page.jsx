import PrivacyPolicyDocument from "../PrivacyPolicyDocument";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PRIVACY_PATH = `${APP_PATH}privacy/`;
const THAI_PATH = `${PRIVACY_PATH}th/`;

export const metadata = {
  title: "นโยบายความเป็นส่วนตัว | Cam PDF Scan Signer QR Gen",
  description:
    "วิธีที่ Cam PDF Scan Signer QR Gen ประมวลผลข้อมูลบัญชี การวิเคราะห์ โฆษณา การซื้อ และข้อมูลอุปกรณ์",
  alternates: {
    canonical: THAI_PATH,
    languages: { en: PRIVACY_PATH, th: THAI_PATH, "x-default": PRIVACY_PATH }
  },
  robots: { index: true, follow: true }
};

export default function CamPdfPrivacyThaiPage() {
  return <PrivacyPolicyDocument locale="th" />;
}
