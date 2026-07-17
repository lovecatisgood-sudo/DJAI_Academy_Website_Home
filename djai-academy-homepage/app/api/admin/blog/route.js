import { NextResponse } from "next/server";
import { getAllPostGroups, upsertPost } from "../../../lib/blogStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getConfiguredPassword() {
  return process.env.DJAI_BLOG_ADMIN_PASSWORD || "";
}

function isAuthorized(password) {
  const configured = getConfiguredPassword();
  return Boolean(configured) && password === configured;
}

function getHeaderPassword(request) {
  const bearer = request.headers.get("authorization") || "";
  if (bearer.toLowerCase().startsWith("bearer ")) {
    return bearer.slice(7).trim();
  }
  return request.headers.get("x-admin-password") || "";
}

function authError() {
  if (!getConfiguredPassword()) {
    return NextResponse.json(
      {
        error:
          "Blog admin backend is not configured. Set DJAI_BLOG_ADMIN_PASSWORD in the deployment environment."
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
}

export async function GET(request) {
  const password = getHeaderPassword(request);

  if (!isAuthorized(password)) {
    return authError();
  }

  const posts = await getAllPostGroups();
  return NextResponse.json({ posts });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const password = body?.password || getHeaderPassword(request);

  if (!isAuthorized(password)) {
    return authError();
  }

  try {
    const post = await upsertPost(body?.post || {});
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to save post." }, { status: 400 });
  }
}
