import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { operator, quickStatus } from "@/lib/system-mock";

export function FloatingStatusPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.06 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-primary-foreground shadow-[var(--shadow-neon)]"
        style={{ background: "var(--gradient-hero)" }}
        aria-label="Open status panel"
      >
        ◎
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="glass-strong fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Status Panel</p>
                  <h3 className="mt-1 text-lg font-semibold">Live Signal</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-foreground/80 hover:bg-white/10"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <Row label="Current Level" value={`Lv ${operator.level}`} accent />
                <Row label="XP" value={`${operator.xpInLevel.toLocaleString()} / ${operator.xpToNext.toLocaleString()}`} />
                <Row label="Today's Focus" value={quickStatus.todaysFocus} />
                <Row label="Energy" value={`${quickStatus.energy}%`} />
                <Row label="Mood" value={quickStatus.mood} />
                <Row label="Recent Achievement" value={quickStatus.recentAchievement} />
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Quick Stats</p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  <Mini label="Streak" value="12d" />
                  <Mini label="Quests" value="3" />
                  <Mini label="Buffs" value="6" />
                </div>
              </div>

              <div className="mt-auto flex items-center gap-2 pt-6 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                {quickStatus.systemStatus}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={accent ? "text-sm font-semibold text-gradient" : "text-sm font-medium"}>{value}</span>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-lg font-semibold text-gradient">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
