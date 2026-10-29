// Contenu de /contact et de la page 404. Lien de réservation : la
// constante unique de content/home.ts. Retirés, faute de figurer
// dans le brief : la ville, la couverture géographique, le délai de
// réponse et la promesse de repartir avec un plan.
import { BOOKING_URL } from "./home";

export { BOOKING_URL };
// Vue intégrée de cal.com : la page de réservation, sans son habillage.
export const BOOKING_EMBED_URL = `${BOOKING_URL}?embed=true&theme=light&layout=month_view`;

export const contactMeta = {
  title: "Contact : réserver un appel de 20 minutes | Venturia",
  description:
    "Réservez un appel de 20 minutes avec Venturia pour parler de votre boutique en ligne, " +
    "ou écrivez à hey@venturia.fr. Un devis écrit suit l'appel.",
};

export const contactHero = {
  kicker: "Contact, appel de 20 minutes pour boutiques en ligne et PME",
  title: ["Choisissez", "votre créneau."],
  sub: "Vingt minutes en visio pour parler de votre boutique et voir par où commencer.",
  cta: "Voir les créneaux libres",
  writeLabel: "Vous préférez écrire ?",
  writeText: "Quelques lignes sur votre boutique suffisent pour lancer la discussion.",
};

export const contactCall = {
  label: "Pendant les 20 minutes",
  title: "Trois sujets sur la table.",
  points: [
    {
      name: "Votre boutique",
      text: "Vous nous présentez votre activité, vos produits et vos objectifs.",
    },
    {
      name: "Ce qui existe",
      text: "On regarde ensemble votre site, votre présence sur Google et vos canaux de vente.",
    },
    {
      name: "Le premier chantier",
      text: "On repère par où commencer : référencement, publicité, site internet ou automatisation.",
    },
  ],
  afterLabel: "Après l'appel",
  afterTitle: "Un devis écrit.",
  afterText: "Le travail proposé, son déroulé et son prix, posés noir sur blanc. Vous décidez ensuite, à votre rythme.",
};

export const agenda = {
  label: "Agenda",
  meta: "Appel de 20 minutes",
  open: "Ouvrir l'agenda",
  title: "Agenda de réservation Venturia",
  waiting: "Chargement de l'agenda…",
  slow: "L'agenda s'ouvre aussi dans un nouvel onglet.",
};

export const notFound = {
  label: "Erreur 404",
  title: "Prenons un autre chemin.",
  sub: "Les pages principales du site, à un clic.",
  links: [
    { href: "/", label: "Accueil", note: "Le studio et le cas Inoko" },
    { href: "/services/seo", label: "Référencement", note: "SEO et GEO" },
    { href: "/services/sea", label: "Publicité", note: "Google Ads" },
    { href: "/services/creation-site", label: "Site internet", note: "Shopify, WooCommerce, PrestaShop, Next.js" },
    { href: "/services/automations", label: "Automatisation", note: "n8n" },
    { href: "/contact", label: "Contact", note: "Réserver 20 minutes" },
  ],
};
