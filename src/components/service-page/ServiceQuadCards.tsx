"use client";

import { useScrollReveal } from "@/components/ScrollReveal";
import type { ServiceQuadBlock } from "@/content/services/types";
import styles from "./ServiceQuadCards.module.css";

/**
 * Bloc 2 des pages /services/* — label + h2 sur l'axe gauche, puis 4
 * cartes réparties en quarts (colonnes 1, 4, 7, 10 — CLAUDE.md, « Règle
 * des deux axes », l'exception « série d'éléments égaux »). Trait 1px
 * --line au-dessus de CHAQUE carte (comme .row dans services.module.css,
 * home) : un repère par carte, pas un séparateur entre sections.
 */
export function ServiceQuadCards({ label, title, cards, headingId }: ServiceQuadBlock & { headingId: string }) {
  const { containerRef, setItemRef } = useScrollReveal<HTMLDivElement>(cards.length);

  return (
    <>
      <p className={styles.label}>{label}</p>
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
      <div ref={containerRef} className={styles.grid}>
        {cards.map((card, i) => (
          <div key={card.title} ref={setItemRef(i)} className={styles.card}>
            <p className={styles.cardTitle}>{card.title}</p>
            <p className={styles.cardText}>{card.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
