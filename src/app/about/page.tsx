import type { Metadata } from "next";
import Image from "next/image";
import { teamImage } from "@/lib/work-images";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Closing } from "@/components/home/closing";

export const metadata: Metadata = {
  title: "About",
  description:
    "ByteWright is a small software studio led by Mostafa Anwari (CEO) and Wasif Karim (CTO). We design and build carefully, and we stay for what comes after launch.",
  alternates: { canonical: "/about" },
};

// Photos: /public/team/<slug>.webp (picked up at build). TODO: Mostafa’s photo, confirm all three bios.
const team = [
  { slug: "mostafa-anwari", name: "Mostafa Anwari", role: "CEO", bio: "Leads the studio and its client relationships. [Short bio to be added]" },
  { slug: "wasif-karim", name: "Wasif Karim", role: "CTO", bio: "Leads engineering and the technical direction of every project. [Short bio to be added]" },
  { slug: "khokon-barua", name: "Khokon Barua", role: "Software Development Intern", bio: "Builds and ships features across our projects. [Short bio to be added]" },
];

const values = [
  { title: "Say it plainly", body: "No jargon, no buzzwords. If we can’t explain a decision simply, we haven’t understood it yet." },
  { title: "Small on purpose", body: "You work with the people who build your product, not a layer of account managers in between." },
  { title: "Craft is in the details", body: "Spacing, loading speed, an error message that actually helps. The small things are what people feel." },
  { title: "Stay after launch", body: "Launch is the start. We fix, measure, and improve, because software lives on after the handoff." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        lines={[
          "A small team on every project,",
          <span key="l1">
            start to <span className="em-serif">finish.</span>
          </span>,
        ]}
        intro={
          <p>
            ByteWright designs and builds websites, apps, AI tools, and the systems behind them, for startups, small
            businesses, nonprofits, and established companies alike.
          </p>
        }
      />

      {/* story */}
      <section className="page-x mx-auto max-w-page pt-section" aria-labelledby="story-title">
        <div className="grid-page gap-y-10">
          <Reveal
            as="h2"
            id="story-title"
            className="col-span-4 text-h2 md:col-span-6 lg:col-span-6"
            lines={["Good ideas kept losing", "to rushed builds."]}
          />
          {/* TODO: confirm the studio story with Mostafa and Wasif */}
          <Reveal delay={100} className="col-span-4 space-y-5 text-lead text-muted md:col-span-5 md:col-start-2 lg:col-span-5 lg:col-start-8 lg:pt-3">
            <p>
              We started ByteWright because we kept seeing the same gap. Studios that design well often hand off the build.
              Teams that build well often skip the design. Either way, the client ends up with half of what they paid for.
            </p>
            <p>
              So we do both, with the same small team, from the first call to long after launch. So far that has meant a
              monastery, a welfare organization, and a construction company. Different worlds, the same standard.
            </p>
          </Reveal>
        </div>
      </section>

      {/* team */}
      <section className="page-x mx-auto max-w-page pt-section" aria-labelledby="team-title">
        <div className="grid-page gap-y-12">
          <Reveal
            as="h2"
            id="team-title"
            className="col-span-4 text-h2 md:col-span-6 lg:col-span-7"
            lines={[
              <span key="l1">
                You work with <span className="em-serif">us,</span>
              </span>,
              "not an account manager.",
            ]}
          />
          <ul className="col-span-4 grid gap-x-[var(--spacing-grid)] gap-y-14 md:col-span-6 md:grid-cols-3 lg:col-span-12">
            {team.map((f, i) => (
              <Reveal as="li" key={f.slug} delay={i * 120} className={i === 1 ? "md:mt-20 lg:mt-28" : ""}>
                <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-bg-raised p-5">
                  {teamImage(f.slug) ? (
                    <Image
                      src={teamImage(f.slug)!}
                      alt={`Portrait of ${f.name}`}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 31vw, 92vw"
                      className="object-cover"
                      style={{ objectPosition: "50% 40%" }}
                    />
                  ) : (
                    <span className="label">Photo of {f.name}</span>
                  )}
                </div>
                <h3 className="mt-6 text-h3">{f.name}</h3>
                <p className="label mt-1">{f.role}</p>
                <p className="mt-4 max-w-[40ch] text-muted">{f.bio}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* values */}
      <section className="page-x mx-auto max-w-page pt-section" aria-labelledby="values-title">
        <div className="grid-page gap-y-14">
          <Reveal as="h2" id="values-title" className="col-span-4 text-h2 md:col-span-6 lg:col-span-7" lines={["The rules we work by."]} />
          <ul className="col-span-4 grid gap-x-[var(--spacing-grid)] gap-y-12 md:col-span-6 md:grid-cols-2 lg:col-span-9 lg:col-start-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 2) * 100}>
                <h3 className="text-h3">{v.title}</h3>
                <p className="mt-3 max-w-[40ch] text-muted">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Closing />
    </>
  );
}
