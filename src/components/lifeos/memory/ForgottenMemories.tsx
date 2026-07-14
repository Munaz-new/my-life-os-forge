import { motion } from "framer-motion";
import { fadingMemories, categoryByKey } from "@/lib/memory-mock";
import { toneColor } from "@/lib/genome-mock";

export function ForgottenMemories({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Fading Signal
          </p>
          <p className="mt-1 text-sm text-foreground/80">
            CORE hasn't revisited these in a while — refresh, park, or let them fade.
          </p>
        </div>
        <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {fadingMemories.length} memories
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {fadingMemories.map((m, i) => {
          const cat = categoryByKey[m.category];
          const color = toneColor(cat.tone);
          const opacity = 1 - (m.fading ?? 0) * 0.6;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0 }}
              animate={{ opacity }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-md text-[11px]"
                  style={{ color, border: `1px solid ${color}` }}
                >
                  {cat.glyph}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {cat.label}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold">{m.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.summary}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">
                  Confidence {m.confidence}%
                </span>
                <button
                  onClick={() => onOpen(m.id)}
                  className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary transition hover:bg-primary/20"
                >
                  ↻ Refresh
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
