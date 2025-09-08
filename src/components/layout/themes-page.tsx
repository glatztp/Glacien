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
  Switch,
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
} from "phosphor-react";
import { useTheme } from "../providers/theme-provider";

type ColorScheme =
  | "blue"
  | "emerald"
  | "violet"
  | "rose"
  | "orange"
  | "premium";

const themes = {
  light: {
    name: "Claro",
    description: "Clean e minimalista para produtividade",
    icon: <Sun className="h-5 w-5" />,
    category: "Essencial",
    gradient: "from-slate-50 to-gray-100",
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
    description: "Elegante e confortável para longas sessões",
    icon: <Moon className="h-5 w-5" />,
    category: "Essencial",
    gradient: "from-slate-900 to-gray-950",
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
    description: "Adapta automaticamente ao seu dispositivo",
    icon: <Monitor className="h-5 w-5" />,
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
    description: "Vibrante e futurista para criar impacto",
    icon: <Lightning className="h-5 w-5" />,
    category: "Criativo",
    gradient: "from-purple-600 to-pink-600",
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
    description: "Caloroso e inspirador como o pôr do sol",
    icon: <Fire className="h-5 w-5" />,
    category: "Natureza",
    gradient: "from-orange-400 to-red-500",
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
    description: "Sereno e refrescante como águas cristalinas",
    icon: <Snowflake className="h-5 w-5" />,
    category: "Natureza",
    gradient: "from-cyan-400 to-blue-500",
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
    description: "Aconchegante e rico como um café especial",
    icon: <Coffee className="h-5 w-5" />,
    category: "Aconchegante",
    gradient: "from-amber-600 to-orange-700",
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
    description: "Misterioso e profundo como o cosmos",
    icon: <Planet className="h-5 w-5" />,
    category: "Criativo",
    gradient: "from-indigo-600 to-purple-700",
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
    description: "Confiável e profissional",
    primary: "hsl(217 91% 60%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(217 91% 95%)",
    hex: "#3b82f6",
    category: "Clássico",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Verde",
    id: "emerald",
    description: "Natureza e crescimento",
    primary: "hsl(160 84% 39%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(160 84% 95%)",
    hex: "#10b981",
    category: "Natureza",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    name: "Roxo",
    id: "violet",
    description: "Criatividade e inovação",
    primary: "hsl(262 83% 58%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(262 83% 95%)",
    hex: "#8b5cf6",
    category: "Criativo",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    name: "Rosa",
    id: "rose",
    description: "Paixão e energia",
    primary: "hsl(346 77% 49%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(346 77% 95%)",
    hex: "#f43f5e",
    category: "Romântico",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    name: "Laranja",
    id: "orange",
    description: "Entusiasmo e dinamismo",
    primary: "hsl(20 91% 48%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(20 91% 95%)",
    hex: "#f97316",
    category: "Energético",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    name: "Dourado",
    id: "premium",
    description: "Luxo e sofisticação",
    primary: "hsl(45 100% 51%)",
    secondary: "hsl(220 14% 96%)",
    accent: "hsl(45 100% 90%)",
    hex: "#FFD700",
    category: "Luxo",
    gradient: "from-yellow-500 to-amber-600",
  },
];

