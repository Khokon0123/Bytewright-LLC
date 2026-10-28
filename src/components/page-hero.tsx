import type { ReactNode } from "react";
import { Reveal } from "./motion/reveal";

/** Opening block for every inner page: the H1 (one serif word) and an offset intro. The nav already says where you are. */
export function PageHero({ lines, intro, children }: { lines: ReactNode[]; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section
      className="page-x mx-auto max-w-page pt-[calc(9rem+env(safe-area-inset-top))] md:pt-[calc(13rem+env(safe-area-inset-top))] short:pt-[calc(6rem+env(safe-area-inset-top))]"
      aria-labelledby="page-title"
    >
      <div className="grid-page gap-y-8 md:gap-y-12">
        <Reveal as="h1" id="page-title" immediate lines={lines} className="col-span-4 text-h1 md:col-span-6 lg:col-span-10" />
        {intro && (
          <Reveal immediate opaque delay={200} className="col-span-4 md:col-span-4 md:col-start-3 lg:col-span-5 lg:col-start-7">
            <div className="text-lead text-muted">{intro}</div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
