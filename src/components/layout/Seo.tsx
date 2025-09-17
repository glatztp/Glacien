import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  breadcrumbs?: BreadcrumbItem[];
  ogImage?: string; // absolute URL to og image
}

/**
 * getHeadHtml
 * A tiny helper that returns string HTML for use in SSR/SSG templates.
 * Returns title, meta description, canonical link and BreadcrumbList JSON-LD.
 */
export function getHeadHtml({
  title,
  description,
  canonical,
  breadcrumbs,
  ogImage,
}: SeoProps) {
  const parts: string[] = [];
  if (title) parts.push(`<title>${escapeHtml(title)}</title>`);
  if (description)
    parts.push(
      `<meta name="description" content="${escapeHtml(description)}" />`
    );
  if (canonical)
    parts.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);
  if (ogImage)
    parts.push(
      `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`
    );

  if (breadcrumbs && breadcrumbs.length) {
    const itemList = breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.url,
    }));

    const json = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: itemList,
    };

    parts.push(
      `<script type="application/ld+json" id="seo-breadcrumb-json">${escapeHtml(
        JSON.stringify(json)
      )}</script>`
    );
  }

  return parts.join("\n");
}

// Default site-wide metadata (used by index.html and as fallback)
export const DEFAULT_SITE_TITLE =
  "Glacien — Biblioteca de componentes React/TypeScript";
export const DEFAULT_SITE_DESCRIPTION =
  "Biblioteca de componentes React/TypeScript inspirada no shadcn/ui. Moderna, acessível e altamente customizável — usada por equipes que querem produtividade e design profissional.";
export const DEFAULT_CANONICAL = "https://glacien.online/";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function Seo({
  title,
  description,
  canonical,
  breadcrumbs,
}: SeoProps) {
  useEffect(() => {
    if (title) document.title = title;

    // description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    if (description) metaDesc.setAttribute("content", description);

    // canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    if (canonical) linkCanonical.setAttribute("href", canonical);

    // Breadcrumbs JSON-LD
    let script = document.getElementById("seo-breadcrumb-json");
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.id = "seo-breadcrumb-json";
      document.head.appendChild(script);
    }

    if (breadcrumbs && breadcrumbs.length) {
      const itemList = breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url,
      }));

      const json = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: itemList,
      };

      script.textContent = JSON.stringify(json);
    } else {
      script.textContent = "";
    }

    return () => {
      // optional cleanup: do not remove meta/links created globally
    };
  }, [title, description, canonical, breadcrumbs]);

  return null;
}
