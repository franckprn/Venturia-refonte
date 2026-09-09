# Site Venturia — règles du projet

Site vitrine Venturia. Next.js (App Router) · Tailwind · GSAP + ScrollTrigger ·
Lenis · Vercel. Polices via `next/font/google` : les fichiers sont servis depuis
notre domaine, pas de `<link>` vers fonts.googleapis.com.

Ce fichier fixe le visuel. Les textes définitifs sont écrits par Franck ;
tout ce qui est rédigé pendant le développement est du placeholder.

## Couleurs

Trois couleurs, reprises de springsummer.dk.

--ground:      #DEDCD3   crème
--ink:         #0A0605   charbon
--accent:      #FE3939   rouge
--line:        rgba(10,6,5,.16)
--line-accent: rgba(254,57,57,.2)

Palette fermée : ces trois couleurs, pas de gris, pas de quatrième valeur.
Aucune restriction d'usage : chacune peut porter du fond comme du texte.
Par défaut, fond crème et texte charbon, ou l'inverse. Le rouge s'emploie
librement — fond de section, titre, aplat, filet, chiffre, souligné.
Franck arbitre le contraste au cas par cas : ne pas remplacer un rouge par
du charbon « pour la lisibilité » sans le lui demander.

Tous les fonds sont opaques. Aucun backdrop-filter nulle part : c'est le filtre
le plus coûteux du navigateur, il recompose tout l'arrière-plan à chaque frame et
provoque des artefacts sur Safari iOS quand il coexiste avec du position: fixed —
donc avec la nav et le méga-menu. Un aplat --ground rend la même chose.

Dans une section en négatif, un paragraphe long passe à 80 % d'opacité :
sur fond sombre, un texte clair paraît optiquement plus gras et vibre sur
plusieurs lignes. Les titres restent à 100 %.

## Typographie

Titres : Bricolage Grotesque (600, 800)
Corps  : Instrument Sans (400, 500)
Mono   : JetBrains Mono (400, 500)

--t-mono:  13px   mono,        lh 1.3,  ls +.01em   labels, méta, tags
--t-small: 15px   sans 400,    lh 1.45, ls +.01em   rail, mentions
--t-body:  17px   sans 400,    lh 1.55, ls +.01em   corps
--t-lead:  21px   sans 400,    lh 1.4,  ls +.01em   chapô
--t-title: 40px   display 600, lh 1.1,  ls -.02em   titre de section
--t-hero:  72px   display 800, lh 1.04, ls -.03em   hero
--t-mass: 180px   display 800, lh 0.82, ls -.01em   CTA géant de pied de page

@media (max-width: 767px)
--t-mono:  15px      --t-title: 28px
--t-small: 15px      --t-hero:  40px
--t-body:  16px      --t-mass:  60px
--t-lead:  19px + poids 500

Le letter-spacing positif sur --t-small, --t-body et --t-lead est mesuré et
délibéré : le conserver tel quel.

## Shell de page

Desktop (>= 1024px)
  conteneur    max-width 1440px, centré au-delà
  marge gauche 54px
  contenu      12 colonnes, gap 20px   (1136px à 1440 de large)
  rail droit   250px, padding-inline 20px  →  210px utiles
  le rail est le dernier élément, collé au bord droit du conteneur
  hauteur de nav 64px

Mobile (< 1024px)
  6 colonnes, gap 20px, marges 20px
  le rail passe en pleine largeur : les cartons s'insèrent dans le flux,
  350px de large (390 - 2×20), aux mêmes endroits que sur desktop

Le contenu reste dans le conteneur. Seul le rail va jusqu'au bord, protégé
par son padding de 20px.

Espacement vertical des sections : 96px mobile / 160px desktop.
Section dense 64/128. Section en négatif 128/200.
Titre de section → contenu : 32px mobile / 48px desktop.
Échelle : 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
Espacer au `gap` d'un flex ou d'une grille plutôt qu'aux marges individuelles.

## Arrondis

4px   boutons, cartons du rail, panneau du méga-menu, cartes, champs de
      formulaire, conteneurs d'image, icônes encadrées
3px   tags

## Rail droit

Trois cartons, chacun rattaché à une section de la page :
  1. au niveau du hero
  2. au niveau de la section services
  3. juste avant le CTA final

