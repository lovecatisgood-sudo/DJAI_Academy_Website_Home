import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import ToolWorkspace from "./ToolWorkspace";
import { categories, categoryHref, categoryOrder, toolHref, toolsFor, type Category, type Language, type ToolDefinition } from "./tool-data";

const isTw = (language: Language) => language === "zh-TW";
const segment = (language: Language) => language === "zh-TW" ? "zh-tw" : "zh-cn";

function Header({ category, tool, language }: { category: Category; tool?: ToolDefinition; language: Language }) {
  const tw = isTw(language);
  const other: Language = tw ? "zh-CN" : "zh-TW";
  return <header className="suite-header">
    <a className="suite-brand" href={categoryHref(category, language)}><Image src="/tools/djai-assets/djai-academy-logo-small.webp" alt="DJAI Academy" width={84} height={45} /><span><strong>DJTools</strong><small>{tw ? "免費瀏覽器工具" : "免费浏览器工具"}</small></span></a>
    <nav aria-label={tw ? "工具分類" : "工具分类"}>
      {categoryOrder.map((item) => <a className={item === category ? "active" : ""} href={categoryHref(item, language)} key={item}>{item === "document" ? (tw ? "文件" : "文档") : item === "ai" ? "AI" : (tw ? "試算表" : "电子表格")}</a>)}
      <a href={`/tools/${segment(language)}/`}>{tw ? "全部工具" : "全部工具"}</a>
      <a className="language-switch" href={tool ? toolHref(tool, other) : categoryHref(category, other)}>{tw ? "简体中文" : "繁體中文"}</a>
    </nav>
  </header>;
}

function Footer({ language }: { language: Language }) {
  const tw = isTw(language);
  return <footer className="suite-footer"><div><strong>DJAI Academy</strong><p>{tw ? "實用、重視隱私的免費工具。" : "实用、注重隐私的免费工具。"}</p></div><div><a href={`/${segment(language)}/`}>{tw ? "首頁" : "首页"}</a><a href={`/tools/${segment(language)}/`}>{tw ? "全部工具" : "全部工具"}</a></div><small>© 2026 DJAI Academy · {tw ? "除非頁面另有說明，檔案只在目前裝置上處理。" : "除非页面另有说明，文件只在当前设备上处理。"}</small></footer>;
}

export function ChineseCategoryPage({ category, language }: { category: Category; language: Language }) {
  const tw = isTw(language);
  const copy = categories[category];
  const selected = toolsFor(category);
  const canonical = `https://www.djai.academy${categoryHref(category, language)}`;
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: copy.title[language], url: canonical, description: copy.description[language], inLanguage: language, hasPart: selected.map((tool) => ({ "@type": "SoftwareApplication", name: tool.title[language], url: `https://www.djai.academy${toolHref(tool, language)}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser" })) };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><Header category={category} language={language} /><section className="suite-hero"><div><p className="eyebrow">DJTOOLS BY DJAI ACADEMY</p><h1>{copy.title[language]}</h1><p>{copy.description[language]}</p><a className="primary-button" href="#available-tools">{tw ? "選擇工具" : "选择工具"}<ArrowRight /></a></div><div className="hero-emblem"><strong>{category.toUpperCase()}</strong><span>PRIVATE · FREE</span></div></section><section className="trust-strip"><span>{tw ? "免費使用" : "免费使用"}</span><span>{tw ? "免註冊" : "无需注册"}</span><span>{tw ? "本機處理" : "本地处理"}</span><span>{tw ? "不加浮水印" : "不加水印"}</span></section><section className="tool-directory" id="available-tools"><div className="section-heading"><p className="eyebrow">{tw ? "立即使用" : "立即使用"}</p><h2>{tw ? "選擇要完成的工作" : "选择要完成的任务"}</h2></div><div className="directory-grid">{selected.map((tool, index) => <a className="directory-item" href={toolHref(tool, language)} key={tool.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{tool.label[language]}</h2><p>{tool.intent[language]}</p></div><ArrowRight /></a>)}</div></section><section className="service-band"><div><p className="eyebrow">DJAI</p><h2>{tw ? "需要為團隊建立專屬工作流程？" : "需要为团队构建专属工作流？"}</h2><p>{tw ? "DJAI 與 Siamese Cat Dev 開發網站、應用程式、自動化與 AI 工作流程。" : "DJAI 与 Siamese Cat Dev 开发网站、应用、自动化和 AI 工作流。"}</p></div><a className="primary-button" href={`/development/${segment(language)}/`}>{tw ? "洽談開發需求" : "咨询开发需求"}<ArrowRight /></a></section><Footer language={language} /></main>;
}

export function ChineseToolPage({ tool, language }: { tool: ToolDefinition; language: Language }) {
  const tw = isTw(language);
  const canonical = `https://www.djai.academy${toolHref(tool, language)}`;
  const related = toolsFor(tool.category).filter((item) => item.slug !== tool.slug).slice(0, 4);
  const steps = tw ? ["選擇支援的檔案，或貼上要處理的文字", "確認與輸出需求相符的設定", "在裝置上處理，然後下載或複製結果"] : ["选择支持的文件，或粘贴要处理的文字", "确认符合输出需求的设置", "在设备上处理，然后下载或复制结果"];
  const faq = tw ? [["檔案會上傳嗎？", "不會。此工具在目前裝置的瀏覽器記憶體中處理檔案。"], ["工具需要付費或註冊嗎？", "不需要。工具可免費使用，不必建立帳號，也不會在輸出檔案加上浮水印。"], ["為什麼轉檔後的排版可能不同？", "各格式保存版面資訊的方式不同；重要文件請先檢查輸出結果。"]] : [["文件会上传吗？", "不会。此工具在当前设备的浏览器内存中处理文件。"], ["工具需要付费或注册吗？", "不需要。工具可免费使用，无需创建账号，也不会在输出文件中添加水印。"], ["为什么转换后的排版可能不同？", "不同格式保存版面信息的方式不同；重要文档请先检查输出结果。"]];
  const schemas = [{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.title[language], url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", description: tool.description[language], inLanguage: language }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }];
  return <main>{schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}<Header category={tool.category} tool={tool} language={language} /><section className="tool-intro"><a href={categoryHref(tool.category, language)}><ArrowLeft />{tw ? "返回工具分類" : "返回工具分类"}</a><p className="eyebrow">{tool.label[language]}</p><h1>{tool.title[language]}</h1><p>{tool.description[language]}</p><div><span><ShieldCheck />{tw ? "瀏覽器本機處理" : "浏览器本地处理"}</span><span>{tw ? "免註冊" : "无需注册"}</span><span>{tw ? "免費使用" : "免费使用"}</span></div></section><ToolWorkspace tool={tool} language={language} /><section className="how-to"><div><p className="eyebrow">HOW TO</p><h2>{tw ? `如何使用${tool.label[language]}` : `${tool.label[language]}使用方法`}</h2><p>{tool.intent[language]}</p></div><ol>{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section><section className="related-tools" data-tool-discovery><div className="section-heading"><p className="eyebrow">{tw ? "繼續處理" : "继续处理"}</p><h2>{tw ? "相關免費工具" : "相关免费工具"}</h2></div><div>{related.map((item) => <a href={toolHref(item, language)} key={item.slug}><strong>{item.label[language]}</strong><span>{item.intent[language]}</span><ArrowRight /></a>)}</div></section><section className="faq-section"><div><p className="eyebrow">FAQ</p><h2>{tw ? "常見問題" : "常见问题"}</h2></div><div>{faq.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section><Footer language={language} /></main>;
}
