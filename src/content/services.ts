// Contenu provisoire de la section Services (home) — à faire valider
// par Franck avant mise en ligne. Les quatre lignes pointent vers
// /contact avec un paramètre `service` : les pages /services/*
// n'existent pas encore, pas de lien mort en attendant qu'elles soient
// construites.

export type Service = {
  /** --t-mono, --ink (--ground au survol de la ligne). */
  number: string;
  /** --t-title, Bricolage Grotesque 600. */
  name: string;
  /** --t-body. */
  phrase: string;
  href: string;
};

export const servicesLabel = "EXPERTISES";
export const servicesTitle = "Quatre façons de travailler ensemble";

export const services: [Service, Service, Service, Service] = [
  {
    number: "01",
    name: "Référencement",
    phrase: "Être trouvé sur Google, et cité par les IA.",
    href: "/contact?service=referencement",
  },
  {
    number: "02",
    name: "Publicité",
    phrase: "Des commandes dès le premier mois.",
    href: "/contact?service=publicite",
  },
  {
    number: "03",
    name: "Site internet",
    phrase: "Rapide, durable, et à votre nom.",
    href: "/contact?service=site-internet",
  },
  {
    number: "04",
    name: "Automatisation",
    phrase: "Vos devis et vos factures partent tout seuls.",
    href: "/contact?service=automatisation",
  },
];
