from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path


class MediaError(RuntimeError):
    pass


def _run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    try:
        return subprocess.run(cmd, check=True, capture_output=True, text=True)
    except FileNotFoundError as exc:
        raise MediaError("FFmpeg/ffprobe was not found. Install FFmpeg and make sure it is on PATH.") from exc
    except subprocess.CalledProcessError as exc:
        detail = (exc.stderr or exc.stdout or "Media processing failed").strip()
        raise MediaError(detail[-2500:]) from exc


def ensure_ffmpeg() -> dict[str, bool]:
    return {"ffmpeg": bool(shutil.which("ffmpeg")), "ffprobe": bool(shutil.which("ffprobe"))}


def probe_media(path: Path) -> dict:
    result = _run([
        "ffprobe", "-v", "error", "-print_format", "json",
        "-show_format", "-show_streams", str(path),
    ])
    payload = json.loads(result.stdout or "{}")
    fmt = payload.get("format") or {}
    streams = payload.get("streams") or []
    duration = float(fmt.get("duration") or 0.0)
    return {
        "duration": duration,
        "format_name": fmt.get("format_name"),
        "has_audio": any(s.get("codec_type") == "audio" for s in streams),
        "has_video": any(s.get("codec_type") == "video" for s in streams),
    }


def prepare_audio(source: Path, target: Path, denoise: bool = False) -> dict:
    info = probe_media(source)
    if not info["has_audio"]:
        raise MediaError("The selected file does not contain an audio stream.")
    target.parent.mkdir(parents=True, exist_ok=True)
    filters = ["highpass=f=70", "lowpass=f=12000", "loudnorm=I=-16:TP=-1.5:LRA=11"]
    if denoise:
        filters.insert(1, "afftdn=nf=-25")
    cmd = [
        "ffmpeg", "-y", "-v", "error", "-i", str(source), "-vn",
        "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le",
        "-af", ",".join(filters), str(target),
    ]
    _run(cmd)
    return info
