from __future__ import annotations

from pathlib import Path
from typing import Any


class DiarizationUnavailable(RuntimeError):
    pass


class PyannoteDiarizer:
    _pipeline = None

    def __init__(self, token: str | None):
        self.token = token

    def available(self) -> bool:
        if not self.token:
            return False
        try:
            import pyannote.audio  # noqa: F401
            return True
        except Exception:
            return False

    def _load(self):
        if self._pipeline is not None:
            return self._pipeline
        if not self.token:
            raise DiarizationUnavailable("Speaker recognition requires HF_TOKEN for the pyannote model.")
        try:
            from pyannote.audio import Pipeline
        except Exception as exc:
            raise DiarizationUnavailable("pyannote.audio is not installed. Run the ML setup script.") from exc
        try:
            self._pipeline = Pipeline.from_pretrained(
                "pyannote/speaker-diarization-community-1", token=self.token
            )
        except TypeError:
            self._pipeline = Pipeline.from_pretrained(
                "pyannote/speaker-diarization-community-1", use_auth_token=self.token
            )
        return self._pipeline

    def diarize(self, audio_path: Path) -> list[dict[str, Any]]:
        pipeline = self._load()
        try:
            import torch
            if torch.cuda.is_available() and hasattr(pipeline, "to"):
                pipeline.to(torch.device("cuda"))
        except Exception:
            pass
        output = pipeline(str(audio_path))
        timeline: list[dict[str, Any]] = []
        diarization = getattr(output, "speaker_diarization", output)
        if hasattr(diarization, "itertracks"):
            for turn, _, speaker in diarization.itertracks(yield_label=True):
                timeline.append({"start": float(turn.start), "end": float(turn.end), "speaker": str(speaker)})
        else:
            for item in diarization:
                if len(item) == 2:
                    turn, speaker = item
                else:
                    turn, _, speaker = item
                timeline.append({"start": float(turn.start), "end": float(turn.end), "speaker": str(speaker)})
        return timeline


def assign_speakers(segments: list[dict], turns: list[dict]) -> list[dict]:
    if not turns:
        return segments
    for seg in segments:
        midpoint = (float(seg.get("start", 0)) + float(seg.get("end", 0))) / 2
        best = None
        best_overlap = -1.0
        for turn in turns:
            overlap = max(0.0, min(seg["end"], turn["end"]) - max(seg["start"], turn["start"]))
            if turn["start"] <= midpoint <= turn["end"]:
                overlap += 1000
            if overlap > best_overlap:
                best_overlap = overlap
                best = turn
        if best:
            seg["speaker"] = best["speaker"]
    return segments
