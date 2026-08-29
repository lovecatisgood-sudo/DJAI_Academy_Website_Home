import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../../lib/zhTwContent";

export const metadata = metadataForChinesePage("privacy", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="privacy" content={zhTwMarketingContent} />;
}

