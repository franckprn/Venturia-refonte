"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import styles from "./hero.module.css";

gsap.registerPlugin(SplitText, CustomEase);
// L'unique easing du projet : cubic-bezier(0, .55, .45, 1).
CustomEase.create("venturia", "M0,0 C0,0.55 0.45,1 1,1");

/**
 * Le seul <h1> de la page. SplitText découpe des <span> à l'intérieur du
 * h1 et fait remonter les mots un par un.
 *
 * Garde-fous du CLAUDE.md :
 * - le <h1> est rendu plein et visible en CSS ; rien n'est parqué à
 *   opacity 0. Si le JS ne charge pas, le titre s'affiche normalement.
 * - l'animation ne touche jamais le <h1> (élément LCP), seulement ses
 *   mots-enfants créés par SplitText après le premier paint.
 * - prefers-reduced-motion : aucun découpage, aucune animation.
 */
export function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: "words",
        wordsClass: "hero-word",
        aria: "auto",
      });
      // Filet de sécurité : garder « mieux référencé » en rouge même si
      // SplitText a aplati le <span> imbriqué.
      split.words.slice(-2).forEach((w) => w.classList.add(styles.accent));

      gsap.from(split.words, {
        yPercent: 120,
        autoAlpha: 0,
        duration: 0.4,
        ease: "venturia",
        stagger: 0.05,
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <h1 id="hero-title" ref={ref} className={styles.title}>
      Votre concurrent n&apos;est pas meilleur que vous. Il est{" "}
      <span className={styles.accent}>mieux référencé.</span>
    </h1>
  );
}
