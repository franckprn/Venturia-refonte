// Registre partagé de l'instance Lenis active — `lenis` est une
// dépendance du projet mais n'est initialisée nulle part encore
// (aucun <html class="lenis"> ni `new Lenis()` dans le repo à ce
// jour) : pauseLenis()/resumeLenis() sont donc des no-op tant que rien
// n'appelle setLenisInstance() depuis l'initialisation globale à
// venir. Le jour où elle existe, il suffit de l'enregistrer ici — le
// méga-menu (et tout autre composant qui doit suspendre le scroll
// fluide pendant une superposition) fonctionne alors sans changement.
type LenisLike = { stop: () => void; start: () => void };

let instance: LenisLike | null = null;

export function setLenisInstance(next: LenisLike | null): void {
  instance = next;
}

export function pauseLenis(): void {
  instance?.stop();
}

export function resumeLenis(): void {
  instance?.start();
}
