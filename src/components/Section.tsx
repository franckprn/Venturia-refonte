import styles from "./section.module.css";

type SectionProps = {
  /** Identifiant structurel : nomme la ligne de grille de cette section
   *  dans le Shell parent (voir Shell.tsx). Sert aussi d'ancre par
   *  défaut si `id` n'est pas fourni. Stable, unique dans la page. */
  name: string;
  /** id d'ancre (nav interne), si différent de `name`. scroll-margin-top
   *  84px est global. */
  id?: string;
  /** Rattache le label du <section> à un titre (aria-labelledby). */
  labelledBy?: string;
  /** Le carton du rail de cette section. Vit dans la colonne de droite,
   *  se fige à 84px et RESTE figé jusqu'au bas de la grille (voir
   *  rail.module.css pour l'empilement avec les cartons suivants). En
   *  mobile il s'insère dans le flux, juste après le contenu. */
  rail?: React.ReactNode;
  /** Ligne de fin de la zone de figement du carton, injectée par Shell
   *  (compte les cartons qui suivent encore celui-ci). -1 par défaut :
   *  utile seulement si <Section> est utilisée hors d'un <Shell>. */
  railRowEnd?: number;
  /** Classe portée par le <section> (fond, padding vertical spécifique…). */
  className?: string;
  /** Classe portée par la colonne de contenu (grille 12 col par défaut). */
  bodyClassName?: string;
  children: React.ReactNode;
};

/**
 * Une section de page = deux enfants directs du Shell (rendus en
 * fragment, pas imbriqués) : le <section> de contenu, placé sur la
 * ligne « name-start » de la colonne 1 ; et — s'il y a un carton — un
 * conteneur en colonne 2 qui s'étend de cette même ligne jusqu'à
 * `railRowEnd` (voir Shell.tsx : -1 pour le dernier carton de la page,
 * une ligne plus tôt par carton qui le suit encore). C'est ce grand
 * conteneur, pas la hauteur de la section, qui délimite la zone où le
 * carton peut se figer.
 *
 * En mobile (Shell en bloc), le fragment place le carton juste après
 * le contenu dans le flux, sans rien de spécial à faire.
 */
export function Section({
  name,
  id,
  labelledBy,
  rail,
  railRowEnd = -1,
  className,
  bodyClassName,
  children,
}: SectionProps) {
  return (
    <>
      <section
        id={id ?? name}
        aria-labelledby={labelledBy}
        className={[styles.section, className].filter(Boolean).join(" ")}
        style={{ gridRow: `${name}-start` }}
      >
        <div
          className={[styles.body, bodyClassName].filter(Boolean).join(" ")}
        >
          {children}
        </div>
      </section>
      {rail ? (
        <div
          className={styles.rail}
          data-rail-slot
          style={{ gridRow: `${name}-start / ${railRowEnd}` }}
        >
          {rail}
        </div>
      ) : null}
    </>
  );
}
