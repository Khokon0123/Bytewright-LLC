"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis } from "@/lib/scroll-lock";

/**
 * Lenis smooth scroll for mouse and trackpad only.
 * Touch devices keep native momentum scrolling (iOS/Android), and reduced-motion users get native scroll too.
 */
export function SmoothScroll() {
  useEffect(() => {
    const skip =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (skip) return;

    const lenis = new Lenis({ lerp: 0.1, syncTouch: false, anchors: { offset: -80 } });
    registerLenis(lenis);
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
