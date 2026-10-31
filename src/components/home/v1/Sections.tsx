import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getArticle, getArticleListEntries } from "@/content/blog";
import {
  BOOKING_URL,
  EMAIL,
  blogPreviewCopy,
  interludeCopy,
  methodCopy,
  sectionLabels,
  situationsCopy,
  startCopy,
} from "@/content/home";
import { INOKO_HOME_PHOTO, inokoHomeBlock, type InokoFigure } from "@/content/inoko";
import { ART, type Painting } from "@/content/paintings";
import { estimateReadingMinutes, formatFrenchDate } from "@/lib/blog";
import { paintingFor } from "../Article";
import { ClicksChart } from "../ClicksChart";
import { Caption, Cta, Rule, fr, keepWords } from "../Ui";
import s from "../home.module.css";
import v from "./v1.module.css";

// Sections reprises du test 1, adaptées aux tokens, aux polices et aux
// pièces du test 2 (filet titré, bouton, légende de tableau).

const pad = (i: number) => String(i + 1).padStart(2, "0");

// Tableau entier, à ses proportions, légende dessous.
function PaintingFigure({ painting, sizes, className }: { painting: Painting; sizes: string; className?: string }) {
  return (
    <figure className={`${v.painting} ${className ?? ""}`}>
      <Image src={painting.src} alt={painting.alt} width={painting.width} height={painting.height} sizes={sizes} />
      <figcaption className={v.caption}>
        <Caption painting={painting} />
      </figcaption>
    </figure>
  );
}

/* ---------- « Vos clients cherchent déjà… » ---------- */

export function Interlude() {
  return (
    <section id="approche" className={`${v.section} ${v.halfTop}`} aria-label={interludeCopy.ariaLabel} data-tone="light">
      <Rule label={sectionLabels.interlude} />
      <div className={v.interlude}>
        <PaintingFigure painting={ART.interlude} sizes="(min-width: 1024px) 40vw, 100vw" className={v.interludePainting} />
        <p className={v.statement} data-reveal>
          {keepWords(interludeCopy.statement)}
        </p>
      </div>
    </section>
  );
}

/* ---------- Cas Inoko, version courte, et transition ---------- */

