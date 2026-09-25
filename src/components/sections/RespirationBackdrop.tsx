"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import { setLiveTone } from "@/lib/tone";

gsap.registerPlugin(ScrollTrigger);

const SECTION_ID = "respiration";
const TWEEN_DURATION = 0.4;

/**
 * Bascule crème ↔ charbon plein écran pendant que Respiration occupe
 * l'écran (CLAUDE.md, « Respiration ») — ne rend AUCUN DOM (composant
 * de logique pure, `return null`) : anime directement
 * `document.documentElement`/`document.body`, PAS un calque
 * `position: fixed` séparé.
 *
 * Pourquoi pas un calque séparé — bug réel mesuré, pas une précaution
 * théorique (voir le diagnostic du prompt qui a corrigé ceci) : un
 * `position: fixed` (même `z-index: auto`, même en tout premier enfant
 * de `<body>`) crée TOUJOURS son propre contexte d'empilement (steps
 * CSS 2.1 Appendix E), qui se classe dans le niveau des éléments
 * POSITIONNÉS (« step 6 »), TOUJOURS peint APRÈS le contenu normal non
 * positionné (« step 3 ») — quel que soit son ordre dans le DOM. Un tel
 * calque, même transparent-visuellement (couleur confondue avec le
 * fond), peint donc PAR-DESSUS tout le texte normal de la page
 * (labels/titres non animés d'Inoko, Services, Processus…), le rendant
 * invisible bien qu'il reste 100 % correct dans le DOM/CSSOM (opacity:
 * 1, visibility: visible, couleur correcte — rien de visible dans les
 * DevTools, seul un rendu pixel le révèle). Un z-index négatif ne
 * corrige pas non plus : la boîte de `<body>` (son propre fond, requis
 * par ailleurs pour le rebond de scroll iOS, CLAUDE.md « Détails
 * faciles à oublier ») peint alors PAR-DESSUS le calque, qui reste
 * invisible quelle que soit sa couleur. Aucune valeur de z-index ne
 * peut concilier « sous le contenu normal » ET « sur le fond de
 * `<body>` » pour un élément `position: fixed` séparé — le seul moyen
 * d'y échapper (isoler `<main>`/`.shell` dans son propre contexte
 * d'empilement) casserait à son tour « le carton du rail passe
 * au-dessus du bloc nav » (CLAUDE.md, « Rail droit »), qui dépend
 * justement d'un empilement plat, sans contexte intermédiaire, entre
 * le carton (z-index 65) et la nav (58-60).
 *
 * Animer directement le fond de `<html>`/`<body>` contourne le problème
 * à la racine : un `background-color` est peint AVANT toute la
 * hiérarchie d'empilement (c'est le fond de la boîte racine elle-même,
 * jamais un concurrent d'empilement) — aucun z-index, aucun contexte
 * d'empilement, donc aucun risque de repasser par-dessus le contenu.
 * Les deux (`html` ET `body`) sont animés ensemble : `html` porte le
 * fond du CANVAS (rebond de scroll iOS), `body` son propre fond en
 * dessous du contenu normal — les deux doivent rester synchronisés.
 *
 * Seuils, symétriques et réversibles dans les deux sens de défilement —
 * ScrollTrigger, la seule bascule du projet à en avoir réellement
 * besoin (une transition RÉVERSIBLE liée au défilement, contrairement
 * aux révélations `once: true` du reste du site) :
 *   - haut de la section aligné sur le haut de la fenêtre ("top top") :
 *     Respiration COMMENCE à occuper tout l'écran — sa boîte totale
 *     dépasse toujours 100svh (padding 128/200 des deux côtés,
 *     `box-sizing: content-box`, respiration.module.css), donc son bas
 *     reste sous le bas de la fenêtre à cet instant précis → bascule
 *     vers --ink.
 *   - bas de la section aligné sur le bas de la fenêtre ("bottom
 *     bottom") : dernier instant où elle occupe encore tout l'écran,
 *     juste avant que Services n'apparaisse par le bas → bascule vers
 *     --ground.
 * Le texte de Respiration vit sous 128/200px de padding-top : il
 * n'entre jamais dans la fenêtre avant que ces seuils soient franchis,
 * donc jamais de texte clair sur un fond encore crème pendant la
 * bascule (voir RespirationReveal pour la couleur du texte lui-même).
 * onEnter/onLeave couvrent la descente, onEnterBack/onLeaveBack la
 * remontée — mêmes callbacks, sens inverse.
 *
 * Couleurs lues sur les tokens (`getComputedStyle`, --ground/--ink) au
 * lieu d'un hex en dur : suit tout changement futur de la palette
 * (CLAUDE.md, « Couleurs » — jamais une valeur figée dérivée d'un
 * token).
 *
 * `setLiveTone("respiration", …)` (src/lib/tone.ts), dans les MÊMES
 * callbacks : la section reste `tone="dark"` en dur dans le JSX
 * (page.tsx — le carton 1 du rail entre autres s'ancre dessus, CLAUDE.md
 * « Rail droit »), mais son fond RÉEL ne devient charbon qu'entre ces
 * deux seuils précis. Sans ce correctif, la nav (et tout autre abonné
 * de `src/lib/tone.ts` — cartons, pile mobile) bascule au franchissement
 * du HAUT de la section (mesure indépendante, son propre seuil),
 * PLUS TÔT que la bascule réelle du fond : un texte clair passait sur un
 * fond encore crème le temps de l'écart (mesuré ~32px de scroll, la
 * moitié de la hauteur de la nav). `setLiveTone` synchronise nav/cartons/
 * pile sur CE seuil exact, à la frame près.
 *
 * Garde-fous CLAUDE.md : `gsap.context(() => {})` (jamais sans
 * fonction — le piège documenté, voir « Rail droit »), état initial en
 * `gsap.set`, jamais `autoAlpha` (on anime `backgroundColor`, pas une
 * opacité), `overwrite: true` sur chaque tween (une bascule qui
 * interrompt l'autre — remontée à mi-fondu — repart proprement, sans
 * saut), un seul easing (`VENTURIA_EASE`). `prefers-reduced-motion` :
 * bascule immédiate aux mêmes seuils (`gsap.set`), sans transition.
 * Chargement en milieu de scroll (lien direct, recharge) : si la page
 * démarre alors que Respiration occupe déjà l'écran, `ScrollTrigger` ne
 * rejoue pas `onEnter` (le seuil est déjà franchi à la création) — l'état
 * initial est donc aligné sur `trigger.isActive`, sans transition, même
 * traitement que reduced-motion.
 */
