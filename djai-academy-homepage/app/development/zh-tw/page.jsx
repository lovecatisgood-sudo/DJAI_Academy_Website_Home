import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../../lib/zhTwContent";

export const metadata = metadataForChinesePage("development", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="development" content={zhTwMarketingContent} />;
}

