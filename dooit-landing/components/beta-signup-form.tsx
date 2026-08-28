"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "light";
      size: "flexible";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type FormCopy = {
  emailLabel: string;
  emailPlaceholder: string;
  consent: string;
  submit: string;
  submitting: string;
  pending: string;
  status: string;
  success: string;
  error: string;
  verified: string;
  verificationInvalid: string;
};

type BetaSignupFormProps = {
  copy: FormCopy;
  enabled: boolean;
  lang: "en" | "es";
  siteKey?: string;
  verificationResult?: "success" | "invalid";
};

type Status = "idle" | "submitting" | "success" | "error" | "verified" | "invalid";

export function BetaSignupForm({
  copy,
  enabled,
  lang,
  siteKey,
  verificationResult,
}: BetaSignupFormProps) {
  const [scriptReady, setScriptReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<Status>(
    verificationResult === "success"
      ? "verified"
      : verificationResult === "invalid"
        ? "invalid"
        : "idle",
  );
  const widgetContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!enabled || !siteKey || !scriptReady || !widgetContainer.current) return;
    if (!window.turnstile || widgetId.current) return;

    widgetId.current = window.turnstile.render(widgetContainer.current, {
      sitekey: siteKey,
      action: "beta_signup",
      theme: "light",
      size: "flexible",
      callback: setTurnstileToken,
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
      widgetId.current = undefined;
    };
  }, [enabled, scriptReady, siteKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || !turnstileToken || status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");

    try {
      const response = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
          turnstileToken,
          lang,
        }),
      });

      if (!response.ok) throw new Error("Signup failed");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setTurnstileToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  const statusMessage =
    status === "success"
      ? copy.success
      : status === "error"
        ? copy.error
        : status === "verified"
          ? copy.verified
          : status === "invalid"
            ? copy.verificationInvalid
            : copy.status;

  return (
    <>
      {enabled && siteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={() => setScriptReady(true)}
        />
      ) : null}

      <form aria-describedby="beta-form-status" onSubmit={handleSubmit}>
        <fieldset disabled={!enabled || status === "submitting"} className="space-y-5">
          <div>
            <label
              htmlFor="beta-email"
              className="mb-2 block text-sm font-bold text-[#282828]"
            >
              {copy.emailLabel}
            </label>
            <input
              id="beta-email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              placeholder={copy.emailPlaceholder}
              className="h-14 w-full rounded-2xl border border-black/10 bg-[#f7f7f7] px-4 text-base text-[#222] outline-none transition focus:border-black/25 focus:ring-4 focus:ring-black/[0.04] placeholder:text-[#aaa] disabled:cursor-not-allowed"
            />
          </div>

          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="beta-website">Website</label>
            <input
              id="beta-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label className="flex items-start gap-3 text-xs leading-5 text-[#686868] sm:text-sm">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 accent-black"
            />
            <span>{copy.consent}</span>
          </label>

          {enabled && siteKey ? (
            <div ref={widgetContainer} className="min-h-[65px] w-full" />
          ) : null}

          <button
            type="submit"
            disabled={!enabled || !turnstileToken || status === "submitting"}
            className="flex h-14 w-full items-center justify-center rounded-full bg-[#171717] px-6 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-45"
          >
            {!enabled
              ? copy.pending
              : status === "submitting"
                ? copy.submitting
                : copy.submit}
          </button>
        </fieldset>
      </form>

      <div
        id="beta-form-status"
        role="status"
        aria-live="polite"
        className="mt-5 flex items-start gap-3 rounded-2xl border border-[#1579fb]/10 bg-[#1579fb]/[0.05] p-4 text-xs leading-5 text-[#596274]"
      >
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 fill-none stroke-[#1579fb] stroke-[1.7]"
        >
          <path d="M6.5 8V6a3.5 3.5 0 0 1 7 0v2M5 8h10v8H5z" />
        </svg>
        <p>{statusMessage}</p>
      </div>
    </>
  );
}
