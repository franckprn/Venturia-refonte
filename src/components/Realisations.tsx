import styles from "./realisations.module.css";

// Section Réalisations — une seule carte, le dernier cas client. La
// preuve (les chiffres) doit être l'élément le plus visible de la carte :
// même gabarit typographique que le nom du projet, en --accent.
//
// Contenu réel fourni par Franck, verbatim, non complété. Le visuel réel
// n'existe pas encore : le conteneur d'image est en place, au bon
// format, fond plein --ink, avec le nom de fichier attendu en
// commentaire. Aucune photo de stock, aucune image générée.

const RESULTS = [
  { fig: "×10", label: "clics organiques en 6 mois" },
  { fig: "×12", label: "chiffre d'affaires" },
  { fig: "×15", label: "ROAS Google Ads" },
];

export function Realisations() {
  return (
    <div className={styles.frame}>
      <div className={styles.inner}>
        <h2 id="realisations-title" className={styles.label}>
          Notre dernier cas client
        </h2>

        <article className={styles.card}>
          <h3 className={styles.name}>INOKO</h3>

          {/* Conteneur d'image au format 4/3, fond plein --ink.
              Image attendue (fournie par Franck) : inoko-mobilier-van-toulouse.jpg
              → next/image, fill, sizes, alt en français décrivant la photo. */}
          <div className={styles.shot} aria-hidden="true" />

          <ul className={styles.results}>
            {RESULTS.map((r) => (
              <li key={r.fig} className={styles.result}>
                <span className={styles.fig}>{r.fig}</span>
                <span className={styles.figLabel}>{r.label}</span>
              </li>
            ))}
          </ul>

          {/* /realisations/inoko n'existe pas encore : déclencheur inerte. */}
          <button type="button" className={styles.more}>
            En savoir plus
          </button>
        </article>
      </div>
    </div>
  );
}
