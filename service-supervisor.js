const { spawn } = require("node:child_process");

function calculateRestartDelay(failureCount, baseDelayMs = 1_000, maxDelayMs = 30_000) {
  const exponent = Math.max(0, Number(failureCount) - 1);
  return Math.min(maxDelayMs, baseDelayMs * (2 ** exponent));
}

function createServiceSupervisor(options) {
  const {
    name,
    command,
    args = [],
    cwd,
    env,
    readinessCheck,
    logger = console,
    spawnProcess = spawn,
    baseRestartDelayMs = 1_000,
    maxRestartDelayMs = 30_000,
    stableUptimeMs = 60_000
  } = options;

  let child = null;
  let ready = false;
  let stopped = false;
  let failureCount = 0;
  let restartCount = 0;
  let restartTimer = null;
  let startedAt = null;
  let lastExit = null;
  const readyWaiters = new Set();

  function snapshot() {
    return { ready, pid: child?.pid || null, restartCount, lastExit };
  }

  function resolveReadyWaiters() {
    for (const resolve of readyWaiters) resolve();
    readyWaiters.clear();
  }

  function scheduleRestart() {
    if (stopped || restartTimer) return;
    failureCount += 1;
    restartCount += 1;
    const delayMs = calculateRestartDelay(failureCount, baseRestartDelayMs, maxRestartDelayMs);
    logger.error(`${name} is unavailable; restarting in ${delayMs}ms (attempt ${restartCount}).`);
    restartTimer = setTimeout(() => {
      restartTimer = null;
      startChild();
    }, delayMs);
  }

  function startChild() {
    if (stopped || child) return;
    ready = false;
    startedAt = Date.now();
    const currentChild = spawnProcess(command, args, { cwd, env, stdio: "inherit" });
    child = currentChild;

    let finalized = false;
    const handleTermination = (code, signal) => {
      if (finalized || currentChild !== child) return;
      finalized = true;
      const uptimeMs = Date.now() - startedAt;
      child = null;
      ready = false;
      lastExit = { at: new Date().toISOString(), code, signal: signal || null };
      if (stopped) return;
      if (uptimeMs >= stableUptimeMs) failureCount = 0;
      logger.error(`${name} exited (code ${code ?? "none"}, signal ${signal || "none"}, uptime ${uptimeMs}ms).`);
      scheduleRestart();
    };

    currentChild.once("error", (error) => {
      logger.error(`Unable to start ${name}.`, error);
      handleTermination(null, "SPAWN_ERROR");
    });
    currentChild.once("exit", handleTermination);

    Promise.resolve()
      .then(() => readinessCheck())
      .then(() => {
        if (stopped || currentChild !== child) return;
        ready = true;
        logger.log(`${name} is ready on pid ${currentChild.pid}.`);
        resolveReadyWaiters();
      })
      .catch((error) => {
        if (stopped || currentChild !== child) return;
        logger.error(`${name} did not become ready.`, error);
        if (!currentChild.kill("SIGTERM")) handleTermination(null, "READINESS_TIMEOUT");
      });
  }

  function start() {
    stopped = false;
    startChild();
  }

  function waitUntilReady(timeoutMs = 30_000) {
    if (ready) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const onReady = () => {
        clearTimeout(timeout);
        resolve();
      };
      const timeout = setTimeout(() => {
        readyWaiters.delete(onReady);
        reject(new Error(`Timed out waiting for ${name} to become ready.`));
      }, timeoutMs);
      readyWaiters.add(onReady);
    });
  }

  function stop() {
    stopped = true;
    ready = false;
    if (restartTimer) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }
    if (child && !child.killed) child.kill("SIGTERM");
  }

  return { start, stop, waitUntilReady, isReady: () => ready, snapshot };
}

module.exports = { calculateRestartDelay, createServiceSupervisor };
