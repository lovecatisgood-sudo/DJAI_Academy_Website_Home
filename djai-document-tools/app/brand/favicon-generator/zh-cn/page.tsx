import type { Metadata } from "next";
import FaviconPage from "../FaviconPage";
const canonical = "https://www.djai.academy/tools/brand/favicon-generator/zh-cn/";
export const metadata: Metadata = { title: "免费 Favicon 生成器：PNG 转 ICO 与网站图标 | DJAI", description: "从 PNG、JPG、WebP 或 SVG 生成 favicon.ico、Apple touch icon、manifest 和安装代码，图片无需上传。", robots: { index: false, follow: true }, alternates: { canonical, languages: { "zh-CN": canonical, "zh-TW": "https://www.djai.academy/tools/brand/favicon-generator/zh-tw/", "x-default": "https://www.djai.academy/tools/brand/favicon-generator/" } } };
export default function Page() { return <><FaviconPage language="zh-CN" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "DJAI Favicon 生成器", url: canonical, inLanguage: "zh-CN", operatingSystem: "Web browser" }) }} /></>; }
