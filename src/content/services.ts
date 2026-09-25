// Contenu de la section Services (home). Chaque ligne pointe vers sa
// page /services/* — voir CLAUDE.md « Services (home) » § « Lien "En
// savoir plus →" » pour l'exception qui autorise ce lien avant que ces
// pages existent réellement (elles doivent exister avant mise en
// ligne, voir « AVANT MISE EN LIGNE »).
//
// L'adresse de l'Automatisation (04) est l'adresse RÉELLE de la page en
// ligne aujourd'hui (trafic Google existant) — donnée par Franck,
// jamais devinée : https://venturia.fr/services/automations/, barre
// finale comprise. Les trois autres sont provisoires (pages à créer).

export type Service = {
  /** --t-title, Bricolage Grotesque 600. Sert aussi de nom accessible au
   *  lien étiré de la ligne (aria-label) : le texte visible « En savoir
   *  plus → » a été retiré, voir ServicesRowsReveal.tsx. */
  name: string;
  /** Phrase courte, --t-body, moitié gauche. */
  phrase: string;
  /** Paragraphes, --t-body, moitié droite — un <p> par entrée, séparés
   *  par 16px (échelle CLAUDE.md, « Shell de page »), voir
   *  services.module.css .paragraphs. */
  paragraphs: string[];
  href: string;
};

export const servicesLabel = "EXPERTISES";
export const servicesTitle = "Quatre façons de travailler ensemble";

export const services: [Service, Service, Service, Service] = [
  {
    name: "Référencement",
    phrase: "Être trouvé sur Google, et cité par les IA.",
    paragraphs: [
      "On retravaille vos pages et leur organisation pour que Google " +
        "les comprenne et les place plus haut sur les recherches de vos " +
        "clients. On soigne aussi ce qui s'affiche dans les résultats, " +
        "pour que les internautes cliquent chez vous plutôt qu'à côté. " +
        "Enfin, on structure vos contenus pour que ChatGPT et Perplexity " +
        "puissent vous citer.",
      "Résultat : plus de visites utiles, et plus de commandes.",
    ],
    href: "/services/referencement",
  },
  {
    name: "Publicité",
    phrase: "Plus de commandes, sans attendre.",
    paragraphs: [
      "On crée et on pilote vos campagnes pour vous montrer au bon " +
        "moment : sur Google quand vos clients cherchent ce que vous " +
        "vendez, sur Instagram et Facebook quand ils font défiler leur fil.",
      "On ajuste vos annonces chaque jour et on concentre le budget sur " +
        "ce qui vend, pour que chaque euro investi rapporte le plus possible.",
    ],
    href: "/services/publicite",
  },
  {
    name: "Site internet",
    phrase: "Un site à votre image, pensé pour convertir.",
    paragraphs: [
      "On crée ou on reprend votre boutique, sur Shopify, WooCommerce, " +
        "PrestaShop ou en sur-mesure. On soigne ce qui fait acheter : " +
        "des fiches produits claires, des pages rapides sur mobile, un " +
        "paiement simple.",
      "Résultat : une plus grande part de vos visiteurs passe commande, " +
        "sans dépenser un euro de plus pour les faire venir.",
    ],
    href: "/services/site-internet",
  },
  {
    name: "Automatisation",
    phrase: "Des systèmes adaptés à votre façon de travailler.",
    paragraphs: [
      "On automatise ce qui se répète dans votre activité : la mise à " +
        "jour de vos fiches produits, les emails à vos clients à chaque " +
        "étape après leur commande, et d'autres tâches propres à votre " +
        "boutique.",
      "Tout est construit sur mesure, à partir des outils et des " +
        "méthodes que vous utilisez déjà : vous gardez vos habitudes, " +
        "et vous gagnez du temps.",
    ],
    href: "https://venturia.fr/services/automations/",
  },
];
