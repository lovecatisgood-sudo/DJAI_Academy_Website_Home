# DJAI Video to Text

DJAI's free audio and video transcription product, published at `/tools/video-to-text/`. It converts uploaded media into editable, timestamped text with FFmpeg and Whisper, then exports documents or subtitles. It deliberately does not require an account, email address, or credit card.

## What is implemented

- Drag/drop and multi-file batch uploads
- Audio + video input via FFmpeg (`mp3`, `wav`, `m4a`, `flac`, `ogg`, `opus`, `mp4`, `mov`, `mkv`, `webm`, `avi`, etc.)
- Audio extraction/normalization to mono 16 kHz WAV
- Optional denoise/high-pass/low-pass/loudness normalization
- `faster-whisper` adapter with Tiny/Base/Small/Medium/Large-v3/Turbo model selection
- CPU/GPU runtime detection and configurable Whisper device/compute type
- Auto language detection or explicit language
- Whisper translate-to-English task
- Word-level timestamps in transcript JSON
- Optional pyannote speaker diarization using `HF_TOKEN`
- SQLite-backed persistent job history and restart recovery for queued/processing jobs
- Retry failed/completed jobs
- Synchronized media player; timestamp buttons seek playback
- Inline transcript editing with autosave
- Speaker rename across all matching segments
- Transcript search
- Exports: TXT, SRT, VTT, CSV, JSON, DOCX, PDF
- Deleting a job removes original media, normalized WAV and generated exports
- Search-ready Thai and English URLs with self-canonicals and reciprocal locale alternates
- Anonymous, HttpOnly browser sessions so one visitor cannot list, open, edit, download, retry, or delete another visitor's jobs
- Responsive DJAI Academy presentation, genuine DJAI logo, and contextual links to DJAI courses, Siamese Cat Dev, Creative Club, and Siamese Cat Cafe
- Docker, Windows PowerShell and Linux/macOS shell setup
- API/integration tests plus real-browser Playwright E2E test

## 1. Quick start — core app

Prerequisite: Python 3.11/3.12 recommended and FFmpeg on `PATH`.

### Linux / macOS

```bash
./scripts/run.sh
```

### Windows PowerShell

```powershell
.\scripts\run.ps1
```

Then open `http://127.0.0.1:8000`.

The core UI/API will run without an ML package, but real transcription requires step 2. The application deliberately does **not** silently fake a transcript in normal mode.

## 2. Install local Whisper

```bash
./scripts/install-ml.sh
# or Windows:
.\scripts\install-ml.ps1
```

Then start the app normally. `TRANSCRIPTION_BACKEND=auto` detects `faster-whisper`. Model weights are downloaded and cached the first time each model is used.

For CPU, start with `small` or `medium`. For a modern NVIDIA GPU, `turbo` or `large-v3` is practical. You can override:

```bash
export WHISPER_DEVICE=cuda
export WHISPER_COMPUTE_TYPE=float16
```

For CPU:

```bash
export WHISPER_DEVICE=cpu
export WHISPER_COMPUTE_TYPE=int8
```

## 3. Speaker recognition

Speaker diarization uses `pyannote.audio`. After installing ML dependencies, accept the Hugging Face terms for `pyannote/speaker-diarization-community-1`, create an access token, then set:

```bash
export HF_TOKEN=hf_...
```

If speaker recognition is selected but pyannote/token access is not ready, the job fails with an explicit setup message rather than returning fake speaker labels.

## 4. Docker

```bash
cp .env.example .env
# set HF_TOKEN in .env only if speaker recognition is wanted
docker compose up --build
```

Data persists under `./data`; model downloads persist in the Docker volume `whisper-cache`.

For NVIDIA containers, add your normal NVIDIA Container Toolkit GPU reservation/device configuration for your host. The app itself auto-detects GPU availability.

## 5. Test mode

The deterministic mock backend exists **only** for CI/E2E tests. It exercises the complete media/job/editor/export pipeline without downloading a speech model.

```bash
TRANSCRIPTION_BACKEND=mock ALLOW_MOCK_TRANSCRIPTION=1 uvicorn app.main:app --port 8000
```

