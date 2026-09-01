import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { CORE_MODES, CORE_UNAVAILABLE_MESSAGE, isActiveCoreMode, type CoreMode } from "./core-modes";
import { parseInsight, type CoreResult } from "./core-schema";

export interface CoreReasoningInput {
  mode: CoreMode;
  goalId?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isRetryable(error: unknown) {
  const status = (error as { statusCode?: number; status?: number } | null)?.statusCode ??
    (error as { status?: number } | null)?.status;
  return status === 429 || (typeof status === "number" && status >= 500);
}

export const runCoreReasoning = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: CoreReasoningInput) => {
    if (!CORE_MODES.includes(input?.mode)) throw new Error("Unknown CORE mode");
    return input;
  })
  .handler(async ({ data, context }): Promise<CoreResult> => {
    const { mode, goalId } = data;

    if (!isActiveCoreMode(mode)) {
      return {
        status: "placeholder",
        mode,
        message: "This CORE analysis mode is not available yet.",
      };
    }

    const { buildCoreContext } = await import("./core-context.server");
    const {
      CORE_SYSTEM_IDENTITY,
      DAILY_BRIEFING_INSTRUCTION,
      GOAL_ANALYSIS_INSTRUCTION,
    } = await import("./core-identity.server");

    const bundle = await buildCoreContext(context.supabase, context.userId, mode, goalId);

    if (!bundle.sufficient) {
      return {
        status: "insufficient_context",
        mode,
        message:
          "I don't have enough information yet to make a reliable recommendation.",
        suggestions: bundle.suggestions,
      };
    }

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { status: "unavailable", mode, message: CORE_UNAVAILABLE_MESSAGE };
    }

    const { createLovableAiGatewayProvider, CORE_MODEL } = await import("@/lib/ai-gateway.server");
    const { streamText } = await import("ai");

    const instruction =
      mode === "GOAL_ANALYSIS" ? GOAL_ANALYSIS_INSTRUCTION : DAILY_BRIEFING_INSTRUCTION;

    const prompt = `${instruction}

USER CONTEXT
${bundle.text}

Return only the JSON object.`;

    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const gateway = createLovableAiGatewayProvider(apiKey);
        const result = streamText({
          model: gateway(CORE_MODEL),
          system: CORE_SYSTEM_IDENTITY,
          prompt,
          temperature: 0.3,
        });
        const text = await result.text;
        const insight = parseInsight(text);
        if (!insight) {
          return { status: "unavailable", mode, message: CORE_UNAVAILABLE_MESSAGE };
        }
        return {
          status: "ok",
          mode,
          insight,
          generatedAt: new Date().toISOString(),
        };
      } catch (error) {
        console.error("CORE reasoning failed", error);
        if (attempt === 0 && isRetryable(error)) {
          await sleep(1200);
          continue;
        }
        return { status: "unavailable", mode, message: CORE_UNAVAILABLE_MESSAGE };
      }
    }

    return { status: "unavailable", mode, message: CORE_UNAVAILABLE_MESSAGE };
  });
