import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../../lib/zhTwContent";

export const metadata = metadataForChinesePage("portfolio", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="portfolio" content={zhTwMarketingContent} />;
}

