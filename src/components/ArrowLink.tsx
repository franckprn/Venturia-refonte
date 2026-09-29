import Link from "next/link";
import styles from "./arrow-link.module.css";

type ArrowDirection = "down" | "right";

type ArrowLinkProps = {
  href: string;
  label: string;
  /** "down" = CTA secondaire du Hero (chevron ↓, le padding-bottom du
   *  filet grandit au survol). "right" = lien « Découvrir… » des
   *  services (flèche →, la flèche glisse de 4px vers la droite au
   *  survol — CLAUDE.md, « Services (home) »). Par défaut "down". */
  direction?: ArrowDirection;
  className?: string;
  /** "link" (défaut, comportement inchangé) rend un vrai `<Link>`.
   *  "span" rend le même balisage/style visuel SANS lien propre — pour
   *  un usage niché dans un ancêtre déjà cliquable (une ligne entière
   *  transformée en `<Link>`, CLAUDE.md « Autres expertises ») : un `<a>`
   *  imbriqué dans un `<a>` est invalide et casserait la zone cliquable
   *  de l'ancêtre. Non focusable (pas de tabindex) : un seul lien par
   *  ligne dans l'ordre de tabulation, l'ancêtre. `href` reste requis
   *  dans les deux cas (simplicité de l'API), ignoré si `as="span"`. */
  as?: "link" | "span";
};

const ARROW_PATH: Record<ArrowDirection, string> = {
  down: "M8 2.5V13M3.5 9L8 13.5L12.5 9",
  right: "M2.5 8H13M9 3.5L13.5 8L9 12.5",
};

/**
 * Lien texte + flèche, style unique du site (filet --ink sous le texte,
 * --t-body/500, zone tactile >= 44px) — d'abord le CTA secondaire du
 * Hero (`direction="down"`), réutilisé tel quel par les liens
 * « Découvrir… » de la section Services (`direction="right"`), pour
 * garder un seul composant plutôt qu'un style dupliqué (CLAUDE.md,
 * « Services (home) »).
 *
 * L'animation de survol dépend de la direction — celle déjà en place
 * pour le CTA du Hero (`down`) est inchangée ; `right` est nouvelle,
 * demandée explicitement (flèche translateX 4px, jamais le filet).
 * Un seul easing (cubic-bezier(0,.55,.45,1)), 200ms — dans la plage
 * 150-400ms du CLAUDE.md. `prefers-reduced-motion` : couvert par la
 * règle globale (`transition-duration: 0.01ms !important` sur `*`,
 * globals.css), rien à ajouter ici.
 *
 * Ordre flèche/texte inversé selon la direction : la flèche ↓ précède
 * le texte (comme avant, Hero), la flèche → le suit (« Découvrir le
 * référencement → », lecture naturelle d'un lien qui pointe vers la
 * droite) — seul l'ORDRE change, le balisage et les classes restent
 * les mêmes des deux côtés.
 */
export function ArrowLink({ href, label, direction = "down", className, as = "link" }: ArrowLinkProps) {
  const arrow = (
    <svg
      className={styles.arrow}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={ARROW_PATH[direction]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const classNameFull = [styles.link, className].filter(Boolean).join(" ");
  const content =
    direction === "right" ? (
      <>
        {label}
        {arrow}
      </>
    ) : (
      <>
        {arrow}
        {label}
      </>
    );

  if (as === "span") {
    return (
      <span className={classNameFull} data-direction={direction}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={classNameFull} data-direction={direction}>
      {content}
    </Link>
  );
}
