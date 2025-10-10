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
  Zap,
  Github,
  Shield,
  Code2,
  Palette,
  Package,
  Rocket,
  ExternalLink,
  Users,
  HelpCircle,
} from "lucide-react";
import {
  SiNextdotjs,
  SiVite,
  SiReact,
  SiRemix,
  SiGatsby,
  SiFiles,
  SiEslint,
  SiFramer,
  SiRadixui,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiNpm,
  SiGit,
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
          <div className="w-full lg:w-64 shrink-0">
            <div className="sticky top-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold tracking-tight mb-1">
                  @Glacien/ui
                </h2>
                <p className="text-sm text-muted-foreground">
                  Component library documentation
                </p>
              </div>

              <nav className="space-y-6">
                {navigationStructure.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-3">
                    <h3 className="text-sm font-medium text-foreground tracking-tight">
                      {category.title}
                    </h3>

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

          <div className="flex-1 min-w-0">
            <div className="mb-8 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
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
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8 lg:p-12 border border-border/50">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className="relative z-10 space-y-6">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                    >
                      Biblioteca de Componentes
                      <span className="block text-primary">
                        Moderna & Acessível
                      </span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl"
                    >
                      Uma biblioteca React moderna construída com TypeScript,
                      Tailwind CSS e primitivos Radix UI. Projetada para
                      performance máxima, acessibilidade completa e uma
                      experiência de desenvolvimento excepcional.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col sm:flex-row gap-4 pt-4"
                    >
                      <Button
                        size="lg"
                        className="group relative overflow-hidden px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => setActiveSection("setup")}
                      >
                        <Zap className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                        Começar Agora
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-3 font-semibold border-2 hover:bg-muted/50 transition-all duration-300"
                        onClick={() =>
                          window.open(
                            "https://github.com/glatztp/Glacien",
                            "_blank"
                          )
                        }
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Ver no GitHub
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Key Features Grid */}
                <div className="space-y-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-center"
                  >
                    Por que escolher Glacien UI?
                  </motion.h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Performance Extrema",
                        description:
                          "Otimizado para carregamento rápido com tree-shaking automático, lazy loading e bundle size mínimo. Componentes renderizam em menos de 16ms.",
                        color: "from-yellow-500/20 to-orange-500/20",
                        iconBg:
                          "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400",
                      },
                      {
                        icon: <Shield className="w-6 h-6" />,
                        title: "Acessibilidade Total",
                        description:
                          "100% compatível com WCAG 2.1 AA. Suporte completo para leitores de tela, navegação por teclado e foco visual aprimorado.",
                        color: "from-green-500/20 to-emerald-500/20",
                        iconBg:
                          "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
                      },
                      {
                        icon: <Code2 className="w-6 h-6" />,
                        title: "TypeScript First",
                        description:
                          "Desenvolvido 100% em TypeScript com tipos rigorosos, IntelliSense completo e detecção de erros em tempo de desenvolvimento.",
                        color: "from-blue-500/20 to-cyan-500/20",
                        iconBg:
                          "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
                      },
                      {
                        icon: <Palette className="w-6 h-6" />,
                        title: "Sistema de Temas",
                        description:
                          "Sistema robusto de temas com suporte a modo escuro/claro, CSS variables, e customização completa via Tailwind CSS.",
                        color: "from-purple-500/20 to-pink-500/20",
                        iconBg:
                          "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
                      },
                      {
                        icon: <Package className="w-6 h-6" />,
                        title: "50+ Componentes",
                        description:
                          "Biblioteca completa com componentes essenciais, layouts responsivos, formulários avançados e patterns de design modernos.",
                        color: "from-indigo-500/20 to-blue-500/20",
                        iconBg:
                          "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
                      },
                      {
                        icon: <Rocket className="w-6 h-6" />,
                        title: "DX Excepcional",
                        description:
                          "API intuitiva, documentação completa, Storybook integrado e debugging tools para desenvolvimento eficiente.",
                        color: "from-rose-500/20 to-red-500/20",
                        iconBg:
                          "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="group h-full p-6 border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                          />
                          <div className="relative z-10 space-y-4">
                            <div
                              className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              {feature.icon}
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                                {feature.title}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <Card className="relative overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Stack Tecnológico
                    </CardTitle>
                    <CardDescription>
                      Construído com as melhores tecnologias do ecossistema
                      React
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        {
                          name: "React 18",
                          desc: "Server Components & Suspense",
                          icon: <SiReact size={24} />,
                        },
                        {
                          name: "TypeScript",
                          desc: "Type Safety & IntelliSense",
                          icon: <SiTypescript size={24} />,
                        },
                        {
                          name: "Tailwind CSS",
                          desc: "Utility-first Styling",
                          icon: <SiTailwindcss size={24} />,
                        },
                        {
                          name: "Radix UI",
                          desc: "Accessible Primitives",
                          icon: <SiRadixui size={24} />,
                        },
                        {
                          name: "Framer Motion",
                          desc: "Fluid Animations",
                          icon: <SiFramer size={24} />,
                        },
                        {
                          name: "Vite",
                          desc: "Lightning Fast Build",
                          icon: <SiVite size={24} />,
                        },

                        {
                          name: "ESLint + Prettier",
                          desc: "Code Quality",
                          icon: <SiEslint size={24} />,
                        },
                      ].map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="text-center space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                        >
                          <div className="text-2xl">{tech.icon}</div>
                          <div className="font-semibold text-sm">
                            {tech.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {tech.desc}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Start Enhanced */}
                <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Rocket className="w-5 h-5" />
                      Comece em 2 Minutos
                    </CardTitle>
                    <CardDescription>
                      Instale a biblioteca e comece a construir interfaces
                      incríveis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">1. Instalação</h4>
                        <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              Package Manager
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                copyToClipboard("npm install @glacien/ui")
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Copy size={14} />
                            </Button>
                          </div>
                          <code className="text-sm font-mono text-primary">
                            npm install @glacien/ui
                          </code>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">2. Importação</h4>
                        <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              CSS Import
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                copyToClipboard(
                                  "import '@glacien/ui/dist/index.css';"
                                )
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Copy size={14} />
                            </Button>
                          </div>
                          <code className="text-sm font-mono text-secondary">
                            import '@glacien/ui/dist/index.css';
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-6 rounded-lg border border-border/50">
                      <h4 className="font-semibold text-sm mb-3">
                        3. Primeiro Componente
                      </h4>
                      <div className="bg-background/80 p-4 rounded-lg border border-border/30 font-mono text-sm space-y-1">
                        <div>
                          <span className="text-blue-600 dark:text-blue-400">
                            import
                          </span>{" "}
                          <span className="text-green-600 dark:text-green-400">
                            {"{ Button, Card }"}
                          </span>{" "}
                          <span className="text-blue-600 dark:text-blue-400">
                            from
                          </span>{" "}
                          <span className="text-yellow-600 dark:text-yellow-400">
                            '@glacien/ui'
                          </span>
                          ;
                        </div>
                        <div className="mt-2">
                          <span className="text-purple-600 dark:text-purple-400">
                            {"<Card>"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <span className="text-purple-600 dark:text-purple-400">
                            {"<Button"}
                          </span>{" "}
                          <span className="text-orange-600 dark:text-orange-400">
                            variant
                          </span>
                          =
                          <span className="text-green-600 dark:text-green-400">
                            "primary"
                          </span>
                          <span className="text-purple-600 dark:text-purple-400">
                            {">"}
                          </span>
                        </div>
                        <div className="ml-8 text-foreground">
                          Meu primeiro botão!
                        </div>
                        <div className="ml-4">
                          <span className="text-purple-600 dark:text-purple-400">
                            {"</Button>"}
                          </span>
                        </div>
                        <div>
                          <span className="text-purple-600 dark:text-purple-400">
                            {"</Card>"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        className="flex-1 group"
                        onClick={() => setActiveSection("setup")}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Guia Completo de Instalação
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            "https://storybook.glacien.online",
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Storybook
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Community & Support */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Comunidade & Suporte
                    </CardTitle>
                    <CardDescription>
                      Junte-se à nossa comunidade crescente de desenvolvedores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center space-y-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto">
                          <Github className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-semibold">GitHub</h4>
                        <p className="text-sm text-muted-foreground">
                          Contribua, reporte bugs e solicite features
                        </p>
                      </div>

                      <div className="text-center space-y-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto">
                          <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h4 className="font-semibold">Documentação</h4>
                        <p className="text-sm text-muted-foreground">
                          Guias completos e exemplos práticos
                        </p>
                      </div>

                      <div className="text-center space-y-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto">
                          <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h4 className="font-semibold">Suporte</h4>
                        <p className="text-sm text-muted-foreground">
                          Ajuda rápida via GitHub Issues
                        </p>
                      </div>
                    </div>
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
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/5 via-background to-primary/5 p-8 lg:p-12 border border-border/50">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className="relative z-10 space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                    >
                      Prerequisites
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
                    >
                      Verifique se seu ambiente de desenvolvimento atende aos
                      requisitos mínimos para uma experiência de desenvolvimento
                      otimizada com Glacien UI.
                    </motion.p>
                  </div>
                </div>

                {/* System Check Tool */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <CheckCircle className="w-5 h-5" />
                      Verificação Rápida do Sistema
                    </CardTitle>
                    <CardDescription>
                      Execute estes comandos para verificar se tudo está
                      configurado corretamente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-6 rounded-lg border border-border/50 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          Script de Verificação Automática
                        </h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyToClipboard(
                              `node -v && npm -v && npx react --version && echo "✅ Sistema verificado!"`
                            )
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Copy size={14} />
                        </Button>
                      </div>
                      <div className="bg-background/80 p-4 rounded-lg border border-border/30 font-mono text-sm">
                        <div className="text-green-600 dark:text-green-400">
                          # Verificação completa do ambiente
                        </div>
                        <div className="text-blue-600 dark:text-blue-400">
                          node -v && npm -v && npx react --version
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 mt-2">
                          # Resultado esperado: versões válidas para cada
                          comando
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Essential Requirements */}
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        Requisitos Essenciais
                      </CardTitle>
                      <CardDescription>
                        Obrigatórios para o funcionamento da biblioteca
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      {[
                        {
                          name: "Node.js",
                          version: "18.0.0+",
                          icon: (
                            <SiNodedotjs className="w-6 h-6 text-green-600" />
                          ),
                          description:
                            "Runtime JavaScript moderno com suporte a ESM e APIs atuais",
                          checkCommand: "node -v",
                          recommendedVersion: "20.x LTS",
                          downloadUrl: "https://nodejs.org",
                        },
                        {
                          name: "Package Manager",
                          version: "npm 9+ | pnpm 8+ | yarn 3+",
                          icon: <SiNpm className="w-6 h-6 text-red-600" />,
                          description:
                            "Gerenciador de pacotes para instalação de dependências",
                          checkCommand: "npm -v",
                          recommendedVersion: "npm (incluído com Node.js)",
                          downloadUrl: null,
                        },
                        {
                          name: "React",
                          version: "18.0.0+",
                          icon: <SiReact className="w-6 h-6 text-blue-600" />,
                          description:
                            "Biblioteca base para componentes UI com Concurrent Features",
                          checkCommand: "npm ls react",
                          recommendedVersion: "18.2.0+",
                          downloadUrl: "https://react.dev",
                        },
                      ].map((req, index) => (
                        <motion.div
                          key={req.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group p-4 rounded-lg border border-border/50 hover:border-red-300/50 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-muted/50">
                              {req.icon}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm">
                                  {req.name}
                                </h4>
                                <Badge variant="secondary" className="text-xs">
                                  {req.version}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {req.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <code className="text-xs font-mono bg-muted/50 px-2 py-1 rounded">
                                  {req.checkCommand}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    copyToClipboard(req.checkCommand)
                                  }
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Copy size={12} />
                                </Button>
                              </div>
                              <div className="text-xs text-green-600 dark:text-green-400">
                                💡 Recomendado: {req.recommendedVersion}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recommended Tools */}
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Package className="w-5 h-5" />
                        Ferramentas Recomendadas
                      </CardTitle>
                      <CardDescription>
                        Melhoram significativamente a experiência de
                        desenvolvimento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      {[
                        {
                          name: "TypeScript",
                          version: "5.0+",
                          icon: (
                            <SiTypescript className="w-6 h-6 text-blue-600" />
                          ),
                          description:
                            "Tipagem estática para maior segurança e produtividade",
                          benefit: "IntelliSense completo",
                          priority: "Alta",
                        },
                        {
                          name: "Tailwind CSS",
                          version: "3.4+",
                          icon: (
                            <SiTailwindcss className="w-6 h-6 text-cyan-600" />
                          ),
                          description:
                            "Framework CSS utilitário para estilização consistente",
                          benefit: "Temas personalizados",
                          priority: "Alta",
                        },
                        {
                          name: "Vite / Next.js",
                          version: "5.x / 14.x",
                          icon: <SiVite className="w-6 h-6 text-purple-600" />,
                          description:
                            "Build tools modernos com Hot Module Replacement",
                          benefit: "Dev server rápido",
                          priority: "Média",
                        },
                        {
                          name: "ESLint + Prettier",
                          version: "8.x + 3.x",
                          icon: (
                            <SiEslint className="w-6 h-6 text-indigo-600" />
                          ),
                          description:
                            "Linting e formatação automática de código",
                          benefit: "Qualidade de código",
                          priority: "Média",
                        },
                        {
                          name: "Git",
                          version: "2.40+",
                          icon: <SiGit className="w-6 h-6 text-orange-600" />,
                          description:
                            "Controle de versão para desenvolvimento colaborativo",
                          benefit: "Versionamento",
                          priority: "Essencial",
                        },
                      ].map((tool, index) => (
                        <motion.div
                          key={tool.name}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group p-4 rounded-lg border border-border/50 hover:border-blue-300/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-muted/50">
                              {tool.icon}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm">
                                  {tool.name}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={
                                      tool.priority === "Essencial"
                                        ? "destructive"
                                        : tool.priority === "Alta"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {tool.priority}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {tool.version}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {tool.description}
                              </p>
                              <div className="text-xs text-blue-600 dark:text-blue-400">
                                <SiEslint className="w-3 h-3 inline mr-1" />{" "}
                                Benefício: {tool.benefit}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Environment Setup Guide */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-primary" />
                      Guia de Configuração do Ambiente
                    </CardTitle>
                    <CardDescription>
                      Passos detalhados para configurar um ambiente de
                      desenvolvimento ideal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Setup Steps */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Configuração Inicial</h4>
                        {[
                          {
                            step: "1",
                            title: "Instalar Node.js",
                            description:
                              "Baixe e instale a versão LTS mais recente",
                            command: "# Verificar instalação\nnode -v\nnpm -v",
                          },
                          {
                            step: "2",
                            title: "Configurar Editor",
                            description:
                              "VS Code com extensões TypeScript e Tailwind",
                            command:
                              "# Extensões recomendadas\n# - TypeScript and JavaScript\n# - Tailwind CSS IntelliSense",
                          },
                          {
                            step: "3",
                            title: "Criar Projeto",
                            description:
                              "Initialize novo projeto React com TypeScript",
                            command:
                              "npx create-react-app my-app --template typescript\n# ou\nnpx create-next-app@latest my-app --typescript",
                          },
                        ].map((step, index) => (
                          <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                            <div className="flex-1 space-y-2">
                              <h5 className="font-medium text-sm">
                                {step.title}
                              </h5>
                              <p className="text-xs text-muted-foreground">
                                {step.description}
                              </p>
                              {step.command && (
                                <div className="bg-muted/50 p-2 rounded text-xs font-mono whitespace-pre-line">
                                  {step.command}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Troubleshooting */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Solução de Problemas</h4>
                        <div className="space-y-3">
                          {[
                            {
                              problem: "Node.js muito antigo",
                              solution:
                                "Use nvm para gerenciar versões do Node.js",
                              code: "nvm install 20\nnvm use 20",
                            },
                            {
                              problem: "Erro de permissões npm",
                              solution:
                                "Configure npm para usar diretório global do usuário",
                              code: "npm config set prefix ~/.npm-global\nexport PATH=~/.npm-global/bin:$PATH",
                            },
                            {
                              problem: "Conflitos de dependências",
                              solution: "Limpe cache e reinstale dependências",
                              code: "npm cache clean --force\nrm -rf node_modules\nnpm install",
                            },
                          ].map((issue, index) => (
                            <div
                              key={index}
                              className="p-3 rounded-lg bg-yellow-50/50 dark:bg-yellow-950/20 border border-yellow-200/50 dark:border-yellow-800/50"
                            >
                              <div className="font-medium text-sm text-yellow-800 dark:text-yellow-200 mb-1">
                                ⚠️ {issue.problem}
                              </div>
                              <div className="text-xs text-yellow-700 dark:text-yellow-300 mb-2">
                                {issue.solution}
                              </div>
                              <div className="bg-yellow-100/50 dark:bg-yellow-900/30 p-2 rounded text-xs font-mono">
                                {issue.code}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                      <Button
                        className="flex-1 group"
                        onClick={() => setActiveSection("setup")}
                      >
                        <ArrowRight className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                        Continuar para Instalação
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          window.open("https://nodejs.org", "_blank")
                        }
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Download Node.js
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setActiveSection("compatibility")}
                      >
                        <Monitor className="w-4 h-4 mr-2" />
                        Ver Compatibilidade
                      </Button>
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
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8 lg:p-12 border border-border/50">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className="relative z-10 space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                    >
                      Installation
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
                    >
                      Guia completo de instalação para diferentes frameworks e
                      configurações. Escolha seu framework favorito e siga os
                      passos detalhados.
                    </motion.p>
                  </div>
                </div>

                {/* Framework Selection or Detailed Steps */}
                {!selectedFramework ? (
                  <div className="space-y-6">
                    {/* Framework Cards */}
                    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                          <Package className="w-5 h-5" />
                          Escolha seu Framework
                        </CardTitle>
                        <CardDescription>
                          Selecione o framework que você está usando para ver
                          instruções específicas de instalação
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {[
                            {
                              name: "Next.js",
                              icon: <SiNextdotjs className="w-8 h-8" />,
                              description: "O framework React para produção",
                              color:
                                "hover:border-gray-900 dark:hover:border-white",
                            },
                            {
                              name: "Vite",
                              icon: <SiVite className="w-8 h-8" />,
                              description: "Build tool extremamente rápido",
                              color: "hover:border-purple-500",
                            },
                            {
                              name: "Create React App",
                              icon: <SiReact className="w-8 h-8" />,
                              description: "Setup React clássico e confiável",
                              color: "hover:border-blue-500",
                            },
                            {
                              name: "Remix",
                              icon: <SiRemix className="w-8 h-8" />,
                              description: "Full stack web framework",
                              color: "hover:border-blue-400",
                            },
                            {
                              name: "Gatsby",
                              icon: <SiGatsby className="w-8 h-8" />,
                              description: "Framework para sites estáticos",
                              color: "hover:border-purple-600",
                            },
                            {
                              name: "Manual",
                              icon: <SiFiles className="w-8 h-8" />,
                              description: "Configuração personalizada",
                              color: "hover:border-orange-500",
                            },
                          ].map((framework, index) => (
                            <motion.button
                              key={framework.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() =>
                                setSelectedFramework(framework.name)
                              }
                              className={`group relative overflow-hidden rounded-xl border-2 border-border bg-background p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-105 ${framework.color}`}
                            >
                              <div className="flex flex-col items-center gap-3 text-center">
                                <div className="text-foreground transition-transform group-hover:scale-110">
                                  {framework.icon}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground">
                                    {framework.name}
                                  </h3>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {framework.description}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                            </motion.button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Install Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-primary" />
                          Instalação Rápida (Universal)
                        </CardTitle>
                        <CardDescription>
                          Comandos básicos que funcionam em qualquer setup React
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            1. Instale o pacote
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted/30 p-4 rounded-lg border border-border/50 font-mono text-sm">
                              npm install @glacien/ui
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                copyToClipboard("npm install @glacien/ui")
                              }
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            2. Importe os estilos
                          </h4>
                          <div className="bg-muted/30 p-4 rounded-lg border border-border/50 font-mono text-sm">
                            <span className="text-blue-600 dark:text-blue-400">
                              import
                            </span>{" "}
                            <span className="text-green-600 dark:text-green-400">
                              '@glacien/ui/dist/index.css'
                            </span>
                            <span className="text-muted-foreground">;</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            3. Use os componentes
                          </h4>
                          <div className="bg-muted/30 p-4 rounded-lg border border-border/50 font-mono text-sm space-y-1">
                            <div>
                              <span className="text-blue-600 dark:text-blue-400">
                                import
                              </span>{" "}
                              <span className="text-yellow-600 dark:text-yellow-400">
                                {"{"}
                              </span>{" "}
                              Button, Card{" "}
                              <span className="text-yellow-600 dark:text-yellow-400">
                                {"}"}
                              </span>{" "}
                              <span className="text-blue-600 dark:text-blue-400">
                                from
                              </span>{" "}
                              <span className="text-green-600 dark:text-green-400">
                                '@glacien/ui'
                              </span>
                              <span className="text-muted-foreground">;</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFramework(null)}
                      className="mb-4"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar para seleção de frameworks
                    </Button>

                    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          {selectedFramework === "Next.js" && (
                            <SiNextdotjs className="w-6 h-6" />
                          )}
                          {selectedFramework === "Vite" && (
                            <SiVite className="w-6 h-6" />
                          )}
                          {selectedFramework === "Create React App" && (
                            <SiReact className="w-6 h-6" />
                          )}
                          {selectedFramework === "Remix" && (
                            <SiRemix className="w-6 h-6" />
                          )}
                          {selectedFramework === "Gatsby" && (
                            <SiGatsby className="w-6 h-6" />
                          )}
                          {selectedFramework === "Manual" && (
                            <SiFiles className="w-6 h-6" />
                          )}
                          Instalação para {selectedFramework}
                        </CardTitle>
                        <CardDescription>
                          Guia passo a passo otimizado para {selectedFramework}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Installation steps */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              1
                            </div>
                            <h4 className="font-semibold">Instale o pacote</h4>
                          </div>
                          <div className="ml-10 space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Adicione @glacien/ui ao seu projeto:
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-background/80 p-4 rounded-lg border border-border/30 font-mono text-sm">
                                npm install @glacien/ui
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyToClipboard("npm install @glacien/ui")
                                }
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              2
                            </div>
                            <h4 className="font-semibold">
                              Importe os estilos globais
                            </h4>
                          </div>
                          <div className="ml-10 space-y-2">
                            <p className="text-sm text-muted-foreground">
                              {selectedFramework === "Next.js" &&
                                "No seu arquivo _app.tsx ou layout.tsx (App Router):"}
                              {selectedFramework === "Vite" &&
                                "No seu arquivo main.tsx ou App.tsx:"}
                              {selectedFramework === "Create React App" &&
                                "No seu arquivo index.tsx ou App.tsx:"}
                              {selectedFramework === "Remix" &&
                                "No seu arquivo root.tsx:"}
                              {selectedFramework === "Gatsby" &&
                                "No seu arquivo gatsby-browser.js:"}
                              {selectedFramework === "Manual" &&
                                "No ponto de entrada da sua aplicação:"}
                            </p>
                            <div className="bg-background/80 p-4 rounded-lg border border-border/30 font-mono text-sm">
                              <span className="text-blue-600 dark:text-blue-400">
                                import
                              </span>{" "}
                              <span className="text-green-600 dark:text-green-400">
                                '@glacien/ui/dist/index.css'
                              </span>
                              ;
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              3
                            </div>
                            <h4 className="font-semibold">
                              Comece a usar os componentes
                            </h4>
                          </div>
                          <div className="ml-10 space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Importe e use qualquer componente:
                            </p>
                            <div className="bg-background/80 p-4 rounded-lg border border-border/30 font-mono text-sm">
                              <div>
                                <span className="text-blue-600 dark:text-blue-400">
                                  import
                                </span>{" "}
                                {"{"} Button {"}"}{" "}
                                <span className="text-blue-600 dark:text-blue-400">
                                  from
                                </span>{" "}
                                <span className="text-green-600 dark:text-green-400">
                                  '@glacien/ui'
                                </span>
                                ;
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-semibold text-green-700 dark:text-green-400 mb-1">
                              Pronto! 🎉
                            </h5>
                            <p className="text-sm text-green-600 dark:text-green-300">
                              Você configurou com sucesso o Glacien UI com{" "}
                              {selectedFramework}!
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SectionNavigation currentSectionId="setup" />
              </motion.div>
            )}
            {activeSection === "compatibility" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/5 via-background to-purple-500/5 p-8 lg:p-12 border border-border/50">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className="relative z-10 space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                    >
                      Compatibility
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
                    >
                      Suporte completo a frameworks modernos, navegadores
                      evergreen e ambientes de runtime. Construído para máxima
                      compatibilidade sem comprometer performance.
                    </motion.p>
                  </div>
                </div>

                {/* Compatibility Matrix */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Frameworks Support */}
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        Frameworks Suportados
                      </CardTitle>
                      <CardDescription>
                        Compatibilidade total com os principais frameworks React
                        do mercado
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 relative z-10">
                      {[
                        {
                          name: "Next.js",
                          version: "13.x - 15.x",
                          icon: <SiNextdotjs className="w-6 h-6" />,
                          note: "App Router & Pages Router",
                          features: [
                            "SSR",
                            "Edge Runtime",
                            "Server Components",
                          ],
                          status: "full",
                        },
                        {
                          name: "Vite",
                          version: "4.x - 5.x",
                          icon: <SiVite className="w-6 h-6" />,
                          note: "Build tool extremamente rápido",
                          features: ["HMR", "Tree-shaking", "TypeScript"],
                          status: "full",
                        },
                        {
                          name: "Create React App",
                          version: "5.x",
                          icon: <SiReact className="w-6 h-6" />,
                          note: "Setup tradicional React",
                          features: ["Webpack", "Jest", "Babel"],
                          status: "full",
                        },
                        {
                          name: "Remix",
                          version: "1.x - 2.x",
                          icon: <SiRemix className="w-6 h-6" />,
                          note: "Full-stack web framework",
                          features: ["Nested Routes", "Loaders", "Actions"],
                          status: "full",
                        },
                        {
                          name: "Gatsby",
                          version: "4.x - 5.x",
                          icon: <SiGatsby className="w-6 h-6" />,
                          note: "Static site generation",
                          features: ["GraphQL", "SSG", "Plugins"],
                          status: "full",
                        },
                      ].map((framework, index) => (
                        <motion.div
                          key={framework.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative overflow-hidden rounded-xl border border-border bg-background p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                              {framework.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-semibold text-foreground">
                                    {framework.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {framework.note}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="shrink-0 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                                >
                                  {framework.version}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {framework.features.map((feature) => (
                                  <span
                                    key={feature}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/50 text-xs text-muted-foreground"
                                  >
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Browser Support */}
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        Navegadores Suportados
                      </CardTitle>
                      <CardDescription>
                        Compatibilidade com navegadores evergreen modernos
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 relative z-10">
                      {[
                        {
                          name: "Chrome",
                          version: "90+",
                          support: "full",
                          icon: "🟢",
                          features: ["CSS Grid", "ES2020", "WebGL"],
                        },
                        {
                          name: "Firefox",
                          version: "88+",
                          support: "full",
                          icon: "🟢",
                          features: ["CSS Grid", "ES2020", "WebGL"],
                        },
                        {
                          name: "Safari",
                          version: "14+",
                          support: "partial",
                          icon: "🟡",
                          features: ["CSS Grid", "ES2020", "WebGL*"],
                        },
                        {
                          name: "Edge",
                          version: "90+",
                          support: "full",
                          icon: "🟢",
                          features: ["CSS Grid", "ES2020", "WebGL"],
                        },
                      ].map((browser, index) => (
                        <motion.div
                          key={browser.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative overflow-hidden rounded-xl border border-border bg-background p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{browser.icon}</div>
                              <div>
                                <div className="font-semibold text-foreground">
                                  {browser.name}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  Versão {browser.version}
                                </div>
                              </div>
                            </div>
                            <Badge
                              className={
                                browser.support === "full"
                                  ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                                  : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                              }
                            >
                              {browser.support === "full"
                                ? "Full Support"
                                : "Partial Support"}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {browser.features.map((feature) => (
                              <span
                                key={feature}
                                className="px-2 py-0.5 rounded-md bg-muted/50 text-xs text-muted-foreground"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Runtime & Environment Support */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-primary" />
                      Runtime & Ambientes
                    </CardTitle>
                    <CardDescription>
                      Suporte a diferentes ambientes de execução e plataformas
                      de deployment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      {[
                        {
                          title: "Node.js",
                          version: "18.x+",
                          icon: (
                            <SiNodedotjs className="w-8 h-8 text-green-600" />
                          ),
                          features: [
                            "SSR/SSG support",
                            "ES Modules",
                            "CommonJS",
                          ],
                        },
                        {
                          title: "Edge Runtime",
                          version: "Latest",
                          icon: <Zap className="w-8 h-8 text-yellow-600" />,
                          features: [
                            "Vercel Edge",
                            "Cloudflare Workers",
                            "Deno Deploy",
                          ],
                        },
                        {
                          title: "Browser",
                          version: "Modern",
                          icon: <Monitor className="w-8 h-8 text-blue-600" />,
                          features: [
                            "Client-side rendering",
                            "Progressive enhancement",
                            "Service Workers",
                          ],
                        },
                      ].map((runtime, index) => (
                        <motion.div
                          key={runtime.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-muted/50">
                              {runtime.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">
                                {runtime.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {runtime.version}
                              </p>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {runtime.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-muted-foreground">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Requirements */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        Requisitos Técnicos
                      </CardTitle>
                      <CardDescription>
                        Especificações mínimas para funcionamento ideal
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm mb-1">
                              React 18+
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              Suporte a Concurrent Features, Suspense e Server
                              Components
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm mb-1">
                              TypeScript 5+
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              Type safety completa com strict mode suportado
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm mb-1">
                              Tailwind CSS 3+
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              Sistema de design baseado em utility-first CSS
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm mb-1">
                              ES2020+
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              Sintaxe moderna JavaScript com módulos ESM
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        Notas Importantes
                      </CardTitle>
                      <CardDescription>
                        Considerações e limitações conhecidas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                          <h5 className="font-medium text-sm text-yellow-700 dark:text-yellow-400 mb-1">
                            Safari 14-15
                          </h5>
                          <p className="text-xs text-yellow-600 dark:text-yellow-300">
                            Algumas animações CSS podem ter performance
                            reduzida. Recomendamos Safari 16+ para melhor
                            experiência.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <h5 className="font-medium text-sm text-blue-700 dark:text-blue-400 mb-1">
                            Internet Explorer
                          </h5>
                          <p className="text-xs text-blue-600 dark:text-blue-300">
                            Não suportado. Para IE11, considere usar polyfills e
                            downgrade de sintaxe.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <h5 className="font-medium text-sm text-green-700 dark:text-green-400 mb-1">
                            Progressive Enhancement
                          </h5>
                          <p className="text-xs text-green-600 dark:text-green-300">
                            Componentes funcionam sem JavaScript quando
                            possível, garantindo acessibilidade básica.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Feature Support Matrix */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Matriz de Features
                    </CardTitle>
                    <CardDescription>
                      Suporte a features modernas da web por navegador
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold">
                              Feature
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">
                              Chrome
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">
                              Firefox
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">
                              Safari
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">
                              Edge
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              feature: "CSS Grid",
                              support: ["✅", "✅", "✅", "✅"],
                            },
                            {
                              feature: "CSS Variables",
                              support: ["✅", "✅", "✅", "✅"],
                            },
                            {
                              feature: "Container Queries",
                              support: ["✅", "✅", "⚠️", "✅"],
                            },
                            {
                              feature: "Dynamic Import",
                              support: ["✅", "✅", "✅", "✅"],
                            },
                            {
                              feature: "ES Modules",
                              support: ["✅", "✅", "✅", "✅"],
                            },
                            {
                              feature: "WebGL 2.0",
                              support: ["✅", "✅", "⚠️", "✅"],
                            },
                            {
                              feature: "Service Workers",
                              support: ["✅", "✅", "✅", "✅"],
                            },
                          ].map((row, index) => (
                            <tr
                              key={index}
                              className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-3 px-4 font-medium">
                                {row.feature}
                              </td>
                              {row.support.map((status, idx) => (
                                <td
                                  key={idx}
                                  className="text-center py-3 px-4 text-lg"
                                >
                                  {status}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                      <span>✅ = Full Support</span>
                      <span>⚠️ = Partial Support</span>
                      <span>❌ = Not Supported</span>
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
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/5 via-background to-violet-500/5 p-8 lg:p-12 border border-border/50">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className="relative z-10 space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                    >
                      Architecture
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
                    >
                      Arquitetura modular, escalável e extensível. Entenda a
                      estrutura em camadas, padrões de design e como os
                      componentes são organizados para máxima reutilização.
                    </motion.p>
                  </div>
                </div>

                {/* Architecture Overview */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Activity className="w-5 h-5" />
                      Visão Geral da Arquitetura
                    </CardTitle>
                    <CardDescription>
                      Sistema em camadas que separa apresentação, lógica e
                      estilização
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      {[
                        {
                          layer: "Apresentação",
                          icon: <Code2 className="w-8 h-8 text-blue-600" />,
                          description:
                            "Componentes React compostos focados em UX e consistência visual",
                          technologies: [
                            "React 18",
                            "TypeScript",
                            "Framer Motion",
                          ],
                          color: "from-blue-500/10 to-blue-500/5",
                        },
                        {
                          layer: "Estilização",
                          icon: <Palette className="w-8 h-8 text-purple-600" />,
                          description:
                            "Sistema de design tokens, temas e utilitários CSS responsivos",
                          technologies: [
                            "Tailwind CSS",
                            "CSS Variables",
                            "PostCSS",
                          ],
                          color: "from-purple-500/10 to-purple-500/5",
                        },
                        {
                          layer: "Primitives",
                          icon: <Package className="w-8 h-8 text-green-600" />,
                          description:
                            "Componentes headless acessíveis como base de composição",
                          technologies: ["Radix UI", "ARIA", "Headless UI"],
                          color: "from-green-500/10 to-green-500/5",
                        },
                      ].map((layer, index) => (
                        <motion.div
                          key={layer.layer}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative overflow-hidden rounded-xl border border-border bg-gradient-to-br ${layer.color} p-6 hover:shadow-lg transition-all duration-300`}
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-background/80 shadow-sm">
                              {layer.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-foreground mb-1">
                                {layer.layer}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {layer.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {layer.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs bg-background/50"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Design Patterns */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        Padrões de Design
                      </CardTitle>
                      <CardDescription>
                        Patterns e práticas que guiam o desenvolvimento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          pattern: "Composição sobre Herança",
                          description:
                            "Componentes compostos de primitives menores e reutilizáveis",
                          example:
                            "<Dialog> = <DialogTrigger> + <DialogContent> + <DialogHeader>",
                        },
                        {
                          pattern: "Controlled vs Uncontrolled",
                          description:
                            "Suporte para ambos os modos em componentes de formulário",
                          example:
                            "<Input value={...} /> ou <Input defaultValue={...} />",
                        },
                        {
                          pattern: "Render Props & Slots",
                          description:
                            "Flexibilidade para customizar partes específicas",
                          example: "<Select renderValue={(item) => ...} />",
                        },
                        {
                          pattern: "Polymorphic Components",
                          description:
                            "Componentes que podem renderizar como diferentes elementos",
                          example: "<Button asChild><Link /></Button>",
                        },
                      ].map((pattern, index) => (
                        <motion.div
                          key={pattern.pattern}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">
                                {pattern.pattern}
                              </h4>
                              <p className="text-xs text-muted-foreground mb-2">
                                {pattern.description}
                              </p>
                              <code className="text-xs bg-background/80 px-2 py-1 rounded border border-border/50 block overflow-x-auto">
                                {pattern.example}
                              </code>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        Princípios de Acessibilidade
                      </CardTitle>
                      <CardDescription>
                        Conformidade WCAG 2.1 AA em todos os componentes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          principle: "Semântica HTML Correta",
                          description:
                            "Uso de elementos nativos (button, input, etc.) quando possível",
                          icon: "🏷️",
                        },
                        {
                          principle: "Navegação por Teclado",
                          description:
                            "Todos os componentes interativos acessíveis via Tab, Enter, Space",
                          icon: "⌨️",
                        },
                        {
                          principle: "Estados ARIA",
                          description:
                            "aria-expanded, aria-selected, aria-disabled aplicados corretamente",
                          icon: "🔊",
                        },
                        {
                          principle: "Contraste de Cores",
                          description:
                            "Mínimo 4.5:1 para texto normal, 3:1 para texto grande (WCAG AA)",
                          icon: "🎨",
                        },
                        {
                          principle: "Focus Visible",
                          description:
                            "Indicadores visuais claros para elementos focados",
                          icon: "🎯",
                        },
                        {
                          principle: "Screen Reader Support",
                          description:
                            "Labels descritivos e landmarks para navegação eficiente",
                          icon: "👁️",
                        },
                      ].map((principle, index) => (
                        <motion.div
                          key={principle.principle}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20 hover:bg-green-500/10 transition-colors"
                        >
                          <span className="text-2xl">{principle.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1 text-green-700 dark:text-green-400">
                              {principle.principle}
                            </h4>
                            <p className="text-xs text-green-600 dark:text-green-300">
                              {principle.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Component Lifecycle */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Ciclo de Vida dos Componentes
                    </CardTitle>
                    <CardDescription>
                      Como os componentes são criados, renderizados e otimizados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[
                          {
                            stage: "1. Composição",
                            description: "Primitives + Styling + Logic",
                            icon: <Package className="w-6 h-6 text-blue-600" />,
                            color: "bg-blue-500/10 border-blue-500/20",
                          },
                          {
                            stage: "2. Type Safety",
                            description: "TypeScript interfaces & validation",
                            icon: <Code2 className="w-6 h-6 text-purple-600" />,
                            color: "bg-purple-500/10 border-purple-500/20",
                          },
                          {
                            stage: "3. Rendering",
                            description: "React 18 Concurrent Features",
                            icon: <Rocket className="w-6 h-6 text-green-600" />,
                            color: "bg-green-500/10 border-green-500/20",
                          },
                          {
                            stage: "4. Optimization",
                            description: "Tree-shaking & code splitting",
                            icon: <Zap className="w-6 h-6 text-yellow-600" />,
                            color: "bg-yellow-500/10 border-yellow-500/20",
                          },
                        ].map((stage, index) => (
                          <motion.div
                            key={stage.stage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-xl border ${stage.color} text-center hover:shadow-md transition-all duration-300`}
                          >
                            <div className="flex justify-center mb-3">
                              {stage.icon}
                            </div>
                            <h4 className="font-semibold text-sm mb-2">
                              {stage.stage}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {stage.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="p-6 rounded-xl bg-muted/30 border border-border">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-primary" />
                          Exemplo de Estrutura de Componente
                        </h4>
                        <div className="bg-background/80 p-4 rounded-lg border border-border/50 font-mono text-xs overflow-x-auto">
                          <pre className="text-muted-foreground">
                            {`// 1. Imports e tipos
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

// 2. Componente com forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Best Practices */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Práticas Recomendadas
                      </CardTitle>
                      <CardDescription>
                        Guidelines para uso eficiente da biblioteca
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {[
                          "Prefira composição em vez de props complexas",
                          "Use variants para mudanças visuais predefinidas",
                          "Mantenha tokens de design centralizados",
                          "Escreva testes de acessibilidade (axe-core)",
                          "Documente customizações com Storybook",
                          "Use TypeScript strict mode para type safety",
                          "Implemente error boundaries para componentes críticos",
                        ].map((practice, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {practice}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        Anti-Patterns a Evitar
                      </CardTitle>
                      <CardDescription>
                        Erros comuns e como evitá-los
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {[
                          "Sobrescrever estilos inline sem usar className",
                          "Criar wrappers desnecessários ao redor de componentes",
                          "Ignorar warnings de acessibilidade no console",
                          "Usar !important para resolver conflitos de CSS",
                          "Modificar diretamente arquivos da biblioteca",
                          "Não testar em diferentes breakpoints",
                          "Esquecer de memoizar callbacks pesados",
                        ].map((antipattern, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {antipattern}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Optimizations */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Zap className="w-5 h-5" />
                      Otimizações de Performance
                    </CardTitle>
                    <CardDescription>
                      Técnicas implementadas para máxima eficiência
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        {
                          optimization: "Tree-shaking",
                          description:
                            "Apenas código usado é incluído no bundle final",
                          impact: "↓ 40-60% bundle size",
                        },
                        {
                          optimization: "Code Splitting",
                          description:
                            "Componentes carregados sob demanda via dynamic imports",
                          impact: "↓ Initial load time",
                        },
                        {
                          optimization: "Memoization",
                          description:
                            "React.memo e useMemo em componentes pesados",
                          impact: "↓ Re-renders",
                        },
                        {
                          optimization: "CSS-in-JS Minification",
                          description:
                            "Tailwind purge remove classes não utilizadas",
                          impact: "↓ 90% CSS size",
                        },
                        {
                          optimization: "Lazy Loading",
                          description:
                            "Componentes não-críticos carregados após montagem",
                          impact: "↑ Time to Interactive",
                        },
                        {
                          optimization: "Virtual Scrolling",
                          description:
                            "Listas longas renderizam apenas itens visíveis",
                          impact: "↑ 10x performance",
                        },
                      ].map((opt, index) => (
                        <motion.div
                          key={opt.optimization}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-background border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <Zap className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <h4 className="font-semibold text-sm">
                              {opt.optimization}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            {opt.description}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                          >
                            {opt.impact}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
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
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/5 via-background to-teal-500/5 p-8 lg:p-12 border border-border/50">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className="relative z-10 space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                    >
                      Specifications
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
                    >
                      Especificações técnicas detalhadas, requisitos de sistema,
                      benchmarks de performance e padrões de qualidade que
                      garantem excelência em produção.
                    </motion.p>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        Bundle & Performance
                      </CardTitle>
                      <CardDescription>
                        Métricas de tamanho, carregamento e performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      {[
                        {
                          metric: "Bundle Size (minified)",
                          value: "~45KB",
                          description:
                            "Biblioteca completa com todos os componentes",
                          status: "excellent",
                        },
                        {
                          metric: "Bundle Size (gzipped)",
                          value: "~12KB",
                          description: "Compressão gzip para produção",
                          status: "excellent",
                        },
                        {
                          metric: "Tree-shakeable",
                          value: "100%",
                          description: "Importe apenas o que você usar",
                          status: "excellent",
                        },
                        {
                          metric: "Initial Load Time",
                          value: "<100ms",
                          description: "First Contentful Paint em conexão 4G",
                          status: "good",
                        },
                        {
                          metric: "Time to Interactive",
                          value: "<200ms",
                          description: "Tempo até componentes interativos",
                          status: "good",
                        },
                      ].map((spec, index) => (
                        <motion.div
                          key={spec.metric}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">
                                {spec.metric}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {spec.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-primary">
                                {spec.value}
                              </div>
                              <Badge
                                className={
                                  spec.status === "excellent"
                                    ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                                    : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                                }
                              >
                                {spec.status === "excellent"
                                  ? "Excelente"
                                  : "Ótimo"}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        Code Quality Metrics
                      </CardTitle>
                      <CardDescription>
                        Padrões de qualidade e cobertura de código
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      {[
                        {
                          metric: "TypeScript Coverage",
                          value: "100%",
                          description: "Toda a codebase em TypeScript strict",
                          icon: <SiTypescript className="w-4 h-4" />,
                        },
                        {
                          metric: "Test Coverage",
                          value: "85%+",
                          description: "Unit tests e integration tests",
                          icon: <CheckCircle className="w-4 h-4" />,
                        },
                        {
                          metric: "Accessibility Score",
                          value: "100/100",
                          description: "Lighthouse accessibility audit",
                          icon: <Shield className="w-4 h-4" />,
                        },
                        {
                          metric: "ESLint Rules",
                          value: "120+",
                          description: "Regras de linting configuradas",
                          icon: <SiEslint className="w-4 h-4" />,
                        },
                        {
                          metric: "Zero Dependencies",
                          value: "React only",
                          description: "Peer dependencies mínimas",
                          icon: <Package className="w-4 h-4" />,
                        },
                      ].map((metric, index) => (
                        <motion.div
                          key={metric.metric}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                            {metric.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-sm">
                                {metric.metric}
                              </h4>
                              <span className="font-bold text-primary">
                                {metric.value}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {metric.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* System Requirements */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Monitor className="w-5 h-5" />
                      Requisitos de Sistema
                    </CardTitle>
                    <CardDescription>
                      Especificações mínimas e recomendadas para desenvolvimento
                      e produção
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Development Requirements */}
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-blue-600" />
                          Ambiente de Desenvolvimento
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              requirement: "Node.js",
                              min: "18.0.0",
                              recommended: "20.x LTS",
                              reason: "Runtime JavaScript com suporte ESM",
                            },
                            {
                              requirement: "Package Manager",
                              min: "npm 9+",
                              recommended: "pnpm 8+",
                              reason: "Gerenciamento de dependências",
                            },
                            {
                              requirement: "TypeScript",
                              min: "5.0.0",
                              recommended: "5.3.x",
                              reason: "Type checking e IntelliSense",
                            },
                            {
                              requirement: "React",
                              min: "18.0.0",
                              recommended: "18.2.0+",
                              reason: "Biblioteca base de UI",
                            },
                          ].map((req, index) => (
                            <motion.div
                              key={req.requirement}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                              className="p-3 rounded-lg bg-background border border-border"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">
                                  {req.requirement}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {req.recommended}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <div className="mb-1">
                                  Mínimo:{" "}
                                  <code className="bg-muted px-1 py-0.5 rounded">
                                    {req.min}
                                  </code>
                                </div>
                                <div>{req.reason}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Production Requirements */}
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Rocket className="w-4 h-4 text-green-600" />
                          Ambiente de Produção
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              requirement: "Browser Support",
                              spec: "ES2020+",
                              details:
                                "Chrome 90+, Firefox 88+, Safari 14+, Edge 90+",
                            },
                            {
                              requirement: "Network",
                              spec: "HTTP/2",
                              details: "Recomendado para melhor performance",
                            },
                            {
                              requirement: "Compression",
                              spec: "Brotli/Gzip",
                              details: "Reduz bundle size em até 70%",
                            },
                            {
                              requirement: "CDN",
                              spec: "Optional",
                              details: "Cloudflare, Vercel Edge, Fastly",
                            },
                          ].map((req, index) => (
                            <motion.div
                              key={req.requirement}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                              className="p-3 rounded-lg bg-background border border-border"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">
                                  {req.requirement}
                                </h4>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                                >
                                  {req.spec}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {req.details}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Benchmarks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Performance Benchmarks
                    </CardTitle>
                    <CardDescription>
                      Testes de performance em diferentes cenários de uso
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold">
                              Métrica
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">
                              Desktop
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">
                              Mobile
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">
                              Target
                            </th>
                            <th className="text-center py-3 px-4 font-semibold">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              metric: "First Contentful Paint",
                              desktop: "0.8s",
                              mobile: "1.2s",
                              target: "<1.8s",
                              status: "excellent",
                            },
                            {
                              metric: "Time to Interactive",
                              desktop: "1.5s",
                              mobile: "2.1s",
                              target: "<3.8s",
                              status: "excellent",
                            },
                            {
                              metric: "Speed Index",
                              desktop: "1.2s",
                              mobile: "1.8s",
                              target: "<3.4s",
                              status: "excellent",
                            },
                            {
                              metric: "Total Blocking Time",
                              desktop: "50ms",
                              mobile: "120ms",
                              target: "<200ms",
                              status: "excellent",
                            },
                            {
                              metric: "Cumulative Layout Shift",
                              desktop: "0.01",
                              mobile: "0.02",
                              target: "<0.1",
                              status: "excellent",
                            },
                            {
                              metric: "Largest Contentful Paint",
                              desktop: "1.4s",
                              mobile: "2.0s",
                              target: "<2.5s",
                              status: "excellent",
                            },
                          ].map((benchmark, index) => (
                            <tr
                              key={index}
                              className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-3 px-4 font-medium">
                                {benchmark.metric}
                              </td>
                              <td className="text-center py-3 px-4 font-mono text-xs">
                                {benchmark.desktop}
                              </td>
                              <td className="text-center py-3 px-4 font-mono text-xs">
                                {benchmark.mobile}
                              </td>
                              <td className="text-center py-3 px-4 font-mono text-xs text-muted-foreground">
                                {benchmark.target}
                              </td>
                              <td className="text-center py-3 px-4">
                                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                                  ✅ Pass
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border">
                      <p className="text-xs text-muted-foreground">
                        <strong>Nota:</strong> Benchmarks realizados usando
                        Lighthouse CI em ambiente controlado. Desktop: Desktop
                        4x CPU throttling, Mobile: Moto G4 network throttling.
                        Valores podem variar em produção dependendo de conteúdo
                        e configuração.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Accessibility Compliance */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        Conformidade WCAG
                      </CardTitle>
                      <CardDescription>
                        Aderência aos padrões de acessibilidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          level: "WCAG 2.1 Level A",
                          compliance: "100%",
                          description: "Requisitos básicos de acessibilidade",
                          status: "pass",
                        },
                        {
                          level: "WCAG 2.1 Level AA",
                          compliance: "100%",
                          description: "Padrão recomendado para sites públicos",
                          status: "pass",
                        },
                        {
                          level: "WCAG 2.1 Level AAA",
                          compliance: "95%",
                          description: "Nível mais alto de acessibilidade",
                          status: "partial",
                        },
                      ].map((wcag, index) => (
                        <motion.div
                          key={wcag.level}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border ${
                            wcag.status === "pass"
                              ? "bg-green-500/5 border-green-500/20"
                              : "bg-blue-500/5 border-blue-500/20"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">
                              {wcag.level}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">
                                {wcag.compliance}
                              </span>
                              {wcag.status === "pass" ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {wcag.description}
                          </p>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Testes Automatizados
                      </CardTitle>
                      <CardDescription>
                        Cobertura de testes e CI/CD
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          type: "Unit Tests",
                          coverage: "85%",
                          tool: "Vitest + React Testing Library",
                          count: "1,200+",
                        },
                        {
                          type: "Integration Tests",
                          coverage: "78%",
                          tool: "Cypress E2E",
                          count: "350+",
                        },
                        {
                          type: "Visual Regression",
                          coverage: "100%",
                          tool: "Chromatic Storybook",
                          count: "500+",
                        },
                        {
                          type: "Accessibility Tests",
                          coverage: "100%",
                          tool: "axe-core + Pa11y",
                          count: "800+",
                        },
                      ].map((test, index) => (
                        <motion.div
                          key={test.type}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start justify-between p-3 rounded-lg bg-muted/30 border border-border"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">
                              {test.type}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              {test.tool}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {test.count} testes
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-2xl text-primary">
                              {test.coverage}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              cobertura
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Version History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Versionamento & Releases
                    </CardTitle>
                    <CardDescription>
                      Política de versionamento semântico e ciclo de releases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <h4 className="font-semibold">
                          Semantic Versioning (SemVer)
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant="outline"
                                className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                              >
                                MAJOR
                              </Badge>
                              <span className="font-mono text-sm">X.0.0</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Breaking changes incompatíveis com versão anterior
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant="outline"
                                className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                              >
                                MINOR
                              </Badge>
                              <span className="font-mono text-sm">0.X.0</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Novas features compatíveis com versões anteriores
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant="outline"
                                className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                              >
                                PATCH
                              </Badge>
                              <span className="font-mono text-sm">0.0.X</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Bug fixes e melhorias de performance
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Ciclo de Release</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium mb-1">
                                Releases Semanais
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Patches e minor releases toda sexta-feira
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium mb-1">
                                Major Releases Trimestrais
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Breaking changes a cada 3 meses com migration
                                guide
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium mb-1">
                                LTS Support
                              </div>
                              <p className="text-xs text-muted-foreground">
                                2 anos de suporte para versões major LTS
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium mb-1">
                                Security Patches
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Hotfixes críticos liberados imediatamente
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
