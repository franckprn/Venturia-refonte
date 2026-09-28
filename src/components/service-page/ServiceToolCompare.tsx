import { ServiceSplitIntro } from "./ServiceSplitIntro";
import type { ServiceToolBlock } from "@/content/services/types";
import styles from "./ServiceToolCompare.module.css";

/**
 * Bloc 4 des pages /services/* — mise en page B (ServiceSplitIntro :
 * label + h2 colonnes 1-6, intro + sections à intertitre colonnes
 * 7-12), puis un encadré (colonnes 7-12, bordure 1px --line) et un
 * tableau sur les 12 colonnes (traits --line, colonne n8n en graisse —
 * aucun gris, aucun fond de couleur, CLAUDE.md « Couleurs »). Sous
 * 1024px, le tableau devient 3 blocs empilés (un par outil), sans
 * défilement horizontal.
 */
export function ServiceToolCompare({ label, title, intro, sections, callout, table }: ServiceToolBlock) {
  return (
    <>
      <ServiceSplitIntro label={label} title={title} headingId="service-tool-title">
        <p className={styles.paragraph}>{intro}</p>
        <div className={styles.sections}>
          {sections.map((section) => (
            <div key={section.heading}>
              <p className={styles.sectionHeading}>{section.heading}</p>
              <p className={styles.sectionText}>{section.text}</p>
            </div>
          ))}
        </div>
      </ServiceSplitIntro>

      <div className={styles.calloutRow}>
        <div className={styles.callout}>
          <p className={styles.calloutTitle}>{callout.title}</p>
          <p className={styles.calloutText}>{callout.text}</p>
        </div>
      </div>

      <div className={styles.tableRow}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" />
              {table.columns.map((column, i) => (
                <th key={column} scope="col" className={i === 2 ? styles.n8nCol : undefined}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className={styles.rowLabel}>
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={i} className={i === 2 ? styles.n8nCol : undefined}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.mobileStack}>
          {table.columns.map((column, colIndex) => (
            <div key={column} className={styles.mobileTool}>
              <p className={styles.mobileToolName} data-n8n={colIndex === 2 ? "" : undefined}>
                {column}
              </p>
              {table.rows.map((row) => (
                <div key={row.label} className={styles.mobileRow}>
                  <p className={styles.mobileRowLabel}>{row.label}</p>
                  <p className={styles.mobileRowValue} data-n8n={colIndex === 2 ? "" : undefined}>
                    {row.values[colIndex]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
