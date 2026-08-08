import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface Mission {
  id: string;
  title: string;
  description: string | null;
  mission_type: string;
  difficulty: string;
  status: string;
  estimated_minutes: number;
  created_at: string;
  completed_at: string | null;
}

const MISSION_COLUMNS =
  "id, title, description, mission_type, difficulty, status, estimated_minutes, created_at, completed_at";

export const getUserMissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Mission[]> => {
    const { data, error } = await context.supabase
      .from("missions")
      .select(MISSION_COLUMNS)
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error("Could not load missions");
    return data ?? [];
  });

export const createMission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      title: string;
      description?: string;
      mission_type?: string;
      difficulty?: string;
      estimated_minutes?: number;
    }) => {
      if (!input.title?.trim()) throw new Error("A mission needs a title");
      return input;
    },
  )
  .handler(async ({ data, context }): Promise<Mission> => {
    const { data: row, error } = await context.supabase
      .from("missions")
      .insert({ ...data, title: data.title.trim(), user_id: context.userId })
      .select(MISSION_COLUMNS)
      .single();
    if (error) throw new Error("Could not create mission");
    return row;
  });

export const completeMission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { missionId: string; reflection?: string; completionTime?: number }) => input,
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: mission, error } = await supabase
      .from("missions")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", data.missionId)
      .eq("user_id", userId)
      .select("id, title")
      .single();
    if (error) throw new Error("Could not complete mission");

    const { error: resultError } = await supabase.from("mission_results").insert({
      mission_id: mission.id,
      user_id: userId,
      completed: true,
      completion_time: data.completionTime ?? null,
      reflection: data.reflection ?? null,
    });
    if (resultError) throw new Error("Could not save mission result");

    await supabase.from("evolution_events").insert({
      user_id: userId,
      event_type: "MissionCompleted",
      title: mission.title,
      description: "Mission completed",
      impact: 1,
    });

    return { ok: true as const };
  });

export interface MissionResult {
  id: string;
  mission_id: string;
  completed: boolean;
  completion_time: number | null;
  reflection: string | null;
  created_at: string;
}

export const getMissionResults = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MissionResult[]> => {
    const { data, error } = await context.supabase
      .from("mission_results")
      .select("id, mission_id, completed, completion_time, reflection, created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error("Could not load mission history");
    return data ?? [];
  });
