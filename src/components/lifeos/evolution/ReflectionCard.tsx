import { motion } from "framer-motion";
import { reflection } from "@/lib/evolution-mock";

const cols = [
  { key: "improved", title: "What improved?", items: reflection.improved, tone: "var(--cyan-accent)", glyph: "▲" },
  { key: "slowed", title: "What slowed progress?", items: reflection.slowed, tone: "var(--destructive)", glyph: "▼" },
  { key: "changeTomorrow", title: "What should change tomorrow?", items: reflection.changeTomorrow, tone: "var(--violet-accent)", glyph: "◈" },
];

export function ReflectionCard() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {cols.map((col, i) => (
        <motion.div
          key={col.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass rounded-2xl p-5"
          style={{ boxShadow: `0 0 18px ${col.tone}` }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm"
              style={{ color: col.tone, border: `1px solid ${col.tone}`, boxShadow: `0 0 12px ${col.tone}` }}
            >
              {col.glyph}
            </span>
            <p className="text-sm font-semibold">{col.title}</p>
          </div>
          <ul className="mt-4 space-y-3">
            {col.items.map((it, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + j * 0.08 }}
                className="flex gap-3 text-sm text-foreground/85"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: col.tone, boxShadow: `0 0 6px ${col.tone}` }} />
                <span>{it}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
