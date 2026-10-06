import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailController, RailSlot, type RailConfig } from "@/components/layout/Rail";
import { MobileRailStack } from "@/components/layout/MobileRailStack";
import { IconClock, IconSparkle, IconArrowRight } from "@/components/layout/RailIcons";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import heroStyles from "@/components/service-page/ServiceHero.module.css";
import { ServiceInokoCase } from "@/components/service-page/ServiceInokoCase";
import { ServiceTimeline } from "@/components/service-page/ServiceTimeline";
import { ServiceStarting } from "@/components/service-page/ServiceStarting";
import { ServiceOtherActivities } from "@/components/service-page/ServiceOtherActivities";
import { ServiceRedBand } from "@/components/service-page/ServiceRedBand";
import { ServiceCrossLink } from "@/components/service-page/ServiceCrossLink";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { ServiceOtherExpertises } from "@/components/service-page/ServiceOtherExpertises";
import { Footer } from "@/components/layout/Footer";
import footerStyles from "@/components/layout/footer.module.css";
import { seo } from "@/content/services/seo";

export const metadata: Metadata = {
  title: { absolute: seo.meta.title },
  description: seo.meta.description,
  // Chemin SANS barre finale, aligné sur le canonical — même convention
  // que /services/automations et /services/sea (CLAUDE.md, « Pages
  // services — gabarit »). /services/seo : l'ancienne adresse de cette
  // page, déjà indexée par Google, conservée telle quelle.
  alternates: { canonical: "/services/seo" },
};

// Rail de cette page — 3 cartons, moteur INCHANGÉ (CLAUDE.md, « Pages
// services — gabarit », « RAIL ») :
//   1. hero   haut du H1 (#service-hero-title) — carton cliquable
//             (href "#faq"), même mécanisme que le carton 3
//   2. geo    haut du H2 du bloc 5 (GEO) — carton cliquable (href "#geo")
//   3. other-expertises  bas du bloc 10 (« Autres expertises »)
const SEO_RAIL_CONFIG: RailConfig = {
  cards: seo.rail,
  icons: [IconClock, IconSparkle, IconArrowRight],
  offsetTargets: [
    {
      varName: "--rail-card1-offset",
      sectionId: "hero",
      selector: "#service-hero-title",
      edge: "top",
    },
    {
      varName: "--rail-card2-offset",
      sectionId: "geo",
      selector: "#service-other-activities-title",
      edge: "top",
    },
    {
      varName: "--rail-card3-offset",
      sectionId: "other-expertises",
      selector: "[data-service-other-expertises-end]",
      edge: "bottom",
    },
  ],
  mobileReveal: ["hero", "geo", "other-expertises"],
};

// Page /services/seo (Référencement naturel + GEO, son adresse déjà
// indexée par Google, conservée) — gabarit des pages services
// (CLAUDE.md, « Pages services — gabarit »). Ordre : 1 Hero, 2 Cas
// Inoko, 3 Frise, 4 Par où commencer, 5 GEO, 6 Respiration rouge,
// 7 Ce qui fait varier le prix, 8 Référencement + Google Ads, 9 FAQ,
// 10 Autres expertises.
export default function SeoPage() {
  return (
    <>
      <MobileRailStack config={SEO_RAIL_CONFIG} />
      <RailController config={SEO_RAIL_CONFIG} />

      <Shell>
        <Section
          name="hero"
          tone="light"
          spacing="none"
          labelledBy="service-hero-title"
          className={heroStyles.section}
          bodyClassName={heroStyles.body}
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceHero {...seo.hero} titleCqi={seo.heroTitleCqi} />
        </Section>

        <RailSlot cardIndex={0} anchor="hero" config={SEO_RAIL_CONFIG} />

        <Section name="inoko-case" tone="light" labelledBy="service-inoko-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceInokoCase {...seo.inokoCase} />
        </Section>

        <Section name="timeline" tone="light" labelledBy="service-timeline-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceTimeline {...seo.timeline} headingId="service-timeline-title" />
        </Section>

        <Section name="starting" tone="light" labelledBy="service-starting-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceStarting {...seo.starting} />
        </Section>

        <Section name="geo" tone="light" labelledBy="service-other-activities-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceOtherActivities {...seo.otherActivities} />
        </Section>

        <RailSlot cardIndex={1} anchor="geo" config={SEO_RAIL_CONFIG} />

        {/* tone="light" (pas "accent") : comme la Respiration de la home
            et des pages Automatisation/SEA, c'est l'inversion
            scroll-triggered (invertTo="accent") qui fait apparaître le
            rouge, jamais un fond statique. */}
        <Section name="redband" tone="light" labelledBy="service-redband-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceRedBand {...seo.redBand} />
        </Section>

        <Section
          name="price-factors"
          tone="light"
          labelledBy="service-price-factors-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceOtherActivities {...seo.priceFactors} headingId="service-price-factors-title" />
        </Section>

        <Section name="crosslink" tone="light" labelledBy="service-crosslink-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceCrossLink {...seo.crossLink} />
        </Section>

        <Section name="faq" tone="light" labelledBy="service-faq-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceFaq {...seo.faq} />
        </Section>

        <Section name="other-expertises" tone="light" bodyStyle={{ rowGap: 0 }}>
          <ServiceOtherExpertises {...seo.otherExpertises} />
        </Section>

        <RailSlot cardIndex={2} anchor="other-expertises" config={SEO_RAIL_CONFIG} />

        <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
          <Footer />
        </Section>
      </Shell>
    </>
  );
}
