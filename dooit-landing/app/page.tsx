import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doo It! — Your personal workout app",
  description:
    "800+ illustrated exercises. Strength and cardio routines. No ads, no sign-up, 100% private.",
};

const whys = [
  { icon: "🔒", text: "100% private — your data stays on your device only" },
  { icon: "🚫", text: "Zero ads. Train without interruptions" },
  { icon: "⚡", text: "No sign-up. Start training instantly" },
  { icon: "🌍", text: "Available in English and Spanish" },
  { icon: "📏", text: "Metric and imperial systems supported" },
];

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
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#0A0A0A] font-sans antialiased">
      <main className="relative z-10 bg-[#f7f7f7] rounded-b-[3rem] sm:rounded-b-[4rem] shadow-2xl overflow-hidden">
        {/* ── Nav ── */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 border-b border-black/[0.06] bg-white/90 backdrop-blur-md">
          <Image
            src="/logo.png"
            alt="Doo It! app on device"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#888]">
            <a
              href="#features"
              className="hover:text-[#0A0A0A] transition-colors"
            >
              Features
            </a>
            <a href="#why" className="hover:text-[#0A0A0A] transition-colors">
              Why Doo It
            </a>
            <a
              href="#download"
              className="hover:text-[#0A0A0A] transition-colors"
            >
              Download
            </a>
          </nav>
          <a
            href="#download"
            className="text-sm font-bold px-5 py-2 rounded-full bg-[#1579fb] text-white hover:bg-[#606060] transition-colors"
          >
            Download free
          </a>
        </header>

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden">
          {/* subtle bg accent */}

          {/* Left */}
          <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left flex-1 z-10">
            <p className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black border-[3.5px] border-white rounded-full px-4 py-3 shadow-[0_0_20px_rgba(61,220,132,0.4)]">
              {/* <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> */}
              <Image
                src="/android.png"
                alt="Doo It! app on device"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
              Soon on Android
            </p>

            <h1
              className={
                "max-w-xl text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-[#c9c9c9]"
              }
            >
              Your body.
              <br />
              Your program.
              <br />
              <Image src="/dooit.png" alt="" width={300} height={50} />
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-[#666]">
              800+ illustrated exercises. Strength and cardio routines. No ads,
              no sign-up — just training.
            </p>

            {/*<div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#"
              className="flex items-center justify-center px-8 py-3.5 rounded-full border border-black/15 text-[#0A0A0A] text-base font-bold hover:bg-black/5 transition-colors"
            >
              Google Play
            </a>
          </div>
          */}
          </div>

          {/* Right */}
          <div className="relative flex-shrink-0 w-[300px] md:w-[360px] lg:w-[400px] z-10">
            <Image
              src="/home.png"
              alt=""
              width={400}
              height={800}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </section>

        {/* ── Ticker ── */}
        <div
          aria-hidden
          className="py-5 border-y border-black/[0.06] overflow-hidden bg-[#f7f7f7]"
        >
          <div className="flex gap-12 animate-[ticker_28s_linear_infinite] whitespace-nowrap w-max">
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

        {/* ── Features Bento ── */}
        <section id="features" className="py-28 px-6 md:px-12 bg-[#f7f7f7]">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#626262] mb-4 px-14">
              Features
            </p>
            <h2 className="flex items-start gap-3 text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-xl mb-16 text-[#0A0A0A]">
              <Image
                src="/sparkle.png"
                alt=""
                width={40}
                height={40}
                className="py-3"
                priority
              />
              Everything you need to train seriously.
            </h2>

            <div className="w-full">
              <Image
                src="/bento.png"
                alt="Doo It Features Bento"
                width={5598}
                height={4707}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        {/* ── Why Doo It ── */}
        <section
          id="why"
          className="py-20 px-6 md:px-12 border-t border-black/[0.06] bg-[#f7f7f7]"
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#626262] mb-4 px-14">
              Why Doo It!
            </p>
            <h2 className="flex items-start gap-3 text-4xl md:text-5xl font-black tracking-tight leading-tight mb-16 max-w-lg text-[#0A0A0A]">
              <Image
                src="/nop.png"
                alt=""
                width={40}
                height={40}
                className="py-3"
                priority
              />
              No tricks. No surprise subscriptions.
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whys.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-4 rounded-2xl bg-white border border-black/[0.06] p-6"
                >
                  <span className="text-xl mt-0.5">{icon}</span>
                  <p className="text-sm font-medium text-[#0A0A0A] leading-snug">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ── How it works ── */}
        <section className="py-20 px-6 md:px-12 border border-black/[0.06] rounded-b-[4rem] bg-[#f7f7f7] ">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#626262] mb-4 px-14">
              How it works
            </p>
            <h2 className="flex items-start gap-3 text-4xl md:text-5xl font-black tracking-tight leading-tight mb-16 max-w-sm text-[#0A0A0A]">
              <Image
                src="/muscle.png"
                alt=""
                width={40}
                height={40}
                className="py-3"
                priority
              />
              Start training today.
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  n: "1",
                  title: "Download the app",
                  body: "No account. No email. Open the app and you're already in.",
                },
                {
                  n: "2",
                  title: "Build your routine",
                  body: "Pick exercises from the library or create your own. Set up your week in minutes.",
                },
                {
                  n: "3",
                  title: "Train and track",
                  body: "Follow your progress in real time. Every set, every rep, every calories saved on your device.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex flex-col gap-4">
                  <span className="text-7xl font-black text-black leading-none select-none">
                    {n}
                  </span>
                  <h3 className="text-xl font-black text-[#0A0A0A]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#777]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Final CTA ── */}
      <section className="py-28 px-6 md:px-12 border-t border-black/[0.06] text-center bg-black">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
            The only workout that fails
            <br />
            is the one you{" "}
            <span className="text-[#1579fb]">don&apos;t do.</span>
          </h2>
          <p className="text-[#777] text-lg max-w-sm">
            Download Doo It! for free. No sign-up, no ads, no excuses.
          </p>
          {/*
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="disabled flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-black/15 text-[#0A0A0A] text-base font-bold hover:bg-black/5 transition-colors"
            >
              Google Play
            </a>
          </div>
          */}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 md:px-12 border-t border-[#262626] bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#999]">
          <Image src="/dooit2.png" alt="" width={80} height={80} priority />

          <div className="flex gap-8">
            <Image src="/gosht.png" alt="" width={90} height={90} priority />
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
