"use client";

import { ArrowRight, Check, Clipboard, Download, FileArchive, FileText, LoaderCircle, LockKeyhole, RotateCcw, ShieldCheck, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ToolOptions, ToolResult } from "./processors";
import ShareButtons from "./ShareButtons";
import ToolPromoModal, { shouldShowToolPromo } from "./ToolPromoModal";
import { toolHref, type Language, type ToolDefinition } from "./tool-data";

const TokenCounterWorkspace = dynamic(() => import("./TokenCounterWorkspace"), {
  ssr: false,
  loading: () => <section className="workspace token-loading" aria-busy="true"><LoaderCircle className="spin" /><span>Loading private counter...</span></section>
});

const defaults: ToolOptions = {
  paperSize: "a4", margin: 42, pageNumbers: false, pageRange: "", preserveBreaks: true,
  ocrLanguage: "eng", chunkSize: 700, chunkOverlap: 100, boundary: "markdown", splitRows: 1000, worksheet: 0
};

function acceptFor(tool: ToolDefinition) {
  const map = {
    docx: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    pdf: ".pdf,application/pdf",
    mixed: ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg",
    csv: ".csv,text/csv",
    json: ".json,application/json",
    spreadsheet: ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    document: ".docx,.pdf,.txt,.md,.csv,.json,.js,.ts,.tsx,.jsx,.py,.html,.css,application/pdf,text/*",
    text: ".txt,.md,text/*"
  };
  return map[tool.input];
}

