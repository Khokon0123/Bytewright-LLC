import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion/reveal";

/* Numbers stay here: the order is the point. */
const steps = [
  {
    n: "1",
    title: "Discover",
    body: "Goals, users, and a clear scope.",
  },
  {
    n: "2",
    title: "Design",
    body: "Real screens in the browser, early.",
  },
  {
    n: "3",
    title: "Build",
    body: "Shipped in small pieces you review.",
  },
  {
    n: "4",
    title: "Launch & support",
    body: "We stay on after launch.",
  },
];

export function Process() {
  return (
    <section className="page-x mx-auto max-w-page pt-section" aria-labelledby="process-title">
      <SectionHead
        id="process-title"
        lines={[
          <span key="l1">
            How a project <span className="em-serif">actually</span> runs.
          </span>,
        ]}
      />
      <ol className="grid-page mt-16 gap-y-14 md:mt-24">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 90} className="col-span-4 md:col-span-3 lg:col-span-3">
            <h3 className="flex items-baseline gap-3 text-h3">
              <span className="num text-faint" style={{ fontSize: "0.8em" }}>
                {s.n}
              </span>
              {s.title}
            </h3>
            <p className="mt-3 max-w-[30ch] text-muted">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
