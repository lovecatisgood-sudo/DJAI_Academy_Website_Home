import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { optionalEnv, requireEnv } from "./env";

const cookieName = "djai_admin";
const maxAgeSeconds = 60 * 60 * 12;

function authSecret() {
  return optionalEnv("SESSION_PASSWORD") || requireEnv("SESSION_SIGNING_SECRET");
}

function optionalAuthSecret() {
  return optionalEnv("SESSION_PASSWORD") || optionalEnv("SESSION_SIGNING_SECRET");
}

function sign(value: string) {
  return createHmac("sha256", authSecret()).update(value).digest("base64url");
}

function signWithSecret(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function constantEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function buildCookieValue(username: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const payload = Buffer.from(JSON.stringify({ username, expiresAt })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifyCookieValue(value: string | undefined) {
  const secret = optionalAuthSecret();
  if (!secret) {
    return false;
  }

  if (!value) {
    return false;
  }

  const parts = value.split(".");

  if (parts.length === 2) {
    const [encodedPayload, signature] = parts;

    if (!constantEquals(signature, signWithSecret(encodedPayload, secret))) {
      return false;
    }

    try {
      const parsed = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as {
        username?: unknown;
        expiresAt?: unknown;
      };

      return (
        typeof parsed.username === "string" &&
        typeof parsed.expiresAt === "number" &&
        parsed.expiresAt >= Math.floor(Date.now() / 1000)
      );
    } catch {
      return false;
    }
  }

  if (parts.length !== 3) {
    return false;
  }

  const [username, expiresAtRaw, signature] = parts;
  const expiresAt = Number(expiresAtRaw);

  if (!username || !Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false;
  }

  return constantEquals(signature, signWithSecret(`${username}.${expiresAt}`, secret));
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyCookieValue(cookieStore.get(cookieName)?.value);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/voice_admin/login");
  }
}

export async function setAdminCookie(username: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, buildCookieValue(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export function validateAdminCredentials(username: string, password: string) {
  const expectedUsername = requireEnv("ADMIN_USERNAME");
  const expectedPassword = requireEnv("ADMIN_PASSWORD");
  return constantEquals(username, expectedUsername) && constantEquals(password, expectedPassword);
}
