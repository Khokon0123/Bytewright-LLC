import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "./contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with ByteWright. Tell us what you’re building. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

const next = [
  { t: "We read every message", d: "A real person on the team replies within 24 hours." },
  { t: "A 30-minute intro call", d: "We talk through goals, scope, and timing. No prep needed." },
  { t: "A clear proposal", d: "Scope, timeline, and cost in writing, so you can decide calmly." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        lines={[
          <span key="l1">
            Let’s <span className="em-serif">talk.</span>
          </span>,
        ]}
        intro={<p>Tell us a little about what you’re building. We reply within 24 hours.</p>}
      />

      <section className="page-x mx-auto mt-16 max-w-page md:mt-24" aria-label="Enquiry form">
        <div className="grid-page gap-y-20">
          <Reveal className="col-span-4 md:col-span-6 lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={150} className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
            <aside className="space-y-12 md:grid md:grid-cols-2 md:gap-x-[var(--spacing-grid)] md:space-y-0 lg:block lg:space-y-12">
              <div>
                <h2 className="label font-medium text-fg">Prefer email?</h2>
                <a href={`mailto:${site.email}`} className="tap link mt-3 text-h3">
                  {site.email}
                </a>
                <p className="mt-6">
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent("Intro call")}`}
                    className="tap link text-fg"
                  >
                    Book a 30-minute intro call
                  </a>
                </p>
              </div>
              <div>
                <h2 className="label font-medium text-fg">What happens next</h2>
                <ol className="mt-4 space-y-5">
                  {next.map((s, i) => (
                    <li key={s.t} className="grid grid-cols-[1.5rem_1fr] gap-x-2">
                      <span className="num pt-[0.2em] text-faint">{i + 1}</span>
                      <div>
                        <p className="font-medium">{s.t}</p>
                        <p className="mt-1 text-small text-muted">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
