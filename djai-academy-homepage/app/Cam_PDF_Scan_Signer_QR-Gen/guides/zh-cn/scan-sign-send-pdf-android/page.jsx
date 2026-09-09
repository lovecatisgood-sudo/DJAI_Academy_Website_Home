import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent["zh-CN"].scanSign;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "zh-CN", "scanSign");

export default function SimplifiedChineseScanSignGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="zh-CN" guideKey="scanSign" />;
}
