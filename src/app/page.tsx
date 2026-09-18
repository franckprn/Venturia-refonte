import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailSlot } from "@/components/layout/Rail";
import { Hero } from "@/components/sections/Hero";
import heroStyles from "@/components/sections/hero.module.css";
import { DernierAccompagnement } from "@/components/sections/DernierAccompagnement";
import { Respiration } from "@/components/sections/Respiration";
import respirationStyles from "@/components/sections/respiration.module.css";
import { Services } from "@/components/sections/Services";
import { Processus } from "@/components/sections/Processus";
import { Footer } from "@/components/layout/Footer";
import footerStyles from "@/components/layout/footer.module.css";

// Nav + hero + Dernier accompagnement (cas client Inoko) + Respiration
// + Services + Processus + le bloc de fin de page (CTA + footer), et
// les trois <RailSlot> du rail, toutes dans le même Shell : une seule
// grille de page, pour que les cartons du rail se figent puis restent
// visibles, empilés, jusqu'au bas — chaque section, même sans carton,
// compte dans la hauteur de la grille (donc dans la zone de figement
// des cartons qui la précèdent). Le footer DOIT rester un enfant du
// Shell pour cette raison précise : s'il vivait hors du Shell (ex.
// dans layout.tsx, à côté de Nav), la zone de figement des cartons
// s'arrêterait à la fin de Processus au lieu du vrai bas de page.
//
// Chaque <RailSlot> est placé juste après sa section déclencheuse
// (CLAUDE.md, « Rail droit ») :
//   1. hero            2. services            3. processus (« juste
//   avant le bloc de fin de page » — Processus la précède directement)
// Ni Dernier accompagnement, ni Respiration, ni le footer n'ont de
// carton. Respiration et le footer restent dans la zone de contenu
// comme les autres sections (pas sous le rail) ; seul leur fond
// (--ink) déborde jusqu'aux bords de l'écran (voir
// respiration.module.css et footer.module.css).
// Sections suivantes (avis, ressources) et méga-menu : sessions
// ultérieures.
export default function Home() {
  return (
    <Shell>
      <Section
        name="hero"
        labelledBy="hero-title"
        className={heroStyles.section}
        bodyStyle={{ rowGap: 0 }}
      >
        <Hero />
      </Section>

      <RailSlot cardIndex={0} anchor="hero" />

      <Section
        name="dernier-accompagnement"
        labelledBy="dernier-accompagnement-title"
        bodyStyle={{ rowGap: 0 }}
      >
        <DernierAccompagnement />
      </Section>

      <Section
        name="respiration"
        className={respirationStyles.section}
        bodyStyle={{ rowGap: 0 }}
      >
        <Respiration />
      </Section>

      <Section name="services" labelledBy="services-title" bodyStyle={{ rowGap: 0 }}>
        <Services />
      </Section>

      <RailSlot cardIndex={1} anchor="services" />

      <Section name="processus" labelledBy="processus-title" bodyStyle={{ rowGap: 0 }}>
        <Processus />
      </Section>

      <RailSlot cardIndex={2} anchor="processus" />

      <Section name="footer" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
        <Footer />
      </Section>
    </Shell>
  );
}
