import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../../lib/zhCnContent";

export const metadata = metadataForChinesePage("service", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="service" content={zhCnMarketingContent} />;
}

