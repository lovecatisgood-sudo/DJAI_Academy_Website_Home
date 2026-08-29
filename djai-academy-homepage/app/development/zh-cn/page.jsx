import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../../lib/zhCnContent";

export const metadata = metadataForChinesePage("development", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="development" content={zhCnMarketingContent} />;
}

