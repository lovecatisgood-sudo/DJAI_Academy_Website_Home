const categoryData = [
  {
    id: "seo",
    base: "/tools/seo-screaming-toad",
    title: { th: "SEO Crawler และ MCP", en: "SEO crawler and MCP" },
    description: {
      th: "ตรวจ Technical SEO, JavaScript SEO และหลักฐานการ Crawl พร้อม MCP สำหรับ AI Agent",
      en: "Audit technical and JavaScript SEO with crawl evidence and bounded MCP tools for AI agents."
    },
    tools: [
      [null, "SEO Screaming Toad", "SEO crawler โอเพนซอร์สพร้อมหลักฐาน Technical SEO และ MCP สำหรับ AI Agent", "SEO Screaming Toad", "Open-source SEO crawler with technical evidence and bounded MCP tools for AI agents."]
    ]
  },
  {
    id: "qr", base: "/tools/qrgen", title: { th: "เครื่องมือ QR Code", en: "QR code tools" },
    description: { th: "สร้าง QR Code สำหรับลิงก์ Wi-Fi ผู้ติดต่อ ข้อความ และงานสื่อสาร", en: "Create QR codes for links, Wi-Fi, contacts, text, and communication workflows." },
    tools: [
      ["url-qr-code-generator", "QR Code จากลิงก์", "เปลี่ยน URL หรือเว็บไซต์เป็น QR Code", "URL QR Code Generator", "Turn a website or URL into a QR code."],
      ["wifi-qr-code-generator", "Wi-Fi QR Code", "ให้ผู้ใช้สแกนเพื่อเชื่อมต่อ Wi-Fi", "Wi-Fi QR Code Generator", "Let guests scan to join a Wi-Fi network."],
      ["vcard-qr-code-generator", "vCard QR Code", "สร้าง QR สำหรับบันทึกข้อมูลผู้ติดต่อ", "vCard QR Code Generator", "Create a scannable digital contact card."],
      ["text-qr-code-generator", "QR Code ข้อความ", "เปลี่ยนข้อความหรือหมายเลขอ้างอิงเป็น QR", "Text QR Code Generator", "Encode text or reference information in a QR code."],
      ["email-qr-code-generator", "Email QR Code", "เปิดอีเมลพร้อมผู้รับและข้อความที่กำหนด", "Email QR Code Generator", "Open a prepared email with recipient and message."],
      ["whatsapp-qr-code-generator", "WhatsApp QR Code", "เปิดแชต WhatsApp จากการสแกน", "WhatsApp QR Code Generator", "Open a WhatsApp conversation from a scan."],
      ["qr-code-generator-with-logo", "QR Code พร้อมโลโก้", "สร้าง QR Code ใส่โลโก้สำหรับแบรนด์", "QR Code Generator with Logo", "Create a branded QR code with a logo."]
    ]
  },
  {
    id: "image", base: "/tools/resizeimg", title: { th: "เครื่องมือรูปภาพ", en: "Image tools" },
    description: { th: "แปลง บีบอัด resize ลบพื้นหลัง และเตรียมรูปสำหรับแบบฟอร์ม", en: "Convert, compress, resize, remove backgrounds, and prepare images for upload." },
    tools: [
      ["jpg-to-png", "JPG เป็น PNG", "แปลง JPG เป็น PNG สำหรับงานออกแบบ", "JPG to PNG", "Convert JPG images to PNG."],
      ["png-to-jpg", "PNG เป็น JPG", "สร้าง JPG ที่รองรับกว้างและไฟล์เล็กลง", "PNG to JPG", "Create a widely compatible, smaller JPG."],
      ["jpg-to-webp", "JPG เป็น WebP", "เตรียมรูป WebP สำหรับเว็บไซต์", "JPG to WebP", "Prepare WebP images for faster websites."],
      ["png-to-webp", "PNG เป็น WebP", "ลดขนาด PNG พร้อมรองรับ transparency", "PNG to WebP", "Reduce PNG size while preserving transparency."],
      ["webp-to-jpg", "WebP เป็น JPG", "แปลง WebP สำหรับระบบที่ต้องการ JPG", "WebP to JPG", "Convert WebP for systems that require JPG."],
      ["webp-to-png", "WebP เป็น PNG", "แปลง WebP เป็น PNG สำหรับงานกราฟิก", "WebP to PNG", "Convert WebP to PNG for graphics."],
      ["avif-to-jpg", "AVIF เป็น JPG", "สร้าง JPG ที่เปิดได้ในระบบทั่วไป", "AVIF to JPG", "Create a broadly supported JPG from AVIF."],
      ["avif-to-png", "AVIF เป็น PNG", "รักษากราฟิกคมชัดและพื้นโปร่งใส", "AVIF to PNG", "Preserve crisp graphics and transparency."],
      ["heic-to-jpg", "HEIC เป็น JPG", "แปลงรูป iPhone เป็น JPG", "HEIC to JPG", "Convert iPhone HEIC photos to JPG."],
      ["compress-image", "บีบอัดรูป", "ลดขนาด JPG PNG และ WebP ตามเป้าหมาย", "Compress Image", "Reduce JPG, PNG, and WebP file size."],
      ["resize-image", "Resize รูป", "ปรับ pixel เปอร์เซ็นต์ หรือ preset", "Resize Image", "Resize by pixels, percentage, or preset."],
      ["image-to-100kb", "รูปใกล้ 100 KB", "เตรียมรูปสำหรับแบบฟอร์มขนาดเล็ก", "Image to 100 KB", "Prepare an image for a 100 KB upload limit."],
      ["resize-image-to-200kb", "รูปใกล้ 200 KB", "ลดรูปให้ใกล้เป้าหมาย 200 KB", "Image to 200 KB", "Reduce an image toward a 200 KB target."],
      ["image-to-500kb", "รูปใกล้ 500 KB", "รักษารายละเอียดภายใต้เป้าหมาย 500 KB", "Image to 500 KB", "Preserve useful detail under a 500 KB target."],
      ["remove-background-image", "ลบพื้นหลังรูป", "สร้าง PNG พื้นหลังโปร่งใส", "Remove Image Background", "Create a transparent-background PNG."],
      ["remove-image-metadata", "ลบ Metadata รูป", "ลบ EXIF และข้อมูลระบุตัวตน", "Remove Image Metadata", "Remove EXIF and identifying metadata."],
      ["passport-photo-resizer", "Resize รูปพาสปอร์ต", "ครอปและปรับรูปตามขนาดเอกสาร", "Passport Photo Resizer", "Crop and size a photo for documents."]
    ]
  },
  {
    id: "pdf", base: "/tools/PDFTools", title: { th: "เครื่องมือ PDF", en: "PDF tools" },
    description: { th: "รวม แยก แปลง จัดหน้า ป้องกัน และทำความสะอาดไฟล์ PDF", en: "Merge, split, convert, organize, protect, and clean PDF files." },
    tools: [
      ["merge-pdf", "รวม PDF", "รวม PDF หลายไฟล์ตามลำดับ", "Merge PDF", "Combine multiple PDFs in a chosen order."],
      ["split-pdf", "แยก PDF", "แบ่ง PDF ตามช่วงหน้าหรือจำนวนหน้า", "Split PDF", "Split a PDF by ranges or page count."],
      ["compress-pdf", "บีบอัด PDF", "ลดขนาด PDF ตามระดับคุณภาพ", "Compress PDF", "Reduce PDF size with quality presets."],
      ["images-to-pdf", "รูปภาพเป็น PDF", "รวมรูปภาพหลายรูปเป็นเอกสาร PDF", "Images to PDF", "Combine multiple images into a PDF document."],
      ["jpg-to-pdf", "JPG เป็น PDF", "รวมรูป JPG เป็นเอกสาร PDF", "JPG to PDF", "Combine JPG images into a PDF."],
      ["png-to-pdf", "PNG เป็น PDF", "รวมภาพ PNG เป็น PDF", "PNG to PDF", "Combine PNG images into a PDF."],
      ["webp-to-pdf", "WebP เป็น PDF", "แปลงภาพ WebP เป็น PDF", "WebP to PDF", "Convert WebP images into a PDF."],
      ["pdf-to-jpg", "PDF เป็น JPG", "ส่งออกหน้า PDF เป็น JPG", "PDF to JPG", "Export PDF pages as JPG images."],
      ["pdf-to-images", "PDF เป็นรูปภาพ", "ส่งออกหน้า PDF เป็นไฟล์รูปภาพ", "PDF to Images", "Export PDF pages as image files."],
      ["pdf-to-png", "PDF เป็น PNG", "ส่งออกหน้า PDF เป็น PNG แบบ lossless", "PDF to PNG", "Export PDF pages as lossless PNG images."],
      ["rotate-pdf", "หมุน PDF", "หมุนทุกหน้าหรือหน้าที่เลือก", "Rotate PDF", "Rotate every page or selected pages."],
      ["watermark-pdf", "ใส่ลายน้ำ PDF", "เพิ่มข้อความ รูปภาพ หรือโลโก้", "Watermark PDF", "Add a text, image, or logo watermark."],
      ["protect-pdf", "ล็อก PDF", "ใส่รหัสผ่านและกำหนดสิทธิ์เอกสาร", "Protect PDF", "Add a password and document permissions."],
      ["organize-pdf", "จัดหน้า PDF", "เรียงใหม่และตัดหน้าที่ไม่ต้องการ", "Organize PDF", "Reorder pages and omit unwanted pages."],
      ["extract-pdf-pages", "ดึงหน้า PDF", "สร้าง PDF ใหม่จากหน้าที่เลือก", "Extract PDF Pages", "Create a PDF from selected pages."],
      ["delete-pages-from-pdf", "ลบหน้า PDF", "ลบหน้าเดี่ยวหรือช่วงหน้า", "Delete PDF Pages", "Remove individual pages or page ranges."],
      ["reorder-pdf-pages", "เรียงหน้า PDF", "กำหนดลำดับหน้าสุดท้าย", "Reorder PDF Pages", "Define a new final page order."],
      ["add-page-numbers", "ใส่เลขหน้า PDF", "เพิ่มเลขหน้าพร้อมกำหนดตำแหน่ง", "Add PDF Page Numbers", "Add page numbers in a chosen position."],
      ["remove-pdf-metadata", "ลบ Metadata PDF", "ลบ author title และข้อมูลผู้สร้าง", "Remove PDF Metadata", "Remove author, title, and creator metadata."]
    ]
  },
  {
    id: "media", base: "/tools/media", title: { th: "เครื่องมือเสียงและวิดีโอ", en: "Audio and video tools" },
    description: { th: "แปลงเสียง วิดีโอ ดึงเสียง และลดขนาดวิดีโอใน browser", en: "Convert audio and video, extract sound, and reduce video size in the browser." },
    tools: [
      ["mp3-to-wav", "MP3 เป็น WAV", "สร้าง WAV สำหรับงานตัดต่อ", "MP3 to WAV", "Create WAV audio for editing workflows."],
      ["wav-to-mp3", "WAV เป็น MP3", "ลดขนาดเสียงสำหรับแชร์", "WAV to MP3", "Reduce audio size for sharing."],
      ["m4a-to-mp3", "M4A เป็น MP3", "แปลง M4A ให้ใช้กับโปรแกรมทั่วไป", "M4A to MP3", "Convert M4A for widely supported playback."],
      ["mp4-to-mp3", "MP4 เป็น MP3", "ดึงเสียงจากวิดีโอ MP4", "MP4 to MP3", "Extract MP3 audio from an MP4 video."],
      ["extract-audio-from-video", "ดึงเสียงจากวิดีโอ", "สร้าง MP3 จาก MP4 MOV WebM หรือ MKV", "Extract Audio from Video", "Create MP3 from MP4, MOV, WebM, or MKV."],
      ["mp4-to-webm", "MP4 เป็น WebM", "แปลงวิดีโอสำหรับเว็บไซต์", "MP4 to WebM", "Convert video for modern websites."],
      ["webm-to-mp4", "WebM เป็น MP4", "สร้าง MP4 ที่รองรับกว้างขึ้น", "WebM to MP4", "Create a more widely compatible MP4."],
      ["mov-to-mp4", "MOV เป็น MP4", "แปลงวิดีโอ iPhone และกล้อง", "MOV to MP4", "Convert iPhone and camera MOV video."],
      ["compress-video", "บีบอัดวิดีโอ", "ลดขนาด MP4 MOV และ WebM", "Compress Video", "Reduce MP4, MOV, and WebM file size."]
    ]
  },
  {
    id: "document", base: "/tools/document", title: { th: "เครื่องมือเอกสาร", en: "Document tools" },
    description: { th: "แปลง DOCX ดึงข้อความจาก PDF และทำ OCR เอกสาร", en: "Convert DOCX, extract PDF text, and run document OCR." },
    tools: [
      ["docx-to-pdf", "DOCX เป็น PDF", "แปลง Word เป็น PDF พร้อมตั้งค่าหน้า", "DOCX to PDF", "Convert Word to PDF with page controls."],
      ["docx-to-html", "DOCX เป็น HTML", "สร้าง semantic HTML ที่สะอาด", "DOCX to HTML", "Create clean semantic HTML from Word."],
      ["docx-to-markdown", "DOCX เป็น Markdown", "รักษา heading list link และ table", "DOCX to Markdown", "Preserve headings, lists, links, and tables."],
      ["docx-to-text", "DOCX เป็นข้อความ", "ดึงข้อความล้วนจาก Word", "DOCX to Text", "Extract plain text from Word."],
      ["pdf-to-text", "PDF เป็นข้อความ", "ดึงข้อความตามช่วงหน้า", "PDF to Text", "Extract text from selected PDF pages."],
      ["pdf-to-word", "PDF เป็น Word", "สร้าง DOCX จากข้อความที่เลือกได้", "PDF to Word", "Create DOCX from selectable PDF text."],
      ["ocr", "OCR เอกสาร", "อ่านข้อความจาก PDF scan JPG และ PNG", "Document OCR", "Recognize text in scanned PDF, JPG, and PNG."]
    ]
  },
  {
    id: "ai", base: "/tools/ai", title: { th: "เครื่องมือ AI Context", en: "AI context tools" },
    description: { th: "นับ token ทำความสะอาด context แบ่ง RAG chunk และจัด prompt", en: "Count tokens, clean context, plan RAG chunks, and package prompts." },
    tools: [
      ["token-counter", "Token Counter", "นับ token คำ ตัวอักษร และ context usage", "Token Counter", "Count tokens, words, characters, and context use."],
      ["pdf-to-ai-markdown", "PDF เป็น AI Markdown", "เตรียม PDF สำหรับ AI และ RAG", "PDF to AI Markdown", "Prepare PDF content for AI and RAG."],
      ["context-optimizer", "Context Optimizer", "ลบข้อความซ้ำและ token ที่ไม่จำเป็น", "Context Optimizer", "Remove repeated text and unnecessary tokens."],
      ["rag-chunk-calculator", "RAG Chunk Calculator", "ทดลองขนาด chunk และ overlap", "RAG Chunk Calculator", "Preview chunk size and overlap."],
      ["prompt-packager", "Prompt Packager", "รวมหลายไฟล์เป็น context ที่มีขอบเขต", "Prompt Packager", "Combine files into clearly bounded context."]
    ]
  },
  {
    id: "spreadsheet", base: "/tools/spreadsheet", title: { th: "เครื่องมือ Spreadsheet", en: "Spreadsheet tools" },
    description: { th: "แปลง ทำความสะอาด รวม และแบ่ง CSV JSON และ XLSX", en: "Convert, clean, merge, and split CSV, JSON, and XLSX data." },
    tools: [
      ["csv-to-json", "CSV เป็น JSON", "เตรียมข้อมูลตารางสำหรับ API", "CSV to JSON", "Prepare tabular data for APIs."],
      ["json-to-csv", "JSON เป็น CSV", "นำ JSON ไปใช้ใน spreadsheet", "JSON to CSV", "Move JSON data into spreadsheets."],
      ["csv-cleaner", "ทำความสะอาด CSV", "ลบแถวว่าง ช่องว่าง และข้อมูลซ้ำ", "CSV Cleaner", "Remove empty rows, whitespace, and duplicates."],
      ["merge-csv", "รวม CSV", "รวมหลายไฟล์โดยจับคู่ column", "Merge CSV", "Combine files by matching columns."],
      ["split-csv", "แบ่ง CSV", "แบ่งไฟล์ใหญ่ตามจำนวนแถว", "Split CSV", "Divide large files by row count."],
      ["csv-to-xlsx", "CSV เป็น XLSX", "สร้าง workbook สำหรับ Excel", "CSV to XLSX", "Create an Excel workbook from CSV."],
      ["xlsx-to-csv", "XLSX เป็น CSV", "ส่งออก worksheet เป็น CSV", "XLSX to CSV", "Export an Excel worksheet as CSV."]
    ]
  }
];

export function getToolDirectory(language) {
  const en = language === "en";
  return categoryData.map((category) => ({
    id: category.id,
    title: category.title[language],
    description: category.description[language],
    href: `${category.base}/${en ? "en/" : ""}`,
    tools: category.tools.map(([slug, thTitle, thDescription, enTitle, enDescription]) => ({
      slug,
      title: en ? enTitle : thTitle,
      description: en ? enDescription : thDescription,
      href: slug
        ? `${category.base}/${slug}/${en ? "en/" : ""}`
        : `${category.base}/${en ? "en/" : ""}`
    }))
  }));
}
