# Codex / agent instructions

This repository is the working DJAI Video to Text product. Preserve the transcription behavior while using the DJAI Academy visual system and public route `/tools/video-to-text/`.

## Non-negotiable behavior

1. Never replace real transcription with fake text in production. `mock` is allowed only when `ALLOW_MOCK_TRANSCRIPTION=1` for tests/demo.
2. Keep uploads private to the configured data directory and use UUID storage names.
3. Do not bypass FFmpeg probing/normalization for production media.
4. Every new feature must include API/integration coverage and, when user-facing, browser E2E coverage.
5. Preserve current exports and transcript edit APIs unless adding a migration/backward-compatible route.
6. Do not silently ignore requested speaker recognition. If pyannote/token is unavailable, return a clear job error.
7. Keep English and Thai UI strings functional, including stable indexable `/` (Thai) and `/en/` (English) pages when proxied through the DJAI route.
8. Keep responsive behavior: test 1440px desktop and 390px mobile without horizontal overflow.
9. Public access is intentionally account-free. Preserve anonymous session ownership: a visitor must never list, open, edit, download, retry, or delete another visitor's jobs.

## Definition of done

Run:

```bash
python -m compileall -q app
node --check app/static/app.js
pytest -q
```

For UI changes, also inspect the E2E screenshots and verify no console errors.
