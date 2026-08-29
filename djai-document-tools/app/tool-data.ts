export type Language = "th" | "en" | "vi" | "zh-CN" | "zh-TW";
export type Category = "document" | "ai" | "spreadsheet";

export type ToolDefinition = {
  slug: string;
  category: Category;
  input: "docx" | "pdf" | "document" | "text" | "mixed" | "csv" | "json" | "spreadsheet";
  multiple?: boolean;
  title: Record<string, string>;
  label: Record<string, string>;
  description: Record<string, string>;
  intent: Record<string, string>;
  keywords: Record<string, string[]>;
  warning?: Record<string, string>;
};

export const categories: Record<Category, {
  title: Record<string, string>;
  description: Record<string, string>;
}> = {
  document: {
    title: { th: "เครื่องมือแปลงเอกสารฟรี", en: "Free Document Converter" },
    description: {
      th: "แปลง DOCX, PDF, HTML, Markdown และข้อความแบบ private ใน browser โดยไม่ต้อง upload เอกสารขึ้น server",
      en: "Convert DOCX, PDF, HTML, Markdown, and text privately in your browser without uploading documents to a server."
    }
  },
  ai: {
    title: { th: "เครื่องมือเตรียมเอกสารสำหรับ AI", en: "AI Document Tools" },
    description: {
      th: "นับ token ทำความสะอาด context แบ่ง chunk และจัดไฟล์สำหรับ ChatGPT, Claude, Cursor, Codex และระบบ RAG",
      en: "Count tokens, clean context, preview chunks, and package files for ChatGPT, Claude, Cursor, Codex, and RAG systems."
    }
  },
  spreadsheet: {
    title: { th: "เครื่องมือ CSV และ Spreadsheet ฟรี", en: "Free CSV and Spreadsheet Tools" },
    description: {
      th: "แปลง ทำความสะอาด รวม และแบ่ง CSV, JSON และ XLSX ใน browser โดยข้อมูลไม่ออกจากอุปกรณ์ของคุณ",
      en: "Convert, clean, merge, and split CSV, JSON, and XLSX files locally in your browser."
    }
  }
};

