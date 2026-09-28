// Type partagé par les 4 pages /services/* (gabarit posé par la page
// Automatisation — voir CLAUDE.md, « Pages services — gabarit »). Une
// page peut ne pas avoir de photo (CLAUDE.md ne l'impose pas) : rien
// ici ne présuppose une image.

import type { RailCardContent } from "@/content/rail";

export type ServiceHero = {
  label: string;
  /** <h1>. */
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
};

/** Bloc 2 — 4 cartes en quarts. */
export type ServiceQuadCard = {
  title: string;
  text: string;
};

export type ServiceQuadBlock = {
  label: string;
  title: string;
  cards: [ServiceQuadCard, ServiceQuadCard, ServiceQuadCard, ServiceQuadCard];
};

/** Étape numérotée (blocs 3 et 5) — même forme que ProcessusStep
 *  (content/processus.ts), pas réimportée : ce type vit dans le gabarit
 *  services, indépendant de la home. */
export type ServiceStep = {
  /** Sert de texte au numéro (JetBrains Mono) — écrit tel quel ("01",
   *  "02"…), aucun padding calculé au rendu. */
  number: string;
  label: string;
  description: string;
};

/** Bloc 3 — intro (mise en page B) + schéma en tiers sur 2 lignes. */
export type ServiceProcessBlock = {
  label: string;
  title: string;
  paragraph: string;
  /** 6 étapes exactement (2 lignes de tiers, colonnes 1/5/9). */
  steps: [ServiceStep, ServiceStep, ServiceStep, ServiceStep, ServiceStep, ServiceStep];
  /** Sous le schéma, axe gauche. */
  note: string;
};

/** Bloc 4 — l'outil : intro + sections à intertitre + encadré + tableau. */
export type ServiceToolSection = {
  heading: string;
  text: string;
};

export type ServiceToolCompareRow = {
  label: string;
  /** Une valeur par colonne, même ordre que `table.columns`. */
  values: [string, string, string];
};

export type ServiceToolBlock = {
  label: string;
  title: string;
  /** Paragraphe d'intro, sans intertitre. */
  intro: string;
  sections: ServiceToolSection[];
  callout: { title: string; text: string };
  table: {
    /** Les 3 colonnes comparées (Zapier, Make, n8n — dans cet ordre). */
    columns: [string, string, string];
    rows: ServiceToolCompareRow[];
  };
};

/** Bloc 5 — déroulé, même style que les étapes du Processus (home), sans
 *  le schéma animé. */
export type ServiceRolloutBlock = {
  label: string;
  title: string;
  steps: ServiceStep[];
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceFaqBlock = {
  label: string;
  title: string;
  items: ServiceFaqItem[];
};

/** Bloc 7 — autres expertises, en tiers. */
export type ServiceOtherExpertise = {
  name: string;
  phrase: string;
  ctaLabel: string;
  href: string;
};

export type ServiceOtherExpertisesBlock = {
  label: string;
  items: ServiceOtherExpertise[];
};

export type ServicePageContent = {
  meta: { title: string; description: string };
  hero: ServiceHero;
  quadBlock: ServiceQuadBlock;
  process: ServiceProcessBlock;
  tool: ServiceToolBlock;
  rollout: ServiceRolloutBlock;
  faq: ServiceFaqBlock;
  otherExpertises: ServiceOtherExpertisesBlock;
  /** Les 3 cartons du rail — même type que content/rail.ts (home) :
   *  `title`/`text` toujours visibles, `resume` réservé à la pile
   *  mobile REPLIÉE, `href` seulement sur le carton d'action (3ᵉ). */
  rail: [RailCardContent, RailCardContent, RailCardContent];
};