Comportement attendu, à l'identique de springsummer.dk :
le carton vit dans la colonne du rail et n'en sort jamais latéralement.
Il monte avec la page, puis se fige à 84px du haut de la fenêtre — soit la
hauteur de nav (64px) plus 20px, la même marge que le gap de grille et que
le retrait du rail. Il reste figé tant que sa section est à l'écran, puis
il repart vers le haut avec elle et le carton suivant prend le relais.
Si deux cartons devaient se retrouver figés en même temps, le second se fige
20px sous le bas du premier.

Deux implémentations acceptables :

  A. CSS sticky (à privilégier, aucun JS)
     <aside data-rail>
       <div data-rail-slot>          hauteur = celle de la section 1
         <article data-rail-card>    position: sticky; top: 84px
       </div>
       <div data-rail-slot>          hauteur = celle de la section 2
         <article data-rail-card>    position: sticky; top: 84px
       </div>
     Le slot est ce qui délimite la plage de figement. Le carton reste dans
     la colonne du rail dans tous les cas.

  B. Pin GSAP ScrollTrigger (ce que fait Spring/Summer)
     ScrollTrigger.create({ trigger: slot, start: 'top 84px',
       end: 'bottom 84px', pin: card, pinSpacing: false })
     À utiliser seulement si le sticky ne suffit pas — par exemple pour
     enchaîner le figement avec une autre animation de la timeline.

L'écart vertical entre deux cartons est celui des sections elles-mêmes :
ne pas ajouter de marge sur les cartons.

Aucun ancêtre d'un carton ne doit porter overflow: hidden, overflow: auto,
overflow: clip ni contain. Un seul de ces ancêtres suffit à désactiver
sticky, silencieusement, sans erreur : c'est la cause numéro un d'un sticky
qui « ne marche pas ». Si un carton ne colle pas, remonter l'arbre DOM avant
de toucher au CSS du carton.

carton
largeur    210px desktop / 350px mobile
padding    14px
display    grid, gap 10px
border     1px solid var(--line-accent)
radius     4px
fond       --ground, opaque
distinction le seul carton qui porte une action prend border-color: var(--accent)
           au lieu de var(--line-accent) — pas de fond différent, pas de blanc
titre      --t-mono, --ink
texte      --t-small, --ink

Mobile (< 1024px) : les cartons quittent le rail et s'insèrent dans le flux
aux mêmes endroits, en pleine largeur, sans figement.

## Méga-menu — desktop

panneau      position fixed, top = hauteur de la nav, left 54px
             largeur = celle de la zone de contenu (1136px à 1440)
             padding 20px
             fond --ground, opaque — pas de backdrop-filter
             border 1px solid var(--line-accent) sur les quatre côtés
             radius 4px, sans box-shadow
             hauteur naturelle, plafond 55vh
animation    translateY(-10px) → 0, opacity 0 → 1, 300ms, cubic-bezier(0,.55,.45,1)

colonnes     display flex, gap 20px, justify-content: space-between
             chaque colonne : width 269px, flex 0 0 auto
             Largeur fixe, pas de colonnes fluides : le vide entre deux
             colonnes doit rester plus large qu'une colonne.

  colonne 1  SERVICES   Référencement · Site internet · Automatisation
  colonne 2  SECTEURS   E-commerce · Professions artisanales
  colonne 3  CAS CLIENT Inoko

rythme       titre de colonne en haut, 40px de vide, première entrée
             pas vertical : 44px colonne 1, 33px colonne 2
typo         titre de colonne  --t-mono, --ink
             colonne 1  21px, lh 1.4, ls +.02em, poids 400, --ink
             colonne 2  18px, lh 1.4, ls +.02em, poids 400, --ink à 70 %
             (colonne 2 volontairement secondaire)

carte cas client
             aspect-ratio 1 / 1.25 (portrait), radius 4px, overflow hidden
             image object-fit: cover, padding interne 12px
             haut gauche : « Inoko » 13px puis « Mobilier de van, Toulouse »
             en --t-mono, --ground
             bas : deux tags --t-mono --ground,
             border 1px rgba(255,255,255,.2), radius 3px, padding 8px 13px, gap 10px
             dégradé linear-gradient(180deg, rgba(10,6,5,.45), transparent 30%,
             transparent 70%, rgba(10,6,5,.45)) sous le texte

