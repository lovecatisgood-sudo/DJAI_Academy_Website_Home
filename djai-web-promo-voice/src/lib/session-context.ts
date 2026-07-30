import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { optionalEnv, requireEnv } from "./env";

export type SignedSessionContext = {
  conversationId: string;
  expiresAt: number;
  maxCallSeconds: number;
  signature: string;
};

function secret() {
  return optionalEnv("SESSION_SIGNING_SECRET") || optionalEnv("SESSION_PASSWORD") || requireEnv("SESSION_PASSWORD");
}

function payload(conversationId: string, expiresAt: number, maxCallSeconds: number) {
  return `${conversationId}.${expiresAt}.${maxCallSeconds}`;
}

function signPayload(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createSessionContext(maxAgeSeconds: number, maxCallSeconds: number): SignedSessionContext {
  const conversationId = randomUUID();
  const expiresAt = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const boundedMaxCallSeconds = Math.min(3600, Math.max(60, Math.round(maxCallSeconds)));
  const value = payload(conversationId, expiresAt, boundedMaxCallSeconds);

  return {
    conversationId,
    expiresAt,
    maxCallSeconds: boundedMaxCallSeconds,
    signature: signPayload(value),
  };
}

export function verifySessionContext(context: unknown): SignedSessionContext {
  if (!context || typeof context !== "object") {
    throw new Error("Missing session context.");
  }

  const candidate = context as Partial<SignedSessionContext>;

  if (
    typeof candidate.conversationId !== "string" ||
    typeof candidate.expiresAt !== "number" ||
    typeof candidate.maxCallSeconds !== "number" ||
    typeof candidate.signature !== "string"
  ) {
    throw new Error("Invalid session context.");
  }

  if (candidate.expiresAt < Math.floor(Date.now() / 1000)) {
    throw new Error("Session context expired.");
  }

  const maxCallSeconds = Math.min(3600, Math.max(60, Math.round(candidate.maxCallSeconds)));
  const expected = signPayload(payload(candidate.conversationId, candidate.expiresAt, maxCallSeconds));
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(candidate.signature);

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    throw new Error("Invalid session signature.");
  }

  return {
    conversationId: candidate.conversationId,
    expiresAt: candidate.expiresAt,
    maxCallSeconds,
    signature: candidate.signature,
  };
}
