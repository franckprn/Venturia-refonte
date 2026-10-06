// Contenu de la page /services/sea (son adresse déjà indexée par
// Google, conservée), fourni par Franck. À reprendre au caractère
// près : ne rien reformuler, ne rien ajouter.
// Espace fine insécable (U+202F) avant : ? ! ; (CLAUDE.md, « Texte »),
// posée ici directement dans les chaînes, comme content/services/
// automatisation.ts. U+00A0 avant « € ».
//
// Quelques champs obligatoires des composants réutilisés (label du
// bloc 5, label/intro du bloc 9, texte d'intro du bloc 4, titre H2 de
// la FAQ, resume du carton 2 du rail et texte/resume du carton 3) n'ont
// pas de valeur dictée explicitement dans le brief : complétés ici par
// une phrase courte, neutre, sans fait ni chiffre nouveau — signalés en
// commentaire à chaque endroit, à valider/ajuster par Franck.

import type { PubliciteServiceContent } from "./types";

export const publicite: PubliciteServiceContent = {
  meta: {
    title: "Agence Google Ads à Toulouse",
    description:
      "Agence Google Ads à Toulouse : campagnes Search et Shopping " +
      "pour e-commerce et PME, en France et en Belgique. Inoko : " +
      "rentable dès la 2e semaine.",
  },

  // Mesuré Playwright (build de prod, même méthode que
  // --service-hero-title-cqi d'Automatisation, ServiceHero.module.css) :
  // k = largeur de « Agence Google Ads » (titleLine1, la plus longue des
  // deux lignes) à 100px / 100 = 9.0391 (mesurée sur un <span> ISOLÉ,
  // même police/graisse/letter-spacing que le h1 réel). cqi = 100/k.
  heroTitleCqi: 11.0631,

  hero: {
    titleLine1: "Agence Google Ads",
    titleLine2: "à Toulouse",
    subtitle:
      "Campagnes Search et Shopping pour votre boutique en ligne : " +
      "chaque euro investi est suivi jusqu'à la vente, en France et en " +
      "Belgique.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
    chain: {
      notification: {
        label: "GOOGLE · À L'INSTANT",
        title: "Recherche : lampe en céramique",
      },
      steps: [
        { number: "01", title: "Annonce", status: "Votre produit en tête des résultats" },
        { number: "02", title: "Visite", status: "Le client arrive sur la bonne fiche" },
        { number: "03", title: "Commande", status: "Panier validé sur votre boutique" },
        { number: "04", title: "Mesure", status: "La vente remonte dans Google Ads" },
      ],
    },
  },

  inokoCase: {
    label: "CAS CLIENT · INOKO",
    title: "Inoko : Google Ads rentable dès la 2e semaine",
    text:
      "Inoko fabrique du mobilier modulable pour van à Toulouse. On a " +
      "lancé ses campagnes Google Ads : elles ont été rentables dès " +
      "la deuxième semaine, avec un ROAS de 15.",
    invested: { amount: "1 €", label: "investi" },
    revenue: { amount: "15 €", label: "de chiffre d'affaires", squares: 15 },
    definition: "ROAS : chiffre d'affaires généré par euro de publicité.",
  },

  timeline: {
    label: "LA MÉTHODE",
    title: "De la première recherche à la vente mesurée",
    moments: [
      {
        label: "MESURER",
        tasks: [
          {
            name: "Suivi des conversions",
            text: "Chaque commande remonte dans Google Ads avec son montant.",
          },
          {
            name: "Flux produits",
            text: "Votre catalogue envoyé à Google Merchant Center, prix et stock à jour.",
          },
        ],
      },
      {
        label: "LANCER",
        tasks: [
          {
            name: "Campagnes Search",
            text: "Vos annonces sur les requêtes de clients prêts à acheter.",
          },
          {
            name: "Campagnes Shopping",
            text: "Vos produits en images, avec leur prix, en haut de Google.",
          },
        ],
      },
      {
        label: "OPTIMISER",
        tasks: [
          {
            name: "Mots-clés",
            text: "Le budget va aux recherches qui vendent, les autres sont exclues.",
          },
          {
            name: "Bilan mensuel",
            text: "Ce que chaque campagne a rapporté, en euros.",
          },
        ],
      },
    ],
  },

  starting: {
    label: "PAR OÙ COMMENCER",
    title: "Les premières campagnes, selon votre boutique",
    // Phrase de transition générique, pas de valeur dictée pour ce champ
    // dans le brief — reprise mot pour mot de celle déjà utilisée par
    // Automatisation pour le même rôle (content/services/automatisation.ts,
    // starting.text), plutôt qu'inventée.
    text: "Trois situations reviennent souvent.",
    items: [
      {
        title: "Vous lancez votre boutique",
        text:
          "Une campagne Search sur vos produits phares, pour vos " +
          "premières ventes et vos premières données.",
      },
      {
        title: "Vous avez déjà un compte Google Ads",
        text: "On audite le compte, puis on concentre le budget sur ce qui rapporte.",
      },
      {
        title: "Vous vendez en France et en Belgique",
        text: "Une campagne par pays, chacune avec son budget et son suivi.",
      },
    ],
  },

  otherActivities: {
    // Label non dicté dans le brief — repris du titre du bloc 5 dans le
    // prompt (« LES CAMPAGNES »), pas inventé.
    label: "LES CAMPAGNES",
    title: "Vos campagnes SEA sur tout Google",
    intro: "Chaque type de campagne répond à un moment de l'achat.",
    items: [
      {
        name: "Search",
        text: "Votre annonce texte au-dessus des résultats, sur les requêtes que vous choisissez.",
      },
      {
        name: "Shopping",
        text: "La photo, le prix et le nom de votre produit, directement dans Google.",
      },
      {
        name: "Performance Max",
        text:
          "Une seule campagne diffusée sur Search, Shopping, YouTube et " +
          "Gmail, à partir de votre flux produits.",
      },
      {
        name: "Remarketing",
        text: "Vos annonces revues par les visiteurs déjà passés sur votre boutique.",
      },
    ],
  },

  redBand: {
    title: "Combien vous rapporte 1 € de publicité ?",
    text: "Lors du premier appel, on regarde votre compte et vos marges ensemble.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  roasCalculator: {
    label: "CALCULEZ",
    title: "Le ROAS minimum pour être rentable",
    marginLabel: "Marge brute (%)",
    marginDefault: 40,
    basketLabel: "Panier moyen (€)",
    roasResultLabel: "ROAS minimum :",
    roasHelp: "Au-dessus de ce chiffre, chaque vente issue de Google Ads est rentable.",
    costResultLabel: "Coût maximum par commande :",
    note: "Calcul sur votre marge brute.",
    emptyValue: "—",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  crossLink: {
    label: "GOOGLE ADS ET RÉFÉRENCEMENT",
    title: "Google Ads pour vendre vite, le référencement pour durer",
    text:
      "Les annonces apportent des ventes dès leur lancement. Les " +
      "requêtes qui convertissent guident ensuite le contenu de votre " +
      "référencement naturel, qui prend le relais dans la durée. Chez " +
      "Inoko, Google Ads a pris le relais du référencement, et les deux " +
      "ont tourné ensemble.",
    // /services/seo : l'ancienne adresse de cette page, déjà indexée
    // par Google, conservée.
    cta: { label: "Découvrir le référencement naturel", href: "/services/seo" },
  },

  appartient: {
    // Label repris du titre du bloc 9 dans le prompt (« CE QUI VOUS
    // APPARTIENT »). Intro non dictée : phrase de transition générique,
    // même rôle que « Trois situations reviennent souvent. » plus haut —
    // pas de fait ni de chiffre nouveau.
    label: "CE QUI VOUS APPARTIENT",
    title: "Votre compte, vos données",
    intro: "Trois choses à savoir.",
    items: [
      {
        name: "Le compte",
        text: "Créé à votre nom, nous y accédons en tant que gestionnaire.",
      },
      {
        name: "Le budget",
        text: "Payé directement à Google, par votre carte.",
      },
      {
        name: "Le bilan",
        text: "Chaque mois, ce que chaque campagne a rapporté, en euros.",
      },
    ],
  },

  faq: {
    label: "QUESTIONS FRÉQUENTES",
    // Titre non dicté dans le brief — même construction que celui
    // d'Automatisation (« Vos questions sur l'automatisation n8n »),
    // adapté au sujet de cette page, pas de fait nouveau.
    title: "Vos questions sur Google Ads",
    items: [
      {
        question: "Quel budget Google Ads prévoir pour une PME ?",
        answer:
          "Vous fixez vous-même un budget quotidien. On le calcule lors " +
          "du premier appel, à partir de vos marges et de vos objectifs. " +
          "Le budget publicitaire est payé directement à Google ; " +
          "notre accompagnement fait l'objet d'un devis.",
      },
      {
        question: "Agence, consultant ou freelance Google Ads : quelle différence ?",
        answer:
          "Venturia est un studio : la personne avec qui vous " +
          "échangez est celle qui gère vos campagnes SEA, de l'audit au " +
          "bilan mensuel.",
      },
      {
        question: "En combien de temps voit-on les premiers résultats ?",
        answer:
          "Les annonces s'affichent dès leur validation par Google. Chez " +
          "Inoko, les campagnes ont été rentables dès la deuxième semaine.",
      },
      {
        question: "Google Shopping est-il adapté à ma boutique ?",
        answer:
          "Oui, dès que vous vendez des produits avec un prix affiché. " +
          "Votre catalogue part dans Google Merchant Center : " +
          "Shopify, WooCommerce et PrestaShop s'y connectent.",
      },
      {
        question: "Gérez-vous des campagnes en Belgique ?",
        answer: "Oui : une campagne par pays, chacune avec son budget et son suivi.",
      },
      {
        question: "Google Ads ou référencement naturel : par où commencer ?",
        answer:
          "Google Ads pour des ventes rapides, le référencement pour un " +
          "trafic qui dure. Les deux se renforcent : les requêtes " +
          "qui vendent en publicité guident le contenu à travailler en " +
          "référencement.",
      },
      {
        question: "Qui possède le compte Google Ads ?",
        answer:
          "Vous. Le compte est créé à votre nom, et nous y accédons en " +
          "tant que gestionnaire.",
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
        name: "Site internet",
        phrase: "Un site à votre image, pensé pour convertir.",
        ctaLabel: "En savoir plus",
        href: "/services/creation-site",
      },
    ],
  },

  rail: [
    {
      title: "Vous vendez en ligne ?",
      resume: "Google Shopping pour votre boutique",
      text: "Vos produits en photo, avec leur prix, en haut de Google.",
      href: "#campagnes",
    },
    {
      title: "Déjà un compte Google Ads ?",
      // Resume non dicté dans le brief — paraphrase courte du texte,
      // même style que le resume du carton 1 (groupe nominal, pas de
      // fait nouveau).
      resume: "Audit de votre compte Google Ads",
      text: "On l'audite et on concentre le budget sur ce qui vend.",
    },
    {
      title: "On discute ?",
      // Texte/resume non dictés au-delà du titre — repris du même
      // modèle que le carton « contact » de la home (content/rail.ts)
      // et d'Automatisation, adapté au sujet de cette page.
      resume: "20 minutes, sans engagement",
      text:
        "20 minutes, sans engagement. On étudie votre compte et vos " +
        "campagnes avant l'appel, puis on vous dit ce qu'on ferait, dans " +
        "quel ordre.",
      href: "/contact",
    },
  ],
};
