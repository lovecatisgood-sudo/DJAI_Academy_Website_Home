import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChinesePdfToolsApp from "../../ChinesePdfToolsApp";
import { chinesePdfCopy, chinesePdfHref } from "../../chinese-pdf-data";
import { toolSlugs, type ToolSlug } from "../../tool-data";

export const dynamicParams = false;
export function generateStaticParams() { return toolSlugs.map((tool) => ({ tool })); }
export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> { const { tool } = await params; if (!toolSlugs.includes(tool as ToolSlug)) return {}; const slug = tool as ToolSlug; const copy = chinesePdfCopy["zh-CN"][slug]; return { title: `${copy.title}｜DJAI`, description: copy.description, alternates: { canonical: chinesePdfHref(slug, "zh-CN"), languages: { "zh-CN": chinesePdfHref(slug, "zh-CN"), "zh-TW": chinesePdfHref(slug, "zh-TW") } }, robots: { index: false, follow: true } }; }
const publication = { indexable: false };
export default async function Page({ params }: { params: Promise<{ tool: string }> }) { void publication; const { tool } = await params; if (!toolSlugs.includes(tool as ToolSlug)) notFound(); return <ChinesePdfToolsApp locale="zh-CN" initialTool={tool as ToolSlug} />; }
