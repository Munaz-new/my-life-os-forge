const CONTROLS = [
  { key: "accept", label: "Accept Mission", primary: true },
  { key: "regen", label: "Regenerate Mission" },
  { key: "save", label: "Save For Later" },
  { key: "skip", label: "Skip Today" },
  { key: "preview", label: "Preview Tomorrow", disabled: true },
];

export function MissionControls() {
  return (
    <div className="glass flex flex-wrap items-center gap-3 rounded-2xl p-5">
      {CONTROLS.map((c) => {
        if (c.primary) {
          return (
            <button
              key={c.key}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition hover:brightness-110"
              style={{ background: "var(--gradient-hero)" }}
            >
              ◆ {c.label}
            </button>
          );
        }
        return (
          <button
            key={c.key}
            disabled={c.disabled}
            className={
              "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground/80 transition " +
              (c.disabled ? "cursor-not-allowed opacity-60" : "hover:bg-white/10")
            }
          >
            {c.label}
            {c.disabled && (
              <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-muted-foreground">
                Soon
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
