const assert = require("node:assert/strict");
const { Readable } = require("node:stream");
const test = require("node:test");

const {
  COURSE_INTEREST_RECIPIENT,
  createCourseInterestHandler,
  notificationHtml,
  validateCourseInterest
} = require("../course-interest");

const validBody = {
  name: "Nina Builder",
  email: "NINA@example.com",
  phone: "+66 80 123 4567",
  courseFormat: "private-online",
  schedule: "Weekday evenings in September",
  goals: "I want to turn my working prototype into a product customers can use.",
  locale: "en",
  consent: true,
  company: ""
};

function request(body = validBody, headers = {}) {
  const req = Readable.from([Buffer.from(JSON.stringify(body))]);
  req.method = "POST";
  req.headers = {
    host: "www.djai.academy",
    origin: "https://www.djai.academy",
    "x-forwarded-proto": "https",
    "content-type": "application/json",
    "x-forwarded-for": "203.0.113.10",
    ...headers
  };
  req.socket = { remoteAddress: "203.0.113.10" };
  return req;
}

function response() {
  let resolve;
  const completed = new Promise((done) => { resolve = done; });
  return {
    statusCode: 0,
    headers: {},
    body: "",
    completed,
    writeHead(statusCode, headers) {
      this.statusCode = statusCode;
      this.headers = headers;
    },
    end(body = "") {
      this.body = String(body);
      resolve(this);
    }
  };
}

async function invoke(handler, req) {
  const res = response();
  await handler(req, res);
  return res.completed;
}

function handler(options = {}) {
  return createCourseInterestHandler({
    env: {
      COURSE_INTEREST_RESEND_API_KEY: "re_test",
      COURSE_INTEREST_EMAIL_FROM: "no-reply@djai.academy"
    },
    fetchImpl: async () => ({ ok: true, status: 200 }),
    ...options
  });
}

test("validates and normalizes a complete course interest", () => {
  assert.deepEqual(validateCourseInterest(validBody), {
    name: "Nina Builder",
    email: "nina@example.com",
    phone: "+66 80 123 4567",
    courseFormat: "private-online",
    schedule: "Weekday evenings in September",
    goals: "I want to turn my working prototype into a product customers can use.",
    locale: "en",
    company: ""
  });
  assert.equal(validateCourseInterest({ ...validBody, email: "invalid" }), null);
  assert.equal(validateCourseInterest({ ...validBody, consent: false }), null);
  assert.equal(validateCourseInterest({ ...validBody, courseFormat: "anything" }), null);
});

test("delivers a valid request only to the fixed course mailbox", async () => {
  let providerRequest;
  const res = await invoke(handler({
    fetchImpl: async (url, options) => {
      providerRequest = { url, options };
      return { ok: true, status: 200 };
    }
  }), request());

  assert.equal(res.statusCode, 200);
  assert.deepEqual(JSON.parse(res.body), { ok: true });
  assert.equal(providerRequest.url, "https://api.resend.com/emails");
  const providerBody = JSON.parse(providerRequest.options.body);
  assert.deepEqual(providerBody.to, [COURSE_INTEREST_RECIPIENT]);
  assert.equal(providerBody.reply_to, "nina@example.com");
  assert.match(providerBody.subject, /Nina Builder/);
});

test("uses the configured Hostinger SMTP transport when Resend is unavailable", async () => {
  let transportConfiguration;
  let message;
  const res = await invoke(handler({
    env: {
      SMTP_HOST: "smtp.hostinger.com",
      SMTP_PORT: "465",
      SMTP_SECURE: "true",
      SMTP_USER: "leads@djai.academy",
      SMTP_PASSWORD: "smtp-test-password",
      SMTP_FROM_NAME: "DJAI Academy Leads"
    },
    smtpTransportFactory(configuration) {
      transportConfiguration = configuration;
      return {
        async sendMail(value) {
          message = value;
          return { accepted: [COURSE_INTEREST_RECIPIENT], rejected: [] };
        }
      };
    }
  }), request());

  assert.equal(res.statusCode, 200);
  assert.equal(transportConfiguration.host, "smtp.hostinger.com");
  assert.equal(transportConfiguration.port, 465);
  assert.equal(transportConfiguration.secure, true);
  assert.equal(message.to, COURSE_INTEREST_RECIPIENT);
  assert.equal(message.replyTo, "nina@example.com");
  assert.deepEqual(message.from, { name: "DJAI Academy Leads", address: "leads@djai.academy" });
});

test("falls back to SMTP when Resend rejects the request", async () => {
  let smtpCalls = 0;
  const res = await invoke(handler({
    env: {
      COURSE_INTEREST_RESEND_API_KEY: "re_test",
      COURSE_INTEREST_EMAIL_FROM: "no-reply@djai.academy",
      SMTP_USER: "leads@djai.academy",
      SMTP_PASSWORD: "smtp-test-password"
    },
    fetchImpl: async () => ({ ok: false, status: 503 }),
    smtpTransportFactory() {
      return {
        async sendMail() {
          smtpCalls += 1;
          return { accepted: [COURSE_INTEREST_RECIPIENT], rejected: [] };
        }
      };
    }
  }), request());

  assert.equal(res.statusCode, 200);
  assert.equal(smtpCalls, 1);
});

test("escapes learner-controlled content in the notification", () => {
  const html = notificationHtml({
    ...validateCourseInterest(validBody),
    name: "<script>alert(1)</script>",
    goals: "Build <img src=x onerror=alert(1)> safely"
  });
  assert.doesNotMatch(html, /<script>|<img src=x/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
});

test("rejects cross-site, malformed, and unconsented submissions", async () => {
  assert.equal((await invoke(handler(), request(validBody, { origin: "https://attacker.example" }))).statusCode, 403);
  assert.equal((await invoke(handler(), request({ ...validBody, email: "bad" }))).statusCode, 400);
  assert.equal((await invoke(handler(), request({ ...validBody, consent: false }))).statusCode, 400);
});

test("silently accepts the bot trap without contacting the provider", async () => {
  let providerCalls = 0;
  const res = await invoke(handler({
    fetchImpl: async () => {
      providerCalls += 1;
      return { ok: true, status: 200 };
    }
  }), request({ ...validBody, company: "bot-filled" }));
  assert.equal(res.statusCode, 200);
  assert.equal(providerCalls, 0);
});

test("returns a retryable error when email delivery is not accepted", async () => {
  const res = await invoke(handler({ fetchImpl: async () => ({ ok: false, status: 500 }) }), request());
  assert.equal(res.statusCode, 502);
  assert.deepEqual(JSON.parse(res.body), { ok: false, error: "Notification delivery failed" });
});

test("rate-limits repeated submissions by client IP", async () => {
  const limitedHandler = handler({ now: () => 1_000_000, rateLimitStore: new Map() });
  for (let index = 0; index < 5; index += 1) {
    assert.equal((await invoke(limitedHandler, request())).statusCode, 200);
  }
  const response = await invoke(limitedHandler, request());
  assert.equal(response.statusCode, 429);
  assert.equal(response.headers["Retry-After"], "900");
});
