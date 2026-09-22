import { servicesLabel, servicesTitle, services } from "@/content/services";
import { ServicesRowsReveal } from "./ServicesRowsReveal";
import styles from "./services.module.css";

// Section « Services » (home) — quatre lignes en deux axes (numéro+nom
// et phrase courte sur l'axe gauche, paragraphe sur l'axe droit),
// chacune cliquable en entier via un lien étiré vers sa page
// /services/* (CLAUDE.md, « Services (home) »). Fond --ground, dans la
// zone de contenu (jamais sous le rail).
//
// Le deuxième carton du rail s'ancrera à cette section plus tard : pas
// ajouté ici (CLAUDE.md, « Rail droit »), et aucun ancêtre ne porte
// overflow ni contain — sinon son futur sticky casserait silencieusement.
//
// Contenu réel dans content/services.ts (l'adresse de l'Automatisation
// est celle du site en ligne aujourd'hui, les trois autres provisoires
// — voir CLAUDE.md « AVANT MISE EN LIGNE »).
export function Services() {
  return (
    <>
      <p className={styles.label}>{servicesLabel}</p>
      <h2 id="services-title" className={styles.title}>
        {servicesTitle}
      </h2>
      <ServicesRowsReveal services={services} />
    </>
  );
}
