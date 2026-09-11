import styles from "./rail.module.css";

type RailCardProps = {
  title: string;
  children: React.ReactNode;
  /** Le carton porte-t-il une action ? → filet rouge plein. */
  action?: boolean;
};

/**
 * Carton du rail. Il vit dans la colonne de droite de sa <Section> et
 * n'en sort jamais latéralement. Desktop : position: sticky, top 84px,
 * figé tant que sa section est à l'écran. Mobile : statique, pleine
 * largeur, dans le flux de la section.
 *
 * La plage de figement est la colonne rail de la section, qui s'étire
 * sur la hauteur réelle de celle-ci — aucune valeur en dur.
 */
export function RailCard({ title, children, action = false }: RailCardProps) {
  return (
    <article
      className={`${styles.card} ${action ? styles.cardAction : ""}`}
      data-rail-card
    >
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.cardText}>{children}</p>
    </article>
  );
}
