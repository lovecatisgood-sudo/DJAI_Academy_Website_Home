const baseUrl = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();

  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  return { response, body };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const session = await request("/api/session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ pageUrl: "https://djai.academy/" }),
});

assert(
  session.response.status === 500,
  `/api/session without env expected 500, got ${session.response.status}`,
);
assert(
  typeof session.body?.error === "string" && session.body.error.includes("DATABASE_URL"),
  "/api/session without env should report missing DATABASE_URL.",
);

const lead = await request("/api/lead", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

assert(lead.response.status === 400, `/api/lead unsigned body expected 400, got ${lead.response.status}`);
assert(
  typeof lead.body?.error === "string" && lead.body.error.includes("session context"),
  "/api/lead unsigned body should report missing session context.",
);

const conversation = await request("/api/conversation", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

assert(
  conversation.response.status === 400,
  `/api/conversation unsigned body expected 400, got ${conversation.response.status}`,
);
assert(
  typeof conversation.body?.error === "string" && conversation.body.error.includes("session context"),
  "/api/conversation unsigned body should report missing session context.",
);

console.log(`No-secret API smoke test passed for ${baseUrl}`);
