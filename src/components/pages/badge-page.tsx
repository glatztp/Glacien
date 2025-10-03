import React from "react";
import { Badge, Button } from "../../index";
import { Star, Crown, Shield, Warning, Check, X, Clock } from "phosphor-react";
import ExampleCard from "../ui/ExampleCard";

export function BadgePage() {
  const snippets = {
    full: `import { Badge } from "@glacien/ui";
import { Star, Crown, Shield } from "phosphor-react";

export function MyExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      
      {/* Com ícones */}
      <Badge variant="default" className="flex items-center gap-1">
        <Star size={12} />
        Premium
      </Badge>
    </div>
  );
}`,
    variants: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
    icons: `<Badge variant="default" className="flex items-center gap-1">
  <Star size={12} />
  Premium
</Badge>
<Badge variant="secondary" className="flex items-center gap-1">
  <Crown size={12} />
  Pro
</Badge>`,
    status: `<Badge variant="default" className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
  <Check size={12} />
  Aprovado
</Badge>
<Badge variant="destructive" className="flex items-center gap-1">
  <X size={12} />
  Rejeitado
</Badge>`,
    sizes: `<Badge className="text-xs px-2 py-0.5">Pequeno</Badge>
<Badge>Padrão</Badge>
<Badge className="text-sm px-3 py-1">Grande</Badge>`,
  };

  return (
    <div className="flex gap-6 min-h-screen pt-12">
      <div className="flex-1 overflow-auto">
        <div className="space-y-8 p-6">
          <div>
            <h1 className="text-3xl font-bold">Badge Component</h1>
            <p className="text-muted-foreground mt-2">
              Elementos visuais compactos para exibir status, categorias e
              informações importantes.
            </p>
          </div>

          <div className="grid gap-6">
            <ExampleCard
              title="Exemplo Completo"
              description="Como importar e usar o Badge na sua aplicação (TSX)"
              snippet={snippets.full}
            >
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="default" className="flex items-center gap-1">
                  <Star size={12} />
                  Premium
                </Badge>
              </div>
            </ExampleCard>

            <ExampleCard
              title="Variantes"
              description="Diferentes estilos visuais para diferentes contextos"
              snippet={snippets.variants}
            >
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </ExampleCard>

            <ExampleCard
              title="Badges com Ícones"
              description="Adicionando ícones para melhor comunicação visual"
              snippet={snippets.icons}
            >
              <div className="flex flex-wrap gap-3">
                <Badge variant="default" className="flex items-center gap-1">
                  <Star size={12} />
                  Premium
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Crown size={12} />
                  Pro
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield size={12} />
                  Verificado
                </Badge>
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <Warning size={12} />
                  Erro
                </Badge>
              </div>
            </ExampleCard>

            <ExampleCard
              title="Status Badges"
              description="Badges para indicar diferentes estados do sistema"
              snippet={snippets.status}
            >
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="default"
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                >
                  <Check size={12} />
                  Aprovado
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock size={12} />
                  Pendente
                </Badge>
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <X size={12} />
                  Rejeitado
                </Badge>
                <Badge
                  variant="outline"
                  className="border-yellow-500 text-yellow-600"
                >
                  Atenção
                </Badge>
              </div>
            </ExampleCard>

            <ExampleCard
              title="Tamanhos e Estilos"
              description="Variações de tamanho e estilo para diferentes contextos"
              snippet={snippets.sizes}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="text-xs px-2 py-0.5">Pequeno</Badge>
                <Badge>Padrão</Badge>
                <Badge className="text-sm px-3 py-1">Grande</Badge>
                <Badge className="rounded-full">Arredondado</Badge>
                <Badge className="rounded-none">Quadrado</Badge>
              </div>
            </ExampleCard>

            <ExampleCard
              title="Badges com Contador"
              description="Badges para exibir quantidades e notificações"
              snippet={`<div className="relative">
  <Button variant="outline">Mensagens</Button>
  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
    3
  </Badge>
</div>`}
            >
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <Button variant="outline">Mensagens</Button>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    3
                  </Badge>
                </div>

                <div className="relative">
                  <Button variant="outline">Notificações</Button>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600 hover:bg-red-700">
                    12
                  </Badge>
                </div>

                <div className="relative">
                  <Button variant="outline">Carrinho</Button>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600 hover:bg-green-700">
                    5
                  </Badge>
                </div>
              </div>
            </ExampleCard>
          </div>
        </div>
      </div>
    </div>
  );
}
