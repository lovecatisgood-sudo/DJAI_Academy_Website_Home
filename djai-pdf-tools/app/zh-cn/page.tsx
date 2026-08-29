import type { Metadata } from "next";
import ChinesePdfToolsApp from "../ChinesePdfToolsApp";

const publication = { indexable: false };
export const metadata: Metadata = { title: "免费 PDF 工具｜DJAI", description: "在浏览器中合并、拆分、压缩、转换和保护 PDF，无需上传文件。", alternates: { canonical: "/tools/PDFTools/zh-cn/", languages: { "zh-CN": "/tools/PDFTools/zh-cn/", "zh-TW": "/tools/PDFTools/zh-tw/", th: "/tools/PDFTools/", en: "/tools/PDFTools/en/", vi: "/tools/PDFTools/vi/", "x-default": "/tools/PDFTools/" } }, robots: { index: publication.indexable, follow: true } };
export default function Page() { return <ChinesePdfToolsApp locale="zh-CN" />; }
