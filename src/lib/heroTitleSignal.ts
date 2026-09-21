// Signal partagé « le h1 du Hero a fini son animation d'entrée »
// (HeroReveal.tsx) — écouté par le carton 1 du rail (Rail.tsx) pour
// démarrer l'animation de son horloge exactement à cet instant, jamais
// sur un délai estimé (CLAUDE.md, « Rail droit »).
//
// Un module partagé plutôt qu'un CustomEvent sur window : typé, et
// robuste à l'ordre de montage — si le hero a déjà fini (cas
// improbable mais possible avec le Fast Refresh de dev) au moment où
// le carton s'abonne, le callback est appelé immédiatement au lieu
// d'être perdu.
//
// Si le h1 ne s'anime pas (prefers-reduced-motion), HeroReveal ne
// monte jamais son animation et n'appelle donc jamais
// `markHeroTitleDone` : le signal ne part jamais, l'horloge ne
// s'anime jamais non plus.

type Listener = () => void;

let done = false;
const listeners = new Set<Listener>();

export function markHeroTitleDone() {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

/** S'abonne au signal ; retourne une fonction de désabonnement (à
 *  appeler au démontage). Si le signal est déjà parti, le callback est
 *  invoqué tout de suite et le désabonnement est un no-op. */
export function onHeroTitleDone(listener: Listener): () => void {
  if (done) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}
