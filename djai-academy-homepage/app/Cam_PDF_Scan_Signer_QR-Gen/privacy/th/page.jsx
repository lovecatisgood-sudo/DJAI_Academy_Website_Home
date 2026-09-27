import PrivacyPolicyDocument from "../PrivacyPolicyDocument";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PRIVACY_PATH = `${APP_PATH}privacy/`;

export const metadata = {
  title: "นโยบายความเป็นส่วนตัว | Cam PDF Scanner: Sign & QR",
  description:
    "วิธีที่ Cam PDF Scanner: Sign & QR ประมวลผลข้อมูลบัญชี การวิเคราะห์ โฆษณา การซื้อ และข้อมูลอุปกรณ์",
  alternates: {
    canonical: PRIVACY_PATH,
    languages: { en: PRIVACY_PATH, "x-default": PRIVACY_PATH }
  },
  robots: { index: false, follow: true }
};

export default function CamPdfPrivacyThaiPage() {
  return <PrivacyPolicyDocument locale="th" />;
}
