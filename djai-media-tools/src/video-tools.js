
(() => {
'use strict';

const configEl = document.getElementById('tool-config');
if (!configEl) return;
const CFG = JSON.parse(configEl.textContent);
const TH = document.documentElement.lang === 'th';
const VI = document.documentElement.lang === 'vi';

let L = TH ? {
  choose:'เลือกไฟล์', drop:'ลากไฟล์วิดีโอมาวางตรงนี้', dropMulti:'ลากวิดีโอหลายไฟล์มาวางตรงนี้',
  browse:'หรือเลือกจากคอมพิวเตอร์ โทรศัพท์ หรือแท็บเล็ต', limit:'สูงสุด 350 MB ต่อไฟล์',
  formats:'MP4 · MOV · WebM · MKV · AVI · MPEG · M4V · 3GP · TS · WMV และ format ทั่วไป',
  change:'เปลี่ยนไฟล์', addMore:'เพิ่มวิดีโอ', ready:'พร้อมแล้ว เลือกค่าที่ต้องการแล้วเริ่มประมวลผล',
  browserPreview:'Preview จาก browser', noPreview:'browser เล่น format นี้ไม่ได้โดยตรง', buildPreview:'กำลังสร้าง preview ชั่วคราวด้วย FFmpeg…',
  engineLoad:'กำลังโหลด video engine ครั้งแรก (~31 MB)…', engineReady:'video engine พร้อมแล้ว',
  preparing:'กำลังเตรียมไฟล์…', processing:'กำลังประมวลผลวิดีโอ…', done:'เสร็จแล้ว ไฟล์พร้อมดาวน์โหลด',
  failed:'ประมวลผลไม่สำเร็จ ลองไฟล์ที่เล็กลงหรือเปลี่ยน output setting', tooLarge:'ไฟล์ใหญ่เกินขีดจำกัด 350 MB',
  invalid:'กรุณาเลือกไฟล์ที่รองรับ', download:'ดาวน์โหลด', result:'ไฟล์ผลลัพธ์',
  output:'Output format', quality:'คุณภาพวิดีโอ', resolution:'ความละเอียด', original:'เท่าไฟล์ต้นฉบับ',
  smaller:'ไฟล์เล็ก', balanced:'สมดุล', high:'คุณภาพสูง', target:'ขนาดเป้าหมาย (MB)',
  targetHelp:'เป็นขนาดโดยประมาณ การ encode แบบ browser อาจคลาดเคลื่อนเล็กน้อย',
  start:'จุดเริ่ม', end:'จุดจบ', current:'เวลาปัจจุบัน', setStart:'ใช้เวลานี้เป็น Start', setEnd:'ใช้เวลานี้เป็น End',
  previewSelection:'พรีวิวช่วงที่เลือก', aspect:'อัตราส่วนภาพ', width:'ความกว้าง', interval:'ดึงภาพทุกกี่วินาที',
  frameFormat:'รูปแบบภาพ', speed:'ความเร็ว', angle:'หมุนวิดีโอ', audioFile:'เลือกไฟล์เสียง',
  audioMode:'วิธีใส่เสียง', replace:'แทนที่เสียงเดิม', mix:'ผสมกับเสียงเดิม', mergeOrder:'ลำดับวิดีโอ',
  up:'ขึ้น', down:'ลง', remove:'ลบ', process:'เริ่มประมวลผล', addAudio:'เลือกไฟล์เสียงเพิ่ม',
  fps:'เฟรมต่อวินาที', gifWidth:'ความกว้าง GIF', noUpload:'ไฟล์ของคุณไม่ถูกอัปโหลดไป DJAI',
  nativeFail:'ไฟล์นี้ประมวลผลได้ แต่ browser อาจไม่สามารถแสดง preview ต้นฉบับได้',
  needAudio:'กรุณาเลือกไฟล์เสียงด้วย', needMulti:'กรุณาเลือกวิดีโออย่างน้อย 2 ไฟล์',
  needRange:'จุดจบต้องอยู่หลังจุดเริ่ม', framesReady:'ดึงภาพเสร็จแล้ว', zip:'ดาวน์โหลดทั้งหมดเป็น ZIP',
  maxFrames:'จำกัดสูงสุด 100 ภาพต่อครั้งเพื่อไม่ให้ browser ใช้หน่วยความจำมากเกินไป',
  unsupportedResult:'browser อาจไม่ preview format ผลลัพธ์นี้ แต่ยังดาวน์โหลดได้',
  alreadyUnder:mb=>`ไฟล์ต้นฉบับเล็กกว่า ${mb} MB อยู่แล้ว เราจึงบีบให้เล็กลงกว่าเดิมแทนการขยายขนาด`,
  localNote:'ตัวไฟล์ถูกประมวลผลใน WebAssembly บนอุปกรณ์ของคุณ'
} : {
  choose:'Choose file', drop:'Drop a video here', dropMulti:'Drop several videos here',
  browse:'Or choose from your computer, phone, or tablet', limit:'Up to 350 MB per file',
  formats:'MP4 · MOV · WebM · MKV · AVI · MPEG · M4V · 3GP · TS · WMV and common formats',
  change:'Change file', addMore:'Add videos', ready:'Ready. Choose your settings and start processing.',
  browserPreview:'Browser preview', noPreview:'Your browser cannot play this format directly', buildPreview:'Building a temporary FFmpeg preview…',
  engineLoad:'Loading the video engine for the first time (~31 MB)…', engineReady:'Video engine is ready',
  preparing:'Preparing your file…', processing:'Processing video…', done:'Done. Your file is ready to download.',
  failed:'Processing failed. Try a smaller file or a different output setting.', tooLarge:'This file is over the 350 MB limit.',
  invalid:'Please choose a supported file.', download:'Download', result:'Result',
  output:'Output format', quality:'Video quality', resolution:'Resolution', original:'Keep original',
  smaller:'Smaller file', balanced:'Balanced', high:'Higher quality', target:'Target size (MB)',
  targetHelp:'This is an approximate target; browser encoding can land slightly above or below it.',
  start:'Start', end:'End', current:'Current time', setStart:'Set Start here', setEnd:'Set End here',
  previewSelection:'Preview selection', aspect:'Aspect ratio', width:'Width', interval:'Extract a frame every',
  frameFormat:'Image format', speed:'Playback speed', angle:'Rotation', audioFile:'Audio file',
  audioMode:'Audio mode', replace:'Replace original audio', mix:'Mix with original audio', mergeOrder:'Video order',
  up:'Up', down:'Down', remove:'Remove', process:'Process video', addAudio:'Choose an audio file',
  fps:'Frames per second', gifWidth:'GIF width', noUpload:'Your video is not uploaded to DJAI',
  nativeFail:'The file can still be processed, but your browser may not preview the original format.',
  needAudio:'Choose an audio file too.', needMulti:'Choose at least two video files.', needRange:'End must be after Start.',
  framesReady:'Frames are ready', zip:'Download all as ZIP', maxFrames:'Capped at 100 frames per run to protect browser memory.',
  unsupportedResult:'Your browser may not preview this output format, but you can still download it.',
  alreadyUnder:mb=>`Your file was already under ${mb} MB, so it was compressed smaller instead of being made bigger.`,
  localNote:'The file itself is processed in WebAssembly on your device.'
};

if (VI) Object.assign(L, {
  choose:'Chọn tệp', drop:'Thả video vào đây', dropMulti:'Thả nhiều video vào đây',
  browse:'Hoặc chọn từ máy tính, điện thoại hay máy tính bảng', limit:'Tối đa 350 MB mỗi tệp',
  formats:'MP4 · MOV · WebM · MKV · AVI · MPEG · M4V · 3GP · TS · WMV và các định dạng phổ biến',
  change:'Đổi tệp', addMore:'Thêm video', ready:'Đã sẵn sàng. Chọn cài đặt rồi bắt đầu xử lý.',
  browserPreview:'Xem trước trong trình duyệt', noPreview:'Trình duyệt không thể phát trực tiếp định dạng này', buildPreview:'Đang tạo bản xem trước tạm thời bằng FFmpeg…',
  engineLoad:'Đang tải bộ xử lý video lần đầu (~31 MB)…', engineReady:'Bộ xử lý video đã sẵn sàng',
  preparing:'Đang chuẩn bị tệp…', processing:'Đang xử lý video…', done:'Hoàn tất. Tệp đã sẵn sàng để tải xuống.',
  failed:'Xử lý không thành công. Hãy thử tệp nhỏ hơn hoặc cài đặt đầu ra khác.', tooLarge:'Tệp vượt quá giới hạn 350 MB.',
  invalid:'Hãy chọn một tệp được hỗ trợ.', download:'Tải xuống', result:'Kết quả',
  output:'Định dạng đầu ra', quality:'Chất lượng video', resolution:'Độ phân giải', original:'Giữ nguyên',
  smaller:'Tệp nhỏ hơn', balanced:'Cân bằng', high:'Chất lượng cao hơn', target:'Dung lượng mục tiêu (MB)',
  targetHelp:'Đây là mục tiêu gần đúng; quá trình mã hóa trong trình duyệt có thể chênh lệch đôi chút.',
  start:'Bắt đầu', end:'Kết thúc', current:'Thời gian hiện tại', setStart:'Đặt điểm bắt đầu tại đây', setEnd:'Đặt điểm kết thúc tại đây',
  previewSelection:'Xem trước đoạn đã chọn', aspect:'Tỷ lệ khung hình', width:'Chiều rộng', interval:'Trích một khung hình sau mỗi',
  frameFormat:'Định dạng ảnh', speed:'Tốc độ phát', angle:'Góc xoay', audioFile:'Tệp âm thanh',
  audioMode:'Chế độ âm thanh', replace:'Thay âm thanh gốc', mix:'Trộn với âm thanh gốc', mergeOrder:'Thứ tự video',
  up:'Lên', down:'Xuống', remove:'Xóa', process:'Xử lý video', addAudio:'Chọn tệp âm thanh',
  fps:'Khung hình mỗi giây', gifWidth:'Chiều rộng GIF', noUpload:'Video của bạn không được tải lên DJAI',
  nativeFail:'Tệp vẫn có thể được xử lý, nhưng trình duyệt có thể không xem trước được định dạng gốc.',
  needAudio:'Hãy chọn thêm một tệp âm thanh.', needMulti:'Hãy chọn ít nhất hai video.', needRange:'Điểm kết thúc phải nằm sau điểm bắt đầu.',
  framesReady:'Các khung hình đã sẵn sàng', zip:'Tải tất cả dưới dạng ZIP', maxFrames:'Giới hạn 100 khung hình mỗi lần để bảo vệ bộ nhớ trình duyệt.',
  unsupportedResult:'Trình duyệt có thể không xem trước định dạng đầu ra này, nhưng bạn vẫn có thể tải xuống.',
  alreadyUnder:mb=>`Tệp gốc đã nhỏ hơn ${mb} MB, nên công cụ sẽ nén nhỏ hơn thay vì tăng dung lượng.`,
  localNote:'Tệp được xử lý bằng WebAssembly ngay trên thiết bị của bạn.'
});

const CORE_BASE='/tools/media/vendor/core';
let coreJSBlob='', coreWasmBlob='';

function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function fmtTime(sec){
  sec = Number.isFinite(sec) ? Math.max(0, sec) : 0;
  const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=Math.floor(sec%60),ms=Math.floor((sec-Math.floor(sec))*1000);
  return (h?String(h).padStart(2,'0')+':':'')+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+String(ms).padStart(3,'0')
}
function parseTime(v){
  v=String(v).trim();
  if(/^\d+(\.\d+)?$/.test(v)) return Number(v);
  const p=v.split(':').map(Number); if(p.some(Number.isNaN)) return NaN;
  if(p.length===2) return p[0]*60+p[1];
  if(p.length===3) return p[0]*3600+p[1]*60+p[2];
  return NaN
}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function extOf(name){const m=/\.([a-z0-9]+)$/i.exec(name||'');return m?m[1].toLowerCase():'bin'}
function cleanName(name){return String(name||'video').replace(/\.[^.]+$/,'').replace(/[^\w\u0E00-\u0E7F.-]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'')||'video'}
function mimeFor(ext){
  return ({mp4:'video/mp4',mov:'video/quicktime',webm:'video/webm',mkv:'video/x-matroska',avi:'video/x-msvideo',gif:'image/gif',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png'})[ext]||'application/octet-stream'
}
function humanSize(n){if(!Number.isFinite(n))return'';const u=['B','KB','MB','GB'];let i=0;while(n>=1024&&i<u.length-1){n/=1024;i++}return `${n.toFixed(i?2:0)} ${u[i]}`}
function fileToBytes(file){return file.arrayBuffer().then(b=>new Uint8Array(b))}
function safeInputName(file,i=0){let e=extOf(file.name).replace(/[^a-z0-9]/g,'')||'bin';return `input${i}.${e}`}
function status(text,type=''){const el=document.getElementById('status');if(!el)return;el.textContent=text;el.className=`status ${type}`.trim()}
function progress(v,on=true){const p=document.getElementById('progress'),b=document.getElementById('progressBar');if(!p||!b)return;p.classList.toggle('on',on);b.style.width=`${clamp(v,0,100)}%`}
function delay(ms){return new Promise(r=>setTimeout(r,ms))}

function makeWorkerURL(){
const source=`
let core=null;
const post=(id,type,data,trans=[])=>self.postMessage({id,type,data},trans);
self.onmessage=async(ev)=>{
  const {id,type,data}=ev.data;
  try{
    if(type!=="LOAD"&&!core) throw new Error("FFmpeg core is not loaded");
    let result=true;
    if(type==="LOAD"){
      if(!core){
        const mod=await import(data.coreURL);
        const factory=mod.default;
        if(!factory) throw new Error("FFmpeg core factory unavailable");
        const coreURL=data.coreURL;
        const wasmURL=data.wasmURL||coreURL.replace(/\\.js$/,".wasm");
        const workerURL=data.workerURL||coreURL.replace(/\\.js$/,".worker.js");
        core=await factory({mainScriptUrlOrBlob:coreURL+"#"+btoa(JSON.stringify({wasmURL,workerURL}))});
        core.setLogger(entry=>self.postMessage({type:"LOG",data:entry}));
        core.setProgress(entry=>self.postMessage({type:"PROGRESS",data:entry}));
      }
      result=true;
    }else if(type==="EXEC"){
      core.setTimeout(data.timeout==null?-1:data.timeout); core.exec(...data.args); result=core.ret; core.reset();
    }else if(type==="FFPROBE"){
      core.setTimeout(data.timeout==null?-1:data.timeout); core.ffprobe(...data.args); result=core.ret; core.reset();
    }else if(type==="WRITE_FILE"){
      core.FS.writeFile(data.path,data.data); result=true;
    }else if(type==="READ_FILE"){
      result=core.FS.readFile(data.path,{encoding:data.encoding||"binary"});
    }else if(type==="DELETE_FILE"){
      try{core.FS.unlink(data.path)}catch(_){ } result=true;
    }else if(type==="LIST_DIR"){
      const names=core.FS.readdir(data.path),nodes=[];
      for(const name of names){const full=(data.path==="/"?"":data.path)+"/"+name;const st=core.FS.stat(full);nodes.push({name,isDir:core.FS.isDir(st.mode)})}
      result=nodes;
    }else if(type==="CREATE_DIR"){
      try{core.FS.mkdir(data.path)}catch(_){ } result=true;
    }else if(type==="DELETE_DIR"){
      try{core.FS.rmdir(data.path)}catch(_){ } result=true;
    }else throw new Error("Unknown worker message: "+type);
    const trans=result instanceof Uint8Array?[result.buffer]:[];
    post(id,type,result,trans);
  }catch(e){post(id,"ERROR",String(e&&e.message?e.message:e))}
};`;
  return URL.createObjectURL(new Blob([source],{type:'text/javascript'}))
}

class MiniFFmpeg{
  constructor(){
    this.workerURL=makeWorkerURL(); this.worker=new Worker(this.workerURL); this.id=0; this.pending=new Map(); this.progressCb=null; this.logCb=null;
    this.worker.onmessage=(ev)=>{
      const {id,type,data}=ev.data;
      if(type==='PROGRESS'){if(this.progressCb)this.progressCb(data);return}
      if(type==='LOG'){if(this.logCb)this.logCb(data);return}
      const p=this.pending.get(id); if(!p)return; this.pending.delete(id);
      if(type==='ERROR')p.reject(new Error(data)); else p.resolve(data)
    }
  }
  call(type,data,transfer=[]){return new Promise((resolve,reject)=>{const id=++this.id;this.pending.set(id,{resolve,reject});this.worker.postMessage({id,type,data},transfer)})}
  async load(coreURL,wasmURL){return this.call('LOAD',{coreURL,wasmURL,workerURL:''})}
  async exec(args,timeout=-1){return this.call('EXEC',{args,timeout})}
  async ffprobe(args,timeout=-1){return this.call('FFPROBE',{args,timeout})}
  async writeFile(path,bytes){const u=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes);return this.call('WRITE_FILE',{path,data:u},[u.buffer])}
  async readFile(path,encoding='binary'){return this.call('READ_FILE',{path,encoding})}
  async deleteFile(path){return this.call('DELETE_FILE',{path})}
  async listDir(path='/'){return this.call('LIST_DIR',{path})}
  terminate(){this.worker.terminate();URL.revokeObjectURL(this.workerURL)}
}
let engine=null, engineReady=false, resultURLs=[], previewURL='', sourceURL='', currentFile=null, files=[], audioFile=null, duration=0, selectionStart=0, selectionEnd=0, previewLoop=false;
let resultNote='';

async function blobURL(url,type){
  const r=await fetch(url,{cache:'force-cache'});
  if(!r.ok)throw new Error('Could not load processing engine');
  const b=await r.blob(); return URL.createObjectURL(new Blob([b],{type}))
}
async function ensureEngine(){
  if(engineReady&&engine)return engine;
  status(L.engineLoad,'warn');progress(3,true);
  try{
    if(!engine)engine=new MiniFFmpeg();
    [coreJSBlob,coreWasmBlob]=await Promise.all([
      coreJSBlob||blobURL(CORE_BASE+'/ffmpeg-core.js','text/javascript'),
      coreWasmBlob||blobURL(CORE_BASE+'/ffmpeg-core.wasm','application/wasm')
    ]);
    engine.progressCb=({progress:p})=>{if(Number.isFinite(p))progress(18+clamp(p,0,1)*77,true)};
    engine.logCb=()=>{};
    await engine.load(coreJSBlob,coreWasmBlob); engineReady=true; status(L.engineReady,'ok');progress(100,true);await delay(250);progress(0,false);return engine
  }catch(e){console.error(e);progress(0,false);status(TH?'โหลด video engine ไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วลองใหม่':'Could not load the video engine. Check your connection and try again.','error');throw e}
}
async function del(path){if(engineReady&&path)try{await engine.deleteFile(path)}catch(_){}}
async function clearResults(){
  resultURLs.forEach(u=>URL.revokeObjectURL(u));resultURLs=[];
  const res=document.getElementById('result');if(res)res.classList.remove('on');
  const media=document.getElementById('resultMedia');if(media){media.removeAttribute('src');media.style.display='none'}
  const dl=document.getElementById('downloads');if(dl)dl.innerHTML=''
}
function addDownload(blob,name,label=L.download){
  const url=URL.createObjectURL(blob);resultURLs.push(url);
  const a=document.createElement('a');a.className='btn primary';a.href=url;a.download=name;a.textContent=`${label} ↓`;
  document.getElementById('downloads').appendChild(a);return url
}
function showResult(blob,name,kind='video'){
  const res=document.getElementById('result');res.classList.add('on');
  document.getElementById('resultMeta').textContent=`${name} · ${humanSize(blob.size)}`;
  const url=addDownload(blob,name);
  const media=document.getElementById('resultMedia');
  if(kind==='image'){media.outerHTML='<img id="resultMedia" alt="Result preview">';document.getElementById('resultMedia').src=url}
  else{if(document.getElementById('resultMedia').tagName!=='VIDEO'){document.getElementById('resultMedia').outerHTML='<video id="resultMedia" controls playsinline></video>'};document.getElementById('resultMedia').src=url;document.getElementById('resultMedia').style.display='block'}
}
function qualityArgs(ext,quality='balanced'){
  const crf={smaller:29,balanced:23,high:19}[quality]||23;
  if(ext==='webm')return ['-c:v','libvpx-vp9','-b:v','0','-crf',String(crf+7),'-deadline','good','-cpu-used','5','-c:a','libvorbis','-q:a','4'];
  if(ext==='avi')return ['-c:v','mpeg4','-q:v',quality==='high'?'3':quality==='smaller'?'7':'5','-c:a','libmp3lame','-b:a','128k'];
  return ['-c:v','libx264','-preset','veryfast','-crf',String(crf),'-pix_fmt','yuv420p','-c:a','aac','-b:a','128k']
}
function outputExt(){const fixed=CFG.fixedOutput;const sel=document.getElementById('outputFormat');return fixed||(sel?sel.value:'mp4')}
function resolutionFilter(){
  const sel=document.getElementById('resolution');if(!sel||sel.value==='original')return null;
  const w=Number(sel.value);return `scale=${w}:-2:flags=lanczos`
}
function currentQuality(){const e=document.getElementById('quality');return e?e.value:'balanced'}

async function probeDuration(inputPath){
  const out='__duration.txt';await del(out);
  const code=await engine.ffprobe(['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',inputPath,'-o',out]);
  if(code!==0)return 0;const txt=await engine.readFile(out,'utf8');await del(out);return Number(String(txt).trim())||0
}
async function hasAudio(inputPath){
  const out='__audio_probe.txt';await del(out);
  const code=await engine.ffprobe(['-v','error','-select_streams','a:0','-show_entries','stream=index','-of','csv=p=0',inputPath,'-o',out]);
  if(code!==0)return false;
  const txt=await engine.readFile(out,'utf8');await del(out);
  return String(txt).trim().length>0
}
async function writePrimary(){
  const input=safeInputName(currentFile,0);await del(input);status(L.preparing);progress(8,true);await engine.writeFile(input,await fileToBytes(currentFile));return input
}
async function execChecked(args){
  const code=await engine.exec(args);if(code!==0)throw new Error('FFmpeg returned '+code);return code
}

function buildUI(){
  const root=document.getElementById('video-tool-app');
  const multi=CFG.mode==='merger';
  root.innerHTML=`
    <div id="dropzone" class="drop" role="button">
      <strong>${multi?L.dropMulti:L.drop}</strong>
      <p>${L.browse} · ${L.limit}</p>
      <button id="chooseBtn" class="btn primary" type="button">${L.choose}</button>
      <input id="fileInput" class="hidden-input" type="file" ${multi?'multiple':''} accept="${CFG.mode==='gif-to-mp4'?'.gif,image/gif':'video/*,.mp4,.mov,.webm,.mkv,.avi,.mpeg,.mpg,.m4v,.3gp,.ts,.mts,.m2ts,.flv,.wmv,.gif'}">
      <div class="formats">${L.formats}</div>
    </div>
    <div id="work" class="work">
      <div class="file-row">
        <div class="file-meta"><strong id="fileName">—</strong><span id="fileInfo">—</span></div>
        <button id="changeBtn" class="btn" type="button">${multi?L.addMore:L.change}</button>
      </div>
      <div class="preview-grid">
        <div>
          <div id="previewBox" class="preview-box"><div class="preview-placeholder"><b>${L.browserPreview}</b><span>${L.noPreview}</span></div></div>
          <div id="timelineHolder"></div>
        </div>
        <div id="options" class="panel"></div>
      </div>
      <div class="actionbar">
        <div><div id="status" class="status" aria-live="polite">${L.ready}</div><div id="progress" class="progress"><span id="progressBar"></span></div><div class="engine-note"><b>${L.noUpload}.</b> ${L.localNote}</div></div>
        <button id="processBtn" class="btn primary" type="button">${L.process}</button>
      </div>
      <div id="result" class="result">
        <div class="result-top"><div><strong>${L.result}</strong><br><small id="resultMeta"></small></div><div id="downloads" class="downloads"></div></div>
        <video id="resultMedia" controls playsinline style="display:none"></video>
      </div>
    </div>`;
  bindUpload();
  renderOptions();
}
function opt(v,label,selected=false){return `<option value="${esc(v)}" ${selected?'selected':''}>${esc(label)}</option>`}
function baseVideoOptions(includeOutput=true){
  return `
  ${includeOutput&&!CFG.fixedOutput?`<div class="field"><label for="outputFormat">${L.output}</label><select id="outputFormat">${opt('mp4','MP4',true)}${opt('webm','WebM')}${opt('mov','MOV')}${opt('mkv','MKV')}${opt('avi','AVI')}</select></div>`:''}
  ${CFG.fixedOutput?`<div class="field"><label>${L.output}</label><div class="chip">${esc(CFG.fixedOutput.toUpperCase())}</div></div>`:''}
  <div class="field"><label for="quality">${L.quality}</label><select id="quality">${opt('smaller',L.smaller)}${opt('balanced',L.balanced,true)}${opt('high',L.high)}</select></div>
  <div class="field"><label for="resolution">${L.resolution}</label><select id="resolution">${opt('original',L.original,true)}${opt('1920','1080p max')}${opt('1280','720p max')}${opt('854','480p max')}</select></div>`;
}
function timelineHTML(){
  return `<div class="timeline">
    <div class="split"><div class="field"><label for="startTime">${L.start}</label><input id="startTime" type="text" value="00:00.000"></div><div class="field"><label for="endTime">${L.end}</label><input id="endTime" type="text" value="00:00.000"></div></div>
    <input id="startRange" class="range" type="range" min="0" max="1" step=".001" value="0">
    <input id="endRange" class="range" type="range" min="0" max="1" step=".001" value="1">
    <div class="timeline-line"><span id="timelineSelected" class="timeline-selected"></span><span id="timelinePlay" class="timeline-play"></span></div>
    <div class="time-row"><span>${L.current}: <strong id="currentTime">00:00.000</strong></span><span id="totalTime">00:00.000</span></div>
    <div class="set-row"><button id="setStart" class="btn mini" type="button">${L.setStart}</button><button id="previewSelection" class="btn mini soft" type="button">${L.previewSelection}</button><button id="setEnd" class="btn mini" type="button">${L.setEnd}</button></div>
  </div>`
}
function renderOptions(){
  const o=document.getElementById('options'),m=CFG.mode;
  let s=`<h3>${esc(CFG.uiTitle||'Options')}</h3>`;
  if(m==='convert')s+=baseVideoOptions(true);
  else if(m==='cutter'){s+=baseVideoOptions(true);document.getElementById('timelineHolder').innerHTML=timelineHTML()}
  else if(m==='compressor'){
    s+=`<div class="field"><label for="targetMB">${L.target}</label><input id="targetMB" type="number" min="1" max="2000" step="1" value="${CFG.targetMB||''}" placeholder="${TH?'เช่น 25':'e.g. 25'}"><small>${L.targetHelp}</small></div>${baseVideoOptions(false)}`
  }else if(m==='cropper'){
    s+=`<div class="field"><label for="aspect">${L.aspect}</label><select id="aspect">${opt('16:9','16:9 · Landscape',true)}${opt('9:16','9:16 · Vertical')}${opt('1:1','1:1 · Square')}${opt('4:5','4:5 · Portrait')}${opt('3:2','3:2')}</select></div>${baseVideoOptions(false)}`
  }else if(m==='resizer'){
    s+=`<div class="field"><label for="resizeWidth">${L.width}</label><select id="resizeWidth">${opt('1920','1920 px · 1080p',true)}${opt('1280','1280 px · 720p')}${opt('854','854 px · 480p')}${opt('640','640 px')}${opt('480','480 px')}</select></div>${baseVideoOptions(false)}`
  }else if(m==='merger'){
    s+=`<div class="field"><label>${L.mergeOrder}</label><div id="mergeList" class="merge-list"></div></div><div class="field"><label for="mergeResolution">${L.resolution}</label><select id="mergeResolution">${opt('1280:720','1280×720',true)}${opt('1920:1080','1920×1080')}${opt('854:480','854×480')}</select></div><div class="field"><label for="quality">${L.quality}</label><select id="quality">${opt('smaller',L.smaller)}${opt('balanced',L.balanced,true)}${opt('high',L.high)}</select></div>`
  }else if(m==='video-to-gif'){
    s+=`<div class="field"><label for="gifWidth">${L.gifWidth}</label><select id="gifWidth">${opt('480','480 px')}${opt('640','640 px',true)}${opt('800','800 px')}</select></div><div class="field"><label for="gifFps">${L.fps}</label><select id="gifFps">${opt('8','8 FPS')}${opt('12','12 FPS',true)}${opt('15','15 FPS')}</select></div>`;document.getElementById('timelineHolder').innerHTML=timelineHTML()
  }else if(m==='gif-to-mp4'){
    s+=`<div class="field"><label for="quality">${L.quality}</label><select id="quality">${opt('smaller',L.smaller)}${opt('balanced',L.balanced,true)}${opt('high',L.high)}</select></div>`
  }else if(m==='remove-audio'){
    s+=`<p class="note">${TH?'วิดีโอจะถูกสร้างใหม่โดยไม่มี audio stream':'The exported video is created without an audio stream.'}</p><div class="field"><label for="quality">${L.quality}</label><select id="quality">${opt('smaller',L.smaller)}${opt('balanced',L.balanced,true)}${opt('high',L.high)}</select></div>`
  }else if(m==='add-audio'){
    s+=`<div class="field"><label>${L.audioFile}</label><button id="audioBtn" class="btn soft" type="button">${L.addAudio}</button><input id="audioInput" class="hidden-input" type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"><small id="audioName">—</small></div><div class="field"><label for="audioMode">${L.audioMode}</label><select id="audioMode">${opt('replace',L.replace,true)}${opt('mix',L.mix)}</select></div><div class="field"><label for="quality">${L.quality}</label><select id="quality">${opt('smaller',L.smaller)}${opt('balanced',L.balanced,true)}${opt('high',L.high)}</select></div>`
  }else if(m==='speed'){
    s+=`<div class="field"><label for="speed">${L.speed}</label><select id="speed">${opt('0.5','0.5×')}${opt('0.75','0.75×')}${opt('1.25','1.25×',true)}${opt('1.5','1.5×')}${opt('2','2×')}</select></div><div class="field"><label for="quality">${L.quality}</label><select id="quality">${opt('smaller',L.smaller)}${opt('balanced',L.balanced,true)}${opt('high',L.high)}</select></div>`
  }else if(m==='frames'){
    s+=`<div class="field"><label for="frameInterval">${L.interval}</label><select id="frameInterval">${opt('1',TH?'1 วินาที':'1 second')}${opt('2',TH?'2 วินาที':'2 seconds')}${opt('5',TH?'5 วินาที':'5 seconds',true)}${opt('10',TH?'10 วินาที':'10 seconds')}</select></div><div class="field"><label for="frameFormat">${L.frameFormat}</label><select id="frameFormat">${opt('jpg','JPG',true)}${opt('png','PNG')}</select><small>${L.maxFrames}</small></div>`
  }else if(m==='rotate'){
    s+=`<div class="field"><label for="angle">${L.angle}</label><select id="angle">${opt('cw',TH?'90° ตามเข็มนาฬิกา':'90° clockwise',true)}${opt('ccw',TH?'90° ทวนเข็มนาฬิกา':'90° counter-clockwise')}${opt('180','180°')}</select></div><div class="field"><label for="quality">${L.quality}</label><select id="quality">${opt('smaller',L.smaller)}${opt('balanced',L.balanced,true)}${opt('high',L.high)}</select></div>`
  }
  o.innerHTML=s;
  if(m==='add-audio'){document.getElementById('audioBtn').addEventListener('click',()=>document.getElementById('audioInput').click());document.getElementById('audioInput').addEventListener('change',e=>{audioFile=e.target.files[0]||null;document.getElementById('audioName').textContent=audioFile?audioFile.name:'—'})}
  if(m==='merger')renderMergeList()
  bindTimeline()
}
function bindTimeline(){
  const h=document.getElementById('timelineHolder');if(!h||!h.innerHTML)return;
  const sr=document.getElementById('startRange'),er=document.getElementById('endRange'),si=document.getElementById('startTime'),ei=document.getElementById('endTime');
  const update=(s,e,which='')=>{
    if(!duration)return;const gap=Math.min(.04,duration);s=clamp(s,0,duration);e=clamp(e,0,duration);
    if(which==='s'&&s>e-gap)s=Math.max(0,e-gap);if(which==='e'&&e<s+gap)e=Math.min(duration,s+gap);if(e<s)[s,e]=[e,s];
    selectionStart=s;selectionEnd=e;sr.value=s;er.value=e;si.value=fmtTime(s);ei.value=fmtTime(e);
    const a=(s/duration)*100,b=(e/duration)*100;const sel=document.getElementById('timelineSelected');sel.style.left=a+'%';sel.style.right=(100-b)+'%'
  };
  sr.addEventListener('input',()=>update(Number(sr.value),selectionEnd,'s'));er.addEventListener('input',()=>update(selectionStart,Number(er.value),'e'));
  si.addEventListener('change',()=>{const v=parseTime(si.value);if(Number.isFinite(v))update(v,selectionEnd,'s');else si.value=fmtTime(selectionStart)});
  ei.addEventListener('change',()=>{const v=parseTime(ei.value);if(Number.isFinite(v))update(selectionStart,v,'e');else ei.value=fmtTime(selectionEnd)});
  document.getElementById('setStart').addEventListener('click',()=>{const v=document.getElementById('previewVideo');if(v)update(v.currentTime,selectionEnd,'s')});
  document.getElementById('setEnd').addEventListener('click',()=>{const v=document.getElementById('previewVideo');if(v)update(selectionStart,v.currentTime,'e')});
  document.getElementById('previewSelection').addEventListener('click',async()=>{const v=document.getElementById('previewVideo');if(!v)return;previewLoop=true;v.currentTime=selectionStart;await v.play()});
  window.__setSelection=update
}
function initTimeline(d){
  duration=d||0;selectionStart=0;selectionEnd=duration;
  const sr=document.getElementById('startRange'),er=document.getElementById('endRange');
  if(sr&&er){sr.max=er.max=String(duration);er.value=String(duration);document.getElementById('totalTime').textContent=fmtTime(duration);window.__setSelection(0,duration)}
}
async function buildFallbackPreview(file,videoEl){
  if(!['cutter','video-to-gif'].includes(CFG.mode))return;
  try{
    status(L.buildPreview,'warn');await ensureEngine();
    const inp='__preview_input.'+(extOf(file.name)||'bin'),out='__preview.mp4';
    await del(inp);await del(out);await engine.writeFile(inp,await fileToBytes(file));
    await execChecked(['-hide_banner','-loglevel','error','-i',inp,'-map','0:v:0','-map','0:a:0?','-vf',"scale=w='min(960,iw)':h=-2:flags=bilinear",'-c:v','libx264','-preset','ultrafast','-crf','31','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',out]);
    const data=await engine.readFile(out);const blob=new Blob([data.buffer],{type:'video/mp4'});
    if(previewURL)URL.revokeObjectURL(previewURL);previewURL=URL.createObjectURL(blob);
    videoEl.src=previewURL;videoEl.load();await del(inp);await del(out);status(L.ready,'ok')
  }catch(e){console.error('preview fallback',e);status(L.nativeFail,'warn')}
}
function createPreview(file){
  const box=document.getElementById('previewBox');box.innerHTML='';
  if(CFG.mode==='gif-to-mp4'){
    const img=document.createElement('img');sourceURL&&URL.revokeObjectURL(sourceURL);sourceURL=URL.createObjectURL(file);img.src=sourceURL;img.alt='GIF preview';box.appendChild(img);return
  }
  const v=document.createElement('video');v.id='previewVideo';v.controls=true;v.playsInline=true;v.preload='metadata';
  sourceURL&&URL.revokeObjectURL(sourceURL);sourceURL=URL.createObjectURL(file);v.src=sourceURL;box.appendChild(v);
  v.addEventListener('loadedmetadata',()=>{duration=Number.isFinite(v.duration)?v.duration:0;initTimeline(duration);status(L.ready,'ok')},{once:true});
  v.addEventListener('timeupdate',()=>{const c=document.getElementById('currentTime'),p=document.getElementById('timelinePlay');if(c)c.textContent=fmtTime(v.currentTime);if(p&&duration)p.style.left=(v.currentTime/duration*100)+'%';if(previewLoop&&v.currentTime>=selectionEnd-.03){v.pause();v.currentTime=selectionEnd;previewLoop=false} });
  let fallbackTried=false;v.addEventListener('error',()=>{if(!fallbackTried){fallbackTried=true;buildFallbackPreview(file,v)}else status(L.nativeFail,'warn')})
}
function bindUpload(){
  const drop=document.getElementById('dropzone'),inp=document.getElementById('fileInput'),choose=document.getElementById('chooseBtn'),change=document.getElementById('changeBtn');
  choose.addEventListener('click',e=>{e.stopPropagation();inp.click()});drop.addEventListener('click',e=>{if(e.target!==choose)inp.click()});
  inp.addEventListener('change',()=>handleFiles([...inp.files]));
  change.addEventListener('click',()=>{inp.value='';inp.click()});
  ['dragenter','dragover'].forEach(n=>drop.addEventListener(n,e=>{e.preventDefault();drop.classList.add('drag')}));
  ['dragleave','drop'].forEach(n=>drop.addEventListener(n,e=>{e.preventDefault();drop.classList.remove('drag')}));
  drop.addEventListener('drop',e=>handleFiles([...e.dataTransfer.files]));
  document.getElementById('processBtn').addEventListener('click',process)
}
function handleFiles(incoming){
  const valid=incoming.filter(f=>f&&f.size<=350*1024*1024);
  if(!valid.length){status(incoming.some(f=>f.size>350*1024*1024)?L.tooLarge:L.invalid,'error');return}
  clearResults();
  if(CFG.mode==='merger'){files=[...files,...valid];currentFile=files[0];renderMergeList();document.getElementById('fileName').textContent=`${files.length} ${TH?'ไฟล์':'files'}`;document.getElementById('fileInfo').textContent=files.map(f=>f.name).join(' · ');createPreview(files[0])}
  else{currentFile=valid[0];files=[currentFile];document.getElementById('fileName').textContent=currentFile.name;document.getElementById('fileInfo').textContent=`${humanSize(currentFile.size)} · ${extOf(currentFile.name).toUpperCase()}`;createPreview(currentFile)}
  document.getElementById('dropzone').hidden=true;document.getElementById('work').classList.add('active');status(L.ready,'ok')
}
function renderMergeList(){
  const list=document.getElementById('mergeList');if(!list)return;
  list.innerHTML=files.map((f,i)=>`<div class="merge-item"><span class="merge-num">${i+1}</span><span class="merge-name">${esc(f.name)}</span><span class="merge-actions"><button class="btn mini up" data-i="${i}" type="button">↑</button><button class="btn mini down" data-i="${i}" type="button">↓</button><button class="btn mini rm" data-i="${i}" type="button">×</button></span></div>`).join('');
  list.querySelectorAll('.up').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i>0){[files[i-1],files[i]]=[files[i],files[i-1]];renderMergeList()}});
  list.querySelectorAll('.down').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i<files.length-1){[files[i+1],files[i]]=[files[i],files[i+1]];renderMergeList()}});
  list.querySelectorAll('.rm').forEach(b=>b.onclick=()=>{files.splice(+b.dataset.i,1);currentFile=files[0]||null;renderMergeList();document.getElementById('fileName').textContent=files.length?`${files.length} ${TH?'ไฟล์':'files'}`:'—'})
}

