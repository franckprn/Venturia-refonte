# Site Venturia — règles du projet

Site vitrine Venturia. Next.js (App Router) · Tailwind · GSAP + ScrollTrigger ·
Lenis · Vercel. Polices via `next/font/google` : les fichiers sont servis depuis
notre domaine, pas de `<link>` vers fonts.googleapis.com.

Ce fichier fixe le visuel. Les textes définitifs sont écrits par Franck ;
tout ce qui est rédigé pendant le développement est du placeholder.

## Couleurs

Trois couleurs, reprises de springsummer.dk — le charbon a été éclairci par
rapport à leur valeur (voir ci-dessous).

--ground:      #DEDCD3   crème
--ink:         #1A1614   charbon
--accent:      #FE3939   rouge
--line:        color-mix(in srgb, var(--ink) 16%, transparent)
--line-accent: color-mix(in srgb, var(--accent) 20%, transparent)

Palette fermée : ces trois couleurs, pas de gris, pas de quatrième valeur.
Aucune restriction d'usage : chacune peut porter du fond comme du texte.
Par défaut, fond crème et texte charbon, ou l'inverse. Le rouge s'emploie
librement — fond de section, titre, aplat, filet, chiffre, souligné.
Franck arbitre le contraste au cas par cas : ne pas remplacer un rouge par
du charbon « pour la lisibilité » sans le lui demander.

Toute couleur dérivée de la palette s'écrit en color-mix sur un token,
jamais en rgba figé : une valeur en dur ne suit pas un changement de token.

