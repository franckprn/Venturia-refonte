import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { BlogList } from "@/components/blog/BlogList";
import { Footer } from "@/components/layout/Footer";
import footerStyles from "@/components/layout/footer.module.css";
import { getArticleListEntries } from "@/content/blog";
import { blogList } from "@/content/blog/list";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: blogList.meta.title },
  description: blogList.meta.description,
  alternates: { canonical: "/blog" },
};

// Page liste /blog — statique, pas de rail (ni <RailController> ni
// <MobileRailStack> montés : contrairement au gabarit article, cette
// page n'a pas besoin du rail). Même construction Shell/Section que le
// reste du site.
export default function BlogPage() {
  const entries = getArticleListEntries();

  return (
    <Shell>
      <Section name="intro" tone="light" labelledBy="blog-title" bodyStyle={{ rowGap: 0 }}>
        <h1 id="blog-title" className={styles.title}>
          {blogList.title}
        </h1>
        <p className={styles.intro}>{blogList.intro}</p>
      </Section>

      <Section name="list" tone="light" bodyStyle={{ rowGap: 0 }}>
        <BlogList entries={entries} />
      </Section>

      <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
        <Footer />
      </Section>
    </Shell>
  );
}
