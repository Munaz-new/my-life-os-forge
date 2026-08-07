# Phase 12 — CORE Future Simulator

A new cinematic scenario-planning page at `/future`, built with the same glass + neon language as Twin, Knowledge and Evolution. All data is mock; no backend, APIs or AI.

## Page

**Future Simulator — Explore the Future You're Creating**

1. **Hero** — animated timeline stretching to the horizon with flowing light particles, center label "Future Simulation Ready", and three glowing paths (Best Case, Expected Path, Risk Path) at different glow intensities. Clicking a path selects it and re-tints the page accents.
2. **Current Direction** — compact stat strip: Current Goal, Estimated Progress, Growth Momentum, Evolution Confidence, Current Trajectory.
3. **Scenario Cards** — three large premium cards (continue current habits / +30% study time / consistency decreases). Each shows estimated goal completion, growth rate, confidence, risks and benefits. Selecting one drives the timeline and chart.
4. **Timeline Projection** — interactive horizon selector (30 Days, 90 Days, 6 Months, 1 Year, 3 Years) with animated transitions between scenarios, plus a trajectory chart drawing three scenario curves.
5. **Turning Points** — moments that could reshape the future (portfolio, exams, Docker, first published project, sleep consistency), each with a short "why this matters" note and an impact weight.
6. **Opportunity Forecast** — high-impact opportunities, hidden strengths, emerging skills, recommended investments.
7. **Risk Forecast** — calm, constructive warning cards (burnout, knowledge gap, momentum, recovery) with guidance, never alarming wording.
8. **What-If Simulator** — sliders for Programming, Sleep, Screen Time, Exercise, Reading that recompute projected outcomes and the trajectory chart live, with a Reset control.
9. **Future Reflection** — closing quote panel: "The future is not predicted. It is continuously created by today's decisions."

## Files

New mock module `src/lib/future-mock.ts` — paths, direction stats, scenarios, horizon projections, turning points, opportunity/risk forecasts, what-if inputs and a pure `projectFuture()` function.

New components under `src/components/lifeos/future/`:
`FutureParticles`, `FutureTimeline` (hero), `ScenarioCard`, `TrajectoryChart`, `TurningPointCard`, `OpportunityForecast`, `RiskForecast`, `SimulationControl`.

New route `src/routes/future.tsx` with its own `head()` metadata (unique title/description/og tags), wired to `useCoreModule` and emitting CORE events on scenario switches and what-if changes, matching the Twin page pattern.

## Navigation

Add a "◎ Future" link to the dashboard and to the shared header link rows on all existing module pages, in the same style as the existing Twin/Knowledge links. No existing page layouts or styles change.

## Technical notes

- Framer Motion for path glow, timeline flow, particle drift and value transitions; SVG for trajectory curves and the hero timeline.
- Colors come from existing design tokens (`toneVar` / semantic CSS vars) — no hardcoded color utilities.
- What-if math is a deterministic weighted function in `future-mock.ts`, kept out of components.
