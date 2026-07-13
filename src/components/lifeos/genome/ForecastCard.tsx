import { motion } from "framer-motion";
import { forecast } from "@/lib/genome-mock";

const items = [
  { key: "mostLikelyNext", label: "Most Likely Next", glyph: "◉", tone: "var(--primary)" },
  { key: "fastestGrowing", label: "Fastest Growing", glyph: "▲", tone: "var(--cyan-accent)" },
  { key: "losingMomentum", label: "Losing Momentum", glyph: "▼", tone: "var(--destructive)" },
  { key: "recommendedFocus", label: "Recommended Focus", glyph: "❋", tone: "var(--violet-accent)" },
] as const;

export function ForecastCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => {
        const f = forecast[it.key];
        const positive = f.delta >= 0;
        return (
          <motion.div
            key={it.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold"
                style={{
                  color: it.tone,
                  border: `1px solid ${it.tone}`,
                  boxShadow: `0 0 12px ${it.tone}`,
                }}
              >
                {it.glyph}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: positive ? "var(--cyan-accent)" : "var(--destructive)" }}
              >
                {positive ? "+" : ""}
                {f.delta}%
              </span>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {it.label}
            </p>
            <p className="mt-1 text-lg font-semibold">{f.skill}</p>
            <p className="mt-1 text-xs text-muted-foreground">{f.reason}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
