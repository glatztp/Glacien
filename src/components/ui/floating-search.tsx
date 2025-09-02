import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input } from ".";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Item = {
  id: string;
  label: string;
  description?: string;
  category?: string;
  isNew?: boolean;
  isPopular?: boolean;
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
        <mark className="bg-primary/15 text-primary font-semibold px-1 py-0.5 rounded-md ring-1 ring-primary/25 shadow-sm">
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
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="relative h-10 w-10 p-0 rounded-full  backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group"
          onClick={() => setOpen((s) => !s)}
          title="Buscar componentes (Ctrl/⌘+K)"
        >
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <Search className="h-4 w-4 text-foreground/70 group-hover:text-primary transition-colors duration-200" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            whileHover={{ opacity: 1, scale: 1, x: -16 }}
            className="absolute -right-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap pointer-events-none shadow-md"
          >
            ⌘K
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.92 }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            data-search-container
            className="mt-3 w-[calc(100vw-2rem)] max-w-md sm:w-96 bg-background/55 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/5 overflow-hidden"
          >
            {/* Header with improved design */}
            <div className="px-4 py-3 bg-gradient-to-br from-muted/20 via-muted/10 to-transparent border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, duration: 0.3, ease: "backOut" }}
                    className="absolute left-3 top-3.5 transform -translate-y-1/2 z-10"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                  <Input
                    placeholder="Busque por componentes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 border-0 bg-background/60 backdrop-blur-sm rounded-xl focus:bg-background/90 focus:ring-2 focus:ring-primary/30 transition-all duration-200 placeholder:text-muted-foreground/60"
                    autoFocus
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-muted/30 rounded-lg text-xs font-medium text-muted-foreground/80 select-none border border-border/20"
                >
                  <span>ESC</span>
                </motion.div>
              </div>

              {/* Search stats */}
              {query && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.1 }}
                  className="mt-2 text-xs text-muted-foreground/70"
                >
                  {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{" "}
                  encontrado{filtered.length !== 1 ? "s" : ""}
                </motion.div>
              )}
            </div>

            {/* Results with improved responsive design */}
            <div className="max-h-80 overflow-y-auto overscroll-contain">
              {filtered.length > 0 ? (
                <div className="p-2">
                  {filtered.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, ease: "easeOut" }}
                      whileHover={{ scale: 1.005, x: 2 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => doNavigate(item.id)}
                      className="group w-full text-left p-3 mb-1 last:mb-0 hover:bg-accent/8 rounded-xl border border-transparent hover:border-border/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-accent/5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                            {highlight(item.label)}
                          </div>
                          {item.description && (
                            <div className="text-xs sm:text-sm text-muted-foreground/80 mt-1 line-clamp-2 group-hover:text-muted-foreground transition-colors">
                              {item.description}
                            </div>
                          )}
                          {item.category && (
                            <div className="text-xs text-muted-foreground/60 mt-1 font-medium">
                              {item.category}
                            </div>
                          )}
                        </div>

                        {/* Status indicators */}
                        <div className="flex items-center gap-2">
                          {item.isNew && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs rounded-full border border-emerald-500/20"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span className="hidden sm:inline">Novo</span>
                            </motion.div>
                          )}
                          {item.isPopular && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs rounded-full border border-orange-500/20"
                            >
                              <TrendingUp className="w-3 h-3" />
                              <span className="hidden sm:inline">Popular</span>
                            </motion.div>
                          )}

                          {/* Arrow icon */}
                          <motion.div
                            initial={{ opacity: 0.5 }}
                            whileHover={{ opacity: 1, x: 2 }}
                            className="text-muted-foreground/40 group-hover:text-primary/60 transition-all duration-200"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, ease: "easeOut" }}
                  className="p-6 sm:p-8 text-center"
                >
                  <motion.div
                    animate={{
                      rotate: [0, -3, 3, -3, 3, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                    className="text-3xl sm:text-4xl mb-3 opacity-60"
                  >
                    🔍
                  </motion.div>
                  <div className="font-semibold text-foreground/80 mb-2 text-sm sm:text-base">
                    Nenhum resultado encontrado
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground/70 mb-4">
                    Tente usar palavras-chave diferentes
                  </div>
                  {query && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuery("")}
                      className="px-3 py-1.5 text-xs text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-all duration-200"
                    >
                      Limpar busca
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
