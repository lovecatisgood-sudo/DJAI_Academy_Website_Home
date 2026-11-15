import CryptoEssay, { cryptoEssayMetadata } from "../../../../components/blog/CryptoEssay";

export const metadata = cryptoEssayMetadata("th");

export default function Page() {
  return <CryptoEssay locale="th" />;
}
