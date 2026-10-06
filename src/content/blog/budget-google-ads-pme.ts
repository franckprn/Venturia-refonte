// Contenu de l'article /blog/budget-google-ads-pme, fourni par Franck.
// À reprendre au caractère près : ne rien reformuler, ne rien ajouter.
// Espace fine insécable (U+202F) avant ? ! : ; et comme séparateur de
// milliers, espace insécable (U+00A0) avant € et % (CLAUDE.md, « Texte »),
// posées ici directement dans les chaînes — même convention que
// content/services/sea.ts.
//
// Champs non dictés au-delà du titre/texte visible (CLAUDE.md, même
// convention que rail[2] sur les 4 pages /services/*) : `resume` des 3
// cartons du rail, `text` du carton 3. Complétés par une phrase courte,
// neutre, sans fait ni chiffre nouveau — signalés en commentaire,
// à valider/ajuster par Franck.

import type { ArticleContent } from "./types";

export const budgetGoogleAdsPme: ArticleContent = {
  meta: {
    title: "Quel budget Google Ads pour une PME ?",
    description:
      "Fixer son budget Google Ads quand on est une PME ou une boutique " +
      "en ligne : la méthode en 3 étapes, un exemple chiffré et les " +
      "règles de dépense de Google.",
  },

  category: "GOOGLE ADS",
  title: "Quel budget Google Ads pour une PME ?",
  excerpt:
    "Deux chiffres suffisent pour fixer un budget de départ : votre " +
    "panier moyen et votre marge.",

  datePublished: "2026-10-06",
  dateModified: "2026-10-06",

  author: {
    type: "Organization",
    name: "Venturia",
    url: "https://venturia.fr",
  },

  intro:
    "Le bon budget Google Ads se calcule à partir de deux chiffres que " +
    "vous connaissez déjà : votre panier moyen et votre marge. " +
    "Voici la méthode en trois étapes, avec un exemple chiffré.",

  enBref: [
    "Coût maximum par vente = panier moyen × marge brute.",
    "Objectif du premier mois : 15 ventes issues de Google Ads, le " +
      "seuil fixé par Google pour la stratégie au ROAS cible.",
    "Budget mensuel de départ ≈ 15 × votre coût maximum par vente.",
  ],

  body: [
    { type: "h2", text: "Étape 1 : calculer ce qu'une vente peut vous coûter" },
    {
      type: "paragraph",
      text:
        "Chaque vente laisse une marge. Tant que la publicité coûte " +
        "moins que cette marge, la vente reste rentable.",
    },
    {
      type: "paragraph",
      text:
        "Coût maximum par vente = panier moyen × taux de marge brute. " +
        "Pour un panier de 80 € et une marge de 40 %, une vente " +
        "peut coûter jusqu'à 32 € en publicité.",
    },
    {
      type: "paragraph",
      text:
        "Le même calcul donne votre ROAS minimum : 100 ÷ marge. " +
        "Avec 40 % de marge, chaque euro investi doit rapporter au " +
        "moins 2,50 € de chiffre d'affaires.",
      link: { label: "Calculer votre ROAS minimum", href: "/services/sea" },
    },

    { type: "h2", text: "Étape 2 : viser assez de ventes pour que Google apprenne" },
    {
      type: "paragraph",
      text:
        "Les stratégies d'enchères automatiques de Google ajustent " +
        "chaque enchère à partir de vos ventes passées. Pour la " +
        "stratégie au ROAS cible, Google demande au moins 15 " +
        "conversions sur les 30 derniers jours pour les campagnes " +
        "Search et Shopping.",
    },
    {
      type: "paragraph",
      text:
        "Ce seuil donne un objectif concret pour le premier mois : " +
        "15 ventes issues de Google Ads.",
    },

    { type: "h2", text: "Étape 3 : passer au budget quotidien" },
    {
      type: "paragraph",
      text:
        "Budget mensuel de départ = 15 ventes × coût maximum par vente. " +
        "Dans notre exemple : 15 × 32 € = 480 € par mois.",
    },
    {
      type: "paragraph",
      text:
        "Google Ads se règle en budget quotidien moyen. Un jour de " +
        "forte demande, Google peut dépenser jusqu'à deux fois ce " +
        "montant, et il plafonne le total du mois à 30,4 fois le " +
        "budget quotidien. Pour 480 € par mois : 480 ÷ 30,4 ≈ " +
        "16 € par jour.",
    },

    { type: "h2", text: "Ce que coûte un clic, en moyenne" },
    {
      type: "paragraph",
      text:
        "L'étude WordStream by LocaliQ, menée sur plus de 16 000 " +
        "campagnes, relève un coût par clic moyen de 5,42 $ en 2025, " +
        "tous secteurs confondus, contre 4,66 $ en 2024.",
    },
    {
      type: "paragraph",
      text:
        "Ces moyennes viennent surtout du marché américain : elles " +
        "donnent un ordre de grandeur. Après quelques semaines, les " +
        "données de votre propre compte prennent le relais.",
    },

    { type: "h2", text: "Ajuster le budget après le premier mois" },
    {
      type: "list",
      items: [
        "ROAS au-dessus de votre minimum : augmentez le budget par " +
          "paliers progressifs.",
        "ROAS proche du minimum : concentrez le budget sur les " +
          "produits et les requêtes qui vendent.",
        "ROAS sous le minimum : retravaillez les fiches produits, " +
          "les prix affichés et les mots-clés avant d'ajouter du budget.",
      ],
    },
    {
      type: "paragraph",
      text:
        "Chez Inoko, fabricant de mobilier modulable pour van à " +
        "Toulouse, les campagnes ont été rentables dès la deuxième " +
        "semaine, avec un ROAS de 15.",
    },
  ],

  sources: [
    {
      label:
        "Google Ads : pourquoi les coûts quotidiens peuvent " +
        "dépasser votre budget quotidien moyen",
      href: "https://support.google.com/google-ads/answer/2375423?hl=fr",
    },
    {
      label: "Google Ads : à propos de la stratégie d'enchères au ROAS cible",
      href: "https://support.google.com/google-ads/answer/6268637?hl=fr",
    },
    {
      label:
        "Search Engine Land : Google Ads costs keep rising, but " +
        "conversion rates improved in 2025 (WordStream by LocaliQ)",
      href: "https://searchengineland.com/google-ads-costs-keep-rising-but-conversion-rates-improved-in-2025-477927",
    },
  ],

  redBand: {
    title: "Combien vous rapporte 1 € de publicité ?",
    text: "Lors du premier appel, on calcule ensemble votre budget de départ.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  rail: [
    {
      title: "En bref",
      // resume non dicté au-delà du titre/texte — complété, voir l'en-tête.
      resume: "Le calcul en une ligne",
      text: "15 ventes par mois × votre coût maximum par vente.",
      href: "#en-bref",
    },
    {
      title: "Votre ROAS minimum",
      // resume non dicté au-delà du titre/texte — complété, voir l'en-tête.
      resume: "Le calcul, en 10 secondes",
      text: "Calculez-le en 10 secondes avec votre marge.",
      href: "/services/sea",
    },
    {
      title: "On discute ?",
      // resume/text non dictés au-delà du titre — repris du même modèle
      // que le carton 3 des pages /services/* (ex. content/services/
      // seo.ts), adapté au sujet de cet article.
      resume: "20 minutes, sans engagement",
      text:
        "20 minutes, sans engagement. On étudie votre budget Google " +
        "Ads avant l'appel, puis on vous dit ce qu'on ferait, dans " +
        "quel ordre.",
      href: "/contact",
    },
  ],
};
