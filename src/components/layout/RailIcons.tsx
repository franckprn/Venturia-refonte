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

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ComponentType,
  type RefAttributes,
} from "react";
import { gsap } from "gsap";
import { VENTURIA_EASE } from "@/lib/ease";

export type RailIconHandle = {
  play: () => void;
};

type IconProps = {
  className?: string;
};

/** Type d'une icône de carton du rail (forme commune aux 5 exports de ce
 *  fichier) — partagé par components/layout/Rail.tsx et MobileRailStack.tsx
 *  pour typer un `RailConfig.icons` propre à chaque page. */
export type RailIconComponent = ComponentType<IconProps & RefAttributes<RailIconHandle>>;

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

/**
 * Carton « l'outil qui relie vos applications » (page /services/automations) :
 * un nœud central et deux nœuds reliés par un trait chacun — une idée de
 * connexion/hub, pas de délai ni d'IA (aucune des 3 icônes de la home ne
 * correspondait). Rond des nœuds à fill: none (comme le cadran de l'horloge) :
 * les traits, dessinés en premier, passent visuellement par leur centre.
 *
 * Au déclenchement : les deux traits se dessinent (stroke-dasharray/
 * dashoffset, longueur lue via `getTotalLength()` au moment du `play()` —
 * jamais codée en dur, ce composant est réutilisable à toute échelle),
 * légèrement décalés (stagger 100ms), pour une lecture « ça se connecte ».
 * Les nœuds eux-mêmes restent fixes.
 */
export const IconConnect = forwardRef<RailIconHandle, IconProps>(function IconConnect(
  { className },
  ref,
) {
  const lineARef = useRef<SVGLineElement>(null);
  const lineBRef = useRef<SVGLineElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    return () => ctxRef.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const lineA = lineARef.current;
      const lineB = lineBRef.current;
      if (!lineA || !lineB) return;
      ctxRef.current?.add(() => {
        [lineA, lineB].forEach((line) => {
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        });
        gsap.to([lineA, lineB], {
          strokeDashoffset: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: VENTURIA_EASE,
        });
      });
    },
  }));

  return (
    <svg {...SHARED_PROPS} className={className}>
      <line ref={lineARef} x1="10" y1="10" x2="4.5" y2="5.5" />
      <line ref={lineBRef} x1="10" y1="10" x2="15.5" y2="14.5" />
      <circle cx="10" cy="10" r="1.75" />
      <circle cx="4.5" cy="5.5" r="1.75" />
      <circle cx="15.5" cy="14.5" r="1.75" />
    </svg>
  );
});

/**
 * Carton « une tâche qui s'enchaîne seule » (page /services/automations) :
 * trois blocs alignés, reliés par deux petites flèches — une idée de suite
 * d'étapes. Un seul <path> par flèche (ligne + chevron), même motif que
 * IconArrowRight à plus petite échelle.
 *
 * Au déclenchement : les deux flèches avancent d'un cran puis reviennent,
 * légèrement décalées (stagger 100ms) — la première rejouée d'abord, la
 * seconde juste après, comme la tâche qui « passe » d'un bloc au suivant.
 * 400ms au total (2 × 150ms + 100ms de décalage), dans le budget du
 * CLAUDE.md (« Rail droit », animations ≤ 400ms).
 */
export const IconFlow = forwardRef<RailIconHandle, IconProps>(function IconFlow({ className }, ref) {
  const arrowARef = useRef<SVGPathElement>(null);
  const arrowBRef = useRef<SVGPathElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    return () => ctxRef.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const arrowA = arrowARef.current;
      const arrowB = arrowBRef.current;
      if (!arrowA || !arrowB) return;
      ctxRef.current?.add(() => {
        gsap
          .timeline()
          .to(arrowA, { x: 1.2, duration: 0.15, ease: VENTURIA_EASE }, 0)
          .to(arrowA, { x: 0, duration: 0.15, ease: VENTURIA_EASE }, 0.15)
          .to(arrowB, { x: 1.2, duration: 0.15, ease: VENTURIA_EASE }, 0.1)
          .to(arrowB, { x: 0, duration: 0.15, ease: VENTURIA_EASE }, 0.25);
      });
    },
  }));

  return (
    <svg {...SHARED_PROPS} className={className}>
      <rect x="1.5" y="8" width="4" height="4" rx="0.6" />
      <rect x="8" y="8" width="4" height="4" rx="0.6" />
      <rect x="14.5" y="8" width="4" height="4" rx="0.6" />
      <path ref={arrowARef} d="M5.8 10H7.1M6.5 9.4L7.2 10L6.5 10.6" />
      <path ref={arrowBRef} d="M12.3 10H13.6M13 9.4L13.7 10L13 10.6" />
    </svg>
  );
});

