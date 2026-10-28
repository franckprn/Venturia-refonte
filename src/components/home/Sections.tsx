import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CONTACT_HREF, EMAIL, fmt, services, steps } from "@/content/home";
import { ClicksChart } from "./ClicksChart";
import { Art, Cta, Panel, Rule, keepWords } from "./Ui";
import { INOKO_PHOTO, PAINTINGS } from "./photos";
import s from "./home.module.css";

// Chaque <section> déclare sa tonalité (data-tone) : les pages d'origine
// (rail, cartons) la lisent pour passer en crème sur charbon.

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title" data-tone="light">
      <div className={s.heroText}>
        <h1 id="hero-title" className={s.h1}>
          <span className={s.h1Kicker} data-hero-fade>
            Studio digital pour les boutiques en ligne et les PME
          </span>
          <span className={s.h1Big}>
            <span className={s.lineMask}>
              <span data-hero-line>Plus de clients,</span>
            </span>{" "}
            <span className={s.lineMask}>
              <span data-hero-line style={{ animationDelay: "0.1s" }}>
                plus de ventes.
              </span>
            </span>
          </span>
        </h1>
        <div className={s.heroAside}>
          <p className={s.heroSub} data-hero-fade style={{ animationDelay: "0.3s" }}>
            {keepWords(
              "Référencement, Google Ads, site et automatisation : on vous accompagne de la recherche Google jusqu'à la commande.",
            )}
          </p>
          <div className={s.heroCtas} data-hero-fade style={{ animationDelay: "0.4s" }}>
            <Cta href={CONTACT_HREF}>Réserver un appel de 20 min</Cta>
            <a href={`mailto:${EMAIL}`} className={s.textLink}>
              ou écrire à {EMAIL}
            </a>
          </div>
        </div>
      </div>

      <figure className={s.heroVisual}>
        <div className={s.heroPhoto} data-hero-photo>
          <Image
            src={INOKO_PHOTO.src}
            alt={INOKO_PHOTO.alt}
            fill
            priority
            sizes="(max-width: 899px) 100vw, 40vw"
            className={s.cover}
          />
        </div>
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
    "via Leboncoin, son seul canal. On a retravaillé ses pages produits et écrit un guide pour fabriquer un lit " +
    "peigne. Les visiteurs sont arrivés depuis Google, puis les commandes.",
  question = "Et votre boutique, par où commencer ?",
  ctaLabel = "Voir ce qu'on peut faire pour vous",
  ctaHref = CONTACT_HREF,
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
            <dt className={s.figureUnit}>position moyenne sur Google</dt>
            <dd className={s.figureValue}>1,6</dd>
            <dd className={s.figureNote}>{keepWords("pour la requête « lit peigne 140x190 »")}</dd>
          </div>
          <div className={s.figure} data-reveal>
            <dt className={s.figureUnit}>ROAS Google Ads</dt>
            <dd className={s.figureValue}>15</dd>
            <dd className={s.figureNote}>
              {keepWords("campagnes lancées en avril 2026, après le SEO, rentables dès la deuxième semaine")}
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

