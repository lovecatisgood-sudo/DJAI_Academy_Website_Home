"use client";

import { ArrowRight, Check, Clipboard, Download, FileArchive, FileText, LoaderCircle, LockKeyhole, RotateCcw, ShieldCheck, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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
  if (tool.slug === "token-counter" && language !== "zh-CN" && language !== "zh-TW") return <TokenCounterWorkspace tool={tool} language={language} />;
  return <GenericToolWorkspace tool={tool} language={language} />;
}

function GenericToolWorkspace({ tool, language }: { tool: ToolDefinition; language: Language }) {
  const en = language === "en";
  const vi = language === "vi";
  const cn = language === "zh-CN";
  const tw = language === "zh-TW";
  const t = (enText: string, thText: string, viText: string, cnText: string, twText: string) => tw ? twText : cn ? cnText : vi ? viText : en ? enText : thText;
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
  const textMode = ["token-counter", "context-optimizer", "rag-chunk-calculator", "prompt-packager"].includes(tool.slug);
  const needsFile = !["token-counter", "context-optimizer", "rag-chunk-calculator", "prompt-packager"].includes(tool.slug);
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
    if (needsFile && !files.length) { setError(t("Choose a supported file first.", "กรุณาเลือกไฟล์ที่รองรับก่อน", "Hãy chọn một file được hỗ trợ trước.", "请先选择支持的文件。", "請先選擇支援的檔案。")); return; }
    setRunning(true); setError(""); setResult(null);
    try {
      const { processTool } = await import("./processors");
      const processed = await processTool(tool, files, input, options);
      const url = processed.blob ? URL.createObjectURL(processed.blob) : undefined;
      setResult({ ...processed, url });
      if (processed.blob) setPromoType(shouldShowToolPromo());
      window.dispatchEvent(new CustomEvent("djai-tool-complete", { detail: { tool: tool.slug } }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t("The tool could not process this file.", "ไม่สามารถประมวลผลไฟล์นี้ได้", "Công cụ chưa thể xử lý file này.", "无法处理此文件。", "無法處理此檔案。"));
    } finally { setRunning(false); }
  }

  async function copyResult() {
    await navigator.clipboard.writeText(outputText); setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  }

  const placeholder = tool.slug === "rag-chunk-calculator"
    ? t("Paste the document you want to split into RAG chunks...", "วางเอกสารที่ต้องการแบ่งเป็น RAG chunk...", "Dán tài liệu cần chia thành RAG chunk...", "粘贴需要拆分成 RAG 文本块的文档…", "貼上需要切分為 RAG 文字區塊的文件…")
    : tool.slug === "prompt-packager"
      ? t("Optional instructions for the packaged files...", "คำสั่งเพิ่มเติมสำหรับชุดไฟล์...", "Hướng dẫn bổ sung cho gói file...", "可选：为打包文件补充说明…", "選填：為打包檔案補充說明…")
      : t("Paste text here, or choose a document below...", "วางข้อความที่นี่ หรือเลือกเอกสารด้านล่าง...", "Dán văn bản tại đây hoặc chọn tài liệu bên dưới...", "在此粘贴文字，或在下方选择文档…", "在此貼上文字，或在下方選擇文件…");

  return <>
    <section className="workspace" id="workspace">
      <div className="workspace-title"><span><FileArchive /></span><div><p className="eyebrow">{t("PRIVATE WORKSPACE", "พื้นที่ทำงานแบบ PRIVATE", "KHÔNG GIAN RIÊNG TƯ", "本地隐私处理", "本機隱私處理")}</p><h2>{tool.label[language]}</h2><p>{tool.intent[language]}</p></div></div>
      <div className="workspace-shell">
        <div className="input-panel">
          {textMode && <label className="text-input-label"><span>{t("Text or instructions", "ข้อความหรือคำสั่ง", "Văn bản hoặc hướng dẫn", "文字或说明", "文字或說明")}</span><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={placeholder} /></label>}
          {tool.slug !== "rag-chunk-calculator" && <>
            <button className={`drop-zone ${dragging ? "dragging" : ""}`} type="button" onClick={() => inputRef.current?.click()} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}>
              <Upload /><strong>{files.length ? t("Add or replace file", "เพิ่มหรือเปลี่ยนไฟล์", "Thêm hoặc thay file", "添加或替换文件", "新增或更換檔案") : t("Drop a file here", "วางไฟล์ที่นี่", "Thả file vào đây", "将文件拖到这里", "將檔案拖曳至此")}</strong><small>{t("Processed locally · Maximum 40 MB per file", "ประมวลผลในเครื่อง · สูงสุด 40 MB ต่อไฟล์", "Xử lý cục bộ · Tối đa 40 MB mỗi file", "本地处理 · 每个文件最大 40 MB", "本機處理 · 每個檔案上限 40 MB")}</small><span>{t("Choose file", "เลือกไฟล์", "Chọn file", "选择文件", "選擇檔案")}</span>
            </button>
            <input ref={inputRef} className="visually-hidden" type="file" accept={acceptFor(tool)} multiple={allowsMultiple} aria-label={t("Choose files to process", "เลือกไฟล์ที่ต้องการประมวลผล", "Chọn file cần xử lý", "选择要处理的文件", "選擇要處理的檔案")} onChange={(event) => event.target.files && addFiles(event.target.files)} />
          </>}
          {files.length > 0 && <div className="selected-files">{files.map((file, index) => <div key={`${file.name}-${index}`}><FileText /><span><strong>{file.name}</strong><small>{formatBytes(file.size)}</small></span><button type="button" aria-label="Remove file" title="Remove file" onClick={() => setFiles((current) => current.filter((_, item) => item !== index))}><X /></button></div>)}</div>}
        </div>
        <div className="option-panel">
          <div className="option-heading"><strong>{t("Options", "ตัวเลือก", "Tùy chọn", "处理选项", "處理選項")}</strong><ShieldCheck /></div>
          <ToolOptionsPanel tool={tool} language={language} options={options} update={update} />
          {tool.warning && <p className="accuracy-note"><ShieldCheck />{tool.warning[language]}</p>}
          {error && <p className="tool-error" role="alert">{error}</p>}
          <button className="run-button" type="button" disabled={running} onClick={run}>{running ? <LoaderCircle className="spin" /> : <LockKeyhole />}<span>{running ? t("Processing locally...", "กำลังประมวลผลในเครื่อง...", "Đang xử lý cục bộ...", "正在本地处理…", "正在本機處理…") : t("Process privately", "ประมวลผลแบบ private", "Xử lý riêng tư", "开始本地处理", "開始本機處理")}</span><ArrowRight /></button>
          <button className="reset-button" type="button" onClick={reset}><RotateCcw />{t("Start over", "เริ่มใหม่", "Làm lại", "重新开始", "重新開始")}</button>
        </div>
      </div>
    </section>
    {result && <section className="result-area" aria-live="polite">
      <div className="result-heading"><span><Check /></span><div><p className="eyebrow">{t("READY", "เสร็จแล้ว", "SẴN SÀNG", "处理完成", "處理完成")}</p><h2>{t("Your result is ready", "ผลลัพธ์พร้อมแล้ว", "Kết quả đã sẵn sàng", "结果已可下载", "結果已可下載")}</h2><p>{result.note}</p></div></div>
      <div className="result-stats">{result.stats.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      {result.html && <div className="html-preview" dangerouslySetInnerHTML={{ __html: result.html }} />}
      {outputText && <pre className="text-preview">{outputText}</pre>}
      <div className="result-actions">{result.url && result.fileName && <a className="download-button" href={result.url} download={result.fileName}><Download />{t("Download result", "ดาวน์โหลดผลลัพธ์", "Tải kết quả", "下载结果", "下載結果")}</a>}{outputText && <button type="button" onClick={copyResult}>{copied ? <Check /> : <Clipboard />}{copied ? t("Copied", "คัดลอกแล้ว", "Đã sao chép", "已复制", "已複製") : t("Copy result", "คัดลอกผลลัพธ์", "Sao chép kết quả", "复制结果", "複製結果")}</button>}</div>
      <ShareButtons url={shareUrl} title={tool.title[language]} language={language} compact />
    </section>}
    <ToolPromoModal language={language} type={promoType} onClose={() => setPromoType(null)} />
  </>;
}

