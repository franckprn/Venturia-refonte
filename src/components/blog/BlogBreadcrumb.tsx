import Link from "next/link";
import styles from "./BlogBreadcrumb.module.css";

type BlogBreadcrumbProps = {
  title: string;
};

/**
 * Fil d'Ariane en haut de chaque article (CLAUDE.md, « blog ») :
 * Accueil › Blog › {titre de l'article}. Les deux premières entrées
 * sont des liens, la dernière (la page courante) un texte simple.
 *
 * Porte `data-article-start` : point de départ de la barre de
 * progression de lecture (ReadingProgress.tsx) — le fil d'Ariane est le
 * tout premier élément visible de l'article, avant même la catégorie et
 * le H1.
 */
export function BlogBreadcrumb({ title }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={styles.breadcrumb} data-article-start>
      <Link href="/" className={styles.link}>
        Accueil
      </Link>
      <span className={styles.separator} aria-hidden="true">
        ›
      </span>
      <Link href="/blog" className={styles.link}>
        Blog
      </Link>
      <span className={styles.separator} aria-hidden="true">
        ›
      </span>
      <span className={styles.current} aria-current="page">
        {title}
      </span>
    </nav>
  );
}
