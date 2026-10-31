import Link from "next/link";
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, Star } from "@phosphor-icons/react/dist/ssr";
import {
  EMAIL,
  faq,
  publishedReviews,
  reviewsCopy,
  serviceUi,
  services,
  servicesCopy,
} from "@/content/home";
import { ART } from "@/content/paintings";
import { Caption, Panel, Rule, fr, keepWords } from "./Ui";
import s from "./home.module.css";

// Sections de la home reprises du test 2 : Services, Avis, FAQ. Les
// sections reprises du test 1 vivent dans ./v1.

const pad = (i: number) => String(i + 1).padStart(2, "0");

/* ---------- Services : un tableau + une interface par service ---------- */

function ServiceUi({ id }: { id: string }) {
  if (id === "referencement") {
    const ui = serviceUi.referencement;
    return (
      <Panel label={ui.label} className={s.servicePanel}>
        <p className={s.serpUrl}>{ui.url}</p>
        <p className={s.serpTitle}>{keepWords(ui.title)}</p>
        <p className={s.serpDesc}>{keepWords(ui.desc)}</p>
        <p className={s.serpAi}>
          <span>{ui.aiTag}</span> {fr(ui.aiText)}
        </p>
      </Panel>
    );
  }
  if (id === "publicite") {
    const ui = serviceUi.publicite;
    return (
      <Panel label={ui.label} meta={ui.meta} className={s.servicePanel}>
        <ul className={s.uiRows}>
          {ui.rows.map((row) => (
            <li key={row}>
              <span className={s.uiDot} aria-hidden="true" />
              <span>{row}</span>
              <span className={s.uiMeta}>{ui.status}</span>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }
  if (id === "site") {
    const ui = serviceUi.site;
    return (
      <Panel label={ui.label} meta={ui.meta} className={s.servicePanel}>
        <p className={s.productName}>{ui.name}</p>
        <p className={s.swatches} aria-label={ui.swatchesLabel}>
          <span data-c="ink" />
          <span data-c="paper" />
          <span data-c="red" />
        </p>
        <p className={s.productButton}>{ui.button}</p>
      </Panel>
    );
  }
  const ui = serviceUi.automatisation;
  return (
    <Panel label={ui.label} meta={ui.meta} className={s.servicePanel}>
      <ol className={s.flow}>
        {ui.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </Panel>
  );
}

// Coin de chaque interface, choisi hors du sujet de l'œuvre : bas
// gauche (Pissarro : passants du premier plan ; Degas : pied du
// porte-chapeaux), haut gauche (Lautrec : lettres « Moulin Rouge » ;
// Caillebotte : boiseries du mur).
const CORNERS = ["bl", "tl", "bl", "tl"] as const;

// Ratio du tableau le plus large : fixe la hauteur commune.
const MAX_RATIO = Math.max(...services.map((sv) => ART[sv.art].width / ART[sv.art].height));

export function Services() {
  return (
    <section id="services" className={s.services} aria-labelledby="services-title" data-tone="light">
      <Rule label={servicesCopy.label} />
      <h2 id="services-title" className={s.h2} data-reveal>
        {keepWords(servicesCopy.title)}
      </h2>
      <ol className={s.serviceList}>
        {services.map((sv, i) => {
          const painting = ART[sv.art];
          const style = {
            "--r": painting.width / painting.height,
            "--r-max": MAX_RATIO,
          } as CSSProperties;
          return (
            <li key={sv.id} id={sv.id} className={s.service} data-corner={CORNERS[i % CORNERS.length]}>
              <div className={s.serviceText} data-reveal>
                <span className={s.mono}>{pad(i)}</span>
                <h3 className={s.serviceName}>
                  <Link href={sv.href} className={s.serviceLink}>
                    {sv.name}
                    <ArrowUpRight aria-hidden="true" weight="bold" className={s.serviceArrow} />
                  </Link>
                </h3>
                <p className={s.serviceLead}>{keepWords(sv.lead)}</p>
                <p className={s.serviceText2}>{keepWords(sv.text)}</p>
                <ul className={s.tags} aria-label={`${servicesCopy.tagsLabel} ${sv.name}`}>
                  {sv.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className={s.serviceVisual} style={style} data-reveal>
                <figure className={s.serviceFigure}>
                  <figcaption className={s.artCaption}>
                    <Caption painting={painting} />
                  </figcaption>
                  <div className={s.serviceStage}>
                    <div className={s.artFrame} style={{ aspectRatio: `${painting.width} / ${painting.height}` }}>
                      <Image
                        src={painting.src}
                        alt={painting.alt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 45vw"
                        className={s.cover}
                      />
                    </div>
                    <ServiceUi id={sv.id} />
                  </div>
                </figure>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ---------- Avis (1 à 3) : jamais d'avis provisoire en production ---------- */

export function Reviews() {
  if (publishedReviews.length === 0) return null;
  return (
    <section id="avis" className={s.reviews} aria-labelledby="reviews-title" data-tone="light">
      <Rule label={reviewsCopy.label} />
      <h2 id="reviews-title" className={s.h2} data-reveal>
        {keepWords(reviewsCopy.title)}
      </h2>
      <ul className={s.reviewList} data-count={Math.min(publishedReviews.length, 3)}>
        {publishedReviews.slice(0, 3).map((r) => (
          <li key={r.author} className={s.review} data-reveal>
            <figure>
              <blockquote className={s.reviewText}>
                {r.text.map((line, i) => (
                  <p key={line}>
                    {keepWords(`${i === 0 ? "« " : ""}${line}${i === r.text.length - 1 ? " »" : ""}`)}
                  </p>
                ))}
              </blockquote>
              <figcaption className={s.reviewBy}>
                {r.rating ? (
                  <span className={s.reviewStars} role="img" aria-label={reviewsCopy.ratingLabel(r.rating)}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} weight={i < r.rating! ? "fill" : "regular"} aria-hidden="true" />
                    ))}
                  </span>
                ) : null}
                <span className={s.reviewAuthor}>{r.author}</span>
                {r.company || r.date ? <span>{[r.company, r.date].filter(Boolean).join(", ")}</span> : null}
                <span className={s.reviewTags}>
                  <span>{reviewsCopy.source}</span>
                  {r.placeholder ? <span data-warn>{reviewsCopy.placeholderTag}</span> : null}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- FAQ : accordéon natif (details/summary), clavier compris ---------- */

export function Faq() {
  // Données structurées : le texte exact affiché (mêmes espaces insécables).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((it) => ({
      "@type": "Question",
      name: fr(it.q),
      acceptedAnswer: { "@type": "Answer", text: fr(it.a) },
    })),
  };
  return (
    <section id="faq" className={s.faq} aria-labelledby="faq-title" data-tone="light">
      <div className={s.faqHead}>
        <h2 id="faq-title" className={s.h2} data-reveal>
          {keepWords(faq.title)}
        </h2>
        <p className={s.body} data-reveal>
          {keepWords(faq.intro)}
        </p>
        <a href={`mailto:${EMAIL}`} className={s.textLink}>
          {EMAIL}
        </a>
      </div>
      <div className={s.faqList}>
        {faq.items.map((it) => (
          <details key={it.q} className={s.faqItem} data-faq>
            <summary className={s.faqQ}>
              <span>{keepWords(it.q)}</span>
              <Plus aria-hidden="true" weight="bold" className={s.faqIcon} />
            </summary>
            <div className={s.faqA} data-faq-answer>
              <p>{keepWords(it.a)}</p>
            </div>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </section>
  );
}
