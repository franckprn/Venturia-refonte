"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { VENTURIA_EASE } from "@/lib/ease";
import { markHeroTitleDone } from "@/lib/heroTitleSignal";
import { hero } from "@/content/hero";
import styles from "./hero.module.css";

gsap.registerPlugin(SplitText);

/**
 * Le h1 (élément LCP quasi certain de la page), le sous-titre et la
 * ligne de CTA — coordonnés dans un seul composant client parce que
 * leur entrée est chronométrée les uns par rapport aux autres.
 *
 * Garde-fous du CLAUDE.md, dans l'ordre de priorité donné :
 * - le h1 est peint à 100 % d'opacité dès le premier rendu (rien de
 *   parqué à opacity 0, ni en CSS ni en JS, ici ou ailleurs) ;
 * - l'entrée du h1 se fait uniquement en transform : SplitText avec
 *   `mask: "words"` enveloppe chaque mot dans un cache à
 *   overflow: clip, et c'est le mot (pas le cache) qui translate —
 *   aucun fondu ;
 * - démarrage immédiat au montage : pas de ScrollTrigger, pas de delay,
 *   pas d'attente des polices ;
 * - prefers-reduced-motion : rien n'est découpé, rien n'est animé, le
 *   texte est simplement là.
 *
 * Sous-titre et CTA montent de 16px, fondu compris (ce ne sont pas
 * l'élément LCP), 200ms après le début de l'animation du h1.
 *
 * `onComplete` du tween du h1 appelle `markHeroTitleDone()`
 * (src/lib/heroTitleSignal.ts) : c'est le signal sur lequel le carton 1
 * du rail se branche pour démarrer l'animation de son horloge
 * (CLAUDE.md, « Rail droit ») — jamais un délai estimé. Cet effet
 * entier est sauté en prefers-reduced-motion, donc le signal ne part
 * jamais dans ce cas non plus : pas d'animation d'horloge.
 */
export function HeroReveal() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const actionsEl = actionsRef.current;
    if (!titleEl || !subtitleEl || !actionsEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(titleEl, {
        type: "words",
        mask: "words",
        wordsClass: "hero-word",
        aria: "auto",
      });
      // Filet de sécurité : re-marquer « Bien plus » même si SplitText
      // a aplati le <span> imbriqué — la classe ne porte plus de
      // couleur (h1 entièrement --ink), gardée pour ne pas changer le
      // découpage.
      split.words.slice(0, 2).forEach((w) => w.classList.add(styles.accent));

      gsap.set(split.words, { yPercent: 100 });
      gsap.set([subtitleEl, actionsEl], { autoAlpha: 0, y: 16 });

      gsap.to(split.words, {
        yPercent: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: VENTURIA_EASE,
        onComplete: markHeroTitleDone,
      });

      gsap.to([subtitleEl, actionsEl], {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        delay: 0.2,
        ease: VENTURIA_EASE,
      });
    }, titleEl);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <>
      <h1 id="hero-title" ref={titleRef} className={styles.title}>
        <span className={styles.accent}>{hero.titleAccent}</span>{" "}
        {hero.titleLine1Rest}
        <br />
        {hero.titleLine2}
      </h1>

      <p ref={subtitleRef} className={styles.subtitle}>
        {hero.subtitle}
      </p>

      <div ref={actionsRef} className={styles.actions}>
        <Link href={hero.ctaSecondary.href} className={styles.ctaSecondary}>
          <svg
            className={styles.ctaArrow}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 2.5V13M3.5 9L8 13.5L12.5 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {hero.ctaSecondary.label}
        </Link>
      </div>
    </>
  );
}
