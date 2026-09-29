"use client";

import { useRef } from "react";
import { useRespirationLineReveal, useRespirationInversion } from "@/lib/respiration";
import type { RespirationContent } from "@/content/respiration";
import styles from "./respiration.module.css";

type RespirationRevealProps = {
  content: RespirationContent;
};

/**
 * Révélation unique à l'entrée dans le viewport + inversion de toute la
 * page pendant la lecture — le mécanisme lui-même (seuils, durée,
 * easing, reduced-motion) vit dans `src/lib/respiration.ts`
 * (`useRespirationLineReveal`/`useRespirationInversion`), réutilisé SANS
 * duplication par la bande rouge de la page Automatisation
 * (ServiceRedBand.tsx, `invertTo="accent"`) — ce composant appelle les
 * deux hooks avec leurs valeurs par défaut (`invertTo="ground"`),
 * comportement BYTE-IDENTIQUE à avant cette extraction (CLAUDE.md,
 * « Pages services — gabarit »).
 *
 * Simplifié depuis une ancienne version à trois blocs (trois phrases
 * distinctes, révélées ligne par ligne avec un stagger) : le contenu
 * réel de Franck est une seule phrase, donc une seule ligne masquée —
 * plus de stagger, plus de multi-refs, plus de <br /> de point de
 * coupe mobile dédié (le texte s'enveloppe naturellement).
 *
 * Couleur du texte (CLAUDE.md « Respiration ») : plus de second effet
 * dédié ici — .text/.accent posent `color: var(--ink)` en CSS pur
 * (respiration.module.css), comme n'importe quelle autre section
 * « light » du site. C'est l'INVERSION DE TOUTE LA PAGE (hook
 * `useRespirationInversion`) qui rend ce texte crème sur fond charbon
 * pendant la Respiration — rien à animer localement.
 */
export function RespirationReveal({ content }: RespirationRevealProps) {
  const triggerRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useRespirationLineReveal(triggerRef, lineRef);
  useRespirationInversion(triggerRef);

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
