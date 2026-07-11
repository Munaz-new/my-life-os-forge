# Phase 3 — CORE Intelligence Interface

Add a new `/core` route styled with the existing LifeOS glass + neon language (no changes to prior pages, tokens, or nav patterns). All data is mock; no backend, AI, or APIs.

## Route & entry point
- New file: `src/routes/core.tsx` (title "CORE — LifeOS", meta description "Personal Intelligence Center").
- Add a prominent "Open CORE" neon button in the `/home` dashboard header, next to the existing "Open System Window" button. Also add a small CORE link in the `/system` header for parity. No other layout changes.

## Mock data
- New file: `src/lib/core-mock.ts` exporting: `dailyBriefing`, `priorities` (3), `energyRings` (5 metrics), `opportunities`, `risks`, `momentum` (morning/afternoon/evening projected productivity points), `weeklyIntelligence`, `recommendations`, `quickActions`.

## New reusable components (`src/components/lifeos/core/`)
- `CoreOrb.tsx` — layered radial-gradient orb (cyan→violet), slow breathing scale + opacity pulse via Framer Motion, soft outer glow rings, subtle rotating conic shimmer. Below: "CORE ONLINE" label, "All Systems Operational" status with animated pulse dot, mock sync timestamp.
- `BriefingCard.tsx` — large glass card: greeting, "Yesterday Summary" bullet list with check/cross glyphs, "Today's Strategy" paragraph, productive-window row, and a `ProgressRing` (reuse existing) showing Focus Score with count-up.
- `PriorityCard.tsx` — three-card grid (Deep Work / Health / Learning): duration, importance chip, energy requirement bar, expected impact.
- `EnergyRing.tsx` — small animated SVG ring; used in an `AnalysisCard` grid for Energy / Focus / Recovery / Mental Load / Stress.
- `AnalysisCard.tsx` — generic titled glass container used for Energy, Weekly Intelligence, Momentum sections.
- `OpportunityCard.tsx` — icon, title, meta row (Potential Growth, Est. XP, Difficulty, Impact) with subtle hover lift.
- `RiskCard.tsx` — soft amber/cyan warning styling (no red alarms), warning glyph, title, one-line detail, severity chip.
- `MomentumChart.tsx` — horizontal SVG area/line chart across Morning → Afternoon → Evening with animated stroke draw (`pathLength`) and gradient fill; axis labels underneath.
- `RecommendationCard.tsx` — title, reason, expected benefit, confidence % bar.
- `CoreCommandButton.tsx` — floating bottom-right neon button; click expands a glass command palette (Framer Motion `AnimatePresence`) listing Quick Actions: Daily Briefing, Refresh Analysis, View Progress, Open System (links `/system`), Future AI Chat (disabled "Coming Soon" chip). Click-outside + Esc close.

## Page composition (`/core`)
Sections in order, each wrapped in the existing `Section` pattern (eyebrow + title, staggered fade-in):
1. Hero — `AmbientBackground` + centered `CoreOrb` + status stack.
2. Daily Briefing — `BriefingCard`.
3. Today's Priorities — 3-column `PriorityCard` grid.
4. Energy Analysis — `AnalysisCard` with 5 `EnergyRing`s.
5. Opportunity Scanner — grid of `OpportunityCard`s.
6. Risk Detection — grid of `RiskCard`s.
7. Momentum Timeline — `AnalysisCard` wrapping `MomentumChart`.
8. Weekly Intelligence — `AnalysisCard` with 6 stat tiles (reuse count-up hook).
9. CORE Recommendations — grid of `RecommendationCard`s.

Floating `CoreCommandButton` mounted at page root (bottom-right, offset from existing FloatingStatusPanel if `/core` reuses it — it does not; only System has that panel).

## Motion & polish
- Reuse `useCountUp` for all numeric values (focus score, XP, confidence, energy metrics, weekly stats).
- Add a lightweight ambient-particles layer (absolute-positioned motion divs with randomized slow drift) behind the hero orb only — no perf-heavy canvas.
- Staggered section entrances via existing pattern already used in `/system`.
- All colors, radii, glass utilities, gradients, and typography come from existing tokens in `src/styles.css` — no new palette.

## Out of scope (explicit)
No AI calls, no DB, no auth changes, no notifications, no edits to Phase 1/2 pages beyond adding the entry-point button(s).
