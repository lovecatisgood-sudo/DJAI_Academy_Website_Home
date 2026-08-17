import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectDir, "public");
const origin = "https://www.djai.academy";
const basePath = "/tools/media";

export const tools = {
  "mp3-to-wav": { input: ".mp3,audio/mpeg", output: "wav", th: ["แปลง MP3 เป็น WAV ฟรี ออนไลน์", "แปลง MP3 เป็น WAV ฟรี", "แปลงไฟล์ MP3 เป็น WAV ฟรีใน browser เหมาะกับงานตัดต่อ เสียงคุณภาพสูง และโปรแกรมที่ต้องการ WAV"], en: ["Convert MP3 to WAV Free Online", "Convert MP3 to WAV for free", "Convert MP3 audio to WAV free in your browser for editing, lossless workflows, and software that requires WAV."] },
  "wav-to-mp3": { input: ".wav,audio/wav", output: "mp3", th: ["แปลง WAV เป็น MP3 ฟรี ออนไลน์", "แปลง WAV เป็น MP3 ฟรี", "แปลง WAV เป็น MP3 ฟรี พร้อมเลือก bitrate เพื่อลดขนาดไฟล์สำหรับแชร์ ฟัง และ upload"], en: ["Convert WAV to MP3 Free Online", "Convert WAV to MP3 for free", "Convert WAV audio to MP3 free with a selectable bitrate for smaller files, sharing, and uploads."] },
  "m4a-to-mp3": { input: ".m4a,audio/mp4,audio/x-m4a", output: "mp3", th: ["แปลง M4A เป็น MP3 ฟรี ออนไลน์", "แปลง M4A เป็น MP3 ฟรี", "แปลงไฟล์เสียง M4A เป็น MP3 ฟรีใน browser เพื่อใช้กับเครื่องเล่นและโปรแกรมที่รองรับ MP3"], en: ["Convert M4A to MP3 Free Online", "Convert M4A to MP3 for free", "Convert M4A audio to MP3 free in your browser for players, editors, and software that supports MP3."] },
  "mp4-to-mp3": { input: ".mp4,video/mp4", output: "mp3", th: ["แปลง MP4 เป็น MP3 ฟรี ดึงเสียงจากวิดีโอ", "แปลง MP4 เป็น MP3 ฟรี", "ดึงเสียงจากวิดีโอ MP4 แล้วแปลงเป็น MP3 ฟรีใน browser พร้อมเลือก bitrate"], en: ["Convert MP4 to MP3 Free and Extract Audio", "Convert MP4 to MP3 for free", "Extract audio from an MP4 video and convert it to MP3 free in your browser with a selectable bitrate."] },
  "extract-audio-from-video": { input: "video/*,.mp4,.mov,.webm,.mkv", output: "mp3", th: ["ดึงเสียงจากวิดีโอเป็น MP3 ฟรี", "ดึงเสียงจากวิดีโอฟรี", "ดึง audio จากไฟล์ MP4 MOV WebM หรือ MKV แล้วดาวน์โหลดเป็น MP3 ฟรีโดยไม่ upload วิดีโอ"], en: ["Extract Audio from Video to MP3 Free", "Extract audio from a video for free", "Extract audio from MP4, MOV, WebM, or MKV video and download MP3 without uploading the video."] },
  "mp4-to-webm": { input: ".mp4,video/mp4", output: "webm", th: ["แปลง MP4 เป็น WebM ฟรี ออนไลน์", "แปลง MP4 เป็น WebM ฟรี", "แปลงวิดีโอ MP4 เป็น WebM ฟรีใน browser สำหรับเว็บไซต์และ browser สมัยใหม่"], en: ["Convert MP4 to WebM Free Online", "Convert MP4 to WebM for free", "Convert MP4 video to WebM free in your browser for websites and modern browsers."] },
  "webm-to-mp4": { input: ".webm,video/webm", output: "mp4", th: ["แปลง WebM เป็น MP4 ฟรี ออนไลน์", "แปลง WebM เป็น MP4 ฟรี", "แปลงวิดีโอ WebM เป็น MP4 ฟรีเพื่อความเข้ากันได้กับอุปกรณ์ แอป และ social platform"], en: ["Convert WebM to MP4 Free Online", "Convert WebM to MP4 for free", "Convert WebM video to MP4 free for compatibility with devices, apps, and social platforms."] },
  "mov-to-mp4": { input: ".mov,video/quicktime", output: "mp4", th: ["แปลง MOV เป็น MP4 ฟรี ออนไลน์", "แปลง MOV เป็น MP4 ฟรี", "แปลงวิดีโอ MOV จาก iPhone หรือกล้องเป็น MP4 ฟรีใน browser สำหรับแชร์และ upload"], en: ["Convert MOV to MP4 Free Online", "Convert MOV to MP4 for free", "Convert MOV video from an iPhone or camera to MP4 free in your browser for sharing and uploads."] },
  "compress-video": { input: "video/*,.mp4,.mov,.webm", output: "mp4", compress: true, th: ["บีบอัดวิดีโอ MP4 MOV WebM ฟรี", "บีบอัดและลดขนาดวิดีโอฟรี", "ลดขนาดไฟล์วิดีโอ MP4 MOV หรือ WebM ฟรีใน browser พร้อมเลือกระดับการบีบอัด"], en: ["Compress MP4 MOV WebM Video Free Online", "Compress and reduce video size for free", "Reduce MP4, MOV, or WebM video file size free in your browser with selectable compression levels."] }
};

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const href = (slug, lang) => `${basePath}/${slug}/${lang === "th" ? "" : `${lang}/`}`;

