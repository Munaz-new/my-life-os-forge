export type Tone = "primary" | "cyan" | "violet";

export const missionStatus = {
  status: "Active",
  difficulty: "Balanced",
  eta: "3h 45m",
  expectedGrowth: "+9.4%",
  confidence: 92,
  generatedAt: "07:12",
};

export type MissionCategory = {
  key: string;
  name: string;
  icon: string;
  tone: Tone;
  tagline: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Adaptive";
  xp: number;
};

export const categories: MissionCategory[] = [
  { key: "main", name: "Main Mission", icon: "◆", tone: "primary", tagline: "The strategic move of the day.", duration: "2h 30m", difficulty: "Hard", xp: 420 },
  { key: "side", name: "Side Mission", icon: "◇", tone: "cyan", tagline: "Supporting objective, high leverage.", duration: "45m", difficulty: "Medium", xp: 160 },
  { key: "recovery", name: "Recovery Mission", icon: "◐", tone: "cyan", tagline: "Restore systems and cognition.", duration: "30m", difficulty: "Easy", xp: 90 },
  { key: "learning", name: "Learning Mission", icon: "✦", tone: "violet", tagline: "Expand knowledge surface area.", duration: "1h 00m", difficulty: "Medium", xp: 220 },
  { key: "fitness", name: "Fitness Mission", icon: "▲", tone: "primary", tagline: "Move the body, sharpen the mind.", duration: "40m", difficulty: "Medium", xp: 180 },
  { key: "focus", name: "Focus Mission", icon: "◎", tone: "primary", tagline: "Single-thread deep work window.", duration: "90m", difficulty: "Hard", xp: 300 },
  { key: "creative", name: "Creative Mission", icon: "❋", tone: "violet", tagline: "Generate signal from noise.", duration: "1h 15m", difficulty: "Adaptive", xp: 240 },
  { key: "career", name: "Career Mission", icon: "◈", tone: "cyan", tagline: "Advance long-horizon trajectory.", duration: "1h 30m", difficulty: "Hard", xp: 360 },
];

export const missionDetail = {
  name: "Ship the Python Analytics Module",
  objective:
    "Complete the data-processing pipeline for your AI Resume project and push a working prototype to your local repo.",
  reason:
    "Your programming momentum is compounding, but you have an unfinished module blocking two downstream tasks. Closing it today unlocks the next skill tier.",
  duration: "2h 30m",
  difficulty: "Hard",
  growthAreas: ["Programming", "Focus", "Discipline"],
  expectedOutcome:
    "One shippable module + a clear next step for tomorrow's session. Confidence in your project trajectory rises noticeably.",
  prepTips: [
    "Silence notifications and enter Do Not Disturb.",
    "Warm up with 5 minutes of code review before writing.",
    "Keep water and a light snack within reach.",
    "Split the work into 3 × 45-minute focused blocks.",
  ],
};

export const growthProjection: Array<{ label: string; value: number; tone: Tone }> = [
  { label: "Programming", value: 12, tone: "primary" },
  { label: "Learning", value: 9, tone: "violet" },
  { label: "Focus", value: 8, tone: "primary" },
  { label: "Discipline", value: 5, tone: "cyan" },
  { label: "Health", value: 3, tone: "cyan" },
];

export const timeline = [
  { phase: "Preparation", time: "09:00 – 09:15", detail: "Clear workspace, set intent, review yesterday's notes.", state: "active" as const },
  { phase: "Execution", time: "09:15 – 11:45", detail: "Three deep-work blocks with 5-minute resets between.", state: "pending" as const },
  { phase: "Reflection", time: "11:45 – 12:00", detail: "Capture insights, log blockers, note next steps.", state: "pending" as const },
  { phase: "Completion", time: "12:00", detail: "Mark mission complete. CORE updates trajectory.", state: "pending" as const },
];

export const coreExplanation =
  "CORE selected this mission because your recent consistency in programming is increasing, while your physical activity has declined. Completing this mission balances both cognitive momentum and the discipline required to rebuild your movement baseline over the coming week.";

export const reflectionPrompts = [
  "What went well?",
  "What was difficult?",
  "What did you learn?",
];
