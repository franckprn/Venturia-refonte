import styles from "./respiration.module.css";

type RespirationProps = {
  /** Nomme la ligne de grille de cette section dans le Shell parent
   *  (voir Shell.tsx), comme pour <Section>. */
  name: string;
};

// Section Respiration — pleine largeur (les deux colonnes du Shell),
// fond --ink, sans titre, sans icône, sans CTA, aucun carton de rail.
// Un enfant du Shell comme les autres : elle compte dans la hauteur de
// la grille (donc dans la zone où les cartons précédents peuvent se
// figer), simplement sans jamais en recevoir un elle-même.
//
// Copy provisoire : Franck l'écrira lui-même, ne pas inventer à sa place.
export function Respiration({ name }: RespirationProps) {
  return (
    <section
      className={styles.respiration}
      style={{ gridRow: `${name}-start`, gridColumn: "1 / -1" }}
    >
      <div className={styles.inner}>
        <p className={styles.line}>[PHRASE DE RESPIRATION 1]</p>
        <p className={styles.line}>[PHRASE DE RESPIRATION 2]</p>
      </div>
    </section>
  );
}
