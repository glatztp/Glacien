import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from "../../index";
import {
  Download,
  Heart,
  Star,
  Share,
  Plus,
  Minus,
  Copy,
  Check,
} from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";

type CodeSnippetProps = {
  code: string;
  title?: string;
  showLanguage?: boolean;
};

function CodeSnippet({ code, title, showLanguage = true }: CodeSnippetProps) {
  const [copied, setCopied] = React.useState(false);

  const displayedCode = React.useMemo(() => {
    const indented = code
      .split("\n")
      .map((l) => `  ${l}`)
      .join("\n");
    return `${indented}\n`;
  }, [code]);

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
      <div className="flex items-center justify-between rounded-t-md px-3 py-2 text-sm bg-secondary/50">
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
        </div>
      </div>
      <pre
        className="text-sm overflow-x-auto rounded-b-md border border-t-0 p-4"
        style={{
          borderColor: `hsl(var(--border) / 1)`,
          backgroundColor: `hsl(var(--popover) / 1)`,
          color: `hsl(var(--popover-foreground) / 1)`,
        }}
      >
        {displayedCode}
      </pre>
    </div>
  );
}

function ExampleCard({
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

export function ButtonPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [asyncLoading, setAsyncLoading] = React.useState(false);

  const handleAsyncAction = async () => {
    setAsyncLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAsyncLoading(false);
  };

  const handleLoadingToggle = () => {
    setIsLoading(!isLoading);
  };

  const snippets = {
    variants: `<Button variant="default">Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="destructive">Destructive</Button>`,
    sizes: `<Button size="sm">Small</Button>\n<Button size="lg">Large</Button>`,
    icons: `<Button leftIcon={<Download size={16} />}>Download</Button>\n<Button rightIcon={<Share size={16} />}>Compartilhar</Button>`,
    loading: `<Button loading loadingEffect="spinner">Spinner Loading</Button>\n<Button loading loadingEffect="dots">Dots Loading</Button>`,
    demo: `<Button variant="default" size="lg" gradient glow shadow="xl" rounded="lg" leftIcon={<Heart size={16} />}>Button</Button>`,
    full: `
import React from 'react';
import { Button } from '@glacien/ui';
import { Heart } from 'phosphor-react';

export function MyExample() {
  return (
    <div className="space-y-4">
      <Button variant="default" size="lg" leftIcon={<Heart size={16} />}>
        Ação Principal
      </Button>

      <Button variant="secondary" size="sm">Secundário</Button>

      <Button loading loadingEffect="spinner">Salvando...</Button>
    </div>
  );
}
`,
  };

  return (
    <div className="flex gap-6 min-h-screen pt-12">
      <div className="flex-1 overflow-auto">
        <div className="space-y-8 p-6">
          <div>
            <h1 className="text-3xl font-bold">Button Component</h1>
            <p className="text-muted-foreground mt-2">
              Botões avançados com animações Framer Motion, funcionalidades
              especiais e props customizáveis para máxima flexibilidade.
            </p>
          </div>

         <div className="grid gap-6">
            <ExampleCard
              title="Exemplo Completo"
              description="Como importar e usar o Button na sua aplicação (TSX)"
              snippet={snippets.full}
            >
              <Button variant="default" size="lg" leftIcon={<Heart size={16} />}>
                Ação Principal
              </Button>
            </ExampleCard>

            <ExampleCard
              title="Variantes"
              description="Diferentes estilos visuais para diferentes contextos"
              snippet={snippets.variants}
            >
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </ExampleCard>

            <ExampleCard
              title="Tamanhos"
              description="Diferentes tamanhos para diferentes hierarquias visuais"
              snippet={snippets.sizes}
            >
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Heart size={16} />
              </Button>
            </ExampleCard>

            <ExampleCard
              title="Com Ícones"
              description="Botões com ícones para melhor comunicação visual"
              snippet={snippets.icons}
            >
              <Button leftIcon={<Download size={16} />}>Download</Button>
              <Button rightIcon={<Share size={16} />}>Compartilhar</Button>
              <Button
                leftIcon={<Heart size={16} />}
                rightIcon={<Star size={16} />}
              >
                Favoritar
              </Button>
              <Button size="icon" variant="outline">
                <Plus size={16} />
              </Button>
              <Button size="icon" variant="destructive">
                <Minus size={16} />
              </Button>
            </ExampleCard>

            <ExampleCard
              title="Estados de Loading Avançados"
              description="Diferentes efeitos visuais para estados de carregamento"
              snippet={snippets.loading}
            >
              <Button loading loadingEffect="spinner" loadingText="Spinner...">
                Spinner Loading
              </Button>
              <Button loading loadingEffect="dots" loadingText="Processando...">
                Dots Loading
              </Button>
              <Button loading loadingEffect="bounce" loadingText="Enviando...">
                Bounce Loading
              </Button>
              <Button
                loading={isLoading}
                onClick={handleLoadingToggle}
                loadingText="Carregando..."
              >
                {isLoading ? "Carregando..." : "Toggle Loading"}
              </Button>
              <Button
                loading={asyncLoading}
                onClick={handleAsyncAction}
                loadingText="Aguarde 2s..."
                variant="secondary"
              >
                Ação Assíncrona
              </Button>
            </ExampleCard>
          </div>
        </div>
      </div>
    </div>
  );
}
