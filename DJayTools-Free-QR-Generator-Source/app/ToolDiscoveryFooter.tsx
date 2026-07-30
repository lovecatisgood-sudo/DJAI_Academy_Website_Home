import { qrToolCopy, qrToolHref, qrToolSlugs, type QrLanguage, type QrToolSlug } from "./qr-tool-data";

const categoryLinks = {
  th: [
    ["เครื่องมือทั้งหมด", "/tools/", "รวมเครื่องมือฟรีทุกหมวดจาก DJAI"],
    ["เครื่องมือรูปภาพ", "/tools/resizeimg/", "แปลง resize บีบอัด และลบพื้นหลัง"],
    ["เครื่องมือ PDF", "/tools/PDFTools/", "รวม แยก แปลง จัดหน้า และป้องกัน PDF"],
    ["เสียงและวิดีโอ", "/tools/media/", "แปลงไฟล์ ดึงเสียง และบีบอัดวิดีโอ"],
    ["เครื่องมือเอกสาร", "/tools/document/", "แปลง DOCX ดึงข้อความ และ OCR"],
    ["เครื่องมือ AI", "/tools/ai/", "นับ token แบ่ง RAG chunk และจัด context"],
    ["เครื่องมือ Spreadsheet", "/tools/spreadsheet/", "แปลงและจัดการ CSV JSON และ XLSX"]
  ],
  en: [
    ["All free tools", "/tools/en/", "Browse every free DJAI tool by task."],
    ["Image tools", "/tools/resizeimg/en/", "Convert, resize, compress, and remove backgrounds."],
    ["PDF tools", "/tools/PDFTools/en/", "Merge, split, convert, organize, and protect PDFs."],
    ["Audio and video", "/tools/media/en/", "Convert media, extract audio, and compress video."],
    ["Document tools", "/tools/document/en/", "Convert DOCX, extract text, and run OCR."],
    ["AI context tools", "/tools/ai/en/", "Count tokens, plan RAG chunks, and package context."],
    ["Spreadsheet tools", "/tools/spreadsheet/en/", "Convert and process CSV, JSON, and XLSX."]
  ]
} as const;

export default function ToolDiscoveryFooter({ language, currentTool }: { language: QrLanguage; currentTool?: QrToolSlug }) {
  const en = language === "en";
  const related = qrToolSlugs.filter((slug) => slug !== currentTool);
  return (
    <nav className="tool-discovery-footer" aria-labelledby={`tool-discovery-${language}`} data-tool-discovery>
      <div className="tool-discovery-heading">
        <span className="step-tag">{en ? "QR WORKFLOWS" : "เครื่องมือ QR CODE"}</span>
        <h2 id={`tool-discovery-${language}`}>{en ? "Create the QR code your next task needs" : "สร้าง QR Code ให้ตรงกับงานถัดไป"}</h2>
        <p>{en ? "Open a focused generator with the correct fields for each type of QR code." : "เปิดหน้าสร้าง QR ที่มีช่องข้อมูลตรงกับลิงก์ Wi-Fi ผู้ติดต่อ ข้อความ และงานสื่อสาร"}</p>
      </div>
      <div className="tool-discovery-links">
        {related.map((slug) => <a href={qrToolHref(slug, language)} key={slug}><strong>{qrToolCopy[slug][language].title}</strong><span>{qrToolCopy[slug][language].description}</span></a>)}
      </div>
      <div className="tool-category-links">
        {categoryLinks[language].map(([label, href, description]) => <a href={href} key={href}><strong>{label}</strong><span>{description}</span></a>)}
      </div>
    </nav>
  );
}
