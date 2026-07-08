import { cn } from "@/lib/utils";

export function SelectableChip({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
        selected
          ? "border-transparent text-primary-foreground shadow-[var(--shadow-neon)] [background:var(--gradient-hero)]"
          : "border-white/10 bg-white/5 text-foreground/85 hover:border-white/20 hover:bg-white/10",
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      {label}
    </button>
  );
}
