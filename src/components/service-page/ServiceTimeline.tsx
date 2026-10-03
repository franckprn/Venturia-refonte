import type { ServiceTimelineBlock } from "@/content/services/types";
import styles from "./ServiceTimeline.module.css";

/**
 * Bloc 2 des pages /services/* — label + h2 sur l'axe gauche (pleine
 * largeur, gabarit § a : pas de texte décalé en vis-à-vis), puis une
 * frise du parcours de commande en 3 moments, reliés par une ligne
 * continue (--line) portant un point par moment (CLAUDE.md, « Pages
 * services — gabarit »).
 *
 * `data-service-timeline-end` sur le conteneur de la frise lui-même
 * (pas une colonne précise) : son `offsetHeight` englobe par
 * construction la colonne la plus haute des 3 moments, quel que soit
 * le nombre de tâches de chacun — c'est l'ancre du carton 1 du rail.
 *
 * Statique (pas de useScrollReveal) : page construite dans son état
 * final, sans animation — CLAUDE.md, « Pages services — gabarit ».
 */
export function ServiceTimeline({ label, title, moments, headingId }: ServiceTimelineBlock & { headingId: string }) {
  return (
    <>
      <p className={styles.label}>{label}</p>
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
      <div className={styles.timeline} data-service-timeline-end>
        {moments.map((moment) => (
          <div key={moment.label} className={styles.moment}>
            <span className={styles.dot} aria-hidden="true" />
            <p className={styles.momentLabel}>{moment.label}</p>
            <div className={styles.tasks}>
              {moment.tasks.map((task) => (
                <div key={task.name} className={styles.task}>
                  <p className={styles.taskName}>{task.name}</p>
                  <p className={styles.taskText}>{task.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
