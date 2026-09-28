import { ServiceSplitIntro } from "./ServiceSplitIntro";
import type { ServiceFaqBlock } from "@/content/services/types";
import styles from "./ServiceFaq.module.css";

/**
 * Bloc 6 (FAQ) des pages /services/* — mise en page B (label + h2
 * colonnes 1-6, questions-réponses colonnes 7-12). Toutes les réponses
 * visibles (pas d'accordéon), trait --line entre chaque question — le
 * premier n'en porte pas (CLAUDE.md, « Détails faciles à oublier » :
 * un trait de liste interne, pas un séparateur entre sections, mais
 * inutile avant la toute première question qui suit déjà le titre).
 *
 * Données structurées FAQPage (JSON-LD) générées ICI, à partir des mêmes
 * questions-réponses que le rendu visuel : les deux ne peuvent pas
 * diverger.
 */
export function ServiceFaq({ label, title, items }: ServiceFaqBlock) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceSplitIntro label={label} title={title} headingId="service-faq-title">
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.question} className={styles.item}>
              <p className={styles.question}>{item.question}</p>
              <p className={styles.answer}>{item.answer}</p>
            </div>
          ))}
        </div>
      </ServiceSplitIntro>
    </>
  );
}
