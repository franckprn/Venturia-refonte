import type { ServiceStep } from "@/content/services/types";
import styles from "./ServiceStepsThirds.module.css";

type ServiceStepsThirdsProps = {
  steps: ServiceStep[];
  /** Index à partir duquel le numéro passe en --accent (le reste en
   *  --ink) — bloc 3 : 01-02 --ink, 03-06 --accent (`accentFrom={2}`).
   *  Omis : tous les numéros restent --ink, comme les étapes du
   *  Processus (home). */
  accentFrom?: number;
};

/**
 * Schéma en tiers (colonnes 1, 5, 9 — CLAUDE.md, « Règle des deux axes »,
 * exception « série d'éléments égaux »), même style que les étapes du
 * Processus (home, processus.module.css `.step`/`.stepHeading`/
 * `.stepDescription`) : numéro + libellé en JetBrains Mono, description
 * en corps. Autant de lignes de tiers que nécessaire selon l'appelant.
 * Ni label ni titre ici : posés par le composant appelant (chaque bloc a
 * son propre agencement d'axe pour son en-tête).
 *
 * Statique (pas de useScrollReveal) : page construite dans son état
 * final, sans animation — l'entrée reviendra dans un prompt séparé
 * (CLAUDE.md, « Pages services — gabarit »).
 */
export function ServiceStepsThirds({ steps, accentFrom }: ServiceStepsThirdsProps) {
  return (
    <div className={styles.steps}>
      {steps.map((step, i) => (
        <div key={step.number} className={styles.step}>
          <p className={styles.stepHeading}>
            <span
              className={styles.stepNumber}
              data-accent={accentFrom !== undefined && i >= accentFrom ? "" : undefined}
            >
              {step.number}
            </span>{" "}
            — {step.label}
          </p>
          <p className={styles.stepDescription}>{step.description}</p>
        </div>
      ))}
    </div>
  );
}
