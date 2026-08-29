import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../../lib/zhTwContent";

export const metadata = metadataForChinesePage("community", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="community" content={zhTwMarketingContent} />;
}

