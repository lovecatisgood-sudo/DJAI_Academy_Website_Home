import CryptoEssay, { cryptoEssayMetadata } from "../../../../../components/blog/CryptoEssay";

export const metadata = cryptoEssayMetadata("zh-CN");

export default function Page() {
  return <CryptoEssay locale="zh-CN" />;
}
