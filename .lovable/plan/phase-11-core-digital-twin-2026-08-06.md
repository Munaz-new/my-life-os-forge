# Phase 11 — CORE Digital Twin

A new `/twin` page: a living model of the user rendered as a breathing holographic figure, surrounded by state panels, readiness scores, an interactive growth simulator, and CORE's observations. Mock data only, same premium futuristic language as the rest of EVOLVE.

## Page

Route `src/routes/twin.tsx` — title "Digital Twin", subtitle "Your Living Evolution Model". Same header/nav pattern as `/knowledge` and `/decisions`, with a "◬ Twin" link added to the dashboard and every module header.

## Sections

1. **Hero — TwinModel**: abstract holographic silhouette built from layered SVG geometry (head/torso/limb shapes as glowing polygons, orbiting rings, scan line), continuous breathing scale animation, blue/cyan/violet gradients, soft particle field behind it. Body regions light up on hover/selection and link to the matching state card.
2. **Body Sections**: ten `TwinStateCard`s — Mind, Body, Knowledge, Career, Health, Focus, Creativity, Discipline, Recovery, Communication. Each shows current state value, trend sparkline with up/down direction, confidence bar, growth velocity.
3. **Twin Health**: overall Twin Stability ring plus animated meters for Energy, Recovery, Learning Capacity, Stress.
4. **Twin Readiness**: `TwinReadiness` cards for AI Engineer, Startup Founder, Backend Developer, Public Speaker, Fitness Goal — animated radial score, gap note, contributing factors.
5. **Growth Simulator**: `GrowthSimulation` with sliders (Programming, Training, Sleep, Communication). Moving one recomputes derived mock outputs — Career, Projects, Learning, AI Readiness — with animated deltas and a reset control. Purely local formula math, no persistence.
6. **Twin Comparison**: tabbed Today / 1 Month Ago / 6 Months Ago / Projected Future. Switching morphs the twin's aura intensity and animates the axis bars between snapshots.
7. **Behavior Patterns**: `BehaviorPattern` cards for Morning Focus, Night Productivity, Learning Style, Recovery Pattern — each with a small 24h or weekly rhythm chart.
8. **CORE Observations**: `TwinInsight` cards with the narrative lines (strongest growth area, limiting factor, emerging traits).
9. **Recommendations**: cards showing reason, expected impact, priority, confidence.

## Technical notes

- `src/lib/twin-mock.ts` — twin axes, health metrics, readiness targets, simulator base weights, comparison snapshots, behavior patterns, observations, recommendations. Reuses the existing `Tone` token helper so colors stay on design tokens.
- Components under `src/components/lifeos/twin/`: `TwinParticles`, `TwinModel`, `TwinPanel`, `TwinStateCard`, `TwinHealth`, `TwinReadiness`, `GrowthSimulation`, `BehaviorPattern`, `TwinInsight`.
- Framer Motion for breathing, pulses, and snapshot transitions; SVG for the hologram and all charts.
- Registers with the CORE engine via `useCoreModule` and emits events on simulator changes and insight interactions, matching Phase 8 conventions.
- No backend, no AI, no APIs; existing pages untouched apart from the added nav link.
