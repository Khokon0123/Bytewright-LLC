import fs from "node:fs";
import path from "node:path";

const exts = ["webp", "jpg", "jpeg", "png", "avif"];

/** Resolved at build. Returns the public URL of /public/<folder>/<name>.<ext>, if one exists. */
function find(folder: string, name: string): string | null {
  for (const ext of exts) {
    const file = `${name}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", folder, file))) return `/${folder}/${file}`;
  }
  return null;
}

/** A project's screenshot: /public/work/<slug><suffix>.webp */
export const workImage = (slug: string, suffix = "") => find("work", `${slug}${suffix}`);

/** A team member's photo: /public/team/<slug>.webp */
export const teamImage = (slug: string) => find("team", slug);
