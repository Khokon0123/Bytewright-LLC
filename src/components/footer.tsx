import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="site-footer" className="page-x mx-auto max-w-page overflow-hidden pt-24 md:pt-32">
      <div className="grid-page gap-y-14 pt-10 md:pt-16">
        <p className="col-span-4 text-h3 md:col-span-6 lg:col-span-5">
          Where creativity meets
          <br />
          top-notch engineering.
        </p>

        <nav aria-label="Footer" className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-6 xl:col-start-7">
          <p className="label mb-5">Studio</p>
          <ul className="space-y-1.5 touch:space-y-0">
            {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="tap text-label transition-colors duration-200 hover:text-accent-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-2 lg:col-span-2">
          <p className="label mb-5">Elsewhere</p>
          <ul className="space-y-1.5 touch:space-y-0">
            {site.socials.map((s) => (
              <li key={s.label}>
                {/* TODO: real profile URLs */}
                <a href={s.href} className="tap text-label transition-colors duration-200 hover:text-accent-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-4 md:col-span-2 lg:col-span-3 xl:col-span-2 xl:col-start-11 xl:justify-self-end">
          <p className="label mb-5">Say hello</p>
          <a href={`mailto:${site.email}`} className="tap link text-label">
            {site.email}
          </a>
        </div>
      </div>

      {/* the big wordmark: sized so "ByteWright" spans the page width */}
      <p
        aria-hidden="true"
        className="mt-20 pb-[0.2em] text-[length:clamp(3rem,19vw_-_0.4rem,19.5rem)] leading-[0.8] font-medium tracking-[-0.055em] whitespace-nowrap select-none md:mt-28 lg:text-[length:clamp(3rem,20.1vw_-_0.4rem,20rem)]"
      >
        Byte<span className="text-accent">Wright</span>
      </p>

      <div className="flex flex-col gap-3 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © <span className="num">{site.year}</span> {site.legalName}
        </p>
        <p className="label">{site.positioning}</p>
      </div>
    </footer>
  );
}
