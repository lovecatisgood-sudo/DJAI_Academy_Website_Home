# Codex handoff — DJAI Video to Text

## Product goal
Build and maintain a DJAI Academy video-to-text experience at `/tools/video-to-text/`. Keep the real transcription workflow: choose files, choose quality/options, transcribe, edit, search, and export. The public tool has no account or email wall, but jobs remain isolated by an anonymous browser session.

## Current state
The repo already contains the full vertical slice and E2E harness. Do not rebuild it from scratch. Start by running the tests and reading `README.md`, `AGENTS.md`, `app/main.py`, `app/services/transcribe.py`, and `app/static/app.js`.

## Suggested next production upgrades
- authentication + per-user job ownership if public multi-user access is required
- persistent external queue if multiple web replicas are introduced
- chunked/resumable browser uploads for very large (>2 GB) files
- waveform visualization and word-level click-to-seek UI
- optional local LLM summary / chapters provider
- configurable retention policy / auto-delete
- GPU-specific Docker compose profile
- run the deployment gate in `DJAI_DEPLOYMENT.md`, then add both live URLs to the main tools directory and sitemap

## Validation rule
A feature is not done because code exists. Exercise it through the API and browser. Keep mock mode limited to deterministic E2E, and separately verify the selected real ML backend on the target deployment hardware after model installation.
