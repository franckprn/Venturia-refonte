"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mécanique de la Respiration (CLAUDE.md, « Respiration (home) »),
 * extraite de RespirationReveal.tsx pour être réutilisée SANS dupliquer
 * la logique (seuils, durée, easing, reduced-motion) par une page qui a
 * besoin d'une couleur cible différente — aujourd'hui la home
 * (RespirationReveal.tsx, `invertTo="ground"` implicite, comportement
 * byte-identique à avant cette extraction) et la bande rouge de la page
 * Automatisation (ServiceRedBand.tsx, `invertTo="accent"`). Les DEUX
 * hooks ci-dessous portent l'intégralité du mécanisme ; seule la couleur
 * cible et le fait d'inverser ou non le texte (`invertTo`) varient d'un
 * appelant à l'autre.
 */

/**
 * Révélation d'entrée : la ligne masquée translate de 100% vers 0
 * (`ScrollTrigger`, `start: "top 75%"`, `once: true`), jamais de fondu.
 * État masqué posé en JS uniquement (jamais en CSS) : sans JS, le texte
 * est lisible tout de suite. `prefers-reduced-motion` : aucun état
 * initial posé, rien ne bouge.
 */
export function useRespirationLineReveal(
  rootRef: RefObject<HTMLElement | null>,
  lineRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** "ground" (défaut, home) : --ink ET --ground échangent leurs valeurs
 *  littérales (attribut `data-inverted`, règle déjà en place dans
 *  globals.css) — comportement d'origine, inchangé. "accent" : SEUL
 *  --ground bascule vers `var(--accent)` (attribut `data-inverted-accent`,
 *  règle ADDITIVE dans globals.css) — --ink reste fixe, le texte ne
 *  s'inverse jamais (CLAUDE.md, « Pages services — gabarit »). */
export type RespirationInvertTo = "ground" | "accent";

const INVERT_ATTRIBUTE: Record<RespirationInvertTo, string> = {
  ground: "data-inverted",
  accent: "data-inverted-accent",
};

/**
 * Inversion de toute la page pendant que le bloc de texte est dans sa
 * fenêtre de lecture : bascule l'attribut correspondant à `invertTo` sur
 * `<html>` — la règle CSS qui lui correspond (globals.css) échange alors
 * les valeurs des custom properties concernées, ce qui inverse
 * automatiquement tout ce qui est construit dessus (fonds, textes,
 * traits, nav, cartons du rail…) sans qu'aucun de ces composants n'ait
 * besoin de connaître l'inversion.
 *
 * Déclenchement sur le BLOC DE TEXTE lui-même (`rootRef`), PAS sur la
 * section :
 *   - vers l'état inversé quand le HAUT du texte passe au-dessus de 80 %
 *     de la hauteur de la fenêtre : `start: "top 80%"`.
 *   - retour à l'état normal quand le BAS du texte passe au-dessus de
 *     20 % de la hauteur de la fenêtre : `end: "bottom 20%"`.
 * onEnter/onEnterBack inversent, onLeave/onLeaveBack reviennent —
 * comportement symétrique en remontant.
 *
 * Chargement en milieu de scroll : `trigger.isActive` fixe l'état
 * initial SANS transition, armée un frame plus tard
 * (`data-tone-transition`, globals.css) — la transition n'anime donc
 * jamais le tout premier rendu. `prefers-reduced-motion` : couvert par
 * la règle globale existante (transition-duration: 0.01ms).
 *
 * Nettoyage au démontage : retire l'attribut et `data-tone-transition`
 * — un changement de page ne doit jamais laisser la page inversée.
 */
export function useRespirationInversion(
  rootRef: RefObject<HTMLElement | null>,
  invertTo: RespirationInvertTo = "ground",
) {
  useEffect(() => {
    const text = rootRef.current;
    if (!text) return;

    const html = document.documentElement;
    const attribute = INVERT_ATTRIBUTE[invertTo];

    const ctx = gsap.context(() => {
      const setInverted = (inverted: boolean) => {
        html.setAttribute(attribute, inverted ? "true" : "false");
      };

      const trigger = ScrollTrigger.create({
        trigger: text,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setInverted(true),
        onEnterBack: () => setInverted(true),
        onLeave: () => setInverted(false),
        onLeaveBack: () => setInverted(false),
      });

      setInverted(trigger.isActive);
      requestAnimationFrame(() => {
        html.setAttribute("data-tone-transition", "on");
      });
    });

    return () => {
      ctx.revert();
      html.removeAttribute(attribute);
      html.removeAttribute("data-tone-transition");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invertTo]);
}