export const tools: ToolDefinition[] = [
  {
    slug: "docx-to-pdf", category: "document", input: "docx",
    label: { th: "DOCX เป็น PDF", en: "DOCX to PDF" },
    title: { th: "แปลง DOCX เป็น PDF ฟรี", en: "Convert DOCX to PDF Free" },
    description: { th: "แปลงไฟล์ Word DOCX เป็น PDF แบบ private พร้อม preview เลือกขนาดกระดาษ margin และเลขหน้า", en: "Convert Word DOCX files to PDF privately with preview, paper size, margins, and optional page numbers." },
    intent: { th: "เหมาะกับเอกสารทั่วไปที่ต้องการ PDF อย่างรวดเร็วโดยไม่ upload ไฟล์", en: "Best for ordinary documents that need a quick private PDF conversion." },
    keywords: { th: ["DOCX เป็น PDF", "Word เป็น PDF", "แปลง Word ฟรี"], en: ["DOCX to PDF", "Word to PDF free", "private Word converter"] },
    warning: { th: "เอกสารที่มี layout ซับซ้อน ตารางลอย สมการ หรือ font เฉพาะอาจต่างจาก Word ต้นฉบับ", en: "Complex layouts, floating objects, equations, and custom fonts may differ from the original Word document." }
  },
  {
    slug: "docx-to-html", category: "document", input: "docx",
    label: { th: "DOCX เป็น HTML", en: "DOCX to HTML" },
    title: { th: "แปลง DOCX เป็น HTML ที่สะอาด", en: "Convert DOCX to Clean HTML" },
    description: { th: "แปลง Word เป็น semantic HTML ที่ผ่านการ sanitize พร้อม preview, copy และดาวน์โหลด", en: "Turn Word documents into sanitized semantic HTML with preview, copy, and download." },
    intent: { th: "เตรียมเนื้อหาสำหรับเว็บไซต์ blog CMS และ knowledge base", en: "Prepare content for websites, blogs, CMS platforms, and knowledge bases." },
    keywords: { th: ["DOCX เป็น HTML", "Word เป็น HTML", "แปลงเอกสารลงเว็บ"], en: ["DOCX to HTML", "Word to HTML", "clean Word HTML"] }
  },
  {
    slug: "docx-to-markdown", category: "document", input: "docx",
    label: { th: "DOCX เป็น Markdown", en: "DOCX to Markdown" },
    title: { th: "แปลง DOCX เป็น Markdown ฟรี", en: "Convert DOCX to Markdown Free" },
    description: { th: "รักษา heading, list, link และ table แล้วส่งออก Markdown สำหรับ GitHub, Cursor, Codex และเอกสาร AI", en: "Preserve headings, lists, links, and tables in Markdown for GitHub, Cursor, Codex, and AI documentation." },
    intent: { th: "เปลี่ยน specification และคู่มือ Word ให้พร้อมใช้กับ developer workflow", en: "Make Word specifications and guides ready for developer workflows." },
    keywords: { th: ["DOCX เป็น Markdown", "Word เป็น MD"], en: ["DOCX to Markdown", "Word to Markdown", "convert Word to MD"] }
  },
  {
    slug: "docx-to-text", category: "document", input: "docx",
    label: { th: "DOCX เป็นข้อความ", en: "DOCX to Text" },
    title: { th: "ดึงข้อความจาก DOCX ฟรี", en: "Extract Text from DOCX Free" },
    description: { th: "ดึงข้อความล้วนจาก Word ใน browser พร้อม copy, download และนับคำ", en: "Extract plain text from Word documents locally with copy, download, and word count." },
    intent: { th: "นำข้อความไปใช้ต่อโดยไม่ติด formatting จาก Word", en: "Reuse document content without Word formatting." },
    keywords: { th: ["ดึงข้อความ DOCX", "Word เป็น TXT"], en: ["DOCX to text", "Word to TXT", "extract Word text"] }
  },
  {
    slug: "pdf-to-text", category: "document", input: "pdf",
    label: { th: "PDF เป็นข้อความ", en: "PDF to Text" },
    title: { th: "ดึงข้อความจาก PDF ฟรี", en: "Extract Text from PDF Free" },
    description: { th: "ดึงข้อความจาก PDF ตามช่วงหน้า ล้างบรรทัด และดาวน์โหลด TXT โดยไฟล์อยู่ในเครื่อง", en: "Extract text from selected PDF pages, clean line breaks, and download TXT without uploading the file." },
    intent: { th: "เตรียมข้อความสำหรับค้นหา แก้ไข สรุป หรือนับ token", en: "Prepare PDF text for search, editing, summarization, or token counting." },
    keywords: { th: ["PDF เป็นข้อความ", "ดึงข้อความ PDF"], en: ["PDF to text", "extract PDF text", "PDF to TXT"] }
  },
  {
    slug: "pdf-to-word", category: "document", input: "pdf",
    label: { th: "PDF เป็น Word", en: "PDF to Word" },
    title: { th: "แปลงข้อความ PDF เป็น Word", en: "Convert Editable PDF Text to Word" },
    description: { th: "ดึงข้อความที่แก้ไขได้จาก PDF แล้วสร้าง DOCX แบบ page-by-page ใน browser", en: "Extract editable PDF text and rebuild it as a page-by-page DOCX in your browser." },
    intent: { th: "เหมาะกับ PDF ที่มี selectable text และต้องการนำข้อความกลับมาแก้ไข", en: "Best for PDFs with selectable text that needs to be edited again." },
    keywords: { th: ["PDF เป็น Word", "PDF เป็น DOCX"], en: ["PDF to Word", "PDF to DOCX", "editable PDF text"] },
    warning: { th: "เครื่องมือนี้เน้นข้อความและไม่รับประกัน layout เหมือน PDF ต้นฉบับ", en: "This text-focused converter does not promise exact reconstruction of the original PDF layout." }
  },
  {
    slug: "ocr", category: "document", input: "mixed",
    label: { th: "OCR เอกสาร", en: "Document OCR" },
    title: { th: "OCR PDF และรูปภาพเป็นข้อความ", en: "OCR PDF and Images to Text" },
    description: { th: "อ่านข้อความจาก PDF scan, JPG และ PNG ด้วย OCR ภาษาไทยหรืออังกฤษใน browser", en: "Recognize text in scanned PDFs, JPG, and PNG files with Thai or English browser OCR." },
    intent: { th: "แปลงเอกสาร scan ใบเสร็จ และรูปถ่ายให้ค้นหาและ copy ข้อความได้", en: "Turn scans, receipts, and document photos into searchable, copyable text." },
    keywords: { th: ["OCR ภาษาไทย", "PDF scan เป็นข้อความ", "รูปเป็นข้อความ"], en: ["PDF OCR", "image to text", "Thai OCR", "scanned PDF to text"] },
    warning: { th: "OCR ใช้ CPU ของอุปกรณ์และความแม่นยำขึ้นกับความคมชัดของต้นฉบับ", en: "OCR uses device CPU and accuracy depends on source image quality." }
  },
  {
    slug: "token-counter", category: "ai", input: "document",
    label: { th: "Token Counter สำหรับ Vibe Coding", en: "Token Counter for Vibe Coders" },
    title: { th: "เครื่องมือนับ Token ฟรีสำหรับ Vibe Coding", en: "Free Token Counter for Vibe Coders" },
    description: { th: "นับ AI token, คำภาษาไทยและหลายภาษา, ตัวอักษร, UTF-8 byte และ context usage จากข้อความ DOCX PDF Markdown หรือ code แบบ private ใน browser", en: "Count AI tokens, multilingual words, characters, UTF-8 bytes, and context usage from text, DOCX, PDF, Markdown, or code privately in your browser." },
    intent: { th: "ตรวจ prompt, code และเอกสารก่อนใช้กับ AI เพื่อวางแผน context window และต้นทุน token", en: "Check prompts, code, and documents before using AI to plan context windows and token costs." },
    keywords: { th: ["นับ token ฟรี", "นับคำภาษาไทย", "vibe coding token counter", "คำนวณ context window"], en: ["free token counter", "token counter for vibe coding", "AI prompt token counter", "multilingual word counter", "context window calculator"] }
  },
  {
    slug: "pdf-to-ai-markdown", category: "ai", input: "pdf",
    label: { th: "PDF เป็น AI Markdown", en: "PDF to AI Markdown" },
    title: { th: "แปลง PDF เป็น Markdown สำหรับ AI", en: "Convert PDF to AI-Ready Markdown" },
    description: { th: "ดึง PDF เป็น Markdown พร้อม page reference ล้าง header, footer และบรรทัดที่แตก", en: "Extract PDF into Markdown with page references and cleanup for repeated headers, footers, and broken lines." },
    intent: { th: "เตรียมเอกสารสำหรับ ChatGPT, Claude, Cursor, Codex และ RAG", en: "Prepare PDFs for ChatGPT, Claude, Cursor, Codex, and RAG ingestion." },
    keywords: { th: ["PDF เป็น Markdown AI", "เตรียม PDF สำหรับ RAG"], en: ["PDF to AI Markdown", "PDF for RAG", "PDF to Markdown"] }
  },
  {
    slug: "context-optimizer", category: "ai", input: "document",
    label: { th: "Context Optimizer", en: "Context Optimizer" },
    title: { th: "ทำความสะอาดเอกสารสำหรับ AI", en: "Clean Documents for AI Context" },
    description: { th: "ลบ header ซ้ำ เลขหน้า spacing ที่เสีย และบรรทัดแตก เพื่อสร้าง context ที่กระชับ", en: "Remove repeated headers, page numbers, broken spacing, and line wraps for cleaner AI context." },
    intent: { th: "ลด token ที่ไม่จำเป็นก่อนส่งเอกสารให้ AI หรือ RAG", en: "Reduce unnecessary tokens before using documents with AI or RAG." },
    keywords: { th: ["AI context optimizer", "ทำความสะอาดเอกสาร AI"], en: ["AI context optimizer", "clean document for ChatGPT", "RAG document cleaner"] }
  },
  {
    slug: "rag-chunk-calculator", category: "ai", input: "text",
    label: { th: "RAG Chunk Calculator", en: "RAG Chunk Calculator" },
    title: { th: "คำนวณและ Preview RAG Chunk", en: "Calculate and Preview RAG Chunks" },
    description: { th: "กำหนดขนาด chunk และ overlap ดูตัวอย่าง แล้ว export JSONL สำหรับ knowledge base", en: "Set chunk size and overlap, preview sections, and export JSONL for a knowledge base." },
    intent: { th: "วางแผนการแบ่งเอกสารและจำนวน embedding ก่อนสร้าง RAG", en: "Plan document splitting and embedding counts before building RAG." },
    keywords: { th: ["RAG chunk calculator", "คำนวณ embedding"], en: ["RAG chunk calculator", "embedding chunk size", "text splitter"] }
  },
  {
    slug: "prompt-packager", category: "ai", input: "document", multiple: true,
    label: { th: "Prompt Packager", en: "Prompt Packager" },
    title: { th: "รวมไฟล์เป็น Prompt Package", en: "Package Files into an AI Prompt" },
    description: { th: "รวม requirement, documentation, code และ reference text พร้อมขอบเขต XML หรือ Markdown", en: "Combine requirements, documentation, code, and references with XML or Markdown boundaries." },
    intent: { th: "จัด context หลายไฟล์ให้พร้อมใช้กับ Cursor, Codex, Claude Code และ ChatGPT", en: "Organize multi-file context for Cursor, Codex, Claude Code, and ChatGPT." },
    keywords: { th: ["prompt packager", "รวมไฟล์สำหรับ AI"], en: ["prompt packager", "combine files for AI", "Codex context file"] }
  },
  {
    slug: "csv-to-json", category: "spreadsheet", input: "csv",
    label: { th: "CSV เป็น JSON", en: "CSV to JSON" }, title: { th: "แปลง CSV เป็น JSON ฟรี", en: "Convert CSV to JSON Free" },
    description: { th: "แปลง CSV เป็น JSON ใน browser พร้อม preview, copy และ download", en: "Convert CSV data to JSON locally with preview, copy, and download." },
    intent: { th: "เตรียมข้อมูลสำหรับ API, application และ automation", en: "Prepare tabular data for APIs, applications, and automation." },
    keywords: { th: ["CSV เป็น JSON"], en: ["CSV to JSON", "convert CSV online"] }
  },
  {
    slug: "json-to-csv", category: "spreadsheet", input: "json",
    label: { th: "JSON เป็น CSV", en: "JSON to CSV" }, title: { th: "แปลง JSON เป็น CSV ฟรี", en: "Convert JSON to CSV Free" },
    description: { th: "แปลง JSON array เป็น CSV พร้อมจัด column และดาวน์โหลด", en: "Convert a JSON array into CSV columns and download the result." },
    intent: { th: "นำข้อมูลจาก API ไปเปิดใน spreadsheet", en: "Move API data into a spreadsheet-friendly format." },
    keywords: { th: ["JSON เป็น CSV"], en: ["JSON to CSV", "JSON array converter"] }
  },
  {
    slug: "csv-cleaner", category: "spreadsheet", input: "csv",
    label: { th: "ทำความสะอาด CSV", en: "CSV Cleaner" }, title: { th: "ทำความสะอาด CSV ฟรี", en: "Clean CSV Data Free" },
    description: { th: "ตัดช่องว่าง ลบแถวว่าง และลบข้อมูลซ้ำโดยไม่ upload ไฟล์", en: "Trim whitespace, remove empty rows, and deduplicate CSV data without uploading it." },
    intent: { th: "แก้ข้อมูลก่อน import เข้า CRM, database หรือ dashboard", en: "Prepare data before importing it into a CRM, database, or dashboard." },
    keywords: { th: ["ล้างข้อมูล CSV", "ลบข้อมูลซ้ำ CSV"], en: ["CSV cleaner", "remove CSV duplicates"] }
  },
  {
    slug: "merge-csv", category: "spreadsheet", input: "csv", multiple: true,
    label: { th: "รวม CSV", en: "Merge CSV" }, title: { th: "รวมไฟล์ CSV หลายไฟล์", en: "Merge Multiple CSV Files" },
    description: { th: "รวมหลาย CSV โดยจับคู่ชื่อ column และดาวน์โหลดไฟล์เดียว", en: "Merge multiple CSV files by matching column names and download one result." },
    intent: { th: "รวม export รายวัน รายสาขา หรือหลายระบบเพื่อวิเคราะห์ต่อ", en: "Combine daily, branch, or system exports for further analysis." },
    keywords: { th: ["รวม CSV"], en: ["merge CSV files", "combine CSV"] }
  },
  {
    slug: "split-csv", category: "spreadsheet", input: "csv",
    label: { th: "แบ่ง CSV", en: "Split CSV" }, title: { th: "แบ่ง CSV ตามจำนวนแถว", en: "Split CSV by Row Count" },
    description: { th: "แบ่ง CSV ขนาดใหญ่เป็นหลายไฟล์แล้วดาวน์โหลด ZIP", en: "Split a large CSV into smaller files and download them as a ZIP." },
    intent: { th: "เตรียมไฟล์ให้พอดีกับข้อจำกัดของระบบ import", en: "Fit large exports within another system's import limits." },
    keywords: { th: ["แบ่ง CSV", "split CSV"], en: ["split CSV", "CSV chunker"] }
  },
  {
    slug: "csv-to-xlsx", category: "spreadsheet", input: "csv",
    label: { th: "CSV เป็น XLSX", en: "CSV to XLSX" }, title: { th: "แปลง CSV เป็น Excel XLSX", en: "Convert CSV to Excel XLSX" },
    description: { th: "แปลง CSV เป็น workbook Excel พร้อม header และ column ที่อ่านง่าย", en: "Convert CSV into an Excel workbook with readable headers and columns." },
    intent: { th: "เปิดและแชร์ข้อมูลใน Excel ได้สะดวกขึ้น", en: "Make tabular data easier to open and share in Excel." },
    keywords: { th: ["CSV เป็น Excel", "CSV เป็น XLSX"], en: ["CSV to XLSX", "CSV to Excel"] }
  },
  {
    slug: "xlsx-to-csv", category: "spreadsheet", input: "spreadsheet",
    label: { th: "XLSX เป็น CSV", en: "XLSX to CSV" }, title: { th: "แปลง Excel XLSX เป็น CSV", en: "Convert Excel XLSX to CSV" },
    description: { th: "เลือก worksheet และส่งออกเป็น CSV ใน browser", en: "Select a worksheet and export it as CSV in your browser." },
    intent: { th: "เตรียม Excel สำหรับ import เข้า database และระบบ automation", en: "Prepare Excel data for databases and automation systems." },
    keywords: { th: ["Excel เป็น CSV", "XLSX เป็น CSV"], en: ["XLSX to CSV", "Excel to CSV"] }
  }
];

