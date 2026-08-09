(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const basePath = String(window.DJAI_TRANSCRIBER_BASE_PATH || '').replace(/\/$/, '');
  const apiPath = path => `${basePath}${path}`;
  const state = { selectedFiles: [], jobs: [], currentJob: null, system: null, pollTimer: null, language: 'en', pendingDelete: null };
  const storageGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const storageSet = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
  const els = {
    fileInput: $('#fileInput'), browseButton: $('#browseButton'), dropZone: $('#dropZone'), batchQueue: $('#batchQueue'),
    transcribeButton: $('#transcribeButton'), selectedSummary: $('#selectedSummary'), uploadLimit: $('#uploadLimit'),
    modelSelect: $('#modelSelect'), modelHint: $('#modelHint'), languageSelect: $('#languageSelect'), diarize: $('#diarizeToggle'),
    translate: $('#translateToggle'), denoise: $('#denoiseToggle'), systemStatus: $('#systemStatus'), systemBadge: $('#systemBadge'), engineNotice: $('#engineNotice'),
    historyGrid: $('#historyGrid'), refreshButton: $('#refreshButton'), uploadState: $('#uploadState'), transcriptState: $('#transcriptState'),
    transcriptTitle: $('#transcriptTitle'), transcriptMeta: $('#transcriptMeta'), transcriptSegments: $('#transcriptSegments'), audio: $('#audioPlayer'),
    playbackRate: $('#playbackRate'), searchInput: $('#searchInput'), emptySearch: $('#emptySearch'), speakerBar: $('#speakerBar'), speakerChips: $('#speakerChips'),
    backButton: $('#backButton'), copyButton: $('#copyButton'), exportButton: $('#exportButton'), exportMenu: $('#exportMenu'),
    toast: $('#toast'), langToggle: $('#langToggle'), menuButton: $('#menuButton'), mainNav: $('#mainNav'), confirmModal: $('#confirmModal'),
    cancelDelete: $('#cancelDelete'), confirmDelete: $('#confirmDelete')
  };

  const I18N = {
    en: {
      nav_transcribe:'Transcribe',nav_history:'History',nav_privacy:'Privacy',eyebrow:'Local-first AI transcription',
      hero_title:'Turn audio & video into a transcript you can actually use.',hero_body:'Drop files, transcribe locally with Whisper, edit speaker-labelled text beside synchronized playback, then export clean documents or subtitles.',
      trust_local:'Local processing',trust_batch:'Batch uploads',trust_export:'TXT · SRT · VTT · DOCX · PDF',drop_title:'Drop audio or video here',drop_body:'MP3, WAV, M4A, FLAC, MP4, MOV, MKV, WebM and more. Select several files for a batch.',browse:'Browse files',
      back_jobs:'All jobs',copy:'Copy text',export:'Export',speed:'Speed',speakers:'Speakers',no_search:'No transcript segments match your search.',settings:'Transcription settings',settings_body:'Choose quality and processing before uploading.',quality:'Model / quality',language:'Audio language',auto_detect:'Auto detect',
      speaker_recognition:'Speaker recognition',speaker_help:'Label different speakers with pyannote.',translate_english:'Translate to English',translate_help:"Use Whisper's translate task.",clean_audio:'Clean noisy audio',clean_help:'FFmpeg filtering before transcription.',transcribe_selected:'Transcribe selected files',choose_files:'Choose one or more files to begin.',private_session:'Private session:',session_notice:'No account or email is required. This browser session only lists and opens the jobs it creates; delete a job when you are done.',
      history_kicker:'Your workspace',history_title:'Your transcription history',history_body:'Only this anonymous browser session can reopen these jobs. Review, export, retry, or delete your work when you are done.',refresh:'Refresh',privacy_kicker:'Private by design',privacy_title:'No sign-up does not mean public files.',privacy_body:'A secure, anonymous browser session separates your jobs from other visitors. FFmpeg preparation, Whisper transcription, transcript editing, and exports run in this application. Delete a job to remove its source media, processed audio, and exports.',privacy_upload:'Private session',privacy_upload_body:'No email is required. A secure browser cookie separates your jobs from other visitors.',privacy_process:'Transcribe and review',privacy_process_body:'FFmpeg prepares audio and Whisper creates timestamped text for your review.',privacy_delete:'Delete when finished',privacy_delete_body:'Deleting a job removes its stored source, normalized audio, and generated exports.',
      how_kicker:'Workflow',how_title:'From media file to finished transcript.',how_1:'Choose files',how_1_body:'Drag in one file or a batch and select your model, language and optional processing.',how_2:'Transcribe',how_2_body:'The server extracts 16 kHz mono audio, transcribes with word timestamps and can add speaker labels.',how_3:'Edit & export',how_3_body:'Click timestamps to seek, edit text inline, rename speakers, search, then export the format you need.',footer_body:'Useful, simple and privacy-friendly creative tools from the Siamese Cat family.'
    },
    th: {
      nav_transcribe:'ถอดเสียง',nav_history:'ประวัติ',nav_privacy:'ความเป็นส่วนตัว',eyebrow:'ถอดเสียง AI แบบ Local-first',
      hero_title:'เปลี่ยนเสียงและวิดีโอเป็นข้อความที่นำไปใช้ต่อได้จริง',hero_body:'ลากไฟล์เข้ามา ถอดเสียงด้วย Whisper ในระบบของคุณ แก้ข้อความพร้อมป้ายผู้พูดและเล่นเสียงตามเวลา แล้วส่งออกเป็นเอกสารหรือซับไตเติล',
      trust_local:'ประมวลผลในระบบ',trust_batch:'อัปโหลดหลายไฟล์',trust_export:'TXT · SRT · VTT · DOCX · PDF',drop_title:'วางไฟล์เสียงหรือวิดีโอที่นี่',drop_body:'รองรับ MP3, WAV, M4A, FLAC, MP4, MOV, MKV, WebM และอื่น ๆ เลือกหลายไฟล์เพื่อทำเป็นชุดได้',browse:'เลือกไฟล์',
      back_jobs:'งานทั้งหมด',copy:'คัดลอกข้อความ',export:'ส่งออก',speed:'ความเร็ว',speakers:'ผู้พูด',no_search:'ไม่พบช่วงข้อความที่ตรงกับคำค้น',settings:'ตั้งค่าการถอดเสียง',settings_body:'เลือกคุณภาพและการประมวลผลก่อนอัปโหลด',quality:'โมเดล / คุณภาพ',language:'ภาษาของเสียง',auto_detect:'ตรวจจับอัตโนมัติ',
      speaker_recognition:'แยกผู้พูด',speaker_help:'ติดป้ายผู้พูดด้วย pyannote',translate_english:'แปลเป็นอังกฤษ',translate_help:'ใช้โหมด translate ของ Whisper',clean_audio:'ทำความสะอาดเสียงรบกวน',clean_help:'กรองเสียงด้วย FFmpeg ก่อนถอดเสียง',transcribe_selected:'ถอดเสียงไฟล์ที่เลือก',choose_files:'เลือกไฟล์อย่างน้อยหนึ่งไฟล์เพื่อเริ่มต้น',private_session:'session ส่วนตัว:',session_notice:'ไม่ต้องสร้างบัญชีหรือใช้อีเมล Browser นี้จะเห็นและเปิดได้เฉพาะงานที่สร้างเอง ลบงานเมื่อใช้เสร็จ',
      history_kicker:'พื้นที่ทำงานของคุณ',history_title:'ประวัติการถอดเสียงของคุณ',history_body:'เฉพาะ session แบบไม่ระบุตัวตนใน browser นี้เท่านั้นที่เปิดงานเหล่านี้ได้ ตรวจ แก้ ส่งออก ลองใหม่ หรือลบเมื่อใช้เสร็จ',refresh:'รีเฟรช',privacy_kicker:'ออกแบบเพื่อความเป็นส่วนตัว',privacy_title:'ไม่ต้องสมัคร ไม่ได้แปลว่าไฟล์เป็นสาธารณะ',privacy_body:'session แบบไม่ระบุตัวตนใน browser จะแยกงานของคุณจากผู้เข้าชมคนอื่น FFmpeg, Whisper, การแก้ transcript และการส่งออกทำงานในแอปนี้ ลบงานเพื่อลบไฟล์ต้นฉบับ เสียงที่ประมวลผล และไฟล์ส่งออก',privacy_upload:'session ส่วนตัว',privacy_upload_body:'ไม่ต้องใช้อีเมล cookie แบบปลอดภัยจะแยกงานของคุณออกจากผู้เยี่ยมชมคนอื่น',privacy_process:'ถอดเสียงและตรวจทาน',privacy_process_body:'FFmpeg เตรียมเสียง และ Whisper สร้างข้อความพร้อมเวลาเพื่อให้คุณตรวจทาน',privacy_delete:'ลบเมื่อเสร็จงาน',privacy_delete_body:'การลบงานจะลบไฟล์ต้นฉบับ เสียงที่เตรียมแล้ว และไฟล์ส่งออก',
      how_kicker:'ขั้นตอน',how_title:'จากไฟล์สื่อสู่ transcript ที่พร้อมใช้งาน',how_1:'เลือกไฟล์',how_1_body:'ลากไฟล์เดียวหรือหลายไฟล์ แล้วเลือกโมเดล ภาษา และตัวเลือกประมวลผล',how_2:'ถอดเสียง',how_2_body:'ระบบแปลงเสียงเป็น mono 16 kHz ถอดเสียงพร้อม timestamp ระดับคำ และเพิ่มป้ายผู้พูดได้',how_3:'แก้ไขและส่งออก',how_3_body:'กด timestamp เพื่อเลื่อนไปยังช่วงเสียง แก้ข้อความ เปลี่ยนชื่อผู้พูด ค้นหา แล้วส่งออกเป็นรูปแบบที่ต้องการ',footer_body:'เครื่องมือสร้างสรรค์ที่เรียบง่าย มีประโยชน์ และใส่ใจความเป็นส่วนตัวจากครอบครัว Siamese Cat'
    }
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const formatBytes = bytes => { const n=Number(bytes)||0; if(n<1024) return `${n} B`; const u=['KB','MB','GB']; let v=n/1024,i=0; while(v>=1024&&i<u.length-1){v/=1024;i++;} return `${v.toFixed(v>=100?0:v>=10?1:2)} ${u[i]}`; };
  const formatDuration = s => { s=Math.max(0,Number(s)||0); const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=Math.floor(s%60); return h?`${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${m}:${String(sec).padStart(2,'0')}`; };
  const formatTime = s => { s=Math.max(0,Number(s)||0); const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=Math.floor(s%60); return h?`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; };
  const formatDate = iso => { try { return new Intl.DateTimeFormat(state.language==='th'?'th-TH':'en-GB',{dateStyle:'medium',timeStyle:'short'}).format(new Date(iso)); } catch { return iso||''; } };
  const api = async (url, options={}) => { const res=await fetch(apiPath(url),options); if(!res.ok){ let detail=`Request failed (${res.status})`; try{ const j=await res.json(); detail=j.detail||detail; }catch{} throw new Error(detail); } return res.status===204?null:res.json(); };
  let toastTimer;
  const toast = msg => { els.toast.textContent=msg; els.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>els.toast.classList.remove('show'),2600); };

  function applyLanguage(lang) {
    state.language = lang;
    document.documentElement.lang = lang;
    storageSet('siamese-transcriber-language',lang);
    els.langToggle.textContent = lang==='en'?'ไทย':'EN';
    $$('[data-i18n]').forEach(node => { const key=node.dataset.i18n; if(I18N[lang][key]) node.textContent=I18N[lang][key]; });
    els.searchInput.placeholder = lang==='th'?'ค้นหา transcript…':'Search transcript…';
    renderHistory();
  }

  function addFiles(fileList) {
    const known = new Set(state.selectedFiles.map(f=>`${f.name}:${f.size}:${f.lastModified}`));
    for(const file of [...fileList]) { const key=`${file.name}:${file.size}:${file.lastModified}`; if(!known.has(key)){ state.selectedFiles.push(file); known.add(key); } }
    renderSelectedFiles();
  }
  function renderSelectedFiles() {
    const files=state.selectedFiles;
    els.transcribeButton.disabled=!files.length;
    els.batchQueue.hidden=!files.length;
    els.batchQueue.innerHTML=files.map((f,i)=>`<div class="batch-item"><div><strong title="${escapeHtml(f.name)}">${escapeHtml(f.name)}</strong><span>${formatBytes(f.size)} · ${escapeHtml(f.type||'media')}</span></div><button class="batch-remove" data-index="${i}" aria-label="Remove ${escapeHtml(f.name)}">×</button></div>`).join('');
    els.selectedSummary.textContent = files.length ? `${files.length} file${files.length===1?'':'s'} selected · ${formatBytes(files.reduce((a,f)=>a+f.size,0))}` : I18N[state.language].choose_files;
  }

  function optionsFormData(file) {
    const fd=new FormData(); fd.append('file',file); fd.append('model',els.modelSelect.value); fd.append('language',els.languageSelect.value);
    fd.append('diarize', String(els.diarize.checked)); fd.append('translate', String(els.translate.checked)); fd.append('denoise', String(els.denoise.checked)); return fd;
  }
  async function startUploads() {
    if(!state.selectedFiles.length) return;
    const files=[...state.selectedFiles];
    els.transcribeButton.disabled=true; els.transcribeButton.textContent=state.language==='th'?'กำลังอัปโหลด…':'Uploading…';
    let failures=0;
    for(const file of files) {
      try { await api('/api/jobs',{method:'POST',body:optionsFormData(file)}); }
      catch(err){ failures++; toast(`${file.name}: ${err.message}`); }
    }
    state.selectedFiles=[]; renderSelectedFiles(); els.transcribeButton.textContent=I18N[state.language].transcribe_selected;
    await loadJobs(); startPolling(); document.querySelector('#history').scrollIntoView({behavior:'smooth',block:'start'});
    if(!failures) toast(files.length===1?'Transcription started':`${files.length} transcription jobs started`);
  }

  async function loadSystem() {
    try {
      const info=await api('/api/system'); state.system=info;
      els.uploadLimit.textContent=`Up to ${info.max_upload_mb} MB per file · FFmpeg ${info.ffmpeg?'ready':'missing'}`;
      els.systemBadge.textContent=info.gpu_available?'GPU':'CPU';
      const ready=info.faster_whisper_installed || (info.configured_backend==='mock' && info.mock_allowed);
      if(ready){ els.systemStatus.className='status'; els.systemStatus.innerHTML=`<span class="status-dot"></span><span>${info.configured_backend==='mock'?'E2E demo engine active':`Local Whisper ready · ${info.gpu_available?(info.gpu_name||'GPU'):'CPU'}`}</span>`; }
      else { els.systemStatus.className='status warn'; els.systemStatus.innerHTML='<span class="status-dot"></span><span>Core app ready · install faster-whisper to enable real transcription.</span>'; }
      if(!info.speaker_recognition_ready && info.configured_backend!=='mock') { els.diarize.title='Requires pyannote.audio plus HF_TOKEN'; }
    } catch(err) { els.systemStatus.className='status error'; els.systemStatus.innerHTML=`<span class="status-dot"></span><span>${escapeHtml(err.message)}</span>`; }
  }

  async function loadJobs() {
    try { const data=await api('/api/jobs?limit=100'); state.jobs=data.jobs||[]; renderHistory(); }
    catch(err){ els.historyGrid.innerHTML=`<div class="history-empty">${escapeHtml(err.message)}</div>`; }
  }
  function renderHistory() {
    if(!els.historyGrid) return;
    if(!state.jobs.length){ els.historyGrid.innerHTML=`<div class="history-empty">${state.language==='th'?'ยังไม่มีงานถอดเสียง เลือกไฟล์ด้านบนเพื่อเริ่ม':'No transcription jobs yet. Choose files above to begin.'}</div>`; return; }
    els.historyGrid.innerHTML=state.jobs.map(job=>{
      const status=escapeHtml(job.status); const canOpen=job.status==='completed'; const canRetry=job.status==='failed'; const msg=job.error?`<div class="job-error">${escapeHtml(job.error)}</div>`:'';
      const details=[formatBytes(job.size_bytes),job.duration_seconds?formatDuration(job.duration_seconds):null,job.detected_language?job.detected_language.toUpperCase():null,job.backend].filter(Boolean).join(' · ');
      return `<article class="job-card" data-job-id="${job.id}"><div class="job-head"><div class="job-file"><strong title="${escapeHtml(job.filename)}">${escapeHtml(job.filename)}</strong><span>${escapeHtml(details||formatDate(job.created_at))}</span></div><span class="job-status ${status}">${status}</span></div><div class="progress-track"><div class="progress-fill" style="width:${Number(job.progress)||0}%"></div></div><div class="job-message">${escapeHtml(job.message||'')}</div>${msg}<div class="job-actions">${canOpen?'<button data-action="open">Open transcript</button>':''}${canRetry?'<button data-action="retry">Retry</button>':''}<button data-action="delete" class="delete-job">Delete</button></div></article>`;
    }).join('');
  }
  function startPolling() {
    clearInterval(state.pollTimer);
    if(!state.jobs.some(j=>['queued','processing'].includes(j.status))) return;
    state.pollTimer=setInterval(async()=>{ await loadJobs(); if(state.currentJob){ const fresh=state.jobs.find(j=>j.id===state.currentJob.id); if(fresh&&fresh.status==='completed'&&state.currentJob.status!=='completed') openTranscript(fresh.id); } if(!state.jobs.some(j=>['queued','processing'].includes(j.status))) clearInterval(state.pollTimer); },1100);
  }

  async function openTranscript(jobId) {
    try {
      const job=await api(`/api/jobs/${jobId}`); if(job.status!=='completed') throw new Error('Transcript is not ready yet.'); state.currentJob=job;
      els.uploadState.hidden=true; els.transcriptState.hidden=false; els.transcriptTitle.textContent=job.filename; els.transcriptMeta.textContent=[formatDuration(job.duration_seconds),job.detected_language?.toUpperCase(),job.options?.model,job.backend].filter(Boolean).join(' · ');
      els.audio.src=apiPath(`/api/jobs/${job.id}/media`); els.searchInput.value=''; renderSegments(job); renderSpeakers(job); els.transcriptState.scrollIntoView({behavior:'smooth',block:'start'});
    } catch(err){ toast(err.message); }
  }
  function closeTranscript() { state.currentJob=null; els.audio.pause(); els.audio.removeAttribute('src'); els.audio.load(); els.transcriptState.hidden=true; els.uploadState.hidden=false; }
  function autoGrow(textarea){ textarea.style.height='auto'; textarea.style.height=Math.max(30,textarea.scrollHeight)+'px'; }
  function renderSegments(job) {
    const segs=job.result?.segments||[];
    els.transcriptSegments.innerHTML=segs.map(seg=>`<div class="segment" data-id="${seg.id}" data-start="${Number(seg.start)||0}" data-end="${Number(seg.end)||0}"><button class="segment-time" type="button">${formatTime(seg.start)}</button><div class="segment-body"><div class="segment-speaker-row">${seg.speaker?`<button class="segment-speaker" type="button" title="Rename this speaker">${escapeHtml(seg.speaker)}</button>`:''}<span class="segment-save">Saved</span></div><textarea class="segment-text" rows="1" spellcheck="true">${escapeHtml(seg.text||'')}</textarea></div></div>`).join('');
    $$('.segment-text',els.transcriptSegments).forEach(autoGrow);
    els.emptySearch.hidden=!!segs.length;
  }
  function renderSpeakers(job) {
    const speakers=[...new Set((job.result?.segments||[]).map(s=>s.speaker).filter(Boolean))]; els.speakerBar.hidden=!speakers.length;
    els.speakerChips.innerHTML=speakers.map(s=>`<span class="speaker-chip">${escapeHtml(s)} <button type="button" data-speaker="${escapeHtml(s)}" title="Rename">✎</button></span>`).join('');
  }
  async function saveSegment(segmentEl) {
    if(!state.currentJob) return; const id=Number(segmentEl.dataset.id); const textarea=$('.segment-text',segmentEl); const original=state.currentJob.result.segments.find(s=>Number(s.id)===id); if(!original||textarea.value.trim()===String(original.text||'').trim()) return;
    segmentEl.classList.add('saving'); $('.segment-save',segmentEl).textContent='Saving…';
    try { const job=await api(`/api/jobs/${state.currentJob.id}/segments/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:textarea.value})}); state.currentJob=job; segmentEl.classList.remove('saving'); segmentEl.classList.add('saved'); $('.segment-save',segmentEl).textContent='Saved'; setTimeout(()=>segmentEl.classList.remove('saved'),1200); }
    catch(err){ segmentEl.classList.remove('saving'); toast(err.message); }
  }
  async function renameSpeaker(old) {
    if(!state.currentJob) return; const next=prompt(state.language==='th'?`เปลี่ยนชื่อ ${old} เป็น:`:`Rename ${old} to:`,old); if(!next||next.trim()===old) return;
    try { const job=await api(`/api/jobs/${state.currentJob.id}/speakers`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({old,new:next.trim()})}); state.currentJob=job; renderSegments(job); renderSpeakers(job); toast('Speaker renamed'); }
    catch(err){ toast(err.message); }
  }
  function filterTranscript() {
    const q=els.searchInput.value.trim().toLocaleLowerCase(); let visible=0;
    $$('.segment',els.transcriptSegments).forEach(seg=>{ const text=$('.segment-text',seg).value.toLocaleLowerCase(); const speaker=$('.segment-speaker',seg)?.textContent.toLocaleLowerCase()||''; const match=!q||text.includes(q)||speaker.includes(q); seg.classList.toggle('hidden-by-search',!match); if(match) visible++; });
    els.emptySearch.hidden=visible>0;
  }
  function highlightCurrentSegment() {
    const t=els.audio.currentTime||0; let active=null;
    $$('.segment',els.transcriptSegments).forEach(seg=>{ const yes=t>=Number(seg.dataset.start)&&t<Number(seg.dataset.end); seg.classList.toggle('active',yes); if(yes) active=seg; });
    if(active && !active.classList.contains('hidden-by-search')) { const box=els.transcriptSegments.getBoundingClientRect(), r=active.getBoundingClientRect(); if(r.top<box.top||r.bottom>box.bottom) active.scrollIntoView({block:'nearest'}); }
  }
  async function copyTranscript() {
    if(!state.currentJob) return; const text=(state.currentJob.result?.segments||[]).map(s=>`${s.speaker?`${s.speaker}: `:''}${s.text}`).join('\n');
    try { await navigator.clipboard.writeText(text); }
    catch { const ta=document.createElement('textarea');ta.value=text;document.body.append(ta);ta.select();document.execCommand('copy');ta.remove(); }
    toast(state.language==='th'?'คัดลอก transcript แล้ว':'Transcript copied');
  }

  async function retryJob(jobId) { try{ await api(`/api/jobs/${jobId}/retry`,{method:'POST'}); await loadJobs(); startPolling(); toast('Job queued again'); }catch(err){toast(err.message);} }
  function askDelete(jobId) { const job=state.jobs.find(j=>j.id===jobId); state.pendingDelete=jobId; $('#confirmTitle').textContent=state.language==='th'?'ลบ transcript นี้หรือไม่?':'Delete transcript?'; $('#confirmBody').textContent=job?`${job.filename} — ${state.language==='th'?'ไฟล์และข้อมูลของงานจะถูกลบ':'stored media and job data will be removed.'}`:'This removes the stored media and transcript.'; els.confirmModal.hidden=false; }
  async function confirmDelete() { const id=state.pendingDelete; if(!id)return; try{await api(`/api/jobs/${id}`,{method:'DELETE'}); if(state.currentJob?.id===id)closeTranscript(); els.confirmModal.hidden=true;state.pendingDelete=null;await loadJobs();toast('Deleted');}catch(err){toast(err.message);} }

  els.browseButton.addEventListener('click',()=>els.fileInput.click());
  els.dropZone.addEventListener('click',e=>{ if(e.target===els.dropZone||e.target.closest('.drop-icon,h2,p,.drop-limit')) els.fileInput.click(); });
  els.dropZone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();els.fileInput.click();}});
  els.fileInput.addEventListener('change',()=>{addFiles(els.fileInput.files);els.fileInput.value='';});
  ['dragenter','dragover'].forEach(type=>els.dropZone.addEventListener(type,e=>{e.preventDefault();els.dropZone.classList.add('dragging');}));
  ['dragleave','drop'].forEach(type=>els.dropZone.addEventListener(type,e=>{e.preventDefault();els.dropZone.classList.remove('dragging');}));
  els.dropZone.addEventListener('drop',e=>addFiles(e.dataTransfer.files));
  els.batchQueue.addEventListener('click',e=>{const btn=e.target.closest('.batch-remove');if(!btn)return;state.selectedFiles.splice(Number(btn.dataset.index),1);renderSelectedFiles();});
  els.transcribeButton.addEventListener('click',startUploads);
  els.modelSelect.addEventListener('change',()=>{const hints={tiny:'Fastest',base:'Very fast',small:'Fast',medium:'Balanced','large-v3':'Best',turbo:'Fast + high'};els.modelHint.textContent=hints[els.modelSelect.value]||'';});
  els.refreshButton.addEventListener('click',async()=>{await loadJobs();startPolling();toast('History refreshed');});
  els.historyGrid.addEventListener('click',e=>{const btn=e.target.closest('button[data-action]');if(!btn)return;const card=btn.closest('.job-card'),id=card.dataset.jobId; if(btn.dataset.action==='open')openTranscript(id); if(btn.dataset.action==='retry')retryJob(id); if(btn.dataset.action==='delete')askDelete(id);});
  els.backButton.addEventListener('click',closeTranscript);
  els.transcriptSegments.addEventListener('click',e=>{const seg=e.target.closest('.segment');if(!seg)return;if(e.target.closest('.segment-time')){els.audio.currentTime=Number(seg.dataset.start)||0;highlightCurrentSegment();}if(e.target.closest('.segment-speaker'))renameSpeaker(e.target.closest('.segment-speaker').textContent.trim());});
  els.transcriptSegments.addEventListener('input',e=>{if(e.target.matches('.segment-text'))autoGrow(e.target);});
  els.transcriptSegments.addEventListener('focusout',e=>{if(e.target.matches('.segment-text'))saveSegment(e.target.closest('.segment'));});
  els.speakerChips.addEventListener('click',e=>{const btn=e.target.closest('button[data-speaker]');if(btn)renameSpeaker(btn.dataset.speaker);});
  els.searchInput.addEventListener('input',filterTranscript);
  els.audio.addEventListener('timeupdate',highlightCurrentSegment);
  els.playbackRate.addEventListener('change',()=>{els.audio.playbackRate=Number(els.playbackRate.value)||1;});
  els.copyButton.addEventListener('click',copyTranscript);
  els.exportButton.addEventListener('click',()=>els.exportMenu.hidden=!els.exportMenu.hidden);
  els.exportMenu.addEventListener('click',async e=>{
    const btn=e.target.closest('button[data-format]'); if(!btn||!state.currentJob)return;
    const fmt=btn.dataset.format; els.exportMenu.hidden=true;
    try {
      const res=await fetch(apiPath(`/api/jobs/${state.currentJob.id}/export/${fmt}`));
      if(!res.ok){ let detail=`Export failed (${res.status})`; try{const j=await res.json();detail=j.detail||detail;}catch{} throw new Error(detail); }
      const blob=await res.blob(); const url=URL.createObjectURL(blob); const a=document.createElement('a');
      const stem=(state.currentJob.filename||'transcript').replace(/\.[^.]+$/,'').replace(/[^\w\-]+/g,'-')||'transcript';
      a.href=url; a.download=`${stem}.${fmt}`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
      toast(`${fmt.toUpperCase()} export ready`);
    } catch(err) { toast(err.message); }
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.export-menu-wrap'))els.exportMenu.hidden=true;});
  els.cancelDelete.addEventListener('click',()=>{els.confirmModal.hidden=true;state.pendingDelete=null;}); els.confirmDelete.addEventListener('click',confirmDelete);
  els.confirmModal.addEventListener('click',e=>{if(e.target===els.confirmModal){els.confirmModal.hidden=true;state.pendingDelete=null;}});
  els.langToggle.addEventListener('click',()=>applyLanguage(state.language==='en'?'th':'en'));
  els.menuButton.addEventListener('click',()=>els.mainNav.classList.toggle('open'));
  els.mainNav.addEventListener('click',e=>{if(e.target.tagName==='A')els.mainNav.classList.remove('open');});

  applyLanguage(window.DJAI_TRANSCRIBER_LOCALE || document.body.dataset.locale || storageGet('siamese-transcriber-language') || 'en');
  loadSystem(); loadJobs().then(startPolling);
})();
