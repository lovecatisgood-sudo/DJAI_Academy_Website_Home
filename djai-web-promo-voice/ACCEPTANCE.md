# DJAI Voice Sales Agent V1 Acceptance Run

Run this after Hostinger deployment, Neon migration, OpenAI credentials, and WordPress embed are configured.

## Preflight Evidence

Record:

- Deployment URL
- WordPress page URL containing the widget
- Admin URL
- Neon project/database name
- Deployed `buildVersion`
- `knowledge_version` before testing

Verify:

```bash
curl https://YOUR_DEPLOYED_ORIGIN/api/health
curl -I https://YOUR_DEPLOYED_ORIGIN/djai-voice-widget.js
curl -i -X OPTIONS https://YOUR_DEPLOYED_ORIGIN/api/session \
  -H "Origin: https://djai.academy" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
```

Expected:

- Health returns `{ "ok": true }`.
- Widget script returns `200`.
- Preflight returns `204` with `access-control-allow-origin` for `https://djai.academy`.
- Health response `buildVersion` matches the intended deployment.

## Provider Checks

OpenAI is the recommended production provider.

1. In Admin Settings, set:
   - Voice provider: OpenAI Realtime
   - Model ID: `gpt-realtime-2.1`
   - Voice: `marin`
   - Transcription model: `gpt-realtime-whisper`
2. Start a call from the production page.

Expected:

- `/api/session` returns `provider: "openai"`.
- Browser connects to OpenAI over WebRTC.
- The agent is not easily interrupted by short acknowledgements like "right", "okay", "ครับ", or "ค่ะ".

Optional Gemini check:

1. In Admin Settings, set:
   - Voice provider: Gemini Live Preview
   - Model ID: `gemini-3.1-flash-live-preview`
2. Start a short test call.

Expected:

- `/api/session` returns `provider: "gemini"`.
- Gemini uses a constrained Live WebSocket URL with a short-lived token.
- Switching back to OpenAI works without code changes or redeploy.

## Browser Security Checks

In browser DevTools on the WordPress page:

- Confirm no request or response exposes `OPENAI_API_KEY`.
- Confirm the browser receives only a short-lived Realtime client secret from `/api/session`.
- Confirm the SDP/WebRTC exchange is browser-to-OpenAI, not audio through the DJAI server.

## Golden Voice Scenarios

### 1. Thai Pricing Ask

Prompt: Ask in Thai about website pricing.

Expected:

- Agent answers in Thai.
- Agent only states prices that exist in the knowledge document.
- If a price is missing, agent says a human will confirm after scope review.

### 2. English Custom App Ask

Prompt: Ask in English for a custom app or custom software.

Expected:

- Agent explains the need in business terms.
- Agent says custom work is quotation-based unless the knowledge document lists a package.
- Agent asks a useful qualifying question.

### 3. Objection Handling

Prompt: Say the service sounds expensive or you are unsure whether AI is needed.

Expected:

- Agent clarifies the business goal.
- Agent handles the concern honestly.
- Agent suggests a proportionate next step without pressure.

### 4. Thai Lead Capture

Prompt: Give a Thai name, project need, contact method, and preferred callback time.

Expected:

- Agent confirms spelling/contact details aloud.
- Agent calls `capture_lead`.
- Lead appears in Admin and Neon within seconds.
- Conversation detail shows transcript and lead card.

### 5. Support-Urgent

Prompt: Report that a website/app is down or broken.

Expected:

- Agent gathers facts without weak diagnosis.
- Lead need is clearly marked `support-urgent`.
- Lead appears in Admin and Neon.

## Admin Settings Test

1. Sign in to `/admin`.
2. Open Settings.
3. Add a temporary sentence to the knowledge document.
4. Save.
5. Start a new voice call and ask about that sentence.

Expected:

- `knowledge_version` increments.
- New call reflects the changed knowledge without redeploy.
- Existing calls are not expected to change mid-session.

## Kill Switch Test

1. Disable `agent_enabled` in Settings.
2. Try to start a new widget call.

Expected:

- `/api/session` returns a blocked/offline response.
- Widget does not connect to Realtime.

## Pass Criteria

V1 acceptance passes when all five golden scenarios, Admin Settings, and Kill Switch tests produce the expected evidence.

Before V1.5 admin work starts, V1 acceptance should pass again with the current restored behavior prompt and provider settings.
