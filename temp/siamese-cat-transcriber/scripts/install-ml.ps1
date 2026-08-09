$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
if (-not (Test-Path ".venv")) { py -3 -m venv .venv }
& .\.venv\Scripts\python.exe -m pip install -U pip
& .\.venv\Scripts\python.exe -m pip install -r requirements-ml.txt
& .\.venv\Scripts\python.exe -c "from faster_whisper import WhisperModel; print('faster-whisper import: OK')"
Write-Host "ML dependencies are installed. The selected Whisper model downloads on first use."
