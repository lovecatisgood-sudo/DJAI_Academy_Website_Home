import CryptoEssay, { cryptoEssayMetadata } from "../../../../../components/blog/CryptoEssay";

export const metadata = cryptoEssayMetadata("zh-TW");

export default function Page() {
  return <CryptoEssay locale="zh-TW" />;
}
