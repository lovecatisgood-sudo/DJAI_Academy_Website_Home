import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent["zh-TW"].pdfQr;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "zh-TW", "pdfQr");

export default function TraditionalChinesePdfQrGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="zh-TW" guideKey="pdfQr" />;
}
