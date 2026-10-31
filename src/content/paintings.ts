// Tableaux du domaine public (1872-1899). Légende : titre, auteur, année.
// Sources et licences : CREDITS-IMAGES.md.

export type Painting = {
  src: string;
  alt: string;
  title: string;
  author: string;
  year: string;
  width: number;
  height: number;
};

export const PAINTINGS = {
  caillebotte: {
    src: "/images-test/caillebotte-temps-de-pluie.jpg",
    alt: "Tableau de Gustave Caillebotte : passants sous leurs parapluies sur un carrefour pavé, un jour de pluie",
    title: "Rue de Paris, temps de pluie",
    author: "Gustave Caillebotte",
    year: "1877",
    width: 1686,
    height: 1309,
  },
  renoirPontNeuf: {
    src: "/images-test/renoir-pont.jpg",
    alt: "Tableau d’Auguste Renoir : passants et voitures à cheval sur un pont baigné de soleil, sous un ciel bleu à nuages blancs",
    title: "Le Pont-Neuf",
    author: "Auguste Renoir",
    year: "1872",
    width: 1686,
    height: 1342,
  },
  raboteurs: {
    src: "/images-test/caillebotte-raboteurs-de-parquet.jpg",
    alt: "Tableau de Gustave Caillebotte : trois ouvriers à genoux rabotent le parquet d’une pièce vide, près d’une fenêtre à balcon",
    title: "Les Raboteurs de parquet",
    author: "Gustave Caillebotte",
    year: "1875",
    width: 1686,
    height: 1184,
  },
  pissarro: {
    src: "/images-test/pissarro-boulevard-matinee-hiver.jpg",
    alt: "Tableau de Camille Pissarro : un grand boulevard vu d’en haut, voitures et passants dans la lumière grise d’un matin d’hiver",
    title: "Le Boulevard Montmartre, matinée d’hiver",
    author: "Camille Pissarro",
    year: "1897",
    width: 1686,
    height: 1375,
  },
  lautrec: {
    src: "/images-test/lautrec-la-goulue.jpg",
    alt: "Affiche d’Henri de Toulouse-Lautrec : la danseuse La Goulue au centre de la piste, devant une foule en silhouette",
    title: "Moulin Rouge, La Goulue",
    author: "Henri de Toulouse-Lautrec",
    year: "1891",
    width: 1686,
    height: 2738,
  },
  degas: {
    src: "/images-test/degas-la-boutique-de-modiste.jpg",
    alt: "Tableau d’Edgar Degas : une modiste arrange des chapeaux présentés sur des porte-chapeaux",
    title: "La Boutique de modiste",
    author: "Edgar Degas",
    year: "1879-1886",
    width: 1686,
    height: 1531,
  },
  fournaise: {
    src: "/images-test/renoir-dejeuner-canotiers.jpg",
    alt: "Tableau de Pierre-Auguste Renoir : trois convives attablés sous une tonnelle fleurie, au bord d’une rivière où passent des barques",
    title: "Le Déjeuner au restaurant Fournaise",
    author: "Pierre-Auguste Renoir",
    year: "1875",
    width: 1686,
    height: 1398,
  },
  beraud: {
    src: "/images-test/beraud-kiosque.jpg",
    alt: "Tableau de Jean Béraud : une colonne couverte d’affiches colorées sur un boulevard, une passante s’arrête pour les lire",
    title: "Kiosque à Paris",
    author: "Jean Béraud",
    year: "vers 1880",
    width: 1361,
    height: 1799,
  },
  lepine: {
    src: "/images-test/lepine-marche-aux-pommes.jpg",
    alt: "Tableau de Stanislas Lépine : marchands et paniers sur un quai, au bord de l’eau",
    title: "Le Marché aux pommes",
    author: "Stanislas Lépine",
    year: "vers 1880",
    width: 1686,
    height: 1183,
  },
} satisfies Record<string, Painting>;

export type PaintingKey = keyof typeof PAINTINGS;

// Un tableau par usage : changer d'image = changer une ligne ici.
export const ART = {
  hero: PAINTINGS.renoirPontNeuf,
  referencement: PAINTINGS.pissarro,
  publicite: PAINTINGS.lautrec,
  site: PAINTINGS.degas,
  automatisation: PAINTINGS.raboteurs,
  demarrer: PAINTINGS.fournaise,
  interlude: PAINTINGS.beraud,
  blog: PAINTINGS.lepine,
  lost: PAINTINGS.caillebotte,
} satisfies Record<string, Painting>;

export const INOKO_PHOTO = {
  src: "/images/realisations/inoko-mobilier-van.jpg",
  alt: "Lit peigne en contreplaqué Inoko installé à l’arrière d’un van, porte latérale ouverte",
};

export const INOKO_SEARCH_CONSOLE = {
  src: "/images/photo_sc.jpg",
  alt: "Écran d’ordinateur affichant le rapport Performances de la Search Console d’Inoko : la courbe des clics monte à partir de janvier 2026",
  width: 2000,
  height: 2000,
};