export function ThemesPage() {
  const { theme, colorScheme, setTheme, setColorScheme, actualTheme } =
    useTheme();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/2 via-transparent to-secondary/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Personalize
            </span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Sua Interface
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Transforme sua experiência com{" "}
            <span className="text-primary font-semibold">temas únicos</span>,{" "}
            <span className="text-primary font-semibold">
              cores profissionais
            </span>{" "}
            e{" "}
            <span className="text-primary font-semibold">
              controles intuitivos
            </span>
          </motion.p>
        </motion.section>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Tabs defaultValue="themes" className="w-full">
            {/* Tab Navigation */}
            <div className="relative mb-16">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-16 p-2 bg-background/80 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-xl">
                <TabsTrigger
                  value="themes"
                  className="h-12 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl"
                >
                  <Palette className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Temas</span>
                </TabsTrigger>
                <TabsTrigger
                  value="colors"
                  className="h-12 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl"
                >
                  <Swatches className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Cores</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="h-12 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl"
                >
                  <Gear className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Config</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Themes Tab */}
            <TabsContent value="themes" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black mb-3">
                    <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                      Coleção de Temas
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {Object.keys(themes).length} temas únicos criados para
                    diferentes personalidades e momentos
                  </p>
                </div>

                {/* Themes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(themes).map(([key, themeObj], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group"
                    >
                      <Card
                        className={`relative cursor-pointer transition-all duration-500 border-2 overflow-hidden ${
                          theme === key
                            ? "ring-2 ring-primary/60 border-primary shadow-2xl shadow-primary/20 bg-primary/5"
                            : "border-border/50 hover:border-primary/30 hover:shadow-xl bg-background/80 backdrop-blur-sm"
                        } group-hover:shadow-2xl h-full`}
                        onClick={() => setTheme(key as keyof typeof themes)}
                      >
                        {/* Background Gradient */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${themeObj.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                        />

                        <CardContent className="relative p-3 space-y-3 h-full flex flex-col">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`p-2 rounded-lg bg-gradient-to-br ${themeObj.gradient} text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}
                              >
                                {themeObj.icon}
                              </div>
                            </div>

                            {theme === key && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="text-primary"
                              >
                                <div className="p-1 bg-primary/10 rounded-full border border-primary/20">
                                  <Check className="h-3 w-3" />
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="space-y-2 flex-1">
                            <div>
                              <h3 className="font-black text-base mb-1 group-hover:text-primary transition-colors duration-300">
                                {themeObj.name}
                              </h3>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
                                {themeObj.description}
                              </p>
                            </div>

                            {/* Preview */}
                            <div
                              className="h-10 rounded-lg border flex items-center justify-center text-xs font-medium transition-all duration-300 group-hover:scale-[1.02]"
                              style={{
                                backgroundColor: themeObj.preview.background,
                                color: themeObj.preview.foreground,
                                borderColor: themeObj.preview.border,
                              }}
                            >
                              Preview
                            </div>

                            {/* Color Palette */}
                            <div className="flex gap-1">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="h-5 flex-1 rounded-md shadow-sm border border-white/20"
                                style={{
                                  backgroundColor: themeObj.preview.primary,
                                }}
                              />
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="h-6 flex-1 rounded-md shadow-sm border border-white/20"
                                style={{
                                  backgroundColor: themeObj.preview.secondary,
                                }}
                              />
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="h-6 flex-1 rounded-md shadow-sm border border-white/20"
                                style={{
                                  backgroundColor: themeObj.preview.accent,
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black mb-3">
                    <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                      Esquemas de Cores
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Paletas profissionais cuidadosamente selecionadas para
                    diferentes contextos
                  </p>
                </div>

                {/* Colors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colorSchemes.map((scheme, index) => (
                    <motion.div
                      key={scheme.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="group"
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-500 border-2 overflow-hidden ${
                          colorScheme === scheme.id
                            ? "ring-2 ring-primary/60 border-primary shadow-2xl bg-primary/5"
                            : "border-border/50 hover:border-primary/30 hover:shadow-xl bg-background/80 backdrop-blur-sm"
                        } group-hover:shadow-2xl h-full`}
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
                        <CardContent className="p-3 space-y-3 h-full flex flex-col">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-black text-base mb-1 group-hover:text-primary transition-colors duration-300">
                                {scheme.name}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {scheme.description}
                              </p>
                            </div>

                            {colorScheme === scheme.id && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="text-primary"
                              >
                                <div className="p-1.5 bg-primary/10 rounded-full border border-primary/20">
                                  <Check className="h-3 w-3" />
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Main Color */}
                          <div
                            className="h-12 rounded-lg cursor-pointer transition-all duration-300 group-hover:scale-[1.02] shadow-md relative overflow-hidden border border-white/20"
                            style={{ backgroundColor: scheme.hex }}
                            onClick={(e) => {
                              e.stopPropagation();
                              copyColor(scheme.hex, "primary");
                            }}
                          >
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-white/90 rounded-full p-1">
                                <Copy className="h-3 w-3 text-gray-800" />
                              </div>
                            </div>
                          </div>

                          {/* Color Palette */}
                          <div className="flex gap-1.5">
                            {[
                              {
                                color: scheme.primary,
                                key: "primary",
                                label: "Primary",
                              },
                              {
                                color: scheme.secondary,
                                key: "secondary",
                                label: "Secondary",
                              },
                              {
                                color: scheme.accent,
                                key: "accent",
                                label: "Accent",
                              },
                            ].map((colorItem, colorIndex) => (
                              <motion.div
                                key={colorIndex}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="h-8 flex-1 rounded-md cursor-pointer shadow-sm relative overflow-hidden group/color border border-white/20"
                                style={{ backgroundColor: colorItem.color }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyColor(colorItem.color, colorItem.key);
                                }}
                                title={colorItem.label}
                              >
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <Copy className="h-3 w-3 text-white drop-shadow-sm" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black mb-3">
                    <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                      Configurações Avançadas
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Ajuste fino para uma experiência totalmente personalizada
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Global Settings */}
                  <Card className="bg-background/80 backdrop-blur-sm border-2 border-border/50">
                    <CardHeader>
                      <CardTitle className="text-2xl font-black flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl text-white">
                          <Gear className="h-5 w-5" />
                        </div>
                        Configurações Globais
                      </CardTitle>
                      <CardDescription className="text-base">
                        Controles que afetam toda a interface
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-muted/30">
                        <div>
                          <Label className="font-semibold text-base">
                            Animações de Tema
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Transições suaves entre mudanças de tema
                          </p>
                        </div>
                        <Switch
                          checked={animationsEnabled}
                          onCheckedChange={setAnimationsEnabled}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-muted/30">
                        <div>
                          <Label className="font-semibold text-base">
                            Alto Contraste
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Melhora a legibilidade para acessibilidade
                          </p>
                        </div>
                        <Switch
                          checked={highContrast}
                          onCheckedChange={setHighContrast}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-muted/30">
                        <div>
                          <Label className="font-semibold text-base">
                            Modo Reduzido
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Interface simplificada com menos elementos
                          </p>
                        </div>
                        <Switch
                          checked={reducedMode}
                          onCheckedChange={setReducedMode}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Export & Actions */}
                  <Card className="bg-background/80 backdrop-blur-sm border-2 border-border/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-black flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg text-white">
                          <Share className="h-4 w-4" />
                        </div>
                        Exportar & Compartilhar
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Salve e compartilhe suas personalizações
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
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
                        className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group"
                      >
                        <Copy className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Copiar Configuração JSON
                      </Button>

                      <Button
                        onClick={resetToDefaults}
                        variant="outline"
                        className="w-full h-12 text-sm font-semibold border-2 hover:bg-muted/50"
                      >
                        <ArrowCounterClockwise className="h-4 w-4 mr-2" />
                        Restaurar Configurações Padrão
                      </Button>

                      <Button
                        onClick={() => {
                          const themeColors = `/* Tema ${actualTheme} com esquema ${colorScheme} */\n:root {\n  --primary: ${getComputedStyle(
                            document.documentElement
                          ).getPropertyValue(
                            "--primary"
                          )};\n  --background: ${getComputedStyle(
                            document.documentElement
                          ).getPropertyValue("--background")};\n}`;

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
                        className="w-full h-12 text-sm font-semibold border-2 hover:bg-muted/50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Baixar CSS Personalizado
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Toast Notifications */}
        <AnimatePresence>
          {copiedColor && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className={`fixed bottom-8 right-8 z-50 p-6 rounded-2xl shadow-2xl text-white max-w-sm ${
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
                  <Lightning className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <Check className="h-5 w-5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-semibold">
                    {copiedColor === "color-warning"
                      ? "Aviso!"
                      : copiedColor.includes("config-copied")
                        ? "Configuração Copiada!"
                        : copiedColor.includes("css-downloaded")
                          ? "CSS Baixado!"
                          : "Cor Copiada!"}
                  </p>
                  {copiedColor === "color-warning" && (
                    <p className="text-sm opacity-90 mt-1">
                      Esquemas de cor só funcionam com temas padrão (Claro,
                      Escuro, Sistema)
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ThemesPage;
