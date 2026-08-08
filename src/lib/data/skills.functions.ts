import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface UserSkill {
  id: string;
  skill_id: string;
  name: string;
  category: string;
  level: number;
  xp: number;
  progress: number;
  trend: string;
}

interface SkillRow {
  id: string;
  skill_id: string;
  level: number;
  xp: number;
  progress: number;
  trend: string;
  skills: { name: string; category: string } | null;
}

export const getUserSkills = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<UserSkill[]> => {
    const { data, error } = await context.supabase
      .from("user_skills")
      .select("id, skill_id, level, xp, progress, trend, skills(name, category)")
      .eq("user_id", context.userId)
      .order("progress", { ascending: false });
    if (error) throw new Error("Could not load skills");
    return ((data ?? []) as unknown as SkillRow[]).map((row) => ({
      id: row.id,
      skill_id: row.skill_id,
      name: row.skills?.name ?? "Unknown",
      category: row.skills?.category ?? "General",
      level: row.level,
      xp: row.xp,
      progress: row.progress,
      trend: row.trend,
    }));
  });

export const getSkillCatalog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("skills")
      .select("id, name, category, description")
      .order("name");
    if (error) throw new Error("Could not load skill catalog");
    return data ?? [];
  });

/** Creates the user's skill row if missing, then applies the given values. */
export const updateSkillProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      skillName: string;
      progress?: number;
      xp?: number;
      level?: number;
      trend?: string;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: skill, error: skillError } = await supabase
      .from("skills")
      .select("id")
      .eq("name", data.skillName)
      .maybeSingle();
    if (skillError) throw new Error("Could not resolve skill");
    if (!skill) return { ok: false as const };

    const { error } = await supabase.from("user_skills").upsert(
      {
        user_id: userId,
        skill_id: skill.id,
        ...(data.progress !== undefined ? { progress: data.progress } : {}),
        ...(data.xp !== undefined ? { xp: data.xp } : {}),
        ...(data.level !== undefined ? { level: data.level } : {}),
        ...(data.trend !== undefined ? { trend: data.trend } : {}),
      },
      { onConflict: "user_id,skill_id" },
    );
    if (error) throw new Error("Could not save skill progress");
    return { ok: true as const };
  });
