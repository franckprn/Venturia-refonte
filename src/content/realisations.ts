// Contenu réel de la section « Dernier accompagnement » (home), fourni
// par Franck. Ne pas compléter, ne pas reformuler, ne rien arrondir.
//
// Chaque chiffre est un NOMBRE, pas une chaîne préformatée : le
// compteur (DernierAccompagnementReveal) anime cette valeur, et
// formatFigureValue() est le seul endroit qui décide comment elle
// s'affiche — le HTML initial et le compteur en cours d'animation
// passent tous les deux par cette fonction, donc ils rendent toujours
// la même chose. Le séparateur de milliers est une espace fine
// insécable (U+202F), jamais une espace normale.

export type RealisationFigure = {
  /** Compte de 0 à cette valeur à l'entrée dans le viewport. */
  value: number;
  /** Texte avant le nombre (ex. « × »). */
  prefix?: string;
  /** Texte après le nombre (ex. « € »). */
  suffix?: string;
  /** --t-small, --ink. Max 2 lignes à l'affichage. */
  caption: string;
};

export type RealisationsContent = {
  /** --t-mono, --accent. Écrit en capitales dans le contenu (pas de
   *  text-transform CSS). */
  label: string;
  /** --t-title, --ink. */
  title: string;
  /** Paragraphe affiché sous le titre, avec le style de paragraphe
   *  existant du site (voir .paragraph, dernier-accompagnement.module.css).
   *  Mise en page provisoire : la mise en page dédiée de cette section
   *  fera l'objet d'un prompt suivant. */
  paragraph: string;
  /** Les deux tags posés sur le visuel. */
  tags: [string, string];
  figures: [RealisationFigure, RealisationFigure, RealisationFigure];
  /** Libellé du lien (sans la flèche : elle est en SVG, voir
   *  DernierAccompagnement.tsx). */
  linkLabel: string;
  linkHref: string;
  /** false → rendu en <span> (DernierAccompagnement.tsx) tant que
   *  `/realisations/inoko` n'existe pas — même convention isLink que
   *  content/nav.ts/content/footer.ts, un lien mort est pire qu'un
   *  texte simple. */
  linkIsLink: boolean;
  /** Chemin public de l'image (next/image). Absente pour l'instant. */
  image?: string;
  /** alt en français, ce que montrera la photo une fois fournie. */
  imageAlt: string;
};

export const realisations: RealisationsContent = {
  label: "ACCOMPAGNEMENT",
  title: "Inoko — Mobilier pour van à Toulouse",
  paragraph:
    "En janvier, Inoko faisait une vente par mois via Leboncoin, son seul " +
    "canal de vente. On a retravaillé ses pages produits les plus " +
    "recherchées et créé une page de référence sur le lit peigne : " +
    "trois produits sont passés premiers sur Google, et les commandes " +
    "ont afflué. Ensuite, on a lancé des campagnes Google Ads, rentables " +
    "dès la deuxième semaine.",
  tags: ["SEO", "GOOGLE ADS"],
  figures: [
    {
      value: 12,
      prefix: "×",
      caption: "COMMANDES MENSUELLES",
    },
    {
      value: 10000,
      suffix: " €",
      caption: "DE CHIFFRE D'AFFAIRES MENSUEL, CONTRE 1 000 € AU DÉPART",
    },
    {
      value: 15,
      suffix: " €",
      caption: "DE CHIFFRE D'AFFAIRES POUR 1 € INVESTI EN GOOGLE ADS",
    },
  ],
  linkLabel: "Voir comment",
  linkHref: "/realisations/inoko",
  linkIsLink: false,
  image: "/images/realisations/inoko-mobilier-van-toulouse.jpg",
  imageAlt: "Mobilier modulable Inoko installé dans un van, à Toulouse",
};

/** Formate un chiffre exactement comme il doit apparaître à l'écran. */
export function formatFigureValue(
  figure: Pick<RealisationFigure, "value" | "prefix" | "suffix">,
): string {
  const grouped = Math.round(figure.value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${figure.prefix ?? ""}${grouped}${figure.suffix ?? ""}`;
}
