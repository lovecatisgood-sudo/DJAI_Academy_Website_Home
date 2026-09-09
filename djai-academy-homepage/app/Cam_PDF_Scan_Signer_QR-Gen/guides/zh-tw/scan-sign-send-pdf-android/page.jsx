import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent["zh-TW"].scanSign;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "zh-TW", "scanSign");

export default function TraditionalChineseScanSignGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="zh-TW" guideKey="scanSign" />;
}
