"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const DONE = 99;

/**
 * Plays a mockup once, the first time it scrolls into view.
 * `times` are ms offsets for steps 1, 2, 3…; the returned step counts up through them.
 * Server render and reduced motion both get the finished state, so nothing is
 * ever hidden without JS and nothing moves for people who asked it not to.
 */
export function useSequence<T extends HTMLElement>(times: number[]) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(DONE);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setStep(0);
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        times.forEach((t, i) => timers.push(window.setTimeout(() => setStep(i + 1), t)));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  /** Props for a part that appears at step n. `off` names how it waits: rise (default), slide, grow. */
  const at = (n: number, off: "" | "slide" | "grow" = "") => ({
    "data-at": n,
    "data-off": step < n ? off : undefined,
  });

  return { ref, step, at };
}
