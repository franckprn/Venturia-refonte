import styles from "./shell.module.css";

type ShellProps = {
  children: React.ReactNode;
  /** Contenu du rail droit : des <RailSlot> (voir Rail.tsx). */
  rail?: React.ReactNode;
};

/**
 * Produit la géométrie du CLAUDE.md : conteneur 1440 centré, marge gauche
 * 54px, contenu sur 12 colonnes (6 sous 1024px), rail 250px collé au bord
 * droit qui passe en pleine largeur sur mobile.
 */
export function Shell({ children, rail }: ShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.content}>{children}</div>
      <aside className={styles.rail} data-rail>
        {rail}
      </aside>
    </div>
  );
}
