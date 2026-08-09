from __future__ import annotations

import importlib.util
import platform
import shutil
import subprocess


def _module_available(name: str) -> bool:
    """`find_spec` can raise when an optional package's parent is absent."""
    try:
        return importlib.util.find_spec(name) is not None
    except ModuleNotFoundError:
        return False


def _nvidia_smi() -> tuple[bool, str | None]:
    exe = shutil.which("nvidia-smi")
    if not exe:
        return False, None
    try:
        out = subprocess.check_output(
            [exe, "--query-gpu=name", "--format=csv,noheader"],
            text=True, timeout=4,
        ).strip()
        return bool(out), out.splitlines()[0] if out else None
    except Exception:
        return False, None


def collect_system_info() -> dict:
    cuda = False
    cuda_name = None
    try:
        import torch
        cuda = bool(torch.cuda.is_available())
        if cuda:
            cuda_name = torch.cuda.get_device_name(0)
    except Exception:
        pass
    smi, smi_name = _nvidia_smi()
    if smi:
        cuda = True
        cuda_name = cuda_name or smi_name
    return {
        "platform": platform.system(),
        "python": platform.python_version(),
        "ffmpeg": bool(shutil.which("ffmpeg")),
        "ffprobe": bool(shutil.which("ffprobe")),
        "gpu_available": cuda,
        "gpu_name": cuda_name,
        "faster_whisper_installed": _module_available("faster_whisper"),
        "pyannote_installed": _module_available("pyannote.audio"),
    }
