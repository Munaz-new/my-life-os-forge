import { motion } from "framer-motion";
import { alternates, toneVar } from "@/lib/evolution-mock";

export function TimelineComparison() {
  return (
    <div className="space-y-4">
      {alternates.map((a, idx) => {
        const c = toneVar(a.tone);
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-sm font-semibold">{a.choice}</p>
              <span
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold"
                style={{ color: c }}
              >
                {a.deltaLabel}
              </span>
            </div>
            <div className="mt-4">
              <svg viewBox="0 0 600 90" className="h-[90px] w-full">
                <defs>
                  <linearGradient id={`act-${a.id}`} x1="0" x2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.20 255)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.17 200)" />
                  </linearGradient>
                  <linearGradient id={`alt-${a.id}`} x1="0" x2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.20 255)" />
                    <stop offset="100%" stopColor={c === "var(--destructive)" ? "oklch(0.68 0.20 25)" : "oklch(0.65 0.24 300)"} />
                  </linearGradient>
                </defs>
                <line x1={30} y1={45} x2={570} y2={45} stroke="oklch(1 0 0 / 6%)" strokeDasharray="3 5" />
                <motion.path
                  d="M 30 45 C 200 45, 300 30, 570 20"
                  fill="none"
                  stroke={`url(#act-${a.id})`}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  style={{ filter: "drop-shadow(0 0 6px oklch(0.65 0.20 255 / 70%))" }}
                />
                <motion.path
                  d={`M 30 45 C 200 45, 300 60, 570 ${c === "var(--destructive)" ? 72 : 8}`}
                  fill="none"
                  stroke={`url(#alt-${a.id})`}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="6 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
                  opacity={0.9}
                  style={{ filter: `drop-shadow(0 0 6px ${c})` }}
                />
                <circle cx={30} cy={45} r={4} fill="white" />
                <circle cx={570} cy={20} r={4} fill="oklch(0.72 0.17 200)" />
                <circle cx={570} cy={c === "var(--destructive)" ? 72 : 8} r={4} fill={c} />
                <text x={578} y={24} className="fill-white/70" style={{ fontSize: 10 }}>actual</text>
                <text x={578} y={c === "var(--destructive)" ? 76 : 12} className="fill-white/70" style={{ fontSize: 10 }}>alt</text>
              </svg>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs">
                <span className="text-muted-foreground">Actual: </span>
                <span className="text-foreground/90">{a.actual}</span>
              </div>
              <div
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs"
                style={{ boxShadow: `inset 0 0 10px ${c}` }}
              >
                <span className="text-muted-foreground">Alternate: </span>
                <span style={{ color: c }}>{a.alternate}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
