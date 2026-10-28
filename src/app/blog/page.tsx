import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getAllSlugs, getArticle } from "@/content/blog";
import { blogList } from "@/content/blog/list";
import { CONTACT_HREF, EMAIL } from "@/content/home";
import { estimateReadingMinutes, formatFrenchDate } from "@/lib/blog";
import { Footer } from "@/components/home/Sections";
import { Art, Cta, Rule, keepWords } from "@/components/home/Ui";
import { Motion } from "@/components/home/Motion";
import { paintingFor } from "@/components/home/Article";
import { PAINTINGS } from "@/components/home/photos";
import s from "@/components/home/home.module.css";
import p from "@/components/home/pages.module.css";

export const metadata: Metadata = {
  title: { absolute: blogList.meta.title },
  description: blogList.meta.description,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const articles = getAllSlugs().map((slug) => {
    const a = getArticle(slug)!;
    return { slug, a, minutes: estimateReadingMinutes(a), date: formatFrenchDate(a.datePublished) };
  });

  return (
    <div className={s.page} data-v2>
      <section className={p.blogHero} aria-labelledby="blog-title" data-tone="light">
        <div className={p.blogHeroText}>
          <p className={s.h1Kicker} data-hero-fade>
            Blog Venturia
          </p>
          <h1 id="blog-title" className={p.blogTitle}>
            <span className={s.lineMask}>
              <span data-hero-line>{blogList.title}</span>
            </span>
          </h1>
          <p className={s.heroSub} data-hero-fade style={{ animationDelay: "0.3s" }}>
            {keepWords(blogList.intro)}
          </p>
        </div>
        <div data-hero-photo className={p.blogHeroArt}>
          <Art painting={PAINTINGS.marche} sizes="(max-width: 899px) 100vw, 40vw" priority ratio="native" />
        </div>
      </section>

      <section className={p.blogList} aria-labelledby="blog-list-title" data-tone="light">
        <Rule label={`${articles.length} article${articles.length > 1 ? "s" : ""}`} />
        <h2 id="blog-list-title" className={s.srOnly}>
          Tous les articles
        </h2>
        <ol>
          {articles.map(({ slug, a, minutes, date }) => {
            const art = paintingFor(a.category);
            return (
              <li key={slug} className={p.entry} data-reveal>
                <div className={p.entryThumb}>
                  <Image src={art.src} alt="" fill sizes="(max-width: 899px) 30vw, 16vw" className={s.cover} />
                </div>
                <div className={p.entryMeta}>
                  <span>{a.category}</span>
                  <time dateTime={a.datePublished}>{date}</time>
                  <span>{minutes} min de lecture</span>
                </div>
                <h3 className={p.entryTitle}>
                  <Link href={`/blog/${slug}`} className={p.entryLink}>
                    {keepWords(a.title)}
                    <ArrowUpRight aria-hidden="true" weight="bold" className={s.serviceArrow} />
                  </Link>
                </h3>
                <p className={p.entryExcerpt}>{keepWords(a.excerpt)}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={p.blogCta} aria-labelledby="blog-cta-title" data-tone="light">
        <h2 id="blog-cta-title" className={s.h2} data-reveal>
          {keepWords("Une question sur votre boutique ? On y répond de vive voix.")}
        </h2>
        <div className={s.heroCtas} data-reveal>
          <Cta href={CONTACT_HREF}>Poser la question en 20 minutes</Cta>
          <a href={`mailto:${EMAIL}`} className={s.textLink}>
            ou par écrit, à {EMAIL}
          </a>
        </div>
      </section>

      <Footer />
      <Motion />
    </div>
  );
}