async function process(){
  await clearResults();
  if(CFG.mode==='merger'&&files.length<2){status(L.needMulti,'error');return}
  if(CFG.mode!=='merger'&&!currentFile){status(L.invalid,'error');return}
  if(CFG.mode==='add-audio'&&!audioFile){status(L.needAudio,'error');return}
  if((CFG.mode==='cutter'||CFG.mode==='video-to-gif')&&selectionEnd<=selectionStart){status(L.needRange,'error');return}
  const btn=document.getElementById('processBtn');btn.disabled=true;resultNote='';
  try{
    await ensureEngine();status(L.preparing);progress(7,true);
    if(CFG.mode==='convert')await doConvert();
    else if(CFG.mode==='cutter')await doCut();
    else if(CFG.mode==='compressor')await doCompress();
    else if(CFG.mode==='cropper')await doCrop();
    else if(CFG.mode==='resizer')await doResize();
    else if(CFG.mode==='merger')await doMerge();
    else if(CFG.mode==='video-to-gif')await doGIF();
    else if(CFG.mode==='gif-to-mp4')await doGifToMp4();
    else if(CFG.mode==='remove-audio')await doRemoveAudio();
    else if(CFG.mode==='add-audio')await doAddAudio();
    else if(CFG.mode==='speed')await doSpeed();
    else if(CFG.mode==='frames')await doFrames();
    else if(CFG.mode==='rotate')await doRotate();
    status(resultNote||L.done,resultNote?'warn':'ok');progress(100,true);setTimeout(()=>progress(0,false),700)
  }catch(e){console.error(e);status(L.failed,'error');progress(0,false)}
  finally{btn.disabled=false}
}
async function readOutput(out,kind='video'){
  const data=await engine.readFile(out);const ext=extOf(out);const blob=new Blob([data.buffer],{type:mimeFor(ext)});const name=`${cleanName(currentFile?.name||'video')}-${CFG.slug||CFG.mode}.${ext}`;showResult(blob,name,kind);await del(out)
}
async function doConvert(){
  const input=await writePrimary(),ext=outputExt(),out=`output.${ext}`,vf=resolutionFilter(),args=['-hide_banner','-loglevel','error','-i',input,'-map','0:v:0','-map','0:a:0?'];
  if(vf)args.push('-vf',vf);args.push(...qualityArgs(ext,currentQuality()));if(ext==='mp4'||ext==='mov')args.push('-movflags','+faststart');args.push(out);status(L.processing);await execChecked(args);await readOutput(out);await del(input)
}
async function doCut(){
  const input=await writePrimary(),ext=outputExt(),out=`output.${ext}`,vf=resolutionFilter(),dur=selectionEnd-selectionStart,args=['-hide_banner','-loglevel','error','-ss',selectionStart.toFixed(3),'-i',input,'-t',dur.toFixed(3),'-map','0:v:0','-map','0:a:0?'];
  if(vf)args.push('-vf',vf);args.push(...qualityArgs(ext,currentQuality()));if(ext==='mp4'||ext==='mov')args.push('-movflags','+faststart');args.push(out);status(L.processing);await execChecked(args);await readOutput(out);await del(input)
}
async function doCompress(){
  const input=await writePrimary(),out='output.mp4';let d=duration;if(!d)d=await probeDuration(input);
  const targetEl=document.getElementById('targetMB'),target=Number(targetEl?.value||0),args=['-hide_banner','-loglevel','error','-i',input,'-map','0:v:0','-map','0:a:0?'];
  const vf=resolutionFilter();if(vf)args.push('-vf',vf);
  if(d>0&&currentFile){
    // A target derived only from size/duration can exceed the source's own
    // bitrate, which would make the file bigger. Always stay below the source
    // so "compress" is true even when it already fits the target.
    const sourceKbps=currentFile.size*8/1024/d, ceiling=sourceKbps*.6;
    const wanted=target>0?target*8192/d*.94:ceiling;
    const total=Math.max(64,Math.min(wanted,ceiling));
    const audio=Math.min(128,Math.max(48,total*.11)),video=Math.max(48,total-audio);
    if(target>0&&currentFile.size<=target*1024*1024)resultNote=L.alreadyUnder(target);
    args.push('-c:v','libx264','-preset','veryfast','-b:v',`${Math.round(video)}k`,'-maxrate',`${Math.round(video*1.15)}k`,'-bufsize',`${Math.round(video*2)}k`,'-pix_fmt','yuv420p','-c:a','aac','-b:a',`${Math.round(audio)}k`)
  }else args.push(...qualityArgs('mp4',currentQuality()));
  args.push('-movflags','+faststart',out);status(L.processing);await execChecked(args);await readOutput(out);await del(input)
}
async function doCrop(){
  const input=await writePrimary(),out='output.mp4',r=document.getElementById('aspect').value.split(':').map(Number),ratio=r[0]/r[1];
  const filter=`crop=if(gt(iw/ih\\,${ratio})\\,ih*${ratio}\\,iw):if(gt(iw/ih\\,${ratio})\\,ih\\,iw/${ratio}):(iw-ow)/2:(ih-oh)/2`;
  const args=['-hide_banner','-loglevel','error','-i',input,'-vf',filter,'-map','0:v:0','-map','0:a:0?',...qualityArgs('mp4',currentQuality()),'-movflags','+faststart',out];
  status(L.processing);await execChecked(args);await readOutput(out);await del(input)
}
async function doResize(){
  const input=await writePrimary(),out='output.mp4',w=Number(document.getElementById('resizeWidth').value),args=['-hide_banner','-loglevel','error','-i',input,'-vf',`scale=${w}:-2:flags=lanczos`,'-map','0:v:0','-map','0:a:0?',...qualityArgs('mp4',currentQuality()),'-movflags','+faststart',out];
  status(L.processing);await execChecked(args);await readOutput(out);await del(input)
}
async function doMerge(){
  const [W,H]=document.getElementById('mergeResolution').value.split(':');const temps=[];
  for(let i=0;i<files.length;i++){
    const inp=safeInputName(files[i],i),tmp=`norm${i}.mp4`;await del(inp);await del(tmp);status(`${L.preparing} ${i+1}/${files.length}`);await engine.writeFile(inp,await fileToBytes(files[i]));
    const vf=`scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30`;
    if(await hasAudio(inp)){
      await execChecked(['-hide_banner','-loglevel','error','-i',inp,'-vf',vf,'-map','0:v:0','-map','0:a:0',...qualityArgs('mp4',currentQuality()),'-ar','44100','-ac','2','-movflags','+faststart',tmp])
    }else{
      await execChecked(['-hide_banner','-loglevel','error','-i',inp,'-f','lavfi','-i','anullsrc=channel_layout=stereo:sample_rate=44100','-shortest','-vf',vf,'-map','0:v:0','-map','1:a:0',...qualityArgs('mp4',currentQuality()),'-ar','44100','-ac','2','-movflags','+faststart',tmp])
    }
    temps.push({inp,tmp})
  }
  const list=temps.map(x=>`file '${x.tmp}'`).join('\n');await engine.writeFile('concat.txt',new TextEncoder().encode(list));const out='output.mp4';
  let code=await engine.exec(['-hide_banner','-loglevel','error','-f','concat','-safe','0','-i','concat.txt','-c','copy','-movflags','+faststart',out]);
  if(code!==0)throw new Error('merge failed');await readOutput(out);await del('concat.txt');for(const x of temps){await del(x.inp);await del(x.tmp)}
}
async function doGIF(){
  const input=await writePrimary(),out='output.gif',w=document.getElementById('gifWidth').value,fps=document.getElementById('gifFps').value,dur=selectionEnd-selectionStart;
  const vf=`fps=${fps},scale=${w}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`;
  await execChecked(['-hide_banner','-loglevel','error','-ss',selectionStart.toFixed(3),'-i',input,'-t',dur.toFixed(3),'-vf',vf,'-loop','0',out]);const data=await engine.readFile(out);const blob=new Blob([data.buffer],{type:'image/gif'});const name=`${cleanName(currentFile.name)}-clip.gif`;showResult(blob,name,'image');await del(out);await del(input)
}
async function doGifToMp4(){
  const input=await writePrimary(),out='output.mp4',args=['-hide_banner','-loglevel','error','-i',input,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-an',...qualityArgs('mp4',currentQuality()).filter(x=>!['-c:a','aac','-b:a','128k'].includes(x)),'-movflags','+faststart',out];
  await execChecked(args);await readOutput(out);await del(input)
}
async function doRemoveAudio(){
  const input=await writePrimary(),out='output.mp4',q=qualityArgs('mp4',currentQuality()),videoOnly=[];for(let i=0;i<q.length;i++){if(q[i]==='-c:a'||q[i]==='-b:a'){i++;continue}videoOnly.push(q[i])}
  await execChecked(['-hide_banner','-loglevel','error','-i',input,'-map','0:v:0','-an',...videoOnly,'-movflags','+faststart',out]);await readOutput(out);await del(input)
}
async function doAddAudio(){
  const video=await writePrimary(),aud=safeInputName(audioFile,1),out='output.mp4';await del(aud);await engine.writeFile(aud,await fileToBytes(audioFile));const mode=document.getElementById('audioMode').value;
  let code;
  if(mode==='mix'){
    const args=['-hide_banner','-loglevel','error','-i',video,'-i',aud,'-filter_complex','[0:a:0][1:a:0]amix=inputs=2:duration=first:dropout_transition=2[a]','-map','0:v:0','-map','[a]',...qualityArgs('mp4',currentQuality()),'-movflags','+faststart',out];
    code=await engine.exec(args)
  }
  if(mode!=='mix'||code!==0){
    await del(out);await execChecked(['-hide_banner','-loglevel','error','-i',video,'-i',aud,'-map','0:v:0','-map','1:a:0','-af','apad',...qualityArgs('mp4',currentQuality()),'-shortest','-movflags','+faststart',out])
  }
  await readOutput(out);await del(video);await del(aud)
}
function atempo(speed){
  if(speed<0.5)return `atempo=0.5,atempo=${(speed/0.5).toFixed(4)}`;
  if(speed>2)return `atempo=2,atempo=${(speed/2).toFixed(4)}`;
  return `atempo=${speed}`
}
async function doSpeed(){
  const input=await writePrimary(),out='output.mp4',s=Number(document.getElementById('speed').value),filter=`[0:v]setpts=${(1/s).toFixed(6)}*PTS[v];[0:a]${atempo(s)}[a]`;
  let code=await engine.exec(['-hide_banner','-loglevel','error','-i',input,'-filter_complex',filter,'-map','[v]','-map','[a]',...qualityArgs('mp4',currentQuality()),'-movflags','+faststart',out]);
  if(code!==0){await del(out);await execChecked(['-hide_banner','-loglevel','error','-i',input,'-vf',`setpts=${(1/s).toFixed(6)}*PTS`,'-an',...qualityArgs('mp4',currentQuality()).filter((x,i,a)=>!(x==='-c:a'||x==='-b:a'||(i>0&&(a[i-1]==='-c:a'||a[i-1]==='-b:a')))),'-movflags','+faststart',out])}
  await readOutput(out);await del(input)
}
// The mjpeg encoder traps the WebAssembly core when writing a numbered output
// pattern, so frames are always extracted as PNG and converted in a canvas when
// the reader asked for JPG.
async function pngToJpeg(blob){
  const bitmap=await createImageBitmap(blob);
  const canvas=new OffscreenCanvas(bitmap.width,bitmap.height);
  canvas.getContext('2d').drawImage(bitmap,0,0);
  bitmap.close();
  return canvas.convertToBlob({type:'image/jpeg',quality:.85})
}
async function doFrames(){
  const input=await writePrimary(),ext=document.getElementById('frameFormat').value,ival=Number(document.getElementById('frameInterval').value),pattern='frame-%03d.png';
  await execChecked(['-hide_banner','-loglevel','error','-i',input,'-vf',`fps=1/${ival}`,'-frames:v','100',pattern]);const nodes=await engine.listDir('/');const names=nodes.map(n=>n.name).filter(n=>/^frame-\d+\.png$/.test(n)).sort();
  const res=document.getElementById('result');res.classList.add('on');document.getElementById('resultMeta').textContent=`${L.framesReady} · ${names.length} ${TH?'ภาพ':'images'}`;const dl=document.getElementById('downloads');dl.innerHTML='';
  const blobs=[];
  for(const n of names){
    const data=await engine.readFile(n);let blob=new Blob([data.buffer],{type:'image/png'}),name=n;
    if(ext==='jpg'){blob=await pngToJpeg(blob);name=n.replace(/\.png$/,'.jpg')}
    blobs.push([name,blob]);addDownload(blob,name,name);await del(n)
  }
  if(window.JSZip&&blobs.length){const zip=new JSZip();for(const [n,b] of blobs)zip.file(n,b);const zb=await zip.generateAsync({type:'blob'});addDownload(zb,`${cleanName(currentFile.name)}-frames.zip`,L.zip)}
  document.getElementById('resultMedia').style.display='none';await del(input)
}
async function doRotate(){
  const input=await writePrimary(),out='output.mp4',a=document.getElementById('angle').value,vf=a==='cw'?'transpose=1':a==='ccw'?'transpose=2':'hflip,vflip';
  await execChecked(['-hide_banner','-loglevel','error','-i',input,'-vf',vf,'-map','0:v:0','-map','0:a:0?',...qualityArgs('mp4',currentQuality()),'-movflags','+faststart',out]);await readOutput(out);await del(input)
}

buildUI();
window.addEventListener('beforeunload',()=>{[sourceURL,previewURL,...resultURLs,coreJSBlob,coreWasmBlob].filter(Boolean).forEach(u=>URL.revokeObjectURL(u));if(engine)engine.terminate()});
})();
