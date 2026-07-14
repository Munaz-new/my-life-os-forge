import { useState } from "react";
import { motion } from "framer-motion";
import { categories, searchSuggestions } from "@/lib/memory-mock";

type Tab = "recent" | "popular" | "pinned" | "categories";

interface Props {
  activeCategory: string | null;
  onCategoryChange: (key: string | null) => void;
}

export function MemorySearch({ activeCategory, onCategoryChange }: Props) {
  const [tab, setTab] = useState<Tab>("recent");
  const [query, setQuery] = useState("");

  const tabs: { key: Tab; label: string }[] = [
    { key: "recent", label: "Recent" },
    { key: "popular", label: "Popular" },
    { key: "pinned", label: "Pinned" },
    { key: "categories", label: "Categories" },
  ];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <span className="text-lg text-primary">⌕</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the memory vault…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-block">
          ⌘K
        </kbd>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                "rounded-xl border px-3 py-1.5 text-xs font-medium transition " +
                (active
                  ? "border-primary/50 bg-primary/10 text-foreground shadow-[var(--glow-primary)]"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10")
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {tab === "categories" ? (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={
                "rounded-lg border px-3 py-1.5 text-xs transition " +
                (activeCategory === null
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10")
              }
            >
              All
            </button>
            {categories.map((c) => {
              const active = c.key === activeCategory;
              return (
                <button
                  key={c.key}
                  onClick={() => onCategoryChange(c.key)}
                  className={
                    "rounded-lg border px-3 py-1.5 text-xs transition " +
                    (active
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10")
                  }
                >
                  <span className="mr-1.5">{c.glyph}</span>
                  {c.label}
                </button>
              );
            })}
          </div>
        ) : (
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2"
          >
            {searchSuggestions[tab].map((s) => (
              <span
                key={s}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/80"
              >
                {s}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
