import LocalizedWatermarkGuidePage, { generateLocalizedMetadata } from "../../LocalizedWatermarkGuidePage";
import { localizedWatermarkGuideContent } from "../../localizedWatermarkGuideContent";

const pageContent = {
  ...localizedWatermarkGuideContent["zh-TW"],
  title: "CamScanner 去浮水印：免費方法與下次掃描的無浮水印方案"
};

export const metadata = generateLocalizedMetadata(pageContent, "zh-TW");

export default function TraditionalChineseCamScannerWatermarkGuide() {
  return <LocalizedWatermarkGuidePage content={pageContent} locale="zh-TW" />;
}
