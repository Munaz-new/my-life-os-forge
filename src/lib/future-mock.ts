export type Tone = "primary" | "cyan" | "violet" | "destructive";

export const toneVar = (t: Tone) =>
  t === "cyan"
    ? "var(--cyan-accent)"
    : t === "violet"
      ? "var(--violet-accent)"
      : t === "destructive"
        ? "var(--destructive)"
        : "var(--primary)";

/* ---------------------------------- paths --------------------------------- */

export interface FuturePath {
  id: "best" | "expected" | "risk";
  label: string;
  tone: Tone;
  glow: number; // 0-1 glow intensity
  caption: string;
  curve: number[]; // 6 points, 0-100
}

export const futurePaths: FuturePath[] = [
  {
    id: "best",
    label: "Best Case",
    tone: "cyan",
    glow: 1,
    caption: "Recovery repaired, study cadence lifted, portfolio shipped.",
    curve: [42, 55, 68, 79, 88, 95],
  },
  {
    id: "expected",
    label: "Expected Path",
    tone: "primary",
    glow: 0.72,
    caption: "Today's habits held steady with normal seasonal dips.",
    curve: [42, 50, 58, 65, 71, 78],
  },
  {
    id: "risk",
    label: "Risk Path",
    tone: "violet",
    glow: 0.4,
    caption: "Consistency erodes and recovery debt compounds.",
    curve: [42, 46, 48, 47, 44, 41],
  },
];

/* ------------------------------ current state ------------------------------ */

export const currentDirection = {
  goal: "Become a job-ready AI engineer",
  progress: 42,
  momentum: 68,
  confidence: 81,
  trajectory: "Ascending — steady but recovery-limited",
  stats: [
    { id: "progress", label: "Estimated Progress", value: "42%", tone: "primary" as Tone, hint: "of the 12-month arc" },
    { id: "momentum", label: "Growth Momentum", value: "68", tone: "cyan" as Tone, hint: "+6 vs last month" },
    { id: "confidence", label: "Evolution Confidence", value: "81%", tone: "violet" as Tone, hint: "based on 9 weeks of signal" },
    { id: "trajectory", label: "Current Trajectory", value: "Ascending", tone: "cyan" as Tone, hint: "recovery is the cap" },
  ],
};

/* -------------------------------- scenarios -------------------------------- */

export interface Scenario {
  id: "a" | "b" | "c";
  tag: string;
  title: string;
  premise: string;
  tone: Tone;
  completion: string;
  completionPct: number;
  growthRate: number; // pts / month
  confidence: number;
  risks: string[];
  benefits: string[];
  /** projection value per horizon id */
  horizons: Record<string, number>;
  curve: number[];
}

export const scenarios: Scenario[] = [
  {
    id: "a",
    tag: "Scenario A",
    title: "Steady State",
    premise: "If you continue your current habits.",
    tone: "primary",
    completion: "May 2027",
    completionPct: 78,
    growthRate: 4.1,
    confidence: 84,
    risks: ["Recovery debt stays unresolved", "Portfolio depth grows slowly"],
    benefits: ["Low effort to maintain", "Predictable, sustainable pace"],
    horizons: { "30d": 48, "90d": 58, "6m": 66, "1y": 78, "3y": 88 },
    curve: [42, 48, 58, 66, 78, 88],
  },
  {
    id: "b",
    tag: "Scenario B",
    title: "Deep Investment",
    premise: "If you increase study time by 30%.",
    tone: "cyan",
    completion: "Jan 2027",
    completionPct: 92,
    growthRate: 6.4,
    confidence: 76,
    risks: ["Higher burnout exposure", "Social time compresses"],
    benefits: ["Goal reached ~4 months earlier", "Compounding skill stack", "Stronger portfolio evidence"],
    horizons: { "30d": 55, "90d": 69, "6m": 80, "1y": 91, "3y": 97 },
    curve: [42, 55, 69, 80, 91, 97],
  },
  {
    id: "c",
    tag: "Scenario C",
    title: "Drift",
    premise: "If consistency decreases.",
    tone: "violet",
    completion: "Beyond 2028",
    completionPct: 44,
    growthRate: 1.2,
    confidence: 69,
    risks: ["Momentum loss is hard to rebuild", "Knowledge decay in unused areas"],
    benefits: ["More recovery space in the short term"],
    horizons: { "30d": 44, "90d": 46, "6m": 47, "1y": 45, "3y": 43 },
    curve: [42, 44, 46, 47, 45, 43],
  },
];

