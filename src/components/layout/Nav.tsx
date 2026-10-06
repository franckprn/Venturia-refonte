"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { nav } from "@/content/nav";
import { DEFAULT_TONE, getBottomTone, toVeilTone, useSectionTone, type Tone } from "@/lib/tone";
import { MegaMenu } from "./MegaMenu";
import { Logo } from "./Logo";
import styles from "./nav.module.css";

const HOVER_OPEN_DELAY = 120;
const HOVER_CLOSE_DELAY = 200;

/**
 * Barre de nav fixe, 64px, TOUJOURS visible : aucune logique de
 * scroll ici (ni seuil, ni sens, ni transparence) — la barre et le
 * filet sous elle forment un seul bloc fixe et permanent, fond
 * translucide et flouté en continu, porté par un élément unique (voir
 * nav.module.css `.navBlur`).
 *
 * Aucun nom de marque dans la barre (le titre géant du bloc de fin de
 * page porte le nom du site) : seul le logo (`<Logo>`, SVG inline,
 * fill="currentColor") ouvre la barre, à la marge gauche du conteneur,
 * suivi des entrées — voir `.leftCluster` / `.logoLink` dans
 * nav.module.css pour le cluster et la surface cliquable 44×44.
 * Le filet sous la barre n'est pas une border sur la barre elle-même
 * mais un élément dédié (`.rule` / `data-nav-rule`), qui ne couvre que
 * la zone de contenu et se retourne vers le bas à chaque extrémité —
 * voir nav.module.css. Le flou est porté par un seul élément séparé,
 * `.navBlur`, découpé par une clip-path pour laisser une fenêtre nette
 * sous le trait — un backdrop-filter ne floute que ce qui est sous sa
 * propre surface, donc plusieurs surfaces floutées côte à côte
 * laisseraient une couture au raccord (CLAUDE.md, « Barre de
 * navigation »).
 *
 * Un seul état `open`/un seul <MegaMenu>, piloté par DEUX déclencheurs
 * (le bouton desktop « Ce que je fais » et le mot « Menu » mobile) :
 * un seul est jamais visible/actionnable à la fois selon la largeur,
 * donc partager l'état ne crée aucun conflit. <MegaMenu> décide
 * lui-même, en interne, quelle structure (desktop ou mobile) rendre.
 *
 * Survol (desktop uniquement) : 120ms de délai à l'entrée, 200ms à la
 * sortie — un minuteur commun couvre le déclencheur ET le panneau
 * (survoler l'un annule la fermeture programmée par l'autre). Clic et
 * clavier ouvrent/ferment immédiatement, sans délai, et déplacent le
 * focus dans le panneau (fermeture par survol ne le fait jamais : un
 * utilisateur souris qui ne fait que survoler ne doit pas voir son
 * focus déplacé de force).
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  // État, pas une ref : lue au rendu (JSX ci-dessous), et une ref ne
  // peut pas être lue pendant le rendu.
  const [shouldFocusOnOpen, setShouldFocusOnOpen] = useState(false);
  // < 1024px : n'a besoin d'être exact qu'à l'instant où `open` passe à
  // true (voir navTone plus bas) — false au premier rendu ne provoque
  // aucun flash, "open" démarre lui-même toujours à false.
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  // Tonalité du voile (panneau mobile + nav qui le surplombe), mesurée
  // UNE SEULE FOIS à l'instant de l'ouverture (voir toggleImmediate) —
  // jamais recalculée tant qu'il reste ouvert, le scroll étant bloqué
  // (CLAUDE.md, « Méga-menu — mobile »). Déjà passée par `toVeilTone`
  // (accent traité comme dark) : ne vaut jamais "accent" ici. Valeur de
  // repli sans incidence : lue seulement quand `open && isMobileViewport`
  // (navTone plus bas).
  const [mobileTone, setMobileTone] = useState<Tone>(DEFAULT_TONE);

  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // Tonalité de la section sous le centre vertical de la barre (CLAUDE.md,
  // « Tonalités »), tenue à jour par le moteur partagé (src/lib/tone.ts).
  const liveTone = useSectionTone(headerRef);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobileViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Panneau mobile ouvert : la nav qui le surplombe (fond flouté, trait,
  // logo, « Fermer ») partage la MÊME couleur unique que le panneau —
  // celle de la section tout en bas de l'écran, mesurée à l'ouverture
  // (`mobileTone`, voir toggleImmediate) — plus de "light" forcé
  // (CLAUDE.md, « Méga-menu — mobile »). Hors ouverture mobile, `navTone`
  // vaut `liveTone` (section sous le centre de la barre) — c'est CETTE
  // valeur, transmise telle quelle au méga-menu (voir plus bas), qui
  // pilote aussi le voile/contour/texte du panneau DESKTOP (CLAUDE.md,
  // « Méga-menu — desktop ») : il suit la nav, pas une mesure séparée. Le
  // panneau desktop ne recouvre pas la barre, donc rien à forcer côté nav
  // elle-même.
  const navTone: Tone = open && isMobileViewport ? mobileTone : liveTone;

  function clearTimers() {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleOpen(trigger: HTMLButtonElement | null) {
    clearTimers();
    openTimerRef.current = window.setTimeout(() => {
      activeTriggerRef.current = trigger;
      setShouldFocusOnOpen(false);
      setOpen(true);
    }, HOVER_OPEN_DELAY);
  }

  function scheduleClose() {
    clearTimers();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, HOVER_CLOSE_DELAY);
  }

  function toggleImmediate(trigger: HTMLButtonElement | null) {
    clearTimers();
    activeTriggerRef.current = trigger;
    const willOpen = !open;
    // Mesurée AVANT setOpen (donc avant que le panneau bloque le
    // scroll) : la position de scroll au clic est déjà la position
    // finale, pas besoin d'attendre un effet.
    if (willOpen && isMobileViewport) {
      setMobileTone(toVeilTone(getBottomTone()));
    }
    setOpen(willOpen);
    if (willOpen) setShouldFocusOnOpen(true);
  }

  function closeAndRefocus() {
    clearTimers();
    setOpen(false);
    activeTriggerRef.current?.focus();
  }

  // Tap sur Contact (menu mobile) : ferme le panneau, la navigation du
  // <Link> suit sans être bloquée (CLAUDE.md, « Menu mobile » § 4). Pas
  // de renvoi de focus au déclencheur ici (contrairement à Escape) : le
  // focus suit naturellement la nouvelle page.
  function closeOnNavigate() {
    clearTimers();
    setOpen(false);
  }

  return (
    <>
      {/* Surface floutée unique de la nav (voir nav.module.css
          .navBlur) : un rectangle fixe, du haut de l'écran jusqu'au bas
          des angles du trait, découpé par clip-path pour laisser une
          fenêtre nette sous le trait. Rendu hors du <header> (frère, pas
          descendant) pour porter son propre data-tone — --fg/--tone-bg
          (globals.css [data-tone]) ne s'y hériteraient pas sinon.
          data-suspended : le panneau mobile floute déjà tout l'écran
          quand il est ouvert — jamais de flou sur du flou (CLAUDE.md,
          « Menu mobile » § 2). Sans effet sur le méga-menu desktop, qui
          ne couvre pas la barre. */}
      <div
        className={styles.navBlur}
        data-tone={navTone}
        data-suspended={open && isMobileViewport}
        aria-hidden="true"
      />

      <header ref={headerRef} className={styles.nav} data-tone={navTone}>
        <nav className={styles.items} aria-label={nav.ariaLabel}>
          <div className={styles.leftCluster}>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label={nav.logoAriaLabel}
            >
              <Logo className={styles.logoIcon} />
            </Link>

            <div className={styles.group}>
              <button
                ref={desktopTriggerRef}
                type="button"
                className={styles.link}
                aria-expanded={open}
                aria-controls={menuId}
                onMouseEnter={() => scheduleOpen(desktopTriggerRef.current)}
                onMouseLeave={() => scheduleClose()}
                onClick={() => toggleImmediate(desktopTriggerRef.current)}
              >
                {nav.trigger}
              </button>
              {nav.topLinks.map((entry) =>
                entry.isLink ? (
                  <Link key={entry.href} href={entry.href} className={styles.link}>
                    {entry.label}
                  </Link>
                ) : (
                  // Page pas encore publiée : <span>, pas <a> — même
                  // convention que le panneau mobile du méga-menu
                  // (MegaMenu.tsx), un lien mort est pire qu'un texte simple.
                  <span key={entry.href} className={`${styles.link} ${styles.linkStatic}`}>
                    {entry.label}
                  </span>
                ),
              )}
            </div>
          </div>

          <button
            ref={mobileTriggerRef}
            type="button"
            className={`${styles.link} ${styles.menu}`}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => toggleImmediate(mobileTriggerRef.current)}
          >
            {open ? nav.mobile.closeLabel : nav.mobile.triggerLabel}
          </button>
        </nav>
      </header>

      {/* Filet décoratif sous la barre — pas une border sur la barre
          elle-même : il ne couvre que la zone de contenu (largeur du
          méga-menu), pas toute la largeur de l'écran (voir
          nav.module.css .ruleWrap/.ruleInner/.rule). Wrapper fixed
          100% + flex center, jamais de 100vw : sur Windows/Firefox,
          100vw inclut la barre de défilement et décale/élargit tout
          calcul basé dessus — d'où le débordement horizontal que ce
          calcul provoquait. Toujours visible, comme la barre : plus de
          fondu/rétractation liés au scroll. data-tone répété ici (même
          valeur que le <header>) : .ruleWrap est un FRÈRE du <header>, pas
          son descendant — --fg/--tone-bg (globals.css [data-tone]) ne s'y
          hériteraient pas sinon. */}
      <div className={styles.ruleWrap} data-tone={navTone} aria-hidden="true">
        <div className={styles.ruleInner}>
          <div data-nav-rule className={styles.rule} />
        </div>
      </div>

      <MegaMenu
        id={menuId}
        open={open}
        tone={navTone}
        shouldFocusOnOpen={shouldFocusOnOpen}
        onEscape={closeAndRefocus}
        onNavigate={closeOnNavigate}
        onPointerEnter={clearTimers}
        onPointerLeave={scheduleClose}
      />
    </>
  );
}
