import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailController, RailSlot } from "@/components/layout/Rail";
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
// Chaque <RailSlot> ancre son `grid-row` à la section qui porte sa
// CIBLE d'alignement (CLAUDE.md, « Rail droit »), pas forcément la
// section la plus proche dans le DOM ci-dessous : carton 1 → « dernier-
// accompagnement » (haut du titre Inoko), cartons 2 ET 3 → « services »
// (haut du 1ᵉʳ service pour le 2, bas du dernier pour le 3 — la cible du
// 3 vit dans Services, pas dans Processus, malgré son <RailSlot> rendu
// après elle ci-dessous : `anchor` fixe le `grid-row` en style inline,
// indépendamment de la position DOM). Le carton 1 s'ancre à Dernier
// accompagnement, pas au Hero : aucun carton visible pendant le Hero
// est une pure conséquence de la grille (sa ligne ne démarre qu'à
// « dernier-accompagnement-start »), pas d'une opacité pilotée en JS —
// voir Rail.tsx et CLAUDE.md, « Rail droit ». Respiration et le footer
// n'ont pas de carton. Les deux
// restent dans la zone de contenu comme les autres sections (pas sous
// le rail) ; seul le fond du footer (--ink) déborde jusqu'aux bords de
// l'écran (voir footer.module.css). Respiration n'a plus AUCUN fond
// propre, même pas un fond plein écran local : `tone="light"` (comme
// les autres sections « claires »: l'inversion crème ↔ charbon pendant
// qu'on la lit n'est plus une propriété de la section, mais un effet de
// TOUTE LA PAGE, piloté par RespirationReveal.tsx — bascule
// `data-inverted` sur <html>, voir globals.css et CLAUDE.md,
// « Respiration ») et `spacing="default"` (plus d'exception 100svh/
// padding en dur, comme n'importe quelle autre section).
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
      <RailController />

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

        <Section
          name="dernier-accompagnement"
          tone="light"
          labelledBy="dernier-accompagnement-title"
          bodyStyle={{ rowGap: 0 }}
        >
          <DernierAccompagnement />
        </Section>

        <RailSlot cardIndex={0} anchor="dernier-accompagnement" />

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

        <RailSlot cardIndex={1} anchor="services" />

        <Section name="processus" tone="light" labelledBy="processus-title" bodyStyle={{ rowGap: 0 }}>
          <Processus />
        </Section>

        <RailSlot cardIndex={2} anchor="services" />

        <Section name="footer" tone="dark" className={footerStyles.section} bodyStyle={{ rowGap: 0 }}>
          <Footer />
        </Section>
      </Shell>
    </>
  );
}
