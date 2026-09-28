import { ArrowLink } from "@/components/ArrowLink";
import type { ServiceHero as ServiceHeroContent } from "@/content/services/types";
import styles from "./ServiceHero.module.css";

/**
 * Bloc 1 (hero) des pages /services/* — CLAUDE.md, « Pages services —
 * gabarit ». Contrairement au Hero de la home : pas de photo, pas de
 * `min-height: 100svh` (spacing="default", posé par <Section> dans
 * page.tsx). H1 sur les colonnes 1-9 ; sous-titre + bouton sous lui,
 * colonnes 7-12 (mise en page simple : un bloc sous l'autre, jamais côte
 * à côte comme le hero de la home — il n'y a pas de photo à aligner en
 * face). Lignes explicites sur la grille externe (bodyStyle rowGap:0,
 * page.tsx) : 1 label, 2 h1, 3 sous-titre+bouton.
 *
 * Aucune animation d'entrée ici (contrairement aux autres blocs de la
 * page, voir ScrollReveal.tsx) : sans photo, le h1 est très
 * probablement l'élément LCP de cette page — CLAUDE.md, « Animations »
 * : « rien d'animé sur l'élément LCP ». Il est peint à 100 % d'opacité
 * dès le premier rendu, comme le h1 de la home.
 */
export function ServiceHero({ label, title, subtitle, cta }: ServiceHeroContent) {
  return (
    <>
      <p className={styles.label}>{label}</p>
      <h1 id="service-hero-title" className={styles.title}>
        {title}
      </h1>
      <div className={styles.bottom}>
        <p className={styles.subtitle}>{subtitle}</p>
        <ArrowLink href={cta.href} label={cta.label} direction="right" />
      </div>
    </>
  );
}
