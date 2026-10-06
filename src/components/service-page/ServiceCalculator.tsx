"use client";

import { useState } from "react";
import { ArrowLink } from "@/components/ArrowLink";
import { ServiceSplitIntro } from "./ServiceSplitIntro";
import { parseLocaleNumber, clampLocaleNumber as clamp, formatLocaleInt as formatInt } from "@/lib/localeNumber";
import type { ServiceCalculatorBlock } from "@/content/services/types";
import styles from "./ServiceCalculator.module.css";

// Bornes de validation (constantes de calcul, pas du texte — CLAUDE.md
// « Pages services — gabarit », ServiceCalculatorBlock). Une valeur
// positive hors bornes est bornée en silence ; vide/0/négative/non
// numérique reste invalide (résultat "—"), jamais bornée.
const MINUTES_MIN = 1;
const MINUTES_MAX = 480;
const COUNT_MIN = 1;
const COUNT_MAX = 500;
const COST_MIN = 1;
const COST_MAX = 1000;

const WEEKS_PER_YEAR = 52;
const MINUTES_PER_HOUR = 60;

/**
 * Bloc 4bis des pages /services/* — « Calculateur », entre la
 * Respiration rouge et L'outil (CLAUDE.md, « Pages services —
 * gabarit »). Seul composant client de la section — `ServiceSplitIntro`
 * (label + h2, serveur) l'enveloppe comme les autres blocs ; champs,
 * résultat, note et CTA vivent tous dans son axe droit (`.right`), rien
 * en pleine largeur.
 *
 * `type="text"` + `inputMode="decimal"` sur les 3 champs (jamais
 * `type="number"`) : aucune flèche native, aucun changement de valeur à
 * la molette — demande explicite de Franck. Calcul dérivé à chaque
 * rendu (pas de `useEffect`) : heures/an = minutes × fois × 52 / 60
 * (arrondi à l'affichage seulement — le calcul euros réutilise la
 * valeur NON arrondie) ; euros/an = heures non arrondies × coût horaire,
 * arrondi.
 */
export function ServiceCalculator({
  label,
  title,
  minutesLabel,
  minutesDefault,
  countLabel,
  countDefault,
  hourlyCostLabel,
  resultSuffix,
  euroPrefix,
  euroSuffix,
  emptyValue,
  note,
  cta,
}: ServiceCalculatorBlock) {
  const [minutesRaw, setMinutesRaw] = useState(String(minutesDefault));
  const [countRaw, setCountRaw] = useState(String(countDefault));
  const [costRaw, setCostRaw] = useState("");

  const minutesVal = clamp(parseLocaleNumber(minutesRaw), MINUTES_MIN, MINUTES_MAX);
  const countVal = clamp(parseLocaleNumber(countRaw), COUNT_MIN, COUNT_MAX);
  const costTrimmed = costRaw.trim();
  const costVal = costTrimmed === "" ? null : clamp(parseLocaleNumber(costRaw), COST_MIN, COST_MAX);

  const hoursExact =
    minutesVal !== null && countVal !== null
      ? (minutesVal * countVal * WEEKS_PER_YEAR) / MINUTES_PER_HOUR
      : null;
  const hoursDisplay = hoursExact !== null ? formatInt(hoursExact) : emptyValue;

  const euroValue = hoursExact !== null && costVal !== null ? Math.round(hoursExact * costVal) : null;
  // U+00A0 avant "€" (CLAUDE.md, « Texte ») ; le séparateur de milliers
  // (U+202F) vient directement d'Intl.NumberFormat("fr-FR").
  const euroDisplay = euroValue !== null ? `${formatInt(euroValue)} €` : emptyValue;

  return (
    <ServiceSplitIntro label={label} title={title} headingId="service-calculator-title">
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="service-calculator-minutes" className={styles.fieldLabel}>
            {minutesLabel}
          </label>
          <input
            id="service-calculator-minutes"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={minutesRaw}
            onChange={(event) => setMinutesRaw(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="service-calculator-count" className={styles.fieldLabel}>
            {countLabel}
          </label>
          <input
            id="service-calculator-count"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={countRaw}
            onChange={(event) => setCountRaw(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="service-calculator-cost" className={styles.fieldLabel}>
            {hourlyCostLabel}
          </label>
          <input
            id="service-calculator-cost"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={costRaw}
            onChange={(event) => setCostRaw(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.result} aria-live="polite">
        <p className={styles.resultLine}>
          <span className={styles.resultValue}>{hoursDisplay}</span>
          <span className={styles.resultSuffix}>{resultSuffix}</span>
        </p>
        {costTrimmed !== "" && (
          <p className={styles.euroLine}>
            <span>{euroPrefix}</span>
            <span>{euroDisplay}</span>
            <span>{euroSuffix}</span>
          </p>
        )}
      </div>

      <p className={styles.note}>{note}</p>

      <ArrowLink href={cta.href} label={cta.label} direction="right" className={styles.cta} />
    </ServiceSplitIntro>
  );
}
