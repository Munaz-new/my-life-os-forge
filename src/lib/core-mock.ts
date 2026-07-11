export const dailyBriefing = {
  greeting: "Good Morning, Hassan.",
  yesterday: [
    { icon: "✓", text: "2 goals completed", good: true },
    { icon: "▲", text: "Programming improved", good: true },
    { icon: "✦", text: "Reading streak maintained", good: true },
    { icon: "✕", text: "Workout missed", good: false },
  ],
  strategy: "Prioritize Deep Work before 11:30 AM.",
  windowLabel: "Estimated productive window",
  windowRange: "9:15 AM → 11:45 AM",
  focusScore: 89,
};

export type Priority = {
  rank: string;
  name: string;
  icon: string;
  duration: string;
  importance: "Critical" | "High" | "Medium";
  energy: number; // 0-100
  impact: string;
  accent: "primary" | "cyan" | "violet";
};

export const priorities: Priority[] = [
  {
    rank: "Priority One",
    name: "Deep Work",
    icon: "◎",
    duration: "2h 30m",
    importance: "Critical",
    energy: 85,
    impact: "+420 XP · Career",
    accent: "primary",
  },
  {
    rank: "Priority Two",
    name: "Health",
    icon: "♡",
    duration: "45m",
    importance: "High",
    energy: 55,
    impact: "+180 XP · Recovery",
    accent: "cyan",
  },
  {
    rank: "Priority Three",
    name: "Learning",
    icon: "✦",
    duration: "1h 15m",
    importance: "High",
    energy: 60,
    impact: "+260 XP · Knowledge",
    accent: "violet",
  },
];

export const energyRings: Array<{
  key: string;
  label: string;
  value: number;
  tone: "primary" | "cyan" | "violet";
}> = [
  { key: "energy", label: "Current Energy", value: 78, tone: "primary" },
  { key: "focus", label: "Focus", value: 84, tone: "primary" },
  { key: "recovery", label: "Recovery", value: 62, tone: "cyan" },
  { key: "mental", label: "Mental Load", value: 47, tone: "violet" },
  { key: "stress", label: "Stress", value: 32, tone: "cyan" },
];

export const opportunities = [
  {
    icon: "◆",
    title: "Finish your Python project today",
    growth: "Career +3%",
    xp: 320,
    difficulty: "Medium",
    impact: "High",
  },
  {
    icon: "✦",
    title: "Review Linux commands",
    growth: "Knowledge +2%",
    xp: 140,
    difficulty: "Easy",
    impact: "Medium",
  },
  {
    icon: "▲",
    title: "Continue AI Resume project",
    growth: "Career +4%",
    xp: 380,
    difficulty: "Hard",
    impact: "High",
  },
  {
    icon: "❋",
    title: "Read for 20 minutes",
    growth: "Mindset +1%",
    xp: 90,
    difficulty: "Easy",
    impact: "Medium",
  },
];

export const risks = [
  { icon: "◐", title: "Sleep deficit detected", detail: "6h 12m avg · below baseline", severity: "Moderate" },
  { icon: "◌", title: "Long sitting duration", detail: "Last break 2h 40m ago", severity: "Low" },
  { icon: "◇", title: "Study consistency decreasing", detail: "-14% vs last week", severity: "Moderate" },
  { icon: "⏱", title: "Upcoming deadline", detail: "Project review in 2 days", severity: "High" },
];

export const momentum = [
  { label: "6 AM", value: 24 },
  { label: "8 AM", value: 58 },
  { label: "Morning", value: 92 },
  { label: "12 PM", value: 74 },
  { label: "Afternoon", value: 61 },
  { label: "4 PM", value: 68 },
  { label: "Evening", value: 82 },
  { label: "10 PM", value: 38 },
];

export const weeklyIntelligence = [
  { label: "Best Performing Day", value: "Wednesday" },
  { label: "Current Growth Trend", value: "+12%" },
  { label: "Learning Velocity", value: "1.4x" },
  { label: "Focus Trend", value: "+8%" },
  { label: "Recovery Trend", value: "Stable" },
  { label: "Consistency Score", value: "82%" },
];

export const recommendations = [
  {
    title: "Delay difficult work until morning",
    reason: "Cognitive load peaks 9–11 AM based on your last 14 days.",
    benefit: "+18% task completion",
    confidence: 92,
  },
  {
    title: "Walk for 15 minutes",
    reason: "Sitting duration exceeds 2h. Micro-movement restores focus.",
    benefit: "+9% afternoon energy",
    confidence: 84,
  },
  {
    title: "Complete one coding challenge",
    reason: "Skill decay projected without daily reps.",
    benefit: "Programming +2%",
    confidence: 77,
  },
  {
    title: "Hydrate",
    reason: "Last water intake logged 3h ago.",
    benefit: "+5% cognitive clarity",
    confidence: 88,
  },
  {
    title: "Review yesterday's notes",
    reason: "Retention curve peaks in 24h window.",
    benefit: "+12% recall",
    confidence: 81,
  },
];

export const quickActions = [
  { icon: "◎", label: "Daily Briefing", detail: "Re-open today's plan" },
  { icon: "↻", label: "Refresh Analysis", detail: "Recompute signals" },
  { icon: "▲", label: "View Progress", detail: "Open dashboard" },
  { icon: "◈", label: "Open System", detail: "Operator matrix", to: "/system" as const },
  { icon: "✦", label: "AI Chat", detail: "Coming Soon", disabled: true },
];
