import { processusLabel, processusTitle, processusSteps } from "@/content/processus";
import { ProcessusSchemaReveal } from "./ProcessusSchemaReveal";
import styles from "./processus.module.css";

// Section « Processus » (home) — un schéma (axe unique, trois formes
// tangentes de taille croissante), pas une liste. Fond --ground, dans
// la zone de contenu (jamais sous le rail). Espacement de section
// standard (72/120px) : pas d'override ici, section.module.css suffit.
//
// Le schéma lui-même (ProcessusSchemaReveal) pivote à son propre point
// de rupture, 768px — indépendant du point de rupture 1024px du reste
// du shell — et les trois descriptifs en dessous reproduisent une
// grille 12 colonnes interne calée sur ce même 768px (comme .split
// dans DernierAccompagnement ou .block dans Services), plutôt que de
// dépendre de la grille 6/12 colonnes partagée de section.module.css
// qui bascule à 1024px : les deux points de rupture n'ont pas de
// raison de coïncider ici.
//
// Contenu réel (provisoire) dans content/processus.ts.
export function Processus() {
  return (
    <>
      <p className={styles.label}>{processusLabel}</p>
      <h2 id="processus-title" className={styles.title}>
        {processusTitle}
      </h2>

      <ProcessusSchemaReveal steps={processusSteps} />

      <div className={styles.steps}>
        {processusSteps.map((step) => (
          <div key={step.number} className={styles.step}>
            <p className={styles.stepHeading}>
              {step.number} — {step.label}
            </p>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
