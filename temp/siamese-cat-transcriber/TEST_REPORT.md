# DJAI Video to Text — Historical Validation Report

**Validation date:** 2026-08-09 (Asia/Bangkok)
**Build:** self-hosted single-workspace web application

## Result

All repository checks completed successfully in the build environment.

```text
python -m compileall -q app      PASS
node --check app/static/app.js   PASS
pytest -q                        9 passed
```

## What the automated suite verifies

| Area | Verification |
|---|---|
| API health/system info | FastAPI health and runtime capability responses |
| Upload validation | Valid upload flow, supported types, size/name handling |
| Media preprocessing | Real FFmpeg probe + 16 kHz mono WAV normalization; denoise path exercised |
| Job lifecycle | Queued → processing → completed and failed/retry behavior |
| Persistence | SQLite-backed job/history state |
| Transcript data | Segment and word timestamps returned and persisted |
| Editing | Segment text update through API and browser autosave flow |
| Speakers | Speaker rename updates transcript segments |
| Search | Browser transcript search behavior |
| Media | Media endpoint returns playable uploaded content |
| Exports | TXT, SRT, VTT, CSV, JSON, DOCX and PDF generated and content-validated |
| Cleanup | Delete removes job and related files |
| Browser UI | Real Chromium executes production HTML/CSS/JS interactions |
| Responsive UI | 390 px viewport, mobile navigation and no horizontal overflow |
| JS quality gate | No Playwright page errors during the UI scenario |

## End-to-end strategy

### 1. Real HTTP/backend E2E

`tests/test_http_e2e.py` starts a real Uvicorn server and performs network requests against it. It generates a valid WAV, uploads it, lets the production FFmpeg path preprocess the media, waits for the background worker, checks word-level timestamps, edits a segment, renames a speaker, downloads and validates every export, fetches media, and deletes the job.

For speech recognition in CI, this test uses the repository's deterministic mock ASR backend with `ALLOW_MOCK_TRANSCRIPTION=1`. The mock is guarded and cannot activate accidentally in normal production configuration.

### 2. Real Chromium UI E2E

`tests/test_e2e.py` launches system Chromium with Playwright and executes the actual production HTML, CSS and JavaScript. It validates the file queue, progress/completion state, transcript editor, autosave, search, bulk speaker rename, browser export download, desktop rendering, mobile menu and responsive overflow.

The build environment has a managed Chromium machine policy with a global `URLBlocklist` that blocks all browser URL navigation, including localhost. The test therefore injects the production HTML/CSS/JS into Chromium and provides a deterministic browser-side API fixture. This does **not** replace server validation: the separate Uvicorn HTTP E2E covers the real network/backend boundary.

## ML validation boundary

The build environment did not contain `faster-whisper` model weights and could not download them, so a real Whisper model forward pass was not claimed or simulated. pyannote diarization likewise requires model access and an `HF_TOKEN` on the target host. The production adapters, dependency installer and explicit error states are included, but the final deployment should perform one short smoke transcription and one diarization sample after the optional ML dependencies and model weights are available.

## Visual verification

This report describes the predecessor visual build. The current DJAI release must be revalidated after deployment using the public route and the gate in `DJAI_DEPLOYMENT.md`; it now uses the DJAI visual system and logo rather than the former cafe theme.
