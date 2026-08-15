import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doo It! - Your personal workout app",
  description:
    "800+ illustrated exercises. Strength and cardio routines. No ads, no sign-up, 100% private.",
};

const ticker = [
  "Squat",
  "Deadlift",
  "Bench Press",
  "Pull-up",
  "Overhead Press",
  "Hip Thrust",
  "Barbell Row",
  "Dips",
  "Bicep Curl",
  "Plank",
  "Burpees",
  "Tricep Extension",
  "Lat Pulldown",
  "Incline Bench Press",
  "Leg Press",
  "Romanian Deadlift",
  "Walking Lunges",
  "Bulgarian Split Squat",
  "Leg Curl",
  "Leg Extension",
  "Lateral Raise",
  "Hammer Curl",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#0A0A0A] font-sans antialiased">
      <main className="relative z-10 bg-[#ffffff] overflow-hidden">
        {/* ── Nav ── */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.06] bg-[#f7f7f7]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
            <a href="#" className="flex items-center gap-3" aria-label="Doo It! home">
              <Image
                src="/logo.png"
                alt=""
                width={42}
                height={42}
                className="object-contain"
                priority
              />
              <Image src="/dooit.png" alt="" width={80} height={80} priority />
            </a>
          <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-semibold text-[#686868]">
            <a
              href="#features"
              className="hover:text-[#0A0A0A] transition-colors"
            >
              Features
            </a>
            <a href="https://app.notion.com/p/Privacy-Policy-Doo-It-2ae0fe38e5c78041abd7f3269a35583f?source=copy_link" className="hover:text-[#0A0A0A] transition-colors">
              Privacy Policy
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
              Built for Android
            </p>

            <h1 className="max-w-4xl text-[clamp(3.25rem,8vw,5.25rem)] font-black leading-[0.88] tracking-[-0.075em] text-[#111]">
              Your workout. Your way.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#626262] md:text-xl">
              800+ illustrated exercises. Strength and cardio routines. No ads,
              no sign-up — just training.
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
                View on GitHub
              </a>

              <span className="text-sm font-semibold text-[#777]">Free · Private · No account</span>
            </div>
          </div>

          <div className="relative z-10 mt-5 w-[380px] translate-y-6 md:mt-5 md:w-[490px] lg:w-[590px]">
            <div className="home-halo" />
            <Image
              src="/home.png"
              alt="Doo It! workout dashboard"
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
            alt="Doo It! screens showing workouts, progress, muscles and reminders"
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
                Made for every workout
              </p>
              <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[#111] md:text-6xl">
                Everything you need to train better.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#686868] md:text-lg">
                Find the right exercise, build a routine around your goals, and
                stay focused through every set.
              </p>
            </div>

            <div className="grid items-start gap-7 md:grid-cols-3">
              {[
                {
                  title: "Explore",
                  body: "Find the right exercise from among more than 800 illustrated exercises organized by muscle group.",
                  background: "#ebf0f8",
                  accent: "#e44940",
                  image: "/Explore.png",
                },
                {
                  title: "Build",
                  body: "Create strength and cardio routines that fit your goals, your schedule, and the equipment you have.",
                  background: "#ebf0f8",
                  accent: "#1579fb",
                  image: "/build.png",
                },
                {
                  title: "Train",
                  body: "Follow every exercise, set, and repetition in a simple workout experience that keeps you moving.",
                  background: "#ebf0f8",
                  accent: "#2db062",
                  image: "/Train.png",
                },
              ].map(({ title, body, background, accent, image }) => (
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
                      alt={`${title} in Doo It!`}
                      width={900}
                      height={1880}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="absolute left-1/2 top-0 h-auto w-[85%] max-w-none -translate-x-1/2"
                    />
                  </div>
                </article>
              ))}
            </div>

            <article className="relative mt-7 flex min-h-[48rem] flex-col overflow-hidden rounded-[2rem] bg-[#eff1f8] lg:block lg:min-h-[42rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_76%,rgba(137,46,222,0.38),rgba(137,46,222,0.1)_32%,transparent_58%)] lg:bg-[radial-gradient(circle_at_18%_78%,rgba(137,46,222,0.58),rgba(137,46,222,0.14)_30%,transparent_57%)]"
              />

              <div className="relative z-20 mx-auto max-w-md px-7 pb-3 pt-9 text-center lg:ml-auto lg:mr-0 lg:max-w-[52%] lg:p-16 lg:text-left">
                <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#777] lg:mb-5 lg:text-xs">
                  Training insights
                </p>
                <h3 className="text-[2.35rem] font-black leading-[0.98] tracking-[-0.055em] text-[#111] sm:text-5xl lg:text-6xl">
                  See your progress at a glance.
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-base leading-6 text-[#626262] lg:mx-0 lg:mt-6 lg:max-w-md lg:text-xl lg:leading-8">
                  Turn every session into clear charts and detailed reports.
                  See your exercises, sets, reps, and training history in one
                  visual summary.
                </p>
              </div>

              <div className="relative z-10 mx-auto mb-8 mt-auto h-[29rem] sm:h-[34rem] lg:absolute lg:left-[3%] lg:top-1/2 lg:mx-0 lg:mb-0 lg:mt-0 lg:h-[86%] lg:-translate-y-1/2">
                <Image
                  src="/report-3.png"
                  alt="Workout charts and detailed training reports in Doo It!"
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
                  Made to be yours
                </p>
                <h3 className="text-[2.35rem] font-black leading-[0.98] tracking-[-0.055em] text-[#111] sm:text-5xl lg:text-6xl">
                  Make every workout worth sharing.
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-base leading-6 text-[#626262] lg:mx-0 lg:mt-6 lg:max-w-md lg:text-xl lg:leading-8">
                  Turn your training into a visual recap you can save, share,
                  and feel proud of—from the first set to the last rep.
                </p>
              </div>

              <div className="relative z-10 mx-auto mb-8 mt-auto h-[29rem] sm:h-[34rem] lg:absolute lg:right-[2%] lg:top-1/2 lg:mx-0 lg:mb-0 lg:mt-0 lg:h-[86%] lg:-translate-y-1/2">
                <Image
                  src="/share.png"
                  alt="Shareable workout recap in Doo It!"
                  width={1715}
                  height={1927}
                  sizes="(max-width: 767px) 420px, (max-width: 1024px) 460px, 580px"
                  unoptimized
                  className="h-full w-auto drop-shadow-[0_32px_50px_rgba(20,28,70,0.2)]"
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
                  Privacy by design
                </p>
                <h3 className="text-[2.35rem] font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  Your workouts stay yours.
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg lg:text-xl lg:leading-8">
                  No account, no cloud, and no tracking. Your routines and
                  training history stay securely on your device, under your
                  control.
                </p>
              </div>
            </article>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[#111] md:text-6xl">
              Grab everything you need and get started.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#686868] md:text-lg">
              Choose your exercises, build a routine around your goals, and
              start training. Doo It! keeps everything else simple.
            </p>
            <a
              href="https://github.com/Mati-mlttn/DooIt-Fitness"
              className="mx-auto mt-6 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-[#171717] px-8 text-base font-bold text-white shadow-lg shadow-black/10 transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98]"
            >
              <Image
                src="/github-logo.png"
                alt=""
                width={20}
                height={20}
                className="object-contain"
                style={{ filter: "invert(1)" }}
              />
              View on GitHub
            </a>
          </div>
        </div>
        <div className="mockup-showcase">
          <Image
            src="/full.png"
            alt="Doo It! screens showing workouts, progress, muscles and reminders"
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
          <span>© {new Date().getFullYear()} Doo It!</span>
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