`--ink` et `--ground` sont déclarées avec `@property` (`syntax: '<color>'`,
`inherits: true`) : elles échangent leurs valeurs au niveau racine pendant
la Respiration (voir « Respiration (home) »), un changement qu'une
custom property non enregistrée ne peut pas transitionner en douceur
(elle saute d'une valeur à l'autre au lieu d'interpoler). `--color-charcoal`
et `--color-cream` (globals.css) portent les deux valeurs LITTÉRALES de la
palette, jamais inversées : `--ink`/`--ground` sont définies à partir
d'elles, et les rares surfaces qui doivent rester d'une couleur fixe quelle
que soit la tonalité de la page (la carte cas client Inoko, substitut de
photo — Dernier accompagnement et méga-menu desktop) les utilisent
directement à la place de `--ink`/`--ground`.

Tous les fonds sont opaques, sauf six exceptions explicites : la barre de
nav (desktop ET mobile — voir « Barre de navigation »), les cartons du rail en
desktop, la pile mobile du rail (repliée et dépliée), le calque plein écran
derrière la pile dépliée (voir « Rail droit » § « Pile mobile »), le panneau
du menu mobile et le panneau du méga-menu DESKTOP (voir « Méga-menu —
desktop » et « Méga-menu — mobile »). Ailleurs, aucun backdrop-filter : c'est
le filtre le plus coûteux du navigateur, il recompose tout l'arrière-plan à
chaque frame et provoque des artefacts sur Safari iOS quand il coexiste avec
du position: fixed. Un aplat --ground rend la même chose partout ailleurs.

Parmi ces six exceptions, trois portent en plus un VOILE teinté par-dessus
leur flou : le panneau du menu mobile, le calque plein écran derrière la pile
dépliée et le panneau du méga-menu desktop (voir ces sections pour le détail —
tonalité, variables d'opacité, animation). Sous un flou transparent sans
teinte, le fond derrière ces surfaces mélange crème et charbon (et parfois des
photos) sans qu'aucune couleur de texte n'y reste lisible partout. La nav, les
cartons du rail en desktop et la pile mobile REPLIÉE restent, eux, sans
teinte.

Dans une section en négatif, un paragraphe long passe à 80 % d'opacité :
sur fond sombre, un texte clair paraît optiquement plus gras et vibre sur
plusieurs lignes. Les titres restent à 100 %.

`<html>` et `<body>` portent chacun leur propre fond, jamais la même
couleur : `<html>` (zone de rebond du scroll, Mac ET iPhone) reste sur
`--color-charcoal`, un token FIXE — jamais `--ink`, qui s'inverse
pendant la Respiration — tirer la page au-delà du haut ou du bas montre
donc toujours du charbon, y compris en haut (voulu). `<body>`, lui, lit
`var(--ground)` normalement : c'est LUI qui couvre la fenêtre visible en
usage courant (jamais `<html>`, sauf pendant le rebond) et qui doit donc
continuer à s'inverser avec le reste de la page — `min-height: 100svh`
dessus (jamais `100vh`) pour qu'une page plus courte qu'un écran ne
laisse jamais apparaître de charbon SOUS `body` avant même un rebond.
Voir « Respiration » § « Exceptions à l'inversion » pour la vérification
que ce découplage ne change rien au reste du mécanisme d'inversion.

## Tonalités

Chaque section de page déclare sa tonalité réelle avec `data-tone="light"`
(fond --ground), `"dark"` (fond --ink) ou `"accent"` (fond --accent), portée
par `<Section tone="...">`. Obligatoire pour toute nouvelle section ou
page — sans elle, la nav et les cartons du rail ne savent pas quelle
couleur de texte prendre.

Deux éléments adaptatifs lisent cette information et reçoivent eux-mêmes un
`data-tone`, piloté en JS (jamais en CSS) :
  - la nav : tonalité de la section sous le centre vertical de la barre
  - chaque carton du rail : tonalité de la section sous SON PROPRE centre
    vertical, indépendamment de la nav et des autres cartons
Quand le menu mobile est ouvert, la nav ET le panneau partagent une
troisième mesure, distincte des deux ci-dessus : la tonalité de la
section qui occupe la plus grande SURFACE de la fenêtre visible (pas son
centre), prise une seule fois à l'ouverture — voir « Méga-menu —
mobile ».

Implémentation (`src/lib/tone.ts`) : un seul listener scroll passif,
throttlé par requestAnimationFrame, plus un recalcul au resize. Les
positions verticales des sections sont mises en cache (recalculées au
resize et via un ResizeObserver sur body) puis comparées à scrollY —
jamais un `getBoundingClientRect` sur toutes les sections à chaque frame.
Rendu serveur : la nav et les cartons partent avec la tonalité de la
PREMIÈRE section de la page, pour éviter tout flash de couleur et toute
erreur d'hydratation.

Chaque tonalité pose une variable `--fg` (couleur de texte) :
  light   --fg: var(--ink)
  dark    --fg: var(--ground)
  accent  --fg: var(--ground)
Texte des entrées de nav, logo, déclencheur « Menu »/« Fermer »,
titre/texte/icône des cartons, panneau du menu mobile (entrées, ligne du
bas, traits) : `color: var(--fg)` (currentColor pour les SVG). Transition
sur `color`/`border-color`/`stroke`/`fill`, 150ms,
cubic-bezier(0,.55,.45,1) — jamais sur `backdrop-filter`. Bascule
instantanée avec prefers-reduced-motion.
Le filet des cartons 1 et 2 (le carton ET le carré de son icône) suit
`--fg`, comme le texte — voir « Rail droit ». Le filet --line-accent du
carré d'icône et la bordure --accent du carton 3 (l'action), eux, ne
changent jamais avec la tonalité. Le trait à angles sous la nav non plus
n'utilise plus --line fixe : `color-mix(in srgb, var(--fg) 16%,
transparent)`, même opacité que --line aujourd'hui.

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

Emphase dans un bloc de texte (un ou plusieurs mots à distinguer du
reste) : en gras SI l'écart entre la graisse du texte et la graisse
maximale disponible de la police est d'au moins 200 ; sinon, un
soulignement (`text-decoration`, couleur du texte, épaisseur et
décalage en em — proportionnels à la taille du texte, jamais des px
fixes). Bricolage Grotesque est une police variable, axe 200-800
(`document.fonts`) : un texte déjà posé à 800 (--t-hero, --t-mass) n'a
donc plus de graisse disponible au-dessus — jamais de gras dessus,
toujours un soulignement (voir Respiration).

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
  fait en % du conteneur (voir le filet de nav et le méga-menu). Pour un
  fond plein écran de couleur unie posé EN DUR sur une section (footer) :
  box-shadow: 0 0 0 100vmax var(--token); clip-path: inset(0 -100vmax); sur
  l'élément — un box-shadow ne compte pas dans le scroll overflow,
  contrairement à 100vw. La Respiration n'en fait plus partie : son fond
  n'est plus posé sur la section elle-même mais sur toute la page (voir
  « Respiration (home) »).

Mobile (< 1024px)
  6 colonnes, gap 20px, marges 20px
  pas de rail dans le flux : ses trois cartons vivent dans une pile fixée
  en bas de l'écran — voir « Rail droit » § « Pile mobile ». Largeur fluide
  — 100 % de la largeur disponible entre les marges de 20px — jamais une
  valeur figée en px, sinon un iPhone large laisse du vide sur le côté.

Le contenu reste dans le conteneur. Seul le rail (desktop) et la pile
mobile (son remplacement sous 1024px) vont jusqu'au bord, protégés par leur
propre padding/marge de 20px.

Espacement vertical des sections : 72px mobile / 120px desktop
(`--section-space`, globals.css), posé en haut ET en bas par
`<Section>` (`spacing="default"`, la valeur par défaut — jamais de
padding en dur section par section). Section dense 64/128. Section en
négatif 128/200. Seule exception : le Hero (`spacing="none"`) — il
impose une hauteur minimale d'écran (100svh, jamais 100vh) et gère son
propre padding, qui reste au moins égal à ce même token. La Respiration
n'en fait plus partie depuis qu'elle est passée en `spacing="default"`
comme les autres sections (voir « Respiration (home) »).
Titre de section → contenu : 32px mobile / 48px desktop.
Échelle : 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
Espacer au `gap` d'un flex ou d'une grille plutôt qu'aux marges individuelles.

## Règle des deux axes

Dans la zone de contenu (hors rail), tout bloc démarre sur l'un de deux
axes de la grille 12 colonnes : l'axe gauche (début de la colonne 1) ou
l'axe droit (début de la colonne 7) — jamais posé « au hasard » entre
les deux. Seule exception : une série d'éléments égaux, répartie en
tiers (colonnes 1, 5, 9) ou en quarts (colonnes 1, 4, 7, 10) — voir
Processus (tiers) et le bloc de fin (quarts, colonnes de liens).

Aucune grille interne à padding : quand une section redéclare sa propre
grille 12 colonnes en interne (plutôt que de poser ses blocs
directement sur celle de `<Section>`), elle doit avoir EXACTEMENT le
même nombre de colonnes et le même gap que la grille partagée, et
AUCUN padding horizontal — un padding-inline sur cette grille interne
décale ses lignes de colonnes par rapport à la grille partagée (mesuré :
l'ancienne grille de Services, avec `padding: 0 24px`, dérivait de plus
en plus de l'axe gauche à mesure que l'écran s'élargissait). Le
padding-block reste possible : il n'affecte pas les colonnes. Modèle de
référence : `.split` dans `dernier-accompagnement.module.css` (visuel
colonnes 1-5, chiffres colonnes 7-12, aucun padding-inline, lignes
alignées au pixel avec la grille partagée).

## Hero (home)

Hauteur minimale d'un écran : `min-height: 100svh` (jamais `100vh`, qui
inclut la barre d'adresse mobile). `spacing="none"` (voir « Shell de
page ») : le hero gère son propre padding-block (96/160, au moins le
token), en `display: flex; flex-direction: column` — le contenu
(`.body`) est le seul enfant, l'espace en trop tombe donc SOUS lui,
jamais au-dessus (pas de centrage vertical). Dès 1024px, le hero ne
DÉPASSE jamais un écran non plus (voir « Photo » plus bas pour le
mécanisme) : hauteur du hero = hauteur de la fenêtre, vérifié exact
(diff 0px) à 1024×768, 1280×800, 1440×900 et 1728×1117.

H1 (« Bien plus que / du référencement ») : dès 1024px, calé sur les
COLONNES 1 À 9 (pas les 12 entières), la ligne la plus longue (« du
référencement ») occupant EXACTEMENT cette largeur, du bord gauche de
la colonne 1 au bord droit de la colonne 9, à toute largeur d'écran —
les colonnes 10-12 restent vides à droite du titre. Taille calculée sur
la largeur de la grille, jamais sur 100vw : un wrapper DÉDIÉ
(`.titleWrap`, jamais le h1 lui-même, jamais un ancêtre des cartons du
rail) porte `container-type: inline-size` (toujours sur les 12
colonnes, `grid-column: 1 / -1` — seule la TAILLE du texte cible 9
colonnes, pas la largeur du conteneur cqi lui-même), le h1 un
`font-size: calc(<constante> * 1cqi)`.

La constante (`--hero-title-cqi`, hero.module.css) est un calibrage
GÉOMÉTRIQUE, pas un pourcentage : largeur des colonnes 1-9 = 9×(largeur
d'1 colonne) + 8×(gap, 20px), une fonction AFFINE de la largeur du
conteneur (les 8 gouttières sont des px fixes, elles ne grandissent pas
avec l'écran) — alors qu'un multiplicateur cqi ne peut produire qu'une
largeur de texte PUREMENT PROPORTIONNELLE à cette largeur (letter-spacing
en em ⇒ la largeur du texte scale linéairement avec le font-size, donc
avec 1cqi). Une droite proportionnelle ne peut pas épouser exactement
une droite affine à toute largeur : la valeur actuelle (8.7847, recalibrée
depuis 9.7846/colonnes 1-10) minimise l'écart maximal mesuré sur
1024-1728px — delta = +1,59px à 1024px, +0,42px à 1280px, −0,28px à
1440px, −1,61px à 1728px (mesuré Playwright, build de prod) — plutôt que
d'être exacte à un seul point puis dériver ailleurs. Voir le calcul
complet en commentaire, hero.module.css. À recalibrer si le texte, la
police, la graisse, l'approche du h1 OU la géométrie de la grille
(colonnes/gap/marges) changent. Sous 1024px : pleine largeur du contenu,
taille fixe (--t-hero) — `--hero-title-cqi` ne s'applique pas du tout à
cette largeur (mécanisme entièrement différent, aucun rapport avec ce
calibrage).

Photo (`.photo`, HeroPhoto.tsx, texte alternatif dans `content/hero.ts`
`photoAlt`, jamais en dur dans le JSX) : dès 1024px, colonnes 1-6 (axe
gauche) ; sous-titre + CTA (`.bottom`) colonnes 7-12 (axe droit),
INCHANGÉ — les deux partagent la MÊME ligne de grille (`.body` passe en
`grid-template-rows: auto auto`, plus de ligne `1fr`/`flex:1`), ce qui
aligne leur haut par construction (0px d'écart mesuré aux 4 largeurs de
contrôle) plutôt que par une mesure JS. Écart avec le titre : 48px de
`margin-top`, identique sur `.photo` et `.bottom`.

Contrainte principale : le hero ne dépasse jamais 100svh tant que la
photo ne descend pas sous son plancher de 240px — c'est ELLE qui se
comprime quand la place manque, jamais le texte. `.body` n'est plus
flex:1 (sa hauteur naturelle peut être inférieure à l'espace
disponible ; l'excédent tombe alors SOUS lui, voir plus haut) ; la
hauteur de `.photo` est un `clamp()` purement géométrique (même esprit
que le calibrage du h1, AUCUNE mesure JS) :
  `clamp(240px, 100svh − 368px − 18,2722cqi, 33,3333cqi − 6,6667px)`
où `368px` = padding-block du hero (320px) + écart titre→contenu
(48px), `18,2722cqi` = hauteur des 2 lignes du titre à son line-height
courant (2 × 1,04 × --hero-title-cqi), et `33,3333cqi − 6,6667px` = la
hauteur au ratio 3/2 PAR DÉFAUT des colonnes 1-6 (le max du clamp, donc
un plafond, pas une contrainte dure — voir le commentaire détaillé,
hero.module.css). `.body` porte `container-type: inline-size` pour ces
cqi (même largeur de référence W que `.titleWrap`, sans conflit : chaque
élément lit son propre ancêtre-container le plus proche). object-fit:
cover, object-position: center. Radius 4px (le maximum du site).

Plancher 240px : en dessous, le hero est autorisé à dépasser un écran
(la contrainte cède, le texte ne raccourcit jamais). Mesuré à
1024×768 : la photo est TROP ÉTROITE à cette largeur pour qu'un ratio
3/2 atteigne 240px (colonnes 1-6 ≈ 350px ⇒ hauteur 3/2 ≈ 233px, sous le
plancher) — le plancher l'emporte (photo affichée à 240px, très
légèrement plus haute qu'un 3/2 strict, imperceptible) ; il y a par
ailleurs assez de place réelle à cette hauteur de fenêtre pour que le
hero reste pile à 100svh malgré ça (pas de croissance observée à aucune
des 4 largeurs de contrôle).

Mesures (Playwright, build de prod) — hauteur du hero / hauteur de la
photo :
  1024×768   768px / 240px (plancher, voir ci-dessus)
  1280×800   800px / 253,7px
  1440×900   900px / 324,4px
  1728×1117  1117px / 468,0px
Hauteur du hero = hauteur de la fenêtre dans les 4 cas (diff 0px).

Sous 1024px : ordre du DOM = titre, sous-titre + CTA, puis la photo
pleine largeur (`grid-column: 1 / -1`), ratio 3/2 fixe (`aspect-ratio`,
pas le clamp ci-dessus — spécifique à >= 1024px), margin-top 48px. Le
hero peut s'allonger librement à cette largeur (pas de contrainte
d'écran unique en mobile).

Sous-titre + CTA (`.bottom`) : largeur de texte du sous-titre :
`max-width: 42ch`, identique aux paragraphes des Services
(services.module.css `.paragraphs`). Sous 1024px : pleine largeur, sous
le h1, empilement normal. Le CTA lui-même est `<ArrowLink>`
(src/components/ArrowLink.tsx, `direction="down"`) : filet --ink sous
le texte qui s'écarte de 4px au survol/focus, flèche « ↓ » avant le
texte — composant partagé avec le lien « Découvrir… » de chaque service
(`direction="right"`, voir « Services (home) »), seule la direction
change le comportement de survol.

`next/image` avec `priority` (photo au-dessus de la ligne de
flottaison) et `fill` (conteneur dimensionné en CSS, voir ci-dessus) ;
`sizes` calculé pour la largeur réelle des colonnes 1-6
(`calc(50vw - 162px)` dès 1024px) et la largeur réelle du contenu
mobile (`calc(100vw - 40px)`). Aucune animation d'entrée sur la photo
(HeroPhoto.tsx, composant serveur séparé de HeroReveal, qui reste seul
à porter l'animation du h1/sous-titre/CTA) — c'est le plus gros élément
de la page, une animation retarderait son affichage. Dans les faits, la
photo n'est PAS l'élément LCP à 1440×900 (mesuré : le h1, par une
surface de texte légèrement supérieure à celle de la photo à cette
largeur) mais elle L'EST à 390px (mesuré) — voir aussi « Animations »,
« rien d'animé sur l'élément LCP » : la précaution reste justifiée,
l'élément qui porte ce rôle change selon la largeur d'écran.

## Respiration (home)

Section normale : `<Section spacing="default">`, comme Services ou
Processus — plus d'exception ici. Plus de `min-height: 100svh`, plus de
padding en dur (128/200), plus de `box-sizing: content-box` : ces trois
mécanismes n'existaient que pour garantir une fenêtre de scroll assez
large autour de l'ancien seuil de bascule (posé sur la SECTION entière,
« top top »/« bottom bottom ») — le nouveau seuil se mesure sur le bloc
de texte lui-même (voir plus bas), indépendant de la hauteur de la
section. `<section>` reste un bloc simple (pas de flex/grid) : son
unique enfant (le texte) s'empile depuis le haut par défaut, donc le
texte n'est jamais centré verticalement — il démarre en haut de la
section, sur les 12 colonnes, aligné à gauche, sans JS ni flex
nécessaires pour ça. Écart réel entre le bas du texte et le haut de
Services, mesuré : 144px mobile / 240px desktop — le double de
`--section-space` (padding-bottom de Respiration + padding-top de
Services), comme entre deux sections normales n'importe où ailleurs sur
le site.

Emphase sur les deux derniers mots avant le point (« passer commande ») :
voir « Typographie » § emphase — le texte est déjà à 800 (graisse
maximale de Bricolage Grotesque), donc soulignement, pas gras. Jamais de
--accent dans cette section.

`data-tone="light"` (`<Section tone="light">`, page.tsx) : la section
n'a plus de tonalité « dark » spéciale. Tout son texte (`.text`,
`.accent`, y compris le soulignement de « passer commande ») pose
`color: var(--ink)`/`text-decoration-color: var(--ink)` en CSS PUR,
exactement comme n'importe quelle autre section claire du site — RIEN
à animer ici. C'est l'inversion décrite ci-dessous qui rend ce texte
crème sur fond charbon pendant qu'on la lit.

### Inversion de toute la page

Pendant la Respiration, `--ink` et `--ground` ÉCHANGENT LEURS VALEURS au
niveau racine (`<html>`) : tout ce qui est construit sur ces deux
tokens s'inverse donc automatiquement — fonds, textes, traits (`--line`),
nav, cartons du rail, pile mobile, fin de Dernier accompagnement, début
de Services — sans qu'aucun de ces composants n'ait besoin de savoir que
l'inversion existe. `--accent` ne change jamais. Les photos ne changent
jamais (voir plus bas les deux exceptions qui doivent rester fixes).

Mécanique (globals.css) : `--ink`/`--ground` déclarées avec `@property`
(`syntax: '<color>'`, animable) ; `html[data-inverted="true"]` les
réécrit à partir de `--color-charcoal`/`--color-cream` (les deux valeurs
littérales fixes, voir « Couleurs ») ; une transition CSS
(`--ink 400ms cubic-bezier(0,.55,.45,1)`, idem `--ground`) interpole la
couleur elle-même — chaque élément qui lit `var(--ink)`/`var(--ground)`
recalcule sa propre couleur à chaque frame de cette transition, sans
qu'aucun `transition` propre à cet élément ne soit nécessaire.

Déclenchement (`RespirationReveal.tsx`) : sur le BLOC DE TEXTE lui-même
(le `<p>`, le même élément que la révélation d'entrée), PAS sur la
section — mesuré au pixel via un seul `ScrollTrigger` :
  `start: "top 80%"`   le haut du texte passe au-dessus de 80 % de la
                        hauteur de la fenêtre → `data-inverted="true"`
  `end: "bottom 20%"`  le bas du texte passe au-dessus de 20 % de la
                        hauteur de la fenêtre → `data-inverted="false"`
`onEnter`/`onEnterBack` inversent, `onLeave`/`onLeaveBack` reviennent —
comportement symétrique en remontant. Le seuil précoce (80 % plutôt que
« top top » de l'ancienne mécanique) est voulu : la bascule doit être
visible AVANT que le texte n'arrive en haut de l'écran, pas après qu'on
l'a déjà lu sur fond crème.

Chargement en milieu de scroll (lien direct, restauration de scroll du
navigateur) : `trigger.isActive` fixe l'état initial SANS transition
(comme `gsap.set` ailleurs dans le projet) — la transition n'est armée
qu'un frame plus tard (`html[data-tone-transition="on"]`, posé via
`requestAnimationFrame`), pour que cet état initial ne s'anime jamais
depuis la valeur par défaut. `prefers-reduced-motion` : couvert par la
règle globale existante (`transition-duration: 0.01ms`), aucune branche
séparée — cet effet ne fait plus que poser un attribut, la CSS gère le
reste. Aucune différence de mise en page entre les deux modes (l'ancien
mécanisme à base de min-height/padding est parti avec la bascule
locale).

### Exceptions à l'inversion — surfaces qui doivent rester fixes

L'inversion touche TOUT élément qui lit `var(--ink)`/`var(--ground)`,
y compris hors de la Respiration elle-même : tout élément visible à
l'écran EN MÊME TEMPS que l'inversion (pas seulement dans la section)
est concerné. Deux surfaces, un seul motif dupliqué deux fois (carte
« cas client » Inoko, substitut de photo tant qu'aucune photo n'est
fournie) doivent rester d'une couleur FIXE — une vraie photo, elle, ne
changerait pas non plus :
  - Dernier accompagnement, section juste avant Respiration : son bas
    (la carte, `.imageFallback`/`.imageGradient`/`.tags`/`.tag`,
    dernier-accompagnement.module.css) peut rester à l'écran au moment
    où l'inversion se déclenche (seuil précoce, voir plus haut).
  - Le méga-menu desktop, carte cas client (`.caseImageFallback`/
    `.caseGradient`/`.caseClient`/`.caseSubtitle`/`.caseTag`,
    megamenu.module.css) : peut s'ouvrir à N'IMPORTE QUELLE position de
    scroll, y compris pendant que la page est inversée — vérifié
    (méga-menu ouvert en pleine Respiration inversée, carte case client
    toujours lisible).
Les deux utilisent `--color-charcoal`/`--color-cream` (globals.css) à la
place de `--ink`/`--ground` — les décorations qui suivent le TEXTE de
ces cartes (numéros de Dernier accompagnement, filets --ink des angles)
restent, elles, sur `--ink`/`--ground` normaux : seule la carte photo
elle-même doit rester fixe.

Le bloc de fin de page (footer, fond `--ink`/texte `--ground` en dur,
tone="dark" permanent) porte le même motif en théorie, mais n'a jamais
pu être visible en même temps que l'inversion sur le contenu actuel de
la page (bien après Processus, géométriquement hors d'atteinte) —
laissé sur `--ink`/`--ground`, signalé plutôt que retouché hors
périmètre.

Le fond de `<html>` (zone de rebond du scroll, Mac ET iPhone) ne suit
PLUS l'inversion depuis la session « finitions du footer » : il est fixé
à `--color-charcoal` (jamais `--ink`, qui s'inverse), voir « Couleurs ».
Tirer la page au-delà du haut ou du bas montre donc toujours du charbon,
y compris en haut — accepté, pas un défaut. `<body>`, lui, continue de
lire `var(--ground)` et s'inverse normalement avec le reste de la page
(c'est LUI qui couvre la fenêtre visible en usage normal, jamais
`<html>` sauf pendant le rebond) — vérifié à chaque étape de la
Respiration (avant/pendant/après) : fond, textes, nav et cartons du
rail inchangés par ce découplage.

## Dernier accompagnement — Inoko (home)

Mise en page B (« Règle des deux axes ») : le titre reste sur l'axe
gauche (colonne 1), le paragraphe passe sur l'axe droit (colonnes
7-12) — mais sur sa PROPRE ligne de grille, après celle du titre,
jamais à côté de lui (comme `.heading`/`.paragraphs` dans Services :
un bloc de l'axe droit ne partage jamais la ligne d'un bloc de l'axe
gauche). `max-width: 42ch`, identique aux paragraphes des Services.
Lignes explicites sur la grille externe (`section.module.css .body`,
row-gap:0) : 1 label, 2 titre, 3 paragraphe, 4 split (photo colonne
1-5 / 3 chiffres colonnes 7-12, alignés en haut par construction —
voir `.split` dans dernier-accompagnement.module.css), 5 lien. Label
et lien : position inchangée (label pleine largeur au-dessus du titre,
lien colonnes 7-12 sous les chiffres). Sous 1024px : une seule
colonne, ordre label → titre → paragraphe → photo → chiffres → lien.

## Services (home)

Quatre lignes, une par service (`content/services.ts` : `name`,
`phrase`, `paragraphs`, `ctaLabel`, `href`), chacune sur les deux axes —
voir « Règle des deux axes ». `.row` redéclare sa propre grille 12
colonnes (comme `.split`), sans padding-inline (padding-block:32px,
ça n'affecte pas les colonnes). Aucun trait séparateur sous le titre de
section ; un trait 1px `--line` en haut de CHAQUE service en revanche
(`border-top` sur `.row`, jamais `border-bottom` — c'est ce choix qui
garantit qu'aucun trait ne tombe sous le dernier service, sans logique
`:last-child` à écrire), sur toute la largeur des 12 colonnes. Interne à
cette liste : la règle générale « plus de trait entre deux sections »
(voir « Détails faciles à oublier ») ne concerne que les séparateurs
ENTRE sections, pas ceux d'une liste répétée à l'intérieur d'une même
section.

  moitié gauche (colonnes 1-6)
    le nom (--t-title, Bricolage Grotesque 600, axe gauche), 12px plus
    bas la phrase courte, --t-body, axe gauche. Plus de flèche
    décorative sur cette ligne (retirée avec l'inversion charbon au
    survol, voir « lien "Découvrir…" » plus bas).

  moitié droite (colonnes 7-12)
    les paragraphes (`.paragraphs`, un `<p>` par entrée de
    `paragraphs: string[]`, --t-body, axe droit, `max-width: 42ch` —
    cible 45-75 caractères/ligne, mesuré 50,8 en régime deux axes quelle
    que soit la largeur), puis le lien « Découvrir… » (voir plus bas),
    empilés dans un même bloc `.right` (gap 24px). Commence sous le
    niveau de la phrase courte (effet d'escalier), jamais au niveau du
    nom : `.heading` et `.phrase` occupent les lignes de grille 1 et 2,
    `.right` la ligne 3.

  repli en une seule colonne : sous 1280px, pas 1024px
    Mesuré : à 1024px, forcer les deux moitiés donnerait 43,6
    caractères/ligne (paragraphe sur 350px de large) — sous le seuil de
    45. À 1280px : 50,8 caractères/ligne — dans la cible. Le repli est
    donc décalé à 1280px (au-delà de la bascule rail/shell à 1024px,
    qui reste inchangée pour le reste du site). Sous 1280px : nom,
    phrase courte, paragraphes, lien — empilés sur l'axe gauche.

  lien « Découvrir… » — une seule cible cliquable par service
    Plus de ligne entièrement cliquable (le lien étiré `.link { position:
    absolute; inset: 0 }` et son `cursor: pointer` sur `.row` ont été
    retirés) : un SEUL `<a>` existe par service, sous les paragraphes,
    en colonne 7 — bord gauche du lien = bord gauche de `.right`, donc
    de la colonne 7. C'est `<ArrowLink>` (src/components/ArrowLink.tsx),
    le même composant que le CTA secondaire du Hero (voir « Hero
    (home) »), avec `direction="right"` : même style (filet --ink sous
    le texte, --t-body/500, zone tactile >= 44px), flèche « → » au lieu
    de « ↓ », flèche placée APRÈS le texte (lecture naturelle d'un lien
    qui pointe vers la droite — seul le composant du Hero garde la
    flèche avant, puisqu'elle pointe vers le bas). Texte du lien
    (`ctaLabel`, content/services.ts, jamais en dur dans le JSX) :
    « Découvrir le référencement / la publicité / la création de site /
    l'automatisation ». `href` inchangé (déjà les adresses `/services/*`
    voulues, Automatisation comprise — voir « AVANT MISE EN LIGNE »).
    Nom accessible porté par le texte visible du lien lui-même — plus
    besoin d'`aria-label`.
    Survol/focus : le filet reste fixe, SEULE la flèche glisse de 4px
    vers la droite (`transform: translateX(4px)`, 200ms, l'easing du
    site — `prefers-reduced-motion` couvert par la règle globale du
    projet, rien de propre à ce lien). Remplace l'ancienne inversion
    charbon de toute la bande (fond --ink, textes --ground, flèche
    --ground à l'extrémité droite) — retirée : elle se déclenchait au
    simple survol de n'importe quel point de la ligne (y compris en
    défilant), sans équivalent tactile sur mobile (pas de survol) pour
    inviter au clic. Tonalité de la SECTION inchangée
    (`data-tone="light"`, --ground) : ni l'ancienne inversion ni ce
    nouveau lien ne la modifient.

AVANT MISE EN LIGNE : les 4 pages `/services/referencement`,
`/services/publicite`, `/services/site-internet` et l'Automatisation
doivent exister — l'Automatisation existe déjà (« Pages services —
gabarit »), les trois autres restent à créer. L'adresse de
l'Automatisation n'est PAS à choisir librement : son CHEMIN doit rester
identique à celui que Google indexe aujourd'hui (`/services/automations`,
SANS barre finale — écrit en relatif dans content/services.ts, pas en
`https://venturia.fr/...` : ce site EST venturia.fr) — cette page a déjà
du trafic Google, changer son adresse le perdrait. Les trois autres
adresses sont provisoires. Ce sont des vrais `<a>` (via `<ArrowLink>`)
vers ces 4 pages avant qu'elles n'existent toutes — exception assumée,
comme pour les mêmes adresses citées par le mega-menu et le menu mobile.

## Pages services — gabarit

Posé par `/services/automations` (Automatisation), première des 4 pages
`/services/*` citées plus haut — sert de gabarit aux 3 autres. Même
construction Shell/Section que la home : une seule grille de page, le
rail se fige puis reste visible jusqu'au bas — voir « Rail droit » pour
le mécanisme, inchangé.

Structure de fichiers, pour une nouvelle page service :
  contenu     `content/services/<slug>.ts`, typé `ServicePageContent`
              (`content/services/types.ts`, partagé par les 4 pages) —
              même règle que le reste du site : texte dans content/*.ts,
              jamais en dur dans le JSX.
  composants  `components/service-page/*` (Service Hero/QuadCards/
              QuadIllustrations/SplitIntro/Starting/RedBand/
              StepsThirds/Tool/Faq/OtherExpertises) — réutilisables tels
              quels par une nouvelle page service, alimentés par son
              propre fichier de contenu. `ServiceSplitIntro` porte la
              mise en page B (label + titre colonnes 1-6, contenu
              colonnes 7-12 sur sa PROPRE ligne — « Règle des deux
              axes ») : label/titre/axe droit occupent les lignes 1/2/3
              de la grille partagée de la section (bodyStyle
              `rowGap:0`, comme dernier-accompagnement.module.css) ; un
              bloc qui ajoute du contenu après (steps, encadré, tableau,
              note) continue cette numérotation à partir de la ligne 4
              dans SON PROPRE module CSS — jamais dans celui de
              SplitIntro (exemples : `.items` dans ServiceStarting, ou
              `.steps` dans ServiceStepsThirds quand il suit un
              SplitIntro, comme dans ServiceTool).
              `ServiceStepsThirds` est le schéma en tiers, statique (voir
              « révélation » plus bas), réutilisé par tout bloc qui a
              besoin d'une liste de 3 (ou multiple de 3) éléments
              numérotés, sans `accentFrom` (tous les numéros en --ink) —
              jamais le schéma animé du Processus (home), une simple
              liste, trait 1px --ink au-dessus de chaque étape. Aucun
              consommateur actuel (le bloc « L'outil » de la page
              Automatisation est passé en paragraphes, voir plus bas) :
              conservé tel quel pour une future page.

Règle du décalage — quand un titre (colonnes 1-6) et un texte (colonnes
7-12) partagent une section (mise en page B), le texte ne commence
JAMAIS à la hauteur du titre : son haut s'aligne sur le bas du H2, plus
32px (`ServiceSplitIntro.module.css .right`, même valeur qu'en mobile —
l'ancienne valeur desktop, 48px, retirée pour s'aligner sur cette règle
unique). Sous 1024px : empilés, comme le reste du gabarit.

Trois règles supplémentaires du gabarit (corrigées après la 1ʳᵉ version
de la page Automatisation, vérifiées sur TOUS les H2 et toutes les
séries en tiers de cette page) :

  a. largeur du H2   un H2 de section peut occuper TOUTE la largeur des
                     colonnes 1-6 (moitié gauche de la zone de contenu) :
                     aucune largeur maximale plus étroite ne doit le
                     brider (`ServiceSplitIntro.module.css .title`,
                     `grid-column: 1 / 7` — déjà la pleine moitié
                     gauche, aucun `max-width` en ch dessus). Un H2 qui
                     n'a pas de texte décalé en vis-à-vis (bloc « Ce
                     qu'on automatise », Respiration rouge) peut occuper
                     PLUS que 1-6 (jusqu'aux 12 colonnes entières) — la
                     règle fixe un plancher, pas un plafond.

  b. série de 3 en tiers   3 colonnes de MÊME largeur réparties sur
                     TOUTE la zone de contenu : la 1ʳᵉ collée au bord
                     gauche, la 3ᵉ au bord droit, la 2ᵉ exactement
                     centrée entre les deux, espace entre colonnes >= 2
                     gouttières de la grille partagée (40px). PAS alignée
                     sur les lignes de la grille partagée à 12 colonnes
                     (l'ancien motif « colonnes 1/5/9 », calé sur cette
                     grille via `grid-column: 1/4, 5/8, 9/12`, laissait
                     la 3ᵉ colonne s'arrêter une colonne entière avant le
                     bord droit réel — jamais exactement centré ni
                     flush) : `display: grid;
                     grid-template-columns: repeat(3, 1fr); column-gap:
                     40px;` sur un conteneur SANS padding-inline
                     (« Règle des deux axes ») — largeur et espacement
                     égaux par construction, centrage automatique, aucun
                     calcul manuel. Piège corrigé : les items ne doivent
                     PAS garder `grid-column: 1 / -1` hérité de
                     l'empilement mobile — `-1` désigne la DERNIÈRE ligne
                     de la grille (la 4ᵉ avec 3 pistes), donc un item
                     s'étirerait quand même sur les 3 colonnes ; remettre
                     `grid-column: auto` dans le média desktop.
                     Largeur de colonne résultante (mesurée) : 352px à
                     1440px de large (contenu 1136px), 512px à 1920px
                     (contenu 1616px) — `(largeur du contenu − 2×40) / 3`.
                     Implémenté dans `ServiceStarting.module.css .items`
                     et `ServiceStepsThirds.module.css .steps`.

  c. respiration intro → série   entre le texte d'intro décalé
                     (colonnes 7-12) et la série qui le suit, l'écart est
                     de 64px (augmenté depuis 48px — la section a besoin
                     de respirer davantage à cette transition) :
                     `ServiceStarting.module.css .items`,
                     `margin-top: 64px`.

  révélation  `components/ScrollReveal.tsx` (`useScrollReveal`), même
              mécanique que ServicesRowsReveal.tsx (home : montée 16px +
              fondu, stagger 60ms, 400ms, `ScrollTrigger` `top 75%` une
              fois, reduced-motion respecté) mais générique — extraite
              plutôt que réutilisée depuis ServicesRowsReveal.tsx (propre
              à `Service[]`, home) pour ne jamais toucher ce fichier.
              Jamais de wrapper autour des éléments révélés : le hook
              expose `containerRef` (trigger) et `setItemRef(i)`, posés
              directement sur les vrais éléments de la grille/liste — un
              `<div>` ajouté casserait un `grid-column`/`grid-row` posé
              sur l'élément lui-même. Hero exclu (voir plus bas).
              Depuis la restructuration de la page Automatisation
              (session « refonte structure Automatisation »), AUCUN bloc
              de cette page ne l'utilise plus : la page est construite
              dans son état final, statique — l'entrée reviendra dans un
              prompt séparé. Le hook reste disponible tel quel pour une
              future page service qui en aurait besoin avant ce prompt.

H1 de page — deux approches selon le besoin de la page :
  simple      (`--t-title-lg`, globals.css : 56px desktop / 32px mobile,
              intermédiaire entre --t-title et --t-hero) — pas de
              calibrage cqi, `grid-column: 1 / 10` suffit, le texte peut
              occuper jusqu'à cette largeur avant de retourner à la
              ligne sans devoir l'occuper EXACTEMENT.
  calibré     (Automatisation, ServiceHero.module.css) — H1 sur les 12
              colonnes ENTIÈRES, `line1`/`line2` explicites (comme
              `line1`/`line2` du bloc de fin, content/footer.ts),
              `line1` (la plus longue) calibrée pour occuper EXACTEMENT
              100 % de la largeur du conteneur : même TECHNIQUE que
              --hero-title-cqi (home) et --mass-title-cqi (footer), une
              constante cqi mesurée Playwright — mais ici la cible est
              12/12 colonnes (pas 9/12 comme le hero home), une relation
              PUREMENT PROPORTIONNELLE au conteneur (pas affine) : un
              seul calibrage suffit et reste EXACT à toute largeur,
              comme le footer. `--service-hero-title-cqi: 9.1116`,
              mesuré sur un `<span>` ISOLÉ (hors grille, hors container
              query, même police/graisse/letter-spacing) plutôt que dans
              la grille réelle : mesurer IN SITU avant calibrage crée une
              boucle possible (la piste `1fr` du Shell peut grandir avec
              le texte si celui-ci dépasse son min-content par défaut).
              `white-space: nowrap` OBLIGATOIRE sur le h1 dès 1024px : à
              une taille calibrée pile à la largeur du conteneur, un
              retour à la ligne par mot (comportement par défaut) se
              déclencherait à la moindre fraction de pixel — voir le
              commentaire complet, ServiceHero.module.css. Choisir cette
              approche pour un H1 qui doit être « le plus grand possible
              sur 2 lignes » à une largeur donnée ; l'approche simple
              reste valable pour un titre de page qui n'a pas ce besoin.

Plus de label au-dessus du H1 (« AUTOMATISATION · TOULOUSE », retiré —
corrigé après la 1ʳᵉ version, `ServiceHero.tsx`/types.ts/content : le
champ `label` a disparu du type `ServiceHero`).

Hauteur du Hero (Automatisation, ServiceHero.module.css) : dès 1024px et
>= 800px de haut, EXACTEMENT le premier écran — `height: calc(100svh -
var(--nav-h))` (`<main>` pousse déjà tout son contenu de `var(--nav-h)`,
layout.tsx : sans soustraire cette valeur, le Hero déborderait du
premier écran de sa hauteur). `spacing="none"` (page.tsx), `.body`
(bodyClassName) reçoit `height:100%` et un `grid-template-rows`
EXPLICITE : h1 / espaceur / sous-titre+CTA / espaceur / chaîne — les
DEUX espaceurs partagent le MÊME plancher (`minmax(Y, 1fr)`) : CSS Grid
répartit l'espace disponible à parts égales entre deux pistes `1fr`
identiques, ce qui centre mécaniquement le sous-titre+CTA à égale
distance du H1 et de la chaîne — aucune mesure JS. Le bouton « Réserver
20 minutes » est aligné à droite (`justify-self: end` sur `.cta`) : sans
lui, un lien `width: fit-content` (arrow-link.module.css) se cale au
DÉBUT de sa zone de grille, pas à la fin. `padding-bottom: 48px` sur la
section, la marge basse de la chaîne (aucun précédent direct d'élément
« calé en bas » trouvé ailleurs sur la home, valeur de repli signalée à
Franck). Sous 1024px : pas de hauteur figée, la page s'allonge
librement, comme n'importe quelle autre section.
Mesuré (Playwright, build de prod) — écart H1→sous-titre vs
sous-titre→chaîne, égalité attendue : 69,41px / 69,42px à 1440×900,
123,03px / 123,05px à 1920×1080 (écart résiduel < 0,02px, arrondi
sous-pixel) ; bouton : bord droit = bord droit de la zone de contenu,
haut = haut du sous-titre, EXACT aux deux tailles.
Fenêtres courtes (< 800px de haut, ex. 1366×657, 1280×720 — Franck,
hybride après mesure) : le contenu ne tient plus avec les espacements
ci-dessus. 1. espacements internes resserrés (JAMAIS le H1) : padding-top
120→48px, plancher des espaceurs 32→16px, gap interne de la chaîne
24→16px, paddings de la notification/des étapes 14→10px. 2. si ça ne
suffit toujours pas : `height` devient `min-height` — le Hero est alors
autorisé à dépasser légèrement le premier écran plutôt que de couper la
chaîne, exactement comme le plancher 240px du Hero de la home.
`min-height` + `minmax(Xpx, 1fr)` couvrent les deux cas avec un seul
mécanisme (si le contenu tient dans le plancher, la ligne 1fr absorbe le
reste ; sinon la section grandit avec son contenu, jamais de clip).
Mesuré (Playwright, build de prod, APRÈS retrait du label — le label
occupait une ligne de grille entière, son retrait a redonné de la
marge) : 1920×1080 et 1440×900 exacts (marge basse 48px, 0 dépassement) ;
1280×720 tient désormais dans le premier écran (marge résiduelle 72,9px,
largement positive) ; 1366×657 ne dépasse plus que de 7px (contre 72px
avant le retrait du label, et 184px avant les resserrements internes de
la session précédente) — chaîne entière, jamais coupée.

Aucune animation d'entrée sur le bloc 1 (hero) de ces pages, contrairement
à tous les autres blocs : sans photo, le H1 est très probablement
l'élément LCP de la page — CLAUDE.md, « Animations » : « rien d'animé sur
l'élément LCP ». Peint à 100 % d'opacité dès le premier rendu, comme le
h1 de la home. (La chaîne du Hero n'a, elle non plus, aucune animation
dans cette page pour l'instant — elle en recevra une dans un prompt
séparé.)

Rail (desktop + pile mobile) rendu réutilisable pour ce gabarit —
`RailConfig` (components/layout/Rail.tsx) : cartons, icônes, cibles de
repos desktop (`offsetTargets`) et sections de révélation mobile
(`mobileReveal`) propres à CHAQUE page, passés en prop optionnelle
`config` à `<RailSlot>`, `<RailController>` et `<MobileRailStack>` — leur
moteur (sticky, mode relais, hystérésis, timing des icônes) reste un
SEUL code partagé, inchangé, entre la home et les pages services — le
moteur lui-même reste câblé pour EXACTEMENT 3 cartons (types tuple à 3
dans Rail.tsx/MobileRailStack.tsx/rail.module.css, `cardIndex: 0|1|2`) :
une future page qui aurait besoin d'un nombre différent de cartons devra
généraliser ce moteur (décision à prendre avec Franck, pas une extension
locale à une page).
Défaut = `HOME_RAIL_CONFIG` (construit à partir des mêmes constantes
qu'avant cette extraction) : la home ne passe aucun `config` et garde
donc, à l'identique, son comportement d'avant — vérifié (captures +
alignements de repos + mode relais, avant/après cette extraction, 0
différence hors l'horloge du footer). Icônes : `RailIcons.tsx` reste un
fichier UNIQUE et partagé, chaque page y ajoute les siennes en pur ajout
(jamais retoucher un export existant) — `IconConnect` (Automatisation,
carton « n8n, en une phrase ») et `IconSwap` (Automatisation, carton
« Déjà sur Make ou Zapier ? » — deux flèches courbes en sens opposés,
l'idée d'un échange/bascule d'un outil vers un autre), même construction
que les autres (viewBox 20×20, trait 1.5px, `currentColor`, aucun
remplissage, `play()` via GSAP context, ≤ 400ms). `IconFlow` (posée pour
une ancienne carte de cette page, « Un flux, c'est quoi ? ») reste dans
le fichier, disponible pour une future page — la page Automatisation ne
l'utilise plus (la chaîne du Hero montre déjà ce qu'est un flux, le
carton faisait doublon, retiré).
Cartons de la page Automatisation (3, ancrages propres à sa nouvelle
structure) : 1 « n8n, en une phrase » → BAS des 4 illustrations du bloc 2
« Automatisations e-commerce » (corrigé — auparavant haut du H2 ; label
du bloc lui-même passé de « CE QU'ON AUTOMATISE » à « AUTOMATISATIONS
E-COMMERCE ») — `[data-service-quad-illustrations-end]` posé sur le
conteneur de la 1ʳᵉ illustration (`ServiceQuadCards.tsx`, les 4
illustrations partagent la même hauteur, donc le même bas) ; 2 « On
reprend vos scénarios » → haut du H2 du bloc 5 (L'outil) ; 3
« On discute ? » → bas du bloc 7 (Autres expertises,
`[data-service-other-expertises-end]` posé sur `.grid`,
ServiceOtherExpertises.tsx — seul ajout à ce bloc par ailleurs
inchangé). Pile mobile : même ordre, mêmes sections de révélation.
Écart mesuré pour le nouvel ancrage du carton 1 : 0px (repos exact),
IDENTIQUE en `prefers-reduced-motion: reduce` et en animations actives, à
1440×900 et 1920×1080 (vérifié — ce bloc n'a de toute façon aucune
révélation d'entrée sur cette page, statique, voir plus haut : aucune
divergence possible entre les deux modes ici).

Canonical (`alternates.canonical`) via `metadataBase` (`src/app/
layout.tsx` — absent avant ces pages, ajouté : `new URL("https://
venturia.fr")`, pur ajout, sans incidence sur les pages existantes qui
ne déclarent ni canonical ni image relative). `trailingSlash` : décision
prise (Franck) — Google indexe `/services/automations` SANS barre
finale, `next.config.ts` reste donc inchangé (défaut Next.js : une URL
avec barre finale redirige en 308 vers la même URL sans barre — vérifié
sur `/contact/` → `/contact`). Tous les liens internes vers les 4 pages
`/services/*` (content/services.ts, content/nav.ts, content/footer.ts,
content/services/automatisation.ts) utilisent donc la forme SANS barre
finale, alignée sur le canonical.

FAQ (`ServiceFaq.tsx`) : données structurées `FAQPage` (JSON-LD)
générées DANS ce composant, à partir des mêmes questions-réponses que le
rendu visuel — les deux ne peuvent pas diverger. Toutes les réponses
visibles, jamais d'accordéon (contrairement à l'accordéon Services du
menu mobile). Layout propre à ce bloc, PAS `ServiceSplitIntro` (label +
h2 colonnes 1-6, liste colonnes 7-12 sur la MÊME ligne de grille, pas des
lignes séparées) : dès 1024px, la colonne gauche (label + h2) passe en
`position: sticky`, `top: calc(var(--rail-stick) + 48px)` (soit 112px —
descendue de 48px sous le haut du rail à la demande de Franck) —
nécessite
`align-self: start` (sinon la colonne s'étire sur toute la hauteur de la
ligne et le sticky n'a plus de marge où se figer) et que la ligne partage
sa hauteur avec la liste (la plus grande des deux), sinon la colonne
gauche n'a rien à parcourir. Sous 1024px : pas de sticky, empilé comme
le reste du gabarit.

Bloc « L'outil » (`ServiceTool.tsx`) — corrigé une seconde fois, plus de
lignes ni de tiers : label + h2 (« Make, Zapier ou n8n ? ») colonnes 1-6
pleine largeur (règle du gabarit § a) via `ServiceSplitIntro`, puis 4
paragraphes en colonnes 7-12 (règle du décalage), style de paragraphe
courant de la home (`services.module.css .paragraphs`/`.paragraph` :
gap 16px, max-width 42ch) — §1 sans intertitre, §2-4 avec un intertitre
en gras au DÉBUT de leur propre paragraphe (`<strong>`, même `<p>` que
le texte, jamais séparé). « Gras » : `font-weight: 500` — Instrument
Sans (corps) ne charge que 400/500 (CLAUDE.md, « Typographie »), un
écart de seulement 100 entre le corps et le poids maximal disponible,
sous le seuil de 200 qui justifierait un vrai gras ailleurs sur le site
(sinon un soulignement) ; ici 500 est le poids le plus fort accessible
sans charger une graisse de plus ni déclencher un gras synthétique du
navigateur (`<strong>` par défaut = 700, absent du jeu chargé) — décision
prise sur demande explicite de Franck (« en gras »), documentée comme
exception ponctuelle à la règle générale d'emphase. `ServiceStepsThirds`
n'est plus utilisé par ce bloc (composant toujours disponible pour une
future page qui voudrait une liste en tiers). Plus de callout « Déjà sur
Make ou Zapier ? » ni de tableau comparatif dans ce bloc (retirés de la
page Automatisation — l'idée de reprise de scénario vit maintenant dans
un carton du rail, voir plus haut) : `ServiceToolCompare.tsx` et son
`<table>` ont été supprimés. Une future page service qui a besoin d'un
tableau comparatif devra le reconstruire (pas de composant partagé prêt
à l'emploi pour ça aujourd'hui). Le carton 2 du rail garde son ancre sur
le haut du H2 (inchangé par cette correction).

Autres expertises (`ServiceOtherExpertises.tsx`) : liste verticale (plus
la grille en tiers d'origine) — label, puis 3 lignes empilées pleine
largeur, trait 1px --line au-dessus de chaque ligne (porté par
`border-top` sur la ligne elle-même) et sous la dernière (`border-bottom`
sur le conteneur de liste). Toute la ligne est UN SEUL `<Link>` (nom,
phrase et le visuel « En savoir plus » vivent tous les trois à
l'intérieur, un seul lien par ligne pour l'accessibilité) — nom colonnes
1-4, phrase colonnes 5-9, lien colonnes 10-12 (`justify-self: end`, bord
droit aligné sur la colonne 12 — corrigé après la 1ʳᵉ version, colonnes
1-3/4-9/10-12). Au moins 1 gouttière entre la fin du nom le plus long
(« Référencement ») et le début de la phrase : vérifié EXACT, 20px (1
gouttière) à 1024px ET à 1440px. Point de rupture PROPRE à ce bloc,
768px (pas le 1024px du shell) : en dessous, nom/phrase/lien empilés
dans chaque ligne. `ctaLabel` du contenu (`content/services/
automatisation.ts`) passé de « Découvrir… » à « En savoir plus » — décidé
pour cette page uniquement, `content/services.ts` (liens « Découvrir… »
de la home) non touché, hors sujet de cette correction.
Un `<a>` ne peut pas en contenir un autre : le visuel du lien reste
`<ArrowLink>` (même composant, même style que les liens « Découvrir… »
de la home), mais rendu via son nouveau prop `as="span"` — `ArrowLink.tsx`
généralisé en pur ajout (`as?: "link" | "span"`, défaut `"link"` :
AUCUN appel existant ne change de comportement) : `as="span"` rend le
même balisage/classes en `<span>` plutôt qu'en `<Link>`, non focusable
(un seul lien par ligne dans l'ordre de tabulation, l'ancêtre). Le
survol/focus de la LIGNE ENTIÈRE doit faire glisser la flèche (pas
seulement un survol du petit texte « En savoir plus ») : une règle dans
ServiceOtherExpertises.module.css cible `[data-direction="right"] svg`
par ATTRIBUT plutôt que par la classe `.arrow` d'arrow-link.module.css
(hashée, non importable telle quelle depuis un autre fichier CSS module)
— `arrow-link.module.css` lui-même reste inchangé.

Inversion au survol/focus-visible de chaque ligne (corrigée après la 1ʳᵉ
version) : fond --ink, textes (nom, phrase, visuel du lien) --ground,
200ms, cubic-bezier(0,.55,.45,1), dès 1024px uniquement,
`transition: none` en `prefers-reduced-motion`. EFFET RETROUVÉ dans
l'historique git (jamais réinventé, comme demandé) — commit `dbfe3f2`
(« Mise en page home : … Services sans séparateurs avec inversion au
survol »), retiré ensuite par `4987482` (« Services : mise en page sans
inversion charbon ») : mêmes paramètres exacts repris ici. Sur la home
d'origine, l'effet ciblait `.row:has(.link:hover)` (un lien étiré
séparé de la ligne) ; ici `.row` EST directement le lien (un seul `<a>`
par ligne, voir plus haut), donc `.row:hover`/`:focus-visible` suffit,
sans `:has()`. Le visuel du lien (`ArrowLink as="span"`) a besoin d'une
règle en plus : `arrow-link.module.css` fixe sa couleur/son filet en
--ink en permanence (jamais tone-aware) — `.link` (la classe de CE
fichier, passée en plus à ArrowLink) bascule aussi vers --ground au
survol de la ligne, sans toucher arrow-link.module.css.

Fond du survol — corrigé une 3ᵉ fois : la 2ᵉ version (débord du fond
au-delà de la zone de contenu, marge obtenue par un `inset` négatif sur
le `::before`) débordait dans la marge du shell à gauche et jusqu'aux
cartons du rail à droite — RIEN ne doit dépasser de la zone de contenu,
ni à gauche ni à droite. Le `::before` DÉDIÉ sur `.row` reste (fond sur
un enfant séparé, pas sur `.row` lui-même), mais avec `inset: 0` : il
couvre EXACTEMENT la boîte de `.row`, qui couvre déjà exactement les
colonnes 1-12 (grille interne sans padding-inline, « Règle des deux
axes ») — bord gauche = bord gauche de la colonne 1, bord droit = bord
droit de la colonne 12, écart 0px des deux côtés, vérifié à 1024/1440/
1920. `z-index: -1` sur le `::before` inchangé (peint sous tout contenu
non positionné de son bloc englobant). Coins arrondis 4px — même valeur
que le trait de la nav (nav.module.css `.rule`, `border-radius: 4px 4px
0 0`) : rien de neuf, la palette de rayons du site reste fermée
(CLAUDE.md, « Arrondis »).
La marge de 24px entre chaque texte et le bord du fond n'est donc plus
portée par le fond (qui ne déborde plus) mais par un `margin` PERMANENT
sur `.name` (`margin-left: 24px`) et `.link` (`margin-right: 24px`),
dans le même bloc `@media (min-width: 768px)` que leurs `grid-column` —
au repos ET au survol, rien ne bouge : ces textes sont déjà à leur
position finale. `margin`, pas `padding` : `.link` porte un soulignement
(border-bottom, arrow-link.module.css) dessiné sur SA PROPRE boîte — un
padding l'aurait étiré jusqu'au bord de la colonne 12, un margin laisse
la boîte (et son soulignement) se terminer 24px plus tôt. La phrase
(colonnes 5-9) n'a pas bougé. Mesuré EXACT aux 3 tailles (1024/1440/
1920) : 24px à gauche du nom, 24px à droite du lien, écart nom→phrase
toujours >= 20px (« Référencement », le nom le plus long, ne revient
jamais à la ligne — la marge de 24px réduit la largeur disponible mais
le texte avait déjà de la marge, vérifié empiriquement plutôt que
supposé), écart fond↔carton du rail 20px (> 0px) aux 3 tailles.
Conséquence bienvenue : puisque le fond ne déborde plus jamais dans la
colonne du rail, le `.slot` (rail.module.css, `z-index: 65`) qui
commence juste après la colonne 12 n'intercepte plus rien — la nuance
signalée à la correction précédente (quelques px de survol mort près du
rail) a disparu avec elle, vérifié par `elementFromPoint` sur toute la
largeur de chaque ligne (5 points, aucune interception) dans Chromium.

Bug signalé (survol qui ne se déclenche qu'au clic dans Chrome, pas dans
Safari) : INVESTIGUÉ, NON REPRODUIT. Méthode : `document.elementFromPoint`
sur toute la largeur de chaque ligne (aucun élément étranger trouvé, tout
appartient à la ligne elle-même), recherche de `@media (hover:`/`pointer:`
dans tout le CSS du site (aucune occurrence), puis survol réel simulé
(`mouse.move` ET `page.hover()` Playwright) dans Chromium ET WebKit
headless — les deux déclenchent l'inversion normalement, sans clic
préalable, dans les 3 lignes. Cause non trouvée sur le build testé ; à
reproduire avec plus de détails (version de Chrome, OS, `next dev` vs
build de prod — un artefact de Fast Refresh en dev est une piste
plausible non exclue) avant de risquer une correction spéculative.

Éléments neufs de la page Automatisation (chaîne du Hero, illustrations
du bloc 2, bloc « Par où commencer ») : construits avec les tokens et le
RAYON déjà en usage sur le site, aucune nouvelle valeur — CLAUDE.md,
« Arrondis » reste une palette fermée (4px / 3px) :
  chaîne du Hero    notification (fond --ink, texte --ground, pastille
                    --accent) et les 4 étapes (bordure 1px --ink, trait
                    2px --accent qui les relie, passé derrière — z-index
                    0, cartes à 1, fond --ground opaque) : radius 4px
                    partout (jamais 12px).
  illustrations     (bloc 2, `ServiceQuadIllustrations.tsx`, aria-hidden)
                    cadre `color-mix(in srgb, var(--ink) 7%, var(--ground))`
                    — pas `--cream` : `--ground` est déjà le token vivant
                    utilisé partout ailleurs sur ce gabarit ;
                    `--color-cream` reste réservé aux deux surfaces qui
                    doivent rester FIXES pendant une inversion (CLAUDE.md,
                    « Couleurs »), hors sujet ici — ces illustrations ne
                    sont d'ailleurs jamais visibles en même temps que la
                    Respiration rouge du bloc 4 (sections trop éloignées).
                    Radius 4px (jamais 12px). Mini-interfaces dessinées à
                    la main (aucune image), leurs textes vivent dans
                    `content/services/automatisation.ts`
                    (`ServiceQuadIllustration`, types.ts, union à 4
                    variantes).

Bloc 4 — Respiration rouge (`ServiceRedBand.tsx`, ex-« bande rouge »,
corrigée en variante du mécanisme de la Respiration de la home) : `tone=
"light"` (page.tsx) comme la Respiration home, PAS `"accent"` — la
section n'a pas de fond statique, c'est une inversion scroll-triggered
qui fait apparaître le rouge derrière elle, exactement comme la home
fait apparaître le charbon. Mécanisme extrait dans `src/lib/
respiration.ts` (`useRespirationLineReveal` + `useRespirationInversion`)
pour être PARTAGÉ sans dupliquer la logique (seuils, durée, easing,
reduced-motion identiques dans les deux cas — RespirationReveal.tsx,
home, appelle les deux hooks avec leurs valeurs par défaut, comportement
byte-identique à avant cette extraction, vérifié par captures et mesure
des attributs avant/pendant/après) :
  home (défaut)     `useRespirationInversion(ref)` — attribut
                    `data-inverted` sur `<html>`, règle déjà en place
                    dans globals.css : --ink ET --ground échangent leurs
                    valeurs littérales.
  accent            `useRespirationInversion(ref, "accent")` — attribut
                    DISTINCT `data-inverted-accent`, règle ADDITIVE dans
                    globals.css (`--ground: var(--accent)` SEUL, --ink
                    jamais touché : le texte de cette variante reste
                    --ink en permanence, jamais inversé). N'affecte
                    jamais la home (attribut jamais posé sur cette page).
Contrairement à la Respiration home (une seule phrase, mise en page A),
ce bloc garde son titre + texte + CTA existants (contenu inchangé) :
seul le H2 porte la révélation en ligne masquée
(`useRespirationLineReveal`, classes `.mask`/`.line` réutilisées depuis
respiration.module.css plutôt que dupliquées) et sert d'ancre à
l'inversion ; texte et CTA restent statiques. H2 sur les 12 colonnes
ENTIÈRES (corrigé — auparavant 1-10, règle du gabarit § a) ; texte et
lien restent en colonnes 7-12. Écart H2 → texte augmenté : 32px → 48px,
la valeur STANDARD du site pour « titre de section → contenu » en
desktop (CLAUDE.md, « Shell de page » — 32px n'est que la valeur
mobile) — mesuré exact, 48px.
Lisibilité pendant l'inversion (vérifié) : nav et cartons du rail lisent
`data-tone="light"` (la section ne déclare jamais « accent »), donc
`--fg: var(--ink)` — et puisque --ink ne bascule jamais dans cette
variante, leur texte reste sombre, lisible sur le rouge. Piège corrigé :
l'icône d'un carton du rail encore visible pendant la transition
(--accent par défaut) devenait invisible sur fond rouge — exception
ajoutée en pur ajout dans rail.module.css ET mobileRailStack.module.css
(`html[data-inverted-accent="true"] .cardIcon { color: var(--fg); }`),
jumelle de l'exception `[data-tone="accent"] .cardIcon` déjà en place,
sans effet sur la home (attribut jamais posé).

## Bloc de fin (footer)

Titre géant (« ON PEUT VOUS AIDER ? », lien entier vers /contact) aligné
sur l'AXE GAUCHE comme le reste du site (« Règle des deux axes ») —
plus aucun élément du site ne sort de la grille. Une ancienne marge
négative (-40px) qui l'en faisait sortir a été retirée (mesurée : 40px
pile, une valeur fixe identique à 1024/1440/1728px, jamais documentée
ici comme un choix voulu).

Exactement 2 lignes dès 768px (le point de rupture PROPRE à ce
composant — celui de `.linksGrid` plus bas, indépendant des 1024px du
Shell), à toute largeur — « ON PEUT VOUS » / « AIDER ? » — un retour à
la ligne EXPLICITE (`<br/>` entre `line1` et `line2`, `content/footer.ts`
— jamais laissé au navigateur, comme le h1 du Hero) combiné à une taille
FLUIDE en cqi, sur le modèle de `--hero-title-cqi` (hero.module.css)
mais SANS sa correction affine : `.giant` (le bloc, jamais `.giantTitle`
le lien lui-même — même principe que `.titleWrap`/`.title` au Hero) fait
TOUJOURS 100 % de la largeur de la colonne de contenu (12 colonnes
entières, jamais un sous-ensemble à gouttières fixes comme les colonnes
1-9 du Hero, puisqu'aucun rail ne réduit cette ligne du Shell) — la
relation entre la largeur du texte et celle du conteneur est donc
PUREMENT proportionnelle (une droite PAR L'ORIGINE) à toute largeur, un
seul calibrage suffit et reste EXACT partout (pas une valeur qui
minimise un écart résiduel aux bornes comme au Hero) — y COMPRIS entre
768 et 1023px, où `.giant` doit sa largeur au Shell MOBILE (100 % moins
les 40px de marges, pas la formule desktop) : une relation proportionnelle
tient quelle que soit la formule qui a produit la largeur, seule la
largeur RÉSULTANTE compte. `container-type: inline-size` posé sur
`.giant` : ce bloc vit dans la colonne de contenu du footer, jamais un
ancêtre des cartons du rail (colonne séparée du Shell, DOM distinct) —
vérifié, aucun élément sticky n'en descend.
`--mass-title-cqi: 13.46` (footer.module.css, mesuré Playwright, build
de prod) fait tenir `line1` (« ON PEUT VOUS », la ligne la plus longue)
sur 97 % de la largeur de `.giant` — vérifié EXACT (aucune dérive, aucun
débordement à droite de la colonne 12) de 768 à 2560px, 3 % de marge
choisie pour absorber l'arrondi sous-pixel entre navigateurs, jamais un
ajustement à l'œil.

Discontinuité observée, PAS corrigée (inhérente au Shell, pas à ce
calibrage) : à 1024px pile, la taille du titre RÉTRÉCIT visiblement par
rapport à 1023px (mesuré : 132px à 1023px → 97px à 1024px) — la colonne
de contenu elle-même se rétrécit à cet instant précis (le rail, 250px,
apparaît et prend la place que les marges mobiles laissaient au
contenu), donc la taille proportionnelle du titre suit. Ce n'est pas un
défaut de calibrage (la relation reste exacte des deux côtés de ce
seuil, prise séparément) mais une conséquence visible, à ce seul point
de la bascule, de rendre le titre fluide plutôt que fixe.

Sous 768px (point de rupture TYPOGRAPHIQUE, 767px, où `--t-mass`
lui-même passe à 60px) : `--mass-title-cqi` ne s'applique pas
(`.giantTitle` garde `--t-mass` fixe) — le `<br/>` explicite reste posé,
mais rien n'absorbe la largeur qui manque : « ON PEUT VOUS » (line1) ne
tient pas sur une seule ligne à cette taille fixe, et s'enroule tout
seul en « ON PEUT » / « VOUS » avant le `<br/>` — « VOUS » se retrouve
orphelin, seul sur sa ligne (3 lignes au total). ACCEPTÉ à cette largeur
(décision explicite) : ce motif existait déjà, à l'identique, avant
cette session (l'ancien texte continu, sans `<br/>`, s'enroulait déjà de
la même façon) — ce n'est pas une régression, juste un état choisi tel
quel sous 768px.

Repères sur le trait au-dessus de la barre légale (`.legalBar`,
border-top existant — jamais déplacé ni doublé) : deux angles qui
montent à ses extrémités + un petit trait droit par colonne de liens
intermédiaire (SECTEURS, VENTURIA, ADRESSE) — jamais SERVICES, qui
démarre pile sur l'extrémité gauche du trait (grid-column 1, comme
`.linkColumn:nth-child(1)`) : l'angle gauche lui sert déjà de repère,
un trait dédié en plus doublerait ce même repère au même endroit
(vérifié : écart 0px entre les deux, à toute largeur).

Même technique de dessin que les angles de la nav (`nav.module.css
.rule` — voir « Barre de navigation »), en miroir vertical : la nav
descend SOUS son trait (border-top + border-left/right, radius sur les
coins HAUTS), ici les repères montent AU-DESSUS du trait existant
(border-bottom + un seul border latéral par angle, radius sur le seul
coin BAS concerné) — impossible de reprendre tel quel le bloc unique de
la nav (un seul `<div>` bordé du bord gauche au bord droit) sans que
son propre border-bottom ne redessine une seconde fois tout le trait
déjà existant : chaque repère est donc un petit élément séparé
(`.legalBarMarks`, un overlay `position:absolute` recalquant la grille
12 colonnes de `.linksGrid` — mêmes colonnes, même gap — pour que
chaque repère tombe exactement sur le bord gauche de sa colonne, sans
calc() à la main), pas un unique bloc pleine largeur. Même longueur
(12px), épaisseur (1px) et couleur que les angles de la nav — vérifié
identique au pixel — mais `color-mix(in srgb, var(--ground) 16%,
transparent)`, pas `--fg` comme la nav : ce bloc est `tone="dark"`
PERMANENT (jamais dynamique, voir « Respiration » § « Exceptions à
l'inversion »), `--ground` y est déjà l'équivalent fixe de ce que `--fg`
vaudrait — c'est d'ailleurs la même valeur littérale que le trait
existant juste en dessous. Masqués sous 768px pour les 3 traits
intermédiaires (bascule propre à ce composant, indépendante du shell) :
les colonnes de liens y sont toutes empilées sur le même axe, ces
repères n'auraient plus rien à marquer. Les deux angles, eux, restent
visibles à toute largeur (le trait existant, lui, ne change pas).

Vérifié à 900px (dans la plage 768-1023 : la grille 12 colonnes DE CE
COMPOSANT est déjà active — son point de rupture propre est 768px —
alors que le Shell est encore en configuration mobile, sans rail) : les
3 traits intermédiaires tombent EXACTEMENT sur le bord gauche de
SECTEURS/VENTURIA/ADRESSE (écart 0px), pile comme au-dessus de 1024px —
cohérent, aucune bascule à déplacer. Vérifié aussi à 1920 et 2560px,
angles ET traits compris (écart 0px partout, y compris à 2560px où le
Shell se centre au-delà du plafond de 1920px — CLAUDE.md, « Shell de
page » — la grille de `.legalBarMarks` suit ce recentrage puisqu'elle
recalque LA MÊME grille que `.linksGrid`, pas un calcul indépendant).

Jonction angle/trait et trait/repère, vérifiée en deviceScaleFactor 2
au niveau du pixel : aucun décalage (x identique au pixel), aucun
épaississement VISIBLE à l'œil (captures zoomées). Une variation de
luminosité D'UN SEUL pixel écran existe exactement AU POINT où un trait
vertical rencontre le trait horizontal — attendue : c'est l'anti-
crénelage normal de deux traits fins qui se croisent à angle droit
(chaque trait est un color-mix semi-transparent à 16 % ; deux
superpositions à ce même pixel composent un ton légèrement plus clair
que chacun pris seul), pas un défaut propre à cette implémentation —
INHÉRENT à toute jonction de deux traits fins bordés, y compris celles
déjà en place ailleurs sur le site (ex. les angles de la nav
elle-même). Aucune correction appliquée : la seule parade possible (un
retrait sous-pixel entre le repère et le trait) échangerait cet artefact
invisible contre un espace tout aussi sous-pixel mais visuellement
disjoint — pas un progrès.

## Barre de navigation

position fixed, top, hauteur 64px, TOUJOURS visible : ne se cache jamais au
scroll — pas de translateY, pas d'état transparent, aucune logique liée au
sens ou à la distance du scroll. La barre et le filet sous elle (voir
plus bas) forment un seul bloc fixe. Aucun nom de marque dans la barre : le
nom du site reste porté par le titre géant du bloc de fin de page. Les
entrées (déclencheur du méga-menu, Réalisations, Contact) sont alignées à
gauche, à la marge du conteneur (54px desktop), gap 40px, --t-body,
var(--fg) (voir « Tonalités »).

Fond transparent et flouté, en permanence, sur toute la hauteur de la
barre — AUCUNE teinte — même traitement que les cartons du rail (exception
explicite à l'interdiction générale du backdrop-filter, voir « Couleurs ») :
  background: transparent;
  -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px);
Repli si le filtre n'est pas supporté :
  @supports not (backdrop-filter: blur(1px)) { fond = couleur OPAQUE de la
  tonalité en cours (--ground, --ink ou --accent) — jamais transparent sans
  flou, le texte de la page se superposerait à celui de la nav }
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
  1. au niveau de Dernier accompagnement (le cas client Inoko) — son
     icône (l'horloge) reste liée à la fin de l'animation du h1 du
     Hero, mais son ancrage/figement suit Inoko, comme les deux autres
     cartons suivent leur propre section (voir « Apparition du carton
     1 » plus bas)
  2. au niveau de la section services
  3. juste avant le CTA final

Comportement par défaut : un empilement permanent — voir « Mode relais »
plus bas pour la bascule automatique vers un comportement différent
quand les 3 cartons figés ne tiennent pas dans la hauteur de la fenêtre.
Le carton vit dans la colonne du rail et n'en sort jamais latéralement.
Il monte avec la page, puis se fige à 64px du haut de la fenêtre — la hauteur
de la nav, EXACTEMENT la même valeur que le haut du trait sous la barre
(voir « Barre de navigation ») : le haut du carton figé tombe pile sur le
trait, alignés au pixel. Une fois figé, il RESTE visible jusqu'au bas de la
page : il ne repart jamais vers le haut, quelle que soit la section à
l'écran. Le carton suivant se fige à son tour, 20px sous le bas du
précédent. En bas de page, les trois cartons sont visibles, empilés.

Apparition du carton 1 : aucun carton visible pendant le Hero (rail
desktop ET pile mobile) — mais plus par une opacité pilotée en JS
(ancienne mécanique, retirée). Sur le rail desktop, le carton 1 est
ancré à `dernier-accompagnement` exactement comme les cartons 2 et 3
sont ancrés à leur propre section (« Implémentation » plus bas) : sa
plage de figement (`grid-row: dernier-accompagnement-start / -1`) ne
démarre qu'au haut de la section Inoko, donc aucune boîte n'existe dans
les lignes de grille du Hero — rien à peindre, rien à cacher, une pure
conséquence de la grille partagée, aucun JS de visibilité. Son point de
figement (`top: var(--rail-stick)`, 64px, le trait de la nav) reste lui
aussi inchangé — voir la note plus bas sur ce qui distingue encore ce
carton des deux autres une fois figé. Sur la pile mobile, le carton 1
continue d'entrer/sortir par hystérésis sur cette même section (comme
avant, voir « Pile mobile ») : c'est un mécanisme DIFFÉRENT (démontage/
remontage React) qui produit le même résultat (rien pendant le Hero) —
son icône (l'horloge) ne suit QUE le signal de fin du h1 (jamais
l'entrée dans la pile) et ne rejoue jamais.

Écarts harmonisés à une seule valeur, 20px (la gouttière) : l'écart
horizontal rail↔colonne 12, l'écart rail↔bord de l'écran, ET l'écart
vertical entre deux cartons figés. L'écart entre le haut d'un carton
(avant figement) et sa cible d'alignement n'est PLUS cette valeur fixe
pour aucun des trois cartons — chacun s'aligne désormais sur un point
précis de sa propre section, mesuré (voir juste en dessous).

Point de départ (avant figement) des 3 cartons — UNE seule mécanique,
MESURÉE en JS, jamais une valeur fixe :
  1. au niveau de Dernier accompagnement : haut du carton = haut du
     TITRE de la section, « Inoko — Mobilier pour van à Toulouse »
     (`#dernier-accompagnement-title`) — pas la photo (l'ancien
     alignement) : le titre précède tout le reste du contenu variable
     de la section.
  2. au niveau des services : haut du carton = haut du trait
     (border-top) du premier service, « Référencement »
     (`[data-service-row-first]`, services.module.css `.row`).
  3. juste avant le CTA final, mais ANCRÉ SUR SERVICES (la section qui
     porte sa cible, retenue plutôt que Processus) : haut du carton =
     BAS du bloc du dernier service, « Automatisation »
     (`[data-service-row-last]`, le `.row` entier — paragraphes et lien
     « Découvrir l'automatisation » compris, jusqu'au bas de son propre
     padding). `<RailSlot anchor="services">` pour ce carton (page.tsx) :
     `anchor` fixe le `grid-row` en style inline, indépendamment de
     l'endroit où le `<RailSlot>` est rendu dans le JSX (après
     Processus, comme avant — seul l'ancrage change).
Chaque écart est réécrit dans sa propre variable CSS
(`--rail-card1-offset`/`--rail-card2-offset`/`--rail-card3-offset`,
globals.css, repli 20px sans JS chacune — pas pixel-parfait sans JS,
jamais 0 ni une valeur absurde) et lu par `.slot1`/`.slot2`/`.slot3`
(rail.module.css) EN PLACE de l'ancien `padding-top:
var(--shell-rail-pad)` générique (retiré de `.slot` : plus aucun carton
ne l'utilise).

Mesure (Rail.tsx, OFFSET_TARGETS), IDENTIQUE pour les 3 cartons :
l'écart = position document du bord visé (haut de la cible, ou bas —
`offsetTop` + `offsetHeight` pour le carton 3) moins position document
du haut de la section de rattachement (celle de l'`anchor` du
`<RailSlot>` — « services » pour les cartons 2 ET 3, « dernier-
accompagnement » pour le 1er). Position document = `offsetTop` cumulé
le long de la chaîne `offsetParent`, JAMAIS `getBoundingClientRect()` :
ce dernier inclut le `transform` d'une révélation d'entrée GSAP encore
en cours (photo Inoko, lignes de Services) si mesuré avant que
l'utilisateur n'ait scrollé jusque-là, donnant une position transitoire
au lieu de la position de repos — `offsetTop` ignore toujours
`transform`, quel que soit l'état de la révélation au moment de la
mesure. Recalculée au montage, au redimensionnement de la fenêtre,
après `document.fonts.ready` (métriques de police de repli → police
réelle), et via un `ResizeObserver` sur la section de rattachement (un
reflow du texte au-dessus de la cible change la hauteur de la section,
donc l'écart). Écart mesuré : 0px (aux arrondis sub-pixel près) pour
les 3 cartons, à 1024/1440/1728px, y compris après un redimensionnement
1440 → 1024 → 1728 sans recharger la page.

Le POINT DE FIGEMENT des 3 cartons, lui, ne change pas : carton 1 —
`top: var(--rail-stick)` (64px, le trait de la nav, directement) ;
cartons 2 et 3 — `calc()` dérivé des hauteurs des cartons précédents et
des 20px entre deux cartons figés (voir « Implémentation » plus bas).
Seul le POINT DE DÉPART (avant figement) est mesuré, pour les 3.

Le carton passe AU-DESSUS du bloc nav (z-index) : à cette hauteur, il
partage sa position avec la bande floutée latérale du trait, côté rail — le
carton doit rester net, jamais flouté par cette bande.

### Mode relais

Le rail bascule automatiquement entre deux comportements, DÉCIDÉ EN JS
(pas un point de rupture CSS fixe, ni la largeur d'écran seule — c'est
la HAUTEUR de la fenêtre qui compte) :
  empilement (défaut, décrit ci-dessus)  les 3 cartons figés (hauteurs
    RÉELLES, mesurées) + `var(--rail-stick)` + 2 gouttières de 20px
    (entre cartons figés) + 20px de marge basse tiennent dans la hauteur
    de la fenêtre.
  relais (sinon — mesuré : 1024×768, 1366×657, deux résolutions
    courantes, pas des cas limites)  chaque carton qui a un « suivant »
    (1 et 2) se fige à la MÊME valeur que le carton 1,
    `var(--rail-stick)` — plus de décalage empilé pour 2 et 3 — puis
    REPART vers le haut dès que le suivant arrive, sans jamais rester
    figés tous les deux en même temps ni se chevaucher. Le carton 3
    (aucun suivant) se fige lui aussi à `var(--rail-stick)` mais reste
    ensuite visible jusqu'au bas de la page, comme en mode empilement.
Condition de bascule posée en `data-rail-mode="stack"`/`"relay"` sur
`<html>` (RailController, Rail.tsx). Repli sans JS = "stack" (aucune
règle CSS de relais ne s'applique tant que cet attribut n'est pas posé).

Mécanique retenue pour le relais (la plus simple des deux envisagées
avec Franck — pas de ligne de grille nommée par « carton suivant » :
les cartons 2 et 3 partagent déjà la MÊME section de rattachement,
« services », donc la même ligne ; une ligne de plus n'aurait pas pu les
distinguer). Chaque carton qui a un suivant (1 et 2) reçoit, en mode
relais, une hauteur de CONTENEUR EXPLICITE sur son `.slot`
(`align-self: start` remplace `stretch`, `height` fixe la taille au lieu
de laisser le slot s'étirer sur toute la grille) qui s'arrête PILE à la
position de repos (avant figement) du carton SUIVANT — mesurée en JS
(`--rail-card1-relay-height`/`--rail-card2-relay-height`, globals.css,
repli 100vh sans JS : jamais une valeur courte qui ferait relayer un
carton immédiatement). `position: sticky` ne dépassant jamais son
conteneur, cette coïncidence géométrique garantit PAR CONSTRUCTION :
tant que le carton suivant n'a pas atteint sa propre position de repos,
le carton courant reste figé (son conteneur a encore de la marge en
dessous) ; dès que cette position est atteinte, le carton courant est
repoussé vers le haut à la vitesse du défilement — il quitte l'écran par
le haut PENDANT que le suivant, pas encore figé, continue de monter
depuis plus bas. Le bas du premier coïncide exactement avec le haut du
second à tout instant de cette phase (même position document, par
construction) : jamais de chevauchement, jamais les deux figés ensemble.
Le carton 3 n'a personne après lui : son `.slot` garde
`align-self: stretch` jusqu'à la fin de la grille dans les DEUX modes —
rien à limiter ; seul son `top` sticky change en mode relais.

Recalculée aux MÊMES déclencheurs que les écarts de repos (voir plus
haut) : montage, redimensionnement, `document.fonts.ready`,
`ResizeObserver` — ici sur les 2 sections cibles ET les 3 cartons
eux-mêmes (leurs hauteurs réelles entrent dans la condition de bascule,
contrairement aux écarts de repos). Un seul composant, `RailController`
(Rail.tsx), monté une seule fois pour toute la page (pas un par carton
comme `RailSlot`, headless — `return null`) : la décision de bascule ET
les hauteurs de relais ont besoin de connaître les 3 cartons à la fois,
une mesure par `RailSlot` ne pourrait pas partager ce résultat.

Les alignements de repos (0px, `--rail-card1/2/3-offset`) restent
IDENTIQUES dans les deux modes — ce mécanisme ne touche qu'au point de
FIGEMENT et au conteneur, jamais au point de départ. Vérifié
(Playwright, balayage progressif du scroll par pas de 15px, sans
reduced-motion) : 0 chevauchement, 0 carton coupé par le bas de la
fenêtre à 1024×768, 1366×657 et 1440×900 ; mode "relay" détecté à
1024×768 et 1366×657, "stack" à 1440×900 et 1728×1117 ; bascule
correcte lors d'un redimensionnement 1440×900 → 1024×768 → 1440×900
sans recharger la page ; écarts de repos toujours à 0px à 1024/1440/
1728px.

Implémentation : CSS sticky, aucun JS d'animation (hors la mesure et la
bascule de mode ci-dessus).
  <aside data-rail>
    <article data-rail-card>   position: sticky; top: 64px
    <article data-rail-card>   position: sticky;
                                top: calc(64px + hauteur du 1ᵉʳ + 20px)
                                — ou 64px en mode relais
    <article data-rail-card>   position: sticky;
                                top: calc(64px + hauteur du 1ᵉʳ + hauteur du 2ᵉ + 40px)
                                — ou 64px en mode relais
Le conteneur de chaque carton s'étend de son point d'apparition jusqu'au BAS
de la zone rail (mode empilement) ou jusqu'à la position de repos du carton
suivant (mode relais, voir « Mode relais » ci-dessus) — jamais jusqu'à la
fin de sa seule section : c'est ce qui distingue l'empilement du relais
CSS-only utilisé en session 3 (retiré depuis). Un conteneur qui s'arrête
avec sa section fait repartir le carton au lieu de le laisser figé.

Les hauteurs des cartons varient avec leur contenu (nombre de lignes) : les
mesurer au montage et au resize plutôt que les coder en dur, et les écrire
dans des variables CSS pour que les `top` restent des calc().

L'écart vertical entre deux cartons figés est fixe : 20px, en mode
empilement uniquement (en mode relais, un seul carton est figé à la
fois — aucun écart à maintenir entre deux cartons figés simultanément).
Ce n'est plus celui des sections elles-mêmes.

Aucun ancêtre d'un carton ne doit porter overflow: hidden, overflow: auto,
overflow: clip ni contain. Un seul de ces ancêtres suffit à désactiver
sticky, silencieusement, sans erreur : c'est la cause numéro un d'un sticky
qui « ne marche pas ». Si un carton ne colle pas, remonter l'arbre DOM avant
de toucher au CSS du carton.

carton
largeur    210px desktop / 100 % de la largeur disponible en mobile
padding    14px
display    grid, gap 10px
border     cartons 1 et 2 : 1px solid var(--fg) — suit la tonalité
           comme le texte (transition 150ms, voir « Tonalités »), plus
           de filet rouge fixe sur ces deux-là. Carton 3 : voir
           « distinction » plus bas, inchangé.
radius     4px
icône      carré de 44px, en haut à gauche du carton, radius 4px,
           contenant un SVG 20px, trait 1.5px. Décorative :
           aria-hidden="true" sur le SVG. Titre et texte suivent, en
           dessous du carré.
           Cartons 1 et 2 : filet du carré 1px var(--fg), même règle
           et même transition que le filet du carton ci-dessus. Couleur
           du DESSIN (currentColor du SVG, distincte du filet du
           carré) : var(--accent) — sauf quand le carton est sur une
           section de tonalité accent, où le rouge du dessin ne se
           verrait plus sur un fond rouge : il suit alors var(--fg),
           comme le carton 3. Dans la pile mobile DÉPLIÉE, cette règle
           suit la tonalité DU VOILE (jamais accent, déjà traité comme
           dark — voir « Pile mobile ») plutôt que la section brute ;
           dans la pile REPLIÉE, la section brute (peut valoir accent).
           Carton 3 : inchangé — filet du carré var(--line-accent),
           dessin var(--fg), quelle que soit la tonalité.
fond       desktop uniquement, transparent et flouté, AUCUNE teinte :
           background: transparent;
           -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px);
           Repli en fond OPAQUE de la tonalité en cours (--ground, --ink ou
           --accent) si le filtre n'est pas supporté (@supports not
           (backdrop-filter: blur(1px))) — voir « Couleurs ». Sous 1024px,
           ce carton n'existe plus dans le flux : voir « Pile mobile » pour
           son remplacement (une pile fixée en bas de l'écran, avec sa
           propre règle de flou partagé).
           Exception explicite à la règle « Couleurs » qui interdit tout
           backdrop-filter : ici, sur les cartons du rail en desktop
           uniquement, il est autorisé. La règle générale reste valable
           partout ailleurs — nav, méga-menu, et tout le reste du site.
distinction le seul carton qui porte une action (carton 3) : filet DU
           CARTON var(--accent) — jamais var(--fg), ne change pas avec
           la tonalité — pas de fond différent, pas de blanc. Filet du
           carré et dessin de l'icône : voir « icône » ci-dessus,
           inchangés eux aussi (ne suivent jamais l'exception accent).
titre      --t-mono, var(--fg)
texte      --t-small, var(--fg)

Mobile (< 1024px) : les cartons quittent complètement le rail — voir
« Pile mobile » ci-dessous.

## Pile mobile

Sous 1024px uniquement ; au-dessus, rien ne change (rail desktop identique).
Les cartons sortent du flux (plus d'insertion entre les sections) et se
retrouvent dans une pile UNIQUE fixée en bas de l'écran, alimentée par le
même content/rail.ts, sans texte dupliqué. Un seul composant (pas un par
carton) : `src/components/layout/MobileRailStack.tsx`.

Pile repliée :
  position   fixed, bas de l'écran, 20px + env(safe-area-inset-bottom) du
             bas, 20px des bords gauche et droit, largeur fluide (jamais
             figée en px)
  affichage  seul le carton arrivé en dernier est visible en entier : icône,
             titre puis un résumé une ligne en dessous (voir « Résumé »
             ci-dessous), jamais son texte complet. Un chevron (voir
             « Chevron ») ferme la ligne à droite.
  pile       les cartons arrivés avant dépassent derrière, décalés vers le
             haut de 6px chacun (12px au maximum à trois cartons) — CE SONT
             les mêmes éléments que dépliés, réduits à un pic de 6px
             (bord haut + congés), jamais des pastilles séparées. Rien
             au-dessus de la pile (ni trait ni séparateur) : seul le filet
             1px du carton du dessus la termine.
  fond       même rendu que les cartons desktop : transparent, flouté
             (-webkit-backdrop-filter puis backdrop-filter), filet, radius
             4px — mais la surface floutée de la pile est UN SEUL élément
             partagé par tous les cartons, jamais un flou par carton
  tonalité   UNE seule lecture pour toute la pile (texte, icônes) : celle de
             la section sous la pile — --ink en light, --ground en
             dark/accent, transition 150ms, même mécanisme que la nav
  espace     le bas de page reçoit un espace = hauteur de la pile repliée +
             safe-area, via une variable CSS (--mobile-pile-space), mesurée
             en JS, jamais une valeur en dur — pour que rien (dont la barre
             légale du footer) ne reste caché derrière en fin de scroll

Résumé (content/rail.ts, champ `resume`, obligatoire, typé) : une ligne
sous le titre, --t-small, couleur de tonalité, opacité 80 %, tronquée par
ellipse si elle dépasse (jamais deux lignes). N'apparaît QUE dans la pile
mobile repliée — ni dans la pile dépliée (qui montre déjà le texte complet),
ni sur le rail desktop.

Chevron : SVG inline dessiné à la main (jamais une icône de librairie),
trait 1.5px, currentColor, 16px, aligné à droite du titre, centré
verticalement, aria-hidden (l'état est déjà porté par aria-expanded).
Pointe vers le haut repliée, pivote de 180° à l'ouverture, 200ms, easing du
site ; orientation instantanée en reduced-motion.

Les 3 cartons sont RÉVERSIBLES : ils entrent ET ressortent selon la
position de scroll — le carton 1 aussi désormais (voir « Apparition du
carton 1 » plus haut : jamais visible pendant le Hero, apparaît avec la
section Inoko, sur le même seuil d'hystérésis que les cartons 2/3, mais
son icône ne suit que le signal de fin du h1, jamais rejouée). La pile
elle-même ne bouge jamais — fixed en permanence, aucune logique liée au
scroll sur sa position.
  entrée     haut de la section de rattachement à 50 % de la hauteur
             visible EN DESCENDANT
  sortie     haut de cette même section à 60 % de la hauteur visible EN
             REMONTANT — un seuil DIFFÉRENT de celui d'entrée (hystérésis) :
             sans cet écart, un carton posé pile sur la limite entre et sort
             à chaque micro-mouvement du doigt. Mesure directe (jamais
             ScrollTrigger, voir src/lib/useSectionHysteresis.ts, même
             principe que useStickOnce.ts) : un seul bit d'état retenu par
             carton (« actuellement entré » ou non) détermine quel seuil,
             parmi les deux, est testé à chaque frame de scroll.
  entrée     monte depuis le bas et se pose PAR-DESSUS la pile
             (translateY(100%) → 0, 300ms, easing du site), pendant que les
             précédents reprennent leur décalage de 6px, puis joue son
             icône une fois la montée terminée
  sortie     animation exacte inverse (0 → translateY(100%), 300ms) : le
             carton redescend hors de l'écran pendant que les autres
             reprennent leur décalage ; démonté pour de vrai une fois parti
             (jamais laissé cru dans le DOM)
  rejeu      un carton qui entre à nouveau rejoue son animation d'icône
             (il a été démonté puis remonté)
  ordre      les cartons sortent dans l'ordre inverse de leur arrivée (3
             avant 2) — garanti par construction (chaque carton a sa propre
             hystérésis indépendante sur sa propre section, et l'ordre des
             sections dans la page fait le reste), jamais forcé entre eux
  chargement page chargée en milieu de scroll : les cartons dont le seuil
             d'entrée est déjà franchi sont présents d'emblée, sans
             animation ni lecture d'icône
  dépliée    aucun carton ne peut entrer ni sortir tant que la pile est
             dépliée (le scroll de page est de toute façon bloqué) ; une
             sortie déjà en cours au moment du dépliage est annulée
  interruption si le seuil opposé est franchi pendant qu'une animation
             tourne (ex. sortie interrompue par un retour en dessous du
             seuil d'entrée), pas d'empilement : l'animation en cours est
             interrompue proprement et repart dans l'autre sens — la pile
             finit toujours dans un état cohérent avec la position de
             scroll

Dépliage : un tap sur la pile repliée la déplie TOUJOURS, quel que soit le
carton du dessus — un <button> séparé, superposé à la pile (jamais la pile
elle-même qui changerait de balise). Dépliée : tous les cartons présents
s'affichent en entier (icône, titre, texte), empilés vers le haut depuis le
bas de l'écran, gap 10px, dans l'ordre 1, 2, 3 de haut en bas. Seul le
carton 3 est cliquable (lien /contact, même soulignement du titre au
tap/focus que sur desktop) ; un tap sur les cartons 1 ou 2 ferme la pile.
Un calque plein écran (UN seul élément flouté, sous la pile et au-dessus de
la page) apparaît derrière, teinté d'un VOILE (voir ci-dessous) ; pendant
l'ouverture, les cartons perdent leur propre backdrop-filter — la page est
déjà floutée par le calque, pas de flou sur du flou. Fermeture : tap sur le
calque, Escape, ou nouveau tap sur la pile. Scroll de page bloqué tant que
la pile est dépliée (Lenis en pause). Le carton 3 sorti n'est plus dans
l'ordre de tabulation (démonté).

Voile du calque plein écran — exception à « aucune teinte » (voir
« Couleurs »). Contrairement au panneau du menu mobile (qui a besoin d'une
couche séparée entre flou et texte, voir « Méga-menu — mobile »), ce calque
ne porte aucun texte : le voile et le flou vivent sur le MÊME élément —
  background: color-mix(in srgb, var(--ground) var(--veil-ground-opacity), transparent);   /* tonalité light */
  background: color-mix(in srgb, var(--ink) var(--veil-ink-opacity), transparent);          /* dark/accent */
