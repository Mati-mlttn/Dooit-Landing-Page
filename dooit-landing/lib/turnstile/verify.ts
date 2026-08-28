import "server-only";

type TurnstileResponse = {
  success?: boolean;
  hostname?: string;
  action?: string;
};

export async function verifyTurnstileToken(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteUrl = process.env.SITE_URL;

  if (!secret || !siteUrl) {
    throw new Error("Turnstile server environment variables are not configured");
  }

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    },
  );

  if (!response.ok) return false;

  const result = (await response.json()) as TurnstileResponse;
  const expectedHostname = new URL(siteUrl).hostname;

  return (
    result.success === true &&
    result.hostname === expectedHostname &&
    result.action === "beta_signup"
  );
}