const vietnameseMediaNames = {
  "mp3-to-wav": "Chuyển MP3 sang WAV", "wav-to-mp3": "Chuyển WAV sang MP3", "m4a-to-mp3": "Chuyển M4A sang MP3", "mp4-to-mp3": "Chuyển MP4 sang MP3", "extract-audio-from-video": "Tách âm thanh từ video", "mp4-to-webm": "Chuyển MP4 sang WebM", "webm-to-mp4": "Chuyển WebM sang MP4", "mov-to-mp4": "Chuyển MOV sang MP4", "compress-video": "Nén và giảm dung lượng video"
};
for (const [slug, config] of Object.entries(tools)) {
  const name = vietnameseMediaNames[slug];
  config.vi = [`${name} miễn phí, không cần đăng ký`, `${name} miễn phí`, `${name} ngay trong trình duyệt. File không bị upload, không cần đăng ký và kết quả không có watermark.`];
}

function translateVietnameseHtml(html) {
  const replacements = [
    ["All tools", "Tất cả công cụ"], ["Community", "Cộng đồng"], ["PRIVATE BROWSER PROCESSING", "XỬ LÝ RIÊNG TƯ TRONG TRÌNH DUYỆT"], ["FREE CONVERTER", "CÔNG CỤ CHUYỂN ĐỔI MIỄN PHÍ"], ["Your file stays on this device. The conversion engine downloads once when you start.", "File vẫn ở trên thiết bị. Bộ máy chuyển đổi được tải khi bạn bắt đầu."], ["Maximum recommended file size: 500 MB", "Dung lượng khuyến nghị tối đa: 500 MB"], ["Large videos need sufficient free memory and may take several minutes", "Video lớn cần đủ bộ nhớ trống và có thể mất vài phút"], ["Codec support varies; an unsupported source will show an error", "Khả năng hỗ trợ codec khác nhau; hệ thống sẽ báo lỗi nếu nguồn không được hỗ trợ"], ["Choose a media file", "Chọn file media"], ["Accepted input:", "Đầu vào hỗ trợ:"], ["Output quality", "Chất lượng đầu ra"], ["High quality", "Chất lượng cao"], ["Balanced", "Cân bằng"], ["Smaller file", "File nhỏ hơn"], ["Select a file to begin.", "Chọn file để bắt đầu."], ["Download converted file", "Tải file đã chuyển đổi"], ["MOBILE DOCUMENT APP", "ỨNG DỤNG TÀI LIỆU DI ĐỘNG"], ["Scan, sign PDFs, and generate QR codes on mobile", "Quét, ký PDF và tạo mã QR trên điện thoại"], ["View the app", "Xem ứng dụng"], ["How it works", "Cách sử dụng"], ["Privacy and limitations", "Quyền riêng tư và giới hạn"], ["MEDIA WORKFLOWS", "QUY TRÌNH MEDIA"], ["Continue with another audio or video task", "Tiếp tục với công việc âm thanh hoặc video khác"], ["Audio tools", "Công cụ âm thanh"], ["VIDEO WORKFLOWS", "QUY TRÌNH VIDEO"], ["Continue with another video task", "Tiếp tục với công việc video khác"], ["Common questions", "Câu hỏi thường gặp"], ["BUILD WITH DJAI", "XÂY CÙNG DJAI"], ["Want to build a tool like this one?", "Bạn muốn tự xây một công cụ như thế này?"], ["Join the Academy", "Tham gia Academy"], ["Processing uses FFmpeg WebAssembly locally. The video is not uploaded by this tool. Closing or refreshing the page clears the working file. Speed depends on the browser, device memory, source codec, duration, and resolution, and tools that re-encode are not lossless.", "Công cụ dùng FFmpeg WebAssembly để xử lý cục bộ. Video không được tải lên; đóng hoặc tải lại trang sẽ xóa tệp làm việc. Tốc độ phụ thuộc vào trình duyệt, bộ nhớ, codec, thời lượng và độ phân giải. Mã hóa lại có thể làm thay đổi chất lượng."], ["This tool runs entirely in the browser. The Academy teaches the same approach step by step.", "Công cụ chạy hoàn toàn trong trình duyệt. Academy hướng dẫn cách xây quy trình tương tự theo từng bước."], ["Each tool keeps the controls that matter for one job, and every file stays on your device.", "Mỗi công cụ chỉ giữ những điều khiển cần thiết cho một tác vụ, và tệp vẫn ở trên thiết bị của bạn."], ["Open a focused converter for each input, output, extraction, or compression workflow.", "Mở đúng công cụ cho từng đầu vào, đầu ra, tác vụ tách âm thanh hoặc nén tệp."]
  ];
  let output = html;
  for (const [from, to] of replacements) output = output.replaceAll(from, to);
  return output;
}

