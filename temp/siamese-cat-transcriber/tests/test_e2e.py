from __future__ import annotations

import base64
import re
import shutil
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright
from app.config import Settings
from app.main import render_home

pytestmark = pytest.mark.e2e


def install_ui(page, root: Path):
    html = render_home(Settings(public_base_path="", session_cookie_secure=False), "en")
    css = (root / "app/static/styles.css").read_text(encoding="utf-8")
    js = (root / "app/static/app.js").read_text(encoding="utf-8")
    logo = base64.b64encode((root / "app/static/assets/djai-logo-small.webp").read_bytes()).decode()
    html = html.replace('/static/assets/djai-logo-small.webp', f'data:image/webp;base64,{logo}')
    html = re.sub(r'<link rel="stylesheet" href="/static/styles.css">', '', html)
    html = re.sub(r'<script src="/static/app.js" defer></script>', '', html)
    page.set_content(html, wait_until="domcontentloaded")
    page.add_style_tag(content=css)
    page.evaluate(r"""
    () => {
      const now = new Date().toISOString();
      const fixture = window.__apiFixture = { jobs: [], polls: 0 };
      const makeResult = () => ({
        text: 'Welcome to DJAI Video to Text. This browser fixture verifies editing and production export.',
        language: 'en', language_probability: .99, backend: 'mock-e2e',
        segments: [
          {id:0,start:0,end:3,text:'Welcome to DJAI Video to Text.',speaker:'SPEAKER_01',words:[{word:'Welcome',start:0,end:.5,probability:.99}]},
          {id:1,start:3,end:6,text:'This browser fixture verifies editing and search.',speaker:'SPEAKER_02',words:[{word:'browser',start:3,end:3.5,probability:.99}]},
          {id:2,start:6,end:9,text:'Production export is ready.',speaker:'SPEAKER_01',words:[{word:'Production',start:6,end:6.5,probability:.99}]}
        ]
      });
      const json = (obj, status=200) => Promise.resolve(new Response(JSON.stringify(obj), {status, headers:{'Content-Type':'application/json'}}));
      window.fetch = async (input, opts={}) => {
        const url = typeof input === 'string' ? input : input.url;
        const method = (opts.method || 'GET').toUpperCase();
        if (url === '/api/system') return json({ffmpeg:true,ffprobe:true,gpu_available:false,gpu_name:null,faster_whisper_installed:true,pyannote_installed:true,configured_backend:'mock',mock_allowed:true,speaker_recognition_ready:true,max_upload_mb:2048,models:{small:{}}});
        if (url.startsWith('/api/jobs?')) {
          fixture.polls++;
          fixture.jobs.forEach(j => { if(j.status==='processing' && fixture.polls>1){j.status='completed';j.progress=100;j.message='Transcript ready';} });
          return json({jobs: fixture.jobs});
        }
        if (url === '/api/jobs' && method === 'POST') {
          const file = opts.body.get('file');
          const job={id:'ui-job-1',filename:file.name,stored_name:'ui-job-1.wav',media_type:file.type,size_bytes:file.size,status:'processing',progress:55,message:'Transcribing speech locally',error:null,created_at:now,updated_at:now,options:{model:opts.body.get('model'),language:opts.body.get('language'),diarize:opts.body.get('diarize')==='true',translate:false,denoise:false},duration_seconds:9,detected_language:'en',backend:'mock-e2e',result:makeResult()};
          fixture.jobs.unshift(job); return json(job,202);
        }
        const jobMatch = url.match(/^\/api\/jobs\/([^/]+)$/);
        if (jobMatch && method==='GET') { const j=fixture.jobs.find(x=>x.id===jobMatch[1]); return j?json(j):json({detail:'Job not found'},404); }
        if (jobMatch && method==='DELETE') { fixture.jobs=fixture.jobs.filter(x=>x.id!==jobMatch[1]); return json({ok:true}); }
        const segMatch=url.match(/^\/api\/jobs\/([^/]+)\/segments\/(\d+)$/);
        if(segMatch && method==='PATCH'){const j=fixture.jobs.find(x=>x.id===segMatch[1]);const body=JSON.parse(opts.body);const s=j.result.segments.find(x=>x.id===Number(segMatch[2]));s.text=body.text;j.result.text=j.result.segments.map(x=>x.text).join(' ');return json(j);}
        const spMatch=url.match(/^\/api\/jobs\/([^/]+)\/speakers$/);
        if(spMatch && method==='PATCH'){const j=fixture.jobs.find(x=>x.id===spMatch[1]);const body=JSON.parse(opts.body);j.result.segments.forEach(s=>{if(s.speaker===body.old)s.speaker=body.new});return json(j);}
        const exportMatch=url.match(/^\/api\/jobs\/([^/]+)\/export\/(\w+)$/);
        if(exportMatch){const j=fixture.jobs.find(x=>x.id===exportMatch[1]);const text=j.result.segments.map(s=>`${s.speaker}: ${s.text}`).join('\n');return Promise.resolve(new Response(text,{status:200,headers:{'Content-Type':'text/plain'}}));}
        if(url.includes('/retry') && method==='POST'){return json(fixture.jobs[0]);}
        return json({detail:`Unhandled fixture route ${method} ${url}`},404);
      };
    }
    """)
    page.add_script_tag(content=js)


