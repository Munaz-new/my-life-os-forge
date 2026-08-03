export type Tone = "primary" | "cyan" | "violet" | "destructive" | "warning";

export const toneVar = (t: Tone) =>
  t === "cyan"
    ? "var(--cyan-accent)"
    : t === "violet"
      ? "var(--violet-accent)"
      : t === "destructive"
        ? "var(--destructive)"
        : t === "warning"
          ? "oklch(0.80 0.16 85)"
          : "var(--primary)";

export const decisionGoal = {
  label: "Become an AI Engineer",
  horizon: "12-month horizon",
  progress: 41,
};

export interface Constraint {
  id: string;
  label: string;
  value: string;
  score: number; // 0-100
  tone: Tone;
  note: string;
}

export const constraints: Constraint[] = [
  {
    id: "time",
    label: "Available Time",
    value: "2.4h / day",
    score: 48,
    tone: "cyan",
    note: "Weekday capacity after work + recovery blocks.",
  },
  {
    id: "energy",
    label: "Energy",
    value: "62%",
    score: 62,
    tone: "warning",
    note: "Suppressed by three consecutive late sleep windows.",
  },
  {
    id: "focus",
    label: "Focus",
    value: "88%",
    score: 88,
    tone: "primary",
    note: "Deep-work stamina holding past 90 minutes.",
  },
  {
    id: "velocity",
    label: "Learning Velocity",
    value: "74 pts/wk",
    score: 74,
    tone: "violet",
    note: "Rising, but concentrated in a single domain.",
  },
];

export const pipelineSteps = [
  {
    id: "goal",
    label: "Goal",
    detail: "Anchor: Become an AI Engineer within 12 months.",
    output: "Target proficiency map loaded",
  },
  {
    id: "context",
    label: "Analyze Context",
    detail: "Read time budget, energy, focus and current commitments.",
    output: "2.4h/day usable · energy suppressed",
  },
  {
    id: "progress",
    label: "Evaluate Progress",
    detail: "Compare genome levels against the required proficiency curve.",
    output: "41% to goal · Python 3 levels behind curve",
  },
  {
    id: "bottleneck",
    label: "Identify Bottlenecks",
    detail: "Locate the single constraint gating the largest downstream gain.",
    output: "Bottleneck: Python fundamentals",
  },
  {
    id: "recommend",
    label: "Generate Recommendation",
    detail: "Rank candidate paths by expected value under current constraints.",
    output: "Delay Machine Learning · reinforce Python",
  },
  {
    id: "predict",
    label: "Predict Outcome",
    detail: "Simulate 30/90/365-day trajectories for each candidate path.",
    output: "+18% projected goal velocity",
  },
];

export const reasoning = {
  situation:
    "You are 41% toward an AI Engineer trajectory with 2.4 usable hours per day and energy running below your own baseline.",
  pattern:
    "Every time a Machine Learning module is attempted, completion drops to 38% and the session is abandoned inside 25 minutes.",
  evidence: [
    { label: "Recent project performance", value: "3 of 5 tasks required syntax backtracking" },
    { label: "Learning history", value: "Python plateaued at LV 14 for 19 days" },
    { label: "Mission completion", value: "ML missions completed 38% vs 86% overall" },
    { label: "Knowledge graph", value: "7 ML nodes depend on unresolved Python nodes" },
  ],
  recommendation: "Delay Machine Learning. Reinforce Python fundamentals for 3 weeks.",
  reasonShort: "Python fundamentals are below your target proficiency.",
  confidence: 92,
  risk: {
    level: "Low",
    tone: "cyan" as Tone,
    note: "Cost is a 3-week delay on ML start; downside is bounded and reversible.",
  },
};

export interface DecisionOption {
  id: string;
  letter: string;
  title: string;
  summary: string;
  outcome: "Very High" | "High" | "Medium" | "Low";
  outcomeScore: number;
  tone: Tone;
  tradeoffs: {
    time: number;
    difficulty: number;
    futureValue: number;
    energyCost: number;
    momentum: number;
  };
  timeLabel: string;
  simulation: { horizon: string; headline: string; detail: string; delta: number }[];
}

