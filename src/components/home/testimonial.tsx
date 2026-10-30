import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";

export function Testimonial() {
  return (
    <section className="page-x mx-auto max-w-page pt-section" aria-labelledby="clients-title">
      <div className="grid-page gap-y-16">
        <Reveal as="figure" className="col-span-4 md:col-span-6 lg:col-span-6 xl:col-span-7">
          <h2 id="clients-title" className="text-h3 text-muted">
            What clients say after launch
          </h2>
          {/* TODO: replace with a real, approved client quote. Never invent one. */}
          <blockquote className="mt-8 text-h2">
            <p>“[Client quote to be added]”</p>
          </blockquote>
          <figcaption className="label mt-6">[Client name], [role, organization]</figcaption>
        </Reveal>

        <Reveal
          delay={150}
          className="col-span-4 flex flex-col items-start justify-end md:col-span-4 md:col-start-3 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9"
        >
          <h2 className="text-h3">Prefer to talk first?</h2>
          <div className="mt-6">
            <Button href="/contact">Book a 30-minute intro call</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
