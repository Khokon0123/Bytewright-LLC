import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { site } from "@/lib/site";
import { HeroVisual } from "./hero-visual";

/*
 * Desktop (≥1280): headline, sentence and actions on the left; "The Byte" on the right.
 * Tablet and phone: the same text, then the object below it at a smaller size.
 * Sized so the next section peeks above the fold on a 1440×900 laptop.
 */
export function Hero() {
  return (
    <section
      className="page-x mx-auto max-w-page overflow-x-clip pt-[calc(7rem+env(safe-area-inset-top))] pb-4 md:pt-[calc(9rem+env(safe-area-inset-top))] xl:pt-[calc(5rem+env(safe-area-inset-top))] xl:pb-0 short:pt-[calc(5.5rem+env(safe-area-inset-top))]"
      aria-labelledby="hero-title"
    >
      <div className="grid-page items-center gap-y-4 md:gap-y-8">
        <div className="col-span-4 md:col-span-6 xl:col-span-6">
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
          <Reveal immediate opaque delay={250} className="mt-8 md:mt-10 short:mt-5">
            <p className="max-w-[32ch] text-lead text-soft">
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

        <div className="col-span-4 mx-auto w-full max-w-[24rem] md:col-span-4 md:col-start-2 md:max-w-none xl:col-span-6 xl:col-start-7 xl:-my-10">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
