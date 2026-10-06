// Parsing/formatage numérique partagé par les calculateurs des pages
// /services/* (ServiceCalculator, ServiceRoasCalculator) — extrait de
// ServiceCalculator.tsx (déplacement pur, aucun changement de
// comportement) pour que les deux composants acceptent exactement la
// même tolérance de saisie sans dupliquer le code.

const numberFormatter = new Intl.NumberFormat("fr-FR");

/**
 * Parse un nombre saisi au format français : virgule décimale (« 7,5 »
 * = 7.5), espaces ignorés (y compris un séparateur de milliers tapé à
 * la main) — tout le reste (lettres, plusieurs points/virgules...)
 * retourne `null`, jamais un NaN propagé plus loin.
 */
export function parseLocaleNumber(raw: string): number | null {
  const cleaned = raw.replace(/\s/g, "").replace(/,/g, ".");
  if (cleaned === "") return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

/** `null`, 0 ou négatif = invalide (jamais borné). Une valeur positive
 *  hors bornes est bornée en silence. */
export function clampLocaleNumber(value: number | null, min: number, max: number): number | null {
  if (value === null || value <= 0) return null;
  return Math.min(max, Math.max(min, value));
}

export function formatLocaleInt(value: number): string {
  return numberFormatter.format(Math.round(value));
}

export function formatLocaleDecimal(value: number, fractionDigits: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
