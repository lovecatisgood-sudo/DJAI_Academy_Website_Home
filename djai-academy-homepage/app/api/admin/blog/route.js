import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getAllPostGroups, upsertPost } from "../../../lib/blogStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getConfiguredPassword() {
  return process.env.DJAI_BLOG_ADMIN_PASSWORD || "";
}

function getConfiguredApiKey() {
  return process.env.DJAI_BLOG_API_KEY || "";
}

function timingSafeEqualString(received, configured) {
  if (!received || !configured) {
    return false;
  }

  const receivedBuffer = Buffer.from(String(received));
  const configuredBuffer = Buffer.from(String(configured));

  return (
    receivedBuffer.length === configuredBuffer.length &&
    crypto.timingSafeEqual(receivedBuffer, configuredBuffer)
  );
}

function isAuthorizedSecret(secret) {
  return timingSafeEqualString(secret, getConfiguredPassword()) || timingSafeEqualString(secret, getConfiguredApiKey());
}

function getHeaderSecret(request) {
  const bearer = request.headers.get("authorization") || "";
  if (bearer.toLowerCase().startsWith("bearer ")) {
    return bearer.slice(7).trim();
  }
  return request.headers.get("x-djai-blog-api-key") || request.headers.get("x-admin-password") || "";
}

function authError() {
  if (!getConfiguredPassword() && !getConfiguredApiKey()) {
    return NextResponse.json(
      {
        error:
          "Blog admin backend is not configured. Set DJAI_BLOG_ADMIN_PASSWORD or DJAI_BLOG_API_KEY in the deployment environment."
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ error: "Invalid blog admin credential." }, { status: 401 });
}

export async function GET(request) {
  const secret = getHeaderSecret(request);

  if (!isAuthorizedSecret(secret)) {
    return authError();
  }

  const posts = await getAllPostGroups();
  return NextResponse.json({ posts });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const secret = body?.apiKey || body?.password || getHeaderSecret(request);

  if (!isAuthorizedSecret(secret)) {
    return authError();
  }

  try {
    const post = await upsertPost(body?.post || {});
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to save post." }, { status: 400 });
  }
}
