"use client";

import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { railCards } from "@/content/rail";
import { VENTURIA_EASE } from "@/lib/ease";
import { onHeroTitleDone } from "@/lib/heroTitleSignal";
import { pauseLenis, resumeLenis } from "@/lib/lenis";
import { useSectionTone } from "@/lib/tone";
import { useSectionHysteresis, type CrossEvent } from "@/lib/useSectionHysteresis";
import { IconArrowRight, IconClock, IconSparkle, type RailIconHandle } from "./RailIcons";
import styles from "./mobileRailStack.module.css";

const RAIL_ICONS = [IconClock, IconSparkle, IconArrowRight] as const;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Cycle de vie d'un carton réversible (cartons 2 et 3 — le carton 1
 *  reste "in" en permanence, cf. CLAUDE.md « Rail droit » § « Pile
 *  mobile ») :
 *    out      absent, pas dans le DOM
 *    in       présent — au repos, ou en train de jouer son animation
 *             d'entrée (le rôle CSS ne fait pas la différence, seul le
 *             transform GSAP inline distingue les deux visuellement)
 *    exiting  encore dans le DOM (pour jouer sa sortie), mais sorti du
 *             flux de la pile repliée — voir data-role plus bas
 */
type CardStatus = "out" | "in" | "exiting";

function withAt<T>(arr: readonly T[], index: number, value: T): T[] {
  const next = arr.slice();
  next[index] = value;
  return next;
}

type MobileRailStackProps = {
  /** ids des trois sections de rattachement (mêmes ancres que les
   *  <RailSlot> desktop, dans l'ordre 1, 2, 3 — voir page.tsx). */
  anchors: [string, string, string];
};

/**
 * Pile de cartons du rail, MOBILE UNIQUEMENT (< 1024px — CLAUDE.md,
 * « Rail droit » § « Pile mobile »). Un seul composant, monté une fois
 * (contrairement aux trois <RailSlot> desktop) : les trois cartons
 * vivent tous dans la même pile fixée en bas de l'écran, jamais dans
 * le flux de la page (voir rail.module.css : `.slot` passe à
 * `display: none` sous 1024px — c'est cette pile qui les remplace).
 *
 * Cartons 2 et 3 réversibles (CLAUDE.md) : ils entrent ET sortent selon
 * la position de scroll (hystérésis 50 %/60 %, voir
 * src/lib/useSectionHysteresis.ts), donc démontés pour de vrai quand
 * sortis (plus de « jamais démonté » ici) — c'est ce qui permet de
 * rejouer proprement leur icône à chaque nouvelle entrée. Le carton 1,
 * lui, reste monté en permanence.
 *
 * Le rôle visuel de chaque carton dans la pile REPLIÉE (front, peek ou
 * exiting) est calculé en JS et posé en `data-role`, PAS déduit du CSS
 * via `:last-child` : un carton "exiting" doit sortir du flux (pour
 * glisser par-dessus en position absolue) alors qu'il est encore un
 * enfant DOM — `:last-child` ne peut pas exprimer cette distinction
 * (voir mobileRailStack.module.css).
 */
