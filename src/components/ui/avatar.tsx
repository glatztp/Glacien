import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { motion, type Variants } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Animações predefinidas para Avatar
const avatarAnimations: Record<string, Variants> = {
  default: {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  bounce: {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.1, 1.05],
      transition: { duration: 0.4, type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.9 },
  },
  pulse: {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.08, 1],
      transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
    },
    tap: { scale: 0.92 },
  },
  rotate: {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: 5, scale: 1.05, transition: { duration: 0.3 } },
    tap: { rotate: -5, scale: 0.95 },
  },
  glow: {
    initial: { scale: 1, boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px 5px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  },
  float: {
    initial: { y: 0, scale: 1 },
    hover: {
      y: [-2, 2, -2],
      scale: 1.03,
      transition: {
        y: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
        scale: { duration: 0.3 },
      },
    },
    tap: { y: 3, scale: 0.97 },
  },
};

// Variantes de tamanho usando CVA
const avatarVariants = cva("relative flex shrink-0 overflow-hidden", {
  variants: {
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      default: "h-10 w-10",
      md: "h-12 w-12",
      lg: "h-16 w-16",
      xl: "h-20 w-20",
      "2xl": "h-24 w-24",
      "3xl": "h-32 w-32",
      "4xl": "h-40 w-40",
    },
    variant: {
      default: "",
      bordered: "ring-2 ring-border",
      shadow: "shadow-lg",
      glow: "shadow-lg shadow-primary/25",
    },
    status: {
      none: "",
      online: "ring-2 ring-green-500",
      offline: "ring-2 ring-gray-400",
      busy: "ring-2 ring-red-500",
      away: "ring-2 ring-yellow-500",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
    status: "none",
  },
});

// Interface estendida para Avatar
export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  // Controla arredondamento: true = full, false = none, number|string = CSS value
  rounded?: boolean | number | string;
  // Props de animação
  animation?: keyof typeof avatarAnimations | "none";
  customAnimation?: Variants;
  animationDuration?: number;

  // Props de funcionalidade
  clickable?: boolean;
  tooltip?: string;
  badge?: React.ReactNode;
  badgePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  badgeColor?: "red" | "blue" | "green" | "yellow" | "purple" | "orange";
  badgeCount?: number;

  // Props de estilo avançado
  gradient?: boolean;
  borderColor?: string;
  statusDot?: boolean;
  statusColor?: string;

  // Props de comportamento
  lazy?: boolean;
  placeholder?: string;
  fallbackDelay?: number;

  // Callbacks
  onImageLoad?: () => void;
  onImageError?: () => void;
  onMotionHoverStart?: () => void;
  onMotionHoverEnd?: () => void;
  onMotionTapStart?: () => void;
  onMotionTapEnd?: () => void;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      size,
      variant,
      status,

      // Props de animação
      animation = "default",
      customAnimation,
      animationDuration = 0.3,

      // Props de funcionalidade
      clickable = false,
      tooltip,
      badge,
      badgePosition = "top-right",
      badgeColor = "red",
      badgeCount,

      // Props de estilo
      gradient = false,
      borderColor,
      statusDot = false,
      statusColor,
      rounded = true,

      onMotionHoverStart,
      onMotionHoverEnd,
      onMotionTapStart,
      onMotionTapEnd,

      ...props
    },
    ref
  ) => {
    // Nota: o fallback de imagem é tratado pelo AvatarPrimitive.Fallback
    // e pelo componente AvatarFallback (delayMs). Não precisamos gerenciar
    // timers aqui.

    // Classes dinâmicas
    const dynamicClasses = React.useMemo(() => {
      const classes: string[] = [];

      // Rounded classes handled via prop; default is rounded-full
      if (rounded === false) classes.push("rounded-none");
      else if (typeof rounded === "boolean") classes.push("rounded-full");

      if (gradient)
        classes.push("bg-gradient-to-br from-primary to-primary/70");
      if (borderColor) classes.push("ring-2");
      if (clickable) classes.push("cursor-pointer select-none");

      return classes.join(" ");
    }, [gradient, borderColor, clickable, rounded]);

    // Variantes de animação
    const animationVariants =
      customAnimation ||
      (animation !== "none" ? avatarAnimations[animation] : undefined);

    // Posicionamento do badge
    const badgePositionClasses = {
      "top-right": "-top-1 -right-1",
      "top-left": "-top-1 -left-1",
      "bottom-right": "-bottom-1 -right-1",
      "bottom-left": "-bottom-1 -left-1",
    };

    // Cores do badge
    const badgeColors = {
      red: "bg-red-500 text-white",
      blue: "bg-blue-500 text-white",
      green: "bg-green-500 text-white",
      yellow: "bg-yellow-500 text-white",
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white",
    };

    // Cores de status
    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-400",
      busy: "bg-red-500",
      away: "bg-yellow-500",
    };

    const radiusStyle: React.CSSProperties | undefined =
      typeof rounded === "number"
        ? { borderRadius: `${rounded}px` }
        : typeof rounded === "string"
          ? { borderRadius: rounded }
          : undefined;

    return (
      <motion.div
        className={cn(
          avatarVariants({ size, variant, status }),
          dynamicClasses,
          className
        )}
        style={{
          borderColor: borderColor,
          ...(borderColor && { borderWidth: 2, borderStyle: "solid" }),
          ...radiusStyle,
        }}
        variants={animationVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: animationDuration }}
        onHoverStart={onMotionHoverStart}
        onHoverEnd={onMotionHoverEnd}
        onTapStart={onMotionTapStart}
        onTap={onMotionTapEnd}
        title={tooltip}
      >
        <AvatarPrimitive.Root
          ref={ref}
          className="h-full w-full relative"
          {...props}
        >
          {/* Conteúdo do Avatar (Image/Fallback) será passado como children */}
          {props.children}

          {/* Badge */}
          {(badge || badgeCount) && (
            <div
              className={cn(
                "absolute flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-xs font-medium",
                badgePositionClasses[badgePosition],
                badgeColors[badgeColor]
              )}
              style={{ zIndex: 9999 }}
            >
              {badgeCount ? (badgeCount > 99 ? "99+" : badgeCount) : badge}
            </div>
          )}

          {/* Status Dot */}
          {statusDot && status !== "none" && (
            <div
              className={cn(
                "absolute -bottom-0 -right-0 h-3 w-3 rounded-full border-2 border-background",
                statusColors[status as keyof typeof statusColors] ||
                  statusColors.offline
              )}
              style={{ backgroundColor: statusColor || undefined }}
            />
          )}
        </AvatarPrimitive.Root>
      </motion.div>
    );
  }
);
Avatar.displayName = "Avatar";

