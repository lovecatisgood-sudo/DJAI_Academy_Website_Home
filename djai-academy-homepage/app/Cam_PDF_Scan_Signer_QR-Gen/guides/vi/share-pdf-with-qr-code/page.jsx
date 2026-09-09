import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent.vi.pdfQr;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "vi", "pdfQr");

export default function VietnamesePdfQrGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="vi" guideKey="pdfQr" />;
}
