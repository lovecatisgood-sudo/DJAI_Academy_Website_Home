import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent.vi.scanSign;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "vi", "scanSign");

export default function VietnameseScanSignGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="vi" guideKey="scanSign" />;
}
