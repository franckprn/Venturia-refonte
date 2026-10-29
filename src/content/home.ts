// Contenu de la home. Chiffres Inoko : seuls chiffres de résultat autorisés
// (CLAUDE.md, content/inoko.ts). Séparateur de milliers : espace insécable
// (U+00A0), Archivo n'a pas l'espace fine.
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
};

export const inokoClicks = [
  { month: "déc.", year: "2025", value: 86 },
  { month: "janv.", year: "2026", value: 204 },
  { month: "févr.", year: "2026", value: 304 },
  { month: "mars", year: "2026", value: 590 },
  { month: "avr.", year: "2026", value: 1016 },
  { month: "mai", year: "2026", value: 1736 },
];

export function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
      "On retravaille vos pages produits, vos catégories et vos guides pour qu'ils montent dans Google " +
      "et apparaissent dans les réponses de ChatGPT, Gemini ou Perplexity.",
  },
  {
    id: "publicite",
    href: "/services/sea",
    art: "publicite" as ArtKey,
    name: "Publicité",
    tags: ["Google Ads"],
    lead: "Des annonces Google Ads au moment où l'acheteur cherche.",
    text:
      "On construit et on pilote vos campagnes Google Ads, produit par produit, pour placer votre boutique " +
      "devant les personnes prêtes à commander.",
  },
  {
    id: "site",
    href: "/services/creation-site",
    art: "site" as ArtKey,
    name: "Site internet",
    tags: ["Shopify", "WooCommerce", "PrestaShop", "Next.js"],
    lead: "Une boutique livrée en 2 à 8 semaines, puis suivie.",
    text:
      "Shopify, WooCommerce, PrestaShop ou sur-mesure en Next.js. L'hébergement, les mises à jour et les " +
      "évolutions sont compris dans le forfait mensuel.",
  },
  {
    id: "automatisation",
    href: "/services/automations",
    art: "automatisation" as ArtKey,
    name: "Automatisation",
    tags: ["n8n", "Serveur en Europe"],
    lead: "Les tâches répétitives confiées à des workflows.",
    text:
      "On relie vos outils avec n8n : commandes, factures, stocks, emails. On l'héberge pour vous, " +
      "sur un serveur en Europe.",
  },
];

// Deux titres possibles pour la section Services. Retenu : le résultat.
export const servicesTitle = {
  resultat: "Une boutique qu'on trouve, qui donne envie et qui vend.",
  leviers: "Référencement, publicité, site, automatisation : quatre leviers pour vendre en ligne.",
};

export const situations = {
  title: "Où en est votre boutique ?",
  intro: "Chaque boutique en ligne part d'un point différent. Trouvez le vôtre, on vous montre par où commencer.",
  items: [
    {
      title: "Vous lancez votre boutique.",
      text:
        "On construit votre boutique sur Shopify, WooCommerce, PrestaShop ou en sur-mesure Next.js, prête à " +
        "recevoir ses premières commandes. Hébergement, mises à jour et évolutions sont compris dans le forfait mensuel.",
      links: [{ label: "Site internet", href: "/services/creation-site" }],
    },
    {
      title: "Vos ventes dépendent d'un seul canal.",
      text:
        "Marketplace, Leboncoin ou réseaux sociaux : on ouvre à votre boutique un accès direct aux acheteurs " +
        "qui cherchent vos produits sur Google, dans les résultats naturels et dans les annonces.",
      links: [
        { label: "Référencement", href: "/services/seo" },
        { label: "Publicité", href: "/services/sea" },
      ],
    },
    {
      title: "Vos ventes plafonnent.",
      text:
        "On reprend vos fiches produits, vos catégories et vos guides pour gagner des positions sur les " +
        "recherches qui mènent à l'achat.",
      links: [{ label: "Référencement", href: "/services/seo" }],
    },
    {
      title: "Les tâches répétitives vous prennent vos journées.",
      text:
        "Commandes, factures, stocks, emails de suivi : on relie vos outils avec n8n pour que ces tâches " +
        "tournent seules, et vos journées reviennent à la boutique.",
      links: [{ label: "Automatisation", href: "/services/automations" }],
    },
  ],
};

