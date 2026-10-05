// Type partagé par les 4 pages /services/* (gabarit posé par la page
// Automatisation — voir CLAUDE.md, « Pages services — gabarit »). Une
// page peut ne pas avoir de photo (CLAUDE.md ne l'impose pas) : rien
// ici ne présuppose une image.

import type { RailCardContent } from "@/content/rail";
import type { IntegrationIconSlug } from "@/components/service-page/integrationIcons";

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

/** Bloc 2 — frise du parcours de commande : label + h2 (axe gauche,
 *  pleine largeur, gabarit § a — pas de texte décalé en vis-à-vis),
 *  puis 3 moments en tiers (gabarit § b) reliés par une ligne continue
 *  (--line) portant un point par moment. `tasks` n'est volontairement
 *  pas un tuple de longueur fixe : chaque moment porte un nombre de
 *  tâches différent (1, 3 puis 2 sur la page Automatisation). */
export type ServiceTimelineTask = {
  name: string;
  text: string;
};

export type ServiceTimelineMoment = {
  /** JetBrains Mono majuscule — déjà en majuscules dans le contenu. */
  label: string;
  tasks: ServiceTimelineTask[];
};

export type ServiceTimelineBlock = {
  label: string;
  title: string;
  moments: [ServiceTimelineMoment, ServiceTimelineMoment, ServiceTimelineMoment];
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

/** Bloc 3bis — « Autres activités » : mise en page B (ServiceSplitIntro),
 *  intro + liste de lignes nom/phrase (pas de tiers, pas de carte — juste
 *  des traits --line), entre « Par où commencer » et la Respiration
 *  rouge. */
export type ServiceOtherActivityItem = {
  name: string;
  text: string;
};

export type ServiceOtherActivitiesBlock = {
  label: string;
  title: string;
  /** Axe droit (colonnes 7-12, sous le bas du H2 + 32px). */
  intro: string;
  items: ServiceOtherActivityItem[];
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
/** Bloc 4bis — « Calculateur », entre la Respiration rouge et L'outil.
 *  Mise en page B (ServiceSplitIntro : label + h2 colonnes 1-6 pleine
 *  largeur) — TOUT le contenu dynamique (3 champs, résultat, note, CTA)
 *  reste dans l'axe droit (colonnes 7-12, sous le bas du h2 + 32px),
 *  jamais une grille pleine largeur séparée comme `.items`
 *  (ServiceStarting) : rien ici n'a besoin des 12 colonnes. Les bornes
 *  de validation (1-480 minutes, 1-500 fois, 1-1000 €) sont des
 *  constantes de calcul, pas du texte — elles vivent dans
 *  ServiceCalculator.tsx, pas ici. */
export type ServiceCalculatorBlock = {
  label: string;
  title: string;
  minutesLabel: string;
  /** Valeur de départ du champ 1, affichée au premier rendu. */
  minutesDefault: number;
  countLabel: string;
  /** Valeur de départ du champ 2. */
  countDefault: number;
  /** Champ 3, facultatif — pas de valeur de départ (vide). */
  hourlyCostLabel: string;
  /** Suffixe après le nombre d'heures (« heures par an »). */
  resultSuffix: string;
  /** Avant le montant en euros (« soit »). */
  euroPrefix: string;
  /** Après le montant en euros (« par an »). */
  euroSuffix: string;
  /** Résultat affiché à la place d'un nombre quand une valeur saisie est
   *  invalide (vide, 0, négative, non numérique) — « — ». */
  emptyValue: string;
  note: string;
  cta: { label: string; href: string };
};

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
  /** §2, §3 — réduit de 3 à 2 : « Votre boutique, déjà compatible. »
   *  devenu doublon du contenu du bloc Intégrations, retiré. */
  sections: [ServiceToolSection, ServiceToolSection];
};

/** Bloc 5bis — « Intégrations », entre L'outil et la FAQ. Mise en page B
 *  (ServiceSplitIntro : label + h2 colonnes 1-6 pleine largeur, intro
 *  colonnes 7-12 sous le bas du h2 + 32px, SANS max-width — comme
 *  ServiceOtherActivities, l'intro doit atteindre le bord droit du
 *  contenu), puis une grille de tuiles PLEINE LARGEUR (colonnes 1-12,
 *  sa propre ligne de grille à la suite de ServiceSplitIntro — même
 *  motif que `.items` dans ServiceStarting.module.css), puis une ligne
 *  finale. `icon` est un slug simple-icons (voir
 *  `components/service-page/integrationIcons.ts`) : seuls les outils
 *  qui ont un logo dans ce catalogue apparaissent dans `tools` — les
 *  outils sans logo (Outlook, Excel, Word, Slack, Pipedrive, OpenAI) ne
 *  sont cités que dans `outro`, en texte, jamais avec un pictogramme
 *  inventé (CLAUDE.md, « Détails faciles à oublier » n'en parle pas
 *  explicitly, mais aucun logo ne doit être approximé). */
export type ServiceIntegrationTool = {
  name: string;
  icon: IntegrationIconSlug;
};

export type ServiceIntegrationsBlock = {
  label: string;
  title: string;
  /** Axe droit (colonnes 7-12, sous le bas du H2 + 32px), pleine
   *  largeur jusqu'à la colonne 12 (pas de max-width en ch). */
  intro: string;
  tools: ServiceIntegrationTool[];
  /** Ligne finale sous la grille, axe gauche. */
  outro: string;
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
  timeline: ServiceTimelineBlock;
  starting: ServiceStartingBlock;
  otherActivities: ServiceOtherActivitiesBlock;
  redBand: ServiceRedBandBlock;
  calculator: ServiceCalculatorBlock;
  tool: ServiceToolBlock;
  integrations: ServiceIntegrationsBlock;
  faq: ServiceFaqBlock;
  otherExpertises: ServiceOtherExpertisesBlock;
  /** Les 3 cartons du rail — même type que content/rail.ts (home) :
   *  `title`/`text` toujours visibles, `resume` réservé à la pile
   *  mobile REPLIÉE, `href` seulement sur le carton d'action (3ᵉ). */
  rail: [RailCardContent, RailCardContent, RailCardContent];
};
