import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChineseQrGenerator from "../../ChineseQrGenerator";
import { qrToolCopy, qrToolHref, qrToolSlugs, type QrToolSlug } from "../../qr-tool-data";

export const dynamicParams = false;
export function generateStaticParams() { return qrToolSlugs.map((tool) => ({ tool })); }
export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> { const { tool } = await params; if (!qrToolSlugs.includes(tool as QrToolSlug)) return {}; const slug = tool as QrToolSlug; const copy = qrToolCopy[slug]["zh-TW"]; const url = qrToolHref(slug, "zh-TW"); return { title: `${copy.title}｜DJayTools`, description: copy.description, keywords: copy.keywords, alternates: { canonical: url, languages: { th: qrToolHref(slug, "th"), en: qrToolHref(slug, "en"), vi: qrToolHref(slug, "vi"), "zh-CN": qrToolHref(slug, "zh-CN"), "zh-TW": url, "x-default": qrToolHref(slug, "th") } }, robots: { index: false, follow: true }, openGraph: { title: copy.title, description: copy.description, url }, twitter: { title: copy.title, description: copy.description } }; }
const publication = { indexable: false };
export default async function Page({ params }: { params: Promise<{ tool: string }> }) { void publication; const { tool } = await params; if (!qrToolSlugs.includes(tool as QrToolSlug)) notFound(); const slug = tool as QrToolSlug; return <ChineseQrGenerator language="zh-TW" toolSlug={slug} pageCopy={qrToolCopy[slug]["zh-TW"]} />; }
