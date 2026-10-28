/**
 * The single source of truth for what ByteWright offers.
 * Used by: homepage pillars, service marquee, /services, contact form options.
 * UI/UX design is part of every pillar, never a separate line item.
 */
export type Pillar = {
  n: string;
  slug: string;
  title: string;
  line: string;
  includes: string[];
  design: string;
  deliverables: string[];
};

export const pillars: Pillar[] = [
  {
    n: "01",
    slug: "websites",
    title: "Websites",
    line: "Sites people remember, that your team can update without calling us.",
    includes: ["Marketing sites", "Portfolio sites", "E-commerce", "Redesigns"],
    design: "Interface design, content structure, and SEO are part of the build, not extras.",
    deliverables: ["Sitemap and content plan", "Interface design", "CMS your team can edit", "Analytics and SEO setup"],
  },
  {
    n: "02",
    slug: "apps-and-products",
    title: "Apps & Products",
    line: "Software your customers and your team actually want to open.",
    includes: ["Web apps", "iOS and Android apps", "Custom software", "Business dashboards"],
    design: "Product and UI/UX design from the first sketch to the last screen.",
    deliverables: ["Clickable prototype", "Design system", "Production app", "App Store and Play Store release"],
  },
  {
    n: "03",
    slug: "ai-and-automation",
    title: "AI & Automation",
    line: "Practical AI that saves real hours, inside the tools you already use.",
    includes: ["Chatbots", "Workflow automation", "AI features in existing tools", "AI-powered dashboards"],
    design: "Designed so people understand what the AI is doing and when to trust it.",
    deliverables: ["Use-case audit", "Working prototype", "Integrated AI feature", "Usage and cost monitoring"],
  },
  {
    n: "04",
    slug: "infrastructure-and-support",
    title: "Infrastructure & Support",
    line: "The part nobody sees, done properly, so everything keeps working.",
    includes: ["Cloud and DevOps", "APIs and integrations", "Ongoing maintenance", "IT consulting"],
    design: "Admin tools and documentation designed for the people who use them.",
    deliverables: ["Architecture review", "CI/CD and hosting", "Integrations and APIs", "Monthly care plan"],
  },
];

/** Lowercase an item for use mid-sentence, leaving acronyms and brand casing (AI, iOS, APIs, IT) intact. */
export function inSentence(item: string) {
  const first = item.split(" ")[0];
  return /[A-Z].*[A-Z]|^i[A-Z]/.test(first) ? item : item[0].toLowerCase() + item.slice(1);
}

/** "Marketing sites, portfolio sites, e-commerce and redesigns." */
export function listSentence(items: string[]) {
  const parts = items.map((it, i) => (i === 0 ? it : inSentence(it)));
  return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}.` : `${parts[0]}.`;
}

/** Slow-scrolling marquee: specific services, not categories. */
export const marqueeItems = [
  "Marketing sites",
  "E-commerce",
  "Web apps",
  "iOS & Android",
  "Business dashboards",
  "Chatbots",
  "Workflow automation",
  "AI features",
  "Cloud & DevOps",
  "APIs & integrations",
  "Maintenance",
  "UI/UX design",
];

/** Contact form "What do you need?" options. */
export const serviceInterestOptions = [
  ...pillars.map((p) => ({ value: p.slug, label: p.title })),
  { value: "not-sure", label: "Not sure yet" },
];
