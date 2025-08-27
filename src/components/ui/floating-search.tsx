import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input } from ".";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Item = {
  id: string;
  label: string;
  description?: string;
};

export default function FloatingSearch({
  items,
  className = "",
  position = "top-4 left-4",
  noFixed = false,
}: {
  items: Item[];
  className?: string;
  position?: string;
  noFixed?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (it) =>
          it.label.toLowerCase().includes(query.toLowerCase()) ||
          it.id.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  );

  const doNavigate = (id: string) => {
    navigate(`/components/${id}`);
    setOpen(false);
    setQuery("");
  };

  // fecha com ESC e abre com Ctrl/Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }

      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      if (
        (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        setOpen((s) => !s);
        // focus input when opening
        const input = containerRef.current?.querySelector(
          "input"
        ) as HTMLInputElement | null;
        setTimeout(() => input?.focus(), 50);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // fecha ao clicar fora
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      if (!containerRef.current) return;
      if (
        e.target instanceof Node &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const highlight = (text: string) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + query.length);
    const after = text.slice(idx + query.length);
    return (
      <>
        {before}
        <mark className="bg-yellow-300/30 text-foreground font-semibold px-0.5 rounded-sm">
          {match}
        </mark>
        {after}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`${noFixed ? "" : "fixed"} z-50 ${position} ${className}`}
    >
      <Button
        variant="ghost"
        size="sm"
        className="p-2"
        onClick={() => setOpen((s) => !s)}
        title="Search components"
      >
        <Search className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            data-search-container
            className="mt-2 w-80 bg-background/80 backdrop-blur-sm border border-border/40 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-3 border-b bg-muted/20 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 border-0 bg-transparent focus:bg-transparent"
                  autoFocus
                />
              </div>
              <div className="text-xs text-muted-foreground select-none">
                ⌘K
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => doNavigate(item.id)}
                    className="w-full text-left p-3 hover:bg-accent/20 border-b border-border/20 transition-colors"
                  >
                    <div className="font-medium text-foreground">
                      {highlight(item.label)}
                    </div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </div>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="font-medium">Nenhum resultado</div>
                  <div className="text-xs mt-1">Tente outra palavra-chave</div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
