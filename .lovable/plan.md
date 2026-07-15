## Phase 7 — CORE Evolution Engine

Build a new `/evolution` route that presents CORE's daily Evolution Review — how today's choices shape long-term growth. Pure UI + mock data, matching the existing futuristic glass/neon identity (no redesigns to prior pages).

### Route & navigation
- New file: `src/routes/evolution.tsx` with head meta ("Evolution Review — How Today Changed You").
- Add "◈ Evolution" links to existing headers on `/home`, `/core`, `/missions`, `/system`, `/genome`, `/memory` (nav-only additions).

### Mock data
- New `src/lib/evolution-mock.ts`:
  - Today's evolution: `{ growth, setbacks, net, score }` (percent values).
  - Evolution summary lines (consistency strengthened, programming +, recovery -, etc.).
  - Decision impacts: array of `{ title, type: positive|negative, effects: [{label, delta}], reason }` (e.g. Completed Coding Session, Skipped Exercise, Deep Focus Block, Late Sleep).
  - Trajectory series: 14-day array of `{ day, score, direction }`; overall direction label ("Improving").
  - Future projection: `{ days30, days90, days365 }` each with level delta, score, headline.
  - Alternate timelines: array of counterfactuals `{ choice, actual, alternate, deltaLabel, tone }`.
  - Reflections: `{ improved[], slowed[], changeTomorrow[] }`.
  - Tomorrow preview: `{ energy, focus, challenges[], mission }`.
  - Evolution Score breakdown across 7 axes (Learning, Health, Focus, Discipline, Relationships, Creativity, Career) with per-axis score and delta.

### Components (`src/components/lifeos/evolution/`)
- `EvolutionHero.tsx` — animated radial chart showing today's evolution %, with growth/setbacks/net/score tiles.
- `EvolutionSummary.tsx` — glass card listing CORE's narrative summary lines with tone-colored glyphs.
- `DecisionImpactCard.tsx` — decision card (title, positive/negative tone, chip list of effects, reason line).
- `TrajectoryGraph.tsx` — animated SVG line/area chart of the 14-day evolution score with direction label and glowing marker.
- `ProjectionCard.tsx` — futuristic card for 30/90/365-day projections (used 3× in a grid).
- `TimelineComparison.tsx` — alternate timeline visualization: side-by-side dual paths (actual vs alternate) with animated divergence and delta callout.
- `ReflectionCard.tsx` — three-column reflection card (improved / slowed / change tomorrow) with animated bullet reveal.
- `TomorrowPreview.tsx` — glass card showing projected energy ring, recommended focus, likely challenges, suggested mission.
- `EvolutionScoreRadar.tsx` — animated radar/heptagon chart across the 7 axes with per-axis score + delta chips.
- `EvolutionParticles.tsx` — ambient particles (reuse pattern from memory/genome).

### Page layout (top → bottom)
1. Hero — "Evolution Review / How Today Changed You" with ambient particles + `EvolutionHero` radial.
2. `EvolutionSummary` — CORE's narrative of the day.
3. Decision Impact grid — `DecisionImpactCard` × N.
4. `TrajectoryGraph` — 14-day direction chart.
5. Future Projection grid — three `ProjectionCard`s (30/90/365 days).
6. `TimelineComparison` — alternate-choice visualizations.
7. `ReflectionCard` — improved / slowed / change tomorrow.
8. `TomorrowPreview`.
9. `EvolutionScoreRadar` — 7-axis Evolution Score.

### Design & motion
- Reuse existing tokens: glass surfaces, neon shadows, tone colors from `genome-mock` (primary/cyan/violet/destructive/etc.).
- Framer Motion: staggered fade-ins per section, animated radial fill on hero, path-length draw on trajectory, traveling gradient on alternate timelines, radar polygon draw-in, glowing card hovers.
- No new theme tokens, no changes to existing pages beyond one nav link each.

### Out of scope
No backend, no AI, no database, no real calculations. Mock data only.
