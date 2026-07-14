import type { Tone } from "./genome-mock";

export interface MemoryCategory {
  key: string;
  label: string;
  glyph: string;
  tone: Tone;
}

export const categories: MemoryCategory[] = [
  { key: "goals", label: "Goals", glyph: "◎", tone: "primary" },
  { key: "projects", label: "Projects", glyph: "◆", tone: "cyan" },
  { key: "achievements", label: "Achievements", glyph: "✦", tone: "violet" },
  { key: "skills", label: "Skills", glyph: "❋", tone: "primary" },
  { key: "habits", label: "Habits", glyph: "◈", tone: "cyan" },
  { key: "preferences", label: "Preferences", glyph: "◐", tone: "violet" },
  { key: "learning", label: "Learning Style", glyph: "◉", tone: "primary" },
  { key: "moments", label: "Important Moments", glyph: "❖", tone: "cyan" },
  { key: "milestones", label: "Milestones", glyph: "▲", tone: "violet" },
  { key: "career", label: "Career", glyph: "☗", tone: "primary" },
  { key: "health", label: "Health", glyph: "✚", tone: "cyan" },
  { key: "relationships", label: "Relationships", glyph: "♁", tone: "violet" },
  { key: "books", label: "Books", glyph: "☰", tone: "primary" },
  { key: "courses", label: "Courses", glyph: "☱", tone: "cyan" },
  { key: "ideas", label: "Ideas", glyph: "✧", tone: "violet" },
  { key: "dreams", label: "Dreams", glyph: "☾", tone: "primary" },
];

export const categoryByKey = Object.fromEntries(categories.map((c) => [c.key, c]));

export interface Memory {
  id: string;
  title: string;
  summary: string;
  category: string;
  createdAt: string; // ISO
  updatedAt: string;
  confidence: number; // 0..100
  importance: 1 | 2 | 3 | 4 | 5;
  pinned?: boolean;
  fading?: number; // 0..1
  related: string[];
  tags: string[];
  bucket: "today" | "week" | "month" | "year";
}

const iso = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

