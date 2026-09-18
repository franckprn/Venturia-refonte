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
  contact: {
    label: "CONTACT",
    lines: [
      "Dites-nous ce que vous voulez construire.",
      "On répond dans la journée.",
    ] as [string, string],
    write: { label: "Nous écrire", href: "/contact" },
    email: { label: "hey@venturia.fr", href: "mailto:hey@venturia.fr" },
  },

  linkColumns: [
    {
      title: "SERVICES",
      entries: [
        { label: "Référencement", href: "/services/referencement", isLink: false },
        { label: "Publicité", href: "/services/google-ads", isLink: false },
        { label: "Site internet", href: "/services/site-internet", isLink: false },
        { label: "Automatisation", href: "/services/automatisation-n8n", isLink: false },
      ],
    },
    {
      title: "SECTEURS",
      entries: [
        { label: "E-commerce", href: "/secteurs/e-commerce", isLink: false },
        {
          label: "Professions artisanales",
          href: "/secteurs/professions-artisanales",
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
    coverage: "Interventions partout en France et en Belgique",
  },

  giantTitle: {
    /** Déjà en capitales : convention du projet, jamais de text-transform CSS. */
    text: "ON PEUT VOUS AIDER",
    /** Rendu séparément, en --accent — voir Footer.tsx. */
    mark: "?",
  },

  cta: {
    label: "Réserver 20 minutes",
    href: "/contact",
  },

  legal: {
    copyright: "© 2026 Venturia",
    legalNotice: { label: "Mentions légales", href: "/mentions-legales" },
    privacy: { label: "Confidentialité", href: "/confidentialite" },
  },
};

export type FooterContent = typeof footer;
