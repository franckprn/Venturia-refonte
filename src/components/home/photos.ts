// Tableaux du domaine public (1850-1920), un par sens : la rue et ses
// passants pour être trouvé, la vitrine pour le site, l'affiche pour la
// publicité, l'atelier pour l'automatisation, le marché pour le blog.
// Sources et licences : CREDITS-IMAGES.md.

export type Painting = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const PAINTINGS = {
  rue: {
    src: "/images-test/caillebotte-temps-de-pluie.jpg",
    alt: "Tableau de Gustave Caillebotte : passants sous leurs parapluies sur un carrefour pavé, un jour de pluie",
    caption: "Gustave Caillebotte, 1877",
    width: 1686,
    height: 1309,
  },
  vitrine: {
    src: "/images-test/degas-la-boutique-de-modiste.jpg",
    alt: "La Boutique de modiste, Edgar Degas : une modiste arrange des chapeaux présentés sur des porte-chapeaux",
    caption: "Edgar Degas, La Boutique de modiste, 1879-1886",
    width: 1686,
    height: 1531,
  },
  affiche: {
    src: "/images-test/toulouse-lautrec-artisan-moderne-affiche.jpg",
    alt: "Affiche L'Artisan moderne, Henri de Toulouse-Lautrec : un artisan en blouse, sa boîte à outils à la main, entre dans une chambre",
    caption: "Henri de Toulouse-Lautrec, affiche, 1896",
    width: 1686,
    height: 2397,
  },
  atelier: {
    src: "/images-test/canals-atelier-de-cigares.jpg",
    alt: "Tableau de Ricard Canals : des ouvrières roulent des cigares autour de longues tables, sous des voûtes",
    caption: "Ricard Canals, atelier de cigares, 1899",
    width: 1686,
    height: 2072,
  },
  marche: {
    src: "/images-test/lepine-marche-aux-pommes.jpg",
    alt: "Le Marché aux pommes, Stanislas Lépine : marchands et paniers sur un quai, au bord de l'eau",
    caption: "Stanislas Lépine, Le Marché aux pommes, vers 1880",
    width: 1686,
    height: 1183,
  },
} satisfies Record<string, Painting>;

export const INOKO_PHOTO = {
  src: "/images/realisations/inoko-mobilier-van.jpg",
  alt: "Lit modulable en contreplaqué Inoko installé à l'arrière d'un van, porte latérale ouverte",
};
