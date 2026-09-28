import { ServiceStepsThirds } from "./ServiceStepsThirds";
import type { ServiceRolloutBlock } from "@/content/services/types";
import styles from "./ServiceRollout.module.css";

/**
 * Bloc 5 des pages /services/* — label + h2 sur l'axe gauche (pas de
 * mise en page B : aucun contenu sur l'axe droit), puis les 3 étapes en
 * tiers, même style que les étapes du Processus (home) — SANS le schéma
 * animé (ServiceStepsThirds, réutilisée telle quelle avec le bloc 3).
 */
export function ServiceRollout({ label, title, steps }: ServiceRolloutBlock) {
  return (
    <>
      <p className={styles.label}>{label}</p>
      <h2 id="service-rollout-title" className={styles.title}>
        {title}
      </h2>
      <div className={styles.stepsRow} data-service-rollout-end>
        <ServiceStepsThirds steps={steps} />
      </div>
    </>
  );
}
