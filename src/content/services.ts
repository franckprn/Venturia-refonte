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
  /** --t-title, Bricolage Grotesque 600, avec `name` (pas de style propre). */
  number: string;
  /** --t-title, Bricolage Grotesque 600. */
  name: string;
  /** Phrase courte, --t-body, moitié gauche. */
  phrase: string;
  /** Paragraphe, --t-body, moitié droite. */
  paragraph: string;
  href: string;
};

export const servicesLabel = "EXPERTISES";
export const servicesTitle = "Quatre façons de travailler ensemble";

/** Libellé du lien de chaque ligne, identique pour les 4 services. */
export const servicesLinkLabel = "En savoir plus";

export const services: [Service, Service, Service, Service] = [
  {
    number: "01",
    name: "Référencement",
    phrase: "Être trouvé sur Google, et cité par les IA.",
    paragraph:
      "On retravaille vos pages et leur organisation pour que Google les comprenne et les place plus haut sur les recherches de vos clients. On soigne aussi ce qui s'affiche dans les résultats, pour que les internautes cliquent chez vous plutôt qu'à côté. Résultat : plus de visites utiles, et plus de commandes.",
    href: "/services/referencement",
  },
  {
    number: "02",
    name: "Publicité",
    phrase: "Plus de commandes, sans attendre.",
    paragraph:
      "On crée et on pilote vos campagnes pour vous montrer au bon moment : sur Google quand vos clients cherchent ce que vous vendez, sur Instagram et Facebook quand ils font défiler leur fil. On ajuste vos annonces chaque jour et on concentre le budget sur ce qui vend, pour que chaque euro investi rapporte le plus possible.",
    href: "/services/publicite",
  },
  {
    number: "03",
    name: "Site internet",
    phrase: "Un site à votre image, pensé pour convertir.",
    paragraph:
      "On commence par vous écouter : votre histoire, vos valeurs, ce qui rend vos produits uniques. On en fait un site qui les met en valeur avec les bons arguments, et un parcours pensé pour que vos visiteurs restent, comparent et deviennent vos clients.",
    href: "/services/site-internet",
  },
  {
    number: "04",
    name: "Automatisation",
    phrase: "Ce qui vous prend du temps se fait tout seul.",
    paragraph:
      "On relie vos outils entre eux pour automatiser ces étapes, par exemple la mise à jour de vos fiches produits ou l'envoi d'emails à vos clients au bon moment. L'IA s'y ajoute là où elle apporte un vrai plus, pour rédiger, trier ou répondre. Ces étapes tournent en arrière-plan, et votre temps va à ce qui fait grandir votre activité.",
    href: "https://venturia.fr/services/automations/",
  },
];
