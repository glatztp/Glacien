/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui";
import { Badge } from "../ui";
import { ThemeToggle } from "../ui";
import { Input } from "../ui";
import { cn } from "../../lib/utils";
import {
  Menu,
  X,
  BookOpen,
  Palette,
  Github,
  ExternalLink,
  ChevronDown,
  Component,
  Search,
  Home,
} from "lucide-react";
import { useTheme } from "../providers/theme-provider";

interface NavigationHeaderProps {
  onNavigate: (id: string, componentId?: string) => void;
  currentSection: string;
  onToggleSidebar: () => void;
  onSelectComponent?: (componentId: string) => void;
  onVisibilityChange?: (visible: boolean) => void;
}

export function NavigationHeader({
  onNavigate,
  currentSection,
  onToggleSidebar,
  onSelectComponent,
  onVisibilityChange,
}: NavigationHeaderProps) {
  const { colorScheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close search
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (searchOpen && !target.closest("[data-search-container]")) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

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

  const allComponents = [
    // Forms
    {
      id: "button",
      label: "Button",
      category: "Forms",
      description: "Interactive button component",
      status: "stable",
    },
    {
      id: "input",
      label: "Input",
      category: "Forms",
      description: "Text input field",
      status: "stable",
    },
    {
      id: "textarea",
      label: "Textarea",
      category: "Forms",
      description: "Multi-line text input",
      status: "stable",
    },
    {
      id: "select",
      label: "Select",
      category: "Forms",
      description: "Dropdown selection",
      status: "stable",
    },
    {
      id: "checkbox",
      label: "Checkbox",
      category: "Forms",
      description: "Multiple selection input",
      status: "stable",
    },
    {
      id: "radio-group",
      label: "Radio Group",
      category: "Forms",
      description: "Single selection group",
      status: "stable",
    },
    {
      id: "switch",
      label: "Switch",
      category: "Forms",
      description: "Toggle switch",
      status: "stable",
    },
    {
      id: "slider",
      label: "Slider",
      category: "Forms",
      description: "Range slider input",
      status: "stable",
    },
    {
      id: "date-picker",
      label: "Date Picker",
      category: "Forms",
      description: "Date selection",
      status: "stable",
    },
    {
      id: "calendar",
      label: "Calendar",
      category: "Forms",
      description: "Calendar widget",
      status: "stable",
    },
    {
      id: "input-otp",
      label: "Input OTP",
      category: "Forms",
      description: "One-time password input",
      status: "beta",
    },
    {
      id: "form",
      label: "Form",
      category: "Forms",
      description: "Form validation wrapper",
      status: "stable",
    },
    {
      id: "label",
      label: "Label",
      category: "Forms",
      description: "Form field labels",
      status: "stable",
    },
    {
      id: "combobox",
      label: "Combobox",
      category: "Forms",
      description: "Searchable select",
      status: "stable",
    },
    {
      id: "multicombobox",
      label: "Multi Combobox",
      category: "Forms",
      description: "Multiple selection combobox",
      status: "beta",
    },
    {
      id: "command",
      label: "Command",
      category: "Forms",
      description: "Command palette",
      status: "stable",
    },

    // Layout & Display
    {
      id: "card",
      label: "Card",
      category: "Layout",
      description: "Content container",
      status: "stable",
    },
    {
      id: "separator",
      label: "Separator",
      category: "Layout",
      description: "Visual divider",
      status: "stable",
    },
    {
      id: "aspect-ratio",
      label: "Aspect Ratio",
      category: "Layout",
      description: "Maintain element proportions",
      status: "stable",
    },
    {
      id: "skeleton",
      label: "Skeleton",
      category: "Layout",
      description: "Loading placeholder",
      status: "stable",
    },
    {
      id: "avatar",
      label: "Avatar",
      category: "Layout",
      description: "User profile image",
      status: "stable",
    },
    {
      id: "badge",
      label: "Badge",
      category: "Layout",
      description: "Status indicator",
      status: "stable",
    },
    {
      id: "progress",
      label: "Progress",
      category: "Layout",
      description: "Progress indicator",
      status: "stable",
    },
    {
      id: "scroll-area",
      label: "Scroll Area",
      category: "Layout",
      description: "Custom scrollable area",
      status: "stable",
    },
    {
      id: "resizable",
      label: "Resizable",
      category: "Layout",
      description: "Resizable panels",
      status: "stable",
    },
    {
      id: "collapsible",
      label: "Collapsible",
      category: "Layout",
      description: "Collapsible content",
      status: "stable",
    },

    // Navigation
    {
      id: "tabs",
      label: "Tabs",
      category: "Navigation",
      description: "Tab navigation",
      status: "stable",
    },
    {
      id: "navigation-menu",
      label: "Navigation Menu",
      category: "Navigation",
      description: "Navigation menu with dropdowns",
      status: "stable",
    },
    {
      id: "menubar",
      label: "Menubar",
      category: "Navigation",
      description: "Application menu bar",
      status: "stable",
    },
    {
      id: "pagination",
      label: "Pagination",
      category: "Navigation",
      description: "Page navigation",
      status: "stable",
    },

    // Overlays & Feedback
    {
      id: "dialog",
      label: "Dialog",
      category: "Overlay",
      description: "Modal dialog",
      status: "stable",
    },
    {
      id: "alert-dialog",
      label: "Alert Dialog",
      category: "Overlay",
      description: "Confirmation dialog",
      status: "stable",
    },
    {
      id: "sheet",
      label: "Sheet",
      category: "Overlay",
      description: "Side panel",
      status: "stable",
    },
    {
      id: "drawer",
      label: "Drawer",
      category: "Overlay",
      description: "Sliding drawer",
      status: "beta",
    },
    {
      id: "popover",
      label: "Popover",
      category: "Overlay",
      description: "Floating content",
      status: "stable",
    },
    {
      id: "hover-card",
      label: "Hover Card",
      category: "Overlay",
      description: "Hover information card",
      status: "stable",
    },
    {
      id: "tooltip",
      label: "Tooltip",
      category: "Overlay",
      description: "Tooltip on hover",
      status: "stable",
    },
    {
      id: "context-menu",
      label: "Context Menu",
      category: "Overlay",
      description: "Right-click menu",
      status: "stable",
    },
    {
      id: "dropdown-menu",
      label: "Dropdown Menu",
      category: "Overlay",
      description: "Dropdown menu",
      status: "stable",
    },

    // Feedback
    {
      id: "alert",
      label: "Alert",
      category: "Feedback",
      description: "Alert notifications",
      status: "stable",
    },
    {
      id: "toast",
      label: "Toast",
      category: "Feedback",
      description: "Toast notifications",
      status: "stable",
    },
    {
      id: "sonner",
      label: "Sonner",
      category: "Feedback",
      description: "Advanced toast system",
      status: "stable",
    },

    // Interaction
    {
      id: "toggle",
      label: "Toggle",
      category: "Interaction",
      description: "Toggle button",
      status: "stable",
    },
    {
      id: "toggle-group",
      label: "Toggle Group",
      category: "Interaction",
      description: "Group of toggle buttons",
      status: "stable",
    },

    // Data
    {
      id: "data-table",
      label: "Data Table",
      category: "Data",
      description: "Advanced data table",
      status: "stable",
    },

    // Themes
    {
      id: "theme-toggle",
      label: "Theme Toggle",
      category: "Themes",
      description: "Dark/light mode toggle",
      status: "stable",
    },
  ];

  const filteredSearchItems = allComponents.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "text-green-600";
      case "beta":
        return "text-yellow-600";
      case "coming-soon":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

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

                  <div
                    className="hidden lg:block relative"
                    data-search-container
                  >
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="w-80 justify-start text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search components...
                        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                          <span className="text-xs">⌘</span>K
                        </kbd>
                      </Button>
                    </div>

                    <AnimatePresence>
                      {searchOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute top-full left-0 w-96 mt-2 bg-background border rounded-lg shadow-xl z-50 overflow-hidden"
                        >
                          <div className="p-3 border-b bg-muted/30">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search all components..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 border-0 bg-background/50 focus:bg-background"
                                autoFocus
                              />
                            </div>
                          </div>

                          <div className="max-h-80 overflow-y-auto">
                            {filteredSearchItems.length > 0 ? (
                              <>
                                <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/20">
                                  {filteredSearchItems.length} component
                                  {filteredSearchItems.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                  found
                                </div>
                                {filteredSearchItems.map((item, index) => (
                                  <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    onClick={() => {
                                      // Navegar diretamente para a página do componente
                                      onNavigate("components", item.id);
                                      onSelectComponent?.(item.id);
                                      setSearchOpen(false);
                                      setSearchQuery("");
                                    }}
                                    className="w-full flex items-start gap-3 p-3 text-left hover:bg-accent/50 transition-colors border-b border-border/30 last:border-0"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                          {item.label}
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className={cn(
                                            "text-xs",
                                            getStatusColor(item.status)
                                          )}
                                        >
                                          {item.status}
                                        </Badge>
                                      </div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        {item.description}
                                      </div>
                                      <div className="text-xs text-muted-foreground/70 mt-1">
                                        {item.category}
                                      </div>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground rotate-[-90deg]" />
                                  </motion.button>
                                ))}
                              </>
                            ) : searchQuery ? (
                              <div className="text-center text-muted-foreground py-8">
                                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <div className="font-medium">
                                  No components found
                                </div>
                                <div className="text-sm">
                                  Try adjusting your search terms
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-muted-foreground py-8">
                                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <div className="font-medium">
                                  Search our component library
                                </div>
                                <div className="text-sm">
                                  Type to find components by name, category, or
                                  description
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Floating search button when header is hidden */}
                    {!visible && (
                      <div
                        className="fixed top-3 left-3 z-60"
                        aria-hidden={visible}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2"
                          onClick={() => setSearchOpen(true)}
                          title="Search components"
                        >
                          <Search className="h-5 w-5" />
                        </Button>

                        <AnimatePresence>
                          {searchOpen && (
                            <motion.div
                              data-search-container
                              initial={{ opacity: 0, y: -8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.98 }}
                              transition={{ duration: 0.15 }}
                              className="mt-2 w-80 bg-background border rounded-lg shadow-xl overflow-hidden"
                            >
                              <div className="p-3 border-b bg-muted/30">
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Search all components..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                    className="pl-10 border-0 bg-background/50 focus:bg-background"
                                    autoFocus
                                  />
                                </div>
                              </div>

                              <div className="max-h-80 overflow-y-auto">
                                {filteredSearchItems.length > 0 ? (
                                  <>
                                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/20">
                                      {filteredSearchItems.length} component
                                      {filteredSearchItems.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                      found
                                    </div>
                                    {filteredSearchItems.map((item, index) => (
                                      <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.02 }}
                                        onClick={() => {
                                          onNavigate("components", item.id);
                                          onSelectComponent?.(item.id);
                                          setSearchOpen(false);
                                          setSearchQuery("");
                                        }}
                                        className="w-full flex items-start gap-3 p-3 text-left hover:bg-accent/50 transition-colors border-b border-border/30 last:border-0"
                                      >
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                              {item.label}
                                            </span>
                                            <Badge
                                              variant="outline"
                                              className={cn(
                                                "text-xs",
                                                getStatusColor(item.status)
                                              )}
                                            >
                                              {item.status}
                                            </Badge>
                                          </div>
                                          <div className="text-sm text-muted-foreground mt-1">
                                            {item.description}
                                          </div>
                                          <div className="text-xs text-muted-foreground/70 mt-1">
                                            {item.category}
                                          </div>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-muted-foreground rotate-[-90deg]" />
                                      </motion.button>
                                    ))}
                                  </>
                                ) : searchQuery ? (
                                  <div className="text-center text-muted-foreground py-8">
                                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <div className="font-medium">
                                      No components found
                                    </div>
                                    <div className="text-sm">
                                      Try adjusting your search terms
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-center text-muted-foreground py-8">
                                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <div className="font-medium">
                                      Search our component library
                                    </div>
                                    <div className="text-sm">
                                      Type to find components by name, category,
                                      or description
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
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
