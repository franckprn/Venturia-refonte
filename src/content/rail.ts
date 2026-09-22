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
      "Le référencement demande quelques mois : chez Inoko, les " +
      "commandes ont afflué dès le quatrième mois. La publicité, elle, " +
      "peut être rentable en deux semaines.",
  },
  {
    title: "Le GEO, en une phrase",
    resume: "Être cité par les IA",
    text:
      "Être cité par ChatGPT et Perplexity quand quelqu'un leur pose " +
      "une question sur ce que vous vendez.",
  },
  {
    title: "On discute ?",
    resume: "20 minutes, sans engagement",
    text:
      "20 minutes, sans engagement. On étudie votre site avant l'appel, " +
      "puis on vous dit ce qu'on ferait, dans quel ordre.",
    href: "/contact",
  },
];

/** aria-label du bouton de dépliage et de la région dépliée de la pile
 *  mobile (MobileRailStack.tsx) — texte non affiché, lu seulement par
 *  les technologies d'assistance. */
export const railStackLabels = {
  /** Complété par le titre du carton du dessus (« Voir plus : {titre} »). */
  togglePrefix: "Voir plus : ",
  expandedRegion: "Repères, dépliés",
};
