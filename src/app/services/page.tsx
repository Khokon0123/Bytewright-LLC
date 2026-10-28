import type { Metadata } from "next";
import { pillars, marqueeItems } from "@/lib/services";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/marquee";
import { Button } from "@/components/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, apps and products, AI and automation, infrastructure and support. One team from idea to launch and beyond, with UI/UX design in every project.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        lines={[
          "One team from idea",
          <span key="l1">
            to launch and <span className="em-serif">beyond.</span>
          </span>,
        ]}
        intro={
          <>
            <p>
              Design, engineering, AI, and the infrastructure underneath, under one roof. Fewer handoffs, fewer gaps, and one
              team that knows your product end to end.
            </p>
            {/* a plain sentence of links instead of a numbered index */}
            <p className="mt-6 text-body">
              Jump to{" "}
              {pillars.map((p, i) => (
                <span key={p.slug}>
                  <a href={`#${p.slug}`} className="tap link text-fg">
                    {p.title}
                  </a>
                  {i < pillars.length - 2 ? ", " : i === pillars.length - 2 ? " or " : "."}
                </span>
              ))}
            </p>
          </>
        }
      />

      <div className="mt-24 md:mt-32">
        <Marquee items={marqueeItems} />
      </div>

      <div className="page-x mx-auto max-w-page">
        {pillars.map((p) => (
          <section key={p.slug} id={p.slug} className="scroll-mt-24 pt-section" aria-labelledby={`${p.slug}-title`}>
            <div className="grid-page gap-y-10 md:gap-y-14">
              <Reveal as="h2" id={`${p.slug}-title`} lines={[p.title]} className="col-span-4 text-h1 md:col-span-6 lg:col-span-6" />
              <Reveal delay={100} className="col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-8 lg:self-end">
                <p className="text-lead">{p.line}</p>
              </Reveal>

              <Reveal className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-1">
                <h3 className="label font-medium text-fg">What’s included</h3>
                <ul className="mt-4 space-y-1">
                  {p.includes.map((item) => (
                    <li key={item} className="text-h3">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={100} className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-6">
                <h3 className="label font-medium text-fg">What you get</h3>
                <ul className="mt-4 space-y-2 text-muted">
                  {p.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={200} className="col-span-4 md:col-span-6 lg:col-span-3 lg:col-start-10">
                <h3 className="label font-medium text-fg">Design</h3>
                <p className="mt-4 text-muted">{p.design}</p>
              </Reveal>
            </div>
          </section>
        ))}

        {/* no prices, ever */}
        <section className="pt-section" aria-labelledby="engagement-title">
          <div className="grid-page gap-y-10">
            <Reveal
              as="h2"
              id="engagement-title"
              className="col-span-4 text-h2 md:col-span-6 lg:col-span-6"
              lines={[
                <span key="l1">
                  Priced for the <span className="em-serif">project,</span>
                </span>,
                "not from a menu.",
              ]}
            />
            <Reveal delay={100} className="col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-8 lg:self-end">
              <p className="text-lead text-muted">
                Every project is different, so we don’t publish prices. We start with a short call, understand what you need,
                and send a clear proposal with scope, timeline, and cost.
              </p>
              <div className="mt-8">
                <Button href="/contact">{site.cta}</Button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

    </>
  );
}
