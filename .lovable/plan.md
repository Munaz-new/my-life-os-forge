
# Phase 5 — Evolution Genome

Add a new `/genome` route ("Evolution Genome — Your Living Intelligence Map") reusing the existing LifeOS glass + neon language. No redesign of Phase 1–4 pages, only add entry-point links.

## Route & entry points
- New file: `src/routes/genome.tsx` — head title "Evolution Genome — LifeOS", meta description "Your Living Intelligence Map — an animated neural network of your evolving capabilities."
- Add a neon "❋ Genome" link in the headers of `/home`, `/system`, `/core`, and `/missions` for parity (single line addition per file, no layout changes).

## Mock data
New file: `src/lib/genome-mock.ts` exporting:
- `coreNode` — label "YOU", overall level, total XP, evolution %, status.
- `majorNodes` — 9 domains (Learning, Career, Health, Mindset, Finance, Communication, Leadership, Creativity, Fitness) each with: id, label, glyph, tone (primary/cyan/violet), level, progress %, xp, status ("ascending" | "stable" | "dormant"), angle (for radial layout), children[].
- `children` per domain (3–5 sub-skills each, e.g. Learning → Programming/AI/Linux/Databases/Algorithms/Math; Communication → Public Speaking/Writing/Listening/Negotiation; Health → Sleep/Nutrition/Exercise/Recovery/Stress; etc.) with level, xp, growth %, weeklyTrend spark[7], strengths[], weaknesses[], related[] (ids).
- `forecast` — mostLikelyNext, fastestGrowing, losingMomentum, recommendedFocus (each: skill name, reason, delta %).
- `heatmap` — array of { domain, intensity 0–1, band: "strong" | "balanced" | "weak" } for the 9 domains.
- `timeline` — 12 months of { month, level, xp, highlight } for animated evolution progression.

## New components (`src/components/lifeos/genome/`)
- `GenomeCanvas.tsx` — the centerpiece. Fixed-aspect SVG stage (responsive, ~720px tall on desktop) holding: ambient particle layer, animated connections, major nodes on a radial ring, and the core node at center. Handles selection state (which node is expanded) via local state; emits selected id to parent for the detail card.
- `GenomeCoreNode.tsx` — pulsing core "YOU" node: layered breathing rings (Framer Motion scale/opacity loops), neon gradient fill from existing tokens, level readout in center.
- `GenomeNode.tsx` — major/child node component: soft glow circle, glyph, label, small level chip, subtle idle drift (motion `animate` with slow y offset), hover lift + brighter glow, active-state ring. Tone drives accent color via existing CSS vars.
- `GenomeConnection.tsx` — animated SVG line/curve between two points: `pathLength` draw-in on mount, opacity tied to combined level (higher levels → brighter), and a traveling particle (small circle animated along the path via `offsetDistance` / motion `animate` on `cx/cy` using precomputed samples). Renders as `<g>` so it composes inside `GenomeCanvas`.
- `SkillCard.tsx` — expanded detail panel that appears beside/below the canvas when a node is selected: name, level, XP, growth %, recent progress bar, weekly trend sparkline (reuse the sparkline pattern from `LifeDomainCard`), strengths chips, weaknesses chips, related skills chips (clicking a related chip re-selects that node).
- `ForecastCard.tsx` — 4 stacked mini-cards inside an `AnalysisCard`: Most Likely Next, Fastest Growing, Losing Momentum, Recommended Focus. Each with icon, skill, delta, one-line reason.
- `Heatmap.tsx` — radial heatmap: 9 wedges around a center, each wedge's radial extent + fill opacity driven by `intensity`, colored by band (strong=primary, balanced=cyan, weak=violet/amber). Domain labels around the outside. Uses SVG + Framer Motion for wedge grow-in.
- `EvolutionTimeline.tsx` — horizontal 12-month timeline: animated line chart of level over time (SVG polyline with `pathLength` draw), month ticks, hover/tap reveals highlight blurb; subtle neon area fill under the line.
- `GenomeParticles.tsx` — reusable slow-drift particle field for the canvas background (lighter variant of the existing `AmbientParticles`).

All components use existing tokens from `src/styles.css` (`glass`, `text-gradient`, `--gradient-hero`, `--glow-primary`, `--glow-cyan`, `--cyan-accent`, `--shadow-neon`, etc.). No new tokens, no new deps.

## Page composition (`/genome`)
Sections wrapped in the same `Section` pattern used in `/core` and `/missions`:
1. Header — `LogoMark` + links back to Home / CORE / System / Missions.
2. Hero — eyebrow "Living Intelligence Map", title "Evolution Genome", short subtitle line, status chip ("Genome Online · Synchronized {time}").
3. Genome Canvas — full-width `AnalysisCard` wrapping `GenomeCanvas` on the left and `SkillCard` on the right (stacks on mobile). Selecting a major node expands its children into an inner ring with animated connections; selecting any node updates `SkillCard`. Default selection = core node (shows overall stats).
4. Evolution Forecast — `ForecastCard` grid.
5. Growth Heatmap — `Heatmap` inside an `AnalysisCard`.
6. Evolution Timeline — `EvolutionTimeline` inside an `AnalysisCard`.

## Motion & interaction
- Core node: continuous breathing (scale 1 → 1.04 → 1, 6s loop) + halo pulse.
- Major nodes: staggered fade/scale-in on mount, gentle idle drift, hover brighten.
- Connections: draw-in on mount (staggered), brightness ∝ child level, one traveling particle per active connection.
- Selecting a major node: smooth expand — children ring fades/scales in around it, unrelated major nodes dim slightly, `SkillCard` cross-fades to new content.
- Reuse `useCountUp` for level, XP, growth %, evolution %.
- Ambient particles behind the canvas (via `GenomeParticles`), matching the calm tone of `AmbientBackground`.

## Out of scope
No real skill logic, no persistence, no AI, no backend, no edits to prior pages beyond adding the single `❋ Genome` header link in `/home`, `/system`, `/core`, `/missions`.
