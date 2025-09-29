import React from "react";
import CodeSnippet from "./CodeSnippet";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
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
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  snippet: string;
}) {
  const [showCode, setShowCode] = React.useState(false);

  return (
    <Card className="relative">
      <div className="absolute right-3 top-3 z-10">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowCode(!showCode)}
          aria-expanded={showCode}
          aria-label={`${showCode ? "Fechar código" : "Ver código"} de ${title}`}
        >
          {showCode ? "Hide code" : "View code"}
        </Button>
      </div>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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

        <div className="flex flex-wrap gap-3">{children}</div>
      </CardContent>
    </Card>
  );
}
