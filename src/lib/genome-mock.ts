export type Tone = "primary" | "cyan" | "violet";
export type NodeStatus = "ascending" | "stable" | "dormant";

export interface ChildSkill {
  id: string;
  label: string;
  level: number;
  xp: number;
  growth: number; // %
  weeklyTrend: number[]; // 7 points
  strengths: string[];
  weaknesses: string[];
  related: string[]; // ids
}

export interface MajorNode {
  id: string;
  label: string;
  glyph: string;
  tone: Tone;
  level: number;
  progress: number; // 0-100
  xp: number;
  status: NodeStatus;
  angle: number; // radians for radial layout
  children: ChildSkill[];
}

export const coreNode = {
  label: "YOU",
  level: 17,
  totalXp: 42_180,
  evolution: 68, // %
  status: "Ascending",
};

const spark = (base: number) =>
  Array.from({ length: 7 }, (_, i) =>
    Math.max(1, Math.round(base + Math.sin(i * 0.9) * 4 + (i - 3) * 0.8)),
  );

const child = (
  id: string,
  label: string,
  level: number,
  growth: number,
  strengths: string[],
  weaknesses: string[],
  related: string[],
): ChildSkill => ({
  id,
  label,
  level,
  xp: level * 240 + 120,
  growth,
  weeklyTrend: spark(level),
  strengths,
  weaknesses,
  related,
});

const D = 9;
const angleOf = (i: number) => (i / D) * Math.PI * 2 - Math.PI / 2;

