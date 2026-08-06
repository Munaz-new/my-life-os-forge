export type Tone = "primary" | "cyan" | "violet" | "destructive";

export const toneVar = (t: Tone) =>
  t === "cyan"
    ? "var(--cyan-accent)"
    : t === "violet"
      ? "var(--violet-accent)"
      : t === "destructive"
        ? "var(--destructive)"
        : "var(--primary)";

const spark = (base: number, seed = 1) =>
  Array.from({ length: 10 }, (_, i) =>
    Math.max(4, Math.round(base + Math.sin((i + seed) * 0.7) * 7 + (i - 4) * 1.4)),
  );

export interface TwinAxis {
  id: string;
  label: string;
  glyph: string;
  tone: Tone;
  /** where on the silhouette this axis lives, in % of the hero stage */
  region: { x: number; y: number };
  state: number; // 0-100
  stateLabel: string;
  trend: number[]; // 10 pts
  delta: number; // % change vs last month
  confidence: number; // 0-100
  velocity: number; // pts / week
  note: string;
}

export const twinAxes: TwinAxis[] = [
  {
    id: "mind",
    label: "Mind",
    glyph: "◉",
    tone: "primary",
    region: { x: 50, y: 14 },
    state: 84,
    stateLabel: "Sharp",
    trend: spark(42, 1),
    delta: 6,
    confidence: 92,
    velocity: 1.8,
    note: "Cognitive load handled well across long sessions.",
  },
  {
    id: "body",
    label: "Body",
    glyph: "❋",
    tone: "destructive",
    region: { x: 50, y: 52 },
    state: 54,
    stateLabel: "Under-trained",
    trend: spark(30, 4),
    delta: -4,
    confidence: 81,
    velocity: -0.9,
    note: "Training volume fell below the maintenance floor.",
  },
  {
    id: "knowledge",
    label: "Knowledge",
    glyph: "◈",
    tone: "cyan",
    region: { x: 33, y: 24 },
    state: 88,
    stateLabel: "Compounding",
    trend: spark(45, 2),
    delta: 11,
    confidence: 94,
    velocity: 2.6,
    note: "Intake converts into applied work faster than before.",
  },
  {
    id: "career",
    label: "Career",
    glyph: "▲",
    tone: "violet",
    region: { x: 67, y: 24 },
    state: 76,
    stateLabel: "Ascending",
    trend: spark(38, 6),
    delta: 8,
    confidence: 86,
    velocity: 1.9,
    note: "Portfolio evidence is starting to outpace credentials.",
  },
  {
    id: "health",
    label: "Health",
    glyph: "❇",
    tone: "destructive",
    region: { x: 36, y: 66 },
    state: 58,
    stateLabel: "Strained",
    trend: spark(32, 8),
    delta: -2,
    confidence: 79,
    velocity: -0.4,
    note: "Sleep debt is the dominant negative signal.",
  },
  {
    id: "focus",
    label: "Focus",
    glyph: "◐",
    tone: "cyan",
    region: { x: 64, y: 66 },
    state: 89,
    stateLabel: "Peak",
    trend: spark(46, 3),
    delta: 7,
    confidence: 93,
    velocity: 2.1,
    note: "90-minute uninterrupted blocks now hold reliably.",
  },
  {
    id: "creativity",
    label: "Creativity",
    glyph: "✦",
    tone: "violet",
    region: { x: 24, y: 42 },
    state: 72,
    stateLabel: "Active",
    trend: spark(36, 5),
    delta: 3,
    confidence: 74,
    velocity: 0.8,
    note: "Ideation is high; output containers are missing.",
  },
  {
    id: "discipline",
    label: "Discipline",
    glyph: "⬢",
    tone: "primary",
    region: { x: 76, y: 42 },
    state: 81,
    stateLabel: "Reliable",
    trend: spark(41, 7),
    delta: 5,
    confidence: 90,
    velocity: 1.4,
    note: "Consistency is your single strongest structural trait.",
  },
  {
    id: "recovery",
    label: "Recovery",
    glyph: "◆",
    tone: "destructive",
    region: { x: 42, y: 84 },
    state: 47,
    stateLabel: "Limiting",
    trend: spark(26, 9),
    delta: -6,
    confidence: 88,
    velocity: -1.3,
    note: "The clearest bottleneck in the entire twin model.",
  },
  {
    id: "communication",
    label: "Communication",
    glyph: "❖",
    tone: "cyan",
    region: { x: 58, y: 84 },
    state: 63,
    stateLabel: "Developing",
    trend: spark(33, 10),
    delta: 4,
    confidence: 71,
    velocity: 1.1,
    note: "Written clarity is ahead of spoken presence.",
  },
];

