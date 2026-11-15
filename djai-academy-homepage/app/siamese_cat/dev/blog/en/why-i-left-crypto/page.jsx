import CryptoEssay, { cryptoEssayMetadata } from "../../../../../components/blog/CryptoEssay";

export const metadata = cryptoEssayMetadata("en");

export default function Page() {
  return <CryptoEssay locale="en" />;
}
