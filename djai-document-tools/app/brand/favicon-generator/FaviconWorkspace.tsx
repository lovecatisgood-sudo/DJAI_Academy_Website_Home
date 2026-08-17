"use client";

/* Preview images use runtime-generated blob and data URLs, which next/image cannot optimize. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Clipboard, Download, ImagePlus, LockKeyhole, Package } from "lucide-react";
import { buildIco, FAVICON_SIZES, installSnippet, manifestJson, MAX_SOURCE_BYTES, MAX_SOURCE_DIMENSION, sanitizeSvg } from "./favicon-utils";

type Language = "th" | "en" | "vi";
type LoadedSource = { image: HTMLImageElement; sanitizedSvg?: string; name: string };
type GeneratedFile = { name: string; blob: Blob; size: number };

const copy = {
  th: {
    upload: "วางโลโก้หรือเลือกรูป",
    accepted: "PNG, JPG, WebP หรือ SVG ขนาดไม่เกิน 12 MB",
    choose: "เลือกรูป",
    replace: "เปลี่ยนรูป",
    options: "ตั้งค่าไอคอน",
    padding: "พื้นที่ว่างรอบโลโก้",
    background: "พื้นหลัง",
    transparent: "โปร่งใส",
    solid: "สีพื้น",
    preview: "ตัวอย่างขนาดจริง",
    generate: "สร้างชุด Favicon",
    generating: "กำลังสร้างไฟล์",
    ready: "ชุดไฟล์พร้อมแล้ว",
    readyText: "ดาวน์โหลด ZIP ที่มีไอคอนทุกขนาด manifest และโค้ดติดตั้ง",
    download: "ดาวน์โหลด ZIP",
    copy: "คัดลอกโค้ด HTML",
    copied: "คัดลอกแล้ว",
    reset: "เริ่มใหม่",
    local: "ประมวลผลใน browser",
    errorType: "ใช้ไฟล์ PNG, JPG, WebP หรือ SVG เท่านั้น",
    errorSize: "ไฟล์ต้องมีขนาดไม่เกิน 12 MB",
    errorImage: "อ่านรูปนี้ไม่ได้ ลองบันทึกเป็น PNG แล้วอัปโหลดอีกครั้ง",
    errorDimension: "รูปต้องมีความกว้างและสูงไม่เกิน 8,192 px",
    contents: "ไฟล์ในชุด"
  },
  en: {
    upload: "Drop a logo or choose an image",
    accepted: "PNG, JPG, WebP, or SVG up to 12 MB",
    choose: "Choose image",
    replace: "Replace image",
    options: "Icon settings",
    padding: "Space around logo",
    background: "Background",
    transparent: "Transparent",
    solid: "Solid color",
    preview: "Actual-size preview",
    generate: "Generate favicon package",
    generating: "Generating files",
    ready: "Your icon package is ready",
    readyText: "Download a ZIP with every icon size, a manifest, and installation code.",
    download: "Download ZIP",
    copy: "Copy HTML code",
    copied: "Copied",
    reset: "Start over",
    local: "Processed in your browser",
    errorType: "Choose a PNG, JPG, WebP, or SVG file",
    errorSize: "The file must be 12 MB or smaller",
    errorImage: "This image could not be read. Save it as PNG and try again.",
    errorDimension: "The image must be no larger than 8,192 px in either direction",
    contents: "Package contents"
  },
  vi: {
    upload: "Thả logo hoặc chọn hình ảnh",
    accepted: "PNG, JPG, WebP hoặc SVG, tối đa 12 MB",
    choose: "Chọn ảnh",
    replace: "Đổi ảnh",
    options: "Cài đặt biểu tượng",
    padding: "Khoảng trống quanh logo",
    background: "Nền",
    transparent: "Trong suốt",
    solid: "Màu nền",
    preview: "Xem trước ở kích thước thật",
    generate: "Tạo bộ favicon",
    generating: "Đang tạo tệp",
    ready: "Bộ biểu tượng đã sẵn sàng",
    readyText: "Tải ZIP gồm mọi kích thước biểu tượng, manifest và mã cài đặt.",
    download: "Tải ZIP",
    copy: "Sao chép mã HTML",
    copied: "Đã sao chép",
    reset: "Làm lại",
    local: "Được xử lý trong trình duyệt",
    errorType: "Chỉ sử dụng tệp PNG, JPG, WebP hoặc SVG",
    errorSize: "Tệp phải có dung lượng không quá 12 MB",
    errorImage: "Không thể đọc hình ảnh này. Hãy lưu thành PNG rồi thử lại.",
    errorDimension: "Chiều rộng và chiều cao của ảnh không được vượt quá 8.192 px",
    contents: "Tệp trong gói"
  }
} as const;

function analytics(action: string) {
  const win = window as Window & { gtag?: (...args: unknown[]) => void };
  win.gtag?.("event", action, { tool_name: "favicon_generator" });
}

function canvasBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("canvas-export")), "image/png"));
}

function drawIcon(source: HTMLImageElement, size: number, padding: number, background: string | null, maskable = false) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("canvas-context");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  if (background) { context.fillStyle = background; context.fillRect(0, 0, size, size); }
  const safePadding = Math.max(padding, maskable ? 20 : 0);
  const available = size * (1 - safePadding / 50);
  const scale = Math.min(available / source.naturalWidth, available / source.naturalHeight);
  const width = source.naturalWidth * scale;
  const height = source.naturalHeight * scale;
  context.drawImage(source, (size - width) / 2, (size - height) / 2, width, height);
  return canvas;
}

async function loadImage(file: File): Promise<LoadedSource> {
  let content: Blob = file;
  let sanitizedSvg: string | undefined;
  if (file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")) {
    sanitizedSvg = sanitizeSvg(await file.text());
    content = new Blob([sanitizedSvg], { type: "image/svg+xml" });
  }
  const url = URL.createObjectURL(content);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight) throw new Error("invalid-image");
    return { image, sanitizedSvg, name: file.name };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function FaviconWorkspace({ language }: { language: Language }) {
  const c = copy[language];
  const inputRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<LoadedSource | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [padding, setPadding] = useState(8);
  const [backgroundMode, setBackgroundMode] = useState<"transparent" | "solid">("transparent");
  const [background, setBackground] = useState("#071327");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [zipUrl, setZipUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const previewBackground = backgroundMode === "solid" ? background : null;
  const previews = useMemo(() => source ? [16, 32, 48, 180].map((size) => ({ size, url: drawIcon(source.image, size, padding, previewBackground).toDataURL() })) : [], [source, padding, previewBackground]);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); if (zipUrl) URL.revokeObjectURL(zipUrl); }, [previewUrl, zipUrl]);

  async function acceptFile(file?: File) {
    if (!file) return;
    setError(""); setFiles([]); setCopied(false);
    if (file.size > MAX_SOURCE_BYTES) { setError(c.errorSize); return; }
    const supported = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(file.type) || /\.(png|jpe?g|webp|svg)$/i.test(file.name);
    if (!supported) { setError(c.errorType); return; }
    try {
      const loaded = await loadImage(file);
      if (loaded.image.naturalWidth > MAX_SOURCE_DIMENSION || loaded.image.naturalHeight > MAX_SOURCE_DIMENSION) { setError(c.errorDimension); return; }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(drawIcon(loaded.image, 512, 4, null).toDataURL());
      setSource(loaded);
      analytics("tool_upload_complete");
    } catch { setError(c.errorImage); }
  }

  async function generate() {
    if (!source || busy) return;
    setBusy(true); setError(""); setFiles([]);
    try {
      const generated: GeneratedFile[] = [];
      const iconBlobs = new Map<number, Blob>();
      for (const size of FAVICON_SIZES) {
        const blob = await canvasBlob(drawIcon(source.image, size, padding, previewBackground));
        iconBlobs.set(size, blob);
      }
      const add = (name: string, blob: Blob, size: number) => generated.push({ name, blob, size });
      add("favicon-16x16.png", iconBlobs.get(16)!, 16);
      add("favicon-32x32.png", iconBlobs.get(32)!, 32);
      add("favicon-48x48.png", iconBlobs.get(48)!, 48);
      add("apple-touch-icon.png", iconBlobs.get(180)!, 180);
      add("favicon-192x192.png", iconBlobs.get(192)!, 192);
      add("favicon-512x512.png", iconBlobs.get(512)!, 512);
      add("maskable-icon-512x512.png", await canvasBlob(drawIcon(source.image, 512, padding, previewBackground, true)), 512);
      const icoImages = await Promise.all([16, 32, 48].map(async (size) => ({ size, bytes: new Uint8Array(await iconBlobs.get(size)!.arrayBuffer()) })));
      add("favicon.ico", buildIco(icoImages), 48);
      if (source.sanitizedSvg) add("favicon.svg", new Blob([source.sanitizedSvg], { type: "image/svg+xml" }), 0);
      add("site.webmanifest", new Blob([manifestJson(background)], { type: "application/manifest+json" }), 0);
      add("favicon-snippet.html", new Blob([installSnippet], { type: "text/html" }), 0);
      const readme = language === "en"
        ? "Copy the icon files to your website root, then paste favicon-snippet.html inside <head>. Rename the site in site.webmanifest before publishing."
        : language === "vi"
          ? "Sao chép các tệp biểu tượng vào thư mục gốc của website, sau đó dán nội dung favicon-snippet.html vào <head>. Đổi tên website trong site.webmanifest trước khi xuất bản."
          : "คัดลอกไฟล์ไอคอนไปที่ root ของเว็บไซต์ แล้ววางโค้ดจาก favicon-snippet.html ภายใน <head> กรุณาแก้ชื่อเว็บไซต์ใน site.webmanifest ก่อนเผยแพร่";
      add("README.txt", new Blob([readme], { type: "text/plain" }), 0);
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      generated.forEach((item) => zip.file(item.name, item.blob));
      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
      if (zipUrl) URL.revokeObjectURL(zipUrl);
      setZipUrl(URL.createObjectURL(blob)); setFiles(generated); analytics("tool_generate_success");
    } catch { setError(c.errorImage); analytics("tool_generate_error"); }
    finally { setBusy(false); }
  }

  function reset() {
    if (zipUrl) URL.revokeObjectURL(zipUrl);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSource(null); setPreviewUrl(""); setZipUrl(""); setFiles([]); setError(""); setCopied(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <section className="favicon-workspace" aria-labelledby="workspace-title">
      <div className="favicon-workspace-heading"><p className="brand-kicker">{c.local}</p><h2 id="workspace-title">{source ? c.options : c.upload}</h2></div>
      <div className="favicon-workspace-grid">
        <div className="favicon-source-panel">
          <input ref={inputRef} className="visually-hidden" type="file" accept=".png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml" onChange={(event) => acceptFile(event.target.files?.[0])} />
          {!source ? (
            <button className="favicon-dropzone" type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); acceptFile(event.dataTransfer.files[0]); }}>
              <ImagePlus aria-hidden="true" /><strong>{c.upload}</strong><span>{c.accepted}</span><em>{c.choose}</em>
            </button>
          ) : (
            <div className="favicon-source-preview">
              <div className="transparency-grid"><img src={previewUrl} alt={source.name} /></div>
              <div><strong>{source.name}</strong><span>{source.image.naturalWidth} × {source.image.naturalHeight} px</span></div>
              <button type="button" onClick={() => inputRef.current?.click()}>{c.replace}</button>
            </div>
          )}
          {error && <p className="favicon-error" role="alert">{error}</p>}
        </div>

        <div className="favicon-control-panel">
          <label>{c.padding}<output>{padding}%</output><input type="range" min="0" max="30" value={padding} onChange={(event) => setPadding(Number(event.target.value))} disabled={!source} /></label>
          <fieldset disabled={!source}><legend>{c.background}</legend><label><input type="radio" checked={backgroundMode === "transparent"} onChange={() => setBackgroundMode("transparent")} />{c.transparent}</label><label><input type="radio" checked={backgroundMode === "solid"} onChange={() => setBackgroundMode("solid")} />{c.solid}</label><input aria-label={c.solid} type="color" value={background} onChange={(event) => { setBackground(event.target.value); setBackgroundMode("solid"); }} /></fieldset>
          <div className="favicon-size-previews"><strong>{c.preview}</strong><div>{previews.map(({ size, url }) => <span key={size}><span className="transparency-grid"><img src={url} width={size} height={size} alt="" /></span><small>{size}</small></span>)}</div></div>
          <button className="brand-primary favicon-generate" type="button" disabled={!source || busy} onClick={generate}><Package aria-hidden="true" />{busy ? c.generating : c.generate}</button>
        </div>
      </div>

      {files.length > 0 && <div className="favicon-result" aria-live="polite">
        <span className="favicon-result-check"><Check aria-hidden="true" /></span><div><p className="brand-kicker">{c.ready}</p><h2>{c.readyText}</h2><div className="favicon-result-actions"><a className="brand-primary" href={zipUrl} download="djai-favicon-package.zip" onClick={() => analytics("tool_download_zip")}><Download aria-hidden="true" />{c.download}</a><button type="button" onClick={async () => { await navigator.clipboard.writeText(installSnippet); setCopied(true); analytics("tool_copy_snippet"); }}><Clipboard aria-hidden="true" />{copied ? c.copied : c.copy}</button><button type="button" onClick={reset}>{c.reset}</button></div></div>
        <details><summary>{c.contents} ({files.length})</summary><ul>{files.map((file) => <li key={file.name}>{file.name}{file.size ? <span>{file.size} × {file.size}</span> : null}</li>)}</ul></details>
      </div>}
      <p className="favicon-local-note"><LockKeyhole aria-hidden="true" />{c.local}</p>
    </section>
  );
}