function InokoFigures({ figures }: { figures: InokoFigure[] }) {
  return (
    <dl className={v.figures} data-tone="dark">
      {figures.map((f) => (
        <div key={f.measure} className={v.figure}>
          <dt className={v.figureMeasure}>{keepWords(f.measure)}</dt>
          <dd className={v.figureValue}>
            {f.prefix ? <span className={v.figurePrefix}>{f.prefix}</span> : null}
            {f.value.length === 2 ? (
              <>
                <span className={v.figureFrom}>{fr(f.value[0])}</span>
                <ArrowRight weight="bold" aria-hidden="true" className={v.figureArrow} />
                <span className={s.srOnly}> {inokoHomeBlock.fromTo} </span>
                <span>{fr(f.value[1])}</span>
              </>
            ) : (
              <span>{fr(f.value[0])}</span>
            )}
          </dd>
          {f.chart ? (
            <dd className={v.figureChart}>
              <ClicksChart variant="card" />
            </dd>
          ) : null}
          <dd className={v.figurePeriod}>
            {f.period ? <span>{f.period}</span> : null}
            <span>{f.source}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function InokoCase() {
  const b = inokoHomeBlock;
  return (
    <section id="inoko" className={`${v.section} ${v.halfBottom}`} aria-labelledby="inoko-title" data-tone="light">
      <Rule label={b.label} />
      <h2 id="inoko-title" className={`${s.h2Giant} ${v.headTitle}`} data-reveal>
        {keepWords(b.title)}
      </h2>

      <div className={v.inokoBody}>
        <figure className={v.inokoPhoto}>
          <div className={v.photoFrame}>
            <Image
              src={INOKO_HOME_PHOTO.src}
              alt={INOKO_HOME_PHOTO.alt}
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className={s.cover}
            />
          </div>
          <figcaption className={v.caption}>{INOKO_HOME_PHOTO.caption}</figcaption>
        </figure>

        <div className={v.inokoStory}>
          <ol className={v.story}>
            {b.story.map((step, i) => (
              <li key={step.label} className={v.storyStep} data-reveal>
                <span className={v.storyIndex} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={v.storyLabel}>{step.label}</h3>
                <p className={v.storyText}>{keepWords(step.text)}</p>
              </li>
            ))}
          </ol>
          <Link href={b.link.href} className={v.arrowLink}>
            {b.link.label}
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <InokoFigures figures={b.figures} />

      <p className={v.transition} data-reveal>
        {keepWords(b.transition)}
      </p>
    </section>
  );
}

/* ---------- Où en est votre boutique ? ---------- */

export function Situations() {
  const c = situationsCopy;
  return (
    <section id="situations" className={`${v.section} ${v.halfTop}`} aria-labelledby="situations-title" data-tone="light">
      <Rule label={sectionLabels.situations} />
      <div className={v.sectionHead}>
        <h2 id="situations-title" className={s.h2} data-reveal>
          {keepWords(c.title)}
        </h2>
        <p className={v.sectionIntro} data-reveal>
          {keepWords(c.intro)}
        </p>
      </div>
      <ol className={v.situations}>
        {c.items.map((item, i) => (
          <li key={item.situation} className={v.situation} data-reveal>
            <span className={v.situationIndex} aria-hidden="true">
              {pad(i)}
            </span>
            <h3 className={v.situationTitle}>{keepWords(item.situation)}</h3>
            <div className={v.situationText}>
              <p>{keepWords(item.text)}</p>
              <ul className={v.situationLinks} aria-label={c.linksLabel}>
                {item.services.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} className={v.tagLink}>
                      {service.label}
                      <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Comment on travaille ---------- */

// Hauteurs relatives des barres du rapport : une forme, aucune valeur.
const REPORT_BARS = [
  [34, 42, 40, 55, 63, 78],
  [20, 26, 38, 35, 52, 60],
  [48, 52, 58, 64, 70, 82],
];

export function Method() {
  const c = methodCopy;
  return (
    <section id="methode" className={v.section} aria-labelledby="method-title" data-tone="light">
      <Rule label={sectionLabels.method} />
      <div className={v.sectionHead}>
        <h2 id="method-title" className={s.h2} data-reveal>
          {keepWords(c.title)}
        </h2>
        <p className={v.sectionIntro} data-reveal>
          {keepWords(c.intro)}
        </p>
      </div>

      <ul className={v.formulas}>
        {c.formulas.map((f) => (
          <li key={f.name} className={v.formula} data-reveal>
            <h3 className={v.formulaName}>{f.name}</h3>
            <p className={v.formulaText}>{keepWords(f.text)}</p>
            <p className={v.formulaTerm}>{f.term}</p>
          </li>
        ))}
      </ul>

      <div className={v.follow}>
        <div className={v.followText}>
          <h3 className={v.followTitle} data-reveal>
            {c.followTitle}
          </h3>
          <ol className={v.followList}>
            {c.follow.map((step, i) => (
              <li key={step.title} data-reveal>
                <span className={v.followIndex} aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <strong>{step.title}</strong>
                  <span className={v.followDetail}>{keepWords(step.text)}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className={v.report} role="img" aria-label={c.report.ariaLabel} data-reveal>
          <p className={v.reportHead} aria-hidden="true">
            <span>{c.report.title}</span>
            <span>{c.report.period}</span>
          </p>
          <ul className={v.reportRows} aria-hidden="true">
            {c.report.rows.map((label, r) => (
              <li key={label}>
                <span>{label}</span>
                <svg viewBox="0 0 120 32" className={v.reportBars}>
                  {REPORT_BARS[r % REPORT_BARS.length].map((h, i) => (
                    <rect key={i} x={i * 20 + 2} y={32 - (h * 32) / 100} width="14" height={(h * 32) / 100} data-last={i === 5 || undefined} />
                  ))}
                </svg>
              </li>
            ))}
          </ul>
          <p className={v.reportNext} aria-hidden="true">
            {c.report.next}
          </p>
        </div>
      </div>

      <ul className={v.commitments}>
        {c.commitments.map((item) => (
          <li key={item.title} data-reveal>
            <strong className={v.commitmentTitle}>{fr(item.title)}</strong>
            <span className={v.commitmentText}>{keepWords(item.text)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Démarrer ---------- */

export function Start() {
  const c = startCopy;
  return (
    <section id="demarrer" className={v.section} aria-labelledby="start-title" data-tone="light">
      <Rule label={sectionLabels.start} />
      <div className={v.start}>
        <PaintingFigure painting={ART.demarrer} sizes="(min-width: 1024px) 42vw, 100vw" className={v.startPainting} />
        <div className={v.startText}>
          <h2 id="start-title" className={s.h2} data-reveal>
            {keepWords(c.title)}
          </h2>
          <p className={v.sectionIntro} data-reveal>
            {keepWords(c.intro)}
          </p>
          <ol className={v.startSteps}>
            {c.steps.map((step, i) => (
              <li key={step.title} data-reveal>
                <span className={v.startIndex} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={v.startStepTitle}>{keepWords(step.title)}</h3>
                <p className={s.body}>{keepWords(step.body)}</p>
              </li>
            ))}
          </ol>
          <div className={s.heroCtas}>
            <Cta href={BOOKING_URL}>{c.cta}</Cta>
            <a href={`mailto:${EMAIL}`} className={s.textLink}>
              {c.emailPrefix} {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Aperçu du blog « à la une » ---------- */

function latestArticles() {
  return getArticleListEntries()
    .slice()
    .sort((x, y) => y.date.localeCompare(x.date))
    .slice(0, 3)
    .map((entry) => {
      const article = getArticle(entry.slug);
      return {
        ...entry,
        minutes: article ? estimateReadingMinutes(article) : null,
        cover: paintingFor(entry.category),
      };
    });
}

function Cover({ painting, sizes, className }: { painting: Painting; sizes: string; className?: string }) {
  return (
    <span
      className={`${v.cover} ${className ?? ""}`}
      style={{ "--r": painting.width / painting.height, aspectRatio: `${painting.width} / ${painting.height}` } as CSSProperties}
    >
      <Image src={painting.src} alt="" fill sizes={sizes} className={s.cover} />
    </span>
  );
}

export function BlogPreview() {
  const articles = latestArticles();
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;
  const c = blogPreviewCopy;
  return (
    <section id="blog" className={v.section} aria-labelledby="blog-title" data-tone="light">
      <Rule label={sectionLabels.blog} />
      <div className={v.blogHead}>
        <h2 id="blog-title" className={s.h2} data-reveal>
          {c.title}
        </h2>
        <Link href="/blog" className={v.arrowLink}>
          {c.all}
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </Link>
      </div>
      {/* À la une : le plus récent en grand, les autres à côté. Un seul
          article : il occupe seul toute la largeur. */}
      <div className={v.posts} data-count={articles.length}>
        <article className={v.featured} data-reveal>
          <Link href={`/blog/${lead.slug}`} className={v.postLink}>
            <Cover painting={lead.cover} sizes="(min-width: 1024px) 50vw, 100vw" className={v.featuredImage} />
            <span className={v.postBody}>
              <span className={v.postMeta}>
                <span>{lead.category}</span>
                <time dateTime={lead.date}>{formatFrenchDate(lead.date)}</time>
                {lead.minutes ? (
                  <span>
                    {fr(`${lead.minutes} ${c.minutes}`)}
                  </span>
                ) : null}
              </span>
              <h3 className={v.featuredTitle}>{keepWords(lead.title)}</h3>
              <span className={v.postExcerpt}>{keepWords(lead.excerpt)}</span>
              <span className={v.postMore}>
                {c.readMore}
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </span>
            </span>
          </Link>
        </article>
        {rest.length > 0 ? (
          <ul className={v.side}>
            {rest.map((post) => (
              <li key={post.slug} data-reveal>
                <Link href={`/blog/${post.slug}`} className={v.sideLink}>
                  <Cover painting={post.cover} sizes="(min-width: 1024px) 14vw, 30vw" className={v.sideImage} />
                  <span className={v.sideText}>
                    <span className={v.postMeta}>
                      <span>{post.category}</span>
                    </span>
                    <span className={v.sideTitle}>{keepWords(post.title)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
