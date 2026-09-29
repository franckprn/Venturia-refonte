import type { ServiceFaqBlock } from "@/content/services/types";
import styles from "./ServiceFaq.module.css";

/**
 * Bloc 6 (FAQ) des pages /services/* — colonne gauche (label + h2,
 * colonnes 1-6) en `position: sticky` dès 1024px, top aligné sur le haut
 * du rail (`var(--rail-stick)`, 64px — même valeur que le figement des
 * cartons du rail, CLAUDE.md « Rail droit ») ; questions-réponses
 * colonnes 7-12, TOUTES visibles (pas d'accordéon), trait --line entre
 * chaque question — le premier n'en porte pas. Layout propre à ce bloc
 * (pas ServiceSplitIntro : label+h2 partagent la MÊME ligne de grille que
 * la liste, pas des lignes séparées — nécessaire pour que le sticky ait
 * une hauteur de ligne à parcourir). Sous 1024px : pas de sticky, empilé.
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
      <div className={styles.left}>
        <p className={styles.label}>{label}</p>
        <h2 id="service-faq-title" className={styles.title}>
          {title}
        </h2>
      </div>
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.question} className={styles.item}>
            <p className={styles.question}>{item.question}</p>
            <p className={styles.answer}>{item.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
}
