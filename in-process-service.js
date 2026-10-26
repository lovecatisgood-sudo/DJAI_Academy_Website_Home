function createInProcessService({ name, app, createApp, logger = console, maxAttempts = createApp ? 3 : 1, retryDelayMs = 1000, prepareTimeoutMs = 45000, closeTimeoutMs = 5000 }) {
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 5) throw new Error("Invalid preparation attempt limit");
  if (!Number.isFinite(retryDelayMs) || retryDelayMs < 0 || retryDelayMs > 10000) throw new Error("Invalid preparation retry delay");
  for (const duration of [prepareTimeoutMs, closeTimeoutMs]) {
    if (!Number.isFinite(duration) || duration < 1 || duration > 120000) throw new Error("Invalid service timeout");
  }
  const bounded = (action, timeoutMs, operation) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const error = new Error(`${name} ${operation} timed out`);
      error.code = operation === "preparation" ? "DJAI_PREPARE_TIMEOUT" : "DJAI_CLOSE_TIMEOUT";
      reject(error);
    }, timeoutMs);
    Promise.resolve().then(action).then(resolve, reject).finally(() => clearTimeout(timer));
  });
  async function closeApp({ failOnError = false } = {}) {
    const closing = activeApp;
    activeApp = undefined;
    if (!closing?.close) return;
    try { await bounded(() => closing.close(), closeTimeoutMs, "close"); }
    catch (error) {
      logger.error(`${name} could not close cleanly.`, error);
      if (failOnError) throw error;
    }
  }
  let activeApp;
  let attempts = 0;
  let ready = false;
  let stopped = false;
  let handler;
  let preparation;
  let failure = null;

  function start() {
    if (preparation) return preparation;
    preparation = (async () => {
      while (!stopped && attempts < maxAttempts) {
        attempts++;
        try {
          activeApp = createApp ? createApp() : app;
          await bounded(() => activeApp.prepare(), prepareTimeoutMs, "preparation");
          if (stopped) return;
          handler = activeApp.getRequestHandler();
          failure = null;
          ready = true;
          logger.log(`${name} request handler is ready in the public process.`);
          return;
        } catch (error) {
          failure = error;
          logger.error(`${name} preparation attempt ${attempts} failed.`, error);
          await closeApp({ failOnError: true });
          // Timed-out preparation cannot safely be canceled inside Next. Fail the
          // public process rather than start another handler beside a late one.
          if (error.code === "DJAI_PREPARE_TIMEOUT" || attempts >= maxAttempts) throw error;
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
      }
    })();
    return preparation;
  }

  async function handle(req, res) {
    if (!ready || stopped) {
      res.writeHead(503, { "Content-Type": "text/plain; charset=utf-8", "Retry-After": "2", "Cache-Control": "no-store" });
      res.end("Application is starting or unavailable");
      return;
    }
    try {
      await handler(req, res);
    } catch (error) {
      logger.error(`${name} request failed.`, error);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
        res.end("Application request failed");
      } else {
        res.destroy(error);
      }
    }
  }

  async function stop() {
    stopped = true;
    ready = false;
    if (preparation) await preparation.catch(() => {});
    await closeApp();
  }

  return {
    start, handle, stop,
    isReady: () => ready,
    snapshot: () => ({ ready, mode: "in-process", pid: process.pid, restartCount: 0, retryCount: Math.max(0, attempts - 1), preparationAttempts: attempts, failed: Boolean(failure) }),
  };
}

module.exports = { createInProcessService };
