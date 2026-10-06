// Contenu de la page /services/automations (Automatisation), fourni par
// Franck. À reprendre au caractère près : ne rien reformuler, ne rien
// ajouter. Apostrophes droites ('), comme le reste de content/*.ts.
// Espace fine insécable (U+202F) avant : ? ! ; (CLAUDE.md, « Texte ») —
// posée ici directement dans les chaînes, pas au rendu.

import type { ServicePageContent } from "./types";

export const automatisation: ServicePageContent = {
  meta: {
    title: "Agence automatisation n8n à Toulouse",
    description:
      "Agence n8n à Toulouse : on automatise votre e-commerce ou " +
      "votre PME (fiches produits, articles de blog, stock, emails " +
      "clients).",
  },

  hero: {
    titleLine1: "Agence automatisation",
    titleLine2: "n8n à Toulouse",
    subtitle:
      "Fiches produits à jour et emails envoyés à chaque étape de la " +
      "commande : on automatise votre boutique en ligne avec n8n, à " +
      "partir de vos outils actuels.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
    chain: {
      notification: {
        label: "VOTRE BOUTIQUE · À L'INSTANT",
        title: "Nouvelle commande reçue",
      },
      steps: [
        { number: "01", title: "Facture", status: "Envoyée au client et au comptable" },
        { number: "02", title: "Stock", status: "À jour sur tous vos canaux" },
        { number: "03", title: "Atelier", status: "Commande transmise à votre fabricant" },
        { number: "04", title: "Avis", status: "Demande prévue après livraison" },
      ],
    },
  },

  timeline: {
    label: "AUTOMATISATIONS E-COMMERCE",
    title: "Ce qui tourne seul dans votre boutique",
    moments: [
      {
        label: "AVANT LA VENTE",
        tasks: [
          {
            name: "Fiches produits",
            text:
              "Titres, prix et descriptions mis à jour sur tous vos " +
              "canaux à partir d'un seul fichier.",
          },
          {
            name: "Articles de blog",
            text:
              "Un brouillon rédigé à partir de vos sujets, que vous " +
              "relisez avant publication.",
          },
        ],
      },
      {
        label: "À LA COMMANDE",
        tasks: [
          {
            name: "Facture",
            text: "Générée et classée pour votre comptabilité.",
          },
          {
            name: "Stock",
            text: "Le même chiffre partout, à chaque vente.",
          },
          {
            name: "Atelier",
            text: "Le bon de fabrication part chez votre fabricant.",
          },
        ],
      },
      {
        label: "APRÈS LA LIVRAISON",
        tasks: [
          {
            name: "Emails clients",
            text:
              "Suivi d'expédition, puis relance au bon moment pour " +
              "repasser commande.",
          },
          {
            name: "Avis Google",
            text: "La demande part quand le colis est arrivé.",
          },
        ],
      },
    ],
  },

  starting: {
    label: "PAR OÙ COMMENCER",
    title: "Les premiers flux, selon votre boutique",
    text:
      "On commence par la tâche qui vous prend le plus de temps chaque " +
      "semaine. Trois situations reviennent souvent.",
    items: [
      {
        title: "Vous vendez sur plusieurs canaux",
        text:
          "Site, marketplace, boutique physique : vos stocks et vos " +
          "fiches produits restent alignés partout, sans ressaisie.",
      },
      {
        title: "Vous faites fabriquer vos produits",
        text:
          "Chaque commande part chez votre atelier ou votre fournisseur, " +
          "avec les bonnes références.",
      },
      {
        title: "Vous gérez tout seul",
        text:
          "Factures, demandes d'avis, emails de relance pour repasser " +
          "commande : ce qui se répète part sans vous, et vous gardez " +
          "votre temps pour vendre.",
      },
    ],
  },

  otherActivities: {
    label: "AUTRES ACTIVITÉS",
    title: "Automatisation pour artisans, cabinets et entreprises de services",
    intro: "On automatise aussi vos tâches qui se répètent.",
    items: [
      {
        name: "Prospects",
        text: "Chaque demande reçue sur votre site arrive dans votre CRM, avec une relance programmée.",
      },
      {
        name: "Tableaux de bord",
        text: "Vos chiffres de la semaine réunis dans un seul tableau, chaque lundi matin.",
      },
      {
        name: "Comptabilité",
        text: "Factures envoyées, classées et transmises à votre comptable dès leur émission.",
      },
      {
        name: "Devis",
        text: "Le devis part en PDF depuis votre téléphone, en quelques clics.",
      },
      {
        name: "Agents IA",
        text: "Un agent lit les emails entrants, les classe et prépare les réponses que vous validez.",
      },
    ],
  },

  redBand: {
    title: "Quelle tâche vous prend le plus de temps ?",
    text: "Lors du premier appel, on voit ensemble comment vous en décharger.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  calculator: {
    label: "CALCULEZ",
    title: "Ce que vous coûte une tâche faite à la main",
    minutesLabel: "Durée de la tâche (en minutes)",
    minutesDefault: 15,
    countLabel: "Nombre de fois par semaine",
    countDefault: 10,
    hourlyCostLabel: "Votre coût horaire (en €)",
    resultSuffix: "heures par an",
    euroPrefix: "soit",
    euroSuffix: "par an",
    emptyValue: "—",
    note: "Calcul sur 52 semaines.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  tool: {
    label: "L'OUTIL",
    title: "Make, Zapier ou n8n ?",
    intro:
      "Zapier, Make et n8n répondent au même besoin : relier vos " +
      "outils pour que les tâches s'enchaînent seules. On a choisi n8n, " +
      "un outil d'automatisation au code source public, pour trois " +
      "raisons concrètes.",
    sections: [
      {
        heading: "Un coût stable.",
        text:
          "Zapier facture chaque action, Make chaque étape exécutée. n8n " +
          "tourne sur un serveur au prix fixe, que votre boutique traite " +
          "dix commandes par mois ou mille.",
      },
      {
        heading: "Un serveur en Europe.",
        text:
          "On héberge n8n sur notre serveur en Europe et on s'occupe de " +
          "tout. Si vous préférez, on l'installe sur votre propre serveur.",
      },
    ],
  },

  integrations: {
    label: "INTÉGRATIONS",
    title: "Connectez vos outils entre eux",
    intro:
      "Votre boutique, votre messagerie, vos tableaux : n8n les " +
      "relie entre eux, et vous gardez les outils que vous utilisez " +
      "déjà. Shopify et WooCommerce se connectent nativement, " +
      "PrestaShop via son API.",
    tools: [
      { name: "Shopify", icon: "shopify" },
      { name: "WooCommerce", icon: "woocommerce" },
      { name: "PrestaShop", icon: "prestashop" },
      { name: "Gmail", icon: "gmail" },
      { name: "Brevo", icon: "brevo" },
      { name: "Google Sheets", icon: "googlesheets" },
      { name: "Google Drive", icon: "googledrive" },
      { name: "Notion", icon: "notion" },
      { name: "Telegram", icon: "telegram" },
      { name: "WhatsApp", icon: "whatsapp" },
      { name: "HubSpot", icon: "hubspot" },
      { name: "Claude", icon: "claude" },
    ],
    outro:
      "Outlook, Excel, Word, Slack, Pipedrive, OpenAI : on les " +
      "relie aussi, comme tout outil qui dispose d'une API.",
  },

  faq: {
    label: "QUESTIONS FRÉQUENTES",
    title: "Vos questions sur l'automatisation n8n",
    items: [
      {
        question: "Combien coûte une automatisation n8n ?",
        answer:
          "Le prix dépend du nombre de tâches à automatiser, du nombre " +
          "d'outils à connecter et de leur complexité. Une boutique " +
          "Shopify ou WooCommerce se connecte directement ; une " +
          "boutique PrestaShop demande un peu plus de travail. Après " +
          "l'appel de 20 minutes, on vous envoie un devis détaillé.",
      },
      {
        question: "Quelle différence entre n8n, Make et Zapier ?",
        answer:
          "Les trois relient vos outils entre eux. Zapier facture chaque " +
          "action, Make chaque étape exécutée ; n8n tourne sur un " +
          "serveur au prix fixe, quel que soit le volume. n8n demande " +
          "davantage de technique à la construction : c'est " +
          "précisément la partie qu'on prend en charge.",
      },
      {
        question: "Qui s'occupe de l'hébergement ?",
        answer:
          "On héberge vos automatisations sur notre serveur en Europe et " +
          "on s'occupe de tout : chaque modification passe par nous. " +
          "Si vous préférez garder la main sur vos flux, on installe n8n " +
          "sur votre propre serveur.",
      },
      {
        question: "Peut-on passer de Make ou Zapier à n8n ?",
        answer:
          "Oui. On reprend vos scénarios un par un et on les reconstruit " +
          "en workflows n8n. Vos outils restent les mêmes : seul le " +
          "moteur qui les relie change.",
      },
      {
        question: "Combien de temps faut-il pour mettre en place une automatisation ?",
        answer:
          "De quelques jours à quelques semaines, selon la complexité. " +
          "Une demande d'avis après livraison se met en place vite ; " +
          "une mise à jour de fiches produits à partir de plusieurs " +
          "sources demande plus de temps. On vous donne le délai exact " +
          "pendant l'appel. Chaque flux est livré avec sa notice écrite.",
      },
      {
        question: "Qui fait évoluer les flux ensuite ?",
        answer:
          "On s'en charge : vous nous dites ce qui change, on met le " +
          "flux à jour. Quand un réglage change souvent (un modèle " +
          "d'email, un délai), on le place dans un tableau que vous " +
          "modifiez vous-même, et on vous montre comment faire.",
      },
    ],
  },

  otherExpertises: {
    label: "AUTRES EXPERTISES",
    items: [
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
      title: "Vous vendez des services ?",
      resume: "Les mêmes flux, pour votre activité",
      text:
        "Devis, factures, suivi des prospects : on automatise aussi " +
        "les artisans et les entreprises de services.",
      href: "#autres-activites",
    },
    {
      title: "On reprend vos scénarios",
      resume: "Déjà sur Make ou Zapier ?",
      text:
        "On les reconstruit sur n8n, et vos outils restent les mêmes.",
    },
    {
      title: "20 minutes, sans engagement",
      resume: "On discute ?",
      text:
        "On étudie votre boutique et vos outils avant l'appel, puis on " +
        "vous dit quelles tâches automatiser en premier, et dans quel " +
        "ordre.",
      href: "/contact",
    },
  ],
};
