import { ServiceSplitIntro } from "./ServiceSplitIntro";
import type { ServiceOtherActivitiesBlock } from "@/content/services/types";
import styles from "./ServiceOtherActivities.module.css";

/**
 * Bloc 3bis des pages /services/* — « Autres activités », entre
 * « Par où commencer » et la Respiration rouge. Mise en page B
 * (ServiceSplitIntro : label + h2 colonnes 1-6, contenu colonnes 7-12,
 * sous le bas du h2 + 32px) : intro puis liste, toutes deux dans
 * `.right` (pas une ligne de grille séparée comme ServiceStarting —
 * CLAUDE.md, « Autres activités »). Liste = lignes nom/phrase séparées
 * par des traits --line, PAS des cartes (aucun fond, aucune bordure de
 * boîte).
 */
export function ServiceOtherActivities({
  label,
  title,
  intro,
  items,
}: ServiceOtherActivitiesBlock) {
  return (
    <ServiceSplitIntro label={label} title={title} headingId="service-other-activities-title">
      <p className={styles.intro}>{intro}</p>
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.name} className={styles.row}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.text}>{item.text}</p>
          </div>
        ))}
      </div>
    </ServiceSplitIntro>
  );
}
