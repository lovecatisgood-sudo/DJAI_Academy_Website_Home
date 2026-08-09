from __future__ import annotations

import math
import struct
import wave
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app


def make_wav(path: Path, seconds: float = 1.2, hz: float = 440.0) -> Path:
    rate = 16000
    frames = int(rate * seconds)
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(rate)
        for i in range(frames):
            value = int(7000 * math.sin(2 * math.pi * hz * i / rate))
            wav.writeframesraw(struct.pack("<h", value))
    return path


@pytest.fixture()
def app_settings(tmp_path: Path) -> Settings:
    data = tmp_path / "data"
    return Settings(
        data_dir=data, upload_dir=data/"uploads", processed_dir=data/"processed", export_dir=data/"exports",
        database_path=data/"test.sqlite3", transcription_backend="mock", allow_mock=True, max_upload_mb=20, job_workers=2,
        session_cookie_secure=False,
    )


@pytest.fixture()
def client(app_settings: Settings):
    app = create_app(app_settings)
    with TestClient(app) as c:
        yield c
