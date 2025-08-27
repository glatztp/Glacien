import React, { useEffect, useRef } from "react";
import { useCurrentTheme } from "../providers/theme-provider";
import { Renderer, Program, Mesh, Triangle } from "ogl";

export interface GradientBlindsProps {
  className?: string;
  dpr?: number;
  paused?: boolean;
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  mouseDampening?: number;
  mirrorGradient?: boolean;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  distortAmount?: number;
  shineDirection?: "left" | "right";
  mixBlendMode?: string;
  interactive?: boolean;
}

const MAX_COLORS = 8;
const hexToRGB = (hex: string): [number, number, number] => {
  const c = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b];
};
const prepStops = (stops?: string[]) => {
  const base = (stops && stops.length ? stops : ["#FF9FFC", "#5227FF"]).slice(
    0,
    MAX_COLORS
  );
  if (base.length === 1) base.push(base[0]);
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);
  const arr: [number, number, number][] = [];
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2));
  return { arr, count };
};

const GradientBlinds: React.FC<GradientBlindsProps> = ({
  className,
  dpr,
  paused = false,
  gradientColors,
  angle = 0,
  noise = 0.3,
  blindCount = 16,
  blindMinWidth = 60,
  mouseDampening = 0.15,
  mirrorGradient = false,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  distortAmount = 0,
  shineDirection = "left",
  mixBlendMode = "lighten",
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const programRef = useRef<Program | null>(null);
  const meshRef = useRef<Mesh<Triangle> | null>(null);
  const geometryRef = useRef<Triangle | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseTargetRef = useRef<[number, number]>([0, 0]);
  const lastTimeRef = useRef<number>(0);
  const firstResizeRef = useRef<boolean>(true);
  const currentTheme = useCurrentTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If site is in light mode, force the blinds gradient stops to dark shades
    let effectiveGradientColors: string[] | undefined = gradientColors;
    if (currentTheme === "light") {
      // In light mode use the requested blue for the blinds
      effectiveGradientColors = new Array(MAX_COLORS).fill("#01a1df");
    } else {
      // choose gradient stops to follow the theme's primary color (--primary)
      if (typeof window !== "undefined") {
        try {
          const root = document.documentElement;
          const primaryVar = getComputedStyle(root)
            .getPropertyValue("--primary")
            .trim();
          if (primaryVar) {
            // primaryVar is expected like: "217 91% 60%" (h s% l%) as defined in ThemeProvider
            const parts = primaryVar.split(/\s+/).filter(Boolean);
            if (parts.length >= 3) {
              const h = parseFloat(parts[0]);
              const s = parseFloat(parts[1].replace("%", ""));
              const l = parseFloat(parts[2].replace("%", ""));

              const hslToHex = (hh: number, ss: number, ll: number) => {
                ss /= 100;
                ll /= 100;
                const a = ss * Math.min(ll, 1 - ll);
                const f = (n: number) => {
                  const k = (n + hh / 30) % 12;
                  const color =
                    ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                  return Math.round(255 * color)
                    .toString(16)
                    .padStart(2, "0")
                    .toUpperCase();
                };
                return `#${f(0)}${f(8)}${f(4)}`;
              };

              const hex = hslToHex(h, s, l);
              effectiveGradientColors = new Array(MAX_COLORS).fill(hex);
            }
          }
        } catch (e) {
          // ignore and fallback to provided gradientColors
        }
      }
    }

    // Always allow alpha; in light theme we'll render transparent background and opaque black stripes
    const useAlpha = true;
    const renderer = new Renderer({
      dpr:
        dpr ??
        (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1),
      alpha: useAlpha,
      antialias: true,
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    // allow the canvas to receive pointer events even if parent has pointer-events:none
    canvas.style.pointerEvents = "auto";
    // improve touch/mouse responsiveness
    canvas.style.touchAction = "none";
    // hint the browser to optimize compositing for this canvas
    canvas.style.willChange = "transform, opacity";
    // if theme is light, ensure canvas background is white for proper contrast
    // Use theme background variable so canvas matches ThemeProvider.
    // When theme is light, prefer a fully white background to avoid dark bleed-through.
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      const bgVar = getComputedStyle(root)
        .getPropertyValue("--background")
        .trim();
      if (currentTheme === "light") {
        // keep the canvas transparent so the page background (white) shows through
        canvas.style.background = "transparent";
      } else {
        canvas.style.background = bgVar ? `hsl(${bgVar})` : "transparent";
      }
    }
    container.appendChild(canvas);

    const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

    const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform float uInvertBlinds;
uniform float uOpaqueMask;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

varying vec2 vUv;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a){
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec3 getGradientColor(float t){
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);

  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv0 = fragCoord.xy / iResolution.xy;

    float aspect = iResolution.x / iResolution.y;
    vec2 p = uv0 * 2.0 - 1.0;
    p.x *= aspect;
    vec2 pr = rotate2D(p, uAngle);
    pr.x /= aspect;
    vec2 uv = pr * 0.5 + 0.5;

    vec2 uvMod = uv;
    if (uDistort > 0.0) {
      float a = uvMod.y * 6.0;
      float b = uvMod.x * 6.0;
      float w = 0.01 * uDistort;
      uvMod.x += sin(a) * w;
      uvMod.y += cos(b) * w;
    }
    float t = uvMod.x;
    if (uMirror > 0.5) {
      t = 1.0 - abs(1.0 - 2.0 * fract(t));
    }
    vec3 base = getGradientColor(t);

    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float dn = d / r;
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  vec3 cir = vec3(spot);
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;
  if (uInvertBlinds > 0.5) stripe = 1.0 - stripe;
    // produce a mask for stripe regions
    float mask = smoothstep(0.45, 0.55, stripe);

    vec3 col;
    float outAlpha = 1.0;

    if (uOpaqueMask > 0.5) {
      // Light mode: render blinds using the gradient base color on transparent background
      col = base;
      outAlpha = mask;
    } else {
      vec3 ran = vec3(stripe);
      col = cir + base - ran;
      col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;
      outAlpha = 1.0;
    }

    fragColor = vec4(col, outAlpha);
}

void main() {
    vec4 color;
    mainImage(color, vUv * iResolution.xy);
    gl_FragColor = color;
}
`;

    // use the effective stops (light theme fallback) instead of the raw prop
    const { arr: colorArr, count: colorCount } = prepStops(
      effectiveGradientColors
    );
    // ensure color1 and color2 are the same (uColor1 == uColor2)
    if (colorArr && colorArr.length > 1) {
      // copy colorArr[1] into colorArr[2]
      colorArr[2] = colorArr[1];
    }
    const uniforms: {
      iResolution: { value: [number, number, number] };
      iMouse: { value: [number, number] };
      iTime: { value: number };
      uAngle: { value: number };
      uNoise: { value: number };
      uBlindCount: { value: number };
      uSpotlightRadius: { value: number };
      uSpotlightSoftness: { value: number };
      uSpotlightOpacity: { value: number };
      uMirror: { value: number };
      uDistort: { value: number };
      uShineFlip: { value: number };
      uInvertBlinds: { value: number };
      uColor0: { value: [number, number, number] };
      uColor1: { value: [number, number, number] };
      uColor2: { value: [number, number, number] };
      uColor3: { value: [number, number, number] };
      uColor4: { value: [number, number, number] };
      uColor5: { value: [number, number, number] };
      uColor6: { value: [number, number, number] };
      uColor7: { value: [number, number, number] };
      uColorCount: { value: number };
    } = {
      iResolution: {
        value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1],
      },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uAngle: { value: (angle * Math.PI) / 180 },
      uNoise: { value: noise },
      uBlindCount: { value: Math.max(1, blindCount) },
      uSpotlightRadius: { value: spotlightRadius },
      uSpotlightSoftness: { value: spotlightSoftness },
      uSpotlightOpacity: { value: spotlightOpacity },
      uMirror: { value: mirrorGradient ? 1 : 0 },
      uDistort: { value: distortAmount },
      uShineFlip: { value: shineDirection === "right" ? 1 : 0 },
      uInvertBlinds: { value: currentTheme === "light" ? 1 : 0 },
      uColor0: { value: colorArr[0] },
      uColor1: { value: colorArr[1] },
      uColor2: { value: colorArr[2] },
      uColor3: { value: colorArr[3] },
      uColor4: { value: colorArr[4] },
      uColor5: { value: colorArr[5] },
      uColor6: { value: colorArr[6] },
      uColor7: { value: colorArr[7] },
      uColorCount: { value: colorCount },
    };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
    });
    programRef.current = program;

    const geometry = new Triangle(gl);
    geometryRef.current = geometry;
    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
        1,
      ];

      if (blindMinWidth && blindMinWidth > 0) {
        const maxByMinWidth = Math.max(
          1,
          Math.floor(rect.width / blindMinWidth)
        );

        const effective = blindCount
          ? Math.min(blindCount, maxByMinWidth)
          : maxByMinWidth;
        uniforms.uBlindCount.value = Math.max(1, effective);
      } else {
        uniforms.uBlindCount.value = Math.max(1, blindCount);
      }

      if (firstResizeRef.current) {
        firstResizeRef.current = false;
        const cx = gl.drawingBufferWidth / 2;
        const cy = gl.drawingBufferHeight / 2;
        uniforms.iMouse.value = [cx, cy];
        mouseTargetRef.current = [cx, cy];
      }
    };

    resize();
    // Debounced resize observer to avoid rapid shader updates
    let resizeTimer: number | null = null;
    const debouncedResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        resizeTimer = null;
      }, 80);
    };
    const ro = new ResizeObserver(debouncedResize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scale = (renderer as unknown as { dpr?: number }).dpr || 1;
      const x = (e.clientX - rect.left) * scale;
      const y = (rect.height - (e.clientY - rect.top)) * scale;
      mouseTargetRef.current = [x, y];
      if (mouseDampening <= 0) {
        uniforms.iMouse.value = [x, y];
      }
    };
    // attach pointer events to canvas when interactive; otherwise attach to container
    if (interactive) {
      // ensure canvas can receive events
      canvas.style.pointerEvents = "auto";
      canvas.addEventListener("pointermove", onPointerMove);
    } else {
      canvas.style.pointerEvents = "none";
      container.addEventListener("pointermove", onPointerMove);
    }

    // global fallback: listen on window so movement is captured even if other elements are above the canvas
    const onWindowPointer = (e: PointerEvent) => onPointerMove(e);
    window.addEventListener("pointermove", onWindowPointer);

    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);
      uniforms.iTime.value = t * 0.001;
      if (mouseDampening > 0) {
        if (!lastTimeRef.current) lastTimeRef.current = t;
        const dt = (t - lastTimeRef.current) / 1000;
        lastTimeRef.current = t;
        const tau = Math.max(1e-4, mouseDampening);
        let factor = 1 - Math.exp(-dt / tau);
        if (factor > 1) factor = 1;
        const target = mouseTargetRef.current;
        const cur = uniforms.iMouse.value;
        cur[0] += (target[0] - cur[0]) * factor;
        cur[1] += (target[1] - cur[1]) * factor;
      } else {
        lastTimeRef.current = t;
      }
      if (!paused && programRef.current && meshRef.current) {
        try {
          renderer.render({ scene: meshRef.current });
        } catch (e) {
          console.error(e);
        }
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (interactive) {
        canvas.removeEventListener("pointermove", onPointerMove);
      } else {
        container.removeEventListener("pointermove", onPointerMove);
      }
      window.removeEventListener("pointermove", onWindowPointer);
      ro.disconnect();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
      const callIfFn = <T extends object, K extends keyof T>(
        obj: T | null,
        key: K
      ) => {
        if (obj && typeof obj[key] === "function") {
          (obj[key] as unknown as () => void).call(obj);
        }
      };
      callIfFn(programRef.current, "remove");
      callIfFn(geometryRef.current, "remove");
      callIfFn(meshRef.current as unknown as { remove?: () => void }, "remove");
      callIfFn(
        rendererRef.current as unknown as { destroy?: () => void },
        "destroy"
      );
      programRef.current = null;
      geometryRef.current = null;
      meshRef.current = null;
      rendererRef.current = null;
    };
  }, [
    dpr,
    paused,
    gradientColors,
    angle,
    noise,
    blindCount,
    blindMinWidth,
    mouseDampening,
    mirrorGradient,
    spotlightRadius,
    spotlightSoftness,
    spotlightOpacity,
    distortAmount,
    shineDirection,
    currentTheme,
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative ${className}`}
      style={{
        ...(mixBlendMode && {
          mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"],
        }),
      }}
    />
  );
};

export default GradientBlinds;