export function RespirationBackdrop() {
  useEffect(() => {
    const section = document.getElementById(SECTION_ID);
    if (!section) return;

    const targets: [HTMLElement, HTMLElement] = [document.documentElement, document.body];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootStyle = getComputedStyle(document.documentElement);
    const cream = rootStyle.getPropertyValue("--ground").trim();
    const charcoal = rootStyle.getPropertyValue("--ink").trim();

    const ctx = gsap.context(() => {
      gsap.set(targets, { backgroundColor: cream });

      const toCharcoal = () => {
        setLiveTone(SECTION_ID, "dark");
        if (reduced) {
          gsap.set(targets, { backgroundColor: charcoal });
          return;
        }
        gsap.to(targets, {
          backgroundColor: charcoal,
          duration: TWEEN_DURATION,
          ease: VENTURIA_EASE,
          overwrite: true,
        });
      };

      const toCream = () => {
        setLiveTone(SECTION_ID, "light");
        if (reduced) {
          gsap.set(targets, { backgroundColor: cream });
          return;
        }
        gsap.to(targets, {
          backgroundColor: cream,
          duration: TWEEN_DURATION,
          ease: VENTURIA_EASE,
          overwrite: true,
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onEnter: toCharcoal,
        onEnterBack: toCharcoal,
        onLeave: toCream,
        onLeaveBack: toCream,
      });

      if (trigger.isActive) {
        setLiveTone(SECTION_ID, "dark");
        gsap.set(targets, { backgroundColor: charcoal });
      } else {
        setLiveTone(SECTION_ID, "light");
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
