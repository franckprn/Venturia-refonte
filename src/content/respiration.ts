// Contenu réel de la section Respiration (home), fourni par Franck. À
// reprendre au caractère près : ne rien reformuler.
//
// Une seule phrase, en trois segments pour isoler les deux derniers mots
// (« passer commande », point exclu) qui portent l'emphase — voir
// RespirationReveal et respiration.module.css § .accent.

export type RespirationContent = {
  /** --t-hero, --ground. */
  before: string;
  /** --t-hero, --ground, emphase (soulignement — voir .accent). */
  accent: string;
  /** --t-hero, --ground. */
  after: string;
};

export const respiration: RespirationContent = {
  before:
    "Chaque jour, des gens cherchent sur Google exactement ce que vous " +
    "vendez. On les amène sur votre boutique, et on leur donne toutes " +
    "les raisons d'y ",
  accent: "passer commande",
  after: ".",
};
