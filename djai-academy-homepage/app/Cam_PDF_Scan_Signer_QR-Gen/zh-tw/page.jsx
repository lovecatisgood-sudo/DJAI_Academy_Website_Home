import CamPdfChinesePage, { camPdfMetadata } from "../../components/CamPdfChinesePage";
import { camPdfContent } from "../../lib/camPdfChineseContent";

const content = { ...camPdfContent["zh-TW"], indexable: false };
export const metadata = camPdfMetadata(content);
export default function Page() { return <CamPdfChinesePage content={content} />; }
