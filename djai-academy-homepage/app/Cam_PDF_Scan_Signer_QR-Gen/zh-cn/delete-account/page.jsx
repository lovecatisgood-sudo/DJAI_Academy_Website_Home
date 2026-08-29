import CamPdfChineseLegalPage, { camPdfLegalMetadata } from "../../../components/CamPdfChineseLegalPage";
import { camPdfContent } from "../../../lib/camPdfChineseContent";

const content = { ...camPdfContent["zh-CN"], indexable: false };
export const metadata = camPdfLegalMetadata(content, "delete-account");
export default function Page() { return <CamPdfChineseLegalPage content={content} type="delete-account" />; }
