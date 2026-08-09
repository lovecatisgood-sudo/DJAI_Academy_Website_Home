from __future__ import annotations

import importlib.util
import math
import threading
from pathlib import Path
from typing import Any, Callable

from .diarize import PyannoteDiarizer, assign_speakers

Progress = Callable[[int, str], None]

MODEL_INFO = {
    "tiny": {"label": "Tiny", "speed": "Fastest", "quality": "Basic"},
    "base": {"label": "Base", "speed": "Very fast", "quality": "Good"},
    "small": {"label": "Small", "speed": "Fast", "quality": "Better"},
    "medium": {"label": "Medium", "speed": "Balanced", "quality": "High"},
    "large-v3": {"label": "Large v3", "speed": "Slower", "quality": "Highest"},
    "turbo": {"label": "Turbo", "speed": "Fast", "quality": "Very high"},
}


class TranscriptionUnavailable(RuntimeError):
    pass


_MODEL_CACHE: dict[tuple[str, str, str], Any] = {}
_MODEL_LOCKS: dict[tuple[str, str, str], threading.RLock] = {}
_MODEL_CACHE_LOCK = threading.RLock()


def _get_whisper_model(model_name: str, device: str, compute_type: str):
    try:
        from faster_whisper import WhisperModel
    except Exception as exc:
        raise TranscriptionUnavailable(
            "faster-whisper is not installed. Run scripts/install-ml.sh (Linux/macOS) or scripts/install-ml.ps1 (Windows)."
        ) from exc
    key = (model_name, device, compute_type)
    with _MODEL_CACHE_LOCK:
        if key not in _MODEL_CACHE:
            _MODEL_CACHE[key] = WhisperModel(model_name, device=device, compute_type=compute_type)
            _MODEL_LOCKS[key] = threading.RLock()
        return _MODEL_CACHE[key], _MODEL_LOCKS[key]


def _words_for(text: str, start: float, end: float) -> list[dict[str, Any]]:
    tokens = text.split()
    if not tokens:
        return []
    span = max(0.01, end - start)
    step = span / len(tokens)
    return [
        {"word": token, "start": round(start + i * step, 3), "end": round(start + (i + 1) * step, 3), "probability": 0.99}
        for i, token in enumerate(tokens)
    ]


def mock_transcribe(audio_path: Path, options: dict, duration: float, progress: Progress) -> dict:
    progress(45, "Running local transcription engine")
    language = options.get("language") if options.get("language") not in {None, "", "auto"} else "en"
    translated = bool(options.get("translate"))
    texts = [
        "Welcome to DJAI Video to Text.",
        "This demo transcript verifies timestamps, speaker labels, editing, playback, search, and export.",
        "In production, the same pipeline uses faster Whisper for local speech recognition.",
    ]
    if translated:
        texts[-1] = "The transcript has been translated to English by the configured transcription task."
    d = max(duration, 9.0)
    step = d / len(texts)
    segments = []
    for i, text in enumerate(texts):
        start = i * step
        end = min(d, (i + 1) * step)
        segments.append({
            "id": i,
            "start": round(start, 3),
            "end": round(end, 3),
            "text": text,
            "speaker": f"SPEAKER_{(i % 2) + 1:02d}" if options.get("diarize") else None,
            "words": _words_for(text, start, end),
        })
    progress(78, "Finishing timestamps and speaker labels")
    return {
        "text": " ".join(t["text"] for t in segments),
        "segments": segments,
        "language": "en" if translated else language,
        "language_probability": 0.99,
        "backend": "mock-e2e",
    }


def faster_whisper_transcribe(
    audio_path: Path,
    options: dict,
    progress: Progress,
    device: str = "auto",
    compute_type: str = "auto",
    hf_token: str | None = None,
) -> dict:
    progress(38, f"Loading Whisper model: {options.get('model', 'small')}")
    model_name = options.get("model") or "small"
    model, model_lock = _get_whisper_model(model_name, device, compute_type)
    language = options.get("language")
    if not language or language == "auto":
        language = None
    task = "translate" if options.get("translate") else "transcribe"
    with model_lock:
        segments_iter, info = model.transcribe(
            str(audio_path),
            language=language,
            task=task,
            beam_size=5,
            vad_filter=True,
            word_timestamps=True,
            condition_on_previous_text=True,
        )
        progress(52, "Transcribing speech locally")
        segments = []
        for idx, seg in enumerate(segments_iter):
            words = []
            for word in (seg.words or []):
                words.append({
                    "word": word.word.strip(),
                    "start": float(word.start or seg.start),
                    "end": float(word.end or seg.end),
                    "probability": float(word.probability or 0.0),
                })
            segments.append({
                "id": idx,
                "start": float(seg.start),
                "end": float(seg.end),
                "text": seg.text.strip(),
                "speaker": None,
                "words": words,
            })
            if idx and idx % 8 == 0:
                progress(min(72, 52 + idx), f"Transcribed {idx + 1} segments")

    if options.get("diarize"):
        progress(76, "Recognizing speakers")
        diarizer = PyannoteDiarizer(hf_token)
        if not diarizer.available():
            raise TranscriptionUnavailable(
                "Speaker recognition is enabled, but pyannote is not ready. Install ML dependencies and set HF_TOKEN."
            )
        turns = diarizer.diarize(audio_path)
        assign_speakers(segments, turns)

    progress(88, "Building transcript")
    text = " ".join(s["text"] for s in segments).strip()
    return {
        "text": text,
        "segments": segments,
        "language": getattr(info, "language", language or "unknown"),
        "language_probability": float(getattr(info, "language_probability", 0.0) or 0.0),
        "backend": "faster-whisper",
    }


def choose_backend(requested: str, allow_mock: bool) -> str:
    requested = (requested or "auto").lower()
    if requested == "mock":
        if not allow_mock:
            raise TranscriptionUnavailable("Mock transcription is disabled outside test/demo mode.")
        return "mock"
    if requested == "faster-whisper":
        return "faster-whisper"
    if importlib.util.find_spec("faster_whisper") is not None:
        return "faster-whisper"
    if allow_mock:
        return "mock"
    raise TranscriptionUnavailable(
        "No transcription engine is installed. Run the ML setup script to install faster-whisper."
    )


def transcribe_audio(
    audio_path: Path,
    options: dict,
    duration: float,
    requested_backend: str,
    allow_mock: bool,
    progress: Progress,
    device: str = "auto",
    compute_type: str = "auto",
    hf_token: str | None = None,
) -> dict:
    backend = choose_backend(requested_backend, allow_mock)
    if backend == "mock":
        return mock_transcribe(audio_path, options, duration, progress)
    return faster_whisper_transcribe(
        audio_path, options, progress, device=device, compute_type=compute_type, hf_token=hf_token
    )