--veil-ground-opacity (55 %) et --veil-ink-opacity (65 %), variables CSS
globales (globals.css, avec le calcul en commentaire) partagées avec le
panneau du menu mobile. Tonalité : celle de la section tout en bas de
l'écran (au pixel innerHeight - 1, `getBottomTone()`, src/lib/tone.ts),
accent traité comme dark (`toVeilTone`) — un texte --ground sur un voile
--accent ne passerait pas le contraste minimum. Mesurée UNE SEULE FOIS au
dépliage (le scroll étant bloqué tant que la pile reste dépliée, aucun
recalcul pendant ce temps) et appliquée aux cartons dépliés (titre, texte,
icônes, filets) — la pile REPLIÉE garde sa propre mesure, continue,
inchangée (tonalité de la section sous la pile, « Pile mobile » § fond ;
pas de voile).
Animation : le voile monte du bas vers le haut, clip-path
inset(100% 0 0 0) → inset(0 0 0 0), 350ms, easing du site, état initial posé
en JS (gsap.set), jamais en CSS. Fermeture : l'inverse, 250ms.
overwrite: true sur tous les tweens (ouverture et fermeture peuvent
s'interrompre, l'animation en cours repart proprement dans l'autre sens,
sans saut).

Accessibilité : <button> avec aria-expanded/aria-controls, surface >=
44×44px ; focus sur le premier carton à l'ouverture, Tab piégé, Escape
rend le focus au bouton. reduced-motion : pas de glissement, pas
d'animation d'icône ni de sortie (apparition/disparition instantanées),
chevron sans rotation, voile présent/absent instantanément (pas de montée).

