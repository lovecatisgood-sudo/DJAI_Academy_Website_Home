#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
PYTHON="${PYTHON:-python3}"
if [ ! -d .venv ]; then "$PYTHON" -m venv .venv; fi
source .venv/bin/activate
python -m pip install -U pip
python -m pip install -r requirements-ml.txt
python - <<'PY'
from faster_whisper import WhisperModel
print("faster-whisper import: OK")
print("ML dependencies are installed. The selected Whisper model is downloaded on first use.")
PY
