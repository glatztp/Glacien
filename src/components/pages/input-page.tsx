import React from "react";
import { Button, Input } from "../../index";
import { Eye, EyeSlash } from "phosphor-react";
import ExampleCard from "../ui/ExampleCard";

export function InputPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const snippets = {
    full: `import { Input, Label } from "@glacien/ui";

export function MyExample() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full-name">Nome Completo</Label>
        <Input id="full-name" placeholder="Digite seu nome..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="full-email">Email</Label>
        <Input id="full-email" type="email" placeholder="email@exemplo.com" />
      </div>
    </div>
  );
}`,
    basic: `
        <Input placeholder="Digite seu nome..." />
    
        <Input placeholder="seu@email.com" />
     
        <Input placeholder="(11) 99999-9999" />
      `,
    icons: `import { Input, Label } from "@glacien/ui";
import { User, EnvelopeSimple, Phone, MapPin } from "phosphor-react";

export function Example() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="icon-user">Usuário</Label>
        <div className="relative">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input id="icon-user" type="text" placeholder="Nome de usuário" className="pl-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="icon-email">Email</Label>
        <div className="relative">
          <EnvelopeSimple size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input id="icon-email" type="email" placeholder="email@exemplo.com" className="pl-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="icon-phone">Telefone</Label>
        <div className="relative">
          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input id="icon-phone" type="tel" placeholder="(11) 99999-9999" className="pl-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="icon-address">Endereço</Label>
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input id="icon-address" type="text" placeholder="Rua Exemplo, 123" className="pl-10" />
        </div>
      </div>
    </div>
  );
}`,
    password: `import { Input, Label } from "@glacien/ui";
import { Eye, EyeSlash } from "phosphor-react";

export function Example() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor="password">Senha</Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}`,
    states: `import { Input, Label } from "@glacien/ui";

export function Example() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="disabled">Desabilitado</Label>
        <Input id="disabled" placeholder="Não editável" disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="readonly">Somente leitura</Label>
        <Input id="readonly" defaultValue="Apenas leitura" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="error">Com erro</Label>
        <Input id="error" placeholder="Erro..." className="border-red-500" />
        <p className="text-sm text-red-500">Mensagem de erro</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="success">Com sucesso</Label>
        <Input id="success" placeholder="Certo!" className="border-green-500" />
        <p className="text-sm text-green-500">Tudo certo</p>
      </div>
    </div>
  );
}`,
    textarea: `import { Label } from "@glacien/ui";

export function Example() {
  return (
    <div className="space-y-2">
      <Label htmlFor="textarea">Mensagem</Label>
      <textarea
        id="textarea"
        placeholder="Digite sua mensagem..."
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        rows={4}
      />
    </div>
  );
}`,
    form: `import { Input, Label, Button } from "@glacien/ui";

export function Example() {
  return (
    <form className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="form-name">Nome</Label>
        <Input id="form-name" placeholder="Digite seu nome" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="form-email">Email</Label>
        <Input id="form-email" type="email" placeholder="Digite seu email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="form-password">Senha</Label>
        <Input id="form-password" type="password" placeholder="Digite sua senha" required />
      </div>
      <Button type="submit" className="w-full">Cadastrar</Button>
    </form>
  );
}`,
  };

  return (
    <div className="flex gap-6 min-h-screen pt-12">
      <div className="flex-1 overflow-auto">
        <div className="space-y-8 p-6">
          <div>
            <h1 className="text-3xl font-bold">Input Component</h1>
            <p className="text-muted-foreground mt-2">
              Campos de entrada flexíveis, com suporte a ícones, validação,
              estados e muito mais.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ExampleCard
              title="Exemplo Completo"
              description="Como importar e usar o Input na sua aplicação (TSX)"
              snippet={snippets.full}
            >
              <div className="space-y-2">
                <Input placeholder="Digite seu nome..." />
                <Input placeholder="seu@email.com" />
                <Input placeholder="(11) 99999-9999" />
              </div>
            </ExampleCard>

            <ExampleCard
              title="Input Básico"
              description="Inputs simples para texto, email e telefone"
              snippet={snippets.basic}
            >
              <div className="space-y-2">
                <Input placeholder="Digite seu nome..." />
                <Input placeholder="seu@email.com" />
                <Input placeholder="(11) 99999-9999" />
              </div>
            </ExampleCard>

            <ExampleCard
              title="Input com Ícones"
              description="Versão compacta dos inputs com ícones (exemplo)"
              snippet={snippets.icons}
            >
              <div className="space-y-2">
                <Input placeholder="Digite seu nome..." />
                <Input placeholder="seu@email.com" />
                <Input placeholder="(11) 99999-9999" />
              </div>
            </ExampleCard>

            <ExampleCard
              title="Input de Senha"
              description="Campo de senha compacto"
              snippet={snippets.password}
            >
              <div className="flex items-center gap-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-muted-foreground"
                >
                  {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </ExampleCard>

            <ExampleCard
              title="Estados do Input"
              description="Exemplos compactos de estados"
              snippet={snippets.states}
            >
              <div className="space-y-2">
                <Input placeholder="Desabilitado" disabled />
                <Input defaultValue="Apenas leitura" readOnly />
              </div>
            </ExampleCard>

            <ExampleCard
              title="Textarea"
              description="Campo de texto para múltiplas linhas"
              snippet={snippets.textarea}
            >
              <div>
                <textarea
                  placeholder="Digite sua mensagem..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
            </ExampleCard>

            <ExampleCard
              title="Formulário Completo"
              description="Versão compacta do formulário"
              snippet={snippets.form}
            >
              <form className="space-y-2 max-w-md">
                <Input placeholder="Nome" />
                <Input placeholder="Email" />
                <Button type="submit" className="w-full">
                  Cadastrar
                </Button>
              </form>
            </ExampleCard>
          </div>
        </div>
      </div>
    </div>
  );
}
