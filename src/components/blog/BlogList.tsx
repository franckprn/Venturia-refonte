"use client";

import Link from "next/link";
import { useScrollReveal } from "@/components/ScrollReveal";
import { formatFrenchDate } from "@/lib/blog";
import type { ArticleListEntry } from "@/content/blog/types";
import styles from "./BlogList.module.css";

type BlogListProps = {
  entries: ArticleListEntry[];
};

/**
 * Liste des articles (/blog) — une ligne pleine largeur par article,
 * grille interne 12 colonnes SANS padding-inline (« Règle des deux
 * axes »), trait 1px --line au-dessus de chaque ligne et sous la
 * dernière (même motif que ServiceOtherExpertises.module.css .list/
 * .row). Toute la ligne est un seul `<Link>`.
 *
 * Survol/focus — DIFFÉRENT de ServiceOtherExpertises (pas d'inversion
 * de fond) : seul le titre passe en --accent et la flèche glisse de
 * 4px, 200ms, cubic-bezier(0,.55,.45,1).
 */
export function BlogList({ entries }: BlogListProps) {
  const { containerRef, setItemRef } = useScrollReveal<HTMLDivElement>(entries.length);

  return (
    <div ref={containerRef} className={styles.list}>
      {entries.map((entry, index) => (
        <Link
          key={entry.slug}
          href={`/blog/${entry.slug}`}
          ref={setItemRef(index)}
          className={styles.row}
        >
          <p className={styles.meta}>
            {entry.category} · {formatFrenchDate(entry.date)}
          </p>
          <p className={styles.title}>{entry.title}</p>
          <p className={styles.excerpt}>{entry.excerpt}</p>
          <span className={styles.arrow} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2.5 8H13M9 3.5L13.5 8L9 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
