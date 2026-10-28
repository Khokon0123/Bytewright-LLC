/**
 * Projects and their case studies. All three received 5-star client reviews.
 * Screenshots: drop files into /public/work named <slug>.(webp|jpg|png) for the cover,
 * and <slug>-2, <slug>-3 for the case-study gallery. Picked up automatically at build.
 *
 * TODO: the case-study copy below is a first draft written from the project brief.
 * Confirm the details with each client before launch. No numbers are claimed.
 */
export type Project = {
  n: string;
  slug: string;
  title: string;
  kind: string;
  sector: string;
  services: string[];
  summary: string;
  /** Where to anchor the screenshot when a layout crops it (CSS object-position). Default: centre top. */
  focus?: string;
  challenge: string[];
  approach: { title: string; body: string }[];
  result: string[];
};

export const projects: Project[] = [
  {
    n: "01",
    slug: "new-york-buddhist-bihar",
    title: "New York Buddhist Bihar",
    kind: "Monastery website",
    sector: "Religious community",
    services: ["Website", "UI/UX design", "Content structure"],
    summary:
      "A calm home online for a monastery: teachings, schedules, and events, easy to find for a community that spans generations.",
    challenge: [
      "A monastery serves people of every age, from first-time visitors to members who have come for decades. The website had to feel as calm as the place itself, and still make practical things easy: when to visit, what’s on, how to take part.",
      "Information lived in many places, and the people updating it were volunteers, not web editors.",
    ],
    approach: [
      { title: "Quiet structure", body: "We organized everything around three questions visitors actually ask: when, what, and how to join. Everything else sits one level down." },
      { title: "Readable for everyone", body: "Generous type, high contrast, and plain language, so older members and newcomers read it equally well on any phone." },
      { title: "Easy to keep current", body: "Events and schedules are simple to update, so the site stays accurate without a developer." },
    ],
    result: [
      "A site that reflects the monastery’s character and answers the common questions on the first screen.",
      "The client rated the project 5 stars.",
    ],
  },
  {
    n: "02",
    slug: "bridging-generations",
    title: "Bridging Generations",
    kind: "Welfare organization website",
    sector: "Nonprofit",
    services: ["Website", "UI/UX design", "Donation flow"],
    focus: "20% 0%", // the hero copy sits left of centre
    summary:
      "A welfare organization’s site that turns its programs into clear ways to help: give, volunteer, or get in touch.",
    challenge: [
      "Bridging Generations does a lot of good work, and the old site tried to say all of it at once. Supporters struggled to see where their help would go and how to give it.",
    ],
    approach: [
      { title: "Programs first", body: "Each program gets its own clear page: who it helps, what it needs, and one obvious way to support it." },
      { title: "Three ways to help", body: "Give, volunteer, or get in touch. Every page ends with the same three choices, so nobody has to hunt." },
      { title: "Trust in the details", body: "Real photos, plain language, and transparent information about how support is used." },
    ],
    result: [
      "A site that lets the organization’s work speak for itself and gives supporters a clear next step on every page.",
      "The client rated the project 5 stars.",
    ],
  },
  {
    n: "03",
    slug: "ny-construction",
    title: "NY Construction",
    kind: "Construction company website",
    sector: "Construction",
    services: ["Website", "UI/UX design", "Quote request"],
    summary:
      "A construction company’s site built to win work: services, past projects, and a quote request that takes a minute.",
    challenge: [
      "In construction, the work is the proof, but the company’s past projects weren’t visible online. Prospective clients had to call just to find out what the company did.",
    ],
    approach: [
      { title: "Lead with the work", body: "Past projects up front, shown large, organized by type so clients can find something like theirs." },
      { title: "Clear services", body: "Each service is explained in plain terms: scope, process, and what to expect." },
      { title: "A one-minute quote request", body: "A short form that asks only what the team needs to call back with a useful answer." },
    ],
    result: [
      "A site that shows the company’s capability at a glance and turns visits into quote requests.",
      "The client rated the project 5 stars.",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
