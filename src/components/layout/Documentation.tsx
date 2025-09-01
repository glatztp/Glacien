"use client";

import React, { useState } from "react";
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
                      Discord
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

                <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                      <AlertCircle size={20} />
                      Required Dependencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Node.js",
                        version: "16.14.0+",
                        description: "JavaScript runtime for build tools",
                      },
                      {
                        name: "React",
                        version: "18.0.0+",
                        description: "Core library for components",
                      },
                      {
                        name: "React DOM",
                        version: "18.0.0+",
                        description: "DOM renderer for React",
                      },
                    ].map((req, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{req.name}</h4>
                          <Badge variant="outline">{req.version}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {req.description}
                        </p>
                      </div>
                    ))}
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

            {/* Section: Compatibility */}
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
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        {
                          name: "Next.js",
                          version: "13.x, 14.x, 15.x",
                          status: "✓",
                        },
                        {
                          name: "Vite + React",
                          version: "4.x, 5.x",
                          status: "✓",
                        },
                        {
                          name: "Create React App",
                          version: "5.x",
                          status: "✓",
                        },
                        { name: "Remix", version: "1.x, 2.x", status: "✓" },
                        { name: "Gatsby", version: "4.x, 5.x", status: "✓" },
                      ].map((framework, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <span className="font-medium">
                              {framework.name}
                            </span>
                            <div className="text-sm text-muted-foreground">
                              {framework.version}
                            </div>
                          </div>
                          <Badge className="bg-green-500 text-white">
                            {framework.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Navegadores</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { name: "Chrome", version: "90+", status: "✓" },
                        { name: "Firefox", version: "88+", status: "✓" },
                        { name: "Safari", version: "14+", status: "✓" },
                        { name: "Edge", version: "90+", status: "✓" },
                      ].map((browser, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <span className="font-medium">{browser.name}</span>
                            <div className="text-sm text-muted-foreground">
                              {browser.version}
                            </div>
                          </div>
                          <Badge className="bg-green-500 text-white">
                            {browser.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        layer: "Camada de Apresentação",
                        description:
                          "Componentes React com interface visual e interações",
                        tech: ["React 18", "TypeScript", "Framer Motion"],
                      },
                      {
                        layer: "Camada de Estilização",
                        description:
                          "Sistema de design tokens e estilos responsivos",
                        tech: ["Tailwind CSS", "CSS Variables", "PostCSS"],
                      },
                      {
                        layer: "Camada de Primitives",
                        description:
                          "Componentes básicos acessíveis e sem estilo",
                        tech: ["Radix UI", "Headless UI", "ARIA"],
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg"
                      >
                        <h4 className="font-semibold mb-2">{item.layer}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <SectionNavigation currentSectionId="architecture" />
              </motion.div>
            )}

            {/* Section: Specifications */}
            {activeSection === "specifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Specifications
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Requisitos técnicos detalhados e especificações de
                    performance.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Métricas de Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { metric: "Bundle Size", value: "< 50KB" },
                          { metric: "First Paint", value: "< 1.2s" },
                          { metric: "Interactivity", value: "< 2.5s" },
                          { metric: "Accessibility", value: "AA WCAG" },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="text-center p-4 bg-muted/50 rounded-lg"
                          >
                            <div className="text-2xl font-bold text-primary mb-1">
                              {item.value}
                            </div>
                            <div className="text-sm font-medium">
                              {item.metric}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Requisitos do Sistema</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { name: "Node.js", version: "16.14.0+" },
                        { name: "React", version: "18.0.0+" },
                        { name: "TypeScript", version: "4.5.0+ (opcional)" },
                        { name: "Tailwind CSS", version: "3.0.0+ (opcional)" },
                      ].map((req, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-muted/50 rounded"
                        >
                          <span className="font-medium">{req.name}</span>
                          <Badge variant="outline">{req.version}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <SectionNavigation currentSectionId="specifications" />
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
                    Como implementar em projetos existentes sem breaking
                    changes.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Migração Gradual</CardTitle>
                    <CardDescription>
                      Integre componentes progressivamente sem afetar o código
                      existente
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 p-4 rounded-lg">
                      <pre className="text-sm font-mono">
                        {`// 1. Instale a biblioteca
npm install @glacien/ui

// 2. Importe apenas os componentes que usar
import { Button } from '@glacien/ui';

// 3. Use junto com componentes existentes
function ExistingComponent() {
  return (
    <div>
      <OldButton>Botão Antigo</OldButton>
      <Button>Novo Botão</Button>
    </div>
  );
}`}
                      </pre>
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
                    <CardTitle>Lista de Verificação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Pacote instalado corretamente",
                      "CSS importado no projeto",
                      "Componentes renderizando sem erros",
                      "TypeScript funcionando (se aplicável)",
                      "Temas aplicados corretamente",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-green-50/50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

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
