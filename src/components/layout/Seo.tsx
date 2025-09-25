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

  // Title and core meta
  if (title) parts.push(`<title>${escapeHtml(title)}</title>`);
  if (description)
    parts.push(
      `<meta name="description" content="${escapeHtml(description)}" />`
    );

  // Canonical
  if (canonical)
    parts.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);

  // Robots (default permissive; callers can override by adding a custom meta tag later)
  parts.push(`<meta name="robots" content="index, follow" />`);

  // Open Graph
  if (title)
    parts.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
  if (description)
    parts.push(
      `<meta property="og:description" content="${escapeHtml(description)}" />`
    );
  parts.push(`<meta property="og:type" content="website" />`);
  parts.push(`<meta property="og:locale" content="pt_BR" />`);
  if (ogImage || DEFAULT_OG_IMAGE)
    parts.push(
      `<meta property="og:image" content="${escapeHtml(ogImage || DEFAULT_OG_IMAGE)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`
    );

  // Twitter (no site handle)
  parts.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (title)
    parts.push(`<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  if (description)
    parts.push(
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`
    );
  if (ogImage || DEFAULT_OG_IMAGE)
    parts.push(
      `<meta name="twitter:image" content="${escapeHtml(ogImage || DEFAULT_OG_IMAGE)}" />`
    );

  // Keywords (small set, optional)
  parts.push(
    `<meta name="keywords" content="react, components, ui, typescript, design system, acessibilidade, tailwind, glacien" />`
  );

  // JSON-LD: Organization + WebSite + optional SearchAction
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: DEFAULT_SITE_TITLE,
    url: DEFAULT_CANONICAL,
    logo: `${DEFAULT_CANONICAL.replace(/\/$/, "")}/logo-p.png`,
    sameAs: [
      "https://github.com/glatztp/glacien",
      "https://www.npmjs.com/package/@glacien/ui",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: DEFAULT_CANONICAL,
    name: DEFAULT_SITE_TITLE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${DEFAULT_CANONICAL}?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  parts.push(
    `<script type="application/ld+json" id="seo-org">${escapeHtml(JSON.stringify(org))}</script>`,
    `<script type="application/ld+json" id="seo-website">${escapeHtml(JSON.stringify(website))}</script>`
  );

  // BreadcrumbList (if provided)
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
export const DEFAULT_OG_IMAGE = "https://glacien.online/og-home.png";

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
  ogImage,
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

    // robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "index, follow");

    // Open Graph & Twitter
    const ensureMeta = (selector: string, attr: string, name: string) => {
      let m = document.querySelector(selector) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement("meta");
        if (selector.includes("property")) m.setAttribute("property", name);
        else m.setAttribute("name", name);
        document.head.appendChild(m);
      }
      return m;
    };

    if (title)
      ensureMeta(
        'meta[property="og:title"]',
        "content",
        "og:title"
      ).setAttribute("content", title);
    if (description)
      ensureMeta(
        'meta[property="og:description"]',
        "content",
        "og:description"
      ).setAttribute("content", description);
    ensureMeta('meta[property="og:type"]', "content", "og:type").setAttribute(
      "content",
      "website"
    );
    ensureMeta(
      'meta[property="og:locale"]',
      "content",
      "og:locale"
    ).setAttribute("content", "pt_BR");
    ensureMeta(
      'meta[name="twitter:card"]',
      "content",
      "twitter:card"
    ).setAttribute("content", "summary_large_image");
    if (ogImage || DEFAULT_OG_IMAGE) {
      ensureMeta(
        'meta[property="og:image"]',
        "content",
        "og:image"
      ).setAttribute("content", ogImage || DEFAULT_OG_IMAGE);
      ensureMeta(
        'meta[name="twitter:image"]',
        "content",
        "twitter:image"
      ).setAttribute("content", ogImage || DEFAULT_OG_IMAGE);
    }

    // Keywords (non-intrusive)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      metaKeywords.setAttribute(
        "content",
        "react, components, ui, typescript, design system, acessibilidade, tailwind, glacien"
      );
      document.head.appendChild(metaKeywords);
    }

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

    // Organization & Website JSON-LD (client-side fallback)
    let orgScript = document.getElementById("seo-org");
    if (!orgScript) {
      orgScript = document.createElement("script");
      orgScript.setAttribute("type", "application/ld+json");
      orgScript.id = "seo-org";
      document.head.appendChild(orgScript);
    }
    orgScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: DEFAULT_SITE_TITLE,
      url: DEFAULT_CANONICAL,
      logo: `${DEFAULT_CANONICAL.replace(/\/$/, "")}/logo-p.png`,
      sameAs: [
        "https://github.com/glatztp/glacien",
        "https://www.npmjs.com/package/@glacien/ui",
      ],
    });

    let websiteScript = document.getElementById("seo-website");
    if (!websiteScript) {
      websiteScript = document.createElement("script");
      websiteScript.setAttribute("type", "application/ld+json");
      websiteScript.id = "seo-website";
      document.head.appendChild(websiteScript);
    }
    websiteScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: DEFAULT_CANONICAL,
      name: DEFAULT_SITE_TITLE,
      potentialAction: {
        "@type": "SearchAction",
        target: `${DEFAULT_CANONICAL}?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });

    return () => {
      // optional cleanup: do not remove meta/links created globally
    };
  }, [title, description, canonical, breadcrumbs]);

  return null;
}