export const twinHealth = {
  stability: 74,
  stabilityLabel: "Stable with one pressure point",
  metrics: [
    { id: "energy", label: "Energy", value: 68, tone: "primary" as Tone, hint: "Steady until 15:00" },
    { id: "recovery", label: "Recovery", value: 47, tone: "destructive" as Tone, hint: "Below baseline for 5 days" },
    { id: "learning", label: "Learning Capacity", value: 86, tone: "cyan" as Tone, hint: "Highest of all metrics" },
    { id: "stress", label: "Stress", value: 41, tone: "violet" as Tone, hint: "Manageable, trending up" },
  ],
};

export interface Readiness {
  id: string;
  label: string;
  score: number;
  tone: Tone;
  gap: string;
  factors: { label: string; value: number }[];
}

export const readiness: Readiness[] = [
  {
    id: "ai-engineer",
    label: "AI Engineer",
    score: 78,
    tone: "cyan",
    gap: "Deployment experience is the last missing block.",
    factors: [
      { label: "Programming", value: 88 },
      { label: "ML Foundations", value: 74 },
      { label: "Systems", value: 62 },
      { label: "Portfolio", value: 72 },
    ],
  },
  {
    id: "founder",
    label: "Startup Founder",
    score: 54,
    tone: "violet",
    gap: "Distribution and network are thin relative to craft.",
    factors: [
      { label: "Craft", value: 84 },
      { label: "Risk Tolerance", value: 58 },
      { label: "Network", value: 38 },
      { label: "Communication", value: 63 },
    ],
  },
  {
    id: "backend",
    label: "Backend Developer",
    score: 71,
    tone: "primary",
    gap: "Databases sit at 55 — the course closes it in ~3 weeks.",
    factors: [
      { label: "APIs", value: 76 },
      { label: "Databases", value: 55 },
      { label: "Linux", value: 64 },
      { label: "Testing", value: 68 },
    ],
  },
  {
    id: "speaker",
    label: "Public Speaker",
    score: 42,
    tone: "violet",
    gap: "No repeated live reps logged this quarter.",
    factors: [
      { label: "Clarity", value: 66 },
      { label: "Stage Reps", value: 21 },
      { label: "Presence", value: 44 },
      { label: "Storytelling", value: 55 },
    ],
  },
  {
    id: "fitness",
    label: "Fitness Goal",
    score: 49,
    tone: "destructive",
    gap: "Recovery, not effort, is what is capping progress.",
    factors: [
      { label: "Consistency", value: 46 },
      { label: "Strength", value: 58 },
      { label: "Conditioning", value: 44 },
      { label: "Recovery", value: 47 },
    ],
  },
];

export interface SimInput {
  id: string;
  label: string;
  base: number;
  tone: Tone;
}

export const simInputs: SimInput[] = [
  { id: "programming", label: "Programming", base: 60, tone: "cyan" },
  { id: "training", label: "Training", base: 40, tone: "primary" },
  { id: "sleep", label: "Sleep", base: 50, tone: "violet" },
  { id: "communication", label: "Communication", base: 45, tone: "cyan" },
];

export interface SimOutput {
  id: string;
  label: string;
  base: number;
  tone: Tone;
  weights: Record<string, number>;
}

export const simOutputs: SimOutput[] = [
  {
    id: "career",
    label: "Career",
    base: 76,
    tone: "violet",
    weights: { programming: 0.32, training: 0.04, sleep: 0.1, communication: 0.28 },
  },
  {
    id: "projects",
    label: "Projects",
    base: 68,
    tone: "primary",
    weights: { programming: 0.44, training: 0.02, sleep: 0.14, communication: 0.06 },
  },
  {
    id: "learning",
    label: "Learning",
    base: 82,
    tone: "cyan",
    weights: { programming: 0.24, training: 0.08, sleep: 0.26, communication: 0.08 },
  },
  {
    id: "ai-readiness",
    label: "AI Readiness",
    base: 71,
    tone: "cyan",
    weights: { programming: 0.46, training: 0.03, sleep: 0.12, communication: 0.12 },
  },
];

export const simulate = (values: Record<string, number>, out: SimOutput) => {
  const drift = simInputs.reduce((acc, i) => {
    const w = out.weights[i.id] ?? 0;
    return acc + ((values[i.id] ?? i.base) - i.base) * w;
  }, 0);
  return Math.max(2, Math.min(99, Math.round(out.base + drift * 0.55)));
};

export interface TwinSnapshot {
  id: string;
  label: string;
  caption: string;
  aura: number; // 0-1 intensity for the hologram
  overall: number;
  axes: Record<string, number>;
}

const snap = (mult: number, jitter: number) =>
  Object.fromEntries(
    twinAxes.map((a, i) => [
      a.id,
      Math.max(8, Math.min(99, Math.round(a.state * mult + Math.sin(i * 1.3) * jitter))),
    ]),
  );

