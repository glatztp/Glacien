/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Switch,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Label,
} from "../../index";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Eye,
  Download,
  Gear,
  Check,
  ArrowCounterClockwise,
  Lightning,
  Fire,
  Snowflake,
  Coffee,
  Planet,
  Copy,
  Share,
  Swatches,
  Drop,
  Warning,
  X,
} from "phosphor-react";
import { useTheme } from "../providers/theme-provider";

type ColorScheme = "blue" | "emerald" | "violet" | "rose" | "orange" | "premium";

const themes = {
  light: {
    name: "Claro",
    icon: <Sun className="h-4 w-4" />,
    category: "Básico",
    gradient: "from-white to-gray-50",
    preview: {
      background: "hsl(0 0% 99%)",
      foreground: "hsl(240 15% 9%)",
      primary: "hsl(217 91% 60%)",
      secondary: "hsl(220 14% 96%)",
      muted: "hsl(220 14% 96%)",
      accent: "hsl(217 91% 95%)",
      border: "hsl(220 13% 91%)",
    },
  },
  dark: {
    name: "Escuro",
    icon: <Moon className="h-4 w-4" />,
    category: "Básico",
    gradient: "from-gray-900 to-black",
    preview: {
      background: "hsl(240 15% 6%)",
      foreground: "hsl(0 0% 95%)",
      primary: "hsl(217 91% 65%)",
      secondary: "hsl(240 15% 12%)",
      muted: "hsl(240 15% 12%)",
      accent: "hsl(240 15% 12%)",
      border: "hsl(240 15% 18%)",
    },
  },
  system: {
    name: "Sistema",
    icon: <Monitor className="h-4 w-4" />,
    category: "Inteligente",
    gradient: "from-blue-100 to-purple-100",
    preview: {
      background: "hsl(0 0% 50%)",
      foreground: "hsl(0 0% 50%)",
      primary: "hsl(217 91% 60%)",
      secondary: "hsl(220 14% 80%)",
      muted: "hsl(220 14% 80%)",
      accent: "hsl(217 91% 80%)",
      border: "hsl(220 13% 70%)",
    },
  },
  neon: {
    name: "Neon",
    icon: <Lightning className="h-4 w-4" />,
    category: "Futurista",
    gradient: "from-purple-900 via-blue-900 to-indigo-900",
    preview: {
      background: "hsl(240 15% 3%)",
      foreground: "hsl(0 100% 100%)",
      primary: "hsl(280 100% 70%)",
      secondary: "hsl(240 15% 8%)",
      muted: "hsl(240 15% 8%)",
      accent: "hsl(320 100% 60%)",
      border: "hsl(280 100% 30%)",
    },
  },
  sunset: {
    name: "Sunset",
    icon: <Fire className="h-4 w-4" />,
    category: "Natureza",
    gradient: "from-orange-400 via-red-500 to-pink-500",
    preview: {
      background: "hsl(20 100% 98%)",
      foreground: "hsl(20 20% 10%)",
      primary: "hsl(15 100% 55%)",
      secondary: "hsl(20 100% 95%)",
      muted: "hsl(20 100% 95%)",
      accent: "hsl(340 100% 85%)",
      border: "hsl(20 100% 85%)",
    },
  },
  ocean: {
    name: "Ocean",
    icon: <Snowflake className="h-4 w-4" />,
    category: "Natureza",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    preview: {
      background: "hsl(200 100% 97%)",
      foreground: "hsl(200 20% 10%)",
      primary: "hsl(200 100% 45%)",
      secondary: "hsl(200 100% 95%)",
      muted: "hsl(200 100% 95%)",
      accent: "hsl(180 100% 85%)",
      border: "hsl(200 100% 80%)",
    },
  },
  coffee: {
    name: "Coffee",
    icon: <Coffee className="h-4 w-4" />,
    category: "Aconchegante",
    gradient: "from-amber-700 via-orange-600 to-yellow-500",
    preview: {
      background: "hsl(30 40% 98%)",
      foreground: "hsl(30 20% 15%)",
      primary: "hsl(25 75% 50%)",
      secondary: "hsl(30 40% 95%)",
      muted: "hsl(30 40% 95%)",
      accent: "hsl(45 90% 85%)",
      border: "hsl(30 50% 85%)",
    },
  },
  galaxy: {
    name: "Galaxy",
    icon: <Planet className="h-4 w-4" />,
    category: "Futurista",
    gradient: "from-indigo-900 via-purple-900 to-pink-800",
    preview: {
      background: "hsl(240 15% 4%)",
      foreground: "hsl(0 0% 98%)",
      primary: "hsl(260 100% 65%)",
      secondary: "hsl(240 15% 10%)",
      muted: "hsl(240 15% 10%)",
      accent: "hsl(300 100% 75%)",
      border: "hsl(260 80% 25%)",
    },
  },
};

