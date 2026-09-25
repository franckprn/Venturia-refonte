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
  /** Sous-titre, une seule phrase (plus de second CTA « Comment
   *  améliorer mon référencement ? », retiré — voir CLAUDE.md § 1). */
  subtitle: string;
  ctaSecondary: { label: string; href: string };
  /** Texte alternatif de la photo du Hero (jamais en dur dans le JSX —
   *  CLAUDE.md, « Hero (home) »). */
  photoAlt: string;
};

export const hero: HeroContent = {
  titleAccent: "Bien plus",
  titleLine1Rest: "que",
  titleLine2: "du référencement",
  subtitle:
    "On fait venir les bons visiteurs sur votre boutique en ligne, et on les accompagne jusqu'à la commande.",
  ctaSecondary: {
    label: "Ce que ça donne concrètement",
    href: "/realisations",
  },
  photoAlt: "Ordinateur portable ouvert sur Google Search Console",
};
