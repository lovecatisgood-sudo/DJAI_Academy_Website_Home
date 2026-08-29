import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectDir, "public");
const origin = "https://www.djai.academy";
const basePath = "/tools/media";
const socialImage = `${origin}/social/djai-academy.webp`;

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
const href = (slug, lang) => `${basePath}/${slug}/${lang === "en" ? "en/" : ""}`;

function socialHead({ title, description, canonical, lang }) {
  const locale = lang === "en" ? "en_US" : "th_TH";
  const alternateLocale = lang === "en" ? "th_TH" : "en_US";
  const imageAlt = lang === "en" ? "DJAI Academy free browser tools" : "เครื่องมือฟรีบน browser จาก DJAI Academy";
  return `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="DJAI Academy"><meta property="og:locale" content="${locale}"><meta property="og:locale:alternate" content="${alternateLocale}"><meta property="og:image" content="${socialImage}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${imageAlt}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${socialImage}"><meta name="twitter:image:alt" content="${imageAlt}">`;
}

function enhanceHead(html, details) {
  return html.replace(
    /<meta property="og:title"[\s\S]*?(?=<meta name="google-adsense-account")/,
    socialHead(details)
  );
}

function categoryLinksFor(isEn) {
  const categories = isEn ? [
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
  const isEn = lang === "en";
  const taskLinks = [
    ...Object.entries(tools).map(([itemSlug, item]) => `<a href="${href(itemSlug, lang)}"${itemSlug === slug ? ' aria-current="page"' : ""}>${escapeHtml(item[lang][1])}</a>`),
    ...(pagePath ? videoTools.filter((item) => !tools[item.slug]).map((item) => `<a href="${href(item.slug, lang)}">${escapeHtml(item[lang].ui)}</a>`) : [])
  ].join("");
  const relatedLinks = [
    ...Object.entries(tools).filter(([itemSlug]) => pagePath || itemSlug !== slug).map(([itemSlug, item]) => `<a href="${href(itemSlug, lang)}"><strong>${escapeHtml(item[lang][1])}</strong><span>${escapeHtml(item[lang][2])}</span></a>`),
    ...(pagePath ? videoTools.filter((item) => !tools[item.slug]).map((item) => `<a href="${href(item.slug, lang)}"><strong>${escapeHtml(item[lang].ui)}</strong><span>${escapeHtml(item[lang].why)}</span></a>`) : [])
  ].join("");
  const categoryLinks = categoryLinksFor(isEn);
  const discovery = `<nav class="tool-discovery-footer" aria-labelledby="tool-discovery-${lang}" data-tool-discovery><div class="discovery-heading"><p class="eyebrow">${isEn ? "MEDIA WORKFLOWS" : "เครื่องมือเสียงและวิดีโอ"}</p><h2 id="tool-discovery-${lang}">${isEn ? "Continue with another audio or video task" : "ทำงานเสียงหรือวิดีโอต่อด้วยเครื่องมือที่ตรงงาน"}</h2><p>${isEn ? "Open a focused converter for each input, output, extraction, or compression workflow." : "เลือก converter ที่ตรงกับไฟล์ต้นฉบับ ผลลัพธ์ การดึงเสียง หรือการลดขนาดวิดีโอ"}</p></div><div class="discovery-links">${relatedLinks}</div><div class="category-links">${categoryLinks}</div></nav>`;
  const catalog = [
    ...Object.entries(tools),
    ...videoTools.filter((item) => !tools[item.slug]).map((item) => [item.slug, item])
  ];
  const schema = pagePath ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: h1,
    url: canonical,
    description,
    inLanguage: lang,
    publisher: { "@type": "Organization", name: "DJAI Academy", url: `${origin}/` },
    hasPart: catalog.map(([itemSlug, item]) => ({
      "@type": "SoftwareApplication",
      name: item[lang]?.ui || item[lang]?.[1],
      url: `${origin}${href(itemSlug, lang)}`,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    }))
  } : { "@context": "https://schema.org", "@type": "SoftwareApplication", name: h1, url: canonical, applicationCategory: "MultimediaApplication", operatingSystem: "Web browser", description, inLanguage: lang, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: `${origin}/` } };
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | DJAI Media Tools</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="th" href="${origin}${thaiAlternate}"><link rel="alternate" hreflang="en" href="${origin}${englishAlternate}"><link rel="alternate" hreflang="x-default" href="${origin}${thaiAlternate}"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta name="google-adsense-account" content="ca-pub-3624708289866566"><link rel="stylesheet" href="${basePath}/styles.css?v=20260808a"><script type="application/ld+json">${JSON.stringify(schema)}</script><script async src="https://www.googletagmanager.com/gtag/js?id=G-CGJ5BTR44T"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-CGJ5BTR44T",{anonymize_ip:true});</script><script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3624708289866566"></script></head><body data-tool="${slug}" data-output="${config.output}" data-compress="${config.compress ? "true" : "false"}"><header><a class="brand" href="${isEn ? "/en/" : "/"}">DJAI <span>Media Tools</span></a><nav><a href="${isEn ? "/tools/en/" : "/tools/"}">${isEn ? "All tools" : "เครื่องมือทั้งหมด"}</a><a href="${other}" hreflang="${isEn ? "th" : "en"}">${isEn ? "ไทย" : "EN"}</a><a class="community" href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Community" : "ชุมชน"}</a></nav></header><main><section class="hero"><p class="eyebrow">${isEn ? "PRIVATE BROWSER PROCESSING" : "ประมวลผลใน BROWSER"}</p><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(description)}</p></section><nav class="task-links" aria-label="${isEn ? "Media conversion tools" : "เครื่องมือแปลงไฟล์มีเดีย"}">${taskLinks}</nav><section class="tool" aria-labelledby="tool-title"><div class="tool-copy"><p class="eyebrow">${isEn ? "FREE CONVERTER" : "เครื่องมือฟรี"}</p><h2 id="tool-title">${escapeHtml(config[lang][1])}</h2><p>${isEn ? "Your file stays on this device. The conversion engine downloads once when you start." : "ไฟล์อยู่ในอุปกรณ์ของคุณ ระบบจะดาวน์โหลด conversion engine เมื่อเริ่มใช้งานครั้งแรก"}</p><ul><li>${isEn ? "Maximum recommended file size: 500 MB" : "ขนาดไฟล์ที่แนะนำไม่เกิน 500 MB"}</li><li>${isEn ? "Large videos need sufficient free memory and may take several minutes" : "วิดีโอขนาดใหญ่ต้องใช้หน่วยความจำและอาจใช้เวลาหลายนาที"}</li><li>${isEn ? "Codec support varies; an unsupported source will show an error" : "การรองรับ codec อาจต่างกัน ระบบจะแจ้งเมื่ออ่านต้นฉบับไม่ได้"}</li></ul></div><div class="converter"><label class="drop" for="media-input"><strong>${isEn ? "Choose a media file" : "เลือกไฟล์มีเดีย"}</strong><span>${isEn ? `Accepted input: ${config.input.split(",")[0]}` : `ไฟล์ที่รองรับ: ${config.input.split(",")[0]}`}</span></label><input id="media-input" type="file" accept="${config.input}" hidden><div id="file-info" class="file-info" hidden></div><label>${isEn ? "Output quality" : "คุณภาพผลลัพธ์"}<select id="quality"><option value="high">${isEn ? "High quality" : "คุณภาพสูง"}</option><option value="balanced" selected>${isEn ? "Balanced" : "สมดุล"}</option><option value="small">${isEn ? "Smaller file" : "ไฟล์เล็ก"}</option></select></label><button id="convert" type="button" disabled>${isEn ? `Convert to ${config.output.toUpperCase()}` : `แปลงเป็น ${config.output.toUpperCase()}`}</button><progress id="progress" max="1" value="0" hidden></progress><p id="status" role="status">${isEn ? "Select a file to begin." : "เลือกไฟล์เพื่อเริ่มต้น"}</p><a id="download" class="download" hidden>${isEn ? "Download converted file" : "ดาวน์โหลดไฟล์ที่แปลงแล้ว"}</a></div></section><section class="app-callout"><div><p class="eyebrow">${isEn ? "MOBILE DOCUMENT APP" : "แอปเอกสารบนมือถือ"}</p><h2>${isEn ? "Scan, sign PDFs, and generate QR codes on mobile" : "สแกน เซ็น PDF และสร้าง QR Code บนมือถือ"}</h2><p>${isEn ? "Discover the advanced Cam PDF Scan, Signer & QR Generator app." : "ดูความสามารถขั้นสูงของแอป Cam PDF Scan, Signer & QR Generator"}</p></div><a href="/Cam_PDF_Scan_Signer_QR-Gen/">${isEn ? "View the app" : "ดูแอป"}</a></section><section class="details"><div><h2>${isEn ? "How it works" : "วิธีใช้งาน"}</h2><ol><li>${isEn ? "Choose a supported local file." : "เลือกไฟล์ต้นฉบับจากอุปกรณ์"}</li><li>${isEn ? "Choose quality and start conversion." : "เลือกคุณภาพแล้วเริ่มแปลง"}</li><li>${isEn ? "Review the size and download the result." : "ตรวจขนาดและดาวน์โหลดผลลัพธ์"}</li></ol></div><div><h2>${isEn ? "Privacy and limitations" : "ความเป็นส่วนตัวและข้อจำกัด"}</h2><p>${isEn ? "Processing uses FFmpeg WebAssembly locally. Files are not uploaded by this tool. Closing or refreshing the page clears the working file. Performance depends on the browser, device memory, source codec, duration, and resolution." : "เครื่องมือใช้ FFmpeg WebAssembly ประมวลผลในอุปกรณ์และไม่ upload ไฟล์ การปิดหรือ refresh หน้าจะล้างไฟล์ทำงาน ความเร็วขึ้นอยู่กับ browser หน่วยความจำ codec ระยะเวลา และความละเอียด"}</p></div></section>${discovery}</main><footer><span>DJAI Academy</span><a href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Join the Academy" : "เข้าสู่ Academy"}</a></footer><script type="module" src="${basePath}/app.js"></script></body></html>`;
}

export const videoTools = JSON.parse(readFileSync(join(projectDir, "src", "video-tools-config.json"), "utf8"));
const audioToolSlugs = new Set(["mp3-to-wav", "wav-to-mp3", "m4a-to-mp3", "mp4-to-mp3", "extract-audio-from-video"]);
const chineseLocales = ["zh-CN", "zh-TW"].map((locale) => JSON.parse(readFileSync(join(projectDir, "src", "locales", `${locale}.json`), "utf8")));

function chineseHref(slug, locale) {
  return `${basePath}/${slug ? `${slug}/` : ""}${locale.segment}/`;
}

function chineseHead(locale, slug, title, description, schemas) {
  const canonical = `${origin}${chineseHref(slug, locale)}`;
  const base = slug ? `${basePath}/${slug}/` : `${basePath}/`;
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | DJAI Media Tools</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="noindex, follow"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="th-TH" href="${origin}${base}"><link rel="alternate" hreflang="en-US" href="${origin}${base}en/"><link rel="alternate" hreflang="zh-CN" href="${origin}${base}zh-cn/"><link rel="alternate" hreflang="zh-TW" href="${origin}${base}zh-tw/"><link rel="alternate" hreflang="x-default" href="${origin}${base}"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="DJAI Academy"><meta property="og:locale" content="${locale.ogLocale}"><meta property="og:image" content="${socialImage}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${socialImage}"><meta name="google-adsense-account" content="ca-pub-3624708289866566"><link rel="stylesheet" href="${basePath}/styles.css?v=20260808a">${schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("")}`;
}