export function MobileRailStack({ anchors }: MobileRailStackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState<CardStatus[]>(["in", "out", "out"]);
  const [open, setOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([null, null, null]);
  const iconRefs = [
    useRef<RailIconHandle>(null),
    useRef<RailIconHandle>(null),
    useRef<RailIconHandle>(null),
  ];
  const pendingEnter = useRef<Set<number>>(new Set());
  const statusRef = useRef(status);
  const openRef = useRef(open);
  const stackId = useId();

  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Tonalité UNIQUE pour toute la pile (texte, icônes) — pas une par
  // carton comme sur le rail desktop (CLAUDE.md, « Pile mobile ») :
  // celle de la section sous la pile elle-même.
  const tone = useSectionTone(wrapRef);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /**
   * Un seul point d'entrée pour les deux sens (enter/exit) des cartons
   * 2 et 3, appelé par useSectionHysteresis. Gère aussi l'INTERRUPTION
   * propre (CLAUDE.md : « pas d'empilement, l'animation en cours
   * s'achève ou repart proprement ») : rediriger un carton "exiting"
   * vers l'entrée (ou l'inverse) se fait en rappelant gsap.to sur le
   * MÊME transform (`y`) avec `overwrite: true` EXPLICITE — sans lui,
   * vérifié par test : le tween en cours continue jusqu'à SON propre
   * onComplete (ex. le démontage programmé par une sortie) malgré le
   * nouveau tween qui anime déjà l'élément dans l'autre sens, les deux
   * tournant en parallèle jusqu'à ce que l'ancien "gagne" en dernier et
   * démonte/rejoue l'icône à tort. `overwrite: true` tue le tween
   * précédent (et son onComplete) au moment précis où le nouveau démarre.
   */
  const crossCard = useCallback((index: 1 | 2, event: CrossEvent) => {
    const current = statusRef.current[index];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (event.type === "enter") {
      if (current === "in") return;

      if (event.immediate || reduced) {
        // Chargement en milieu de scroll, ou reduced-motion : montage
        // direct, aucune animation, aucune icône.
        setStatus((prev) => withAt(prev, index, "in"));
        return;
      }

      if (current === "exiting") {
        // Sortie en cours interrompue : le carton est déjà dans le DOM,
        // son ref existe déjà — on anime tout de suite, pas besoin
        // d'attendre un effet de montage.
        setStatus((prev) => withAt(prev, index, "in"));
        const el = cardRefs.current[index];
        if (el) {
          gsap.to(el, {
            y: "0%",
            duration: 0.3,
            ease: VENTURIA_EASE,
            overwrite: true,
            onComplete: () => iconRefs[index].current?.play(),
          });
        }
        return;
      }

      // current === "out" : montage frais — l'effet ci-dessous joue
      // l'entrée une fois le ref du nouveau nœud DOM disponible.
      pendingEnter.current.add(index);
      setStatus((prev) => withAt(prev, index, "in"));
      return;
    }

    // event.type === "exit"
    if (current !== "in") return;

    if (reduced) {
      setStatus((prev) => withAt(prev, index, "out"));
      return;
    }

    setStatus((prev) => withAt(prev, index, "exiting"));
    const el = cardRefs.current[index];
    if (el) {
      gsap.to(el, {
        y: "100%",
        duration: 0.3,
        ease: VENTURIA_EASE,
        overwrite: true,
        onComplete: () => setStatus((prev) => withAt(prev, index, "out")),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cartons 2 et 3 : hystérésis 50 % (entrée) / 60 % (sortie) sur le
  // haut de leur section de rattachement (src/lib/useSectionHysteresis.ts).
  // Suspendue tant que la pile est dépliée (`openRef`) — CLAUDE.md :
  // « aucun carton ne peut entrer ni sortir pendant ce temps ».
  const isPaused = useCallback(() => openRef.current, []);
  useSectionHysteresis(anchors[1], (e) => crossCard(1, e), isMobile, isPaused);
  useSectionHysteresis(anchors[2], (e) => crossCard(2, e), isMobile, isPaused);

  // Carton 1 : l'horloge démarre juste après la fin de l'animation du
  // h1 du Hero, comme sur desktop (src/lib/heroTitleSignal.ts) — jamais
  // en reduced-motion.
  useEffect(() => {
    if (!isMobile) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    return onHeroTitleDone(() => {
      iconRefs[0].current?.play();
    });
  }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

  // Animation d'entrée d'un carton FRAÎCHEMENT monté (status passé de
  // "out" à "in" avec pendingEnter marqué) : glisse depuis le bas
  // (translateY(100%) → 0, 300ms, easing du site) PAR-DESSUS la pile,
  // puis joue l'icône une fois la montée terminée. La redirection
  // "exiting" → "in" (carton déjà monté) est animée directement dans
  // crossCard, sans passer par ici.
  useEffect(() => {
    status.forEach((s, index) => {
      if (s !== "in" || !pendingEnter.current.has(index)) return;
      pendingEnter.current.delete(index);
      const el = cardRefs.current[index];
      if (!el) return;
      gsap.fromTo(
        el,
        { y: "100%" },
        {
          y: "0%",
          duration: 0.3,
          ease: VENTURIA_EASE,
          overwrite: true,
          onComplete: () => iconRefs[index].current?.play(),
        },
      );
    });
    // iconRefs est un tableau de refs stable (jamais recréé) : safe à
    // omettre des deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Défense : si la pile se déplie pendant qu'un carton est en train de
  // sortir (le bouton reste tapable pendant les 300ms de l'animation),
  // annule proprement la sortie — CLAUDE.md : « aucun carton ne peut
  // entrer ni sortir » tant que c'est déplié, donc jamais de sortie qui
  // s'achève (et démonte) une fois dépliée.
  useEffect(() => {
    if (!open) return;
    status.forEach((s, index) => {
      if (s !== "exiting") return;
      const el = cardRefs.current[index];
      if (el) gsap.killTweensOf(el);
      setStatus((prev) => withAt(prev, index, "in"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    // PAS de toggleRef.current?.focus() ici : à cet instant, le DOM
    // n'a pas encore recommis (le bouton est encore `hidden` — React
    // n'applique le nouveau rendu qu'après ce callback), et un élément
    // `hidden` refuse le focus. Le focus est rendu dans le nettoyage de
    // l'effet ci-dessous à la place, qui ne tourne qu'une fois le DOM
    // (donc le bouton redevenu visible) déjà à jour.
  }, []);

  // Dépliage : focus sur le premier carton, scroll de page bloqué,
  // Lenis en pause, Escape ferme + rend le focus au bouton, Tab piégé
  // dans la pile (même mécanique que MegaMenu.tsx).
  useEffect(() => {
    if (!open) return;
    const stack = stackRef.current;
    if (!stack) return;

    const first = cardRefs.current.find((el): el is HTMLElement => el !== null);
    first?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseLenis();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = Array.from(stack.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    };
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      resumeLenis();
      document.removeEventListener("keydown", handleKeydown);
      // Rendu du focus au bouton (Escape, tap sur le calque, tap sur un
      // carton non-action) : ce nettoyage tourne après que le rendu
      // React a déjà retiré `hidden` du bouton (CLAUDE.md, « Pile
      // mobile » — dépliage).
      toggleRef.current?.focus();
    };
  }, [open, close]);

  // Espace réservé en bas de page (footer.module.css, mobile) : hauteur
  // réelle de la pile REPLIÉE, mesurée directement (jamais une valeur
  // en dur — elle varie avec le texte des cartons, le nombre de pics
  // derrière le front, et la largeur de l'écran). Gelée pendant le
  // dépliage : la pile dépliée est une superposition temporaire, pas un
  // nouvel état permanent de la page.
  useEffect(() => {
    if (!isMobile || open) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const update = () => {
      const top = wrap.getBoundingClientRect().top;
      const space = Math.max(0, window.innerHeight - top);
      document.documentElement.style.setProperty("--mobile-pile-space", `${space}px`);
    };
    update();

    // Throttlé par requestAnimationFrame (même motif que src/lib/tone.ts
    // scheduleRun/runProbes) : pendant la transition height 300ms d'un
    // pic qui apparaît/disparaît (mobileRailStack.module.css .card),
    // `wrap` change de taille à chaque frame — un ResizeObserver qui
    // rappellerait `update` en synchrone à chaque notification (et non
    // une fois par frame) déclenche l'avertissement navigateur
    // « ResizeObserver loop completed with undelivered notifications »
    // sous scroll rapide.
    let rafId: number | null = null;
    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(wrap);
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isMobile, open]);

  // Jamais un retour anticipé sur `!isMobile` : la pile reste montée à
  // toutes les largeurs (comme .slot sous 1024px côté rail desktop,
  // voir rail.module.css) — c'est le CSS (`display: none` >= 1024px,
  // mobileRailStack.module.css) qui décide de sa visibilité, jamais un
  // (dé)montage React. Un montage conditionné à isMobile ferait
  // clignoter la pile à l'hydratation.
  //
  // Rôle CSS de chaque carton MONTÉ dans la pile repliée : "exiting"
  // pour un carton en train de sortir (hors flux, voir CSS), sinon
  // "front" pour le dernier des cartons "in" restants, "peek" pour les
  // autres — voir le commentaire d'en-tête pour pourquoi ce calcul vit
  // en JS plutôt qu'en simple `:last-child`.
  const mountedIndexes = [0, 1, 2].filter((i) => status[i] !== "out");
  const flowIndexes = mountedIndexes.filter((i) => status[i] !== "exiting");
  const frontIndex = flowIndexes.length > 0 ? flowIndexes[flowIndexes.length - 1] : null;
  const frontTitle = frontIndex !== null ? railCards[frontIndex].title : railCards[0].title;

  return (
    <>
      {/* Calque plein écran derrière la pile dépliée — UN seul élément
          flouté, transparent, sans teinte (CLAUDE.md, « Pile mobile »).
          Toujours monté (jamais démonté/remonté), visibilité pilotée en
          CSS par data-open, pour une fermeture aussi progressive que
          l'ouverture. */}
      <div
        className={styles.overlay}
        data-open={open}
        data-tone={tone}
        aria-hidden="true"
        onClick={close}
      />

      <div ref={wrapRef} className={styles.wrap} data-open={open} data-tone={tone}>
        <div className={styles.stackOuter}>
          {/* Surface floutée UNIQUE de la pile repliée — jamais un
              backdrop-filter par carton (CLAUDE.md, « Pile mobile ») :
              désactivée en CSS quand la pile est dépliée (le calque
              ci-dessus s'en charge alors, pas de flou sur du flou). */}
          <span className={styles.blurLayer} aria-hidden="true" />

          <div
            id={stackId}
            ref={stackRef}
            className={styles.stack}
            role={open ? "region" : undefined}
            aria-label={open ? "Repères, dépliés" : undefined}
          >
            {mountedIndexes.map((index) => {
              const role =
                status[index] === "exiting"
                  ? "exiting"
                  : index === frontIndex
                    ? "front"
                    : "peek";
              return (
                <MobileCard
                  key={index}
                  cardIndex={index}
                  role={role}
                  open={open}
                  iconRef={iconRefs[index]}
                  onClose={close}
                  setRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                />
              );
            })}
          </div>

          {/* Bouton séparé (pas la pile elle-même) : un tap sur la pile
              repliée la déplie TOUJOURS, quel que soit le carton du
              dessus — voir le commentaire d'en-tête pour le pourquoi
              de cette superposition plutôt qu'un changement de balise. */}
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            hidden={open}
            aria-expanded={open}
            aria-controls={stackId}
            aria-label={`Voir plus : ${frontTitle}`}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
    </>
  );
}

type CardRole = "front" | "peek" | "exiting";

function MobileCard({
  cardIndex,
  role,
  open,
  iconRef,
  onClose,
  setRef,
}: {
  cardIndex: number;
  role: CardRole;
  open: boolean;
  iconRef: RefObject<RailIconHandle | null>;
  onClose: () => void;
  setRef: (el: HTMLAnchorElement | HTMLDivElement | null) => void;
}) {
  const card = railCards[cardIndex];
  const Icon = RAIL_ICONS[cardIndex];
  const className = [styles.card, card.href ? styles.cardAction : ""].filter(Boolean).join(" ");

  const content = (
    <>
      <span className={styles.cardIcon}>
        <Icon ref={iconRef} className={styles.cardIconSvg} />
      </span>
      <p className={styles.cardTitle}>{card.title}</p>
      {/* Une ligne, pile REPLIÉE uniquement (front) — masquée par défaut
          en CSS, révélée seulement pour data-role="front" quand
          data-open="false" (mobileRailStack.module.css). */}
      <p className={styles.cardResume}>{card.resume}</p>
      <p className={styles.cardText}>{card.text}</p>
      <Chevron className={styles.cardChevron} />
    </>
  );

  // Seul le carton 3 (action) est cliquable, dépliée ou non — CLAUDE.md,
  // « Pile mobile ». Les cartons 1 et 2, eux, ferment la pile au tap
  // quand elle est dépliée (« nouveau tap sur la pile » — le calque et
  // Escape sont les deux autres façons de fermer).
  if (card.href) {
    return (
      <Link
        href={card.href}
        className={className}
        data-mobile-card
        data-role={role}
        ref={setRef}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={className}
      data-mobile-card
      data-role={role}
      ref={setRef}
      tabIndex={-1}
      onClick={open ? onClose : undefined}
    >
      {content}
    </div>
  );
}

/**
 * Chevron de dépliage — SVG dessiné à la main, jamais une icône de
 * librairie (CLAUDE.md, « Rail droit » § « Pile mobile »). Pointe vers
 * le haut au repos (pile repliée), pivote de 180° à l'ouverture — la
 * rotation elle-même est purement CSS (`transform`, piloté par
 * `[data-open]`, voir mobileRailStack.module.css) : aucun état à gérer
 * ici. Décoratif, aria-hidden : l'état est déjà porté par
 * aria-expanded sur le bouton.
 */
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10L8 6L12 10" />
    </svg>
  );
}
