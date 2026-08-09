from __future__ import annotations

import json
import mimetypes
import os
import re
import shutil
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, Form, HTTPException, Request, Response, UploadFile
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from .config import Settings
from .db import Database
from .services.exporter import MIME, export_job
from .services.jobs import JobRunner, now_iso
from .services.system_info import collect_system_info
from .services.transcribe import MODEL_INFO

STATIC_DIR = Path(__file__).parent / "static"
SAFE_EXTENSIONS = {
    ".mp3", ".wav", ".m4a", ".aac", ".flac", ".ogg", ".oga", ".opus", ".wma", ".aif", ".aiff", ".amr",
    ".mp4", ".mov", ".mkv", ".webm", ".avi", ".m4v", ".mpeg", ".mpg", ".wmv", ".3gp", ".ts", ".mts", ".m2ts", ".vob",
}

PAGE_COPY = {
    "en": {
        "lang": "en",
        "title": "Video to Text Converter — Free, No Sign-Up | DJAI",
        "description": "Convert video to text online with DJAI's free AI video transcription tool. No account, email, or credit card required. Edit timestamps and export TXT, SRT, VTT, DOCX, PDF, CSV, or JSON.",
        "canonical_path": "/tools/video-to-text/en/",
        "hero_kicker": "FREE AI VIDEO TRANSCRIPTION · NO SIGN-UP",
        "hero_title": "Convert video to text without creating an account.",
        "hero_body": "Upload a video or audio file, choose the language and quality, then edit a timestamped transcript and export it. No email wall, no trial checkout, and no account to create.",
        "trust": ["No sign-up or email", "Timestamped transcript editor", "TXT · SRT · VTT · DOCX · PDF"],
        "guide_title": "A video to text converter for the work after the recording",
        "guide_body": "Use it to turn a meeting, lecture, interview, podcast, product demo, or social-video recording into text you can search, quote, caption, or reuse. The service extracts audio, transcribes speech with Whisper, and keeps the transcript available in your anonymous browser session until you delete it.",
        "faq_title": "Video transcription questions, answered",
        "faq": [
            ("Do I need to sign up or give an email address?", "No. DJAI Video to Text starts without an account, email address, or credit card. Your browser receives an anonymous session token so only you can access the jobs you create."),
            ("Can I transcribe MP4, MOV, MKV, WebM, MP3, or WAV?", "Yes. Choose a common audio or video file. The service checks the file type, uses FFmpeg to prepare its audio, and then transcribes the speech."),
            ("What can I download after transcription?", "You can export plain text, subtitle files (SRT or VTT), CSV, JSON with word timestamps, DOCX, or PDF. Review the transcript before publishing captions or quotes."),
            ("Is the transcript always perfect?", "No transcription system is perfect. Names, strong accents, crosstalk, background noise, specialist terms, and low-quality audio need review. Use the editor and synchronized playback before relying on important wording."),
        ],
    },
    "th": {
        "lang": "th",
        "title": "แปลงวิดีโอเป็นข้อความฟรี ไม่ต้องสมัคร | DJAI",
        "description": "แปลงวิดีโอเป็นข้อความออนไลน์ด้วย AI ฟรีจาก DJAI ไม่ต้องสมัครสมาชิก ไม่ต้องใช้อีเมลหรือบัตรเครดิต แก้ไข transcript พร้อมเวลา แล้วส่งออก TXT, SRT, VTT, DOCX, PDF, CSV หรือ JSON ได้",
        "canonical_path": "/tools/video-to-text/",
        "hero_kicker": "ถอดเสียงวิดีโอด้วย AI ฟรี · ไม่ต้องสมัคร",
        "hero_title": "แปลงวิดีโอเป็นข้อความ โดยไม่ต้องสร้างบัญชี",
        "hero_body": "อัปโหลดไฟล์วิดีโอหรือเสียง เลือกภาษาและคุณภาพ แล้วแก้ไข transcript ที่มีเวลาให้พร้อมส่งออกได้เลย ไม่มีการบังคับกรอกอีเมล ไม่มีขั้นตอนทดลองใช้ และไม่ต้องสมัครสมาชิก",
        "trust": ["ไม่ต้องสมัครหรือใช้อีเมล", "แก้ไข transcript พร้อมเวลา", "TXT · SRT · VTT · DOCX · PDF"],
        "guide_title": "เครื่องมือแปลงวิดีโอเป็นข้อความ สำหรับงานหลังจากกดบันทึก",
        "guide_body": "ใช้เปลี่ยนการประชุม บทเรียน สัมภาษณ์ podcast product demo หรือวิดีโอโซเชียลให้เป็นข้อความที่ค้นหา อ้างอิง ทำซับไตเติล หรือนำไปใช้ต่อได้ ระบบจะแยกเสียง ถอดคำพูดด้วย Whisper และเก็บ transcript ไว้ใน session แบบไม่ระบุตัวตนของ browser จนกว่าคุณจะลบเอง",
        "faq_title": "คำถามเกี่ยวกับการถอดเสียงวิดีโอ",
        "faq": [
            ("ต้องสมัครสมาชิกหรือให้อีเมลไหม?", "ไม่ต้อง DJAI Video to Text เริ่มใช้งานได้โดยไม่สร้างบัญชี ไม่ต้องใช้อีเมลและไม่ต้องใช้บัตรเครดิต Browser จะได้รับ session แบบไม่ระบุตัวตนเพื่อให้เข้าถึงได้เฉพาะงานที่คุณสร้าง"),
            ("ถอดเสียง MP4, MOV, MKV, WebM, MP3 หรือ WAV ได้ไหม?", "ได้ เลือกไฟล์เสียงหรือวิดีโอทั่วไป ระบบจะตรวจชนิดไฟล์ ใช้ FFmpeg เตรียมเสียง แล้วจึงถอดคำพูด"),
            ("หลังถอดเสียงแล้วดาวน์โหลดอะไรได้บ้าง?", "ส่งออกเป็นข้อความธรรมดา ซับไตเติล SRT หรือ VTT, CSV, JSON พร้อม word timestamps, DOCX หรือ PDF ได้ ควรตรวจ transcript ก่อนนำคำพูดหรือซับไตเติลไปเผยแพร่"),
            ("transcript ถูกต้องสมบูรณ์เสมอไหม?", "ไม่ ระบบถอดเสียงไม่มีระบบใดถูกต้องสมบูรณ์ ชื่อเฉพาะ สำเนียงหนัก คนพูดทับกัน เสียงรบกวน คำเฉพาะทาง และเสียงคุณภาพต่ำควรตรวจทานด้วย editor และ playback ที่ซิงก์กันก่อนใช้ข้อความสำคัญ"),
        ],
    },
}


