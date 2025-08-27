import * as React from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Monitor,
  Lightning,
  Fire,
  Snowflake,
  Coffee,
  Planet,
} from "phosphor-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./overlays/dropdown-menu";
import { useTheme } from "../providers/theme-provider";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-block w-12">
          <Button
            variant="ghost"
            size="sm"
            className="relative flex items-center justify-center p-2 rounded-md transition-transform hover:scale-105 focus:outline-none"
            aria-label="Alternar tema"
            title="Alternar tema"
          >
            <span className="relative inline-block w-5 h-5">
              <motion.span
                initial={false}
                animate={
                  theme === "dark"
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 1, scale: 1 }
                }
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
                className="absolute inset-0 m-auto h-full w-full pointer-events-none"
                style={{ transformOrigin: "center center" }}
              >
                {/* Sun is visible when theme !== dark; we fade/scale icons instead of rotating to avoid overlap */}
                <motion.span
                  initial={false}
                  animate={
                    theme === "dark"
                      ? { opacity: 0, scale: 0.85 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.16 }}
                  className="block h-full w-full"
                  aria-hidden
                >
                  <Sun className="h-full w-full" />
                </motion.span>
              </motion.span>
              <motion.span
                initial={false}
                animate={
                  theme === "dark"
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.85 }
                }
                transition={{ duration: 0.16 }}
                className="absolute inset-0 m-auto h-full w-full pointer-events-none"
                style={{ transformOrigin: "center center" }}
                aria-hidden
              >
                <Moon className="h-full w-full" />
              </motion.span>
            </span>
            <span className="sr-only">Alternar tema</span>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 p-1 bg-background border border-border/30 rounded-xl shadow-lg"
      >
        <DropdownMenuLabel>Temas Básicos</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`flex items-center gap-3 rounded-md px-2 py-2 ${theme === "light" ? "bg-accent/10" : "hover:bg-accent/5"}`}
        >
          <span className="flex items-center justify-center rounded-md w-8 h-8 bg-yellow-50 text-yellow-600">
            <Sun className="h-4 w-4" />
          </span>
          <span
            className={`flex-1 ${theme === "light" ? "font-semibold" : ""}`}
          >
            Claro
          </span>
          {theme === "light" && (
            <span className="ml-auto text-xs text-foreground">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-3 rounded-md px-2 py-2 ${theme === "dark" ? "bg-accent/10" : "hover:bg-accent/5"}`}
        >
          <span className="flex items-center justify-center rounded-md w-8 h-8 bg-slate-800 text-slate-50">
            <Moon className="h-4 w-4" />
          </span>
          <span className={`flex-1 ${theme === "dark" ? "font-semibold" : ""}`}>
            Escuro
          </span>
          {theme === "dark" && (
            <span className="ml-auto text-xs text-foreground">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`flex items-center gap-3 rounded-md px-2 py-2 ${theme === "system" ? "bg-accent/10" : "hover:bg-accent/5"}`}
        >
          <span className="flex items-center justify-center rounded-md w-8 h-8 bg-muted/10 text-muted-foreground">
            <Monitor className="h-4 w-4" />
          </span>
          <span
            className={`flex-1 ${theme === "system" ? "font-semibold" : ""}`}
          >
            Sistema
          </span>
          {theme === "system" && (
            <span className="ml-auto text-xs text-foreground">✓</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Temas Especiais</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => setTheme("neon")}
          className={`flex items-center gap-3 rounded-md px-2 py-2 ${theme === "neon" ? "bg-accent/10" : "hover:bg-accent/5"}`}
        >
          <span className="flex items-center justify-center rounded-md w-8 h-8 bg-violet-50 text-violet-600">
            <Lightning className="h-4 w-4" />
          </span>
          <span className={`flex-1 ${theme === "neon" ? "font-semibold" : ""}`}>
            Neon Cyber
          </span>
          {theme === "neon" && (
            <span className="ml-auto text-xs text-foreground">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("sunset")}
          className={`flex items-center gap-3 rounded-md px-2 py-2 ${theme === "sunset" ? "bg-accent/10" : "hover:bg-accent/5"}`}
        >
          <span className="flex items-center justify-center rounded-md w-8 h-8 bg-amber-50 text-amber-600">
            <Fire className="h-4 w-4" />
          </span>
          <span
            className={`flex-1 ${theme === "sunset" ? "font-semibold" : ""}`}
          >
            Sunset Paradise
          </span>
          {theme === "sunset" && (
            <span className="ml-auto text-xs text-foreground">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("ocean")}
          className={`flex items-center gap-3 rounded-md px-2 py-2 ${theme === "ocean" ? "bg-accent/10" : "hover:bg-accent/5"}`}
        >
          <span className="flex items-center justify-center rounded-md w-8 h-8 bg-sky-50 text-sky-600">
            <Snowflake className="h-4 w-4" />
          </span>
          <span
            className={`flex-1 ${theme === "ocean" ? "font-semibold" : ""}`}
          >
            Ocean Deep
          </span>
          {theme === "ocean" && (
            <span className="ml-auto text-xs text-foreground">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("coffee")}
          className={`flex items-center gap-3 rounded-md px-2 py-2 ${theme === "coffee" ? "bg-accent/10" : "hover:bg-accent/5"}`}
        >
          <span className="flex items-center justify-center rounded-md w-8 h-8 bg-amber-100 text-rose-700">
            <Coffee className="h-4 w-4" />
          </span>
          <span
            className={`flex-1 ${theme === "coffee" ? "font-semibold" : ""}`}
          >
            Coffee House
          </span>
          {theme === "coffee" && (
            <span className="ml-auto text-xs text-foreground">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("galaxy")}
          className={`flex items-center gap-3 rounded-md px-2 py-2 ${theme === "galaxy" ? "bg-accent/10" : "hover:bg-accent/5"}`}
        >
          <span className="flex items-center justify-center rounded-md w-8 h-8 bg-indigo-50 text-indigo-600">
            <Planet className="h-4 w-4" />
          </span>
          <span
            className={`flex-1 ${theme === "galaxy" ? "font-semibold" : ""}`}
          >
            Galaxy Explorer
          </span>
          {theme === "galaxy" && (
            <span className="ml-auto text-xs text-foreground">✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
