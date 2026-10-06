import styles from "./ArticleCallout.module.css";

type ArticleCalloutProps = {
  items: string[];
};

/**
 * Encadré « En bref », juste sous l'intro de l'article — bordure 1px,
 * radius 4px (palette fermée, CLAUDE.md « Arrondis »), une puce par
 * ligne de `enBref`. Porte l'id `en-bref` : cible du carton 1 du rail
 * (`href="#en-bref"`, content/blog/<slug>.ts) ET ancre du point de
 * repos de son `<RailSlot>` (OffsetTarget `selector: "#en-bref"`, voir
 * src/app/blog/[slug]/page.tsx) — un seul id pour les deux usages.
 */
export function ArticleCallout({ items }: ArticleCalloutProps) {
  return (
    <div id="en-bref" className={styles.box}>
      <p className={styles.label}>En bref</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
