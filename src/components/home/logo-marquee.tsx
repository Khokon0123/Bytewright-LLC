import { toolLogos } from "@/lib/logos";

/** The tools we build with. Official marks, one muted gray, on tiles one step above the page. */
export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4" aria-hidden={hidden || undefined}>
      {toolLogos.map((l) => (
        <li
          key={l.name}
          className="flex h-28 w-36 flex-col items-center justify-center gap-3 text-muted md:h-32 md:w-44 md:gap-4 xl:w-52"
        >
          <svg viewBox="0 0 24 24" className="size-10 shrink-0 md:size-12 xl:size-14" fill="currentColor" aria-hidden="true">
            <path d={l.path} />
          </svg>
          <span className="text-[0.9375rem] font-medium whitespace-nowrap md:text-base">{l.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="pt-20 md:pt-28" aria-labelledby="tools-title">
      <h2 id="tools-title" className="page-x mx-auto flex max-w-page items-center gap-3 text-fg">
        <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
        Built with the tools we trust
      </h2>
      <div className="logo-marquee marquee mt-6 overflow-hidden md:mt-8">
        <div className="marquee-track flex w-max" style={{ "--marquee-duration": "70s" } as React.CSSProperties}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
