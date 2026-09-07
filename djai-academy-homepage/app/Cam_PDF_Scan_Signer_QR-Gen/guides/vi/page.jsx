import LocalizedGuideHub, { generateLocalizedHubMetadata } from "../LocalizedGuideHub";
import { localizedGuideHubContent } from "../localizedWatermarkGuideContent";

const pageContent = localizedGuideHubContent.vi;
export const metadata = generateLocalizedHubMetadata(pageContent, "vi");

export default function VietnameseCamPdfGuideHub() {
  return <LocalizedGuideHub content={pageContent} locale="vi" />;
}
