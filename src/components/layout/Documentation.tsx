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
                className="group"
              >
                <ArrowRight
                  size={16}
                  className="mr-2 rotate-180 group-hover:-translate-x-1 transition-transform"
                />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium">{prevSection.label}</div>
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
                className="group"
              >
                <div className="text-right">
                  <div className="text-xs opacity-90">Next</div>
                  <div className="font-medium">{nextSection.label}</div>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
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
                        className="h-8 w-8 p-0"
                        title={`Previous: ${previousSection.label}`}
                      >
                        <ArrowLeft size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="h-8 w-8 p-0 opacity-30"
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
                        className="h-8 w-8 p-0"
                        title={`Next: ${nextSection.label}`}
                      >
                        <ArrowRight size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="h-8 w-8 p-0 opacity-30"
                      >
                        <ArrowRight size={16} />
                      </Button>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Section: Introduction */}
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
                      icon: (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="currentColor"
                        >
                          <title>Next.js</title>
                          <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z" />
                        </svg>
                      ),
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   export default function Page() {\n     return (\n       <Card><Button>Olá Next.js</Button></Card>\n     );\n   }`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Vite",
                      icon: (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="currentColor"
                        >
                          <title>Vite</title>
                          <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z" />
                        </svg>
                      ),
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   function App() {\n     return (\n       <Card><Button>Olá Vite</Button></Card>\n     );\n   }`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Create React App",
                      icon: (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="currentColor"
                        >
                          <title>React</title>
                          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                        </svg>
                      ),
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   function App() {\n     return (\n       <Card><Button>Olá CRA</Button></Card>\n     );\n   }`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Remix",
                      icon: (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="currentColor"
                        >
                          <title>Remix</title>
                          <path d="M21.511 18.508c0 2.194-1.752 3.967-3.914 3.967H6.403c-2.162 0-3.914-1.773-3.914-3.967V5.492C2.489 3.298 4.241 1.525 6.403 1.525h11.194c2.162 0 3.914 1.773 3.914 3.967v13.016zM18.5 9.758c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-13c-.414 0-.75.336-.75.75s.336.75.75.75h13zm0 3.75c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-13c-.414 0-.75.336-.75.75s.336.75.75.75h13zm-9.25 3.75c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h3.75z" />
                        </svg>
                      ),
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   export default function Index() {\n     return (\n       <Card><Button>Olá Remix</Button></Card>\n     );\n   }`,
                        "   content: ['./app/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Gatsby",
                      icon: (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="currentColor"
                        >
                          <title>Gatsby</title>
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM2.571 12.096L11.904 21.43C6.534 21.201 2.8 17.467 2.571 12.096zM12.816 21.428L2.572 11.184c.501-4.769 4.458-8.525 9.244-8.525 2.93 0 5.521 1.317 7.244 3.394l-.943 1.132c-1.548-1.822-3.871-2.98-6.301-2.98-4.016 0-7.332 2.801-8.125 6.516l9.574 9.574c2.817-.571 5.262-2.396 6.667-4.858l-3.609-3.609c-.354.354-1.061.709-1.768.709-1.415 0-2.475-1.061-2.475-2.475 0-1.415 1.061-2.475 2.475-2.475s2.475 1.061 2.475 2.475c0 .707-.354 1.414-.708 1.768l3.609 3.609c1.108-1.772 1.773-3.859 1.773-6.114 0-5.486-3.729-10.1-8.773-11.315v1.061c4.161 1.156 7.244 4.769 7.244 9.254 0 1.415-.354 2.83-.943 4.016L12.816 21.428z" />
                        </svg>
                      ),
                      steps: [
                        "   npm install @glacien/ui",
                        "   import '@glacien/ui/dist/index.css';",
                        `   import { Button, Card } from '@glacien/ui';\n\n   export default function Home() {\n     return (\n       <Card><Button>Olá Gatsby</Button></Card>\n     );\n   }`,
                        "   content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@glacien/ui/dist/**/*.js']",
                      ],
                    },
                    {
                      name: "Manual",
                      icon: (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="currentColor"
                        >
                          <title>Manual</title>
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ),
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
