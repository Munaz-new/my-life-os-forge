import { cn } from "@/lib/utils";

export function StepDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i === active
              ? "w-8 [background:var(--gradient-hero)]"
              : "w-1.5 bg-white/20",
          )}
        />
      ))}
    </div>
  );
}
