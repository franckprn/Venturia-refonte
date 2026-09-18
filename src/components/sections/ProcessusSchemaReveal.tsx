"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import type { ProcessusStep } from "@/content/processus";
import styles from "./processus.module.css";

gsap.registerPlugin(ScrollTrigger);

type ProcessusSchemaRevealProps = {
  steps: readonly [ProcessusStep, ProcessusStep, ProcessusStep];
};

/**
 * Le schéma existe en DEUX marquages SVG distincts — desktop (axe
 * horizontal) et mobile (axe vertical, formes redessinées pour tenir
 * dans la largeur, pas une rotation CSS du tracé desktop — voir le
 * commentaire au-dessus du second <svg>. Le CSS bascule l'affichage de
 * l'un à l'autre à 768px (services.module.css → processus.module.css
 * .desktopSvg/.mobileSvg) ; les deux rendent déjà leur état final
 * complet par défaut, donc sans JS le schéma est entier quel que soit
 * l'écran.
 *
 * Révélation unique à l'entrée dans le viewport (ScrollTrigger,
 * `start: "top 70%"`, `once: true`) :
 * 1. l'axe (+ la flèche, un seul <path> à deux sous-tracés) se dessine
 *    de son origine à son extrémité via stroke-dasharray/dashoffset ;
 * 2. puis A et B apparaissent en opacité, stagger 120ms ;
 * 3. puis C s'étire depuis son bord tangent à B — en animant les
 *    attributs SVG (rx/cx en desktop, ry/cy en mobile) directement,
 *    jamais un scale + transform-origin (le référentiel d'un
 *    transform-origin sur un élément SVG diverge selon le navigateur).
 *
 * États initiaux posés par GSAP en JS uniquement (jamais en CSS) ;
 * `prefers-reduced-motion` : la fonction s'arrête avant de rien
 * parquer, le schéma reste dans son état final tel que rendu par défaut.
 *
 * Le point de rupture desktop/mobile (768px) est vérifié une seule
 * fois au montage, comme `prefers-reduced-motion` ailleurs dans le
 * projet : pas d'écouteur de resize, cohérent avec le reste du code.
 */
export function ProcessusSchemaReveal({ steps }: ProcessusSchemaRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const axisDesktopRef = useRef<SVGPathElement>(null);
  const aDesktopRef = useRef<SVGEllipseElement>(null);
  const bDesktopRef = useRef<SVGCircleElement>(null);
  const cDesktopRef = useRef<SVGEllipseElement>(null);

  const axisMobileRef = useRef<SVGPathElement>(null);
  const aMobileRef = useRef<SVGEllipseElement>(null);
  const bMobileRef = useRef<SVGCircleElement>(null);
  const cMobileRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const axis = isDesktop ? axisDesktopRef.current : axisMobileRef.current;
    const a = isDesktop ? aDesktopRef.current : aMobileRef.current;
    const b = isDesktop ? bDesktopRef.current : bMobileRef.current;
    const c = isDesktop ? cDesktopRef.current : cMobileRef.current;
    if (!axis || !a || !b || !c) return;

    const ctx = gsap.context(() => {
      const length = axis.getTotalLength();
      gsap.set(axis, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set([a, b], { opacity: 0 });

      // C part d'un rayon nul à son bord tangent à B (fixe), et grandit
      // vers son bord final — jamais un scale.
      if (isDesktop) {
        gsap.set(c, { attr: { rx: 0, cx: 292 } });
      } else {
        gsap.set(c, { attr: { ry: 0, cy: 232 } });
      }

      const tl = gsap.timeline({ paused: true });
      tl.to(axis, { strokeDashoffset: 0, duration: 0.4, ease: VENTURIA_EASE })
        .to(a, { opacity: 1, duration: 0.4, ease: VENTURIA_EASE }, ">")
        .to(b, { opacity: 1, duration: 0.4, ease: VENTURIA_EASE }, "<0.12");

      if (isDesktop) {
        tl.to(c, { attr: { rx: 410, cx: 702 }, duration: 0.4, ease: VENTURIA_EASE }, "<0.12");
      } else {
        tl.to(c, { attr: { ry: 90, cy: 322 }, duration: 0.4, ease: VENTURIA_EASE }, "<0.12");
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 70%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.schemaWrap}>
      {/* Desktop (>= 768px) : axe horizontal, y=120. Coordonnées exactes
          fournies par Franck — A tangente à B (A finit à x=122), B
          tangente à C (B finit à x=292), C finit à x=1112, avant la
          pointe de la flèche à x=1116. */}
      <svg
        className={styles.desktopSvg}
        viewBox="0 0 1136 240"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <line
          x1={40}
          y1={104}
          x2={40}
          y2={136}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        <path
          ref={axisDesktopRef}
          d="M40,120 L1112,120 M1100,112 L1116,120 L1100,128"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        <ellipse
          ref={aDesktopRef}
          cx={90}
          cy={120}
          rx={32}
          ry={95}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          ref={bDesktopRef}
          cx={207}
          cy={120}
          r={85}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
        <ellipse
          ref={cDesktopRef}
          cx={702}
          cy={120}
          rx={410}
          ry={85}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        <circle cx={90} cy={120} r={4} fill="var(--ink)" />
        <circle cx={207} cy={120} r={4} fill="var(--ink)" />
        <circle cx={702} cy={120} r={4} fill="var(--ink)" />

        <text x={90} y={20} textAnchor="middle" className={styles.svgNumber}>
          {steps[0].number}
        </text>
        <text x={207} y={20} textAnchor="middle" className={styles.svgNumber}>
          {steps[1].number}
        </text>
        <text x={702} y={20} textAnchor="middle" className={styles.svgNumber}>
          {steps[2].number}
        </text>
      </svg>

      {/* Mobile (< 768px) : axe vertical, pas la rotation CSS du tracé
          desktop — un schéma redessiné pour tenir dans la largeur
          disponible (A rx=64/ry=26 « petite et large », B cercle
          r=56 « moyenne », C rx=150/ry=90 « grande, horizontale,
          pleine largeur »), même principe de tangence, flèche en bas. */}
      <svg
        className={styles.mobileSvg}
        viewBox="0 0 360 530"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <line
          x1={164}
          y1={20}
          x2={196}
          y2={20}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        <path
          ref={axisMobileRef}
          d="M180,20 L180,460 M172,464 L180,482 L188,464"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        <ellipse
          ref={aMobileRef}
          cx={180}
          cy={94}
          rx={64}
          ry={26}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          ref={bMobileRef}
          cx={180}
          cy={176}
          r={56}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
        <ellipse
          ref={cMobileRef}
          cx={180}
          cy={322}
          rx={150}
          ry={90}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        <circle cx={180} cy={94} r={4} fill="var(--ink)" />
        <circle cx={180} cy={176} r={4} fill="var(--ink)" />
        <circle cx={180} cy={322} r={4} fill="var(--ink)" />

        <text
          x={156}
          y={94}
          textAnchor="end"
          dominantBaseline="middle"
          className={styles.svgNumber}
        >
          {steps[0].number}
        </text>
        <text
          x={156}
          y={176}
          textAnchor="end"
          dominantBaseline="middle"
          className={styles.svgNumber}
        >
          {steps[1].number}
        </text>
        <text
          x={156}
          y={322}
          textAnchor="end"
          dominantBaseline="middle"
          className={styles.svgNumber}
        >
          {steps[2].number}
        </text>
      </svg>
    </div>
  );
}
