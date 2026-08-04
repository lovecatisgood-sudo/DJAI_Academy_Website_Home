import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function retiredResponse() {
  return NextResponse.json(
    {
      error: "This browser-only onboarding endpoint has been retired.",
      onboarding: "https://school.djai.academy/"
    },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" }
    }
  );
}

export const GET = retiredResponse;
export const POST = retiredResponse;
