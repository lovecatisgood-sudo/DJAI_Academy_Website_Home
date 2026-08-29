import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../../lib/zhCnContent";

export const metadata = metadataForChinesePage("community", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="community" content={zhCnMarketingContent} />;
}

