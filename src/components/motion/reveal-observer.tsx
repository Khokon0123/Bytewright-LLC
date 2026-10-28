"use client";

import { useEffect } from "react";

const SELECTOR = '[data-reveal="lines"], [data-reveal="fade"]';
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * One observer for every scroll reveal on the site, including pages that mount after client navigation.
 *
 * It plays reveals with the Web Animations API instead of toggling attributes or classes, so it never
 * touches markup React owns. That keeps hydration clean even when a reveal enters the viewport before
 * its part of the page has hydrated. CSS holds the start state; `fill: "both"` holds the end state.
 */
function play(el: HTMLElement) {
  const delay = parseFloat(el.style.getPropertyValue("--d")) || 0;
  if (el.dataset.reveal === "lines") {
    el.querySelectorAll<HTMLElement>(":scope > .reveal-line > span").forEach((line, i) => {
      line.animate([{ transform: "translate3d(0, 112%, 0)" }, { transform: "translate3d(0, 0, 0)" }], {
        duration: 1000,
        delay: delay + i * 90,
        easing: EASE,
        fill: "both",
      });
    });
  } else {
    el.animate(
      [
        { opacity: 0, transform: "translate3d(0, 1.5rem, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 1000, delay, easing: EASE, fill: "both" },
    );
  }
}

export function RevealObserver() {
  useEffect(() => {
    // reduced motion: CSS already shows everything in its final state
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          play(e.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    const scan = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    scan();

    // new route content arrives without a reload
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
