import type { Metadata } from "next";
import ChineseQrGenerator from "../ChineseQrGenerator";

const publication = { indexable: false };
export const metadata: Metadata = { title: "免费二维码生成器｜DJayTools", description: "无需注册，在浏览器中免费生成并自定义二维码，下载无水印 PNG 或 SVG。", alternates: { canonical: "/tools/qrgen/zh-cn/", languages: { th: "/tools/qrgen/", en: "/tools/qrgen/en/", vi: "/tools/qrgen/vi/", "zh-CN": "/tools/qrgen/zh-cn/", "zh-TW": "/tools/qrgen/zh-tw/", "x-default": "/tools/qrgen/" } }, robots: { index: publication.indexable, follow: true }, openGraph: { title: "免费二维码生成器｜DJayTools", description: "在浏览器中生成无水印二维码。", url: "/tools/qrgen/zh-cn/" }, twitter: { title: "免费二维码生成器｜DJayTools", description: "在浏览器中生成无水印二维码。" } };
export default function Page() { return <ChineseQrGenerator language="zh-CN" />; }
