import Image from "next/image";
import type { Project } from "@/lib/work";
import { workImage } from "@/lib/work-images";

/**
 * A project screenshot, or a quiet placeholder until /public/work/<slug><suffix>.webp exists.
 * `sizes` must describe the rendered width at each breakpoint so phones never fetch desktop images.
 */
export function WorkMedia({
  project,
  ratio,
  sizes,
  suffix = "",
  label = "Screenshot",
  priority,
}: {
  project: Project;
  ratio: string;
  sizes: string;
  suffix?: string;
  label?: string;
  priority?: boolean;
}) {
  const src = workImage(project.slug, suffix);
  return (
    <div className={`work-media relative overflow-hidden bg-bg-raised ${ratio}`}>
      {src ? (
        <Image
          src={src}
          alt={`${project.title}: ${label.toLowerCase()}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
          style={project.focus ? { objectPosition: project.focus } : undefined}
        />
      ) : (
        <div className="work-media-inner absolute inset-0 flex flex-col justify-between p-5 md:p-8">
          <span className="label break-all">
            {label}: {project.slug}
            {suffix}
          </span>
          <span className="text-h2 leading-none text-faint" aria-hidden="true">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
