"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* three.js + R3F only ever load on desktop, after the page has painted and gone idle. */
const ByteCanvas = dynamic(() => import("@/components/byte/byte-canvas"), { ssr: false });

type Mode = "still" | "live" | "video";

const themeSub = (cb: () => void) => {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => o.disconnect();
};
const isDark = () => document.documentElement.dataset.theme !== "light";

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Desktop: start the 3D on the visitor's first interaction (mouse move, scroll, touch, key).
 * Until then the still, which is the identical first frame, is on screen. The heavy work (three.js, shader
 * compilation) never competes with the headline, and the cursor tilt needs a pointer anyway.
 */
function onFirstInteraction(fn: () => void) {
  const events = ["pointermove", "pointerdown", "wheel", "scroll", "keydown", "touchstart"] as const;
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    off();
    afterIdle(fn);
  };
  const off = () => events.forEach((e) => window.removeEventListener(e, go));
  events.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));
  return () => {
    done = true;
    off();
  };
}

/** Run after the page has loaded and the main thread is free, so heavy work never competes with the headline. */
function afterIdle(fn: () => void) {
  let cancelled = false;
  const go = () => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(() => !cancelled && fn(), { timeout: 2500 });
    else setTimeout(() => !cancelled && fn(), 1200);
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", go);
  };
}

/**
 * "The Byte". The still (rendered from the same scene) shows instantly; then:
 *  - desktop with a mouse: the live 3D object, faded in over the still once its first frame is drawn
 *  - phones/tablets in dark mode: a 12 s seamless video loop of the same motion (no WebGL on the phone)
 *  - reduced motion, light-mode touch devices, or no WebGL: the still only
 * Rendering / playback stops while the hero is off screen.
 */
export function HeroVisual() {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>("still");
  const [ready, setReady] = useState(false); // live/video has drawn its first frame
  const [inView, setInView] = useState(true);
  const dark = useSyncExternalStore(themeSub, isDark, () => true);

  // choose the richest mode this device should get
  useEffect(() => {
    // QA override: ?byte=live|video|still forces a mode (used to audit each path)
    const forced = new URLSearchParams(window.location.search).get("byte");
    if (forced === "still") return;
    if (forced === "live" || forced === "video") return afterIdle(() => setMode(forced));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const desktop = window.matchMedia("(min-width: 64rem) and (hover: hover) and (pointer: fine)").matches;
    if (desktop && webglAvailable()) return onFirstInteraction(() => setMode("live"));
    return afterIdle(() => setMode("video"));
  }, []);

  // pause when the hero leaves the screen
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showVideo = mode === "video" && dark; // the video's background is baked dark
  useEffect(() => {
    const v = video.current;
    if (!v || !showVideo) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, showVideo]);

  return (
    <div ref={box} className="byte-visual relative aspect-square w-full" aria-hidden="true">
      {/* soft light behind the object so the right side isn't flat black */}
      <div className="byte-glow pointer-events-none absolute inset-[-12%]" />

      <Image
        src="/hero/byte.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 1600px) 760px, (min-width: 1280px) 48vw, (min-width: 768px) 60vw, 88vw"
        className={`object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />

      {mode === "live" && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <ByteCanvas paused={!inView} onFirstFrame={() => setReady(true)} />
        </div>
      )}

      {showVideo && (
        <video
          ref={video}
          className={`byte-video absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onPlaying={() => setReady(true)}
        >
          <source src="/hero/byte-loop.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
