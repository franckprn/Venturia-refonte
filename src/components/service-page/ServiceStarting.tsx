import { ServiceSplitIntro } from "./ServiceSplitIntro";
import type { ServiceStartingBlock } from "@/content/services/types";
import styles from "./ServiceStarting.module.css";

/**
 * Bloc 3 des pages /services/* — « Par où commencer ». Mise en page B
 * (ServiceSplitIntro : label + h2 colonnes 1-6, texte colonnes 7-12, sous
 * le bas du h2 + 32px — CLAUDE.md, règle du décalage), puis 3 éléments en
 * tiers SANS numéro (titre Bricolage + texte, trait --line au-dessus),
 * sur leur PROPRE ligne de grille (4), à la suite de ServiceSplitIntro
 * (lignes 1-3) — jamais dans son module CSS.
 */
export function ServiceStarting({ label, title, text, items }: ServiceStartingBlock) {
  return (
    <>
      <ServiceSplitIntro label={label} title={title} headingId="service-starting-title">
        <p className={styles.text}>{text}</p>
      </ServiceSplitIntro>
      <div className={styles.items}>
        {items.map((item) => (
          <div key={item.title} className={styles.item}>
            <p className={styles.itemTitle}>{item.title}</p>
            <p className={styles.itemText}>{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
