# Refonte du site Venturia — document de cadrage

Dernière mise à jour : 8 septembre 2026. Source de vérité pour **le contenu et
l'architecture** de la refonte de venturia.fr.

> **Répartition des rôles.** Ce document porte l'architecture des pages, le plan de
> la home, le contenu disponible et les références. Tout le système visuel — palette,
> typographie, grille, espacements, rail, méga-menu, animations — vit dans le
> `CLAUDE.md` à la racine du repo (copie dans le projet :
> `claude/CLAUDE-md-site-venturia.md`). En cas de désaccord entre les deux fichiers,
> **le CLAUDE.md fait foi**. Ne pas redupliquer de valeurs visuelles ici.

---

## 1. Identité visuelle

Trois couleurs, reprises de springsummer.dk :

```
--ground:  #DEDCD3   crème
--ink:     #0A0605   charbon
--accent:  #FE3939   rouge
```

Palette fermée, aucun gris. **Aucune restriction d'usage** : chacune peut porter du
fond comme du texte. Par défaut, fond crème et texte charbon, ou l'inverse. Le rouge
s'emploie librement, Franck arbitre le contraste au cas par cas.

Typographies : **Bricolage Grotesque** (titres), **Instrument Sans** (corps),
**JetBrains Mono** (labels et méta). Chargement via `next/font/google`.

Les valeurs exactes — tailles, interlignages, approches, échelle d'espacement,
largeur de conteneur — sont dans le CLAUDE.md et nulle part ailleurs.

---

## 2. Architecture

```
/                                    home — l'expérience
/services/referencement              pilier : être trouvé sur Google ET dans les IA
/services/referencement/seo          requêtes, contenu, technique, local
/services/referencement/geo          être cité par ChatGPT, Perplexity, AI Overviews
/services/google-ads                 à part : c'est du payant
/services/site-internet
/services/automatisation-n8n
/services/branding-storytelling
/secteurs/artisans
/secteurs/e-commerce
/secteurs/prestataires-de-services
/secteurs/tpe-pme
/realisations                        index
/realisations/inoko
/realisations/rdi-electricite
/realisations/office-des-mots
/pourquoi-venturia
/ressources + /ressources/<article>
/contact
/a-propos
```

**Règle de survie SEO :** si deux pages ne peuvent pas porter 800 mots vraiment
différents, elles fusionnent. Ne pas créer les pages avant d'avoir le contenu —
quatre pages denses battent douze pages creuses.

**Priorité de rédaction :** automatisation n8n (déjà en position ~14 sur « agence n8n
toulouse »), puis site internet, puis SEO.

**Géographie :** consolider Toulouse, où les seuls signaux existent. La Belgique passe
par le réseau, pas par le SEO — pour l'instant.

### Contenu du méga-menu

| Colonne 1 — Services | Colonne 2 — Secteurs | Colonne 3 |
|---|---|---|
| Référencement | E-commerce | Carte du cas client Inoko |
| Site internet | Professions artisanales | |
| Automatisation | | |

Dimensions, typographie et comportement du panneau : voir le CLAUDE.md.

---

## 3. La home, section par section

| # | Section | Forme |
|---|---|---|
| 0 | **Chargement** | Boucle vidéo courte (WebM, jamais un GIF), une fois par session |
| 1 | **Hero** | « Votre concurrent n'est pas meilleur que vous. Il est **mieux référencé**. » Sous-titre : « Un seul interlocuteur : il conçoit, il construit, et il répond. » Deux CTA + badge de disponibilité |
| 2 | **Réalisations** | 3 lignes verticales, image au survol, **le chiffre est dans la ligne** — pas de bandeau de statistiques autonome |
| 3 | **Respiration** | Deux phrases en très grand sur fond charbon, pleine largeur, sans titre ni icône |
| 4 | **Avis** | Mur de texte continu façon Elias : pâle qui s'assombrit au scroll, noms en pastilles |
| 5 | **Services** | 4 blocs alternés texte/visuel, gauche puis droite. Service · bénéfice · descriptif · lien |
| 6 | **Processus** | Timeline horizontale : ellipse fine → cercle → grande ellipse qui prend toute la largeur restante. Stratégie / Développement / Scaling |
| 7 | **Ressources** | 3 cartes façon Synqro : titre en overlay sur l'image, durée de lecture à gauche, date à droite |
| 8 | **CTA géant** | « On peut vous aider ? » en typographie XXL, façon Spring/Summer |
| 9 | **Footer** | Colonnes de liens, heure locale, badge de disponibilité |
| — | **/contact** | Split Noqode : avis qui défilent à gauche, formulaire à droite |

