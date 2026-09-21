// Contenu des trois cartons du rail, fourni par Franck. À reprendre au
// caractère près : ne rien reformuler, ne rien ajouter.

export type RailCardContent = {
  title: string;
  /** Une ligne, affichée SEULEMENT dans la pile mobile REPLIÉE, sous le
   *  titre (CLAUDE.md, « Rail droit » § « Pile mobile ») — tronquée par
   *  ellipse si elle dépasse. Absente du rail desktop et de la pile
   *  dépliée, qui montrent déjà `text` en entier. */
  resume: string;
  text: string;
  /** Seul le 3ᵉ carton en a un : tout le carton devient cliquable. */
  href?: string;
};

export const railCards: [RailCardContent, RailCardContent, RailCardContent] = [
  {
    title: "Combien de temps",
    resume: "Délais des premiers résultats",
    text:
      "Le référencement met 1 à 3 mois avant les premiers résultats. Les " +
      "annonces payantes, quelques jours.",
  },
  {
    title: "Le GEO, en une phrase",
    resume: "Être cité par les IA",
    text:
      "Être cité par ChatGPT et Perplexity quand quelqu'un leur pose une " +
      "question sur votre métier.",
  },
  {
    title: "On discute ?",
    resume: "20 minutes, sans engagement",
    text:
      "20 minutes, sans engagement. On regarde votre situation, vous " +
      "repartez avec un plan.",
    href: "/contact",
  },
];
