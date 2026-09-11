import Link from "next/link";
import styles from "./nav.module.css";

// Nav — version simple 64px. « Venturia » à gauche ; à droite les entrées
// et le mot « Menu » (sous 1024px). Aucun panneau ne s'ouvre encore :
// ces boutons sont des déclencheurs inertes, câblés en session 3.
const ENTRIES = ["Services", "Réalisations", "À propos"] as const;

export function Nav() {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.brand}>
        Venturia
      </Link>

      <nav className={styles.items} aria-label="Navigation principale">
        <div className={styles.group}>
          {ENTRIES.map((label) => (
            <button key={label} type="button" className={styles.link}>
              {label}
            </button>
          ))}
        </div>
        <button type="button" className={`${styles.link} ${styles.menu}`}>
          Menu
        </button>
      </nav>
    </header>
  );
}
