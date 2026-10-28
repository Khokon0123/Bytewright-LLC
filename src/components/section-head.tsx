import type { ReactNode } from "react";
import { Reveal } from "./motion/reveal";

/**
 * A section opens with its headline. No number, no rule, no label above it.
 * An optional aside sits low and to the right, aligned to the headline's baseline.
 */
export function SectionHead({ lines, aside, id }: { lines: ReactNode[]; aside?: ReactNode; id?: string }) {
  return (
    <div className="grid-page items-end gap-y-8">
      <Reveal as="h2" id={id} lines={lines} className="col-span-4 text-h2 md:col-span-5 lg:col-span-7" />
      {aside && <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">{aside}</div>}
    </div>
  );
}
