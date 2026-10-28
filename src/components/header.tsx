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
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  // hide on scroll down, return on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > 160 && y > lastY.current);
      lastY.current = y;
    };
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

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) menuButton.current?.focus();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[transform,background-color,border-color] duration-500 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } border-b ${scrolled || open ? "bg-bg" : ""} ${scrolled && !open ? "border-line" : "border-transparent"}`}
      >
        <div className="page-x mx-auto flex h-16 max-w-page items-center justify-between gap-6 md:h-20 short:h-16">
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
              className="tap label -mr-2 justify-center px-2 font-medium !text-fg lg:hidden"
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
