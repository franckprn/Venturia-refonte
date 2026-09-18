// Icônes des cartons du rail — SVG inline, sans librairie (CLAUDE.md,
// « Rail droit ») : un carré de 44px par carton contient un de ces
// glyphes à 20px, trait 1.5px, couleur héritée (currentColor) posée par
// .cardIcon dans rail.module.css. Décoratives : aria-hidden="true".

type IconProps = {
  className?: string;
};

const SHARED_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Carton 1 — « Combien de temps » : une horloge. */
export function IconClock({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 6.5V10L12.5 11.75" />
    </svg>
  );
}

/** Carton 2 — « Le GEO » : une étoile à quatre branches (symbole IA). */
export function IconSparkle({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <path d="M10 2.5L11.3 8.7L17.5 10L11.3 11.3L10 17.5L8.7 11.3L2.5 10L8.7 8.7Z" />
    </svg>
  );
}

/** Carton 3 — « Parler du projet » : une flèche vers la droite. */
export function IconArrowRight({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className}>
      <path d="M4 10H16M10.5 5L16 10L10.5 15" />
    </svg>
  );
}