/**
 * Carton « Vous vendez en ligne ? » (page /services/sea) : une
 * étiquette de prix — l'idée d'un produit affiché avec son prix dans
 * Google Shopping. Un seul <path> (forme de l'étiquette) + un rond pour
 * le trou, comme IconClock (cadran à fill: none, le trait passe
 * visuellement par son centre).
 *
 * Au déclenchement (signal de fin du h1, comme IconConnect) : l'étiquette
 * bascule légèrement (rotation around son coin d'attache, haut-gauche),
 * comme si on venait de l'accrocher — aller-retour, 400ms au total.
 */
export const IconTag = forwardRef<RailIconHandle, IconProps>(function IconTag({ className }, ref) {
  const groupRef = useRef<SVGGElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    return () => ctxRef.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const el = groupRef.current;
      if (!el) return;
      ctxRef.current?.add(() => {
        gsap
          .timeline()
          .to(el, { rotation: 8, svgOrigin: "5 5", duration: 0.2, ease: VENTURIA_EASE })
          .to(el, { rotation: 0, svgOrigin: "5 5", duration: 0.2, ease: VENTURIA_EASE });
      });
    },
  }));

  return (
    <svg {...SHARED_PROPS} className={className}>
      <g ref={groupRef}>
        <path d="M5 2.5H11.5L17.5 8.5V11.5L10.5 18.5L2.5 10.5V3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H5Z" fill="none" />
        <circle cx="6.25" cy="6.25" r="1.25" />
      </g>
    </svg>
  );
});

/**
 * Carton « Déjà un compte Google Ads ? » (page /services/sea) :
 * une loupe — l'idée d'un audit du compte existant. Deux éléments
 * séparés (cercle + manche) : le tracé d'origine n'a pas besoin d'être
 * scindé plus finement, l'animation ne bouge que le manche.
 *
 * Au déclenchement (figement, comme IconSparkle) : le manche de la
 * loupe fait un petit balayage (translation courte, aller-retour),
 * comme un passage rapide sur le compte.
 */
export const IconSearch = forwardRef<RailIconHandle, IconProps>(function IconSearch(
  { className },
  ref,
) {
  const handleRef = useRef<SVGLineElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    return () => ctxRef.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const el = handleRef.current;
      if (!el) return;
      ctxRef.current?.add(() => {
        gsap
          .timeline()
          .to(el, { x: 1.5, y: 1.5, duration: 0.2, ease: VENTURIA_EASE })
          .to(el, { x: 0, y: 0, duration: 0.2, ease: VENTURIA_EASE });
      });
    },
  }));

  return (
    <svg {...SHARED_PROPS} className={className}>
      <circle cx="8.5" cy="8.5" r="5" />
      <line ref={handleRef} x1="12.5" y1="12.5" x2="16.5" y2="16.5" />
    </svg>
  );
});

/**
 * Carton « Déjà sur Make ou Zapier ? » (page /services/automations) : deux
 * flèches courbes en sens opposés, l'idée d'un échange/bascule d'un outil
 * vers un autre — aucune des 5 icônes existantes ne porte cette idée de
 * migration (IconConnect = relier, IconFlow = enchaîner). Chaque flèche est
 * un seul <path> (ligne + chevron), même motif que IconArrowRight/IconFlow.
 *
 * Au déclenchement : la flèche du haut avance vers la droite puis revient,
 * celle du bas vers la gauche puis revient, légèrement décalées (stagger
 * 100ms) — une lecture « ça bascule d'un sens à l'autre ». 400ms au total,
 * dans le budget du CLAUDE.md (« Rail droit », animations ≤ 400ms).
 */
export const IconSwap = forwardRef<RailIconHandle, IconProps>(function IconSwap({ className }, ref) {
  const topRef = useRef<SVGPathElement>(null);
  const bottomRef = useRef<SVGPathElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {});
    return () => ctxRef.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const top = topRef.current;
      const bottom = bottomRef.current;
      if (!top || !bottom) return;
      ctxRef.current?.add(() => {
        gsap
          .timeline()
          .to(top, { x: 1.5, duration: 0.2, ease: VENTURIA_EASE }, 0)
          .to(top, { x: 0, duration: 0.2, ease: VENTURIA_EASE }, 0.2)
          .to(bottom, { x: -1.5, duration: 0.2, ease: VENTURIA_EASE }, 0.1)
          .to(bottom, { x: 0, duration: 0.2, ease: VENTURIA_EASE }, 0.3);
      });
    },
  }));

  return (
    <svg {...SHARED_PROPS} className={className}>
      <path ref={topRef} d="M4 7H14.5M12 4.5L14.5 7L12 9.5" />
      <path ref={bottomRef} d="M16 13H5.5M8 10.5L5.5 13L8 15.5" />
    </svg>
  );
});
