import React from "react";
import { Copy, Check } from "phosphor-react";
import { motion } from "framer-motion";

type CodeSnippetProps = {
  code: string;
  title?: string;
  showLanguage?: boolean;
};

export default function CodeSnippet({
  code,
  title,
  showLanguage = true,
}: CodeSnippetProps) {
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const displayedCode = React.useMemo(() => {
    const indented = code
      .split("\n")
      .map((l) => `  ${l}`)
      .join("\n");
    return `${indented}\n`;
  }, [code]);

  const previewLines = 6;
  const codeLines = React.useMemo(
    () => displayedCode.split("\n"),
    [displayedCode]
  );
  const isLong = codeLines.length > previewLines + 1; // account for trailing newline
  const previewText = isLong
    ? codeLines.slice(0, previewLines).join("\n") + "\n..."
    : displayedCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="mt-4">
      <div
        className="flex items-center justify-between rounded-t-md px-3 py-2 text-sm bg-secondary/80"
        
      >
        <div className="flex items-center gap-3">
          <span className="font-medium">{title ?? "Exemplo"}</span>
          {showLanguage && (
            <span
              className="px-2 py-0.5 text-xs rounded"
              style={{
                backgroundColor: `hsl(var(--border) / 1)`,
                color: `hsl(var(--card-foreground) / 1)`,
              }}
            >
              {"TSX"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            animate={{ scale: copied ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={handleCopy}
            aria-label="Copy code"
            className="inline-flex items-center gap-2 rounded px-2 py-1 text-xs font-medium"
            style={{
              borderColor: `hsl(var(--border) / 1)`,
              backgroundColor: "transparent",
              color: `hsl(var(--card-foreground) / 1)`,
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </motion.button>

          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((s) => !s)}
              className="text-xs text-muted-foreground hover:text-foreground px-2 py-1"
            >
              {expanded ? "Show less" : "Show full"}
            </button>
          )}
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : "auto" }}
        className="overflow-hidden rounded-b-md border border-t-0"
        style={{ borderColor: `hsl(var(--border) / 1)` }}
      >
        <pre
          className="text-sm overflow-x-auto p-4"
          style={{
            backgroundColor: `hsl(var(--popover) / 1)`,
            color: `hsl(var(--popover-foreground) / 1)`,
          }}
        >
          {expanded ? displayedCode : previewText}
        </pre>
      </motion.div>
    </div>
  );
}
