import styles from "./rail.module.css";

type RailSlotProps = {
  /**
   * Hauteur de la plage de figement = hauteur de la section rattachée.
   * Provisoire : sur /test on la pose à la main. Plus tard le slot
   * enveloppera la vraie section et prendra sa hauteur naturellement.
   */
  height?: number | string;
  children?: React.ReactNode;
};

export function RailSlot({ height, children }: RailSlotProps) {
  return (
    <div className={styles.slot} data-rail-slot style={{ height }}>
      {children}
    </div>
  );
}

type RailCardProps = {
  title: string;
  children: React.ReactNode;
  /** Le carton porte-t-il une action ? → filet rouge plein. */
  action?: boolean;
};

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
