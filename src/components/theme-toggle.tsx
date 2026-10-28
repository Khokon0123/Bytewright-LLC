"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

/* The <html data-theme> attribute is the single source of truth. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const getServerSnapshot = (): Theme => "dark";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("bw-theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`tap label inline-flex items-center gap-2 transition-colors duration-200 hover:text-fg ${className}`}
      aria-label={`${theme === "dark" ? "Dark" : "Light"} mode, switch to ${next}`}
    >
      <span
        aria-hidden="true"
        className="inline-block size-2 rounded-full border border-current"
        style={{ background: theme === "light" ? "currentColor" : "transparent" }}
      />
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
