import type { ServiceQuadBlock } from "@/content/services/types";
import { ServiceQuadIllustration } from "./ServiceQuadIllustrations";
import styles from "./ServiceQuadCards.module.css";

/**
 * Bloc 2 des pages /services/* — label + h2 sur l'axe gauche, puis 4
 * cartes réparties en quarts (colonnes 1, 4, 7, 10 — CLAUDE.md, « Règle
 * des deux axes », l'exception « série d'éléments égaux »), chacune
 * précédée d'une illustration décorative (aria-hidden). Trait 1px
 * --line au-dessus de CHAQUE carte (comme .row dans services.module.css,
 * home) : un repère par carte, pas un séparateur entre sections.
 *
 * Statique (pas de useScrollReveal) : page construite dans son état
 * final, sans animation — CLAUDE.md, « Pages services — gabarit »,
 * l'entrée reviendra dans un prompt séparé.
 */
export function ServiceQuadCards({ label, title, cards, headingId }: ServiceQuadBlock & { headingId: string }) {
  return (
    <>
      <p className={styles.label}>{label}</p>
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
      <div className={styles.grid}>
        {cards.map((card, i) => (
          <div key={card.title} className={styles.item}>
            {card.illustration && (
              <div aria-hidden="true" data-service-quad-illustrations-end={i === 0 ? "" : undefined}>
                <ServiceQuadIllustration illustration={card.illustration} />
              </div>
            )}
            <div className={styles.card}>
              <p className={styles.cardTitle}>{card.title}</p>
              <p className={styles.cardText}>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
