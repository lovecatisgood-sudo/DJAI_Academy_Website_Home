import ChineseMarketingPage, { metadataForChinesePage } from "../components/ChineseMarketingPage";
import { zhCnMarketingContent } from "../lib/zhCnContent";

export const metadata = metadataForChinesePage("home", zhCnMarketingContent);

export default function MainlandChinesePage() {
  return <ChineseMarketingPage route="home" content={zhCnMarketingContent} />;
}

