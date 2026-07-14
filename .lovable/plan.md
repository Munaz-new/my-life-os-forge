## Phase 6 — CORE Memory Engine

Build a new `/memory` route that feels like entering CORE's memory vault: a living archive of long-term intelligence about the user. Pure UI + mock data, matching the existing futuristic glass/neon identity (no redesigns to prior pages).

### Route & navigation
- New file: `src/routes/memory.tsx` with head meta ("CORE Memory — Long-Term Intelligence").
- Add "⬢ Memory" links to existing headers on `/home`, `/core`, `/missions`, `/system`, `/genome` (nav-only edits, no visual redesign).

### Mock data
- New `src/lib/memory-mock.ts`:
  - 16 categories (Goals, Projects, Achievements, Skills, Habits, Preferences, Learning Style, Important Moments, Milestones, Career, Health, Relationships, Books, Courses, Ideas, Dreams) with glyph + tone.
  - ~24 memories: `{ id, title, summary, category, createdAt, updatedAt, confidence (0–100), importance (1–5), pinned, fading (0–1), relatedIds[], tags[] }`.
  - Pinned set (Become AI Engineer, Graduate College, Launch EVOLVE, Improve Health).
  - Connection chain example (ResumeAI → Python → Machine Learning → AI Engineer Goal).
  - Search suggestions (recent, popular, pinned).

### Components (`src/components/lifeos/memory/`)
- `MemoryParticles.tsx` — ambient floating particles (reuse pattern from genome/missions).
- `MemorySearch.tsx` — glass search bar with tabs (Recent / Popular / Pinned / Categories) and category chip grid.
- `PinnedMemory.tsx` — glowing tile for the top pinned goals.
- `MemoryCard.tsx` — title, summary, category glyph, created/updated dates, confidence bar, importance dots, related count. Click → opens detail drawer.
- `MemoryTimeline.tsx` — chronological timeline grouped by Today / This Week / This Month / This Year with animated vertical spine.
- `MemoryConnection.tsx` — small horizontal animated chain (ResumeAI → Python → ML → AI Engineer) with traveling particles.
- `MemoryGraph.tsx` — SVG constellation of memory nodes connected by animated neural lines (lighter-weight cousin of GenomeCanvas, distinct layout: clustered by category, not radial).
- `ForgottenMemories.tsx` — grid of low-opacity fading cards with a "Refresh" CTA and CORE's recommendation line.
- `MemoryDetail.tsx` — slide-in side sheet: full summary, related skills, related goals, connected projects, mini timeline, future recommendations.

### Page layout (top → bottom)
1. Hero — "CORE Memory / Long-Term Intelligence" with ambient particles + stat strip (Total / Pinned / Fading / Confidence avg).
2. `MemorySearch` (with category chips).
3. `PinnedMemory` grid (4 tiles).
4. `MemoryGraph` — the vault constellation.
5. `MemoryConnection` — featured connection chain.
6. Category browser — recent memory cards grid, filterable by chip.
7. `MemoryTimeline` — chronological view.
8. `ForgottenMemories` — CORE recommends refreshing.
9. Detail sheet opens on card click.

### Design & motion
- Reuse existing tokens: glass surfaces, neon shadows, tone colors from `genome-mock` (primary/cyan/violet/etc.).
- Framer Motion: staggered fade-ins per section, glowing node pulses, animated connection paths with traveling particles, smooth detail-sheet transitions.
- No new theme tokens, no changes to existing pages beyond adding one nav link.

### Out of scope
No backend, no AI, no database, no XP/quest logic. Mock data only.
