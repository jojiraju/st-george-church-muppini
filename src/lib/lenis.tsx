"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // On touch devices (mobile/tablet), native scroll is smoother and more
    // reliable. Lenis intercepts touchmove events causing scroll to feel
    // stuck or erratic. Let the browser handle it natively.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const newLenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(newLenis);

    let rafId: number;
    function raf(time: number) {
      newLenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      newLenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
