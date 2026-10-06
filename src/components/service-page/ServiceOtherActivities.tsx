import { ServiceSplitIntro } from "./ServiceSplitIntro";
import type { ServiceOtherActivitiesBlock } from "@/content/services/types";
import styles from "./ServiceOtherActivities.module.css";

type ServiceOtherActivitiesProps = ServiceOtherActivitiesBlock & {
  /** id du h2, par défaut "service-other-activities-title" (valeur
   *  d'origine, en dur) — à passer explicitement seulement quand ce
   *  composant est utilisé PLUSIEURS fois sur la même page (page
   *  Publicité : « Les campagnes » ET « Ce qui vous appartient »), pour
   *  éviter un id dupliqué dans le HTML. Omis, comportement identique
   *  à avant ce prop. */
  headingId?: string;
};

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
  headingId = "service-other-activities-title",
}: ServiceOtherActivitiesProps) {
  return (
    <ServiceSplitIntro label={label} title={title} headingId={headingId}>
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
