import { NextResponse } from "next/server";
import { optionalEnv } from "./env";

const publicMethods = "GET, POST, OPTIONS";
const publicHeaders = "Content-Type, Accept";

function allowedOrigins() {
  const configured = optionalEnv("WIDGET_ALLOWED_ORIGINS");
  const fallback = process.env.NODE_ENV === "production" ? "" : "*";

  return (configured || fallback)
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin && (process.env.NODE_ENV !== "production" || origin !== "*"));
}

function requestOrigins(request: Request) {
  const origins = new Set<string>();

  try {
    origins.add(new URL(request.url).origin);
  } catch {
  }

  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";

  if (forwardedHost) {
    origins.add(`${forwardedProto}://${forwardedHost}`);
  }

  return origins;
}

export function corsHeaders(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = allowedOrigins();
  const sameAppOrigins = requestOrigins(request);
  const headers = new Headers({
    "Access-Control-Allow-Methods": publicMethods,
    "Access-Control-Allow-Headers": publicHeaders,
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  });

  if (!origin) {
    return headers;
  }

  if (sameAppOrigins.has(origin) || allowed.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    return headers;
  }

  if (allowed.includes("*")) {
    headers.set("Access-Control-Allow-Origin", "*");
  }

  return headers;
}

export function corsJson(request: Request, body: unknown, init?: ResponseInit) {
  const headers = corsHeaders(request);
  const existing = new Headers(init?.headers);

  existing.forEach((value, key) => {
    headers.set(key, value);
  });

  return NextResponse.json(body, {
    ...init,
    headers,
  });
}

export function corsNoContent(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}
