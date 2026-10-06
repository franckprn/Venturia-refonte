"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ReadingProgress.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Barre de progression de lecture — filet 2px --accent, fixé sous la
 * nav (même largeur que le trait de la nav/le panneau du méga-menu :
 * .barInner reprend --shell-max/--shell-gutter-left/--shell-rail,
 * ReadingProgress.module.css). `scaleX` lié au scroll, `transform`
 * UNIQUEMENT (jamais `width`, qui déclenche un reflow à chaque frame).
 *
 * Bornes du scroll : du haut du fil d'Ariane (`[data-article-start]`,
 * BlogBreadcrumb.tsx) au bas de la liste Sources
 * (`[data-article-body-end]`, ArticleSources.tsx) — ni la Respiration
 * rouge ni le footer n'avancent la barre, ils suivent l'article, pas le
 * corps lisible lui-même.
 *
 * `ease: "none"` : seule dérogation au cubic-bezier unique du site
 * (CLAUDE.md, « Animations ») — un tween `scrub` ne joue pas dans le
 * temps, sa valeur est une PROJECTION DIRECTE de la position de scroll
 * (scrub: true, pas un nombre de secondes) : l'easing décrit une courbe
 * dans le temps, il n'a pas de sens ici, où il n'y a pas de temps à
 * courber — seulement une position.
 *
 * `prefers-reduced-motion` : la barre est masquée en CSS (ReadingProgress.
 * module.css) — aucun ScrollTrigger créé ici dans ce cas (cohérent avec
 * le reste du site, qui ne construit jamais de timeline inutile).
 */
export function ReadingProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const line = lineRef.current;
    const start = document.querySelector<HTMLElement>("[data-article-start]");
    const end = document.querySelector<HTMLElement>("[data-article-body-end]");
    if (!line || !start || !end) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: start,
            start: "top top",
            endTrigger: end,
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.bar} aria-hidden="true">
      <div className={styles.barInner}>
        <div ref={lineRef} className={styles.barLine} />
      </div>
    </div>
  );
}
