export interface AdaptationInput {
  results: Array<{
    completion_status: string | null;
    difficulty_feedback: string | null;
    completion_time: number | null;
  }>;
  abandonedCount: number;
  availableMinutes: number;
}

export interface AdaptationOutcome {
  hints: string[];
  maxMinutes: number;
}

/**
 * Modular adaptive rules. Conservative by design — these only produce prompt
 * hints, never automatic changes to user data.
 */
export function computeAdaptation(input: AdaptationInput): AdaptationOutcome {
  const hints: string[] = [];
  const recent = input.results.slice(0, 5);
  const completed = recent.filter((r) => (r.completion_status ?? "yes") === "yes");
  const easyStreak = completed.filter((r) => r.difficulty_feedback === "easy").length;
  const hardCount = recent.filter(
    (r) => r.difficulty_feedback === "hard" || r.difficulty_feedback === "very_hard",
  ).length;
  const partialCount = recent.filter((r) => r.completion_status === "partial").length;

  let maxMinutes = Math.max(15, Math.min(input.availableMinutes || 60, 240));

  if (easyStreak >= 2 && hardCount === 0) {
    hints.push("The user completed several missions rated easy. Increase difficulty by one step.");
  }
  if (hardCount >= 2) {
    hints.push(
      "Recent missions were rated hard or very hard. Reduce difficulty and scope this time.",
    );
    maxMinutes = Math.max(15, Math.round(maxMinutes * 0.7));
  }
  if (input.abandonedCount >= 2) {
    hints.push(
      "The user abandoned multiple recent missions. Choose a smaller, easier, clearly achievable mission.",
    );
    maxMinutes = Math.max(15, Math.round(maxMinutes * 0.6));
  }
  if (partialCount >= 2) {
    hints.push("Missions are often only partially completed. Narrow the scope.");
  }
  if (maxMinutes <= 30) {
    hints.push("Available time is short today. Design a compact mission.");
  }
  if (!hints.length) {
    hints.push("No strong adaptation signal yet. Match the user's current demonstrated level.");
  }

  return { hints, maxMinutes };
}
