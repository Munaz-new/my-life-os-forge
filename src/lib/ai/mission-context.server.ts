import type { SupabaseClient } from "@supabase/supabase-js";

type Db = SupabaseClient<any, any, any>;

const clip = (value: string | null | undefined, max = 160) =>
  (value ?? "").replace(/\s+/g, " ").trim().slice(0, max);

const day = (iso: string) => iso.slice(0, 10);

export interface MissionContextBundle {
  text: string;
  sufficient: boolean;
  suggestions: string[];
  availableMinutes: number;
  goals: Array<{ id: string; title: string }>;
  results: Array<{
    completion_status: string | null;
    difficulty_feedback: string | null;
    completion_time: number | null;
  }>;
  abandonedCount: number;
  activeCount: number;
  mainTodayCount: number;
  sideTodayCount: number;
}

/**
 * Focused retrieval for mission generation: goals, skills, mission history,
 * completion feedback, evolution events and time budget only.
 */
export async function buildMissionContext(
  supabase: Db,
  userId: string,
): Promise<MissionContextBundle> {
  const [profileRes, prefsRes, goalsRes, skillsRes, missionsRes, resultsRes, eventsRes] =
    await Promise.all([
      supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle(),
      supabase
        .from("user_preferences")
        .select("timezone, daily_available_minutes")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("user_goals")
        .select("id, title, category, priority, target_date")
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
        .select("id, title, status, difficulty, mission_type, created_at, completed_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(12),
      supabase
        .from("mission_results")
        .select("completion_status, difficulty_feedback, completion_time, reflection, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("evolution_events")
        .select("event_type, title, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const goals = (goalsRes.data ?? []) as any[];
  const skills = (skillsRes.data ?? []) as any[];
  const missions = (missionsRes.data ?? []) as any[];
  const results = (resultsRes.data ?? []) as any[];
  const events = (eventsRes.data ?? []) as any[];

  const availableMinutes = prefsRes.data?.daily_available_minutes ?? 60;
  const today = new Date().toISOString().slice(0, 10);
  const todays = missions.filter((m) => day(m.created_at) === today);

  const lines: string[] = [];
  lines.push(`Name: ${clip(profileRes.data?.display_name, 60) || "Unknown"}`);
  lines.push(
    `Time budget: about ${availableMinutes} minutes available today (timezone ${
      clip(prefsRes.data?.timezone, 40) || "unknown"
    })`,
  );

  lines.push(
    goals.length
      ? `Active goals (highest priority first):\n${goals
          .map(
            (g) =>
              `- ${clip(g.title, 90)} (category ${clip(g.category, 30)}, priority ${g.priority}${
                g.target_date ? `, target ${day(g.target_date)}` : ""
              })`,
          )
          .join("\n")}`
      : "Active goals: none recorded",
  );

  lines.push(
    skills.length
      ? `Skills:\n${skills
          .map(
            (s) =>
              `- ${clip(s.skills?.name, 50) || "Unknown"} (${clip(
                s.skills?.category,
                30,
              )}), level ${s.level}, progress ${s.progress}%, trend ${clip(s.trend, 20)}`,
          )
          .join("\n")}`
      : "Skills: none tracked yet",
  );

  lines.push(
    missions.length
      ? `Recent missions (do not repeat these):\n${missions
          .map(
            (m) =>
              `- ${clip(m.title, 90)} [${clip(m.mission_type, 20)}, ${clip(m.status, 20)}, ${clip(
                m.difficulty,
                20,
              )}${m.completed_at ? `, completed ${day(m.completed_at)}` : ""}]`,
          )
          .join("\n")}`
      : "Recent missions: none recorded",
  );

  lines.push(
    results.length
      ? `Mission completion feedback:\n${results
          .map(
            (r) =>
              `- ${day(r.created_at)} completion ${clip(r.completion_status, 20) || "yes"}, felt ${
                clip(r.difficulty_feedback, 20) || "unrated"
              }${r.completion_time ? `, took ${r.completion_time} min` : ""}${
                r.reflection ? `, note: ${clip(r.reflection, 120)}` : ""
              }`,
          )
          .join("\n")}`
      : "Mission completion feedback: none recorded",
  );

  lines.push(
    events.length
      ? `Recent evolution events:\n${events
          .map((e) => `- ${day(e.created_at)} ${clip(e.event_type, 30)}: ${clip(e.title, 80)}`)
          .join("\n")}`
      : "Recent evolution events: none recorded",
  );

  const suggestions: string[] = [];
  if (!goals.length) suggestions.push("Set at least one active goal so CORE has a direction.");
  if (!skills.length) suggestions.push("Track a few skills you are developing.");

  return {
    text: lines.join("\n\n"),
    sufficient: goals.length > 0,
    suggestions: suggestions.length
      ? suggestions
      : ["Add more detail to your profile so CORE has more signal."],
    availableMinutes,
    goals: goals.map((g) => ({ id: g.id as string, title: g.title as string })),
    results: results.map((r) => ({
      completion_status: r.completion_status ?? null,
      difficulty_feedback: r.difficulty_feedback ?? null,
      completion_time: r.completion_time ?? null,
    })),
    abandonedCount: missions.filter((m) => m.status === "abandoned").length,
    activeCount: missions.filter((m) => m.status === "accepted" || m.status === "paused").length,
    mainTodayCount: todays.filter(
      (m) => m.mission_type === "Main" && m.status !== "dismissed" && m.status !== "abandoned",
    ).length,
    sideTodayCount: todays.filter(
      (m) => m.mission_type !== "Main" && m.status !== "dismissed" && m.status !== "abandoned",
    ).length,
  };
}
