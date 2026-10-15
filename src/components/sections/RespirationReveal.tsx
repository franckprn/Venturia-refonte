"use client";

import { useRef } from "react";
import { useRespirationInversion, useRespirationLineReveal } from "@/lib/respiration";
import type { RespirationContent } from "@/content/respiration";
import styles from "./respiration.module.css";

type RespirationRevealProps = {
  content: RespirationContent;
};

// Fin de l'inversion : bas de la section Services à 80 % de la hauteur
// de la fenêtre — Processus occupe alors 20 % de l'écran au moment de
// la rebascule (CLAUDE.md, « Respiration (home) »). Constante de module :
// une référence stable, l'effet du hook ne se relance pas à chaque rendu.
const INVERSION_END = { endTrigger: "#services", end: "bottom 80%" };

/**
 * Révélation unique à l'entrée dans le viewport (ligne masquée) +
 * inversion de toute la page — mécanismes dans `src/lib/respiration.ts`
 * (`useRespirationLineReveal`/`useRespirationInversion`), partagés avec
 * la bande rouge des pages services (ServiceRedBand.tsx, variante
 * accent).
 *
 * L'inversion couvre Respiration ET Services : début au haut du texte à
 * 80 % de la fenêtre (inchangé), fin au bas de Services à 80 %
 * (INVERSION_END). Les deux sections déclarent `tone="light"` et n'ont
 * aucun fond propre : c'est l'échange --ink/--ground au niveau racine
 * qui les affiche crème sur charbon (CLAUDE.md, « Tonalités »).
 */
export function RespirationReveal({ content }: RespirationRevealProps) {
  const triggerRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useRespirationLineReveal(triggerRef, lineRef);
  useRespirationInversion(triggerRef, "ground", INVERSION_END);

  return (
    <p ref={triggerRef} className={styles.text}>
      <span className={styles.mask}>
        <span ref={lineRef} className={styles.line}>
          {content.text}
        </span>
      </span>
    </p>
  );
}
