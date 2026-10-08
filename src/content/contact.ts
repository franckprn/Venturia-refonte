// Contenu de la page /contact, fourni par Franck. À reprendre au
// caractère près : ne rien reformuler, ne rien ajouter.

export const contact = {
  label: "CONTACT",
  title: "On en parle ?",
  intro:
    "Décrivez votre situation en deux lignes. On répond dans la journée, " +
    "et on vous oriente ailleurs quand un autre est mieux placé.",

  email: {
    address: "hey@venturia.fr",
    subline: "Réponse dans la journée.",
    copyLabel: "Copier",
    copiedLabel: "Copié",
  },

  booking: {
    label: "Réserver 20 minutes",
    subline: "Sans engagement, et vous repartez avec un plan.",
    href: "https://cal.com/venturia/premier-echange",
  },

  info: [
    "Toulouse, France",
    "France et Belgique",
    "Du lundi au vendredi",
  ] as [string, string, string],

  metaTitle: "Contact — Venturia",
  metaDescription:
    "Contactez Venturia par email ou réservez 20 minutes : réponse dans la journée.",
};
