import type { Metadata } from "next";
import ChineseQrGenerator from "../ChineseQrGenerator";

const publication = { indexable: false };
export const metadata: Metadata = { title: "免費 QR Code 產生器｜DJayTools", description: "不必註冊，在瀏覽器中免費製作並自訂 QR Code，下載無浮水印 PNG 或 SVG。", alternates: { canonical: "/tools/qrgen/zh-tw/", languages: { th: "/tools/qrgen/", en: "/tools/qrgen/en/", vi: "/tools/qrgen/vi/", "zh-CN": "/tools/qrgen/zh-cn/", "zh-TW": "/tools/qrgen/zh-tw/", "x-default": "/tools/qrgen/" } }, robots: { index: publication.indexable, follow: true }, openGraph: { title: "免費 QR Code 產生器｜DJayTools", description: "在瀏覽器中製作無浮水印 QR Code。", url: "/tools/qrgen/zh-tw/" }, twitter: { title: "免費 QR Code 產生器｜DJayTools", description: "在瀏覽器中製作無浮水印 QR Code。" } };
export default function Page() { return <ChineseQrGenerator language="zh-TW" />; }
