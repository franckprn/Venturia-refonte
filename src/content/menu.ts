// Contenu de la nav, du méga-menu et du menu mobile. Les services
// (nom, phrase, tags, tableau) sont repris de content/home.ts.
import { BOOKING_URL, CONTACT_HREF, EMAIL, services } from "./home";
import { INOKO_HREF } from "./inoko";

// Réservation : la constante unique de content/home.ts.
export const BOOKING_HREF = BOOKING_URL;

export const menu = {
  ariaLabel: "Navigation principale",
  homeLabel: "Venturia, retour à l’accueil",
  skip: "Aller au contenu",
  email: EMAIL,
  services,
  trigger: "Services",
  links: [
    { label: "Cas Inoko", href: INOKO_HREF },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: CONTACT_HREF },
  ],
  cta: { long: "Réserver 20 min", short: "Réserver" },

  panel: {
    label: "Quatre leviers pour vendre plus",
    proofLabel: "Cas client, Inoko",
    proofText: "Inoko est passé de 1 à 13 commandes par mois entre janvier et avril 2026.",
    proofLink: "Lire le cas",
    ask: "Une question avant de réserver ?",
    cta: "Choisir un créneau",
  },

  mobile: {
    label: "Menu",
    open: "Menu",
    close: "Fermer",
    servicesLabel: "Services",
    moreLabel: "Et aussi",
    cta: "Bloquer 20 minutes dans l’agenda",
    write: "ou écrire à",
  },
};
