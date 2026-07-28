import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "../../category-page";
import { categories, categoryHref, categoryOrder, type Category } from "../../tool-data";

export const dynamicParams = false;
export function generateStaticParams() { return categoryOrder.map((category) => ({ category })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  if (!categoryOrder.includes(category as Category)) return {};
  const key = category as Category;
  const title = `${categories[key].title.en} | DJTools`;
  const description = categories[key].description.en;
  const canonical = categoryHref(key, "en");
  return { title, description, alternates: { canonical, languages: { th: categoryHref(key, "th"), en: canonical, "x-default": categoryHref(key, "th") } }, openGraph: { title, description, url: canonical, siteName: "DJAI Academy", images: ["/social/djai-tools.webp"], type: "website" }, twitter: { card: "summary_large_image", title, description, images: ["/social/djai-tools.webp"] } };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categoryOrder.includes(category as Category)) notFound();
  return <CategoryPage category={category as Category} language="en" />;
}
