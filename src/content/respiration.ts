// Contenu réel de la section Respiration (home), fourni par Franck. À
// reprendre au caractère près : ne rien reformuler. Chaque bloc est un
// tableau de lignes — le découpage est le <br /> voulu, pas un point
// de coupe laissé au navigateur (voir RespirationReveal).

export type RespirationContent = {
  block1: {
    /** --t-hero, --ground. */
    line1: string;
    /** Seconde ligne desktop (>=768px). En dessous de 768px, elle se
     *  scinde en deux à cet endroit précis (un <br /> conditionnel en
     *  media query, voir RespirationReveal) — le point de coupe est
     *  fixé par Franck, pas par le navigateur, et diffère volontairement
     *  du desktop. Le texte n'est jamais dupliqué dans le DOM. */
    line2Before: string;
    line2After: string;
  };
  /** --t-lead, --ground à 80 %. Deux lignes. */
  block2: [string, string];
  /** --t-hero, --ground, une seule ligne. « accent » est en --accent. */
  block3: { before: string; accent: string; after: string };
};

export const respiration: RespirationContent = {
  block1: {
    line1: "Le référencement",
    line2Before: "amène les",
    line2After: "visiteurs.",
  },
  block2: [
    "Le site les convertit,",
    "les automatisations traitent le reste.",
  ],
  block3: { before: "On fait ", accent: "les trois", after: "." },
};
