import { MISSION_DIFFICULTIES, MISSION_TYPES } from "./mission-schema";

export const MISSION_GENERATION_INSTRUCTION = `Mode: MISSION_GENERATION.
Design exactly ONE mission for today, derived only from the provided user context.

Quality rules (hard requirements):
- The mission must serve one of the user's active goals. Never invent goals or facts.
- Do not repeat, rephrase or lightly reword any recent mission listed in the context.
- The time estimate must be realistic and must fit inside the user's available minutes.
- Success criteria must be concrete and checkable today. No vague motivational filler.
- Difficulty must respect the adaptation hints below.
- One mission only. Do not overload the user with multiple tasks in one mission.
- "reason" explains WHY CORE chose this, referencing observable facts from the context.
  Keep it short and evidence-based. Never reveal internal chain-of-thought.

mission_type must be one of: ${MISSION_TYPES.join(", ")}.
difficulty must be one of: ${MISSION_DIFFICULTIES.join(", ")}.
priority is 1 (highest) to 5 (lowest). confidence is between 0 and 1.

JSON shape:
{"title":string,"description":string,"mission_type":string,"objective":string,
"estimated_minutes":number,"difficulty":string,"priority":number,"reason":string,
"expected_impact":string,"related_goal":string|null,"related_skills":string[],
"preparation":string|null,"success_criteria":string[],"confidence":number}`;

export function buildMissionPrompt(options: {
  contextText: string;
  hints: string[];
  slot: "Main" | "Side";
  maxMinutes: number;
  rejectionReason?: string;
  rejectedTitle?: string;
}) {
  const lines = [
    MISSION_GENERATION_INSTRUCTION,
    "",
    "USER CONTEXT",
    options.contextText,
    "",
    "GENERATION CONSTRAINTS",
    `- Requested slot: ${options.slot} mission.`,
    `- Maximum estimated_minutes: ${options.maxMinutes}.`,
    ...options.hints.map((h) => `- ${h}`),
  ];

  if (options.rejectedTitle) {
    lines.push(
      "",
      "PREVIOUS PROPOSAL REJECTED",
      `- Rejected mission: ${options.rejectedTitle}`,
      `- Reason given: ${options.rejectionReason ?? "not specified"}`,
      "- Generate a clearly different mission that addresses that feedback.",
    );
  }

  lines.push("", "Return only the JSON object.");
  return lines.join("\n");
}
