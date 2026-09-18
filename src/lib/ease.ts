import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

// L'unique easing du projet (CLAUDE.md « Animations ») :
// cubic-bezier(0, .55, .45, 1). Enregistré une seule fois, ici, pour que
// tout le monde (HeroReveal, RealisationsReveal, …) importe la même
// instance plutôt que de redéfinir le bezier à chaque composant.
CustomEase.create("venturia", "M0,0 C0,0.55 0.45,1 1,1");

export const VENTURIA_EASE = "venturia";
