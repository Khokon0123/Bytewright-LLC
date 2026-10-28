import type Lenis from "lenis";

let lenis: Lenis | null = null;
export const registerLenis = (instance: Lenis | null) => {
  lenis = instance;
};

/** Freeze page scroll (menu open). Works with and without Lenis, including iOS Safari. */
export function lockScroll() {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
export function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  lenis?.start();
}
