import { ArrowLink } from "@/components/ArrowLink";
import type { ServiceHero as ServiceHeroContent } from "@/content/services/types";
import { ServiceHeroChainReveal } from "./ServiceHeroChainReveal";
import styles from "./ServiceHero.module.css";

/**
 * Bloc 1 (hero) des pages /services/* — CLAUDE.md, « Pages services —
 * gabarit ». H1 sur les 12 colonnes ENTIÈRES (pas 1-9 comme l'ancienne
 * version) : `line1`/`line2` sont deux lignes EXPLICITES (comme
 * `line1`/`line2` du bloc de fin, content/footer.ts), jamais laissées au
 * navigateur — `line1` (la plus longue) calibre la taille du texte, voir
 * ServiceHero.module.css pour le calcul complet. Sous-titre (colonnes
 * 1-6) et CTA (colonnes 7-12) partagent la MÊME ligne de grille, alignés
 * en haut. Puis la « chaîne » (notification + 4 étapes), pleine largeur.
 * Plus de label au-dessus du H1 (retiré, CLAUDE.md « Pages services —
 * gabarit »). Lignes explicites sur la grille externe (bodyStyle
 * rowGap:0, page.tsx) : 1 h1, 2 espaceur, 3 sous-titre+CTA, 4 espaceur,
 * 5 chaîne — les deux espaceurs (`minmax(Y, 1fr)`, même Y) centrent la
 * ligne sous-titre+CTA à égale distance du H1 et de la chaîne.
 *
 * Aucune animation sur h1/sous-titre/CTA : sans photo, le h1 est très
 * probablement l'élément LCP de cette page — CLAUDE.md, « Animations » :
 * « rien d'animé sur l'élément LCP ». Peint à 100 % d'opacité dès le
 * premier rendu. Seule la chaîne est animée, dans `ServiceHeroChainReveal`
 * (composant client séparé — ce composant-ci reste serveur).
 *
 * Le carton 1 du rail s'ancre sur ce bloc (CLAUDE.md, « Pages services —
 * gabarit » § RAIL) : `<RailSlot anchor="hero">` (page.tsx) vise
 * `#service-hero-title` (haut du h1), pas une cible à l'intérieur de ce
 * composant — rien à changer ici pour ça.
 */
export function ServiceHero({
  titleLine1,
  titleLine2,
  subtitle,
  cta,
  chain,
}: ServiceHeroContent) {
  return (
    <>
      <div className={styles.titleWrap}>
        <h1 id="service-hero-title" className={styles.title}>
          {titleLine1}
          <br />
          {titleLine2}
        </h1>
      </div>
      <div className={styles.bottom}>
        <p className={styles.subtitle}>{subtitle}</p>
        <ArrowLink href={cta.href} label={cta.label} direction="right" className={styles.cta} />
      </div>
      <ServiceHeroChainReveal chain={chain} />
    </>
  );
}
