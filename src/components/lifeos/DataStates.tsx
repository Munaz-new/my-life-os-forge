import type { ReactNode } from "react";

/** Elegant, in-language placeholder shown when CORE has no data yet. */
export function EmptyState({
  glyph = "◇",
  title,
  message,
  action,
}: {
  glyph?: string;
  title?: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass flex flex-col items-center rounded-2xl px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-muted-foreground">
        {glyph}
      </div>
      {title && <p className="mt-4 text-sm font-medium text-foreground">{title}</p>}
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Shimmering placeholder rows in the existing glass language. */
export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-14 animate-pulse rounded-2xl border border-white/5 bg-white/5"
        />
      ))}
    </div>
  );
}

/** Calm failure card — never surfaces raw database errors. */
export function ErrorState({
  message = "CORE lost connection to your data stream.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="glass flex flex-col items-center rounded-2xl px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10 text-lg text-destructive">
        ⚠
      </div>
      <p className="mt-4 max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium transition hover:bg-white/10"
        >
          Reconnect
        </button>
      )}
    </div>
  );
}