export const horizons = [
  { id: "30d", label: "30 Days" },
  { id: "90d", label: "90 Days" },
  { id: "6m", label: "6 Months" },
  { id: "1y", label: "1 Year" },
  { id: "3y", label: "3 Years" },
] as const;

export type HorizonId = (typeof horizons)[number]["id"];

export const horizonNarrative: Record<string, Record<HorizonId, string>> = {
  a: {
    "30d": "Routines hold. Nothing breaks, nothing accelerates.",
    "90d": "Two more projects shipped at the current cadence.",
    "6m": "Core stack solid; deployment experience still thin.",
    "1y": "Job-ready on paper, with a modest portfolio.",
    "3y": "Senior-adjacent capability built slowly but durably.",
  },
  b: {
    "30d": "Noticeably sharper recall and faster build cycles.",
    "90d": "The knowledge gap in systems closes almost entirely.",
    "6m": "Portfolio becomes the strongest part of your profile.",
    "1y": "Goal reached with room to specialise.",
    "3y": "You are teaching the thing you set out to learn.",
  },
  c: {
    "30d": "Small slips only; the graph barely moves.",
    "90d": "Streaks break and restarting costs more each time.",
    "6m": "Skills plateau while the target keeps moving.",
    "1y": "The goal is still reachable, just further away.",
    "3y": "A different path likely replaces this one.",
  },
};

/* ------------------------------ turning points ----------------------------- */

export interface TurningPoint {
  id: string;
  label: string;
  when: string;
  tone: Tone;
  impact: number; // 0-100
  why: string;
}

export const turningPoints: TurningPoint[] = [
  {
    id: "portfolio",
    label: "Complete your portfolio",
    when: "Next 6 weeks",
    tone: "cyan",
    impact: 92,
    why: "It converts private learning into public evidence — the single biggest jump in every scenario.",
  },
  {
    id: "exams",
    label: "Pass semester exams",
    when: "Next 9 weeks",
    tone: "primary",
    impact: 74,
    why: "Clears a recurring attention tax and frees roughly eight hours a week afterwards.",
  },
  {
    id: "docker",
    label: "Learn Docker",
    when: "Next 3 weeks",
    tone: "violet",
    impact: 68,
    why: "Deployment is the last missing block in your AI engineer readiness score.",
  },
  {
    id: "publish",
    label: "Publish your first project",
    when: "Next 4 weeks",
    tone: "cyan",
    impact: 81,
    why: "Shipping publicly creates feedback loops that no amount of study replicates.",
  },
  {
    id: "sleep",
    label: "Improve sleep consistency",
    when: "Starting now",
    tone: "primary",
    impact: 88,
    why: "Recovery is the cap on every other axis — lifting it raises the whole model at once.",
  },
];

/* ---------------------------- opportunity forecast -------------------------- */

export interface ForecastGroup {
  id: string;
  title: string;
  tone: Tone;
  items: { label: string; note: string; value?: number }[];
}

export const opportunityForecast: ForecastGroup[] = [
  {
    id: "high-impact",
    title: "High Impact Opportunities",
    tone: "cyan",
    items: [
      { label: "Ship a deployed AI demo", note: "Highest leverage per hour available to you", value: 94 },
      { label: "Write up what you build", note: "Turns each project into two assets", value: 77 },
      { label: "Join one active builder community", note: "Network is your thinnest input", value: 71 },
    ],
  },
  {
    id: "hidden",
    title: "Hidden Strengths",
    tone: "primary",
    items: [
      { label: "Consistency under pressure", note: "Your streaks survive bad weeks", value: 88 },
      { label: "Written clarity", note: "Ahead of your spoken presence", value: 79 },
      { label: "Fast recovery of focus", note: "You re-enter deep work quickly", value: 74 },
    ],
  },
  {
    id: "emerging",
    title: "Emerging Skills",
    tone: "violet",
    items: [
      { label: "Systems design", note: "Rising fastest of all tracked skills", value: 62 },
      { label: "Technical explanation", note: "Emerging faster than expected", value: 58 },
      { label: "Model evaluation", note: "Early but accelerating", value: 45 },
    ],
  },
  {
    id: "invest",
    title: "Recommended Investments",
    tone: "cyan",
    items: [
      { label: "3 hrs/week on deployment", note: "Closes the readiness gap in ~6 weeks" },
      { label: "One weekly reflection", note: "Improves the accuracy of every projection" },
      { label: "Protected sleep window", note: "Compounds into every other investment" },
    ],
  },
];

