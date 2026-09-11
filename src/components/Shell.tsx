import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import styles from "./shell.module.css";

type ShellProps = {
  /** Une suite de <Section name="…"> et, éventuellement, de sections
   *  pleine largeur comme <Respiration name="…"> — dans l'ordre. */
  children: React.ReactNode;
};

/** Ce que Shell a besoin de lire/écrire sur ses enfants directs. */
type ShellChildProps = {
  name?: string;
  rail?: React.ReactNode;
  railRowEnd?: number;
};

/**
 * Grille unique de la page : colonne contenu (1fr) + colonne rail
 * (250px). Chaque enfant donne son `name`, dans l'ordre — Shell en
 * déduit une ligne de grille nommée par section (`[nom-start] auto`),
 * sans jamais connaître de hauteur à l'avance.
 *
 * Ça permet au carton du rail d'une section de s'étendre de sa propre
 * ligne jusqu'à (quasiment) la toute dernière : sa zone de figement va
 * jusqu'au bas de la grille tout en démarrant au bon endroit — sans
 * hauteur ni offset écrit en dur.
 *
 * « Quasiment » la dernière ligne, et pas systématiquement -1: Shell
 * compte, pour chaque section porteuse d'un carton, combien de cartons
 * la suivent encore, et arrête sa zone une ligne plus tôt par carton
 * suivant (-1 pour le dernier carton, -2 pour l'avant-dernier, etc.).
 * Sans ça, deux cartons dont la zone finit exactement à la même ligne
 * convergeraient vers la même position en approchant du bas de page au
 * lieu de rester empilés à 20px d'écart (la ligne juste avant celle
 * d'un carton donne, par construction, assez de marge au carton
 * précédent — c'est la hauteur de la section de ce carton-là).
 *
 * Une section pleine largeur (fond plein, pas de rail, ex. Respiration)
 * est un enfant comme les autres ici : elle porte son propre `name` et
 * un `grid-column: 1 / -1`, mais jamais de `rail` — elle compte pour la
 * hauteur totale de la grille (donc pour la zone des cartons qui la
 * précèdent) sans jamais en recevoir un.
 *
 * Aucun overflow / contain nulle part sur cet arbre : un seul suffirait
 * à désactiver le position: sticky des cartons du rail.
 */
export function Shell({ children }: ShellProps) {
  const kids = Children.toArray(children).filter(isValidElement) as ReactElement<ShellChildProps>[];

  const names = kids.map((child, i) => child.props.name ?? `section-${i}`);
  const gridTemplateRows = names.map((n) => `[${n}-start] auto`).join(" ");

  const railIndexes = kids.reduce<number[]>((acc, child, i) => {
    if (child.props.rail) acc.push(i);
    return acc;
  }, []);

  const enhanced = kids.map((child, i) => {
    const rank = railIndexes.indexOf(i);
    if (rank === -1) return child;
    const laterRailCount = railIndexes.length - 1 - rank;
    return cloneElement(child, { railRowEnd: -(1 + laterRailCount) });
  });

  return (
    <div className={styles.shell} data-rail style={{ gridTemplateRows }}>
      {enhanced}
    </div>
  );
}
