import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { EmptyState, ErrorState, LoadingState } from "@/components/lifeos/DataStates";
import { missionsQuery, useCompleteMission } from "@/lib/data/queries";
import { createMission } from "@/lib/data/missions.functions";
import { useQueryClient } from "@tanstack/react-query";

/** Real, persisted missions for the signed-in operator. */
export function MissionLedger() {
  const missions = useQuery(missionsQuery);
  const complete = useCompleteMission();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const add = async () => {
    if (!title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await createMission({ data: { title: title.trim() } });
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    } catch {
      setError("CORE could not register that mission.");
    }
    setSaving(false);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Declare a new mission…"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary/60 focus:bg-white/10"
        />
        <button
          onClick={add}
          disabled={saving || !title.trim()}
          className="rounded-xl px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-neon)] transition hover:brightness-110 disabled:opacity-50"
          style={{ background: "var(--gradient-hero)" }}
        >
          {saving ? "Registering…" : "Register"}
        </button>
      </div>
      {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

      <div className="mt-5">
        {missions.isLoading ? (
          <LoadingState />
        ) : missions.isError ? (
          <ErrorState onRetry={() => missions.refetch()} />
        ) : (missions.data?.length ?? 0) === 0 ? (
          <EmptyState
            glyph="◆"
            title="No missions registered"
            message="Declare your first mission above — CORE will track completion and evolution impact."
          />
        ) : (
          <ul className="space-y-2">
            {missions.data!.map((m, i) => (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="min-w-0">
                  <p
                    className={
                      "truncate text-sm font-medium " +
                      (m.status === "completed" ? "text-muted-foreground line-through" : "")
                    }
                  >
                    {m.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {m.mission_type} · {m.difficulty} · {m.estimated_minutes} min
                  </p>
                </div>
                {m.status === "completed" ? (
                  <span className="shrink-0 text-xs text-muted-foreground">Complete</span>
                ) : (
                  <button
                    onClick={() => complete.mutate({ data: { missionId: m.id } })}
                    disabled={complete.isPending}
                    className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:bg-white/10 disabled:opacity-50"
                  >
                    Complete
                  </button>
                )}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
