import ChineseMarketingPage, { metadataForChinesePage } from "../../../components/ChineseMarketingPage";
import { zhTwMarketingContent } from "../../../lib/zhTwContent";

export const metadata = metadataForChinesePage("seoTool", zhTwMarketingContent);

export default function TaiwanChinesePage() {
  return <ChineseMarketingPage route="seoTool" content={zhTwMarketingContent} />;
}

