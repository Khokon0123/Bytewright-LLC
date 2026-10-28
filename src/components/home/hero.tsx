import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { site } from "@/lib/site";

/* The headline, one sentence, two actions. Nothing above it, nothing under it. */
export function Hero() {
  return (
    <section
      className="page-x mx-auto flex min-h-svh max-w-page flex-col justify-end pt-[calc(7rem+env(safe-area-inset-top))] pb-16 md:min-h-[min(100svh,58rem)] md:pt-[calc(9rem+env(safe-area-inset-top))] md:pb-24 short:pt-[calc(5.5rem+env(safe-area-inset-top))] short:pb-10"
      aria-labelledby="hero-title"
    >
      <Reveal
        as="h1"
        id="hero-title"
        immediate
        className="text-display"
        lines={[
          "Software,",
          <span key="c" className="em-serif">
            crafted.
          </span>,
        ]}
      />

      <div className="grid-page mt-10 gap-y-8 md:mt-14 short:mt-6">
        <Reveal immediate opaque delay={250} className="col-span-4 md:col-span-4 md:col-start-3 lg:col-span-4 lg:col-start-7">
          <p className="max-w-[34ch] text-lead text-muted">
            We design and build websites, apps, and AI tools for people who care how things are made.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href="/contact">{site.cta}</Button>
            <Button href="#work" variant="quiet">
              See the work
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
