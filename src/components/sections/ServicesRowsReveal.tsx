"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import type { Service } from "@/content/services";
import { ArrowLink } from "@/components/ArrowLink";
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
 * `opacity` seule, jamais `autoAlpha` : `autoAlpha` bascule aussi
 * `visibility`, qui retirerait le lien « Découvrir… » du parcours
 * clavier tant que le ScrollTrigger n'a pas déclenché — un Tab ne peut
 * pas donner le focus à un élément `visibility:hidden`, donc il saute
 * la ligne, et sans focus dessus le navigateur ne la fait jamais
 * défiler dans la vue pour déclencher la révélation : boucle bloquée.
 * En opacity seule, le lien reste focusable (juste transparent) : le
 * focus clavier l'amène dans la vue, ce qui déclenche le ScrollTrigger
 * normalement.
 *
 * Une seule cible cliquable par ligne : le lien « Découvrir… »
 * (ArrowLink, direction="right") sous les paragraphes — plus de lien
 * étiré sur toute la ligne (CLAUDE.md, « Services (home) »). Son
 * survol/focus fait glisser sa propre flèche, géré entièrement dans
 * ArrowLink — ce composant ne gère que l'entrée.
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
          <p className={styles.heading}>{service.name}</p>
          <p className={styles.phrase}>{service.phrase}</p>
          <div className={styles.right}>
            <div className={styles.paragraphs}>
              {service.paragraphs.map((paragraph, i) => (
                <p key={i} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <ArrowLink href={service.href} label={service.ctaLabel} direction="right" />
          </div>
        </div>
      ))}
    </div>
  );
}
