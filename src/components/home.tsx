/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Palette,
  Accessibility,
  Code2,
  Sparkles,
  Shield,
  Rocket,
  Github,
  BookOpen,
  Download,
  Star,
  Users,
  Globe,
} from "lucide-react";

import { LogoLoop } from "./ui/loop";
import { useTheme } from "./providers/theme-provider";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNpm,
  SiVercel,
  SiGithub,
  SiVite,
} from "react-icons/si";

import { Button, Badge, ThemeToggle } from "./ui";
import FloatingSearch from "./ui/floating-search";

import { Card, CardContent } from "./ui/layout";
import { NavigationHeader } from "./layout/NavigationHeader";
import { ComponentsSidebar } from "./layout/ComponentsSidebar";
import ScrollUp from "./ui/scroll-up";
interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

import { PlaygroundPage } from "./pages/playground-page";
import { ThemesPage } from "./pages/themes-page";
import { AlertPage } from "./pages/alert-page";
import { AlertDialogPage } from "./pages/alert-dialog-page";
import { AspectRatioPage } from "./pages/aspect-ratio-page";
import { AvatarPage } from "./pages/avatar-page";
import { BadgePage } from "./pages/badge-page";
import { ButtonPage } from "./pages/button-page";
import { CalendarPage } from "./pages/calendar-page";
import { CardPage } from "./pages/card-page";
import { CheckboxPage } from "./pages/checkbox-page";
import { ComboboxPage } from "./pages/combobox-page";
import { CommandPage } from "./pages/command-page";
import { ContextMenuPage } from "./pages/context-menu-page";
import { DataTablePage } from "./pages/data-table-page";
import { DatePickerPage } from "./pages/date-picker-page";
import { DialogPage } from "./pages/dialog-page";
import { DrawerPage } from "./pages/drawer-page";
import { DropdownMenuPage } from "./pages/dropdown-menu-page";
import { FormPage } from "./pages/form-page";
import { HoverCardPage } from "./pages/hover-card-page";
import { InputPage } from "./pages/input-page";
import { InputOTPPage } from "./pages/input-otp-page";
import { LabelPage } from "./pages/label-page";
import { MenubarPage } from "./pages/menubar-page";
import { PaginationPage } from "./pages/pagination-page";
import { PopoverPage } from "./pages/popover-page";
import { ProgressPage } from "./pages/progress-page";
import { RadioGroupPage } from "./pages/radio-group-page";
import { ScrollAreaPage } from "./pages/scroll-area-page";
import { SelectPage } from "./pages/select-page";
import { SeparatorPage } from "./pages/separator-page";
import { SheetPage } from "./pages/sheet-page";
import { SkeletonPage } from "./pages/skeleton-page";
import { SliderPage } from "./pages/slider-page";
import { SonnerPage } from "./pages/sonner-page";
import { SwitchPage } from "./pages/switch-page";
import { TabsPage } from "./pages/tabs-page";
import { TextareaPage } from "./pages/textarea-page";
import { TogglePage } from "./pages/toggle-page";
import { ToggleGroupPage } from "./pages/toggle-group-page";
import { TooltipPage } from "./pages/tooltip-page";
import { ResizablePage } from "./pages/resizable-page";
import { CollapsiblePage } from "./pages/collapsible-page";
import { ThemeProvider } from "./providers/theme-provider";
import MultiComboBoxPage from "./pages/multicombobox-page";
import DocumentationPage from "./layout/Documentation";
import { NavigationMenuPage } from "./pages/navigation-menu-page";
import GradientBlinds from "./ui/gradient-blinds";

