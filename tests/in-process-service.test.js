const assert = require("node:assert/strict");
const test = require("node:test");
const { createInProcessService } = require("../in-process-service");
const logger = { log() {}, error() {} };
const response = () => ({ headersSent: false, writeHead(status, headers) { this.status = status; this.headers = headers; this.headersSent = true; }, end(body) { this.body = body; }, destroy(error) { this.destroyed = error; } });

test("starts once and handles requests without a child process or internal port", async () => {
  let preparations = 0;
  const service = createInProcessService({ logger, name: "promo", app: {
    async prepare() { preparations++; },
    getRequestHandler() { return (req, res) => res.end(req.url); },
  } });
  assert.equal(service.isReady(), false);
  await Promise.all([service.start(), service.start()]);
  const res = response();
  await service.handle({ url: "/vi?test=1" }, res);
  assert.equal(res.body, "/vi?test=1");
  assert.equal(preparations, 1);
  assert.equal(service.snapshot().pid, process.pid);
  assert.equal(service.snapshot().mode, "in-process");
  assert.equal(service.snapshot().restartCount, 0);
});

test("startup and stopped responses are retryable and readiness includes preparation", async () => {
  let finish;
  const service = createInProcessService({ logger, name: "promo", app: {
    prepare: () => new Promise((resolve) => { finish = resolve; }),
    getRequestHandler: () => (_, res) => res.end("ok"),
  } });
  const preparing = service.start();
  const res = response();
  await service.handle({}, res);
  assert.equal(res.status, 503);
  assert.equal(res.headers["Retry-After"], "2");
  finish();
  await preparing;
  await service.stop();
  const stopped = response();
  await service.handle({}, stopped);
  assert.equal(stopped.status, 503);
});

test("failed preparation is visible in health and never becomes ready", async () => {
  const service = createInProcessService({ logger, name: "promo", app: {
    async prepare() { throw new Error("bad build"); },
  } });
  await assert.rejects(service.start(), /bad build/);
  assert.equal(service.snapshot().failed, true);
  assert.equal(service.isReady(), false);
  await service.stop();
});

test("handler failure returns 500 without leaking exception data", async () => {
  const service = createInProcessService({ logger, name: "promo", app: {
    async prepare() {},
    getRequestHandler: () => () => { throw new Error("private configuration"); },
  } });
  await service.start();
  const res = response();
  await service.handle({}, res);
  assert.equal(res.status, 500);
  assert.equal(res.body.includes("private"), false);
});

test("transient preparation failure retries with a fresh app and reports retries", async () => {
  let attempts = 0;
  let closed = 0;
  const service = createInProcessService({ logger, name: "promo", retryDelayMs: 0, createApp: () => {
    const attempt = ++attempts;
    return { async prepare() { if (attempt === 1) throw new Error("transient"); },
      getRequestHandler: () => (_, res) => res.end("ok"), async close() { closed++; } };
  } });
  await service.start();
  assert.equal(attempts, 2);
  assert.equal(closed, 1);
  assert.equal(service.snapshot().retryCount, 1);
  assert.equal(service.snapshot().failed, false);
  await service.stop();
  assert.equal(closed, 2);
});

test("persistent preparation failure stops after the bounded attempts", async () => {
  let attempts = 0;
  const service = createInProcessService({ logger, name: "promo", maxAttempts: 3, retryDelayMs: 0,
    createApp: () => ({ async prepare() { attempts++; throw new Error("bad build"); }, async close() {} }) });
  await assert.rejects(service.start(), /bad build/);
  assert.equal(attempts, 3);
  assert.equal(service.snapshot().retryCount, 2);
  assert.equal(service.isReady(), false);
  await service.stop();
});

test("hung preparation times out and shutdown remains bounded", async () => {
  const service = createInProcessService({ logger, name: "promo", prepareTimeoutMs: 10, closeTimeoutMs: 10,
    createApp: () => ({ prepare: () => new Promise(() => {}), async close() {} }) });
  await assert.rejects(service.start(), /preparation timed out/);
  assert.equal(service.snapshot().preparationAttempts, 1);
  await service.stop();
  assert.equal(service.isReady(), false);
});

test("hung close cannot hold normal shutdown indefinitely", async () => {
  const service = createInProcessService({ logger, name: "promo", closeTimeoutMs: 10, app: {
    async prepare() {}, getRequestHandler: () => (_, res) => res.end("ok"), close: () => new Promise(() => {})
  } });
  await service.start();
  await service.stop();
  assert.equal(service.isReady(), false);
});

test("failed preparation never retries beside an app that could not close", async () => {
  for (const close of [() => new Promise(() => {}), async () => { throw new Error("close rejected"); }]) {
    let created = 0;
    const service = createInProcessService({ logger, name: "promo", retryDelayMs: 0, closeTimeoutMs: 10,
      createApp: () => { created++; return { async prepare() { throw new Error("prepare failed"); }, close }; } });
    await assert.rejects(service.start(), /close/);
    assert.equal(created, 1);
    assert.equal(service.isReady(), false);
    assert.equal(service.snapshot().failed, true);
    await service.stop();
  }
});
