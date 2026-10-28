# Brief — test de design de la home Venturia

Ce dossier est une copie de test. Le code sera jeté : seules comptent la direction visuelle et la direction éditoriale. Tu n'as pas à respecter l'architecture existante. Tu peux tout reconstruire : page d'accueil complète, navigation et pied de page compris.

## Venturia
Studio digital qui aide les entreprises à trouver plus de clients en ligne et à vendre plus. Aucun lieu n'est mentionné sur la page.
- Cible principale : les boutiques en ligne (e-commerce), tous secteurs.
- Cible secondaire : les TPE et PME qui vendent des produits ou des services.
- 4 services :
  - Référencement : SEO + visibilité dans les réponses des IA (GEO).
  - Publicité : Google Ads uniquement.
  - Site internet : Shopify, WooCommerce, PrestaShop ou sur-mesure Next.js, livré en 2 à 8 semaines ; hébergement, mises à jour et évolutions inclus dans le forfait mensuel.
  - Automatisation : n8n, hébergé par Venturia sur un serveur en Europe.
- Modèle : sur devis, après un appel de 20 minutes. Aucun prix affiché.

## Objectif de la home
Le visiteur type arrive depuis un email de prospection. En moins d'une minute, il doit :
1) comprendre comment on peut l'aider et l'accompagner ;
2) voir une preuve concrète (Inoko) ;
3) avoir envie de démarrer ;
4) réserver un créneau.
Il doit se dire : « c'est sérieux, c'est soigné, ils savent faire ».
Appels à l'action : plusieurs, avec des formulations variées (jamais la même phrase répétée). Action principale : réserver un créneau de 20 minutes (lien /contact). Alternative : écrire à hey@venturia.fr.
Second objectif, le SEO : un seul H1, explicite (activité + cible), et tous les titres en vrai texte.

## Preuve : Inoko (seuls chiffres de résultat autorisés)
Inoko vend du mobilier modulable pour van. Ancien client : toujours au passé, jamais « client actuel ». Le site d'Inoko n'a pas été fait par Venturia.
- Départ (janvier 2026) : 1 vente par mois, via Leboncoin, seul canal de vente.
- Travail : pages produits retravaillées + une page guide (fabriquer un lit peigne).
- Clics depuis Google (Search Console) : déc. 2025 : 86 · janv. : 204 · févr. : 304 · mars : 590 · avr. : 1 016 · mai : 1 736.
- Commandes : 1 (janvier) → 13 (avril). CA mensuel : 1 000 € (janvier) → 9 521 € TTC (avril).
- Requête « lit peigne 140x190 » : position moyenne 1,6 sur Google.
- Google Ads lancé après le SEO, en avril 2026 : rentable dès la deuxième semaine, ROAS de 15.
Aucun autre chiffre de résultat, nulle part. Aucun résultat affirmé pour l'automatisation ni pour les sites livrés. Rien sur le remarketing, Performance Max, un bilan mensuel ou un délai de réponse.

## Avis clients
3 emplacements marqués « AVIS À VENIR ». N'invente aucun texte d'avis ni aucun nom.

## Direction artistique
Références (en prendre l'idée, sans copier) :
- synqro.co : structure, beaucoup de vide, la typographie porte la page ; page contact avec gros titre, email en très grand et agenda intégré.
- springsummer.dk : qualité photo éditoriale, typographie géante assumée.
- area17.com/fr : direction artistique radicale, peu de composants, répétés avec rigueur.
- noqode.fr : vraie photo + carte d'interface posée dessus.
- vydera.com/fr : cartes d'interface sobres, labels en police mono.
- digidop.com/fr : pied de page plein écran qui sert de plan du site.
À éviter : le rendu « template IA » (dégradés, grilles de cartes identiques, icônes génériques), les murs de logos, une page entièrement sombre.
Palette : charbon (~#1A1614), crème (~#DEDCD3), rouge (~#FE3939). Nuances ajustables, aucune autre teinte.
Polices : libres. Propose-les et justifie ton choix.
Texte secondaire : peut être atténué, avec un contraste d'au moins 4,5:1.

## Images
- public/photos-test/ : 10 photos provisoires (paysages, plats, divers). Utilise-les si elles servent la page ; elles seront remplacées.
- Les photos d'Inoko déjà présentes dans le repo.
- Téléchargement autorisé depuis toutes les sources, à condition que la licence permette un usage commercial : domaine public, CC0, CC BY (crédit obligatoire), licences Unsplash et Pexels. Interdits : licences NC (non commerciales) ou ND, images sans licence claire, picsum.photos, images générées par IA, logos de marques tierces.
- Pistes : tableaux anciens (collections ouvertes du Met, de l'Art Institute of Chicago, du Rijksmuseum), belles architectures d'intérieur.
- Chaque image téléchargée va dans public/images-test/ et est notée dans CREDITS-IMAGES.md (fichier, source, URL, auteur, licence).
- Interfaces stylisées autorisées (rapport mensuel, workflow n8n, fiche produit, résultat Google), avec des données de démonstration et la mention discrète « données de démonstration ». Seule exception : la carte Inoko, avec ses vrais chiffres.

## Icônes
@phosphor-icons/react est installé. Tu peux aussi dessiner tes propres icônes en SVG.

## Rédaction
Réécriture libre : pars des textes de content/*.ts ou réécris tout, sans ajouter de promesse ni de fait.
« On » en sujet, « nous » en complément, jamais « je ». Aucune formulation négative (« sans » toléré), pas de tournure « X, pas Y ». Des bénéfices concrets pour l'entreprise du client.

## Technique
Next.js 16 App Router, Tailwind, GSAP + ScrollTrigger, @phosphor-icons/react. Aucune autre dépendance npm (ni Motion ni framer-motion). prefers-reduced-motion respecté. Rendu soigné à 390 px et à 1440 px, sans scroll horizontal.
