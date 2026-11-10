import Image from "next/image";
import type { Metadata } from "next";
import en from "@/dictionaries/en.json";
import type { Dictionary, Locale } from "@/lib/i18n";
import ScrollHero from "@/components/ScrollHero";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = en.metadata;

const featureVisuals = [
  { background: "#ffffff", accent: "#e44940", image: "/explore.png" },
  { background: "#ffffff", accent: "#1579fb", image: "/build.png" },
  { background: "#ffffff", accent: "#2db062", image: "/train.png" },
];

type LandingPageProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function LandingPage({ dictionary, locale }: LandingPageProps) {
  const ticker = dictionary.ticker;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans antialiased">
      <main className="relative z-10 bg-[#f4f4f6] overflow-clip">
        {/* ── Nav ── */}
        <NavBar
          homeLabel={dictionary.nav.homeLabel}
          homeHref="#"
          actionLabel={dictionary.nav.joinBeta}
          actionHref={`/${locale}/beta`}
        />

        {/* ── Hero ── */}
        <ScrollHero phoneAlt={dictionary.hero.imageAlt}>
          <div className="mt-5 relative z-10 flex max-w-8xl flex-col items-center md:mt-18">

            <h1 className="max-w-8xl text-[clamp(3.75rem,10vw,7rem)] font-black leading-[0.88] tracking-[-0.035em] text-[#000000]">
              {dictionary.hero.title}
            </h1>

            <p className="mt-7 max-w-3xl text-base font-regular leading-relaxed text-[#000000] md:text-xl">
              {dictionary.hero.description}
            </p>

            <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
              <a
                href="https://github.com/Mati-mlttn/DooIt-Fitness"
                className="inline-flex h-14 w-fit items-center gap-3 rounded-full bg-white px-5 text-left shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
              >
                <Image
                  src="/github-logo.png"
                  alt=""
                  width={25}
                  height={25}
                  className="shrink-0 object-contain"
                  priority
                />
                <span className="flex flex-col items-center leading-tight">
                  <span className="text-[16px] font-bold text-[#171717]">
                    {dictionary.hero.github}
                  </span>
                  <span className="text-[12px] font-medium text-[#626262]">
                    {dictionary.hero.download}
                  </span>
                </span>
              </a>

              <a
                href=""
                className="inline-flex h-14 w-fit items-center gap-3 rounded-full bg-white px-5 text-left shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
              >
                <Image
                  src="/android.png"
                  alt=""
                  width={30}
                  height={30}
                  className="shrink-0 object-contain"
                  priority
                />
                <span className="flex flex-col items-center leading-tight">
                  <span className="text-[16px] font-bold text-[#171717]">
                    {dictionary.hero.playstore}
                  </span>
                  <span className="text-[12px] font-medium text-[#626262]">
                    {dictionary.hero.soon}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </ScrollHero>

        {/* ── Core journey ── */}
        <section
          id="features"
          className="scroll-mt-[72px] bg-[#f4f4f6] px-5 py-24 md:px-12 md:py-24"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#777]">
                {dictionary.features.eyebrow}
              </p>
              <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.055em] text-[#111] md:text-6xl">
                {dictionary.features.title}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#686868] md:text-lg">
                {dictionary.features.description}
              </p>
            </div>

            <div className="grid items-start gap-7 md:grid-cols-3">
              {dictionary.features.cards.map(({ title, body, imageAlt }, index) => {
                const { background, accent, image } = featureVisuals[index];

                return (
                <article
                  key={title}
                  className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] md:max-w-none"
                  style={{ background }}
                >
                  <div className="flex flex-col p-7 pb-6 md:p-10 md:pb-7">
                    <h3 className="text-4xl font-bold tracking-[-0.04em] text-[#111]">
                      {title}
                    </h3>
                    <p className="mt-3 text-xl leading-7 text-[#626262]">
                      {body}
                    </p>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[50%]"
                    style={{
                      background: `linear-gradient(to bottom, transparent 0%, ${accent}18 32%, ${accent}55 100%)`,
                    }}
                  />
                  <div className="relative z-10 mx-3 mt-1 aspect-4/5 overflow-hidden rounded-t-[1.5rem]">
                    <Image
                      src={image}
                      alt={imageAlt}
                      width={900}
                      height={1880}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="absolute left-1/2 top-0 h-auto w-[85%] max-w-none -translate-x-1/2"
                    />
                  </div>
                </article>
                );
              })}
            </div>

            <article className="relative mt-7 flex min-h-[48rem] flex-col overflow-hidden rounded-[2rem] bg-[#ffffff] lg:block lg:min-h-[42rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_76%,rgba(137,46,222,0.38),rgba(137,46,222,0.1)_32%,transparent_58%)] lg:bg-[radial-gradient(circle_at_18%_78%,rgba(137,46,222,0.58),rgba(137,46,222,0.14)_30%,transparent_57%)]"
              />

              <div className="relative z-20 mx-auto max-w-md px-7 pb-3 pt-9 text-center lg:ml-auto lg:mr-0 lg:max-w-[52%] lg:p-16 lg:text-left">
                <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#777] lg:mb-5 lg:text-xs">
                  {dictionary.insights.eyebrow}
                </p>
                <h3 className="text-[2.35rem] font-bold leading-[0.98] tracking-[-0.055em] text-[#111] sm:text-5xl lg:text-6xl">
                  {dictionary.insights.title}
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-base leading-6 text-[#626262] lg:mx-0 lg:mt-6 lg:max-w-md lg:text-xl lg:leading-8">
                  {dictionary.insights.description}
                </p>
              </div>

              <div className="relative z-10 mx-auto mb-8 mt-auto h-[29rem] sm:h-[34rem] lg:absolute lg:left-[3%] lg:top-1/2 lg:mx-0 lg:mb-0 lg:mt-0 lg:h-[86%] lg:-translate-y-1/2">
                <Image
                  src="/report.png"
                  alt={dictionary.insights.imageAlt}
                  width={1715}
                  height={1927}
                  sizes="(max-width: 767px) 420px, (max-width: 1024px) 460px, 580px"
                  unoptimized
                  className="h-full w-auto drop-shadow-[0_32px_50px_rgba(20,28,70,0.2)]"
                />
              </div>
            </article>

            <article className="relative mt-7 flex min-h-[48rem] flex-col overflow-hidden rounded-[2rem] bg-[#ffffff] lg:block lg:min-h-[42rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_76%,rgba(253,254,60,0.58),rgba(253,254,60,0.14)_32%,transparent_58%)] lg:bg-[radial-gradient(circle_at_82%_78%,rgba(253,254,60,0.85),rgba(253,254,60,0.18)_30%,transparent_57%)]"
              />

              <div className="relative z-20 mx-auto max-w-md px-7 pb-3 pt-9 text-center lg:mx-0 lg:max-w-[52%] lg:p-16 lg:text-left">
                <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#777] lg:mb-5 lg:text-xs">
                  {dictionary.share.eyebrow}
                </p>
                <h3 className="text-[2.35rem] font-bold leading-[0.98] tracking-[-0.055em] text-[#111] sm:text-5xl lg:text-6xl">
                  {dictionary.share.title}
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-base leading-6 text-[#626262] lg:mx-0 lg:mt-6 lg:max-w-md lg:text-xl lg:leading-8">
                  {dictionary.share.description}
                </p>
              </div>

              <div className="relative z-10 mx-auto mb-6 mt-auto flex w-full justify-center px-6 pt-6 sm:mb-8 sm:px-10 lg:absolute lg:right-[2%] lg:top-1/2 lg:mx-0 lg:mb-0 lg:mt-0 lg:h-[86%] lg:w-auto lg:-translate-y-1/2 lg:px-0 lg:pt-0">
                <Image
                  src="/share.png"
                  alt={dictionary.share.imageAlt}
                  width={1715}
                  height={1927}
                  sizes="(max-width: 767px) 420px, (max-width: 1024px) 460px, 580px"
                  unoptimized
                  className="h-auto w-full max-w-[25rem] object-contain drop-shadow-[0_32px_50px_rgba(20,28,70,0.2)] sm:max-w-[28rem] lg:h-full lg:w-auto lg:max-w-none"
                />
              </div>
            </article>

            <article className="relative mt-7 flex min-h-[24rem] items-center overflow-hidden rounded-[2rem] bg-[#141414] px-7 py-14 text-white sm:px-12 lg:px-16">
              <Image
                src="/locked.png"
                alt=""
                aria-hidden="true"
                width={512}
                height={512}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.2),rgba(255,255,255,0.05)_28%,transparent_62%)]"
              />
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                  {dictionary.privacy.eyebrow}
                </p>
                <h3 className="text-[2.35rem] font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  {dictionary.privacy.title}
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg lg:text-xl lg:leading-8">
                  {dictionary.privacy.description}
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ── Ticker ── */}
        <div
          aria-hidden
          className="py-5 border-y border-black/[0.06] overflow-hidden bg-[#f4f4f6]"
        >
          <div className="flex gap-12 animate-[ticker_50s_linear_infinite] whitespace-nowrap w-max">
            {[...ticker, ...ticker].map((item, i) => (
              <span
                key={i}
                className="text-sm font-semibold uppercase tracking-widest text-[#ccc]"
              >
                {item}
                <span className="ml-12 text-[#1579fb]">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Full-width mockup showcase ── */}
        <div className="mockup-showcase">
          <Image
            src="/mockup-features.png"
            alt={dictionary.showcase.imageAlt}
            width={4200}
            height={1633}
            className="mockup-showcase-image"
            priority
          />
        </div>

        <div
          aria-hidden
          className="py-5 border-y border-black/[0.06] overflow-hidden bg-[#ffffff]"
        >
          <div className="flex gap-12 animate-[ticker_50s_linear_infinite] whitespace-nowrap w-max">
            {[...ticker, ...ticker].map((item, i) => (
              <span
                key={i}
                className="text-sm font-semibold uppercase tracking-widest text-[#ccc]"
              >
                {item}
                <span className="ml-12 text-[#1579fb]">·</span>
              </span>
            ))}
          </div>
        </div>



        <section className="relative flex flex-col items-center overflow-hidden bg-[#ffffff] px-5 pb-20 pt-36 text-center md:pb-24 md:pt-36">
          <div className="relative z-10 flex max-w-4xl flex-col items-center">
            <h2 className="max-w-4xl text-[clamp(3.25rem,8vw,5.25rem)] font-bold leading-[0.88] tracking-[-0.075em] text-[#111]">
              {dictionary.cta.title}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#626262] md:text-xl">
              {dictionary.cta.description}
            </p>
            <a
              href="https://github.com/Mati-mlttn/DooIt-Fitness"
              className="mt-9 inline-flex h-14 w-fit items-center gap-3 rounded-full bg-black px-5 text-left shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
            >
              <Image
                src="/github-logo.png"
                alt=""
                width={25}
                height={25}
                className="shrink-0 object-contain"
                style={{ filter: "invert(1)" }}
              />
              <span className="flex flex-col items-center leading-tight">
                <span className="text-[16px] font-bold text-[#ffffff]">
                  {dictionary.hero.github}
                </span>
                <span className="text-[11px] font-medium text-[#909090]">
                  {dictionary.hero.download}
                </span>
              </span>
            </a>
          </div>
        </section>
        <div className="mockup-showcase">
          <Image
            src="/mockup-showcase.png"
            alt={dictionary.showcase.imageAlt}
            width={4200}
            height={1633}
            className="mockup-showcase-image"
            priority
          />
          </div>
      </main>



      {/* ── Footer ── */}
      <footer className="bg-[#ffffff] px-6 pb-10 pt-0 md:px-12">
        <div className="mx-auto max-w-[90rem]">
          <div className="mt-1 grid gap-10 text-center text-sm text-[#626262] md:grid-cols-4 md:text-left">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <Image src="/family.png" alt="" width={80} height={80} />
              <a
                href={`/${locale}/beta`}
                className="transition-colors hover:text-[#0A0A0A]"
              >
                {dictionary.nav.joinBeta}
              </a>
              <a
                href="https://app.notion.com/p/Privacy-Policy-Doo-It-2ae0fe38e5c78041abd7f3269a35583f?source=copy_link"
                className="transition-colors hover:text-[#0A0A0A]"
              >
                {dictionary.footer.privacy}
              </a>
              <a
                href="mailto:matiusalcaino.dev@gmail.com"
                className="mt-2 font-semibold text-[#111] transition-opacity hover:opacity-70"
              >
                {dictionary.footer.sayHello}
              </a>
            </div>

            <p className="md:text-center">© {new Date().getFullYear()} doit</p>

            <p className="md:text-center">
              {dictionary.footer.builtBy}{" "}
              <a
                href="https://github.com/Mati-mlttn"
                className="font-semibold text-[#111] underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Matius Alcaíno
              </a>
            </p>

            <div className="flex flex-col items-center gap-2 md:items-end">
              <h4 className="font-semibold text-[#111]">{dictionary.footer.follow}</h4>
              <a
                href="https://github.com/Mati-mlttn"
                className="transition-colors hover:text-[#0A0A0A]"
              >
                GitHub
              </a>
              <a
                href="www.linkedin.com/in/matius-alcaino"
                className="transition-colors hover:text-[#0A0A0A]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return <LandingPage dictionary={en} locale="en" />;
}
