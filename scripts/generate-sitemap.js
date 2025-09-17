#!/usr/bin/env node
import fs from "fs";
import path from "path";
import process from "process";

// Simple sitemap generator: scans src/components/pages for .tsx files and index.html
const root = path.resolve(process.cwd());
const pagesDir = path.join(root, "src", "components", "pages");
const outPath = path.join(root, "public", "sitemap.xml");
// Ensure process is defined (for ESM environments)
const baseUrl = (typeof process !== "undefined" && process.env && process.env.BASE_URL) || "https://glacien.online";

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

let urls = new Set();
// include root
urls.add(baseUrl + "/");

if (fs.existsSync(pagesDir)) {
  const files = walk(pagesDir).filter((f) => f.endsWith(".tsx"));
  for (const f of files) {
    const rel = path.relative(pagesDir, f).replace(/\\\\/g, "/");
    const name = rel
      .replace(/\.tsx$/, "")
      .replace(/index$/, "")
      .replace(/(^\/+|\/+$)/g, "");
    const url = name ? `${baseUrl}/${name}` : `${baseUrl}/`;
    urls.add(url);
  }
}

const now = new Date().toISOString();
const items = Array.from(urls)
  .map(
    (u) =>
      `  <url>\n    <loc>${u}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`
  )
  .join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;

fs.writeFileSync(outPath, xml, "utf8");
console.log("Wrote sitemap to", outPath);
