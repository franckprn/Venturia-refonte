// Contenu de /services/seo, réécrit depuis content/services/seo.ts.
// Retirés, faute de figurer dans le brief : la ville, la Belgique, le
// suivi mensuel, les « 12 commandes », les « 5 000 recherches » et le
// délai cité au nom de Google. Chiffres de résultat : Inoko seulement.

export const seoMeta = {
  title: "Référencement e-commerce : SEO et GEO pour boutiques en ligne | Venturia",
  description:
    "Fiches produits, catégories, guides et données structurées : Venturia travaille le référencement " +
    "des boutiques en ligne pour Google et pour les réponses des IA. Cas Inoko : de 86 à 1 736 clics par mois.",
};

export const seoHero = {
  kicker: "Référencement SEO et GEO pour les boutiques en ligne",
  title: "Trouvé sur Google, cité par les IA.",
  sub:
    "On retravaille vos pages produits, vos catégories et vos guides pour qu'ils montent dans Google et " +
    "apparaissent dans les réponses de ChatGPT, Gemini ou Perplexity.",
};

// Deux volets, présentés comme deux colonnes de travail concrètes.
export const seoWork = [
  {
    id: "seo",
    name: "SEO",
    title: "Monter dans Google sur les recherches qui vendent.",
    items: [
      { name: "Audit technique", text: "Vitesse, indexation, erreurs : votre boutique lue correctement par Google." },
      { name: "Mots-clés", text: "Les requêtes de vos clients, classées par potentiel de vente." },
      { name: "Fiches produits", text: "Titres, descriptions et balises réécrits pour les requêtes qui vendent." },
      { name: "Pages guides", text: "Un guide complet qui fait monter toute une famille de produits." },
    ],
  },
  {
    id: "geo",
    name: "GEO",
    title: "Être la source que citent les IA.",
    items: [
      { name: "Réponses directes", text: "Des pages qui répondent clairement aux questions de vos clients." },
      { name: "Données structurées", text: "Prix, avis et caractéristiques lisibles par les moteurs et les IA." },
      { name: "Sources citées", text: "Votre marque présente sur les sites que les IA consultent." },
    ],
  },
] as const;

export const seoMethod = [
  {
    verb: "Analyser",
    text: "Audit technique et étude des requêtes : on repère ce que cherchent vos clients et ce qui freine vos pages.",
  },
  {
    verb: "Optimiser",
    text: "Fiches produits, catégories et balises réécrites, puis une page guide pour porter toute une gamme.",
  },
  {
    verb: "Développer",
    text: "Des contenus qui répondent aux questions posées avant l'achat, prêts à être repris par les IA.",
  },
] as const;

export const seoStarting = [
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
    text: "On conserve vos positions : chaque ancienne adresse redirigée, chaque contenu utile gardé.",
  },
] as const;

// Première phrase de chaque réponse : elle répond seule à la question
// (extraits Google et réponses des IA la reprennent telle quelle).
export const seoFaq = [
  {
    question: "En combien de temps le référencement donne-t-il des résultats ?",
    answer: [
      "Le délai dépend de votre boutique et de la concurrence sur vos requêtes ; chez Inoko, les clics depuis Google sont passés de 204 en janvier 2026 à 1 736 en mai.",
      "Les commandes ont suivi : de 1 en janvier à 13 en avril.",
    ],
  },
  {
    question: "Qu'est-ce que le GEO ?",
    answer: [
      "Le GEO (Generative Engine Optimization) prépare vos contenus pour que ChatGPT, Gemini, Perplexity et les résumés IA de Google citent votre boutique dans leurs réponses.",
      "Il s'appuie sur les mêmes bases que le SEO : des pages claires, des données structurées et une marque présente sur les sites que les IA consultent.",
    ],
  },
  {
    question: "Combien coûte le référencement d'une boutique en ligne ?",
    answer: [
      "Le prix est fixé sur devis, après un appel de 20 minutes.",
      "Il dépend du nombre de fiches produits et de catégories, de la concurrence sur vos requêtes, de l'état technique du site et du nombre de contenus publiés chaque mois.",
    ],
  },
  {
    question: "Le référencement fonctionne-t-il sur Shopify, WooCommerce et PrestaShop ?",
    answer: [
      "Oui, fiches produits, catégories, balises et données structurées se travaillent sur Shopify, WooCommerce et PrestaShop, comme sur un site sur-mesure en Next.js.",
    ],
  },
  {
    question: "Peut-on garder ses positions en refaisant son site ?",
    answer: [
      "Oui, chaque ancienne adresse est redirigée vers la nouvelle et les contenus qui se positionnent sont conservés.",
      "On prépare cette correspondance avant la mise en ligne du nouveau site.",
    ],
  },
  {
    question: "Référencement ou Google Ads : par quoi commencer ?",
    answer: [
      "Le référencement installe un trafic qui revient chaque mois, Google Ads apporte des visites dès son lancement : les deux se complètent.",
      "Chez Inoko, Google Ads a été lancé en avril 2026, après le SEO, et s'est montré rentable dès la deuxième semaine, avec un ROAS de 15.",
    ],
  },
] as const;
