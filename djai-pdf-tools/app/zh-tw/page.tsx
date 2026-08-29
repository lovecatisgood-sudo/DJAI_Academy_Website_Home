import type { Metadata } from "next";
import ChinesePdfToolsApp from "../ChinesePdfToolsApp";

const publication = { indexable: false };
export const metadata: Metadata = { title: "免費 PDF 工具｜DJAI", description: "在瀏覽器中合併、分割、壓縮、轉檔與保護 PDF，不必上傳檔案。", alternates: { canonical: "/tools/PDFTools/zh-tw/", languages: { "zh-CN": "/tools/PDFTools/zh-cn/", "zh-TW": "/tools/PDFTools/zh-tw/", th: "/tools/PDFTools/", en: "/tools/PDFTools/en/", vi: "/tools/PDFTools/vi/", "x-default": "/tools/PDFTools/" } }, robots: { index: publication.indexable, follow: true } };
export default function Page() { return <ChinesePdfToolsApp locale="zh-TW" />; }
