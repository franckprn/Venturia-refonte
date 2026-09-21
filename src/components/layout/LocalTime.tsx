"use client";

import { useSyncExternalStore } from "react";
import styles from "./footer.module.css";

/**
 * formatToParts + jointure manuelle par ":" plutôt que le formatage
 * groupé de Intl : certains environnements rendent l'heure de minuit
 * "24:XX" avec hour12:false selon le cycle horaire du CLDR, et le
 * séparateur groupé varie avec la locale (":", ".", espace fine…).
 * hourCycle: "h23" + jointure manuelle donnent "14:32" à coup sûr.
 */
function getToulouseTime(): string {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  return `${hour}:${minute}`;
}

function getServerSnapshot(): string {
  return "";
}

function subscribe(callback: () => void): () => void {
  const interval = setInterval(callback, 60_000);
  return () => clearInterval(interval);
}

/**
 * Heure locale de Toulouse, mise à jour chaque minute. `useSyncExternalStore`
 * plutôt qu'un useEffect + setState : `getServerSnapshot` rend la
 * chaîne vide côté serveur (le fuseau du visiteur n'est connu que côté
 * client, donc aucune erreur d'hydratation possible), `subscribe`
 * pose l'intervalle et le nettoie lui-même à la fin de l'abonnement —
 * pas de useEffect séparé à démonter à la main.
 *
 * Partagé entre la barre légale du footer (défaut, `.legalTime`) et le
 * bas du panneau du menu mobile (`className`, voir megamenu.module.css
 * `.mobileTime`) : même logique, jamais dupliquée — seule l'habille
 * change.
 */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getToulouseTime, getServerSnapshot);
  return <span className={className ?? styles.legalTime}>{time}</span>;
}
