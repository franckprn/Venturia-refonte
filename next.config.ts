import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Ancien site : /services/branding n'a pas d'équivalent direct dans
  // les 4 services actuels (SEO, SEA, création de site, automatisation)
  // — redirigé vers le service le plus proche plutôt que vers la home.
  // `statusCode: 301` plutôt que `permanent: true` : les deux champs
  // sont mutuellement exclusifs dans le type Redirect de Next.js, et
  // `permanent: true` émet en réalité un 308 (comportement par défaut
  // de cette version) — 301 est le code attendu pour ce transfert de
  // référencement, écrit explicitement pour l'obtenir.
  async redirects() {
    return [
      {
        source: "/services/branding",
        destination: "/services/creation-site",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