// Avis Google, recopiés mot pour mot. `placeholder: true` : texte provisoire,
// affiché avec la mention « Avis provisoire », à remplacer avant la mise en ligne.
export type Review = {
  text: string;
  author: string;
  company: string;
  date: string;
  placeholder?: boolean;
};

export const reviews: Review[] = [
  {
    text:
      "Texte provisoire en attendant le premier avis Google : un échange clair dès le premier appel, " +
      "un plan précis pour notre boutique, et des points réguliers pour suivre les chiffres.",
    author: "Prénom Nom",
    company: "Nom de la boutique",
    date: "Mois 2026",
    placeholder: true,
  },
];

export const method = {
  title: "Comment on travaille.",
  formulas: [
    {
      name: "Mission ponctuelle",
      text: "Un chantier précis, mené de bout en bout puis remis entre vos mains. Sans engagement.",
    },
    {
      name: "Accompagnement mensuel",
      text: "On pilote vos leviers mois après mois. Engagement de 6 mois minimum.",
    },
  ],
  followTitle: "Vos chiffres, à tout moment.",
  follow: [
    { name: "Un tableau de bord en ligne", text: "Consultable à tout moment, depuis n'importe quel écran." },
    { name: "Un rapport mensuel en PDF", text: "Son contenu suit les services choisis : référencement, annonces, site, automatisations." },
    { name: "Un appel chaque mois", text: "On explique les chiffres et on fixe ensemble le plan du mois suivant." },
  ],
  commitments: [
    { label: "Vos comptes", text: "Google Ads, Search Console et les autres comptes restent à votre nom." },
    { label: "Votre budget", text: "Votre budget publicitaire va en totalité à Google, sans commission." },
    { label: "Vos emails", text: "Réponse à vos emails sous 48 h." },
  ],
};

export const start = {
  title: "Pour démarrer, un appel de vingt minutes.",
  steps: [
    {
      verb: "On échange",
      text: "Un appel de 20 minutes en visio, réservé en quelques clics sur Cal.com : votre boutique, vos produits, vos objectifs.",
    },
    {
      verb: "On vous propose",
      text: "Une proposition écrite, construite à partir de cet échange : les leviers à activer, le déroulé et le prix.",
    },
    {
      verb: "On démarre",
      text: "Vous validez, on se met au travail sur votre boutique.",
    },
  ],
  cta: "Choisir mon créneau",
};

export const faq = {
  title: "Questions fréquentes.",
  items: [
    {
      q: "En combien de temps voit-on les premiers résultats en référencement ?",
      a:
        "Pour Inoko, le travail a commencé en janvier 2026 : la boutique a reçu 9 commandes en mars, puis 13 en avril. " +
        "Chaque boutique part d'un point différent : on en parle pendant l'appel de 20 minutes.",
    },
    {
      q: "Quel budget prévoir pour Google Ads ?",
      a:
        "On recommande 500 € par mois pour réunir assez de données et bien piloter les campagnes. Pour un budget serré, " +
        "on démarre à 300 € par mois, soit 10 € par jour. Ce budget est payé directement à Google, sans commission.",
    },
    {
      q: "Faut-il s'engager ?",
      a: "Deux formules : une mission ponctuelle, sans engagement, ou un accompagnement mensuel, avec un engagement de 6 mois minimum.",
    },
    {
      q: "Pourquoi un prix sur devis ?",
      a:
        "Le prix dépend de votre boutique et des leviers choisis. On le fixe après l'appel de 20 minutes, " +
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
      a: "Vos comptes et vos données restent à votre nom : vous gardez tout l'historique de votre boutique.",
    },
    {
      q: "Qu'est-ce que le GEO ?",
      a:
        "Le GEO consiste à faire citer votre boutique dans les réponses des IA : ChatGPT, Perplexity, Gemini " +
        "et les aperçus IA de Google.",
    },
  ],
};

export const blogPreview = {
  title: "Le blog.",
  intro: "Des méthodes concrètes pour faire grandir une boutique en ligne.",
  all: "Tous les articles",
};

export const footerLegal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];

export const footerTagline = "Studio digital : référencement, publicité, sites et automatisation pour les boutiques en ligne.";
