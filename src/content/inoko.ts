// Cas Inoko : les seuls chiffres de résultat du site. Collaboration passée
// (janvier à mai 2026). Le site d'Inoko n'a pas été fait par Venturia.
// Sources : Search Console d'Inoko, WooCommerce, Google Ads.
import { inokoClicks } from "./home";

export const INOKO_HREF = "/cas-inoko";

// Commandes et CA mensuel TTC (WooCommerce).
export const inokoSales = [
  { month: "Janvier", orders: 1, revenue: "1 000 €" },
  { month: "Février", orders: 2, revenue: "1 640 €" },
  { month: "Mars", orders: 9, revenue: "6 811 €" },
  { month: "Avril", orders: 13, revenue: "9 521 €" },
];

// Section courte de la home.
export const inokoHome = {
  label: "Cas client, Inoko",
  title: "De 1 à 13 commandes par mois pour Inoko.",
  story: [
    {
      label: "Avant",
      period: "Janvier 2026",
      text: "Inoko vend du mobilier modulable pour van. La boutique réalisait une vente par mois, via Leboncoin, son seul canal.",
    },
    {
      label: "Ce qu’on a fait",
      period: "Janvier à avril 2026",
      text:
        "On a retravaillé ses fiches produits, créé une page pilier « lit peigne » et des articles de blog. " +
        "Puis, sur nos conseils, Inoko a lancé un kit d’aménagement van, porté par Google Ads.",
    },
    {
      label: "Résultat",
      period: "Avril 2026",
      text: "13 commandes dans le mois, pour 9 521 € de chiffre d’affaires TTC, avec des clics Google en hausse chaque mois.",
    },
  ],
  figures: [
    { value: "13", what: "commandes par mois", period: "avril 2026, contre 1 en janvier" },
    { value: "9 521 €", what: "de chiffre d’affaires mensuel TTC", period: "avril 2026, contre 1 000 € en janvier" },
    { value: "1 736", what: "clics depuis Google dans le mois", period: "mai 2026, contre 86 en décembre 2025" },
    { value: "15", what: "de ROAS sur Google Ads", period: "annonces du kit van lancées en avril 2026, rentables dès la 2e semaine" },
  ],
  link: "Lire le cas Inoko",
  transition: "Inoko partait d’un seul canal de vente. Votre boutique a son propre point de départ.",
  transitionLink: "Trouver le vôtre",
};

// Bloc Inoko de la home (repris du test 1), avec sa transition vers
// « Où en est votre boutique ? ».
export const INOKO_HOME_PHOTO = {
  src: "/images/realisations/inoko-lit-peigne-van.jpg",
  width: 1800,
  height: 2400,
  alt: "Lit peigne Inoko en contreplaqué, installé à l’arrière d’un van dont la porte latérale est ouverte",
  caption: "Le lit peigne Inoko, monté dans un van",
};

export const inokoHomeBlock = {
  label: "Cas client · janvier à mai 2026",
  title: "Inoko : de Leboncoin à Google",
  story: [
    {
      label: "Avant",
      text: "Inoko vend du mobilier modulable pour van. En janvier 2026, la marque réalisait une vente par mois via Leboncoin, son seul canal de vente.",
    },
    {
      label: "Ce qu’on a fait",
      text: "En janvier et février, on a retravaillé ses pages produits, créé une page pilier sur le thème du lit peigne et publié des articles de blog. Sur nos conseils, Inoko a ensuite lancé un kit d’aménagement van, qu’on a mis en avant avec Google Ads.",
    },
    {
      label: "Résultat",
      text: "En avril 2026, Inoko enregistrait 13 commandes dans le mois, pour 9 521 € TTC.",
    },
  ],
  figures: [
    {
      value: ["1", "13"],
      measure: "commandes par mois",
      period: "janvier → avril 2026",
      source: "WooCommerce",
    },
    {
      value: ["1 000 €", "9 521 €"],
      measure: "chiffre d’affaires mensuel TTC",
      period: "janvier → avril 2026",
      source: "WooCommerce",
    },
    {
      value: ["86", "1 736"],
      measure: "clics par mois depuis Google",
      period: "décembre 2025 → mai 2026",
      source: "Search Console",
      chart: true,
    },
    {
      value: ["15"],
      prefix: "ROAS",
      measure: "15 € de ventes pour 1 € de publicité, rentable dès la deuxième semaine",
      source: "Google Ads",
    },
  ] as InokoFigure[],
  fromTo: "à",
  link: { label: "Lire le cas Inoko", href: INOKO_HREF },
  transition: "Inoko partait d’un seul canal de vente. Et votre boutique, où en est-elle ?",
};

export type InokoFigure = {
  value: string[];
  prefix?: string;
  period?: string;
  measure: string;
  source: string;
  chart?: boolean;
};

