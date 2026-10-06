// Contenu de la section Services (home). Chaque ligne se termine par un
// lien explicite (ArrowLink, direction="right") vers sa page
// /services/* — voir CLAUDE.md « Services (home) » § « Lien "Découvrir
// …" » pour l'exception qui autorise ce lien avant que ces pages
// existent réellement (elles doivent exister avant mise en ligne, voir
// « AVANT MISE EN LIGNE »).
//
// L'adresse de l'Automatisation (04) est l'adresse RÉELLE de la page en
// ligne aujourd'hui (trafic Google existant) — donnée par Franck,
// jamais devinée : /services/automations, SANS barre finale (Google
// l'indexe ainsi ; trailingSlash reste au défaut de Next.js, non
// configuré — CLAUDE.md, « Pages services — gabarit »).
// Chemin relatif (pas https://venturia.fr/...) : ce site EST venturia.fr,
// un lien absolu vers son propre domaine sortirait inutilement du
// routeur Next.js (rechargement complet plutôt qu'une navigation
// client). Les trois autres sont provisoires (pages à créer).

export type Service = {
  /** --t-title, Bricolage Grotesque 600. */
  name: string;
  /** Phrase courte, --t-body, moitié gauche. */
  phrase: string;
  /** Paragraphes, --t-body, moitié droite — un <p> par entrée, séparés
   *  par 16px (échelle CLAUDE.md, « Shell de page »), voir
   *  services.module.css .paragraphs. */
  paragraphs: string[];
  /** Texte du lien explicite sous les paragraphes (ArrowLink,
   *  direction="right") — jamais en dur dans le JSX. Verbatim, donné
   *  par Franck. */
  ctaLabel: string;
  href: string;
  /** Page réellement publiée aujourd'hui ou non — lu par l'accordéon
   *  Services du menu mobile (MegaMenu.tsx, CLAUDE.md « Menu mobile ») :
   *  true → <Link>, false → <span>, même convention que NavEntry
   *  (content/nav.ts) et FooterLinkEntry (content/footer.ts). Sans
   *  incidence sur la section Services de la home (ServicesRowsReveal.tsx,
   *  « Services (home) ») : son lien « Découvrir… » reste un vrai <a>
   *  pour les 4, exception déjà assumée et documentée. */
  isLink: boolean;
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
    ctaLabel: "Découvrir le référencement",
    href: "/services/seo",
    isLink: true,
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
    ctaLabel: "Découvrir la publicité",
    href: "/services/sea",
    isLink: false,
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
    ctaLabel: "Découvrir la création de site",
    href: "/services/creation-site",
    isLink: true,
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
    ctaLabel: "Découvrir l'automatisation",
    href: "/services/automations",
    isLink: true,
  },
];
