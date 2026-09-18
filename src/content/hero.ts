// Contenu réel du hero (home), fourni par Franck. À reprendre au
// caractère près : ne rien reformuler, ne rien ajouter.

export type HeroContent = {
  /** Les deux premiers mots du <h1> sont en --accent (voir HeroReveal). */
  titleAccent: string;
  /** Reste de la première ligne du <h1>, après le segment en accent. */
  titleLine1Rest: string;
  /** Seconde ligne du <h1>. Le saut est un <br /> explicite dans
   *  HeroReveal, aux deux largeurs — pas laissé au navigateur. */
  titleLine2: string;
  /** Les deux lignes du sous-titre : le saut est explicite, pas laissé
   *  au navigateur (voir le <br /> dans HeroReveal). */
  subtitleLine1: string;
  subtitleLine2: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

export const hero: HeroContent = {
  titleAccent: "Bien plus",
  titleLine1Rest: "que",
  titleLine2: "du référencement",
  subtitleLine1: "On développe la visibilité de votre site.",
  subtitleLine2: "Vous, vous voyez arriver des commandes.",
  ctaPrimary: {
    label: "Comment améliorer mon référencement ?",
    href: "/contact",
  },
  ctaSecondary: {
    label: "Ce que ça donne concrètement",
    href: "/realisations",
  },
};
