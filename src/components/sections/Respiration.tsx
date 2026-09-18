import { respiration } from "@/content/respiration";
import { RespirationReveal } from "./RespirationReveal";

// Section Respiration (home, section 3) — l'opposé absolu de la
// section « Dernier accompagnement » qui précède : fond --ink, du
// texte, rien d'autre. Pas de titre, pas de label, pas d'icône, pas de
// bouton, pas de filet, pas d'image. Aucun carton de rail : elle passe
// par <Section> sans prop `rail`, exactement comme les autres sections
// qui n'en portent pas (voir page.tsx).
//
// Copy réelle dans content/respiration.ts, à reprendre au caractère
// près : ne rien reformuler.
export function Respiration() {
  return (
    <RespirationReveal
      block1={respiration.block1}
      block2={respiration.block2}
      block3={respiration.block3}
    />
  );
}