export const majorNodes: MajorNode[] = [
  {
    id: "learning",
    label: "Learning",
    glyph: "◉",
    tone: "primary",
    level: 22,
    progress: 74,
    xp: 5_320,
    status: "ascending",
    angle: angleOf(0),
    children: [
      child("learning.programming", "Programming", 24, 12, ["Systems", "Refactoring"], ["Testing"], ["learning.ai", "learning.algorithms"]),
      child("learning.ai", "AI", 18, 22, ["Prompting", "Fine-tune intuition"], ["MLOps"], ["learning.programming", "learning.math"]),
      child("learning.linux", "Linux", 15, 4, ["Shell", "Networking"], ["Kernel"], ["learning.databases"]),
      child("learning.databases", "Databases", 14, 6, ["SQL"], ["Sharding"], ["learning.programming"]),
      child("learning.algorithms", "Algorithms", 17, 9, ["Graphs"], ["DP"], ["learning.math", "learning.programming"]),
      child("learning.math", "Mathematics", 13, 5, ["Linear algebra"], ["Topology"], ["learning.ai", "learning.algorithms"]),
    ],
  },
  {
    id: "career",
    label: "Career",
    glyph: "❖",
    tone: "cyan",
    level: 19,
    progress: 61,
    xp: 4_460,
    status: "ascending",
    angle: angleOf(1),
    children: [
      child("career.strategy", "Strategy", 20, 8, ["Vision"], ["Roadmapping"], ["leadership.vision"]),
      child("career.execution", "Execution", 18, 10, ["Shipping"], ["Delegation"], ["mindset.discipline"]),
      child("career.network", "Network", 12, 3, ["Warm intros"], ["Cold outreach"], ["communication.speaking"]),
      child("career.craft", "Craft", 22, 7, ["Depth"], ["Breadth"], ["learning.programming"]),
    ],
  },
  {
    id: "health",
    label: "Health",
    glyph: "❋",
    tone: "cyan",
    level: 16,
    progress: 48,
    xp: 3_120,
    status: "stable",
    angle: angleOf(2),
    children: [
      child("health.sleep", "Sleep", 18, 6, ["Consistency"], ["Late screens"], ["mindset.calm"]),
      child("health.nutrition", "Nutrition", 14, 4, ["Protein"], ["Sugar"], ["fitness.strength"]),
      child("health.exercise", "Exercise", 17, 9, ["Cardio base"], ["Mobility"], ["fitness.strength", "fitness.endurance"]),
      child("health.recovery", "Recovery", 13, 5, ["Rest days"], ["Stretching"], ["health.sleep"]),
      child("health.stress", "Stress", 12, -2, ["Breath"], ["Reactivity"], ["mindset.calm"]),
    ],
  },
  {
    id: "mindset",
    label: "Mindset",
    glyph: "◈",
    tone: "violet",
    level: 21,
    progress: 82,
    xp: 5_040,
    status: "ascending",
    angle: angleOf(3),
    children: [
      child("mindset.discipline", "Discipline", 23, 11, ["Routine"], ["Rest guilt"], ["career.execution"]),
      child("mindset.focus", "Focus", 20, 9, ["Deep work"], ["Context switching"], ["learning.programming"]),
      child("mindset.calm", "Calm", 17, 5, ["Grounding"], ["Overload"], ["health.stress", "health.sleep"]),
      child("mindset.curiosity", "Curiosity", 22, 8, ["Wide reading"], ["Follow-through"], ["learning.ai"]),
    ],
  },
  {
    id: "finance",
    label: "Finance",
    glyph: "◆",
    tone: "primary",
    level: 12,
    progress: 34,
    xp: 1_940,
    status: "stable",
    angle: angleOf(4),
    children: [
      child("finance.saving", "Saving", 14, 3, ["Automation"], ["Impulse"], ["mindset.discipline"]),
      child("finance.investing", "Investing", 11, 6, ["Index"], ["Options"], ["learning.math"]),
      child("finance.budget", "Budget", 13, 2, ["Tracking"], ["Categories"], ["finance.saving"]),
      child("finance.income", "Income", 10, 4, ["Craft"], ["Negotiation"], ["career.craft"]),
    ],
  },
  {
    id: "communication",
    label: "Communication",
    glyph: "✦",
    tone: "cyan",
    level: 15,
    progress: 52,
    xp: 2_680,
    status: "ascending",
    angle: angleOf(5),
    children: [
      child("communication.speaking", "Public Speaking", 13, 7, ["Cadence"], ["Improv"], ["leadership.vision"]),
      child("communication.writing", "Writing", 18, 9, ["Clarity"], ["Length"], ["learning.programming"]),
      child("communication.listening", "Listening", 16, 4, ["Presence"], ["Interrupting"], ["mindset.calm"]),
      child("communication.negotiation", "Negotiation", 11, 3, ["Framing"], ["Silence"], ["career.strategy"]),
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    glyph: "▲",
    tone: "violet",
    level: 14,
    progress: 44,
    xp: 2_240,
    status: "stable",
    angle: angleOf(6),
    children: [
      child("leadership.vision", "Vision", 16, 6, ["Narrative"], ["Detail"], ["career.strategy"]),
      child("leadership.mentorship", "Mentorship", 13, 5, ["Empathy"], ["Directness"], ["communication.listening"]),
      child("leadership.decisiveness", "Decisiveness", 12, 4, ["Speed"], ["Reversal cost"], ["mindset.focus"]),
    ],
  },
  {
    id: "creativity",
    label: "Creativity",
    glyph: "❇",
    tone: "violet",
    level: 18,
    progress: 66,
    xp: 3_580,
    status: "ascending",
    angle: angleOf(7),
    children: [
      child("creativity.design", "Design", 20, 10, ["Taste"], ["Systems"], ["creativity.craft"]),
      child("creativity.craft", "Craft", 17, 7, ["Iteration"], ["Perfection"], ["career.craft"]),
      child("creativity.ideation", "Ideation", 16, 8, ["Volume"], ["Filtering"], ["mindset.curiosity"]),
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    glyph: "◐",
    tone: "primary",
    level: 13,
    progress: 38,
    xp: 2_060,
    status: "dormant",
    angle: angleOf(8),
    children: [
      child("fitness.strength", "Strength", 15, 6, ["Push"], ["Pull"], ["health.exercise"]),
      child("fitness.endurance", "Endurance", 12, 4, ["Zone 2"], ["Threshold"], ["health.exercise"]),
      child("fitness.mobility", "Mobility", 9, -1, ["Ankles"], ["Hips"], ["health.recovery"]),
      child("fitness.speed", "Speed", 10, 3, ["Short sprints"], ["Form"], ["fitness.strength"]),
    ],
  },
];

export const forecast = {
  mostLikelyNext: {
    skill: "AI",
    reason: "Adjacent to Programming momentum",
    delta: 22,
  },
  fastestGrowing: {
    skill: "Discipline",
    reason: "11% weekly compounding",
    delta: 11,
  },
  losingMomentum: {
    skill: "Mobility",
    reason: "No sessions logged in 6 days",
    delta: -1,
  },
  recommendedFocus: {
    skill: "Sleep",
    reason: "Unlocks recovery + focus multipliers",
    delta: 8,
  },
};

export const heatmap = majorNodes.map((n) => {
  const intensity = n.progress / 100;
  const band: "strong" | "balanced" | "weak" =
    intensity > 0.65 ? "strong" : intensity > 0.42 ? "balanced" : "weak";
  return { id: n.id, domain: n.label, intensity, band };
});

export const timeline = [
  { month: "Jan", level: 8, xp: 12_400, highlight: "First cohesive routine" },
  { month: "Feb", level: 9, xp: 14_200, highlight: "Programming compounds" },
  { month: "Mar", level: 10, xp: 16_800, highlight: "Writing daily" },
  { month: "Apr", level: 11, xp: 19_400, highlight: "Sleep window locked" },
  { month: "May", level: 12, xp: 22_100, highlight: "Deep work streak" },
  { month: "Jun", level: 13, xp: 25_600, highlight: "AI dive" },
  { month: "Jul", level: 14, xp: 28_900, highlight: "Public speaking reps" },
  { month: "Aug", level: 15, xp: 32_100, highlight: "Recovery focus" },
  { month: "Sep", level: 15, xp: 34_000, highlight: "Plateau month" },
  { month: "Oct", level: 16, xp: 36_800, highlight: "Craft breakthrough" },
  { month: "Nov", level: 17, xp: 39_400, highlight: "Discipline compounds" },
  { month: "Dec", level: 17, xp: 42_180, highlight: "Genome stabilized" },
];

export const toneColor = (tone: Tone) =>
  tone === "cyan"
    ? "var(--cyan-accent)"
    : tone === "violet"
      ? "var(--violet-accent)"
      : "var(--primary)";

export const toneGlow = (tone: Tone) =>
  tone === "cyan"
    ? "var(--glow-cyan)"
    : tone === "violet"
      ? "var(--glow-violet)"
      : "var(--glow-primary)";
