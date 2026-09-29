// Type partagé par les 4 pages /services/* (gabarit posé par la page
// Automatisation — voir CLAUDE.md, « Pages services — gabarit »). Une
// page peut ne pas avoir de photo (CLAUDE.md ne l'impose pas) : rien
// ici ne présuppose une image.

import type { RailCardContent } from "@/content/rail";

/** Bloc 1 — hero. H1 sur les 12 colonnes (pas 1-9, contrairement à
 *  l'ancienne version) ; sous-titre (1-6) + CTA (7-12) sur la même
 *  ligne ; puis la « chaîne » (notification + 4 étapes) pleine largeur. */
export type ServiceHeroChainStep = {
  /** "01".."04" — JetBrains Mono. */
  number: string;
  /** Bricolage. */
  title: string;
  /** --accent. */
  status: string;
};

export type ServiceHeroChain = {
  notification: { label: string; title: string };
  steps: [
    ServiceHeroChainStep,
    ServiceHeroChainStep,
    ServiceHeroChainStep,
    ServiceHeroChainStep,
  ];
};

export type ServiceHero = {
  /** <h1>, sur 2 lignes EXPLICITES (comme `line1`/`line2` du bloc de fin,
   *  content/footer.ts) — jamais laissé au navigateur : `line1` est la
   *  plus longue des deux, c'est elle qui calibre la taille du texte
   *  (CLAUDE.md, « Pages services — gabarit »). */
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  cta: { label: string; href: string };
  chain: ServiceHeroChain;
};

/** Bloc 2 — 4 cartes en quarts, chacune précédée d'une illustration
 *  décorative (CLAUDE.md, « Pages services — gabarit »). `illustration`
 *  est optionnelle : une page sans mini-interface à dessiner peut
 *  laisser le bloc sans elle. */
export type ServiceQuadIllustrationProduct = {
  kind: "product";
  /** "Fiche produit". */
  name: string;
  /** Prix / Stock / Description, dans cet ordre. */
  fields: [string, string, string];
  /** "↻ à jour". */
  badge: string;
};

export type ServiceQuadIllustrationEmails = {
  kind: "emails";
  emails: [
    { label: string; subject: string },
    { label: string; subject: string },
    { label: string; subject: string },
  ];
};

export type ServiceQuadIllustrationReview = {
  kind: "review";
  question: string;
  buttonLabel: string;
};

export type ServiceQuadIllustrationInvoice = {
  kind: "invoice";
  /** "FACTURE". */
  heading: string;
  /** "→ Client ✓" / "→ Comptable ✓", dans cet ordre. */
  recipients: [string, string];
};

export type ServiceQuadIllustration =
  | ServiceQuadIllustrationProduct
  | ServiceQuadIllustrationEmails
  | ServiceQuadIllustrationReview
  | ServiceQuadIllustrationInvoice;

export type ServiceQuadCard = {
  title: string;
  text: string;
  illustration?: ServiceQuadIllustration;
};

export type ServiceQuadBlock = {
  label: string;
  title: string;
  cards: [ServiceQuadCard, ServiceQuadCard, ServiceQuadCard, ServiceQuadCard];
};

/** Bloc 3 — « Par où commencer » : intro (mise en page B, ServiceSplitIntro)
 *  + 3 éléments en tiers SANS numéro (titre + texte, trait --line
 *  au-dessus) — distinct de ServiceStep (bloc 5), qui porte un numéro. */
export type ServiceStartingItem = {
  title: string;
  text: string;
};

export type ServiceStartingBlock = {
  label: string;
  title: string;
  /** Axe droit (colonnes 7-12, sous le bas du H2 + 32px). */
  text: string;
  items: [ServiceStartingItem, ServiceStartingItem, ServiceStartingItem];
};

/** Bloc 4 — Respiration rouge (tone="light", PAS "accent" — le rouge
 *  vient d'une inversion scroll-triggered, src/lib/respiration.ts, pas
 *  d'un fond statique) : H2 très grand + texte + CTA. */
export type ServiceRedBandBlock = {
  title: string;
  text: string;
  cta: { label: string; href: string };
};

/** Étape numérotée (bloc 5) — même forme que ProcessusStep
 *  (content/processus.ts), pas réimportée : ce type vit dans le gabarit
 *  services, indépendant de la home. */
export type ServiceStep = {
  /** Sert de texte au numéro (JetBrains Mono) — écrit tel quel ("01",
   *  "02"…), aucun padding calculé au rendu. */
  number: string;
  label: string;
  description: string;
};

/** Bloc 5 — l'outil : label + h2 (mise en page B) + 4 paragraphes en axe
 *  droit (corrigé — plus de lignes numérotées ni de tiers) : §1 = intro
 *  sans intertitre, §2-4 = un intertitre en gras au début du paragraphe
 *  (`heading`, ponctuation finale incluse) suivi de `text`, dans le
 *  MÊME `<p>`. Plus de callout ni de tableau comparatif (retirés). */
export type ServiceToolSection = {
  /** Intertitre en gras, ponctuation finale incluse (ex. "Un coût
   *  stable."). */
  heading: string;
  text: string;
};

export type ServiceToolBlock = {
  label: string;
  title: string;
  /** §1 — paragraphe d'intro, sans intertitre. */
  intro: string;
  /** §2, §3, §4. */
  sections: [ServiceToolSection, ServiceToolSection, ServiceToolSection];
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

/** Bloc 7 — autres expertises, liste verticale (pas en tiers — corrigé
 *  après la 1ʳᵉ version, ServiceOtherExpertises.tsx). `ctaLabel` = « En
 *  savoir plus » sur cette page (pas « Découvrir… », propre à
 *  content/services.ts, home). */
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
  starting: ServiceStartingBlock;
  redBand: ServiceRedBandBlock;
  tool: ServiceToolBlock;
  faq: ServiceFaqBlock;
  otherExpertises: ServiceOtherExpertisesBlock;
  /** Les 3 cartons du rail — même type que content/rail.ts (home) :
   *  `title`/`text` toujours visibles, `resume` réservé à la pile
   *  mobile REPLIÉE, `href` seulement sur le carton d'action (3ᵉ). */
  rail: [RailCardContent, RailCardContent, RailCardContent];
};
