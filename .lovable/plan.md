# Phase 4 — Adaptive Mission Engine

Add a new `/missions` route ("Mission Center — Today's Evolution Path") that reuses the existing LifeOS glass + neon language. No changes to Phase 1/2/3 pages beyond adding a single entry-point button. Mock data only.

## Route & entry points
- New file: `src/routes/missions.tsx` — head title "Mission Center — LifeOS", meta description "Today's Evolution Path — CORE-designed daily missions".
- Add a neon "◆ Mission Center" button in `/home` header (next to Open CORE / Open System).
- Add matching header links in `/system` and `/core` headers for parity.

## Mock data
- New file: `src/lib/missions-mock.ts` exporting:
  - `missionStatus` (status, difficulty, ETA, expectedGrowth, confidence %, generatedAt).
  - `categories` — 8 entries (Main, Side, Recovery, Learning, Fitness, Focus, Creative, Career), each with icon, tone (primary/cyan/violet), tagline, duration, difficulty, xp.
  - `missionDetail` — name, objective, reason, duration, difficulty, growthAreas[], expectedOutcome, prepTips[].
  - `growthProjection` — Programming +12, Focus +8, Discipline +5, Health +3, Learning +9.
  - `timeline` — Preparation → Execution → Reflection → Completion (each with time + blurb + state).
  - `coreExplanation` — calm intelligent paragraph.
  - `reflectionPrompts` — 3 questions.

## New components (`src/components/lifeos/missions/`)
- `MissionHeroCard.tsx` — large glass card with animated status ring, difficulty chip, ETA, expected growth, confidence bar (uses `useCountUp`), generated timestamp, subtle scanning-line motion.
- `MissionCard.tsx` — category tile with icon badge, tagline, duration/difficulty/xp meta, tone-based accent border + hover glow lift.
- `MissionDetailCard.tsx` — structured layout: name, objective, "Why CORE selected this", meta grid (duration/difficulty), growth-area chips, expected outcome, preparation tips list with check glyphs.
- `GrowthProjection.tsx` — vertical list of animated bars (Framer Motion width animation) with count-up percentages and tone colors.
- `MissionTimeline.tsx` — 4-step animated vertical timeline (Preparation/Execution/Reflection/Completion) with connecting neon line drawn via `pathLength`, pulsing active node.
- `MissionReason.tsx` — dedicated CORE explanation card, calm tone, orb glyph, quoted paragraph.
- `MissionControls.tsx` — button row: Accept Mission (primary neon), Regenerate, Save For Later, Skip Today, Preview Tomorrow (disabled "Coming Soon" chip). Buttons are visual only.
- `ReflectionCard.tsx` — placeholder card with three prompts and disabled glass textareas.
- `AmbientParticles.tsx` — small reusable floating-particles layer (motion divs w/ randomized slow drift) for hero background. Kept lightweight.

## Page composition (`/missions`)
Sections wrapped in the existing `Section` pattern (eyebrow + title, staggered fade-in):
1. Header (LogoMark + links back to Home / CORE / System).
2. Hero — `AmbientParticles` + `MissionHeroCard` with title "Mission Center" and subtitle "Today's Evolution Path".
3. CORE Explanation — `MissionReason`.
4. Mission Categories — responsive grid of 8 `MissionCard`s.
5. Today's Mission Detail — `MissionDetailCard`.
6. Growth Projection — `GrowthProjection` inside an `AnalysisCard` (reuse existing).
7. Mission Timeline — `MissionTimeline` inside `AnalysisCard`.
8. Mission Controls — `MissionControls`.
9. Reflection — `ReflectionCard`.

## Motion & polish
- Reuse `useCountUp` for confidence %, XP, growth %s.
- Staggered section entrances matching `/core` and `/system`.
- Hover glow + subtle lift on category cards using existing tokens.
- All colors, radii, glass utilities, gradients come from `src/styles.css` — no new tokens.

## Out of scope
No mission logic, no persistence, no AI, no backend, no notifications, no edits to prior pages beyond adding entry-point buttons.
