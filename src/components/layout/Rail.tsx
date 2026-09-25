"use client";

import { useCallback, useEffect, useRef, type ComponentType, type RefAttributes, type RefObject } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { railCards, type RailCardContent } from "@/content/rail";
import { VENTURIA_EASE } from "@/lib/ease";
import { onHeroTitleDone } from "@/lib/heroTitleSignal";
import { useSectionTone, type Tone } from "@/lib/tone";
import { useSectionHysteresis, type CrossEvent } from "@/lib/useSectionHysteresis";
import { useStickOnce } from "@/lib/useStickOnce";
import { IconArrowRight, IconClock, IconSparkle, type RailIconHandle } from "./RailIcons";
import styles from "./rail.module.css";

/** Section qui déclenche l'apparition du carton 1 (CLAUDE.md, « Rail
 *  droit ») — pas `anchor` ("hero", le point de figement sticky du
 *  carton, inchangé) : le carton reste associé au hero, mais ne
 *  devient visible que quand la section Inoko entre dans l'écran. */
const CARD1_REVEAL_SECTION = "dernier-accompagnement";

// Une icône par carton, dans l'ordre de content/rail.ts (CLAUDE.md,
// « Rail droit ») : horloge, étoile à quatre branches, flèche.
const RAIL_ICONS = [IconClock, IconSparkle, IconArrowRight] as const;

type RailSlotProps = {
  /** Index du carton dans content/rail.ts (0, 1 ou 2). */
  cardIndex: 0 | 1 | 2;
  /** `name` de la <Section> déclencheuse (voir Section.tsx) : le
   *  carton s'ancre à sa ligne de grille, `${anchor}-start / -1`. */
  anchor: string;
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
 *   (un relais, pas un empilement, voir CLAUDE.md « Rail droit »).
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
export function RailSlot({ cardIndex, anchor }: RailSlotProps) {
  const card = railCards[cardIndex];
  const measureRef = useRef<HTMLDivElement>(null);
  const cardElRef = useRef<HTMLElement | null>(null);
  const revealCtxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const iconRef = useRef<RailIconHandle>(null);
  const tone = useSectionTone(measureRef);

  // Carton 1 uniquement : aucun carton visible pendant le Hero
  // (CLAUDE.md, « Rail droit ») — le carton reste figé « au niveau du
  // hero » (anchor/sticky inchangés), seule sa VISIBILITÉ suit
  // désormais la section Inoko, indépendamment du figement. État
  // initial posé en JS (gsap.set, jamais en CSS) : sans JS, le repli
  // est le CSS par défaut (visible) — CLAUDE.md, « Animations »,
  // « aucun contenu parqué à opacity 0 si le JS ne charge pas ».
  // gsap.context(() => {}) créé une seule fois au montage, puis
  // `.add()` pour chaque tween déclenché après coup par le scroll
  // (piège documenté : gsap.context() sans fonction ne crée pas de
  // contexte utilisable).
  useEffect(() => {
    if (cardIndex !== 0) return;
    const wrap = measureRef.current;
    if (!wrap) return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;
    const cardEl = wrap.querySelector<HTMLElement>("[data-rail-card]");
    if (!cardEl) return;
    cardElRef.current = cardEl;

    const ctx = gsap.context(() => {});
    revealCtxRef.current = ctx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Masqué par défaut (avant toute mesure de scroll) : le hook de
    // seuil ci-dessous (useSectionHysteresis) rétablit immédiatement la
    // visibilité, sans animation, si la page est chargée alors que la
    // section Inoko est déjà franchie (chargement en milieu de scroll).
    ctx.add(() => {
      gsap.set(cardEl, { opacity: 0, y: reduced ? 0 : 12 });
    });

    return () => {
      ctx.revert();
      revealCtxRef.current = null;
    };
  }, [cardIndex]);

  const revealCard1 = useCallback((event: CrossEvent) => {
    const cardEl = cardElRef.current;
    const ctx = revealCtxRef.current;
    if (!cardEl || !ctx) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (event.type === "enter") {
      if (reduced || event.immediate) {
        ctx.add(() => gsap.set(cardEl, { opacity: 1, y: 0 }));
        return;
      }
      ctx.add(() =>
        gsap.to(cardEl, { opacity: 1, y: 0, duration: 0.3, ease: VENTURIA_EASE, overwrite: true }),
      );
      return;
    }

    // event.type === "exit" — retour au Hero en remontant : le carton
    // disparaît (CLAUDE.md, « Rail droit »).
    if (reduced) {
      ctx.add(() => gsap.set(cardEl, { opacity: 0, y: 0 }));
      return;
    }
    ctx.add(() =>
      gsap.to(cardEl, { opacity: 0, y: 12, duration: 0.3, ease: VENTURIA_EASE, overwrite: true }),
    );
  }, []);

  useSectionHysteresis(CARD1_REVEAL_SECTION, revealCard1, cardIndex === 0, () => false);

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

  const stickyClassName = [
    styles.stickyWrap,
    cardIndex === 0 ? styles.stickyWrap1 : "",
    cardIndex === 1 ? styles.stickyWrap2 : "",
    cardIndex === 2 ? styles.stickyWrap3 : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.slot} data-rail-slot style={{ gridRow: `${anchor}-start / -1` }}>
      <div ref={measureRef} className={stickyClassName}>
        <RailCardArticle
          card={card}
          action={cardIndex === 2}
          Icon={RAIL_ICONS[cardIndex]}
          iconRef={iconRef}
          tone={tone}
        />
      </div>
    </div>
  );
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
  Icon: ComponentType<{ className?: string } & RefAttributes<RailIconHandle>>;
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