z-index (bas → haut) : contenu de page, calque de la pile dépliée (52),
pile mobile (53), méga-menu — mobile ET desktop, même valeur, jamais
montés en même temps (55), fond flouté de nav (58), trait de nav (59),
barre de nav (60), carton du rail desktop figé (65, >= 1024px
uniquement — partage sa position avec la bande floutée latérale du trait,
voir plus haut). La bascule de Respiration (« Respiration ») ne
participe pas à cette échelle : elle échange les VALEURS de deux custom
properties (`--ink`/`--ground`) au niveau racine, sans aucun calque ni
z-index — voir « Respiration (home) » § « Inversion de toute la page ».

Animation des icônes du RAIL DESKTOP (>= 1024px) — la pile mobile a ses
propres déclencheurs, décrits ci-dessus dans « Pile mobile ».
GSAP, ≤ 400ms, easing unique du site, jamais rejouée pour les cartons 1 et 2 :
  carton 1 (horloge)  grande aiguille 360°, petite aiguille 30°, autour du
                      centre du cadran (svgOrigin, pas transformOrigin %) —
                      déclenchée une fois, juste après la fin de la timeline
                      du h1 du Hero (signal src/lib/heroTitleSignal.ts,
                      jamais un délai estimé). Pas d'animation si le h1 ne
                      s'anime pas (prefers-reduced-motion).
  carton 2 (étoile)   quart de tour autour de son centre — déclenchée une
                      fois, à l'instant exact où le carton se fige.
  carton 3 (flèche)   sort par la droite du carré (masquée par
                      overflow: hidden sur le SEUL conteneur de l'icône,
                      jamais un ancêtre du carton — ça casserait sticky),
                      réapparaît par la gauche jusqu'à sa position d'origine.
                      Déclenchée au figement (une fois), puis à chaque
                      survol et focus clavier (focus-visible) du carton
                      entier, sans limite de rejeux. Pas d'empilement : un
                      drapeau interne à l'icône ignore un nouveau
                      déclenchement pendant qu'une animation tourne déjà —
                      la flèche finit toujours à sa position d'origine.
                      Le titre du carton se souligne au survol/focus
                      (text-decoration-color, transparent → currentColor,
                      150ms) ; le soulignement seul reste en
                      prefers-reduced-motion, sans transition ni animation
                      d'icône.