export const categoryOrder: Category[] = ["document", "ai", "spreadsheet"];

const vietnameseCategories: Record<Category, [string, string]> = {
  document: ["Công cụ chuyển đổi tài liệu miễn phí", "Chuyển DOCX, PDF, HTML, Markdown và văn bản ngay trong trình duyệt mà không upload tài liệu lên máy chủ."],
  ai: ["Công cụ chuẩn bị tài liệu cho AI", "Đếm token, làm sạch context, chia chunk và đóng gói file cho ChatGPT, Claude, Cursor, Codex cùng hệ thống RAG."],
  spreadsheet: ["Công cụ CSV và bảng tính miễn phí", "Chuyển đổi, làm sạch, ghép và chia CSV, JSON, XLSX trong trình duyệt; dữ liệu không rời khỏi thiết bị."]
};

for (const category of categoryOrder) {
  categories[category].title.vi = vietnameseCategories[category][0];
  categories[category].description.vi = vietnameseCategories[category][1];
}

const vietnameseToolNames: Record<string, [string, string]> = {
  "docx-to-pdf": ["DOCX sang PDF", "Chuyển DOCX sang PDF miễn phí"],
  "docx-to-html": ["DOCX sang HTML", "Chuyển DOCX sang HTML sạch"],
  "docx-to-markdown": ["DOCX sang Markdown", "Chuyển DOCX sang Markdown miễn phí"],
  "docx-to-text": ["DOCX sang văn bản", "Trích xuất văn bản từ DOCX miễn phí"],
  "pdf-to-text": ["PDF sang văn bản", "Trích xuất văn bản từ PDF miễn phí"],
  "pdf-to-word": ["PDF sang Word", "Chuyển văn bản PDF sang Word"],
  ocr: ["OCR tài liệu", "OCR PDF và hình ảnh thành văn bản"],
  "token-counter": ["Đếm token cho Vibe Coding", "Công cụ đếm token miễn phí cho Vibe Coding"],
  "pdf-to-ai-markdown": ["PDF sang AI Markdown", "Chuyển PDF sang Markdown cho AI"],
  "context-optimizer": ["Tối ưu context", "Làm sạch tài liệu cho AI context"],
  "rag-chunk-calculator": ["Tính RAG chunk", "Tính và xem trước RAG chunk"],
  "prompt-packager": ["Đóng gói prompt", "Ghép file thành gói prompt cho AI"],
  "csv-to-json": ["CSV sang JSON", "Chuyển CSV sang JSON miễn phí"],
  "json-to-csv": ["JSON sang CSV", "Chuyển JSON sang CSV miễn phí"],
  "csv-cleaner": ["Làm sạch CSV", "Làm sạch dữ liệu CSV miễn phí"],
  "merge-csv": ["Ghép CSV", "Ghép nhiều file CSV"],
  "split-csv": ["Chia CSV", "Chia CSV theo số hàng"],
  "csv-to-xlsx": ["CSV sang XLSX", "Chuyển CSV sang Excel XLSX"],
  "xlsx-to-csv": ["XLSX sang CSV", "Chuyển Excel XLSX sang CSV"]
};

