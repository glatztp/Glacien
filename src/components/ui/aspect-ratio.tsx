import React, { forwardRef, memo } from "react";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio as number (width/height) or string like "16/9" or "1/1" */
  ratio?: number | string;
  /** Rounded corners. true -> 8px, number -> pixels, string -> raw css value */
  rounded?: boolean | number | string;
}

/**
 * AspectRatio component
 * - Uses native CSS `aspect-ratio` when supported.
 * - Falls back to the classic padding-top technique for older browsers / SSR-safe.
 * - forwardRef + memo for performance
 * - Supports `rounded` prop to control border radius
 *
 * Example:
 * <AspectRatio ratio="16/9" rounded> <img .../> </AspectRatio>
 */
const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    { ratio = "1/1", rounded = false, children, style, className, ...rest },
    ref
  ) => {
    // parse ratio into numeric width/height
    const parseRatio = (r: number | string) => {
      if (typeof r === "number") return r;
      if (typeof r === "string") {
        const s = r.trim();
        if (s.includes("/")) {
          const [a, b] = s.split("/").map((v) => Number(v.trim()));
          if (!Number.isNaN(a) && !Number.isNaN(b) && b !== 0) return a / b;
        }
        const n = Number(s);
        if (!Number.isNaN(n) && n > 0) return n;
      }
      return 1;
    };

    const ratioNum = parseRatio(ratio);
    // rounded to CSS value
    const radiusValue = (() => {
      if (rounded === true) return "8px";
      if (typeof rounded === "number") return `${rounded}px`;
      if (typeof rounded === "string") return rounded;
      return undefined;
    })();

    // Feature detect for CSS.supports (browser only). For SSR this will be falsy.
    // Narrow the type safely for environments where `window` exists.
    const supportsAspectRatio = (() => {
      try {
        // `CSS` is a global in browsers. typeof check keeps this SSR-safe.
        if (typeof CSS === "undefined" || typeof CSS.supports !== "function")
          return false;
        return CSS.supports("aspect-ratio", "1/1");
      } catch {
        return false;
      }
    })();

    if (supportsAspectRatio) {
      // Use native aspect-ratio
      const nativeStyle: React.CSSProperties = {
        aspectRatio: typeof ratio === "number" ? String(ratio) : String(ratio),
        display: "block",
        borderRadius: radiusValue,
        overflow: "hidden",
        ...style,
      };

      return (
        <div ref={ref} className={className} style={nativeStyle} {...rest}>
          {children}
        </div>
      );
    }

    // Fallback: padding-top technique
    const paddingTop = `${100 / ratioNum}%`;

    const outerStyle: React.CSSProperties = {
      position: "relative",
      width: "100%",
      paddingTop,
      overflow: "visible",
      ...style,
    };

    const innerStyle: React.CSSProperties = {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: radiusValue,
      overflow: "hidden",
    };

    return (
      <div ref={ref} className={className} style={outerStyle} {...rest}>
        <div style={innerStyle}>{children}</div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

export default memo(AspectRatio);