Figement détecté par MESURE directe (comparer getBoundingClientRect().top
au `top` sticky résolu), jamais par ScrollTrigger — voir
src/lib/useStickOnce.ts pour le raisonnement complet. Si un carton est déjà
figé au chargement (rechargement en milieu de page), son icône ne s'anime
pas. `gsap.context()` sans fonction ne crée PAS de contexte utilisable (il
retourne le contexte ambiant, souvent undefined) : toujours
`gsap.context(() => {})` puis `.add(...)` pour ajouter des tweens après
coup depuis un gestionnaire d'évènement.

## Méga-menu — desktop

panneau      position fixed, top = hauteur de la nav, left 54px
             largeur = celle de la zone de contenu, fluide (jusqu'à 1616px
             à 1920px de large)
             padding 20px
             fond transparent et flouté, exception explicite à
             l'interdiction générale du backdrop-filter (voir
             « Couleurs ») — même traitement que le panneau du menu
             mobile : background: transparent;
             -webkit-backdrop-filter: blur(24px); backdrop-filter:
             blur(24px); (préfixe AVANT le standard). Repli en fond
             OPAQUE de la tonalité en cours si le filtre n'est pas
             supporté (@supports not (backdrop-filter: blur(1px))),
             jamais transparent sans flou.
             voile teinté par-dessus le flou, exception à « aucune
             teinte » (voir « Couleurs ») : une couche dédiée, ENTRE le
             flou (qui ne bouge pas) et le contenu — mêmes variables que
             le panneau du menu mobile, --veil-ground-opacity (55 %) et
             --veil-ink-opacity (65 %), color-mix sur --ground ou --ink
             selon la tonalité. Tonalité : celle de la section sous le
             centre vertical de la barre — la MÊME mesure vivante que la
             nav elle-même (pas une mesure séparée), accent traité comme
             dark (comme le voile mobile, un texte --ground sur un voile
             --accent ne passerait pas le contraste minimum).
             texte du panneau (titres de colonne, entrées) : var(--fg),
             comme la nav — --ink sur light, --ground sur dark et
             accent, transition color 150ms, cubic-bezier(0,.55,.45,1).
             contour RACCORDÉ au trait sous la nav : même couleur
             (color-mix(in srgb, var(--fg) 16%, transparent), tirée du
             MÊME --fg que le trait), même épaisseur 1px. Le trait
             dessine le haut du contour (bord supérieur, congé 4px des
             deux coins hauts, deux branches de 12px) : le panneau ne
             porte donc PAS de bord supérieur — une seule ligne continue,
             jamais de double trait. Bords gauche et droit du panneau :
             prolongent au pixel près les branches du trait, sans
             décalage ni chevauchement (mêmes variables de shell des
             deux côtés). Coins du bas du panneau : même congé de 4px
             que le trait, radius 0 0 4px 4px (l'inverse du trait, qui
             est 4px 4px 0 0) — sans box-shadow.
             Le panneau ne passe jamais derrière le bloc nav en z-index
             (55 < 58/59/60, voir « z-index » en fin de fichier) et ne
             floute jamais une zone déjà floutée par la nav : dans la
             zone de contenu, le flou de la nav (.navBlur) s'arrête déjà
             au trait — c'est cette bande nette, pas une bande déjà
             floutée, que le panneau vient flouter à son tour.
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
typo         titre de colonne  --t-mono, var(--fg)
             colonne 1  21px, lh 1.4, ls +.02em, poids 400, var(--fg)
             colonne 2  18px, lh 1.4, ls +.02em, poids 400, var(--fg) à 70 %
             (colonne 2 volontairement secondaire)

