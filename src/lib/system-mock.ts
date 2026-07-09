export const operator = {
  name: "Operator",
  title: "Ascendant Architect",
  rank: "Ascendant II",
  level: 17,
  totalXp: 24820,
  xpInLevel: 2340,
  xpToNext: 3200,
  memberSince: "March 2025",
  initials: "OP",
};

export type Trend = "up" | "down" | "flat";

export const attributes: Array<{
  key: string;
  name: string;
  icon: string;
  level: number;
  value: number;
  max: number;
  trend: Trend;
  tone: "primary" | "cyan" | "violet";
}> = [
  { key: "focus", name: "Focus", icon: "◎", level: 8, value: 720, max: 1000, trend: "up", tone: "primary" },
  { key: "discipline", name: "Discipline", icon: "◈", level: 6, value: 580, max: 1000, trend: "up", tone: "cyan" },
  { key: "knowledge", name: "Knowledge", icon: "✦", level: 9, value: 830, max: 1000, trend: "up", tone: "primary" },
  { key: "creativity", name: "Creativity", icon: "❋", level: 5, value: 460, max: 1000, trend: "flat", tone: "violet" },
  { key: "health", name: "Health", icon: "♡", level: 4, value: 410, max: 1000, trend: "down", tone: "cyan" },
  { key: "communication", name: "Communication", icon: "◐", level: 6, value: 630, max: 1000, trend: "up", tone: "primary" },
  { key: "leadership", name: "Leadership", icon: "△", level: 5, value: 490, max: 1000, trend: "flat", tone: "violet" },
  { key: "energy", name: "Energy", icon: "⚡", level: 7, value: 670, max: 1000, trend: "up", tone: "cyan" },
];

export const statuses = [
  "Focused",
  "Learning",
  "In Flow",
  "Deep Work",
  "Exploring",
  "Building",
  "Healthy",
];

export const buffs = [
  { icon: "✦", name: "7-Day Study Streak", detail: "+8% Knowledge gain", timer: "2d 14h" },
  { icon: "◎", name: "Morning Routine", detail: "+5% Focus", timer: "18h 22m" },
  { icon: "⚡", name: "Exercise Bonus", detail: "+6% Energy", timer: "1d 04h" },
  { icon: "❋", name: "Reading Momentum", detail: "+4% Creativity", timer: "3d 08h" },
  { icon: "◈", name: "Deep Focus", detail: "+12% XP in flow", timer: "42m" },
  { icon: "♁", name: "Hydration", detail: "+3% Health regen", timer: "6h 10m" },
];

export const debuffs = [
  { icon: "◑", name: "Poor Sleep", detail: "-8% Focus", timer: "9h" },
  { icon: "⚠", name: "Low Energy", detail: "-5% XP gain", timer: "3h 40m" },
  { icon: "✕", name: "Missed Workout", detail: "-4% Health", timer: "1d" },
  { icon: "◌", name: "Procrastination Risk", detail: "Rising", timer: "—" },
  { icon: "▲", name: "Stress", detail: "-3% Discipline", timer: "5h" },
];

export const records = [
  { label: "Longest Streak", value: "42 days" },
  { label: "Highest XP Day", value: "1,820 XP" },
  { label: "Best Week", value: "9,240 XP" },
  { label: "Projects Completed", value: "23" },
  { label: "Books Finished", value: "17" },
  { label: "Hours Learned", value: "412 h" },
];

export const domains = [
  { key: "career", name: "Career", level: 12, progress: 68, spark: [10, 14, 12, 18, 20, 22, 26] },
  { key: "learning", name: "Learning", level: 14, progress: 82, spark: [8, 12, 16, 18, 22, 24, 30] },
  { key: "fitness", name: "Fitness", level: 7, progress: 41, spark: [14, 12, 15, 10, 12, 11, 13] },
  { key: "finance", name: "Finance", level: 9, progress: 54, spark: [12, 14, 13, 15, 17, 16, 19] },
  { key: "mindset", name: "Mindset", level: 11, progress: 73, spark: [10, 12, 14, 16, 18, 22, 24] },
  { key: "relationships", name: "Relationships", level: 8, progress: 47, spark: [12, 10, 11, 13, 12, 14, 15] },
  { key: "creativity", name: "Creativity", level: 10, progress: 61, spark: [8, 10, 12, 11, 14, 16, 18] },
];

export const milestones = [
  { type: "Level Up", icon: "▲", title: "Reached Level 17 — Ascendant II", time: "Today, 09:14" },
  { type: "Skill Increased", icon: "✦", title: "Knowledge +1 (Lv 9)", time: "Yesterday" },
  { type: "Achievement", icon: "◆", title: "Focus Master unlocked", time: "2 days ago" },
  { type: "Quest Completed", icon: "◎", title: "90-Minute Deep Focus", time: "3 days ago" },
  { type: "Streak Reached", icon: "⚡", title: "7-Day Study Streak", time: "5 days ago" },
];

export const quickStatus = {
  todaysFocus: "Deep Work · 2 blocks",
  energy: 78,
  mood: "Calm",
  systemStatus: "All subroutines nominal",
  recentAchievement: "Focus Master",
};
