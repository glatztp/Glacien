"use client";

import React, { useState } from "react";
import Seo from "./Seo";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from "../ui";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Copy,
  CheckCircle,
  AlertCircle,
  FileText,
  Activity,
  ChevronRight,
  Monitor,
} from "lucide-react";
import { Lightning } from "phosphor-react";
import {
  SiNextdotjs,
  SiVite,
  SiReact,
  SiRemix,
  SiGatsby,
  SiFiles,
} from "react-icons/si";

interface NavigationItem {
  id: string;
  label: string;
  description?: string;
  isNew?: boolean;
}

interface NavigationCategory {
  title: string;
  items: NavigationItem[];
}

const navigationStructure: NavigationCategory[] = [
  {
    title: "Getting Started",
    items: [
      {
        id: "introduction",
        label: "Introduction",
        description: "Visão geral e conceitos fundamentais",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        description: "Dependências e configurações necessárias",
      },
      {
        id: "setup",
        label: "Installation",
        description: "Guia de instalação e configuração",
      },
      {
        id: "compatibility",
        label: "Compatibility",
        description: "Suporte a frameworks e navegadores",
        isNew: true,
      },
    ],
  },
  {
    title: "Concepts",
    items: [
      {
        id: "architecture",
        label: "Architecture",
        description: "Estrutura e padrões de design",
      },
      {
        id: "specifications",
        label: "Specifications",
        description: "Requisitos técnicos detalhados",
      },
    ],
  },
  {
    title: "Guides",
    items: [
      {
        id: "integration",
        label: "Integration",
        description: "Implementação em projetos existentes",
        isNew: true,
      },
      {
        id: "verification",
        label: "Verification",
        description: "Testes e validação da instalação",
        isNew: true,
      },
      {
        id: "theming",
        label: "Theming",
        description: "Personalização e temas",
      },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        id: "api",
        label: "API Reference",
        description: "Documentação completa da API",
      },
      {
        id: "advanced",
        label: "Advanced",
        description: "Configurações para casos específicos",
      },
      {
        id: "deployment",
        label: "Deployment",
        description: "Guias de implantação em produção",
      },
    ],
  },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [selectedFramework, setSelectedFramework] = useState<string | null>(
    null
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Função para obter todas as seções em ordem
  const getAllSections = () => {
    return navigationStructure.flatMap((category) => category.items);
  };

  // Função para navegar para próxima seção
  const getNextSection = (currentId: string) => {
    const allSections = getAllSections();
    const currentIndex = allSections.findIndex((item) => item.id === currentId);
    return currentIndex < allSections.length - 1
      ? allSections[currentIndex + 1]
      : null;
  };

  // Função para navegar para seção anterior
  const getPreviousSection = (currentId: string) => {
    const allSections = getAllSections();
    const currentIndex = allSections.findIndex((item) => item.id === currentId);
    return currentIndex > 0 ? allSections[currentIndex - 1] : null;
  };

  // Componente de navegação entre seções
  const SectionNavigation = ({
    currentSectionId,
  }: {
    currentSectionId: string;
  }) => {
    const nextSection = getNextSection(currentSectionId);
    const prevSection = getPreviousSection(currentSectionId);

    return (
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {prevSection && (
              <Button
                variant="outline"
                onClick={() => setActiveSection(prevSection.id)}
                className="inline-flex items-center gap-3 px-3 py-2 rounded-md border border-border hover:bg-background/50 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <ArrowLeft size={16} className="shrink-0" />
                <div className="text-left overflow-hidden">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium truncate max-w-[220px]">
                    {prevSection.label}
                  </div>
                </div>
              </Button>
            )}
          </div>

          <div className="flex-1 text-center">
            <Button
              variant="ghost"
              onClick={() => setActiveSection("introduction")}
              className="text-muted-foreground hover:text-foreground"
            >
              <BookOpen size={16} className="mr-2" />
              Back to Introduction
            </Button>
          </div>

          <div className="flex-1 flex justify-end">
            {nextSection && (
              <Button
                onClick={() => setActiveSection(nextSection.id)}
                className="inline-flex items-center gap-3 px-3 py-2 rounded-md border border-border hover:bg-background/50 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <div className="text-right overflow-hidden">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="font-medium truncate max-w-[220px]">
                    {nextSection.label}
                  </div>
                </div>
                <ArrowRight size={16} className="shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`@Glacien/ui — ${activeSection}`}
        description={`Documentação - ${activeSection} · Glacien UI — Component library com exemplos, guias e integração.`}
        canonical={`https://glacien.online/docs#${activeSection}`}
        breadcrumbs={[
          { name: "Documentation", url: "https://glacien.online/docs" },
          {
            name: activeSection,
            url: `https://glacien.online/docs#${activeSection}`,
          },
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Estilo shadcn/ui */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-lg font-semibold tracking-tight mb-1">
                  @Glacien/ui
                </h2>
                <p className="text-sm text-muted-foreground">
                  Component library documentation
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-6">
                {navigationStructure.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-3">
                    {/* Category Title */}
                    <h3 className="text-sm font-medium text-foreground tracking-tight">
                      {category.title}
                    </h3>

                    {/* Category Items */}
                    <div className="space-y-1">
                      {category.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full flex items-center justify-between px-2 py-1.5 text-left rounded-md transition-colors text-sm ${
                            activeSection === item.id
                              ? "bg-secondary text-secondary-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{item.label}</span>
                            {item.isNew && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-1.5 py-0 bg-blue-100 text-blue-700 border-blue-200"
                              >
                                New
                              </Badge>
                            )}
                          </div>

                          {activeSection === item.id && (
                            <ChevronRight
                              size={12}
                              className="text-secondary-foreground opacity-70"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Help Section */}
              <div className="pt-6 border-t border-border">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Help</h4>
                  <div className="space-y-1">
                    <button className="w-full text-left px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors">
                      GitHub
                    </button>
                   
                    <button className="w-full text-left px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors">
                      Changelog
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header with Breadcrumb and Navigation */}
            <div className="mb-8 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Documentation</span>
                  <span>/</span>
                  <span className="text-foreground font-medium">
                    {navigationStructure
                      .flatMap((cat) => cat.items)
                      .find((item) => item.id === activeSection)?.label ||
                      "Section"}
                  </span>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-1">
                  {(() => {
                    const previousSection = getPreviousSection(activeSection);
                    return previousSection ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveSection(previousSection.id)}
                        className="h-9 min-w-[56px] px-2 flex items-center justify-center rounded-full border border-transparent hover:bg-background/60 hover:border-border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        title={`Previous: ${previousSection.label}`}
                      >
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline-block ml-2 text-sm text-muted-foreground max-w-[140px] truncate">
                          {previousSection.label}
                        </span>
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="h-9 w-9 p-0 flex items-center justify-center rounded-full border border-border/40 bg-background/30 text-muted-foreground cursor-not-allowed"
                        title="No previous section"
                      >
                        <ArrowLeft size={16} />
                      </Button>
                    );
                  })()}

                  {(() => {
                    const nextSection = getNextSection(activeSection);
                    return nextSection ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveSection(nextSection.id)}
                        className="h-9 min-w-[56px] px-2 flex items-center justify-center rounded-full border border-transparent hover:bg-background/60 hover:border-border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        title={`Next: ${nextSection.label}`}
                      >
                        <span className="hidden sm:inline-block mr-2 text-sm text-muted-foreground max-w-[140px] truncate text-right">
                          {nextSection.label}
                        </span>
                        <ArrowRight size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="h-9 w-9 p-0 flex items-center justify-center rounded-full border border-border/40 bg-background/30 text-muted-foreground cursor-not-allowed"
                        title="No next section"
                      >
                        <ArrowRight size={16} />
                      </Button>
                    );
                  })()}
                </div>
              </div>
            </div>
            {activeSection === "introduction" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">
                    Introduction
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A modern React component library built with TypeScript,
                    Tailwind CSS, and Radix UI primitives. Designed for
                    performance, accessibility, and developer experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2">High Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimized for fast loading and smooth interactions
                    </p>
                  </Card>

                  <Card className="p-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Accessible</h3>
                    <p className="text-sm text-muted-foreground">
                      WCAG 2.1 AA compliant with screen reader support
                    </p>
                  </Card>

                  <Card className="p-6">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Type Safe</h3>
                    <p className="text-sm text-muted-foreground">
                      Built with TypeScript for better developer experience
                    </p>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription>
                      Get up and running in minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-secondary p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Install the package
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyToClipboard("npm install @glacien/ui")
                          }
                        >
                          <Copy size={14} />
                        </Button>
                      </div>
                      <code className="text-sm">npm install @glacien/ui</code>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setActiveSection("setup")}
                    >
                      View Installation Guide
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="introduction" />
              </motion.div>
            )}
            {/* Section: Prerequisites */}
            {activeSection === "prerequisites" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Prerequisites
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Requirements and dependencies needed before installation.
                  </p>
                </div>

                <Card className="border-primary/30 bg-primary/5 dark:border-primary-800 dark:bg-primary-950/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary dark:text-primary/70">
                      <AlertCircle size={20} />
                      Requisitos & Verificações
                    </CardTitle>
                    <CardDescription>
                      Dependências mínimas, opções recomendadas e comandos para
                      verificar seu ambiente de desenvolvimento.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Obrigatórios</h4>
                        {[
                          {
                            name: "Node.js",
                            version: "16.14.0+",
                            description:
                              "Runtime JavaScript usado pelas ferramentas de build e pelo package manager.",
                            check: "node -v",
                          },
                          {
                            name: "npm / pnpm / yarn",
                            version: "8+ / 7+ / 1+",
                            description:
                              "Gerenciador de pacotes — use o que preferir (npm é padrão).",
                            check: "npm -v",
                          },
                          {
                            name: "React",
                            version: "18.0.0+",
                            description:
                              "Biblioteca principal para os componentes.",
                            check:
                              "npm ls react --depth=0 || npx react --version",
                          },
                        ].map((it, i) => (
                          <div
                            key={i}
                            className="p-4 bg-primary/5  rounded-lg border border-primary/20 flex items-start gap-4"
                          >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <Monitor size={18} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold">{it.name}</div>
                                <Badge variant="outline">{it.version}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {it.description}
                              </div>
                              <div className="flex items-center gap-2">
                                <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                                  {it.check}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    navigator.clipboard.writeText(it.check)
                                  }
                                >
                                  <Copy size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">
                          Opcionais & Ferramentas
                        </h4>
                        <div className="p-4 bg-primary/5  rounded-lg border border-primary/20 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <FileText size={18} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="font-semibold">
                                  Tailwind CSS
                                </div>
                                <Badge variant="outline">3.x+</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Recomendado para estilos utilitários e
                                consistência.
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <Lightning size={18} className="text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="font-semibold">
                                  Vite / Next / Remix
                                </div>
                                <Badge variant="outline">Compatível</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Escolha a plataforma que melhor se encaixa ao
                                seu fluxo de trabalho.
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                              <CheckCircle size={18} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold">
                                Ferramentas de teste
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Jest / Vitest para testes unitários e integração
                                (opcional).
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <div className="font-semibold">
                                Verifique seu ambiente
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Execute os comandos abaixo para garantir que
                                tudo esteja pronto.
                              </div>
                              <pre className="mt-3 text-sm font-mono bg-background/50 p-3 rounded">
                                node -v npm -v npx -v
                              </pre>
                              <div className="mt-3 flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      "node -v\nnpm -v\nnpx -v"
                                    )
                                  }
                                >
                                  Copiar comandos
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setTimeout(
                                      () =>
                                        window.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                        }),
                                      10
                                    )
                                  }
                                >
                                  Ajuda
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg p-4 bg-primary/10 border border-primary/30">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <CheckCircle className="text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">Dica</div>
                          <div className="text-sm text-muted-foreground">
                            Usar um gerenciador de versões do Node (nvm ou
                            volta) facilita manter a compatibilidade entre
                            projetos.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="prerequisites" />
              </motion.div>
            )}
            {/* Section: Installation */}
            {activeSection === "setup" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Instalação
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Como instalar as dependências e estruturar seu app.
                  </p>
                </div>
                {(() => {
                  const frameworks = [
                    {
                      name: "Next.js",
                      icon: <SiNextdotjs className="h-10 w-10" aria-hidden />,
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   export default function Page() {\n     return (\n       <Card><Button>Olá Next.js</Button></Card>\n     );\n   }`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Vite",
                      icon: <SiVite className="h-10 w-10" aria-hidden />,
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   function App() {\n     return (\n       <Card><Button>Olá Vite</Button></Card>\n     );\n   }`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Create React App",
                      icon: <SiReact className="h-10 w-10" aria-hidden />,
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   function App() {\n     return (\n       <Card><Button>Olá CRA</Button></Card>\n     );\n   }`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Remix",
                      icon: <SiRemix className="h-10 w-10" aria-hidden />,
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   export default function Index() {\n     return (\n       <Card><Button>Olá Remix</Button></Card>\n     );\n   }`,
                        "   content: ['./app/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Gatsby",
                      icon: <SiGatsby className="h-10 w-10" aria-hidden />,
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   export default function Home() {\n     return (\n       <Card><Button>Olá Gatsby</Button></Card>\n     );\n   }`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Manual",
                      icon: <SiFiles className="h-10 w-10" aria-hidden />,
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   // Exemplo:\n   <Card><Button>Olá Manual</Button></Card>`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                  ];

                  if (!selectedFramework) {
                    return (
                      <div className="grid gap-4 grid-cols-3 grid-rows-2">
                        {frameworks.map((fw) => (
                          <Card
                            key={fw.name}
                            className="group cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] border-2 hover:border-primary/20"
                            onClick={() => setSelectedFramework(fw.name)}
                          >
                            <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[140px]">
                              <div className="mb-4 text-muted-foreground group-hover:text-primary transition-colors">
                                {fw.icon}
                              </div>
                              <p className="font-medium group-hover:text-primary transition-colors">
                                {fw.name}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    );
                  } else {
                    // Passo a passo detalhado estilizado
                    const fw = frameworks.find(
                      (f) => f.name === selectedFramework
                    );
                    const stepIcons = [
                      <Copy key="copy" className="text-blue-500" size={18} />,
                      <Monitor
                        key="monitor"
                        className="text-green-500"
                        size={18}
                      />,
                      <Lightning
                        key="lightning"
                        className="text-purple-500"
                        size={18}
                      />,
                      <FileText
                        key="file"
                        className="text-orange-500"
                        size={18}
                      />,
                    ];
                    return (
                      <div className="space-y-6">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedFramework(null)}
                        >
                          Voltar
                        </Button>
                        <h2 className="text-2xl font-bold tracking-tight mb-4">
                          Instalação: {fw?.name}
                        </h2>
                        <ol className="space-y-4">
                          {fw?.steps.map((step, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.2 + i * 0.35,
                                duration: 0.6,
                                ease: "easeOut",
                              }}
                              className="relative flex items-start gap-4 bg-gradient-to-br from-secondary/60 to-background/80 dark:from-secondary/80 dark:to-background/60 border border-border p-4 rounded-xl shadow-sm"
                            >
                              <div className="flex flex-col items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                                  {stepIcons[i] || (
                                    <FileText
                                      className="text-primary"
                                      size={18}
                                    />
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground font-bold">
                                  {i + 1}
                                </span>
                              </div>
                              <div className="flex-1">
                                <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed">
                                  {step}
                                </pre>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-2 right-2"
                                onClick={() =>
                                  navigator.clipboard.writeText(step)
                                }
                                title="Copiar passo"
                              >
                                <Copy size={14} />
                              </Button>
                            </motion.li>
                          ))}
                        </ol>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.2 + (fw?.steps.length || 0) * 0.35,
                            duration: 0.6,
                          }}
                          className="text-sm text-muted-foreground"
                        >
                          Siga os passos acima para instalar e usar a biblioteca
                          no seu projeto {fw?.name}.
                        </motion.p>
                      </div>
                    );
                  }
                })()}

                <SectionNavigation currentSectionId="setup" />
              </motion.div>
            )}
            {activeSection === "compatibility" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Compatibility
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Suporte completo a frameworks modernos e navegadores.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frameworks Suportados</CardTitle>
                      <CardDescription className="mt-1">
                        Suporte e notas rápidas por plataforma — use a que
                        melhor se adequa ao seu fluxo (SSR, SPA, Edge).
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        {
                          name: "Next.js",
                          version: "13.x - 15.x",
                          icon: <SiNextdotjs className="h-6 w-6" aria-hidden />,
                          note: "SSR & Edge-ready",
                        },
                        {
                          name: "Vite + React",
                          version: "4.x, 5.x",
                          icon: <SiVite className="h-6 w-6" aria-hidden />,
                          note: "Fast dev server, ideal para SPAs",
                        },
                        {
                          name: "Create React App",
                          version: "5.x",
                          icon: <SiReact className="h-6 w-6" aria-hidden />,
                          note: "Compatível com projetos legados",
                        },
                        {
                          name: "Remix",
                          version: "1.x - 2.x",
                          icon: <SiRemix className="h-6 w-6" aria-hidden />,
                          note: "Boa integração com rotas e loaders",
                        },
                        {
                          name: "Gatsby",
                          version: "4.x, 5.x",
                          icon: <SiGatsby className="h-6 w-6" aria-hidden />,
                          note: "Static site generation",
                        },
                      ].map((framework, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              {framework.icon}
                            </div>
                            <div>
                              <div className="font-medium">
                                {framework.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {framework.note}
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-600 text-white">
                            {framework.version}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Navegadores</CardTitle>
                      <CardDescription className="mt-1">
                        Suporte recomendado — recomendamos foco em navegadores
                        evergreen para melhor experiência.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        {
                          name: "Chrome",
                          version: "90+",
                          note: "Full support",
                        },
                        {
                          name: "Firefox",
                          version: "88+",
                          note: "Full support",
                        },
                        {
                          name: "Safari",
                          version: "14+",
                          note: "Partial: CSS features",
                        },
                        { name: "Edge", version: "90+", note: "Full support" },
                      ].map((browser, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{browser.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {browser.version} · {browser.note}
                            </div>
                          </div>
                          <Badge className="bg-green-600 text-white">
                            Suportado
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Notas de Compatibilidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Recomendamos dar suporte a navegadores modernos
                      (evergreen). Para compatibilidade com navegadores antigos
                      configure um pipeline de polyfills (ex.: core-js) e revise
                      seu
                      <code className="mx-1 font-mono text-xs">
                        browserslist
                      </code>
                      .
                    </p>
                    <div className="mt-3 text-sm flex gap-2">
                      <Badge variant="outline">ES Modules</Badge>
                      <Badge variant="outline">HTTP/2 / Brotli</Badge>
                      <Badge variant="outline">Service Worker</Badge>
                    </div>
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="compatibility" />
              </motion.div>
            )}
            {/* Section: Architecture */}
            {activeSection === "architecture" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Architecture
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Compreenda a estrutura interna e padrões de design da
                    biblioteca.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Estrutura de Camadas</CardTitle>
                    <CardDescription>
                      Visão resumida das camadas da biblioteca,
                      responsabilidades e tecnologias recomendadas.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                      {[
                        {
                          title: "Apresentação",
                          desc: "Componentes compostos com foco em UX, consistência e acessibilidade.",
                          tags: ["React 18", "TypeScript", "Framer Motion"],
                        },
                        {
                          title: "Estilização",
                          desc: "Tokens de design, sistema de temas e utilitários responsivos.",
                          tags: ["Tailwind CSS", "CSS Vars", "PostCSS"],
                        },
                        {
                          title: "Primitives",
                          desc: "Elementos acessíveis e desacoplados (Radix/Headless) para composição.",
                          tags: ["Radix UI", "ARIA", "Headless"],
                        },
                      ].map((col, i) => (
                        <div
                          key={i}
                          className="p-6 rounded-xl bg-background/50 border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="font-semibold">{col.title}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {col.desc}
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {col.tags.map((t) => (
                                  <Badge
                                    key={t}
                                    variant="outline"
                                    className="text-xs px-2 py-0.5"
                                  >
                                    {t}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div className="rounded-xl p-6 bg-background/40 border border-border">
                        <div className="font-semibold mb-2">
                          Práticas recomendadas
                        </div>
                        <ul className="text-sm list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>
                            Prefira composição em vez de herança de estilos.
                          </li>
                          <li>
                            Exponha props pequenas e previsíveis (variant, size,
                            disabled).
                          </li>
                          <li>
                            Mantenha os tokens de cor e espaçamento
                            centralizados.
                          </li>
                          <li>
                            Escreva testes de snapshot e acessibilidade para
                            componentes críticos.
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-xl p-6 bg-background/40 border border-border">
                        <div className="font-semibold mb-2">
                          Checklist de Acessibilidade
                        </div>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="text-green-600 min-w-[20px] mt-1" />
                            <div className="leading-snug">
                              Semântica correta (buttons, labels)
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="text-green-600 min-w-[20px] mt-1" />
                            <div className="leading-snug">
                              Contraste mínimo WCAG AA
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="text-green-600 min-w-[20px] mt-1" />
                            <div className="leading-snug">
                              Navegação por teclado completa
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="text-green-600 min-w-[20px] mt-1" />
                            <div className="leading-snug">
                              Estados ARIA para componentes interativos
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="architecture" />
              </motion.div>
            )}
            {/* Section: Integration */}
            {activeSection === "integration" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Integration
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Como integrar a biblioteca em projetos existentes sem
                    breaking changes — estratégias, exemplos práticos e comandos
                    prontos para copiar.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Migração Gradual</CardTitle>
                      <CardDescription>
                        Integre componentes progressivamente, valide visual e
                        comportamento por etapas.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Comece importando componentes não críticos (Botões,
                        Badges), execute testes visuais e de acessibilidade e
                        então avance para layouts e padrões globais.
                      </p>

                      <div className="rounded-lg p-3 bg-muted/50 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Instalar</div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyToClipboard("npm install @glacien/ui")
                            }
                          >
                            <Copy size={12} />
                          </Button>
                        </div>

                        <div className="text-sm font-mono bg-background/50 p-3 rounded whitespace-pre-wrap">
                          npm install @glacien/ui
                        </div>
                      </div>

                      <div>
                        <div className="font-medium mb-1">Exemplo mínimo</div>
                        <div className="text-sm font-mono bg-background/50 p-3 rounded whitespace-pre-wrap">
                          {`import { Button } from '@glacien/ui';

export default function Example() {
  return <Button>Olá Glacien</Button>;
}`}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Importe apenas os componentes que utilizar para manter
                          bundle enxuto.
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>CSS / Tailwind</CardTitle>
                      <CardDescription>
                        Como evitar conflitos e garantir que o Tailwind capture
                        classes usadas pela biblioteca.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Adicione o diretório da distribuição da biblioteca em
                        <code className="mx-1 font-mono">content</code> do
                        tailwind.config.js para evitar perda de classes.
                      </p>

                      <div className="p-3 bg-muted/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">
                            Exemplo tailwind.config.js
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyToClipboard(
                                `module.exports = {
              content: [
                './src/**/*.{js,ts,jsx,tsx}',
                './node_modules/@glacien/ui/dist/**/*.js'
              ],
            };`
                              )
                            }
                          >
                            <Copy size={12} />
                          </Button>
                        </div>

                        <div className="text-sm font-mono bg-background/50 p-3 rounded whitespace-pre-wrap">
                          {`module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@glacien/ui/dist/**/*.js'
  ],
};`}
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Em casos de conflito de tokens prefira:
                        <ul className="list-disc pl-5 mt-2">
                          <li>Override via CSS variables do tema</li>
                          <li>Usar prefix em Tailwind (se necessário)</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Import & Tree-shaking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Use named imports do pacote principal para garantir
                        tree-shaking e evitar bundles desnecessários.
                      </p>

                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-background/50 rounded border border-border">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-semibold text-sm text-muted-foreground">
                              Recomendado
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  "import { Button } from '@glacien/ui';"
                                )
                              }
                            >
                              <Copy size={14} />
                            </Button>
                          </div>
                          <div className="text-sm font-mono whitespace-pre-wrap">
                            {"import { Button } from '@glacien/ui;"}
                          </div>
                        </div>

                        <div className="p-3 bg-background/50 rounded border border-border">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-semibold text-sm text-muted-foreground">
                              Evitar
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  "import Glacien from '@glacien/ui/dist/full-bundle';"
                                )
                              }
                            >
                              <Copy size={14} />
                            </Button>
                          </div>
                          <div className="text-sm font-mono whitespace-pre-wrap">
                            import Glacien from '@glacien/ui/dist/full-bundle';
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Theming & Provider</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Passe tokens via provider para centralizar tema e evitar
                        mutações diretas nos componentes.
                      </p>

                      <div className="text-sm font-mono bg-background/50 p-3 rounded whitespace-pre-wrap">
                        {`<GlacienProvider theme={{ colors: { primary: '#1e3a8a' } }}>
  <App />
</GlacienProvider>`}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Exemplos & Troubleshooting</CardTitle>
                    <CardDescription>
                      Trechos prontos para copiar e problemas comuns com
                      soluções
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div>
                        <div className="font-medium">Import errado</div>
                        <div>
                          Se você importar todo o pacote e notar aumento de
                          bundle, verifique se está usando named imports.
                        </div>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-background/50 rounded border border-border">
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-semibold text-sm text-muted-foreground">
                                Evitar
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    "import Glacien from '@glacien/ui/dist/full-bundle';"
                                  )
                                }
                              >
                                <Copy size={14} />
                              </Button>
                            </div>
                            <div className="text-sm font-mono whitespace-pre-wrap">
                              import Glacien from
                              '@glacien/ui/dist/full-bundle';
                            </div>
                          </div>

                          <div className="p-3 bg-background/50 rounded border border-border">
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-semibold text-sm text-muted-foreground">
                                Recomendado
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    "import { Button } from '@glacien/ui';"
                                  )
                                }
                              >
                                <Copy size={14} />
                              </Button>
                            </div>
                            <div className="text-sm font-mono whitespace-pre-wrap">
                              {"import { Button } from '@glacien/ui;"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium">SSR issues</div>
                        <div>
                          Para componentes que usam window/DOM, carregue no
                          cliente: dynamic import / React.lazy / useEffect.
                        </div>
                        <div className="mt-2 text-sm font-mono bg-background/50 p-3 rounded whitespace-pre-wrap">
                          {`// Next.js dynamic import
import dynamic from 'next/dynamic';
const ClientOnlyComponent = dynamic(() => import('./Heavy'), { ssr: false });`}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium">Conflitos de estilos</div>
                        <div>
                          Importe o CSS da biblioteca após o reset global ou use
                          escopo local (CSS Modules).
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="integration" />
              </motion.div>
            )}
            {/* Section: Verification */}
            {activeSection === "verification" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Verification
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Testes e validação para garantir que tudo está funcionando.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Checklist de Verificação</CardTitle>
                    <CardDescription>
                      Passos práticos para confirmar instalação, integração,
                      acessibilidade, e preparo para produção.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Quick checklist */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Rápido</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {[
                          {
                            label: "Pacote instalado corretamente",
                            hint: "npm/yarn instalou @glacien/ui e dependências",
                          },
                          {
                            label: "CSS importado",
                            hint: "import '@glacien/ui/dist/index.css' ou incluir no build",
                          },
                          {
                            label: "Componentes renderizam",
                            hint: "Sem erros no console ao montar componentes",
                          },
                          {
                            label: "TypeScript sem erros",
                            hint: "npx tsc --noEmit",
                          },
                        ].map((it, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50"
                          >
                            <CheckCircle
                              size={18}
                              className="text-green-600 mt-1"
                            />
                            <div className="flex-1">
                              <div className="font-medium">{it.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {it.hint}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Commands */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Comandos úteis</h4>
                      <div className="grid gap-3">
                        {[
                          {
                            cmd: "npm install @glacien/ui",
                            label: "Instalar pacote",
                          },
                          {
                            cmd: "import '@glacien/ui/dist/index.css'",
                            label: "Importar CSS (ex: index.tsx)",
                          },
                          { cmd: "npx tsc --noEmit", label: "Verificar tipos" },
                          { cmd: "npm run lint", label: "Rodar lint" },
                          { cmd: "npm run build", label: "Build de produção" },
                        ].map((c, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-background/30"
                          >
                            <div className="text-sm font-mono truncate">
                              {c.cmd}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyToClipboard(c.cmd)}
                                className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-border hover:bg-primary/5 text-sm"
                                aria-label={`Copiar comando ${c.label}`}
                              >
                                <Copy size={14} /> Copiar
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accessibility & Performance */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">
                        Acessibilidade & Performance
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Execute verificações rápidas para garantir conformidade
                        e desempenho:
                      </p>
                      <div className="grid gap-3">
                        <div className="p-3 rounded-lg border border-border bg-background/30">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <div className="font-medium">
                                Acessibilidade (axe)
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Instale e rode axe-core ou use Lighthouse para
                                identificar problemas de contraste, labels,
                                roles e foco.
                              </div>
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      "npx axe ./path-to-page.html"
                                    )
                                  }
                                  className="px-2 py-1 rounded border text-sm"
                                >
                                  Copiar comando
                                </button>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      "npx lighthouse https://localhost:3000 --preset=desktop --only-categories=accessibility"
                                    )
                                  }
                                  className="px-2 py-1 rounded border text-sm"
                                >
                                  Lighthouse (accessibility)
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg border border-border bg-background/30">
                          <div className="font-medium">
                            Performance (Lighthouse)
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Verifique LCP, FCP, TBT e reduzir JS inicial. Use um
                            ambiente de produção local para resultados
                            realistas.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual tests & Storybook */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Testes visuais</h4>
                      <p className="text-sm text-muted-foreground">
                        Configure Storybook para validar componentes
                        isoladamente e integrar testes visuais (ex.: Chromatic,
                        Loki) no CI.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            copyToClipboard("npx sb init && npm run storybook")
                          }
                          className="px-3 py-1 rounded border text-sm"
                        >
                          Iniciar Storybook
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              "npx chromatic --project-token=<token>"
                            )
                          }
                          className="px-3 py-1 rounded border text-sm"
                        >
                          Chromatic (visual)
                        </button>
                      </div>
                    </div>

                    {/* Troubleshooting */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">
                        Troubleshooting comum
                      </h4>
                      <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                        <li>
                          <strong>CSS ausente:</strong> verifique se o CSS da
                          biblioteca está importado e que o Tailwind está
                          configurado para incluir as classes do pacote.
                        </li>
                        <li>
                          <strong>Erros SSR:</strong> componentes que usam
                          window/document devem ser carregados no cliente
                          (dynamic import / React.lazy).
                        </li>
                        <li>
                          <strong>Problemas de tipagem:</strong> rode{" "}
                          <code className="font-mono">npx tsc --noEmit</code> e
                          atualize seus types/paths.
                        </li>
                        <li>
                          <strong>Compatibilidade de tema:</strong> confirme que
                          o Provider de tema está envolvido na árvore de
                          componentes.
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="verification" />

                <SectionNavigation currentSectionId="verification" />
              </motion.div>
            )}
            {/* Section: Theming */}
            {activeSection === "theming" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Theming
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Sistema de temas flexível para personalização completa.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Temas Disponíveis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        { name: "Light", description: "Tema claro padrão" },
                        { name: "Dark", description: "Tema escuro elegante" },
                        {
                          name: "Custom",
                          description: "Crie seu próprio tema",
                        },
                      ].map((theme, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg text-center"
                        >
                          <h4 className="font-semibold mb-2">{theme.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {theme.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="theming" />
              </motion.div>
            )}
            {/* Section: API Reference */}
            {activeSection === "api" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    API Reference
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Documentação completa da API e componentes disponíveis.
                  </p>
                </div>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Componentes Principais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2">
                        {[
                          { name: "Button", props: "variant, size, disabled" },
                          { name: "Card", props: "className, children" },
                          { name: "Input", props: "type, placeholder, value" },
                          { name: "Badge", props: "variant, size" },
                          { name: "Dialog", props: "open, onClose" },
                          { name: "Tooltip", props: "content, placement" },
                        ].map((component, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-mono font-semibold text-primary">
                              {component.name}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {component.props}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <SectionNavigation currentSectionId="api" />
              </motion.div>
            )}
            {/* Section: Advanced */}
            {activeSection === "advanced" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Advanced
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Configurações avançadas e personalização profunda.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuração Avançada</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 p-4 rounded-lg">
                      <pre className="text-sm font-mono">
                        {`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@glacien/ui/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="advanced" />
              </motion.div>
            )}
            {/* Section: Deployment */}
            {activeSection === "deployment" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Deployment
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Guias para implantação em produção em diferentes
                    plataformas.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vercel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 p-4 rounded-lg">
                        <pre className="text-sm font-mono">
                          {`# Deploy automático via Git
vercel --prod

# Ou via CLI
npm run build
vercel deploy --prod`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Netlify</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 p-4 rounded-lg">
                        <pre className="text-sm font-mono">
                          {`# Build settings
Build command: npm run build
Publish directory: dist`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <SectionNavigation currentSectionId="deployment" />
              </motion.div>
            )}
            {![
              "introduction",
              "prerequisites",
              "setup",
              "compatibility",
              "architecture",
              "specifications",
              "integration",
              "verification",
              "theming",
              "api",
              "advanced",
              "deployment",
            ].includes(activeSection) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center py-24">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {navigationStructure
                        .flatMap((cat) => cat.items)
                        .find((item) => item.id === activeSection)?.label ||
                        "Section"}{" "}
                      Documentation
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      This section is coming soon. We're working on
                      comprehensive documentation for all features.
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setActiveSection("introduction")}
                    >
                      <ArrowRight size={16} className="mr-2 rotate-180" />
                      Back to Introduction
                    </Button>
                    <Button
                      onClick={() => {
                        const nextSection = getNextSection(activeSection);
                        if (nextSection) setActiveSection(nextSection.id);
                      }}
                    >
                      Continue Reading
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>

                <SectionNavigation currentSectionId={activeSection} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
