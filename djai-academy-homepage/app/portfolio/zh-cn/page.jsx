import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../../lib/zhCnContent";

export const metadata = metadataForChinesePage("portfolio", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="portfolio" content={zhCnMarketingContent} />;
}

