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
        { label: "Référencement", href: "/services/seo", isLink: true },
        { label: "Publicité", href: "/services/sea", isLink: true },
        { label: "Site internet", href: "/services/creation-site", isLink: true },
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
        // Pages pas encore publiées : isLink: false → <span>.
        { label: "Réalisations", href: "/realisations", isLink: false },
        { label: "Blog", href: "/blog", isLink: true },
        { label: "À propos", href: "/a-propos", isLink: false },
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
     *  CSS. Sous 1024px : 2 lignes, un <br/> EXPLICITE entre les deux
     *  (Footer.tsx) — jamais laissé au navigateur (comme le h1 du Hero) :
     *  `line1` tient sur une seule ligne à --t-hero. Dès 1024px : le <br/>
     *  est masqué, `line1` et `line2` forment UNE ligne calibrée sur 98 %
     *  des colonnes 1-12 (footer.module.css, CLAUDE.md « Bloc de fin ») —
     *  à recalibrer si ce texte change. */
    line1: "ON PEUT VOUS",
    line2: "AIDER",
    /** Rendu séparément, en fin de line2 — voir Footer.tsx. */
    mark: "?",
  },

  legal: {
    copyright: "© 2026 Venturia",
    // Pages pas encore publiées : même convention isLink que les
    // colonnes de liens ci-dessus (FooterLinkEntry) — <span> tant que
    // false (Footer.tsx).
    legalNotice: { label: "Mentions légales", href: "/mentions-legales", isLink: false },
    privacy: { label: "Confidentialité", href: "/politique-de-confidentialite", isLink: false },
  } satisfies { copyright: string; legalNotice: FooterLinkEntry; privacy: FooterLinkEntry },
};

export type FooterContent = typeof footer;
