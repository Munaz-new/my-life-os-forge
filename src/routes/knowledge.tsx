import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/lifeos/AmbientBackground";
import { LogoMark } from "@/components/lifeos/LogoMark";
import { KnowledgeCanvas } from "@/components/lifeos/knowledge/KnowledgeCanvas";
import { KnowledgePanel } from "@/components/lifeos/knowledge/KnowledgePanel";
import { GraphSearch } from "@/components/lifeos/knowledge/GraphSearch";
import { RelationshipCard } from "@/components/lifeos/knowledge/RelationshipCard";
import { OpportunityCard } from "@/components/lifeos/knowledge/OpportunityCard";
import { Heatmap } from "@/components/lifeos/knowledge/Heatmap";
import { FutureGraph } from "@/components/lifeos/knowledge/FutureGraph";
import {
  allEdges,
  allNodes,
  chains,
  nodeById,
  opportunities,
} from "@/lib/knowledge-mock";
import { eventBus, useCoreModule } from "@/lib/core-engine";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Graph — How CORE Understands You" },
      {
        name: "description",
        content:
          "A living knowledge graph of your goals, skills, projects, habits and memories — with relationship explanations, opportunities and future projections.",
      },
      { property: "og:title", content: "Knowledge Graph — How CORE Understands You" },
      {
        property: "og:description",
        content:
          "Explore how every part of your life connects: animated nodes, weighted relationships, opportunity discovery and a 30/90/365-day future graph.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://my-life-os-forge.lovable.app/knowledge" },
    ],
    links: [{ rel: "canonical", href: "https://my-life-os-forge.lovable.app/knowledge" }],
  }),
  component: KnowledgePage,
});

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground/80 transition hover:bg-white/10"
    >
      {label}
    </Link>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mt-14"
    >
      <div className="mb-4">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function KnowledgePage() {
  useCoreModule("core");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>("skills");
  const [query, setQuery] = useState("");
  const [chainId, setChainId] = useState(chains[0].id);

  const activeChain = chains.find((c) => c.id === chainId) ?? chains[0];

  const highlighted = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const matches = allNodes.filter((n) => n.label.toLowerCase().includes(q)).map((n) => n.id);
    if (matches.length === 0) return new Set<string>();
    const set = new Set<string>(matches);
    // include neighbours and the path back to the core
    for (const id of matches) {
      for (const e of allEdges) {
        if (e.from === id) set.add(e.to);
        if (e.to === id) set.add(e.from);
      }
      const parent = nodeById.get(id)?.parent;
      if (parent) set.add(parent);
    }
    set.add("you");
    return set;
  }, [query]);

  const select = (id: string) => {
    const node = nodeById.get(id);
    if (!node) return;
    setSelectedId(id);
    if (node.kind === "domain") setExpandedId(id);
    if (node.kind === "leaf" && node.parent) setExpandedId(node.parent);
    eventBus.emit({
      type: "MemoryEvent",
      module: "core",
      tone: node.tone,
      label: `Knowledge node inspected: ${node.label}`,
      payload: { memoryId: node.id, title: node.label, action: "recalled" },
    });
  };

  const selectChain = (id: string) => {
    setChainId(id);
    const chain = chains.find((c) => c.id === id);
    if (!chain) return;
    eventBus.emit({
      type: "RecommendationEvent",
      module: "core",
      tone: "cyan",
      label: `Relationship path traced: ${chain.title}`,
      payload: {
        title: chain.title,
        reason: chain.conclusion,
        confidence: chain.confidence / 100,
      },
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-32">
      <AmbientBackground />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/home" className="flex items-center gap-3">
          <LogoMark size={38} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">LifeOS</p>
            <p className="text-sm font-medium">Knowledge Graph</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/core" label="◉ CORE" />
          <NavLink to="/decisions" label="◐ Decisions" />
          <NavLink to="/genome" label="❋ Genome" />
          <NavLink to="/memory" label="⬢ Memory" />
          <NavLink to="/twin" label="◬ Twin" />
          <NavLink to="/home" label="← Dashboard" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-2 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            CORE Knowledge Graph
          </p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient">Knowledge Graph</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">How CORE Understands You</p>
        </motion.div>

        <div className="mx-auto mt-8 max-w-xl">
          <GraphSearch
            query={query}
            onQuery={setQuery}
            onSelect={select}
            matchCount={highlighted ? highlighted.size : 0}
          />
        </div>

        <div className="mt-6">
          <KnowledgeCanvas
            selectedId={selectedId}
            expandedId={expandedId}
            highlighted={highlighted}
            onSelect={select}
          />
        </div>

        <Section title="Relationship Explorer" eyebrow="Why two nodes are connected">
          <div className="grid gap-4 lg:grid-cols-3">
            {chains.map((c) => (
              <RelationshipCard
                key={c.id}
                chain={c}
                active={c.id === activeChain.id}
                onActivate={() => selectChain(c.id)}
              />
            ))}
          </div>
        </Section>

        <Section title="Opportunity Discovery" eyebrow="What the graph unlocks next">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((o, i) => (
              <OpportunityCard key={o.id} opp={o} index={i} />
            ))}
          </div>
        </Section>

        <Section title="Knowledge Heatmap" eyebrow="Where the network is dense or thin">
          <Heatmap />
        </Section>

        <Section title="Future Graph" eyebrow="Projected network state">
          <FutureGraph />
        </Section>
      </div>

      <KnowledgePanel nodeId={selectedId} onClose={() => setSelectedId(null)} onSelect={select} />
    </main>
  );
}
