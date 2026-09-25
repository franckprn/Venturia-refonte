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

const SECTION_ID = "respiration";
const TONE_TWEEN_DURATION = 0.4;

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
 *
 * Couleur du texte (--ink ↔ --ground, CLAUDE.md « Respiration ») : un
 * second effet, INDÉPENDANT de la révélation ci-dessus (celle-ci ne
 * joue qu'une fois ; la couleur, elle, doit rester réversible tant que
 * l'utilisateur défile). Même trigger, mêmes seuils EXACTS que
 * <RespirationBackdrop> (le `<section>` parent, "top top"/"bottom
 * bottom") pour rester synchronisé avec le fond dans les deux sens —
 * deux ScrollTrigger indépendants plutôt qu'un état partagé, mais
 * calculés à l'identique donc synchrones. `prefers-reduced-motion` :
 * contrairement à la révélation, CET effet reste actif (la couleur doit
 * suivre le fond à tout moment, pas seulement à l'entrée) — seul le
 * tween devient un `gsap.set` immédiat.
 */
export function RespirationReveal({ content }: RespirationRevealProps) {
  const triggerRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    const root = triggerRef.current;
    const accent = accentRef.current;
    const section = document.getElementById(SECTION_ID);
    if (!root || !accent || !section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootStyle = getComputedStyle(document.documentElement);
    const ink = rootStyle.getPropertyValue("--ink").trim();
    const ground = rootStyle.getPropertyValue("--ground").trim();

    const ctx = gsap.context(() => {
      gsap.set(root, { color: ink });
      gsap.set(accent, { color: ink, textDecorationColor: ink });

      const toGround = () => {
        if (reduced) {
          gsap.set(root, { color: ground });
          gsap.set(accent, { color: ground, textDecorationColor: ground });
          return;
        }
        gsap.to(root, { color: ground, duration: TONE_TWEEN_DURATION, ease: VENTURIA_EASE, overwrite: true });
        gsap.to(accent, {
          color: ground,
          textDecorationColor: ground,
          duration: TONE_TWEEN_DURATION,
          ease: VENTURIA_EASE,
          overwrite: true,
        });
      };

      const toInk = () => {
        if (reduced) {
          gsap.set(root, { color: ink });
          gsap.set(accent, { color: ink, textDecorationColor: ink });
          return;
        }
        gsap.to(root, { color: ink, duration: TONE_TWEEN_DURATION, ease: VENTURIA_EASE, overwrite: true });
        gsap.to(accent, {
          color: ink,
          textDecorationColor: ink,
          duration: TONE_TWEEN_DURATION,
          ease: VENTURIA_EASE,
          overwrite: true,
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onEnter: toGround,
        onEnterBack: toGround,
        onLeave: toInk,
        onLeaveBack: toInk,
      });

      if (trigger.isActive) {
        gsap.set(root, { color: ground });
        gsap.set(accent, { color: ground, textDecorationColor: ground });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <p ref={triggerRef} className={styles.text}>
      <span className={styles.mask}>
        <span ref={lineRef} className={styles.line}>
          {content.before}
          <span ref={accentRef} className={styles.accent}>
            {content.accent}
          </span>
          {content.after}
        </span>
      </span>
    </p>
  );
}