for (const tool of tools) {
  const [label, title] = vietnameseToolNames[tool.slug];
  tool.label.vi = label;
  tool.title.vi = title;
  tool.description.vi = `${title} ngay trong trình duyệt. File được xử lý cục bộ, không cần đăng ký, không watermark và không gửi lên máy chủ DJAI.`;
  tool.intent.vi = `Phù hợp khi bạn cần ${label.toLowerCase()} nhanh, riêng tư và có thể tải kết quả để dùng tiếp.`;
  tool.keywords.vi = [label.toLowerCase(), `${label.toLowerCase()} miễn phí`, `${label.toLowerCase()} không cần đăng ký`];
  if (tool.warning) tool.warning.vi = "Kết quả phụ thuộc vào cấu trúc và chất lượng file nguồn. Hãy kiểm tra file đầu ra trước khi dùng cho công việc quan trọng.";
}

const chineseCategories: Record<"zh-CN" | "zh-TW", Record<Category, [string, string]>> = {
  "zh-CN": {
    document: ["免费文档转换工具", "在浏览器中转换 DOCX、PDF、HTML、Markdown 和纯文本，文档无需上传到服务器。"],
    ai: ["AI 文档处理工具", "计算 token、清理上下文、拆分 RAG 文本块，并为 ChatGPT、Claude、Cursor 和 Codex 整理文件。"],
    spreadsheet: ["免费 CSV 与电子表格工具", "在浏览器中转换、清理、合并和拆分 CSV、JSON 与 XLSX，数据始终保留在当前设备上。"]
  },
  "zh-TW": {
    document: ["免費文件轉檔工具", "在瀏覽器中轉換 DOCX、PDF、HTML、Markdown 與純文字，文件不必上傳至伺服器。"],
    ai: ["AI 文件處理工具", "計算 token、整理上下文、切分 RAG 文字區塊，並為 ChatGPT、Claude、Cursor 與 Codex 整理檔案。"],
    spreadsheet: ["免費 CSV 與試算表工具", "在瀏覽器中轉換、清理、合併與分割 CSV、JSON 和 XLSX，資料始終留在目前裝置上。"]
  }
};

