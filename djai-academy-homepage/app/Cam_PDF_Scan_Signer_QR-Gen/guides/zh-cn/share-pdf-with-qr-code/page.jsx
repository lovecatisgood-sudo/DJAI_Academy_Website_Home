import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent["zh-CN"].pdfQr;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "zh-CN", "pdfQr");

export default function SimplifiedChinesePdfQrGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="zh-CN" guideKey="pdfQr" />;
}
