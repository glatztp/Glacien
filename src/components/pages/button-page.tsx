import { Heart, Download, Share, Star, Plus, Minus } from "phosphor-react";
import React from "react";
import { Button } from "../ui";
import ExampleCard from "../ui/ExampleCard";

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
              <Button
                variant="default"
                size="lg"
                leftIcon={<Heart size={16} />}
              >
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
