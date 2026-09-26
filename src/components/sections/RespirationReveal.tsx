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
 * Couleur du texte (CLAUDE.md « Respiration ») : plus de second effet
 * dédié ici — .text/.accent posent `color: var(--ink)` en CSS pur
 * (respiration.module.css), comme n'importe quelle autre section
 * « light » du site. C'est l'INVERSION DE TOUTE LA PAGE, pilotée par
 * l'effet ci-dessous (bascule `data-inverted` sur <html>), qui rend ce
 * texte crème sur fond charbon pendant la Respiration — rien à animer
 * localement.
 */
export function RespirationReveal({ content }: RespirationRevealProps) {
  const triggerRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

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

  /**
   * Inversion de toute la page (CLAUDE.md, « Respiration ») : bascule
   * `data-inverted="true"/"false"` sur `<html>` — `globals.css` échange
   * alors les VALEURS de `--ink`/`--ground` au niveau racine, ce qui
   * inverse automatiquement tout ce qui est construit sur ces deux
   * tokens (fonds, textes, traits, nav, cartons du rail, pile mobile,
   * fin de Dernier accompagnement, début de Services) — aucun de ces
   * composants n'a besoin de connaître l'inversion.
   *
   * Déclenchement sur le BLOC DE TEXTE lui-même (`root`, le même
   * élément que l'effet de révélation ci-dessus), PAS sur la section :
   *   - vers le charbon quand le HAUT du texte passe au-dessus de 80 %
   *     de la hauteur de la fenêtre : `start: "top 80%"`.
   *   - retour au crème quand le BAS du texte passe au-dessus de 20 %
   *     de la hauteur de la fenêtre : `end: "bottom 20%"`.
   * onEnter/onEnterBack inversent, onLeave/onLeaveBack reviennent —
   * comportement symétrique en remontant.
   *
   * Transition : posée en CSS pur (globals.css, `--ink`/`--ground`
   * déclarées avec `@property`, transitionnables). État initial posé
   * SANS transition (`trigger.isActive` au montage, pour un chargement
   * en milieu de scroll) puis la transition est armée un frame plus
   * tard (`data-tone-transition`, voir globals.css) — sans ce délai, la
   * toute première bascule animerait depuis l'état par défaut au lieu
   * de démarrer directement dans le bon état (même raisonnement que
   * `gsap.set` avant `gsap.to` ailleurs dans le projet).
   * `prefers-reduced-motion` : couvert par la règle globale existante
   * (transition-duration: 0.01ms), aucune branche séparée nécessaire —
   * cet effet ne fait plus que poser un attribut, la CSS s'occupe du
   * reste. Aucune différence de mise en page entre les deux modes
   * (l'ancien mécanisme à base de min-height/padding est parti avec la
   * bascule locale).
   *
   * Nettoyage au démontage : retire les deux attributs de <html> — la
   * Respiration ne vit que sur la home, un changement de page ne doit
   * jamais laisser la page inversée.
   */
  useEffect(() => {
    const text = triggerRef.current;
    if (!text) return;

    const html = document.documentElement;

    const ctx = gsap.context(() => {
      const setInverted = (inverted: boolean) => {
        html.setAttribute("data-inverted", inverted ? "true" : "false");
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
      html.removeAttribute("data-inverted");
      html.removeAttribute("data-tone-transition");
    };
  }, []);

  return (
    <p ref={triggerRef} className={styles.text}>
      <span className={styles.mask}>
        <span ref={lineRef} className={styles.line}>
          {content.before}
          <span className={styles.accent}>{content.accent}</span>
          {content.after}
        </span>
      </span>
    </p>
  );
}
