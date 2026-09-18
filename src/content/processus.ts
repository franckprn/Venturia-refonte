// Contenu provisoire de la section Processus (home) — à faire valider
// par Franck avant mise en ligne.

export type ProcessusStep = {
  /** Utilisé aussi comme texte des numéros dans le schéma SVG. */
  number: string;
  /** --t-mono, --ink. Écrit en capitales dans le contenu (pas de
   *  text-transform CSS). */
  label: string;
  /** --t-body, --ink. Max 68 caractères de large à l'affichage. */
  description: string;
};

export const processusLabel = "PROCESSUS";
export const processusTitle =
  "De la première conversation aux premières commandes";

export const processusSteps: [ProcessusStep, ProcessusStep, ProcessusStep] = [
  {
    number: "01",
    label: "STRATÉGIE",
    description:
      "On regarde ce que vos concurrents captent et ce que votre site " +
      "laisse passer. Vous repartez avec un plan écrit.",
  },
  {
    number: "02",
    label: "DÉVELOPPEMENT",
    description:
      "Le site, le référencement, les automatisations. Vous voyez " +
      "avancer chaque semaine.",
  },
  {
    number: "03",
    label: "CROISSANCE",
    description:
      "Une fois que ça marche, on augmente le volume. C'est l'étape la " +
      "plus longue, et c'est celle qui rapporte.",
  },
];
