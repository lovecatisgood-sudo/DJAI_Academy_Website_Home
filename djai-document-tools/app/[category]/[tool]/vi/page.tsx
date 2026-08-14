import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPage from "../../../tool-page";
import { findTool, toolHref, tools } from "../../../tool-data";

export const dynamicParams = false;
export function generateStaticParams() { return tools.map((tool) => ({ category: tool.category, tool: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string; tool: string }> }): Promise<Metadata> {
  const { category, tool: slug } = await params;
  const tool = findTool(category, slug);
  if (!tool) return {};
  return { title: `${tool.title.vi} | DJTools`, description: tool.description.vi, keywords: tool.keywords.vi, alternates: { canonical: toolHref(tool, "vi"), languages: { th: toolHref(tool, "th"), en: toolHref(tool, "en"), vi: toolHref(tool, "vi"), "x-default": toolHref(tool, "th") } }, openGraph: { title: tool.title.vi, description: tool.description.vi, url: toolHref(tool, "vi"), siteName: "DJAI Academy", type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ category: string; tool: string }> }) {
  const { category, tool: slug } = await params;
  const tool = findTool(category, slug);
  if (!tool) notFound();
  return <ToolPage tool={tool} language="vi" />;
}
