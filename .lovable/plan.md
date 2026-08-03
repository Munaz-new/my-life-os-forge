# Phase 9 — CORE Decision Engine

A new `/decisions` page where CORE shows its reasoning: how it moves from your goal and constraints to a concrete recommendation, what alternatives it weighed, and what each path looks like over time. All mock data, no backend, no AI calls. Existing pages keep their current design and content.

## Page: Decision Engine — "Understand Why CORE Recommends This"

Sections, top to bottom:

1. **Hero — animated decision graph.** Central goal node with branching constraint nodes: Available Time, Energy, Focus, Learning Velocity. Animated connecting paths with travelling pulses, reusing the neural-network look already used in the Genome page.
2. **Decision Pipeline.** Vertical animated timeline: Goal → Analyze Context → Evaluate Progress → Identify Bottlenecks → Generate Recommendation → Predict Outcome. Steps light up in sequence with a flowing connector.
3. **Reasoning Card.** Current Situation, Observed Pattern, Evidence list, Recommendation, Confidence meter, Risk badge. Expandable to reveal the full evidence breakdown (e.g. "Delay Machine Learning — Python fundamentals below target proficiency — 92% confidence").
4. **Alternative Decisions.** Three option cards (Improve Python / Start Machine Learning / Review Mathematics) each with expected outcome rating; selecting one highlights its path in the hero graph and updates the trade-off and simulation sections.
5. **Trade-Off Analyzer.** Comparison cards across Time Required, Difficulty, Future Value, Energy Cost, Momentum Impact — animated bars per option.
6. **Future Simulation.** 30 Days / 90 Days / 1 Year timeline comparing the selected option against the others, with an animated projection curve.
7. **Decision Journal.** History of past recommendations: decision, reason, result (followed / ignored / partial) with outcome deltas.
8. **Ask CORE.** Premium input with rotating placeholder and four example question chips ("What should I learn next?", "How close am I to my goal?", "Why did my focus decrease?", "What skill unlocks the biggest opportunity?"). Non-functional by design — submitting shows a "reasoning offline in this build" state.

## Navigation

Add a "◎ Decision Engine" entry point on the dashboard and a matching link in the existing headers of CORE, Missions, System, Genome, Memory, and Evolution — same pattern as previous phases.

## Technical notes

- New route `src/routes/decisions.tsx` with its own `head()` metadata (title, description, og tags).
- New mock module `src/lib/decisions-mock.ts`: goal + constraints, pipeline steps, reasoning payload, three options with trade-off metrics, simulation series, journal entries, example questions. Reuses the shared `Tone` / colour helpers.
- New components under `src/components/lifeos/decisions/`: `DecisionGraph`, `DecisionPipeline`, `ReasoningCard`, `TradeOffCard`, `SimulationCard`, `DecisionHistory`, `QuestionCard`.
- Selected-option state lives in the route component and is passed down, so graph, trade-offs, and simulation stay in sync.
- CORE integration: register the page with the existing module registry via `useCoreModule`, and emit a `RecommendationEvent` when the user switches option so the Dev timeline reflects it. No changes to the event schema.
- Animations via Framer Motion, consistent with existing pages.
