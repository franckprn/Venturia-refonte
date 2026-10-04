import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailController, RailSlot, type RailConfig } from "@/components/layout/Rail";
import { MobileRailStack } from "@/components/layout/MobileRailStack";
import { IconArrowRight, IconConnect, IconSwap } from "@/components/layout/RailIcons";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import heroStyles from "@/components/service-page/ServiceHero.module.css";
import { ServiceTimeline } from "@/components/service-page/ServiceTimeline";
import { ServiceStarting } from "@/components/service-page/ServiceStarting";
import { ServiceOtherActivities } from "@/components/service-page/ServiceOtherActivities";
import { ServiceRedBand } from "@/components/service-page/ServiceRedBand";
import { ServiceTool } from "@/components/service-page/ServiceTool";
import { ServiceIntegrations } from "@/components/service-page/ServiceIntegrations";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { ServiceOtherExpertises } from "@/components/service-page/ServiceOtherExpertises";
import { Footer } from "@/components/layout/Footer";
import footerStyles from "@/components/layout/footer.module.css";
import { automatisation } from "@/content/services/automatisation";

// Aucun `title.template` n'est posé par le layout racine aujourd'hui
// (src/app/layout.tsx ne déclare qu'un `title` littéral, comme
// /contact) : rien à neutraliser avec `title.absolute`, un `title`
// simple suffit — même convention que /contact/page.tsx.
export const metadata: Metadata = {
  title: automatisation.meta.title,
  description: automatisation.meta.description,
  // Chemin SANS barre finale : Google indexe cette page ainsi, et
  // trailingSlash reste au défaut de Next.js (non configuré, next.config
  // inchangé) — décision de Franck. Tous les liens internes vers cette
  // page (content/*.ts) utilisent désormais la même forme.
  alternates: { canonical: "/services/automations" },
};

// Rail de cette page — 3 cartons, moteur INCHANGÉ (CLAUDE.md, « Pages
// services — gabarit », « RAIL ») :
//   1. timeline         bas de la frise du bloc 2 (ancrage PROVISOIRE —
//                        sera déplacé dans un prochain prompt)
//   2. tool             haut du H2 du bloc 5 (« L'outil »)
//   3. other-expertises bas du bloc 7 (« Autres expertises »)
// Mêmes sections pour l'ancrage desktop (RailSlot `anchor`) ET la
// révélation mobile (`mobileReveal`).
const AUTOMATISATION_RAIL_CONFIG: RailConfig = {
  cards: automatisation.rail,
  icons: [IconConnect, IconSwap, IconArrowRight],
  offsetTargets: [
    {
      varName: "--rail-card1-offset",
      sectionId: "timeline",
      selector: "[data-service-timeline-end]",
      edge: "bottom",
    },
    {
      varName: "--rail-card2-offset",
      sectionId: "tool",
      selector: "#service-tool-title",
      edge: "top",
    },
    {
      varName: "--rail-card3-offset",
      sectionId: "other-expertises",
      selector: "[data-service-other-expertises-end]",
      edge: "bottom",
    },
  ],
  mobileReveal: ["timeline", "tool", "other-expertises"],
};

// Page /services/automations — gabarit des pages services (CLAUDE.md,
// « Pages services — gabarit »). Ordre : 1 Hero, 2 Ce qu'on automatise,
// 3 Par où commencer, 3bis Autres activités, 4 Bande rouge, 5 L'outil,
// 5bis Intégrations, 6 FAQ, 7 Autres expertises. Une seule grille pour
// toute la page (Shell/Section) : le rail se fige puis reste visible
// jusqu'au bas — voir Rail.tsx.
export default function AutomationsPage() {
  return (
    <>
      <MobileRailStack config={AUTOMATISATION_RAIL_CONFIG} />
      <RailController config={AUTOMATISATION_RAIL_CONFIG} />

      <Shell>
        {/* spacing="none" : le Hero gère son propre padding-block (voir
            ServiceHero.module.css) — dès 1024px, hauteur = 100svh moins
            la hauteur de la nav (le premier écran exact), la chaîne
            calée en bas via une grille interne à ligne `1fr`. */}
        <Section
          name="hero"
          tone="light"
          spacing="none"
          labelledBy="service-hero-title"
          className={heroStyles.section}
          bodyClassName={heroStyles.body}
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceHero {...automatisation.hero} />
        </Section>

        <Section name="timeline" tone="light" labelledBy="service-timeline-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceTimeline {...automatisation.timeline} headingId="service-timeline-title" />
        </Section>

        <RailSlot cardIndex={0} anchor="timeline" config={AUTOMATISATION_RAIL_CONFIG} />

        <Section
          name="starting"
          tone="light"
          labelledBy="service-starting-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceStarting {...automatisation.starting} />
        </Section>

        <Section
          name="autres-activites"
          tone="light"
          labelledBy="service-other-activities-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceOtherActivities {...automatisation.otherActivities} />
        </Section>

        {/* tone="light" (pas "accent") : comme la Respiration de la home,
            cette section n'a pas de tonalité "accent" propre — c'est
            l'inversion de toute la page (useRespirationInversion,
            invertTo="accent") qui fait apparaître le rouge pendant la
            lecture, jamais un fond statique. */}
        <Section
          name="redband"
          tone="light"
          labelledBy="service-redband-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceRedBand {...automatisation.redBand} />
        </Section>

        <Section name="tool" tone="light" labelledBy="service-tool-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceTool {...automatisation.tool} />
        </Section>

        <RailSlot cardIndex={1} anchor="tool" config={AUTOMATISATION_RAIL_CONFIG} />

        <Section
          name="integrations"
          tone="light"
          labelledBy="service-integrations-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceIntegrations {...automatisation.integrations} />
        </Section>

        <Section name="faq" tone="light" labelledBy="service-faq-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceFaq {...automatisation.faq} />
        </Section>

        <Section name="other-expertises" tone="light" bodyStyle={{ rowGap: 0 }}>
          <ServiceOtherExpertises {...automatisation.otherExpertises} />
        </Section>

        <RailSlot cardIndex={2} anchor="other-expertises" config={AUTOMATISATION_RAIL_CONFIG} />

        <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
          <Footer />
        </Section>
      </Shell>
    </>
  );
}
