import React from "react";
import CodeSnippet from "./CodeSnippet";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Code, Eye, EyeSlash } from "phosphor-react";
import { cn } from "../../lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";

export default function ExampleCard({
  title,
  description,
  children,
  snippet,
  className,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  snippet: string;
  className?: string;
}) {
  const [showCode, setShowCode] = React.useState(false);

  return (
    <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
      {/* barra de destaque no topo */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-primary/60" />

      <div className="absolute right-3 top-3 z-10">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowCode(!showCode)}
          aria-expanded={showCode}
          aria-label={`${showCode ? "Fechar código" : "Ver código"} de ${title}`}
          leftIcon={showCode ? <EyeSlash size={16} /> : <Eye size={16} />}
          animation="smooth"
        >
          {showCode ? "Ocultar código" : "Ver código"}
        </Button>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between w-full gap-4">
          <div>
            <CardTitle className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Code size={16} />
              </span>
              {title}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden mb-4"
            >
              <CodeSnippet title={title} code={snippet} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex w-full flex-wrap gap-3">
          <div
            className={cn(
              "w-full rounded-md border border-input bg-muted p-4 flex items-center justify-center min-h-[72px]",
              className
            )}
          >
            <div className="w-full max-w-full">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
