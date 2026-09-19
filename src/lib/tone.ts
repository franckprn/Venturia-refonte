"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Tonalité d'une section (CLAUDE.md, « Tonalités ») : fond réel de la
 * section, déclarée par `<Section tone="...">` et lue en JS par la nav et
 * les cartons du rail pour piloter leur `--fg` (couleur de texte).
 */
export type Tone = "light" | "dark" | "accent";

/**
 * Tonalité de la toute première section des pages actuelles (home,
 * contact) : valeur de rendu serveur pour la nav et les cartons, pour
 * éviter tout flash de couleur et toute erreur d'hydratation. La nav vit
 * hors du Shell (layout.tsx, sœur de {children}) : elle ne peut pas lire
 * la vraie première section de la page en cours sans un contexte dédié —
 * figé ici tant que toutes les pages commencent par une section claire.
 * À faire évoluer (contexte porté par Shell) si une page future commence
 * par une section dark/accent.
 */
export const DEFAULT_TONE: Tone = "light";

type Bound = { top: number; tone: Tone };

type Probe = {
  el: HTMLElement;
  last: Tone | null;
  onChange: (tone: Tone) => void;
};

/* ------------------------------------------------------------------ *
 * Moteur partagé, module-scope : un seul listener scroll (passif,
 * throttlé par requestAnimationFrame), un seul listener resize, un seul
 * ResizeObserver sur body — quel que soit le nombre d'abonnés (nav +
 * jusqu'à 3 cartons). Les positions des sections sont mises en cache
 * (recalculées au resize/ResizeObserver seulement), jamais mesurées à
 * chaque frame de scroll.
 * ------------------------------------------------------------------ */

let bounds: Bound[] = [];
const probes = new Set<Probe>();
let rafId: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let started = false;

function refreshBounds() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-tone]"));
  bounds = sections
    .map((el) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      return { top, tone: (el.dataset.tone as Tone) ?? DEFAULT_TONE };
    })
    .sort((a, b) => a.top - b.top);
}

/** Tonalité de la section dont le sommet est le dernier franchi avant
 *  `documentY` — les sections étant contiguës dans le flux, pas besoin
 *  de connaître leur bas. */
function toneAt(documentY: number): Tone {
  let tone = DEFAULT_TONE;
  for (const bound of bounds) {
    if (documentY < bound.top) break;
    tone = bound.tone;
  }
  return bounds.length > 0 ? tone : DEFAULT_TONE;
}

function runProbes() {
  rafId = null;
  const scrollY = window.scrollY;
  probes.forEach((probe) => {
    const rect = probe.el.getBoundingClientRect();
    const centerY = scrollY + rect.top + rect.height / 2;
    const tone = toneAt(centerY);
    if (tone !== probe.last) {
      probe.last = tone;
      probe.onChange(tone);
    }
  });
}

function scheduleRun() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(runProbes);
}

function refreshAndRun() {
  refreshBounds();
  scheduleRun();
}

function ensureStarted() {
  if (started) return;
  started = true;
  refreshBounds();
  window.addEventListener("scroll", scheduleRun, { passive: true });
  window.addEventListener("resize", refreshAndRun, { passive: true });
  resizeObserver = new ResizeObserver(refreshAndRun);
  resizeObserver.observe(document.body);
}

function teardown() {
  started = false;
  window.removeEventListener("scroll", scheduleRun);
  window.removeEventListener("resize", refreshAndRun);
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  bounds = [];
}

/**
 * Abonne un élément adaptatif (nav, carton du rail) au moteur de
 * tonalités : `onChange` est appelé chaque fois que la tonalité de la
 * section sous le centre vertical de `el` change. Retire les listeners
 * globaux dès que le dernier abonné se désinscrit.
 */
export function subscribeTone(el: HTMLElement, onChange: (tone: Tone) => void): () => void {
  ensureStarted();
  const probe: Probe = { el, last: null, onChange };
  probes.add(probe);
  scheduleRun();
  return () => {
    probes.delete(probe);
    if (probes.size === 0) teardown();
  };
}

/**
 * Tonalité vivante d'un élément adaptatif, tenue à jour par le moteur
 * partagé (voir `subscribeTone`). `initial` doit correspondre à la
 * tonalité posée côté serveur (voir `DEFAULT_TONE`) : l'état ne change
 * qu'après le montage (effet), jamais pendant le rendu — aucun risque
 * d'avertissement d'hydratation.
 */
export function useSectionTone(
  ref: RefObject<HTMLElement | null>,
  initial: Tone = DEFAULT_TONE,
): Tone {
  const [tone, setTone] = useState<Tone>(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return subscribeTone(el, setTone);
    // ref.current est stable pour la durée de vie du composant (élément
    // du DOM monté une fois) ; ref elle-même (l'objet) l'est aussi.
  }, [ref]);

  return tone;
}
