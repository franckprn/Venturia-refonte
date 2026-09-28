import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailController, RailSlot, type RailConfig } from "@/components/layout/Rail";
import { MobileRailStack } from "@/components/layout/MobileRailStack";
import { IconArrowRight, IconConnect, IconFlow } from "@/components/layout/RailIcons";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { ServiceQuadCards } from "@/components/service-page/ServiceQuadCards";
import { ServiceProcess } from "@/components/service-page/ServiceProcess";
import { ServiceToolCompare } from "@/components/service-page/ServiceToolCompare";
import { ServiceRollout } from "@/components/service-page/ServiceRollout";
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

// Rail de cette page — cartons/icônes propres à l'Automatisation, cibles
// de repos mesurées comme sur la home (CLAUDE.md, « Rail droit ») :
//   1. quad       haut du H2 du bloc 2 (« Ce qui tourne seul… »)
//   2. process    haut du paragraphe du bloc 3 (data-service-process-paragraph)
//   3. rollout    bas du bloc 5 (data-service-rollout-end, edge "bottom")
// Mêmes sections pour l'ancrage desktop (RailSlot `anchor`) ET la
// révélation mobile (`mobileReveal`) : pas de raison ici de décaler la
// pile mobile d'une section de plus, contrairement au 3ᵉ carton de la
// home (choix spécifique à son ancien design, pas une règle générale).
const AUTOMATISATION_RAIL_CONFIG: RailConfig = {
  cards: automatisation.rail,
  icons: [IconConnect, IconFlow, IconArrowRight],
  offsetTargets: [
    {
      varName: "--rail-card1-offset",
      sectionId: "quad",
      selector: "#service-quad-title",
      edge: "top",
    },
    {
      varName: "--rail-card2-offset",
      sectionId: "process",
      selector: "[data-service-process-paragraph]",
      edge: "top",
    },
    {
      varName: "--rail-card3-offset",
      sectionId: "rollout",
      selector: "[data-service-rollout-end]",
      edge: "bottom",
    },
  ],
  mobileReveal: ["quad", "process", "rollout"],
};

// Page /services/automations — gabarit des pages services (CLAUDE.md,
// « Pages services — gabarit ») : même construction Shell/Section que la
// home (une seule grille pour que le rail se fige puis reste visible
// jusqu'au bas de page), rail desktop (3 <RailSlot>) + pile mobile
// (<MobileRailStack>) configurés pour CETTE page via `config` (voir
// components/layout/Rail.tsx — la home, elle, ne passe aucun `config` et
// garde donc son comportement d'avant cette extraction, inchangé).
export default function AutomationsPage() {
  return (
    <>
      <MobileRailStack config={AUTOMATISATION_RAIL_CONFIG} />
      <RailController config={AUTOMATISATION_RAIL_CONFIG} />

      <Shell>
        <Section
          name="hero"
          tone="light"
          labelledBy="service-hero-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceHero {...automatisation.hero} />
        </Section>

        <Section name="quad" tone="light" labelledBy="service-quad-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceQuadCards {...automatisation.quadBlock} headingId="service-quad-title" />
        </Section>

        <RailSlot cardIndex={0} anchor="quad" config={AUTOMATISATION_RAIL_CONFIG} />

        <Section
          name="process"
          tone="light"
          labelledBy="service-process-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceProcess {...automatisation.process} />
        </Section>

        <RailSlot cardIndex={1} anchor="process" config={AUTOMATISATION_RAIL_CONFIG} />

        <Section name="tool" tone="light" labelledBy="service-tool-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceToolCompare {...automatisation.tool} />
        </Section>

        <Section
          name="rollout"
          tone="light"
          labelledBy="service-rollout-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <ServiceRollout {...automatisation.rollout} />
        </Section>

        <RailSlot cardIndex={2} anchor="rollout" config={AUTOMATISATION_RAIL_CONFIG} />

        <Section name="faq" tone="light" labelledBy="service-faq-title" bodyStyle={{ rowGap: 0 }}>
          <ServiceFaq {...automatisation.faq} />
        </Section>

        <Section name="other-expertises" tone="light" bodyStyle={{ rowGap: 0 }}>
          <ServiceOtherExpertises {...automatisation.otherExpertises} />
        </Section>

        <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
          <Footer />
        </Section>
      </Shell>
    </>
  );
}
