// Contenu de la home. Chiffres Inoko : seuls chiffres de résultat autorisés
// (CLAUDE.md, content/inoko.ts). Typographie appliquée au rendu par fr()
// (components/home/Ui.tsx) : espace fine insécable (U+202F) avant ? ! : ;
// et entre les milliers, espace insécable (U+00A0) avant € et %.
import type { ART } from "./paintings";

export const CONTACT_HREF = "/contact";
export const EMAIL = "hey@venturia.fr";
// Tous les boutons de réservation du site pointent ici.
export const BOOKING_URL = "https://cal.com/venturia/premier-echange";

// Hero. Le titre est découpé en lignes (une ligne par masque d'animation) ;
// le H1 se lit d'une traite : « Studio e-commerce Plus de commandes pour votre boutique. »
export const hero = {
  kicker: "Studio e-commerce",
  titleLines: ["Plus de commandes", "pour votre boutique."],
  sub:
    "On fait apparaître votre boutique sur Google et dans les réponses des IA, et nos annonces Google " +
    "la montrent aux acheteurs prêts à commander.",
  cta: "Réserver un appel de 20 min",
  write: "ou écrire à",
  // Carte Search Console posée sur le tableau (vrais chiffres Inoko).
  panel: {
    label: "Inoko",
    meta: "Search Console",
    big: "clics depuis Google en mai 2026",
    foot: "clics en décembre 2025",
  },
};

export const inokoClicks = [
  { month: "déc.", year: "2025", value: 86 },
  { month: "janv.", year: "2026", value: 204 },
  { month: "févr.", year: "2026", value: 304 },
  { month: "mars", year: "2026", value: 590 },
  { month: "avr.", year: "2026", value: 1016 },
  { month: "mai", year: "2026", value: 1736 },
];

// Séparateur de milliers : espace fine insécable (U+202F).
export function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
}

type ArtKey = keyof typeof ART;

export const services = [
  {
    id: "referencement",
    href: "/services/seo",
    art: "referencement" as ArtKey,
    name: "Référencement",
    tags: ["SEO", "GEO"],
    lead: "Être trouvé sur Google et cité par les IA.",
    text:
      "On retravaille vos pages produits, vos catégories et vos guides pour qu’ils montent dans Google " +
      "et apparaissent dans les réponses de ChatGPT et compagnie.",
  },
  {
    id: "publicite",
    href: "/services/sea",
    art: "publicite" as ArtKey,
    name: "Publicité",
    tags: ["Google Ads"],
    lead: "Chaque euro de publicité suivi jusqu’à la vente.",
    text: "On construit et on pilote vos campagnes sur les produits rentables, et on suit chaque euro investi.",
  },
  {
    id: "site",
    href: "/services/creation-site",
    art: "site" as ArtKey,
    name: "Site internet",
    tags: ["Shopify", "WooCommerce", "PrestaShop", "Next.js"],
    lead: "Une boutique où l’on achète sans hésiter.",
    text:
      "Des pages produits claires, une navigation simple et un design qui plaît : tout est pensé pour passer " +
      "de la visite à la commande. Ensuite, on l’améliore mois après mois.",
  },
  {
    id: "automatisation",
    href: "/services/automations",
    art: "automatisation" as ArtKey,
    name: "Automatisation",
    tags: ["n8n", "Serveur en Europe"],
    lead: "Les tâches répétitives confiées à des workflows.",
    text:
      "Saisir les commandes, mettre à jour le stock, envoyer des e-mails et y répondre : on automatise ce que " +
      "vous refaites chaque jour.",
  },
];

export const servicesCopy = {
  label: "Services",
  title: "Quatre leviers pour faire grandir votre boutique.",
  tagsLabel: "Outils et spécialités,",
};

// Interfaces stylisées posées sur les tableaux des services. Aucun
// chiffre : ni résultat, ni prix, ni budget (CLAUDE.md, « Images »).
export const serviceUi = {
  referencement: {
    label: "Résultat Google",
    url: "votre-boutique.fr › plaids",
    title: "Plaid en laine mérinos, 6 coloris",
    desc: "Laine douce et chaude, lavable en machine. Livraison suivie.",
    aiTag: "Aperçu IA",
    aiText: "source citée : votre-boutique.fr",
  },
  publicite: {
    label: "Google Ads",
    meta: "Campagnes Search",
    status: "Active",
    rows: ["Plaids en laine", "Coussins en lin", "Marque"],
  },
  site: {
    label: "Fiche produit",
    meta: "Shopify",
    name: "Plaid en laine mérinos",
    swatchesLabel: "Trois coloris",
    button: "Ajouter au panier",
  },
  automatisation: {
    label: "Workflow n8n",
    meta: "Actif",
    steps: ["Nouvelle commande", "Facture créée", "Stock mis à jour", "Email de suivi envoyé"],
  },
};

