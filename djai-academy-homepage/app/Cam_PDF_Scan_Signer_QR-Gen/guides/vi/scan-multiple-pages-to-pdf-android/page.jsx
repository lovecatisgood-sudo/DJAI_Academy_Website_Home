import LocalizedWorkflowGuideArticle, { generateLocalizedWorkflowMetadata } from "../../LocalizedWorkflowGuideArticle";
import { localizedWorkflowGuideContent } from "../../localizedWorkflowGuideContent";

const pageContent = localizedWorkflowGuideContent.vi.multiPage;
export const metadata = generateLocalizedWorkflowMetadata(pageContent, "vi", "multiPage");

export default function VietnameseMultiPageGuide() {
  return <LocalizedWorkflowGuideArticle content={pageContent} locale="vi" guideKey="multiPage" />;
}
