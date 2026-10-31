# Venturia — home V2

Branche `home-v2` : la home finale de venturia.fr, assemblée à partir de deux
tests de design (test 2 « taste » pour la base, test 1 « impeccable » pour
six sections). Les sections « Venturia » à « Technique » reprennent le brief
du test 2, corrigé ; « Home V2 — sélection finale » fixe ce qui a été
retenu ; « Règles techniques » reprend ce qui reste valable de l'ancien
CLAUDE.md du site.

## Venturia
Studio digital qui aide les entreprises à trouver plus de clients en ligne et à vendre plus. Aucun lieu n'est mentionné sur le site (exception : les titres des œuvres, voir « Images »).
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
Appels à l'action : plusieurs, avec des formulations variées (jamais la même phrase répétée). Action principale : réserver un créneau de 20 minutes — tous les boutons pointent vers la constante `BOOKING_URL` (https://cal.com/venturia/premier-echange, content/home.ts). Alternative : écrire à hey@venturia.fr.
Second objectif, le SEO : un seul H1, explicite (activité + cible), et tous les titres en vrai texte.

## Preuve : Inoko (seuls chiffres de résultat autorisés)
Inoko vend du mobilier modulable pour van. Ancien client : toujours au passé, jamais « client actuel ». Le site d'Inoko n'a pas été fait par Venturia.
- Départ (janvier 2026) : 1 vente par mois, via Leboncoin, seul canal de vente.
- Travail (chantier SEO de janvier-février 2026) : pages produits retravaillées, une page pilier « lit peigne » et des articles de blog, dont une page guide « comment fabriquer un lit peigne », publiée pendant ce chantier.
- C'est la page pilier « lit peigne » qui est arrivée en 1re page de Google sur un mot-clé d'environ 5 000 recherches par mois. La page guide n'est pas concernée par ce résultat.
- Clics depuis Google (Search Console) : déc. 2025 : 86 · janv. : 204 · févr. : 304 · mars : 590 · avr. : 1 016 · mai : 1 736. Les clics de juin et juillet 2026 ne sont jamais publiés.
- Commandes : 1 (janvier) → 13 (avril). CA mensuel : 1 000 € (janvier) → 9 521 € TTC (avril).
- Avril 2026 : sur nos conseils, Inoko a lancé un kit d'aménagement van. Les annonces Google Ads (réseau de recherche, Search), lancées le 11 avril 2026, portaient uniquement sur ce kit : rentables dès la deuxième semaine, ROAS de 15. Aucun chiffre propre au kit (ventes, CA) n'est publié.
Aucun autre chiffre de résultat, nulle part. Aucun résultat affirmé pour l'automatisation ni pour les sites livrés. Rien sur le remarketing, Performance Max, un bilan mensuel ou un délai de réponse.

## Avis clients
Avis Google recopiés mot pour mot (content/home.ts, `reviews`). N'invente aucun texte d'avis ni aucun nom. Un avis provisoire (`placeholder: true`) ne part jamais en production : `publishedReviews` l'écarte quand `VERCEL_ENV=production` ou `VENTURIA_PRODUCTION=1`. Sans avis publié, la section disparaît.

