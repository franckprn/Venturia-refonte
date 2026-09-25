import { HeroReveal } from "./HeroReveal";
import { HeroPhoto } from "./HeroPhoto";

// Hero de la home — première section, sous la nav fixe. Aucune forme
// décorative : la composition tient sur la typographie, l'espacement et
// une seule photo.
//
// Pas de badge de disponibilité : retiré à la demande de Franck (S9),
// rien ne le remplace.
//
// <HeroPhoto> à part de <HeroReveal> (fragment, deux enfants directs de
// .body) : elle ne porte aucune animation d'entrée (CLAUDE.md), donc pas
// de raison de vivre dans le composant client qui coordonne le h1/
// sous-titre/CTA.
export function Hero() {
  return (
    <>
      <HeroReveal />
      <HeroPhoto />
    </>
  );
}
