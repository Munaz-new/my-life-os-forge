import { z } from "zod";
import type { CoreMode } from "./core-modes";

export const coreInsightSchema = z.object({
  summary: z.string(),
  observation: z.string(),
  recommendation: z.string(),
  reasoning: z.string(),
  evidence: z.array(z.string()),
  confidence: z.number(),
  expectedImpact: z.string(),
  nextAction: z.string(),
  goalStatus: z.string().nullable().optional(),
  strengths: z.array(z.string()).nullable().optional(),
  bottlenecks: z.array(z.string()).nullable().optional(),
  caution: z.string().nullable().optional(),
});

export type CoreInsight = z.infer<typeof coreInsightSchema>;

export type CoreResult =
  | { status: "ok"; mode: CoreMode; insight: CoreInsight; generatedAt: string }
  | {
      status: "insufficient_context";
      mode: CoreMode;
      message: string;
      suggestions: string[];
    }
  | { status: "placeholder"; mode: CoreMode; message: string }
  | { status: "unavailable"; mode: CoreMode; message: string };

/** Normalizes a validated insight into safe display values. */
export function normalizeInsight(insight: CoreInsight): CoreInsight {
  const confidence = Number.isFinite(insight.confidence)
    ? Math.min(1, Math.max(0, insight.confidence > 1 ? insight.confidence / 100 : insight.confidence))
    : 0.5;
  return {
    ...insight,
    confidence,
    evidence: insight.evidence.slice(0, 6),
    strengths: insight.strengths?.slice(0, 5) ?? null,
    bottlenecks: insight.bottlenecks?.slice(0, 5) ?? null,
  };
}

/** Tolerant JSON extraction — models sometimes wrap output in code fences. */
export function parseInsight(raw: string): CoreInsight | null {
  const trimmed = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "");
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    const parsed = coreInsightSchema.safeParse(JSON.parse(trimmed.slice(start, end + 1)));
    return parsed.success ? normalizeInsight(parsed.data) : null;
  } catch {
    return null;
  }
}