function formatBytes(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

export default function ToolWorkspace({ tool, language }: { tool: ToolDefinition; language: Language }) {
  if (tool.slug === "token-counter") return <TokenCounterWorkspace tool={tool} language={language} />;
  return <GenericToolWorkspace tool={tool} language={language} />;
}

function GenericToolWorkspace({ tool, language }: { tool: ToolDefinition; language: Language }) {
  const en = language === "en";
  const vi = language === "vi";
  const [files, setFiles] = useState<File[]>([]);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState(defaults);
  const [result, setResult] = useState<(ToolResult & { url?: string }) | null>(null);
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [promoType, setPromoType] = useState<"course" | "development" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textMode = ["context-optimizer", "rag-chunk-calculator", "prompt-packager"].includes(tool.slug);
  const needsFile = !["context-optimizer", "rag-chunk-calculator", "prompt-packager"].includes(tool.slug);
  const shareUrl = `https://www.djai.academy${toolHref(tool, language)}`;
  const allowsMultiple = Boolean(tool.multiple);
  const outputText = result?.text || "";

  useEffect(() => () => { if (result?.url) URL.revokeObjectURL(result.url); }, [result]);

  function addFiles(incoming: FileList | File[]) {
    const selected = Array.from(incoming);
    setFiles((current) => allowsMultiple ? [...current, ...selected].slice(0, 20) : selected.slice(0, 1));
    setResult(null); setError("");
  }

  function update<K extends keyof ToolOptions>(key: K, value: ToolOptions[K]) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]); setInput(""); setOptions(defaults); setResult(null); setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function run() {
    if (needsFile && !files.length) { setError(vi ? "Hãy chọn một file được hỗ trợ trước." : en ? "Choose a supported file first." : "กรุณาเลือกไฟล์ที่รองรับก่อน"); return; }
    setRunning(true); setError(""); setResult(null);
    try {
      const { processTool } = await import("./processors");
      const processed = await processTool(tool, files, input, options);
      const url = processed.blob ? URL.createObjectURL(processed.blob) : undefined;
      setResult({ ...processed, url });
      if (processed.blob) setPromoType(shouldShowToolPromo());
      window.dispatchEvent(new CustomEvent("djai-tool-complete", { detail: { tool: tool.slug } }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : (vi ? "Công cụ chưa thể xử lý file này." : en ? "The tool could not process this file." : "ไม่สามารถประมวลผลไฟล์นี้ได้"));
    } finally { setRunning(false); }
  }

  async function copyResult() {
    await navigator.clipboard.writeText(outputText); setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  }

  const placeholder = useMemo(() => tool.slug === "rag-chunk-calculator"
    ? (vi ? "Dán tài liệu cần chia thành RAG chunk..." : en ? "Paste the document you want to split into RAG chunks..." : "วางเอกสารที่ต้องการแบ่งเป็น RAG chunk...")
    : tool.slug === "prompt-packager"
      ? (vi ? "Hướng dẫn bổ sung cho gói file..." : en ? "Optional instructions for the packaged files..." : "คำสั่งเพิ่มเติมสำหรับชุดไฟล์...")
      : (vi ? "Dán văn bản tại đây hoặc chọn tài liệu bên dưới..." : en ? "Paste text here, or choose a document below..." : "วางข้อความที่นี่ หรือเลือกเอกสารด้านล่าง..."), [en, vi, tool.slug]);

  return <>
    <section className="workspace" id="workspace">
      <div className="workspace-title"><span><FileArchive /></span><div><p className="eyebrow">{vi ? "KHÔNG GIAN RIÊNG TƯ" : en ? "PRIVATE WORKSPACE" : "พื้นที่ทำงานแบบ PRIVATE"}</p><h2>{tool.label[language]}</h2><p>{tool.intent[language]}</p></div></div>
      <div className="workspace-shell">
        <div className="input-panel">
          {textMode && <label className="text-input-label"><span>{vi ? "Văn bản hoặc hướng dẫn" : en ? "Text or instructions" : "ข้อความหรือคำสั่ง"}</span><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={placeholder} /></label>}
          {tool.slug !== "rag-chunk-calculator" && <>
            <button className={`drop-zone ${dragging ? "dragging" : ""}`} type="button" onClick={() => inputRef.current?.click()} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}>
              <Upload /><strong>{files.length ? (vi ? "Thêm hoặc thay file" : en ? "Add or replace file" : "เพิ่มหรือเปลี่ยนไฟล์") : (vi ? "Thả file vào đây" : en ? "Drop a file here" : "วางไฟล์ที่นี่")}</strong><small>{vi ? "Xử lý cục bộ · Tối đa 40 MB mỗi file" : en ? "Processed locally · Maximum 40 MB per file" : "ประมวลผลในเครื่อง · สูงสุด 40 MB ต่อไฟล์"}</small><span>{vi ? "Chọn file" : en ? "Choose file" : "เลือกไฟล์"}</span>
            </button>
            <input ref={inputRef} className="visually-hidden" type="file" accept={acceptFor(tool)} multiple={allowsMultiple} aria-label={vi ? "Chọn file cần xử lý" : en ? "Choose files to process" : "เลือกไฟล์ที่ต้องการประมวลผล"} onChange={(event) => event.target.files && addFiles(event.target.files)} />
          </>}
          {files.length > 0 && <div className="selected-files">{files.map((file, index) => <div key={`${file.name}-${index}`}><FileText /><span><strong>{file.name}</strong><small>{formatBytes(file.size)}</small></span><button type="button" aria-label="Remove file" title="Remove file" onClick={() => setFiles((current) => current.filter((_, item) => item !== index))}><X /></button></div>)}</div>}
        </div>
        <div className="option-panel">
          <div className="option-heading"><strong>{vi ? "Tùy chọn" : en ? "Options" : "ตัวเลือก"}</strong><ShieldCheck /></div>
          <ToolOptionsPanel tool={tool} language={language} options={options} update={update} />
          {tool.warning && <p className="accuracy-note"><ShieldCheck />{tool.warning[language]}</p>}
          {error && <p className="tool-error" role="alert">{error}</p>}
          <button className="run-button" type="button" disabled={running} onClick={run}>{running ? <LoaderCircle className="spin" /> : <LockKeyhole />}<span>{running ? (vi ? "Đang xử lý cục bộ..." : en ? "Processing locally..." : "กำลังประมวลผลในเครื่อง...") : (vi ? "Xử lý riêng tư" : en ? "Process privately" : "ประมวลผลแบบ private")}</span><ArrowRight /></button>
          <button className="reset-button" type="button" onClick={reset}><RotateCcw />{vi ? "Làm lại" : en ? "Start over" : "เริ่มใหม่"}</button>
        </div>
      </div>
    </section>
    {result && <section className="result-area" aria-live="polite">
      <div className="result-heading"><span><Check /></span><div><p className="eyebrow">{vi ? "SẴN SÀNG" : en ? "READY" : "เสร็จแล้ว"}</p><h2>{vi ? "Kết quả đã sẵn sàng" : en ? "Your result is ready" : "ผลลัพธ์พร้อมแล้ว"}</h2><p>{result.note}</p></div></div>
      <div className="result-stats">{result.stats.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      {result.html && <div className="html-preview" dangerouslySetInnerHTML={{ __html: result.html }} />}
      {outputText && <pre className="text-preview">{outputText}</pre>}
      <div className="result-actions">{result.url && result.fileName && <a className="download-button" href={result.url} download={result.fileName}><Download />{vi ? "Tải kết quả" : en ? "Download result" : "ดาวน์โหลดผลลัพธ์"}</a>}{outputText && <button type="button" onClick={copyResult}>{copied ? <Check /> : <Clipboard />}{copied ? (vi ? "Đã sao chép" : en ? "Copied" : "คัดลอกแล้ว") : (vi ? "Sao chép kết quả" : en ? "Copy result" : "คัดลอกผลลัพธ์")}</button>}</div>
      <ShareButtons url={shareUrl} title={tool.title[language]} language={language} compact />
    </section>}
    <ToolPromoModal language={language} type={promoType} onClose={() => setPromoType(null)} />
  </>;
}

