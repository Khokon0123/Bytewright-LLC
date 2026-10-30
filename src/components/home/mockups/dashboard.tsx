"use client";

import { useSequence } from "./use-sequence";

// requests per minute over a day, illustrative
const pts = [32, 30, 34, 31, 38, 44, 52, 49, 58, 63, 60, 68, 72, 66, 74, 70, 78, 75];
const W = 300;
const H = 110;
const max = 90;
const x = (i: number) => (i / (pts.length - 1)) * W;
const y = (v: number) => H - (v / max) * H;
const line = pts.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
const area = `${line} L${W} ${H} L0 ${H} Z`;

/** A small status dashboard: a line chart draws itself, then the status settles to green. */
export function DashboardMock() {
  const { ref, step, at } = useSequence<HTMLDivElement>([200, 600, 2700]);
  const ok = step >= 3;
  return (
    <div ref={ref} className="mock w-full max-w-[32rem] rounded-2xl border border-line bg-mock p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-6" aria-hidden="true">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.8125rem] font-medium text-fg">api.northfield.com</p>
          <p className="text-[0.6875rem] text-faint">Production · 24h</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-bg-tile px-3 py-1.5 text-[0.6875rem]">
          <span className="relative flex size-2">
            {ok && <span className="mock-ping absolute inset-0 rounded-full bg-[#3fb37f]" />}
            <span className={`relative size-2 rounded-full transition-colors duration-500 ${ok ? "bg-[#3fb37f]" : "bg-faint"}`} />
          </span>
          <span className="text-fg">{ok ? "All systems normal" : "Checking…"}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {[
          ["Uptime", "99.98%"],
          ["Response", "112 ms"],
          ["Deploys", "14"],
        ].map(([k, v], i) => (
          <div key={k} {...at(1)} style={{ transitionDelay: `${i * 90}ms` }} className="rounded-xl bg-bg-tile px-3 py-2.5">
            <p className="text-[0.6875rem] text-faint">{k}</p>
            <p className="num mt-1 text-[0.9375rem] text-fg">{v}</p>
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H + 4}`} className="mt-5 w-full overflow-visible" role="presentation">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} className="stroke-mock-line" strokeWidth="1" />
        ))}
        <path d={area} fill="var(--accent)" opacity={step >= 3 ? 0.08 : 0} style={{ transition: "opacity 800ms" }} />
        <path
          d={line}
          pathLength={1}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mock-draw"
          data-off={step < 2 ? "" : undefined}
        />
      </svg>
    </div>
  );
}
