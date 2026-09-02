import { z } from "zod";

export const MISSION_TYPES = [
  "Main",
  "Side",
  "Learning",
  "Focus",
  "Fitness",
  "Recovery",
  "Creative",
  "Career",
] as const;

export type MissionType = (typeof MISSION_TYPES)[number];

export const MISSION_DIFFICULTIES = ["Easy", "Moderate", "Hard", "Very Hard"] as const;
export type MissionDifficulty = (typeof MISSION_DIFFICULTIES)[number];

export const REGENERATE_REASONS = [
  "Too difficult",
  "Too time-consuming",
  "Not relevant",
  "Not interested",
  "Already completed",
  "Other",
] as const;
export type RegenerateReason = (typeof REGENERATE_REASONS)[number];

/** Shape CORE must return for a generated mission. */
export const generatedMissionSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  mission_type: z.string(),
  objective: z.string(),
  estimated_minutes: z.number(),
  difficulty: z.string(),
  priority: z.number(),
  reason: z.string(),
  expected_impact: z.string(),
  related_goal: z.string().nullable().optional(),
  related_skills: z.array(z.string()).nullable().optional(),
  preparation: z.string().nullable().optional(),
  success_criteria: z.array(z.string()).min(1),
  confidence: z.number(),
});

export type GeneratedMission = z.infer<typeof generatedMissionSchema>;

export interface NormalizedMission {
  title: string;
  description: string;
  mission_type: MissionType;
  objective: string;
  estimated_minutes: number;
  difficulty: MissionDifficulty;
  priority: number;
  reason: string;
  expected_impact: string;
  related_goal: string | null;
  related_skills: string[];
  preparation: string | null;
  success_criteria: string[];
  confidence: number;
}

const clip = (value: string, max: number) => value.replace(/\s+/g, " ").trim().slice(0, max);

function matchType(raw: string): MissionType | null {
  const cleaned = raw.replace(/mission/i, "").trim().toLowerCase();
  return MISSION_TYPES.find((t) => t.toLowerCase() === cleaned) ?? null;
}

function matchDifficulty(raw: string): MissionDifficulty | null {
  const cleaned = raw.trim().toLowerCase();
  return MISSION_DIFFICULTIES.find((d) => d.toLowerCase() === cleaned) ?? null;
}

/**
 * Clamps and constrains validated model output. Returns null when the payload
 * cannot be trusted (unknown type/difficulty, empty criteria, absurd time).
 */
export function normalizeMission(
  mission: GeneratedMission,
  maxMinutes: number,
): NormalizedMission | null {
  const mission_type = matchType(mission.mission_type);
  const difficulty = matchDifficulty(mission.difficulty);
  if (!mission_type || !difficulty) return null;

  const criteria = mission.success_criteria
    .map((c) => clip(c, 160))
    .filter(Boolean)
    .slice(0, 5);
  if (!criteria.length) return null;

  const minutes = Math.round(mission.estimated_minutes);
  if (!Number.isFinite(minutes) || minutes < 5) return null;

  const confidenceRaw = Number.isFinite(mission.confidence) ? mission.confidence : 0.5;
  const confidence = Math.min(
    1,
    Math.max(0, confidenceRaw > 1 ? confidenceRaw / 100 : confidenceRaw),
  );

  const title = clip(mission.title, 120);
  if (title.length < 3) return null;

  return {
    title,
    description: clip(mission.description, 400),
    mission_type,
    objective: clip(mission.objective, 300),
    estimated_minutes: Math.min(Math.max(minutes, 5), Math.max(15, maxMinutes)),
    difficulty,
    priority: Math.min(5, Math.max(1, Math.round(mission.priority) || 3)),
    reason: clip(mission.reason, 500),
    expected_impact: clip(mission.expected_impact, 300),
    related_goal: mission.related_goal ? clip(mission.related_goal, 120) : null,
    related_skills: (mission.related_skills ?? []).map((s) => clip(s, 60)).filter(Boolean).slice(0, 5),
    preparation: mission.preparation ? clip(mission.preparation, 300) : null,
    success_criteria: criteria,
    confidence,
  };
}

/** Tolerant JSON extraction — models sometimes wrap output in code fences. */
export function parseGeneratedMission(
  raw: string,
  maxMinutes: number,
): NormalizedMission | null {
  const trimmed = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "");
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    const parsed = generatedMissionSchema.safeParse(JSON.parse(trimmed.slice(start, end + 1)));
    if (!parsed.success) return null;
    return normalizeMission(parsed.data, maxMinutes);
  } catch {
    return null;
  }
}