def test_browser_ui_e2e(tmp_path: Path):
    chromium = shutil.which("chromium") or shutil.which("google-chrome")
    if not chromium: pytest.skip("system Chromium not available")
    root = Path(__file__).resolve().parents[1]
    errors=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,executable_path=chromium,args=["--no-sandbox","--disable-dev-shm-usage"])
        page=browser.new_page(viewport={"width":1440,"height":1100},accept_downloads=True)
        page.on("pageerror", lambda e: errors.append(str(e)))
        install_ui(page,root)
        assert "Convert video to text" in page.locator("h1").inner_text()
        assert page.locator("#systemBadge").inner_text()=="CPU"

        wav=tmp_path/"browser-e2e.wav"; wav.write_bytes(b"RIFF"+b"0"*4096)
        page.locator("#diarizeToggle + .switch-track").click()
        page.locator("#fileInput").set_input_files(str(wav))
        assert "1 file selected" in page.locator("#selectedSummary").inner_text()
        page.locator("#transcribeButton").click()
        page.locator(".job-status.completed").wait_for(timeout=5000)
        page.get_by_role("button",name="Open transcript").first.click()
        page.locator("#transcriptSegments .segment").first.wait_for()
        assert page.locator("#transcriptTitle").inner_text()=="browser-e2e.wav"
        assert page.locator(".segment-speaker").count()==3

        first=page.locator(".segment-text").first
        first.fill("Browser E2E edited transcript.")
        first.blur()
        page.wait_for_function("() => window.__apiFixture.jobs[0].result.segments[0].text === 'Browser E2E edited transcript.'")

        page.locator("#searchInput").fill("production")
        assert page.locator(".segment:not(.hidden-by-search)").count()==1
        page.locator("#searchInput").fill("")

        page.once("dialog",lambda d:d.accept("Host"))
        page.locator(".segment-speaker").first.click()
        page.get_by_text("Host",exact=True).first.wait_for()

        page.locator("#exportButton").click()
        with page.expect_download(timeout=5000) as dl_info:
            page.locator("#exportMenu button[data-format='txt']").click()
        download=dl_info.value
        exported=tmp_path/download.suggested_filename; download.save_as(exported)
        assert "Browser E2E edited transcript." in exported.read_text(encoding="utf-8")

        desktop=tmp_path/"desktop-e2e.png"; page.screenshot(path=str(desktop),full_page=True); assert desktop.stat().st_size>10_000
        page.locator("#backButton").click()
        page.set_viewport_size({"width":390,"height":844})
        assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1")
        page.locator("#menuButton").click()
        assert page.locator("#mainNav").evaluate("el => el.classList.contains('open')")
        mobile=tmp_path/"mobile-e2e.png"; page.screenshot(path=str(mobile),full_page=False); assert mobile.stat().st_size>5000
        assert errors==[], errors
        browser.close()
