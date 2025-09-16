<div align="center">

<img src="./public/logo.png" alt="glacien Logo" width="160" height="160" />

---

![Alt](https://repobeats.axiom.co/api/embed/daa29dc86cb7b8844337c5528be01db2239880ad.svg "Repobeats analytics image")

**A maior e mais profissional biblioteca de componentes React para aplicações modernas.**

[![npm version](https://img.shields.io/npm/v/@glacien/ui?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@glacien/ui)
[![Downloads](https://img.shields.io/npm/dm/@glacien/ui?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@glacien/ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[📖 **Documentação**](https://Glacien.online/docs) • [🚀 **Live Demo**](https://Glacien.online) • [📦 **NPM**](https://www.npmjs.com/package/@glacien/ui) • [🐛 **Reportar Issues**](https://github.com/glatztp/Glacien/issues) • [💬 **Discussões**](https://github.com/glatztp/Glacien/discussions)

</div>

---

## Sobre

@glacien/ui é uma biblioteca robusta de componentes React, criada para elevar o padrão de aplicações web modernas. São dezenas de componentes profissionais, acessíveis, altamente customizáveis e prontos para produção, com foco em performance, experiência do desenvolvedor e design consistente.

- **+50 componentes**: UI, navegação, formulários, overlays, feedback, layout, dados e mais
- **Acessibilidade**: Totalmente compatível com WCAG 2.1 AA
- **Theming avançado**: Suporte completo a dark mode e customização via CSS variables
- **TypeScript first**: Tipagem rigorosa e IntelliSense completo
- **Compatível**: Next.js, Vite, CRA, Remix, Gatsby e outros
- **Tree-shakeable**: Importação seletiva para bundles leves
- **Documentação completa**: Exemplos, playground e guias detalhados

---

## Principais Diferenciais

- **Componentes Profissionais**: Design enterprise, responsivo e pronto para produção
- **Customização Total**: Props avançadas, variantes, integração fácil com tokens de design
- **Performance**: Otimizado para SSR, lazy loading e animações fluidas
- **Acessibilidade Real**: Foco em navegação por teclado, ARIA, contraste e testes automatizados
- **Integração Simples**: Instale e use em qualquer stack React moderna

---

## Instalação

```bash
npm install @glacien/ui lucide-react
# ou
yarn add @glacien/ui lucide-react
# ou
pnpm add @glacien/ui lucide-react
```

Veja a [documentação de instalação](https://glacien.online/docs/installation) para exemplos de setup em Next.js, Vite, CRA, Remix e Gatsby.

---

## Exemplo Rápido

```tsx
import { Button, Card, Input } from "@glacien/ui";

export default function App() {
  return (
    <Card className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao glacien UI</h1>
      <Input placeholder="Seu e-mail" className="mb-4" />
      <Button className="w-full">Começar</Button>
    </Card>
  );
}
```

---

## Componentes

@glacien/ui oferece uma coleção completa de componentes para todas as necessidades:

- **Formulários**: Button, Input, Textarea, Checkbox, Radio, Switch, Label, Slider, DatePicker, Calendar, Input OTP
- **Navegação**: NavigationMenu, Menubar, Tabs, Pagination, Breadcrumb, Command
- **Overlays**: Dialog, AlertDialog, Popover, Tooltip, Sheet, Drawer, HoverCard, ContextMenu, DropdownMenu, Combobox
- **Feedback**: Alert, Toast, Sonner, Progress, Skeleton, Badge
- **Layout**: Card, Separator, ScrollArea, Accordion, Collapsible, Resizable, AspectRatio, Container
- **Dados**: DataTable, Avatar, Table, List, Timeline

Veja a [lista completa de componentes](https://glacien.online/docs/components) com exemplos e playground.

---

## Theming & Customização

- **Dark Mode**: Suporte nativo e detecção automática
- **Tokens de Design**: Customização via CSS variables
- **Exemplo**:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --background: 0 0% 100%;
  --radius: 0.5rem;
}
```

---

## Acessibilidade

Todos os componentes seguem as melhores práticas de acessibilidade:

- Navegação por teclado
- ARIA roles e labels
- Contraste de cores
- Foco visível
- Testes automatizados com axe-core

---

## Performance

- Importação seletiva (tree-shaking)
- Lazy loading para componentes pesados
- Animações otimizadas com Framer Motion
- Bundle size monitorado via Bundlephobia

---

## Como Contribuir

Contribuições são bem-vindas! Veja o [Guia de Contribuição](CONTRIBUTING.md) para detalhes.

- [Abrir Issue](https://github.com/glatztp/glacien/issues/new?template=bug_report.md)
- [Sugerir Feature](https://github.com/glatztp/glacien/issues/new?template=feature_request.md)
- [Pull Requests](https://github.com/glatztp/glacien/pulls)

---

## Estatísticas

- **+50 componentes**
- **100% TypeScript**
- **Cobertura de testes crescente**
- **Milhares de downloads mensais**
- **Utilizado em projetos enterprise e startups**

---

## Licença

MIT License © 2025 [glatztp](https://github.com/glatztp)

---

<div align="center">

**Feito com profissionalismo por [glatztp](https://github.com/glatztp)**

⭐ Se este projeto te ajudou, deixe uma estrela no GitHub! ⭐

[![GitHub stars](https://img.shields.io/github/stars/glatztp/glacien?style=social)](https://github.com/glatztp/glacien/stargazers)

</div>