function ToolOptionsPanel({ tool, language, options, update }: { tool: ToolDefinition; language: Language; options: ToolOptions; update: <K extends keyof ToolOptions>(key: K, value: ToolOptions[K]) => void }) {
  const en = language === "en";
  const vi = language === "vi";
  const cn = language === "zh-CN";
  const tw = language === "zh-TW";
  const t = (enText: string, thText: string, viText: string, cnText = enText, twText = cnText) => tw ? twText : cn ? cnText : vi ? viText : en ? enText : thText;
  if (tool.slug === "docx-to-pdf") return <div className="option-grid"><label>{t("Paper size", "ขนาดกระดาษ", "Khổ giấy", "页面大小", "頁面大小")}<select value={options.paperSize} onChange={(event) => update("paperSize", event.target.value as ToolOptions["paperSize"])}><option value="a4">A4</option><option value="letter">Letter</option><option value="legal">Legal</option></select></label><label>{t("Margin", "ขอบกระดาษ", "Lề trang", "页边距", "頁面邊界")}<select value={options.margin} onChange={(event) => update("margin", Number(event.target.value))}><option value="24">{t("Narrow", "แคบ", "Hẹp", "窄", "窄")}</option><option value="42">{t("Normal", "ปกติ", "Bình thường", "标准", "標準")}</option><option value="64">{t("Wide", "กว้าง", "Rộng", "宽", "寬")}</option></select></label><label className="check-option"><input type="checkbox" checked={options.pageNumbers} onChange={(event) => update("pageNumbers", event.target.checked)} /><span><Check /></span>{t("Add page numbers", "ใส่เลขหน้า", "Thêm số trang", "添加页码", "加入頁碼")}</label></div>;
  if (["pdf-to-text", "pdf-to-word", "pdf-to-ai-markdown"].includes(tool.slug)) return <div className="option-grid"><label>{t("Page range", "ช่วงหน้า", "Phạm vi trang", "页面范围", "頁面範圍")}<input value={options.pageRange} onChange={(event) => update("pageRange", event.target.value)} placeholder="1-3, 5" /><small>{t("Blank means all pages", "เว้นว่าง = ทุกหน้า", "Để trống để chọn tất cả trang", "留空表示全部页面", "留空代表全部頁面")}</small></label><label className="check-option"><input type="checkbox" checked={options.preserveBreaks} onChange={(event) => update("preserveBreaks", event.target.checked)} /><span><Check /></span>{t("Preserve line breaks", "รักษาการขึ้นบรรทัด", "Giữ nguyên ngắt dòng", "保留换行", "保留換行")}</label></div>;
  if (tool.slug === "ocr") return <div className="option-grid"><label>{t("Document language", "ภาษาเอกสาร", "Ngôn ngữ tài liệu", "文档语言", "文件語言")}<select value={options.ocrLanguage} onChange={(event) => update("ocrLanguage", event.target.value as ToolOptions["ocrLanguage"])}><option value="eng">English</option><option value="tha">ไทย</option></select></label><p className="setting-help">{t("Pages are recognized one at a time to reduce memory use.", "ประมวลผลทีละหน้าเพื่อลดการใช้ memory", "Mỗi trang được nhận dạng riêng để giảm mức dùng bộ nhớ.", "逐页识别以减少内存占用。", "逐頁辨識以降低記憶體用量。")}</p></div>;
  if (tool.slug === "rag-chunk-calculator") return <div className="option-grid"><label>{t("Chunk size (tokens)", "ขนาด chunk (token)", "Kích thước chunk (token)", "文本块大小（token）", "文字區塊大小（token）")}<input type="number" min="100" max="8000" step="50" value={options.chunkSize} onChange={(event) => update("chunkSize", Number(event.target.value))} /></label><label>{t("Overlap (tokens)", "Overlap (token)", "Phần chồng lấp (token)", "重叠大小（token）", "重疊大小（token）")}<input type="number" min="0" max={Math.max(0, options.chunkSize - 1)} step="25" value={options.chunkOverlap} onChange={(event) => update("chunkOverlap", Number(event.target.value))} /></label></div>;
  if (tool.slug === "prompt-packager") return <div className="option-grid"><label>{t("Section boundaries", "ขอบเขตแต่ละส่วน", "Dấu phân cách phần", "段落边界", "段落邊界")}<select value={options.boundary} onChange={(event) => update("boundary", event.target.value as ToolOptions["boundary"])}><option value="markdown">Markdown headings</option><option value="xml">XML tags</option></select></label></div>;
  if (tool.slug === "split-csv") return <div className="option-grid"><label>{t("Rows per file", "จำนวนแถวต่อไฟล์", "Số hàng mỗi tệp", "每个文件的行数", "每個檔案的列數")}<input type="number" min="10" max="100000" value={options.splitRows} onChange={(event) => update("splitRows", Number(event.target.value))} /></label></div>;
  if (tool.slug === "xlsx-to-csv") return <div className="option-grid"><label>{t("Worksheet number", "ลำดับ worksheet", "Số thứ tự trang tính", "工作表序号", "工作表序號")}<input type="number" min="1" value={options.worksheet + 1} onChange={(event) => update("worksheet", Math.max(0, Number(event.target.value) - 1))} /></label></div>;
  return <p className="setting-help">{t("The recommended settings are applied automatically.", "ระบบใช้ค่าที่แนะนำให้อัตโนมัติ", "Các cài đặt được đề xuất sẽ tự động được áp dụng.", "系统会自动应用推荐设置。", "系統會自動套用建議設定。")}</p>;
}
