/**
 * Insights index. Post bodies live in src/content/insights/<slug>.mdx.
 * TODO: these three are placeholder drafts. Replace with real posts, then set real dates.
 */
export type Post = {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  status: string; // shown instead of a date until published
  readingTime: number; // minutes
};

export const posts: Post[] = [
  {
    slug: "scoping-a-project-in-one-call",
    title: "How we scope a project in one call",
    topic: "Process",
    excerpt: "Five questions that turn a vague idea into a plan you can price, and why we ask them before we design anything.",
    status: "Draft",
    readingTime: 3,
  },
  {
    slug: "when-a-chatbot-is-the-wrong-answer",
    title: "When a chatbot is the wrong answer",
    topic: "AI",
    excerpt: "Most AI requests are really search, forms, or automation problems. How we tell the difference.",
    status: "Draft",
    readingTime: 3,
  },
  {
    slug: "redesign-or-rebuild",
    title: "Redesign or rebuild? A short way to decide",
    topic: "Websites",
    excerpt: "A practical checklist for deciding whether your site needs a new coat or a new foundation.",
    status: "Draft",
    readingTime: 3,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