// Mapeamento de componentes
const componentPages: Record<string, unknown> = {
  alert: AlertPage,
  "alert-dialog": AlertDialogPage,
  "aspect-ratio": AspectRatioPage,
  avatar: AvatarPage,
  badge: BadgePage,
  button: ButtonPage,
  calendar: CalendarPage,
  card: CardPage,
  checkbox: CheckboxPage,
  combobox: ComboboxPage,
  command: CommandPage,
  "context-menu": ContextMenuPage,
  "data-table": DataTablePage,
  "date-picker": DatePickerPage,
  dialog: DialogPage,
  drawer: DrawerPage,
  "dropdown-menu": DropdownMenuPage,
  form: FormPage,
  "hover-card": HoverCardPage,
  input: InputPage,
  "input-otp": InputOTPPage,
  label: LabelPage,
  menubar: MenubarPage,
  "navigation-menu": NavigationMenuPage,
  pagination: PaginationPage,
  popover: PopoverPage,
  progress: ProgressPage,
  "radio-group": RadioGroupPage,
  "scroll-area": ScrollAreaPage,
  select: SelectPage,
  separator: SeparatorPage,
  sheet: SheetPage,
  skeleton: SkeletonPage,
  slider: SliderPage,
  sonner: SonnerPage,
  switch: SwitchPage,
  tabs: TabsPage,
  textarea: TextareaPage,
  toggle: TogglePage,
  "toggle-group": ToggleGroupPage,
  tooltip: TooltipPage,
  resizable: ResizablePage,
  collapsible: CollapsiblePage,
  multicombo: MultiComboBoxPage,
};

