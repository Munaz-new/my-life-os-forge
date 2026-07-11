import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { quickActions } from "@/lib/core-mock";

export function CoreCommandButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div ref={ref} className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass-strong absolute bottom-20 right-0 w-80 overflow-hidden rounded-2xl border border-white/10 p-2"
          >
            <div className="border-b border-white/10 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                CORE Command
              </p>
              <p className="text-sm font-semibold">Quick Actions</p>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              {quickActions.map((a) => {
                const inner = (
                  <>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-primary-foreground"
                      style={{ background: "var(--gradient-hero)" }}
                    >
                      {a.icon}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{a.label}</p>
                      <p className="text-[11px] text-muted-foreground">{a.detail}</p>
                    </div>
                    {a.disabled && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </>
                );
                const cls =
                  "flex items-center gap-3 rounded-xl px-2 py-2 transition " +
                  (a.disabled ? "opacity-60" : "hover:bg-white/5");
                if (a.to && !a.disabled) {
                  return (
                    <Link key={a.label} to={a.to} className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  );
                }
                return (
                  <button
                    key={a.label}
                    disabled={a.disabled}
                    className={cls}
                    onClick={() => !a.disabled && setOpen(false)}
                  >
                    {inner}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-primary-foreground shadow-[var(--shadow-neon)]"
        style={{ background: "var(--gradient-hero)" }}
        aria-label="Open CORE command palette"
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          style={{ background: "var(--gradient-hero)" }}
        />
        <span className="relative">◉</span>
      </motion.button>
    </div>
  );
}
