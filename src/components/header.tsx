"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./wordmark";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./button";
import { nav, site } from "@/lib/site";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/* Motion only loads the first time the menu opens. */
const MobileMenu = dynamic(() => import("./mobile-menu").then((m) => m.MobileMenu), { ssr: false });

/** Everything outside the header becomes inert while the menu is open. */
function setPageInert(inert: boolean) {
  for (const id of ["main", "site-footer", "skip-link"]) {
    const el = document.getElementById(id);
    if (el) el.inert = inert;
  }
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // past the first few pixels the bar condenses into a floating pill
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on navigation (routes stay mounted under <Activity>, so do it explicitly)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // open: lock scroll, make the page inert, listen for Escape and for resizing up to desktop
  useEffect(() => {
    if (!open) return;
    lockScroll();
    setPageInert(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      unlockScroll();
      setPageInert(false);
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const pill = scrolled && !open;

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) menuButton.current?.focus();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[background-color] duration-500 ${open ? "bg-bg" : ""}`}
      >
        {/* Bar at the top of the page; a solid pill with a hairline once scrolled. Solid, never blurred. */}
        <div
          className={`mx-auto flex items-center justify-between gap-6 border transition-[max-width,height,margin,padding,border-radius,background-color,border-color] duration-500 ease-out-expo ${
            pill
              ? "mt-3 h-14 max-w-[min(70rem,calc(100%-1.5rem-env(safe-area-inset-left)-env(safe-area-inset-right)))] rounded-[1.75rem] border-line bg-bg-raised pr-2 pl-5 md:pr-2.5 md:pl-6 shadow-[0_12px_32px_-16px_rgb(0_0_0/0.5)]"
              : "page-x mt-0 h-16 max-w-page rounded-[0px] border-transparent md:h-20 short:h-16"
          }`}
        >
          <Link href="/" className="tap relative z-10 text-[1.3125rem] leading-none" aria-label="ByteWright, home">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9 touch:gap-5">
              {nav.map((item) => {
                const current = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`tap text-label transition-colors duration-200 hover:text-accent-ink ${current ? "text-fg" : "text-muted"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-5 touch:gap-3">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <div className="hidden md:block">
              <Button href="/contact" size="sm">
                {site.cta}
              </Button>
            </div>
            <button
              ref={menuButton}
              type="button"
              className={`tap label justify-center px-2 font-medium !text-fg lg:hidden ${pill ? "mr-1" : "-mr-2"}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {open && <MobileMenu onNavigate={() => close(false)} />}
    </>
  );
}
