// Contenu de la nav et du méga-menu (desktop + mobile), fourni par
// Franck / dérivé de CLAUDE.md. À reprendre au caractère près.
//
// `isLink` par entrée : true → rendu en <Link>, false → rendu en
// <span> (la page n'existe pas encore, un lien mort est pire qu'un
// texte simple) — même convention que content/footer.ts. Pour
// rebasculer une entrée en lien plus tard, il suffit de passer son
// booléen à true.

export type NavEntry = {
  label: string;
  href: string;
  isLink: boolean;
};

export type NavColumn = {
  title: string;
  entries: NavEntry[];
};

export type NavCaseStudy = {
  clientName: string;
  subtitle: string;
  tags: [string, string];
  href: string;
  isLink: boolean;
  /** Chemin public de l'image (next/image). Absente pour l'instant. */
  image?: string;
  imageAlt: string;
};

// Contenu du CLAUDE.md, « Méga-menu — desktop » : trois services
// seulement dans cette colonne (pas Publicité) — différent, à dessein,
// de la colonne SERVICES du footer qui en liste quatre.
const SERVICES_ENTRIES: NavEntry[] = [
  { label: "Référencement", href: "/services/referencement", isLink: false },
  { label: "Site internet", href: "/services/site-internet", isLink: false },
  { label: "Automatisation", href: "/services/automatisation-n8n", isLink: false },
];

export type MobileMenuItem =
  | { type: "accordion"; label: string; entries: NavEntry[] }
  | { type: "link"; label: string; href: string; isLink: boolean };

export const nav = {
  brand: "Venturia",
  trigger: "Ce que je fais",

  topLinks: [
    { label: "Réalisations", href: "/realisations", isLink: true },
    { label: "Contact", href: "/contact", isLink: true },
  ] as NavEntry[],

  servicesColumn: {
    title: "SERVICES",
    entries: SERVICES_ENTRIES,
  } as NavColumn,

  secteursColumn: {
    title: "SECTEURS",
    entries: [
      { label: "E-commerce", href: "/secteurs/e-commerce", isLink: false },
      {
        label: "Professions artisanales",
        href: "/secteurs/professions-artisanales",
        isLink: false,
      },
    ],
  } as NavColumn,

  caseStudyTitle: "CAS CLIENT",
  caseStudy: {
    clientName: "Inoko",
    subtitle: "Mobilier de van, Toulouse",
    tags: ["SEO", "GOOGLE ADS"],
    href: "/realisations/inoko",
    isLink: false,
    imageAlt: "Mobilier modulable Inoko installé dans un van, à Toulouse",
  } as NavCaseStudy,

  mobile: {
    triggerLabel: "Menu",
    items: [
      { type: "accordion", label: "Services", entries: SERVICES_ENTRIES },
      { type: "link", label: "Réalisations", href: "/realisations", isLink: true },
      { type: "link", label: "À propos", href: "/a-propos", isLink: true },
    ] as MobileMenuItem[],
    city: "Toulouse",
    writeLabel: "M'écrire",
    writeHref: "/contact",
    /** Pas de vrai numéro fourni : placeholder visible, jamais inventé. */
    phonePlaceholder: "[TÉLÉPHONE À FOURNIR]",
  },
};
