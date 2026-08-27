import Image from "next/image";
import type { Metadata } from "next";
import en from "@/dictionaries/en.json";
import type { Dictionary } from "@/lib/i18n";

export const metadata: Metadata = en.metadata;

const featureVisuals = [
  { background: "#ebf0f8", accent: "#e44940", image: "/Explore.png" },
  { background: "#ebf0f8", accent: "#1579fb", image: "/build.png" },
  { background: "#ebf0f8", accent: "#2db062", image: "/Train.png" },
];

type LandingPageProps = {
  dictionary: Dictionary;
};

export function LandingPage({ dictionary }: LandingPageProps) {
  const ticker = dictionary.ticker;

  return (
    <div className="min-h-screen bg-black text-[#0A0A0A] font-sans antialiased">
      <main className="relative z-10 bg-[#ffffff] overflow-hidden">
        {/* ── Nav ── */}
        <header className="fixed left-1/2 top-4 z-50 w-[calc(100%_-_2rem)] max-w-[1400px] -translate-x-1/2 rounded-xl border border-gray-400/15 bg-white/75 shadow-[0_12px_40px_rgba(20,20,20,0.10)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/65">
          <div className="flex h-14 items-center justify-start px-4 md:h-15 md:justify-between md:px-5">
            <a href="#" className="flex items-center gap-3" aria-label={dictionary.nav.homeLabel}>
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
            <nav className="hidden items-center justify-center gap-7 text-sm font-semibold text-[#686868] md:flex">
              <a
                href="#features"
                className="transition-colors hover:text-[#0A0A0A]"
              >
                {dictionary.nav.features}
              </a>
              <a
                href="https://app.notion.com/p/Privacy-Policy-Doo-It-2ae0fe38e5c78041abd7f3269a35583f?source=copy_link"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#0A0A0A]"
              >
                {dictionary.nav.privacy}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.6] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <path d="M4 12 12 4M6 4h6v6" />
                </svg>
              </a>
            </nav>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="relative flex min-h-[920px] flex-col items-center overflow-hidden px-5 pb-20 pt-36 text-center md:min-h-[1040px] md:pt-30">
          <div className="pointer-events-none absolute left-1/2 top-[34rem] h-[620px] w-[min(1100px,95vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(21,121,251,0.18),rgba(61,220,132,0.10)_42%,transparent_70%)] blur-2xl" />
          <div className="relative z-10 flex max-w-4xl flex-col items-center">
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-black shadow-sm">
              <Image
                src="/android.png"
                alt=""
                width={20}
                height={20}
                className="object-contain"
                priority
              />
              {dictionary.hero.badge}
            </p>

            <h1 className="max-w-4xl text-[clamp(3.25rem,8vw,5.25rem)] font-black leading-[0.88] tracking-[-0.075em] text-[#111]">
              {dictionary.hero.title}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#626262] md:text-xl">
              {dictionary.hero.description}
            </p>

            <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
              <a
                href="https://github.com/Mati-mlttn/DooIt-Fitness"
                className="inline-flex h-14 w-fit items-center justify-center gap-2 rounded-full bg-[#171717] px-8 text-base font-bold text-white shadow-lg shadow-black/10 transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98]"
              >
                <Image
                  src="/github-logo.png"
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain"
                  style={{ filter: "invert(1)" }}
                />
                {dictionary.hero.github}
              </a>

              <span className="text-sm font-semibold text-[#777]">
                {dictionary.hero.details}
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-5 w-[380px] translate-y-6 md:mt-5 md:w-[490px] lg:w-[590px]">
            <div className="home-halo" />
            <Image
              src="/home.png"
              alt={dictionary.hero.imageAlt}
              width={900}
              height={900}
              className="h-auto w-full object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.22)]"
              priority
            />
          </div>
        </section>

        {/* ── Ticker ── */}
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

        {/* ── Full-width mockup showcase ── */}
        <div className="mockup-showcase">
          <Image
            src="/full-features.png"
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

        {/* ── Core journey ── */}
        <section
          id="features"
          className="scroll-mt-[72px] bg-[#ffffff] px-5 py-24 md:px-12 md:py-24"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#777]">
                {dictionary.features.eyebrow}
              </p>
              <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[#111] md:text-6xl">
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
                    <h3 className="text-4xl font-black tracking-[-0.04em] text-[#111]">
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

            <article className="relative mt-7 flex min-h-[48rem] flex-col overflow-hidden rounded-[2rem] bg-[#eff1f8] lg:block lg:min-h-[42rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_76%,rgba(137,46,222,0.38),rgba(137,46,222,0.1)_32%,transparent_58%)] lg:bg-[radial-gradient(circle_at_18%_78%,rgba(137,46,222,0.58),rgba(137,46,222,0.14)_30%,transparent_57%)]"
              />

              <div className="relative z-20 mx-auto max-w-md px-7 pb-3 pt-9 text-center lg:ml-auto lg:mr-0 lg:max-w-[52%] lg:p-16 lg:text-left">
                <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#777] lg:mb-5 lg:text-xs">
                  {dictionary.insights.eyebrow}
                </p>
                <h3 className="text-[2.35rem] font-black leading-[0.98] tracking-[-0.055em] text-[#111] sm:text-5xl lg:text-6xl">
                  {dictionary.insights.title}
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-base leading-6 text-[#626262] lg:mx-0 lg:mt-6 lg:max-w-md lg:text-xl lg:leading-8">
                  {dictionary.insights.description}
                </p>
              </div>

              <div className="relative z-10 mx-auto mb-8 mt-auto h-[29rem] sm:h-[34rem] lg:absolute lg:left-[3%] lg:top-1/2 lg:mx-0 lg:mb-0 lg:mt-0 lg:h-[86%] lg:-translate-y-1/2">
                <Image
                  src="/report-3.png"
                  alt={dictionary.insights.imageAlt}
                  width={1715}
                  height={1927}
                  sizes="(max-width: 767px) 420px, (max-width: 1024px) 460px, 580px"
                  unoptimized
                  className="h-full w-auto drop-shadow-[0_32px_50px_rgba(20,28,70,0.2)]"
                />
              </div>
            </article>

            <article className="relative mt-7 flex min-h-[48rem] flex-col overflow-hidden rounded-[2rem] bg-[#eff1f8] lg:block lg:min-h-[42rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_76%,rgba(253,254,60,0.58),rgba(253,254,60,0.14)_32%,transparent_58%)] lg:bg-[radial-gradient(circle_at_82%_78%,rgba(253,254,60,0.85),rgba(253,254,60,0.18)_30%,transparent_57%)]"
              />

              <div className="relative z-20 mx-auto max-w-md px-7 pb-3 pt-9 text-center lg:mx-0 lg:max-w-[52%] lg:p-16 lg:text-left">
                <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#777] lg:mb-5 lg:text-xs">
                  {dictionary.share.eyebrow}
                </p>
                <h3 className="text-[2.35rem] font-black leading-[0.98] tracking-[-0.055em] text-[#111] sm:text-5xl lg:text-6xl">
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
                <h3 className="text-[2.35rem] font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  {dictionary.privacy.title}
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg lg:text-xl lg:leading-8">
                  {dictionary.privacy.description}
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="relative flex flex-col items-center overflow-hidden bg-white px-5 pb-20 pt-36 text-center md:pb-24 md:pt-36">
          <div className="relative z-10 flex max-w-4xl flex-col items-center">
            <h2 className="max-w-4xl text-[clamp(3.25rem,8vw,5.25rem)] font-black leading-[0.88] tracking-[-0.075em] text-[#111]">
              {dictionary.cta.title}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#626262] md:text-xl">
              {dictionary.cta.description}
            </p>
            <a
              href="https://github.com/Mati-mlttn/DooIt-Fitness"
              className="mt-9 inline-flex h-14 w-fit items-center justify-center gap-2 rounded-full bg-[#171717] px-8 text-base font-bold text-white shadow-lg shadow-black/10 transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98]"
            >
              <Image
                src="/github-logo.png"
                alt=""
                width={20}
                height={20}
                className="object-contain"
                style={{ filter: "invert(1)" }}
              />
              {dictionary.cta.github}
            </a>
          </div>
        </section>
        <div className="mockup-showcase">
          <Image
            src="/full.png"
            alt={dictionary.showcase.imageAlt}
            width={4200}
            height={1633}
            className="mockup-showcase-image"
            priority
          />
          </div>
      </main>



      {/* ── Footer ── */}
      <footer className="py-10 px-6 md:px-12  bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#999]">
          <Image src="/dooit.png" alt="" width={80} height={80} priority />

          <div className="flex gap-8">
            <Image src="/gosht-2.png" alt="" width={90} height={90} priority />
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm">
            <a
              href="https://app.notion.com/p/Privacy-Policy-Doo-It-2ae0fe38e5c78041abd7f3269a35583f?source=copy_link"
              className="transition-colors hover:text-[#0A0A0A] md:hidden"
            >
              {dictionary.footer.privacy}
            </a>
            <span aria-hidden="true" className="text-black/20 md:hidden">
              ·
            </span>
            <span>© {new Date().getFullYear()} Doo It!</span>
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
  return <LandingPage dictionary={en} />;
}