const chineseToolNames: Record<string, [string, string]> = {
  "docx-to-pdf": ["DOCX 转 PDF", "免费将 DOCX 转成 PDF"],
  "docx-to-html": ["DOCX 转 HTML", "将 DOCX 转成干净的 HTML"],
  "docx-to-markdown": ["DOCX 转 Markdown", "免费将 DOCX 转成 Markdown"],
  "docx-to-text": ["提取 DOCX 文字", "免费提取 DOCX 中的文字"],
  "pdf-to-text": ["PDF 转文字", "免费提取 PDF 文字"],
  "pdf-to-word": ["PDF 转 Word", "将可编辑的 PDF 文字转成 Word"],
  ocr: ["文档 OCR", "将扫描 PDF 和图片识别成文字"],
  "token-counter": ["AI Token 计算器", "免费在线 Token 计算器"],
  "pdf-to-ai-markdown": ["PDF 转 AI Markdown", "将 PDF 转成适合 AI 使用的 Markdown"],
  "context-optimizer": ["AI 上下文清理", "清理文档并减少无用上下文"],
  "rag-chunk-calculator": ["RAG 文本块计算器", "计算并预览 RAG 文本块"],
  "prompt-packager": ["Prompt 文件打包", "将多个文件整理成 AI Prompt"],
  "csv-to-json": ["CSV 转 JSON", "免费将 CSV 转成 JSON"],
  "json-to-csv": ["JSON 转 CSV", "免费将 JSON 转成 CSV"],
  "csv-cleaner": ["CSV 数据清理", "免费清理 CSV 数据"],
  "merge-csv": ["合并 CSV", "合并多个 CSV 文件"],
  "split-csv": ["拆分 CSV", "按行数拆分 CSV 文件"],
  "csv-to-xlsx": ["CSV 转 XLSX", "将 CSV 转成 Excel XLSX"],
  "xlsx-to-csv": ["XLSX 转 CSV", "将 Excel XLSX 转成 CSV"]
};