function HomePage({ headerVisible = true }: { headerVisible?: boolean }) {
  const { colorScheme, actualTheme } = useTheme();
  const navigate = useNavigate();
  const [bgColors, setBgColors] = useState<string[]>([]);
  // search handled by FloatingSearch component

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rootStyle = getComputedStyle(document.documentElement);

    const parseVarOrHex = (raw: string) => {
      const s = raw.trim();
      if (!s) return "";
      if (s.startsWith("#")) return s;
      // Expect format: "H S% L%" (as set by ThemeProvider)
      const parts = s.split(/\s+/);
      if (parts.length < 3) return s;
      const h = parseFloat(parts[0]);
      const sat = parseFloat(parts[1].replace("%", ""));
      const light = parseFloat(parts[2].replace("%", ""));

      const hslToHex = (h: number, s: number, l: number) => {
        s /= 100;
        l /= 100;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      };

      return hslToHex(h, sat, light);
    };

    const primary = rootStyle.getPropertyValue("--primary") || "";
    const accent = rootStyle.getPropertyValue("--accent") || "";
    const secondary = rootStyle.getPropertyValue("--secondary") || "";

    const c1 = parseVarOrHex(primary) || "#5227FF";
    const c2 = parseVarOrHex(accent) || c1;
    const c3 = parseVarOrHex(secondary) || c2;

    // Prefer a two-color gradient; include a third if available
    const colors = [c1, c2];
    if (c3 && c3 !== c2) colors.push(c3);

    setBgColors(colors);
  }, [colorScheme, actualTheme]);

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Otimizada",
      description:
        "Componentes construídos com foco em performance e otimização de bundle.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Customização Total",
      description:
        "Sistema de design tokens e CSS variables para personalização completa.",
    },
    {
      icon: <Accessibility className="h-6 w-6" />,
      title: "Acessibilidade First",
      description:
        "Todos os componentes seguem padrões WCAG e são testados com screen readers.",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "TypeScript Nativo",
      description:
        "Tipagem completa e intellisense avançado para melhor experiência de desenvolvimento.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Animações Fluidas",
      description:
        "Micro-interações e animações cuidadosamente crafted com Framer Motion.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Testado e Confiável",
      description:
        "Cobertura de testes abrangente e utilizado em produção por milhares de desenvolvedores.",
    },
  ];

  const [stats, setStats] = useState([
    { label: "Componentes", value: "50+", icon: <Code2 className="h-4 w-4" /> },
    { label: "Downloads", value: "-", icon: <Download className="h-4 w-4" /> },
    { label: "GitHub Stars", value: "-", icon: <Star className="h-4 w-4" /> },
    {
      label: "Desenvolvedores",
      value: "-",
      icon: <Users className="h-4 w-4" />,
    },
  ]);

  useEffect(() => {
    async function fetchStats() {
      try {
        // GitHub repo info
        const repoRes = await fetch(
          "https://api.github.com/repos/glatztp/Glacien"
        );
        const repoData = await repoRes.json();
        // GitHub contributors
        const contribRes = await fetch(
          "https://api.github.com/repos/glatztp/Glacien/contributors"
        );
        const contribData = await contribRes.json();
        // NPM downloads
        const npmRes = await fetch(
          "https://api.npmjs.org/downloads/point/last-month/@glacien/ui"
        );
        const npmData = await npmRes.json();

        setStats([
          {
            label: "Componentes",
            value: "50+",
            icon: <Code2 className="h-4 w-4" />,
          },
          {
            label: "Downloads",
            value: npmData.downloads ? npmData.downloads.toLocaleString() : "-",
            icon: <Download className="h-4 w-4" />,
          },
          {
            label: "GitHub Stars",
            value: repoData.stargazers_count
              ? repoData.stargazers_count.toLocaleString()
              : "-",
            icon: <Star className="h-4 w-4" />,
          },
          {
            label: "Desenvolvedores",
            value: Array.isArray(contribData)
              ? contribData.length.toLocaleString()
              : "-",
            icon: <Users className="h-4 w-4" />,
          },
        ]);
      } catch (err) {
        // fallback: mantém valores default
      }
    }
    fetchStats();
  }, []);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem("glacien_newsletter_subscribed"));
    } catch (e) {
      return false;
    }
  });
  const [subscribing, setSubscribing] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(
    null
  );
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterMessage("Por favor insira um e-mail válido.");
      return;
    }

    try {
      setSubscribing(true);
      setNewsletterMessage(null);
      await new Promise((r) => setTimeout(r, 600));

      try {
        localStorage.setItem("glacien_newsletter_subscribed", "1");
        localStorage.setItem("glacien_newsletter_email", email);
      } catch (err) {
        // ignore
      }

      setSubscribed(true);
      setNewsletterMessage("Inscrição confirmada! Obrigado por se inscrever.");
      // limpar mensagem depois de 4s
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = setTimeout(() => {
        setNewsletterMessage(null);
      }, 4000);
      setNewsletterEmail("");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence>
        {!headerVisible && (
          <motion.div
            key="floating-search"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed z-50 top-4 left-4"
          >
            <FloatingSearch
              items={Object.keys(componentPages).map((id) => ({
                id,
                label: id
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase()),
              }))}
              noFixed
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!headerVisible && (
        <div className="fixed z-50 top-4 right-6 w-12 flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary rounded-full blur-2xl animate-pulse delay-2000" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <GradientBlinds
            className="w-full h-full"
            gradientColors={bgColors}
            angle={45}
            noise={0}
            blindCount={15}
            blindMinWidth={1}
            spotlightRadius={0.65}
            spotlightSoftness={1}
            spotlightOpacity={0.85}
            mouseDampening={0.05}
            distortAmount={5}
            shineDirection="right"
            mixBlendMode="overlay"
          />
        </div>
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent ${
            actualTheme === "light"
              ? "via-background/10 to-background/30"
              : "via-background/30 to-background/60"
          }`}
        />
        <div className="relative w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-6xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="mb-6 sm:mb-8 lg:mb-12"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none flex items-center justify-center gap-6 mb-4">
                  <img
                    src={colorScheme === "violet" ? "/logo-p.png" : "/logo.png"}
                    alt="GlacienLogo"
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-28 mt-3 object-contain"
                  />
                  <span className="relative inline-block">
                    <span className="relative bg-primary bg-clip-text text-transparent drop-shadow-2xl">
                      Glacien
                    </span>
                  </span>
                </h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  className="h-1 sm:h-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mx-auto mt-4 sm:mt-6 max-w-xs opacity-80"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 lg:mb-16 leading-relaxed max-w-4xl mx-auto px-4 font-medium"
              >
                A biblioteca de componentes React mais
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold mx-2">
                  avançada
                </span>
                e
                <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent font-bold mx-2">
                  elegante
                </span>
                do mercado. Transforme suas ideias em interfaces que
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent font-bold ml-2">
                  impressionam
                </span>
                .
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center max-w-3xl mx-auto"
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden w-full sm:w-auto px-6 py-3 text-base font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary border-0"
                  onClick={() => navigate("/components")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Rocket className="h-4 w-4 sm:h-5 sm:w-5 mr-2 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  <span className="relative z-10">Descobrir Agora</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/50 to-secondary/50 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group relative w-full sm:w-auto px-6 py-3 text-base font-bold border-2 border-primary/30 hover:border-primary/60 bg-background/80 backdrop-blur-md hover:bg-primary/5 transition-all duration-500 shadow-xl hover:shadow-2xl"
                  onClick={() =>
                    window.open("https://github.com/glatztp/Glacien", "_blank")
                  }
                >
                  <Github className="h-5 w-5 sm:h-6 sm:w-6 mr-3 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                    Código Aberto
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="group relative w-full sm:w-auto px-8 py-4 text-lg font-bold hover:bg-primary/10 transition-all duration-500 shadow-lg hover:shadow-xl"
                  onClick={() => navigate("/docs")}
                >
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 mr-3 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                  <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                    Documentação
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 border-y-2 border-primary/10 bg-gradient-to-r from-background via-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative bg-background/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl group-hover:shadow-2xl border border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 transition-all duration-500">
                    <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary">
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-muted-foreground font-bold tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div
            className="mt-32 w-screen left-0 right-0 relative px-0"
            style={{ marginLeft: "calc(-50vw + 50%)" }}
          >
            <LogoLoop
              logos={[
                {
                  node: (
                    <img
                      src={
                        colorScheme === "violet"
                          ? "/logo-p-nobg.png"
                          : "/logo-nobg.png"
                      }
                      alt="Logo Glacien"
                      style={{ height: 80 }}
                    />
                  ),
                },
                { node: <SiReact className="text-primary" title="React" /> },
                {
                  node: (
                    <SiTypescript className="text-primary" title="TypeScript" />
                  ),
                },
                {
                  node: (
                    <SiTailwindcss className="text-primary" title="Tailwind" />
                  ),
                },
                { node: <SiNpm className="text-primary" title="NPM" /> },
                { node: <SiVercel className="text-primary" title="Vercel" /> },
                { node: <SiGithub className="text-primary" title="GitHub" /> },
                { node: <SiVite className="text-primary" title="Vitest" /> },
              ]}
              speed={40}
              direction="left"
              logoHeight={80}
              gap={40}
              scaleOnHover={true}
              ariaLabel="Tecnologias utilizadas"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="relative py-20 sm:py-28 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20 lg:mb-28"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                Por que escolher o
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                Glacien?
              </span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mx-auto mb-8 max-w-lg"
            />
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 font-medium">
              Cada componente foi
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold mx-3">
                meticulosamente pensados
              </span>
              pensando na experiência do desenvolvedor e na
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent font-bold ml-3">
                satisfação do usuário final
              </span>
              .
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <Card className="relative h-full group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-700 border-2 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <CardContent className="relative p-8 sm:p-10 h-full flex flex-col">
                      <div className="flex items-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-lg scale-110 opacity-0 group-hover:opacity-50 transition-all duration-700" />
                          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-xl shadow-primary/20">
                            {feature.icon}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 group-hover:text-primary transition-colors duration-500 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base sm:text-lg flex-grow">
                        {feature.description}
                      </p>

                      {/* Hover effect line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-6 group-hover:h-2 transition-all duration-500"
                      />
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Code Example Section */}
      <section className="relative py-20 sm:py-28 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/15 via-transparent to-transparent" />

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20 lg:mb-28"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Simples de usar,
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                poderoso de customizar
              </span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-2 bg-gradient-to-r from-secondary via-primary to-secondary rounded-full mx-auto mb-8 max-w-2xl"
            />
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 font-medium">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
                Instale, importe e comece a usar
              </span>
              . É realmente simples assim.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto perspective-1000"
          >
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-xl scale-105 opacity-20 group-hover:opacity-40 transition-all duration-1000" />

              <div className="relative bg-background/95 backdrop-blur-xl border-2 border-primary/20 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 group-hover:shadow-primary/20 transition-all duration-700">
                {/* Enhanced header */}
                <div className="bg-gradient-to-r from-muted via-primary/10 to-muted px-6 sm:px-8 py-4 sm:py-6 border-b-2 border-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
                  <div className="relative flex items-center gap-4 sm:gap-6">
                    <div className="flex gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg animate-pulse"></div>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg animate-pulse delay-100"></div>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg animate-pulse delay-200"></div>
                    </div>
                    <span className="ml-4 text-sm sm:text-base font-mono font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      App.tsx • GlacienMagic ✨
                    </span>
                  </div>
                </div>

                {/* Enhanced code content */}
                <div className="relative p-6 sm:p-8 lg:p-12 overflow-x-auto bg-gradient-to-br from-background/50 to-primary/5">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <pre className="relative text-sm sm:text-base lg:text-lg text-foreground font-mono leading-relaxed">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1.5 }}
                      viewport={{ once: true }}
                    >
                      {`import { Button, Card, Toast, Avatar } from '@Glacien/components'

export function App() {
  return (
    <Card className="p-8 max-w-md mx-auto shadow-2xl">
      <div className="text-center space-y-6">
        <Avatar
          size="xl"
          src="https://github.com/glatztp.png"
          animation="glow"
          badge={<Crown className="h-4 w-4" />}
          badgeColor="yellow"
        />
        
        <h1 className="text-3xl font-bold bg-gradient-to-r 
                       from-primary to-secondary bg-clip-text 
                       text-transparent">
          Bem-vindo ao Glacien
        </h1>
        
        <Button 
          size="lg"
          className="w-full" 
          onClick={() => toast.success("🎉 Incrível!")}>
          Experiência Mágica
        </Button>
      </div>
    </Card>
  )
}`}
                    </motion.div>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Epic CTA Section */}
      <section className="relative py-20 sm:py-28 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />

        {/* Animated particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-secondary rounded-full animate-ping delay-1000" />
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-primary rounded-full animate-ping delay-2000" />
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-secondary rounded-full animate-ping delay-500" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black mb-8 sm:mb-12 lg:mb-16 leading-none">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Pronto para
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                revolucionar
              </span>
              <br />
              <span className="bg-gradient-to-r from-secondary to-foreground bg-clip-text text-transparent">
                seu desenvolvimento?
              </span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-3 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mx-auto mb-12 max-w-3xl"
            />

            <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground mb-12 sm:mb-16 lg:mb-20 leading-relaxed max-w-4xl mx-auto px-4 font-medium">
              Junte-se a
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-black mx-3">
                milhares de desenvolvedores
              </span>
              que já estão criando interfaces
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent font-black mx-3">
                extraordinárias
              </span>
              com o Glacien.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 justify-center max-w-2xl mx-auto">
              <Button
                size="lg"
                className="group relative overflow-hidden w-full sm:w-auto px-12 py-6 text-xl font-black shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-700 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary border-0 transform hover:scale-105"
                onClick={() =>
                  window.open(
                    "https://www.npmjs.com/package/@glacien/ui",
                    "_blank"
                  )
                }
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Rocket className="h-6 w-6 sm:h-7 sm:w-7 mr-4 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-500" />
                <span className="relative z-10">Instalar Agora</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/50 to-secondary/50 blur-2xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group relative w-full sm:w-auto px-12 py-6 text-xl font-black border-3 border-primary/40 hover:border-primary/70 bg-background/90 backdrop-blur-md hover:bg-primary/10 transition-all duration-700 shadow-xl hover:shadow-2xl transform hover:scale-105"
                onClick={() => navigate("/components")}
              >
                <Globe className="h-6 w-6 sm:h-7 sm:w-7 mr-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-500">
                  Ver Exemplos
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/*Footer*/}
      <footer className="relative border-t border-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="mb-4">
                <h3 className="font-extrabold text-2xl sm:text-3xl mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Glacien
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4" />
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm font-medium mb-4">
                Componentes React modernos e acessíveis para construir
                interfaces
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold ml-1">
                  incríveis
                </span>
                .
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  aria-label="GitHub"
                  onClick={() =>
                    window.open("https://github.com/glatztp/Glacien", "_blank")
                  }
                  className="inline-flex items-center justify-center p-2 rounded-md bg-background/60 hover:bg-primary/5 border border-border/20 transition focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <Github className="h-5 w-5 text-primary" />
                </button>

                <button
                  aria-label="Comunidade"
                  onClick={() => window.open("#", "_self")}
                  className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md bg-background/60 hover:bg-primary/5 border border-border/20 transition text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="hidden sm:inline">Comunidade</span>
                  {subscribed && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-md border-2 border-white"
                      aria-hidden={!subscribed}
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="mt-6 w-full max-w-sm"
                aria-label="Inscreva-se na newsletter"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Seu e-mail
                </label>
                <div className="flex items-center bg-background/60 rounded-lg border border-border/20 overflow-hidden">
                  <input
                    id="newsletter-email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                    placeholder="Seu e-mail"
                    type="email"
                    aria-label="email"
                  />
                  <Button
                    size="sm"
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-none shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {subscribing
                      ? "Enviando..."
                      : subscribed
                        ? "Inscrito"
                        : "Inscrever"}
                  </Button>
                </div>
                <div className="mt-2">
                  <AnimatePresence>
                    {newsletterMessage && (
                      <motion.div
                        key="newsletter-msg"
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.32, ease: "easeOut" }}
                        className={`inline-flex items-center gap-3 px-3 py-2 rounded-md shadow-sm border ${
                          subscribed
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-rose-50 border-rose-200"
                        } text-sm`}
                        aria-live="polite"
                      >
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white shadow text-emerald-600">
                          {subscribed ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="w-4 h-4"
                            >
                              <path
                                d="M20 6L9 17l-5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="w-4 h-4 text-rose-600"
                            >
                              <path
                                d="M6 18L18 6M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={
                            subscribed ? "text-emerald-700" : "text-rose-600"
                          }
                        >
                          {newsletterMessage}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Receba novidades e lançamentos — sem spam.
                </p>
              </form>
            </motion.div>

            {[
              {
                title: "Recursos",
                items: [
                  { name: "Documentação", action: () => navigate("/docs") },
                  {
                    name: "Componentes",
                    action: () => navigate("/components"),
                  },
                  { name: "Exemplos", action: () => navigate("/components") },
                  { name: "Temas", action: () => navigate("/themes") },
                ],
              },
              {
                title: "Comunidade",
                items: [
                  {
                    name: "GitHub",
                    action: () =>
                      window.open(
                        "https://github.com/glatztp/Glacien",
                        "_blank"
                      ),
                  },
                  { name: "Discord", action: () => {} },
                ],
              },
              {
                title: "Suporte",
                items: [
                  { name: "FAQ", action: () => {} },
                  { name: "Issues", action: () => {} },
                  { name: "Contribuir", action: () => {} },
                ],
              },
            ].map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.08, duration: 0.6 }}
                viewport={{ once: true }}
                className="pt-2"
              >
                <h4 className="font-black text-lg sm:text-xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
                  {section.title}
                </h4>
                <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                  {section.items.map((item, itemIndex) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: sectionIndex * 0.08 + itemIndex * 0.04,
                        duration: 0.36,
                      }}
                      viewport={{ once: true }}
                    >
                      <a
                        href="#"
                        className="flex items-center gap-3 hover:text-primary transition-colors duration-200 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          item.action();
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-background/60 border border-border/20 text-primary">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                          </svg>
                        </span>
                        <span className="truncate">{item.name}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 pt-6 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-primary rounded-full" />
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Glacien. Todos os direitos
                reservados.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition"
                onClick={(e) => e.preventDefault()}
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition"
                onClick={(e) => e.preventDefault()}
              >
                Termos
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [expandCategory, setExpandCategory] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const currentSection = location.pathname.split("/")[1] || "home";
  useEffect(() => {
    // Ensure there's no header on the Home page and header is enabled on other pages.
    if (currentSection === "home") {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
  }, [currentSection]);
  useEffect(() => {
    if (currentSection === "components") {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [currentSection]);
  const selectedComponent = location.pathname.split("/")[2] || "";

  const handleNavigation = (section: string, componentId?: string) => {
    if (componentId && section === "components") {
      // Navegar diretamente para a página do componente
      navigate(`/components/${componentId}`);
    } else {
      navigate(`/${section}`);
    }

    if (section === "components") {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  };

  const handleComponentSelect = (componentId: string) => {
    navigate(`/components/${componentId}`);
  };

  const handleCategoryExpand = (categoryId: string) => {
    setExpandCategory(categoryId);
  };

  const toggleSidebar = () => {
    if (currentSection === "components") {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const sidebarContextValue: SidebarContextType = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      <div className="min-h-screen bg-background">
        {/* headerVisible lifted to control FloatingSearch visibility */}
        {/* headerVisible controlled by NavigationHeader via onVisibilityChange */}
        {currentSection !== "home" && (
          <NavigationHeader
            onNavigate={handleNavigation}
            currentSection={currentSection}
            onToggleSidebar={toggleSidebar}
            onVisibilityChange={(v) => setHeaderVisible(v)}
          />
        )}

        {/* Sidebar só aparece na seção de componentes */}
        {currentSection === "components" && (
          <ComponentsSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onSelectComponent={handleComponentSelect}
            selectedComponent={selectedComponent}
            expandCategory={expandCategory}
            onToggle={toggleSidebar}
          />
        )}

        <div
          className={`transition-all duration-300 ${
            sidebarOpen && currentSection === "components" ? "lg:ml-72" : ""
          }`}
        >
          <main className="min-h-[calc(100vh-4rem)] overflow-auto">
            <Routes>
              <Route
                path="/"
                element={<HomePage headerVisible={headerVisible} />}
              />
              <Route
                path="/home"
                element={<HomePage headerVisible={headerVisible} />}
              />
              <Route path="/docs" element={<DocumentationPage />} />
              <Route path="/themes" element={<ThemesPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route
                path="/components"
                element={
                  <ComponentsOverview onCategoryExpand={handleCategoryExpand} />
                }
              />
              <Route
                path="/components/:componentId"
                element={<ComponentPage />}
              />
            </Routes>
          </main>
        </div>
        <ScrollUp />
      </div>
    </SidebarContext.Provider>
  );
}

function ComponentsOverview({
  onCategoryExpand,
}: {
  onCategoryExpand?: (categoryId: string) => void;
}) {
  const navigate = useNavigate();

  const categoryData: Record<
    string,
    { componentId: string; categoryId: string }
  > = {
    Formulários: { componentId: "button", categoryId: "forms" },
    Navegação: { componentId: "navigation-menu", categoryId: "navigation" },
    Layout: { componentId: "card", categoryId: "layout" },
    Feedback: { componentId: "alert", categoryId: "feedback" },
    Overlays: { componentId: "dialog", categoryId: "overlays" },
    Dados: { componentId: "avatar", categoryId: "data" },
  };

  const handleExplore = (categoryTitle: string) => {
    const data = categoryData[categoryTitle];
    if (data) {
      if (onCategoryExpand) {
        onCategoryExpand(data.categoryId);
      }
      navigate(`/components/${data.componentId}`);
    }
  };
  return (
    <div className="p-6 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">
              Biblioteca de Componentes
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Componentes React modernos e acessíveis para suas aplicações
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Formulários",
              icon: <Zap className="h-6 w-6 text-primary" />,
              count: 11,
              desc: "Inputs, validação e controles",
            },
            {
              title: "Navegação",
              icon: <Globe className="h-6 w-6 text-primary" />,
              count: 4,
              desc: "Menus e navegação",
            },
            {
              title: "Layout",
              icon: <Code2 className="h-6 w-6 text-primary" />,
              count: 7,
              desc: "Estrutura e organização",
            },
            {
              title: "Feedback",
              icon: <Shield className="h-6 w-6 text-primary" />,
              count: 5,
              desc: "Notificações e alertas",
            },
            {
              title: "Overlays",
              icon: <Sparkles className="h-6 w-6 text-primary" />,
              count: 9,
              desc: "Modais e popovers",
            },
            {
              title: "Dados",
              icon: <Users className="h-6 w-6 text-primary" />,
              count: 3,
              desc: "Exibição de dados",
            },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.06 }}
            >
              <Card
                className="h-full rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-border/30 bg-background/70 backdrop-blur-sm cursor-pointer"
                onClick={() => handleExplore(category.title)}
              >
                <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md ring-1 ring-primary/10">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                        {category.icon}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 max-w-xs">
                          {category.desc}
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-1 rounded-full"
                        >
                          {category.count} componentes
                        </Badge>
                      </div>

                      <div className="ml-auto flex items-center text-muted-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="w-5 h-5 opacity-70"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            👈 Use a sidebar para explorar todos os componentes ou clique em um
            cartão para ir direto ao exemplo.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function ComponentPage() {
  const location = useLocation();
  const componentId = location.pathname.split("/")[2];

  const ComponentPageComponent = componentPages[componentId] as
    | React.ComponentType<unknown>
    | undefined;

  if (!ComponentPageComponent) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Componente não encontrado</h1>
          <p className="text-muted-foreground">
            O componente "{componentId}" não foi encontrado.
          </p>
        </div>
      </div>
    );
  }

  return <ComponentPageComponent />;
}

export default function ProfessionalDashboard() {
  return (
    <ThemeProvider>
      <Router>
        <DashboardContent />
      </Router>
    </ThemeProvider>
  );
}
