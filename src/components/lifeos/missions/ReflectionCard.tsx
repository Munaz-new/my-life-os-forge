import { reflectionPrompts } from "@/lib/missions-mock";

export function ReflectionCard() {
  return (
    <div className="glass rounded-2xl p-6 sm:p-7">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Post-Mission
          </p>
          <h3 className="mt-1 text-lg font-semibold">Reflection</h3>
        </div>
        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
          Locked · Complete mission
        </span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {reflectionPrompts.map((q) => (
          <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-foreground/90">{q}</p>
            <div
              aria-disabled
              className="mt-3 h-24 w-full rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-3 text-xs text-muted-foreground"
            >
              Your reflection will appear here…
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
