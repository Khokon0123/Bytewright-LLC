import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { site } from "@/lib/site";

export function Closing() {
  return (
    <section className="page-x mx-auto max-w-page pt-section" aria-labelledby="closing-title">
      <div className="grid-page gap-y-12">
        <Reveal
          as="h2"
          id="closing-title"
          className="col-span-4 text-h1 md:col-span-6 lg:col-span-9"
          lines={[
            "Tell us what",
            <span key="l1">
              you’re <span className="em-serif">building.</span>
            </span>,
          ]}
        />
        <Reveal
          delay={250}
          className="col-span-4 flex flex-col items-start gap-6 self-end md:col-span-6 lg:col-span-3 lg:items-end lg:text-right"
        >
          <p className="text-muted">We reply within 24 hours.</p>
          <Button href="/contact">{site.cta}</Button>
          <a href={`mailto:${site.email}`} className="tap link text-fg">
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
