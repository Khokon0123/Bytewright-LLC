import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/work";
import { posts } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/work", "/services", "/about", "/insights", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${base}/insights/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
