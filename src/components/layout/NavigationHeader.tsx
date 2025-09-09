/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui";
import { Badge } from "../ui";
import { ThemeToggle } from "../ui";
import { cn } from "../../lib/utils";
import {
  Menu,
  X,
  BookOpen,
  Palette,
  Github,
  ExternalLink,
  Component,
  Home,
} from "lucide-react";
import { useTheme } from "../providers/theme-provider";

interface NavigationHeaderProps {
  onNavigate: (id: string, componentId?: string) => void;
  currentSection: string;
  onToggleSidebar: () => void;
  onVisibilityChange?: (visible: boolean) => void;
}

export function NavigationHeader({
  onNavigate,
  currentSection,
  onToggleSidebar,
  onVisibilityChange,
}: NavigationHeaderProps) {
  const { colorScheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Show header only after the user starts scrolling
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Track last Y to detect upward scroll and show header immediately
    const lastY = { value: window.scrollY };
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.value;
        // If user scrolls up by more than 5px, show header immediately
        if (delta < -5) {
          setScrolled(true);
        } else {
          setScrolled(y > 10);
        }
        lastY.value = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once to set initial state
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Decide whether to hide header until scroll: only on Home page
  const hideUntilScroll = currentSection === "home";
  const visible = hideUntilScroll ? scrolled : true;

  // Notify parent about visibility changes
  React.useEffect(() => {
    if (onVisibilityChange) onVisibilityChange(visible);
  }, [visible, onVisibilityChange]);

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: "docs",
      label: "Docs",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "components",
      label: "Components",
      icon: <Component className="h-4 w-4" />,
      badge: "50+",
    },
    {
      id: "themes",
      label: "Themes",
      icon: <Palette className="h-4 w-4" />,
    },
  ];

  type NavigationItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    action?: () => void;
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.id === "components") {
      // Sempre navega para a página de componentes
      onNavigate(item.id);
      // Se já estiver na seção, toggle a sidebar
      if (currentSection === "components") {
        onToggleSidebar();
      }
    } else if (item.action) {
      item.action();
    } else {
      onNavigate(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Header */}
      <AnimatePresence>
        {visible && (
          <motion.header
            key="nav"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-lg shadow-sm"
          >
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2 lg:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center cursor-pointer pl-16 lg:pl-24 group"
                    onClick={() => onNavigate("home")}
                  >
                    <div className="flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={
                          colorScheme === "violet"
                            ? "/logo-p-nobg.png"
                            : "/logo-nobg.png"
                        }
                        alt="glacienUI Logo"
                        className="w-7 h-7 lg:w-9 lg:h-9 transition-all duration-300 hover:scale-110 relative z-10 drop-shadow-sm"
                        onMouseEnter={(e) =>
                          (e.currentTarget.src =
                            colorScheme === "violet"
                              ? "/logo-p.png"
                              : "/logo.png")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.src =
                            colorScheme === "violet"
                              ? "/logo-p-nobg.png"
                              : "/logo-nobg.png")
                        }
                      />
                      <div className="ml-3 lg:ml-4 hidden sm:block">
                        <h1
                          className="text-lg lg:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                          style={{
                            fontFamily:
                              "Bricolage Grotesque, Inter, sans-serif",
                            fontWeight: 800,
                          }}
                        >
                          Glacien
                        </h1>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Simplified Navigation */}
                <nav className="hidden md:flex items-center gap-1 bg-muted/30 backdrop-blur-sm rounded-full p-1 border border-border/50">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Button
                        variant={
                          currentSection === item.id ? "default" : "ghost"
                        }
                        size="sm"
                        onClick={() => handleItemClick(item)}
                        className={cn(
                          "relative transition-all duration-300 h-9 px-4 rounded-full font-medium",
                          currentSection === item.id
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                            : "hover:bg-accent/60 hover:text-accent-foreground text-muted-foreground hover:shadow-sm hover:scale-105"
                        )}
                      >
                        <motion.div
                          className="flex items-center gap-2"
                          whileHover={{ x: 1 }}
                        >
                          {item.icon}
                          <span className="text-sm">{item.label}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-xs ml-1 h-5 px-2 bg-background/80 text-foreground border border-border/40"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </motion.div>
                      </Button>
                    </motion.div>
                  ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:flex h-9 w-9 p-0 rounded-full hover:bg-accent/60 hover:shadow-sm transition-all duration-300 group"
                      onClick={() =>
                        window.open(
                          "https://github.com/glatztp/Glacien",
                          "_blank"
                        )
                      }
                      title="View on GitHub"
                    >
                      <Github className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    </Button>
                  </motion.div>

                  <div className="h-6 w-px bg-border/60 hidden md:block" />

                  <ThemeToggle />

                  {/* Mobile Menu Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="md:hidden h-9 w-9 p-0 rounded-full hover:bg-accent/60"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      <motion.div
                        animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {mobileMenuOpen ? (
                          <X className="h-5 w-5" />
                        ) : (
                          <Menu className="h-5 w-5" />
                        )}
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-lg sticky top-16 z-40 shadow-lg"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <nav className="space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={currentSection === item.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleItemClick(item)}
                      className="w-full justify-start gap-3 hover:bg-accent/60 hover:text-accent-foreground rounded-lg h-12 px-4 font-medium transition-all duration-300 hover:shadow-sm hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-3 w-full">
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="text-xs ml-auto bg-background/80 text-foreground border border-border/40"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}

                <div className="pt-4 border-t border-border/40 space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-3 hover:bg-accent/60 hover:text-accent-foreground rounded-lg h-12 px-4 group transition-all duration-300 hover:shadow-sm hover:scale-[1.02]"
                      onClick={() =>
                        window.open(
                          "https://github.com/glatztp/Glacien",
                          "_blank"
                        )
                      }
                    >
                      <Github className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />

                      <div className="text-left flex-1">
                        <div className="font-medium">GitHub</div>
                        <div className="text-xs text-muted-foreground">
                          Código fonte e issues
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </motion.div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
