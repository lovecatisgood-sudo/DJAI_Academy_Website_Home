import LocalizedWatermarkGuidePage, { generateLocalizedMetadata } from "../../LocalizedWatermarkGuidePage";
import { localizedWatermarkGuideContent } from "../../localizedWatermarkGuideContent";

const pageContent = {
  ...localizedWatermarkGuideContent.th,
  title: "วิธีลบลายน้ำ CamScanner ฟรี และหลีกเลี่ยงลายน้ำในการสแกนครั้งต่อไป"
};

export const metadata = generateLocalizedMetadata(pageContent, "th");

export default function ThaiCamScannerWatermarkGuide() {
  return <LocalizedWatermarkGuidePage content={pageContent} locale="th" />;
}
