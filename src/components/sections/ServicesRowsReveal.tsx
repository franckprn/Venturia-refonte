"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import { servicesLinkLabel, type Service } from "@/content/services";
import styles from "./services.module.css";

gsap.registerPlugin(ScrollTrigger);

type ServicesRowsRevealProps = {
  services: readonly Service[];
};

/**
 * Révélation unique à l'entrée dans le viewport (ScrollTrigger,
 * `start: "top 75%"`, `once: true`) : les quatre lignes montent de
 * 16px et passent de 0 à 1 en opacité, stagger 60ms, 400ms, easing du
 * site.
 *
 * État initial posé par GSAP en JS (`gsap.set`) uniquement, jamais en
 * CSS : sans JS, les quatre lignes sont lisibles immédiatement.
 * `prefers-reduced-motion` : aucune animation d'entrée, la fonction
 * s'arrête avant de rien parquer.
 *
 * La cible de l'animation est le conteneur `.row` (plus le <a> comme
 * avant) : seul le lien « En savoir plus → » est cliquable désormais,
 * étiré à toute la ligne via son ::after (voir services.module.css et
 * CLAUDE.md, « Services (home) » § « Ligne cliquable ») — un seul <a>
 * par ligne, une seule tabulation clavier par service.
 *
 * `opacity` seule, jamais `autoAlpha` : `autoAlpha` bascule aussi
 * `visibility`, qui retirerait le lien du parcours clavier tant que le
 * ScrollTrigger n'a pas déclenché — un Tab ne peut pas donner le focus
 * à un élément `visibility:hidden`, donc il saute la ligne, et sans
 * focus dessus le navigateur ne la fait jamais défiler dans la vue
 * pour déclencher la révélation : boucle bloquée. En opacity seule, la
 * ligne reste focusable (juste transparente) : le focus clavier
 * l'amène dans la vue, ce qui déclenche le ScrollTrigger normalement.
 *
 * Les états de survol/focus (soulignement du lien) sont entièrement en
 * CSS — voir services.module.css — ce composant ne gère que l'entrée.
 */
export function ServicesRowsReveal({ services }: ServicesRowsRevealProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const list = listRef.current;
    const rows = rowRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!list || rows.length !== services.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 16 });

      ScrollTrigger.create({
        trigger: list,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: VENTURIA_EASE,
            onComplete: () => {
              // opacity posée en style inline par GSAP l'emporterait
              // sinon sur une règle CSS future — même précaution que
              // l'ancienne version, gardée par cohérence.
              gsap.set(rows, { clearProps: "opacity" });
            },
          });
        },
      });
    }, list);

    return () => ctx.revert();
  }, [services]);

  return (
    <div ref={listRef} className={styles.list}>
      {services.map((service, i) => (
        <div
          key={service.href}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          className={styles.row}
        >
          <p className={styles.heading}>
            {service.number} — {service.name}
          </p>
          <p className={styles.phrase}>{service.phrase}</p>
          <p className={styles.paragraph}>{service.paragraph}</p>
          <Link href={service.href} className={styles.link}>
            {servicesLinkLabel}
            <svg
              className={styles.linkArrow}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 8H13M9 3.5L13.5 8L9 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
}
