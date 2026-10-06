"use client";

import { useState } from "react";
import { ArrowLink } from "@/components/ArrowLink";
import { ServiceSplitIntro } from "./ServiceSplitIntro";
import { parseLocaleNumber, formatLocaleInt } from "@/lib/localeNumber";
import type { ServiceRateCalculatorBlock } from "@/content/services/types";
import styles from "./ServiceRateCalculator.module.css";

// Bornes de validation (constantes de calcul, pas du texte — même
// convention que ServiceCalculator.tsx/ServiceRoasCalculator.tsx). Les 3
// champs suivent la règle de la marge de ServiceRoasCalculator (pas celle,
// plus permissive, de ServiceCalculator) : vide/0/négatif/non numérique OU
// hors bornes → invalide, jamais un bornage silencieux — demande explicite
// de Franck.
const VISITORS_MIN = 1;
const VISITORS_MAX = 1_000_000;
const RATE_MIN = 0.1;
const RATE_MAX = 20;
const BASKET_MIN = 1;
const BASKET_MAX = 10_000;

/** Point fixe de l'amélioration simulée (+0,5 point de taux d'achat),
 *  indépendant de la valeur saisie — constante de calcul, pas du texte. */
const RATE_GAIN = 0.5;
const MONTHS_PER_YEAR = 12;

function validInRange(raw: string, min: number, max: number): number | null {
  const value = parseLocaleNumber(raw);
  if (value === null || value < min || value > max) return null;
  return value;
}

/**
 * Bloc « Calculateur » de la page Création de site — moment fort, placé
 * juste après le Hero (CLAUDE.md, « Pages services — gabarit »). Même
 * mécanique de saisie que ServiceCalculator/ServiceRoasCalculator
 * (type="text"+inputMode="decimal", virgule acceptée, parsing partagé via
 * src/lib/localeNumber.ts), formule propre à cette page : chiffre
 * d'affaires actuel = visiteurs × taux / 100 × panier ; gain mensuel à
 * +0,5 point = visiteurs × 0,5 / 100 × panier (indépendant du taux saisi,
 * seulement de sa validité) ; gain annuel = gain mensuel × 12. Calcul
 * dérivé à chaque rendu (pas de useEffect), comme les deux autres
 * calculateurs.
 */
export function ServiceRateCalculator({
  label,
  title,
  visitorsLabel,
  visitorsDefault,
  rateLabel,
  rateDefault,
  basketLabel,
  basketDefault,
  currentLabel,
  currentSuffix,
  gainLabel,
  gainSuffix,
  yearlyPrefix,
  yearlySuffix,
  note,
  emptyValue,
  cta,
}: ServiceRateCalculatorBlock) {
  const [visitorsRaw, setVisitorsRaw] = useState(String(visitorsDefault));
  const [rateRaw, setRateRaw] = useState(String(rateDefault));
  const [basketRaw, setBasketRaw] = useState(String(basketDefault));

  const visitorsVal = validInRange(visitorsRaw, VISITORS_MIN, VISITORS_MAX);
  const rateVal = validInRange(rateRaw, RATE_MIN, RATE_MAX);
  const basketVal = validInRange(basketRaw, BASKET_MIN, BASKET_MAX);

  const currentValue =
    visitorsVal !== null && rateVal !== null && basketVal !== null
      ? Math.round(visitorsVal * (rateVal / 100) * basketVal)
      : null;
  const currentDisplay = currentValue !== null ? `${formatLocaleInt(currentValue)} €` : emptyValue;

  const gainValue =
    visitorsVal !== null && rateVal !== null && basketVal !== null
      ? Math.round(visitorsVal * (RATE_GAIN / 100) * basketVal)
      : null;
  const gainDisplay = gainValue !== null ? `+${formatLocaleInt(gainValue)} €` : emptyValue;

  const yearlyValue = gainValue !== null ? gainValue * MONTHS_PER_YEAR : null;
  const yearlyDisplay = yearlyValue !== null ? `+${formatLocaleInt(yearlyValue)} €` : emptyValue;

  return (
    <ServiceSplitIntro label={label} title={title} headingId="service-rate-calculator-title">
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="service-rate-visitors" className={styles.fieldLabel}>
            {visitorsLabel}
          </label>
          <input
            id="service-rate-visitors"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={visitorsRaw}
            onChange={(event) => setVisitorsRaw(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="service-rate-rate" className={styles.fieldLabel}>
            {rateLabel}
          </label>
          <input
            id="service-rate-rate"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={rateRaw}
            onChange={(event) => setRateRaw(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="service-rate-basket" className={styles.fieldLabel}>
            {basketLabel}
          </label>
          <input
            id="service-rate-basket"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={basketRaw}
            onChange={(event) => setBasketRaw(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.result} aria-live="polite">
        <p className={styles.currentLine}>
          <span>{currentLabel}</span>
          <span>{currentDisplay}</span>
          <span>{currentSuffix}</span>
        </p>
        <p className={styles.resultLine}>
          <span className={styles.resultLabel}>{gainLabel}</span>
          <span className={styles.resultValue}>{gainDisplay}</span>
          <span className={styles.resultSuffix}>{gainSuffix}</span>
        </p>
        <p className={styles.yearlyLine}>
          <span>{yearlyPrefix}</span>
          <span>{yearlyDisplay}</span>
          <span>{yearlySuffix}</span>
        </p>
      </div>

      <p className={styles.note}>{note}</p>

      <ArrowLink href={cta.href} label={cta.label} direction="right" className={styles.cta} />
    </ServiceSplitIntro>
  );
}
