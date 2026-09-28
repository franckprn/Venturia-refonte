import type { ReactNode } from "react";
import styles from "./ServiceSplitIntro.module.css";

type ServiceSplitIntroProps = {
  label: string;
  title: string;
  headingId: string;
  /** Contenu de l'axe droit (colonnes 7-12, sur sa PROPRE ligne de
   *  grille, après celle du titre — CLAUDE.md, « Règle des deux axes »).
   *  Un paragraphe (bloc 3), une intro + sections à intertitre (bloc 4),
   *  ou une liste de questions-réponses (bloc 6, FAQ). */
  children: ReactNode;
};

/**
 * Mise en page B (CLAUDE.md, « Règle des deux axes ») : label pleine
 * largeur, titre axe gauche (colonnes 1-6), contenu axe droit (colonnes
 * 7-12) sur la ligne SUIVANTE — jamais à côté du titre. Même technique
 * que .label/.title/.paragraph dans dernier-accompagnement.module.css :
 * lignes de grille EXPLICITES (1, 2, 3) sur la grille PARTAGÉE de la
 * section (bodyStyle rowGap:0, page.tsx) — un composant qui ajoute du
 * contenu après (steps, encadré, tableau…) continue cette numérotation
 * dans son propre CSS, à partir de la ligne 4.
 */
export function ServiceSplitIntro({ label, title, headingId, children }: ServiceSplitIntroProps) {
  return (
    <>
      <p className={styles.label}>{label}</p>
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
      <div className={styles.right}>{children}</div>
    </>
  );
}
