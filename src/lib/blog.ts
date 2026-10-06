// Utilitaires du blog — purs, exécutés côté serveur au rendu (pas de
// useEffect, pas de valeur recalculée côté client) : le temps de
// lecture et les ids d'ancre dérivent du MÊME contenu que l'affichage,
// ils ne peuvent donc jamais diverger (même principe que le JSON-LD
// FAQPage généré dans ServiceFaq.tsx à partir des mêmes données que le
// rendu visuel).

import type { ArticleBlock, ArticleContent } from "@/content/blog/types";

const WORDS_PER_MINUTE = 230;

function wordCount(text: string): number {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

function blockWordCount(block: ArticleBlock): number {
  switch (block.type) {
    case "h2":
      return wordCount(block.text);
    case "paragraph":
      return wordCount(block.text) + (block.link ? wordCount(block.link.label) : 0);
    case "list":
      return block.items.reduce((sum, item) => sum + wordCount(item), 0);
  }
}

/** 230 mots/minute (CLAUDE.md), arrondi, jamais 0 — un article très
 *  court affiche au moins 1 min plutôt qu'une valeur à zéro. */
export function estimateReadingMinutes(
  article: Pick<ArticleContent, "intro" | "enBref" | "body">,
): number {
  const words =
    wordCount(article.intro) +
    article.enBref.reduce((sum, line) => sum + wordCount(line), 0) +
    article.body.reduce((sum, block) => sum + blockWordCount(block), 0);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** id d'ancre dérivé d'un titre de H2 — minuscules, accents retirés,
 *  tout caractère non alphanumérique réduit à un seul tiret, pas de
 *  tiret en bordure. Déterministe : le même titre donne toujours le
 *  même id, à la lecture comme à l'écriture (RailConfig.offsetTargets
 *  cible un `[data-article-first-h2]`, jamais un id d'ancre codé en
 *  dur, donc aucune dépendance ailleurs sur cette valeur exacte). */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** « 6 octobre 2026 » — fr-FR, mois en lettres (même convention que le
 *  formatage fr-FR déjà en place sur les calculateurs, ServiceCalculator/
 *  ServiceRoasCalculator/ServiceRateCalculator). Pure fonction d'une
 *  date ISO statique du contenu : aucun risque de divergence serveur/
 *  client (contrairement à « aujourd'hui »), pas besoin d'un composant
 *  client. */
export function formatFrenchDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
