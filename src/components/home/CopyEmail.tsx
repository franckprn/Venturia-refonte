"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import p from "./pages.module.css";

// Copie l'adresse : utile à qui lit son courrier dans le navigateur, où
// un lien mailto ouvre une autre application. L'état « copiée » revient
// après 2 s ; l'annonce passe par une région aria-live.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Presse-papier indisponible : l'adresse reste affichée et cliquable.
    }
  }

  return (
    <button type="button" className={p.copy} onClick={copy} data-copied={copied || undefined}>
      {copied ? <Check aria-hidden="true" size={18} weight="bold" /> : <Copy aria-hidden="true" size={18} />}
      <span aria-live="polite">{copied ? "Adresse copiée" : "Copier l'adresse"}</span>
    </button>
  );
}
