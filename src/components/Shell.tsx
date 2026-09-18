import { Children, isValidElement, type ReactElement } from "react";
import styles from "./shell.module.css";

type ShellProps = {
  /** Une suite de <Section name="…">, de sections pleine largeur, et
   *  des <RailSlot> du rail (voir components/layout/Rail.tsx) —
   *  dans l'ordre. */
  children: React.ReactNode;
};

/** Ce que Shell a besoin de lire sur ses enfants directs. */
type ShellChildProps = {
  name?: string;
};

/**
 * Grille unique de la page : colonne contenu (1fr) + colonne rail
 * (250px). Chaque <Section name="…"> donne son nom, dans l'ordre —
 * Shell en déduit une ligne de grille nommée par section
 * (`[nom-start] auto`), sans jamais connaître de hauteur à l'avance.
 *
 * Les <RailSlot> du rail n'ont pas de `name` : ils ne contribuent
 * aucune ligne ici (filtrés de ce calcul), et se positionnent plutôt en
 * RÉFÉRENÇANT les lignes déjà nommées par la section à laquelle ils
 * s'ancrent (`grid-row: hero-start / -1`, etc. — voir Rail.tsx) : leur
 * alignement avec le contenu vient du partage de ces lignes, jamais
 * d'une mesure JS. `-1` (systématique, jamais décrémenté par carton
 * suivant) : la zone de chaque carton va jusqu'à la toute dernière
 * ligne de la grille — jusqu'au bas de la page, pas jusqu'à la fin de
 * sa seule section. C'est ce qui fait tenir l'empilement permanent :
 * un slot qui s'arrête avec sa section ferait repartir le carton (un
 * relais, pas un empilement — voir CLAUDE.md, « Rail droit »).
 *
 * Aucun overflow / contain nulle part sur cet arbre : un seul suffirait
 * à désactiver le position: sticky des cartons du rail.
 */
export function Shell({ children }: ShellProps) {
  const kids = Children.toArray(children).filter(isValidElement) as ReactElement<ShellChildProps>[];

  const gridTemplateRows = kids
    .filter((child) => child.props.name)
    .map((child) => `[${child.props.name}-start] auto`)
    .join(" ");

  return (
    <div className={styles.shell} data-rail style={{ gridTemplateRows }}>
      {kids}
    </div>
  );
}
