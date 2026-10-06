import { ArrowLink } from "@/components/ArrowLink";
import { slugifyHeading } from "@/lib/blog";
import type { ArticleBlock } from "@/content/blog/types";
import styles from "./ArticleBody.module.css";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

/**
 * Corps de l'article : rend le tableau `body` (h2 | paragraph | list).
 * Chaque H2 reçoit un id — celui fourni par le contenu (`block.id`,
 * réservé aux collisions) ou dérivé de son texte (`slugifyHeading`,
 * src/lib/blog.ts) — rendu unique ici même si deux titres se
 * ressemblent (suffixe `-2`, `-3`…), pour que deux ancres ne se
 * retrouvent jamais confondues.
 *
 * Le PREMIER H2 porte `data-article-first-h2` : cible du point de
 * repos du carton 2 du rail (OffsetTarget, src/app/blog/[slug]/page.tsx)
 * — jamais un id codé en dur, qui dépendrait du texte exact du titre.
 *
 * Lien d'un bloc `paragraph` (`block.link`) : un `<ArrowLink>` APRÈS le
 * paragraphe, jamais inline dans le texte — même convention que
 * ServiceCrossLink (CTA toujours son propre élément).
 */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  const seenIds = new Set<string>();
  let firstH2Seen = false;

  return (
    <div className={styles.column}>
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          const base = block.id ?? slugifyHeading(block.text);
          let id = base;
          let suffix = 2;
          while (seenIds.has(id)) {
            id = `${base}-${suffix}`;
            suffix += 1;
          }
          seenIds.add(id);

          const isFirst = !firstH2Seen;
          firstH2Seen = true;

          return (
            <h2
              key={index}
              id={id}
              className={styles.h2}
              {...(isFirst ? { "data-article-first-h2": true } : {})}
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className={styles.list}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <div key={index} className={styles.paragraphBlock}>
            <p className={styles.paragraph}>{block.text}</p>
            {block.link && (
              <ArrowLink
                href={block.link.href}
                label={block.link.label}
                direction="right"
                className={styles.link}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
