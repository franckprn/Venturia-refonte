"use client";

import { useEffect, useRef } from "react";

export type CrossEvent = { type: "enter" | "exit"; immediate: boolean };

/**
 * Détecte les franchissements d'un couple de seuils par le HAUT d'une
 * section (repérée par son id — celui posé par <Section name="…">),
 * exprimés en fraction de `window.innerHeight` — CLAUDE.md, « Rail
 * droit » § « Pile mobile », point 2 (cartons réversibles).
 *
 * ANTI-CLIGNOTEMENT : le seuil d'ENTRÉE (0.5) et le seuil de SORTIE
 * (0.6) sont volontairement différents — une hystérésis, pas un aller-
 * retour sur la même ligne. Le hook ne retient qu'un seul bit d'état,
 * `inside` (« actuellement compté comme entré ») : tant que `inside`
 * est faux, seul le franchissement du seuil d'entrée est testé ; une
 * fois vrai, seul celui du seuil de sortie l'est. Un micro-mouvement du
 * doigt qui oscille entre 50 % et 60 % ne retraverse donc JAMAIS le
 * seuil actif (l'autre est hors zone), et ne déclenche rien.
 *
 * Même principe de mesure directe que useStickOnce.ts (jamais
 * ScrollTrigger) : `getBoundingClientRect().top` comparé à une fraction
 * de la hauteur visible, recalculée à chaque frame de scroll (throttlé
 * par requestAnimationFrame), jamais une position mise en cache.
 *
 * - Chargement en milieu de scroll : bootstrap sur le seul seuil
 *   d'entrée (pas d'état antérieur à comparer) — `{ immediate: true }`
 *   si déjà franchi, sinon rien.
 * - `paused()` (pile dépliée) suspend tout : ni entrée ni sortie tant
 *   qu'elle répond vrai, y compris pour un scroll programmatique
 *   résiduel — CLAUDE.md : « aucun carton ne peut entrer ni sortir
 *   pendant ce temps ».
 * - `enabled` à false (viewport >= 1024px) désactive tout.
 */
export function useSectionHysteresis(
  sectionId: string,
  onCross: (event: CrossEvent) => void,
  enabled: boolean,
  paused: () => boolean,
) {
  const onCrossRef = useRef(onCross);
  useEffect(() => {
    onCrossRef.current = onCross;
  }, [onCross]);

  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (!enabled) return;
    const el = document.getElementById(sectionId);
    if (!el) return;

    const ENTER_RATIO = 0.5;
    const EXIT_RATIO = 0.6;

    let inside = false;
    let rafId: number | null = null;

    const check = () => {
      rafId = null;
      if (pausedRef.current()) return;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      if (!inside && top <= vh * ENTER_RATIO) {
        inside = true;
        onCrossRef.current({ type: "enter", immediate: false });
      } else if (inside && top >= vh * EXIT_RATIO) {
        inside = false;
        onCrossRef.current({ type: "exit", immediate: false });
      }
    };

    // Chargement en milieu de scroll : bootstrap sur le seuil d'entrée
    // seul, sans animation (aucun état antérieur avec lequel comparer).
    const initialTop = el.getBoundingClientRect().top;
    if (initialTop <= window.innerHeight * ENTER_RATIO) {
      inside = true;
      onCrossRef.current({ type: "enter", immediate: true });
    }

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [enabled, sectionId]);
}