export const options: DecisionOption[] = [
  {
    id: "python",
    letter: "A",
    title: "Improve Python",
    summary: "Three weeks of fundamentals drilling before touching ML material.",
    outcome: "High",
    outcomeScore: 78,
    tone: "primary",
    timeLabel: "3 weeks · 1.5h/day",
    tradeoffs: { time: 55, difficulty: 40, futureValue: 82, energyCost: 45, momentum: 70 },
    simulation: [
      {
        horizon: "30 Days",
        headline: "Python reaches LV 21",
        detail: "Syntax backtracking disappears; ML prerequisites unlock cleanly.",
        delta: 12,
      },
      {
        horizon: "90 Days",
        headline: "First ML project shipped",
        detail: "Entering ML with fundamentals intact raises completion to ~80%.",
        delta: 27,
      },
      {
        horizon: "1 Year",
        headline: "AI Engineer readiness 84%",
        detail: "Compounding craft; portfolio holds two production-grade systems.",
        delta: 51,
      },
    ],
  },
  {
    id: "ml",
    letter: "B",
    title: "Start Machine Learning",
    summary: "Begin ML immediately and patch fundamentals reactively as they break.",
    outcome: "Medium",
    outcomeScore: 54,
    tone: "warning",
    timeLabel: "Immediate · 2h/day",
    tradeoffs: { time: 80, difficulty: 88, futureValue: 66, energyCost: 85, momentum: 42 },
    simulation: [
      {
        horizon: "30 Days",
        headline: "Motivation spike, then stall",
        detail: "Early excitement fades as prerequisite gaps surface week three.",
        delta: 5,
      },
      {
        horizon: "90 Days",
        headline: "Partial ML fluency",
        detail: "Concepts understood, implementation confidence remains fragile.",
        delta: 14,
      },
      {
        horizon: "1 Year",
        headline: "AI Engineer readiness 61%",
        detail: "Rework cost of skipped fundamentals absorbs roughly 9 weeks.",
        delta: 30,
      },
    ],
  },
  {
    id: "math",
    letter: "C",
    title: "Review Mathematics",
    summary: "Linear algebra and probability first — the substrate under every ML concept.",
    outcome: "Very High",
    outcomeScore: 89,
    tone: "violet",
    timeLabel: "4 weeks · 1h/day",
    tradeoffs: { time: 62, difficulty: 58, futureValue: 94, energyCost: 40, momentum: 63 },
    simulation: [
      {
        horizon: "30 Days",
        headline: "Math confidence +22",
        detail: "Vectors, matrices and distributions stop being opaque.",
        delta: 15,
      },
      {
        horizon: "90 Days",
        headline: "ML intuition, not memorisation",
        detail: "Model behaviour becomes predictable rather than mysterious.",
        delta: 33,
      },
      {
        horizon: "1 Year",
        headline: "AI Engineer readiness 91%",
        detail: "Deepest long-term leverage; research-adjacent work becomes viable.",
        delta: 58,
      },
    ],
  },
];

export const tradeoffMetrics = [
  { key: "time", label: "Time Required", invert: true },
  { key: "difficulty", label: "Difficulty", invert: true },
  { key: "futureValue", label: "Future Value", invert: false },
  { key: "energyCost", label: "Energy Cost", invert: true },
  { key: "momentum", label: "Momentum Impact", invert: false },
] as const;

export interface JournalEntry {
  id: string;
  date: string;
  decision: string;
  reason: string;
  result: string;
  outcome: "followed" | "ignored" | "partial";
  delta: number;
}

export const journal: JournalEntry[] = [
  {
    id: "j1",
    date: "Jul 12",
    decision: "Protect the 09:00 deep-work block",
    reason: "Focus peaked in the first two hours across 14 logged sessions.",
    result: "Focus climbed from 71% to 88% within nine days.",
    outcome: "followed",
    delta: 17,
  },
  {
    id: "j2",
    date: "Jul 19",
    decision: "Cut the second evening study session",
    reason: "Recovery baseline was dropping while retention flattened.",
    result: "Ignored — recovery fell another 6 points.",
    outcome: "ignored",
    delta: -6,
  },
  {
    id: "j3",
    date: "Jul 26",
    decision: "Ship one small project per week",
    reason: "Applied practice outperformed passive reading 3:1 in your history.",
    result: "Two of four weeks completed; Programming +9.",
    outcome: "partial",
    delta: 9,
  },
  {
    id: "j4",
    date: "Aug 01",
    decision: "Reopen the outreach loop",
    reason: "Career node was dormant for 31 days despite rising craft.",
    result: "Warm intro secured with a Senior AI Engineer.",
    outcome: "followed",
    delta: 11,
  },
];

export const exampleQuestions = [
  "What should I learn next?",
  "How close am I to my goal?",
  "Why did my focus decrease?",
  "What skill unlocks the biggest opportunity?",
];
