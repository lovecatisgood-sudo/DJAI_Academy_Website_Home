import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent.th.pdfQr;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "th", "pdfQr");

export default function ThaiPdfQrGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="th" guideKey="pdfQr" />;
}
