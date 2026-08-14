import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import AdSenseAd from "./AdSenseAd";
import ShareButtons from "./ShareButtons";
import { CamPdfAppCallout, ServiceBands, SuiteFooter, SuiteHeader, ToolEcosystemDirectory } from "./category-page";
import ToolWorkspace from "./ToolWorkspace";
import { categoryHref, toolHref, toolsFor, type Language, type ToolDefinition } from "./tool-data";

export default function ToolPage({ tool, language }: { tool: ToolDefinition; language: Language }) {
  const en = language === "en";
  const vi = language === "vi";
  const specializedGuidance = vi ? null : ({
    "docx-to-markdown": en
      ? {
          eyebrow: "STRUCTURED OUTPUT",
          title: "Choose Markdown when document structure still matters",
          copy:
            "Markdown keeps useful authoring structure such as headings, ordered and unordered lists, links, emphasis, and compatible tables as readable plain-text syntax. It is the stronger output for Git repositories, README files, developer specifications, static-site content, Cursor or Codex context, and AI documentation workflows.",
          limit:
            "Word-only presentation details such as exact pagination, floating objects, text boxes, custom fonts, and complex visual layout are not Markdown concepts. Review tables and image references after conversion before committing the file to a documentation project."
        }
      : {
          eyebrow: "ผลลัพธ์แบบมีโครงสร้าง",
          title: "เลือก Markdown เมื่อต้องรักษาโครงสร้างเอกสาร",
          copy:
            "Markdown เก็บ heading, list, link, emphasis และ table ที่รองรับไว้เป็น syntax ข้อความที่อ่านได้ เหมาะกับ README, Git repository, specification สำหรับนักพัฒนา, static site, context สำหรับ Cursor หรือ Codex และเอกสาร AI",
          limit:
            "รูปแบบเฉพาะของ Word เช่น pagination, floating object, text box, font และ layout ซับซ้อนไม่ใช่ส่วนหนึ่งของ Markdown ควรตรวจ table และ image reference ก่อนนำไฟล์ไปใช้จริง"
        },
    "docx-to-text": en
      ? {
          eyebrow: "PLAIN-TEXT OUTPUT",
          title: "Choose TXT when formatting should be removed",
          copy:
            "Plain text intentionally strips headings, emphasis, link destinations, table structure, page styling, and other Word formatting. It is useful when you need clean words for search, copy and paste, word counting, transcription cleanup, lightweight archives, NLP preprocessing, or systems that only accept TXT.",
          limit:
            "Because formatting is discarded, a DOCX table can become a simple reading-order sequence and visual relationships may be lost. Use the Markdown converter instead when headings, lists, links, or table structure carry meaning."
        }
      : {
          eyebrow: "ผลลัพธ์ข้อความล้วน",
          title: "เลือก TXT เมื่อต้องการลบ formatting",
          copy:
            "ข้อความล้วนจะตัด heading, emphasis, ปลายทาง link, โครงสร้าง table, page style และ formatting ของ Word ออก เหมาะกับการค้นหา copy-paste นับคำ จัดเก็บแบบเบา เตรียมข้อมูล NLP หรือระบบที่รับเฉพาะ TXT",
          limit:
            "เมื่อ formatting ถูกตัด table อาจกลายเป็นข้อความตามลำดับการอ่านและความสัมพันธ์ทางภาพอาจหายไป หาก heading, list, link หรือ table มีความหมาย ควรใช้เครื่องมือ DOCX เป็น Markdown แทน"
        }
  }[tool.slug]);
  const canonical = `https://www.djai.academy${toolHref(tool, language)}`;
  const tokenCounter = tool.slug === "token-counter";
  const steps = vi ? ["Chọn file được hỗ trợ hoặc dán văn bản", "Kiểm tra các thiết lập phù hợp với kết quả cần dùng", "Xử lý cục bộ rồi tải hoặc sao chép kết quả"] : tokenCounter
    ? (en ? ["Paste text or import a supported document", "Choose a tokenizer encoding and context size", "Review live tokens, words, characters, context use, and cost"] : ["วางข้อความหรือนำเข้าเอกสารที่รองรับ", "เลือก tokenizer encoding และขนาด context", "ดู token คำ ตัวอักษร context และค่าใช้จ่ายแบบ live"])
    : (en ? ["Choose a supported file or paste text", "Review the relevant settings", "Process locally and download or copy the result"] : ["เลือกไฟล์ที่รองรับหรือวางข้อความ", "ตรวจตัวเลือกที่เกี่ยวข้อง", "ประมวลผลในเครื่องแล้วดาวน์โหลดหรือคัดลอกผลลัพธ์"]);
  const faq = vi ? [
    ["File hoặc văn bản có bị upload không?", "Không. Dữ liệu được đọc và xử lý trong bộ nhớ trình duyệt trên thiết bị của bạn."],
    ["Công cụ có miễn phí không?", "Có. Xử lý cốt lõi miễn phí, không cần tài khoản và không thêm watermark."],
    ["Tại sao định dạng có thể thay đổi?", "Mỗi định dạng lưu cấu trúc khác nhau. Hãy kiểm tra kết quả trước khi dùng cho tài liệu quan trọng."]
  ] : tokenCounter ? (en ? [
    ["Does the token counter upload my text?", "No. Text and imported documents are read and counted locally in your browser."],
    ["Why is a token count different from a word count?", "AI tokenizers split text into model-readable units. One word can use one or several tokens, and the ratio varies by language and content."],
    ["Can it count Thai, Chinese, Japanese, and English words?", "Yes. Word and character statistics use browser language segmentation for multilingual text, while AI tokens use the selected tokenizer encoding."],
    ["Which tokenizer should I choose?", "Use o200k_base for a modern OpenAI-compatible estimate, cl100k_base for earlier GPT-era workflows, or p50k_base for legacy content. Always confirm the tokenizer used by your target model or API."]
  ] : [
    ["เครื่องมือนี้ upload ข้อความหรือไม่?", "ไม่ ข้อความและเอกสารที่นำเข้าจะถูกอ่านและนับใน browser ของคุณ"],
    ["ทำไมจำนวน token ไม่เท่ากับจำนวนคำ?", "AI tokenizer แบ่งข้อความเป็นหน่วยที่ model อ่านได้ หนึ่งคำอาจใช้หนึ่งหรือหลาย token และสัดส่วนจะแตกต่างตามภาษาและเนื้อหา"],
    ["นับคำภาษาไทย จีน ญี่ปุ่น และอังกฤษได้หรือไม่?", "ได้ สถิติคำและตัวอักษรใช้ระบบแบ่งภาษาของ browser ส่วน AI token ใช้ tokenizer encoding ที่คุณเลือก"],
    ["ควรเลือก tokenizer ใด?", "ใช้ o200k_base สำหรับค่าประมาณแบบ OpenAI รุ่นใหม่ cl100k_base สำหรับ workflow รุ่นก่อน หรือ p50k_base สำหรับระบบเก่า และควรตรวจ tokenizer ของ model หรือ API ที่ใช้งานจริงเสมอ"]
  ]) : (en ? [
    ["Are my files uploaded?", "No. This tool processes files in browser memory on your device."],
    ["Is the tool free?", "Yes. Core processing is free, requires no account, and adds no watermark."],
    ["Why can formatting change?", "Document formats store layout differently. Browser conversion prioritizes privacy and practical output over exact reconstruction."]
  ] : [
    ["ไฟล์ถูก upload หรือไม่?", "ไม่ เครื่องมือนี้ประมวลผลไฟล์ใน memory ของ browser บนอุปกรณ์ของคุณ"],
    ["ใช้งานฟรีหรือไม่?", "ใช้งานฟรี ไม่ต้องสมัคร และไม่มี watermark"],
    ["ทำไม formatting อาจเปลี่ยน?", "แต่ละ format เก็บ layout ต่างกัน การแปลงใน browser เน้น privacy และผลลัพธ์ที่ใช้งานได้มากกว่าการจำลองต้นฉบับแบบสมบูรณ์"]
  ]);
  const related = toolsFor(tool.category).filter((candidate) => candidate.slug !== tool.slug).slice(0, 6);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.title[language], description: tool.description[language], url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" } },
    { "@context": "https://schema.org", "@type": "HowTo", name: tool.title[language], totalTime: "PT3M", step: steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, name: text, text })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "DJAI Academy", item: vi ? "https://www.djai.academy/vi/" : en ? "https://www.djai.academy/en/" : "https://www.djai.academy/" }, { "@type": "ListItem", position: 2, name: vi ? "Tất cả công cụ" : en ? "All Tools" : "เครื่องมือทั้งหมด", item: vi ? "https://www.djai.academy/tools/vi/" : en ? "https://www.djai.academy/tools/en/" : "https://www.djai.academy/tools/" }, { "@type": "ListItem", position: 3, name: tool.category, item: `https://www.djai.academy${categoryHref(tool.category, language)}` }, { "@type": "ListItem", position: 4, name: tool.title[language], item: canonical }] }
  ];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <SuiteHeader category={tool.category} language={language} tool={tool} />
    <section className="tool-intro"><a href={categoryHref(tool.category, language)}><ArrowLeft />{vi ? "Quay lại nhóm công cụ" : en ? `Back to ${tool.category} tools` : "กลับไปหน้าเครื่องมือ"}</a><p className="eyebrow">{tool.label[language]}</p><h1>{tool.title[language]}</h1><p>{tool.description[language]}</p><ShareButtons url={canonical} title={tool.title[language]} language={language} compact /><div><span><ShieldCheck />{vi ? "Xử lý riêng tư trong trình duyệt" : en ? "Private browser processing" : "ประมวลผลแบบ private ใน browser"}</span><span>{vi ? "Không cần tài khoản" : en ? "No account" : "ไม่ต้องสมัคร"}</span><span>{vi ? "Miễn phí" : en ? "Free" : "ใช้ฟรี"}</span></div></section>
    <AdSenseAd label="Tool advertisement" />
    <ToolWorkspace tool={tool} language={language} />
    <AdSenseAd label="Tool advertisement" variant="display2" />
    <CamPdfAppCallout language={language} />
    <section className="how-to"><div><p className="eyebrow">HOW TO</p><h2>{vi ? `Cách dùng ${tool.label.vi}` : en ? `How to use ${tool.label.en}` : `วิธีใช้ ${tool.label.th}`}</h2><p>{tool.intent[language]}</p></div><ol>{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>
    {specializedGuidance ? <section className="how-to tool-specific-guidance"><div><p className="eyebrow">{specializedGuidance.eyebrow}</p><h2>{specializedGuidance.title}</h2><p>{specializedGuidance.copy}</p></div><div><p>{specializedGuidance.limit}</p></div></section> : null}
    <section className="related-tools" data-tool-discovery><div className="section-heading"><p className="eyebrow">{vi ? "TIẾP TỤC VỚI" : en ? "CONTINUE WITH" : "ทำงานต่อ"}</p><h2>{vi ? "Công cụ miễn phí liên quan" : en ? "Related free tools" : "เครื่องมือฟรีที่เกี่ยวข้อง"}</h2></div><div>{related.map((item) => <a href={toolHref(item, language)} key={item.slug}><strong>{item.label[language]}</strong><span>{item.intent[language]}</span><ArrowRight /></a>)}</div></section>
    <AdSenseAd label="Related content advertisement" variant="multiplex" />
    <section className="faq-section"><div><p className="eyebrow">FAQ</p><h2>{vi ? "Câu hỏi thường gặp" : en ? "Common questions" : "คำถามที่พบบ่อย"}</h2></div><div>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <ServiceBands language={language} category={tool.category} /><ToolEcosystemDirectory language={language} /><SuiteFooter language={language} />
  </main>;
}
