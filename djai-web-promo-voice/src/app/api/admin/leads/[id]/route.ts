import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  await requireAdmin();
  const { id } = await params;
  const body = (await request.json()) as { status?: string };

  if (!["pending_follow_up", "appointment_set", "follow_up_later", "deal_closed", "no_deal"].includes(body.status || "")) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const sql = getSql();
  await sql`update leads set status = ${body.status}, updated_at = now() where id = ${id}`;
  return NextResponse.json({ ok: true });
}
