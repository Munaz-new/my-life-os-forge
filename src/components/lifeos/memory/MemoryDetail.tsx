import { AnimatePresence, motion } from "framer-motion";
import { categoryByKey, memoryById, type Memory } from "@/lib/memory-mock";
import { toneColor } from "@/lib/genome-mock";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function MemoryDetail({
  memory,
  onClose,
  onOpen,
}: {
  memory: Memory | null;
  onClose: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <AnimatePresence>
      {memory && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            key="sheet"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-white/10 bg-background/95 p-6 shadow-[var(--shadow-neon)] backdrop-blur-xl"
          >
            <DetailBody memory={memory} onClose={onClose} onOpen={onOpen} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailBody({
  memory,
  onClose,
  onOpen,
}: {
  memory: Memory;
  onClose: () => void;
  onOpen: (id: string) => void;
}) {
  const cat = categoryByKey[memory.category];
  const color = toneColor(cat.tone);
  const related = memory.related.map((id) => memoryById[id]).filter(Boolean);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl text-sm"
          style={{ color, border: `1px solid ${color}`, boxShadow: `0 0 10px ${color}` }}
        >
          {cat.glyph}
        </span>
        <button
          onClick={onClose}
          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground hover:bg-white/10"
        >
          Close ✕
        </button>
      </div>

      <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {cat.label}
      </p>
      <h2 className="mt-1 text-2xl font-semibold">{memory.title}</h2>
      <p className="mt-3 text-sm text-foreground/85">{memory.summary}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Stat label="Confidence" value={`${memory.confidence}%`} color={color} />
        <Stat label="Importance" value={"★".repeat(memory.importance)} color={color} />
        <Stat label="Created" value={formatDate(memory.createdAt)} />
        <Stat label="Updated" value={formatDate(memory.updatedAt)} />
      </div>

      {memory.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {memory.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      <Section title="Related Memories">
        {related.length === 0 ? (
          <p className="text-xs text-muted-foreground">No connections yet.</p>
        ) : (
          <div className="space-y-2">
            {related.map((r) => {
              const rc = categoryByKey[r.category];
              const rcolor = toneColor(rc.tone);
              return (
                <button
                  key={r.id}
                  onClick={() => onOpen(r.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[11px]"
                    style={{ color: rcolor, border: `1px solid ${rcolor}` }}
                  >
                    {rc.glyph}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {rc.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </Section>

      <Section title="Mini Timeline">
        <ol className="relative border-l border-white/10 pl-4">
          <TimelineItem label="Captured" date={formatDate(memory.createdAt)} />
          <TimelineItem label="Last touched" date={formatDate(memory.updatedAt)} />
          <TimelineItem label="Next review" date="CORE will surface soon" active />
        </ol>
      </Section>

      <Section title="CORE Recommendations">
        <ul className="space-y-2 text-xs text-foreground/85">
          <li className="flex gap-2">
            <span style={{ color }}>▸</span>
            Link this memory to today's mission when relevant.
          </li>
          <li className="flex gap-2">
            <span style={{ color }}>▸</span>
            Revisit within 14 days to keep confidence above 80%.
          </li>
          <li className="flex gap-2">
            <span style={{ color }}>▸</span>
            Consider splitting into sub-memories if scope grows.
          </li>
        </ul>
      </Section>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold" style={color ? { color } : undefined}>
        {value}
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

function TimelineItem({
  label,
  date,
  active,
}: {
  label: string;
  date: string;
  active?: boolean;
}) {
  return (
    <li className="mb-3 last:mb-0">
      <span
        className="absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full"
        style={{
          background: active ? "var(--primary)" : "oklch(1 0 0 / 30%)",
          boxShadow: active ? "var(--glow-primary)" : undefined,
        }}
      />
      <p className="text-sm">{label}</p>
      <p className="text-[11px] text-muted-foreground">{date}</p>
    </li>
  );
}
