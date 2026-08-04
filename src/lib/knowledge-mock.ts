import type { Tone } from "./genome-mock";

export type NodeKind = "core" | "domain" | "leaf";

export interface KNode {
  id: string;
  label: string;
  kind: NodeKind;
  parent?: string;
  tone: Tone;
  glyph: string;
  importance: number; // 0-100
  summary: string;
  trend: number[]; // 8 points
  growth: number; // %
  recommendations: string[];
  opportunities: string[];
}

export interface KEdge {
  from: string;
  to: string;
  strength: number; // 0-100
  confidence: number; // 0-100
  growth: number; // %
  influence: number; // 0-100
  note: string;
}

const spark = (base: number, seed = 1) =>
  Array.from({ length: 8 }, (_, i) =>
    Math.max(2, Math.round(base + Math.sin((i + seed) * 0.8) * 6 + (i - 3) * 1.6)),
  );

export const coreNode: KNode = {
  id: "you",
  label: "YOU",
  kind: "core",
  tone: "primary",
  glyph: "◉",
  importance: 100,
  summary:
    "The origin node. Everything CORE understands about you radiates from here — goals, skills, projects, habits and the links between them.",
  trend: spark(62, 3),
  growth: 14,
  recommendations: ["Keep the Learning cluster active", "Reinforce weak Finance links"],
  opportunities: ["Cross-domain compounding is forming between Learning and Career"],
};

interface DomainSeed {
  id: string;
  label: string;
  glyph: string;
  tone: Tone;
  importance: number;
  growth: number;
  summary: string;
  recommendations: string[];
  opportunities: string[];
  children: [string, string, number, number][]; // label, glyph, importance, growth
}

