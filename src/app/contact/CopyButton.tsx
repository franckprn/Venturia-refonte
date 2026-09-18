"use client";

import { useEffect, useState } from "react";
import styles from "./contact.module.css";

type CopyButtonProps = {
  value: string;
  label: string;
  copiedLabel: string;
};

/**
 * Seul élément client de la page (le reste est rendu côté serveur) :
 * un mailto seul échoue chez qui lit son mail dans le navigateur,
 * l'adresse doit rester récupérable au clic.
 *
 * L'état "copié" revient après 2s via un effet (pas un setTimeout posé
 * dans le handler) : ça nettoie proprement si le composant se démonte
 * ou si on reclique avant l'échéance, sans fuite de minuteur.
 */
export function CopyButton({ value, label, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Presse-papier indisponible (permissions, contexte non
      // sécurisé…) : l'adresse reste visible et le mailto fonctionne
      // toujours, rien de plus à faire ici.
    }
  }

  return (
    <button type="button" className={styles.copyButton} onClick={handleClick}>
      {copied ? copiedLabel : label}
    </button>
  );
}
