import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { ServiceBands, SuiteFooter, SuiteHeader } from "./category-page";
import ToolWorkspace from "./ToolWorkspace";
import { categoryHref, toolHref, toolsFor, type Language, type ToolDefinition } from "./tool-data";

export default function ToolPage({ tool, language }: { tool: ToolDefinition; language: Language }) {
  const en = language === "en";
  const canonical = `https://www.djai.academy${toolHref(tool, language)}`;
  const steps = en ? ["Choose a supported file or paste text", "Review the relevant settings", "Process locally and download or copy the result"] : ["เลือกไฟล์ที่รองรับหรือวางข้อความ", "ตรวจตัวเลือกที่เกี่ยวข้อง", "ประมวลผลในเครื่องแล้วดาวน์โหลดหรือคัดลอกผลลัพธ์"];
  const faq = en ? [
    ["Are my files uploaded?", "No. This tool processes files in browser memory on your device."],
    ["Is the tool free?", "Yes. Core processing is free, requires no account, and adds no watermark."],
    ["Why can formatting change?", "Document formats store layout differently. Browser conversion prioritizes privacy and practical output over exact reconstruction."]
  ] : [
    ["ไฟล์ถูก upload หรือไม่?", "ไม่ เครื่องมือนี้ประมวลผลไฟล์ใน memory ของ browser บนอุปกรณ์ของคุณ"],
    ["ใช้งานฟรีหรือไม่?", "ใช้งานฟรี ไม่ต้องสมัคร และไม่มี watermark"],
    ["ทำไม formatting อาจเปลี่ยน?", "แต่ละ format เก็บ layout ต่างกัน การแปลงใน browser เน้น privacy และผลลัพธ์ที่ใช้งานได้มากกว่าการจำลองต้นฉบับแบบสมบูรณ์"]
  ];
  const related = toolsFor(tool.category).filter((candidate) => candidate.slug !== tool.slug).slice(0, 4);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.title[language], description: tool.description[language], url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" } },
    { "@context": "https://schema.org", "@type": "HowTo", name: tool.title[language], totalTime: "PT3M", step: steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, name: text, text })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "DJAI Academy", item: en ? "https://www.djai.academy/en/" : "https://www.djai.academy/" }, { "@type": "ListItem", position: 2, name: en ? "All Tools" : "เครื่องมือทั้งหมด", item: en ? "https://www.djai.academy/tools/en/" : "https://www.djai.academy/tools/" }, { "@type": "ListItem", position: 3, name: tool.category, item: `https://www.djai.academy${categoryHref(tool.category, language)}` }, { "@type": "ListItem", position: 4, name: tool.title[language], item: canonical }] }
  ];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <SuiteHeader category={tool.category} language={language} tool={tool} />
    <section className="tool-intro"><a href={categoryHref(tool.category, language)}><ArrowLeft />{en ? `Back to ${tool.category} tools` : "กลับไปหน้าเครื่องมือ"}</a><p className="eyebrow">{tool.label[language]}</p><h1>{tool.title[language]}</h1><p>{tool.description[language]}</p><div><span><ShieldCheck />{en ? "Private browser processing" : "ประมวลผลแบบ private ใน browser"}</span><span>{en ? "No account" : "ไม่ต้องสมัคร"}</span><span>{en ? "Free" : "ใช้ฟรี"}</span></div></section>
    <ToolWorkspace tool={tool} language={language} />
    <section className="how-to"><div><p className="eyebrow">HOW TO</p><h2>{en ? `How to use ${tool.label.en}` : `วิธีใช้ ${tool.label.th}`}</h2><p>{tool.intent[language]}</p></div><ol>{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>
    <section className="related-tools"><div className="section-heading"><p className="eyebrow">{en ? "CONTINUE WITH" : "ทำงานต่อ"}</p><h2>{en ? "Related free tools" : "เครื่องมือฟรีที่เกี่ยวข้อง"}</h2></div><div>{related.map((item) => <a href={toolHref(item, language)} key={item.slug}><strong>{item.label[language]}</strong><span>{item.intent[language]}</span><ArrowRight /></a>)}</div></section>
    <section className="faq-section"><div><p className="eyebrow">FAQ</p><h2>{en ? "Common questions" : "คำถามที่พบบ่อย"}</h2></div><div>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <ServiceBands language={language} category={tool.category} /><SuiteFooter language={language} />
  </main>;
}
