import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Persists the first-time setup answers: primary goal, tracked skills, daily time budget. */
export const completeSetup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { goal: string; skills: string[]; dailyMinutes: number }) => {
      if (!input.goal?.trim()) throw new Error("A goal is required");
      return input;
    },
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { error: goalError } = await supabase.from("user_goals").insert({
      user_id: userId,
      title: data.goal.trim(),
      category: "primary",
      priority: 1,
      status: "active",
    });
    if (goalError) throw new Error("Could not save your goal");

    if (data.skills.length) {
      const { data: catalog, error: catalogError } = await supabase
        .from("skills")
        .select("id, name")
        .in("name", data.skills);
      if (catalogError) throw new Error("Could not resolve skills");

      const rows = (catalog ?? []).map((skill) => ({
        user_id: userId,
        skill_id: skill.id,
        level: 1,
        xp: 0,
        progress: 0,
        trend: "steady",
      }));
      if (rows.length) {
        const { error: skillError } = await supabase
          .from("user_skills")
          .upsert(rows, { onConflict: "user_id,skill_id" });
        if (skillError) throw new Error("Could not save your skills");
      }
    }

    const { error: prefError } = await supabase
      .from("user_preferences")
      .upsert(
        { user_id: userId, daily_available_minutes: data.dailyMinutes },
        { onConflict: "user_id" },
      );
    if (prefError) throw new Error("Could not save your preferences");

    await supabase.from("evolution_events").insert({
      user_id: userId,
      event_type: "GoalCreated",
      title: data.goal.trim(),
      description: "Life System calibrated",
      impact: 2,
    });

    return { ok: true as const };
  });