/* ------------------------------- risk forecast ------------------------------ */

export interface RiskItem {
  id: string;
  label: string;
  level: number; // 0-100 pressure
  tone: Tone;
  reading: string;
  guidance: string;
}

export const riskForecast: RiskItem[] = [
  {
    id: "burnout",
    label: "Burnout Risk",
    level: 58,
    tone: "violet",
    reading: "Output is high while recovery sits below baseline.",
    guidance: "One deliberate low-intensity day each week keeps this comfortably in range.",
  },
  {
    id: "gap",
    label: "Knowledge Gap",
    level: 46,
    tone: "cyan",
    reading: "Deployment and infrastructure lag behind your modelling skills.",
    guidance: "A short focused block on Docker closes most of this within a month.",
  },
  {
    id: "momentum",
    label: "Loss of Momentum",
    level: 37,
    tone: "primary",
    reading: "Two streaks ended near exam periods in the last quarter.",
    guidance: "Plan a lighter minimum version of your routine for busy weeks in advance.",
  },
  {
    id: "recovery",
    label: "Health Recovery",
    level: 63,
    tone: "primary",
    reading: "Sleep variance is the strongest negative signal in the model.",
    guidance: "Anchoring wake time is usually enough to move this within two weeks.",
  },
];

/* ----------------------------- what-if simulator ---------------------------- */

export interface WhatIfInput {
  id: string;
  label: string;
  base: number;
  tone: Tone;
  hint: string;
}

export const whatIfInputs: WhatIfInput[] = [
  { id: "programming", label: "Increase Programming", base: 60, tone: "cyan", hint: "hours of deliberate build time" },
  { id: "sleep", label: "Increase Sleep", base: 50, tone: "primary", hint: "consistency of your sleep window" },
  { id: "screen", label: "Reduce Screen Time", base: 40, tone: "violet", hint: "higher means less passive scrolling" },
  { id: "exercise", label: "Exercise More", base: 35, tone: "primary", hint: "weekly training volume" },
  { id: "reading", label: "Read Daily", base: 45, tone: "cyan", hint: "pages of focused reading" },
];

export interface WhatIfOutput {
  id: string;
  label: string;
  base: number;
  tone: Tone;
  weights: Record<string, number>;
}

export const whatIfOutputs: WhatIfOutput[] = [
  {
    id: "goal",
    label: "Goal Completion Speed",
    base: 62,
    tone: "cyan",
    weights: { programming: 0.42, sleep: 0.16, screen: 0.18, exercise: 0.04, reading: 0.14 },
  },
  {
    id: "growth",
    label: "Growth Rate",
    base: 58,
    tone: "primary",
    weights: { programming: 0.28, sleep: 0.24, screen: 0.16, exercise: 0.14, reading: 0.18 },
  },
  {
    id: "resilience",
    label: "Resilience",
    base: 51,
    tone: "violet",
    weights: { programming: -0.06, sleep: 0.38, screen: 0.14, exercise: 0.32, reading: 0.05 },
  },
  {
    id: "clarity",
    label: "Mental Clarity",
    base: 66,
    tone: "cyan",
    weights: { programming: 0.05, sleep: 0.34, screen: 0.26, exercise: 0.16, reading: 0.19 },
  },
];

export const projectFuture = (values: Record<string, number>, out: WhatIfOutput) => {
  const drift = whatIfInputs.reduce((acc, i) => {
    const w = out.weights[i.id] ?? 0;
    return acc + ((values[i.id] ?? i.base) - i.base) * w;
  }, 0);
  return Math.max(3, Math.min(99, Math.round(out.base + drift * 0.55)));
};

/** Bends a scenario curve using the what-if inputs, for the live chart. */
export const bendCurve = (curve: number[], values: Record<string, number>) => {
  const drift = whatIfInputs.reduce(
    (acc, i) => acc + ((values[i.id] ?? i.base) - i.base),
    0,
  );
  return curve.map((v, idx) =>
    Math.max(4, Math.min(99, Math.round(v + (drift * 0.12 * idx) / (curve.length - 1)))),
  );
};

export const futureQuote = {
  text: "The future is not predicted. It is continuously created by today's decisions.",
  attribution: "CORE — Future Simulator",
};
