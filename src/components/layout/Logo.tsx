// Logo Venturia — SVG inline converti depuis public/logo-va.svg (au lieu
// d'un <img>/next/image) : aucune requête réseau supplémentaire, et
// fill="currentColor" laisse la couleur pilotée par le texte environnant
// (--ink par défaut). Décoratif à l'usage : aria-hidden="true" ici, le
// libellé accessible porté par le <Link> qui l'enveloppe (voir Nav.tsx).
// Géométrie identique au fichier source, seule la mise en forme du <svg>
// racine change (viewBox conservé, fill/stroke déplacés sur la racine).

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
      className={className}
    >
      <g transform="translate(0,512) scale(0.1,-0.1)">
        <path d="M470 4026 c0 -4 1007 -2815 1037 -2894 l16 -42 168 0 167 0 16 43 c9 23 248 683 530 1467 l514 1425 -180 3 c-100 1 -183 1 -185 -1 -2 -3 -164 -454 -359 -1003 -344 -967 -426 -1211 -475 -1416 -13 -54 -25 -98 -28 -98 -4 0 -19 53 -34 117 -49 201 -109 381 -467 1388 -192 539 -351 988 -355 998 -6 15 -25 17 -186 17 -98 0 -179 -2 -179 -4z" />
        <path d="M3255 4018 c-2 -7 -240 -668 -529 -1468 l-524 -1455 180 -3 c100 -1 183 -1 185 1 2 2 163 454 359 1003 344 968 426 1211 475 1417 13 53 25 97 28 97 4 0 19 -53 34 -118 50 -204 110 -383 467 -1387 192 -539 351 -988 355 -997 6 -16 25 -18 186 -18 98 0 179 2 179 4 0 4 -1007 2815 -1037 2894 l-16 42 -169 0 c-126 0 -170 -3 -173 -12z" />
      </g>
    </svg>
  );
}
