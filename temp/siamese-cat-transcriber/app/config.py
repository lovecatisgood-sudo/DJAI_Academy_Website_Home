from __future__ import annotations

from dataclasses import dataclass, replace
from pathlib import Path
import os


@dataclass(frozen=True)
class Settings:
    app_name: str = "DJAI Video to Text"
    data_dir: Path = Path("data")
    upload_dir: Path = Path("data/uploads")
    processed_dir: Path = Path("data/processed")
    export_dir: Path = Path("data/exports")
    database_path: Path = Path("data/transcriber.sqlite3")
    transcription_backend: str = "auto"  # auto | faster-whisper | mock
    default_model: str = "small"
    max_upload_mb: int = 500
    job_workers: int = 2
    allow_mock: bool = False
    hf_token: str | None = None
    whisper_device: str = "auto"
    whisper_compute_type: str = "auto"
    public_base_path: str = ""
    session_cookie_name: str = "djai_transcriber_session"
    session_cookie_path: str = "/"
    session_cookie_secure: bool = True

    @classmethod
    def from_env(cls) -> "Settings":
        data_dir = Path(os.getenv("TRANSCRIBER_DATA_DIR", "data")).resolve()
        return cls(
            data_dir=data_dir,
            upload_dir=data_dir / "uploads",
            processed_dir=data_dir / "processed",
            export_dir=data_dir / "exports",
            database_path=data_dir / "transcriber.sqlite3",
            transcription_backend=os.getenv("TRANSCRIPTION_BACKEND", "auto").strip().lower(),
            default_model=os.getenv("WHISPER_MODEL", "small"),
            max_upload_mb=int(os.getenv("MAX_UPLOAD_MB", "500")),
            job_workers=max(1, int(os.getenv("JOB_WORKERS", "2"))),
            allow_mock=os.getenv("ALLOW_MOCK_TRANSCRIPTION", "0").lower() in {"1", "true", "yes"},
            hf_token=os.getenv("HF_TOKEN") or os.getenv("HUGGINGFACE_TOKEN"),
            whisper_device=os.getenv("WHISPER_DEVICE", "auto"),
            whisper_compute_type=os.getenv("WHISPER_COMPUTE_TYPE", "auto"),
            public_base_path=os.getenv("TRANSCRIBER_PUBLIC_BASE_PATH", "").rstrip("/"),
            session_cookie_name=os.getenv("TRANSCRIBER_SESSION_COOKIE", "djai_transcriber_session"),
            session_cookie_path=os.getenv("TRANSCRIBER_SESSION_COOKIE_PATH", "/"),
            session_cookie_secure=os.getenv("TRANSCRIBER_COOKIE_SECURE", "1").lower() in {"1", "true", "yes"},
        )

    def with_overrides(self, **kwargs) -> "Settings":
        return replace(self, **kwargs)

    def ensure_dirs(self) -> None:
        for path in (self.data_dir, self.upload_dir, self.processed_dir, self.export_dir):
            path.mkdir(parents=True, exist_ok=True)
