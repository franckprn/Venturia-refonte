"use client";

// Icônes des cartons du rail — SVG inline, sans librairie (CLAUDE.md,
// « Rail droit ») : un carré de 44px par carton contient un de ces
// glyphes à 20px, trait 1.5px, couleur héritée (currentColor) posée par
// .cardIcon dans rail.module.css. Décoratives : aria-hidden="true".
//
// Chacune expose un `ref` de type RailIconHandle : `{ play() }`,
// déclenché depuis Rail.tsx (signal du h1 pour le carton 1, figement
// mesuré pour les cartons 2 et 3, survol/focus en plus pour le 3ᵉ).
// Les tweens sont créés dans un gsap.context propre à chaque icône,
// révoqué au démontage — jamais d'état initial en CSS, jamais
// autoAlpha (CLAUDE.md, « Animations »).

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";
import { VENTURIA_EASE } from "@/lib/ease";

export type RailIconHandle = {
  play: () => void;
};

type IconProps = {
  className?: string;
};

const SHARED_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/**
 * Carton 1 — « Combien de temps » : une horloge.
 *
 * Redessinée en trois éléments séparés (cadran + grande aiguille +
 * petite aiguille) : le tracé d'origine, un seul <path>
 * ("M10 6.5V10L12.5 11.75"), enchaînait les deux aiguilles en un seul
 * sous-tracé partageant le centre — impossible à faire tourner à deux
 * vitesses différentes. Signalé à Franck. Rendu au repos strictement
 * identique (mêmes coordonnées, mêmes segments).
 *
 * Au déclenchement : la grande aiguille (minuteRef) fait un tour
 * complet, la petite (hourRef) avance de 30°, toutes deux autour du
 * centre du cadran — `svgOrigin: "10 10"` (coordonnées du viewBox),
 * jamais un transformOrigin en %, qui diverge selon le navigateur sur
 * un SVG à viewBox mis à l'échelle.
 */
export const IconClock = forwardRef<RailIconHandle, IconProps>(function IconClock(
  { className },
  ref,
) {
  const minuteRef = useRef<SVGLineElement>(null);
  const hourRef = useRef<SVGLineElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    return () => ctxRef.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const minute = minuteRef.current;
      const hour = hourRef.current;
      if (!minute || !hour) return;
      ctxRef.current?.add(() => {
        gsap
          .timeline()
          .to(minute, { rotation: 360, svgOrigin: "10 10", duration: 0.4, ease: VENTURIA_EASE }, 0)
          .to(hour, { rotation: 30, svgOrigin: "10 10", duration: 0.4, ease: VENTURIA_EASE }, 0);
      });
    },
  }));

  return (
    <svg {...SHARED_PROPS} className={className}>
      <circle cx="10" cy="10" r="7.25" />
      <line ref={minuteRef} x1="10" y1="6.5" x2="10" y2="10" />
      <line ref={hourRef} x1="10" y1="10" x2="12.5" y2="11.75" />
    </svg>
  );
});

/**
 * Carton 2 — « Le GEO » : une étoile à quatre branches (symbole IA).
 * Un seul <path> : le quart de tour anime la forme entière comme un
 * seul bloc, pas de parties indépendantes à séparer.
 */
export const IconSparkle = forwardRef<RailIconHandle, IconProps>(function IconSparkle(
  { className },
  ref,
) {
  const pathRef = useRef<SVGPathElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    return () => ctxRef.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const el = pathRef.current;
      if (!el) return;
      ctxRef.current?.add(() => {
        gsap.to(el, { rotation: 90, svgOrigin: "10 10", duration: 0.4, ease: VENTURIA_EASE });
      });
    },
  }));

  return (
    <svg {...SHARED_PROPS} className={className}>
      <path ref={pathRef} d="M10 2.5L11.3 8.7L17.5 10L11.3 11.3L10 17.5L8.7 11.3L2.5 10L8.7 8.7Z" />
    </svg>
  );
});

/**
 * Carton 3 — « Parler du projet » : une flèche vers la droite. Un seul
 * <path> (ligne + pointe) : l'animation ne fait que le translater en
 * bloc, pas besoin de séparer ses parties.
 *
 * Elle sort par la droite du carré (translation vers +x, hors du
 * cadre — masquée par `overflow: hidden` posé sur .cardIcon, le
 * conteneur de l'icône SEUL, jamais un ancêtre du carton), puis
 * réapparaît instantanément à l'identique de l'autre côté (translation
 * vers -x, toujours hors cadre : ce saut n'est jamais visible) avant
 * de revenir à sa position d'origine par la gauche. Deux phases de
 * 200ms, 400ms au total.
 *
 * La distance de translation est mesurée sur le conteneur réel de
 * l'icône (le <span> de 44px, parent du <svg>) plutôt que codée en dur,
 * pour rester correcte si ce carré change un jour de taille.
 *
 * Pas d'empilement (CLAUDE.md, « Rail droit ») : un drapeau
 * `playingRef` ignore tout nouveau déclenchement pendant qu'une
 * animation est en cours — l'animation en cours va à son terme, la
 * flèche finit donc toujours à sa position d'origine.
 */
export const IconArrowRight = forwardRef<RailIconHandle, IconProps>(function IconArrowRight(
  { className },
  ref,
) {
  const pathRef = useRef<SVGPathElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    return () => ctxRef.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const el = pathRef.current;
      if (!el || playingRef.current) return;
      const container = el.ownerSVGElement?.parentElement;
      const travel = container ? container.getBoundingClientRect().width : 44;
      playingRef.current = true;
      ctxRef.current?.add(() => {
        gsap
          .timeline({
            onComplete: () => {
              playingRef.current = false;
            },
          })
          .to(el, { x: travel, duration: 0.2, ease: VENTURIA_EASE })
          .set(el, { x: -travel })
          .to(el, { x: 0, duration: 0.2, ease: VENTURIA_EASE });
      });
    },
  }));

  return (
    <svg {...SHARED_PROPS} className={className}>
      <path ref={pathRef} d="M4 10H16M10.5 5L16 10L10.5 15" />
    </svg>
  );
});