carte cas client
             aspect-ratio 1 / 1.25 (portrait), radius 4px, overflow hidden
             image object-fit: cover, padding interne 12px
             haut gauche : « Inoko » 13px puis « Mobilier de van, Toulouse »
             en --t-mono, --ground
             bas : deux tags --t-mono --ground, border 1px solid
             var(--ground) (voir « badges sur photo » ci-dessous),
             radius 3px, padding 8px 13px, gap 10px
             dégradé linear-gradient(180deg, rgba(10,6,5,.45), transparent 30%,
             transparent 70%, rgba(10,6,5,.45)) sous le texte

badges sur photo
             tout badge posé SUR UNE PHOTO (carte cas client ci-dessus,
             et les tags de la section « Dernier accompagnement » de la
             home) porte un contour à LA COULEUR DE SON TEXTE (1px solid
             var(--ground) pour ces deux-là, leur texte étant --ground).
             Un badge qui n'est pas sur une photo suit sa propre règle,
             inchangée.

comportement desktop : survol, 120ms de délai à l'entrée, 200ms à la sortie
             clavier et tactile : clic
             Escape ferme et rend le focus au déclencheur
             focus piégé dans le panneau, aria-expanded et aria-controls corrects
             scroll de page bloqué, Lenis mis en pause puis relancé

