import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const getUserProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Profile | null> => {
    const { data, error } = await context.supabase
      .from("profiles")
      .select("id, display_name, avatar_url, created_at, updated_at")
      .eq("id", context.userId)
      .maybeSingle();
    if (error) throw new Error("Could not load profile");
    return data;
  });

export const updateUserProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { display_name?: string; avatar_url?: string }) => input)
  .handler(async ({ data, context }): Promise<Profile> => {
    const { data: row, error } = await context.supabase
      .from("profiles")
      .upsert({ id: context.userId, ...data }, { onConflict: "id" })
      .select("id, display_name, avatar_url, created_at, updated_at")
      .single();
    if (error) throw new Error("Could not save profile");
    return row;
  });

export interface Preferences {
  id: string;
  timezone: string;
  preferred_language: string;
  daily_available_minutes: number;
}

export const getUserPreferences = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Preferences | null> => {
    const { data, error } = await context.supabase
      .from("user_preferences")
      .select("id, timezone, preferred_language, daily_available_minutes")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error("Could not load preferences");
    return data;
  });

export const updateUserPreferences = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      timezone?: string;
      preferred_language?: string;
      daily_available_minutes?: number;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("user_preferences")
      .upsert({ user_id: context.userId, ...data }, { onConflict: "user_id" });
    if (error) throw new Error("Could not save preferences");
    return { ok: true };
  });
