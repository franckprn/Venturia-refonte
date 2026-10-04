import { ServiceSplitIntro } from "./ServiceSplitIntro";
import { INTEGRATION_ICON_PATHS } from "./integrationIcons";
import type { ServiceIntegrationsBlock } from "@/content/services/types";
import styles from "./ServiceIntegrations.module.css";

/**
 * Bloc 5bis des pages /services/* — « Intégrations », entre L'outil et
 * la FAQ. Mise en page B (ServiceSplitIntro : label + h2 colonnes 1-6
 * pleine largeur, intro colonnes 7-12 sous le bas du h2 + 32px, SANS
 * max-width — comme ServiceOtherActivities, l'intro doit atteindre le
 * bord droit du contenu), puis une grille de tuiles PLEINE LARGEUR
 * (colonnes 1-12, sa propre ligne de grille à la suite de
 * ServiceSplitIntro — même motif que `.items` dans
 * ServiceStarting.module.css), puis une ligne finale.
 */
export function ServiceIntegrations({ label, title, intro, tools, outro }: ServiceIntegrationsBlock) {
  return (
    <>
      <ServiceSplitIntro label={label} title={title} headingId="service-integrations-title">
        <p className={styles.intro} data-service-integrations-intro>
          {intro}
        </p>
      </ServiceSplitIntro>
      <div className={styles.grid} data-service-integrations-grid>
        {tools.map((tool) => (
          <div key={tool.name} className={styles.tile} data-service-integrations-tile>
            <svg
              className={styles.logo}
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={INTEGRATION_ICON_PATHS[tool.icon]} />
            </svg>
            <p className={styles.name} data-service-integrations-name>
              {tool.name}
            </p>
          </div>
        ))}
      </div>
      <p className={styles.outro} data-service-integrations-outro>
        {outro}
      </p>
    </>
  );
}
