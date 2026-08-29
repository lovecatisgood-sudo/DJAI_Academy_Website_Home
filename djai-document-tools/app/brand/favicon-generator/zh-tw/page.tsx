import type { Metadata } from "next";
import FaviconPage from "../FaviconPage";
const canonical = "https://www.djai.academy/tools/brand/favicon-generator/zh-tw/";
export const metadata: Metadata = { title: "免費 Favicon 產生器：PNG 轉 ICO 與網站圖示 | DJAI", description: "從 PNG、JPG、WebP 或 SVG 產生 favicon.ico、Apple touch icon、manifest 與安裝程式碼，圖片不需上傳。", robots: { index: false, follow: true }, alternates: { canonical, languages: { "zh-CN": "https://www.djai.academy/tools/brand/favicon-generator/zh-cn/", "zh-TW": canonical, "x-default": "https://www.djai.academy/tools/brand/favicon-generator/" } } };
export default function Page() { return <><FaviconPage language="zh-TW" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "DJAI Favicon 產生器", url: canonical, inLanguage: "zh-TW", operatingSystem: "Web browser" }) }} /></>; }
