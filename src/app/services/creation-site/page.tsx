import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailController, RailSlot, type RailConfig } from "@/components/layout/Rail";
import { MobileRailStack } from "@/components/layout/MobileRailStack";
import { IconClock, IconLayers, IconArrowRight } from "@/components/layout/RailIcons";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import heroStyles from "@/components/service-page/ServiceHero.module.css";
import { ServiceRateCalculator } from "@/components/service-page/ServiceRateCalculator";
import { ServiceTimeline } from "@/components/service-page/ServiceTimeline";
import { ServiceStarting } from "@/components/service-page/ServiceStarting";
import { ServiceOtherActivities } from "@/components/service-page/ServiceOtherActivities";
import { ServiceRedBand } from "@/components/service-page/ServiceRedBand";
import { ServiceCrossLink } from "@/components/service-page/ServiceCrossLink";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { ServiceOtherExpertises } from "@/components/service-page/ServiceOtherExpertises";
import { Footer } from "@/components/layout/Footer";
import footerStyles from "@/components/layout/footer.module.css";
import { creationSite } from "@/content/services/creation-site";

export const metadata: Metadata = {
  title: { absolute: creationSite.meta.title },
  description: creationSite.meta.description,
  // Chemin SANS barre finale, aligné sur le canonical — même convention
  // que /services/automations, /services/sea et /services/seo
  // (CLAUDE.md, « Pages services — gabarit »). /services/creation-site :
  // l'ancienne adresse de cette page, déjà indexée par Google, conservée
  // telle quelle.
  alternates: { canonical: "/services/creation-site" },
};

// Rail de cette page — 3 cartons, moteur INCHANGÉ (CLAUDE.md, « Pages
// services — gabarit », « RAIL ») :
//   1. hero         haut du H1 (#service-hero-title) — carton cliquable
//                   (href "#timeline"), même mécanisme que le carton 3
//   2. plateformes  haut du H2 du bloc 5 (Plateformes) — carton
//                   cliquable (href "#plateformes")
//   3. other-expertises  bas du bloc 10 (« Autres expertises »)
const CREATION_SITE_RAIL_CONFIG: RailConfig = {
  cards: creationSite.rail,
  icons: [IconClock, IconLayers, IconArrowRight],
  offsetTargets: [
    {
      varName: "--rail-card1-offset",
      sectionId: "hero",
      selector: "#service-hero-title",
      edge: "top",
    },
    {
      varName: "--rail-card2-offset",
      sectionId: "plateformes",
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
  mobileReveal: ["hero", "plateformes", "other-expertises"],
};

// Page /services/creation-site (Création de site e-commerce, son adresse
// déjà indexée par Google, conservée) — gabarit des pages services
// (CLAUDE.md, « Pages services — gabarit »). Ordre : 1 Hero,
// 2 Calculateur (moment fort, juste après le Hero), 3 Frise (La méthode),
// 4 Par où commencer, 5 Plateformes, 6 Respiration rouge, 7 Inclus dans
// le forfait, 8 Site + Référencement, 9 FAQ, 10 Autres expertises. Pas de
// cas client Inoko sur cette page (aucun donné dans le brief).
export default function CreationSitePage() {
  return (
    <>
      <MobileRailStack config={CREATION_SITE_RAIL_CONFIG} />
      <RailController config={CREATION_SITE_RAIL_CONFIG} />

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
          <ServiceHero {...creationSite.hero} titleCqi={creationSite.heroTitleCqi} />
        </Section>

        <RailSlot cardIndex={0} anchor="hero" config={CREATION_SITE_RAIL_CONFIG} />

        <Section
          name="calculator"
          tone="light"
          labelledBy="service-rate-calculator-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceRateCalculator {...creationSite.rateCalculator} />
        </Section>

        <Section name="timeline" tone="light" labelledBy="service-timeline-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceTimeline {...creationSite.timeline} headingId="service-timeline-title" />
        </Section>

        <Section name="starting" tone="light" labelledBy="service-starting-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceStarting {...creationSite.starting} />
        </Section>

        <Section
          name="plateformes"
          tone="light"
          labelledBy="service-other-activities-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceOtherActivities {...creationSite.otherActivities} />
        </Section>

        <RailSlot cardIndex={1} anchor="plateformes" config={CREATION_SITE_RAIL_CONFIG} />

        {/* tone="light" (pas "accent") : comme la Respiration de la home
            et celle d'Automatisation/SEA/SEO, c'est l'inversion
            scroll-triggered (invertTo="accent") qui fait apparaître le
            rouge, jamais un fond statique. */}
        <Section name="redband" tone="light" labelledBy="service-redband-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceRedBand {...creationSite.redBand} />
        </Section>

        <Section
          name="forfait"
          tone="light"
          labelledBy="service-included-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceOtherActivities {...creationSite.included} headingId="service-included-title" />
        </Section>

        <Section name="crosslink" tone="light" labelledBy="service-crosslink-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceCrossLink {...creationSite.crossLink} />
        </Section>

        <Section name="faq" tone="light" labelledBy="service-faq-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceFaq {...creationSite.faq} />
        </Section>

        <Section name="other-expertises" tone="light" bodyStyle={{ rowGap: 0 }}>
          <ServiceOtherExpertises {...creationSite.otherExpertises} />
        </Section>

        <RailSlot cardIndex={2} anchor="other-expertises" config={CREATION_SITE_RAIL_CONFIG} />

        <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
          <Footer />
        </Section>
      </Shell>
    </>
  );
}
