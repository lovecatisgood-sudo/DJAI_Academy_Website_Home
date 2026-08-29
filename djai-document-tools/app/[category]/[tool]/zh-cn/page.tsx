import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChineseToolPage } from "../../../chinese-pages";
import { findTool, toolHref, tools } from "../../../tool-data";
export const dynamicParams = false;
export function generateStaticParams() { return tools.map((tool) => ({ category: tool.category, tool: tool.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string; tool: string }> }): Promise<Metadata> { const { category, tool: slug } = await params; const tool = findTool(category, slug); if (!tool) return {}; const canonical = toolHref(tool, "zh-CN"); return { title: `${tool.title["zh-CN"]} | DJTools`, description: tool.description["zh-CN"], keywords: tool.keywords["zh-CN"], robots: { index: false, follow: true }, alternates: { canonical, languages: { "zh-CN": canonical, "zh-TW": toolHref(tool, "zh-TW"), "x-default": toolHref(tool, "th") } } }; }
export default async function Page({ params }: { params: Promise<{ category: string; tool: string }> }) { const { category, tool: slug } = await params; const tool = findTool(category, slug); if (!tool) notFound(); return <ChineseToolPage tool={tool} language="zh-CN" />; }