## Méga-menu — mobile (< 1024px)

Structure propre au mobile, pas un empilement des colonnes desktop.

déclencheur  le mot « Menu » dans la barre, à droite, --t-mono. Devient
             « Fermer » (content/nav.ts, `mobile.closeLabel`) tant que le
             panneau est ouvert. aria-expanded et aria-controls corrects.

panneau      plein écran, position fixed (inset: 0, pas top: var(--nav-h))
             — le trait à angles sous la nav et la barre elle-même
             restent visibles par-dessus lui (z-index nav > z-index
             panneau, voir plus bas)
             fond transparent, flouté (AUCUNE teinte SUR CETTE COUCHE —
             voir « voile » ci-dessous pour la couleur) — -webkit-backdrop-filter
             PUIS backdrop-filter, dans cet ordre :
               background: transparent;
               -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px);
             Repli si le filtre n'est pas supporté : fond OPAQUE de la
             tonalité du panneau (voir « tonalité » plus bas), jamais
             transparent sans flou.
             UNE seule surface floutée : pendant que ce panneau est
             ouvert, le flou propre de la nav (.navBlur) est désactivé —
             jamais de flou sur du flou (voir « Couleurs », exceptions
             au backdrop-filter).
             sans radius ni filet propre (le filet visible en haut est
             celui de la nav, inchangé ; celui du bas est décrit plus
             bas)

