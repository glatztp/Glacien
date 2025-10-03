/* eslint-disable no-undef */
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Monitor,
  Lightning,
  Fire,
  Snowflake,
  Coffee,
  Planet,
  Check,
  Circle,
} from "phosphor-react";
import { Button } from "./button";
import { useTheme } from "../providers/theme-provider";
import { cn } from "../../lib/utils";

const THEME_CONFIG = {
  light: {
    icon: Sun,
    label: "Claro",
    bgClass: "bg-yellow-50",
    iconClass: "text-yellow-600",
  },
  dark: {
    icon: Moon,
    label: "Escuro",
    bgClass: "bg-slate-100",
    iconClass: "text-slate-700",
  },
  system: {
    icon: Monitor,
    label: "Sistema",
    bgClass: "bg-muted/50",
    iconClass: "text-muted-foreground",
  },
  simple: {
    icon: Circle,
    label: "Simple",
    bgClass: "bg-white",
    iconClass: "text-black",
  },
  neon: {
    icon: Lightning,
    label: "Neon",
    bgClass: "bg-violet-50",
    iconClass: "text-violet-600",
  },
  sunset: {
    icon: Fire,
    label: "Sunset",
    bgClass: "bg-amber-50",
    iconClass: "text-amber-600",
  },
  ocean: {
    icon: Snowflake,
    label: "Ocean",
    bgClass: "bg-sky-50",
    iconClass: "text-sky-600",
  },
  coffee: {
    icon: Coffee,
    label: "Coffee",
    bgClass: "bg-amber-100",
    iconClass: "text-amber-700",
  },
  galaxy: {
    icon: Planet,
    label: "Galaxy",
    bgClass: "bg-indigo-50",
    iconClass: "text-indigo-600",
  },
} as const;

