"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import type { Service } from "@/content/services";
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
 * Les états de survol/focus (fond, couleurs, filets, opacité des
 * lignes voisines) sont entièrement en CSS — voir services.module.css —
 * ce composant ne gère que l'entrée.
 */
export function ServicesRowsReveal({ services }: ServicesRowsRevealProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const list = listRef.current;
    const rows = rowRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
    if (!list || rows.length !== services.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // opacity seule, jamais autoAlpha : autoAlpha bascule aussi
      // `visibility`, qui retirerait ces liens du parcours au clavier
      // tant que le ScrollTrigger n'a pas déclenché — un Tab ne peut
      // pas donner le focus à un élément visibility:hidden, donc il
      // saute la ligne, et sans focus dessus le navigateur ne la fait
      // jamais défiler dans la vue pour déclencher la révélation :
      // boucle bloquée. En opacity seule, la ligne reste focusable
      // (juste transparente) : le focus clavier l'amène dans la vue,
      // ce qui déclenche le ScrollTrigger normalement.
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
              // sinon sur la règle CSS d'atténuation au survol
              // (.list:has(...) .row:not(:hover) { opacity: .4 }) : un
              // style inline bat toujours une règle de feuille de
              // style, quelle que soit sa spécificité.
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
        <Link
          key={service.href}
          href={service.href}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          className={styles.row}
        >
          <span className={styles.number}>{service.number}</span>
          <span className={styles.name}>{service.name}</span>
          <span className={styles.phrase}>{service.phrase}</span>
          <svg
            className={styles.arrow}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 10h14M11 4l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ))}
    </div>
  );
}
