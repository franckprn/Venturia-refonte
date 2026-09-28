"use client";

import { ArrowLink } from "@/components/ArrowLink";
import { useScrollReveal } from "@/components/ScrollReveal";
import type { ServiceOtherExpertisesBlock } from "@/content/services/types";
import styles from "./ServiceOtherExpertises.module.css";

/**
 * Bloc 7 des pages /services/* — label sur l'axe gauche, 3 éléments en
 * tiers (colonnes 1, 5, 9). Liens vers des pages /services/* pas encore
 * créées (référencement, publicité, site internet) : exception assumée,
 * comme sur la home (CLAUDE.md, « Services (home) » § « AVANT MISE EN
 * LIGNE ») — 404 de préchargement normaux tant qu'elles n'existent pas.
 */
export function ServiceOtherExpertises({ label, items }: ServiceOtherExpertisesBlock) {
  const { containerRef, setItemRef } = useScrollReveal<HTMLDivElement>(items.length);

  return (
    <>
      <p className={styles.label}>{label}</p>
      <div ref={containerRef} className={styles.grid}>
        {items.map((item, i) => (
          <div key={item.href} ref={setItemRef(i)} className={styles.item}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.phrase}>{item.phrase}</p>
            <ArrowLink href={item.href} label={item.ctaLabel} direction="right" />
          </div>
        ))}
      </div>
    </>
  );
}
