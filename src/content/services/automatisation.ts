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
      "Agence n8n à Toulouse : on automatise les tâches qui se répètent " +
      "dans votre boutique en ligne, des fiches produits aux emails clients.",
  },

  hero: {
    label: "AUTOMATISATION · TOULOUSE",
    title: "Agence automatisation n8n à Toulouse",
    subtitle:
      "Fiches produits à jour et emails envoyés à chaque étape de la " +
      "commande : on automatise votre boutique en ligne avec n8n, à " +
      "partir de vos outils actuels.",
    cta: { label: "Réserver 20 minutes", href: "/contact" },
  },

  quadBlock: {
    label: "CE QU'ON AUTOMATISE",
    title: "Ce qui tourne seul dans votre boutique",
    cards: [
      {
        title: "Fiches produits",
        text:
          "Prix, stocks, descriptions : vos fiches se mettent à jour à " +
          "partir de votre fichier fournisseur ou de votre outil de " +
          "gestion, sans ressaisie.",
      },
      {
        title: "Emails clients",
        text:
          "Confirmation, expédition, livraison, conseils d'utilisation, " +
          "réachat : chaque client reçoit le bon message au bon moment.",
      },
      {
        title: "Avis Google",
        text:
          "Quelques jours après la livraison, vos clients reçoivent un " +
          "lien pour laisser un avis. Chaque nouvel avis rassure les " +
          "visiteurs suivants.",
      },
      {
        title: "Factures",
        text:
          "Chaque commande génère sa facture, envoyée à votre client et " +
          "rangée pour votre comptable.",
      },
    ],
  },

  process: {
    label: "EXEMPLE DE PARCOURS",
    title: "Un email à chaque étape, de la commande au réachat",
    paragraph:
      "Votre plateforme envoie déjà la confirmation et l'avis " +
      "d'expédition. On ajoute les messages qui suivent la livraison : " +
      "ceux qui donnent envie de laisser un avis et de commander à " +
      "nouveau. Chaque email part au bon moment, depuis votre outil " +
      "d'emailing actuel.",
    steps: [
      {
        number: "01",
        label: "Commande",
        description: "Confirmation et récapitulatif, dès la commande.",
      },
      {
        number: "02",
        label: "Expédition",
        description: "Le numéro de suivi, dès le départ du colis.",
      },
      {
        number: "03",
        label: "Livraison",
        description:
          "Un message à l'arrivée du colis, avec vos coordonnées en cas " +
          "de question.",
      },
      {
        number: "04",
        label: "Quelques jours après",
        description:
          "Les conseils d'utilisation et d'entretien du produit reçu.",
      },
      {
        number: "05",
        label: "Avis",
        description: "Un lien direct pour laisser un avis Google.",
      },
      {
        number: "06",
        label: "Quelques semaines après",
        description:
          "Un produit complémentaire, ou un rappel quand il est temps de " +
          "racheter.",
      },
    ],
    note: "Délais et messages réglés selon vos produits.",
  },

  tool: {
    label: "L'OUTIL",
    title: "Make, Zapier ou n8n : on construit tout sur n8n",
    intro:
      "Zapier, Make et n8n répondent au même besoin : relier vos " +
      "outils pour que les tâches s'enchaînent seules. On a choisi n8n, " +
      "un outil d'automatisation au code source public, pour trois " +
      "raisons concrètes.",
    sections: [
      {
        heading: "Un coût stable",
        text:
          "Zapier facture chaque action, Make chaque étape exécutée. n8n " +
          "tourne sur un serveur au prix fixe, que votre boutique traite " +
          "dix commandes par mois ou mille.",
      },
      {
        heading: "Un serveur en Europe",
        text:
          "On héberge n8n sur notre serveur en Europe et on s'occupe de " +
          "tout. Si vous préférez, on l'installe sur votre propre serveur.",
      },
      {
        heading: "Votre boutique, déjà compatible",
        text:
          "Shopify et WooCommerce se connectent directement à n8n. " +
          "PrestaShop se branche aussi, via son API.",
      },
    ],
    callout: {
      title: "Déjà sur Make ou Zapier ?",
      text:
        "Vos scénarios tournent déjà sur Make ou Zapier ? On les " +
        "reconstruit sur n8n, et vos outils restent les mêmes.",
    },
    table: {
      columns: ["Zapier", "Make", "n8n, chez Venturia"],
      rows: [
        {
          label: "Facturation",
          values: ["À chaque action", "À chaque étape exécutée", "Prix fixe du serveur"],
        },
        {
          label: "Hébergement",
          values: [
            "Serveurs de l'éditeur",
            "Serveurs de l'éditeur",
            "Notre serveur en Europe, ou le vôtre",
          ],
        },
        {
          label: "Quand le volume monte",
          values: ["La facture suit", "La facture suit", "Le prix reste le même"],
        },
      ],
    },
  },

  rollout: {
    label: "DÉROULÉ",
    title: "De votre premier message à vos premiers flux",
    steps: [
      {
        number: "01",
        label: "Votre boutique",
        description:
          "Vous nous envoyez votre site et la liste des outils que vous " +
          "utilisez. On les étudie avant de vous appeler.",
      },
      {
        number: "02",
        label: "L'appel",
        description:
          "En 20 minutes, on choisit ensemble les tâches à automatiser " +
          "en premier, et on vous dit combien de temps prendra leur " +
          "mise en place.",
      },
      {
        number: "03",
        label: "La mise en service",
        description:
          "De quelques jours à quelques semaines, selon la complexité. " +
          "Chaque flux est livré avec une notice écrite, puis ajusté " +
          "selon vos retours.",
      },
    ],
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
          "pendant l'appel.",
      },
    ],
  },

  otherExpertises: {
    label: "AUTRES EXPERTISES",
    items: [
      {
        name: "Référencement",
        phrase: "Être trouvé sur Google, et cité par les IA.",
        ctaLabel: "Découvrir le référencement",
        href: "/services/referencement",
      },
      {
        name: "Publicité",
        phrase: "Plus de commandes, sans attendre.",
        ctaLabel: "Découvrir la publicité",
        href: "/services/publicite",
      },
      {
        name: "Site internet",
        phrase: "Un site à votre image, pensé pour convertir.",
        ctaLabel: "Découvrir la création de site",
        href: "/services/site-internet",
      },
    ],
  },

  rail: [
    {
      title: "L'outil qui relie vos applications",
      resume: "n8n, en une phrase",
      text:
        "n8n connecte votre boutique, votre outil d'emailing et vos " +
        "autres logiciels, pour que chaque tâche déclenche " +
        "automatiquement la suivante.",
    },
    {
      title: "Une tâche qui s'enchaîne seule",
      resume: "Un flux, c'est quoi ?",
      text:
        "Un déclencheur, par exemple une nouvelle commande, puis une " +
        "suite d'actions : facture envoyée, email au client, fiche " +
        "produit mise à jour.",
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
