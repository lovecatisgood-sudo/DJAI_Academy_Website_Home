import LocalizedGuideHub, { generateLocalizedHubMetadata } from "../LocalizedGuideHub";
import { localizedGuideHubContent } from "../localizedWatermarkGuideContent";

const pageContent = localizedGuideHubContent.th;
export const metadata = generateLocalizedHubMetadata(pageContent, "th");

export default function ThaiCamPdfGuideHub() {
  return <LocalizedGuideHub content={pageContent} locale="th" />;
}
