import Image from "next/image";
import { hero } from "@/content/hero";
import styles from "./hero.module.css";

/**
 * Photo du Hero — colonnes 1-6 dès 1024px, pleine largeur sous le h1 en
 * dessous (voir CLAUDE.md, « Hero (home) »). Composant serveur séparé de
 * <HeroReveal> : aucune animation d'entrée sur cet élément (probable plus
 * gros poids de la page), donc aucune raison d'en faire un composant
 * client.
 *
 * `fill` + conteneur dimensionné en CSS (hero.module.css `.photo`) :
 * ratio 3/2 par défaut en dessous de 1024px, hauteur calculée en desktop
 * (clamp géométrique — voir le commentaire au-dessus de `.photo` dans
 * hero.module.css). `priority` : image au-dessus de la ligne de
 * flottaison, candidate LCP quasi certaine dès qu'elle existe.
 */
export function HeroPhoto() {
  return (
    <div className={styles.photo}>
      <Image
        src="/images/photo_sc.jpg"
        alt={hero.photoAlt}
        fill
        priority
        sizes="(min-width: 1024px) calc(50vw - 162px), calc(100vw - 40px)"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}