### Les trois cartons du rail

Chacun répond à une objection, et se fige au passage de sa section :

| Position | Contenu | Objection levée |
|---|---|---|
| Hero | Réponse sous 24 h, par moi | « il va mettre trois semaines » |
| Services | Vous restez propriétaire de tout | « je vais être prisonnier » |
| Avant le CTA | 20 minutes, gratuit | « ça va m'engager » |

Mécanique de figement : voir le CLAUDE.md, section « Rail droit ».

### Formulaire de contact

Nom · Entreprise · Email · Téléphone · **Site web actuel** (permet un mini-audit avant
l'appel) · Type d'accompagnement (ponctuel / mensuel / les deux) · Budget · Message ·
RGPD.

```
Budget estimé :
  Moins de 1 500 €
  1 500 – 3 000 €
  3 000 – 6 000 €
  Plus de 6 000 €
  Je ne sais pas encore        ← indispensable, sinon les indécis ferment l'onglet
```

---

## 4. Animations — quoi, où

| Où | Quoi | Technique |
|---|---|---|
| Chargement | Boucle + rideau qui se lève | GSAP timeline |
| Hero | Titre qui monte mot par mot | SplitText dans **un seul** `<h1>` |
| Page | Défilement lissé | Lenis |
| Réalisations | Compteurs + aperçu qui suit le curseur | ScrollTrigger |
| Avis | Phrases qui s'allument au scroll | ScrollTrigger `scrub` |
| Services | Révélation par masque angulaire, angle constant partout | `clip-path` |
| Timeline | Formes qui apparaissent de gauche à droite, la 3ᵉ s'étire | ScrollTrigger |
| Rail | Cartons qui se figent puis se relaient | `position: sticky` |
| CTA | Bouton magnétique | GSAP `quickTo` |
| Navigation | Transition de page partagée | View Transitions API |

Garde-fous (durées, easing, LCP, reduced-motion) : voir le CLAUDE.md.
GSAP est gratuit depuis 2025, tous plugins inclus.

---

## 5. Copy — le vocabulaire à éviter

Ces formules ne sont pas interdites par le CLAUDE.md (qui ne traite que le visuel),
mais elles sont à bannir à la rédaction, parce qu'elles sont le vocabulaire exact de
toutes les agences dont Venturia veut se distinguer :

« Boostez votre visibilité » · « solutions sur-mesure » · « votre partenaire de
confiance » · « à l'ère du digital » · « propulser votre business ».

À la place : des noms propres, des dates, des chiffres vérifiables, et du texte long
assumé, écrit comme Franck parle.

---

## 6. Contenu

**Disponible :**

| Client | Chiffres à afficher |
|---|---|
| Inoko | Clics organiques ×10 en 6 mois, CA ×12, ROAS Google Ads ×15, de 1 000 € à 10 000 € de CA |
| RDI Électricité | 3 demandes de devis par mois, facturation automatisée |
| Office des Mots | Site vitrine, en cours |

**Manquant — bloquant :**

1. Les verbatims d'Alexandre et d'Inoko. La section avis ne fonctionne qu'avec de
   vrais témoignages, et de faux avis sur un site commercial constituent une pratique
   commerciale trompeuse (art. L121-2 du Code de la consommation).
2. Les visuels réels : captures Semrush, écran du bot Telegram, photos des meubles
   Inoko, photo de Franck.
3. Les textes des pages services : 800 à 1 500 mots chacune.

---

## 7. Stack

```
Next.js (App Router) + Tailwind  ·  GSAP + ScrollTrigger + Lenis  ·  Vercel
Domaine et VPS IONOS  ·  Développement : Claude Code, branche refonte-2026
```

---

## 8. Références de design

| Source | Ce qui est repris |
|---|---|
| **springsummer.dk** | Palette, shell de page, rail droit et son figement, méga-menu, CTA géant |
| **kevinstruik.be** | Enchaînement des sections, navigation, animations GSAP, formulaire avec budget |
| **elias.studio** | Footer, navbar, mur d'avis, badge « disponible », heure locale |
| **noqode.fr** | Hero épuré et direct, maillage entre les pages, page contact avec avis à gauche |
| **agence-synqro.fr** | Format des cartes de ressources, timeline J+0 → J+45 |
| **elliott.mangham.dev** | Écran de chargement personnalisé |
| **beomniscient.com/why-us** | Principe d'une page « Pourquoi travailler avec moi » argumentée |
