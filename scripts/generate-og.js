#!/usr/bin/env node
import fs from "fs";
import path from "path";
import process from "process";

const root = path.resolve(process.cwd());
const outSvg = path.join(root, "public", "og-home.svg");

const title = "Glacien — Component library";
const bg = "#0f172a";
const accent = "#7c3aed";

const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">\n  <rect width="100%" height="100%" fill="${bg}"/>\n  <defs>\n    <linearGradient id="g" x1="0" x2="1">\n      <stop offset="0" stop-color="#06b6d4"/>\n      <stop offset="1" stop-color="${accent}"/>\n    </linearGradient>\n  </defs>\n  <g fill="none">\n    <rect x="60" y="60" width="1080" height="510" rx="24" fill="url(#g)" opacity="0.08"/>\n  </g>\n  <g font-family="Inter, Roboto, Arial, sans-serif" fill="#fff">\n    <text x="120" y="300" font-size="56" font-weight="700">${escapeXml(title)}</text>\n    <text x="120" y="360" font-size="28" fill="#cbd5e1">Modern, accessible React components</text>\n  </g>\n</svg>`;

fs.writeFileSync(outSvg, svg, "utf8");
console.log("Wrote", outSvg);

// Optional: if sharp is installed we could rasterize to PNG. Skip to keep deps minimal.

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
