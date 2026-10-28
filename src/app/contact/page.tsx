import type { Metadata } from "next";
import { EMAIL } from "@/content/home";
import { contactCall, contactHero, contactMeta } from "@/content/rendezvous";
import { Footer } from "@/components/home/Sections";
import { Cta, Rule, keepWords } from "@/components/home/Ui";
import { Agenda } from "@/components/home/Agenda";
import { CopyEmail } from "@/components/home/CopyEmail";
import { Motion } from "@/components/home/Motion";
import s from "@/components/home/home.module.css";
import p from "@/components/home/pages.module.css";

export const metadata: Metadata = {
  title: { absolute: contactMeta.title },
  description: contactMeta.description,
  alternates: { canonical: "/contact" },
};

// Deux actions et rien d'autre : réserver dans l'agenda intégré, ou
// écrire. Le titre et l'adresse en très grand, l'agenda dans la page.
export default function ContactPage() {
  return (
    <div className={s.page} data-v2>
      <section className={p.contactHero} aria-labelledby="contact-title" data-tone="light">
        <h1 id="contact-title" className={s.h1}>
          <span className={s.h1Kicker} data-hero-fade>
            {contactHero.kicker}
          </span>
          <span className={`${s.h1Big} ${p.contactH1}`}>
            {contactHero.title.map((line, i) => (
              <span key={line} className={s.lineMask}>
                <span data-hero-line style={{ animationDelay: `${i * 0.1}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </span>
        </h1>
        <div className={p.contactLead} data-hero-fade style={{ animationDelay: "0.3s" }}>
          <p className={s.heroSub}>{keepWords(contactHero.sub)}</p>
          <Cta href="#agenda">{contactHero.cta}</Cta>
        </div>

        <div className={p.write} data-hero-fade style={{ animationDelay: "0.45s" }}>
          <p className={s.mono}>{keepWords(contactHero.writeLabel)}</p>
          <a href={`mailto:${EMAIL}`} className={`${s.contactEmail} ${p.writeEmail}`}>
            {EMAIL}
          </a>
          <div className={p.writeRow}>
            <p className={s.body}>{keepWords(contactHero.writeText)}</p>
            <CopyEmail email={EMAIL} />
          </div>
        </div>
      </section>

      <section id="agenda" className={p.booking} aria-labelledby="call-title" data-tone="light">
        <div className={p.call}>
          <Rule label={contactCall.label} />
          <h2 id="call-title" className={s.h2} data-reveal>
            {keepWords(contactCall.title)}
          </h2>
          <ol className={p.callList}>
            {contactCall.points.map((pt, i) => (
              <li key={pt.name} className={p.callItem} data-reveal>
                <span className={s.mono}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={p.callName}>{pt.name}</h3>
                <p className={s.body}>{keepWords(pt.text)}</p>
              </li>
            ))}
          </ol>
          <div className={p.after} data-reveal>
            <p className={s.mono}>{contactCall.afterLabel}</p>
            <h3 className={p.afterTitle}>{contactCall.afterTitle}</h3>
            <p className={s.body}>{keepWords(contactCall.afterText)}</p>
          </div>
        </div>
        <Agenda />
      </section>

      <Footer pitch="Vingt minutes pour voir ce qu'on peut faire pour votre boutique." />
      <Motion />
    </div>
  );
}
