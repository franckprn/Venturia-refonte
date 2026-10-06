// Contenu provisoire du bloc de fin de page (CTA + footer), fourni par
// Franck. À faire valider avant mise en ligne.
//
// `isLink` par entrée : true → rendu en <Link>, false → rendu en
// <span> (la page n'existe pas encore, un lien mort est pire qu'un
// texte simple). Pour rebasculer une entrée en lien plus tard, il
// suffit de passer son booléen à true — rien d'autre à changer dans
// Footer.tsx.

export type FooterLinkEntry = {
  label: string;
  href: string;
  isLink: boolean;
};

export type FooterLinkColumn = {
  title: string;
  entries: FooterLinkEntry[];
};

export const footer = {
  linkColumns: [
    {
      title: "SERVICES",
      entries: [
        { label: "Référencement", href: "/services/seo", isLink: false },
        { label: "Publicité", href: "/services/sea", isLink: true },
        { label: "Site internet", href: "/services/site-internet", isLink: false },
        { label: "Automatisation", href: "/services/automations", isLink: true },
      ],
    },
    {
      title: "SECTEURS",
      entries: [
        { label: "E-commerce", href: "/secteurs/e-commerce", isLink: false },
        {
          label: "Marques artisanales",
          href: "/secteurs/marques-artisanales",
          isLink: false,
        },
      ],
    },
    {
      title: "VENTURIA",
      entries: [
        { label: "Réalisations", href: "/realisations", isLink: true },
        { label: "À propos", href: "/a-propos", isLink: true },
        { label: "Contact", href: "/contact", isLink: true },
      ],
    },
  ] as [FooterLinkColumn, FooterLinkColumn, FooterLinkColumn],

  address: {
    title: "ADRESSE",
    city: "Toulouse, France",
    coverage: "France et Belgique",
  },

  giantTitle: {
    /** Déjà en capitales : convention du projet, jamais de text-transform
     *  CSS. Coupé en 2 lignes, un <br/> EXPLICITE entre les deux (Footer.tsx)
     *  — jamais laissé au navigateur (comme le h1 du Hero, CLAUDE.md « Bloc
     *  de fin ») : à toute largeur dès 1024px, `line1` doit tenir sur une
     *  seule ligne (c'est elle qui calibre --mass-title-cqi,
     *  footer.module.css) et `line2` (plus courte) tient alors forcément
     *  aussi sur la sienne. */
    line1: "ON PEUT VOUS",
    line2: "AIDER",
    /** Rendu séparément, en fin de line2 — voir Footer.tsx. */
    mark: "?",
  },

  legal: {
    copyright: "© 2026 Venturia",
    legalNotice: { label: "Mentions légales", href: "/mentions-legales" },
    privacy: { label: "Confidentialité", href: "/confidentialite" },
  },
};

export type FooterContent = typeof footer;