function addVietnameseAlternate(html, canonicalPath) {
  return html.replace(
    '<link rel="alternate" hreflang="x-default"',
    `<link rel="alternate" hreflang="vi" href="${origin}${canonicalPath}"><link rel="alternate" hreflang="x-default"`,
  );
}

function vietnamesePage(html, canonicalPath) {
  return addVietnameseAlternate(translateVietnameseHtml(html), canonicalPath)
    .replaceAll('href="/en/"', 'href="/vi/"')
    .replaceAll('href="/tools/en/"', 'href="/tools/vi/"')
    .replaceAll('href="/academy/en/"', 'href="/academy/vi/"')
    .replaceAll(`${origin}/tools/en/`, `${origin}/tools/vi/`)
    .replaceAll(`${origin}${basePath}/en/`, `${origin}${basePath}/vi/`)
    .replaceAll('"name":"Free tools"', '"name":"Công cụ miễn phí"')
    .replaceAll('"name":"Audio and video tools"', '"name":"Công cụ âm thanh và video"')
    .replace(/<a href="([^"]+)" hreflang="th">ไทย<\/a>/, (match) => `${match}<a href="${canonicalPath.replace(/vi\/$/, "en/")}" hreflang="en">EN</a>`);
}

function categoryLinksFor(lang) {
  const categories = lang === "vi" ? [
    ["Tất cả công cụ", "/tools/vi/", "Duyệt mọi công cụ DJAI theo công việc."], ["Công cụ QR", "/tools/qrgen/vi/", "Tạo QR cho URL, Wi-Fi và liên hệ."], ["Công cụ hình ảnh", "/tools/resizeimg/vi/", "Chuyển đổi, resize, nén và xóa nền."], ["Công cụ PDF", "/tools/PDFTools/vi/", "Ghép, tách, chuyển đổi và bảo vệ PDF."], ["Công cụ tài liệu", "/tools/document/vi/", "Chuyển DOCX, trích xuất văn bản và OCR."], ["Công cụ AI", "/tools/ai/vi/", "Đếm token, chia RAG chunk và chuẩn bị context."], ["Công cụ bảng tính", "/tools/spreadsheet/vi/", "Chuyển đổi và xử lý CSV, JSON, XLSX."]
  ] : lang === "en" ? [
    ["All free tools", "/tools/en/", "Browse every free DJAI tool by task."], ["QR code tools", "/tools/qrgen/en/", "Create QR codes for links, Wi-Fi, and contacts."], ["Image tools", "/tools/resizeimg/en/", "Convert, resize, compress, and remove backgrounds."], ["PDF tools", "/tools/PDFTools/en/", "Merge, split, convert, organize, and protect PDFs."], ["Document tools", "/tools/document/en/", "Convert DOCX, extract text, and run OCR."], ["AI context tools", "/tools/ai/en/", "Count tokens, clean context, and plan RAG chunks."], ["Spreadsheet tools", "/tools/spreadsheet/en/", "Convert and process CSV, JSON, and XLSX."]
  ] : [
    ["เครื่องมือทั้งหมด", "/tools/", "รวมเครื่องมือฟรีทุกหมวดจาก DJAI"], ["เครื่องมือ QR Code", "/tools/qrgen/", "สร้าง QR สำหรับลิงก์ Wi-Fi และผู้ติดต่อ"], ["เครื่องมือรูปภาพ", "/tools/resizeimg/", "แปลง resize บีบอัด และลบพื้นหลัง"], ["เครื่องมือ PDF", "/tools/PDFTools/", "รวม แยก แปลง จัดหน้า และป้องกัน PDF"], ["เครื่องมือเอกสาร", "/tools/document/", "แปลง DOCX ดึงข้อความ และ OCR"], ["เครื่องมือ AI", "/tools/ai/", "นับ token ทำความสะอาด context และแบ่ง RAG chunk"], ["เครื่องมือ Spreadsheet", "/tools/spreadsheet/", "แปลงและจัดการ CSV JSON และ XLSX"]
  ];
  return categories.map(([label, categoryHref, text]) => `<a href="${categoryHref}"><strong>${label}</strong><span>${text}</span></a>`).join("");
}

