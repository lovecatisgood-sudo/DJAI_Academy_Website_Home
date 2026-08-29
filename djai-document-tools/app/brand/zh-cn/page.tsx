import type { Metadata } from "next";
import BrandHub from "../BrandHub";
const canonical = "https://www.djai.academy/tools/brand/zh-cn/";
export const metadata: Metadata = { title: "免费 Favicon 与网站图标工具 | DJAI", description: "在浏览器中生成 Favicon 和网站图标，无需上传图片。", robots: { index: false, follow: true }, alternates: { canonical, languages: { "zh-CN": canonical, "zh-TW": "https://www.djai.academy/tools/brand/zh-tw/", "x-default": "https://www.djai.academy/tools/brand/" } } };
export default function Page() { return <><BrandHub language="zh-CN" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "免费品牌工具", url: canonical, inLanguage: "zh-CN" }) }} /></>; }
