# DJAI Video to Text deployment

Public URL: `https://www.djai.academy/tools/video-to-text/`

English URL: `https://www.djai.academy/tools/video-to-text/en/`

The main DJAI Hostinger Node application is intentionally only a reverse proxy for this tool. The transcription worker needs Python, FFmpeg, persistent storage, and the Whisper model cache, so it must run as a separate long-lived Docker/Python service. Do not run it in mock mode for public users.

## Service configuration

Deploy this folder to a service that supports Docker, persistent volumes, and enough CPU/RAM for Whisper. Set these production values:

```text
TRANSCRIPTION_BACKEND=auto
WHISPER_MODEL=small
WHISPER_DEVICE=cpu
WHISPER_COMPUTE_TYPE=int8
TRANSCRIBER_DATA_DIR=/app/data
TRANSCRIBER_PUBLIC_BASE_PATH=/tools/video-to-text
TRANSCRIBER_SESSION_COOKIE_PATH=/tools/video-to-text
TRANSCRIBER_COOKIE_SECURE=1
ALLOW_MOCK_TRANSCRIPTION=0
```

Attach persistent storage to `/app/data` and the Hugging Face cache. The default image installs faster-whisper only, which keeps a CPU deployment practical. Speaker recognition is an optional, much larger PyTorch/pyannote layer: set `INSTALL_DIARIZATION=1` and `HF_TOKEN` only if it is genuinely offered. Otherwise the option returns a clear setup error instead of pretending to label speakers.

## Main-site configuration

In the Hostinger Node application's environment, set:

```text
DJAI_TRANSCRIBER_ORIGIN=https://your-private-transcriber-service.example
```

The root server then proxies the public route to the service without exposing the service URL. Keep the public route on `www.djai.academy`; the transcriber sets its anonymous, HttpOnly cookie only for `/tools/video-to-text`.

## Go-live gate

1. Start the service with real `faster-whisper` installed and confirm `/api/system` reports it ready.
2. Upload a short real MP4 through the public DJAI URL, not the service URL.
3. Confirm two separate browsers cannot list, open, download, edit, retry, or delete each other's jobs.
4. Confirm TXT, SRT, VTT, CSV, JSON, DOCX, and PDF exports work.
5. Confirm `https://www.djai.academy/tools/video-to-text/` and `/en/` return 200, self-canonical pages with reciprocal `th`, `en`, and `x-default` alternates.
6. Only then add both URLs to the DJAI sitemap and tools directory, then submit the canonical Thai URL in Search Console.

The last gate matters: do not link to or index the route while `DJAI_TRANSCRIBER_ORIGIN` is unset, unreachable, or in test/mock mode.
