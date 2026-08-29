import ChineseMarketingPage, { metadataForChinesePage } from "../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../lib/zhTwContent";

export const metadata = metadataForChinesePage("home", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="home" content={zhTwMarketingContent} />;
}

