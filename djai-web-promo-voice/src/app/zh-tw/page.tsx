import type { Metadata } from "next";
import ChinesePromoPage from "../ChinesePromoPage";
import { chinesePromoCopy } from "../../lib/public-locales";
const copy = chinesePromoCopy["zh-TW"];
export const metadata: Metadata = { title: `${copy.title} | DJAI Academy`, description: copy.description, robots: { index: false, follow: true }, alternates: { canonical: "/web_promo/zh-tw/", languages: { "zh-CN": "/web_promo/zh-cn/", "zh-TW": "/web_promo/zh-tw/", "x-default": "/web_promo/" } }, openGraph: { type: "website", url: "/web_promo/zh-tw/", siteName: "DJAI Academy", title: copy.title, description: copy.description, locale: "zh_TW" } };
export default function Page() { return <ChinesePromoPage locale="zh-TW" />; }
