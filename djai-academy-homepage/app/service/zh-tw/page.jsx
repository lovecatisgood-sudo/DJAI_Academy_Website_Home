import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../../lib/zhTwContent";

export const metadata = metadataForChinesePage("service", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="service" content={zhTwMarketingContent} />;
}

