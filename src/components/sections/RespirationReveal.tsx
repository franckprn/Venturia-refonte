"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import type { RespirationContent } from "@/content/respiration";
import styles from "./respiration.module.css";

gsap.registerPlugin(ScrollTrigger);

type RespirationRevealProps = {
  content: RespirationContent;
};

/**
 * Révélation unique à l'entrée dans le viewport (`ScrollTrigger`, `start:
 * "top 75%"`, `once: true`) : le texte translate de 100% vers 0 dans un
 * cache immobile à overflow hidden — jamais de fondu.
 *
 * Simplifié depuis une ancienne version à trois blocs (trois phrases
 * distinctes, révélées ligne par ligne avec un stagger) : le contenu
 * réel de Franck est une seule phrase, donc une seule ligne masquée —
 * plus de stagger, plus de multi-refs, plus de <br /> de point de
 * coupe mobile dédié (le texte s'enveloppe naturellement).
 *
 * Garde-fous du CLAUDE.md :
 * - l'état masqué (yPercent: 100) est posé par GSAP en JS uniquement,
 *   jamais en CSS : sans JS, le texte est lisible tout de suite, rien
 *   n'est parqué à opacity 0.
 * - prefers-reduced-motion : aucun état initial posé, rien ne bouge.
 */
export function RespirationReveal({ content }: RespirationRevealProps) {
  const triggerRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = triggerRef.current;
    const line = lineRef.current;
    if (!root || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(line, { yPercent: 100 });

      ScrollTrigger.create({
        trigger: root,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(line, {
            yPercent: 0,
            duration: 0.4,
            ease: VENTURIA_EASE,
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <p ref={triggerRef} className={styles.text}>
      <span className={styles.mask}>
        <span ref={lineRef} className={styles.line}>
          {content.before}
          <span className={styles.accent}>{content.accent}</span>
          {content.after}
        </span>
      </span>
    </p>
  );
}
