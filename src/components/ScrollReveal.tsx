"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";

gsap.registerPlugin(ScrollTrigger);

/**
 * Révélation d'entrée générique — même mécanique que
 * components/sections/ServicesRowsReveal.tsx (home) : montée 16px +
 * fondu, stagger 60ms, 400ms, `ScrollTrigger` `start: "top 75%"`
 * (`once: true`), `prefers-reduced-motion` respecté. Extraite ici (pas
 * réutilisée depuis ServicesRowsReveal, propre à `Service[]`) pour que
 * les pages /services/* la partagent sans toucher à ce fichier de la
 * home — CLAUDE.md, « Pages services — gabarit ».
 *
 * Pas de wrapper : `containerRef` se pose sur l'ancêtre qui sert de
 * trigger, `setItemRef(i)` directement sur CHAQUE élément réel à
 * révéler (un <div> de plus autour casserait un `grid-column`/`grid-row`
 * posé sur cet élément lui-même). `opacity` seule, jamais `autoAlpha`
 * (CLAUDE.md/ServicesRowsReveal : un élément focusable doit rester
 * `visibility: visible` pour que Tab l'amène dans la vue et déclenche la
 * révélation).
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(count: number) {
  const containerRef = useRef<T | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const items = itemRefs.current.filter((el): el is HTMLElement => el !== null);
    if (!container || items.length !== count) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 16 });

      ScrollTrigger.create({
        trigger: container,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
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
  }, [count]);

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  return { containerRef, setItemRef };
}