const colorSchemes = [
  {
    name: "Azul",
    id: "blue",
    primary: "hsl(217 91% 60%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(217 91% 95%)",
    hex: "#3b82f6",
    category: "Clássico",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "Verde",
    id: "emerald",
    primary: "hsl(160 84% 39%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(160 84% 95%)",
    hex: "#10b981",
    category: "Natureza",
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    name: "Roxo",
    id: "violet",
    primary: "hsl(262 83% 58%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(262 83% 95%)",
    hex: "#8b5cf6",
    category: "Criativo",
    gradient: "from-violet-400 to-violet-600",
  },
  {
    name: "Rosa",
    id: "rose",
    primary: "hsl(346 77% 49%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(346 77% 95%)",
    hex: "#f43f5e",
    category: "Romântico",
    gradient: "from-rose-400 to-rose-600",
  },
  {
    name: "Laranja",
    id: "orange",
    primary: "hsl(20 91% 48%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(20 91% 95%)",
    hex: "#f97316",
    category: "Energético",
    gradient: "from-orange-400 to-orange-600",
  },
  {
    name: "Dourado",
    id: "premium",
    primary: "hsl(45 100% 51%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(45 100% 90%)",
    hex: "#FFD700",
    category: "Luxo",
    gradient: "from-yellow-400 to-orange-500",
  },
];

