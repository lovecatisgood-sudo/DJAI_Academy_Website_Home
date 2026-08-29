import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../../lib/zhTwContent";

export const metadata = metadataForChinesePage("contact", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="contact" content={zhTwMarketingContent} />;
}

