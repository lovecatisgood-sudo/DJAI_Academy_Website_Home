# DJAI Video to Text deployment

Public URLs:

- Thai: `https://www.djai.academy/tools/video-to-text/`
- English: `https://www.djai.academy/tools/video-to-text/en/`

This release is static and browser-first. The DJAI Hostinger Node app serves HTML, CSS, JavaScript, and brand assets only. It does **not** receive uploaded media, run FFmpeg, store transcripts, or run Whisper on DJAI infrastructure.

## What the visitor's browser needs

- A modern browser with Web Audio decoding support. Supported media is limited to audio/video codecs the browser can open; MP3, WAV, M4A, MP4, OGG, and WebM are the intended starting formats.
- JavaScript and network access for the first model download from Hugging Face's model hosting. Browser cache may make subsequent starts faster.
- WebGPU is used when available. The worker falls back to WebAssembly/CPU when WebGPU cannot load.

The tool intentionally handles one file at a time. This keeps anonymous public usage and memory pressure predictable. It offers editable timed text plus TXT, SRT, VTT, and JSON downloads; it does not currently offer server-only features such as FFmpeg cleanup, speaker diarization, shared history, DOCX, or PDF.

## Hostinger configuration

No `DJAI_TRANSCRIBER_ORIGIN`, Python service, Docker worker, upload volume, or database is required. Deploy the normal root application build. `server.js` serves the static route from `temp/siamese-cat-transcriber/browser` and exposes the shared DJAI assets beneath `/tools/video-to-text/static/`.

## Go-live gate

1. Build the root Hostinger application.
2. Verify both public URLs return 200 and render self-canonicals plus reciprocal Thai/English `hreflang` tags.
3. Test a short MP3 and an MP4 on current Chrome/Edge with WebGPU, then a CPU-only browser fallback.
4. Use browser developer tools to verify media is not posted to `www.djai.academy`; first-use model traffic may go to Hugging Face.
5. Verify TXT, SRT, VTT, and JSON downloads and edit a timed segment before export.
6. Confirm the directory entries and sitemap are live, then submit the Thai canonical URL in Search Console.
