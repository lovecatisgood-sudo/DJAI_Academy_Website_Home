import LocalizedGuideHub, { generateLocalizedHubMetadata } from "../LocalizedGuideHub";
import { localizedGuideHubContent } from "../localizedWatermarkGuideContent";

const pageContent = localizedGuideHubContent["zh-TW"];
export const metadata = generateLocalizedHubMetadata(pageContent, "zh-TW");

export default function TraditionalChineseCamPdfGuideHub() {
  return <LocalizedGuideHub content={pageContent} locale="zh-TW" />;
}