Do not enable mock mode for real users expecting speech recognition.

## 6. Tests

```bash
pip install -r requirements-dev.txt
pytest -q
```

The automated E2E coverage is intentionally split into two complementary layers:

- `tests/test_http_e2e.py` starts a real Uvicorn server and exercises the full HTTP/backend vertical slice with a valid WAV: upload, FFmpeg preprocessing, queued transcription, word timestamps, editing, speaker rename, all seven exports, media playback endpoint, and deletion. The deterministic mock ASR backend is used so CI does not silently download multi-gigabyte model weights.
- `tests/test_e2e.py` launches real Chromium through Playwright and exercises the actual HTML/CSS/JavaScript UI: file queue, transcription progress, transcript editor, autosave, search, speaker rename, export download, desktop rendering, mobile menu, and horizontal-overflow checks.

Some managed CI/browser environments block all URL navigation by administrator policy. In that case the browser test injects the production HTML/CSS/JS into Chromium and uses a deterministic API fixture, while the separate HTTP E2E still validates the real Uvicorn network boundary. On a normal machine the app itself is served at `http://127.0.0.1:8000`.

Real `faster-whisper` and pyannote model inference requires the optional ML dependencies plus downloaded model weights (and an Hugging Face token for diarization). Run a short target-machine smoke transcription after installing those dependencies; the CI mock is deliberately not presented as proof that model weights executed.

## Configuration

Copy `.env.example` and export/load the variables in your deployment environment.

| Variable | Default | Meaning |
|---|---:|---|
| `TRANSCRIBER_DATA_DIR` | `./data` | SQLite, uploads, normalized audio, exports |
| `MAX_UPLOAD_MB` | `500` | Per-file upload limit; increase only after testing proxy and storage limits |
| `JOB_WORKERS` | `2` | Local transcription worker threads |
| `TRANSCRIPTION_BACKEND` | `auto` | `auto`, `faster-whisper`, or test-only `mock` |
| `WHISPER_MODEL` | `small` | Default model hint for deployments |
| `WHISPER_DEVICE` | `auto` | `auto`, `cpu`, `cuda` |
| `WHISPER_COMPUTE_TYPE` | `auto` | e.g. `int8`, `float16` |
| `HF_TOKEN` | unset | Needed for pyannote diarization |
| `ALLOW_MOCK_TRANSCRIPTION` | `0` | Must be `1` to permit mock backend |

## Deployment / reverse proxy notes

- Put the app behind HTTPS for public use.
- Set reverse-proxy request size/time limits to match `MAX_UPLOAD_MB` and long media uploads.
- Do not expose the `data/` directory as a static web folder. Media is served only through job endpoints.
- Public use has anonymous session-scoped job ownership. This preserves no-sign-up access while preventing one visitor from seeing another visitor's work. It is not a shared team workspace or an account-recovery system: clearing the browser cookie ends access to that browser's old jobs.
- A production job queue (Redis/RQ/Celery/Arq) can replace the in-process thread pool if you scale to multiple app replicas.

## DJAI brand and public routing

The UI uses the DJAI Academy visual system and supplied DJAI logo; it does not use a cafe visual theme. The public route and reverse-proxy requirements are documented in [DJAI_DEPLOYMENT.md](DJAI_DEPLOYMENT.md). Do not add this route to the main sitemap or tools directory until the real Python/FFmpeg/Whisper service is healthy at the public URL.

## Architecture

```text
Browser UI
  ├─ upload / batch / settings
  ├─ job history + progress polling
  └─ transcript editor + player + exports
          │
          ▼
FastAPI
  ├─ SQLite job store
  ├─ UUID media storage
  ├─ FFmpeg normalize / denoise
  ├─ faster-whisper adapter
  ├─ pyannote diarization (optional)
  ├─ transcript edit APIs
  └─ TXT/SRT/VTT/CSV/JSON/DOCX/PDF exporters
```

## License

Application source in this package is MIT-licensed. The supplied Siamese Cat branding artwork remains brand artwork and is not granted as generic reusable third-party branding by the code license.
