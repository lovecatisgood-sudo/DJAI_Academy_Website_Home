import LocalizedGuideHub, { generateLocalizedHubMetadata } from "../LocalizedGuideHub";
import { localizedGuideHubContent } from "../localizedWatermarkGuideContent";

const pageContent = localizedGuideHubContent["zh-CN"];
export const metadata = generateLocalizedHubMetadata(pageContent, "zh-CN");

export default function SimplifiedChineseCamPdfGuideHub() {
  return <LocalizedGuideHub content={pageContent} locale="zh-CN" />;
}
