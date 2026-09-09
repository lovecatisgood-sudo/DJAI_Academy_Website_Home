import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent["zh-TW"].multiPage;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "zh-TW", "multiPage");

export default function TraditionalChineseMultiPageGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="zh-TW" guideKey="multiPage" />;
}
