import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnalysisCard({
  title,
  eyebrow,
  right,
  className,
  children,
}: {
  title?: string;
  eyebrow?: string;
  right?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("glass rounded-2xl p-6", className)}>
      {(title || eyebrow || right) && (
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && <h3 className="mt-1 text-lg font-semibold">{title}</h3>}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
