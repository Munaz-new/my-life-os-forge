import { motion, AnimatePresence } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import { majorNodes, coreNode, toneColor, type Tone } from "@/lib/genome-mock";

interface Props {
  selectedId: string | null; // null → core
  onSelect: (id: string) => void;
}

function findChild(id: string) {
  for (const m of majorNodes) {
    const c = m.children.find((c) => c.id === id);
    if (c) return { major: m, child: c };
  }
  return null;
}

export function SkillCard({ selectedId, onSelect }: Props) {
  const isCore = !selectedId;
  const major = !isCore ? majorNodes.find((m) => m.id === selectedId) : null;
  const found = !isCore && !major ? findChild(selectedId!) : null;

  const name = isCore ? coreNode.label : major ? major.label : found!.child.label;
  const level = isCore
    ? coreNode.level
    : major
      ? major.level
      : found!.child.level;
  const xp = isCore ? coreNode.totalXp : major ? major.xp : found!.child.xp;
  const growth = isCore
    ? coreNode.evolution
    : major
      ? major.progress
      : found!.child.growth;
  const tone: Tone = isCore ? "primary" : major ? major.tone : found!.major.tone;
  const strengths = isCore
    ? ["Consistency", "Cross-domain leverage"]
    : major
      ? major.children.slice(0, 3).map((c) => c.label)
      : found!.child.strengths;
  const weaknesses = isCore
    ? ["Recovery windows"]
    : major
      ? ["Balance across children"]
      : found!.child.weaknesses;
  const related = isCore
    ? majorNodes.slice(0, 4).map((m) => ({ id: m.id, label: m.label }))
    : major
      ? major.children.map((c) => ({ id: c.id, label: c.label }))
      : found!.child.related.map((rid) => {
          const r = findChild(rid);
          return r ? { id: rid, label: r.child.label } : { id: rid, label: rid };
        });
  const spark = isCore
    ? [10, 12, 11, 14, 13, 16, 17]
    : major
      ? major.children[0]?.weeklyTrend ?? [1, 2, 3, 4, 5, 6, 7]
      : found!.child.weeklyTrend;

  const color = toneColor(tone);
  const animLevel = useCountUp(level, 900);
  const animXp = useCountUp(xp, 1200);
  const animGrowth = useCountUp(Math.abs(growth), 900);

  // sparkline
  const w = 220;
  const h = 44;
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const range = Math.max(1, max - min);
  const pts = spark
    .map((v, i) => {
      const x = (i / (spark.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="glass rounded-2xl p-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId ?? "core"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {isCore ? "Core Node" : major ? "Domain" : "Skill"}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-gradient">{name}</h3>
            </div>
            <span
              className="rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-widest"
              style={{ borderColor: color, color }}
            >
              LV {Math.round(animLevel)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="XP" value={Math.round(animXp).toLocaleString()} />
            <Stat
              label={isCore ? "Evolution" : major ? "Progress" : "Growth"}
              value={`${growth < 0 ? "-" : ""}${Math.round(animGrowth)}%`}
            />
            <Stat label="Tone" value={tone.toUpperCase()} />
          </div>

          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Weekly Trend
            </p>
            <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-11 w-full">
              <defs>
                <linearGradient id="sc-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.65 0.20 255)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.24 300)" />
                </linearGradient>
              </defs>
              <motion.polyline
                fill="none"
                stroke="url(#sc-grad)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pts}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            </svg>
          </div>

          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Recent Progress
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(6, Math.abs(growth) * 4))}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: "var(--gradient-hero)" }}
              />
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Chips label="Strengths" items={strengths} tone="cyan" />
            <Chips label="Weaknesses" items={weaknesses} tone="violet" />
          </div>

          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Related
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSelect(r.id)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-foreground/85 transition hover:border-white/25 hover:bg-white/10"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Chips({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: Tone;
}) {
  const color = toneColor(tone);
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span
            key={s}
            className="rounded-full border px-2 py-0.5 text-[10px]"
            style={{ borderColor: `${color}`, color }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
