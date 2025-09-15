import React, { forwardRef } from "react";
import { cn } from "../../../lib/utils";

/**
 * AspectRatio
 *
 * Component that preserves a content aspect ratio.
 * - Uses native CSS `aspect-ratio` when available for best performance.
 * - Falls back to the padding-top technique for older browsers and SSR.
 * - `ratio` accepts numbers (e.g. 16/9) or strings like "16/9" or "1.5".
 * - `rounded` adds border-radius: `true` -> 8px, number -> pixels, string -> raw CSS value.
 *
 * Example:
 * <AspectRatio ratio="16/9" rounded>
 *   <img src="..." className="w-full h-full object-cover" />
 * </AspectRatio>
 */

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number | string;
  rounded?: boolean | number | string;
}

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    { ratio = "1/1", rounded = false, children, className, style, ...rest },
    ref
  ) => {
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

    const radiusValue =
      rounded === true
        ? "8px"
        : typeof rounded === "number"
          ? `${rounded}px`
          : typeof rounded === "string"
            ? rounded
            : undefined;

    const supportsAspectRatio = (() => {
      try {
        if (typeof CSS === "undefined" || typeof CSS.supports !== "function")
          return false;
        return CSS.supports("aspect-ratio", "1/1");
      } catch {
        return false;
      }
    })();

    if (supportsAspectRatio) {
      return (
        <div
          ref={ref}
          className={cn(className)}
          style={{
            aspectRatio:
              typeof ratio === "number" ? String(ratio) : String(ratio),
            display: "block",
            borderRadius: radiusValue,
            overflow: "hidden",
            ...style,
          }}
          {...rest}
        >
          {children}
        </div>
      );
    }

    const paddingTop = `${100 / ratioNum}%`;

    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{ position: "relative", width: "100%", paddingTop, ...style }}
        {...rest}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: radiusValue,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
