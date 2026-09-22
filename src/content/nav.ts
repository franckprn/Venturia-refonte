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
};

// Méga-menu desktop, colonne SERVICES : les 4 services, dans le même
// ordre que la section Services de la home (Référencement, Publicité,
// Site internet, Automatisation).
const SERVICES_ENTRIES: NavEntry[] = [
  { label: "Référencement", href: "/services/referencement", isLink: false },
  { label: "Publicité", href: "/services/publicite", isLink: false },
  { label: "Site internet", href: "/services/site-internet", isLink: false },
  { label: "Automatisation", href: "/services/automatisation-n8n", isLink: false },
];

export const nav = {
  trigger: "Services",

  /** aria-label de la <nav> qui regroupe le déclencheur du méga-menu et
   *  les entrées de premier niveau (Nav.tsx). */
  ariaLabel: "Navigation principale",
  /** aria-label du lien logo, retour à l'accueil (Nav.tsx). */
  logoAriaLabel: "Venturia, retour à l'accueil",

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
        label: "Marques artisanales",
        href: "/secteurs/marques-artisanales",
        isLink: false,
      },
    ],
  } as NavColumn,

  // Photo (image + imageAlt) volontairement absente d'ici : reprise
  // directement de content/realisations.ts (même cas client, section
  // « Dernier accompagnement ») par MegaMenu.tsx, pour ne jamais avoir
  // deux chemins de fichier à faire évoluer ensemble.
  caseStudyTitle: "CAS CLIENT",
  caseStudy: {
    clientName: "Inoko",
    subtitle: "Mobilier de van, Toulouse",
    tags: ["SEO", "GOOGLE ADS"],
    href: "/realisations/inoko",
    isLink: false,
  } as NavCaseStudy,

  mobile: {
    triggerLabel: "Menu",
    /** Remplace triggerLabel sur le déclencheur pendant que le panneau
     *  est ouvert (CLAUDE.md, « Menu mobile » § 1). */
    closeLabel: "Fermer",
    /** Pas d'entrée dédiée pour « À propos » ailleurs dans ce fichier
     *  (contrairement à Réalisations/Contact, repris de `topLinks` plus
     *  bas pour ne pas dupliquer leur libellé). */
    aboutLabel: "À propos",
    city: "Toulouse",
  },
};
