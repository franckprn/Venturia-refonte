import type { Tone } from "@/lib/tone";
import styles from "./section.module.css";

type SectionProps = {
  /** Identifiant structurel : nomme la ligne de grille de cette section
   *  dans le Shell parent (voir Shell.tsx). Sert aussi d'ancre par
   *  défaut si `id` n'est pas fourni, et de point d'accroche pour un
   *  <RailSlot> (voir components/layout/Rail.tsx). Stable, unique dans
   *  la page. */
  name: string;
  /** Tonalité RÉELLE du fond de la section — "light" (--ground), "dark"
   *  (--ink) ou "accent" (--accent). Obligatoire (CLAUDE.md,
   *  « Tonalités ») : la nav et les cartons du rail lisent cet attribut
   *  en JS (voir src/lib/tone.ts) pour adapter leur --fg. Portée par le
   *  <section> lui-même, pas par .body : c'est l'élément que le moteur
   *  de tonalités interroge (`section[data-tone]`). */
  tone: Tone;
  /** id d'ancre (nav interne), si différent de `name`. scroll-margin-top
   *  84px est global. */
  id?: string;
  /** Rattache le label du <section> à un titre (aria-labelledby). */
  labelledBy?: string;
  /** Classe portée par le <section> (fond, padding vertical spécifique…). */
  className?: string;
  /** Classe portée par la colonne de contenu (grille 12 col par défaut). */
  bodyClassName?: string;
  /** Style inline porté par la colonne de contenu — utile pour ajuster
   *  le row-gap de la grille 12 col sans dépendre de l'ordre de deux
   *  modules CSS (une classe seule n'a pas de priorité garantie). */
  bodyStyle?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Une section de page = un <section>, placé sur la ligne « name-start »
 * de la colonne 1 du Shell. Les cartons du rail ne vivent plus ici
 * (voir Rail.tsx) : Section ne s'occupe que du contenu.
 */
export function Section({
  name,
  tone,
  id,
  labelledBy,
  className,
  bodyClassName,
  bodyStyle,
  children,
}: SectionProps) {
  return (
    <section
      id={id ?? name}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={[styles.section, className].filter(Boolean).join(" ")}
      style={{ gridRow: `${name}-start` }}
    >
      <div className={[styles.body, bodyClassName].filter(Boolean).join(" ")} style={bodyStyle}>
        {children}
      </div>
    </section>
  );
}
