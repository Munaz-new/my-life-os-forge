import { motion } from "framer-motion";
import { tomorrow } from "@/lib/evolution-mock";

export function TomorrowPreview() {
  const size = 140;
  const r = 56;
  const c = 2 * Math.PI * r;
  const len = (tomorrow.energy / 100) * c;
  return (
    <div className="glass rounded-2xl p-6">
      <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div className="relative mx-auto" style={{ width: size, height: size }}>
          <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
            <defs>
              <linearGradient id="tm-e" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.17 200)" />
                <stop offset="100%" stopColor="oklch(0.65 0.24 300)" />
              </linearGradient>
            </defs>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth={8} />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="url(#tm-e)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={`${len} ${c}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.4 }}
              style={{ filter: "drop-shadow(0 0 8px oklch(0.72 0.17 200))" }}
            />
            <text x="50%" y="46%" textAnchor="middle" className="fill-white/60" style={{ fontSize: 9, letterSpacing: "0.3em" }}>ENERGY</text>
            <text x="50%" y="60%" textAnchor="middle" className="fill-white" style={{ fontSize: 26, fontWeight: 700 }}>{tomorrow.energy}%</text>
          </svg>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Recommended focus</p>
          <p className="mt-1 text-base font-semibold">{tomorrow.focus}</p>

          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Likely challenges</p>
          <ul className="mt-2 space-y-1.5">
            {tomorrow.challenges.map((c, i) => (
              <li key={i} className="flex gap-2 text-xs text-foreground/80">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--destructive)", boxShadow: "0 0 6px var(--destructive)" }} />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Suggested mission</p>
            <p className="mt-1 text-sm text-foreground/90">{tomorrow.mission}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
