import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../../lib/zhCnContent";

export const metadata = metadataForChinesePage("tools", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="tools" content={zhCnMarketingContent} />;
}

