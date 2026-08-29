import ChineseMarketingPage, { metadataForChinesePage } from "../../../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../../../lib/zhCnContent";

export const metadata = metadataForChinesePage("seoTool", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="seoTool" content={zhCnMarketingContent} />;
}

