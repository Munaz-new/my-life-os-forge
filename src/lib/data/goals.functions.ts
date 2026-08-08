import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  category: string;
  priority: number;
  status: string;
  target_date: string | null;
  created_at: string;
}

const GOAL_COLUMNS = "id, title, description, category, priority, status, target_date, created_at";

export const getUserGoals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Goal[]> => {
    const { data, error } = await context.supabase
      .from("user_goals")
      .select(GOAL_COLUMNS)
      .eq("user_id", context.userId)
      .order("priority", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error("Could not load goals");
    return data ?? [];
  });

export const createGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      title: string;
      description?: string;
      category?: string;
      priority?: number;
      target_date?: string | null;
    }) => {
      if (!input.title?.trim()) throw new Error("A goal needs a title");
      return input;
    },
  )
  .handler(async ({ data, context }): Promise<Goal> => {
    const { data: row, error } = await context.supabase
      .from("user_goals")
      .insert({ ...data, title: data.title.trim(), user_id: context.userId })
      .select(GOAL_COLUMNS)
      .single();
    if (error) throw new Error("Could not create goal");
    return row;
  });

export const updateGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      id: string;
      title?: string;
      description?: string;
      category?: string;
      priority?: number;
      status?: string;
      target_date?: string | null;
    }) => input,
  )
  .handler(async ({ data, context }): Promise<Goal> => {
    const { id, ...patch } = data;
    const { data: row, error } = await context.supabase
      .from("user_goals")
      .update(patch)
      .eq("id", id)
      .eq("user_id", context.userId)
      .select(GOAL_COLUMNS)
      .single();
    if (error) throw new Error("Could not update goal");
    return row;
  });
