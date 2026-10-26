import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const privateHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: privateHeaders });
}

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const provided = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);

  if (provided.length !== expected.length) return false;

  return timingSafeEqual(provided, expected);
}

/**
 * Keeps the Supabase free-tier project from being paused for inactivity.
 * The pause policy only counts database queries, so this performs a real
 * read instead of pinging a health endpoint.
 */
export async function GET(request: NextRequest) {
  if (!process.env.CRON_SECRET) {
    console.error("Keepalive is disabled: CRON_SECRET is not configured");
    return json({ ok: false }, 503);
  }

  if (!isAuthorized(request)) {
    return json({ ok: false }, 401);
  }

  try {
    const { error } = await getSupabaseAdmin()
      .from("beta_waitlist")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Keepalive database query error", { code: error.code });
      return json({ ok: false }, 503);
    }

    return json({ ok: true }, 200);
  } catch {
    console.error("Keepalive server error");
    return json({ ok: false }, 503);
  }
}
