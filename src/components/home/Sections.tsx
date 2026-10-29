import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL, CONTACT_HREF, EMAIL, fmt, footerLegal, footerTagline, hero, services } from "@/content/home";
import { INOKO_HREF } from "@/content/inoko";
import { ART } from "@/content/paintings";
import { ClicksChart } from "./ClicksChart";
import { Caption, Cta, Panel, Rule, keepWords } from "./Ui";
import s from "./home.module.css";

// Chaque <section> déclare sa tonalité (data-tone) : les pages d'origine
// (rail, cartons) la lisent pour passer en crème sur charbon.

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title" data-tone="light">
      <div className={s.heroText}>
        <h1 id="hero-title" className={s.h1}>
          <span className={s.h1Kicker} data-hero-fade>
            {hero.kicker}
          </span>{" "}
          <span className={s.h1Big}>
            {hero.titleLines.map((line, i) => (
              <span key={line}>
                {i > 0 ? " " : null}
                <span className={s.lineMask}>
                  <span data-hero-line style={i ? { animationDelay: `${i * 0.1}s` } : undefined}>
                    {line}
                  </span>
                </span>
              </span>
            ))}
          </span>
        </h1>
        <div className={s.heroAside}>
          <p className={s.heroSub} data-hero-fade style={{ animationDelay: "0.3s" }}>
            {keepWords(hero.sub)}
          </p>
          <div className={s.heroCtas} data-hero-fade style={{ animationDelay: "0.4s" }}>
            <Cta href={BOOKING_URL}>{hero.cta}</Cta>
            <a href={`mailto:${EMAIL}`} className={s.textLink}>
              {hero.write} {EMAIL}
            </a>
          </div>
        </div>
      </div>

      <figure className={s.heroVisual}>
        <div className={s.heroPhoto} data-hero-photo>
          <Image
            src={ART.hero.src}
            alt={ART.hero.alt}
            fill
            priority
            sizes="(max-width: 899px) 100vw, 50vw"
            className={s.cover}
          />
        </div>
        <figcaption className={`${s.artCaption} ${s.heroCaption}`}>
          <Caption painting={ART.hero} />
        </figcaption>
        <Panel label="Inoko" meta="Search Console" className={s.heroPanel}>
          <p className={s.panelBig}>
            {fmt(1736)} <span>clics depuis Google en mai 2026</span>
          </p>
          <ClicksChart variant="mini" />
          <p className={s.panelFoot}>{fmt(86)} clics en décembre 2025</p>
        </Panel>
      </figure>
    </section>
  );
}

const figures = [
  { from: "1", to: "13", unit: "commandes par mois", note: "de janvier à avril 2026" },
  { from: `1${" "}000 €`, to: `9${" "}521 €`, unit: "de chiffre d'affaires mensuel TTC", note: "de janvier à avril 2026" },
  { from: "23,5", to: "7,6", unit: "position moyenne du site sur Google", note: "de décembre 2025 à mai 2026" },
];

