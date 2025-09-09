/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme =
  | "light"
  | "dark"
  | "system"
  | "simple"
  | "neon"
  | "sunset"
  | "ocean"
  | "coffee"
  | "galaxy";
type ColorScheme =
  | "blue"
  | "emerald"
  | "violet"
  | "rose"
  | "orange"
  | "cyan"
  | "premium";

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  actualTheme:
    | "light"
    | "dark"
    | "simple"
    | "neon"
    | "sunset"
    | "ocean"
    | "coffee"
    | "galaxy";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("Glacien-theme") as Theme) || "system";
    }
    return "system";
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("Glacien-color-scheme") as ColorScheme) || "blue"
      );
    }
    return "blue";
  });

  const [actualTheme, setActualTheme] = useState<
    | "light"
    | "dark"
    | "simple"
    | "neon"
    | "sunset"
    | "ocean"
    | "coffee"
    | "galaxy"
  >("light");

  const getThemeColors = (
    themeType:
      | "light"
      | "dark"
      | "simple"
      | "neon"
      | "sunset"
      | "ocean"
      | "coffee"
      | "galaxy"
  ) => {
    const themes = {
      light: {
        background: "0 0% 99%",
        foreground: "240 15% 9%",
        primary: "217 91% 60%",
        "primary-foreground": "0 0% 100%",
        secondary: "220 14% 96%",
        "secondary-foreground": "240 15% 9%",
        muted: "220 14% 96%",
        "muted-foreground": "240 10% 45%",
        accent: "217 91% 95%",
        "accent-foreground": "240 15% 9%",
        border: "220 13% 91%",
        input: "220 13% 91%",
        ring: "217 91% 60%",
        card: "0 0% 100%",
        "card-foreground": "240 15% 9%",
        popover: "0 0% 100%",
        "popover-foreground": "240 15% 9%",
        destructive: "0 84% 60%",
        "destructive-foreground": "210 40% 98%",
      },
      dark: {
        background: "240 15% 6%",
        foreground: "0 0% 95%",
        primary: "217 91% 65%",
        "primary-foreground": "0 0% 100%",
        secondary: "240 15% 12%",
        "secondary-foreground": "0 0% 95%",
        muted: "240 15% 12%",
        "muted-foreground": "240 10% 60%",
        accent: "240 15% 12%",
        "accent-foreground": "0 0% 95%",
        border: "240 15% 18%",
        input: "240 15% 18%",
        ring: "217 91% 65%",
        card: "240 15% 8%",
        "card-foreground": "0 0% 95%",
        popover: "240 15% 8%",
        "popover-foreground": "0 0% 95%",
        destructive: "0 84% 60%",
        "destructive-foreground": "210 40% 98%",
      },
      simple: {
        background: "0 0% 100%",
        foreground: "0 0% 0%",
        primary: "0 0% 0%",
        "primary-foreground": "0 0% 100%",
        secondary: "0 0% 100%",
        "secondary-foreground": "0 0% 0%",
        muted: "0 0% 96%",
        "muted-foreground": "0 0% 40%",
        accent: "0 0% 96%",
        "accent-foreground": "0 0% 0%",
        border: "0 0% 85%",
        input: "0 0% 85%",
        ring: "0 0% 0%",
        card: "0 0% 100%",
        "card-foreground": "0 0% 0%",
        popover: "0 0% 100%",
        "popover-foreground": "0 0% 0%",
        destructive: "0 84% 60%",
        "destructive-foreground": "0 0% 100%",
      },
      neon: {
        background: "240 15% 3%",
        foreground: "0 100% 100%",
        primary: "280 100% 70%",
        "primary-foreground": "0 0% 0%",
        secondary: "240 15% 8%",
        "secondary-foreground": "0 100% 100%",
        muted: "240 15% 8%",
        "muted-foreground": "280 50% 80%",
        accent: "320 100% 60%",
        "accent-foreground": "0 0% 0%",
        border: "280 100% 30%",
        input: "280 100% 30%",
        ring: "280 100% 70%",
        card: "240 15% 5%",
        "card-foreground": "0 100% 100%",
        popover: "240 15% 5%",
        "popover-foreground": "0 100% 100%",
        destructive: "0 100% 50%",
        "destructive-foreground": "0 0% 0%",
      },
      sunset: {
        background: "20 100% 98%",
        foreground: "20 20% 10%",
        primary: "15 100% 55%",
        "primary-foreground": "0 0% 100%",
        secondary: "20 100% 95%",
        "secondary-foreground": "20 20% 10%",
        muted: "20 100% 95%",
        "muted-foreground": "20 30% 40%",
        accent: "340 100% 85%",
        "accent-foreground": "20 20% 10%",
        border: "20 100% 85%",
        input: "20 100% 85%",
        ring: "15 100% 55%",
        card: "20 100% 99%",
        "card-foreground": "20 20% 10%",
        popover: "20 100% 99%",
        "popover-foreground": "20 20% 10%",
        destructive: "0 84% 60%",
        "destructive-foreground": "210 40% 98%",
      },
      ocean: {
        background: "200 100% 97%",
        foreground: "200 20% 10%",
        primary: "200 100% 45%",
        "primary-foreground": "0 0% 100%",
        secondary: "200 100% 95%",
        "secondary-foreground": "200 20% 10%",
        muted: "200 100% 95%",
        "muted-foreground": "200 30% 40%",
        accent: "180 100% 85%",
        "accent-foreground": "200 20% 10%",
        border: "200 100% 80%",
        input: "200 100% 80%",
        ring: "200 100% 45%",
        card: "200 100% 99%",
        "card-foreground": "200 20% 10%",
        popover: "200 100% 99%",
        "popover-foreground": "200 20% 10%",
        destructive: "0 84% 60%",
        "destructive-foreground": "210 40% 98%",
      },
      coffee: {
        background: "30 40% 98%",
        foreground: "30 20% 15%",
        primary: "25 75% 50%",
        "primary-foreground": "0 0% 100%",
        secondary: "30 40% 95%",
        "secondary-foreground": "30 20% 15%",
        muted: "30 40% 95%",
        "muted-foreground": "30 30% 35%",
        accent: "45 90% 85%",
        "accent-foreground": "30 20% 15%",
        border: "30 50% 85%",
        input: "30 50% 85%",
        ring: "25 75% 50%",
        card: "30 40% 99%",
        "card-foreground": "30 20% 15%",
        popover: "30 40% 99%",
        "popover-foreground": "30 20% 15%",
        destructive: "0 84% 60%",
        "destructive-foreground": "210 40% 98%",
      },
      galaxy: {
        background: "240 15% 4%",
        foreground: "0 0% 98%",
        primary: "260 100% 65%",
        "primary-foreground": "0 0% 100%",
        secondary: "240 15% 10%",
        "secondary-foreground": "0 0% 98%",
        muted: "240 15% 10%",
        "muted-foreground": "260 50% 70%",
        accent: "300 100% 75%",
        "accent-foreground": "0 0% 0%",
        border: "260 80% 25%",
        input: "260 80% 25%",
        ring: "260 100% 65%",
        card: "240 15% 6%",
        "card-foreground": "0 0% 98%",
        popover: "240 15% 6%",
        "popover-foreground": "0 0% 98%",
        destructive: "0 84% 60%",
        "destructive-foreground": "210 40% 98%",
      },
    };
    return themes[themeType];
  };

  // Definição das cores para cada colorScheme
  const colorSchemes: Record<
    ColorScheme,
    {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      primaryForeground: string;
      ring: string;
      accent: string;
      accentHover: string;
      accentForeground: string;
    }
  > = {
    blue: {
      // slightly darker primary to improve contrast (was 42% lightness)
      primary: "191 100% 36%",
      primaryHover: "191 100% 32%",
      primaryActive: "191 100% 28%",
      primaryForeground: "0 0% 100%",
      ring: "191 100% 42%",
      accent: "191 100% 95%",
      accentHover: "191 100% 90%",
      accentForeground: "191 100% 25%",
    },
    emerald: {
      primary: "151 91% 40%",
      primaryHover: "151 91% 35%",
      primaryActive: "151 91% 30%",
      primaryForeground: "0 0% 100%",
      ring: "151 91% 40%",
      accent: "151 91% 95%",
      accentHover: "151 91% 90%",
      accentForeground: "151 91% 25%",
    },
    violet: {
      primary: "262 91% 60%",
      primaryHover: "262 91% 55%",
      primaryActive: "262 91% 50%",
      primaryForeground: "0 0% 100%",
      ring: "262 91% 60%",
      accent: "262 91% 95%",
      accentHover: "262 91% 90%",
      accentForeground: "262 91% 25%",
    },
    rose: {
      primary: "340 91% 60%",
      primaryHover: "340 91% 55%",
      primaryActive: "340 91% 50%",
      primaryForeground: "0 0% 100%",
      ring: "340 91% 60%",
      accent: "340 91% 95%",
      accentHover: "340 91% 90%",
      accentForeground: "340 91% 25%",
    },
    orange: {
      primary: "24 91% 60%",
      primaryHover: "24 91% 55%",
      primaryActive: "24 91% 50%",
      primaryForeground: "0 0% 100%",
      ring: "24 91% 60%",
      accent: "24 91% 95%",
      accentHover: "24 91% 90%",
      accentForeground: "24 91% 25%",
    },
    cyan: {
      primary: "190 91% 60%",
      primaryHover: "190 91% 55%",
      primaryActive: "190 91% 50%",
      primaryForeground: "0 0% 100%",
      ring: "190 91% 60%",
      accent: "190 91% 95%",
      accentHover: "190 91% 90%",
      accentForeground: "190 91% 25%",
    },
    premium: {
      primary: "45 100% 51%", // dourado
      primaryHover: "45 100% 45%",
      primaryActive: "45 100% 40%",
      primaryForeground: "0 0% 100%",
      ring: "45 100% 51%",
      accent: "45 100% 90%",
      accentHover: "45 100% 80%",
      accentForeground: "45 100% 30%",
    },
  };

  const applyTheme = (
    resolvedTheme:
      | "light"
      | "dark"
      | "simple"
      | "neon"
      | "sunset"
      | "ocean"
      | "coffee"
      | "galaxy",
    scheme: ColorScheme
  ) => {
    const root = document.documentElement;
    root.classList.remove(
      "light",
      "dark",
      "simple",
      "neon",
      "sunset",
      "ocean",
      "coffee",
      "galaxy"
    );
    root.classList.add(resolvedTheme);

    const themeColors = getThemeColors(resolvedTheme);
    Object.entries(themeColors).forEach(([property, value]) => {
      root.style.setProperty(`--${property}`, value as string);
    });

    // Só sobrescreve as cores principais e variantes com base no colorScheme se o tema for light, dark ou simple
    if (
      resolvedTheme === "light" ||
      resolvedTheme === "dark" ||
      resolvedTheme === "simple"
    ) {
      // Para o tema simple, não aplicamos cores coloridas
      if (resolvedTheme === "simple") {
        // Simple usa apenas preto e branco, não precisa de colorScheme
        return;
      }

      const schemeColors = colorSchemes[scheme];
      root.style.setProperty("--primary", schemeColors.primary);
      root.style.setProperty("--ring", schemeColors.ring);
      root.style.setProperty("--accent", schemeColors.accent);
      root.style.setProperty(
        "--primary-foreground",
        schemeColors.primaryForeground
      );
      root.style.setProperty(
        "--accent-foreground",
        schemeColors.accentForeground
      );
      // Só sobrescreve hover/active se for tema claro
      if (resolvedTheme === "light") {
        root.style.setProperty("--primary-hover", schemeColors.primaryHover);
        root.style.setProperty("--primary-active", schemeColors.primaryActive);
        root.style.setProperty("--accent-hover", schemeColors.accentHover);
      }
    }
  };

  const resolveTheme = (
    themeValue: Theme
  ):
    | "light"
    | "dark"
    | "simple"
    | "neon"
    | "sunset"
    | "ocean"
    | "coffee"
    | "galaxy" => {
    if (themeValue === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return themeValue;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const resolved = resolveTheme(theme);
    setActualTheme(resolved);
    applyTheme(resolved, colorScheme);
    localStorage.setItem("Glacien-theme", theme);
    localStorage.setItem("Glacien-color-scheme", colorScheme);
  }, [theme, colorScheme]);

  const value = {
    theme,
    colorScheme,
    setTheme,
    setColorScheme,
    actualTheme,
  };

  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function useCurrentTheme() {
  const { actualTheme } = useTheme();
  return actualTheme;
}

export function useIsDarkMode() {
  const { actualTheme } = useTheme();
  return actualTheme === "dark";
}