function chineseLinks(locale, active) {
  return [...new Set([...Object.keys(tools), ...videoTools.map((item) => item.slug)])].map((slug) => `<a href="${chineseHref(slug, locale)}"${slug === active ? ' aria-current="page"' : ""}>${escapeHtml(locale.tools[slug])}</a>`).join("");
}

function chineseChrome(locale, slug) {
  const tw = locale.locale === "zh-TW";
  const other = chineseLocales.find((item) => item.locale !== locale.locale);
  return {
    header: `<header><a class="brand" href="/${locale.segment}/">DJAI <span>Media Tools</span></a><nav><a href="/tools/${locale.segment}/">${tw ? "全部工具" : "全部工具"}</a><a href="${chineseHref(slug, other)}" hreflang="${other.locale}">${locale.switchLabel}</a><a class="community" href="/academy/${locale.segment}/">${tw ? "學習社群" : "学习社区"}</a></nav></header>`,
    footer: `<footer><span>DJAI Academy</span><a href="/academy/${locale.segment}/">${tw ? "前往 DJAI Academy" : "前往 DJAI Academy"}</a></footer>`
  };
}

function chineseToolCopy(locale, slug) {
  const tw = locale.locale === "zh-TW";
  const name = locale.tools[slug];
  return {
    name,
    title: `${name}${tw ? "免費線上工具" : "免费在线工具"}`,
    description: tw
      ? `${name}，檔案直接在目前裝置的瀏覽器中處理，不必註冊，也不會上傳至 DJAI。`
      : `${name}，文件直接在当前设备的浏览器中处理，无需注册，也不会上传到 DJAI。`
  };
}

