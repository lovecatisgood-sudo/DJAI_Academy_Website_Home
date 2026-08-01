const packageName = "@neondatabase/serverless";

/**
 * Resolves the Neon driver for command-line scripts.
 *
 * These scripts cannot run on a deployed Hostinger server. The root build
 * deletes this project's `node_modules` once the Next.js standalone runtime is
 * prepared, and Next.js bundles the driver into `.next/server/chunks` rather
 * than tracing it into `.next/standalone/node_modules`. The running app is
 * unaffected because it uses the bundled copy, but no importable copy is left
 * for a script. Fail with that explanation instead of a bare module-not-found
 * stack trace.
 */
export async function loadNeon() {
  try {
    return (await import(packageName)).neon;
  } catch (error) {
    if (error?.code !== "ERR_MODULE_NOT_FOUND") {
      throw error;
    }

    throw new Error(
      [
        `Cannot find ${packageName}.`,
        "",
        "The Hostinger build removes this project's node_modules, so migrate and diagnose",
        "cannot run on a deployed server as-is. Neon is reachable over the public internet,",
        "so run them from any machine that has the dependencies installed:",
        "",
        "  cd djai-web-promo-voice",
        "  npm ci",
        '  DATABASE_URL="<your Neon string>" npm run migrate',
        "",
        'To run on the server instead, restore dependencies there first with "npm ci".',
      ].join("\n"),
    );
  }
}
