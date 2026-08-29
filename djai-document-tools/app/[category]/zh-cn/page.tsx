import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChineseCategoryPage } from "../../chinese-pages";
import { categories, categoryHref, categoryOrder, type Category } from "../../tool-data";
export const dynamicParams = false;
export function generateStaticParams() { return categoryOrder.map((category) => ({ category })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> { const { category } = await params; if (!categoryOrder.includes(category as Category)) return {}; const key = category as Category; const canonical = categoryHref(key, "zh-CN"); return { title: `${categories[key].title["zh-CN"]} | DJTools`, description: categories[key].description["zh-CN"], robots: { index: false, follow: true }, alternates: { canonical, languages: { "zh-CN": canonical, "zh-TW": categoryHref(key, "zh-TW"), "x-default": categoryHref(key, "th") } } }; }
export default async function Page({ params }: { params: Promise<{ category: string }> }) { const { category } = await params; if (!categoryOrder.includes(category as Category)) notFound(); return <ChineseCategoryPage category={category as Category} language="zh-CN" />; }