function renderChineseAudio(slug, config, locale) {
  const tw = locale.locale === "zh-TW";
  const copy = chineseToolCopy(locale, slug);
  const chrome = chineseChrome(locale, slug);
  const schemas = [{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: copy.name, url: `${origin}${chineseHref(slug, locale)}`, applicationCategory: "MultimediaApplication", operatingSystem: "Web browser", description: copy.description, inLanguage: locale.locale, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }];
  return `<!doctype html><html lang="${locale.locale}"><head>${chineseHead(locale, slug, copy.title, copy.description, schemas)}</head><body data-tool="${slug}" data-output="${config.output}" data-compress="${config.compress ? "true" : "false"}">${chrome.header}<main><section class="hero"><p class="eyebrow">${tw ? "在瀏覽器本機處理" : "浏览器本地处理"}</p><h1>${escapeHtml(copy.title)}</h1><p>${escapeHtml(copy.description)}</p></section><nav class="task-links" aria-label="${tw ? "影音轉檔工具" : "音视频转换工具"}">${chineseLinks(locale, slug)}</nav><section class="tool" aria-labelledby="tool-title"><div class="tool-copy"><p class="eyebrow">${tw ? "免費轉檔工具" : "免费转换工具"}</p><h2 id="tool-title">${escapeHtml(copy.name)}</h2><p>${tw ? "轉檔引擎只會在開始時載入；原始檔案留在這台裝置上。" : "转换引擎仅在开始处理时加载；原文件始终保留在这台设备上。"}</p><ul><li>${tw ? "建議單一檔案不超過 500 MB" : "建议单个文件不超过 500 MB"}</li><li>${tw ? "大型影片需要足夠的記憶體，處理時間也會較長" : "大型视频需要足够内存，处理时间也会更长"}</li><li>${tw ? "若來源編碼不受支援，工具會顯示錯誤" : "如果源文件编码不受支持，工具会显示错误"}</li></ul></div><div class="converter"><label class="drop" for="media-input"><strong>${tw ? "選擇影音檔案" : "选择音视频文件"}</strong><span>${tw ? "支援格式" : "支持格式"}：${config.input.split(",")[0]}</span></label><input id="media-input" type="file" accept="${config.input}" hidden><div id="file-info" class="file-info" hidden></div><label>${tw ? "輸出品質" : "输出质量"}<select id="quality"><option value="high">${tw ? "高品質" : "高质量"}</option><option value="balanced" selected>${tw ? "平衡" : "均衡"}</option><option value="small">${tw ? "較小檔案" : "较小文件"}</option></select></label><button id="convert" type="button" disabled>${tw ? "開始處理" : "开始处理"}</button><progress id="progress" max="1" value="0" hidden></progress><p id="status" role="status">${tw ? "請先選擇檔案。" : "请先选择文件。"}</p><a id="download" class="download" hidden>${tw ? "下載轉檔結果" : "下载转换结果"}</a></div></section><section class="details"><div><h2>${tw ? "使用方式" : "使用方法"}</h2><ol><li>${tw ? "從裝置選擇支援的檔案。" : "从设备中选择支持的文件。"}</li><li>${tw ? "設定輸出品質並開始處理。" : "设置输出质量并开始处理。"}</li><li>${tw ? "完成後檢查檔案大小並下載。" : "完成后检查文件大小并下载。"}</li></ol></div><div><h2>${tw ? "隱私與限制" : "隐私与限制"}</h2><p>${tw ? "工具透過 FFmpeg WebAssembly 在裝置上處理檔案，不會將內容上傳至 DJAI。重新整理或關閉頁面會清除目前工作檔案。" : "工具通过 FFmpeg WebAssembly 在设备上处理文件，不会将内容上传到 DJAI。刷新或关闭页面会清除当前工作文件。"}</p></div></section></main>${chrome.footer}<script type="module" src="${basePath}/app.js"></script></body></html>`;
}

