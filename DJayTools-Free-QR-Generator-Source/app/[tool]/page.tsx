import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QrGenerator from "../page";
import { qrToolCopy, qrToolHref, qrToolSlugs, type QrToolSlug } from "../qr-tool-data";

export const dynamicParams = false;
export function generateStaticParams() { return qrToolSlugs.map((tool) => ({ tool })); }

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params;
  if (!qrToolSlugs.includes(tool as QrToolSlug)) return {};
  const slug = tool as QrToolSlug;
  const copy = qrToolCopy[slug].th;
  return { title: `${copy.title} | DJayTools`, description: copy.description, keywords: copy.keywords, alternates: { canonical: qrToolHref(slug, "th"), languages: { th: qrToolHref(slug, "th"), en: qrToolHref(slug, "en"), vi: qrToolHref(slug, "vi"), "x-default": qrToolHref(slug, "th") } }, openGraph: { title: copy.title, description: copy.description, url: qrToolHref(slug, "th"), type: "website", siteName: "DJAI Academy" } };
}

export default async function ThaiQrToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  if (!qrToolSlugs.includes(tool as QrToolSlug)) notFound();
  const slug = tool as QrToolSlug;
  return <QrGenerator toolSlug={slug} pageCopy={qrToolCopy[slug].th} />;
}