function ToolOptionsPanel({ tool, language, options, update }: { tool: ToolDefinition; language: Language; options: ToolOptions; update: <K extends keyof ToolOptions>(key: K, value: ToolOptions[K]) => void }) {
  const en = language === "en";
  const vi = language === "vi";
  const t = (enText: string, thText: string, viText: string) => vi ? viText : en ? enText : thText;
  if (tool.slug === "docx-to-pdf") return <div className="option-grid"><label>{t("Paper size", "ขนาดกระดาษ", "Khổ giấy")}<select value={options.paperSize} onChange={(event) => update("paperSize", event.target.value as ToolOptions["paperSize"])}><option value="a4">A4</option><option value="letter">Letter</option><option value="legal">Legal</option></select></label><label>{t("Margin", "ขอบกระดาษ", "Lề trang")}<select value={options.margin} onChange={(event) => update("margin", Number(event.target.value))}><option value="24">{t("Narrow", "แคบ", "Hẹp")}</option><option value="42">{t("Normal", "ปกติ", "Bình thường")}</option><option value="64">{t("Wide", "กว้าง", "Rộng")}</option></select></label><label className="check-option"><input type="checkbox" checked={options.pageNumbers} onChange={(event) => update("pageNumbers", event.target.checked)} /><span><Check /></span>{t("Add page numbers", "ใส่เลขหน้า", "Thêm số trang")}</label></div>;
  if (["pdf-to-text", "pdf-to-word", "pdf-to-ai-markdown"].includes(tool.slug)) return <div className="option-grid"><label>{t("Page range", "ช่วงหน้า", "Phạm vi trang")}<input value={options.pageRange} onChange={(event) => update("pageRange", event.target.value)} placeholder="1-3, 5" /><small>{t("Blank means all pages", "เว้นว่าง = ทุกหน้า", "Để trống để chọn tất cả trang")}</small></label><label className="check-option"><input type="checkbox" checked={options.preserveBreaks} onChange={(event) => update("preserveBreaks", event.target.checked)} /><span><Check /></span>{t("Preserve line breaks", "รักษาการขึ้นบรรทัด", "Giữ nguyên ngắt dòng")}</label></div>;
  if (tool.slug === "ocr") return <div className="option-grid"><label>{t("Document language", "ภาษาเอกสาร", "Ngôn ngữ tài liệu")}<select value={options.ocrLanguage} onChange={(event) => update("ocrLanguage", event.target.value as ToolOptions["ocrLanguage"])}><option value="eng">English</option><option value="tha">ภาษาไทย</option></select></label><p className="setting-help">{t("Pages are recognized one at a time to reduce memory use.", "ประมวลผลทีละหน้าเพื่อลดการใช้ memory", "Mỗi trang được nhận dạng riêng để giảm mức dùng bộ nhớ.")}</p></div>;
  if (tool.slug === "rag-chunk-calculator") return <div className="option-grid"><label>{t("Chunk size (tokens)", "ขนาด chunk (token)", "Kích thước chunk (token)")}<input type="number" min="100" max="8000" step="50" value={options.chunkSize} onChange={(event) => update("chunkSize", Number(event.target.value))} /></label><label>{t("Overlap (tokens)", "Overlap (token)", "Phần chồng lấp (token)")}<input type="number" min="0" max={Math.max(0, options.chunkSize - 1)} step="25" value={options.chunkOverlap} onChange={(event) => update("chunkOverlap", Number(event.target.value))} /></label></div>;
  if (tool.slug === "prompt-packager") return <div className="option-grid"><label>{t("Section boundaries", "ขอบเขตแต่ละส่วน", "Dấu phân cách phần")}<select value={options.boundary} onChange={(event) => update("boundary", event.target.value as ToolOptions["boundary"])}><option value="markdown">Markdown headings</option><option value="xml">XML tags</option></select></label></div>;
  if (tool.slug === "split-csv") return <div className="option-grid"><label>{t("Rows per file", "จำนวนแถวต่อไฟล์", "Số hàng mỗi tệp")}<input type="number" min="10" max="100000" value={options.splitRows} onChange={(event) => update("splitRows", Number(event.target.value))} /></label></div>;
  if (tool.slug === "xlsx-to-csv") return <div className="option-grid"><label>{t("Worksheet number", "ลำดับ worksheet", "Số thứ tự trang tính")}<input type="number" min="1" value={options.worksheet + 1} onChange={(event) => update("worksheet", Math.max(0, Number(event.target.value) - 1))} /></label></div>;
  return <p className="setting-help">{t("The recommended settings are applied automatically.", "ระบบใช้ค่าที่แนะนำให้อัตโนมัติ", "Các cài đặt được đề xuất sẽ tự động được áp dụng.")}</p>;
}
