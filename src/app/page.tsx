import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { HOME_DESKTOP_RAIL_CONFIG, RailController, RailSlot } from "@/components/layout/Rail";
import { MobileRailStack } from "@/components/layout/MobileRailStack";
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
// Rail DESKTOP : HOME_DESKTOP_RAIL_CONFIG (Rail.tsx) — carton contact
// (action, « Réserver 20 minutes ») ancré au Hero et figé en tête du
// rail jusqu'au bas de la page (`pinFirst`), puis « Combien de temps »
// (dernier-accompagnement, haut du titre Inoko) et « Le GEO » (services,
// trait du 1ᵉʳ service). CLAUDE.md, « Rail droit » § « Rail DESKTOP de
// la home ». La pile MOBILE garde HOME_RAIL_CONFIG (défaut de
// <MobileRailStack>), inchangée.
//
// Respiration et Services : `tone="light"`, aucun fond propre — affichées
// crème sur charbon par l'inversion de toute la page (RespirationReveal,
// `data-inverted` sur <html>), du haut du texte de la Respiration à 80 %
// de la fenêtre jusqu'au bas de Services à 80 % (CLAUDE.md, « Tonalités »
// et « Respiration (home) »). Ne jamais les passer en "dark".
// Sections suivantes (avis, ressources) et méga-menu : sessions
// ultérieures.
//
// <MobileRailStack> : rendu une seule fois, hors du Shell (fragment,
// pas un enfant de plus) — pas un <RailSlot> par carton comme sur
// desktop, mais un unique composant qui lit lui-même content/rail.ts et
// se raccroche à ces trois mêmes sections par leur id (CLAUDE.md,
// « Rail droit » § « Pile mobile »). N'affiche rien au-dessus de
// 1024px (voir mobileRailStack.module.css). Placé AVANT <Shell>, pas
// après : la pile est visible dès le chargement (position: fixed, hors
// du flux — son ordre dans le DOM ne change rien à son rendu), mais
// l'ordre du DOM, lui, fixe l'ordre de tabulation. Après <Shell>, un
// clavier devrait parcourir TOUTE la page (hero, services, footer…)
// avant d'atteindre un élément fixe pourtant visible depuis le début —
// avant, il arrive juste après la nav, comme un élément de chrome
// permanent.
//
// <RailController /> : de même, rendu une seule fois (pas un par
// carton comme <RailSlot>) — décide le mode du rail DESKTOP,
// « empilement » ou « relais » selon que les 3 cartons figés tiennent
// dans la hauteur de la fenêtre (CLAUDE.md, « Rail droit » § « Mode
// relais »). Ne rend rien (composant headless, `return null`) : sa
// position dans le DOM n'a donc aucune incidence, ni visuelle ni sur le
// clavier.
export default function Home() {
  return (
    <>
      <MobileRailStack anchors={["hero", "services", "processus"]} />
      <RailController config={HOME_DESKTOP_RAIL_CONFIG} />

      <Shell>
        <Section
          name="hero"
          tone="light"
          spacing="none"
          labelledBy="hero-title"
          className={heroStyles.section}
          bodyClassName={heroStyles.body}
          bodyStyle={{ rowGap: 0 }}
        >
          <Hero />
        </Section>

        <RailSlot cardIndex={0} anchor="hero" config={HOME_DESKTOP_RAIL_CONFIG} />

        <Section
          name="dernier-accompagnement"
          tone="light"
          labelledBy="dernier-accompagnement-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <DernierAccompagnement />
        </Section>

        <RailSlot cardIndex={1} anchor="dernier-accompagnement" config={HOME_DESKTOP_RAIL_CONFIG} />

        <Section
          name="respiration"
          tone="light"
          className={respirationStyles.section}
          bodyStyle={{ rowGap: 0 }}
        >
          <Respiration />
        </Section>

        <Section name="services" tone="light" labelledBy="services-title" bodyStyle={{ rowGap: 0 }}>
          <Services />
        </Section>

        <RailSlot cardIndex={2} anchor="services" config={HOME_DESKTOP_RAIL_CONFIG} />

        <Section name="processus" tone="light" labelledBy="processus-title" bodyStyle={{ rowGap: 0 }}>
          <Processus />
        </Section>

        <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
          <Footer />
        </Section>
      </Shell>
    </>
  );
}
