import { getToolDirectory } from "./tool-directory";

export default function ToolDirectorySection({ locale = "th" }) {
  const en = locale === "en";
  const categories = getToolDirectory(locale);

  return (
    <section className="complete-tool-directory" aria-labelledby={`complete-tool-directory-${locale}`} data-tool-discovery>
      <div className="section-heading">
        <p className="eyebrow">{en ? "COMPLETE TOOL DIRECTORY" : "รวมเครื่องมือทั้งหมด"}</p>
        <h2 id={`complete-tool-directory-${locale}`}>
          {en ? "Find every free DJAI tool by task" : "ค้นหาเครื่องมือฟรีจาก DJAI ตามงานที่ต้องการ"}
        </h2>
        <p>
          {en
            ? "Browse working tools for QR codes, images, PDFs, media, documents, AI context, and spreadsheet data."
            : "รวมเครื่องมือที่ใช้งานได้จริงสำหรับ QR Code รูปภาพ PDF เสียง วิดีโอ เอกสาร AI context และข้อมูลตาราง"}
        </p>
      </div>
      <div className="complete-tool-groups">
        {categories.map((category) => (
          <section className="complete-tool-group" aria-labelledby={`tool-category-${locale}-${category.id}`} key={category.id}>
            <div className="complete-tool-group-heading">
              <div>
                <h3 id={`tool-category-${locale}-${category.id}`}>{category.title}</h3>
                <p>{category.description}</p>
              </div>
              <a href={category.href}>{en ? "View category" : "ดูหมวดหมู่"}<span aria-hidden="true">→</span></a>
            </div>
            <div className="complete-tool-links">
              {category.tools.map((tool) => (
                <a href={tool.href} key={tool.href}>
                  <strong>{tool.title}</strong>
                  <span>{tool.description}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
