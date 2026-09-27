import Image from "next/image";
import Link from "next/link";
import { realisations } from "@/content/realisations";
import { DernierAccompagnementReveal } from "./DernierAccompagnementReveal";
import styles from "./dernier-accompagnement.module.css";

// Section « Dernier accompagnement » (home, section 2) — un seul cas
// client, en split visuel / chiffres. Suit le Hero (crème, aligné à
// gauche), précède Respiration (plein charbon) : fond --ground, la
// composition en split est ce qui la distingue des deux.
//
// Aucun carton de rail ici : le rail n'en a que trois — hero, services,
// avant le CTA géant (CLAUDE.md, « Rail droit ») — et aucun ne tombe
// sur cette section.
//
// Contenu réel dans content/realisations.ts, non complété ici.
export function DernierAccompagnement() {
  const r = realisations;
  const hasImage = Boolean(r.image);

  return (
    <>
      <p className={styles.label}>{r.label}</p>

      <h2 id="dernier-accompagnement-title" className={styles.title}>
        {r.title}
      </h2>

      {/* Mise en page provisoire (style de paragraphe existant du
          site) : la mise en page dédiée de cette section fait l'objet
          d'un prompt suivant. */}
      <p className={styles.paragraph}>{r.paragraph}</p>

      <DernierAccompagnementReveal
        figures={r.figures}
        visual={
          <div className={styles.visual}>
            {hasImage ? (
              <Image
                src={r.image as string}
                alt={r.imageAlt}
                fill
                sizes="(max-width: 1023px) 100vw, 42vw"
                className={styles.image}
              />
            ) : (
              // Photo pas encore fournie par Franck : aplat --ink
              // portant le texte, jamais de photo de stock, jamais de
              // gris, jamais un placeholder invisible.
              // Fichier attendu : public{r.image}
              <p className={styles.imageFallback}>[PHOTO INOKO À FOURNIR]</p>
            )}

            <div className={styles.imageGradient} aria-hidden="true" />

            <div className={styles.tags}>
              {r.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <Link href={r.linkHref} className={styles.link}>
        {r.linkLabel}
        <svg
          className={styles.linkArrow}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 8H13M9 3.5L13.5 8L9 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </>
  );
}
