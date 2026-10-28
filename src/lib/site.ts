export const site = {
  name: "ByteWright",
  legalName: "ByteWright LLC",
  tagline: "Where creativity meets top-notch engineering.",
  positioning: "One team from idea to launch and beyond.",
  description:
    "ByteWright is a software studio. We design and build websites, apps, AI tools, and the infrastructure underneath, for people who care how things are made.",
  // TODO: replace with the real domain before launch
  url: "https://bytewright.com",
  // TODO: placeholder address, confirm before launch
  email: "hello@bytewright.com",
  /** Same words in the nav and the hero. Don't change one without the other. */
  cta: "Start a project",
  // TODO: update yearly or derive at build time
  year: 2026,
  // TODO: real profile URLs
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Instagram", href: "#" },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;
