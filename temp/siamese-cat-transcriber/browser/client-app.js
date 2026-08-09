(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const locale = document.body.dataset.locale === "th" ? "th" : "en";
  const copy = locale === "th" ? {
    choose: "เลือกไฟล์หนึ่งไฟล์เพื่อเริ่ม", selected: "เลือกแล้ว", decoding: "กำลังเตรียมเสียงในอุปกรณ์นี้…", working: "กำลังถอดเสียง…", ready: "พร้อมใช้งานใน browser", webgpu: "WebGPU พร้อม", cpu: "CPU ใน browser", done: "ถอดเสียงเสร็จแล้ว", failed: "ไม่สามารถถอดเสียงได้", decodeFail: "Browser นี้ไม่สามารถอ่านเสียงจากไฟล์นี้ได้ ลอง MP3, WAV, M4A, MP4 หรือ WebM ที่เปิดใน browser นี้ได้", copied: "คัดลอก transcript แล้ว", exportReady: "เตรียมไฟล์ส่งออกแล้ว", edit: "แก้ไขข้อความ", processing: "กำลังประมวลผลในอุปกรณ์นี้…", file: "ไฟล์", minutes: "นาที", model: "โมเดล"
  } : {
    choose: "Choose one file to begin.", selected: "Selected", decoding: "Preparing audio on this device…", working: "Transcribing on this device…", ready: "Ready in your browser", webgpu: "WebGPU ready", cpu: "Browser CPU", done: "Transcription complete", failed: "Unable to transcribe this file", decodeFail: "This browser could not read audio from that file. Try an MP3, WAV, M4A, MP4, or WebM file that plays in this browser.", copied: "Transcript copied", exportReady: "Export ready", edit: "Edit text", processing: "Processing on this device…", file: "File", minutes: "minutes", model: "model"
  };
  const els = {
    fileInput: $("#fileInput"), browse: $("#browseButton"), dropZone: $("#dropZone"), selectedFile: $("#selectedFile"), transcribe: $("#transcribeButton"), selectedSummary: $("#selectedSummary"), model: $("#modelSelect"), modelHint: $("#modelHint"), language: $("#languageSelect"), engineBadge: $("#engineBadge"), engineNotice: $("#engineNotice"),
    upload: $("#uploadState"), transcript: $("#transcriptState"), title: $("#transcriptTitle"), meta: $("#transcriptMeta"), segments: $("#transcriptSegments"), empty: $("#emptySearch"), audio: $("#audioPlayer"), search: $("#searchInput"), speed: $("#playbackRate"), back: $("#backButton"), copy: $("#copyButton"), exportButton: $("#exportButton"), exportMenu: $("#exportMenu"), toast: $("#toast"), menu: $("#menuButton"), nav: $("#mainNav")
  };
  let selectedFile = null;
  let result = null;
  let objectUrl = null;
  let worker = null;
  let toastTimer;

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
  const formatBytes = (bytes) => { const units = ["B", "KB", "MB", "GB"]; let value = Number(bytes) || 0; let index = 0; while (value >= 1024 && index < units.length - 1) { value /= 1024; index += 1; } return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`; };
  const formatTime = (seconds) => { const value = Math.max(0, Number(seconds) || 0); const hours = Math.floor(value / 3600); const minutes = Math.floor((value % 3600) / 60); const remainder = Math.floor(value % 60); return hours ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}` : `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`; };
  const toast = (message) => { els.toast.textContent = message; els.toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2800); };
  const setEngine = (message, badge, tone = "") => { els.engineBadge.textContent = badge; els.engineNotice.className = `status ${tone}`.trim(); els.engineNotice.innerHTML = `<span class="status-dot"></span><span>${escapeHtml(message)}</span>`; };
  const setBusy = (busy, label = null) => { els.transcribe.disabled = busy || !selectedFile; if (label) els.transcribe.textContent = label; else els.transcribe.textContent = locale === "th" ? "ถอดเสียงในอุปกรณ์นี้" : "Transcribe on this device"; document.body.classList.toggle("engine-loading", busy); };

  function addFile(file) {
    if (!file) return;
    selectedFile = file;
    els.selectedFile.hidden = false;
    els.selectedFile.innerHTML = `<div class="batch-item"><div><strong title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</strong><span>${formatBytes(file.size)} · ${escapeHtml(file.type || "media")}</span></div><button class="batch-remove" id="clearFile" aria-label="Remove file">×</button></div>`;
    els.selectedSummary.textContent = `${copy.selected}: ${file.name} · ${formatBytes(file.size)}`;
    setBusy(false);
  }

  function clearFile() {
    selectedFile = null;
    els.selectedFile.hidden = true;
    els.selectedFile.innerHTML = "";
    els.selectedSummary.textContent = copy.choose;
    setBusy(false);
  }

  async function audioSamples(file) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass || !window.OfflineAudioContext) throw new Error(copy.decodeFail);
    const context = new AudioContextClass();
    try {
      const binary = await file.arrayBuffer();
      const decoded = await context.decodeAudioData(binary.slice(0));
      const frames = Math.ceil(decoded.duration * 16000);
      const offline = new OfflineAudioContext(1, frames, 16000);
      const source = offline.createBufferSource();
      source.buffer = decoded;
      source.connect(offline.destination);
      source.start();
      const rendered = await offline.startRendering();
      return rendered.getChannelData(0).slice();
    } catch (error) {
      throw new Error(copy.decodeFail);
    } finally {
      await context.close();
    }
  }

  function getWorker() {
    if (worker) return worker;
    worker = new Worker("/tools/video-to-text/transcription-worker.js", { type: "module" });
    worker.onmessage = ({ data }) => {
      if (data.type === "status") setEngine(data.message, data.engine || "Local");
      if (data.type === "progress") {
        const percent = data.total ? Math.min(100, Math.round((data.loaded / data.total) * 100)) : null;
        const progress = percent === null ? "" : ` ${percent}%`;
        setEngine(`${copy.working} ${data.file || "model"}${progress}`, data.total ? `${percent}%` : "Loading");
      }
      if (data.type === "complete") finishTranscription(data);
      if (data.type === "error") failTranscription(data.message);
    };
    worker.onerror = () => failTranscription(locale === "th" ? "Worker สำหรับ AI หยุดทำงาน ลองรีเฟรชหน้าและเริ่มด้วยโมเดล Tiny หรือ Base" : "The local AI worker stopped. Refresh the page and try Tiny or Base first.");
    return worker;
  }

  async function startTranscription() {
    if (!selectedFile) return;
    setBusy(true, locale === "th" ? "กำลังเตรียมไฟล์…" : "Preparing file…");
    setEngine(copy.decoding, "Local");
    try {
      const samples = await audioSamples(selectedFile);
      setBusy(true, locale === "th" ? "กำลังถอดเสียง…" : "Transcribing…");
      getWorker().postMessage({ type: "transcribe", samples: samples.buffer, model: els.model.value, language: els.language.value }, [samples.buffer]);
    } catch (error) {
      failTranscription(error instanceof Error ? error.message : String(error));
    }
  }

  function finishTranscription(data) {
    const segments = data.segments.map((segment, index) => ({ ...segment, id: index + 1, end: segment.end ?? null }));
    result = { name: selectedFile.name, text: data.text, segments, engine: data.engine, model: els.model.value };
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(selectedFile);
    els.audio.src = objectUrl;
    els.title.textContent = selectedFile.name;
    els.meta.textContent = [data.engine, els.model.options[els.model.selectedIndex].text, `${segments.length} ${locale === "th" ? "ช่วงข้อความ" : "timed segments"}`].join(" · ");
    els.upload.hidden = true;
    els.transcript.hidden = false;
    renderSegments();
    setBusy(false);
    setEngine(copy.done, data.engine);
    els.transcript.scrollIntoView({ behavior: "smooth", block: "start" });
    toast(copy.done);
  }

  function failTranscription(message) {
    setBusy(false);
    setEngine(message || copy.failed, locale === "th" ? "ลองใหม่" : "Try again", "error");
    toast(message || copy.failed);
  }

  function renderSegments() {
    const segments = result?.segments || [];
    els.segments.innerHTML = segments.map((segment) => `<div class="segment" data-id="${segment.id}" data-start="${Number(segment.start) || 0}" data-end="${Number(segment.end) || 0}"><button class="segment-time" type="button">${formatTime(segment.start)}</button><div class="segment-body"><div class="segment-speaker-row"><span class="segment-save">${copy.edit}</span></div><textarea class="segment-text" rows="1" spellcheck="true">${escapeHtml(segment.text)}</textarea></div></div>`).join("");
    $$(".segment-text", els.segments).forEach(autoGrow);
    els.empty.hidden = Boolean(segments.length);
  }

  function autoGrow(textarea) { textarea.style.height = "auto"; textarea.style.height = `${Math.max(32, textarea.scrollHeight)}px`; }
  function syncEdits() { if (!result) return; $$(".segment", els.segments).forEach((node) => { const segment = result.segments.find((item) => item.id === Number(node.dataset.id)); if (segment) segment.text = $(".segment-text", node).value.trim(); }); result.text = result.segments.map((segment) => segment.text).filter(Boolean).join(" ").trim(); }
  function filterTranscript() { const query = els.search.value.trim().toLocaleLowerCase(); let shown = 0; $$(".segment", els.segments).forEach((node) => { const match = !query || $(".segment-text", node).value.toLocaleLowerCase().includes(query); node.classList.toggle("hidden-by-search", !match); if (match) shown += 1; }); els.empty.hidden = shown > 0; }
  function highlightCurrentSegment() { const time = els.audio.currentTime || 0; $$(".segment", els.segments).forEach((node) => node.classList.toggle("active", time >= Number(node.dataset.start) && (Number(node.dataset.end) === 0 || time < Number(node.dataset.end)))); }
  async function copyTranscript() { syncEdits(); try { await navigator.clipboard.writeText(result?.text || ""); } catch { const textarea = document.createElement("textarea"); textarea.value = result?.text || ""; document.body.append(textarea); textarea.select(); document.execCommand("copy"); textarea.remove(); } toast(copy.copied); }
  function timestamp(seconds, separator) { const total = Math.max(0, Number(seconds) || 0); const hours = Math.floor(total / 3600); const minutes = Math.floor((total % 3600) / 60); const remainder = Math.floor(total % 60); const milliseconds = Math.round((total - Math.floor(total)) * 1000); return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}${separator}${String(milliseconds).padStart(3, "0")}`; }
  function exportText(format) { syncEdits(); const stem = (result.name || "transcript").replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "-") || "transcript"; let body = result.text; let type = "text/plain;charset=utf-8"; if (format === "srt" || format === "vtt") { const separator = format === "srt" ? "," : "."; body = result.segments.map((segment, index) => `${format === "srt" ? `${index + 1}\n` : ""}${timestamp(segment.start, separator)} --> ${timestamp(segment.end ?? segment.start + 3, separator)}\n${segment.text}`).join("\n\n"); if (format === "vtt") { body = `WEBVTT\n\n${body}`; type = "text/vtt;charset=utf-8"; } } else if (format === "json") { body = JSON.stringify({ text: result.text, segments: result.segments }, null, 2); type = "application/json;charset=utf-8"; } const url = URL.createObjectURL(new Blob([body], { type })); const link = document.createElement("a"); link.href = url; link.download = `${stem}.${format}`; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast(copy.exportReady); }
  function backToUpload() { els.transcript.hidden = true; els.upload.hidden = false; els.audio.pause(); els.audio.removeAttribute("src"); els.audio.load(); if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; } result = null; clearFile(); }

  els.browse.addEventListener("click", () => els.fileInput.click());
  els.dropZone.addEventListener("click", (event) => { if (event.target === els.dropZone || event.target.closest(".drop-icon,h2,p,.drop-limit")) els.fileInput.click(); });
  els.dropZone.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); els.fileInput.click(); } });
  els.fileInput.addEventListener("change", () => { addFile(els.fileInput.files[0]); els.fileInput.value = ""; });
  ["dragenter", "dragover"].forEach((type) => els.dropZone.addEventListener(type, (event) => { event.preventDefault(); els.dropZone.classList.add("dragging"); }));
  ["dragleave", "drop"].forEach((type) => els.dropZone.addEventListener(type, (event) => { event.preventDefault(); els.dropZone.classList.remove("dragging"); }));
  els.dropZone.addEventListener("drop", (event) => addFile(event.dataTransfer.files[0]));
  els.selectedFile.addEventListener("click", (event) => { if (event.target.closest("#clearFile")) clearFile(); });
  els.transcribe.addEventListener("click", startTranscription);
  els.model.addEventListener("change", () => { els.modelHint.textContent = els.model.value === "tiny" ? (locale === "th" ? "เบาสุด" : "Smallest") : els.model.value === "small" ? (locale === "th" ? "คุณภาพสูง" : "Higher") : (locale === "th" ? "แนะนำ" : "Recommended"); });
  els.back.addEventListener("click", backToUpload); els.copy.addEventListener("click", copyTranscript); els.search.addEventListener("input", filterTranscript); els.speed.addEventListener("change", () => { els.audio.playbackRate = Number(els.speed.value) || 1; }); els.audio.addEventListener("timeupdate", highlightCurrentSegment); els.segments.addEventListener("input", (event) => { if (event.target.matches(".segment-text")) autoGrow(event.target); }); els.segments.addEventListener("click", (event) => { const segment = event.target.closest(".segment"); if (segment && event.target.closest(".segment-time")) { els.audio.currentTime = Number(segment.dataset.start) || 0; els.audio.play(); } });
  els.exportButton.addEventListener("click", () => { els.exportMenu.hidden = !els.exportMenu.hidden; }); els.exportMenu.addEventListener("click", (event) => { const button = event.target.closest("button[data-format]"); if (!button || !result) return; els.exportMenu.hidden = true; exportText(button.dataset.format); }); document.addEventListener("click", (event) => { if (!event.target.closest(".export-menu-wrap")) els.exportMenu.hidden = true; }); els.menu.addEventListener("click", () => els.nav.classList.toggle("open")); els.nav.addEventListener("click", (event) => { if (event.target.tagName === "A") els.nav.classList.remove("open"); });
  setEngine(navigator.gpu ? copy.webgpu : copy.cpu, navigator.gpu ? "WebGPU" : "CPU");
})();
