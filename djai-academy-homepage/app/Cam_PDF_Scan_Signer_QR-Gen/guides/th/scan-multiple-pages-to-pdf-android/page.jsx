import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent.th.multiPage;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "th", "multiPage");

export default function ThaiMultiPageGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="th" guideKey="multiPage" />;
}