export const snapshots: TwinSnapshot[] = [
  {
    id: "6m",
    label: "6 Months Ago",
    caption: "Scattered effort, no compounding loops yet.",
    aura: 0.35,
    overall: 52,
    axes: snap(0.7, 5),
  },
  {
    id: "1m",
    label: "1 Month Ago",
    caption: "Focus stabilised; recovery began slipping.",
    aura: 0.6,
    overall: 65,
    axes: snap(0.88, 3),
  },
  {
    id: "now",
    label: "Today",
    caption: "High output, one structural bottleneck.",
    aura: 0.85,
    overall: 71,
    axes: snap(1, 0),
  },
  {
    id: "future",
    label: "Projected Future",
    caption: "If recovery is repaired, everything lifts together.",
    aura: 1,
    overall: 86,
    axes: snap(1.18, 2),
  },
];

export interface BehaviorPatternData {
  id: string;
  label: string;
  summary: string;
  tone: Tone;
  points: number[];
  axisLabels: string[];
  insight: string;
}

export const behaviors: BehaviorPatternData[] = [
  {
    id: "morning",
    label: "Morning Focus",
    summary: "Peak cognition between 09:00 and 12:00",
    tone: "cyan",
    points: [18, 34, 62, 88, 92, 84, 61, 44],
    axisLabels: ["06", "08", "09", "10", "11", "12", "14", "16"],
    insight: "Your best two hours are consistently spent on the right work.",
  },
  {
    id: "night",
    label: "Night Productivity",
    summary: "Second wave after 21:00, at a recovery cost",
    tone: "violet",
    points: [30, 26, 38, 58, 74, 69, 48, 22],
    axisLabels: ["17", "18", "20", "21", "22", "23", "00", "01"],
    insight: "Late output is real but it borrows directly from tomorrow.",
  },
  {
    id: "learning",
    label: "Learning Style",
    summary: "Build-first, read-second",
    tone: "primary",
    points: [40, 55, 48, 72, 66, 84, 78, 90],
    axisLabels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    insight: "Retention is highest when a project precedes the theory.",
  },
  {
    id: "recovery",
    label: "Recovery Pattern",
    summary: "Bursty — long pushes, abrupt crashes",
    tone: "destructive",
    points: [70, 62, 48, 36, 30, 55, 42, 34],
    axisLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Avg"],
    insight: "Recovery is reactive rather than scheduled.",
  },
];

export interface TwinObservation {
  id: string;
  text: string;
  detail: string;
  tone: Tone;
  glyph: string;
  confidence: number;
}

export const observations: TwinObservation[] = [
  {
    id: "consistency",
    text: "Your strongest growth area is consistency.",
    detail: "Discipline held above 78 for nine consecutive weeks — the most stable signal in the model.",
    tone: "primary",
    glyph: "⬢",
    confidence: 94,
  },
  {
    id: "recovery",
    text: "Recovery has become your limiting factor.",
    detail: "Every declining axis traces back to recovery debt rather than effort or capability.",
    tone: "destructive",
    glyph: "◆",
    confidence: 91,
  },
  {
    id: "leadership",
    text: "Leadership is emerging faster than expected.",
    detail: "Communication and mentorship signals rose together, which historically precedes leadership roles.",
    tone: "violet",
    glyph: "▲",
    confidence: 72,
  },
  {
    id: "conversion",
    text: "Learning now converts into output within days.",
    detail: "The gap between intake and applied work shrank from 19 days to 4.",
    tone: "cyan",
    glyph: "◈",
    confidence: 87,
  },
];

export interface TwinRecommendation {
  id: string;
  title: string;
  reason: string;
  impact: string;
  priority: "Critical" | "High" | "Medium";
  confidence: number;
  tone: Tone;
}

export const recommendations: TwinRecommendation[] = [
  {
    id: "sleep",
    title: "Fix the sleep window before adding anything new",
    reason: "Recovery at 47 is suppressing Body, Health and Focus simultaneously.",
    impact: "+9 twin stability within 14 days",
    priority: "Critical",
    confidence: 93,
    tone: "destructive",
  },
  {
    id: "deploy",
    title: "Deploy one project end-to-end",
    reason: "AI Engineer readiness is blocked only by deployment evidence.",
    impact: "+11 AI Engineer readiness",
    priority: "High",
    confidence: 88,
    tone: "cyan",
  },
  {
    id: "speak",
    title: "Book one live speaking rep this month",
    reason: "Public Speaker readiness is capped by zero stage reps, not by skill.",
    impact: "+14 speaker readiness",
    priority: "Medium",
    confidence: 69,
    tone: "violet",
  },
  {
    id: "zone2",
    title: "Schedule recovery instead of reacting to it",
    reason: "Recovery pattern is bursty; scheduled low-intensity work flattens the crashes.",
    impact: "+6 energy, −8 stress",
    priority: "High",
    confidence: 84,
    tone: "primary",
  },
];

export const twinOverall = Math.round(
  twinAxes.reduce((s, a) => s + a.state, 0) / twinAxes.length,
);
