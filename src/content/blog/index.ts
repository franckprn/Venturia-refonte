// Index du blog — un seul Record slug → contenu, jamais un import()
// dynamique (cohérent avec le reste du site, qui n'importe jamais rien
// dynamiquement) : generateStaticParams et la page liste lisent ce même
// objet, les métadonnées de liste (ArticleListEntry) sont DÉRIVÉES de
// chaque ArticleContent plutôt que recopiées à la main dans un second
// fichier — les deux ne peuvent donc pas diverger.

import { budgetGoogleAdsPme } from "./budget-google-ads-pme";
import type { ArticleContent, ArticleListEntry } from "./types";

// Ordre d'affichage sur /blog = ordre de ce Record (plus récent en
// premier) : un seul article aujourd'hui, l'ordre sera à revoir
// explicitement quand un deuxième arrivera.
const articles: Record<string, ArticleContent> = {
  "budget-google-ads-pme": budgetGoogleAdsPme,
};

export function getArticle(slug: string): ArticleContent | undefined {
  return articles[slug];
}

export function getAllSlugs(): string[] {
  return Object.keys(articles);
}

export function getArticleListEntries(): ArticleListEntry[] {
  return getAllSlugs().map((slug) => {
    const article = articles[slug];
    return {
      slug,
      category: article.category,
      date: article.datePublished,
      title: article.title,
      excerpt: article.excerpt,
    };
  });
}
