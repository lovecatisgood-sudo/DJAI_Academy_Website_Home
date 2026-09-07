import LocalizedWatermarkGuidePage, { generateLocalizedMetadata } from "../../LocalizedWatermarkGuidePage";
import { localizedWatermarkGuideContent } from "../../localizedWatermarkGuideContent";

const pageContent = {
  ...localizedWatermarkGuideContent.vi,
  title: "Cách xóa watermark CamScanner miễn phí và tránh watermark cho lần scan sau"
};

export const metadata = generateLocalizedMetadata(pageContent, "vi");

export default function VietnameseCamScannerWatermarkGuide() {
  return <LocalizedWatermarkGuidePage content={pageContent} locale="vi" />;
}