function renderChineseVideo(config, locale) {
  const tw = locale.locale === "zh-TW";
  const copy = chineseToolCopy(locale, config.slug);
  const chrome = chineseChrome(locale, config.slug);
  const canonical = `${origin}${chineseHref(config.slug, locale)}`;
  const faq = tw ? [
    ["影片會上傳至 DJAI 嗎？", "不會。檔案由目前裝置上的瀏覽器讀取與處理。"],
    ["第一次處理為什麼比較久？", "第一次使用時，瀏覽器需要載入約 31 MB 的 FFmpeg WebAssembly 引擎。"],
    ["所有影片格式都能處理嗎？", "支援程度取決於來源容器與編碼；無法讀取時，工具會明確顯示錯誤。"]
  ] : [
    ["视频会上传到 DJAI 吗？", "不会。文件由当前设备上的浏览器读取和处理。"],
    ["为什么第一次处理比较慢？", "首次使用时，浏览器需要加载约 31 MB 的 FFmpeg WebAssembly 引擎。"],
    ["所有视频格式都能处理吗？", "支持情况取决于源文件的封装格式和编码；无法读取时，工具会明确显示错误。"]
  ];
  const schemas = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: copy.name, url: canonical, applicationCategory: "MultimediaApplication", operatingSystem: "Web browser", description: copy.description, inLanguage: locale.locale, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: tw ? "免費工具" : "免费工具", item: `${origin}/tools/${locale.segment}/` }, { "@type": "ListItem", position: 2, name: locale.hubTitle, item: `${origin}${chineseHref("", locale)}` }, { "@type": "ListItem", position: 3, name: copy.name, item: canonical }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
  ];
  const toolConfig = { slug: config.slug, mode: config.mode, fixedOutput: config.fixedOutput, fixedInput: config.fixedInput, targetMB: config.targetMB, uiTitle: copy.name };
  const zipScript = config.mode === "frames" ? `<script src="${basePath}/vendor/jszip/jszip.min.js?v=20260809a" defer></script>` : "";
  return `<!doctype html><html lang="${locale.locale}"><head>${chineseHead(locale, config.slug, copy.title, copy.description, schemas)}<link rel="stylesheet" href="${basePath}/video-tools.css?v=20260809a"></head><body data-tool="${config.slug}" data-mode="${config.mode}">${chrome.header}<main><section class="hero"><p class="eyebrow">${tw ? "在瀏覽器本機處理" : "浏览器本地处理"}</p><h1>${escapeHtml(copy.title)}</h1><p>${escapeHtml(copy.description)}</p></section><section class="video-tool" aria-labelledby="video-tool-title"><h2 id="video-tool-title">${escapeHtml(copy.name)}</h2><div id="video-tool-app"></div><script id="tool-config" type="application/json">${JSON.stringify(toolConfig)}</script></section><nav class="task-links" aria-label="${tw ? "影片工具" : "视频工具"}">${chineseLinks(locale, config.slug)}</nav><section class="details"><div><h2>${tw ? "為實際工作流程設計" : "为实际工作流程设计"}</h2><p>${tw ? "保留這項工作真正需要的設定，讓轉檔、剪輯或壓縮步驟更清楚。" : "只保留这项任务真正需要的设置，让转换、剪切或压缩步骤更清楚。"}</p></div><div><h2>${tw ? "隱私與限制" : "隐私与限制"}</h2><p>${tw ? "影片由 FFmpeg WebAssembly 在目前裝置上處理，不會上傳至 DJAI。速度取決於瀏覽器、記憶體、影片長度、解析度與來源編碼。" : "视频由 FFmpeg WebAssembly 在当前设备上处理，不会上传到 DJAI。速度取决于浏览器、内存、视频时长、分辨率和源文件编码。"}</p></div></section><section class="faq" aria-labelledby="faq-title"><h2 id="faq-title">${tw ? "常見問題" : "常见问题"}</h2><div class="faq-grid">${faq.map(([q, a]) => `<div class="faq-item"><h3>${q}</h3><p>${a}</p></div>`).join("")}</div></section></main>${chrome.footer}${zipScript}<script src="${basePath}/video-tools.js?v=20260829a" defer></script></body></html>`;
}

