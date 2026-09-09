import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent.th.scanSign;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "th", "scanSign");

export default function ThaiScanSignGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="th" guideKey="scanSign" />;
}