export function ThemesPage() {
  const { theme, colorScheme, setTheme, setColorScheme, actualTheme } =
    useTheme();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMode, setReducedMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (highContrast) {
      root.style.setProperty("--contrast-multiplier", "1.5");
      root.classList.add("high-contrast");
    } else {
      root.style.setProperty("--contrast-multiplier", "1");
      root.classList.remove("high-contrast");
    }

    if (reducedMode) {
      root.classList.add("reduced-motion");
      root.style.setProperty("--animation-duration", "0.1s");
    } else {
      root.classList.remove("reduced-motion");
      root.style.setProperty("--animation-duration", "0.3s");
    }

    if (animationsEnabled) {
      root.classList.remove("no-animations");
    } else {
      root.classList.add("no-animations");
    }
  }, [highContrast, reducedMode, animationsEnabled]);

  const copyColor = async (color: string, type: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(`${type}-${color}`);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (error) {
      console.error("Erro ao copiar cor:", error);
    }
  };

  const resetToDefaults = () => {
    setTheme("system");
    setColorScheme("blue");
    setAnimationsEnabled(true);
    setHighContrast(false);
    setReducedMode(false);
  };

  const filteredSchemes =
    selectedCategory === "all"
      ? colorSchemes
      : colorSchemes.filter((scheme) => scheme.category === selectedCategory);

  const categories = [
    "all",
    ...Array.from(new Set(colorSchemes.map((scheme) => scheme.category))),
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pt-12">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />
      </div>

      <motion.div
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: [360, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg backdrop-blur-sm"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Revolutionary Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl scale-110" />
              <div className="relative p-6 sm:p-8 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border-2 border-primary/20 rounded-3xl shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg scale-110 opacity-50" />
                    <div className="relative p-4 sm:p-6 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-full shadow-xl">
                      <Palette className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                    </div>
                  </motion.div>
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight"
                >
                  Temas
                  <br />
              
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium"
                >
                  Transforme completamente a aparência da sua aplicação com{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
                    temas dinâmicos
                  </span>
                  , esquemas de cores avançados e customizações em tempo real.
                </motion.p>
              </div>
            </motion.div>
          </div>
          {/* Revolutionary Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Tabs defaultValue="themes" className="w-full ">
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl" />
                <TabsList className="relative grid w-full grid-cols-3 bg-background/80 backdrop-blur-xl border-2 border-primary/20 rounded-2xl p-2 shadow-2xl h-16">
                  <TabsTrigger
                    value="themes"
                    className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-lg text-lg font-semibold transition-all duration-300"
                  >
                    <Palette className="h-5 w-5 mr-2" />
                    Temas
                  </TabsTrigger>
                  <TabsTrigger
                    value="colors"
                    className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-lg text-lg font-semibold transition-all duration-300"
                  >
                    <Swatches className="h-5 w-5 mr-2" />
                    Cores
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-lg text-lg font-semibold transition-all duration-300"
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    Preview
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="themes" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                    <CardHeader className="relative border-b border-primary/20">
                      <CardTitle className="text-2xl font-black flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl text-white shadow-lg">
                          <Planet className="h-6 w-6" />
                        </div>
                        Temas
                      </CardTitle>
                      <CardDescription className="text-lg font-medium">
                        Explore nossa coleção de temas únicos, cada um com
                        personalidade própria
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative p-8">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Object.entries(themes).map(
                          ([key, themeObj], index) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.6 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="group relative"
                            >
                              <Card
                                className={`relative cursor-pointer transition-all duration-500 border-2 overflow-hidden ${
                                  theme === key
                                    ? "ring-4 ring-primary/50 border-primary shadow-2xl shadow-primary/20"
                                    : "border-primary/20 hover:border-primary/40 hover:shadow-xl"
                                }`}
                                onClick={() =>
                                  setTheme(key as keyof typeof themes)
                                }
                              >
                                <div
                                  className={`absolute inset-0 bg-gradient-to-br ${themeObj.gradient} opacity-20`}
                                />

                                <CardContent className="relative p-6 space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`p-3 rounded-xl bg-gradient-to-br ${themeObj.gradient} text-white shadow-lg`}
                                      >
                                        {themeObj.icon}
                                      </div>
                                      <div>
                                        <Badge
                                          variant="outline"
                                          className="text-xs font-medium mb-1"
                                        >
                                          {themeObj.category}
                                        </Badge>
                                      </div>
                                    </div>
                                    {theme === key && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-primary"
                                      >
                                        <Check className="h-6 w-6" />
                                      </motion.div>
                                    )}
                                  </div>

                                  <div>
                                    <h3 className="font-black text-lg mb-1">
                                      {themeObj.name}
                                    </h3>
                                  </div>

                                  <div className="space-y-3">
                                    <div
                                      className="h-12 rounded-xl border-2 flex items-center px-4 text-sm"
                                      style={{
                                        backgroundColor:
                                          themeObj.preview.background,
                                        color: themeObj.preview.foreground,
                                        borderColor: themeObj.preview.border,
                                      }}
                                    >
                                      Exemplo de interface
                                    </div>
                                    <div className="flex gap-2">
                                      <div
                                        className="h-8 flex-1 rounded-lg"
                                        style={{
                                          backgroundColor:
                                            themeObj.preview.primary,
                                        }}
                                      />
                                      <div
                                        className="h-8 flex-1 rounded-lg"
                                        style={{
                                          backgroundColor:
                                            themeObj.preview.secondary,
                                        }}
                                      />
                                      <div
                                        className="h-8 flex-1 rounded-lg"
                                        style={{
                                          backgroundColor:
                                            themeObj.preview.accent,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Colors Tab */}
              <TabsContent value="colors" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Category Filter */}
                  <Card className="relative overflow-hidden border-2 border-primary/20 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-black flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl text-white shadow-lg">
                          <Drop className="h-6 w-6" />
                        </div>
                        Filtros de Categoria
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={
                              selectedCategory === category
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setSelectedCategory(category)}
                            className="transition-all duration-300"
                          >
                            {category === "all" ? "Todas" : category}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Color Schemes Grid */}
                  <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-black flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl text-white shadow-lg">
                          <Swatches className="h-6 w-6" />
                        </div>
                        Esquemas de Cores Avançados
                      </CardTitle>
                      <CardDescription className="text-lg font-medium">
                        {filteredSchemes.length} esquemas disponíveis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSchemes.map((scheme, index) => (
                          <motion.div
                            key={scheme.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={`cursor-pointer transition-all duration-500 border-2 ${
                                colorScheme === scheme.id
                                  ? "ring-4 ring-primary/50 border-primary shadow-2xl"
                                  : "border-primary/20 hover:border-primary/40"
                              }`}
                              onClick={() => {
                                const coloredThemes = [
                                  "neon",
                                  "sunset",
                                  "ocean",
                                  "coffee",
                                  "galaxy",
                                ];
                                if (coloredThemes.includes(theme)) {
                                  setCopiedColor("color-warning");
                                  setTimeout(() => setCopiedColor(null), 3000);
                                  return;
                                }
                                setColorScheme(scheme.id as ColorScheme);
                              }}
                            >
                              <CardContent className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <Badge
                                      variant="outline"
                                      className="text-xs mb-2"
                                    >
                                      {scheme.category}
                                    </Badge>
                                    <h3 className="font-black text-lg">
                                      {scheme.name}
                                    </h3>
                                  </div>
                                  {colorScheme === scheme.id && (
                                    <Check className="h-6 w-6 text-primary" />
                                  )}
                                </div>

                                <div
                                  className="h-16 rounded-xl cursor-pointer transition-all duration-300"
                                  style={{ backgroundColor: scheme.hex }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyColor(scheme.hex, "primary");
                                  }}
                                />

                                <div className="flex gap-2">
                                  <div
                                    className="h-8 flex-1 rounded-lg cursor-pointer"
                                    style={{ backgroundColor: scheme.primary }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyColor(scheme.primary, "primary");
                                    }}
                                  />
                                  <div
                                    className="h-8 flex-1 rounded-lg cursor-pointer"
                                    style={{
                                      backgroundColor: scheme.secondary,
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyColor(scheme.secondary, "secondary");
                                    }}
                                  />
                                  <div
                                    className="h-8 flex-1 rounded-lg cursor-pointer"
                                    style={{ backgroundColor: scheme.accent }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyColor(scheme.accent, "accent");
                                    }}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-black flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl text-white shadow-lg">
                          <Eye className="h-6 w-6" />
                        </div>
                        Preview Interativo dos Componentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-12">
                      {/* Buttons Preview */}
                      <div>
                        <h4 className="text-xl font-black mb-6">
                          Botões e Ações
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          <Button>Primário</Button>
                          <Button variant="secondary">Secundário</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                          <Button variant="destructive">Destrutivo</Button>
                        </div>
                      </div>

                      <Separator />

                      {/* Cards Preview */}
                      <div>
                        <h4 className="text-xl font-black mb-6">
                          Cards e Badges
                        </h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border-2 border-primary/20">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle>Card de Exemplo</CardTitle>
                                <Badge>Novo</Badge>
                              </div>
                              <CardDescription>
                                Este card demonstra o tema atual
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">
                                Conteúdo com cores aplicadas automaticamente.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="border-2 border-primary/20">
                            <CardHeader>
                              <CardTitle>Configurações</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span>Notificações</span>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Modo Escuro</span>
                                <Switch
                                  checked={
                                    actualTheme === "dark" ||
                                    actualTheme === "neon" ||
                                    actualTheme === "galaxy"
                                  }
                                  onCheckedChange={(checked) =>
                                    setTheme(checked ? "dark" : "light")
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Animações</span>
                                <Switch
                                  checked={animationsEnabled}
                                  onCheckedChange={setAnimationsEnabled}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <Separator />

                      {/* States Preview */}
                      <div>
                        <h4 className="text-xl font-black mb-6">
                          Estados e Feedback
                        </h4>
                        <div className="space-y-4">
                          <div className="p-4 flex items-center gap-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
                            <Check /> Operação concluída com sucesso
                          </div>
                          <div className="p-4 flex items-center gap-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-200">
                            <Warning /> Atenção: verifique as configurações
                          </div>
                          <div className="p-4 flex items-center gap-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                            <X /> Erro: não foi possível completar a ação
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
          {/* Copy Notification */}
          <AnimatePresence>
            {copiedColor && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-xl shadow-2xl text-white ${
                  copiedColor === "color-warning"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                    : copiedColor.includes("config-copied")
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                    : copiedColor.includes("css-downloaded")
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  {copiedColor === "color-warning" ? (
                    <Lightning className="h-5 w-5" />
                  ) : (
                    <Check className="h-5 w-5" />
                  )}
                  <span className="font-semibold">
                    {copiedColor === "color-warning"
                      ? "O esquema de cor só é aplicado nos temas padrão (Claro, Escuro, Sistema)."
                      : copiedColor.includes("config-copied")
                      ? "Configuração copiada!"
                      : copiedColor.includes("css-downloaded")
                      ? "CSS baixado!"
                      : "Cor copiada!"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>{" "}
          {/* Enhanced Controls Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12"
          >
            <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <CardHeader className="relative border-b border-primary/20">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl text-white shadow-lg">
                    <Gear className="h-6 w-6" />
                  </div>
                  Controles Avançados
                </CardTitle>
                <CardDescription className="text-lg font-medium">
                  Configurações globais e ferramentas de personalização
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Global Settings */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-black flex items-center gap-2">
                      <Gear className="h-5 w-5 text-primary" />
                      Configurações Globais
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-primary/20 rounded-xl">
                        <div>
                          <Label className="font-semibold">
                            Animações de Tema
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Transições suaves entre temas
                          </p>
                        </div>
                        <Switch
                          checked={animationsEnabled}
                          onCheckedChange={setAnimationsEnabled}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-primary/20 rounded-xl">
                        <div>
                          <Label className="font-semibold">
                            Alto Contraste
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Melhorar acessibilidade
                          </p>
                        </div>
                        <Switch
                          checked={highContrast}
                          onCheckedChange={setHighContrast}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-primary/20 rounded-xl">
                        <div>
                          <Label className="font-semibold">Modo Reduzido</Label>
                          <p className="text-sm text-muted-foreground">
                            Interface simplificada
                          </p>
                        </div>
                        <Switch
                          checked={reducedMode}
                          onCheckedChange={setReducedMode}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Export & Share */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-black flex items-center gap-2">
                      <Share className="h-5 w-5 text-primary" />
                      Exportar & Compartilhar
                    </h3>

                    <div className="space-y-4">
                      <Button
                        onClick={() => {
                          const config = {
                            theme,
                            colorScheme,
                            animationsEnabled,
                            highContrast,
                            reducedMode,
                            timestamp: new Date().toISOString(),
                            version: "2.0.0",
                          };
                          navigator.clipboard.writeText(
                            JSON.stringify(config, null, 2)
                          );
                          setCopiedColor("config-copied");
                          setTimeout(() => setCopiedColor(null), 3000);
                        }}
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        <Copy className="h-5 w-5 mr-2" />
                        Copiar Configuração JSON
                      </Button>

                      <Button
                        onClick={resetToDefaults}
                        variant="outline"
                        className="w-full h-12 text-lg font-semibold border-2 border-primary/20 hover:border-primary/40"
                      >
                        <ArrowCounterClockwise className="h-5 w-5 mr-2" />
                        Restaurar Padrões
                      </Button>

                      <Button
                        onClick={() => {
                          const themeColors =
                            actualTheme === "light" || actualTheme === "dark"
                              ? `/* Tema ${actualTheme} com esquema ${colorScheme} */\n:root {\n  --primary: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--primary"
                                )};\n  --primary-foreground: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--primary-foreground"
                                )};\n  --background: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--background"
                                )};\n  --foreground: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--foreground"
                                )};\n  --secondary: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--secondary"
                                )};\n  --secondary-foreground: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--secondary-foreground"
                                )};\n  --accent: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--accent"
                                )};\n  --accent-foreground: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--accent-foreground"
                                )};\n  --border: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--border"
                                )};\n  --ring: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue("--ring")};\n}`
                              : `/* Tema personalizado: ${actualTheme} */\n:root {\n  --primary: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--primary"
                                )};\n  --primary-foreground: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--primary-foreground"
                                )};\n  --background: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--background"
                                )};\n  --foreground: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--foreground"
                                )};\n  --secondary: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--secondary"
                                )};\n  --secondary-foreground: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--secondary-foreground"
                                )};\n  --accent: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--accent"
                                )};\n  --accent-foreground: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--accent-foreground"
                                )};\n  --border: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue(
                                  "--border"
                                )};\n  --ring: ${getComputedStyle(
                                  document.documentElement
                                ).getPropertyValue("--ring")};\n}`;

                          const blob = new Blob([themeColors], {
                            type: "text/css",
                          });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `theme-${actualTheme}-${colorScheme}.css`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);

                          setCopiedColor("css-downloaded");
                          setTimeout(() => setCopiedColor(null), 3000);
                        }}
                        variant="outline"
                        className="w-full h-12 text-lg font-semibold border-2 border-primary/20 hover:border-primary/40"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Baixar CSS Personalizado
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full h-12 text-lg font-semibold border-2 border-primary/20 hover:border-primary/40"
                      >
                        <Share className="h-5 w-5 mr-2" />
                        Compartilhar Tema
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ThemesPage;
