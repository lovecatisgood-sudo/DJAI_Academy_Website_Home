const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const test = require("node:test");

const { calculateRestartDelay, createServiceSupervisor } = require("../service-supervisor");

function createFakeChild(pid) {
  const child = new EventEmitter();
  child.pid = pid;
  child.killed = false;
  child.kill = (signal) => {
    child.killed = true;
    child.emit("exit", null, signal);
  };
  return child;
}

function waitFor(predicate, timeoutMs = 500) {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      if (predicate()) return resolve();
      if (Date.now() - startedAt >= timeoutMs) return reject(new Error("Timed out waiting for condition."));
      setTimeout(check, 5);
    };
    check();
  });
}

test("restart backoff is exponential and capped", () => {
  assert.equal(calculateRestartDelay(1), 1_000);
  assert.equal(calculateRestartDelay(2), 2_000);
  assert.equal(calculateRestartDelay(6), 30_000);
  assert.equal(calculateRestartDelay(20), 30_000);
});

test("an exited service becomes unhealthy and is restarted", async (t) => {
  const children = [];
  const supervisor = createServiceSupervisor({
    name: "test service",
    command: "node",
    readinessCheck: async () => {},
    spawnProcess: () => {
      const child = createFakeChild(100 + children.length);
      children.push(child);
      return child;
    },
    logger: { log() {}, error() {} },
    baseRestartDelayMs: 5,
    maxRestartDelayMs: 10
  });
  t.after(() => supervisor.stop());
  supervisor.start();
  await supervisor.waitUntilReady();
  assert.equal(supervisor.isReady(), true);
  children[0].emit("exit", 1, null);
  assert.equal(supervisor.isReady(), false);
  await waitFor(() => children.length === 2 && supervisor.isReady());
  assert.equal(supervisor.snapshot().restartCount, 1);
  assert.equal(supervisor.snapshot().pid, 101);
});

test("stopping a service cancels automatic restarts", async () => {
  const children = [];
  const supervisor = createServiceSupervisor({
    name: "test service",
    command: "node",
    readinessCheck: async () => {},
    spawnProcess: () => {
      const child = createFakeChild(200 + children.length);
      children.push(child);
      return child;
    },
    logger: { log() {}, error() {} },
    baseRestartDelayMs: 5
  });
  supervisor.start();
  await supervisor.waitUntilReady();
  supervisor.stop();
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(supervisor.isReady(), false);
  assert.equal(children.length, 1);
});

test("a spawn error also enters the restart path", async (t) => {
  const children = [];
  const supervisor = createServiceSupervisor({
    name: "test service",
    command: "node",
    readinessCheck: async () => {},
    spawnProcess: () => {
      const child = createFakeChild(300 + children.length);
      children.push(child);
      if (children.length === 1) queueMicrotask(() => child.emit("error", new Error("spawn failed")));
      return child;
    },
    logger: { log() {}, error() {} },
    baseRestartDelayMs: 5,
    maxRestartDelayMs: 10
  });
  t.after(() => supervisor.stop());
  supervisor.start();
  await waitFor(() => children.length === 2 && supervisor.isReady());
  assert.equal(supervisor.snapshot().restartCount, 1);
  assert.equal(supervisor.snapshot().lastExit.signal, "SPAWN_ERROR");
});
