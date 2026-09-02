# Sitewide SEO rollback procedure

Date: 2026-09-02

## Release identity

- Tested application-source candidate: `dfd87c6`
- Program base: `6e17faf`
- Deployment branch: expected `main` (Hostinger auto-deploy boundary)
- Production-before SHA: **must be recorded immediately before an authorized deployment**
- Local build/audit commands: `npm run build` and `npm run verify:hostinger`
- Production entry: repository-root `server.js`, started with `npm start`

The program base is not automatically the production-before SHA. Production may move between review and deployment, so the deploy operator must record the actual remote `main` SHA and preserve the previous successful Hostinger deployment reference before merging or pushing.

## Predeployment record

Before changing production, record all of the following in the deployment ticket or postdeploy report:

1. final release SHA;
2. current `origin/main` SHA;
3. current production `/healthz` response and timestamp;
4. Hostinger's last successful deployment identifier, if exposed;
5. the approved merge/revert method and responsible operator.

Do not change the Hostinger application root. It must remain the repository root with build command `npm run build`, start command `npm start`, and entry file `server.js`.

## Rollback triggers

Roll back immediately for any of these material regressions:

- `/healthz` is not HTTP 200 with ready build/services;
- a primary site, tool, course, or Cam PDF route returns 5xx/404 unexpectedly;
- CSS, JavaScript, PDF worker, FFmpeg, OCR, image-model, or other required static assets are missing;
- a changed route acquires the wrong canonical/noindex/language signal;
- a tool can no longer complete or download its primary result;
- the Play, Development enquiry, course registration, or School handoff is materially broken;
- the sitemap or robots response becomes invalid or routes point into the wrong mounted app.

## Preferred recovery

Use a normal Git revert and redeploy; do not reset shared history and do not delete public content manually.

1. Stop rollout verification and record the failed production URL/evidence.
2. Identify whether the release reached `main` as one merge commit or as individual commits.
3. Revert the release on a recovery branch:
   - merge commit: `git revert -m 1 <release-merge-sha>`;
   - linear commits: revert the exact release commit range in reverse order, using the recorded production-before SHA as the boundary.
4. Run `npm ci`, `npm test`, `npm run build`, and `npm run verify:hostinger` on the recovery branch.
5. After explicit deployment authorization, merge/push the recovery commit to the auto-deploying branch.
6. Verify `/healthz`, homepage assets, one representative route per mounted app, sitemap/robots, canonical host, and the conversion path that triggered rollback.
7. Capture the restored production crawl and record the new recovery SHA/deployment identifier.

If Hostinger supports redeploying an immutable prior successful build, that may be used as the fastest containment step, but the Git branch must then be reconciled to the same code state so a later auto-deploy cannot reintroduce the failure.

## Route preservation

Rollback should restore the prior artifact as a whole. Do not manually delete new pages, edit generated output on the server, or change trailing-slash/capitalization rules as a hotfix. Those actions can create canonical, sitemap, or mounted-app inconsistencies that are harder to detect than the original problem.

## Authority boundary

This document is preparation only. It does not authorize a push, merge, Hostinger action, browser/account access, Search Console submission, or production rollback. Each external action requires explicit authorization and the exact target must be confirmed first.