comportement desktop : survol, 120ms de délai à l'entrée, 200ms à la sortie
             clavier et tactile : clic
             Escape ferme et rend le focus au déclencheur
             focus piégé dans le panneau, aria-expanded et aria-controls corrects
             scroll de page bloqué, Lenis mis en pause puis relancé

## Méga-menu — mobile (< 1024px)

Structure propre au mobile, pas un empilement des colonnes desktop.

déclencheur  le mot « Menu » en --t-mono dans la barre, à droite
panneau      plein écran, position fixed, padding 52px 20px 25px
             fond --ground, opaque — pas de backdrop-filter
             sans radius ni filet
entrées      3 entrées de premier niveau en <button> :
             Services · Réalisations · À propos
             40px, lh 40px, ls +.02em, poids 400, --ink
             pas vertical 60px, première entrée à 92px du haut
sous-niveaux accordéon au clic
contenu      ces 3 entrées et le bas de panneau, sans carte cas client
bas          ville, puis « M'écrire » et le téléphone, en --t-mono,
             sur une ligne, à 25px du bas

## Images

Toute image passe par `next/image`.
- width/height explicites, ou fill + conteneur en position relative
- `sizes` dès qu'une image ne fait pas la pleine largeur
- `priority` sur la seule image du hero, lazy pour toutes les autres
- `alt` en français décrivant ce que montre l'image ; `alt=""` si purement décoratif
- fichiers en minuscules-avec-tirets et mot-clé métier :
  `inoko-mobilier-van-toulouse.jpg`
- next.config : `images: { formats: ['image/avif', 'image/webp'] }`
- radius sur le conteneur (overflow hidden), pas sur l'image

## Structure

Un seul `<h1>` par page. Si SplitText découpe le titre, il découpe des `<span>`
à l'intérieur du h1.

## Détails faciles à oublier

- Les champs de formulaire font au minimum 16px sur mobile. En dessous,
  Safari iOS zoome la page à la mise au point du champ et ne la dézoome pas.
- Toute cible tactile (lien, bouton, entrée de menu) fait au moins 44×44px
  de surface cliquable, quitte à agrandir le padding sans agrandir le texte.
- `scroll-margin-top: 84px` sur toute ancre interne, sinon la section visée
  atterrit sous la nav fixe.
- Le fond crème est posé sur `html`, pas seulement sur `body` : sinon le
  rebond de scroll d'iOS laisse apparaître du blanc en haut et en bas.
- `text-wrap: balance` sur les titres : évite le mot orphelin sur la
  dernière ligne. À réserver aux titres, c'est coûteux sur un long texte.
- `-webkit-font-smoothing: antialiased` sur les sections en négatif, en
  complément des 80 % d'opacité.

## Contenu produit pendant le développement

Tout texte écrit ici est provisoire et sera réécrit par Franck.
Ne jamais inventer un chiffre, un nom de client, un avis ou un témoignage :
un faux avis sur un site commercial est une pratique commerciale trompeuse
(art. L121-2 du Code de la consommation). Placeholder visible à la place :
[CHIFFRE À FOURNIR]. Pas de lorem ipsum : un placeholder doit se voir.

## Animations

prefers-reduced-motion respecté partout. Durées 150–400ms.
Un seul easing : cubic-bezier(0,.55,.45,1).
Rien d'animé sur l'élément LCP.
Aucun contenu parqué à opacity 0 si le JS ne charge pas.

## Vérification avant de rendre la main

Lancer le dev server et capturer la page avec Playwright en 390px et en
1440px, puis ouvrir les captures et les regarder. Ne pas déclarer une page
correcte sans l'avoir vue.

Trois contrôles chiffrés, dans la console de la page :
1. pas de scroll horizontal
   document.documentElement.scrollWidth === document.documentElement.clientWidth
2. méga-menu OUVERT en 1440, sa hauteur reste sous 55 % de la fenêtre
   document.querySelector('[data-megamenu]').getBoundingClientRect().height
   / window.innerHeight   → < 0.55
3. les trois cartons du rail se figent bien à 84px et se relaient

Puis navigation complète au clavier, du premier lien au dernier.
Corriger avant de rendre la main.