// Labels des en-têtes de section (filet titré). PROVISOIRES pour les
// sections reprises du test 1 : à valider par Franck.
export const sectionLabels = {
  interlude: "Notre approche",
  situations: "Votre point de départ",
  method: "Méthode",
  start: "Démarrer",
  blog: "Blog",
};

// « Vos clients cherchent déjà… » (test 1) : une phrase, à côté du Béraud.
export const interludeCopy = {
  ariaLabel: "Notre approche",
  statement:
    "Vos clients cherchent déjà ce que vous vendez. On s’assure qu’ils arrivent chez vous et qu’ils aient envie d’y acheter.",
};

// Où en est votre boutique ? (test 1)
export const situationsCopy = {
  title: "Où en est votre boutique ?",
  intro: "Quatre situations qu’on rencontre souvent chez les e-commerçants.",
  linksLabel: "Service adapté",
  items: [
    {
      situation: "Vous lancez votre boutique",
      text: "On construit le site qu’il vous faut : vos produits mis en valeur, une boutique prête à vendre dès la mise en ligne, et un référencement pensé dès le départ pour attirer vos premiers acheteurs.",
      services: [{ label: "Site internet", href: "/services/creation-site" }],
    },
    {
      situation: "Vos ventes dépendent d’un seul canal",
      text: "Une marketplace, Leboncoin ou les réseaux sociaux font toutes vos ventes. On vous ouvre Google : le référencement pour être trouvé dans la durée, Google Ads pour toucher les acheteurs dès aujourd’hui.",
      services: [
        { label: "Référencement", href: "/services/seo" },
        { label: "Publicité", href: "/services/sea" },
      ],
    },
    {
      situation: "Vos ventes plafonnent",
      text: "On commence par trouver d’où vient le blocage. Le plus souvent, la solution passe par le référencement et l’architecture du site.",
      services: [{ label: "Référencement", href: "/services/seo" }],
    },
    {
      situation: "Les tâches répétitives vous prennent vos journées",
      text: "Les tâches chronophages vous prennent des heures chaque semaine : on les automatise, pour que vous vous concentriez sur votre boutique.",
      services: [{ label: "Automatisation", href: "/services/automations" }],
    },
  ],
};

// Avis Google, recopiés mot pour mot (seules les apostrophes et les
// espaces typographiques changent) : un paragraphe par ligne de l’avis.
// Entreprise, date et note : affichées seulement quand Franck les fournit.
// `placeholder: true` : texte provisoire, affiché avec la mention « Avis
// provisoire », jamais en production (voir publishedReviews ci-dessous).
export type Review = {
  text: string[];
  author: string;
  company?: string;
  date?: string;
  rating?: number;
  placeholder?: boolean;
};

export const reviews: Review[] = [
  {
    text: [
      "Service remarquable.",
      "Nous avons contractualisé en janvier dernier, nous sommes impressionnés des résultats, les clics organiques ont doublés ! Nous sommes ravis d’avoir sollicité Franck.",
    ],
    author: "Aiko Gary Blaze",
    date: "2026",
    rating: 5,
  },
];

// Build de production (Vercel, VERCEL_ENV=production, ou
// VENTURIA_PRODUCTION=1 ailleurs) : les avis provisoires sont écartés.
// Sans avis publié, la section disparaît de la page.
const IS_PRODUCTION = process.env.VERCEL_ENV === "production" || process.env.VENTURIA_PRODUCTION === "1";

export const publishedReviews = reviews.filter((r) => !(r.placeholder && IS_PRODUCTION));

export const reviewsCopy = {
  label: "Avis Google",
  title: "Ce que nos clients en disent.",
  source: "Avis Google",
  placeholderTag: "Avis provisoire",
  ratingLabel: (n: number) => `${n} étoiles sur 5`,
};

// Comment on travaille (test 1). Le rapport mensuel est une interface
// sans aucun chiffre : libellés et barres sans valeurs.
export const methodCopy = {
  title: "Comment on travaille",
  intro: "Deux formules selon votre besoin, et un suivi qui vous dit chaque mois où en sont vos ventes.",
  formulas: [
    {
      name: "Mission ponctuelle",
      text: "Un besoin précis, un livrable : une boutique à créer, des pages produits à retravailler, une automatisation à mettre en place.",
      term: "Sans engagement",
    },
    {
      name: "Accompagnement mensuel",
      text: "On pilote vos leviers mois après mois : référencement, Google Ads, site ou automatisations, selon ce que vous avez choisi.",
      term: "Engagement de 6 mois minimum",
    },
  ],
  followTitle: "Le suivi, chaque mois",
  follow: [
    { title: "Un tableau de bord en ligne", text: "Vos chiffres, consultables à tout moment." },
    { title: "Un rapport mensuel en PDF", text: "Son contenu suit les services que vous avez choisis." },
    { title: "Un appel", text: "On vous explique les chiffres et on fixe ensemble le plan du mois suivant." },
  ],
  commitments: [
    { title: "Vos comptes restent à votre nom", text: "Google Ads, Search Console et les autres outils vous appartiennent." },
    { title: "0 % de commission", text: "Votre budget publicitaire va en entier à Google." },
    { title: "Réponse sous 48 h", text: "À chacun de vos emails." },
  ],
  report: {
    title: "Rapport mensuel",
    period: "PDF",
    ariaLabel: "Aperçu d’un rapport mensuel : visites depuis Google, commandes, positions et plan du mois suivant",
    rows: ["Visites depuis Google", "Commandes", "Positions sur Google"],
    next: "Plan du mois suivant",
  },
};

