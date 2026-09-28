"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { railCards, type RailCardContent } from "@/content/rail";
import { onHeroTitleDone } from "@/lib/heroTitleSignal";
import { useSectionTone, type Tone } from "@/lib/tone";
import { useStickOnce } from "@/lib/useStickOnce";
import { IconArrowRight, IconClock, IconSparkle, type RailIconComponent, type RailIconHandle } from "./RailIcons";
import styles from "./rail.module.css";

// Une icône par carton, dans l'ordre de content/rail.ts (CLAUDE.md,
// « Rail droit ») : horloge, étoile à quatre branches, flèche.
const RAIL_ICONS = [IconClock, IconSparkle, IconArrowRight] as const;

/**
 * Ce que le rail (desktop ET pile mobile) a besoin de connaître pour
 * s'ancrer à une page — tout le reste (sticky, mode relais, hystérésis,
 * timing des icônes) est un moteur partagé, indépendant du contenu, qui
 * ne change jamais d'une page à l'autre. Un `RailConfig` par page ; la
 * home garde `HOME_RAIL_CONFIG` (construit à partir des mêmes constantes
 * qu'avant cette extraction — aucune valeur ne change), passé comme
 * défaut de `config` sur <RailSlot>/<RailController>/<MobileRailStack>
 * pour que page.tsx (home) n'ait rien à changer.
 */
export type RailConfig = {
  cards: readonly [RailCardContent, RailCardContent, RailCardContent];
  icons: readonly [RailIconComponent, RailIconComponent, RailIconComponent];
  offsetTargets: readonly [OffsetTarget, OffsetTarget, OffsetTarget];
  /** ids de section pour l'hystérésis de la pile MOBILE (un par carton,
   *  MobileRailStack.tsx) — distincts de `offsetTargets[i].sectionId` :
   *  sur la home, le carton 3 s'ancre (desktop) à « services » mais ne
   *  révèle (mobile) qu'à l'entrée de « processus », une section plus
   *  loin (CLAUDE.md, « Rail droit » § « Pile mobile »). */
  mobileReveal: readonly [string, string, string];
};

// Classe de padding-top par carton (rail.module.css) : chacun lit sa
// propre variable d'écart mesuré (--rail-card1/2/3-offset), voir
// OFFSET_TARGETS et l'effet plus bas.
const SLOT_OFFSET_CLASS = [styles.slot1, styles.slot2, styles.slot3] as const;

/**
 * Point de départ (avant figement) des 3 cartons — UNE seule mécanique,
 * MESURÉE en JS, jamais une valeur fixe (CLAUDE.md, « Rail droit ») :
 * l'écart entre le haut de la section de rattachement du carton
 * (`sectionId`, celle visée par son `anchor`) et le bord de sa cible
 * d'alignement (`selector` — haut par défaut, bas si `edge: "bottom"`)
 * est réécrit dans `varName` (globals.css, repli 20px sans JS chacune).
 *
 *   1. Dernier accompagnement : haut du carton = haut du TITRE de la
 *      section (`#dernier-accompagnement-title`) — pas la photo (le
 *      titre précède tout le contenu variable de la section, la photo
 *      n'est plus la cible).
 *   2. Services : haut du carton = haut du trait (border-top) du 1ᵉʳ
 *      service, « Référencement » (`[data-service-row-first]`,
 *      services.module.css `.row`).
 *   3. Services (même section que le carton 2, la cible visée y vit —
 *      section d'ancrage retenue pour ce carton) : haut du carton = BAS
 *      du bloc du dernier service, « Automatisation »
 *      (`[data-service-row-last]`, le `.row` entier — paragraphes et
 *      lien « Découvrir l'automatisation » compris, jusqu'au bas de son
 *      propre padding).
 */
export type OffsetTarget = {
  varName: string;
  sectionId: string;
  selector: string;
  edge: "top" | "bottom";
};

const OFFSET_TARGETS: readonly [OffsetTarget, OffsetTarget, OffsetTarget] = [
  { varName: "--rail-card1-offset", sectionId: "dernier-accompagnement", selector: "#dernier-accompagnement-title", edge: "top" },
  { varName: "--rail-card2-offset", sectionId: "services", selector: "[data-service-row-first]", edge: "top" },
  { varName: "--rail-card3-offset", sectionId: "services", selector: "[data-service-row-last]", edge: "bottom" },
];

