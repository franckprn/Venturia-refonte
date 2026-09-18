"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import type { RespirationContent } from "@/content/respiration";
import styles from "./respiration.module.css";

gsap.registerPlugin(ScrollTrigger);

type RespirationRevealProps = RespirationContent;

/**
 * Révélation ligne par ligne au scroll (`ScrollTrigger`, `start: "top
 * 75%"`, `once: true`) : chaque ligne translate de 100% vers 0 dans un
 * cache immobile à overflow hidden — jamais de fondu. 5 lignes en tout
 * (2 + 2 + 1), stagger 80ms entre elles, SAUF avant la ligne du bloc 3
 * qui démarre 200ms après la fin (pas le début) de la dernière ligne
 * du bloc 2 : le silence avant la chute.
 *
 * Garde-fous du CLAUDE.md :
 * - l'état masqué (yPercent: 100) est posé par GSAP en JS uniquement,
 *   jamais en CSS : sans JS, les trois blocs sont lisibles tout de
 *   suite, rien n'est parqué à opacity 0.
 * - prefers-reduced-motion : aucun état initial posé, rien ne bouge.
 */
export function RespirationReveal({ block1, block2, block3 }: RespirationRevealProps) {
  // block1/block2/block3 doivent être des enfants DIRECTS de .body (la
  // grille 12 colonnes de la section) pour que leur grid-column ait un
  // effet — pas d'enfant unique wrapper : le composant rend un
  // fragment, .block1 lui-même sert de déclencheur au ScrollTrigger.
  const triggerRef = useRef<HTMLParagraphElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = triggerRef.current;
    const lines = lineRefs.current;
    if (!root || lines.length !== 5 || lines.some((l) => !l)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(lines, { yPercent: 100 });

      ScrollTrigger.create({
        trigger: root,
        start: "top 75%",
        once: true,
        onEnter: () => {
          // Lignes 0-3 (bloc 1 + bloc 2) : cascade continue, 80ms
          // d'écart.
          gsap.to(lines.slice(0, 4), {
            yPercent: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: VENTURIA_EASE,
          });

          // Ligne 4 (bloc 3) : 200ms après la FIN de la ligne 3 (qui
          // démarre à 3×80ms et dure 400ms → finit à 640ms).
          gsap.to(lines[4], {
            yPercent: 0,
            duration: 0.4,
            delay: 3 * 0.08 + 0.4 + 0.2,
            ease: VENTURIA_EASE,
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <p ref={triggerRef} className={styles.block1}>
        <span className={styles.mask}>
          <span
            ref={(el) => {
              lineRefs.current[0] = el;
            }}
            className={styles.line}
          >
            {block1.line1}
          </span>
        </span>
        <br />
        <span className={styles.mask}>
          <span
            ref={(el) => {
              lineRefs.current[1] = el;
            }}
            className={styles.line}
          >
            {block1.line2Before}
            {" "}
            {/* Point de coupe mobile fixé par Franck, pas par le
                navigateur : <br /> masqué en CSS à partir de 768px,
                affiché en dessous — le texte n'est jamais dupliqué. */}
            <br className={styles.mobileBreak} />
            {block1.line2After}
          </span>
        </span>
      </p>

      <p className={styles.block2}>
        <span className={styles.mask}>
          <span
            ref={(el) => {
              lineRefs.current[2] = el;
            }}
            className={styles.line}
          >
            {block2[0]}
          </span>
        </span>
        <br />
        <span className={styles.mask}>
          <span
            ref={(el) => {
              lineRefs.current[3] = el;
            }}
            className={styles.line}
          >
            {block2[1]}
          </span>
        </span>
      </p>

      <p className={styles.block3}>
        <span className={styles.mask}>
          <span
            ref={(el) => {
              lineRefs.current[4] = el;
            }}
            className={styles.line}
          >
            {block3.before}
            <span className={styles.accent}>{block3.accent}</span>
            {block3.after}
          </span>
        </span>
      </p>
    </>
  );
}
