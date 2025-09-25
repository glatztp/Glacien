#!/usr/bin/env node
import fs from "fs";
import path from "path";
import process from "process";

// Simple sitemap generator: scans src/components/pages for .tsx files and index.html
const root = path.resolve(process.cwd());
const pagesDir = path.join(root, "src", "components", "pages");
const outPath = path.join(root, "public", "sitemap.xml");
// Ensure process is defined (for ESM environments)
const baseUrl =
  (typeof process !== "undefined" && process.env && process.env.BASE_URL) ||
  "https://glacien.online";

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

// Try to get per-file lastmod from git if available; fallback to now
function getLastMod(filePath) {
  // Best-effort: try to run git to get file last commit date. If not available, use now.
  try {
    // dynamic import without top-level await
    // this will be synchronous for most node versions using the child_process module
    const child = awaitImportChildProcess();
    const out = child
      .execSync(`git log -1 --format=%cI -- "${filePath}"`, {
        encoding: "utf8",
      })
      .trim();
    if (out) return out;
  } catch (e) {
    // ignore - git may not be available in all envs
  }
  return now;
}

function awaitImportChildProcess() {
  // returns the child_process module or throws
  // use synchronous require-like behavior via dynamic import promise resolution
  // Note: this helper blocks only while importing
  let cp;
  try {
    // Node 18+ supports synchronous import via eval workaround
    // Fallback to dynamic import which returns a promise but we resolve via then and rethrow synchronously
    import("child_process")
      .then((m) => {
        cp = m;
      })
      .catch(() => {});
  } catch (e) {
    // ignore
  }
  if (!cp) {
    // last resort: try to require (may fail in ESM)
    try {
      // eslint-disable-next-line no-eval
      // @ts-expect-error - tentativa segura de usar require em runtime ESM fallback
      cp = eval(
        "typeof require !== 'undefined' ? require('child_process') : undefined"
      );
    } catch (e) {
      // ignore
    }
  }
  if (!cp) throw new Error("child_process not available");
  return cp;
}

const items = [];
for (const u of Array.from(urls)) {
  // map URL back to a file path if possible (best-effort)
  let lastmod = now;
  try {
    const urlPath = u.replace(baseUrl, "");
    const candidate = path.join(pagesDir, `${urlPath.replace(/^\//, "")}.tsx`);
    if (fs.existsSync(candidate)) lastmod = getLastMod(candidate);
  } catch (e) {
    lastmod = now;
  }
  items.push(
    `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
  );
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join("\n")}\n</urlset>`;

fs.writeFileSync(outPath, xml, "utf8");
console.log("Wrote sitemap to", outPath);
