export const maxRequestBytes = 4_096;

export type BetaSignupInput = {
  email: string;
  consent: true;
  website: string;
  turnstileToken: string;
  lang: "en" | "es";
};

type ValidationResult =
  | { success: true; data: BetaSignupInput }
  | { success: false };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBetaSignup(value: unknown): ValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false };
  }

  const input = value as Record<string, unknown>;
  const rawEmail = typeof input.email === "string" ? input.email : "";
  const email = rawEmail.normalize("NFKC").trim().toLowerCase();
  const website = typeof input.website === "string" ? input.website.trim() : "";
  const turnstileToken =
    typeof input.turnstileToken === "string" ? input.turnstileToken.trim() : "";
  const lang = input.lang === "es" ? "es" : input.lang === "en" ? "en" : null;

  if (
    input.consent !== true ||
    email.length < 3 ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    /[\u0000-\u001F\u007F]/.test(email) ||
    website.length > 200 ||
    turnstileToken.length < 1 ||
    turnstileToken.length > 2_048 ||
    !lang
  ) {
    return { success: false };
  }

  return {
    success: true,
    data: { email, consent: true, website, turnstileToken, lang },
  };
}
