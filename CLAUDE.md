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

Tous les fonds sont opaques, sauf cinq exceptions explicites : la barre de
nav (desktop ET mobile — voir « Barre de navigation »), les cartons du rail en
desktop, la pile mobile du rail (repliée et dépliée), le calque plein écran
derrière la pile dépliée (voir « Rail droit » § « Pile mobile ») et le panneau
du menu mobile (voir « Méga-menu — mobile »). Ailleurs, aucun backdrop-filter :
c'est le filtre le plus coûteux du navigateur, il recompose tout
l'arrière-plan à chaque frame et provoque des artefacts sur Safari iOS quand
il coexiste avec du position: fixed — le méga-menu DESKTOP (fixed lui aussi)
en reste donc exclu. Un aplat --ground rend la même chose partout ailleurs.

Parmi ces cinq exceptions, deux seulement portent en plus un VOILE teinté
par-dessus leur flou : le panneau du menu mobile et le calque plein écran
derrière la pile dépliée (voir ces deux sections pour le détail — tonalité,
variables d'opacité, animation de montée). Sous un flou transparent sans
teinte, le fond derrière ces deux surfaces plein écran mélange crème et
charbon (et bientôt des photos) sans qu'aucune couleur de texte n'y reste
lisible partout. La nav, les cartons du rail en desktop et la pile mobile
REPLIÉE restent, eux, sans teinte.

Dans une section en négatif, un paragraphe long passe à 80 % d'opacité :
sur fond sombre, un texte clair paraît optiquement plus gras et vibre sur
plusieurs lignes. Les titres restent à 100 %.

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
  fond plein écran de couleur unie (Respiration, footer) : box-shadow: 0 0 0
  100vmax var(--token); clip-path: inset(0 -100vmax); sur l'élément — un
  box-shadow ne compte pas dans le scroll overflow, contrairement à 100vw.

Mobile (< 1024px)
  6 colonnes, gap 20px, marges 20px
  pas de rail dans le flux : ses trois cartons vivent dans une pile fixée
  en bas de l'écran — voir « Rail droit » § « Pile mobile ». Largeur fluide
  — 100 % de la largeur disponible entre les marges de 20px — jamais une
  valeur figée en px, sinon un iPhone large laisse du vide sur le côté.

Le contenu reste dans le conteneur. Seul le rail (desktop) et la pile
mobile (son remplacement sous 1024px) vont jusqu'au bord, protégés par leur
propre padding/marge de 20px.

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

Cartons 2 et 3 RÉVERSIBLES : ils entrent ET ressortent selon la position de
scroll, le carton 1 seul reste toujours présent. La pile elle-même ne bouge
jamais — fixed en permanence, aucune logique liée au scroll sur sa
position.
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
pile mobile (53), méga-menu mobile (55), fond flouté de nav (58), trait de
nav (59), barre de nav (60), carton du rail desktop figé (65, >= 1024px
uniquement — partage sa position avec la bande floutée latérale du trait,
voir plus haut).

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
             jamais de flou sur du flou, jamais deux surfaces floutées
             côte à côte (voir « Couleurs », exceptions au
             backdrop-filter).
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
             jamais dupliqués depuis un autre fichier. Chaque service est
             un <span>, --t-lead : /services/* n'existe pas encore.
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
3. les trois cartons du rail se figent bien à 84px et restent visibles,
   empilés, jusqu'au bas de la page

Puis navigation complète au clavier, du premier lien au dernier.
Corriger avant de rendre la main.
