export const CORE_MODES = [
  "DAILY_BRIEFING",
  "GOAL_ANALYSIS",
  "MISSION_ADVICE",
  "SKILL_ANALYSIS",
  "EVOLUTION_ANALYSIS",
  "GENERAL_QUESTION",
] as const;

export type CoreMode = (typeof CORE_MODES)[number];

/** Only these two reason with the model in Phase 14; the rest are registered placeholders. */
export const ACTIVE_CORE_MODES: CoreMode[] = ["DAILY_BRIEFING", "GOAL_ANALYSIS"];

export function isActiveCoreMode(mode: CoreMode) {
  return ACTIVE_CORE_MODES.includes(mode);
}

export const CORE_MODE_LABELS: Record<CoreMode, string> = {
  DAILY_BRIEFING: "Daily Briefing",
  GOAL_ANALYSIS: "Goal Analysis",
  MISSION_ADVICE: "Mission Advice",
  SKILL_ANALYSIS: "Skill Analysis",
  EVOLUTION_ANALYSIS: "Evolution Analysis",
  GENERAL_QUESTION: "General Question",
};

export const CORE_UNAVAILABLE_MESSAGE =
  "CORE is temporarily unavailable. Your data is safe. Try again shortly.";
