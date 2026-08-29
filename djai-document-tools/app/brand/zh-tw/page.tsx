import type { Metadata } from "next";
import BrandHub from "../BrandHub";
const canonical = "https://www.djai.academy/tools/brand/zh-tw/";
export const metadata: Metadata = { title: "免費 Favicon 與網站圖示工具 | DJAI", description: "在瀏覽器中產生 Favicon 與網站圖示，不需上傳圖片。", robots: { index: false, follow: true }, alternates: { canonical, languages: { "zh-CN": "https://www.djai.academy/tools/brand/zh-cn/", "zh-TW": canonical, "x-default": "https://www.djai.academy/tools/brand/" } } };
export default function Page() { return <><BrandHub language="zh-TW" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "免費品牌工具", url: canonical, inLanguage: "zh-TW" }) }} /></>; }