export function ThemeToggle() {
  const { setTheme, theme, colorScheme, setColorScheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const colorOptions = [
    { key: "blue" as const, label: "Azul", hsl: "191 100% 36%" },
    { key: "emerald" as const, label: "Esmeralda", hsl: "151 91% 40%" },
    { key: "violet" as const, label: "Violeta", hsl: "262 91% 60%" },
    { key: "rose" as const, label: "Rosa", hsl: "340 91% 60%" },
    { key: "orange" as const, label: "Laranja", hsl: "24 91% 60%" },
    { key: "cyan" as const, label: "Ciano", hsl: "190 91% 60%" },
    { key: "premium" as const, label: "Premium", hsl: "45 100% 51%" },
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest("[data-theme-toggle]")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Animated toggle icon
  const AnimatedIcon = () => {
    const isDarkMode =
      theme === "dark" || theme === "neon" || theme === "galaxy";
    const isSimple = theme === "simple";

    if (isSimple) {
      return (
        <div className="relative w-4 h-4">
          <Circle className="w-full h-full text-foreground" />
        </div>
      );
    }

    return (
      <div className="relative w-4 h-4">
        <motion.div
          initial={false}
          animate={{
            opacity: isDarkMode ? 0 : 1,
            scale: isDarkMode ? 0.5 : 1,
            rotate: isDarkMode ? 180 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Sun className="w-full h-full" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            opacity: isDarkMode ? 1 : 0,
            scale: isDarkMode ? 1 : 0.5,
            rotate: isDarkMode ? 0 : -180,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Moon className="w-full h-full" />
        </motion.div>
      </div>
    );
  };

  const handleThemeChange = (newTheme: Parameters<typeof setTheme>[0]) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" data-theme-toggle>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2.5 rounded-xl transition-all duration-200",
          "hover:scale-105 hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-primary/50",
          "active:scale-95",
          isOpen && "bg-accent/15"
        )}
        aria-label="Alternar tema"
        aria-expanded={isOpen}
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedIcon />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute right-0 top-full mt-2",
              "w-52 max-w-[90vw]", // Largura menor
              "max-h-[75vh] overflow-y-auto", // Altura menor
              "bg-background/95 backdrop-blur-lg border border-border/50",
              "rounded-xl shadow-xl shadow-black/10",
              "p-2", // Padding menor
              "z-50"
            )}
            style={{ zIndex: 9999 }}
          >
            {/* Basic Themes Section */}
            <div className="mb-2 sm:mb-3">
              <h3 className="text-xs font-medium text-foreground/80 px-1 mb-1.5">
                Temas Básicos
              </h3>
              <div className="space-y-0.5">
                {(["light", "dark", "simple", "system"] as const).map(
                  (themeKey) => {
                    const config = THEME_CONFIG[themeKey];
                    const isSelected = theme === themeKey;
                    const IconComponent = config.icon;

                    return (
                      <motion.button
                        key={themeKey}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleThemeChange(themeKey)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg",
                          "transition-all duration-200 text-left",
                          "hover:bg-accent/10 active:bg-accent/15",
                          isSelected && "bg-accent/15 ring-1 ring-primary/20"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-6 h-6 rounded-md transition-all",
                            "group-hover:shadow-sm",
                            config.bgClass,
                            config.iconClass
                          )}
                        >
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <span
                          className={cn(
                            "flex-1 font-medium transition-colors text-xs",
                            isSelected && "text-primary"
                          )}
                        >
                          {config.label}
                        </span>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="text-primary"
                            >
                              <Check className="w-3 h-3" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Color Schemes Section - Only for light/dark themes */}
            {(theme === "light" || theme === "dark") && (
              <div className="mb-2 sm:mb-3">
                <div className="h-px bg-border/50 mb-1.5" />
                <h3 className="text-xs font-medium text-foreground/80 px-1 mb-1.5">
                  Cores
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {colorOptions.map((color) => {
                    const isSelected = colorScheme === color.key;

                    return (
                      <motion.button
                        key={color.key}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setColorScheme(color.key)}
                        className={cn(
                          "flex items-center gap-1.5 px-2 py-1.5 rounded-md",
                          "transition-all duration-200 text-left text-xs",
                          "hover:bg-accent/10 active:bg-accent/15",
                          isSelected && "bg-accent/15 ring-1 ring-primary/20"
                        )}
                      >
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.2 }}
                          className="relative w-3 h-3 rounded-md flex-shrink-0 shadow-sm ring-1 ring-black/10"
                          style={{ backgroundColor: `hsl(${color.hsl})` }}
                        />
                        <span
                          className={cn(
                            "font-medium truncate transition-colors",
                            isSelected && "text-primary"
                          )}
                        >
                          {color.label}
                        </span>
                        {isSelected && (
                          <Check className="w-2.5 h-2.5 ml-auto text-primary flex-shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Themes Section */}
            <div>
              <div className="h-px bg-border/50 mb-1.5" />
              <h3 className="text-xs font-medium text-foreground/80 px-1 mb-1.5">
                Especiais
              </h3>
              <div className="space-y-0.5">
                {(["neon", "sunset", "ocean", "coffee", "galaxy"] as const).map(
                  (themeKey) => {
                    const config = THEME_CONFIG[themeKey];
                    const isSelected = theme === themeKey;
                    const IconComponent = config.icon;

                    return (
                      <motion.button
                        key={themeKey}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleThemeChange(themeKey)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg",
                          "transition-all duration-200 text-left",
                          "hover:bg-accent/10 active:bg-accent/15",
                          isSelected && "bg-accent/15 ring-1 ring-primary/20"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-6 h-6 rounded-md transition-all",
                            "group-hover:shadow-sm",
                            config.bgClass,
                            config.iconClass
                          )}
                        >
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span
                            className={cn(
                              "block font-medium transition-colors text-xs truncate",
                              isSelected && "text-primary"
                            )}
                          >
                            {config.label}
                          </span>
                        </div>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="text-primary flex-shrink-0"
                            >
                              <Check className="w-3 h-3" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Footer with current selection - Hidden on small screens to save space */}
            <div className="hidden sm:block mt-2 pt-2 border-t border-border/50">
              <div className="text-center text-xs text-muted-foreground">
                Atual:{" "}
                <span className="font-medium text-foreground">
                  {THEME_CONFIG[theme as keyof typeof THEME_CONFIG]?.label ||
                    theme}
                </span>
                {(theme === "light" || theme === "dark") && (
                  <span>
                    {" "}
                    • {colorOptions.find((c) => c.key === colorScheme)?.label}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
