import ChineseMarketingPage, { metadataForChinesePage } from "../../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../../lib/zhCnContent";

export const metadata = metadataForChinesePage("contact", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="contact" content={zhCnMarketingContent} />;
}

