"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

/** Scroll amount (in px) that must pass before the nav splits. */
const SPLIT_THRESHOLD = 80;

type NavBarProps = {
  homeLabel: string;
  homeHref: string;
  actionLabel: string;
  actionHref: string;
  actionIcon?: ReactNode;
};

/**
 * Floating nav that splits on scroll.
 *
 * - Rest (scroll <= 80px): logo and "Join beta" form a single centered white
 *   capsule with straight inner corners (`rounded-r-none` / `rounded-l-none`).
 * - Scrolling: the spacer grows (`flex-grow` 0 -> 1), pushing the logo left and
 *   the button right; each one recovers its rounded pill shape.
 *
 * The action element has two layers: an outer white pill (same as the logo) and
 * an inner blue `#1579fb` button, so the outer layer stays "part of the nav" in
 * both states. The split uses `transition-[flex-grow]` and
 * `transition-[border-radius]`: interpolable values, so no width is measured.
 *
 * The shadow lives on the `<header>` via `drop-shadow` rather than on each
 * pill: while the pills touch, a `box-shadow` would paint over the neighbour's
 * background and leave a gray smear. `drop-shadow` uses the joint silhouette,
 * so it follows the capsule (and the split pills) without dirtying any fill.
 *
 * The logo sits in a pill with `overflow-hidden`; if the image outgrows the
 * pill, its transparent padding (31% of its height) is clipped away.
 */
export default function NavBar({
  homeLabel,
  homeHref,
  actionLabel,
  actionHref,
  actionIcon,
}: NavBarProps) {
  const [split, setSplit] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setSplit(window.scrollY > SPLIT_THRESHOLD);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-split={split ? "true" : "false"}
      className="fixed inset-x-0 top-8 z-50 drop-shadow-[0_12px_40px_rgba(20,20,20,0.10)]"
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center px-4 sm:px-6">
        <a
          href={homeHref}
          aria-label={homeLabel}
          className={`flex h-14 shrink-0 items-center overflow-hidden rounded-l-full bg-white px-6 transition-[border-radius] duration-500 ease-out motion-reduce:transition-none ${
            split ? "rounded-r-full" : "rounded-r-none"
          }`}
        >
          <Image
            src="/doit-logo.png"
            alt=""
            width={2054}
            height={1436}
            priority
            className="h-10 w-auto max-w-none"
          />
        </a>

        <span
          aria-hidden="true"
          className={`h-px transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none ${
            split ? "flex-[1_1_0%]" : "flex-[0_1_0%]"
          }`}
        />

        <a
          href={actionHref}
          className={`px-2.5 group/btn -ml-px inline-flex h-14 shrink-0 items-center rounded-r-full bg-white px-1.5 transition-[border-radius] duration-500 ease-out motion-reduce:transition-none ${
            split ? "rounded-l-full" : "rounded-l-none"
          }`}
        >
          <span className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1579fb] px-4 text-sm font-bold text-white">
            {actionIcon}
            {actionLabel}
          </span>
        </a>
      </div>
    </header>
  );
}
