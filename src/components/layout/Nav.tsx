"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { nav } from "@/content/nav";
import { useSectionTone, type Tone } from "@/lib/tone";
import { MegaMenu } from "./MegaMenu";
import { Logo } from "./Logo";
import styles from "./nav.module.css";

const HOVER_OPEN_DELAY = 120;
const HOVER_CLOSE_DELAY = 200;

/**
 * Barre de nav fixe, 64px, TOUJOURS visible : aucune logique de
 * scroll ici (ni seuil, ni sens, ni transparence) — la barre et le
 * filet sous elle forment un seul bloc fixe et permanent, fond
 * translucide et flouté en continu (voir nav.module.css `.nav`).
 *
 * Aucun nom de marque dans la barre (le titre géant du bloc de fin de
 * page porte le nom du site) : seul le logo (`<Logo>`, SVG inline,
 * fill="currentColor") ouvre la barre, à la marge gauche du conteneur,
 * suivi des entrées — voir `.leftCluster` / `.logoLink` dans
 * nav.module.css pour le cluster et la surface cliquable 44×44.
 * Le filet sous la barre n'est pas une border sur la barre elle-même
 * mais un élément dédié (`.rule` / `data-nav-rule`), qui ne couvre que
 * la zone de contenu et se retourne vers le bas à chaque extrémité —
 * voir nav.module.css. `.blurLeft`/`.blurRight`, à côté de `.rule` dans
 * `.ruleInner`, composent avec le fond de la barre le flou en forme
 * d'encoche inversée (CLAUDE.md, « Barre de navigation ») : net entre
 * les deux angles du trait, flouté partout ailleurs jusqu'au bas des
 * angles.
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

  // Panneau mobile ouvert = crème (megamenu.module.css .mobilePanel) :
  // la nav qui le surplombe passe en light le temps qu'il reste ouvert,
  // quelle que soit la section défilée derrière (CLAUDE.md, « Tonalités »).
  // Le méga-menu desktop, lui, ne recouvre pas la barre : rien à forcer.
  const navTone: Tone = open && isMobileViewport ? "light" : liveTone;

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
    setOpen((prev) => {
      const next = !prev;
      if (next) setShouldFocusOnOpen(true);
      return next;
    });
  }

  function closeAndRefocus() {
    clearTimers();
    setOpen(false);
    activeTriggerRef.current?.focus();
  }

  return (
    <>
      <header ref={headerRef} className={styles.nav} data-tone={navTone}>
        <nav className={styles.items} aria-label="Navigation principale">
          <div className={styles.leftCluster}>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label="Venturia, retour à l'accueil"
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
              {nav.topLinks.map((entry) => (
                <Link key={entry.href} href={entry.href} className={styles.link}>
                  {entry.label}
                </Link>
              ))}
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
            {nav.mobile.triggerLabel}
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
          fondu/rétractation liés au scroll. .blurLeft/.blurRight, dans
          le padding de .ruleInner (hors zone de contenu), composent
          avec le fond de la barre le flou en forme d'encoche inversée
          — net entre les deux angles du trait. data-tone répété ici (même
          valeur que le <header>) : .ruleWrap est un FRÈRE du <header>, pas
          son descendant — --fg/--tone-bg (globals.css [data-tone]) ne s'y
          hériteraient pas sinon. */}
      <div className={styles.ruleWrap} data-tone={navTone} aria-hidden="true">
        <div className={styles.ruleInner}>
          <div className={styles.blurLeft} />
          <div className={styles.blurRight} />
          <div data-nav-rule className={styles.rule} />
        </div>
      </div>

      <MegaMenu
        id={menuId}
        open={open}
        shouldFocusOnOpen={shouldFocusOnOpen}
        onEscape={closeAndRefocus}
        onPointerEnter={clearTimers}
        onPointerLeave={scheduleClose}
      />
    </>
  );
}
