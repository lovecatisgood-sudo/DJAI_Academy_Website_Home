import CamPdfReleaseArticle, { camPdfArticleMetadata } from "../../../components/CamPdfReleaseArticle";
import { camPdfReleaseArticles } from "../../../lib/camPdfChineseContent";

const article = { ...camPdfReleaseArticles["zh-CN"], indexable: false };
export const metadata = camPdfArticleMetadata(article);
export default function Page() { return <CamPdfReleaseArticle article={article} />; }
