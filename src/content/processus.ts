// Contenu réel de la section Processus (home) — « Comment on démarre »,
// fourni par Franck. À reprendre au caractère près : ne rien reformuler.

export type ProcessusStep = {
  /** Utilisé aussi comme texte des numéros dans le schéma SVG — le
   *  schéma ne rend AUCUN autre texte (ni `title` ni `description`),
   *  voir ProcessusSchemaReveal.tsx. */
  number: string;
  /** Instrument Sans 600, --t-body — même traitement que les noms des
   *  listes des pages services (CLAUDE.md, « Typographie »). */
  title: string;
  /** --t-body, --ink. Max 68 caractères de large à l'affichage. */
  description: string;
};

export const processusLabel = "PROCESSUS";
export const processusTitle = "Comment on démarre";

export const processusSteps: [ProcessusStep, ProcessusStep, ProcessusStep] = [
  {
    number: "01",
    title: "20 minutes pour comprendre votre boutique",
    description:
      "Un appel pour identifier ce qui peut vraiment faire grimper vos " +
      "ventes : visibilité sur Google, publicité, site ou temps passé " +
      "sur des tâches répétitives.",
  },
  {
    number: "02",
    title: "Un plan à votre mesure",
    description:
      "On vous propose les actions qui rapportent le plus, dans l’ordre " +
      "où elles rapportent.",
  },
  {
    number: "03",
    title: "On met en place, on ajuste",
    description:
      "On déploie les solutions qui vous font gagner du temps et de " +
      "l’argent, et on les affine au fil des résultats.",
  },
];

/** CTA sous les 3 étapes (ArrowLink, direction="right"). */
export const processusCta = { label: "Réserver 20 minutes", href: "/contact" };
