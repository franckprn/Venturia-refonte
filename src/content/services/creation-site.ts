// Contenu de la page /services/creation-site (son adresse déjà indexée
// par Google, conservée — voir CLAUDE.md « Services (home) » §
// « AVANT MISE EN LIGNE »), fourni par Franck. À reprendre au caractère
// près : ne rien reformuler, ne rien ajouter.
// Espace fine insécable (U+202F) avant : ? ! ; (CLAUDE.md, « Texte »),
// posée ici directement dans les chaînes, comme content/services/
// automatisation.ts/sea.ts/seo.ts. U+00A0 avant « € » (posé dans
// ServiceRateCalculator.tsx, pas ici — les montants sont calculés, pas
// écrits en dur).
//
// Quelques champs obligatoires des composants réutilisés n'ont pas de
// valeur dictée dans le brief — jamais inventés, repris verbatim d'un
// précédent déjà validé sur une autre page (même convention que
// content/services/sea.ts/seo.ts) :
//   - starting.text : « Trois situations reviennent souvent. », mot pour
//     mot comme automatisation.ts/sea.ts.
//   - otherActivities.label / included.label : repris du titre du bloc
//     dans le prompt (« PLATEFORMES », « INCLUS DANS LE FORFAIT »), comme
//     sea.ts (« LES CAMPAGNES », « CE QUI VOUS APPARTIENT »).
//   - faq.label : « QUESTIONS FRÉQUENTES », fixe sur les 3 pages
//     existantes ; faq.title : même construction (« Vos questions
//     sur… ») adaptée au sujet de cette page.
//   - otherExpertises.items : noms/phrases repris verbatim de
//     content/services.ts (home) pour Automatisation/Référencement/
//     Publicité, comme automatisation.ts/sea.ts/seo.ts le font déjà
//     entre elles ; ctaLabel "En savoir plus", convention de ce bloc.
//   - rail[2] (carton 3) : resume/texte repris du même modèle que le
//     carton 3 de seo.ts/sea.ts, adapté au sujet de cette page (seul le
//     titre, « On discute ? », est dicté par le brief).

import type { CreationSiteServiceContent } from "./types";

