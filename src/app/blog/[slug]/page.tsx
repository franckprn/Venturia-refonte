import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getArticle } from "@/content/blog";
import { EMAIL } from "@/content/home";
import { estimateReadingMinutes, formatFrenchDate } from "@/lib/blog";
import { Footer } from "@/components/home/Sections";
import { Art, Cta, Rule, keepWords } from "@/components/home/Ui";
import { Motion } from "@/components/home/Motion";
import { ArticleProse, Toc, headingsOf, paintingFor } from "@/components/home/Article";
import s from "@/components/home/home.module.css";
import p from "@/components/home/pages.module.css";

const SITE_URL = "https://venturia.fr";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: { absolute: article.meta.title },
    description: article.meta.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const minutes = estimateReadingMinutes(article);
  const date = formatFrenchDate(article.datePublished);
  const headings = headingsOf(article.body);
  const art = paintingFor(article.category);
  const url = `${SITE_URL}/blog/${slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: { "@type": article.author.type, name: article.author.name, url: article.author.url },
      publisher: { "@type": "Organization", name: "Venturia", url: SITE_URL },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  return (
    <div className={s.page} data-v2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article aria-labelledby="article-title">
        <section className={p.articleHead} data-tone="light">
          <nav aria-label="Fil d'Ariane" className={p.crumbs}>
            <Link href="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
          </nav>
          <div className={p.articleHeadText}>
            <p className={p.articleMeta} data-hero-fade>
              <span>{article.category}</span>
              <time dateTime={article.datePublished}>{date}</time>
              <span>{minutes} min de lecture</span>
            </p>
            <h1 id="article-title" className={p.articleTitle}>
              <span className={s.lineMask}>
                <span data-hero-line>{keepWords(article.title)}</span>
              </span>
            </h1>
            <p className={p.articleIntro} data-hero-fade style={{ animationDelay: "0.3s" }}>
              {keepWords(article.intro)}
            </p>
          </div>
          <div data-hero-photo className={p.articleArt}>
            <Art painting={art} sizes="(max-width: 899px) 70vw, 28vw" priority ratio="native" />
          </div>
        </section>

        <section className={p.articleGrid} data-tone="light" aria-label="Contenu de l'article">
          <aside className={p.articleAside}>
            <Toc headings={headings} />
          </aside>

          <div className={p.prose}>
            <div id="en-bref" className={p.enBref}>
              <p className={p.enBrefTitle}>En bref</p>
              <ul>
                {article.enBref.map((line) => (
                  <li key={line}>{keepWords(line)}</li>
                ))}
              </ul>
            </div>

            <ArticleProse blocks={article.body} />

            <div className={p.sources}>
              <p className={p.sourcesTitle}>Sources</p>
              <ol>
                {article.sources.map((src) => (
                  <li key={src.href}>
                    <a href={src.href} target="_blank" rel="noopener noreferrer">
                      {src.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </article>

      <section className={`${p.articleCta} ${s.onRed}`} aria-labelledby="article-cta-title" data-tone="light">
        <Rule label="Passer à la pratique" />
        <h2 id="article-cta-title" className={s.h2Giant} data-reveal>
          {keepWords(article.redBand.title)}
        </h2>
        <div className={p.articleCtaRow} data-reveal>
          <p className={s.body}>{keepWords(article.redBand.text)}</p>
          <div className={s.heroCtas}>
            <Cta href={article.redBand.cta.href}>{article.redBand.cta.label}</Cta>
            <a href={`mailto:${EMAIL}`} className={s.textLink}>
              ou écrire à {EMAIL}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <Motion />
    </div>
  );
}
