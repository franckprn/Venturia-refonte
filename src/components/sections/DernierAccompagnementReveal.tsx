"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import { formatFigureValue, type RealisationFigure } from "@/content/realisations";
import styles from "./dernier-accompagnement.module.css";

gsap.registerPlugin(ScrollTrigger);

type DernierAccompagnementRevealProps = {
  /** Le conteneur du visuel (rendu côté serveur : <Image> ou l'aplat
   *  --ink de repli, dégradé et tags compris). */
  visual: React.ReactNode;
  figures: RealisationFigure[];
};

/**
 * Révélation unique à l'entrée dans le viewport (`ScrollTrigger`,
 * `start: "top 80%"`, `once: true`) :
 * - le visuel monte de 24px, 400ms, sans fondu ;
 * - les trois lignes de chiffres montent de 16px, stagger 80ms ;
 * - chaque valeur compte de 0 à sa cible, 800ms, décalée du même 80ms
 *   que sa ligne.
 *
 * Garde-fous du CLAUDE.md :
 * - le HTML rend déjà la valeur finale (formatFigureValue, appelé ici
 *   ET à l'affichage initial) : le compteur est une amélioration
 *   progressive, jamais la seule source de la valeur affichée.
 * - états initiaux posés par GSAP en JS uniquement, jamais en CSS.
 * - prefers-reduced-motion : rien n'est découpé ni animé, tout est là.
 */
export function DernierAccompagnementReveal({
  visual,
  figures,
}: DernierAccompagnementRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const visualEl = visualRef.current;
    const rows = rowRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!root || !visualEl || rows.length !== figures.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(visualEl, { y: 24 });
      gsap.set(rows, { autoAlpha: 0, y: 16 });

      ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(visualEl, {
            y: 0,
            duration: 0.4,
            ease: VENTURIA_EASE,
          });

          gsap.to(rows, {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: VENTURIA_EASE,
          });

          figures.forEach((figure, i) => {
            const valueEl = valueRefs.current[i];
            if (!valueEl) return;
            const counter = { n: 0 };
            gsap.to(counter, {
              n: figure.value,
              duration: 0.8,
              delay: i * 0.08,
              ease: VENTURIA_EASE,
              onUpdate: () => {
                valueEl.textContent = formatFigureValue({
                  ...figure,
                  value: counter.n,
                });
              },
            });
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [figures]);

  return (
    <div ref={rootRef} className={styles.split}>
      <div ref={visualRef} className={styles.visualSlot}>
        {visual}
      </div>

      <div className={styles.figures}>
        {figures.map((figure, i) => (
          <div
            key={figure.caption}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className={styles.figureRow}
            data-da-bloc={i + 1}
          >
            <span
              ref={(el) => {
                valueRefs.current[i] = el;
              }}
              className={styles.figureValue}
            >
              {formatFigureValue(figure)}
            </span>
            <span className={styles.figureCaption}>{figure.caption}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
