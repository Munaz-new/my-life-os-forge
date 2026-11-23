import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { CORE_UNAVAILABLE_MESSAGE } from "./core-modes";
import type { NormalizedMission } from "./mission-schema";

export const MISSION_GENERATION_FAILED =
  "CORE could not generate a mission right now. Your existing data is safe. Try again.";

export const DAILY_MAIN_LIMIT = 1;
export const DAILY_SIDE_LIMIT = 2;

export interface GenerateMissionInput {
  slot?: "Main" | "Side";
  /** Mission being replaced — it is dismissed and its feedback steers the retry. */
  replaceMissionId?: string;
  rejectionReason?: string;
}

export type GenerateMissionResult =
  | { status: "ok"; missionId: string; mission: NormalizedMission }
  | { status: "insufficient_context"; message: string; suggestions: string[] }
  | { status: "limit_reached"; message: string }
  | { status: "unavailable"; message: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isRetryable(error: unknown) {
  const status =
    (error as { statusCode?: number; status?: number } | null)?.statusCode ??
    (error as { status?: number } | null)?.status;
  return status === 429 || (typeof status === "number" && status >= 500);
}

export const generateMission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: GenerateMissionInput | undefined) => input ?? {})
  .handler(async ({ data, context }): Promise<GenerateMissionResult> => {
    const { supabase, userId } = context;
    const slot = data.slot === "Side" ? "Side" : "Main";

    const { buildMissionContext } = await import("./mission-context.server");
    const { computeAdaptation } = await import("./mission-adaptation.server");
    const { buildMissionPrompt } = await import("./mission-prompt.server");
    const { CORE_SYSTEM_IDENTITY } = await import("./core-identity.server");
    const { parseGeneratedMission } = await import("./mission-schema");

    let rejectedTitle: string | undefined;
    if (data.replaceMissionId) {
      const { data: rejected } = await supabase
        .from("missions")
        .update({ status: "dismissed" })
        .eq("id", data.replaceMissionId)
        .eq("user_id", userId)
        .eq("status", "proposed")
        .select("title")
        .maybeSingle();
      rejectedTitle = rejected?.title ?? undefined;
    }

    const bundle = await buildMissionContext(supabase, userId);

    if (!bundle.sufficient) {
      return {
        status: "insufficient_context",
        message:
          "CORE needs at least one active goal before it can design a meaningful mission.",
        suggestions: bundle.suggestions,
      };
    }

    // Daily capacity — never generate beyond it.
    if (slot === "Main" && bundle.mainTodayCount >= DAILY_MAIN_LIMIT) {
      return {
        status: "limit_reached",
        message: "You already have today's main mission. Finish it before requesting another.",
      };
    }
    if (slot === "Side" && bundle.sideTodayCount >= DAILY_SIDE_LIMIT) {
      return {
        status: "limit_reached",
        message: "You've reached today's side mission capacity. CORE won't overload you.",
      };
    }

    const apiKey = process.env["AI_API_KEY"];
    if (!apiKey || !process.env.AI_BASE_URL || !process.env.AI_MODEL) return { status: "unavailable", message: CORE_UNAVAILABLE_MESSAGE };

    const adaptation = computeAdaptation({
      results: bundle.results,
      abandonedCount: bundle.abandonedCount,
      availableMinutes: bundle.availableMinutes,
    });

    const prompt = buildMissionPrompt({
      contextText: bundle.text,
      hints: adaptation.hints,
      slot,
      maxMinutes: adaptation.maxMinutes,
      ...(rejectedTitle ? { rejectedTitle } : {}),
      ...(data.rejectionReason ? { rejectionReason: data.rejectionReason } : {}),
    });

    const { createAiProvider, CORE_MODEL } = await import("@/lib/ai-gateway.server");
    const { streamText } = await import("ai");

    let mission: NormalizedMission | null = null;

    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const gateway = createAiProvider(apiKey);
        const result = streamText({
          model: gateway(CORE_MODEL),
          system: CORE_SYSTEM_IDENTITY,
          prompt,
          temperature: 0.4,
        });
        const text = await result.text;
        mission = parseGeneratedMission(text, adaptation.maxMinutes);
        if (!mission) {
          console.error("Mission generation returned invalid structure", { attempt });
          if (attempt === 0) continue;
          return { status: "unavailable", message: MISSION_GENERATION_FAILED };
        }
        break;
      } catch (error) {
        console.error("Mission generation failed", error);
        if (attempt === 0 && isRetryable(error)) {
          await sleep(1200);
          continue;
        }
        return { status: "unavailable", message: MISSION_GENERATION_FAILED };
      }
    }

    if (!mission) return { status: "unavailable", message: MISSION_GENERATION_FAILED };

    const matchedGoal = mission.related_goal
      ? bundle.goals.find(
          (g) => g.title.toLowerCase() === mission!.related_goal!.toLowerCase(),
        ) ?? null
      : null;

    const { data: row, error } = await supabase
      .from("missions")
      .insert({
        user_id: userId,
        title: mission.title,
        description: mission.description,
        mission_type: slot === "Main" ? "Main" : mission.mission_type,
        difficulty: mission.difficulty,
        status: "proposed",
        estimated_minutes: mission.estimated_minutes,
        objective: mission.objective,
        priority: mission.priority,
        reason: mission.reason,
        expected_impact: mission.expected_impact,
        related_goal: mission.related_goal,
        related_goal_id: matchedGoal?.id ?? null,
        related_skills: mission.related_skills,
        preparation: mission.preparation,
        success_criteria: mission.success_criteria,
        confidence: mission.confidence,
        source: "core",
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("Mission persist failed", error);
      return { status: "unavailable", message: MISSION_GENERATION_FAILED };
    }

    return { status: "ok", missionId: row.id as string, mission };
  });
