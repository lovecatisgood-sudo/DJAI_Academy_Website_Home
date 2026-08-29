import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../../lib/zhTwContent";

export const metadata = metadataForChinesePage("tools", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="tools" content={zhTwMarketingContent} />;
}

