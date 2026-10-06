"use client";

import { useState } from "react";
import { ArrowLink } from "@/components/ArrowLink";
import { ServiceSplitIntro } from "./ServiceSplitIntro";
import { parseLocaleNumber, formatLocaleInt, formatLocaleDecimal } from "@/lib/localeNumber";
import type { ServiceRoasCalculatorBlock } from "@/content/services/types";
import styles from "./ServiceRoasCalculator.module.css";

// Bornes de validation (constante de calcul, pas du texte — même
// convention que ServiceCalculator.tsx). Contrairement à ce dernier
// (une valeur positive hors bornes y est bornée en silence), la marge
// hors de [1, 99] est ICI invalide (résultat "—") plutôt que bornée :
// une marge de 120 % n'a pas de sens à ramener à 99 % sans le dire —
// demande explicite de Franck (voir la vérification du prompt :
// « marge 0, vide ou 120 → "—" »).
const MARGIN_MIN = 1;
const MARGIN_MAX = 99;

/** `null` si vide/0/négative/non numérique/hors de [MARGIN_MIN, MARGIN_MAX]. */
function validMargin(raw: string): number | null {
  const value = parseLocaleNumber(raw);
  if (value === null || value < MARGIN_MIN || value > MARGIN_MAX) return null;
  return value;
}

/** `null` si vide/0/négative/non numérique — aucune borne haute (le
 *  panier moyen n'a pas de plafond donné par Franck, contrairement aux
 *  champs de ServiceCalculator). */
function validBasket(raw: string): number | null {
  const value = parseLocaleNumber(raw);
  if (value === null || value <= 0) return null;
  return value;
}

/**
 * Bloc « Calculateur » de la page Publicité — même mécanique de saisie
 * que ServiceCalculator (type="text"+inputMode="decimal", virgule
 * acceptée, parsing partagé via src/lib/localeNumber.ts), formule
 * propre à cette page : ROAS minimum = 100 / marge ; coût maximum par
 * commande = panier × marge / 100. Calcul dérivé à chaque rendu (pas de
 * useEffect), comme ServiceCalculator.
 */
export function ServiceRoasCalculator({
  label,
  title,
  marginLabel,
  marginDefault,
  basketLabel,
  roasResultLabel,
  roasHelp,
  costResultLabel,
  note,
  emptyValue,
  cta,
}: ServiceRoasCalculatorBlock) {
  const [marginRaw, setMarginRaw] = useState(String(marginDefault));
  const [basketRaw, setBasketRaw] = useState("");

  const marginVal = validMargin(marginRaw);
  const basketTrimmed = basketRaw.trim();
  const basketVal = basketTrimmed === "" ? null : validBasket(basketRaw);

  const roasValue = marginVal !== null ? 100 / marginVal : null;
  const roasDisplay = roasValue !== null ? formatLocaleDecimal(roasValue, 1) : emptyValue;

  const costValue =
    marginVal !== null && basketVal !== null ? Math.round((basketVal * marginVal) / 100) : null;
  // U+00A0 avant "€" (CLAUDE.md, « Texte »).
  const costDisplay = costValue !== null ? `${formatLocaleInt(costValue)} €` : emptyValue;

  return (
    <ServiceSplitIntro label={label} title={title} headingId="service-roas-calculator-title">
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="service-roas-margin" className={styles.fieldLabel}>
            {marginLabel}
          </label>
          <input
            id="service-roas-margin"
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={marginRaw}
            onChange={(event) => setMarginRaw(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="service-roas-basket" className={styles.fieldLabel}>
            {basketLabel}
          </label>
          <input
            id="service-roas-basket"
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
        <p className={styles.resultLine}>
          <span className={styles.resultLabel}>{roasResultLabel}</span>
          <span className={styles.resultValue}>{roasDisplay}</span>
        </p>
        <p className={styles.resultHelp}>{roasHelp}</p>
        {basketTrimmed !== "" && (
          <p className={styles.costLine}>
            <span>{costResultLabel}</span>
            <span>{costDisplay}</span>
          </p>
        )}
      </div>

      <p className={styles.note}>{note}</p>

      <ArrowLink href={cta.href} label={cta.label} direction="right" className={styles.cta} />
    </ServiceSplitIntro>
  );
}