def sanitize_filename(name: str) -> str:
    base = Path(name or "upload").name
    base = re.sub(r"[^\w.()\- ]+", "_", base, flags=re.UNICODE).strip(" .")
    return base[:180] or "upload"


def session_owner(request: Request, response: Response, settings: Settings) -> str:
    """Return an anonymous, HttpOnly session id without asking for user details."""
    existing = request.cookies.get(settings.session_cookie_name)
    if existing and re.fullmatch(r"[a-f0-9]{32}", existing):
        return existing
    owner_id = uuid.uuid4().hex
    response.set_cookie(
        settings.session_cookie_name,
        owner_id,
        max_age=60 * 60 * 24 * 30,
        httponly=True,
        secure=settings.session_cookie_secure,
        samesite="lax",
        path=settings.session_cookie_path,
    )
    return owner_id


def render_home(settings: Settings, locale: str) -> str:
    copy = PAGE_COPY[locale]
    template = (STATIC_DIR / "index.html").read_text(encoding="utf-8")
    origin = "https://www.djai.academy"
    base_path = settings.public_base_path
    canonical = f"{origin}{copy['canonical_path']}"
    alternates = {
        "th": f"{origin}{PAGE_COPY['th']['canonical_path']}",
        "en": f"{origin}{PAGE_COPY['en']['canonical_path']}",
    }
    switch_to_english = locale == "th"
    switch_url = alternates["en"] if switch_to_english else alternates["th"]
    faq_html = "".join(
        f"<details><summary>{question}</summary><p>{answer}</p></details>"
        for question, answer in copy["faq"]
    )
    schema = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "DJAI Video to Text" if locale == "en" else "DJAI แปลงวิดีโอเป็นข้อความ",
            "url": canonical,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web browser",
            "inLanguage": locale,
            "description": copy["description"],
            "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
            "publisher": {"@type": "Organization", "name": "DJAI Academy", "url": f"{origin}/"},
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "DJAI Tools", "item": f"{origin}{'/tools/en/' if locale == 'en' else '/tools/'}"},
                {"@type": "ListItem", "position": 2, "name": "Video to Text", "item": canonical},
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in copy["faq"]],
        },
    ]
    replacements = {
        "{{LANG}}": copy["lang"],
        "{{TITLE}}": copy["title"],
        "{{DESCRIPTION}}": copy["description"],
        "{{CANONICAL}}": canonical,
        "{{TH_ALTERNATE}}": alternates["th"],
        "{{EN_ALTERNATE}}": alternates["en"],
        "{{BASE_PATH}}": base_path,
        "{{BASE_PATH_JSON}}": json.dumps(base_path),
        "{{LOCALE}}": locale,
        "{{LOCALE_JSON}}": json.dumps(locale),
        "{{LOCALE_SWITCH_URL}}": switch_url,
        "{{LOCALE_SWITCH_LANG}}": "en" if switch_to_english else "th",
        "{{LOCALE_SWITCH_LABEL}}": "EN" if switch_to_english else "ไทย",
        "{{HERO_KICKER}}": copy["hero_kicker"],
        "{{HERO_TITLE}}": copy["hero_title"],
        "{{HERO_BODY}}": copy["hero_body"],
        "{{TRUST_ONE}}": copy["trust"][0],
        "{{TRUST_TWO}}": copy["trust"][1],
        "{{TRUST_THREE}}": copy["trust"][2],
        "{{GUIDE_TITLE}}": copy["guide_title"],
        "{{GUIDE_BODY}}": copy["guide_body"],
        "{{FAQ_TITLE}}": copy["faq_title"],
        "{{FAQ_HTML}}": faq_html,
        "{{SCHEMA}}": json.dumps(schema, ensure_ascii=False, separators=(",", ":")),
    }
    for source, target in replacements.items():
        template = template.replace(source, target)
    return template


