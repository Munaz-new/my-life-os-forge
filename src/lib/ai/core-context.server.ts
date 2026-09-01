import type { SupabaseClient } from "@supabase/supabase-js";
import type { CoreMode } from "./core-modes";

type Db = SupabaseClient<any, any, any>;

export interface CoreContextBundle {
  text: string;
  sufficient: boolean;
  suggestions: string[];
  goalTitle?: string;
}

const clip = (value: string | null | undefined, max = 160) =>
  (value ?? "").replace(/\s+/g, " ").trim().slice(0, max);

const day = (iso: string) => iso.slice(0, 10);

/**
 * Contextual retrieval: pulls only the slices a mode needs, under the caller's
 * RLS session, trimmed and capped before anything reaches the model.
 */
export async function buildCoreContext(
  supabase: Db,
  userId: string,
  mode: CoreMode,
  goalId?: string,
): Promise<CoreContextBundle> {
  const [profileRes, prefsRes, goalsRes, skillsRes, missionsRes, eventsRes] = await Promise.all([
    supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle(),
    supabase
      .from("user_preferences")
      .select("timezone, daily_available_minutes")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("user_goals")
      .select("id, title, category, priority, status, target_date")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("priority", { ascending: true })
      .limit(6),
    supabase
      .from("user_skills")
      .select("level, progress, trend, skills(name, category)")
      .eq("user_id", userId)
      .order("progress", { ascending: false })
      .limit(8),
    supabase
      .from("missions")
      .select("title, status, difficulty, mission_type, created_at, completed_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("evolution_events")
      .select("event_type, title, impact, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const goals = goalsRes.data ?? [];
  const skills = (skillsRes.data ?? []) as Array<{
    level: number;
    progress: number;
    trend: string;
    skills: { name: string; category: string } | null;
  }>;
  const missions = missionsRes.data ?? [];
  const events = eventsRes.data ?? [];

  const selectedGoal = goalId ? goals.find((g: any) => g.id === goalId) : undefined;

  const lines: string[] = [];
  lines.push(`Name: ${clip(profileRes.data?.display_name, 60) || "Unknown"}`);
  if (prefsRes.data) {
    lines.push(
      `Preferences: timezone ${clip(prefsRes.data.timezone, 40) || "unknown"}, about ${
        prefsRes.data.daily_available_minutes ?? "unknown"
      } minutes available per day`,
    );
  }

  lines.push(
    goals.length
      ? `Active goals:\n${goals
          .map(
            (g: any) =>
              `- ${clip(g.title, 90)} (category ${clip(g.category, 30)}, priority ${g.priority}${
                g.target_date ? `, target ${day(g.target_date)}` : ""
              })`,
          )
          .join("\n")}`
      : "Active goals: none recorded",
  );

  if (mode === "GOAL_ANALYSIS" && selectedGoal) {
    lines.push(`Selected goal for analysis: ${clip((selectedGoal as any).title, 120)}`);
  }

  const relevantSkills =
    mode === "GOAL_ANALYSIS" && selectedGoal
      ? skills.filter(
          (s) =>
            s.skills?.category?.toLowerCase() ===
            String((selectedGoal as any).category ?? "").toLowerCase(),
        )
      : [];
  const skillList = relevantSkills.length ? relevantSkills : skills;

  lines.push(
    skillList.length
      ? `Skills:\n${skillList
          .map(
            (s) =>
              `- ${clip(s.skills?.name, 50) || "Unknown"} (${clip(s.skills?.category, 30)}), level ${
                s.level
              }, progress ${s.progress}%, trend ${clip(s.trend, 20)}`,
          )
          .join("\n")}`
      : "Skills: none tracked yet",
  );

  lines.push(
    missions.length
      ? `Recent missions:\n${missions
          .map(
            (m: any) =>
              `- ${clip(m.title, 90)} [${clip(m.status, 20)}${
                m.completed_at ? `, completed ${day(m.completed_at)}` : ""
              }, ${clip(m.difficulty, 20)}]`,
          )
          .join("\n")}`
      : "Recent missions: none recorded",
  );

  lines.push(
    events.length
      ? `Recent evolution events:\n${events
          .map(
            (e: any) => `- ${day(e.created_at)} ${clip(e.event_type, 30)}: ${clip(e.title, 80)}`,
          )
          .join("\n")}`
      : "Recent evolution events: none recorded",
  );

  const suggestions: string[] = [];
  if (!goals.length) suggestions.push("Set at least one active goal.");
  if (!skillList.length) suggestions.push("Track a few skills you are developing.");
  if (!missions.length) suggestions.push("Accept or complete a mission so CORE can see activity.");

  const signals = [goals.length, skillList.length, missions.length, events.length].filter(
    (n) => n > 0,
  ).length;

  return {
    text: lines.join("\n\n"),
    sufficient: mode === "GOAL_ANALYSIS" ? Boolean(selectedGoal) && signals >= 1 : signals >= 2,
    suggestions: suggestions.length
      ? suggestions
      : ["Keep using EVOLVE for a few days so CORE has more signal."],
    ...(selectedGoal ? { goalTitle: String((selectedGoal as any).title) } : {}),
  };
}
