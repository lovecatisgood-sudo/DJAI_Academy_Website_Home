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
const simplifiedChinese = document.documentElement.lang === "zh-CN";
const traditionalChinese = document.documentElement.lang === "zh-TW";
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
  status.textContent = simplifiedChinese ? `正在转换… ${Math.round(progress.value * 100)}%` : traditionalChinese ? `正在轉檔… ${Math.round(progress.value * 100)}%` : vietnamese ? `Đang chuyển đổi... ${Math.round(progress.value * 100)}%` : english ? `Converting... ${Math.round(progress.value * 100)}%` : `กำลังแปลง... ${Math.round(progress.value * 100)}%`;
});

async function loadEngine() {
  if (loaded) return;
  status.textContent = simplifiedChinese ? "正在加载转换引擎…" : traditionalChinese ? "正在載入轉檔引擎…" : vietnamese ? "Đang tải bộ máy chuyển đổi..." : english ? "Loading the conversion engine..." : "กำลังโหลด conversion engine...";
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
    status.textContent = simplifiedChinese ? "文件超过建议的 500 MB 上限。" : traditionalChinese ? "檔案超過建議的 500 MB 上限。" : vietnamese ? "File vượt quá giới hạn khuyến nghị 500 MB." : english ? "This file exceeds the recommended 500 MB limit." : "ไฟล์นี้เกินขนาดแนะนำ 500 MB";
    return;
  }
  fileInfo.hidden = false;
  fileInfo.textContent = `${selectedFile.name} · ${formatBytes(selectedFile.size)}`;
  button.disabled = false;
  status.textContent = simplifiedChinese ? "已准备好在当前设备上转换。" : traditionalChinese ? "已準備好在目前裝置上轉檔。" : vietnamese ? "Sẵn sàng chuyển đổi trên thiết bị này." : english ? "Ready to convert on this device." : "พร้อมแปลงไฟล์ในอุปกรณ์นี้";
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
    download.textContent = simplifiedChinese ? `下载结果（${formatBytes(blob.size)}）` : traditionalChinese ? `下載結果（${formatBytes(blob.size)}）` : vietnamese ? `Tải kết quả ${formatBytes(blob.size)}` : english ? `Download ${formatBytes(blob.size)} result` : `ดาวน์โหลดผลลัพธ์ ${formatBytes(blob.size)}`;
    download.hidden = false;
    status.textContent = simplifiedChinese ? "转换完成。工作文件仅保留在当前标签页中。" : traditionalChinese ? "轉檔完成。工作檔案只保留在目前分頁中。" : vietnamese ? "Chuyển đổi hoàn tất. File làm việc chỉ còn trong tab này." : english ? "Conversion complete. The working file remains only in this tab." : "แปลงเสร็จแล้ว ไฟล์ทำงานยังอยู่เฉพาะใน tab นี้";
    progress.value = 1;
    await ffmpeg.deleteFile(source);
    await ffmpeg.deleteFile(output);
  } catch (error) {
    console.error(error);
    status.textContent = simplifiedChinese ? "转换失败。源文件编码可能不受支持，或设备可用内存不足。" : traditionalChinese ? "轉檔失敗。來源編碼可能不受支援，或裝置可用記憶體不足。" : vietnamese ? "Chuyển đổi thất bại. Codec nguồn có thể không được hỗ trợ hoặc thiết bị thiếu bộ nhớ." : english ? "Conversion failed. The source codec may be unsupported or the device may be low on memory." : "แปลงไม่สำเร็จ อาจไม่รองรับ codec ต้นฉบับหรืออุปกรณ์มีหน่วยความจำไม่พอ";
  } finally {
    button.disabled = !selectedFile;
  }
});

window.addEventListener("pagehide", () => { if (resultUrl) URL.revokeObjectURL(resultUrl); });
