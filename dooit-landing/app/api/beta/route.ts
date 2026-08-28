import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { maxRequestBytes, validateBetaSignup } from "@/lib/beta/validation";
import { sendBetaVerificationEmail } from "@/lib/resend/send-beta-verification";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";

export const runtime = "nodejs";

const privateHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
};

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: privateHeaders,
  });
}

function acceptedResponse() {
  return json(
    {
      ok: true,
      message:
        "If the address can receive invitations, the next instructions will arrive by email.",
    },
    200,
  );
}

export async function POST(request: NextRequest) {
  if (process.env.BETA_SIGNUP_ENABLED !== "true") {
    return json({ ok: false, message: "Beta registration is not open yet." }, 503);
  }

  const requestOrigin = request.headers.get("origin");
  const configuredSiteUrl = process.env.SITE_URL;

  if (!configuredSiteUrl) {
    return json({ ok: false, message: "Registration is temporarily unavailable." }, 503);
  }

  let expectedOrigin: string;
  try {
    expectedOrigin = new URL(configuredSiteUrl).origin;
  } catch {
    return json({ ok: false, message: "Registration is temporarily unavailable." }, 503);
  }

  if (!requestOrigin || requestOrigin !== expectedOrigin) {
    return json({ ok: false, message: "Request not allowed." }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, message: "Invalid request." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxRequestBytes) {
    return json({ ok: false, message: "Invalid request." }, 413);
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > maxRequestBytes) {
      return json({ ok: false, message: "Invalid request." }, 413);
    }
    payload = JSON.parse(body);
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const validation = validateBetaSignup(payload);
  if (!validation.success) {
    return json({ ok: false, message: "Check the information and try again." }, 400);
  }

  // Honeypot: respond normally without writing anything.
  if (validation.data.website) return acceptedResponse();

  try {
    const turnstileIsValid = await verifyTurnstileToken(
      validation.data.turnstileToken,
    );

    if (!turnstileIsValid) {
      return json({ ok: false, message: "Security verification failed." }, 400);
    }

    const supabase = getSupabaseAdmin();
    const now = new Date().toISOString();
    const { data: existing, error: lookupError } = await supabase
      .from("beta_waitlist")
      .select("id, status, verified_at, verification_expires_at")
      .eq("email", validation.data.email)
      .maybeSingle();

    if (lookupError) {
      console.error("Beta signup database lookup error", {
        code: lookupError.code,
      });
      return json(
        { ok: false, message: "Registration is temporarily unavailable." },
        503,
      );
    }

    // Keep the same response for registered and unregistered addresses.
    if (existing?.verified_at || existing?.status === "verified") {
      return acceptedResponse();
    }

    const activeExpiry = existing?.verification_expires_at
      ? Date.parse(existing.verification_expires_at)
      : 0;

    // Avoid repeatedly emailing the same address while its link is active.
    if (activeExpiry > Date.now()) return acceptedResponse();

    const token = randomBytes(32).toString("base64url");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1_000).toISOString();

    let waitlistId: number | undefined;

    if (existing) {
      const { data, error } = await supabase
        .from("beta_waitlist")
        .update({
          consent_at: now,
          status: "pending",
          verification_token_hash: tokenHash,
          verification_expires_at: expiresAt,
        })
        .eq("id", existing.id)
        .is("verified_at", null)
        .select("id")
        .maybeSingle();

      if (error) {
        console.error("Beta signup database update error", { code: error.code });
        return json(
          { ok: false, message: "Registration is temporarily unavailable." },
          503,
        );
      }
      waitlistId = data?.id;
    } else {
      const { data, error } = await supabase
        .from("beta_waitlist")
        .insert({
          email: validation.data.email,
          consent_at: now,
          status: "pending",
          verification_token_hash: tokenHash,
          verification_expires_at: expiresAt,
        })
        .select("id")
        .single();

      // A concurrent request may have inserted the same normalized address.
      if (error?.code === "23505") return acceptedResponse();
      if (error) {
        console.error("Beta signup database insert error", { code: error.code });
        return json(
          { ok: false, message: "Registration is temporarily unavailable." },
          503,
        );
      }
      waitlistId = data.id;
    }

    if (!waitlistId) return acceptedResponse();

    const emailSent = await sendBetaVerificationEmail({
      email: validation.data.email,
      token,
      locale: validation.data.lang,
    });

    if (!emailSent) {
      // Let a later attempt generate a fresh link without retaining a dead token.
      await supabase
        .from("beta_waitlist")
        .update({
          verification_token_hash: null,
          verification_expires_at: null,
        })
        .eq("id", waitlistId)
        .eq("verification_token_hash", tokenHash);

      console.error("Beta verification email provider error");
      return json(
        { ok: false, message: "Registration is temporarily unavailable." },
        503,
      );
    }

    return acceptedResponse();
  } catch {
    console.error("Beta signup server error");
    return json({ ok: false, message: "Registration is temporarily unavailable." }, 503);
  }
}
