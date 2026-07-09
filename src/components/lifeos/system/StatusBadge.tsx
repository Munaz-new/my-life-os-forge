export function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur transition hover:border-white/20 hover:bg-white/10">
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full"
        style={{ background: "var(--gradient-hero)", boxShadow: "var(--glow-primary)" }}
      />
      {label}
    </span>
  );
}