const domainSeeds: DomainSeed[] = [
  {
    id: "goals",
    label: "Goals",
    glyph: "✧",
    tone: "primary",
    importance: 94,
    growth: 12,
    summary: "Your declared direction. Goals pull weight through every other cluster in the graph.",
    recommendations: ["Narrow to two active goals", "Attach a project to every goal"],
    opportunities: ["AI Engineer goal is 4 links away from completion readiness"],
    children: [
      ["AI Engineer", "◈", 92, 18],
      ["Financial Runway", "◆", 61, 5],
      ["Peak Health", "❋", 70, 9],
      ["Deep Work Identity", "◐", 78, 11],
    ],
  },
  {
    id: "skills",
    label: "Skills",
    glyph: "◉",
    tone: "cyan",
    importance: 91,
    growth: 16,
    summary: "Capabilities CORE has observed you exercising. The densest cluster in your graph.",
    recommendations: ["Push Linux from familiar to fluent", "Pair Databases with a live project"],
    opportunities: ["Linux + Python unlocks Docker readiness"],
    children: [
      ["Python", "◈", 88, 14],
      ["Linux", "▲", 64, 7],
      ["Communication", "✦", 59, 6],
      ["Leadership", "▲", 48, 4],
      ["Problem Solving", "❇", 81, 10],
      ["AI", "◉", 76, 24],
      ["Databases", "⬢", 55, 9],
    ],
  },
  {
    id: "projects",
    label: "Projects",
    glyph: "❖",
    tone: "violet",
    importance: 86,
    growth: 19,
    summary: "Where skills become evidence. Projects are the strongest converters in the graph.",
    recommendations: ["Ship ResumeAI before starting anything new"],
    opportunities: ["Portfolio completion raises interview readiness by 31%"],
    children: [
      ["ResumeAI", "◈", 84, 26],
      ["Portfolio", "❖", 72, 15],
      ["DBMS Course", "⬢", 51, 8],
      ["Home Lab", "▲", 44, 5],
    ],
  },
  {
    id: "habits",
    label: "Habits",
    glyph: "◐",
    tone: "primary",
    importance: 79,
    growth: 8,
    summary: "The repeating loops that keep every other cluster supplied with energy.",
    recommendations: ["Protect the morning deep-work block"],
    opportunities: ["A 21-day streak would stabilise the Discipline link"],
    children: [
      ["Deep Work", "◐", 82, 12],
      ["Sleep Window", "❋", 68, 6],
      ["Daily Review", "✦", 57, 9],
      ["Reading", "◈", 49, 3],
    ],
  },
  {
    id: "health",
    label: "Health",
    glyph: "❋",
    tone: "cyan",
    importance: 74,
    growth: 6,
    summary: "The substrate. Health links quietly multiply or throttle every other edge.",
    recommendations: ["Recovery is the cheapest performance gain available"],
    opportunities: ["Sleep consistency lifts Focus influence by 18%"],
    children: [
      ["Sleep", "❋", 71, 7],
      ["Training", "▲", 58, 10],
      ["Nutrition", "◆", 52, 2],
      ["Recovery", "◐", 46, -3],
    ],
  },
  {
    id: "learning",
    label: "Learning",
    glyph: "◈",
    tone: "primary",
    importance: 89,
    growth: 21,
    summary: "Your intake engine. Currently the fastest-growing cluster CORE tracks.",
    recommendations: ["Convert reading into a project within 7 days"],
    opportunities: ["Learning → Projects conversion rate is climbing"],
    children: [
      ["Systems Design", "❖", 63, 13],
      ["Machine Learning", "◉", 74, 27],
      ["Mathematics", "◆", 47, 5],
      ["Writing", "✦", 60, 8],
    ],
  },
  {
    id: "career",
    label: "Career",
    glyph: "▲",
    tone: "violet",
    importance: 83,
    growth: 11,
    summary: "Where evidence becomes leverage. Fed almost entirely by Projects and Skills.",
    recommendations: ["Publish one artefact per month"],
    opportunities: ["Portfolio → Interview readiness path is nearly complete"],
    children: [
      ["Interview Readiness", "◈", 66, 17],
      ["Network", "✦", 42, 4],
      ["Positioning", "❖", 55, 7],
      ["Craft Depth", "◉", 77, 9],
    ],
  },
  {
    id: "finance",
    label: "Finance",
    glyph: "◆",
    tone: "cyan",
    importance: 58,
    growth: 3,
    summary: "The weakest-linked cluster. Few edges connect Finance back into the network.",
    recommendations: ["Automate one saving rule to create a habit edge"],
    opportunities: ["Income link could attach directly to Career craft"],
    children: [
      ["Saving", "◆", 51, 3],
      ["Investing", "◉", 38, 6],
      ["Income", "▲", 62, 5],
    ],
  },
  {
    id: "relationships",
    label: "Relationships",
    glyph: "✦",
    tone: "violet",
    importance: 66,
    growth: 4,
    summary: "Under-mapped but high influence. Relationship edges amplify Career and Mindset.",
    recommendations: ["Schedule one deep conversation weekly"],
    opportunities: ["Mentorship edge would raise Leadership growth"],
    children: [
      ["Close Circle", "✦", 69, 5],
      ["Mentorship", "▲", 41, 8],
      ["Community", "❖", 47, 3],
    ],
  },
  {
    id: "creativity",
    label: "Creativity",
    glyph: "❇",
    tone: "primary",
    importance: 71,
    growth: 13,
    summary: "The recombination cluster — it links distant nodes that logic would keep apart.",
    recommendations: ["Give ideation a container so it becomes output"],
    opportunities: ["Design taste is beginning to feed Portfolio quality"],
    children: [
      ["Design Taste", "❇", 68, 12],
      ["Ideation", "◈", 61, 9],
      ["Craft", "❖", 57, 6],
    ],
  },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const domains: KNode[] = domainSeeds.map((d, i) => ({
  id: d.id,
  label: d.label,
  kind: "domain",
  tone: d.tone,
  glyph: d.glyph,
  importance: d.importance,
  growth: d.growth,
  summary: d.summary,
  trend: spark(d.importance / 2, i),
  recommendations: d.recommendations,
  opportunities: d.opportunities,
}));

export const leaves: KNode[] = domainSeeds.flatMap((d, di) =>
  d.children.map((c, ci) => ({
    id: `${d.id}.${slug(c[0])}`,
    label: c[0],
    kind: "leaf" as const,
    parent: d.id,
    tone: d.tone,
    glyph: c[1],
    importance: c[2],
    growth: c[3],
    summary: `${c[0]} sits inside your ${d.label} cluster. CORE tracks it through ${2 + (ci % 3)} active links and ${c[3] >= 0 ? "rising" : "declining"} signal over the last 30 days.`,
    trend: spark(c[2] / 2, di + ci),
    recommendations: [
      c[3] > 8 ? `Momentum is high — add difficulty to ${c[0]}` : `Re-activate ${c[0]} with one small rep`,
      `Link ${c[0]} to an active project this week`,
    ],
    opportunities: [
      `${c[0]} strengthens ${d.label} readiness`,
      c[3] >= 0 ? `Compounding path detected via ${d.label}` : `Recovering this node would restore a weak edge`,
    ],
  })),
);

export const allNodes: KNode[] = [coreNode, ...domains, ...leaves];
export const nodeById = new Map(allNodes.map((n) => [n.id, n]));

const edge = (
  from: string,
  to: string,
  strength: number,
  confidence: number,
  growth: number,
  influence: number,
  note: string,
): KEdge => ({ from, to, strength, confidence, growth, influence, note });

// core -> domains
const coreEdges: KEdge[] = domains.map((d) =>
  edge(
    "you",
    d.id,
    d.importance,
    Math.min(98, 60 + Math.round(d.importance / 4)),
    d.growth,
    Math.round(d.importance * 0.9),
    `${d.label} is a primary axis of how CORE models you.`,
  ),
);

// domain -> leaves
const leafEdges: KEdge[] = leaves.map((l) =>
  edge(
    l.parent!,
    l.id,
    l.importance,
    Math.min(96, 55 + Math.round(l.importance / 3)),
    l.growth,
    Math.round(l.importance * 0.75),
    `${l.label} contributes directly to ${nodeById.get(l.parent!)?.label}.`,
  ),
);

// cross-cluster edges — the interesting ones
export const crossEdges: KEdge[] = [
  edge("skills.python", "projects.resumeai", 92, 94, 26, 88, "Python is the primary build language of ResumeAI."),
  edge("projects.resumeai", "projects.portfolio", 84, 90, 21, 80, "ResumeAI is the flagship artefact in your portfolio."),
  edge("projects.portfolio", "career.interview-readiness", 79, 87, 17, 84, "A finished portfolio is what interviews actually test."),
  edge("career.interview-readiness", "goals.ai-engineer", 88, 91, 18, 93, "Interview readiness is the last gate before the AI Engineer goal."),
  edge("skills.ai", "learning.machine-learning", 86, 92, 27, 82, "Applied AI work and ML study reinforce each other."),
  edge("learning.machine-learning", "projects.resumeai", 71, 83, 19, 74, "ML concepts are being tested inside ResumeAI."),
  edge("skills.linux", "projects.home-lab", 64, 78, 8, 61, "Home Lab is where Linux reps actually happen."),
  edge("skills.databases", "projects.dbms-course", 58, 80, 9, 66, "The DBMS course is the current source of database reps."),
  edge("habits.deep-work", "skills.problem-solving", 77, 85, 12, 79, "Uninterrupted blocks are where hard problems get solved."),
  edge("health.sleep", "habits.deep-work", 73, 88, 7, 81, "Sleep quality sets the ceiling for deep work."),
  edge("health.recovery", "health.training", 52, 74, -3, 58, "Recovery debt is currently throttling training gains."),
  edge("habits.reading", "learning.systems-design", 55, 71, 6, 57, "Reading is the main inflow to systems design."),
  edge("creativity.design-taste", "projects.portfolio", 66, 79, 12, 70, "Design taste raises the perceived quality of the portfolio."),
  
  edge("skills.communication", "career.network", 49, 72, 5, 63, "Communication reps convert into network reach."),
  edge("relationships.mentorship", "skills.leadership", 44, 68, 8, 71, "Mentoring others is the fastest leadership signal."),
  edge("finance.income", "goals.financial-runway", 62, 84, 5, 77, "Income growth is the only live input to runway."),
  edge("habits.daily-review", "goals.deep-work-identity", 57, 76, 9, 68, "Daily review keeps the identity goal self-correcting."),
  edge("health.training", "goals.peak-health", 58, 82, 10, 75, "Training volume is the main driver of the health goal."),
  edge("skills.python", "skills.ai", 80, 89, 20, 78, "Python fluency accelerates every AI experiment."),
].filter((e) => e.to !== "");

export const allEdges: KEdge[] = [...coreEdges, ...leafEdges, ...crossEdges];

export const neighborsOf = (id: string) =>
  allEdges
    .filter((e) => e.from === id || e.to === id)
    .map((e) => ({ edge: e, other: nodeById.get(e.from === id ? e.to : e.from)! }))
    .filter((x) => Boolean(x.other));

export interface RelationshipChain {
  id: string;
  title: string;
  path: string[]; // node ids
  narration: string[];
  conclusion: string;
  confidence: number;
}

export const chains: RelationshipChain[] = [
  {
    id: "python-career",
    title: "Python → AI Engineer",
    path: ["skills.python", "projects.resumeai", "projects.portfolio", "career.interview-readiness", "goals.ai-engineer"],
    narration: [
      "Python contributes to ResumeAI.",
      "ResumeAI strengthens your portfolio.",
      "Your portfolio raises interview readiness.",
      "Interview readiness supports your AI Engineer goal.",
    ],
    conclusion:
      "This is the shortest high-confidence path between what you practise daily and what you say you want.",
    confidence: 91,
  },
  {
    id: "sleep-output",
    title: "Sleep → Problem Solving",
    path: ["health.sleep", "habits.deep-work", "skills.problem-solving", "projects.resumeai"],
    narration: [
      "Sleep quality sets your deep-work ceiling.",
      "Deep work is where problem solving actually improves.",
      "Problem solving is the bottleneck skill inside ResumeAI.",
    ],
    conclusion: "Health is not a separate cluster — it is an upstream input to your build velocity.",
    confidence: 84,
  },
  {
    id: "linux-docker",
    title: "Linux → Infrastructure Readiness",
    path: ["skills.linux", "projects.home-lab", "skills.databases", "career.craft-depth"],
    narration: [
      "Linux reps happen almost exclusively in Home Lab.",
      "Home Lab is where database operations become tangible.",
      "That operational depth is what employers read as craft.",
    ],
    conclusion: "One dormant node (Home Lab) is holding back three connected capabilities.",
    confidence: 76,
  },
];

export interface Opportunity {
  id: string;
  title: string;
  detail: string;
  unlocks: string;
  readiness: number;
  lift: number;
  tone: Tone;
}

export const opportunities: Opportunity[] = [
  {
    id: "docker",
    title: "Improving Linux unlocks Docker readiness",
    detail: "Linux sits at 64% with a live Home Lab edge. Containers are the next natural node.",
    unlocks: "Docker · Deployment · Infra confidence",
    readiness: 64,
    lift: 22,
    tone: "cyan",
  },
  {
    id: "backend",
    title: "Completing DBMS increases Backend readiness",
    detail: "Databases is your thinnest technical edge; the course closes it in ~3 weeks.",
    unlocks: "Backend systems · API design",
    readiness: 51,
    lift: 28,
    tone: "primary",
  },
  {
    id: "interview",
    title: "Finishing Portfolio increases Interview readiness",
    detail: "Portfolio is 72% complete and feeds the highest-influence edge in the graph.",
    unlocks: "Interview readiness · Positioning",
    readiness: 72,
    lift: 31,
    tone: "violet",
  },
  {
    id: "mentorship",
    title: "One mentorship link would activate Leadership",
    detail: "Leadership is the lowest-connected skill node. Relationships can feed it directly.",
    unlocks: "Leadership · Community",
    readiness: 41,
    lift: 19,
    tone: "violet",
  },
  {
    id: "runway",
    title: "Automating savings creates a Finance habit edge",
    detail: "Finance has no habit edges. A single automation converts intent into structure.",
    unlocks: "Financial Runway · Discipline",
    readiness: 38,
    lift: 15,
    tone: "cyan",
  },
  {
    id: "writing",
    title: "Publishing writing links Learning to Career",
    detail: "Writing is at 60% but currently terminates — nothing consumes its output.",
    unlocks: "Positioning · Network",
    readiness: 60,
    lift: 24,
    tone: "primary",
  },
];

export const heatmap = {
  strongest: crossEdges
    .slice()
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 5),
  weakest: crossEdges
    .slice()
    .sort((a, b) => a.strength - b.strength)
    .slice(0, 5),
  emerging: crossEdges
    .slice()
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 5),
};

