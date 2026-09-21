"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Détecte, une seule fois, l'instant où un élément `position: sticky`
 * se fige contre son offset `top` — par MESURE directe
 * (getBoundingClientRect), pas par ScrollTrigger : CLAUDE.md (« Rail
 * droit ») signale que ScrollTrigger calcule parfois mal la position
 * d'un élément sticky.
 *
 * Principe : le CSS fixe déjà `top` en px (calc() résolu) sur
 * l'élément sticky. Tant qu'il n'est pas figé, il suit le document —
 * chaque pixel de scroll fait baisser son `rect.top` d'un pixel. Dès
 * qu'il atteint son `top` figé, sticky l'y bloque et `rect.top` cesse
 * de baisser. Comparer les deux repère donc le passage à l'état figé
 * au pixel près, sans dépendre d'une bibliothèque tierce ni d'un
 * calcul de position de ScrollTrigger.
 *
 * - Si la page est chargée alors que l'élément est déjà figé
 *   (rechargement en milieu de page), `onStick` n'est jamais appelé.
 * - Sinon, appelé une seule fois, au premier instant où
 *   `rect.top <= top figé` (+ 0.5px de marge pour l'arrondi
 *   sub-pixel). L'écouteur de scroll est retiré aussitôt après.
 * - Jamais rejoué ensuite, y compris en remontant au-dessus du point
 *   de figement puis en redescendant (CLAUDE.md, « Rail droit »).
 *
 * `enabled` à false désactive tout dès l'appelant (ex. carton 1, qui
 * n'utilise pas ce hook). En plus, le hook vérifie lui-même, une fois
 * au montage, le point de rupture desktop (animation DESKTOP
 * UNIQUEMENT, >= 1024px) et prefers-reduced-motion : sous 1024px ou en
 * mouvement réduit, aucun écouteur n'est posé, `onStick` n'est jamais
 * appelé.
 */
export function useStickOnce(
  ref: RefObject<HTMLElement | null>,
  onStick: () => void,
  enabled: boolean,
) {
  const onStickRef = useRef(onStick);
  useEffect(() => {
    onStickRef.current = onStick;
  }, [onStick]);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) return;

    const stickyTop = parseFloat(getComputedStyle(el).top);
    if (Number.isNaN(stickyTop)) return;

    let fired = false;
    let rafId: number | null = null;

    const check = () => {
      rafId = null;
      if (fired) return;
      if (el.getBoundingClientRect().top <= stickyTop + 0.5) {
        fired = true;
        window.removeEventListener("scroll", onScroll);
        onStickRef.current();
      }
    };

    // Déjà figé au montage (rechargement en milieu de page) : jamais
    // d'animation pour ce carton.
    if (el.getBoundingClientRect().top <= stickyTop + 0.5) {
      fired = true;
      return;
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
  }, [ref, enabled]);
}
