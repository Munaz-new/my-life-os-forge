import { useState } from "react";
import { motion } from "framer-motion";
import { allNodes } from "@/lib/knowledge-mock";

interface Props {
  query: string;
  onQuery: (q: string) => void;
  onSelect: (id: string) => void;
  matchCount: number;
}

export function GraphSearch({ query, onQuery, onSelect, matchCount }: Props) {
  const [focused, setFocused] = useState(false);
  const suggestions =
    query.trim().length > 0
      ? allNodes
          .filter((n) => n.label.toLowerCase().includes(query.trim().toLowerCase()))
          .slice(0, 6)
      : [];

  return (
    <div className="relative">
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
        <span className="text-sm text-primary">⌕</span>
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 140)}
          placeholder="Search any node — Python, Sleep, Portfolio…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Search the knowledge graph"
        />
        {query && (
          <span className="shrink-0 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {matchCount} paths
          </span>
        )}
      </div>

      {focused && suggestions.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute z-20 mt-2 w-full overflow-hidden rounded-2xl p-1"
        >
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                onMouseDown={() => {
                  onSelect(s.id);
                  onQuery(s.label);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/10"
              >
                <span className="text-primary">{s.glyph}</span>
                <span className="flex-1">{s.label}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.kind}
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
