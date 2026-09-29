"use client";

import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { useScrollReveal } from "@/components/ScrollReveal";
import type { ServiceOtherExpertisesBlock } from "@/content/services/types";
import styles from "./ServiceOtherExpertises.module.css";

/**
 * Bloc 7 des pages /services/* — label sur l'axe gauche, puis 3 lignes
 * empilées pleine largeur (12 colonnes), trait 1px --line au-dessus de
 * la première et sous la dernière. Toute la ligne est cliquable (un
 * SEUL `<Link>` par ligne, pour l'accessibilité — CLAUDE.md, « Autres
 * expertises ») : le visuel « En savoir plus » réutilise `<ArrowLink
 * as="span">` (même composant, même survol que les liens de la home —
 * `right`), rendu en `<span>` plutôt qu'en `<Link>` pour éviter un `<a>`
 * imbriqué dans un `<a>`. Le survol/focus de la ligne entière pilote
 * l'animation de la flèche (ServiceOtherExpertises.module.css, `.row:hover
 * [data-direction="right"] svg`) — le filet de `.link`, lui, reste
 * toujours visible (arrow-link.module.css, inchangé).
 *
 * Liens vers des pages /services/* pas encore créées (référencement,
 * publicité, site internet) : exception assumée, comme sur la home
 * (CLAUDE.md, « Services (home) » § « AVANT MISE EN LIGNE ») — 404 de
 * préchargement normaux tant qu'elles n'existent pas.
 */
export function ServiceOtherExpertises({ label, items }: ServiceOtherExpertisesBlock) {
  const { containerRef, setItemRef } = useScrollReveal<HTMLDivElement>(items.length);

  return (
    <>
      <p className={styles.label}>{label}</p>
      <div ref={containerRef} className={styles.list} data-service-other-expertises-end>
        {items.map((item, i) => (
          <Link key={item.href} href={item.href} ref={setItemRef(i)} className={styles.row}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.phrase}>{item.phrase}</p>
            <ArrowLink
              href={item.href}
              label={item.ctaLabel}
              direction="right"
              as="span"
              className={styles.link}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
