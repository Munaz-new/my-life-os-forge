import { motion } from "framer-motion";
import { constraints, decisionGoal, options, toneVar } from "@/lib/decisions-mock";

export function DecisionGraph({ selectedId }: { selectedId: string }) {
  const w = 760;
  const h = 320;
  const cx = w / 2;
  const cy = h / 2;

  const cPos = constraints.map((c, i) => {
    const angle = -Math.PI / 2 + (i / constraints.length) * Math.PI * 2;
    return { ...c, x: cx + Math.cos(angle) * 250, y: cy + Math.sin(angle) * 110 };
  });

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-4 sm:p-6">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[320px] w-full">
        <defs>
          <radialGradient id="dg-core">
            <stop offset="0%" stopColor="oklch(0.72 0.17 200 / 70%)" />
            <stop offset="100%" stopColor="oklch(0.65 0.20 255 / 0%)" />
          </radialGradient>
        </defs>

        {cPos.map((c, i) => {
          const color = toneVar(c.tone);
          const d = `M ${c.x} ${c.y} Q ${(c.x + cx) / 2} ${(c.y + cy) / 2 - 26} ${cx} ${cy}`;
          return (
            <g key={c.id}>
              <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeOpacity={0.35}
                strokeWidth={1.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.12 }}
              />
              <motion.circle r={2.6} fill={color}>
                <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" path={d} />
              </motion.circle>
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r={92} fill="url(#dg-core)" />
        <motion.circle
          cx={cx}
          cy={cy}
          r={54}
          fill="oklch(0.16 0.03 265 / 90%)"
          stroke="oklch(0.65 0.20 255)"
          strokeWidth={1.4}
          animate={{ r: [54, 58, 54] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="fill-current text-[11px] uppercase"
          style={{ letterSpacing: "0.2em", fill: "oklch(0.75 0.02 265)" }}
        >
          Goal
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          style={{ fill: "oklch(0.95 0.01 265)", fontSize: 13, fontWeight: 600 }}
        >
          {decisionGoal.progress}% there
        </text>

        {cPos.map((c, i) => {
          const color = toneVar(c.tone);
          return (
            <motion.g
              key={c.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <circle
                cx={c.x}
                cy={c.y}
                r={30}
                fill="oklch(0.16 0.03 265 / 85%)"
                stroke={color}
                strokeWidth={1.2}
              />
              <text
                x={c.x}
                y={c.y + 4}
                textAnchor="middle"
                style={{ fill: color, fontSize: 12, fontWeight: 600 }}
              >
                {c.score}
              </text>
              <text
                x={c.x}
                y={c.y + 48}
                textAnchor="middle"
                style={{ fill: "oklch(0.72 0.02 265)", fontSize: 10 }}
              >
                {c.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {constraints.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {c.label}
            </p>
            <p className="mt-1 text-lg font-semibold" style={{ color: toneVar(c.tone) }}>
              {c.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Active path
        </span>
        {options.map((o) => (
          <span
            key={o.id}
            className="rounded-full border px-3 py-1 text-xs font-medium transition"
            style={{
              borderColor: o.id === selectedId ? toneVar(o.tone) : "oklch(1 0 0 / 10%)",
              color: o.id === selectedId ? toneVar(o.tone) : "oklch(0.7 0.02 265)",
              boxShadow: o.id === selectedId ? `0 0 14px ${toneVar(o.tone)}` : undefined,
            }}
          >
            {o.letter} · {o.title}
          </span>
        ))}
      </div>
    </div>
  );
}
