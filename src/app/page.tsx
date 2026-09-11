import { Shell } from "@/components/Shell";
import { Section } from "@/components/Section";
import { RailCard } from "@/components/Rail";
import { Hero } from "@/components/Hero";
import { Realisations } from "@/components/Realisations";
import { Respiration } from "@/components/Respiration";

// Session 4 — nav + hero (inchangés) + carte Réalisations (Inoko) +
// Respiration, toutes dans le même Shell : une seule grille de page,
// pour que les cartons du rail se figent puis restent figés, empilés,
// jusqu'au bas — Respiration y compte (pleine largeur, sans carton) sans
// quoi sa hauteur ne serait pas vue par la zone de figement des cartons
// qui la précèdent. Sections suivantes (avis, services, processus,
// ressources, CTA géant, footer) et méga-menu : sessions ultérieures.
export default function Home() {
  return (
    <Shell>
      <Section
        name="hero"
        labelledBy="hero-title"
        rail={
          <RailCard title="Réponse sous 24 h" action>
            Par moi, pas par un chatbot.
          </RailCard>
        }
      >
        <Hero />
      </Section>

      <Section
        name="realisations"
        labelledBy="realisations-title"
        rail={
          <RailCard title="Ce qu'on regarde en premier">
            Vos requêtes, vos fiches produits, votre ROAS.
          </RailCard>
        }
      >
        <Realisations />
      </Section>

      <Respiration name="respiration" />
    </Shell>
  );
}