/** Config par défaut = comportement exact d'avant cette extraction :
 *  mêmes cartons (content/rail.ts), mêmes icônes, mêmes cibles de
 *  repos, mêmes sections de révélation mobile (voir RailConfig
 *  ci-dessus) — page.tsx (home) ne passe aucun `config` et retombe donc
 *  ici. */
export const HOME_RAIL_CONFIG: RailConfig = {
  cards: railCards,
  icons: RAIL_ICONS,
  offsetTargets: OFFSET_TARGETS,
  mobileReveal: ["dernier-accompagnement", "services", "processus"],
};

/** Position document (cumulée le long de la chaîne `offsetParent`),
 *  JAMAIS `getBoundingClientRect()` : ce dernier inclut le `transform`
 *  d'une révélation d'entrée GSAP encore en cours (photo, lignes de
 *  service) si mesuré avant que l'utilisateur n'ait scrollé jusque-là,
 *  donnant une position transitoire au lieu de la position de repos —
 *  `offsetTop` ignore toujours `transform`, quel que soit l'état de la
 *  révélation au moment de la mesure (CLAUDE.md, « Rail droit »). */
function documentTop(el: HTMLElement | null): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

type RailSlotProps = {
  /** Index du carton dans `config.cards` (0, 1 ou 2). */
  cardIndex: 0 | 1 | 2;
  /** `name` de la <Section> déclencheuse (voir Section.tsx) : le
   *  carton s'ancre à sa ligne de grille, `${anchor}-start / -1`. */
  anchor: string;
  /** Cartons/icônes/cibles de repos propres à la page — défaut =
   *  HOME_RAIL_CONFIG (comportement de la home, inchangé). Voir
   *  `RailConfig` plus haut. */
  config?: RailConfig;
};

/**
 * Un carton du rail = un <RailSlot>, rendu comme frère direct de sa
 * <Section> déclencheuse dans page.tsx (pas un <aside> unique regroupé
 * en fin de page) :
 *
 * - Desktop : chaque slot est un item de la grille du Shell, ancré à
 *   `${anchor}-start / -1` — la ligne nommée déjà posée par sa
 *   <Section>, jusqu'à la toute dernière ligne de la grille. C'est le
 *   partage de cette ligne (pas une mesure JS) qui aligne le carton
 *   avec sa section ; « / -1 » systématique (jamais raccourci pour les
 *   cartons suivants) fait tenir l'empilement PERMANENT — un slot qui
 *   s'arrêterait à la fin de sa section ferait repartir le carton
 *   (un relais, pas un empilement, voir CLAUDE.md « Rail droit »). Les
 *   trois cartons partagent ce même mécanisme de ligne de grille, carton
 *   1 compris (`anchor="dernier-accompagnement"`, page.tsx) : sa ligne
 *   ne démarre qu'au haut de la section Inoko, donc rien n'est ni rendu
 *   ni peint dans les lignes du Hero qui précèdent — aucun carton
 *   visible pendant le Hero est une pure conséquence de la grille, plus
 *   une opacité pilotée en JS (CLAUDE.md, « Rail droit »). Les cartons 2
 *   et 3 partagent la MÊME section de rattachement (`anchor="services"`)
 *   — la cible du carton 3 (bas du dernier service) y vit aussi, voir
 *   OFFSET_TARGETS plus haut. Seule différence restante entre le carton
 *   1 et les deux autres, volontaire : son `top` sticky
 *   (`var(--rail-stick)`, 64px, la hauteur de la nav, directement — pas
 *   un calc() dérivé des cartons précédents, stickyWrap1 plus bas). Son
 *   POINT DE DÉPART (avant figement), lui, suit désormais la MÊME
 *   mécanique mesurée que les cartons 2 et 3 (`.slot1`/`.slot2`/`.slot3`
 *   plutôt que la gouttière générique de `.slot` — voir OFFSET_TARGETS
 *   et l'effet dédié plus bas).
 * - Mobile (< 1024px) : ce carton sort du flux (`.slot` passe à
 *   `display: none`, voir rail.module.css) — remplacé par la pile
 *   fixée en bas de l'écran (components/layout/MobileRailStack.tsx),
 *   qui lit le même content/rail.ts. `measureRef` continue d'exister
 *   ici (sonde de tonalité inoffensive, useStickOnce se désactive
 *   lui-même sous 1024px) mais ne rend plus rien visuellement.
 *
 * Seules les HAUTEURS des cartons 1 et 2 sont mesurées (elles varient
 * avec leur texte, jamais leur position) : écrites dans --rail-h1 et
 * --rail-h2 sur :root au montage et au resize (ResizeObserver), lues
 * par les calc() de rail.module.css. Repli sans JS dans globals.css.
 *
 * Tonalité (CLAUDE.md, « Tonalités ») : `measureRef` (le wrapper sticky,
 * dont la boîte visuelle épouse exactement celle du carton) sert aussi
 * de sonde au moteur partagé (src/lib/tone.ts) — la tonalité de la
 * section sous le centre vertical du carton, propre à CE carton,
 * indépendante de la nav et des deux autres.
 *
 * Animation de l'icône (desktop uniquement, CLAUDE.md « Rail droit ») :
 * `measureRef` sert aussi de repère à `useStickOnce` (cartons 2 et 3,
 * mesure directe du figement — voir ce hook) ; le carton 1 démarre sur
 * `onHeroTitleDone`, le signal de fin d'animation du h1 du Hero. Les
 * trois se rejoignent sur `iconRef.current?.play()` (RailIcons.tsx).
 */
