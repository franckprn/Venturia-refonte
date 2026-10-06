import type { MetadataRoute } from "next";
import { getAllSlugs, getArticle } from "@/content/blog";

// URL absolues en https://venturia.fr, SANS barre finale (canonical,
// voir layout.tsx `metadataBase` et CLAUDE.md « AVANT MISE EN LIGNE » /
// « Pages services — gabarit » § Canonical). Seules les routes
// publiées (200) figurent ici : /realisations, /a-propos,
// /mentions-legales et /politique-de-confidentialite n'existent pas
// encore (voir Nav.tsx/Footer.tsx, isLink: false) — elles rejoindront
// ce fichier quand leurs pages seront construites.
const BASE_URL = "https://venturia.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services/seo", "/services/sea", "/services/creation-site", "/services/automations", "/contact", "/blog"];

  const articleRoutes = getAllSlugs().map((slug) => {
    const article = getArticle(slug);
    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: article!.dateModified,
    };
  });

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
    })),
    ...articleRoutes,
  ];
}
