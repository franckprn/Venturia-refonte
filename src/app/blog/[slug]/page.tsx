import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailController, RailSlot, type RailConfig } from "@/components/layout/Rail";
import { MobileRailStack } from "@/components/layout/MobileRailStack";
import { IconSparkle, IconTag, IconArrowRight } from "@/components/layout/RailIcons";
import { BlogBreadcrumb } from "@/components/blog/BlogBreadcrumb";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleCallout } from "@/components/blog/ArticleCallout";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleSources } from "@/components/blog/ArticleSources";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ServiceRedBand } from "@/components/service-page/ServiceRedBand";
import { Footer } from "@/components/layout/Footer";
import footerStyles from "@/components/layout/footer.module.css";
import { getAllSlugs, getArticle } from "@/content/blog";
import { estimateReadingMinutes, formatFrenchDate } from "@/lib/blog";

const SITE_URL = "https://venturia.fr";

type ArticlePageParams = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticlePageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: { absolute: article.meta.title },
    description: article.meta.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

// Gabarit article du blog — réutilise le moteur du rail (RailController/
// RailSlot/MobileRailStack, CLAUDE.md « Pages services — gabarit » §
// RAIL), inchangé, avec un RailConfig propre à cette page : 3 ancrages
// (intro / body / body), cartons 2 et 3 partageant la même section de
// rattachement, comme la home (card2/card3 → « services »).
export default async function ArticlePage({ params }: { params: Promise<ArticlePageParams> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const minutes = estimateReadingMinutes(article);
  const date = formatFrenchDate(article.datePublished);

  const railConfig: RailConfig = {
    cards: article.rail,
    icons: [IconSparkle, IconTag, IconArrowRight],
    offsetTargets: [
      { varName: "--rail-card1-offset", sectionId: "intro", selector: "#en-bref", edge: "top" },
      {
        varName: "--rail-card2-offset",
        sectionId: "body",
        selector: "[data-article-first-h2]",
        edge: "top",
      },
      {
        varName: "--rail-card3-offset",
        sectionId: "body",
        selector: "[data-article-body-end]",
        edge: "bottom",
      },
    ],
    mobileReveal: ["intro", "body", "redband"],
  };

  const articleUrl = `${SITE_URL}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": article.author.type,
      name: article.author.name,
      ...(article.author.url ? { url: article.author.url } : {}),
      ...(article.author.jobTitle ? { jobTitle: article.author.jobTitle } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "Venturia",
      url: SITE_URL,
    },
    mainEntityOfPage: articleUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ReadingProgress />
      <MobileRailStack config={railConfig} />
      <RailController config={railConfig} />

      <Shell>
        <Section name="intro" tone="light" labelledBy="article-title" bodyStyle={{ rowGap: 0 }}>
          <BlogBreadcrumb title={article.title} />
          <ArticleHeader
            category={article.category}
            title={article.title}
            date={date}
            minutes={minutes}
            author={article.author}
            intro={article.intro}
          />
          <ArticleCallout items={article.enBref} />
        </Section>

        <RailSlot cardIndex={0} anchor="intro" config={railConfig} />

        <Section name="body" tone="light" bodyStyle={{ rowGap: 0 }}>
          <ArticleBody blocks={article.body} />
          <ArticleSources items={article.sources} />
        </Section>

        <RailSlot cardIndex={1} anchor="body" config={railConfig} />

        <Section name="redband" tone="light" labelledBy="service-redband-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceRedBand {...article.redBand} />
        </Section>

        <RailSlot cardIndex={2} anchor="body" config={railConfig} />

        <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
          <Footer />
        </Section>
      </Shell>
    </>
  );
}
