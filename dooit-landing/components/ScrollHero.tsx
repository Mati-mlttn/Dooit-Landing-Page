"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type ScrollHeroProps = {
  phoneAlt: string;
  children: React.ReactNode;
};

/**
 * Scroll-driven hero.
 *
 * - The section is 240vh tall and contains a 100vh sticky stage.
 * - Over that extra height `--p` goes from 0 to 1 and drives every animation.
 * - Images (in /public):
 *     /hero-bg.png     full green background, without the phone
 *     /hero-phone.png  phone only, transparent PNG
 */
export default function ScrollHero({ phoneAlt, children }: ScrollHeroProps) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    // With "reduce motion" the hero stays in its initial state, unanimated.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const distance = track.offsetHeight - window.innerHeight;
      const raw =
        distance > 0 ? -track.getBoundingClientRect().top / distance : 0;
      const linear = Math.min(1, Math.max(0, raw));
      const eased = linear * linear * (3 - 2 * linear); // eases start and end

      stage.style.setProperty("--p", eased.toFixed(4));
      stage.dataset.past = String(linear > 0.35);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative h-[240vh] motion-reduce:h-screen">
      <div
        ref={stageRef}
        data-past="false"
        className="group sticky top-0 h-screen overflow-hidden bg-[#f4f4f6] [--p:0] [--card-y:max(74vh,680px)] [--phone-y:max(58vh,600px)] [--phone-h:70vh] [--phone-shrink:0.01] [--phone-end-y:13vh] md:[--phone-y:max(54vh,540px)] md:[--phone-h:96vh] md:[--phone-shrink:0.03] md:[--phone-end-y:0vh]"
      >
        {/* Text: fades out and moves up as scrolling starts */}
        <div
          className="absolute inset-x-0 top-0 z-0 flex justify-center px-5 pt-32 text-center group-data-[past=true]:pointer-events-none"
          style={{
            opacity: "calc(1 - var(--p) * 3)",
            transform: "translateY(calc(var(--p) * -10vh))",
          }}
        >
          {children}
        </div>

        {/* Green background: rises and expands to fill the screen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10"
          style={{
            transform: "translateY(calc((1 - var(--p)) * var(--card-y)))",
            clipPath:
              "inset(0 calc((1 - var(--p)) * 2.5vw) 0 calc((1 - var(--p)) * 2.5vw) round calc((1 - var(--p)) * 2rem))",
          }}
        >
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Phone: sits above the card and slides down into place */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[2vh] z-20 flex justify-center"
          style={{
            transform:
              "translateY(calc((1 - var(--p)) * var(--phone-y) + var(--p) * var(--phone-end-y))) scale(calc(1 - var(--p) * var(--phone-shrink)))",
          }}
        >
          <Image
            src="/hero-phone.png"
            alt={phoneAlt}
            width={600}
            height={1250}
            priority
            className="h-[var(--phone-h)] max-w-[86vw] w-auto object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.22)]"
          />
        </div>
      </div>
    </section>
  );
}