export function RailSlot({ cardIndex, anchor, config = HOME_RAIL_CONFIG }: RailSlotProps) {
  const card = config.cards[cardIndex];
  const measureRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<RailIconHandle>(null);
  const tone = useSectionTone(measureRef);

  // Carton 1 : l'horloge démarre juste après la fin de l'animation du
  // h1 du Hero (jamais un délai estimé), en desktop et hors
  // prefers-reduced-motion — vérifiés ici même : si le h1 ne s'anime
  // pas, HeroReveal n'appelle jamais markHeroTitleDone et ce callback
  // n'est jamais invoqué de toute façon.
  useEffect(() => {
    if (cardIndex !== 0) return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) return;
    return onHeroTitleDone(() => {
      iconRef.current?.play();
    });
  }, [cardIndex]);

  // Cartons 2 et 3 : l'icône démarre au moment exact où le carton se
  // fige (mesure directe, jamais ScrollTrigger — voir useStickOnce.ts).
  useStickOnce(
    measureRef,
    () => {
      iconRef.current?.play();
    },
    cardIndex === 1 || cardIndex === 2,
  );

  useEffect(() => {
    // Le 3ᵉ carton n'a personne après lui à positionner : rien à mesurer.
    if (cardIndex === 2) return;
    const el = measureRef.current;
    if (!el) return;

    const varName = cardIndex === 0 ? "--rail-h1" : "--rail-h2";
    const update = () => {
      document.documentElement.style.setProperty(varName, `${el.offsetHeight}px`);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cardIndex]);

  // Point de départ (avant figement) — UNE seule mécanique pour les 3
  // cartons (voir OFFSET_TARGETS/documentTop plus haut, CLAUDE.md « Rail
  // droit ») : l'écart entre le haut de la section de rattachement et le
  // bord (haut, ou bas pour le carton 3) de la cible propre à ce carton,
  // réécrit dans sa variable CSS et lu par `.slot1`/`.slot2`/`.slot3`
  // (rail.module.css) EN PLACE de l'ancienne gouttière générique
  // (`padding-top: var(--shell-rail-pad)`, retirée de `.slot`). Le
  // figement lui-même (stickyWrap1/2/3, `top: var(--rail-stick…)`) reste
  // inchangé — ce padding ne fait que retarder l'instant où le sticky
  // s'accroche, pas la position une fois accroché.
  //
  // Piège rencontré et corrigé (S16) : `getBoundingClientRect()` sur une
  // cible ne donne pas sa position de repos tant que sa révélation
  // d'entrée GSAP (photo Inoko, lignes de Services) n'a pas joué —
  // mesurée trop tôt (avant que l'utilisateur n'ait scrollé jusque-là),
  // la cible est encore visuellement décalée par ce transform, faussant
  // l'écart mesuré jusqu'à ce que la page recharge. `offsetTop`,
  // contrairement à `getBoundingClientRect()`, ignore TOUJOURS
  // `transform` — quel que soit l'état de la révélation au moment de la
  // mesure, cette valeur reste celle de la position de repos, sans
  // dépendre d'un ordre de montage entre composants ni d'un signal de
  // fin d'animation.
  //
  // Recalcul garanti à trois moments, en plus du montage :
  // - redimensionnement de la fenêtre : l'écart dépend de la hauteur du
  //   contenu qui précède la cible (texte, donc variable avec la largeur
  //   de la colonne de contenu) — un ResizeObserver sur la SECTION (pas
  //   la cible elle-même, qui ne bouge jamais toute seule) suffirait déjà
  //   à le capter indirectement (le reflow du texte change la hauteur
  //   totale de la section), mais un écouteur `resize` direct est ajouté
  //   par prudence/clarté, au cas où un redimensionnement change la
  //   largeur sans changer la hauteur totale de la section (aucun reflow
  //   de ligne, donc aucun déclenchement du ResizeObserver) — vérifié par
  //   mesure : écart < 1px après un redimensionnement 1440 → 1024 → 1728
  //   sans recharger la page.
  // - chargement des polices (`document.fonts.ready`) : next/font charge
  //   Bricolage Grotesque/Instrument Sans en `display: "swap"`
  //   (layout.tsx) — un premier rendu peut utiliser la police de repli
  //   avant que la vraie police ne s'échange, avec des métriques
  //   différentes (largeur de caractère, interligne) qui déplacent la
  //   cible. Le ResizeObserver capterait aussi ce cas SI l'échange change
  //   la hauteur totale de la section, mais ne pas en dépendre : recalcul
  //   explicite une fois `document.fonts.ready` résolu.
  // - ResizeObserver sur la section de rattachement elle-même (voir
  //   ci-dessus) : un changement de hauteur d'un élément AU-DESSUS de la
  //   cible (texte variable) change la hauteur de la section, donc
  //   l'écart mesuré.
  useEffect(() => {
    const target = config.offsetTargets[cardIndex];
    const section = document.getElementById(target.sectionId);
    const el = document.querySelector<HTMLElement>(target.selector);
    if (!section || !el) return;

    const update = () => {
      const targetTop = documentTop(el) + (target.edge === "bottom" ? el.offsetHeight : 0);
      const offset = targetTop - documentTop(section);
      document.documentElement.style.setProperty(target.varName, `${offset}px`);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(section);
    window.addEventListener("resize", update, { passive: true });

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) update();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [cardIndex, config]);

  const slotClassName = [styles.slot, SLOT_OFFSET_CLASS[cardIndex]].join(" ");

  const stickyClassName = [
    styles.stickyWrap,
    cardIndex === 0 ? styles.stickyWrap1 : "",
    cardIndex === 1 ? styles.stickyWrap2 : "",
    cardIndex === 2 ? styles.stickyWrap3 : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={slotClassName} data-rail-slot style={{ gridRow: `${anchor}-start / -1` }}>
      <div ref={measureRef} className={stickyClassName}>
        <RailCardArticle
          card={card}
          action={cardIndex === 2}
          Icon={config.icons[cardIndex]}
          iconRef={iconRef}
          tone={tone}
        />
      </div>
    </div>
  );
}

/**
 * Mode du rail desktop — « empilement » (défaut) ou « relais » — décidé
 * en JS selon que les 3 cartons FIGÉS tiennent ou non dans la hauteur de
 * la fenêtre (CLAUDE.md, « Rail droit » § « Mode relais ») :
 *
 *   empilement  var(--rail-stick) + hauteurs RÉELLES des 3 cartons + 2
 *               gouttières de 20px (entre cartons figés) + 20px de marge
 *               basse <= innerHeight → comportement actuel, inchangé :
 *               les 3 cartons restent visibles, figés, empilés jusqu'au
 *               bas de la page (aucun ne repart jamais).
 *   relais      sinon (ex. 1024×768, 1366×657) : chaque carton qui a un
 *               « suivant » (1 et 2) se fige à var(--rail-stick) — la
 *               MÊME valeur pour les 3, plus de décalage empilé — puis
 *               REPART vers le haut dès que le suivant arrive, sans
 *               jamais rester figés tous les deux en même temps ni se
 *               chevaucher (voir le raisonnement géométrique plus bas).
 *
 * Implémentation retenue, la plus simple des deux envisagées avec
 * Franck : PAS de nouvelle ligne de grille nommée par carton suivant —
 * les cartons 2 et 3 partagent déjà la même section de rattachement
 * (« services »), donc la même ligne de grille : une ligne par
 * « carton suivant » ne pourrait pas les distinguer. À la place, chaque
 * carton qui a un suivant (1 et 2) reçoit, en mode relais, une hauteur
 * EXPLICITE sur son `.slot` (`height`, `align-self: start` au lieu de
 * `stretch` — rail.module.css) calculée pour que le BAS de son
 * conteneur tombe pile sur la position de repos (avant figement, donc
 * AU REPOS) du carton SUIVANT. Cette coïncidence géométrique garantit,
 * PAR CONSTRUCTION (position: sticky ne dépasse jamais son conteneur) :
 *   - tant que le carton suivant n'a pas atteint sa propre position de
 *     repos, le carton courant reste figé à var(--rail-stick) (son
 *     conteneur a encore de la marge en dessous) ;
 *   - une fois cette position atteinte, le carton courant est repoussé
 *     vers le haut par la contrainte de conteneur, à la même vitesse que
 *     le défilement — il quitte l'écran par le haut PENDANT que le
 *     carton suivant (pas encore figé) continue de monter depuis plus
 *     bas ; le bas du premier coïncide exactement avec le haut du second
 *     à tout instant de cette phase (les deux document-tops sont
 *     égaux par construction) : jamais de chevauchement, jamais les deux
 *     figés en même temps.
 * Le carton 3 n'a personne après lui : son `.slot` garde
 * `align-self: stretch` jusqu'à la fin de la grille dans les DEUX modes
 * (rien à limiter — CLAUDE.md) ; seul son `top` sticky change en mode
 * relais (var(--rail-stick), comme les 2 autres, au lieu du calc()
 * empilé — voir rail.module.css) : une fois figé, il reste visible
 * jusqu'au bas de la page, exactement comme en mode empilement.
 *
 * Un seul composant, monté une fois (pas un par carton, contrairement à
 * <RailSlot>) : la décision de bascule ET les hauteurs de relais ont
 * besoin de connaître les 3 cartons à la fois (leurs hauteurs réelles,
 * et la position de repos du carton SUIVANT pour chacun) — une mesure
 * par instance de <RailSlot> ne pourrait pas partager ce résultat.
 * Les alignements de repos (0px, `--rail-card1/2/3-offset`) ne changent
 * pas : ce composant ne touche à rien de ce que <RailSlot> calcule déjà.
 */
export function RailController({ config = HOME_RAIL_CONFIG }: { config?: RailConfig } = {}) {
  useEffect(() => {
    const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

    // Position document (repos, avant figement) du carton `index` — le
    // même calcul que config.offsetTargets/l'effet de <RailSlot>, mais
    // ici en position ABSOLUE (pas relative à la section) : c'est
    // exactement le point où le carton SUIVANT doit être rejoint en mode
    // relais.
    const restDocTop = (index: number): number | null => {
      const target = config.offsetTargets[index];
      const el = document.querySelector<HTMLElement>(target.selector);
      if (!el) return null;
      return documentTop(el) + (target.edge === "bottom" ? el.offsetHeight : 0);
    };

    const sectionTop = (index: number): number | null => {
      const section = document.getElementById(config.offsetTargets[index].sectionId);
      return section ? documentTop(section) : null;
    };

    const update = () => {
      // La pile mobile ne change pas : ce mécanisme est desktop
      // uniquement (comme le rail lui-même, display:none sous 1024px).
      if (!isDesktop()) return;

      const slots = Array.from(document.querySelectorAll<HTMLElement>("[data-rail-slot]"));
      if (slots.length !== 3) return;
      const cards = slots.map((slot) => slot.firstElementChild as HTMLElement | null);
      if (cards.some((c) => !c)) return;
      const heights = cards.map((c) => c!.offsetHeight);

      const rests = [0, 1, 2].map(restDocTop);
      if (rests.some((r) => r === null)) return;
      const restsPx = rests as number[];

      const railStick =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--rail-stick")) || 64;

      // Condition de bascule (donnée par Franck) : les 3 cartons figés
      // (hauteurs réelles, pas --rail-h1/--rail-h2 qui n'existent que
      // pour 1 et 2) + 2 gouttières de 20px entre eux + 20px de marge
      // basse doivent tenir sous la hauteur de la fenêtre.
      const neededHeight = railStick + heights[0] + heights[1] + heights[2] + 20 + 20 + 20;
      const fits = neededHeight <= window.innerHeight;
      document.documentElement.setAttribute("data-rail-mode", fits ? "stack" : "relay");

      // Hauteurs de conteneur en mode relais (carton 1 → 2, carton 2 →
      // 3 — voir le commentaire au-dessus du composant). Calculées dans
      // tous les cas (mode empilement compris) : les règles CSS qui les
      // lisent sont scopées à [data-rail-mode="relay"], donc sans effet
      // hors de ce mode — mais jamais une variable non résolue au moment
      // exact de la bascule.
      for (const i of [0, 1] as const) {
        const base = sectionTop(i);
        if (base === null) continue;
        const relayHeight = Math.max(0, restsPx[i + 1] - base);
        document.documentElement.style.setProperty(`--rail-card${i + 1}-relay-height`, `${relayHeight}px`);
      }
    };

    update();

    // Mêmes déclencheurs que les décalages de repos (voir l'effet de
    // <RailSlot>) : montage, redimensionnement, fonts.ready, et un
    // ResizeObserver — ici sur les 2 sections cibles ET les 3 cartons
    // eux-mêmes (leurs hauteurs réelles entrent dans la condition de
    // bascule, contrairement aux décalages de repos).
    const observedSections = new Set<Element>();
    for (const target of config.offsetTargets) {
      const section = document.getElementById(target.sectionId);
      if (section) observedSections.add(section);
    }
    for (const slot of document.querySelectorAll("[data-rail-slot]")) {
      if (slot.firstElementChild) observedSections.add(slot.firstElementChild);
    }
    const observer = new ResizeObserver(update);
    observedSections.forEach((el) => observer.observe(el));

    window.addEventListener("resize", update, { passive: true });

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) update();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [config]);

  return null;
}

function RailCardArticle({
  card,
  action,
  Icon,
  iconRef,
  tone,
}: {
  card: RailCardContent;
  action: boolean;
  Icon: RailIconComponent;
  iconRef: RefObject<RailIconHandle | null>;
  tone: Tone;
}) {
  const className = [styles.card, action ? styles.cardAction : ""].filter(Boolean).join(" ");
  const content = (
    <>
      <span className={styles.cardIcon}>
        <Icon ref={iconRef} className={styles.cardIconSvg} />
      </span>
      <p className={styles.cardTitle}>{card.title}</p>
      <p className={styles.cardText}>{card.text}</p>
    </>
  );

  // Carton 3 (action) uniquement : la flèche se rejoue à chaque survol
  // et à chaque focus clavier (focus-visible seulement — pas un focus
  // souris), en plus de son déclenchement au figement (useStickOnce,
  // ci-dessus). Le drapeau anti-empilement vit dans IconArrowRight :
  // ces déclenchements peuvent arriver sans risque pendant une
  // animation en cours. Desktop + hors prefers-reduced-motion vérifiés
  // ici, à chaque appel (léger, jamais dans une boucle de scroll).
  const triggerHover = !action
    ? undefined
    : () => {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isDesktop && !reduced) iconRef.current?.play();
      };
  const triggerFocusVisible = !action
    ? undefined
    : (event: React.FocusEvent<HTMLElement>) => {
        if (event.currentTarget.matches(":focus-visible")) triggerHover?.();
      };

  if (card.href) {
    return (
      <Link
        href={card.href}
        className={className}
        data-rail-card
        data-tone={tone}
        onMouseEnter={triggerHover}
        onFocus={triggerFocusVisible}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={className}
      data-rail-card
      data-tone={tone}
      onMouseEnter={triggerHover}
      onFocus={triggerFocusVisible}
    >
      {content}
    </article>
  );
}
