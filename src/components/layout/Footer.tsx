import Link from "next/link";
import { footer } from "@/content/footer";
import { LocalTime } from "./LocalTime";
import styles from "./footer.module.css";

// Enveloppe, puis arobase — dessinées à la main, jamais une librairie
// d'icônes ni un emoji. La couleur vient de --ground, héritée via
// currentColor depuis .iconBox (footer.module.css).
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 5.5L10 11L17 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AtIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13 10V11.5C13 12.6 13.9 13.3 14.8 12.9C16 12.4 16.75 11.3 16.75 10C16.75 6.55 13.95 3.75 10.5 3.75C7.05 3.75 4.25 6.55 4.25 10C4.25 13.45 7.05 16.25 10.5 16.25C11.8 16.25 13 15.86 14 15.19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Bloc de fin de page — CTA + footer en UN SEUL bloc sombre (pas deux
// sections) : contact, titre géant (lien entier vers /contact),
// colonnes de liens, barre légale. Suit Processus (clair) ; le fond
// --ink pleine largeur vit sur le <Section> qui l'englobe (voir
// page.tsx et footer.module.css .section), pas ici — ce composant ne
// rend que le contenu.
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
  const { contact, linkColumns, address, giantTitle, legal } = footer;

  return (
    <div className={styles.bands}>
      {/* BANDE 1 — CONTACT */}
      <div className={styles.contact}>
        <p className={styles.contactLabel}>{contact.label}</p>
        <p className={styles.contactIntro}>
          {contact.lines[0]}
          <br />
          {contact.lines[1]}
        </p>
        <div className={styles.contactLinksRow}>
          <Link href={contact.write.href} className={styles.contactLink}>
            <span className={styles.iconBox} aria-hidden="true">
              <MailIcon />
            </span>
            {contact.write.label}
          </Link>
          <Link href={contact.email.href} className={styles.contactLink}>
            <span className={styles.iconBox} aria-hidden="true">
              <AtIcon />
            </span>
            {contact.email.label}
          </Link>
        </div>
      </div>

      {/* BANDE 2 — TITRE GÉANT, lien entier vers /contact */}
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