type InokoProps = {
  id?: string;
  label?: string;
  title?: string;
  intro?: string;
  question?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Inoko({
  id = "inoko",
  label = "Cas client, Inoko",
  title = "De 1 à 13 commandes par mois pour Inoko.",
  intro = "Inoko vend du mobilier modulable pour van. En janvier 2026, la boutique réalisait une vente par mois, " +
    "via Leboncoin, son seul canal. On a retravaillé ses fiches produits, créé une page pilier « lit peigne » " +
    "et des articles de blog. Les visiteurs sont arrivés depuis Google, puis les commandes.",
  question = "Et votre boutique, par où commencer ?",
  ctaLabel = "Voir ce qu'on peut faire pour vous",
  ctaHref = BOOKING_URL,
}: InokoProps) {
  return (
    <section id={id} className={s.inoko} aria-labelledby={`${id}-title`} data-tone="dark">
      <Rule label={label} tone="dark" />
      <div className={s.inokoHead}>
        <h2 id={`${id}-title`} className={s.h2Giant} data-reveal>
          {keepWords(title)}
        </h2>
        <p className={s.inokoIntro} data-reveal>
          {keepWords(intro)}
        </p>
      </div>

      <div className={s.inokoGrid}>
        <div className={s.inokoChart} data-reveal>
          <div className={s.inokoChartHead}>
            <h3 className={s.h3}>Clics depuis Google</h3>
            <span className={s.mono}>Search Console, déc. 2025 à mai 2026</span>
          </div>
          <ClicksChart variant="full" />
        </div>

        <dl className={s.figures}>
          {figures.map((f) => (
            <div key={f.unit} className={s.figure} data-reveal>
              <dt className={s.figureUnit}>{f.unit}</dt>
              <dd className={s.figureValue}>
                <span className={s.figureFrom}>{f.from}</span>
                <span className={s.figureArrow} aria-hidden="true">
                  →
                </span>
                <span className={s.srOnly}> à </span>
                <span>{f.to}</span>
              </dd>
              <dd className={s.figureNote}>{keepWords(f.note)}</dd>
            </div>
          ))}
          <div className={s.figure} data-reveal>
            <dt className={s.figureUnit}>ROAS Google Ads</dt>
            <dd className={s.figureValue}>15</dd>
            <dd className={s.figureNote}>
              {keepWords("annonces du kit d'aménagement van, lancées en avril 2026 après le SEO, rentables dès la deuxième semaine")}
            </dd>
          </div>
        </dl>
      </div>

      <div className={s.inokoFoot}>
        <p className={s.inokoQuestion}>{keepWords(question)}</p>
        <Cta href={ctaHref}>{ctaLabel}</Cta>
      </div>
    </section>
  );
}

type ContactProps = {
  title?: string;
  text?: string;
  ctaLabel?: string;
};

export function Contact({
  title = "Parlons de votre boutique.",
  text = "Un appel de 20 minutes suffit pour voir par où commencer. Le devis suit l'appel.",
  ctaLabel = "Prendre 20 minutes ensemble",
}: ContactProps) {
  return (
    <section className={s.contact} aria-labelledby="contact-title" data-tone="light">
      <Rule label="Contact" />
      <h2 id="contact-title" className={s.contactTitle} data-reveal>
        {keepWords(title)}
      </h2>
      <div className={s.contactRow}>
        <a href={`mailto:${EMAIL}`} className={s.contactEmail} data-reveal>
          {EMAIL}
        </a>
        <div className={s.contactSide} data-reveal>
          <p className={s.body}>{keepWords(text)}</p>
          <Cta href={BOOKING_URL}>{ctaLabel}</Cta>
        </div>
      </div>
    </section>
  );
}

const sitemap = [
  {
    title: "Services",
    links: services.map((sv) => ({ href: sv.href, label: sv.name })),
  },
  {
    title: "Le studio",
    links: [
      { href: INOKO_HREF, label: "Cas client Inoko" },
      { href: "/#methode", label: "Comment on travaille" },
      { href: "/#faq", label: "Questions fréquentes" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Nous joindre",
    links: [
      { href: BOOKING_URL, label: "Réserver un créneau" },
      { href: `mailto:${EMAIL}`, label: EMAIL },
      { href: CONTACT_HREF, label: "Contact" },
    ],
  },
];

export function Footer({ pitch = "Une question, un projet, une boutique à faire grandir ?" }: { pitch?: string }) {
  return (
    <section data-tone="dark" aria-label="Pied de page">
      <footer className={s.footer}>
        <div className={s.footerTop}>
          <p className={s.footerPitch}>{keepWords(pitch)}</p>
          <Cta href={BOOKING_URL}>Fixer un rendez-vous</Cta>
        </div>
        <nav aria-label="Plan du site" className={s.sitemap}>
          {sitemap.map((col) => (
            <div key={col.title}>
              <p className={s.sitemapTitle}>{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? <Link href={l.href}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className={s.wordmark} aria-hidden="true">
          Venturia
        </p>
        <div className={s.footerBase}>
          <span>© 2026 Venturia</span>
          <ul className={s.legal}>
            {footerLegal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <span>{keepWords(footerTagline)}</span>
        </div>
      </footer>
    </section>
  );
}