export const memories: Memory[] = [
  {
    id: "m.ai-engineer",
    title: "Become AI Engineer",
    summary:
      "North-star career objective. Transition from generalist developer into a specialized AI systems engineer within 18 months.",
    category: "goals",
    createdAt: iso(320),
    updatedAt: iso(2),
    confidence: 96,
    importance: 5,
    pinned: true,
    related: ["m.python", "m.ml", "m.resumeai", "m.mlops-course"],
    tags: ["north-star", "career"],
    bucket: "year",
  },
  {
    id: "m.graduate",
    title: "Graduate College",
    summary: "Final semester in progress. Thesis on adaptive learning agents.",
    category: "goals",
    createdAt: iso(600),
    updatedAt: iso(12),
    confidence: 92,
    importance: 5,
    pinned: true,
    related: ["m.thesis"],
    tags: ["academic"],
    bucket: "year",
  },
  {
    id: "m.launch-evolve",
    title: "Launch EVOLVE",
    summary:
      "Ship the Life OS to first 100 operators. Focus on onboarding clarity and CORE briefings.",
    category: "projects",
    createdAt: iso(90),
    updatedAt: iso(0),
    confidence: 88,
    importance: 5,
    pinned: true,
    related: ["m.resumeai", "m.launch-plan"],
    tags: ["build", "launch"],
    bucket: "today",
  },
  {
    id: "m.improve-health",
    title: "Improve Health",
    summary: "Restore baseline: 7 hours sleep, 3x strength, sub-30 resting HR.",
    category: "health",
    createdAt: iso(220),
    updatedAt: iso(1),
    confidence: 84,
    importance: 5,
    pinned: true,
    related: ["m.sleep", "m.strength"],
    tags: ["baseline"],
    bucket: "year",
  },
  {
    id: "m.resumeai",
    title: "ResumeAI",
    summary: "Side project — AI resume tailoring tool. First real ML shipping experience.",
    category: "projects",
    createdAt: iso(150),
    updatedAt: iso(4),
    confidence: 90,
    importance: 4,
    related: ["m.python", "m.ml", "m.ai-engineer"],
    tags: ["ml", "shipped"],
    bucket: "month",
  },
  {
    id: "m.python",
    title: "Python Fluency",
    summary: "Primary language. Comfortable with async, typing, packaging.",
    category: "skills",
    createdAt: iso(500),
    updatedAt: iso(3),
    confidence: 94,
    importance: 4,
    related: ["m.ml", "m.resumeai"],
    tags: ["language"],
    bucket: "week",
  },
  {
    id: "m.ml",
    title: "Machine Learning",
    summary: "Fundamentals + transformers. Building intuition through applied projects.",
    category: "skills",
    createdAt: iso(200),
    updatedAt: iso(5),
    confidence: 76,
    importance: 5,
    related: ["m.python", "m.ai-engineer", "m.mlops-course"],
    tags: ["ml"],
    bucket: "week",
  },
  {
    id: "m.mlops-course",
    title: "MLOps Specialization",
    summary: "In-progress course. Chapter 3 of 6. Pipelines and monitoring next.",
    category: "courses",
    createdAt: iso(45),
    updatedAt: iso(6),
    confidence: 70,
    importance: 4,
    related: ["m.ml", "m.ai-engineer"],
    tags: ["learning"],
    bucket: "month",
  },
  {
    id: "m.deep-work-book",
    title: "Deep Work — Cal Newport",
    summary: "Reshaped focus practice. Adopted 90-minute deep blocks.",
    category: "books",
    createdAt: iso(180),
    updatedAt: iso(30),
    confidence: 82,
    importance: 4,
    related: ["m.focus-habit"],
    tags: ["focus"],
    bucket: "month",
  },
  {
    id: "m.focus-habit",
    title: "Morning Deep Block",
    summary: "90 minutes of single-task work before 10am. Consistency: 84%.",
    category: "habits",
    createdAt: iso(120),
    updatedAt: iso(0),
    confidence: 88,
    importance: 4,
    related: ["m.deep-work-book"],
    tags: ["focus", "daily"],
    bucket: "today",
  },
  {
    id: "m.sleep",
    title: "Sleep Ritual",
    summary: "Lights down 22:30, no screens. Sleep score improving weekly.",
    category: "habits",
    createdAt: iso(60),
    updatedAt: iso(1),
    confidence: 74,
    importance: 3,
    related: ["m.improve-health"],
    tags: ["recovery"],
    bucket: "week",
  },
  {
    id: "m.strength",
    title: "Strength Training",
    summary: "3x/week compound lifts. Squat 1.4x bodyweight target.",
    category: "habits",
    createdAt: iso(200),
    updatedAt: iso(2),
    confidence: 80,
    importance: 3,
    related: ["m.improve-health"],
    tags: ["fitness"],
    bucket: "week",
  },
  {
    id: "m.first-shipped",
    title: "First Product Shipped",
    summary: "Landmark: first paying user for ResumeAI. Proof of loop.",
    category: "achievements",
    createdAt: iso(70),
    updatedAt: iso(70),
    confidence: 100,
    importance: 5,
    related: ["m.resumeai"],
    tags: ["milestone"],
    bucket: "month",
  },
  {
    id: "m.mentor",
    title: "Met Mentor — S.",
    summary: "Weekly calls. Reframed career strategy toward research-adjacent roles.",
    category: "relationships",
    createdAt: iso(100),
    updatedAt: iso(7),
    confidence: 86,
    importance: 4,
    related: ["m.ai-engineer"],
    tags: ["mentor"],
    bucket: "week",
  },
  {
    id: "m.learning-style",
    title: "Learns by Building",
    summary: "Retention 3x higher when new theory ships as tiny prototypes within 48h.",
    category: "learning",
    createdAt: iso(160),
    updatedAt: iso(10),
    confidence: 89,
    importance: 4,
    related: ["m.ml", "m.resumeai"],
    tags: ["meta"],
    bucket: "month",
  },
  {
    id: "m.thesis",
    title: "Thesis: Adaptive Agents",
    summary: "Draft 60% complete. Advisor feedback strong on chapter 2.",
    category: "milestones",
    createdAt: iso(140),
    updatedAt: iso(9),
    confidence: 78,
    importance: 4,
    related: ["m.graduate"],
    tags: ["academic"],
    bucket: "week",
  },
  {
    id: "m.launch-plan",
    title: "EVOLVE Launch Plan",
    summary: "Soft launch to inner circle, then 100 operators via Twitter thread.",
    category: "projects",
    createdAt: iso(20),
    updatedAt: iso(0),
    confidence: 72,
    importance: 4,
    related: ["m.launch-evolve"],
    tags: ["strategy"],
    bucket: "today",
  },
  {
    id: "m.idea-copilot",
    title: "Idea — Life Copilot",
    summary: "Ambient voice CORE that whispers priorities during walks. Prototype worth 1 weekend.",
    category: "ideas",
    createdAt: iso(11),
    updatedAt: iso(11),
    confidence: 55,
    importance: 3,
    related: ["m.launch-evolve"],
    tags: ["exploration"],
    bucket: "week",
  },
  {
    id: "m.dream-ai-lab",
    title: "Run My Own AI Lab",
    summary: "10-year horizon: independent research lab focused on human-AI symbiosis.",
    category: "dreams",
    createdAt: iso(400),
    updatedAt: iso(60),
    confidence: 62,
    importance: 5,
    related: ["m.ai-engineer"],
    tags: ["horizon"],
    bucket: "year",
  },
  {
    id: "m.pref-dark",
    title: "Prefers Dark, Minimal UI",
    summary: "High-contrast neon on deep backgrounds. Rejects skeuomorphic textures.",
    category: "preferences",
    createdAt: iso(300),
    updatedAt: iso(45),
    confidence: 93,
    importance: 2,
    related: [],
    tags: ["design"],
    bucket: "year",
  },
  {
    id: "m.moment-first-quest",
    title: "First CORE Briefing",
    summary: "The moment the system felt alive. Anchor memory for the product vision.",
    category: "moments",
    createdAt: iso(85),
    updatedAt: iso(85),
    confidence: 100,
    importance: 5,
    related: ["m.launch-evolve"],
    tags: ["origin"],
    bucket: "month",
  },
  // Fading memories
  {
    id: "m.old-language",
    title: "Ruby on Rails",
    summary: "Once daily-driver. Unused for 3 years — pattern recall degrading.",
    category: "skills",
    createdAt: iso(1500),
    updatedAt: iso(400),
    confidence: 34,
    importance: 2,
    fading: 0.78,
    related: [],
    tags: ["legacy"],
    bucket: "year",
  },
  {
    id: "m.old-project",
    title: "MarketPulse (Archived)",
    summary: "Trading dashboard from 2022. Context faint. Refresh if strategy still relevant.",
    category: "projects",
    createdAt: iso(1200),
    updatedAt: iso(500),
    confidence: 28,
    importance: 2,
    fading: 0.85,
    related: [],
    tags: ["archived"],
    bucket: "year",
  },
  {
    id: "m.old-goal",
    title: "Learn Japanese",
    summary: "Stalled at N5. Signal fading — decide: refresh, park, or drop.",
    category: "goals",
    createdAt: iso(800),
    updatedAt: iso(220),
    confidence: 22,
    importance: 2,
    fading: 0.9,
    related: [],
    tags: ["language"],
    bucket: "year",
  },
];

export const memoryById = Object.fromEntries(memories.map((m) => [m.id, m]));

export const pinnedMemories = memories.filter((m) => m.pinned);
export const fadingMemories = memories.filter((m) => (m.fading ?? 0) > 0.5);
export const activeMemories = memories.filter((m) => !(m.fading && m.fading > 0.5));

export const connectionChain = [
  "m.resumeai",
  "m.python",
  "m.ml",
  "m.ai-engineer",
];

export const searchSuggestions = {
  recent: ["EVOLVE launch", "ResumeAI", "Deep Work", "MLOps"],
  popular: ["AI Engineer", "Focus", "Python", "Thesis"],
  pinned: pinnedMemories.map((m) => m.title),
};

export const memoryStats = {
  total: memories.length,
  pinned: pinnedMemories.length,
  fading: fadingMemories.length,
  avgConfidence: Math.round(
    memories.reduce((s, m) => s + m.confidence, 0) / memories.length,
  ),
};
