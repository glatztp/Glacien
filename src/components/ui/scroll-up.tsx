import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollUp(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState(false);

  const prevAtBottom = useRef(false);
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculate = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const pct = Math.max(0, Math.min(1, y / height));
      setProgress(pct);
      setVisible(y > 220);
      const atEnd =
        y + window.innerHeight >= document.documentElement.scrollHeight - 6;

      if (atEnd && !prevAtBottom.current) {
        setTimeout(() => setShowCheck(true), 140);
      }
      if (!atEnd && prevAtBottom.current) {
        setShowCheck(false);
      }
      prevAtBottom.current = atEnd;
    };

    calculate();
    window.addEventListener("scroll", calculate, { passive: true });
    window.addEventListener("resize", calculate);
    return () => {
      window.removeEventListener("scroll", calculate);
      window.removeEventListener("resize", calculate);
    };
  }, []);

  if (typeof window === "undefined") return null;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const size = 56;
  const r = 18;
  const c = 2 * Math.PI * r;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ y: 28, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 28, opacity: 0, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          aria-label="Voltar ao topo"
          onClick={handleClick}
          onKeyDown={handleKey}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="fixed z-50 right-6 bottom-6 w-[3.5rem] h-[3.5rem] rounded-full shadow-2xl flex items-center justify-center backdrop-blur-md transform-gpu"
          style={{
            color: `hsl(var(--primary-foreground))`,
            border: `1px solid hsl(var(--border))`,
          }}
          title="Voltar ao topo"
        >
          {!prefersReduced && (
            <motion.span
              aria-hidden
              className="absolute rounded-full blur-2xl"
              style={{
                width: size + 18,
                height: size + 18,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                background: `radial-gradient(closest-side, hsl(var(--primary) / 0.08), transparent 40%), radial-gradient(closest-side, hsl(var(--accent) / 0.05), transparent 45%)`,
                mixBlendMode: "screen",
              }}
              animate={{
                scale: [0.96, 1.04, 0.98],
                opacity: [0.12, 0.04, 0.08],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          <svg
            width={size}
            height={size}
            viewBox={`1 1 ${size} ${size}`}
            className="absolute inset-0 "
            aria-hidden
          >
            <defs>
              <linearGradient id="g-scroll" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop
                  offset="0%"
                  stopColor={`hsl(var(--primary))`}
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor={`hsl(var(--primary-foreground))`}
                  stopOpacity="0.85"
                />
              </linearGradient>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={`hsl(var(--border))`}
              strokeWidth={3}
              fill="transparent"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="url(#g-scroll)"
              strokeWidth={3.2}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: c - progress * c }}
              transition={{ ease: "easeOut", duration: 0.18 }}
            />
          </svg>

          <motion.span
            initial={{ scale: 0.98 }}
            whileHover={{ scale: 1.12, rotate: 6, y: -4 }}
            whileTap={{ scale: 0.9, rotate: 0, y: 1 }}
            className="relative z-10 flex items-center justify-center w-full h-full"
          >
            {!showCheck ? (
              <motion.span
                key="chev"
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={
                  showCheck ? { opacity: 0, y: -6, scale: 0.9 } : { opacity: 1 }
                }
                transition={{ duration: 0.06 }}
              >
                <ChevronUp
                  className="w-5 h-5 drop-shadow"
                  style={{ color: "hsl(var(--primary))" }}
                />
              </motion.span>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  stroke={`hsl(var(--primary))`}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                />
              </svg>
            )}
          </motion.span>

          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute -left-40 top-3 transform -translate-y-1/2 bg-background/95 text-sm text-foreground px-3 py-2 rounded-lg shadow-lg border border-border/20 backdrop-blur-md flex items-center gap-2"
                role="status"
                aria-hidden={!hover}
              >
                <span className="font-semibold">Voltar ao topo</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(progress * 100)}%
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