voile        exception à « aucune teinte » (voir « Couleurs ») : une
             couche dédiée à l'intérieur du panneau, ENTRE le flou
             ci-dessus (qui ne bouge pas, non teinté) et le texte —
               background: color-mix(in srgb, var(--ground) var(--veil-ground-opacity), transparent);   /* tonalité light */
               background: color-mix(in srgb, var(--ink) var(--veil-ink-opacity), transparent);          /* dark/accent */
             --veil-ground-opacity (55 %) et --veil-ink-opacity (65 %),
             variables CSS globales (globals.css) partagées avec le
             calque de la pile dépliée (« Rail droit » § « Pile
             mobile ») : opacité minimale garantissant un contraste
             texte/fond d'au moins 4,5:1 dans le pire cas de ce qu'il y a
             derrière (--ink pur derrière un voile --ground, --ground pur
             derrière un voile --ink), arrondie au 5 % supérieur — calcul
             détaillé en commentaire au-dessus de ces deux variables.

ouverture    le voile monte du bas vers le haut : clip-path
             inset(100% 0 0 0) → inset(0 0 0 0), 350ms, easing du site.
             Le texte du panneau (entrées, ligne du bas, trait du bas)
             apparaît en opacité 0 → 1, 200ms, démarré 150ms après le
             voile (durée totale 350ms). État initial posé en JS
             (gsap.set), jamais en CSS. reduced-motion : voile et texte
             présents instantanément, sans animation.
             Scroll de la page bloqué, Lenis en pause. Escape ferme et
             rend le focus au déclencheur. Focus piégé dans le panneau.

fermeture    l'inverse : le voile redescend, 250ms, et le texte
             disparaît. overwrite: true sur tous les tweens (ouverture
             et fermeture peuvent s'interrompre, l'animation en cours
             repart proprement dans l'autre sens, sans saut). Le panneau
             reste monté le temps de cette animation, démonté une fois
             terminée (reduced-motion : démontage immédiat).

tonalité     UNE seule couleur de texte pour tout le panneau (entrées,
             ligne du bas, trait du bas) ET pour la nav qui le surplombe
             pendant ce temps (déclencheur « Fermer », logo, trait du
             haut) : --ink sur light, --ground sur dark — accent est
             traité comme dark pour le voile ET le texte (un texte
             --ground sur --accent ne passerait pas le contraste
             minimum, voir « voile » ci-dessus). Celle de la section qui
             se trouve tout en bas de la fenêtre visible (au pixel
             innerHeight - 1), pas celle sous un point précis
             (contrairement à la nav/aux cartons en temps normal, voir
             « Tonalités »).
             Mesurée UNE SEULE FOIS à l'ouverture (le scroll étant
             bloqué tant qu'il reste ouvert, aucun recalcul pendant ce
             temps) : `getBottomTone()` (src/lib/tone.ts) lit
             directement le DOM et retourne la tonalité de la section
             dont le haut est le dernier franchi avant ce pixel, puis
             `toVeilTone()` y remplace accent par dark.

entrées      4 entrées de premier niveau, dans cet ordre, tailles et
             espacements inchangés (40px, lh 40px, ls +.02em, poids 400,
             pas vertical 60px, première entrée à 92px du haut de
             l'écran — 64px de nav + 12px de trait + 16px) :
               Services      <button>, seule à se déplier (accordéon)
               Réalisations  <span>, ni dépliable ni cliquable
               À propos      <span>, ni dépliable ni cliquable
               Contact       <a> vers /contact ; le tap ferme le panneau
                             puis laisse la navigation suivre
             Réalisations et Contact reprennent leur libellé (et, pour
             Contact, son href) depuis `nav.topLinks` — jamais retapés.

accordéon    Services contient les 4 services de content/services.ts
             (Référencement, Publicité, Site internet, Automatisation),
             jamais dupliqués depuis un autre fichier. Chaque service
             suit son propre `isLink` (content/services.ts, même
             convention que NavEntry/content/nav.ts et
             FooterLinkEntry/content/footer.ts) : `<Link href={service.
             href}>` si true (page réellement publiée — Automatisation
             aujourd'hui, /services/automations), sinon <span> (page pas
             encore publiée) — même style dans les deux cas, --t-lead,
             aucun soulignement ajouté : un lien qui ne se distingue pas
             à l'œil d'une <span>. Le tap sur un lien ferme le panneau
             puis laisse la navigation suivre, comme Contact plus bas.
             Ouverture/fermeture en hauteur, 300ms, easing du site.
             Chevron : SVG dessiné à la main, trait 1.5px, currentColor,
             aligné à droite du mot « Services », centré verticalement
             dessus. Pointe vers le bas fermé, pivote de 180° ouvert,
             200ms. aria-hidden (l'état est déjà porté par aria-expanded
             sur le bouton Services, avec aria-controls).
             reduced-motion : dépliage sans animation, chevron qui
             change d'orientation instantanément.

bas du       une ligne, --t-mono, position fixe quelle que soit la
panneau      hauteur de l'écran et l'état de l'accordéon (si l'accordéon
             ouvert déborde, c'est la zone des entrées qui défile en
             interne, jamais cette ligne) :
               gauche   heure de Toulouse (« 14:32 », timeZone
                        'Europe/Paris'), calculée côté client, mise à
                        jour chaque minute, chaîne vide au rendu serveur
                        — largeur réservée d'avance (5ch) : son
                        apparition ne déplace rien
               droite   « Toulouse », toujours collé au bord droit
             En dessous, à 12px : un trait identique à celui sous la nav
             (filet 1px, congés 4px, branches 12px) mais RETOURNÉ, ses
             branches pointent vers le HAUT. À 20px des bords gauche et
             droit de l'écran. Le bas de ce trait est à
             20px + env(safe-area-inset-bottom) du bas de l'écran.

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

- Aucun trait séparateur horizontal entre les sections de la home, ni à
  l'intérieur d'une section pour distinguer des blocs répétés (ex. les
  4 lignes de Services, retirés — le rythme vient de l'espacement, pas
  d'un filet). Seuls traits conservés : celui de la nav (« Barre de
  navigation »), celui du footer (`.legalBar`, avant la barre légale) et
  les traits internes du bloc de fin — ce sont des éléments de chrome
  ou de structure interne, pas des séparateurs entre deux sections.
- Les champs de formulaire font au minimum 16px sur mobile. En dessous,
  Safari iOS zoome la page à la mise au point du champ et ne la dézoome pas.
- Toute cible tactile (lien, bouton, entrée de menu) fait au moins 44×44px
  de surface cliquable, quitte à agrandir le padding sans agrandir le texte.
- `scroll-margin-top: 84px` (`--scroll-offset` : hauteur de la barre + 20px)
  sur toute ancre interne, sinon la section visée atterrit sous le bloc nav
  fixe. Valeur distincte de `--rail-stick` (64px, la hauteur de la seule
  barre) qui positionne le figement des cartons du rail — les deux ne se
  confondent plus depuis que les cartons s'alignent sur le trait.
- Un fond est posé sur `html` ET sur `body` séparément (jamais `body`
  seul) : sinon le rebond de scroll (Mac ET iOS) laisse apparaître du
  blanc en haut et en bas. Depuis la session « finitions du footer »,
  les deux ne portent plus la MÊME couleur : voir « Couleurs » et
  « Respiration » § « Exceptions à l'inversion » (`html` = charbon fixe,
  `body` = `var(--ground)`, toujours actif pendant le rebond du haut ET
  du bas).
- `text-wrap: balance` sur les titres : évite le mot orphelin sur la
  dernière ligne. À réserver aux titres, c'est coûteux sur un long texte.
- `-webkit-font-smoothing: antialiased` sur les sections en négatif, en
  complément des 80 % d'opacité.

## Texte

- Tout le texte affiché vit dans content/*.ts, typé, jamais en dur dans le JSX.
- Le site parle au « on » en sujet. « Nous » est autorisé uniquement en complément
  (écrivez-nous, dites-nous). Jamais « je », « me », « moi », « mon ».
- Exception : un CTA à la première personne du visiteur (« Comment améliorer mon
  référencement ? ») est autorisé.
- Les négations sont reformulées en positif.
- Espace fine insécable (U+202F) avant ? ! : ;

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
3. les trois cartons du rail se figent bien à 64px (var(--rail-stick)) ;
   en mode empilement (fenêtre assez haute), ils restent visibles,
   empilés, jusqu'au bas de la page — en mode relais (fenêtre courte,
   voir « Rail droit » § « Mode relais »), un seul à la fois est figé,
   sans jamais se chevaucher ni être coupé par le bas de la fenêtre

Puis navigation complète au clavier, du premier lien au dernier.
Corriger avant de rendre la main.
