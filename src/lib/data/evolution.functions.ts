import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type EvolutionEventType =
  | "MissionCompleted"
  | "SkillImproved"
  | "GoalCreated"
  | "GoalCompleted"
  | "MemoryCreated"
  | "AchievementUnlocked"
  | "LevelChanged"
  | "ProgressUpdated";

export interface EvolutionEventRecord {
  id: string;
  event_type: string;
  title: string;
  description: string | null;
  impact: number;
  created_at: string;
}

export const getEvolutionEvents = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<EvolutionEventRecord[]> => {
    const { data, error } = await context.supabase
      .from("evolution_events")
      .select("id, event_type, title, description, impact, created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error("Could not load evolution history");
    return data ?? [];
  });

export const recordEvolutionEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      event_type: EvolutionEventType;
      title: string;
      description?: string;
      impact?: number;
      metadata?: Record<string, unknown>;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("evolution_events").insert({
      user_id: context.userId,
      event_type: data.event_type,
      title: data.title,
      description: data.description ?? null,
      impact: data.impact ?? 0,
      metadata: (data.metadata ?? {}) as never,
    });
    if (error) throw new Error("Could not record evolution event");
    return { ok: true as const };
  });

export interface UnlockedAchievement {
  id: string;
  achievement_id: string;
  unlocked_at: string;
  name: string;
  description: string | null;
}

export const getUserAchievements = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<UnlockedAchievement[]> => {
    const { data, error } = await context.supabase
      .from("user_achievements")
      .select("id, achievement_id, unlocked_at, achievements(name, description)")
      .eq("user_id", context.userId)
      .order("unlocked_at", { ascending: false });
    if (error) throw new Error("Could not load achievements");
    type Row = {
      id: string;
      achievement_id: string;
      unlocked_at: string;
      achievements: { name: string; description: string | null } | null;
    };
    return ((data ?? []) as unknown as Row[]).map((row) => ({
      id: row.id,
      achievement_id: row.achievement_id,
      unlocked_at: row.unlocked_at,
      name: row.achievements?.name ?? "Achievement",
      description: row.achievements?.description ?? null,
    }));
  });
