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
            className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center gap-2 lg:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center cursor-pointer pl-24 lg:pl-32"
                    onClick={() => onNavigate("home")}
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src={
                          colorScheme === "violet"
                            ? "/logo-p-nobg.png"
                            : "/logo-nobg.png"
                        }
                        alt="glacienUI Logo"
                        className="w-6 h-6 lg:w-8 lg:h-8 transition-all duration-300 hover:scale-105 "
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
                    </div>
                  </motion.div>
                </div>

                {/* Simplified Navigation */}
                <nav className="hidden md:flex items-center gap-2">
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
                          "relative transition-all duration-200 h-8 px-3",
                          currentSection === item.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                        )}
                      >
                        {item.icon}
                        <span className="ml-1.5 text-sm font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="text-xs ml-1.5 h-4 px-1"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex h-8 w-8 p-0"
                    onClick={() =>
                      window.open(
                        "https://github.com/glatztp/Glacien",
                        "_blank"
                      )
                    }
                    title="View on GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </Button>

                  <ThemeToggle />

                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
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
            className="md:hidden border-b bg-background/95 backdrop-blur-xl sticky top-16 z-40"
          >
            <div className="container mx-auto px-4 py-4">
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
                      className="w-full justify-start gap-3 hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </motion.div>
                ))}

                <div className="pt-2 border-t space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 hover:bg-accent hover:text-accent-foreground"
                    onClick={() =>
                      window.open(
                        "https://github.com/glatztp/Glacien",
                        "_blank"
                      )
                    }
                  >
                    <Github className="h-4 w-4" />

                    <div className="text-left">
                      <div className="font-medium">GitHub</div>
                      <div className="text-xs text-muted-foreground">
                        Código fonte e issues
                      </div>
                    </div>
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
