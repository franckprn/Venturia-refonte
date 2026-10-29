import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";
import {
  BOOKING_URL,
  EMAIL,
  blogPreview,
  faq,
  method,
  reviews,
  services,
  servicesTitle,
  situations,
  start,
} from "@/content/home";
import { INOKO_HREF, inokoHome } from "@/content/inoko";
import { ART, INOKO_PHOTO } from "@/content/paintings";
import { getArticleListEntries } from "@/content/blog";
import { paintingFor } from "./Article";
import { Art, Cta, Panel, Rule, fr, keepWords } from "./Ui";
import s from "./home.module.css";

// Sections de la home, dans l'ordre de la page. Toutes reprennent les
// mêmes pièces : filet titré, bouton, carte d'interface, tableau légendé.

const pad = (i: number) => String(i + 1).padStart(2, "0");

/* ---------- Services : un tableau + une interface par service ---------- */

function ServiceUi({ id }: { id: string }) {
  if (id === "referencement") {
    return (
      <Panel label="Résultat Google" meta="Position 1" demo className={s.servicePanel}>
        <p className={s.serpUrl}>votre-boutique.fr › plaids</p>
        <p className={s.serpTitle}>{keepWords("Plaid en laine mérinos, 6 coloris")}</p>
        <p className={s.serpDesc}>{keepWords("Laine douce et chaude, lavable en machine. Livraison suivie.")}</p>
        <p className={s.serpAi}>
          <span>Aperçu IA</span> source citée : votre-boutique.fr
        </p>
      </Panel>
    );
  }
  if (id === "publicite") {
    return (
      <Panel label="Google Ads" meta="Campagnes Search" demo className={s.servicePanel}>
        <ul className={s.uiRows}>
          {[
            ["Plaids en laine", "12 € / jour"],
            ["Coussins en lin", "8 € / jour"],
            ["Marque", "5 € / jour"],
          ].map(([name, budget]) => (
            <li key={name}>
              <span className={s.uiDot} aria-hidden="true" />
              <span>{name}</span>
              <span className={s.uiMeta}>{fr(budget)}</span>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }
  if (id === "site") {
    return (
      <Panel label="Fiche produit" meta="Shopify" demo className={s.servicePanel}>
        <p className={s.productName}>Plaid en laine mérinos</p>
        <p className={s.productPrice}>{fr("89,00 €")}</p>
        <p className={s.swatches} aria-label="Trois coloris">
          <span data-c="ink" />
          <span data-c="paper" />
          <span data-c="red" />
        </p>
        <p className={s.productButton}>Ajouter au panier</p>
      </Panel>
    );
  }
  return (
    <Panel label="Workflow n8n" meta="Actif" demo className={s.servicePanel}>
      <ol className={s.flow}>
        <li>Nouvelle commande</li>
        <li>Facture créée</li>
        <li>Stock mis à jour</li>
        <li>Email de suivi envoyé</li>
      </ol>
    </Panel>
  );
}

export function Services() {
  return (
    <section id="services" className={s.services} aria-labelledby="services-title" data-tone="light">
      <Rule label="Services" />
      <h2 id="services-title" className={s.h2} data-reveal>
        {keepWords(servicesTitle.resultat)}
      </h2>
      <ol className={s.serviceList}>
        {services.map((sv, i) => (
          <li key={sv.id} id={sv.id} className={s.service}>
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
              <ul className={s.tags} aria-label={`Outils et spécialités, ${sv.name}`}>
                {sv.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className={s.serviceVisual} data-reveal>
              <Art painting={ART[sv.art]} sizes="(max-width: 899px) 100vw, 50vw" ratio="4 / 3" parallax />
              <ServiceUi id={sv.id} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Cas Inoko, version courte ---------- */

export function InokoCase() {
  return (
    <section id="inoko" className={s.case} aria-labelledby="inoko-title" data-tone="dark">
      <Rule label={inokoHome.label} tone="dark" />
      <h2 id="inoko-title" className={s.h2Giant} data-reveal>
        {keepWords(inokoHome.title)}
      </h2>

      <div className={s.caseGrid}>
        <figure className={s.casePhoto} data-reveal>
          <Image src={INOKO_PHOTO.src} alt={INOKO_PHOTO.alt} fill sizes="(max-width: 899px) 100vw, 40vw" className={s.cover} />
        </figure>
        <ol className={s.caseStory}>
          {inokoHome.story.map((st, i) => (
            <li key={st.label} className={s.caseStep} data-reveal>
              <p className={s.caseStepHead}>
                <span>
                  {pad(i)} {st.label}
                </span>
                <span>{st.period}</span>
              </p>
              <p className={s.caseStepText}>{keepWords(st.text)}</p>
            </li>
          ))}
        </ol>
      </div>

      <dl className={s.caseFigures}>
        {inokoHome.figures.map((f) => (
          <div key={f.what} className={s.caseFigure} data-reveal>
            <dt className={s.caseWhat}>{keepWords(f.what)}</dt>
            <dd className={s.caseValue}>{fr(f.value)}</dd>
            <dd className={s.casePeriod}>{keepWords(f.period)}</dd>
          </div>
        ))}
      </dl>

      <div className={s.caseFoot}>
        <Cta href={INOKO_HREF} variant="line">
          {inokoHome.link}
        </Cta>
        <p className={s.caseTransition}>
          {keepWords(inokoHome.transition)}{" "}
          <a href="#situations" className={s.caseNext}>
            {inokoHome.transitionLink}
            <ArrowDown aria-hidden="true" weight="bold" />
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------- Où en est votre boutique ? ---------- */

export function Situations() {
  return (
    <section id="situations" className={s.situations} aria-labelledby="situations-title" data-tone="light">
      <div className={s.sitHead}>
        <h2 id="situations-title" className={s.h2Giant} data-reveal>
          {keepWords(situations.title)}
        </h2>
        <p className={s.sitIntro} data-reveal>
          {keepWords(situations.intro)}
        </p>
      </div>
      <ol className={s.sitList}>
        {situations.items.map((it, i) => (
          <li key={it.title} className={s.sit} data-reveal>
            <span className={s.mono}>{pad(i)}</span>
            <h3 className={s.sitTitle}>{keepWords(it.title)}</h3>
            <p className={s.sitText}>{keepWords(it.text)}</p>
            <ul className={s.sitLinks} aria-label="Service adapté">
              {it.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={s.sitLink}>
                    {l.label}
                    <ArrowRight aria-hidden="true" weight="bold" />
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Avis (1 à 3) ---------- */

export function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <section className={s.reviews} aria-labelledby="reviews-title" data-tone="light">
      <Rule label="Avis Google" />
      <h2 id="reviews-title" className={s.h2} data-reveal>
        Ce que nos clients en disent.
      </h2>
      <ul className={s.reviewList} data-count={Math.min(reviews.length, 3)}>
        {reviews.slice(0, 3).map((r) => (
          <li key={r.author + r.date} className={s.review} data-reveal>
            <figure>
              <blockquote className={s.reviewText}>
                <p>{keepWords(`« ${r.text} »`)}</p>
              </blockquote>
              <figcaption className={s.reviewBy}>
                <span className={s.reviewAuthor}>{r.author}</span>
                <span>
                  {r.company}, {r.date}
                </span>
                <span className={s.reviewTags}>
                  <span>Avis Google</span>
                  {r.placeholder ? <span data-warn>Avis provisoire</span> : null}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Comment on travaille ---------- */

export function Method() {
  return (
    <section id="methode" className={s.method} aria-labelledby="method-title" data-tone="light">
      <Rule label="Méthode" />
      <h2 id="method-title" className={s.h2Giant} data-reveal>
        {keepWords(method.title)}
      </h2>

      <div className={s.formulas}>
        {method.formulas.map((f, i) => (
          <div key={f.name} className={s.formula} data-reveal>
            <span className={s.mono}>Formule {i + 1}</span>
            <h3 className={s.formulaName}>{f.name}</h3>
            <p className={s.body}>{keepWords(f.text)}</p>
          </div>
        ))}
      </div>

      <div className={s.follow}>
        <div className={s.followText}>
          <h3 className={s.followTitle} data-reveal>
            {keepWords(method.followTitle)}
          </h3>
          <ol className={s.followList}>
            {method.follow.map((f, i) => (
              <li key={f.name} data-reveal>
                <span className={s.mono}>{pad(i)}</span>
                <span>
                  <strong>{f.name}</strong>
                  <span className={s.followDesc}>{keepWords(f.text)}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className={s.followVisual} data-reveal>
          <Panel label="Rapport mensuel" meta="PDF" demo className={s.reportPanel}>
            <p className={s.reportTitle}>Votre boutique, ce mois-ci</p>
            <ol className={s.reportToc}>
              <li>Référencement</li>
              <li>Google Ads</li>
              <li>Ventes</li>
              <li>Plan du mois suivant</li>
            </ol>
            <svg viewBox="0 0 240 64" className={s.reportBars} aria-hidden="true">
              {[22, 30, 26, 38, 44, 52].map((h, i) => (
                <rect key={i} x={i * 40 + 4} y={64 - h} width="28" height={h} data-last={i === 5 || undefined} />
              ))}
            </svg>
          </Panel>
          <Panel label="Tableau de bord" meta="En ligne" demo className={s.dashPanel}>
            <p className={s.dashLine}>
              <span className={s.uiDot} aria-hidden="true" /> Consultable à tout moment
            </p>
          </Panel>
        </div>
      </div>

      <ul className={s.commitments}>
        {method.commitments.map((c) => (
          <li key={c.label} data-reveal>
            <span className={s.mono}>{c.label}</span>
            <p>{keepWords(c.text)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Démarrer ---------- */

export function Start() {
  return (
    <section id="demarrer" className={s.start} aria-labelledby="start-title" data-tone="light">
      <Art painting={ART.demarrer} sizes="(max-width: 899px) 100vw, 40vw" className={s.startArt} ratio="4 / 5" parallax />
      <div className={s.startBody}>
        <h2 id="start-title" className={s.h2} data-reveal>
          {keepWords(start.title)}
        </h2>
        <ol className={s.steps}>
          {start.steps.map((st, i) => (
            <li key={st.verb} className={s.step} data-reveal>
              <span className={s.mono}>Étape {i + 1}</span>
              <h3 className={s.stepVerb}>{st.verb}</h3>
              <p className={s.body}>{keepWords(st.text)}</p>
            </li>
          ))}
        </ol>
        <div className={s.heroCtas} data-reveal>
          <Cta href={BOOKING_URL}>{start.cta}</Cta>
          <a href={`mailto:${EMAIL}`} className={s.textLink}>
            ou nous écrire à {EMAIL}
          </a>
        </div>
      </div>
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
          {keepWords("Une autre question ? Posez-la pendant l'appel, ou écrivez-nous.")}
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

/* ---------- Aperçu du blog, « à la une » : le plus récent en grand, 0 à 2 à côté ---------- */

const dateFr = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function BlogPreview() {
  const posts = [...getArticleListEntries()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (posts.length === 0) return null;
  const [lead, ...rest] = posts;
  return (
    <section className={s.blogPrev} aria-labelledby="blog-title" data-tone="light">
      <div className={s.blogHead}>
        <h2 id="blog-title" className={s.h2} data-reveal>
          {blogPreview.title}
        </h2>
        <p className={s.body} data-reveal>
          {keepWords(blogPreview.intro)}
        </p>
        <Link href="/blog" className={s.textLink}>
          {blogPreview.all}
        </Link>
      </div>
      <div className={s.blogGrid} data-count={posts.length}>
        <article className={s.blogLead} data-reveal>
          <Link href={`/blog/${lead.slug}`} className={s.blogCard}>
            <Art painting={paintingFor(lead.category)} sizes="(max-width: 899px) 100vw, 60vw" ratio="3 / 2" />
            <span className={s.blogText}>
              <span className={s.mono}>
                {lead.category} · {dateFr(lead.date)}
              </span>
              <span className={s.blogTitle}>{keepWords(lead.title)}</span>
              <span className={s.blogExcerpt}>{keepWords(lead.excerpt)}</span>
              <span className={s.blogMore}>
                Lire l&apos;article
                <ArrowRight aria-hidden="true" weight="bold" />
              </span>
            </span>
          </Link>
        </article>
        {rest.length > 0 ? (
          <ul className={s.blogSide}>
            {rest.map((post) => (
              <li key={post.slug} data-reveal>
                <Link href={`/blog/${post.slug}`} className={s.blogSmall}>
                  <Art painting={paintingFor(post.category)} sizes="(max-width: 899px) 100vw, 30vw" ratio="3 / 2" />
                  <span className={s.mono}>{post.category}</span>
                  <span className={s.blogSmallTitle}>{keepWords(post.title)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
