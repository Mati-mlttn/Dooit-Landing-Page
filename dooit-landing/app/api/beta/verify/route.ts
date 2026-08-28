import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const tokenPattern = /^[A-Za-z0-9_-]{43}$/;

function redirectToBeta(siteUrl: string, lang: string, result: string) {
  const locale = lang === "es" ? "es" : "en";
  const destination = new URL(`/${locale}/beta`, siteUrl);
  destination.searchParams.set("verified", result);

  const response = NextResponse.redirect(destination, 303);
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export async function GET(request: NextRequest) {
  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) {
    return new NextResponse("Verification is temporarily unavailable.", {
      status: 503,
      headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
    });
  }

  const token = request.nextUrl.searchParams.get("token") ?? "";
  const lang = request.nextUrl.searchParams.get("lang") ?? "en";

  if (!tokenPattern.test(token)) {
    return redirectToBeta(siteUrl, lang, "invalid");
  }

  try {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const supabase = getSupabaseAdmin();
    const now = new Date().toISOString();

    const { data: pending, error: lookupError } = await supabase
      .from("beta_waitlist")
      .select("id")
      .eq("verification_token_hash", tokenHash)
      .eq("status", "pending")
      .is("verified_at", null)
      .gt("verification_expires_at", now)
      .maybeSingle();

    if (lookupError || !pending) {
      return redirectToBeta(siteUrl, lang, "invalid");
    }

    const { data: verified, error: updateError } = await supabase
      .from("beta_waitlist")
      .update({
        verified_at: now,
        status: "verified",
        verification_token_hash: null,
        verification_expires_at: null,
      })
      .eq("id", pending.id)
      .eq("verification_token_hash", tokenHash)
      .is("verified_at", null)
      .select("id")
      .maybeSingle();

    if (updateError || !verified) {
      return redirectToBeta(siteUrl, lang, "invalid");
    }

    return redirectToBeta(siteUrl, lang, "success");
  } catch {
    return redirectToBeta(siteUrl, lang, "invalid");
  }
}
