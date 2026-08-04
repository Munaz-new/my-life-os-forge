# Phase 10 — CORE Knowledge Graph

A new `/knowledge` page: a living network showing how goals, skills, projects, habits and memories connect. Same premium futuristic UI, mock data only, no backend or AI. No existing page is redesigned.

## Page structure

Title "Knowledge Graph", subtitle "How CORE Understands You", same header/nav shell as the other modules.

1. **Graph canvas** — animated glowing YOU sphere at center, 10 first-level nodes (Goals, Skills, Projects, Habits, Health, Learning, Career, Finance, Relationships, Creativity) in a radial orbit, expanding to second-level nodes on select (e.g. Skills → Python, Linux, Communication, Leadership, Problem Solving, AI, Databases). Neural pulses travel along edges, floating particles drift behind, smooth zoom/pan on selection, connection glow on hover.
2. **Graph search** — search any node by name; matched node and all connected paths highlight while the rest dims.
3. **Knowledge panel** — side panel on node select: summary, importance, connected nodes, growth trend sparkline, recommendations, future opportunities.
4. **Relationship explorer** — chain view (Python → ResumeAI → Portfolio → AI Engineer goal) with a CORE narration line explaining each hop, plus strength / confidence / growth / influence meters per link.
5. **Opportunity discovery** — animated cards ("Improving Linux unlocks Docker readiness", etc.) with readiness bars.
6. **Knowledge heatmap** — strongest connections, weak connections, emerging areas, animated intensity bands.
7. **Future graph** — 30 days / 90 days / 1 year toggle previewing new nodes, thickening edges and predicted clusters.

## Technical notes

- Route: `src/routes/knowledge.tsx` with its own `head()` (title, description, og:*, twitter:card, canonical).
- Mock data: `src/lib/knowledge-mock.ts` — nodes, edges with strength/confidence/growth/influence, relationship chains, opportunities, heatmap bands, future-graph snapshots. Reuses the existing `Tone`/`toneColor` conventions.
- Components in `src/components/lifeos/knowledge/`: `KnowledgeNode`, `KnowledgeEdge`, `KnowledgePanel`, `RelationshipCard`, `OpportunityCard`, `Heatmap`, `GraphSearch`, plus a `KnowledgeCanvas` SVG stage and a particles layer.
- Animation via Framer Motion + SVG, matching the Genome/Memory graph implementations.
- CORE integration: register the page with `useCoreModule` and emit a `MemoryEvent`/`RecommendationEvent` on node selection so `/dev` shows the activity.
- Navigation: add a "◈ Knowledge Graph" button on `/home` and a "◈ Knowledge" link in the CORE, Missions, System, Genome, Memory, Evolution and Decisions headers.