function renderChineseHub(locale) {
  const tw = locale.locale === "zh-TW";
  const chrome = chineseChrome(locale, "");
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: locale.hubTitle, url: `${origin}${chineseHref("", locale)}`, description: locale.hubDescription, inLanguage: locale.locale, hasPart: [...new Set([...Object.keys(tools), ...videoTools.map((item) => item.slug)])].map((slug) => ({ "@type": "SoftwareApplication", name: locale.tools[slug], url: `${origin}${chineseHref(slug, locale)}`, applicationCategory: "MultimediaApplication", operatingSystem: "Web browser" })) };
  return `<!doctype html><html lang="${locale.locale}"><head>${chineseHead(locale, "", locale.hubTitle, locale.hubDescription, [schema])}</head><body>${chrome.header}<main><section class="hero"><p class="eyebrow">${tw ? "免費・免註冊・不需上傳" : "免费・免注册・无需上传"}</p><h1>${locale.hubTitle}</h1><p>${locale.hubDescription}</p></section><nav class="task-links" aria-label="${tw ? "所有影音工具" : "全部音视频工具"}">${chineseLinks(locale, "")}</nav><section class="details"><div><h2>${tw ? "挑選符合任務的工具" : "选择适合任务的工具"}</h2><p>${tw ? "從格式轉換、剪輯、壓縮到擷取影格，每一頁都只保留該工作所需的控制項。" : "从格式转换、剪切、压缩到提取视频帧，每个页面只保留该任务所需的控制项。"}</p></div><div><h2>${tw ? "檔案留在你的裝置" : "文件留在你的设备"}</h2><p>${tw ? "所有處理都在瀏覽器中完成。大型檔案仍需要足夠記憶體與處理時間。" : "所有处理都在浏览器中完成。大型文件仍需要足够内存和处理时间。"}</p></div></section></main>${chrome.footer}</body></html>`;
}

