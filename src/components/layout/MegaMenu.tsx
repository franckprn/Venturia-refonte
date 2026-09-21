"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { VENTURIA_EASE } from "@/lib/ease";
import { pauseLenis, resumeLenis } from "@/lib/lenis";
import { nav, type NavCaseStudy, type NavEntry } from "@/content/nav";
import { realisations } from "@/content/realisations";
import { services } from "@/content/services";
import { toVeilTone, type Tone } from "@/lib/tone";
import { LocalTime } from "./LocalTime";
import styles from "./megamenu.module.css";

type MegaMenuProps = {
  id: string;
  open: boolean;
  /** Tonalité qui pilote le voile/contour/texte des DEUX panneaux
   *  (Nav.tsx `navTone`) : sur mobile, celle du bas de l'écran mesurée
   *  UNE FOIS à l'ouverture (voir CLAUDE.md, « Méga-menu — mobile »
   *  § tonalité) ; sur desktop, la tonalité VIVANTE de la section sous
   *  le centre de la barre (celle de la nav elle-même, « Méga-menu —
   *  desktop »). Passée telle quelle à `data-tone` sur chaque panneau
   *  (pilote `--fg`, CLAUDE.md « Tonalités ») ; `toVeilTone(tone)` en
   *  dérive la variante à deux valeurs (accent traité comme dark) pour
   *  la couche de voile des deux panneaux. */
  tone: Tone;
  /** Focus déplacé dans le panneau seulement pour une ouverture clic/
   *  clavier — jamais pour un simple survol souris (ça déplacerait le
   *  focus sans action explicite de l'utilisateur). */
  shouldFocusOnOpen: boolean;
  /** Escape ferme ET rend le focus au déclencheur — géré par Nav.tsx. */
  onEscape: () => void;
  /** Tap sur Contact (mobile) : ferme le panneau, la navigation suit
   *  sans renvoi de focus au déclencheur (contrairement à onEscape). */
  onNavigate: () => void;
  /** Survoler le panneau annule une fermeture programmée par le survol
   *  du déclencheur (même minuteur, voir Nav.tsx). */
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Un seul composant pour les deux structures (CLAUDE.md : la mobile
 * n'est PAS un empilement des colonnes desktop). Les deux marquages
 * existent en JSX, mais un seul est jamais monté à la fois — décidé
 * une fois à l'ouverture via matchMedia — donc jamais deux jeux
 * d'éléments focusables/dupliqués dans le DOM, et le piège de focus
 * n'a jamais besoin de filtrer une moitié cachée.
 *
 * Desktop : ouverture posée en JS (gsap.set) — jamais en CSS, jamais
 * autoAlpha (visibility:hidden sortirait les liens de l'ordre de
 * tabulation) — translateY(-10px)→0 + opacité 0→1, 300ms, easing du
 * site. prefers-reduced-motion : garde la transition sans la
 * translation. Pas d'animation de sortie (non demandée) : le panneau
 * se démonte directement.
 *
 * Mobile : voile teinté + texte, tous deux animés (CLAUDE.md,
 * « Méga-menu — mobile ») — voir `mobilePresent`/l'effet de voile plus
 * bas. Contrairement au desktop, la fermeture EST animée : le panneau
 * reste monté (`mobilePresent`) le temps que le voile redescende, puis
 * se démonte.
 *
 * Pendant l'ouverture (les deux structures) : scroll de page bloqué,
 * Lenis mis en pause (voir lib/lenis.ts — no-op tant que Lenis n'est
 * pas initialisé ailleurs dans l'app), focus piégé (Tab boucle dans le
 * panneau), Escape délégué au parent.
 */
export function MegaMenu({
  id,
  open,
  tone,
  shouldFocusOnOpen,
  onEscape,
  onNavigate,
  onPointerEnter,
  onPointerLeave,
}: MegaMenuProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  // Accordéon Services (mobile uniquement) — un seul, contrairement à
  // l'ancien `expandedIndex` généraliste : Réalisations et À propos ne
  // se déplient plus (CLAUDE.md, « Menu mobile » § 4).
  const [servicesOpen, setServicesOpen] = useState(false);
  // Le panneau MOBILE reste monté au-delà de `open` passé à false, le
  // temps de jouer sa fermeture animée (voile qui redescend) — `open`
  // seul ne peut pas piloter le démontage comme sur desktop (« pas
  // d'animation de sortie ») : ici il y en a une (CLAUDE.md, « Méga-menu
  // — mobile »). Coupé à `false` par l'effet de voile plus bas, dans
  // l'onComplete du tween de fermeture (ou immédiatement en
  // reduced-motion).
  const [mobilePresent, setMobilePresent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Réinitialise l'accordéon mobile à chaque fermeture, et monte le
  // panneau mobile dès qu'il s'ouvre. Ajustée pendant le rendu (motif
  // documenté par React pour dériver un état à partir d'un changement
  // de prop), pas dans un effet : un effet appellerait setState de
  // façon inconditionnelle à chaque montage/fermeture, provoquant un
  // rendu en cascade évitable. La fermeture, elle, NE remet PAS
  // `mobilePresent` à false ici : c'est l'effet de voile plus bas qui
  // le fait, une fois l'animation de fermeture terminée.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setServicesOpen(false);
    } else if (!isDesktop) {
      setMobilePresent(true);
    }
  }

  // Desktop uniquement : entrée posée en JS (gsap.set) — jamais en CSS,
  // jamais autoAlpha (visibility:hidden sortirait les liens de l'ordre
  // de tabulation) — translateY(-10px)→0 + opacité 0→1, 300ms. Pas de
  // sortie animée (non demandée) : le panneau se démonte directement
  // (voir le rendu plus bas). Le mobile a son propre effet, ci-dessous.
  useEffect(() => {
    if (!open || !isDesktop) return;
    const panel = panelRef.current;
    if (!panel) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(panel, { opacity: 0, y: reduced ? 0 : -10 });
    gsap.to(panel, { opacity: 1, y: 0, duration: 0.3, ease: VENTURIA_EASE });
  }, [open, isDesktop]);

  // Mobile : voile teinté + texte du panneau (CLAUDE.md, « Méga-menu —
  // mobile »). Deux couches distinctes au-dessus du flou (non teinté,
  // inchangé, porté par .mobilePanel) :
  //   - le voile (`veilRef`) monte du bas vers le haut en clip-path,
  //     inset(100% 0 0 0) → inset(0 0 0 0), 350ms à l'ouverture, 250ms
  //     (inverse) à la fermeture ;
  //   - le texte (`contentRef`) apparaît en opacité 0 → 1, 200ms,
  //     démarré 150ms après le voile (durée totale 350ms) ; il
  //     disparaît symétriquement à la fermeture.
  // État initial posé en JS (gsap.set), jamais en CSS. overwrite: true
  // sur tous les tweens : une ouverture/fermeture qui interrompt
  // l'animation en cours repart proprement dans l'autre sens, sans
  // saut. Le panneau reste monté (`mobilePresent`) jusqu'à la fin de la
  // fermeture (onComplete), puis se démonte. reduced-motion : voile et
  // texte présents/absents instantanément, sans tween — démontage
  // immédiat à la fermeture.
  useEffect(() => {
    if (isDesktop) return;
    const veil = veilRef.current;
    const content = contentRef.current;
    if (!veil || !content) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      if (reduced) {
        gsap.set(veil, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(content, { opacity: 1 });
        return;
      }
      gsap.set(veil, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(content, { opacity: 0 });
      gsap.to(veil, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.35,
        ease: VENTURIA_EASE,
        overwrite: true,
      });
      gsap.to(content, {
        opacity: 1,
        duration: 0.2,
        delay: 0.15,
        ease: VENTURIA_EASE,
        overwrite: true,
      });
      return;
    }

    // Fermeture : rien à jouer si le panneau n'a jamais été monté.
    if (!mobilePresent) return;

    if (reduced) {
      // Démontage instantané, mais PAS d'appel direct à setState dans
      // le corps de l'effet (cascade de rendus) : durée 0, le
      // démontage passe par le même onComplete que la fermeture
      // animée, juste sans mouvement perceptible.
      gsap.set(content, { opacity: 0 });
      gsap.to(veil, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0,
        onComplete: () => setMobilePresent(false),
      });
      return;
    }
    gsap.to(veil, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 0.25,
      ease: VENTURIA_EASE,
      overwrite: true,
      onComplete: () => setMobilePresent(false),
    });
    gsap.to(content, {
      opacity: 0,
      duration: 0.25,
      ease: VENTURIA_EASE,
      overwrite: true,
    });
    // mobilePresent n'a besoin d'être lu qu'à l'instant où `open` bascule
    // à false (le garde ci-dessus) — pas à chaque fois qu'il change
    // lui-même (l'onComplete ci-dessus le fait passer à false, ce qui
    // ne doit pas relancer ce même tween).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isDesktop]);

  // Focus initial (clic/clavier seulement), scroll bloqué, Lenis en
  // pause, tant que le panneau est ouvert.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    if (shouldFocusOnOpen) {
      const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseLenis();

    return () => {
      document.body.style.overflow = previousOverflow;
      resumeLenis();
    };
    // shouldFocusOnOpen n'a besoin d'être lu qu'à l'instant de
    // l'ouverture, jamais à chaque changement de sa valeur seule.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape + piège de focus (Tab boucle dans le panneau).
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, onEscape]);

  // Desktop : rien à monter hors ouverture (pas de sortie animée). Mobile :
  // reste monté tant que `mobilePresent` (fermeture en cours, voir
  // l'effet de voile plus haut) — voir le commentaire de tête de fichier.
  if (isDesktop) {
    if (!open) return null;
  } else if (!open && !mobilePresent) {
    return null;
  }

  return isDesktop ? (
    <div className={styles.desktopPanelWrap}>
      <div className={styles.desktopPanelInner}>
        <div
          id={id}
          ref={panelRef}
          data-megamenu
          data-tone={tone}
          className={styles.desktopPanel}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          {/* Voile teinté (CLAUDE.md, « Méga-menu — desktop ») : même
              mécanisme et même classe partagée que le panneau mobile
              (.veil ci-dessous) — ENTRE le flou (porté par
              .desktopPanel, non teinté) et le contenu (.columns,
              au-dessus par z-index). accent traité comme dark
              (`toVeilTone`), comme le panneau mobile. */}
          <div className={styles.veil} data-tone={toVeilTone(tone)} aria-hidden="true" />
          <div className={styles.columns}>
            <div className={styles.column}>
              <p className={styles.columnTitle}>{nav.servicesColumn.title}</p>
              <ul className={`${styles.entryList} ${styles.entryListServices}`}>
                {nav.servicesColumn.entries.map((entry) => (
                  <li key={entry.label}>
                    <NavEntryItem entry={entry} className={styles.entryServices} />
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.column}>
              <p className={styles.columnTitle}>{nav.secteursColumn.title}</p>
              <ul className={`${styles.entryList} ${styles.entryListSecteurs}`}>
                {nav.secteursColumn.entries.map((entry) => (
                  <li key={entry.label}>
                    <NavEntryItem entry={entry} className={styles.entrySecteurs} />
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.column}>
              <p className={styles.columnTitle}>{nav.caseStudyTitle}</p>
              <div className={styles.caseCardSlot}>
                <CaseStudyCard
                  caseStudy={nav.caseStudy}
                  image={realisations.image}
                  imageAlt={realisations.imageAlt}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      id={id}
      ref={panelRef}
      data-megamenu
      data-tone={tone}
      aria-hidden={!open}
      className={styles.mobilePanel}
    >
      {/* Voile teinté (CLAUDE.md, « Méga-menu — mobile ») : couche
          dédiée, ENTRE le flou (porté par .mobilePanel, non teinté,
          inchangé) et le texte (.mobileContent ci-dessous). Anime son
          propre clip-path à l'ouverture/fermeture (voir l'effet plus
          haut) — le flou, lui, ne bouge pas. Classe .veil PARTAGÉE avec
          le panneau desktop (même mécanisme, CLAUDE.md « Méga-menu —
          desktop ») : sur mobile `tone` est déjà passé par toVeilTone
          (Nav.tsx, mesuré une fois à l'ouverture) — data-tone répété ici
          (même valeur que .mobilePanel) : cette couche est un ENFANT,
          pas l'élément qui porte data-tone — les couleurs (--fg/--tone-bg)
          s'hériteraient, mais un attribut CSS ne cascade pas, il faut
          le poser sur l'élément lui-même pour que [data-tone=...] le
          sélectionne. */}
      <div ref={veilRef} className={styles.veil} data-tone={tone} aria-hidden="true" />

      {/* Texte du panneau : opacité animée séparément du voile (voir
          l'effet plus haut) — regroupe la zone défilante ET la ligne du
          bas dans un seul flex column, pour que .mobileScroll/
          .mobileBottom se comportent exactement comme avant (avant
          cette refonte, c'était .mobilePanel lui-même qui portait ce
          flex column). */}
      <div ref={contentRef} className={styles.mobileContent}>
      {/* Zone défilante : seule elle scrolle si l'accordéon ouvert
          déborde — .mobileBottom (ligne heure/ville + trait) reste à sa
          position fixe en bas, CLAUDE.md « Menu mobile » § 5. */}
      <div className={styles.mobileScroll}>
        <ul className={styles.mobileList}>
          {/* Services — seule entrée qui se déplie (accordéon), ses 4
              services lus depuis content/services.ts : aucun texte
              dupliqué avec la section Services de la page d'accueil. */}
          <li>
            <button
              type="button"
              className={`${styles.mobileItem} ${styles.mobileTrigger}`}
              aria-expanded={servicesOpen}
              aria-controls={`${id}-services`}
              onClick={() => setServicesOpen((v) => !v)}
            >
              {nav.trigger}
              <MobileChevron className={styles.mobileChevron} />
            </button>
            <div className={styles.mobileSubWrap} data-open={servicesOpen}>
              <ul id={`${id}-services`} className={styles.mobileSubList}>
                {services.map((service) => (
                  <li key={service.name}>
                    {/* <span>, jamais un lien : /services/* n'existe pas
                        encore (CLAUDE.md, « Menu mobile » § 4). */}
                    <span className={styles.mobileSubEntry}>{service.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Réalisations / À propos : <span>, ni dépliable ni
              cliquable — leurs pages n'existent pas encore. Le libellé
              « Réalisations » est repris de `nav.topLinks` (même mot,
              même fichier) plutôt que retapé une seconde fois ici. */}
          <li>
            <span className={`${styles.mobileItem} ${styles.mobileItemStatic}`}>
              {nav.topLinks[0].label}
            </span>
          </li>
          <li>
            <span className={`${styles.mobileItem} ${styles.mobileItemStatic}`}>
              {nav.mobile.aboutLabel}
            </span>
          </li>

          {/* Contact : seule entrée cliquable, /contact existe déjà. Le
              tap ferme le panneau puis laisse la navigation du <Link>
              suivre son cours (onNavigate ne bloque rien). */}
          <li>
            <Link href={nav.topLinks[1].href} className={styles.mobileItem} onClick={onNavigate}>
              {nav.topLinks[1].label}
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.mobileBottom}>
        <div className={styles.mobileBottomRow}>
          <LocalTime className={styles.mobileTime} />
          <span className={styles.mobileCity}>{nav.mobile.city}</span>
        </div>
        {/* Même filet que nav.module.css .rule, retourné (branches vers
            le haut) — voir megamenu.module.css .mobileBottomRule. */}
        <div className={styles.mobileBottomRule} aria-hidden="true" />
      </div>
      </div>
    </div>
  );
}

/**
 * Chevron de l'accordéon Services — SVG dessiné à la main, jamais une
 * icône de librairie (CLAUDE.md, « Menu mobile » § 4). Pointe vers le
 * bas fermé, pivote de 180° ouvert : la rotation est purement CSS,
 * pilotée par `[aria-expanded]` sur le bouton parent (voir
 * megamenu.module.css `.mobileTrigger[aria-expanded="true"]`) — aucun
 * état à gérer ici. Décoratif : l'état est déjà porté par aria-expanded.
 */
function MobileChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9L12 15L18 9" />
    </svg>
  );
}

function NavEntryItem({ entry, className }: { entry: NavEntry; className: string }) {
  if (entry.isLink) {
    return (
      <Link href={entry.href} className={`${className} ${styles.entryLink}`}>
        {entry.label}
      </Link>
    );
  }
  return <span className={className}>{entry.label}</span>;
}

// image/imageAlt viennent de content/realisations.ts (même cas client
// que « Dernier accompagnement », voir nav.ts) : un seul champ `image`
// à faire évoluer si la photo change, jamais deux chemins à
// synchroniser à la main. Pas de fs.existsSync ici (comme dans
// Services/DernierAccompagnement) : ce composant est "use client" pour
// la mécanique du menu (survol, piège de focus), le système de
// fichiers n'y est pas accessible — contrôle simple sur la présence du
// champ `image`.
function CaseStudyCard({
  caseStudy,
  image,
  imageAlt,
}: {
  caseStudy: NavCaseStudy;
  image?: string;
  imageAlt: string;
}) {
  const hasImage = Boolean(image);

  const inner = (
    <>
      {hasImage ? (
        <Image
          src={image as string}
          alt={imageAlt}
          fill
          sizes="269px"
          className={styles.caseImage}
        />
      ) : (
        // Photo pas encore fournie : aplat --ink, jamais de photo de
        // stock. Fichier attendu : public{image}
        <div className={styles.caseImageFallback} aria-hidden="true" />
      )}
      <div className={styles.caseGradient} aria-hidden="true" />
      <div className={styles.caseTop}>
        <p className={styles.caseClient}>{caseStudy.clientName}</p>
        <p className={styles.caseSubtitle}>{caseStudy.subtitle}</p>
      </div>
      <div className={styles.caseTags}>
        {caseStudy.tags.map((tag) => (
          <span key={tag} className={styles.caseTag}>
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  return caseStudy.isLink ? (
    <Link href={caseStudy.href} className={styles.caseCard}>
      {inner}
    </Link>
  ) : (
    <span className={styles.caseCard}>{inner}</span>
  );
}
