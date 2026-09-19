"use client";

import { useEffect, useRef, type ComponentType } from "react";
import Link from "next/link";
import { railCards, type RailCardContent } from "@/content/rail";
import { useSectionTone, type Tone } from "@/lib/tone";
import { IconArrowRight, IconClock, IconSparkle } from "./RailIcons";
import styles from "./rail.module.css";

// Une icône par carton, dans l'ordre de content/rail.ts (CLAUDE.md,
// « Rail droit ») : horloge, étoile à quatre branches, flèche.
const RAIL_ICONS = [IconClock, IconSparkle, IconArrowRight] as const;

type RailSlotProps = {
  /** Index du carton dans content/rail.ts (0, 1 ou 2). */
  cardIndex: 0 | 1 | 2;
  /** `name` de la <Section> déclencheuse (voir Section.tsx) : le
   *  carton s'ancre à sa ligne de grille, `${anchor}-start / -1`. */
  anchor: string;
};

/**
 * Un carton du rail = un <RailSlot>, rendu comme frère direct de sa
 * <Section> déclencheuse dans page.tsx (pas un <aside> unique regroupé
 * en fin de page) :
 *
 * - Desktop : chaque slot est un item de la grille du Shell, ancré à
 *   `${anchor}-start / -1` — la ligne nommée déjà posée par sa
 *   <Section>, jusqu'à la toute dernière ligne de la grille. C'est le
 *   partage de cette ligne (pas une mesure JS) qui aligne le carton
 *   avec sa section ; « / -1 » systématique (jamais raccourci pour les
 *   cartons suivants) fait tenir l'empilement PERMANENT — un slot qui
 *   s'arrêterait à la fin de sa section ferait repartir le carton
 *   (un relais, pas un empilement, voir CLAUDE.md « Rail droit »).
 * - Mobile : trois instances séparées, chacune physiquement placée
 *   juste après sa section dans le JSX, retombent naturellement « aux
 *   mêmes endroits du flux » une fois que Shell repasse en bloc — un
 *   <aside> unique en fin de DOM les aurait tous groupés après le pied
 *   de page, ce qui ne peut pas satisfaire ce point du CLAUDE.md.
 *
 * Seules les HAUTEURS des cartons 1 et 2 sont mesurées (elles varient
 * avec leur texte, jamais leur position) : écrites dans --rail-h1 et
 * --rail-h2 sur :root au montage et au resize (ResizeObserver), lues
 * par les calc() de rail.module.css. Repli sans JS dans globals.css.
 *
 * Tonalité (CLAUDE.md, « Tonalités ») : `measureRef` (le wrapper sticky,
 * dont la boîte visuelle épouse exactement celle du carton) sert aussi
 * de sonde au moteur partagé (src/lib/tone.ts) — la tonalité de la
 * section sous le centre vertical du carton, propre à CE carton,
 * indépendante de la nav et des deux autres.
 */
export function RailSlot({ cardIndex, anchor }: RailSlotProps) {
  const card = railCards[cardIndex];
  const measureRef = useRef<HTMLDivElement>(null);
  const tone = useSectionTone(measureRef);

  useEffect(() => {
    // Le 3ᵉ carton n'a personne après lui à positionner : rien à mesurer.
    if (cardIndex === 2) return;
    const el = measureRef.current;
    if (!el) return;

    const varName = cardIndex === 0 ? "--rail-h1" : "--rail-h2";
    const update = () => {
      document.documentElement.style.setProperty(varName, `${el.offsetHeight}px`);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cardIndex]);

  const stickyClassName = [
    styles.stickyWrap,
    cardIndex === 0 ? styles.stickyWrap1 : "",
    cardIndex === 1 ? styles.stickyWrap2 : "",
    cardIndex === 2 ? styles.stickyWrap3 : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.slot} data-rail-slot style={{ gridRow: `${anchor}-start / -1` }}>
      <div ref={measureRef} className={stickyClassName}>
        <RailCardArticle
          card={card}
          action={cardIndex === 2}
          Icon={RAIL_ICONS[cardIndex]}
          tone={tone}
        />
      </div>
    </div>
  );
}

function RailCardArticle({
  card,
  action,
  Icon,
  tone,
}: {
  card: RailCardContent;
  action: boolean;
  Icon: ComponentType<{ className?: string }>;
  tone: Tone;
}) {
  const className = [styles.card, action ? styles.cardAction : ""].filter(Boolean).join(" ");
  const content = (
    <>
      <span className={styles.cardIcon}>
        <Icon className={styles.cardIconSvg} />
      </span>
      <p className={styles.cardTitle}>{card.title}</p>
      <p className={styles.cardText}>{card.text}</p>
    </>
  );

  if (card.href) {
    return (
      <Link href={card.href} className={className} data-rail-card data-tone={tone}>
        {content}
      </Link>
    );
  }

  return (
    <article className={className} data-rail-card data-tone={tone}>
      {content}
    </article>
  );
}
