import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../../lib/zhCnContent";

export const metadata = metadataForChinesePage("privacy", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="privacy" content={zhCnMarketingContent} />;
}

