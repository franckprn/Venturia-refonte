// Type du blog — un fichier de contenu par article (content/blog/<slug>.ts),
// un index (content/blog/index.ts) qui les regroupe. Même convention que
// content/services/types.ts : tout le texte vit ici, typé, jamais en dur
// dans le JSX.

import type { RailCardContent } from "@/content/rail";
import type { ServiceRedBandBlock } from "@/content/services/types";

/** Auteur de l'article — JSON-LD `Article.author` (src/app/blog/[slug]/
 *  page.tsx) et, seulement si `type === "Person"`, une ligne « Par
 *  {name} » sous la date (ArticleHeader.tsx). Une Organization (Venturia
 *  elle-même) n'affiche pas cette ligne : le nom de l'auteur n'apporte
 *  rien de plus que le site lui-même dans ce cas. */
export type ArticleAuthor = {
  type: "Organization" | "Person";
  name: string;
  url?: string;
  jobTitle?: string;
};

/** Lien affiché juste APRÈS le paragraphe (ArrowLink direction="right"),
 *  jamais inline dans le texte — convention du site, un CTA est toujours
 *  son propre élément (voir ServiceCrossLink.tsx). */
export type ArticleParagraphBlock = {
  type: "paragraph";
  text: string;
  link?: { label: string; href: string };
};

/** `id` d'ancre : généré depuis `text` si omis (src/lib/blog.ts,
 *  `slugifyHeading`) — à fournir explicitement seulement en cas de
 *  collision entre deux titres proches. */
export type ArticleH2Block = {
  type: "h2";
  text: string;
  id?: string;
};

export type ArticleListBlock = {
  type: "list";
  items: string[];
};

/** Un seul type pour le corps de l'article (ArticleBody.tsx) : le
 *  rendu lit `block.type` pour choisir l'élément — pas de variantes
 *  « callout »/« sources », ces deux blocs restent des champs dédiés
 *  (`enBref`, `sources` ci-dessous), chacun affiché UNE SEULE fois à un
 *  endroit fixe du gabarit (juste sous l'intro / juste avant la
 *  Respiration rouge), jamais mélangé dans le flux de `body`. */
export type ArticleBlock = ArticleH2Block | ArticleParagraphBlock | ArticleListBlock;

export type ArticleSource = {
  label: string;
  href: string;
};

/** Métadonnées légères d'un article pour la page liste (/blog) —
 *  dérivées de son `ArticleContent` par content/blog/index.ts, jamais
 *  dupliquées à la main dans un second fichier (les deux ne peuvent pas
 *  diverger). */
export type ArticleListEntry = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

export type ArticleContent = {
  meta: { title: string; description: string };
  category: string;
  title: string;
  /** Extrait affiché sur la page liste (/blog) — distinct de `intro`
   *  (affiché en haut de l'article lui-même). */
  excerpt: string;
  /** ISO (YYYY-MM-DD) — JSON-LD `datePublished`/`dateModified` et
   *  affichage formaté (src/lib/blog.ts, `formatFrenchDate`). */
  datePublished: string;
  dateModified: string;
  author: ArticleAuthor;
  intro: string;
  enBref: string[];
  body: ArticleBlock[];
  sources: ArticleSource[];
  /** Respiration rouge de fin d'article — même composant/type que les
   *  pages /services/* (CLAUDE.md, « Pages services — gabarit »). */
  redBand: ServiceRedBandBlock;
  /** Les 3 cartons du rail — même type que content/rail.ts et
   *  content/services/types.ts (`resume` obligatoire, réservé à la pile
   *  mobile repliée ; `href` sur les 3 cartons ici, pas seulement le
   *  3ᵉ — voir content/blog/budget-google-ads-pme.ts). */
  rail: [RailCardContent, RailCardContent, RailCardContent];
};
