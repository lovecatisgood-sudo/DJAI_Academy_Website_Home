from __future__ import annotations

import os
import socket
import subprocess
import sys
import time
from pathlib import Path

import requests

from .conftest import make_wav


def free_port() -> int:
    s = socket.socket(); s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]; s.close(); return port


def wait_server(base: str, timeout: float = 12) -> None:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            if requests.get(base + "/api/health", timeout=.5).status_code == 200:
                return
        except requests.RequestException:
            pass
        time.sleep(.1)
    raise AssertionError("Uvicorn server did not become ready")


def test_real_http_e2e(tmp_path: Path):
    port = free_port()
    root = Path(__file__).resolve().parents[1]
    env = os.environ.copy()
    env.update({
        "TRANSCRIBER_DATA_DIR": str(tmp_path / "data"),
        "TRANSCRIPTION_BACKEND": "mock",
        "ALLOW_MOCK_TRANSCRIPTION": "1",
        "MAX_UPLOAD_MB": "20",
        "JOB_WORKERS": "2",
        "TRANSCRIBER_COOKIE_SECURE": "0",
    })
    proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", str(port)],
        cwd=root, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True,
    )
    base = f"http://127.0.0.1:{port}"
    try:
        wait_server(base)
        session = requests.Session()
        wav = make_wav(tmp_path / "http-e2e.wav", seconds=1.0)
        with wav.open("rb") as fh:
            r = session.post(base + "/api/jobs", files={"file": (wav.name, fh, "audio/wav")}, data={
                "model": "small", "language": "auto", "diarize": "true", "denoise": "true", "translate": "false"
            }, timeout=10)
        assert r.status_code == 202, r.text
        job_id = r.json()["id"]
        deadline = time.time() + 12
        job = None
        while time.time() < deadline:
            job = session.get(base + f"/api/jobs/{job_id}", timeout=2).json()
            if job["status"] in {"completed", "failed"}: break
            time.sleep(.1)
        assert job and job["status"] == "completed", job
        assert job["result"]["segments"][0]["words"]

        seg_id = job["result"]["segments"][0]["id"]
        edit = session.patch(base + f"/api/jobs/{job_id}/segments/{seg_id}", json={"text": "HTTP E2E edited line."}, timeout=3)
        assert edit.status_code == 200
        rename = session.patch(base + f"/api/jobs/{job_id}/speakers", json={"old": "SPEAKER_01", "new": "Host"}, timeout=3)
        assert rename.status_code == 200

        for fmt in ["txt", "srt", "vtt", "csv", "json", "docx", "pdf"]:
            out = session.get(base + f"/api/jobs/{job_id}/export/{fmt}", timeout=8)
            assert out.status_code == 200, (fmt, out.text[:200])
            assert len(out.content) > 20
        txt = session.get(base + f"/api/jobs/{job_id}/export/txt", timeout=3).text
        assert "HTTP E2E edited line." in txt and "Host:" in txt

        media = session.get(base + f"/api/jobs/{job_id}/media", timeout=3)
        assert media.status_code == 200 and len(media.content) > 1000
        deleted = session.delete(base + f"/api/jobs/{job_id}", timeout=3)
        assert deleted.status_code == 200
        assert session.get(base + f"/api/jobs/{job_id}", timeout=3).status_code == 404
    finally:
        proc.terminate()
        try: proc.wait(timeout=5)
        except subprocess.TimeoutExpired: proc.kill()