export interface FutureSnapshot {
  id: "30d" | "90d" | "1y";
  label: string;
  headline: string;
  newNodes: string[];
  strengthened: string[];
  density: number;
  clusters: number;
  confidence: number;
  narrative: string;
}

export const futures: FutureSnapshot[] = [
  {
    id: "30d",
    label: "30 Days",
    headline: "The build cluster tightens",
    newNodes: ["Docker", "API Design"],
    strengthened: ["Python → ResumeAI", "Portfolio → Interview Readiness"],
    density: 62,
    clusters: 6,
    confidence: 88,
    narrative:
      "ResumeAI ships. Two infrastructure nodes appear and the Projects cluster becomes the densest region of your graph.",
  },
  {
    id: "90d",
    label: "90 Days",
    headline: "Career edges thicken",
    newNodes: ["Docker", "API Design", "System Design Interviews", "Public Writing"],
    strengthened: ["Portfolio → Career", "Learning → Projects", "Skills → AI"],
    density: 74,
    clusters: 8,
    confidence: 76,
    narrative:
      "Learning stops terminating in itself. Every study node now has an outbound edge into a project or an artefact.",
  },
  {
    id: "1y",
    label: "1 Year",
    headline: "The graph becomes self-reinforcing",
    newNodes: ["Docker", "API Design", "Mentorship", "Speaking", "Investing System", "MLOps"],
    strengthened: ["Goals → Everything", "Relationships → Leadership", "Finance → Runway"],
    density: 89,
    clusters: 10,
    confidence: 61,
    narrative:
      "No cluster is isolated. Finance and Relationships — today's weak regions — carry real influence, and the AI Engineer goal is fully supported.",
  },
];