function renderVideo(config, lang) {
  const copy = config[lang];
  const isEn = lang === "en";
  const canonicalPath = href(config.slug, lang);
  const canonical = `${origin}${canonicalPath}`;
  const thaiAlternate = href(config.slug, "th");
  const englishAlternate = href(config.slug, "en");
  const other = href(config.slug, isEn ? "th" : "en");
  const taskLinks = videoTools.map((item) => `<a href="${href(item.slug, lang)}"${item.slug === config.slug ? ' aria-current="page"' : ""}>${escapeHtml(item[lang].ui)}</a>`).join("");
  const relatedLinks = videoTools.filter((item) => item.slug !== config.slug).map((item) => `<a href="${href(item.slug, lang)}"><strong>${escapeHtml(item[lang].ui)}</strong><span>${escapeHtml(item[lang].why)}</span></a>`).join("");
  const audioLinks = Object.entries(tools).filter(([itemSlug]) => audioToolSlugs.has(itemSlug)).map(([itemSlug, item]) => `<a href="${href(itemSlug, lang)}"><strong>${escapeHtml(item[lang][1])}</strong><span>${escapeHtml(item[lang][2])}</span></a>`).join("");
  const discovery = `<nav class="tool-discovery-footer" aria-labelledby="tool-discovery-${lang}" data-tool-discovery><div class="discovery-heading"><p class="eyebrow">${isEn ? "VIDEO WORKFLOWS" : "งานวิดีโอ"}</p><h2 id="tool-discovery-${lang}">${isEn ? "Continue with another video task" : "ทำงานวิดีโอต่อด้วยเครื่องมือที่ตรงงาน"}</h2><p>${isEn ? "Each tool keeps the controls that matter for one job, and every file stays on your device." : "แต่ละเครื่องมือเก็บ control ที่จำเป็นของงานนั้นไว้ และไฟล์ยังอยู่บนอุปกรณ์ของคุณ"}</p></div><div class="discovery-links">${relatedLinks}</div><div class="discovery-heading" style="margin-top:34px"><h2>${isEn ? "Audio tools" : "เครื่องมือเสียง"}</h2></div><div class="discovery-links">${audioLinks}</div><div class="category-links">${categoryLinksFor(isEn)}</div></nav>`;
  const faqHTML = copy.faq.map((item) => `<div class="faq-item"><h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p></div>`).join("");
  const schemas = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: copy.h1, url: canonical, applicationCategory: "MultimediaApplication", operatingSystem: "Web browser", description: copy.meta, inLanguage: lang, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: `${origin}/` } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Free tools" : "เครื่องมือฟรี", item: `${origin}${isEn ? "/tools/en/" : "/tools/"}` },
      { "@type": "ListItem", position: 2, name: isEn ? "Audio and video tools" : "เครื่องมือเสียงและวิดีโอ", item: `${origin}${basePath}/${isEn ? "en/" : ""}` },
      { "@type": "ListItem", position: 3, name: copy.ui, item: canonical }
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];
  const toolConfig = { slug: config.slug, mode: config.mode, fixedOutput: config.fixedOutput, fixedInput: config.fixedInput, targetMB: config.targetMB, uiTitle: copy.ui };
  const zipScript = config.mode === "frames" ? `<script src="${basePath}/vendor/jszip/jszip.min.js?v=20260809a" defer></script>` : "";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(copy.title)}</title><meta name="description" content="${escapeHtml(copy.meta)}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="th" href="${origin}${thaiAlternate}"><link rel="alternate" hreflang="en" href="${origin}${englishAlternate}"><link rel="alternate" hreflang="x-default" href="${origin}${thaiAlternate}"><meta property="og:title" content="${escapeHtml(copy.title)}"><meta property="og:description" content="${escapeHtml(copy.meta)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta name="google-adsense-account" content="ca-pub-3624708289866566"><link rel="stylesheet" href="${basePath}/styles.css?v=20260808a"><link rel="stylesheet" href="${basePath}/video-tools.css?v=20260809a">${schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("")}<script async src="https://www.googletagmanager.com/gtag/js?id=G-CGJ5BTR44T"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-CGJ5BTR44T",{anonymize_ip:true});</script><script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3624708289866566"></script></head><body data-tool="${config.slug}" data-mode="${config.mode}"><header><a class="brand" href="${isEn ? "/en/" : "/"}">DJAI <span>Media Tools</span></a><nav><a href="${isEn ? "/tools/en/" : "/tools/"}">${isEn ? "All tools" : "เครื่องมือทั้งหมด"}</a><a href="${other}" hreflang="${isEn ? "th" : "en"}">${isEn ? "ไทย" : "EN"}</a><a class="community" href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Community" : "ชุมชน"}</a></nav></header><main><section class="hero"><p class="eyebrow">${isEn ? "PRIVATE BROWSER PROCESSING" : "ประมวลผลใน BROWSER"}</p><h1>${escapeHtml(copy.h1)}</h1><p>${escapeHtml(copy.hero)}</p></section><section class="video-tool" aria-labelledby="video-tool-title"><h2 id="video-tool-title">${escapeHtml(copy.ui)}</h2><div id="video-tool-app"></div><script id="tool-config" type="application/json">${JSON.stringify(toolConfig)}</script></section><nav class="task-links" aria-label="${isEn ? "Video tools" : "เครื่องมือวิดีโอ"}">${taskLinks}</nav><section class="details"><div><h2>${escapeHtml(copy.why)}</h2><p>${escapeHtml(copy.note)}</p></div><div><h2>${isEn ? "Privacy and limitations" : "ความเป็นส่วนตัวและข้อจำกัด"}</h2><p>${isEn ? "Processing uses FFmpeg WebAssembly locally. The video is not uploaded by this tool. Closing or refreshing the page clears the working file. Speed depends on the browser, device memory, source codec, duration, and resolution, and tools that re-encode are not lossless." : "เครื่องมือใช้ FFmpeg WebAssembly ประมวลผลในอุปกรณ์และไม่ upload วิดีโอ การปิดหรือ refresh หน้าจะล้างไฟล์ทำงาน ความเร็วขึ้นอยู่กับ browser หน่วยความจำ codec ระยะเวลา และความละเอียด และเครื่องมือที่ต้อง encode ใหม่จะไม่ใช่ lossless"}</p></div></section><section class="faq" aria-labelledby="faq-title"><h2 id="faq-title">${isEn ? "Common questions" : "คำถามที่พบบ่อย"}</h2><div class="faq-grid">${faqHTML}</div></section><section class="app-callout"><div><p class="eyebrow">${isEn ? "BUILD WITH DJAI" : "สร้างกับ DJAI"}</p><h2>${isEn ? "Want to build a tool like this one?" : "อยากสร้างเครื่องมือแบบนี้เองไหม?"}</h2><p>${isEn ? "This tool runs entirely in the browser. Explore DJAI Academy’s practical building courses." : "เครื่องมือนี้ทำงานใน browser ทั้งหมด สำรวจคอร์สสร้างโปรเจกต์จริงจาก DJAI Academy"}</p></div><a href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Join the Academy" : "เข้าสู่ Academy"}</a></section>${discovery}</main><footer><span>DJAI Academy</span><a href="${isEn ? "/academy/en/" : "/academy/"}">${isEn ? "Join the Academy" : "เข้าสู่ Academy"}</a></footer>${zipScript}<script src="${basePath}/video-tools.js?v=20260809b" defer></script></body></html>`;
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
for (const [slug, config] of Object.entries(tools)) for (const lang of ["th", "en"]) {
  const directory = join(publicDir, slug, ...(lang === "en" ? ["en"] : []));
  mkdirSync(directory, { recursive: true });
  const [title, , description] = config[lang];
  const canonical = `${origin}${href(slug, lang)}`;
  writeFileSync(join(directory, "index.html"), enhanceHead(render(slug, config, lang), {
    title: `${title} | DJAI Media Tools`, description, canonical, lang
  }));
}
for (const config of videoTools) for (const lang of ["th", "en"]) {
  const directory = join(publicDir, config.slug, ...(lang === "en" ? ["en"] : []));
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "index.html"), enhanceHead(renderVideo(config, lang), {
    title: config[lang].title,
    description: config[lang].meta,
    canonical: `${origin}${href(config.slug, lang)}`,
    lang
  }));
}
for (const locale of chineseLocales) {
  for (const [slug, config] of Object.entries(tools)) {
    const directory = join(publicDir, slug, locale.segment);
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, "index.html"), renderChineseAudio(slug, config, locale));
  }
  for (const config of videoTools) {
    const directory = join(publicDir, config.slug, locale.segment);
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, "index.html"), renderChineseVideo(config, locale));
  }
  const hubDirectory = join(publicDir, locale.segment);
  mkdirSync(hubDirectory, { recursive: true });
  writeFileSync(join(hubDirectory, "index.html"), renderChineseHub(locale));
}
const first = Object.entries(tools)[0];
const thaiHub = ["เครื่องมือวิดีโอและเสียงฟรี ออนไลน์", "เครื่องมือวิดีโอและเสียงฟรีใน browser", "แปลง ตัด บีบอัด ครอป resize รวม หมุน หรือดึง frame จากวิดีโอ และจัดการไฟล์เสียงฟรีใน browser โดยไม่ upload ไฟล์"];
writeFileSync(join(publicDir, "index.html"), enhanceHead(
  render(first[0], first[1], "th", `${basePath}/`, thaiHub),
  { title: `${thaiHub[0]} | DJAI Media Tools`, description: thaiHub[2], canonical: `${origin}${basePath}/`, lang: "th" }
));
mkdirSync(join(publicDir, "en"), { recursive: true });
const englishHub = ["Free Video and Audio Tools Online", "Free browser video and audio tools", "Convert, cut, compress, crop, resize, merge, rotate, or extract frames from video and manage audio files free in your browser without uploading files."];
writeFileSync(join(publicDir, "en", "index.html"), enhanceHead(
  render(first[0], first[1], "en", `${basePath}/en/`, englishHub),
  { title: `${englishHub[0]} | DJAI Media Tools`, description: englishHub[2], canonical: `${origin}${basePath}/en/`, lang: "en" }
));
const uniqueToolCount = new Set([...Object.keys(tools), ...videoTools.map((item) => item.slug)]).size;
console.log(`Built ${uniqueToolCount * 4 + 4} media-tool pages.`);
