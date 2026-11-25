/**
 * Depois do `vite build`: cria uma página HTML para cada orçamento (dist/{slug}/index.html)
 * com título e prévia de link próprios (WhatsApp, iMessage...), e o 404.html.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { list } from "../src/proposals/index";
import { pageTitle } from "../src/proposals/calc";

const dist = join(import.meta.dirname, "..", "dist");
const siteUrl = (process.env.SITE_URL ?? "").replace(/\/$/, "");
const template = readFileSync(join(dist, "index.html"), "utf8").replaceAll(
  "%OG_IMAGE%",
  `${siteUrl}/og-image.jpg`,
);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function page(title: string, desc: string, url: string) {
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace("</head>", `    <meta property="og:url" content="${esc(url)}" />\n  </head>`);
}

writeFileSync(join(dist, "index.html"), template);
writeFileSync(
  join(dist, "404.html"),
  page("Orçamento não encontrado — Lucas Fortes · Filmmaker", "Confira o link recebido.", siteUrl),
);

for (const p of list) {
  const dir = join(dist, p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(pageTitle(p), p.projeto.resumo, `${siteUrl}/${p.slug}`));
  console.log(`✓ /${p.slug}`);
}