class SegmentPatch(BaseModel):
    text: str | None = Field(default=None, max_length=20000)
    speaker: str | None = Field(default=None, max_length=100)


class SpeakerRename(BaseModel):
    old: str = Field(min_length=1, max_length=100)
    new: str = Field(min_length=1, max_length=100)


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or Settings.from_env()
    settings.ensure_dirs()
    db = Database(settings.database_path)
    runner = JobRunner(settings, db)

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        runner.recover_queued()
        yield
        runner.executor.shutdown(wait=False, cancel_futures=False)

    app = FastAPI(title=settings.app_name, version="1.0.0", lifespan=lifespan, root_path=settings.public_base_path)
    app.state.settings = settings
    app.state.db = db
    app.state.runner = runner
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

    @app.get("/", response_class=HTMLResponse)
    @app.get("/th", response_class=HTMLResponse)
    @app.get("/th/", response_class=HTMLResponse)
    def thai_home() -> HTMLResponse:
        return HTMLResponse(render_home(settings, "th"), headers={"Cache-Control": "no-cache"})

    @app.get("/en", response_class=HTMLResponse)
    @app.get("/en/", response_class=HTMLResponse)
    @app.get("/EN", response_class=HTMLResponse)
    def english_home() -> HTMLResponse:
        return HTMLResponse(render_home(settings, "en"), headers={"Cache-Control": "no-cache"})

    @app.get("/api/health")
    def health() -> dict:
        return {"ok": True, "name": settings.app_name, "backend": settings.transcription_backend}

    @app.get("/api/system")
    def system(request: Request, response: Response) -> dict:
        session_owner(request, response, settings)
        info = collect_system_info()
        info.update({
            "configured_backend": settings.transcription_backend,
            "mock_allowed": settings.allow_mock,
            "speaker_recognition_ready": bool(info["pyannote_installed"] and settings.hf_token),
            "models": MODEL_INFO,
            "max_upload_mb": settings.max_upload_mb,
        })
        return info

    @app.get("/api/jobs")
    def list_jobs(request: Request, response: Response, limit: int = 50) -> dict:
        owner_id = session_owner(request, response, settings)
        return {"jobs": db.list_jobs(max(1, min(limit, 200)), owner_id)}

    @app.get("/api/jobs/{job_id}")
    def get_job(job_id: str, request: Request, response: Response) -> dict:
        job = db.get_job(job_id, session_owner(request, response, settings))
        if not job:
            raise HTTPException(404, "Job not found")
        return job

    @app.post("/api/jobs", status_code=202)
    async def create_job(
        request: Request, response: Response,
        file: UploadFile = File(...),
        model: str = Form("small"), language: str = Form("auto"),
        diarize: bool = Form(False), translate: bool = Form(False), denoise: bool = Form(False),
    ) -> dict:
        if model not in MODEL_INFO:
            raise HTTPException(400, "Unsupported model")
        original = sanitize_filename(file.filename or "upload")
        ext = Path(original).suffix.lower()
        if ext not in SAFE_EXTENSIONS:
            raise HTTPException(400, f"Unsupported file type: {ext or 'unknown'}")
        job_id = uuid.uuid4().hex
        stored = f"{job_id}{ext}"
        target = settings.upload_dir / stored
        max_bytes = settings.max_upload_mb * 1024 * 1024
        size = 0
        try:
            with target.open("wb") as out:
                while True:
                    chunk = await file.read(1024 * 1024)
                    if not chunk:
                        break
                    size += len(chunk)
                    if size > max_bytes:
                        raise HTTPException(413, f"File exceeds {settings.max_upload_mb} MB limit")
                    out.write(chunk)
        except Exception:
            target.unlink(missing_ok=True)
            raise
        if size == 0:
            target.unlink(missing_ok=True)
            raise HTTPException(400, "Uploaded file is empty")
        now = now_iso()
        options = {"model": model, "language": language, "diarize": diarize, "translate": translate, "denoise": denoise}
        owner_id = session_owner(request, response, settings)
        db.insert_job({
            "id": job_id, "owner_id": owner_id, "filename": original, "stored_name": stored,
            "media_type": file.content_type or mimetypes.guess_type(original)[0], "size_bytes": size,
            "status": "queued", "progress": 0, "message": "Queued", "error": None,
            "created_at": now, "updated_at": now, "options_json": Database.encode(options),
            "result_json": None, "duration_seconds": None, "detected_language": None, "backend": None,
        })
        runner.submit(job_id)
        return db.get_job(job_id)

    @app.post("/api/jobs/{job_id}/retry", status_code=202)
    def retry_job(job_id: str, request: Request, response: Response) -> dict:
        job = db.get_job(job_id, session_owner(request, response, settings))
        if not job:
            raise HTTPException(404, "Job not found")
        if job["status"] not in {"failed", "completed"}:
            raise HTTPException(409, "Job is already queued or processing")
        db.update_job(job_id, status="queued", progress=0, message="Queued for retry", error=None, updated_at=now_iso())
        runner.submit(job_id)
        return db.get_job(job_id)

    @app.patch("/api/jobs/{job_id}/segments/{segment_id}")
    def patch_segment(job_id: str, segment_id: int, patch: SegmentPatch, request: Request, response: Response) -> dict:
        job = db.get_job(job_id, session_owner(request, response, settings))
        if not job or not job.get("result"):
            raise HTTPException(404, "Transcript not found")
        segments = job["result"].get("segments") or []
        target = next((s for s in segments if int(s.get("id", -1)) == segment_id), None)
        if target is None:
            raise HTTPException(404, "Segment not found")
        if patch.text is not None:
            target["text"] = patch.text.strip()
        if patch.speaker is not None:
            target["speaker"] = patch.speaker.strip() or None
        job["result"]["text"] = " ".join(s.get("text", "").strip() for s in segments).strip()
        db.update_job(job_id, result_json=Database.encode(job["result"]), updated_at=now_iso())
        return db.get_job(job_id)

    @app.patch("/api/jobs/{job_id}/speakers")
    def rename_speaker(job_id: str, patch: SpeakerRename, request: Request, response: Response) -> dict:
        job = db.get_job(job_id, session_owner(request, response, settings))
        if not job or not job.get("result"):
            raise HTTPException(404, "Transcript not found")
        changed = 0
        for seg in job["result"].get("segments") or []:
            if seg.get("speaker") == patch.old:
                seg["speaker"] = patch.new.strip()
                changed += 1
        if not changed:
            raise HTTPException(404, "Speaker label not found")
        db.update_job(job_id, result_json=Database.encode(job["result"]), updated_at=now_iso())
        return db.get_job(job_id)

    @app.get("/api/jobs/{job_id}/media")
    def job_media(job_id: str, request: Request, response: Response) -> FileResponse:
        job = db.get_job(job_id, session_owner(request, response, settings))
        if not job:
            raise HTTPException(404, "Job not found")
        path = settings.upload_dir / job["stored_name"]
        if not path.exists():
            raise HTTPException(404, "Media file not found")
        return FileResponse(path, media_type=job.get("media_type") or "application/octet-stream", filename=job["filename"])

    @app.get("/api/jobs/{job_id}/export/{fmt}")
    def export(job_id: str, fmt: str, request: Request, response: Response) -> FileResponse:
        fmt = fmt.lower()
        if fmt not in MIME:
            raise HTTPException(400, "Unsupported export format")
        job = db.get_job(job_id, session_owner(request, response, settings))
        if not job or job.get("status") != "completed" or not job.get("result"):
            raise HTTPException(409, "Transcript is not ready")
        stem = re.sub(r"[^\w\-]+", "-", Path(job["filename"]).stem, flags=re.UNICODE).strip("-") or "transcript"
        output = settings.export_dir / f"{job_id}-{stem}.{fmt}"
        export_job(job, fmt, output)
        return FileResponse(output, media_type=MIME[fmt], filename=f"{stem}.{fmt}")

    @app.delete("/api/jobs/{job_id}")
    def delete_job(job_id: str, request: Request, response: Response) -> dict:
        job = db.delete_job(job_id, session_owner(request, response, settings))
        if not job:
            raise HTTPException(404, "Job not found")
        paths = [settings.upload_dir / job["stored_name"], settings.processed_dir / f"{job_id}.wav"]
        paths.extend(settings.export_dir.glob(f"{job_id}-*"))
        for path in paths:
            try: path.unlink(missing_ok=True)
            except Exception: pass
        return {"ok": True}

    return app


app = create_app()
