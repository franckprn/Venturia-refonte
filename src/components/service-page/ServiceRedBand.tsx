"use client";

import { useRef } from "react";
import { ArrowLink } from "@/components/ArrowLink";
import { useRespirationLineReveal, useRespirationInversion } from "@/lib/respiration";
import respirationStyles from "@/components/sections/respiration.module.css";
import type { ServiceRedBandBlock } from "@/content/services/types";
import styles from "./ServiceRedBand.module.css";

/**
 * Bloc 4 des pages /services/* — « Respiration rouge » : MÊME mécanisme
 * que la Respiration de la home (`src/lib/respiration.ts` — seuils,
 * durée, easing, reduced-motion identiques), seule différence : la page
 * bascule vers `--accent` (pas `--color-charcoal`) et le texte reste
 * `--ink` en permanence (`invertTo="accent"`, jamais `invertInk`, voir
 * `useRespirationInversion`). `tone="light"` (page.tsx) comme la
 * Respiration home : la section n'a pas de tonalité « accent » propre —
 * c'est l'inversion qui fait apparaître le rouge, pas un fond statique.
 * Aucun carton du rail par-dessus (page.tsx n'ancre aucun <RailSlot> ici,
 * comme la Respiration home).
 *
 * Contrairement à la Respiration home (une seule phrase), ce bloc garde
 * son titre + texte + CTA (contenu inchangé, décision de Franck) : seul
 * le H2 porte la révélation en ligne masquée (même classes `.mask`/
 * `.line`, réutilisées depuis respiration.module.css plutôt que
 * dupliquées) et sert de déclencheur à l'inversion — texte et CTA
 * restent statiques, comme le reste du gabarit.
 */
export function ServiceRedBand({ title, text, cta }: ServiceRedBandBlock) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useRespirationLineReveal(titleRef, lineRef);
  useRespirationInversion(titleRef, "accent");

  return (
    <>
      <h2 id="service-redband-title" ref={titleRef} className={styles.title}>
        <span className={respirationStyles.mask}>
          <span ref={lineRef} className={respirationStyles.line}>
            {title}
          </span>
        </span>
      </h2>
      <p className={styles.text}>{text}</p>
      <ArrowLink href={cta.href} label={cta.label} direction="right" className={styles.cta} />
    </>
  );
}
