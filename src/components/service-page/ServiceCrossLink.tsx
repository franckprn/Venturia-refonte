import { ArrowLink } from "@/components/ArrowLink";
import { ServiceSplitIntro } from "./ServiceSplitIntro";
import type { ServiceCrossLinkBlock } from "@/content/services/types";
import styles from "./ServiceCrossLink.module.css";

/**
 * Bloc « Google Ads + Référencement » de la page Publicité — mise en
 * page B (ServiceSplitIntro : label + h2 colonnes 1-6, texte colonnes
 * 7-12), un paragraphe simple suivi d'un lien vers une autre page
 * service. Trop différent de ServiceTool (pas d'intertitres en gras,
 * un seul paragraphe) et de ServiceRedBand (pas d'inversion de toute la
 * page) pour les réutiliser : composant dédié, minimal — même esprit
 * que ServiceStarting (texte + un élément après), sans la série en
 * tiers.
 */
export function ServiceCrossLink({ label, title, text, cta }: ServiceCrossLinkBlock) {
  return (
    <ServiceSplitIntro label={label} title={title} headingId="service-crosslink-title">
      <p className={styles.text}>{text}</p>
      <ArrowLink href={cta.href} label={cta.label} direction="right" className={styles.cta} />
    </ServiceSplitIntro>
  );
}
