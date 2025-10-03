import React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Badge,
} from "../../index";
import { Info, Warning, CheckCircle, XCircle, Heart } from "phosphor-react";
import ExampleCard from "../ui/ExampleCard";

export function AlertPage() {
  const snippets = {
    full: `import { Alert, AlertDescription, AlertTitle } from "@glacien/ui";
import { Info, Warning, CheckCircle, XCircle } from "phosphor-react";

export function MyExample() {
  return (
    <div className="space-y-4">
      <Alert>
        <Info size={16} />
        <AlertTitle>Informação</AlertTitle>
        <AlertDescription>
          Esta é uma mensagem informativa básica para o usuário.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-500 bg-green-50 text-green-800">
        <CheckCircle size={16} />
        <AlertTitle>Sucesso</AlertTitle>
        <AlertDescription>
          Operação realizada com sucesso!
        </AlertDescription>
      </Alert>
    </div>
  );
}`,
    basic: `<Alert>
  <Info size={16} />
  <AlertTitle>Informação</AlertTitle>
  <AlertDescription>
    Esta é uma mensagem informativa básica para o usuário.
  </AlertDescription>
</Alert>`,
    variants: `<Alert className="border-yellow-500 bg-yellow-50 text-yellow-800">
  <Warning size={16} />
  <AlertTitle>Atenção</AlertTitle>
  <AlertDescription>
    Este é um alerta de atenção que requer cuidado especial.
  </AlertDescription>
</Alert>`,
    success: `<Alert className="border-green-500 bg-green-50 text-green-800">
  <CheckCircle size={16} />
  <AlertTitle>Sucesso</AlertTitle>
  <AlertDescription>
    Operação realizada com sucesso!
  </AlertDescription>
</Alert>`,
    error: `<Alert className="border-red-500 bg-red-50 text-red-800">
  <XCircle size={16} />
  <AlertTitle>Erro</AlertTitle>
  <AlertDescription>
    Ocorreu um erro durante a operação.
  </AlertDescription>
</Alert>`,
    actions: `<Alert className="border-yellow-500 bg-yellow-50 text-yellow-800">
  <Warning size={16} />
  <AlertTitle>Atualização Disponível</AlertTitle>
  <AlertDescription className="mb-3">
    Uma nova versão da aplicação está disponível.
  </AlertDescription>
  <div className="flex gap-2">
    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
      Atualizar Agora
    </Button>
    <Button size="sm" variant="outline">
      Lembrar Depois
    </Button>
  </div>
</Alert>`,
  };

  return (
    <div className="flex gap-6 min-h-screen pt-12">
      <div className="flex-1 overflow-auto">
        <div className="space-y-8 p-6">
          <div>
            <h1 className="text-3xl font-bold">Alert Component</h1>
            <p className="text-muted-foreground mt-2">
              Componente de alerta para exibir mensagens importantes, avisos e
              notificações aos usuários.
            </p>
          </div>

          <div className="grid gap-6">
            <ExampleCard
              title="Exemplo Completo"
              description="Como importar e usar o Alert na sua aplicação (TSX)"
              snippet={snippets.full}
            >
              <div className="space-y-4 w-full">
                <Alert>
                  <Info size={16} />
                  <AlertTitle>Informação</AlertTitle>
                  <AlertDescription>
                    Esta é uma mensagem informativa básica para o usuário.
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-500 bg-green-50 text-green-800">
                  <CheckCircle size={16} />
                  <AlertTitle>Sucesso</AlertTitle>
                  <AlertDescription>
                    Operação realizada com sucesso!
                  </AlertDescription>
                </Alert>
              </div>
            </ExampleCard>

            <ExampleCard
              title="Alert Básico"
              description="Alert informativo simples com ícone e título"
              snippet={snippets.basic}
            >
              <Alert>
                <Info size={16} />
                <AlertTitle>Informação</AlertTitle>
                <AlertDescription>
                  Esta é uma mensagem informativa básica para o usuário.
                </AlertDescription>
              </Alert>
            </ExampleCard>

            <ExampleCard
              title="Alert de Atenção"
              description="Alert amarelo para avisos que requerem atenção"
              snippet={snippets.variants}
            >
              <Alert className="border-yellow-500 bg-yellow-50 text-yellow-800">
                <Warning size={16} />
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription>
                  Este é um alerta de atenção que requer cuidado especial.
                </AlertDescription>
              </Alert>
            </ExampleCard>

            <ExampleCard
              title="Alert de Sucesso"
              description="Alert verde para confirmar operações bem-sucedidas"
              snippet={snippets.success}
            >
              <Alert className="border-green-500 bg-green-50 text-green-800">
                <CheckCircle size={16} />
                <AlertTitle>Sucesso</AlertTitle>
                <AlertDescription>
                  Operação realizada com sucesso! Tudo funcionou conforme
                  esperado.
                </AlertDescription>
              </Alert>
            </ExampleCard>

            <ExampleCard
              title="Alert de Erro"
              description="Alert vermelho para indicar erros e falhas"
              snippet={snippets.error}
            >
              <Alert className="border-red-500 bg-red-50 text-red-800">
                <XCircle size={16} />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                  Ocorreu um erro durante a operação. Tente novamente mais
                  tarde.
                </AlertDescription>
              </Alert>
            </ExampleCard>

            <ExampleCard
              title="Alert com Ações"
              description="Alert que inclui botões para ações do usuário"
              snippet={snippets.actions}
            >
              <Alert className="border-yellow-500 bg-yellow-50 text-yellow-800">
                <Warning size={16} />
                <AlertTitle>Atualização Disponível</AlertTitle>
                <AlertDescription className="mb-3">
                  Uma nova versão da aplicação está disponível. Recomendamos
                  atualizar para obter as últimas funcionalidades.
                </AlertDescription>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    Atualizar Agora
                  </Button>
                  <Button size="sm" variant="outline">
                    Lembrar Depois
                  </Button>
                </div>
              </Alert>
            </ExampleCard>

            <ExampleCard
              title="Alert sem Título"
              description="Alert simplificado apenas com descrição"
              snippet={`<Alert>
  <Info size={16} />
  <AlertDescription>
    Informação importante sem título específico.
  </AlertDescription>
</Alert>`}
            >
              <Alert>
                <Info size={16} />
                <AlertDescription>
                  Informação importante sem título específico.
                </AlertDescription>
              </Alert>
            </ExampleCard>

            <ExampleCard
              title="Alert com Badge"
              description="Combinando alert com badge para destacar informações"
              snippet={`<Alert className="border-blue-500 bg-blue-50 text-blue-800">
  <Info size={16} />
  <div className="flex items-start justify-between">
    <div className="flex-1">
      <AlertTitle>Nova Funcionalidade</AlertTitle>
      <AlertDescription>
        Agora você pode exportar seus dados em formato CSV.
      </AlertDescription>
    </div>
    <Badge className="bg-blue-600 hover:bg-blue-700 ml-3">
      Novo
    </Badge>
  </div>
</Alert>`}
            >
              <Alert className="border-blue-500 bg-blue-50 text-blue-800">
                <Info size={16} />
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <AlertTitle>Nova Funcionalidade</AlertTitle>
                    <AlertDescription>
                      Agora você pode exportar seus dados em formato CSV.
                    </AlertDescription>
                  </div>
                  <Badge className="bg-blue-600 hover:bg-blue-700 ml-3">
                    Novo
                  </Badge>
                </div>
              </Alert>
            </ExampleCard>

            <ExampleCard
              title="Alert com Gradiente"
              description="Alert moderno com fundo em gradiente"
              snippet={`<Alert className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
  <Heart size={16} />
  <AlertTitle>Feedback dos Usuários</AlertTitle>
  <AlertDescription>
    Obrigado por ser um usuário incrível da nossa plataforma!
  </AlertDescription>
</Alert>`}
            >
              <Alert className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
                <Heart size={16} />
                <AlertTitle>Feedback dos Usuários</AlertTitle>
                <AlertDescription>
                  Obrigado por ser um usuário incrível da nossa plataforma!
                </AlertDescription>
              </Alert>
            </ExampleCard>
          </div>
        </div>
      </div>
    </div>
  );
}
