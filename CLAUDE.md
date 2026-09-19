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

Tous les fonds sont opaques, sauf deux exceptions explicites : les cartons du
rail en desktop, et la barre de nav (desktop ET mobile — voir « Barre de
navigation »). Ailleurs, aucun backdrop-filter : c'est le filtre le plus
coûteux du navigateur, il recompose tout l'arrière-plan à chaque frame et
provoque des artefacts sur Safari iOS quand il coexiste avec du position:
fixed — le méga-menu (fixed lui aussi) en reste donc exclu. Un aplat --ground
rend la même chose partout ailleurs.

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

Un titre de section peut descendre à --t-lead quand le contenu de la
section porte déjà du --t-title, pour éviter deux niveaux concurrents.

## Shell de page

Desktop (>= 1024px) — construction springsummer.dk : fluide, sans marge à
droite. La marge de 54px n'existe qu'à gauche ; le rail est collé au bord
DROIT de l'écran, pas d'un conteneur centré.
  conteneur    largeur = min(100 %, 1920px) — pas de centrage, pas de marge
               à droite tant que l'écran ne dépasse pas 1920px : le shell
               occupe tout l'espace disponible. Au-delà de 1920px, garde-fou :
               le shell se borne à 1920px et SE CENTRE (marges symétriques) —
               un cas exceptionnel, pas le comportement nominal.
  marge gauche 54px, uniquement à gauche
  contenu      12 colonnes, gap 20px — largeur = largeur du shell − 54 − 250,
               donc fluide elle aussi (jusqu'à 1616px de large à 1920px)
  rail droit   250px, padding-inline 20px → 210px utiles, collé au bord droit
               du shell (donc de l'écran, tant qu'on est sous 1920px)
  hauteur de nav 64px
  Aucun 100vw dans les calculs de largeur : 100vw inclut la barre de
  défilement et déborde de sa largeur sur Windows et Firefox. Tout calcul se
  fait en % du conteneur (voir le filet de nav et le méga-menu).

Mobile (< 1024px)
  6 colonnes, gap 20px, marges 20px
  le rail passe en pleine largeur : les cartons s'insèrent dans le flux,
  aux mêmes endroits que sur desktop. Leur largeur est fluide — 100 % de la
  largeur disponible entre les marges de 20px — jamais une valeur figée en px,
  sinon un iPhone large laisse du vide sur le côté.

Le contenu reste dans le conteneur. Seul le rail va jusqu'au bord, protégé
par son padding de 20px.

Espacement vertical des sections : 96px mobile / 160px desktop.
Section dense 64/128. Section en négatif 128/200.
Titre de section → contenu : 32px mobile / 48px desktop.
Échelle : 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
Espacer au `gap` d'un flex ou d'une grille plutôt qu'aux marges individuelles.

## Barre de navigation

position fixed, top, hauteur 64px, TOUJOURS visible : ne se cache jamais au
scroll — pas de translateY, pas d'état transparent, aucune logique liée au
sens ou à la distance du scroll. La barre et le filet sous elle (voir
plus bas) forment un seul bloc fixe. Aucun nom de marque dans la barre : le
nom du site reste porté par le titre géant du bloc de fin de page. Les
entrées (déclencheur du méga-menu, Réalisations, Contact) sont alignées à
gauche, à la marge du conteneur (54px desktop), gap 40px, --t-body, --ink.

Fond translucide et flouté, en permanence, sur toute la hauteur de la
barre — même traitement que les cartons du rail (exception explicite à
l'interdiction générale du backdrop-filter, voir « Couleurs ») :
  background: color-mix(in srgb, var(--ground) 75%, transparent);
  -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px);
Repli si le filtre n'est pas supporté :
  @supports not (backdrop-filter: blur(1px)) { fond var(--ground) opaque }
Cette exception s'étend à la barre en desktop ET en mobile — contrairement
aux cartons du rail, floutés seulement en desktop. Une classe de repli
mobile opaque existe dans nav.module.css (fond --ground, sans
backdrop-filter) pour le jour où un test sur un vrai iPhone montrerait des
artefacts, mais elle n'est volontairement PAS activée tant que ce test n'a
pas été fait.

Filet sous la barre : il ne couvre PAS toute la largeur de l'écran, seulement
la zone de contenu — de la marge gauche (54px) jusqu'au bord de la colonne du
rail (250px), la même largeur que le panneau du méga-menu. À chacune de ses
deux extrémités, il se retourne vers le bas par un congé de 4px (le rayon des
cartons du rail) et se prolonge verticalement sur 12px. Fixe avec la barre,
toujours visible — jamais de fondu ni de rétractation liés au scroll.

C'est un élément décoratif dédié, pas une border sur la barre :
  <div data-nav-rule aria-hidden="true">
  position fixed, top = hauteur de la nav, left = marge du conteneur
  width = largeur de la zone de contenu, height 12px
  border-top, border-left, border-right : 1px solid var(--line)
  pas de border-bottom, radius 4px 4px 0 0, pointer-events none

Fond flouté, en forme d'encoche inversée : sur toute la largeur de l'écran,
du haut jusqu'au trait (0 → 64px), c'est le fond de la barre elle-même.
Entre les deux angles du trait (la zone de contenu, celle du méga-menu), le
flou s'arrête exactement sur le trait — rien en dessous n'est flouté, le
contenu y défile net. De chaque côté du trait, entre le bord de l'écran et
l'angle, le flou continue de descendre jusqu'au bas de l'angle (64 → 76px) :
deux bandes latérales, même color-mix/blur que la barre, logées dans le
padding de .ruleInner (la zone hors filet, celle qui porte déjà la marge
gauche et la colonne du rail).

Mobile (< 1024px) : pas de rail, donc pas de zone de contenu réduite — le
filet et les deux bandes latérales couvrent la largeur disponible entre les
marges de 20px, mêmes retours d'angle. Le déclencheur « Menu » reste à
droite, logo VA à gauche, inchangés.

## Arrondis

4px   boutons, cartons du rail, panneau du méga-menu, cartes, champs de
      formulaire, conteneurs d'image, icônes encadrées
3px   tags

## Rail droit

Trois cartons, chacun rattaché à une section de la page :
  1. au niveau du hero
  2. au niveau de la section services
  3. juste avant le CTA final

Comportement attendu : un empilement permanent, pas un relais.
Le carton vit dans la colonne du rail et n'en sort jamais latéralement.
Il monte avec la page, puis se fige à 64px du haut de la fenêtre — la hauteur
de la nav, EXACTEMENT la même valeur que le haut du trait sous la barre
(voir « Barre de navigation ») : le haut du carton figé tombe pile sur le
trait, alignés au pixel. Une fois figé, il RESTE visible jusqu'au bas de la
page : il ne repart jamais vers le haut, quelle que soit la section à
l'écran. Le carton suivant se fige à son tour, 20px sous le bas du
précédent. En bas de page, les trois cartons sont visibles, empilés.

Le carton passe AU-DESSUS du bloc nav (z-index) : à cette hauteur, il
partage sa position avec la bande floutée latérale du trait, côté rail — le
carton doit rester net, jamais flouté par cette bande.

Implémentation : CSS sticky, aucun JS d'animation.
  <aside data-rail>
    <article data-rail-card>   position: sticky; top: 64px
    <article data-rail-card>   position: sticky;
                                top: calc(64px + hauteur du 1ᵉʳ + 20px)
    <article data-rail-card>   position: sticky;
                                top: calc(64px + hauteur du 1ᵉʳ + hauteur du 2ᵉ + 40px)
Le conteneur de chaque carton s'étend de son point d'apparition jusqu'au BAS
de la zone rail — jamais jusqu'à la fin de sa seule section : c'est ce qui
distingue l'empilement du relais. Un conteneur qui s'arrête avec sa section
fait repartir le carton au lieu de le laisser figé.

Les hauteurs des cartons varient avec leur contenu (nombre de lignes) : les
mesurer au montage et au resize plutôt que les coder en dur, et les écrire
dans des variables CSS pour que les `top` restent des calc().

L'écart vertical entre deux cartons figés est fixe : 20px. Ce n'est plus
celui des sections elles-mêmes.

Aucun ancêtre d'un carton ne doit porter overflow: hidden, overflow: auto,
overflow: clip ni contain. Un seul de ces ancêtres suffit à désactiver
sticky, silencieusement, sans erreur : c'est la cause numéro un d'un sticky
qui « ne marche pas ». Si un carton ne colle pas, remonter l'arbre DOM avant
de toucher au CSS du carton.

carton
largeur    210px desktop / 100 % de la largeur disponible en mobile
padding    14px
display    grid, gap 10px
border     1px solid var(--line-accent)
radius     4px
icône      carré de 44px, en haut à gauche du carton, filet 1px
           var(--line-accent), radius 4px, contenant un SVG 20px, trait
           1.5px, couleur --ink. Décorative : aria-hidden="true" sur le
           SVG. Titre et texte suivent, en dessous du carré.
fond       desktop uniquement, translucide et flouté :
           background: color-mix(in srgb, var(--ground) 75%, transparent);
           backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
           Repli en fond --ground opaque si le filtre n'est pas supporté
           (@supports not (backdrop-filter: blur(1px))), et
           systématiquement en dessous de 1024px — voir « Couleurs ».
           Exception explicite à la règle « Couleurs » qui interdit tout
           backdrop-filter : ici, sur les cartons du rail en desktop
           uniquement, il est autorisé. La règle générale reste valable
           partout ailleurs — nav, méga-menu, et tout le reste du site.
distinction le seul carton qui porte une action prend border-color: var(--accent)
           au lieu de var(--line-accent) — pas de fond différent, pas de blanc
titre      --t-mono, --ink
texte      --t-small, --ink

Mobile (< 1024px) : les cartons quittent le rail et s'insèrent dans le flux
aux mêmes endroits, en pleine largeur, sans figement.

## Méga-menu — desktop

panneau      position fixed, top = hauteur de la nav, left 54px
             largeur = celle de la zone de contenu, fluide (jusqu'à 1616px
             à 1920px de large)
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
- `scroll-margin-top: 84px` (`--scroll-offset` : hauteur de la barre + 20px)
  sur toute ancre interne, sinon la section visée atterrit sous le bloc nav
  fixe. Valeur distincte de `--rail-stick` (64px, la hauteur de la seule
  barre) qui positionne le figement des cartons du rail — les deux ne se
  confondent plus depuis que les cartons s'alignent sur le trait.
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
3. les trois cartons du rail se figent bien à 84px et restent visibles,
   empilés, jusqu'au bas de la page

Puis navigation complète au clavier, du premier lien au dernier.
Corriger avant de rendre la main.
