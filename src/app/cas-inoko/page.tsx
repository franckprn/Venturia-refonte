import type { Metadata } from "next";
import Image from "next/image";
import { BOOKING_URL, EMAIL } from "@/content/home";
import { inokoPage as c } from "@/content/inoko";
import { INOKO_PHOTO, INOKO_SEARCH_CONSOLE } from "@/content/paintings";
import { ClicksChart } from "@/components/home/ClicksChart";
import { Footer } from "@/components/home/Sections";
import { Motion } from "@/components/home/Motion";
import { Cta, Rule, fr, keepWords } from "@/components/home/Ui";
import s from "@/components/home/home.module.css";
import k from "@/components/home/cas.module.css";

export const metadata: Metadata = {
  title: { absolute: c.meta.title },
  description: c.meta.description,
  alternates: { canonical: "/cas-inoko" },
};

// Cas Inoko, raconté mois par mois. Chaque chiffre arrive avec ce qu'il
// mesure et sa période ; les sources ferment la page.
export default function CasInoko() {
  return (
    <div className={s.page} data-v2>
      <section className={k.hero} aria-labelledby="cas-title" data-tone="light">
        <p className={s.h1Kicker}>{c.kicker}</p>
        <h1 id="cas-title" className={k.title}>
          {keepWords(c.title)}
        </h1>
        <div className={k.heroRow}>
          <p className={k.intro}>{keepWords(c.intro)}</p>
          <div className={s.heroCtas}>
            <Cta href={BOOKING_URL}>Parler de votre boutique</Cta>
            <a href={`mailto:${EMAIL}`} className={s.textLink}>
              ou écrire à {EMAIL}
            </a>
          </div>
        </div>
        <figure className={k.photo}>
          <Image src={INOKO_PHOTO.src} alt={INOKO_PHOTO.alt} fill priority sizes="100vw" className={s.cover} />
        </figure>
      </section>

      <section className={`${s.case} ${k.band}`} aria-label="Les chiffres clés" data-tone="dark">
        <dl className={s.caseFigures}>
          {c.figures.map((f) => (
            <div key={f.what} className={s.caseFigure} data-reveal>
              <dt className={s.caseWhat}>{keepWords(f.what)}</dt>
              <dd className={s.caseValue}>{fr(f.value)}</dd>
              <dd className={s.casePeriod}>{keepWords(f.period)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={k.section} aria-labelledby="work-title" data-tone="light">
        <Rule label={c.workLabel} />
        <h2 id="work-title" className={s.h2} data-reveal>
          {keepWords(c.workTitle)}
        </h2>
        <ol className={k.work}>
          {c.work.map((w, i) => (
            <li key={w.name} className={k.workItem} data-reveal>
              <span className={s.mono}>
                {String(i + 1).padStart(2, "0")} · {w.period}
              </span>
              <h3 className={k.workName}>{w.name}</h3>
              <p className={s.body}>{keepWords(w.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={k.section} aria-labelledby="months-title" data-tone="light">
        <Rule label={c.monthsLabel} />
        <h2 id="months-title" className={s.h2} data-reveal>
          {keepWords(c.monthsTitle)}
        </h2>
        <ol className={k.months}>
          {c.months.map((m) => (
            <li key={m.month} className={k.month} data-reveal>
              <div className={k.monthHead}>
                <span className={k.monthDate}>{m.month}</span>
                <h3 className={k.monthTitle}>{keepWords(m.title)}</h3>
              </div>
              <p className={k.monthText}>{keepWords(m.text)}</p>
              <dl className={k.monthStats}>
                {m.stats.map((st) => (
                  <div key={st.what}>
                    <dt>{st.what}</dt>
                    <dd>{fr(st.value)}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${s.case} ${k.captures}`} aria-labelledby="captures-title" data-tone="dark">
        <Rule label={c.capturesLabel} tone="dark" />
        <div className={k.capturesGrid}>
          <div className={s.inokoChart} data-reveal>
            <div className={s.inokoChartHead}>
              <h2 id="captures-title" className={s.h3}>
                {c.chartTitle}
              </h2>
              <span className={s.mono}>{c.chartMeta}</span>
            </div>
            <ClicksChart variant="full" />
          </div>
          <figure className={k.screen} data-reveal>
            <div className={k.screenFrame}>
              <Image
                src={INOKO_SEARCH_CONSOLE.src}
                alt={INOKO_SEARCH_CONSOLE.alt}
                fill
                sizes="(max-width: 899px) 100vw, 40vw"
                className={s.cover}
              />
            </div>
            <figcaption className={s.mono}>{c.screenCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className={k.section} aria-labelledby="positions-title" data-tone="light">
        <Rule label={c.positionsLabel} />
        <h2 id="positions-title" className={s.h2} data-reveal>
          {keepWords(c.positionsTitle)}
        </h2>
        <dl className={k.positions}>
          {c.positions.map((p) => (
            <div key={p.what} className={k.position} data-reveal>
              <dt>{keepWords(p.what)}</dt>
              <dd>{fr(p.value)}</dd>
            </div>
          ))}
        </dl>
        <p className={k.sources}>{keepWords(c.sources)}</p>
      </section>

      <section className={k.end} aria-labelledby="end-title" data-tone="light">
        <h2 id="end-title" className={s.h2Giant} data-reveal>
          {keepWords(c.ctaTitle)}
        </h2>
        <div className={k.endSide} data-reveal>
          <p className={s.body}>{keepWords(c.ctaText)}</p>
          <div className={s.heroCtas}>
            <Cta href={BOOKING_URL}>{c.cta}</Cta>
            <a href={`mailto:${EMAIL}`} className={s.textLink}>
              ou nous écrire
            </a>
          </div>
        </div>
      </section>

      <Footer pitch="Votre boutique a son histoire à écrire sur Google." />
      <Motion />
    </div>
  );
}
