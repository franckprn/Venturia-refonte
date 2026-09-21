"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { VENTURIA_EASE } from "@/lib/ease";
import { pauseLenis, resumeLenis } from "@/lib/lenis";
import { nav, type NavCaseStudy, type NavEntry } from "@/content/nav";
import { services } from "@/content/services";
import type { Tone } from "@/lib/tone";
import { LocalTime } from "./LocalTime";
import styles from "./megamenu.module.css";

type MegaMenuProps = {
  id: string;
  open: boolean;
  /** Tonalité unique du panneau MOBILE (entrées, ligne du bas, trait du
   *  bas — voir CLAUDE.md, « Menu mobile » § 3), mesurée par Nav.tsx à
   *  l'ouverture. Ignorée par le panneau desktop, toujours --ground. */
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
 * Ouverture, posée en JS (gsap.set) — jamais en CSS, jamais autoAlpha
 * (visibility:hidden sortirait les liens de l'ordre de tabulation) :
 * desktop translateY(-10px)→0 + opacité 0→1, 300ms, easing du site ;
 * mobile opacité SEULE 0→1, même durée (CLAUDE.md, « Menu mobile »
 * § 2). prefers-reduced-motion : desktop garde sa transition sans la
 * translation, mobile saute directement à l'état final (aucun tween).
 * Pas d'animation de sortie (non demandée) : le panneau se démonte.
 *
 * Pendant l'ouverture : scroll de page bloqué, Lenis mis en pause
 * (voir lib/lenis.ts — no-op tant que Lenis n'est pas initialisé
 * ailleurs dans l'app), focus piégé (Tab boucle dans le panneau),
 * Escape délégué au parent.
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
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Réinitialise l'accordéon mobile à chaque fermeture, pour une
  // réouverture toujours dans le même état. Ajustée pendant le rendu
  // (motif documenté par React pour dériver un état à partir d'un
  // changement de prop), pas dans un effet : un effet appellerait
  // setState de façon inconditionnelle à chaque montage/fermeture,
  // provoquant un rendu en cascade évitable.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setServicesOpen(false);
  }

  // Entrée, posée en JS uniquement (jamais d'état initial en CSS, jamais
  // autoAlpha) : desktop translateY(-10px)→0 + opacité (inchangé) ;
  // mobile opacité SEULE, 0→1 — CLAUDE.md, « Menu mobile » § 2, distinct
  // du glissement desktop. reduced-motion : mobile saute directement à
  // l'état final (aucun tween), ouverture instantanée ; desktop garde sa
  // transition existante, seule la translation y est neutralisée.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isDesktop) {
      gsap.set(panel, { opacity: 0, y: reduced ? 0 : -10 });
      gsap.to(panel, { opacity: 1, y: 0, duration: 0.3, ease: VENTURIA_EASE });
      return;
    }

    if (reduced) {
      gsap.set(panel, { opacity: 1 });
      return;
    }
    gsap.set(panel, { opacity: 0 });
    gsap.to(panel, { opacity: 1, duration: 0.3, ease: VENTURIA_EASE });
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

  if (!open) return null;

  return isDesktop ? (
    <div className={styles.desktopPanelWrap}>
      <div className={styles.desktopPanelInner}>
        <div
          id={id}
          ref={panelRef}
          data-megamenu
          className={styles.desktopPanel}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
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
                <CaseStudyCard caseStudy={nav.caseStudy} />
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
      className={styles.mobilePanel}
    >
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

// Pas de fs.existsSync ici (comme dans Services/DernierAccompagnement) :
// ce composant est "use client" pour la mécanique du menu (survol,
// piège de focus), le système de fichiers n'y est pas accessible.
// Contrôle simple sur la présence du champ `image` dans le contenu —
// Franck devra renseigner ce champ ET déposer le fichier ensemble,
// plutôt que le second déclenchant seul l'apparition de l'image.
function CaseStudyCard({ caseStudy }: { caseStudy: NavCaseStudy }) {
  const hasImage = Boolean(caseStudy.image);

  const inner = (
    <>
      {hasImage ? (
        <Image
          src={caseStudy.image as string}
          alt={caseStudy.imageAlt}
          fill
          sizes="269px"
          className={styles.caseImage}
        />
      ) : (
        // Photo pas encore fournie : aplat --ink, jamais de photo de
        // stock. Fichier attendu : public{caseStudy.image}
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