function render(slug, config, lang, pagePath, pageCopy) {
  const [title, h1, description] = pageCopy || config[lang];
  const canonicalPath = pagePath || href(slug, lang);
  const canonical = `${origin}${canonicalPath}`;
  const other = pagePath ? `${basePath}/${lang === "en" ? "" : "en/"}` : href(slug, lang === "en" ? "th" : "en");
  const thaiAlternate = pagePath ? `${basePath}/` : href(slug, "th");
  const englishAlternate = pagePath ? `${basePath}/en/` : href(slug, "en");
  const isEn = lang !== "th";
  const taskLinks = Object.entries(tools).map(([itemSlug, item]) => `<a href="${href(itemSlug, lang)}"${itemSlug === slug ? ' aria-current="page"' : ""}>${escapeHtml(item[lang][1])}</a>`).join("");
  const relatedLinks = Object.entries(tools).filter(([itemSlug]) => pagePath || itemSlug !== slug).map(([itemSlug, item]) => `<a href="${href(itemSlug, lang)}"><strong>${escapeHtml(item[lang][1])}</strong><span>${escapeHtml(item[lang][2])}</span></a>`).join("");
  const categoryLinks = categoryLinksFor(lang);
  const discovery = `<nav class="tool-discovery-footer" aria-labelledby="tool-discovery-${lang}" data-tool-discovery><div class="discovery-heading"><p class="eyebrow">${isEn ? "MEDIA WORKFLOWS" : "เครื่องมือเสียงและวิดีโอ"}</p><h2 id="tool-discovery-${lang}">${isEn ? "Continue with another audio or video task" : "ทำงานเสียงหรือวิดีโอต่อด้วยเครื่องมือที่ตรงงาน"}</h2><p>${isEn ? "Open a focused converter for each input, output, extraction, or compression workflow." : "เลือก converter ที่ตรงกับไฟล์ต้นฉบับ ผลลัพธ์ การดึงเสียง หรือการลดขนาดวิดีโอ"}</p></div><div class="discovery-links">${relatedLinks}</div><div class="category-links">${categoryLinks}</div></nav>`;
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: h1, url: canonical, applicationCategory: "MultimediaApplication", operatingSystem: "Web browser", description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: `${origin}/` } };
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | DJAI Media Tools</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="th" href="${origin}${thaiAlternate}"><link rel="alternate" hreflang="en" href="${origin}${englishAlternate}"><link rel="alternate" hreflang="x-default" href="${origin}${thaiAlternate}"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta name="google-adsense-account" content="ca-pub-3624708289866566"><link rel="stylesheet" href="${basePath}/styles.css"><script type="application/ld+json">${JSON.stringify(schema)}</script><script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3624708289866566"></script></head><body data-tool="${slug}" data-output="${config.output}" data-compress="${config.compress ? "true" : "false"}"><header><a class="brand" href="${isEn ? "/en/" : "/"}">DJAI <span>Media Tools</span></a><nav><a href="${isEn ? "/tools/en/" : "/tools/"}">${isEn ? "All tools" : "เครื่องมือทั้งหมด"}</a><a href="${other}" hreflang="${isEn ? "th" : "en"}">${isEn ? "ไทย" : "EN"}</a><a class="community" href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Community" : "ชุมชน"}</a></nav></header><main><section class="hero"><p class="eyebrow">${isEn ? "PRIVATE BROWSER PROCESSING" : "ประมวลผลใน BROWSER"}</p><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(description)}</p></section><nav class="task-links" aria-label="${isEn ? "Media conversion tools" : "เครื่องมือแปลงไฟล์มีเดีย"}">${taskLinks}</nav><section class="tool" aria-labelledby="tool-title"><div class="tool-copy"><p class="eyebrow">${isEn ? "FREE CONVERTER" : "เครื่องมือฟรี"}</p><h2 id="tool-title">${escapeHtml(config[lang][1])}</h2><p>${isEn ? "Your file stays on this device. The conversion engine downloads once when you start." : "ไฟล์อยู่ในอุปกรณ์ของคุณ ระบบจะดาวน์โหลด conversion engine เมื่อเริ่มใช้งานครั้งแรก"}</p><ul><li>${isEn ? "Maximum recommended file size: 500 MB" : "ขนาดไฟล์ที่แนะนำไม่เกิน 500 MB"}</li><li>${isEn ? "Large videos need sufficient free memory and may take several minutes" : "วิดีโอขนาดใหญ่ต้องใช้หน่วยความจำและอาจใช้เวลาหลายนาที"}</li><li>${isEn ? "Codec support varies; an unsupported source will show an error" : "การรองรับ codec อาจต่างกัน ระบบจะแจ้งเมื่ออ่านต้นฉบับไม่ได้"}</li></ul></div><div class="converter"><label class="drop" for="media-input"><strong>${isEn ? "Choose a media file" : "เลือกไฟล์มีเดีย"}</strong><span>${isEn ? `Accepted input: ${config.input.split(",")[0]}` : `ไฟล์ที่รองรับ: ${config.input.split(",")[0]}`}</span></label><input id="media-input" type="file" accept="${config.input}" hidden><div id="file-info" class="file-info" hidden></div><label>${isEn ? "Output quality" : "คุณภาพผลลัพธ์"}<select id="quality"><option value="high">${isEn ? "High quality" : "คุณภาพสูง"}</option><option value="balanced" selected>${isEn ? "Balanced" : "สมดุล"}</option><option value="small">${isEn ? "Smaller file" : "ไฟล์เล็ก"}</option></select></label><button id="convert" type="button" disabled>${isEn ? `Convert to ${config.output.toUpperCase()}` : `แปลงเป็น ${config.output.toUpperCase()}`}</button><progress id="progress" max="1" value="0" hidden></progress><p id="status" role="status">${isEn ? "Select a file to begin." : "เลือกไฟล์เพื่อเริ่มต้น"}</p><a id="download" class="download" hidden>${isEn ? "Download converted file" : "ดาวน์โหลดไฟล์ที่แปลงแล้ว"}</a></div></section><section class="app-callout"><div><p class="eyebrow">${isEn ? "MOBILE DOCUMENT APP" : "แอปเอกสารบนมือถือ"}</p><h2>${isEn ? "Scan, sign PDFs, and generate QR codes on mobile" : "สแกน เซ็น PDF และสร้าง QR Code บนมือถือ"}</h2><p>${isEn ? "Discover the advanced Cam PDF Scan, Signer & QR Generator app." : "ดูความสามารถขั้นสูงของแอป Cam PDF Scan, Signer & QR Generator"}</p></div><a href="/Cam_PDF_Scan_Signer_QR-Gen/">${isEn ? "View the app" : "ดูแอป"}</a></section><section class="details"><div><h2>${isEn ? "How it works" : "วิธีใช้งาน"}</h2><ol><li>${isEn ? "Choose a supported local file." : "เลือกไฟล์ต้นฉบับจากอุปกรณ์"}</li><li>${isEn ? "Choose quality and start conversion." : "เลือกคุณภาพแล้วเริ่มแปลง"}</li><li>${isEn ? "Review the size and download the result." : "ตรวจขนาดและดาวน์โหลดผลลัพธ์"}</li></ol></div><div><h2>${isEn ? "Privacy and limitations" : "ความเป็นส่วนตัวและข้อจำกัด"}</h2><p>${isEn ? "Processing uses FFmpeg WebAssembly locally. Files are not uploaded by this tool. Closing or refreshing the page clears the working file. Performance depends on the browser, device memory, source codec, duration, and resolution." : "เครื่องมือใช้ FFmpeg WebAssembly ประมวลผลในอุปกรณ์และไม่ upload ไฟล์ การปิดหรือ refresh หน้าจะล้างไฟล์ทำงาน ความเร็วขึ้นอยู่กับ browser หน่วยความจำ codec ระยะเวลา และความละเอียด"}</p></div></section>${discovery}</main><footer><span>DJAI Academy</span><a href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Join the Academy" : "เข้าสู่ Academy"}</a></footer><script type="module" src="${basePath}/app.js"></script></body></html>`;
}

