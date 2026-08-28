import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { BetaSignupForm } from "@/components/beta-signup-form";

const privacyUrl =
  "https://app.notion.com/p/Privacy-Policy-Doo-It-2ae0fe38e5c78041abd7f3269a35583f?source=copy_link";

type BetaPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ verified?: string | string[] }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: BetaPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return getDictionary(lang).beta.metadata;
}

export default async function BetaPage({ params, searchParams }: BetaPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const query = await searchParams;

  const dictionary = getDictionary(lang);
  const beta = dictionary.beta;
  const verificationValue = Array.isArray(query.verified)
    ? query.verified[0]
    : query.verified;
  const verificationResult =
    verificationValue === "success"
      ? "success"
      : verificationValue === "invalid"
        ? "invalid"
        : undefined;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const registrationEnabled =
    process.env.BETA_SIGNUP_ENABLED === "true" && Boolean(siteKey);

  return (
    <div className="min-h-screen bg-[#f4f5f8] font-sans text-[#111] antialiased">
      <header className="fixed left-1/2 top-4 z-50 w-[calc(100%_-_2rem)] max-w-[1400px] -translate-x-1/2 rounded-xl border border-gray-300/80 bg-white/75 shadow-[0_12px_40px_rgba(20,20,20,0.10)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/65">
        <div className="flex h-14 items-center justify-between px-4 md:h-15 md:px-5">
          <a
            href={`/${lang}`}
            className="flex items-center gap-3"
            aria-label={dictionary.nav.homeLabel}
          >
            <Image
              src="/logo.png"
              alt=""
              width={38}
              height={38}
              className="h-8 w-8 object-contain md:h-[38px] md:w-[38px]"
              priority
            />
            <Image
              src="/dooit.png"
              alt=""
              width={78}
              height={78}
              className="h-auto w-[78px] md:w-[78px]"
              priority
            />
          </a>

          <a
            href={`/${lang}`}
            className="group inline-flex h-9 items-center gap-2 rounded-full border border-black/8 bg-white/70 px-3 text-xs font-bold text-[#626262] transition-colors hover:text-black md:px-4 md:text-sm"
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-4 w-4 fill-none stroke-current stroke-[1.8] transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path d="M16 10H5M9 6l-4 4 4 4" />
            </svg>
            <span className="hidden sm:inline">{beta.back}</span>
          </a>
        </div>
      </header>

      <main className="relative isolate min-h-screen overflow-hidden px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-18rem] top-20 -z-10 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(21,121,251,0.17),transparent_68%)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-20rem] right-[-18rem] -z-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(61,220,132,0.13),transparent_68%)] blur-2xl"
        />

        <section className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:min-h-[calc(100vh-13rem)] lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">

            <h1 className="text-[clamp(3.15rem,7vw,5.4rem)] font-black leading-[0.9] tracking-[-0.075em] text-[#111]">
              {beta.title}
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#626262] md:text-xl md:leading-8 lg:mx-0">
              {beta.description}
            </p>

            <ul className="mx-auto mt-9 flex max-w-lg flex-col gap-4 text-left lg:mx-0">
              {beta.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm font-semibold text-[#4f4f4f] md:text-base"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#171717] text-white">
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 fill-none stroke-current stroke-2"
                    >
                      <path d="m3.5 8 3 3 6-6" />
                    </svg>
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <aside className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-[0_30px_90px_rgba(31,38,55,0.13)] sm:p-9 md:rounded-[2.4rem] md:p-11">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(21,121,251,0.14),transparent_68%)]"
            />

            <div className="relative">
              <div className="mb-8">
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#777]">
                  {beta.form.eyebrow}
                </p>
                <h2 className="text-4xl font-black leading-none tracking-[-0.055em] sm:text-5xl">
                  {beta.form.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-[#686868] sm:text-base">
                  {beta.form.description}
                </p>
              </div>

              <BetaSignupForm
                copy={beta.form}
                enabled={registrationEnabled}
                lang={lang}
                siteKey={siteKey}
                verificationResult={verificationResult}
              />

              <p className="mt-6 text-center text-xs leading-5 text-[#898989]">
                {beta.form.privacyPrefix}{" "}
                <a
                  href={privacyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#555] underline decoration-black/20 underline-offset-4 transition-colors hover:text-black"
                >
                  {beta.form.privacy}
                </a>
                .
              </p>
            </div>
          </aside>
        </section>
      </main>

      <footer className="border-t border-black/[0.06] bg-white px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-xs text-[#888] sm:flex-row sm:text-left">
          <Image src="/dooit.png" alt="Doo It!" width={72} height={24} />
          <p>{beta.privacyNote}</p>
        </div>
      </footer>
    </div>
  );
}
