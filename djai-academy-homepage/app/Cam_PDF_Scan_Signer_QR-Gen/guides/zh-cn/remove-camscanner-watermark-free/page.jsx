import LocalizedWatermarkGuidePage, { generateLocalizedMetadata } from "../../LocalizedWatermarkGuidePage";
import { localizedWatermarkGuideContent } from "../../localizedWatermarkGuideContent";

const pageContent = {
  ...localizedWatermarkGuideContent["zh-CN"],
  title: "扫描全能王去水印：免费方法与下次扫描的无水印方案"
};

export const metadata = generateLocalizedMetadata(pageContent, "zh-CN");

export default function SimplifiedChineseCamScannerWatermarkGuide() {
  return <LocalizedWatermarkGuidePage content={pageContent} locale="zh-CN" />;
}