export const videoTools = JSON.parse(readFileSync(join(projectDir, "src", "video-tools-config.json"), "utf8"));

const vietnameseVideoNames = {
  "video-converter": "Chuyển đổi video", "mkv-to-mp4": "Chuyển MKV sang MP4", "avi-to-mp4": "Chuyển AVI sang MP4", "mp4-to-mov": "Chuyển MP4 sang MOV", "video-cutter": "Cắt video", "video-cropper": "Cắt khung hình video", "video-resizer": "Đổi kích thước video", "video-merger": "Ghép video", "compress-video-to-10mb": "Nén video xuống khoảng 10 MB", "compress-video-to-25mb": "Nén video xuống khoảng 25 MB", "compress-video-to-50mb": "Nén video xuống khoảng 50 MB", "compress-video-to-100mb": "Nén video xuống khoảng 100 MB", "video-to-gif": "Chuyển video sang GIF", "gif-to-mp4": "Chuyển GIF sang MP4", "remove-audio-from-video": "Xóa âm thanh khỏi video", "add-audio-to-video": "Thêm âm thanh vào video", "video-speed-changer": "Thay đổi tốc độ video", "extract-frames-from-video": "Trích xuất khung hình từ video", "rotate-video": "Xoay video"
};
for (const config of videoTools) {
  const label = vietnameseVideoNames[config.slug];
  config.vi = {
    primary: label,
    title: `${label} online miễn phí, không cần đăng ký | DJAI`,
    meta: `${label} ngay trong trình duyệt. Video không bị upload, không cần tài khoản và không watermark.`,
    h1: `${label} mà không gửi video lên máy chủ`,
    hero: "Chọn video từ thiết bị, dùng đúng điều khiển cho công việc rồi xử lý cục bộ. File làm việc không rời khỏi trình duyệt.",
    ui: label,
    why: "Một công cụ tập trung vào đúng công việc cần hoàn thành",
    note: "Khả năng xử lý phụ thuộc vào codec, thời lượng, độ phân giải và bộ nhớ của thiết bị. Hãy kiểm tra kết quả trước khi xóa file nguồn.",
    keywords: [label.toLowerCase(), `${label.toLowerCase()} miễn phí`, "công cụ video không cần đăng ký"],
    faq: [
      { q: "Video có bị upload lên DJAI không?", a: "Không. File nguồn được đọc và xử lý trong trình duyệt trên thiết bị." },
      { q: "Công cụ có miễn phí và không watermark không?", a: "Có. Xử lý cốt lõi miễn phí, không cần tài khoản và không thêm watermark." },
      { q: "Tại sao lần chạy đầu có thể chậm?", a: "Trình duyệt cần tải FFmpeg WebAssembly core trước khi xử lý; những lần sau có thể nhanh hơn nhờ cache." }
    ]
  };
}

