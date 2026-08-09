from __future__ import annotations

import io
import json
import time
from pathlib import Path

from docx import Document
from pypdf import PdfReader

from .conftest import make_wav


def wait_completed(client, job_id: str, timeout: float = 12.0):
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        last = client.get(f"/api/jobs/{job_id}").json()
        if last["status"] in {"completed", "failed"}:
            return last
        time.sleep(0.08)
    raise AssertionError(f"job timeout: {last}")


def test_health_and_system(client):
    assert client.get("/api/health").json()["ok"] is True
    info = client.get("/api/system").json()
    assert info["ffmpeg"] is True
    assert info["configured_backend"] == "mock"
    assert "small" in info["models"]


def test_public_pages_are_bilingual_and_search_ready(client):
    thai = client.get("/")
    assert thai.status_code == 200
    assert '<html lang="th">' in thai.text
    assert "แปลงวิดีโอเป็นข้อความ" in thai.text
    assert 'href="https://www.djai.academy/tools/video-to-text/"' in thai.text
    assert 'hreflang="en"' in thai.text
    assert '"@type":"SoftwareApplication"' in thai.text
    english = client.get("/en/")
    assert english.status_code == 200
    assert '<html lang="en">' in english.text
    assert "Video to Text Converter" in english.text
    assert 'href="https://www.djai.academy/tools/video-to-text/en/"' in english.text


def test_full_job_edit_speaker_export_and_delete(client, tmp_path: Path):
    wav = make_wav(tmp_path / "meeting.wav", seconds=1.4)
    with wav.open("rb") as fh:
        response = client.post("/api/jobs", files={"file": ("meeting.wav", fh, "audio/wav")}, data={
            "model":"small","language":"auto","diarize":"true","translate":"false","denoise":"true"
        })
    assert response.status_code == 202, response.text
    job_id = response.json()["id"]
    job = wait_completed(client, job_id)
    assert job["status"] == "completed", job
    assert job["backend"] == "mock-e2e"
    assert job["result"]["segments"][0]["words"]
    assert job["result"]["segments"][0]["speaker"] == "SPEAKER_01"

    seg_id = job["result"]["segments"][0]["id"]
    edited = client.patch(f"/api/jobs/{job_id}/segments/{seg_id}", json={"text":"Edited transcript line."})
    assert edited.status_code == 200
    assert edited.json()["result"]["segments"][0]["text"] == "Edited transcript line."

    renamed = client.patch(f"/api/jobs/{job_id}/speakers", json={"old":"SPEAKER_01","new":"Alice"})
    assert renamed.status_code == 200
    assert renamed.json()["result"]["segments"][0]["speaker"] == "Alice"

    exported = {}
    for fmt in ["txt","srt","vtt","csv","json","docx","pdf"]:
        out = client.get(f"/api/jobs/{job_id}/export/{fmt}")
        assert out.status_code == 200, (fmt, out.text[:200])
        assert len(out.content) > 20
        exported[fmt] = out.content
    assert b"Edited transcript line" in exported["txt"]
    assert b"00:00:00,000 -->" in exported["srt"]
    assert exported["vtt"].startswith(b"WEBVTT")
    assert "Edited transcript line." in exported["csv"].decode("utf-8-sig")
    assert json.loads(exported["json"].decode("utf-8"))["result"]["segments"][0]["text"] == "Edited transcript line."
    doc = Document(io.BytesIO(exported["docx"]))
    assert "Edited transcript line." in "\n".join(p.text for p in doc.paragraphs)
    reader = PdfReader(io.BytesIO(exported["pdf"]))
    assert any("Edited transcript line." in (page.extract_text() or "") for page in reader.pages)

    media = client.get(f"/api/jobs/{job_id}/media")
    assert media.status_code == 200 and len(media.content) > 1000

    deleted = client.delete(f"/api/jobs/{job_id}")
    assert deleted.status_code == 200
    assert client.get(f"/api/jobs/{job_id}").status_code == 404


def test_reject_unsupported_and_empty_file(client):
    bad = client.post("/api/jobs", files={"file": ("notes.txt", b"hello", "text/plain")}, data={"model":"small"})
    assert bad.status_code == 400
    empty = client.post("/api/jobs", files={"file": ("empty.wav", b"", "audio/wav")}, data={"model":"small"})
    assert empty.status_code == 400


def test_batch_jobs(client, tmp_path: Path):
    ids=[]
    for i in range(2):
        path=make_wav(tmp_path/f"batch-{i}.wav", seconds=.6, hz=440+i*100)
        with path.open('rb') as fh:
            r=client.post('/api/jobs',files={'file':(path.name,fh,'audio/wav')},data={'model':'tiny','language':'en'})
        assert r.status_code==202
        ids.append(r.json()['id'])
    results=[wait_completed(client,i) for i in ids]
    assert all(j['status']=='completed' for j in results)
    listing=client.get('/api/jobs').json()['jobs']
    assert {j['id'] for j in listing}.issuperset(ids)


def test_anonymous_sessions_cannot_read_each_others_jobs(app_settings, tmp_path: Path):
    from fastapi.testclient import TestClient
    from app.main import create_app

    app = create_app(app_settings)
    wav = make_wav(tmp_path / "private.wav", seconds=.6)
    with TestClient(app) as owner, TestClient(app) as stranger:
        with wav.open("rb") as fh:
            created = owner.post("/api/jobs", files={"file": (wav.name, fh, "audio/wav")}, data={"model": "tiny"})
        assert created.status_code == 202
        job_id = created.json()["id"]
        assert job_id in {job["id"] for job in owner.get("/api/jobs").json()["jobs"]}
        assert stranger.get("/api/jobs").json()["jobs"] == []
        assert stranger.get(f"/api/jobs/{job_id}").status_code == 404
        assert stranger.get(f"/api/jobs/{job_id}/media").status_code == 404
        assert stranger.delete(f"/api/jobs/{job_id}").status_code == 404

def test_failed_job_can_be_retried(client):
    # Valid extension but invalid media: FFmpeg should fail the background job explicitly.
    r = client.post('/api/jobs', files={'file': ('broken.wav', b'not-a-real-wave', 'audio/wav')}, data={'model':'small'})
    assert r.status_code == 202
    job_id = r.json()['id']
    failed = wait_completed(client, job_id)
    assert failed['status'] == 'failed'
    retry = client.post(f'/api/jobs/{job_id}/retry')
    assert retry.status_code == 202
    assert retry.json()['status'] == 'queued'
