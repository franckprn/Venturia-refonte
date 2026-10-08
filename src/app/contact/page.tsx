import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { Footer } from "@/components/layout/Footer";
import footerStyles from "@/components/layout/footer.module.css";
import { contact } from "@/content/contact";
import { CopyButton } from "./CopyButton";
import { MailIcon, CalendarIcon } from "./icons";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: contact.metaTitle,
  description: contact.metaDescription,
};

// Page /contact — parti pris : pas de formulaire, deux actions et
// rien d'autre. Sobre, dense en haut, beaucoup de vide en bas. Aucune
// animation : la page est courte, une révélation au scroll n'a rien à
// révéler.
//
// Reprend le shell du site (Shell/Section, comme la home) mais sans
// aucun carton de rail sur cette page — seulement pour profiter de la
// même grille de contenu et du même bloc de fin de page, pas pour la
// mécanique de figement.
//
// Contenu réel dans content/contact.ts, non complété ici.
export default function ContactPage() {
  return (
    <Shell>
      <Section
        name="contact"
        tone="light"
        labelledBy="contact-title"
        className={styles.section}
        bodyStyle={{ rowGap: 0 }}
      >
        <div className={styles.content}>
          <p className={styles.label}>{contact.label}</p>
          <h1 id="contact-title" className={styles.title}>
            {contact.title}
          </h1>
          <p className={styles.intro}>{contact.intro}</p>

          <div className={styles.actions}>
            <div className={styles.action}>
              <span className={styles.iconBox} aria-hidden="true">
                <MailIcon />
              </span>
              <div className={styles.actionBody}>
                <a href={`mailto:${contact.email.address}`} className={styles.actionLink}>
                  {contact.email.address}
                </a>
                <p className={styles.actionSubline}>{contact.email.subline}</p>
              </div>
              <CopyButton
                value={contact.email.address}
                label={contact.email.copyLabel}
                copiedLabel={contact.email.copiedLabel}
              />
            </div>

            <div className={styles.action}>
              <span className={styles.iconBox} aria-hidden="true">
                <CalendarIcon />
              </span>
              <div className={styles.actionBody}>
                <a
                  href={contact.booking.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLink}
                >
                  {contact.booking.label}
                </a>
                <p className={styles.actionSubline}>{contact.booking.subline}</p>
              </div>
            </div>
          </div>

          <div className={styles.info}>
            {contact.info.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
        <Footer />
      </Section>
    </Shell>
  );
}
