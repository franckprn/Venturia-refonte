// Contenu de la page /services/seo (son adresse déjà indexée par
// Google, conservée), fourni par Franck. À reprendre au caractère
// près : ne rien reformuler, ne rien ajouter.
// Espace fine insécable (U+202F) avant : ? ! ; (CLAUDE.md, « Texte »)
// et comme séparateur de milliers, U+00A0 avant « € » — posées ici
// directement dans les chaînes, comme content/services/sea.ts.
// Exception à « × = × (U+00D7) » : « lit peigne 140x190 » est une
// requête Google citée telle que tapée (notification du Hero, texte
// Inoko) — lettre x (U+0078), jamais ×, puisque c'est la chaîne
// littéralement recherchée, pas une dimension à mettre en forme.
//
// Quelques champs n'ont pas de valeur dictée explicitement dans le
// brief (text du bloc 4, label du bloc 5, title/label de la FAQ,
// resume/text du carton 3 du rail) : complétés ici par une phrase
// courte, neutre, sans fait ni chiffre nouveau, signalés en commentaire
// à chaque endroit — à valider/ajuster par Franck.

import type { SeoServiceContent } from "./types";

export const seo: SeoServiceContent = {
  meta: {
    title: "Référencement naturel e-commerce à Toulouse",
    description:
      "Consultant SEO e-commerce à Toulouse : fiches produits, pages " +
      "piliers et GEO. Inoko : de 1 à 12 commandes par mois. France et " +
      "Belgique.",
  },

  // Recalibré (session « page Création de site », 2026-10-06) :
  // `titleLine1` (« Référencement naturel ») avait été supposée la plus
  // longue des deux lignes, comme sur Automatisation/Publicité — erreur :
  // mesuré, c'est `titleLine2` (« e-commerce à Toulouse », identique au
  // texte de la page Création de site) qui est la plus large une fois
  // rendue (1120,9px vs 1058,8px à 100px, isolé), bien que `line1` ait un
  // caractère de plus. Le h1 reste `white-space: nowrap` PAR LIGNE
  // (ServiceHero.module.css) : à l'ancienne valeur (9.0975, calibrée sur
  // `line1`), `line2` débordait du conteneur de 14 à 32px selon la
  // largeur d'écran — invisible au contrôle `scrollWidth` (l'écart
  // tombait dans la colonne du rail, qui absorbe un léger débordement
  // sans élargir la page) mais visible à l'œil (capture Playwright,
  // "Toulouse" tronqué). k = largeur de « e-commerce à Toulouse » à
  // 100px / 100 = 11,2090625 (mesurée sur un <span> ISOLÉ, même
  // police/graisse/letter-spacing que le h1 réel — même valeur que
  // content/services/creation-site.ts, texte strictement identique).
  // cqi = 100/k = 8,9214 — vérifié EXACT sur `line2` (delta ≤ 0,11px,
  // aucun débordement) à 1024/1280/1440/1728/1920px ; `line1` garde
  // 14 à 31px de marge selon la largeur, jamais serrée.
  heroTitleCqi: 8.9214,

  hero: {
    titleLine1: "Référencement naturel",
    titleLine2: "e-commerce à Toulouse",
    subtitle:
      "Vos fiches produits en tête de Google, pour des commandes qui " +
      "arrivent chaque mois, en France et en Belgique.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
    chain: {
      notification: {
        label: "GOOGLE · À L'INSTANT",
        title: "Recherche : lit peigne 140x190",
      },
      steps: [
        { number: "01", title: "Position", status: "Votre fiche produit en tête des résultats naturels" },
        { number: "02", title: "Visite", status: "Le client arrive sur la bonne page" },
        { number: "03", title: "Commande", status: "Panier validé sur votre boutique" },
        { number: "04", title: "Durée", status: "Le même trafic le mois suivant, sans payer le clic" },
      ],
    },
  },

  inokoCase: {
    label: "CAS CLIENT · INOKO",
    title: "Inoko : de 1 à 12 commandes par mois",
    text:
      "Inoko fabrique du mobilier modulable pour van à Toulouse. Au " +
      "départ, une vente par mois, venue de Leboncoin. On a retravaillé " +
      "les pages produits les plus recherchées et créé une page pilier. " +
      "Résultat : trois produits premiers sur Google, dont « lit " +
      "peigne 140x190 », et la page pilier en première page sur " +
      "une requête à 5 000 recherches par mois.",
    invested: { amount: "1 commande", label: "par mois, au départ" },
    revenue: { amount: "12 commandes", label: "par mois, au printemps", squares: 12 },
    definition:
      "Chiffre d'affaires mensuel : de 1 000 € à plus de " +
      "10 000 € en 6 mois, Google Ads compris. Visiteurs " +
      "mensuels : de 80 à 1 700.",
  },

  timeline: {
    label: "LA MÉTHODE",
    title: "Du premier audit aux commandes régulières",
    moments: [
      {
        label: "ANALYSER",
        tasks: [
          {
            name: "Audit technique",
            text: "Vitesse, indexation, erreurs : votre boutique lue correctement par Google.",
          },
          {
            name: "Mots-clés",
            text: "Les requêtes de vos clients, classées par potentiel de vente.",
          },
        ],
      },
      {
        label: "OPTIMISER",
        tasks: [
          {
            name: "Fiches produits",
            text: "Titres, descriptions et balises réécrits pour les requêtes qui vendent.",
          },
          {
            name: "Pages piliers",
            text: "Un guide complet qui fait monter toute une famille de produits.",
          },
        ],
      },
      {
        label: "DÉVELOPPER",
        tasks: [
          {
            name: "Contenus",
            text: "Des articles qui répondent aux questions posées avant l'achat.",
          },
          {
            name: "Suivi mensuel",
            text: "Positions, visiteurs et commandes, chaque mois.",
          },
        ],
      },
    ],
  },

  starting: {
    label: "PAR OÙ COMMENCER",
    title: "Le premier chantier, selon votre boutique",
    // Phrase de transition générique, pas de valeur dictée pour ce
    // champ dans le brief — même rôle que « Trois situations reviennent
    // souvent. » sur la page Publicité (content/services/sea.ts,
    // starting.text), pas un fait nouveau.
    text: "Trois cas reviennent souvent.",
    items: [
      {
        title: "Votre boutique est récente",
        text: "On commence par l'indexation et les fiches produits, la base de tout le reste.",
      },
      {
        title: "Vous avez du trafic, peu de ventes",
        text: "On repère les pages qui attirent des visiteurs et on les oriente vers l'achat.",
      },
      {
        title: "Vous refaites votre site",
        text: "On conserve vos positions : chaque ancienne adresse redirigée, chaque contenu utile gardé.",
      },
    ],
  },

  // Bloc 5 — GEO (section id="geo", voir page.tsx et globals.css pour
  // son scroll-margin-top dédié). Label non dicté dans le brief (pas de
  // ligne "Label :" donnée pour ce bloc) — repris du titre de section
  // du prompt (« 5. GEO »), même convention que « PAR OÙ COMMENCER »
  // ci-dessus quand aucun label séparé n'est fourni.
  otherActivities: {
    label: "GEO",
    title: "Votre marque citée par les IA",
    intro:
      "ChatGPT, Perplexity et les résumés IA de Google répondent de " +
      "plus en plus aux questions d'achat. Le GEO prépare vos contenus " +
      "pour qu'ils citent votre marque.",
    items: [
      {
        name: "Réponses directes",
        text: "Des pages qui répondent clairement aux questions de vos clients.",
      },
      {
        name: "Données structurées",
        text: "Prix, avis et caractéristiques lisibles par les moteurs et les IA.",
      },
      {
        name: "Sources citées",
        text: "Votre marque présente sur les sites que les IA consultent.",
      },
    ],
  },

  redBand: {
    title: "Combien de clients vous cherchent déjà sur Google ?",
    text: "Lors du premier appel, on regarde ensemble vos requêtes et vos positions.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  // Bloc 7 — « Ce qui fait varier le prix », seconde instance de
  // ServiceOtherActivities sur cette page (comme `appartient` sur la
  // page Publicité) — label repris du titre de section du prompt
  // (« 7. CE QUI FAIT VARIER LE PRIX »), même convention que GEO
  // ci-dessus.
  priceFactors: {
    label: "CE QUI FAIT VARIER LE PRIX",
    title: "Un devis calé sur votre boutique",
    intro: "Le prix se fixe après l'appel de 20 minutes, selon quatre critères.",
    items: [
      {
        name: "Le catalogue",
        text: "Le nombre de fiches produits et de catégories à travailler.",
      },
      {
        name: "La concurrence",
        text: "Le niveau des boutiques déjà présentes sur vos requêtes.",
      },
      {
        name: "L'état du site",
        text: "Les corrections techniques à prévoir avant d'optimiser.",
      },
      {
        name: "Le rythme",
        text: "Le nombre de contenus publiés chaque mois.",
      },
    ],
  },

  crossLink: {
    label: "RÉFÉRENCEMENT ET GOOGLE ADS",
    title: "Le référencement pour durer, Google Ads pour accélérer",
    text:
      "Le référencement installe un trafic qui revient chaque mois. " +
      "Google Ads apporte des ventes dès son lancement. Chez Inoko, " +
      "Google Ads a pris le relais du référencement, et les deux ont " +
      "tourné ensemble.",
    cta: { label: "Découvrir Google Ads", href: "/services/sea" },
  },

  faq: {
    label: "QUESTIONS FRÉQUENTES",
    // Titre non dicté dans le brief — même construction que celui
    // d'Automatisation/Publicité (« Vos questions sur… »), adapté au
    // sujet de cette page, pas de fait nouveau.
    title: "Vos questions sur le référencement naturel",
    items: [
      {
        question: "En combien de temps le référencement naturel donne-t-il des résultats ?",
        answer:
          "Google estime qu'il faut en général de 4 mois à un an pour " +
          "voir l'effet d'un travail de référencement. Chez Inoko, plus " +
          "d'une dizaine de commandes par mois dès avril, quatre mois " +
          "après le début.",
      },
      {
        question: "Combien coûte un consultant SEO à Toulouse ?",
        answer:
          "Le prix dépend de votre catalogue, de la concurrence sur vos " +
          "requêtes et de l'état de votre site. On le chiffre sur devis, " +
          "après l'appel de 20 minutes.",
      },
      {
        question: "Agence ou consultant SEO : quelle différence ?",
        answer:
          "Venturia est un studio : la personne avec qui vous " +
          "échangez est celle qui travaille votre référencement, de " +
          "l'audit au suivi mensuel.",
      },
      {
        question: "Qu'est-ce que le GEO ?",
        answer:
          "Le GEO (Generative Engine Optimization) prépare vos contenus " +
          "pour que ChatGPT, Perplexity et les résumés IA de Google " +
          "citent votre marque dans leurs réponses.",
      },
      {
        question: "Le référencement fonctionne-t-il sur Shopify, WooCommerce et PrestaShop ?",
        answer: "Oui : fiches produits, catégories, balises et données structurées se travaillent sur les trois.",
      },
      {
        question: "Peut-on garder ses positions en refaisant son site ?",
        answer:
          "Oui : chaque ancienne adresse est redirigée vers la " +
          "nouvelle, et les contenus qui se positionnent sont conservés.",
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
        name: "Publicité",
        phrase: "Plus de commandes, sans attendre.",
        ctaLabel: "En savoir plus",
        href: "/services/sea",
      },
      {
        name: "Site internet",
        phrase: "Un site à votre image, pensé pour convertir.",
        ctaLabel: "En savoir plus",
        href: "/services/creation-site",
      },
    ],
  },

  rail: [
    {
      title: "Combien de temps ?",
      resume: "Délais des premiers résultats",
      text: "De 4 mois à un an selon Google. Chez Inoko, plus de 10 commandes par mois dès avril.",
      href: "#faq",
    },
    {
      title: "Le GEO, en une phrase",
      resume: "Être cité par les IA",
      text: "Être cité par ChatGPT et les IA quand vos clients posent une question d'achat.",
      href: "#geo",
    },
    {
      title: "On discute ?",
      // Resume/text non dictés au-delà du titre — repris du même
      // modèle que le carton 3 de la page Publicité
      // (content/services/sea.ts), adapté au sujet de cette page.
      resume: "20 minutes, sans engagement",
      text:
        "20 minutes, sans engagement. On étudie votre boutique avant " +
        "l'appel, puis on vous dit ce qu'on ferait, dans quel ordre.",
      href: "/contact",
    },
  ],
};
