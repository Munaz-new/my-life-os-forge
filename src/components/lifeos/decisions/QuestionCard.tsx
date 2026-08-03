import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { exampleQuestions } from "@/lib/decisions-mock";

export function QuestionCard() {
  const [value, setValue] = useState("");
  const [idx, setIdx] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % exampleQuestions.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass rounded-2xl p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Ask CORE</p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setSent(false);
            }}
            placeholder={exampleQuestions[idx]}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-white/25"
          />
          <motion.span
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gradient"
          >
            ◉
          </motion.span>
        </div>
        <button
          type="button"
          onClick={() => setSent(true)}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-widest transition hover:bg-white/10"
        >
          Reason
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {exampleQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => {
              setValue(q);
              setSent(false);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-foreground/80 transition hover:bg-white/10"
          >
            {q}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-muted-foreground"
          >
            CORE conversational reasoning is offline in this build. The decision pipeline above
            reflects its current chain of thought.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
