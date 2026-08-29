import type { Metadata } from "next";
import ChinesePromoPage from "../ChinesePromoPage";
import { chinesePromoCopy } from "../../lib/public-locales";
const copy = chinesePromoCopy["zh-CN"];
export const metadata: Metadata = { title: `${copy.title} | DJAI Academy`, description: copy.description, robots: { index: false, follow: true }, alternates: { canonical: "/web_promo/zh-cn/" }, openGraph: { type: "website", url: "/web_promo/zh-cn/", siteName: "DJAI Academy", title: copy.title, description: copy.description, locale: "zh_CN" } };
export default function Page() { return <ChinesePromoPage locale="zh-CN" />; }
