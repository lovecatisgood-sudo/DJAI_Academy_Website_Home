# Deno Deploy runtime candidate

This repository is a composite Node application rather than a single static
Pages build. Its root `server.js` serves the public homepage, starts the two
Next.js services, and exposes the existing path-mounted tools and APIs. The
dynamic runtime configuration preserves that entrypoint for a migration
preview.

`deno.json` contains deployment metadata only:

- install dependencies with the committed npm lockfile;
- run the existing composite `npm run build`;
- start the existing root `server.js` entrypoint;
- keep the runtime memory limit explicit.

This is a migration candidate, not a claim that the composite service is
already production-ready on Deno Deploy. The preview must prove child-process
startup, static mounts, API behavior, external service access, and health
checks before DNS is considered.

This PR does not deploy the service, enter secrets, or change DNS. Cloudflare
can remain the DNS/CDN layer while the Node-compatible application is
validated at its origin.

## Acceptance gate

Before any DNS change, validate the homepage, every preserved path mount, the
course-interest API, the health endpoint, and the two Next.js service routes.
Also verify all required external-service variables in the dashboard and keep
credentials out of Git.
