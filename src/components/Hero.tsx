import styles from "./hero.module.css";
import { HeroTitle } from "./HeroTitle";

// Hero de la home — aucune image, la composition tient sur la typographie.
// Toute la copy sauf le titre et le sous-titre est provisoire ; les
// libellés de CTA et le statut de disponibilité sont rendus en
// placeholder visible et seront arbitrés par Franck.
export function Hero() {
  return (
    <div className={styles.hero}>
      <p className={styles.badge}>
        <span className={styles.badgeDot} aria-hidden="true" />
        [DISPONIBILITÉ À FOURNIR]
      </p>

      <HeroTitle />

      <p className={styles.subtitle}>
        Un seul interlocuteur : il conçoit, il construit, et il répond.
      </p>

      <div className={styles.actions}>
        <button type="button" className={`${styles.cta} ${styles.ctaPrimary}`}>
          [CTA PRINCIPAL]
        </button>
        <button
          type="button"
          className={`${styles.cta} ${styles.ctaSecondary}`}
        >
          [CTA SECONDAIRE]
        </button>
      </div>
    </div>
  );
}