// Interface estendida para AvatarImage
export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
}

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, lazy = false, onLoad, onError, ...props }, ref) => {
  const [isInView, setIsInView] = React.useState(!lazy);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Intersection Observer para lazy loading
  React.useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  return (
    <AvatarPrimitive.Image
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn("aspect-square h-full w-full object-cover", className)}
      onLoad={onLoad}
      onError={onError}
      {...(isInView ? props : { src: undefined })}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

// Interface estendida para AvatarFallback
export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  gradient?: boolean;
  textColor?: string;
  icon?: React.ReactNode;
  delayMs?: number;
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(
  (
    {
      className,
      gradient = false,
      textColor,
      icon,
      delayMs = 600,
      children,
      ...props
    },
    ref
  ) => {
    // Classes dinâmicas para fallback
    const fallbackClasses = React.useMemo(() => {
      const classes = [
        "flex h-full w-full items-center justify-center rounded-full",
      ];

      if (gradient) {
        classes.push("bg-gradient-to-br from-primary/20 to-primary/40");
      } else {
        classes.push("bg-muted");
      }

      if (textColor) {
        classes.push(`text-${textColor}`);
      }

      return classes.join(" ");
    }, [gradient, textColor]);

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(fallbackClasses, className)}
        delayMs={delayMs}
        {...props}
      >
        {icon || children}
      </AvatarPrimitive.Fallback>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

// Componente de Avatar Group para múltiplos avatars
export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  spacing?: "tight" | "normal" | "loose";
  size?: "xs" | "sm" | "default" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  showCount?: boolean;
  animation?: keyof typeof avatarAnimations | "none";
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      max = 5,
      spacing = "normal",
      size = "default",
      className,
      showCount = true,
      animation = "default",
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);
    const displayedChildren = childrenArray.slice(0, max);
    const remainingCount = Math.max(0, childrenArray.length - max);

    const spacingClasses = {
      tight: "-space-x-1",
      normal: "-space-x-2",
      loose: "-space-x-1",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingClasses[spacing], className)}
        {...props}
      >
        {displayedChildren.map((child, index) => (
          <div
            key={index}
            className="relative ring-2 ring-background rounded-full shadow-sm"
            style={{ zIndex: displayedChildren.length - index }}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child, {
                  size,
                  animation,
                  className: "ring-0", // Remove ring from individual avatars in group
                  ...child.props,
                })
              : child}
          </div>
        ))}

        {remainingCount > 0 && showCount && (
          <Avatar
            size={size}
            variant="bordered"
            animation={animation}
            className="bg-muted text-muted-foreground font-medium"
          >
            <AvatarFallback className="text-xs">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  avatarVariants,
  avatarAnimations,
};
