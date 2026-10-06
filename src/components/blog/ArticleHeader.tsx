import type { ArticleAuthor } from "@/content/blog/types";
import styles from "./ArticleHeader.module.css";

type ArticleHeaderProps = {
  category: string;
  title: string;
  date: string;
  minutes: number;
  author: ArticleAuthor;
  intro: string;
};

/**
 * Catégorie, H1, date + temps de lecture, puis l'intro — en haut de
 * chaque article, juste sous le fil d'Ariane (BlogBreadcrumb.tsx).
 *
 * H1 approche « simple » du gabarit (CLAUDE.md, « Pages services —
 * gabarit » § H1 de page) : `--t-title-lg`, `grid-column: 1 / 10`, pas
 * de calibrage cqi — un article n'a pas besoin d'occuper EXACTEMENT
 * cette largeur, contrairement au H1 calibré des pages /services/*.
 *
 * « Par {name} » sous la date : affiché SEULEMENT si `author.type ===
 * "Person"` — une Organization (Venturia elle-même, le cas de l'article
 * 1) n'a pas besoin de cette ligne, le site est déjà signé par ailleurs.
 */
export function ArticleHeader({ category, title, date, minutes, author, intro }: ArticleHeaderProps) {
  return (
    <>
      <p className={styles.category}>{category}</p>
      <h1 id="article-title" className={styles.title}>
        {title}
      </h1>
      <p className={styles.meta}>
        {date} · Lecture {minutes} min
      </p>
      {author.type === "Person" && <p className={styles.author}>Par {author.name}</p>}
      <p className={styles.intro}>{intro}</p>
    </>
  );
}