## Direction artistique
Références (en prendre l'idée, sans copier) :
- synqro.co : structure, beaucoup de vide, la typographie porte la page ; page contact avec gros titre, email en très grand et agenda intégré.
- springsummer.dk : qualité photo éditoriale, typographie géante assumée.
- area17.com/fr : direction artistique radicale, peu de composants, répétés avec rigueur.
- noqode.fr : vraie photo + carte d'interface posée dessus.
- vydera.com/fr : cartes d'interface sobres, labels en police mono.
- digidop.com/fr : pied de page plein écran qui sert de plan du site.
À éviter : le rendu « template IA » (dégradés, grilles de cartes identiques, icônes génériques), les murs de logos, une page entièrement sombre.
Palette : charbon #1A1614, crème #DEDCD3, rouge #FE3939, aucune autre teinte.
Texte secondaire : peut être atténué, avec un contraste d'au moins 4,5:1.

## Images
- Uniquement les images du repo. Aucun téléchargement sans l'accord de Franck.
- Chaque image venue d'ailleurs est notée dans CREDITS-IMAGES.md (fichier, source, URL, auteur, licence).
- Aucun lieu dans les noms de fichiers.
- Légende d'un tableau : titre, auteur, année, rien d'autre. Les titres des œuvres restent tels quels, même s'ils contiennent un lieu.
- Interfaces stylisées autorisées (rapport mensuel, workflow n8n, fiche produit, résultat Google, campagnes Google Ads), sans aucune mention « données de démonstration ». Elles ne montrent aucun chiffre : ni résultat, ni prix (même fictif), ni budget — libellés, barres ou courbes sans valeurs. Seule exception : la carte Inoko, avec ses vrais chiffres. Les seuls montants de la home sont les recommandations de budget Google Ads de la FAQ.
- Jamais de « [CHIFFRE À FOURNIR] » sur une page.

## Icônes
@phosphor-icons/react est installé (accepté). Tu peux aussi dessiner tes propres icônes en SVG.

## Rédaction
Réécriture libre : pars des textes de content/*.ts ou réécris tout, sans ajouter de promesse ni de fait.
« On » en sujet, « nous » en complément, jamais « je ». Aucune formulation négative (« sans » toléré), pas de tournure « X, pas Y ». Des bénéfices concrets pour l'entreprise du client.
Aucun prix de Venturia. Exception validée : le budget Google Ads conseillé dans la FAQ (500 € par mois, 300 € pour un budget serré, payé directement à Google).
Typographie : apostrophe typographique ’ (jamais ') dans les textes affichés ; espace fine insécable (U+202F) avant ? ! : ; et comme séparateur de milliers ; espace insécable (U+00A0) avant € et %.
Tout le texte affiché vit dans content/*.ts, jamais en dur dans le JSX.

## Technique
Next.js 16 App Router, Tailwind, GSAP + ScrollTrigger, @phosphor-icons/react. Aucune autre dépendance npm (ni Motion ni framer-motion) sans l'accord de Franck. prefers-reduced-motion respecté. Rendu soigné à 390 px et à 1440 px, sans scroll horizontal.

## Home V2 — sélection finale

### Style global (base : test 2)
- Polices via `next/font/google` (fichiers servis depuis notre domaine) : Archivo variable, axe de largeur (titres, gros chiffres) — `--font-archivo` ; Geist (texte courant) — `--font-geist` ; Geist Mono (labels, données) — `--font-geist-mono`. Les anciennes polices (Bricolage Grotesque, Instrument Sans, JetBrains Mono, sur `--font-display/--font-sans/--font-mono`) restent chargées tant que les pages d'origine (/services/sea, /automations, /creation-site, /contact) les utilisent.
- Palette : crème #DEDCD3, charbon #1A1614, rouge #FE3939, et les tokens du test 2 (`--ink`, `--paper`, `--red`, `--ink-soft`, `--paper-soft`, `--line-ink`, `--line-paper`, `--panel`), posés sur `.page` (components/home/home.module.css). Aucune autre teinte.
- Arrondis : `--radius` 4 px, `--radius-tag` 3 px (globals.css).
- Espacement vertical : `--section`, 88 px en mobile, 152 px dès 900 px, pour toutes les sections, y compris celles du test 1.
- Séparateurs entre sections : un simple espace. Aucun filet fort de 2 px, aucun trait en haut de section. En-têtes de section : partout le filet titré du test 2 (label Geist Mono + carré rouge de 8 px), sans trait. Les filets fins à l'intérieur d'une section (questions de la FAQ, lignes de liste) restent.
- Tableaux : jamais tronqués. Chaque tableau garde son format d'origine (aspect-ratio = dimensions réelles de l'image, aucun object-fit: cover qui recadre). Dans une rangée, un tableau en portrait garde la même hauteur que les autres et devient moins large (Lautrec dans Services et dans le méga-menu : hauteur fixe, largeur selon le ratio).

### Nav + méga-menu
- Forme du test 2 : barre flottante détachée des bords de l'écran, arrondi 4 px, bordure 1 px, logo, liens, email visible, bouton de réservation.
- Fond : celui de la nav du site d'origine — transparent, `-webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px)` (préfixe avant le standard), repli opaque de la tonalité en cours si le flou n'est pas supporté. Aucune ombre.
- Couleur du texte : suit la tonalité de la section sous la barre (`subscribeTone`, src/lib/tone.ts) — chaque section déclare `data-tone`.
- Barre toujours visible (position fixed), jamais retirée au défilement. Liens soulignés (« Lire le cas », email) : soulignés au repos, texte et soulignement rouges au survol (200 ms).
- Méga-menu et menu mobile du test 2. Méga-menu : même verre que la barre, avec une teinte crème à 72 % (lisibilité au-dessus du hero) ; tient entier dans la fenêtre dès 1280×720 — si la place manque, réduire l'aperçu du tableau, jamais les textes. Aperçus empilés, préchargés à l'approche de « Services », fondu d'opacité de 200 ms.
- Une bande d'une autre tonalité dans une section (ex. cartes sombres du bloc Inoko) porte son propre `data-tone` : la barre la suit (src/lib/tone.ts).

### Sections de la home, dans cet ordre
1. Hero : test 2 (surtitre « Studio e-commerce », H1 « Plus de commandes pour votre boutique. »), carte Search Console avec le nom Inoko visible.
2. « Vos clients cherchent déjà… » : test 1, avec le Béraud.
3. Services : test 2. Interface posée sur un coin du tableau (un quart de sa largeur au maximum), jamais sur le sujet principal ; le coin alterne d'un service à l'autre. Si l'interface ne tient pas, elle devient plus compacte, le tableau garde sa taille. En mobile : tableau en pleine largeur, interface en dessous qui remonte légèrement sur son bas.
4. Bloc Inoko : test 1, avec sa transition vers la section 5.
5. « Où en est votre boutique ? » : test 1.
6. Avis : test 2, filtrés par `publishedReviews` (voir « Avis clients »).
7. Comment on travaille : test 1 (rapport mensuel sans aucun chiffre).
8. Démarrer : test 1 (Renoir, Le Déjeuner au restaurant Fournaise).
9. FAQ : test 2. Le JSON-LD FAQPage reprend mot pour mot le texte affiché.
10. Aperçu du blog « à la une » : test 1, liens vers des articles existants. Avec un seul article : affiché seul, en grand, sans colonne vide.
11. Footer : test 2.

## Règles techniques (reprises de l'ancien CLAUDE.md)

### Animations — GSAP
- prefers-reduced-motion respecté partout (état final immédiat).
- Jamais `autoAlpha` : il passe `visibility: hidden`, ce qui retire un élément de l'ordre de tabulation et lui fait perdre le focus. Animer `opacity` (et gérer `visibility`/`inert` à part si nécessaire).
- État initial posé en JS avec `gsap.set`, jamais en CSS : aucun contenu parqué à opacity 0 si le JS ne charge pas.
- Toujours `gsap.context(() => {})` (et son `revert()` au démontage). `gsap.context()` sans fonction ne crée PAS de contexte utilisable : il retourne le contexte ambiant, souvent undefined. Pour ajouter des tweens après coup depuis un gestionnaire d'évènement : `ctx.add(...)`.
- Rien d'animé sur l'élément LCP.
- Durées et easings : ceux du test 2 (choix validé).

### Mise en page
- Aucun `100vw` dans les calculs de largeur : 100vw inclut la barre de défilement et déborde de sa largeur sur Windows et Firefox. Calculer en % du conteneur. Pour un fond plein écran posé en dur : `box-shadow: 0 0 0 100vmax var(--token); clip-path: inset(0 -100vmax);`.
- Hauteur d'écran : `100svh`, jamais `100vh` (qui inclut la barre d'adresse mobile).
- Grilles : `repeat(n, minmax(0, 1fr))`, jamais `repeat(n, 1fr)` seul — un texte en `white-space: nowrap` donne sinon à chaque piste un minimum égal à sa largeur de contenu (débordement horizontal mesuré à 390 px, pistes inégales).
- Une grille interne qui reprend la grille de la page garde le même nombre de colonnes et le même gap, sans padding-inline.
- `position: sticky` : aucun ancêtre ne doit porter `overflow: hidden/auto/clip` ni `contain` — un seul suffit à désactiver sticky, silencieusement. Un élément sticky dans une grille a besoin de `align-self: start`.
- `scroll-margin-top` sur toute ancre interne, sinon la section visée atterrit sous la nav fixe.
- Fond posé sur `html` ET sur `body`, sinon le rebond de scroll (Mac et iOS) montre du blanc.
- Champs de formulaire : 16 px minimum sur mobile (sinon Safari iOS zoome). Cible tactile : 44×44 px minimum.
- `text-wrap: balance` sur les titres uniquement.

### Titres avec retour à la ligne explicite
Un titre découpé en lignes par `<br/>` (ou par des `<span>` en bloc) garde une espace avant la coupure (`{" "}` avant le `<br/>`) : le texte se lit « vous aider », jamais « vousaider », pour Google et les lecteurs d'écran. Un seul `<h1>` par page ; si le titre est découpé pour l'animation, les `<span>` restent à l'intérieur du h1.

### Liens internes
Tous les liens internes s'écrivent en relatif (le site EST venturia.fr), sans barre finale : `/services/automations`, pas `/services/automations/` — Next.js redirige en 308 une URL avec barre finale, le canonical est sans barre. L'adresse `/services/automations` est indexée par Google : ne jamais la changer.

### Images (next/image)
- width/height explicites, ou `fill` + conteneur en position relative.
- `sizes` dès qu'une image ne fait pas la pleine largeur ; `priority` sur la seule image du hero.
- `alt` en français décrivant ce que montre l'image ; `alt=""` si décoratif.
- Radius sur le conteneur (overflow hidden), pas sur l'image.

### Vérification avant de rendre la main
Capturer la page avec Playwright (build de prod) en 390 px et en 1440 px, puis ouvrir les captures et les regarder. Ne pas déclarer une page correcte sans l'avoir vue. Contrôles :
1. pas de scroll horizontal : `document.documentElement.scrollWidth === document.documentElement.clientWidth` ;
2. un seul H1 ; 0 erreur console ;
3. un titre calibré sur sa largeur se mesure ligne par ligne (`Range.getBoundingClientRect()` sur le nœud texte), jamais avec `h1.getBoundingClientRect()` — l'élément garde la largeur de son conteneur même quand le texte déborde ;
4. une custom property écrite par un `useEffect` se lit au moins 300 ms après le chargement ;
5. `npm run lint` : 0 erreur ; `npm run build` : réussit.
Puis navigation complète au clavier, du premier lien au dernier.

## Outils Claude Code — task-observer

Skills installés : `.claude/skills/` (provenance et commits : `.claude/skills/SOURCES.md`).
Fin de session : `/fin` (`.claude/commands/fin.md`).

CHEMIN À CHANGER quand le repo quittera le Bureau : le bloc ci-dessous fige
le dossier de task-observer sur le chemin absolu du dépôt principal
(`/Users/franckperrin/Desktop/Venturia/venturia-site`). Au déménagement,
remplacer ce chemin partout dans le bloc (et `/Users/franckperrin/Desktop/Venturia`
pour la racine des projets), puis déplacer `skill-observations/` et
`skill-updates/` avec le repo. Les worktrees (`~/Dev/venturia-ab-*`)
écrivent aussi ici, jamais dans leur propre dossier.

```text
(task-observer activation block — template of v3.8.0)
Before the first tool call of any session — and before writing or
proposing a plan, not merely before executing one — invoke the
task-observer skill AND execute its Session Start Protocol (storage
check, frontmatter scan, review trigger). Loading the skill and running
the protocol are separate steps; a session that loads the file and stops
has activated nothing. Any turn that will involve a tool call counts; do
not classify the session as "too simple" from its opening message.
A step you did not run is reported before the answer, in one line — never
after it, where it reads as a suggestion. If the skill does not resolve on
this turn, say which probe told you so (the skill listing, or the skill
directory on disk), re-check the listing on every later turn that makes a
tool call, and run the protocol the first time it resolves — a "not
installed" verdict holds for one turn.

Select skills on the DECISION the request is about, not on the artefact it
arrived as. Name what the user is deciding, then match the installed skill
descriptions against that — a request handed over as a file to review
still needs the skill whose description names its subject.

After completing each task, list the observation records written this
session in the same turn and report a one-line summary from that listing
(ids and titles, or "none logged and why") — never from memory of
writing them. This is the activation backstop: it forces a look at the log,
so a session that silently skipped the protocol is discovered at the
first task boundary instead of never.

Loading a skill is not complete until you have queried the observation
log for OPEN observations naming it and read their bodies:
  find "/Users/franckperrin/Desktop/Venturia/venturia-site/skill-observations/observation-log" -maxdepth 1 \
    -name '*.md' -exec grep -l -E "^(skill|target_file):.*<skill-name>" {} +
(<skill-name> is the bare name: drop a plugin: prefix, up to the last
colon. A qualified pattern misses every entry filed under the bare name
and reports a clean zero; the bare one matches both spellings. For an
agent definition or instructions file it is the file name, which the
target_file: field carries by any path.)
(Use find, not a bare *.md glob: under zsh an unmatched glob aborts the
whole block, and on an empty log it is unmatched in every session.)
Apply their insights to the current work — meaning: let them change what
you do in THIS task. Editing the skill file, or writing the rule into any
other file a later session reads, is acting on the observation and waits
for the review. See "Log, don't act" in SKILL.md: the test is whether the
action leaves a durable change outside the observation log. Run this at every skill load, however many skills load
in one session. The session-start scan does not cover it: that is a
frontmatter sweep over every observation at session start, this is a
body-level lookup for one skill at the moment its rules are applied.

The converse holds too: the grep, and any checkpoint line recording the
load, run only in the same batch as the Skill invocation, and take the
skill name from a load that has actually happened — never from a list of
skills you built to load. A checkpoint line written without the load is a
false record. Before writing to any file a skill reads at run time (a
state file), load that skill: a state file that describes itself is not a
substitute for the skill that owns it.

Where scripts run, the lookup and its checkpoint line are one command:
  bash "/Users/franckperrin/Desktop/Venturia/venturia-site/.claude/skills/task-observer/scripts/skill-load.sh" "/Users/franckperrin/Desktop/Venturia/venturia-site" <skill-name>
The Skill invocation and that call are ONE batch — emit them together,
one call per skill loaded, never the call in a later batch. On a first
run the log does not exist yet (step 1 creates it): the call says so and
exits 0 with no checkpoint line; re-run it once per skill loaded in that
batch after the Workspace creation command.

The task-observer workspace for this project is:
  /Users/franckperrin/Desktop/Venturia/venturia-site
It does not exist until the first session creates it: a failed probe whose
parent resolves and is writable is a first run — run Workspace creation,
then re-run the lookup above once per skill loaded in that batch (on the
first batch it finds no log and writes no checkpoint line; that is expected).
Every path the skill uses derives from that root and nothing else:
  /Users/franckperrin/Desktop/Venturia/venturia-site/skill-observations/observation-log/   (the log)
  /Users/franckperrin/Desktop/Venturia/venturia-site/skill-observations/cross-cutting-principles.md
  /Users/franckperrin/Desktop/Venturia/venturia-site/skill-updates/                        (staging root)
  /Users/franckperrin/Desktop/Venturia/venturia-site/skill-updates/PENDING.md              (staging manifest)
Never resolve any of them from the current working
directory — a cwd inside an ephemeral checkout (a git worktree, a temporary
clone) is torn down and takes the log with it. Never place the workspace
inside a skills-discovery directory or any path linked into one. If this
environment mints a separate project identity per checkout, or more than
one agent works this project, the pinned path above is the single shared
location; do not derive one per session, tool or project.

The user's repositories live under:
  /Users/franckperrin/Desktop/Venturia
(the root the sibling check sweeps before declaring a skill absent;
observation-log.md, "Skill families and the sibling check").

A subagent dispatched by a session that already runs this protocol does
not run it again and does not write to the log. The controller observes,
because only it sees the whole task and its review; a subagent that
notices something worth logging says so in its final report, and the
controller writes it, running the id snippet per write. A start-up rule
in a project file reaches every agent the project ever dispatches.
Before briefing a delegate under an agent definition or instructions
file, run the lookup for that file's name; its open entries shape the
brief.

A run of this block that cannot write here or get an approval answered —
a child run with no protocol-running caller, a job with a narrow tool
allowlist, a scheduled task in default permission mode — skips the write
steps, never stalls on them, and ends its final message with a
`## Task-observer notes` section (environments.md, "Sessions whose
output channel is owned by a caller"). Such runs write their output to:
  none

An observation file comes into being only through
  bash "/Users/franckperrin/Desktop/Venturia/venturia-site/.claude/skills/task-observer/scripts/new-observation.sh" <slug> "/Users/franckperrin/Desktop/Venturia/venturia-site"
which prints the path to write into. Never by copying another file's
header or counting a listing — including on the turn after a
compaction, when the skill body is out of context.
```
