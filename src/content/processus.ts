// Contenu réel de la section Processus (home), fourni par Franck. À
// reprendre au caractère près : ne rien reformuler.

export type ProcessusStep = {
  /** Utilisé aussi comme texte des numéros dans le schéma SVG — le
   *  schéma ne rend AUCUN autre texte (ni `label` ni `description`),
   *  voir ProcessusSchemaReveal.tsx. */
  number: string;
  /** --t-mono, --ink. Écrit en capitales dans le contenu (pas de
   *  text-transform CSS). */
  label: string;
  /** --t-body, --ink. Max 68 caractères de large à l'affichage. */
  description: string;
};

export const processusLabel = "PROCESSUS";
export const processusTitle = "De votre premier message aux premiers résultats";

export const processusSteps: [ProcessusStep, ProcessusStep, ProcessusStep] = [
  {
    number: "01",
    label: "VOTRE SITE",
    description:
      "Vous nous envoyez votre site et votre objectif. On l'étudie " +
      "avant de vous appeler.",
  },
  {
    number: "02",
    label: "L'APPEL",
    description:
      "En 20 minutes, on vous explique ce qu'on ferait sur votre " +
      "boutique, dans quel ordre, et quand arrivent les premiers résultats.",
  },
  {
    number: "03",
    label: "LE SUIVI",
    description:
      "Vous suivez vos chiffres sur un tableau de bord partagé, et " +
      "vous recevez chaque mois un rapport détaillé.",
  },
];
