"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A small "View" label that follows the pointer over [data-cursor="view"].
 * Fine pointers only (CSS hides it elsewhere). The system cursor stays visible.
 */
export function ViewCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target.closest('[data-cursor="view"]') : null;
      setActive(Boolean(target));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="view-cursor pointer-events-none fixed top-0 left-0 z-50"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="label -mt-7 ml-4 block rounded-full bg-fg px-3.5 py-1.5 font-medium !text-bg"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        View
      </motion.span>
    </motion.div>
  );
}
