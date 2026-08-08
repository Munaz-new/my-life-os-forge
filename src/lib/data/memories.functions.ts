import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface Memory {
  id: string;
  title: string;
  content: string | null;
  category: string;
  importance: number;
  confidence: number;
  created_at: string;
}

const MEMORY_COLUMNS = "id, title, content, category, importance, confidence, created_at";

export const getUserMemories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Memory[]> => {
    const { data, error } = await context.supabase
      .from("memories")
      .select(MEMORY_COLUMNS)
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error("Could not load memories");
    return data ?? [];
  });

export const createMemory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      title: string;
      content?: string;
      category?: string;
      importance?: number;
      confidence?: number;
    }) => {
      if (!input.title?.trim()) throw new Error("A memory needs a title");
      return input;
    },
  )
  .handler(async ({ data, context }): Promise<Memory> => {
    const { data: row, error } = await context.supabase
      .from("memories")
      .insert({ ...data, title: data.title.trim(), user_id: context.userId })
      .select(MEMORY_COLUMNS)
      .single();
    if (error) throw new Error("Could not save memory");
    return row;
  });
