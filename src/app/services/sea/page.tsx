import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailController, RailSlot, type RailConfig } from "@/components/layout/Rail";
import { MobileRailStack } from "@/components/layout/MobileRailStack";
import { IconArrowRight, IconTag, IconSearch } from "@/components/layout/RailIcons";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import heroStyles from "@/components/service-page/ServiceHero.module.css";
import { ServiceInokoCase } from "@/components/service-page/ServiceInokoCase";
import { ServiceTimeline } from "@/components/service-page/ServiceTimeline";
import { ServiceStarting } from "@/components/service-page/ServiceStarting";
import { ServiceOtherActivities } from "@/components/service-page/ServiceOtherActivities";
import { ServiceRedBand } from "@/components/service-page/ServiceRedBand";
import { ServiceRoasCalculator } from "@/components/service-page/ServiceRoasCalculator";
import { ServiceCrossLink } from "@/components/service-page/ServiceCrossLink";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { ServiceOtherExpertises } from "@/components/service-page/ServiceOtherExpertises";
import { Footer } from "@/components/layout/Footer";
import footerStyles from "@/components/layout/footer.module.css";
import { publicite } from "@/content/services/sea";

export const metadata: Metadata = {
  title: { absolute: publicite.meta.title },
  description: publicite.meta.description,
  // Chemin SANS barre finale, aligné sur le canonical — même convention
  // que /services/automations (CLAUDE.md, « Pages services — gabarit »).
  // /services/sea : l'ancienne adresse de cette page, déjà indexée par
  // Google, conservée telle quelle — demande explicite de Franck.
  alternates: { canonical: "/services/sea" },
};

// Rail de cette page — 3 cartons, moteur INCHANGÉ (CLAUDE.md, « Pages
// services — gabarit », « RAIL ») :
//   1. hero       haut du H1 (#service-hero-title) — carton cliquable
//                 (href "#campagnes"), même mécanisme que le carton 3
//   2. starting   haut du H2 du bloc 4 (« Par où commencer »)
//   3. other-expertises  bas du bloc 11 (« Autres expertises »)
const PUBLICITE_RAIL_CONFIG: RailConfig = {
  cards: publicite.rail,
  icons: [IconTag, IconSearch, IconArrowRight],
  offsetTargets: [
    {
      varName: "--rail-card1-offset",
      sectionId: "hero",
      selector: "#service-hero-title",
      edge: "top",
    },
    {
      varName: "--rail-card2-offset",
      sectionId: "starting",
      selector: "#service-starting-title",
      edge: "top",
    },
    {
      varName: "--rail-card3-offset",
      sectionId: "other-expertises",
      selector: "[data-service-other-expertises-end]",
      edge: "bottom",
    },
  ],
  mobileReveal: ["hero", "starting", "other-expertises"],
};

// Page /services/sea (Google Ads/SEA, son adresse déjà indexée par
// Google, conservée) — gabarit des pages services (CLAUDE.md, « Pages
// services — gabarit »). Ordre : 1 Hero, 2 Cas Inoko,
// 3 Frise, 4 Par où commencer, 5 Les campagnes, 6 Respiration rouge,
// 7 Calculateur ROAS, 8 Google Ads + Référencement, 9 Ce qui vous
// appartient, 10 FAQ, 11 Autres expertises.
export default function SeaPage() {
  return (
    <>
      <MobileRailStack config={PUBLICITE_RAIL_CONFIG} />
      <RailController config={PUBLICITE_RAIL_CONFIG} />

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
          <ServiceHero {...publicite.hero} titleCqi={publicite.heroTitleCqi} />
        </Section>

        <RailSlot cardIndex={0} anchor="hero" config={PUBLICITE_RAIL_CONFIG} />

        <Section name="inoko-case" tone="light" labelledBy="service-inoko-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceInokoCase {...publicite.inokoCase} />
        </Section>

        <Section name="timeline" tone="light" labelledBy="service-timeline-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceTimeline {...publicite.timeline} headingId="service-timeline-title" />
        </Section>

        <Section name="starting" tone="light" labelledBy="service-starting-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceStarting {...publicite.starting} />
        </Section>

        <RailSlot cardIndex={1} anchor="starting" config={PUBLICITE_RAIL_CONFIG} />

        <Section name="campagnes" tone="light" labelledBy="service-campaigns-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceOtherActivities {...publicite.otherActivities} headingId="service-campaigns-title" />
        </Section>

        {/* tone="light" (pas "accent") : comme la Respiration de la home
            et celle d'Automatisation, c'est l'inversion scroll-triggered
            (invertTo="accent") qui fait apparaître le rouge, jamais un
            fond statique. */}
        <Section name="redband" tone="light" labelledBy="service-redband-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceRedBand {...publicite.redBand} />
        </Section>

        <Section
          name="calculator"
          tone="light"
          labelledBy="service-roas-calculator-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceRoasCalculator {...publicite.roasCalculator} />
        </Section>

        <Section name="crosslink" tone="light" labelledBy="service-crosslink-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceCrossLink {...publicite.crossLink} />
        </Section>

        <Section
          name="appartient"
          tone="light"
          labelledBy="service-appartient-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceOtherActivities {...publicite.appartient} headingId="service-appartient-title" />
        </Section>

        <Section name="faq" tone="light" labelledBy="service-faq-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceFaq {...publicite.faq} />
        </Section>

        <Section name="other-expertises" tone="light" bodyStyle={{ rowGap: 0 }}>
          <ServiceOtherExpertises {...publicite.otherExpertises} />
        </Section>

        <RailSlot cardIndex={2} anchor="other-expertises" config={PUBLICITE_RAIL_CONFIG} />

        <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
          <Footer />
        </Section>
      </Shell>
    </>
  );
}
