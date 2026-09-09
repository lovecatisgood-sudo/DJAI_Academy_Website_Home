import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent["zh-CN"].multiPage;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "zh-CN", "multiPage");

export default function SimplifiedChineseMultiPageGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="zh-CN" guideKey="multiPage" />;
}
