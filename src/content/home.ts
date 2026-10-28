// Contenu de la home. Chiffres Inoko : seuls chiffres de résultat autorisés
// (CLAUDE.md). Séparateur de milliers : espace insécable (U+00A0), Archivo n'a pas l'espace fine.

export const CONTACT_HREF = "/contact";
export const EMAIL = "hey@venturia.fr";

export const inokoClicks = [
  { month: "déc.", year: "2025", value: 86 },
  { month: "janv.", year: "2026", value: 204 },
  { month: "févr.", year: "2026", value: 304 },
  { month: "mars", year: "2026", value: 590 },
  { month: "avr.", year: "2026", value: 1016 },
  { month: "mai", year: "2026", value: 1736 },
];

export function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const services = [
  {
    id: "referencement",
    href: "/services/seo",
    painting: "rue",
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
    painting: "affiche",
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
    painting: "vitrine",
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
    painting: "atelier",
    name: "Automatisation",
    tags: ["n8n", "Serveur en Europe"],
    lead: "Les tâches répétitives confiées à des workflows.",
    text:
      "On relie vos outils avec n8n : commandes, factures, stocks, emails. On l'héberge pour vous, " +
      "sur un serveur en Europe.",
  },
] as const;

export const steps = [
  {
    verb: "On échange",
    text: "Un appel de 20 minutes pour comprendre votre activité, vos produits et vos objectifs.",
  },
  {
    verb: "On chiffre",
    text: "Vous recevez un devis construit pour votre entreprise, avec les leviers utiles en priorité.",
  },
  {
    verb: "On lance",
    text: "On se met au travail. Pour un nouveau site, comptez 2 à 8 semaines jusqu'à la mise en ligne.",
  },
] as const;