// Page /cas-inoko.
export const inokoPage = {
  meta: {
    title: "Cas client Inoko : de 1 à 13 commandes par mois | Venturia",
    description:
      "Inoko, boutique de mobilier modulable pour van : fiches produits, page pilier, articles de blog et Google Ads. " +
      "De 1 à 13 commandes par mois entre janvier et avril 2026.",
  },
  kicker: "Cas client, Inoko, janvier à mai 2026",
  title: "Inoko : de 1 à 13 commandes par mois avec le référencement et Google Ads.",
  intro:
    "Inoko vend du mobilier modulable pour van : des lits peigne en contreplaqué. De janvier à mai 2026, " +
    "on a travaillé ses pages, sa place sur Google, puis ses annonces. Le site existait déjà : tout s’est joué sur ce qu’il disait et sur la façon dont Google le voyait.",
  figures: inokoHome.figures,

  workLabel: "Ce qu’on a fait",
  workTitle: "Le référencement d’abord, les annonces ensuite.",
  work: [
    {
      name: "Les fiches produits",
      period: "Janvier-février 2026",
      text: "Chaque fiche retravaillée pour répondre aux recherches des acheteurs.",
    },
    {
      name: "Une page pilier « lit peigne »",
      period: "Janvier-février 2026",
      text: "La page de référence sur le lit peigne, arrivée en 1re page de Google sur un mot-clé d’environ 5 000 recherches par mois.",
    },
    {
      name: "Des articles de blog",
      period: "Janvier-février 2026",
      text: "Dont un guide pour fabriquer un lit peigne, publié en janvier-février 2026.",
    },
    {
      name: "Google Ads sur le kit van",
      period: "Avril 2026",
      text:
        "Sur nos conseils, Inoko a lancé un kit d’aménagement van. Les annonces, Search uniquement, lancées " +
        "le 11 avril 2026, portaient uniquement sur ce kit.",
    },
  ],

  monthsLabel: "Mois par mois",
  monthsTitle: "Comment les chiffres sont arrivés.",
  months: [
    {
      month: "Décembre 2025",
      title: "Le point de référence",
      text:
        "Avant le début du travail, le site reçoit 86 clics depuis Google dans le mois, pour une position " +
        "moyenne de 23,5.",
      stats: [
        { value: "86", what: "clics depuis Google" },
        { value: "23,5", what: "position moyenne" },
      ],
    },
    {
      month: "Janvier 2026",
      title: "Le départ",
      text:
        "Inoko vend une fois par mois, via Leboncoin, son seul canal de vente : 1 commande, 1 000 € de chiffre " +
        "d’affaires TTC. Le chantier de référencement démarre et se poursuit en février : fiches produits " +
        "retravaillées, page pilier « lit peigne », articles de blog. Google envoie 204 clics, la position moyenne passe à 14,5.",
      stats: [
        { value: "1", what: "commande" },
        { value: "1 000 €", what: "de CA TTC" },
        { value: "204", what: "clics depuis Google" },
        { value: "14,5", what: "position moyenne" },
      ],
    },
    {
      month: "Février 2026",
      title: "Les premiers effets",
      text:
        "Parmi les articles publiés en janvier-février 2026, un guide pour fabriquer un lit peigne. Les clics " +
        "passent à 304, la position moyenne à 13,7. La boutique enregistre 2 commandes, pour 1 640 € TTC.",
      stats: [
        { value: "2", what: "commandes" },
        { value: "1 640 €", what: "de CA TTC" },
        { value: "304", what: "clics depuis Google" },
        { value: "13,7", what: "position moyenne" },
      ],
    },
    {
      month: "Mars 2026",
      title: "Le décollage",
      text:
        "Les clics depuis Google atteignent 590 dans le mois, la position moyenne 10,7. Les commandes suivent : " +
        "9 au total, pour 6 811 € TTC.",
      stats: [
        { value: "9", what: "commandes" },
        { value: "6 811 €", what: "de CA TTC" },
        { value: "590", what: "clics depuis Google" },
        { value: "10,7", what: "position moyenne" },
      ],
    },
    {
      month: "Avril 2026",
      title: "Google Ads prend le relais",
      text:
        "Sur nos conseils, Inoko a lancé un kit d’aménagement van. Le référencement en place, on lance le 11 avril " +
        "des annonces Google Ads, Search uniquement, consacrées à ce seul kit. Elles sont rentables dès la deuxième " +
        "semaine, avec un ROAS de 15 : chaque euro dépensé en annonces a rapporté 15 € de chiffre d’affaires. " +
        "Le mois se termine à 13 commandes et 9 521 € TTC, avec 1 016 clics naturels et une position moyenne de 8,8.",
      stats: [
        { value: "13", what: "commandes" },
        { value: "9 521 €", what: "de CA TTC" },
        { value: "15", what: "de ROAS Google Ads" },
        { value: "8,8", what: "position moyenne" },
      ],
    },
    {
      month: "Mai 2026",
      title: "La fin de la collaboration",
      text:
        "Google envoie 1 736 clics au site dans le mois, contre 86 en décembre 2025. La position moyenne " +
        "atteint 7,6, contre 23,5 au départ.",
      stats: [
        { value: "1 736", what: "clics depuis Google" },
        { value: "7,6", what: "position moyenne" },
      ],
    },
  ],

  positionsLabel: "Positions sur Google",
  positionsTitle: "Là où les acheteurs cherchent.",
  positions: [
    {
      value: "23,5 → 7,6",
      what: "position moyenne du site sur Google, de décembre 2025 à mai 2026 (moyenne mensuelle pondérée par les impressions)",
    },
    { value: "3", what: "fiches produits en 1re position sur Google" },
    { value: "1re page", what: "pour la page pilier « lit peigne », sur un mot-clé d’environ 5 000 recherches par mois" },
  ],

  capturesLabel: "Captures",
  chartTitle: "Clics depuis Google",
  chartMeta: "Export Search Console, décembre 2025 à mai 2026",
  screenCaption: "Rapport Performances de la Search Console d’Inoko.",

  sources:
    "Sources : Search Console d’Inoko (clics et positions), WooCommerce (commandes et chiffre d’affaires), " +
    "Google Ads (ROAS). Inoko a donné son accord écrit pour publier ces chiffres et ces captures.",

  ctaTitle: "Et si la prochaine histoire était celle de votre boutique ?",
  ctaText: "Un appel de 20 minutes pour regarder votre point de départ et les premiers leviers à activer.",
  cta: "Réserver mon appel",
};

export { inokoClicks };
