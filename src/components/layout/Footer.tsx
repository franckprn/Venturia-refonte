import Link from "next/link";
import { footer } from "@/content/footer";
import { LocalTime } from "./LocalTime";
import styles from "./footer.module.css";

// Bloc de fin de page — CTA + footer en UN SEUL bloc sombre (pas deux
// sections) : titre géant (lien entier vers /contact), colonnes de
// liens, barre légale. Suit Processus (clair) ; le fond --ink pleine
// largeur vit sur le <Section> qui l'englobe (voir page.tsx et
// footer.module.css .section), pas ici — ce composant ne rend que le
// contenu.
//
// Commence directement par le titre géant : l'ancienne bande CONTACT
// (label, phrases, « Écrire un mail », adresse email) a été retirée —
// l'adresse vivait déjà dans content/contact.ts, lue par /contact,
// jamais par ce fichier ; rien à y déplacer.
//
// Racine en <div>, pas <footer> : imbriqué dans le <section> que Shell
// exige pour la mécanique de grille (figement du rail jusqu'au bas de
// page, voir Shell.tsx), un <footer> y perdrait son rôle ARIA
// "contentinfo" (HTML-AAM : un <footer> descendant d'un <section> n'a
// plus ce rôle) — autant ne pas prétendre à une sémantique qu'il
// n'aurait pas réellement.
//
// Contenu réel (provisoire) dans content/footer.ts.
export function Footer() {
  const { linkColumns, address, giantTitle, legal } = footer;

  return (
    <div className={styles.bands}>
      {/* BANDE 2 — TITRE GÉANT, lien entier vers /contact (première
          bande du footer désormais, voir commentaire d'en-tête) */}
      <div className={styles.giant}>
        <Link href="/contact" className={styles.giantTitle}>
          {giantTitle.text}
          {/* Espace fine insécable (U+202F), pas une espace normale :
              c'est la ponctuation française correcte avant un « ? »,
              et elle est juste assez plus étroite pour que « VOUS
              AIDER ? » tienne sur la 2ᵉ ligne à --t-mass — avec une
              espace normale, le « ? » débordait seul sur une 3ᵉ ligne
              (mesuré : 1181px pour 1176px de large disponible). */}
          {" "}
          <span className={styles.giantMark}>{giantTitle.mark}</span>
        </Link>
      </div>

      {/* BANDE 3 — LIENS */}
      <div className={styles.linksGrid}>
        {linkColumns.map((column) => (
          <div className={styles.linkColumn} key={column.title}>
            <p className={styles.columnTitle}>{column.title}</p>
            <ul className={styles.columnList}>
              {column.entries.map((entry) => (
                <li key={entry.label}>
                  {entry.isLink ? (
                    <Link href={entry.href} className={styles.columnLink}>
                      {entry.label}
                    </Link>
                  ) : (
                    <span className={styles.columnLinkDisabled}>{entry.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.linkColumn}>
          <p className={styles.columnTitle}>{address.title}</p>
          <p className={styles.addressCity}>{address.city}</p>
          <p className={styles.addressCoverage}>{address.coverage}</p>
        </div>
      </div>

      {/* BANDE 4 — BARRE LÉGALE */}
      <div className={styles.legalBar}>
        <div className={styles.legalLeft}>
          <span className={styles.legalCopyright}>{legal.copyright}</span>
          <Link href={legal.legalNotice.href} className={styles.legalLink}>
            {legal.legalNotice.label}
          </Link>
          <Link href={legal.privacy.href} className={styles.legalLink}>
            {legal.privacy.label}
          </Link>
        </div>
        <LocalTime />
      </div>
    </div>
  );
}
