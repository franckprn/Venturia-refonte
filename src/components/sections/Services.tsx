import { servicesLabel, servicesTitle, services } from "@/content/services";
import { ServicesRowsReveal } from "./ServicesRowsReveal";
import styles from "./services.module.css";

// Section « Services » (home) — liste de quatre lignes pleine largeur,
// chacune un lien vers /contact?service=... (les pages /services/*
// n'existent pas encore, voir content/services.ts). Fond --ground,
// dans la zone de contenu (jamais sous le rail).
//
// Le deuxième carton du rail s'ancrera à cette section plus tard : pas
// ajouté ici (CLAUDE.md, « Rail droit »), et aucun ancêtre ne porte
// overflow ni contain — sinon son futur sticky casserait silencieusement.
//
// Contenu réel (provisoire) dans content/services.ts, non complété ici.
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
