"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setEnabled(!reducedMotion.matches);

    updatePreference();
    reducedMotion.addEventListener("change", updatePreference);

    return () => reducedMotion.removeEventListener("change", updatePreference);
  }, []);

  if (!enabled) return null;

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
      }}
    />
  );
}
