// Contenu des trois cartons du rail, fourni par Franck. À reprendre au
// caractère près : ne rien reformuler, ne rien ajouter.

export type RailCardContent = {
  title: string;
  text: string;
  /** Seul le 3ᵉ carton en a un : tout le carton devient cliquable. */
  href?: string;
};

export const railCards: [RailCardContent, RailCardContent, RailCardContent] = [
  {
    title: "Combien de temps",
    text:
      "Le référencement met 1 à 3 mois avant les premiers résultats. Les " +
      "annonces payantes, quelques jours.",
  },
  {
    title: "Le GEO, en une phrase",
    text:
      "Être cité par ChatGPT et Perplexity quand quelqu'un leur pose une " +
      "question sur votre métier.",
  },
  {
    title: "Parler du projet",
    text:
      "20 minutes, sans engagement. On regarde votre situation, vous " +
      "repartez avec un plan.",
    href: "/contact",
  },
];
