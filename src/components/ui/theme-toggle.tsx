/* eslint-disable no-undef */
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
  Check,
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
  const { setTheme, theme, colorScheme, setColorScheme } = useTheme();
  const [showColors, setShowColors] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<NodeJS.Timeout | null>(null);

  const scheduleClose = (ms = 180) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setShowColors(false);
      closeTimer.current = null;
    }, ms);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);  
      closeTimer.current = null;
    }
  };

  type ColorKey =
    | "blue"
    | "emerald"
    | "violet"
    | "rose"
    | "orange"
    | "cyan"
    | "premium";

  const colorOptions: { key: ColorKey; label: string; hsl: string }[] = [
    { key: "blue", label: "Blue", hsl: "191 100% 36%" },
    { key: "emerald", label: "Emerald", hsl: "151 91% 40%" },
    { key: "violet", label: "Violet", hsl: "262 91% 60%" },
    { key: "rose", label: "Rose", hsl: "340 91% 60%" },
    { key: "orange", label: "Orange", hsl: "24 91% 60%" },
    { key: "cyan", label: "Cyan", hsl: "190 91% 60%" },
    { key: "premium", label: "Premium", hsl: "45 100% 51%" },
  ];

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setShowColors(false);
      }}
    >
      <DropdownMenuTrigger asChild>
        <div className="inline-block w-12 relative">
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
            <span className="ml-auto text-foreground">
              <Check className="h-4 w-4" />
            </span>
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
            <span className="ml-auto text-foreground">
              <Check className="h-4 w-4" />
            </span>
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
            <span className="ml-auto text-foreground">
              <Check className="h-4 w-4" />
            </span>
          )}
        </DropdownMenuItem>

        <div className="relative">
          <DropdownMenuItem
            onMouseEnter={() => {
              cancelClose();
              setOpen(true);
              setShowColors(true);
            }}
            onMouseLeave={() => scheduleClose()}
            className={`flex items-center gap-3 rounded-md px-2  hover:bg-accent/5`}
          >
            <span className="flex items-center justify-center rounded-md w-8 h-8 bg-muted/10 text-muted-foreground">
              <span className="h-4 w-4" />
            </span>
            <span className="flex-1">Cores do tema</span>
            <span className="ml-auto text-xs text-foreground"></span>
          </DropdownMenuItem>

          {showColors && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.12 }}
              className="absolute right-full top-0 -translate-y-1/2 mr-3 w-44 p-2 rounded-xl bg-background border border-border/30 shadow-lg z-50"
              onMouseEnter={() => {
                cancelClose();
                setOpen(true);
                setShowColors(true);
              }}
              onMouseLeave={() => scheduleClose()}
            >
              <div className="text-xs font-medium mb-1 text-muted-foreground">
                Cores do tema
              </div>
              <div className="flex flex-col gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setColorScheme(opt.key)}
                    className={`flex items-center gap-3 rounded-md px-2 py-2 w-full text-sm text-left hover:bg-accent/5 ${colorScheme === opt.key ? "bg-accent/10 font-semibold" : ""}`}
                    aria-pressed={colorScheme === opt.key}
                  >
                    <span
                      className="w-8 h-8 rounded-md flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, hsl(${opt.hsl}), hsl(${opt.hsl} / 0.8))`,
                        boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.06)`,
                      }}
                    />
                    <span className="flex-1">{opt.label}</span>
                    {colorScheme === opt.key && (
                      <span className="text-xs"><Check /></span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

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
            <span className="ml-auto text-foreground">
              <Check className="h-4 w-4" />
            </span>
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
            <span className="ml-auto text-foreground">
              <Check className="h-4 w-4" />
            </span>
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
            <span className="ml-auto text-foreground">
              <Check className="h-4 w-4" />
            </span>
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
            <span className="ml-auto text-foreground">
              <Check className="h-4 w-4" />
            </span>
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
            <span className="ml-auto text-foreground">
              <Check className="h-4 w-4" />
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
