export type Tone = "primary" | "cyan" | "violet" | "destructive";

export const toneVar = (t: Tone) =>
  t === "cyan"
    ? "var(--cyan-accent)"
    : t === "violet"
      ? "var(--violet-accent)"
      : t === "destructive"
        ? "var(--destructive)"
        : "var(--primary)";

export const today = {
  growth: 68,
  setbacks: 14,
  net: 54,
  score: 82,
  headline: "Highly productive day",
};

export const summaryLines: { text: string; tone: Tone; glyph: string }[] = [
  { text: "Today strengthened your consistency.", tone: "primary", glyph: "◉" },
  { text: "Programming improved significantly.", tone: "cyan", glyph: "▲" },
  { text: "Mental recovery decreased.", tone: "destructive", glyph: "▼" },
  { text: "Communication remained stable.", tone: "violet", glyph: "◈" },
  { text: "Overall today was highly productive.", tone: "primary", glyph: "✦" },
];

export interface DecisionImpact {
  id: string;
  title: string;
  type: "positive" | "negative";
  effects: { label: string; delta: number }[];
  reason: string;
  time: string;
}

export const decisions: DecisionImpact[] = [
  {
    id: "coding",
    title: "Completed Coding Session",
    type: "positive",
    effects: [
      { label: "Programming", delta: 4 },
      { label: "Confidence", delta: 3 },
      { label: "Momentum", delta: 2 },
    ],
    reason: "3h of deep-work compounds craft & discipline loops.",
    time: "09:20 — 12:40",
  },
  {
    id: "workout",
    title: "Skipped Exercise",
    type: "negative",
    effects: [
      { label: "Recovery", delta: -3 },
      { label: "Energy", delta: -2 },
    ],
    reason: "Second miss this week — recovery baseline dropping.",
    time: "17:00 slot",
  },
  {
    id: "focus",
    title: "Deep Focus Block Held",
    type: "positive",
    effects: [
      { label: "Focus", delta: 4 },
      { label: "Discipline", delta: 2 },
    ],
    reason: "No context switches over 90 minutes.",
    time: "14:10 — 15:40",
  },
  {
    id: "sleep",
    title: "Late Sleep Window",
    type: "negative",
    effects: [
      { label: "Sleep", delta: -3 },
      { label: "Focus", delta: -1 },
    ],
    reason: "Bedtime slipped past midnight for the 3rd night.",
    time: "00:42",
  },
  {
    id: "reading",
    title: "30m Reading",
    type: "positive",
    effects: [
      { label: "Learning", delta: 2 },
      { label: "Curiosity", delta: 2 },
    ],
    reason: "Adjacent to your AI research thread.",
    time: "22:10 — 22:40",
  },
  {
    id: "reach",
    title: "Sent Outreach Message",
    type: "positive",
    effects: [
      { label: "Network", delta: 2 },
      { label: "Career", delta: 1 },
    ],
    reason: "Warm intro to a Senior AI Engineer.",
    time: "13:05",
  },
];

export const trajectory = Array.from({ length: 14 }).map((_, i) => {
  const base = 58 + i * 1.6 + Math.sin(i * 0.9) * 6;
  return { day: i + 1, score: Math.round(Math.max(20, Math.min(95, base))) };
});
export const trajectoryDirection = "Improving";
export const trajectoryDelta = 12;

export const projections = [
  {
    id: "d30",
    label: "30 Days",
    headline: "Programming reaches LV 26",
    detail: "AI adjacency unlocks; discipline compounds at 8% weekly.",
    scoreDelta: 9,
    tone: "primary" as Tone,
  },
  {
    id: "d90",
    label: "90 Days",
    headline: "Career trajectory shifts to Ascendant III",
    detail: "Craft + Communication reach parity; leadership signal appears.",
    scoreDelta: 21,
    tone: "cyan" as Tone,
  },
  {
    id: "d365",
    label: "1 Year",
    headline: "AI Engineer identity crystallizes",
    detail: "Cumulative XP passes 96k. Portfolio has three flagship systems.",
    scoreDelta: 44,
    tone: "violet" as Tone,
  },
];

export const alternates = [
  {
    id: "alt-code",
    choice: "If today's coding session had been skipped",
    actual: "Programming +4",
    alternate: "Programming −14 over 30d",
    deltaLabel: "-18% projected growth",
    tone: "destructive" as Tone,
  },
  {
    id: "alt-workout",
    choice: "If workout had been completed",
    actual: "Recovery −3",
    alternate: "Recovery +6, Energy +4",
    deltaLabel: "+9% recovery baseline",
    tone: "cyan" as Tone,
  },
  {
    id: "alt-sleep",
    choice: "If sleep window had held at 23:00",
    actual: "Focus at 82%",
    alternate: "Focus at 91% tomorrow",
    deltaLabel: "+11% tomorrow's focus",
    tone: "primary" as Tone,
  },
];

export const reflection = {
  improved: [
    "Deep work stamina held past the 90-minute mark.",
    "Programming momentum broke its plateau.",
    "Outreach loop reopened after weeks of silence.",
  ],
  slowed: [
    "Workout skipped for the second time this week.",
    "Sleep window slipped again past midnight.",
    "Mental recovery dropped — no downtime logged.",
  ],
  changeTomorrow: [
    "Lock the 17:00 movement slot — non-negotiable.",
    "Start the wind-down ritual by 22:30.",
    "Add one no-input walk before the second focus block.",
  ],
};

export const tomorrow = {
  energy: 74,
  focus: "AI systems — build the retrieval prototype",
  challenges: [
    "Afternoon energy dip (predicted 15:00)",
    "Cognitive load from unresolved sleep debt",
    "Meeting cluster between 11:00 and 13:00",
  ],
  mission: "Ship the retrieval prototype v0 and log a 45-minute Zone-2 session.",
};

export const evolutionAxes = [
  { key: "learning", label: "Learning", score: 84, delta: 6, tone: "primary" as Tone },
  { key: "health", label: "Health", score: 52, delta: -3, tone: "destructive" as Tone },
  { key: "focus", label: "Focus", score: 88, delta: 7, tone: "cyan" as Tone },
  { key: "discipline", label: "Discipline", score: 79, delta: 4, tone: "primary" as Tone },
  { key: "relationships", label: "Relationships", score: 61, delta: 1, tone: "violet" as Tone },
  { key: "creativity", label: "Creativity", score: 72, delta: 3, tone: "violet" as Tone },
  { key: "career", label: "Career", score: 76, delta: 5, tone: "cyan" as Tone },
];

export const evolutionScore = Math.round(
  evolutionAxes.reduce((s, a) => s + a.score, 0) / evolutionAxes.length,
);
