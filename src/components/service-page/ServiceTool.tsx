import { ServiceSplitIntro } from "./ServiceSplitIntro";
import type { ServiceToolBlock } from "@/content/services/types";
import styles from "./ServiceTool.module.css";

/**
 * Bloc 5 des pages /services/* — « L'outil ». Mise en page B
 * (ServiceSplitIntro : label + h2 colonnes 1-6 pleine largeur, §1-4
 * colonnes 7-12, sous le bas du h2 + 32px). Corrigé — plus de lignes
 * numérotées ni de tiers : 4 paragraphes, style de paragraphe courant de
 * la home, chaque intertitre (§2-4) en gras au début de son propre
 * paragraphe (même `<p>` que son texte, jamais séparé). Plus de callout
 * ni de tableau comparatif (retirés).
 */
export function ServiceTool({ label, title, intro, sections }: ServiceToolBlock) {
  return (
    <ServiceSplitIntro label={label} title={title} headingId="service-tool-title">
      <div className={styles.paragraphs}>
        <p className={styles.paragraph}>{intro}</p>
        {sections.map((section) => (
          <p key={section.heading} className={styles.paragraph}>
            <strong className={styles.heading}>{section.heading}</strong> {section.text}
          </p>
        ))}
      </div>
    </ServiceSplitIntro>
  );
}
