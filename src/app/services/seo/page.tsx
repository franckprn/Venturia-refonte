import type { Metadata } from "next";
import { BOOKING_URL, EMAIL } from "@/content/home";
import { seoFaq, seoHero, seoMeta, seoMethod, seoStarting, seoWork } from "@/content/referencement";
import { Contact, Footer, Inoko } from "@/components/home/Sections";
import { Art, Cta, Panel, Rule, keepWords } from "@/components/home/Ui";
import { Motion } from "@/components/home/Motion";
import { ART } from "@/content/paintings";
import s from "@/components/home/home.module.css";
import p from "@/components/home/pages.module.css";

export const metadata: Metadata = {
  title: { absolute: seoMeta.title },
  description: seoMeta.description,
  alternates: { canonical: "/services/seo" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: seoFaq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
  })),
};

export default function SeoPage() {
  return (
    <div className={s.page} data-v2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* 1. Hero : la rue et ses passants, être trouvé */}
      <section className={s.hero} aria-labelledby="seo-title" data-tone="light">
        <div className={s.heroText}>
          <h1 id="seo-title" className={s.h1}>
            <span className={s.h1Kicker} data-hero-fade>
              {seoHero.kicker}
            </span>
            <span className={`${s.h1Big} ${p.seoH1}`}>
              <span className={s.lineMask}>
                <span data-hero-line>Trouvé sur Google,</span>
              </span>{" "}
              <span className={s.lineMask}>
                <span data-hero-line style={{ animationDelay: "0.1s" }}>
                  cité par les IA.
                </span>
              </span>
            </span>
          </h1>
          <div className={s.heroAside}>
            <p className={s.heroSub} data-hero-fade style={{ animationDelay: "0.3s" }}>
              {keepWords(seoHero.sub)}
            </p>
            <div className={s.heroCtas} data-hero-fade style={{ animationDelay: "0.4s" }}>
              <Cta href={BOOKING_URL}>Réserver 20 minutes</Cta>
              <a href={`mailto:${EMAIL}`} className={s.textLink}>
                ou écrire à {EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className={s.heroVisual}>
          <div data-hero-photo>
            <Art painting={ART.referencement} sizes="(max-width: 899px) 100vw, 50vw" priority ratio="4 / 3" />
          </div>
          <Panel label="Inoko" meta="Search Console" className={`${s.heroPanel} ${p.seoPanel}`}>
            <p className={p.queryLabel}>Position moyenne du site</p>
            <p className={s.panelBig}>
              7,6 <span>en mai 2026, contre 23,5 en décembre 2025</span>
            </p>
          </Panel>
        </div>
      </section>

      {/* 2. Ce qu'on fait, concrètement : SEO puis GEO */}
      <section className={p.work} aria-labelledby="work-title" data-tone="light">
        <Rule label="Ce qu'on fait" />
        <h2 id="work-title" className={s.h2} data-reveal>
          Deux chantiers, menés ensemble sur vos pages.
        </h2>
        {seoWork.map((block) => (
          <div key={block.id} id={block.id} className={p.workBlock}>
            <p className={p.workName} aria-hidden="true" data-reveal>
              {block.name}
            </p>
            <div className={p.workBody}>
              <h3 className={p.workTitle} data-reveal>
                <span className={s.srOnly}>{block.name} : </span>
                {keepWords(block.title)}
              </h3>
              <ol className={p.workList}>
                {block.items.map((item, i) => (
                  <li key={item.name} className={p.workItem} data-reveal>
                    <span className={s.mono}>{String(i + 1).padStart(2, "0")}</span>
                    <h4 className={p.workItemName}>{item.name}</h4>
                    <p className={p.workItemText}>{keepWords(item.text)}</p>
                  </li>
                ))}
              </ol>
              {block.id === "geo" ? (
                <Panel label="Réponse d'une IA" meta="Assistant" demo className={p.aiPanel}>
                  <p className={p.aiQuestion}>{keepWords("Quelle nappe en lin choisir pour une table de six ?")}</p>
                  <p className={p.aiAnswer}>
                    {keepWords(
                      "Comptez une nappe de 160 × 250 cm pour laisser 25 cm de retombée. Le guide de Maison Calade détaille les tailles par forme de table.",
                    )}
                  </p>
                  <p className={p.aiSource}>
                    <span>Source</span> maison-calade.fr › guide-des-tailles
                  </p>
                </Panel>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      {/* 3. La preuve */}
      <Inoko
        id="inoko"
        label="Cas client, Inoko"
        title="Inoko : 86 clics en décembre 2025, 1 736 en mai 2026."
        intro={
          "En janvier 2026, Inoko réalisait une vente par mois, via Leboncoin, son seul canal. On a retravaillé " +
          "ses fiches produits et créé une page pilier « lit peigne », arrivée en 1re page de Google sur un mot-clé " +
          "d'environ 5 000 recherches par mois. Trois fiches produits se sont placées en 1re position."
        }
        question="Et vos fiches produits, que valent-elles sur Google ?"
        ctaLabel="Faire le point sur votre référencement"
      />

      {/* 4. La méthode */}
      <section className={s.start} aria-labelledby="method-title" data-tone="light">
        <h2 id="method-title" className={s.h2Giant} data-reveal>
          Trois temps, dans cet ordre.
        </h2>
        <ol className={s.steps}>
          {seoMethod.map((st) => (
            <li key={st.verb} className={s.step} data-reveal>
              <h3 className={s.stepVerb}>{st.verb}</h3>
              <p className={s.body}>{keepWords(st.text)}</p>
            </li>
          ))}
        </ol>
        <div className={s.startCta}>
          <Cta href={BOOKING_URL}>Réserver mon créneau</Cta>
        </div>
      </section>

      {/* 5. Par où commencer */}
      <section className={p.starting} aria-labelledby="starting-title" data-tone="light">
        <Rule label="Par où commencer" />
        <h2 id="starting-title" className={s.h2} data-reveal>
          Le premier chantier dépend de votre boutique.
        </h2>
        <ul className={p.startingList}>
          {seoStarting.map((c) => (
            <li key={c.title} className={p.startingItem} data-reveal>
              <h3 className={p.startingTitle}>{c.title}</h3>
              <p className={s.body}>{keepWords(c.text)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Référencement et Google Ads : l'affiche */}
      <section className={p.cross} aria-labelledby="cross-title" data-tone="light">
        <Art painting={ART.publicite} sizes="(max-width: 899px) 60vw, 25vw" className={p.crossArt} ratio="native" />
        <div className={p.crossText}>
          <Rule label="Référencement et Google Ads" />
          <h2 id="cross-title" className={s.h2} data-reveal>
            Le référencement pour durer, Google Ads pour accélérer.
          </h2>
          <p className={s.body} data-reveal>
            {keepWords(
              "Le référencement installe un trafic qui revient chaque mois. Google Ads apporte des visites dès son lancement. Chez Inoko, les campagnes ont été lancées en avril 2026, après le SEO : rentables dès la deuxième semaine, avec un ROAS de 15.",
            )}
          </p>
          <Cta href="/services/sea" variant="line">
            Découvrir la publicité Google Ads
          </Cta>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className={p.faq} aria-labelledby="faq-title" data-tone="light">
        <div className={p.faqHead}>
          <Rule label="Questions fréquentes" />
          <h2 id="faq-title" className={s.h2}>
            Vos questions sur le référencement.
          </h2>
        </div>
        <dl className={p.faqList}>
          {seoFaq.map((f) => (
            <div key={f.question} className={p.faqItem}>
              <dt className={p.faqQ}>{keepWords(f.question)}</dt>
              {f.answer.map((a, i) => (
                <dd key={i} className={i === 0 ? p.faqLead : p.faqMore}>
                  {keepWords(a)}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </section>

      <Contact
        title="Parlons de votre référencement."
        text="En 20 minutes, on regarde ensemble vos requêtes, vos positions et les pages à travailler en premier. Le devis suit l'appel."
        ctaLabel="Planifier l'appel"
      />
      <Footer pitch="Vos clients cherchent déjà vos produits sur Google." />
      <Motion />
    </div>
  );
}