export function Services() {
  return (
    <section id="services" className={s.services} aria-labelledby="services-title" data-tone="light">
      <h2 id="services-title" className={s.h2} data-reveal>
        Quatre leviers pour vendre plus en ligne, réunis dans une seule équipe.
      </h2>
      <ol className={s.serviceList}>
        {services.map((sv) => (
          <li key={sv.id} id={sv.id} className={s.service} data-reveal>
            <h3 className={s.serviceName}>
              <Link href={sv.href} className={s.serviceLink}>
                {sv.name}
                <ArrowUpRight aria-hidden="true" weight="bold" className={s.serviceArrow} />
              </Link>
            </h3>
            <Art painting={PAINTINGS[sv.painting]} sizes="(max-width: 899px) 30vw, 14vw" className={s.serviceArt} />
            <div className={s.serviceBody}>
              <p className={s.serviceLead}>{keepWords(sv.lead)}</p>
              <p className={s.serviceText}>{keepWords(sv.text)}</p>
              <ul className={s.tags} aria-label={`Outils et spécialités, ${sv.name}`}>
                {sv.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Showcase() {
  return (
    <section className={s.showcase} aria-labelledby="showcase-title" data-tone="light">
      <div className={s.showcaseText}>
        <h2 id="showcase-title" className={s.h2} data-reveal>
          Du premier clic sur Google jusqu&apos;à la facture envoyée.
        </h2>
        <p className={s.body} data-reveal>
          {keepWords(
            "Votre fiche apparaît dans les résultats, l'annonce capte l'acheteur, la boutique encaisse, et n8n s'occupe de la suite : facture, stock, email de suivi.",
          )}
        </p>
        <Cta href={CONTACT_HREF} variant="line">
          Parler de votre projet
        </Cta>
      </div>

      <div className={s.showcaseVisual}>
        <Art painting={PAINTINGS.marche} sizes="(max-width: 899px) 100vw, 60vw" className={s.showcaseArt} parallax />

        <Panel label="Résultat Google" meta="google.fr" demo className={s.serpPanel}>
          <p className={s.serpUrl}>maison-calade.fr › nappes › lin-lave</p>
          <p className={s.serpTitle}>{keepWords("Nappe en lin lavé, 14 coloris")}</p>
          <p className={s.serpDesc}>
            {keepWords("Lin européen lavé à la pierre. Livraison en 48 h, retours sous 30 jours.")}
          </p>
        </Panel>

        <Panel label="Workflow n8n" meta="Actif" demo className={s.flowPanel}>
          <ol className={s.flow}>
            <li>Nouvelle commande Shopify</li>
            <li>Facture créée</li>
            <li>Stock mis à jour</li>
            <li>Email de suivi envoyé</li>
          </ol>
        </Panel>
      </div>
    </section>
  );
}

export function Start() {
  return (
    <section id="demarrer" className={s.start} aria-labelledby="start-title" data-tone="light">
      <h2 id="start-title" className={s.h2Giant} data-reveal>
        Démarrer prend vingt minutes.
      </h2>
      <ol className={s.steps}>
        {steps.map((st) => (
          <li key={st.verb} className={s.step} data-reveal>
            <h3 className={s.stepVerb}>{st.verb}</h3>
            <p className={s.body}>{keepWords(st.text)}</p>
          </li>
        ))}
      </ol>
      <div className={s.startCta}>
        <Cta href={CONTACT_HREF}>Choisir mon créneau</Cta>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className={s.reviews} aria-labelledby="reviews-title" data-tone="light">
      <h2 id="reviews-title" className={s.h2} data-reveal>
        Ce qu&apos;en disent les entreprises accompagnées.
      </h2>
      <ul className={s.reviewList}>
        {[0, 1, 2].map((i) => (
          <li key={i} className={s.reviewSlot} data-reveal>
            <span className={s.mono}>AVIS À VENIR</span>
          </li>
        ))}
      </ul>
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
          <Cta href={CONTACT_HREF}>{ctaLabel}</Cta>
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
      { href: "/#inoko", label: "Cas client Inoko" },
      { href: "/#demarrer", label: "Comment on démarre" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Nous joindre",
    links: [
      { href: CONTACT_HREF, label: "Réserver un créneau" },
      { href: `mailto:${EMAIL}`, label: EMAIL },
    ],
  },
];

export function Footer({ pitch = "Une question, un projet, une boutique à faire grandir ?" }: { pitch?: string }) {
  return (
    <section data-tone="dark" aria-label="Pied de page">
      <footer className={s.footer}>
        <div className={s.footerTop}>
          <p className={s.footerPitch}>{keepWords(pitch)}</p>
          <Cta href={CONTACT_HREF}>Fixer un rendez-vous</Cta>
        </div>
        <nav aria-label="Plan du site" className={s.sitemap}>
          {sitemap.map((col) => (
            <div key={col.title}>
              <p className={s.sitemapTitle}>{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("mailto:") ? (
                      <a href={l.href}>{l.label}</a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
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
          <span>Studio digital, référencement, Google Ads, sites et automatisation</span>
        </div>
      </footer>
    </section>
  );
}
