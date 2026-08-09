# DJAI Video to Text

DJAI's free browser-first audio and video transcription tool, published at `/tools/video-to-text/`. It processes a selected media file in the visitor's browser using Whisper through Transformers.js. There is no account, email requirement, or media upload to DJAI.

## Current product behavior

- One local media file at a time; intended formats are MP3, WAV, M4A, OGG, MP4, and WebM that the visitor's browser can decode.
- Browser-side audio preparation at 16 kHz, then Whisper inference in a dedicated web worker.
- WebGPU when the device/browser supports it; CPU/WebAssembly fallback otherwise.
- Tiny, Base, and Small multilingual model choices. The first use downloads the selected model from Hugging Face and browser cache may speed up later use.
- Automatic or selected language, editable timed text, synchronized local playback, search, and TXT/SRT/VTT/JSON export.
- Thai and English static pages, self-canonicals, reciprocal `hreflang`, real DJAI assets, and links to DJAI courses, Siamese Cat Dev, Creative Club, and Cafe.

## Boundaries

The browser keeps the source file and transcript. DJAI does not provide file storage, a transcription worker, speaker diarization, audio denoising, shared workspaces, DOCX/PDF export, or persistent job history in this browser-first release. A file's success and speed depend on its codec, duration, browser, connection, and available device memory/compute.

## Implementation layout

```text
browser/
  index.html                 Thai canonical page
  en/index.html              English canonical page
  client-app.js              local file/editor/export UI
  transcription-worker.js    Transformers.js Whisper worker
```

`server.js` mounts this directory directly at `/tools/video-to-text/`. See [DJAI_DEPLOYMENT.md](DJAI_DEPLOYMENT.md) for the live verification gate.
