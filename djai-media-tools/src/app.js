import { FFmpeg } from "/tools/media/vendor/ffmpeg/index.js";
import { fetchFile } from "/tools/media/vendor/util/index.js";

const input = document.querySelector("#media-input");
const button = document.querySelector("#convert");
const quality = document.querySelector("#quality");
const status = document.querySelector("#status");
const progress = document.querySelector("#progress");
const download = document.querySelector("#download");
const fileInfo = document.querySelector("#file-info");
const vietnamese = document.documentElement.lang === "vi";
const english = document.documentElement.lang !== "th";
const ffmpeg = new FFmpeg();
let selectedFile;
let loaded = false;
let resultUrl;

const formatBytes = (bytes) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
const safeName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, "_");

ffmpeg.on("progress", ({ progress: value }) => {
  progress.hidden = false;
  progress.value = Math.max(0, Math.min(1, value || 0));
  status.textContent = vietnamese ? `Đang chuyển đổi... ${Math.round(progress.value * 100)}%` : english ? `Converting... ${Math.round(progress.value * 100)}%` : `กำลังแปลง... ${Math.round(progress.value * 100)}%`;
});

async function loadEngine() {
  if (loaded) return;
  status.textContent = vietnamese ? "Đang tải bộ máy chuyển đổi..." : english ? "Loading the conversion engine..." : "กำลังโหลด conversion engine...";
  await ffmpeg.load({
    coreURL: "/tools/media/vendor/core/ffmpeg-core.js",
    wasmURL: "/tools/media/vendor/core/ffmpeg-core.wasm"
  });
  loaded = true;
}

function commandFor(tool, source, output, level) {
  const audioBitrate = level === "high" ? "256k" : level === "small" ? "96k" : "160k";
  const crf = level === "high" ? "23" : level === "small" ? "34" : "28";
  if (tool === "mp3-to-wav") return ["-i", source, "-vn", "-c:a", "pcm_s16le", output];
  if (["wav-to-mp3", "m4a-to-mp3", "mp4-to-mp3", "extract-audio-from-video"].includes(tool)) return ["-i", source, "-vn", "-c:a", "libmp3lame", "-b:a", audioBitrate, output];
  if (tool === "mp4-to-webm") return ["-i", source, "-c:v", "libvpx-vp9", "-crf", crf, "-b:v", "0", "-c:a", "libopus", output];
  if (["webm-to-mp4", "mov-to-mp4"].includes(tool)) return ["-i", source, "-c:v", "libx264", "-preset", "veryfast", "-crf", crf, "-c:a", "aac", "-movflags", "+faststart", output];
  return ["-i", source, "-c:v", "libx264", "-preset", "veryfast", "-crf", crf, "-c:a", "aac", "-b:a", audioBitrate, "-movflags", "+faststart", output];
}

input.addEventListener("change", () => {
  selectedFile = input.files?.[0];
  if (!selectedFile) return;
  if (selectedFile.size > 500 * 1024 * 1024) {
    selectedFile = undefined;
    button.disabled = true;
    status.textContent = vietnamese ? "File vượt quá giới hạn khuyến nghị 500 MB." : english ? "This file exceeds the recommended 500 MB limit." : "ไฟล์นี้เกินขนาดแนะนำ 500 MB";
    return;
  }
  fileInfo.hidden = false;
  fileInfo.textContent = `${selectedFile.name} · ${formatBytes(selectedFile.size)}`;
  button.disabled = false;
  status.textContent = vietnamese ? "Sẵn sàng chuyển đổi trên thiết bị này." : english ? "Ready to convert on this device." : "พร้อมแปลงไฟล์ในอุปกรณ์นี้";
  download.hidden = true;
});

button.addEventListener("click", async () => {
  if (!selectedFile) return;
  button.disabled = true;
  download.hidden = true;
  progress.value = 0;
  try {
    await loadEngine();
    const sourceExtension = selectedFile.name.includes(".") ? selectedFile.name.split(".").pop().toLowerCase() : "bin";
    const source = `input.${sourceExtension}`;
    const extension = document.body.dataset.output;
    const output = `djai-media-output.${extension}`;
    await ffmpeg.writeFile(source, await fetchFile(selectedFile));
    await ffmpeg.exec(commandFor(document.body.dataset.tool, source, output, quality.value));
    const data = await ffmpeg.readFile(output);
    const mime = extension === "mp3" ? "audio/mpeg" : extension === "wav" ? "audio/wav" : extension === "webm" ? "video/webm" : "video/mp4";
    const blob = new Blob([data.buffer], { type: mime });
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    resultUrl = URL.createObjectURL(blob);
    download.href = resultUrl;
    download.download = `${safeName(selectedFile.name.replace(/\.[^.]+$/, ""))}.${extension}`;
    download.textContent = vietnamese ? `Tải kết quả ${formatBytes(blob.size)}` : english ? `Download ${formatBytes(blob.size)} result` : `ดาวน์โหลดผลลัพธ์ ${formatBytes(blob.size)}`;
    download.hidden = false;
    status.textContent = vietnamese ? "Chuyển đổi hoàn tất. File làm việc chỉ còn trong tab này." : english ? "Conversion complete. The working file remains only in this tab." : "แปลงเสร็จแล้ว ไฟล์ทำงานยังอยู่เฉพาะใน tab นี้";
    progress.value = 1;
    await ffmpeg.deleteFile(source);
    await ffmpeg.deleteFile(output);
  } catch (error) {
    console.error(error);
    status.textContent = vietnamese ? "Chuyển đổi thất bại. Codec nguồn có thể không được hỗ trợ hoặc thiết bị thiếu bộ nhớ." : english ? "Conversion failed. The source codec may be unsupported or the device may be low on memory." : "แปลงไม่สำเร็จ อาจไม่รองรับ codec ต้นฉบับหรืออุปกรณ์มีหน่วยความจำไม่พอ";
  } finally {
    button.disabled = !selectedFile;
  }
});

window.addEventListener("pagehide", () => { if (resultUrl) URL.revokeObjectURL(resultUrl); });