export const creationSite: CreationSiteServiceContent = {
  meta: {
    title: "Création de site e-commerce à Toulouse",
    description:
      "Agence de création de site e-commerce à Toulouse : Shopify, " +
      "WooCommerce, PrestaShop ou sur-mesure, en ligne en 2 à 6 " +
      "semaines. France et Belgique.",
  },

  // Mesuré Playwright (build de prod, même méthode que
  // --service-hero-title-cqi d'Automatisation, ServiceHero.module.css).
  // Contrairement aux 3 pages existantes, c'est ICI `titleLine2`
  // (« e-commerce à Toulouse »), pas `titleLine1`, qui est la ligne la
  // plus longue (mesuré : 1120,9px vs 736,8px à 100px, isolé) — le h1
  // reste `white-space: nowrap` par ligne (voir ServiceHero.module.css),
  // donc c'est la plus longue des DEUX lignes qui doit calibrer le
  // texte, quel que soit son ordre d'affichage (la position de `line1`
  // au-dessus de `line2` est imposée par le contenu, pas par ce
  // calibrage). k = largeur de « e-commerce à Toulouse » à 100px / 100 =
  // 11,209 0625. cqi = 100/k = 8,9214 — vérifié EXACT (delta ≤ 0,1px,
  // aucune ligne ne déborde) à 1024/1280/1440/1728/1920px.
  heroTitleCqi: 8.9214,

  hero: {
    titleLine1: "Création de site",
    titleLine2: "e-commerce à Toulouse",
    subtitle:
      "Une boutique rapide, claire et pensée pour vendre, en ligne en " +
      "2 à 6 semaines, en France et en Belgique.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
    chain: {
      notification: {
        label: "VOTRE BOUTIQUE · À L'INSTANT",
        title: "Nouvelle commande : 2 articles",
      },
      steps: [
        { number: "01", title: "Arrivée", status: "La page s'affiche vite, sur mobile comme sur ordinateur" },
        { number: "02", title: "Produit", status: "Photos, prix et livraison visibles d'emblée" },
        { number: "03", title: "Panier", status: "Paiement en quelques étapes" },
        { number: "04", title: "Commande", status: "Confirmation envoyée, stock mis à jour" },
      ],
    },
  },

  rateCalculator: {
    label: "CALCULEZ",
    title: "Ce que rapporte un demi-point de taux d'achat",
    visitorsLabel: "Visiteurs par mois",
    visitorsDefault: 1000,
    rateLabel: "Taux d'achat actuel (%)",
    rateDefault: 1,
    basketLabel: "Panier moyen (€)",
    basketDefault: 60,
    currentLabel: "Chiffre d'affaires actuel :",
    currentSuffix: "par mois",
    gainLabel: "Avec 0,5 point de plus :",
    gainSuffix: "par mois",
    yearlyPrefix: "Soit",
    yearlySuffix: "par an",
    note: "Calcul indicatif, à trafic égal.",
    emptyValue: "—",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  timeline: {
    label: "LA MÉTHODE",
    title: "De la maquette à la mise en ligne, en 2 à 6 semaines",
    moments: [
      {
        label: "CADRER",
        tasks: [
          {
            name: "Cahier des charges",
            text: "Vos produits, vos clients et vos objectifs, réunis en une page.",
          },
          {
            name: "Maquette",
            text: "Les pages clés dessinées et validées avant le développement.",
          },
        ],
      },
      {
        label: "CONSTRUIRE",
        tasks: [
          {
            name: "Développement",
            text: "Votre boutique sur Shopify, WooCommerce, PrestaShop ou en sur-mesure.",
          },
          {
            name: "Référencement intégré",
            text: "Balises, vitesse et données structurées posées dès la conception.",
          },
        ],
      },
      {
        label: "LANCER",
        tasks: [
          {
            name: "Mise en ligne",
            text: "Anciennes adresses redirigées, suivi des ventes en place.",
          },
          {
            name: "Évolutions",
            text: "Hébergement, mises à jour et nouvelles pages inclus dans le forfait mensuel.",
          },
        ],
      },
    ],
  },

  starting: {
    label: "PAR OÙ COMMENCER",
    title: "Le premier chantier, selon votre situation",
    // Phrase de transition générique, pas de valeur dictée pour ce champ
    // dans le brief — reprise mot pour mot de celle déjà utilisée par
    // Automatisation/Publicité pour le même rôle (content/services/
    // automatisation.ts/sea.ts, starting.text), plutôt qu'inventée.
    text: "Trois situations reviennent souvent.",
    items: [
      {
        title: "Vous lancez votre marque",
        text: "Une boutique prête à vendre, simple à gérer au quotidien.",
      },
      {
        title: "Vous avez déjà une boutique",
        text:
          "On repère les étapes où les visiteurs quittent le site, et " +
          "on les retravaille en priorité.",
      },
      {
        title: "Vous changez de plateforme",
        text: "Produits, contenus et positions Google conservés lors du passage.",
      },
    ],
  },

  otherActivities: {
    // Label non dicté dans le brief — repris du titre du bloc 5 dans le
    // prompt (« PLATEFORMES »), pas inventé (même convention que
    // content/services/sea.ts, otherActivities.label).
    label: "PLATEFORMES",
    title: "Shopify, WooCommerce, PrestaShop ou sur-mesure",
    intro: "La plateforme se choisit selon votre catalogue et votre façon de travailler.",
    items: [
      {
        name: "Shopify",
        text: "Hébergement compris et prise en main rapide, idéal pour lancer une marque.",
      },
      {
        name: "WooCommerce",
        text: "Sur WordPress, avec une grande liberté sur les contenus et le blog.",
      },
      {
        name: "PrestaShop",
        text: "Pensé pour les grands catalogues et les nombreuses déclinaisons.",
      },
      {
        name: "Sur-mesure",
        text: "En Next.js, pour une boutique très rapide et un design entièrement libre.",
      },
    ],
  },

  redBand: {
    title: "Combien de vos visiteurs passent commande ?",
    text: "Lors du premier appel, on parcourt votre site ensemble, page par page.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  included: {
    // Label non dicté dans le brief — repris du titre du bloc 7 dans le
    // prompt (« INCLUS DANS LE FORFAIT »), même convention que
    // otherActivities.label plus haut.
    label: "INCLUS DANS LE FORFAIT",
    title: "Après la mise en ligne, tout est inclus",
    intro: "Avec le forfait mensuel, votre boutique reste à jour et continue d'évoluer.",
    items: [
      {
        name: "Hébergement",
        text: "Pris en charge, pour un site rapide et sécurisé.",
      },
      {
        name: "Mises à jour",
        text: "Plateforme, extensions et sécurité tenues à jour.",
      },
      {
        name: "Évolutions",
        text: "Nouvelles pages et ajustements, au fil de vos besoins.",
      },
    ],
  },

  crossLink: {
    label: "SITE ET RÉFÉRENCEMENT",
    title: "Une boutique pensée pour Google dès la première page",
    text:
      "Le référencement se prépare pendant la construction : " +
      "structure des pages, vitesse, balises. Votre boutique part avec " +
      "une base solide, prête à être travaillée mois après mois.",
    cta: { label: "Découvrir le référencement naturel", href: "/services/seo" },
  },

  faq: {
    label: "QUESTIONS FRÉQUENTES",
    // Titre non dicté dans le brief — même construction que celui
    // d'Automatisation/Publicité/Référencement (« Vos questions sur… »),
    // adapté au sujet de cette page, pas de fait nouveau.
    title: "Vos questions sur la création de site e-commerce",
    items: [
      {
        question: "Combien de temps pour créer un site e-commerce ?",
        answer: "De 2 à 6 semaines, selon la taille du catalogue et le nombre de pages.",
      },
      {
        question: "Combien coûte un site e-commerce ?",
        answer:
          "Le prix dépend de la plateforme, du nombre de produits et des " +
          "fonctionnalités. On le chiffre sur devis, après l'appel de 20 minutes.",
      },
      {
        question: "Shopify, WooCommerce ou PrestaShop : lequel choisir ?",
        answer:
          "Shopify pour lancer vite, WooCommerce pour la liberté sur les " +
          "contenus, PrestaShop pour les grands catalogues. On vous " +
          "recommande la plateforme adaptée lors du premier appel.",
      },
      {
        question: "Pouvez-vous refaire un site existant ?",
        answer:
          "Oui : on reprend vos produits et vos contenus, et chaque " +
          "ancienne adresse est redirigée pour conserver vos positions Google.",
      },
      {
        question: "Qui s'occupe du site après la mise en ligne ?",
        answer: "Nous : hébergement, mises à jour et évolutions sont inclus dans le forfait mensuel.",
      },
      {
        question: "Pourrai-je modifier mes produits moi-même ?",
        answer:
          "Oui : sur Shopify, WooCommerce et PrestaShop, produits, " +
          "prix, stocks et commandes se gèrent depuis votre espace d'administration.",
      },
      {
        question: "Travaillez-vous avec des boutiques en Belgique ?",
        answer: "Oui, en France et en Belgique, à distance.",
      },
    ],
  },

  otherExpertises: {
    label: "AUTRES EXPERTISES",
    items: [
      {
        name: "Automatisation",
        phrase: "Des systèmes adaptés à votre façon de travailler.",
        ctaLabel: "En savoir plus",
        href: "/services/automations",
      },
      {
        name: "Référencement",
        phrase: "Être trouvé sur Google, et cité par les IA.",
        ctaLabel: "En savoir plus",
        href: "/services/seo",
      },
      {
        name: "Publicité",
        phrase: "Plus de commandes, sans attendre.",
        ctaLabel: "En savoir plus",
        href: "/services/sea",
      },
    ],
  },

  rail: [
    {
      title: "2 à 6 semaines",
      resume: "Délai de mise en ligne",
      text: "Le délai type, du premier appel à la mise en ligne.",
      href: "#timeline",
    },
    {
      title: "Quelle plateforme ?",
      resume: "Choisir sa plateforme",
      text: "Shopify, WooCommerce, PrestaShop ou sur-mesure, selon votre catalogue.",
      href: "#plateformes",
    },
    {
      title: "On discute ?",
      // Resume/texte non dictés au-delà du titre — repris du même modèle
      // que le carton 3 de la page Référencement (content/services/
      // seo.ts), adapté au sujet de cette page.
      resume: "20 minutes, sans engagement",
      text:
        "20 minutes, sans engagement. On étudie votre boutique avant " +
        "l'appel, puis on vous dit ce qu'on ferait, dans quel ordre.",
      href: "/contact",
    },
  ],
};