// Démarrer (test 1).
export const startCopy = {
  title: "Comment on démarre",
  intro: "Trois étapes, de la première conversation au début du travail.",
  steps: [
    {
      title: "Un appel de 20 minutes en visio",
      body: "On prend le temps de comprendre votre boutique, vos produits, vos clients et vos objectifs, et on fait le point avec vous sur vos ventes et sur ce qui fonctionne déjà.",
    },
    {
      title: "Une proposition écrite",
      body: "On vous envoie une proposition construite à partir de cet échange : les leviers à activer, dans quel ordre, et le prix.",
    },
    {
      title: "Le démarrage",
      body: "Proposition validée, on se met au travail sur votre boutique, et vous avez accès au dashboard pour voir l’avancement des chantiers.",
    },
  ],
  cta: "Choisir un créneau",
  emailPrefix: "ou écrire à",
};

export const faq = {
  title: "Questions fréquentes.",
  intro: "Une autre question ? Posez-la pendant l’appel, ou écrivez-nous.",
  items: [
    {
      q: "En combien de temps voit-on les premiers résultats en référencement ?",
      a:
        "Pour Inoko, le travail a commencé en janvier 2026 : les premiers signes sont arrivés en mars, et le stade de maturité a été atteint en juin 2026. " +
        "Chaque boutique part d’un point différent : on en parle pendant l’appel de 20 minutes.",
    },
    {
      q: "Quel budget prévoir pour Google Ads ?",
      a:
        "On recommande 500 € par mois pour réunir assez de données et bien piloter les campagnes. Pour un budget serré, " +
        "on démarre à 300 € par mois, soit 10 € par jour. Ce budget est payé directement à Google, sans commission.",
    },
    {
      q: "Faut-il s’engager ?",
      a: "Deux formules : une mission ponctuelle, sans engagement, ou un accompagnement mensuel, avec un engagement de 6 mois minimum.",
    },
    {
      q: "Pourquoi un prix sur devis ?",
      a:
        "Le prix dépend de votre boutique et des leviers choisis. On le fixe après l’appel de 20 minutes, " +
        "dans une proposition écrite.",
    },
    {
      q: "Sur quelles plateformes travaillez-vous ?",
      a: "Shopify, WooCommerce, PrestaShop, ou un site sur mesure en Next.js.",
    },
    {
      q: "À qui appartiennent les comptes Google Ads et Search Console ?",
      a: "À vous. Les comptes restent à votre nom.",
    },
    {
      q: "Que se passe-t-il si on arrête ?",
      a: "Vos comptes et vos données restent à votre nom : vous gardez tout l’historique de votre boutique.",
    },
    {
      q: "Qu’est-ce que le GEO ?",
      a:
        "Le GEO consiste à faire citer votre boutique dans les réponses des IA : ChatGPT, Perplexity, Gemini " +
        "et les aperçus IA de Google.",
    },
  ],
};

// Aperçu du blog « à la une » (test 1).
export const blogPreviewCopy = {
  title: "Le blog",
  intro: "Des méthodes concrètes pour faire grandir une boutique en ligne.",
  all: "Tous les articles",
  readMore: "Lire l’article",
  minutes: "min de lecture",
};

export const footerLegal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];

export const footerTagline = "Studio digital : référencement, publicité, sites et automatisation pour les boutiques en ligne.";

// Pied de page (test 2).
export const footerCopy = {
  ariaLabel: "Pied de page",
  pitch: "Une question, un projet, une boutique à faire grandir ?",
  cta: "Fixer un rendez-vous",
  sitemapLabel: "Plan du site",
  wordmark: "Venturia",
  copyright: "© 2026 Venturia",
  columns: {
    services: "Services",
    studio: "Le studio",
    contact: "Nous joindre",
  },
  studioLinks: [
    { href: "/cas-inoko", label: "Cas client Inoko" },
    { href: "/#methode", label: "Comment on travaille" },
    { href: "/#faq", label: "Questions fréquentes" },
    { href: "/blog", label: "Blog" },
  ],
  contactLinks: {
    booking: "Réserver un créneau",
    contact: "Contact",
  },
};
