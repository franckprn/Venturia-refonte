import { ServiceSplitIntro } from "./ServiceSplitIntro";
import { ServiceStepsThirds } from "./ServiceStepsThirds";
import type { ServiceProcessBlock } from "@/content/services/types";
import styles from "./ServiceProcess.module.css";

/**
 * Bloc 3 des pages /services/* — mise en page B (label + h2 colonnes
 * 1-6, paragraphe colonnes 7-12, ServiceSplitIntro), puis les 6 étapes
 * en tiers sur 2 lignes (ServiceStepsThirds, numéros 01-02 --ink, 03-06
 * --accent), puis une note sous le schéma, axe gauche.
 */
export function ServiceProcess({ label, title, paragraph, steps, note }: ServiceProcessBlock) {
  return (
    <>
      <ServiceSplitIntro label={label} title={title} headingId="service-process-title">
        <p className={styles.paragraph} data-service-process-paragraph>
          {paragraph}
        </p>
      </ServiceSplitIntro>
      <div className={styles.stepsRow}>
        <ServiceStepsThirds steps={steps} accentFrom={2} />
      </div>
      <p className={styles.note}>{note}</p>
    </>
  );
}