const toTraditional = (value: string) => value
  .replaceAll("转", "轉").replaceAll("档", "檔").replaceAll("文档", "文件").replaceAll("文字块", "文字區塊")
  .replaceAll("计算", "計算").replaceAll("预览", "預覽").replaceAll("清理", "清理").replaceAll("多个", "多個")
  .replaceAll("整理", "整理").replaceAll("适合", "適合").replaceAll("使用", "使用").replaceAll("免费", "免費")
  .replaceAll("在线", "線上").replaceAll("将", "將").replaceAll("图片", "圖片")
  .replaceAll("提取", "擷取").replaceAll("扫描", "掃描").replaceAll("识别", "辨識").replaceAll("电子表格", "試算表")
  .replaceAll("行数", "列數").replaceAll("文件", "檔案").replaceAll("数据", "資料").replaceAll("无用", "不必要");

for (const locale of ["zh-CN", "zh-TW"] as const) {
  for (const category of categoryOrder) {
    categories[category].title[locale] = chineseCategories[locale][category][0];
    categories[category].description[locale] = chineseCategories[locale][category][1];
  }
  for (const tool of tools) {
    const source = chineseToolNames[tool.slug];
    const label = locale === "zh-TW" ? toTraditional(source[0]) : source[0];
    const title = locale === "zh-TW" ? toTraditional(source[1]) : source[1];
    tool.label[locale] = label;
    tool.title[locale] = title;
    tool.description[locale] = locale === "zh-TW"
      ? `${title}，直接在瀏覽器中處理檔案，不必註冊、不加浮水印，也不會上傳至 DJAI。`
      : `${title}，直接在浏览器中处理文件，无需注册、不加水印，也不会上传到 DJAI。`;
    tool.intent[locale] = locale === "zh-TW"
      ? `適合需要快速、私密完成「${label}」並下載結果繼續使用的情境。`
      : `适合需要快速、私密完成“${label}”并下载结果继续使用的场景。`;
    tool.keywords[locale] = locale === "zh-TW" ? [label, `${label}免費`, `${label}線上工具`] : [label, `${label}免费`, `${label}在线工具`];
    if (tool.warning) tool.warning[locale] = locale === "zh-TW" ? "結果取決於來源檔案的結構與品質；重要用途請先檢查輸出檔案。" : "结果取决于源文件的结构和质量；用于重要工作前请先检查输出文件。";
  }
}

export function toolsFor(category: Category) {
  return tools.filter((tool) => tool.category === category);
}

export function findTool(category: string, slug: string) {
  return tools.find((tool) => tool.category === category && tool.slug === slug);
}

export function categoryHref(category: Category, language: Language) {
  const segment = language === "zh-CN" ? "zh-cn" : language === "zh-TW" ? "zh-tw" : language;
  return `/tools/${category}/${language === "th" ? "" : `${segment}/`}`;
}

export function toolHref(tool: ToolDefinition, language: Language) {
  const segment = language === "zh-CN" ? "zh-cn" : language === "zh-TW" ? "zh-tw" : language;
  return `/tools/${tool.category}/${tool.slug}/${language === "th" ? "" : `${segment}/`}`;
}
