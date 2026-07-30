# DJAI Voice Sales Agent V1

Next.js App Router implementation of the DJAI bilingual Thai/English voice sales agent, admin backend, Neon schema, and embeddable WebRTC widget.

Runtime: Node 22 and pnpm 11.

## Quick Start

```bash
pnpm install
cp .env.example .env.local
pnpm verify:env
pnpm migrate
pnpm verify:source
pnpm verify:schema
pnpm hostinger:build
pnpm verify:standalone
pnpm dev
```

Open:

- `http://localhost:3000` for the production landing page with the voice sales agent
- `http://localhost:3000/web_promo/` for the integrated promotional landing page
- `http://localhost:3000/voice_admin/` for the integrated admin dashboard
- `http://localhost:3000/web_promo/api/health` for the integrated health check

When this subproject is run by itself with `npm run dev`, its internal development routes remain
`/`, `/admin`, and `/api/health`. The public paths above are provided by the repository root server.

With a server running, public routes can be smoke-tested:

```bash
BASE_URL=http://localhost:3000 pnpm smoke:public
BASE_URL=http://localhost:3000 pnpm smoke:no-secrets
```

## Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Hostinger Cloud env vars, build/start commands, and the WordPress embed snippet.
See [ACCEPTANCE.md](./ACCEPTANCE.md) for the live voice acceptance run.
See [PROJECT_STATE.md](./PROJECT_STATE.md) for the latest handoff state before continuing work.

For Hostinger build-script dropdowns, choose `build` / `pnpm build` if that is the only option. It runs the full deployment build.

## V1.5 Admin Workflow

The V1.5 admin workflow is implemented locally and documented here:

- [DJAI_Voice_Admin_V1_5_PRD.md](./DJAI_Voice_Admin_V1_5_PRD.md)
- [DJAI_Voice_Admin_V1_5_Architecture.md](./DJAI_Voice_Admin_V1_5_Architecture.md)
- [DJAI_Voice_Admin_V1_5_UIUX_Design.md](./DJAI_Voice_Admin_V1_5_UIUX_Design.md)
- [DJAI_Voice_Admin_V1_5_Implementation_Plan.md](./DJAI_Voice_Admin_V1_5_Implementation_Plan.md)

Run the live acceptance gate after deploying the latest ZIP.

## Handoff Archive

```bash
pnpm package:source
pnpm verify:archive
```

## Scope Guard

V1 intentionally uses one editable markdown knowledge document and one `capture_lead` tool. There is no RAG, vector database, queue, Redis, notifications, calendar integration, file upload, multi-user roles, or multi-tenancy.
