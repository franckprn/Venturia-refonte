import type { ArticleSource } from "@/content/blog/types";
import styles from "./ArticleSources.module.css";

type ArticleSourcesProps = {
  items: ArticleSource[];
};

/**
 * Liste « Sources », en fin d'article — liens EXTERNES uniquement,
 * `rel="noopener"` (jamais `noreferrer` : rien n'empêche d'envoyer le
 * referrer à ces sites) et `target="_blank"`. Porte
 * `data-article-body-end` : marque la fin de la section « body »
 * (cible du point de repos du carton 3 du rail ET fin de la barre de
 * progression de lecture — src/app/blog/[slug]/page.tsx,
 * ReadingProgress.tsx).
 */
export function ArticleSources({ items }: ArticleSourcesProps) {
  return (
    <div className={styles.box} data-article-body-end>
      <p className={styles.label}>Sources</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noopener" className={styles.link}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