function renderVideo(config, lang) {
  const copy = config[lang];
  const isEn = lang !== "th";
  const canonicalPath = href(config.slug, lang);
  const canonical = `${origin}${canonicalPath}`;
  const thaiAlternate = href(config.slug, "th");
  const englishAlternate = href(config.slug, "en");
  const other = href(config.slug, isEn ? "th" : "en");
  const taskLinks = videoTools.map((item) => `<a href="${href(item.slug, lang)}"${item.slug === config.slug ? ' aria-current="page"' : ""}>${escapeHtml(item[lang].ui)}</a>`).join("");
  const relatedLinks = videoTools.filter((item) => item.slug !== config.slug).map((item) => `<a href="${href(item.slug, lang)}"><strong>${escapeHtml(item[lang].ui)}</strong><span>${escapeHtml(item[lang].why)}</span></a>`).join("");
  const audioLinks = Object.entries(tools).map(([itemSlug, item]) => `<a href="${href(itemSlug, lang)}"><strong>${escapeHtml(item[lang][1])}</strong><span>${escapeHtml(item[lang][2])}</span></a>`).join("");
  const discovery = `<nav class="tool-discovery-footer" aria-labelledby="tool-discovery-${lang}" data-tool-discovery><div class="discovery-heading"><p class="eyebrow">${isEn ? "VIDEO WORKFLOWS" : "งานวิดีโอ"}</p><h2 id="tool-discovery-${lang}">${isEn ? "Continue with another video task" : "ทำงานวิดีโอต่อด้วยเครื่องมือที่ตรงงาน"}</h2><p>${isEn ? "Each tool keeps the controls that matter for one job, and every file stays on your device." : "แต่ละเครื่องมือเก็บ control ที่จำเป็นของงานนั้นไว้ และไฟล์ยังอยู่บนอุปกรณ์ของคุณ"}</p></div><div class="discovery-links">${relatedLinks}</div><div class="discovery-heading" style="margin-top:34px"><h2>${isEn ? "Audio tools" : "เครื่องมือเสียง"}</h2></div><div class="discovery-links">${audioLinks}</div><div class="category-links">${categoryLinksFor(lang)}</div></nav>`;
  const faqHTML = copy.faq.map((item) => `<div class="faq-item"><h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p></div>`).join("");
  const schemas = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: copy.h1, url: canonical, applicationCategory: "MultimediaApplication", operatingSystem: "Web browser", description: copy.meta, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: `${origin}/` } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Free tools" : "เครื่องมือฟรี", item: `${origin}${isEn ? "/tools/en/" : "/tools/"}` },
      { "@type": "ListItem", position: 2, name: isEn ? "Audio and video tools" : "เครื่องมือเสียงและวิดีโอ", item: `${origin}${basePath}/${isEn ? "en/" : ""}` },
      { "@type": "ListItem", position: 3, name: copy.ui, item: canonical }
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];
  const toolConfig = { slug: config.slug, mode: config.mode, fixedOutput: config.fixedOutput, fixedInput: config.fixedInput, targetMB: config.targetMB, uiTitle: copy.ui };
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(copy.title)}</title><meta name="description" content="${escapeHtml(copy.meta)}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="th" href="${origin}${thaiAlternate}"><link rel="alternate" hreflang="en" href="${origin}${englishAlternate}"><link rel="alternate" hreflang="x-default" href="${origin}${thaiAlternate}"><meta property="og:title" content="${escapeHtml(copy.title)}"><meta property="og:description" content="${escapeHtml(copy.meta)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta name="google-adsense-account" content="ca-pub-3624708289866566"><link rel="stylesheet" href="${basePath}/styles.css"><link rel="stylesheet" href="${basePath}/video-tools.css">${schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("")}<script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3624708289866566"></script></head><body data-tool="${config.slug}" data-mode="${config.mode}"><header><a class="brand" href="${isEn ? "/en/" : "/"}">DJAI <span>Media Tools</span></a><nav><a href="${isEn ? "/tools/en/" : "/tools/"}">${isEn ? "All tools" : "เครื่องมือทั้งหมด"}</a><a href="${other}" hreflang="${isEn ? "th" : "en"}">${isEn ? "ไทย" : "EN"}</a><a class="community" href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Community" : "ชุมชน"}</a></nav></header><main><section class="hero"><p class="eyebrow">${isEn ? "PRIVATE BROWSER PROCESSING" : "ประมวลผลใน BROWSER"}</p><h1>${escapeHtml(copy.h1)}</h1><p>${escapeHtml(copy.hero)}</p></section><section class="video-tool" aria-labelledby="video-tool-title"><h2 id="video-tool-title">${escapeHtml(copy.ui)}</h2><div id="video-tool-app"></div><script id="tool-config" type="application/json">${JSON.stringify(toolConfig)}</script></section><nav class="task-links" aria-label="${isEn ? "Video tools" : "เครื่องมือวิดีโอ"}">${taskLinks}</nav><section class="details"><div><h2>${escapeHtml(copy.why)}</h2><p>${escapeHtml(copy.note)}</p></div><div><h2>${isEn ? "Privacy and limitations" : "ความเป็นส่วนตัวและข้อจำกัด"}</h2><p>${isEn ? "Processing uses FFmpeg WebAssembly locally. The video is not uploaded by this tool. Closing or refreshing the page clears the working file. Speed depends on the browser, device memory, source codec, duration, and resolution, and tools that re-encode are not lossless." : "เครื่องมือใช้ FFmpeg WebAssembly ประมวลผลในอุปกรณ์และไม่ upload วิดีโอ การปิดหรือ refresh หน้าจะล้างไฟล์ทำงาน ความเร็วขึ้นอยู่กับ browser หน่วยความจำ codec ระยะเวลา และความละเอียด และเครื่องมือที่ต้อง encode ใหม่จะไม่ใช่ lossless"}</p></div></section><section class="faq" aria-labelledby="faq-title"><h2 id="faq-title">${isEn ? "Common questions" : "คำถามที่พบบ่อย"}</h2><div class="faq-grid">${faqHTML}</div></section><section class="app-callout"><div><p class="eyebrow">${isEn ? "BUILD WITH DJAI" : "สร้างกับ DJAI"}</p><h2>${isEn ? "Want to build a tool like this one?" : "อยากสร้างเครื่องมือแบบนี้เองไหม?"}</h2><p>${isEn ? "This tool runs entirely in the browser. The Academy teaches the same approach step by step." : "เครื่องมือนี้ทำงานใน browser ทั้งหมด Academy สอนวิธีสร้างแบบเดียวกันทีละขั้น"}</p></div><a href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Join the Academy" : "เข้าสู่ Academy"}</a></section>${discovery}</main><footer><span>DJAI Academy</span><a href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Join the Academy" : "เข้าสู่ Academy"}</a></footer><script src="${basePath}/video-tools.js" defer></script></body></html>`;
}

rmSync(publicDir, { recursive: true, force: true });
mkdirSync(join(publicDir, "vendor", "ffmpeg"), { recursive: true });
mkdirSync(join(publicDir, "vendor", "util"), { recursive: true });
mkdirSync(join(publicDir, "vendor", "core"), { recursive: true });
cpSync(join(projectDir, "node_modules", "@ffmpeg", "ffmpeg", "dist", "esm"), join(publicDir, "vendor", "ffmpeg"), { recursive: true });
cpSync(join(projectDir, "node_modules", "@ffmpeg", "util", "dist", "esm"), join(publicDir, "vendor", "util"), { recursive: true });
cpSync(join(projectDir, "node_modules", "@ffmpeg", "core", "dist", "esm"), join(publicDir, "vendor", "core"), { recursive: true });
mkdirSync(join(publicDir, "vendor", "jszip"), { recursive: true });
cpSync(join(projectDir, "node_modules", "jszip", "dist", "jszip.min.js"), join(publicDir, "vendor", "jszip", "jszip.min.js"));
cpSync(join(projectDir, "node_modules", "jszip", "LICENSE.markdown"), join(publicDir, "vendor", "jszip", "LICENSE.markdown"));
cpSync(join(projectDir, "src", "app.js"), join(publicDir, "app.js"));
cpSync(join(projectDir, "src", "styles.css"), join(publicDir, "styles.css"));
cpSync(join(projectDir, "src", "video-tools.js"), join(publicDir, "video-tools.js"));
cpSync(join(projectDir, "src", "video-tools.css"), join(publicDir, "video-tools.css"));
for (const [slug, config] of Object.entries(tools)) for (const lang of ["th", "en", "vi"]) {
  const directory = join(publicDir, slug, ...(lang === "th" ? [] : [lang]));
  mkdirSync(directory, { recursive: true });
  const html = render(slug, config, lang);
  writeFileSync(join(directory, "index.html"), lang === "vi" ? vietnamesePage(html, href(slug, "vi")) : addVietnameseAlternate(html, href(slug, "vi")));
}
for (const config of videoTools) for (const lang of ["th", "en", "vi"]) {
  const directory = join(publicDir, config.slug, ...(lang === "th" ? [] : [lang]));
  mkdirSync(directory, { recursive: true });
  const html = renderVideo(config, lang);
  writeFileSync(join(directory, "index.html"), lang === "vi" ? vietnamesePage(html, href(config.slug, "vi")) : addVietnameseAlternate(html, href(config.slug, "vi")));
}
const first = Object.entries(tools)[0];
writeFileSync(join(publicDir, "index.html"), addVietnameseAlternate(render(first[0], first[1], "th", `${basePath}/`, ["แปลงไฟล์เสียงและวิดีโอฟรี ออนไลน์", "เครื่องมือแปลงไฟล์เสียงและวิดีโอฟรี", "แปลง MP3 WAV M4A MP4 MOV และ WebM ดึงเสียงหรือบีบอัดวิดีโอฟรีใน browser โดยไม่ upload ไฟล์"]), `${basePath}/vi/`));
mkdirSync(join(publicDir, "en"), { recursive: true });
writeFileSync(join(publicDir, "en", "index.html"), addVietnameseAlternate(render(first[0], first[1], "en", `${basePath}/en/`, ["Free Audio and Video Converter Online", "Free audio and video converter", "Convert MP3, WAV, M4A, MP4, MOV, and WebM, extract audio, or compress video free in your browser without uploading files."]), `${basePath}/vi/`));
mkdirSync(join(publicDir, "vi"), { recursive: true });
writeFileSync(join(publicDir, "vi", "index.html"), vietnamesePage(render(first[0], first[1], "vi", `${basePath}/vi/`, ["Công cụ chuyển đổi âm thanh và video miễn phí", "Công cụ âm thanh và video miễn phí", "Chuyển MP3, WAV, M4A, MP4, MOV, WebM, tách âm thanh hoặc nén video trong trình duyệt, không cần đăng ký và không upload file."]), `${basePath}/vi/`));
console.log(`Built ${(Object.keys(tools).length + videoTools.length) * 3 + 3} media-tool pages.`);
