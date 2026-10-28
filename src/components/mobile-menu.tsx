"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./button";
import { nav, site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Disclosure-pattern menu: the header's Menu button (aria-expanded/aria-controls) opens it,
 * the rest of the page is made inert, so Tab cycles header → menu only.
 * Closes on link tap, Escape (handled in Header), route change, and resize to desktop.
 */
export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const first = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    first.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      id="mobile-menu"
      role="region"
      aria-label="Site menu"
      className="fixed inset-x-0 top-0 z-30 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-bg lg:hidden"
      style={{ paddingTop: "calc(4rem + env(safe-area-inset-top))" }}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.7, ease }}
    >
      <nav
        aria-label="Mobile"
        className="page-x flex flex-1 flex-col justify-between gap-12 pt-8"
        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
      >
        <ul>
          {[...nav, { label: "Contact", href: "/contact" }].map((item, i) => (
            <li key={item.href} className="overflow-hidden border-b border-line">
              <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.05 }}>
                <Link
                  ref={i === 0 ? first : undefined}
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="flex min-h-14 items-baseline py-3 text-h2 short:text-h3"
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
        <motion.div className="flex flex-col gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}>
          <Button href="/contact" className="self-start" onClick={onNavigate}>
            {site.cta}
          </Button>
          <div className="flex items-center justify-between gap-4">
            <a href={`mailto:${site.email}`} className="tap link text-muted hover:text-fg">
              {site.email}
            </a>
            <ThemeToggle />
          </div>
        </motion.div>
      </nav>
    </motion.div>
  );
}
