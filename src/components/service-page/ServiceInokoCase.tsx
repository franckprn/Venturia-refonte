"use client";

import { ServiceSplitIntro } from "./ServiceSplitIntro";
import { useScrollReveal } from "@/components/ScrollReveal";
import type { ServiceInokoCaseBlock } from "@/content/services/types";
import styles from "./ServiceInokoCase.module.css";

/**
 * Bloc 2 de la page Publicité — cas client Inoko, moment fort de la
 * page. Mise en page B (ServiceSplitIntro : label + h2 colonnes 1-6,
 * texte colonnes 7-12), puis un visuel pleine largeur sur sa PROPRE
 * ligne de grille (ligne 4, à la suite de ServiceSplitIntro — même
 * motif que `.items` de ServiceStarting) : « 1 € investi » (1 carré
 * --ink, colonnes 1-6) face à « N € de chiffre d'affaires » (N carrés
 * --accent, colonnes 7-12), puis la ligne de définition.
 *
 * Le carré --ink est un simple aplat, visible dès le départ, jamais
 * animé. Les N emplacements --accent sont, eux, TOUJOURS visibles en
 * contour (`border: 1px solid var(--line)`, posé en CSS pur, jamais en
 * JS) : seul le remplissage intérieur (`.fill`, un enfant séparé,
 * `background: var(--accent)`) passe de opacity 0 à 1 au scroll — si le
 * JS ne charge pas, `.fill` garde son opacity CSS par défaut (1, jamais
 * 0 en dur), donc les emplacements restent remplis (CLAUDE.md,
 * « Animations » : rien ne doit rester à opacity 0 sans JS).
 *
 * `useScrollReveal` généralisé (y:0 — un remplissage qui « s'allume »,
 * pas une liste qui monte ; `top 80%`/200ms/stagger 60ms, propres à ce
 * bloc) : `reduced-motion` retourne avant de poser le moindre
 * `gsap.set`, les remplissages restent donc à leur opacité CSS par
 * défaut (1) — remplis d'emblée, comme demandé.
 */
export function ServiceInokoCase({
  label,
  title,
  text,
  invested,
  revenue,
  definition,
}: ServiceInokoCaseBlock) {
  const { containerRef, setItemRef } = useScrollReveal<HTMLDivElement>(revenue.squares, {
    start: "top 80%",
    duration: 0.2,
    y: 0,
    stagger: 0.06,
  });

  return (
    <>
      <ServiceSplitIntro label={label} title={title} headingId="service-inoko-title">
        <p className={styles.text}>{text}</p>
      </ServiceSplitIntro>

      <div className={styles.visual}>
        <div className={styles.column}>
          <p className={styles.amount}>{invested.amount}</p>
          <p className={styles.amountLabel}>{invested.label}</p>
          <div className={styles.squares}>
            <div className={styles.investedSquare} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.column}>
          <p className={styles.amount}>{revenue.amount}</p>
          <p className={styles.amountLabel}>{revenue.label}</p>
          <div ref={containerRef} className={styles.squares} aria-hidden="true">
            {Array.from({ length: revenue.squares }, (_, i) => (
              <div key={i} className={styles.square}>
                <div ref={setItemRef(i)} className={styles.fill} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.definition}>{definition}</p>
    </>
  );
}
