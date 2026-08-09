from __future__ import annotations

import json
import threading
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable

from ..config import Settings
from ..db import Database
from .media import prepare_audio
from .transcribe import transcribe_audio


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class JobRunner:
    def __init__(self, settings: Settings, db: Database):
        self.settings = settings
        self.db = db
        self.executor = ThreadPoolExecutor(max_workers=settings.job_workers, thread_name_prefix="transcribe")
        self._active: set[str] = set()
        self._lock = threading.Lock()

    def submit(self, job_id: str) -> None:
        with self._lock:
            if job_id in self._active:
                return
            self._active.add(job_id)
        self.executor.submit(self._run_safe, job_id)

    def recover_queued(self) -> None:
        for job in self.db.list_jobs(limit=500):
            if job["status"] == "queued":
                self.submit(job["id"])

    def _run_safe(self, job_id: str) -> None:
        try:
            self._run(job_id)
        except Exception as exc:
            self.db.update_job(
                job_id, status="failed", progress=100, message="Transcription failed",
                error=str(exc), updated_at=now_iso(),
            )
        finally:
            with self._lock:
                self._active.discard(job_id)

    def _run(self, job_id: str) -> None:
        job = self.db.get_job(job_id)
        if not job:
            return
        source = self.settings.upload_dir / job["stored_name"]
        processed = self.settings.processed_dir / f"{job_id}.wav"
        options = job["options"]

        def progress(value: int, message: str) -> None:
            self.db.update_job(job_id, status="processing", progress=max(1, min(99, int(value))), message=message, updated_at=now_iso())

        progress(8, "Inspecting media")
        info = prepare_audio(source, processed, denoise=bool(options.get("denoise")))
        progress(28, "Audio normalized to 16 kHz mono")
        result = transcribe_audio(
            processed, options, info.get("duration", 0.0), self.settings.transcription_backend,
            self.settings.allow_mock, progress, device=self.settings.whisper_device,
            compute_type=self.settings.whisper_compute_type, hf_token=self.settings.hf_token,
        )
        self.db.update_job(
            job_id, status="completed", progress=100, message="Transcript ready", error=None,
            duration_seconds=info.get("duration") or 0.0,
            detected_language=result.get("language"), backend=result.get("backend"),
            result_json=Database.encode(result), updated_at=now_iso(),
        )
