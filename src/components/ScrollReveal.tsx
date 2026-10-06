"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";

gsap.registerPlugin(ScrollTrigger);

export type ScrollRevealOptions = {
  /** Seuil ScrollTrigger. Défaut : "top 75%" (comportement d'origine). */
  start?: string;
  /** Durée du tween, en secondes. Défaut : 0.4 (comportement d'origine). */
  duration?: number;
  /** Décalage de montée, en px, 0 pour une pure apparition en place
   *  (sans translation) — ex. le bloc Inoko, des carrés qui « s'allument »
   *  plutôt qu'une liste qui monte. Défaut : 16 (comportement d'origine). */
  y?: number;
  /** Décalage entre deux éléments, en secondes. Défaut : 0.06
   *  (comportement d'origine). */
  stagger?: number;
};

/**
 * Révélation d'entrée générique — même mécanique que
 * components/sections/ServicesRowsReveal.tsx (home) : montée + fondu,
 * `ScrollTrigger` (`once: true`), `prefers-reduced-motion` respecté.
 * Extraite ici (pas réutilisée depuis ServicesRowsReveal, propre à
 * `Service[]`) pour que les pages /services/* la partagent sans toucher
 * à ce fichier de la home — CLAUDE.md, « Pages services — gabarit ».
 * Seuil/durée/translation/décalage paramétrables (`options`), à
 * défauts identiques au comportement d'origine (`top 75%`, 400ms,
 * y:16, stagger 60ms) — tout appelant existant qui n'en passe aucun
 * garde un rendu inchangé.
 *
 * Pas de wrapper : `containerRef` se pose sur l'ancêtre qui sert de
 * trigger, `setItemRef(i)` directement sur CHAQUE élément réel à
 * révéler (un <div> de plus autour casserait un `grid-column`/`grid-row`
 * posé sur cet élément lui-même). `opacity` seule, jamais `autoAlpha`
 * (CLAUDE.md/ServicesRowsReveal : un élément focusable doit rester
 * `visibility: visible` pour que Tab l'amène dans la vue et déclenche la
 * révélation).
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  count: number,
  options?: ScrollRevealOptions,
) {
  const containerRef = useRef<T | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const start = options?.start ?? "top 75%";
  const duration = options?.duration ?? 0.4;
  const y = options?.y ?? 16;
  const stagger = options?.stagger ?? 0.06;

  useEffect(() => {
    const container = containerRef.current;
    const items = itemRefs.current.filter((el): el is HTMLElement => el !== null);
    if (!container || items.length !== count) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: container,
        start,
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: VENTURIA_EASE,
            onComplete: () => {
              // opacity posée en style inline par GSAP l'emporterait
              // sinon sur une règle CSS future (même précaution que
              // ServicesRowsReveal.tsx).
              gsap.set(items, { clearProps: "opacity" });
            },
          });
        },
      });
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, start, duration, y, stagger]);

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  return { containerRef, setItemRef };
}
