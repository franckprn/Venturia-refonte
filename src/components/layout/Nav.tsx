"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { nav } from "@/content/nav";
import { MegaMenu } from "./MegaMenu";
import styles from "./nav.module.css";

const SCROLL_SHOW_THRESHOLD = 80;
const HOVER_OPEN_DELAY = 120;
const HOVER_CLOSE_DELAY = 200;

/**
 * Barre de nav fixe, 64px. Transparente en haut de page ; dès 80px de
 * scroll, fond --ground opaque. Se rétracte au scroll vers le bas,
 * revient au scroll vers le haut — toujours visible sous 80px.
 *
 * Aucun nom de marque dans la barre (le titre géant du bloc de fin de
 * page porte le nom du site) : les entrées commencent à la marge
 * gauche du conteneur. Le filet sous la barre n'est pas une border sur
 * la barre elle-même mais un élément dédié (`.rule` / `data-nav-rule`),
 * qui ne couvre que la zone de contenu et se retourne vers le bas à
 * chaque extrémité — voir nav.module.css. Il suit le même fond/la même
 * rétractation que la barre (classes `scrolled`/`hidden` partagées).
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
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  const menuId = useId();
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y >= SCROLL_SHOW_THRESHOLD);
      if (y < SCROLL_SHOW_THRESHOLD) {
        setNavHidden(false);
      } else if (y > lastY) {
        setNavHidden(true);
      } else if (y < lastY) {
        setNavHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header
        className={[
          styles.nav,
          scrolled ? styles.scrolled : "",
          navHidden ? styles.hidden : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <nav className={styles.items} aria-label="Navigation principale">
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
          calcul provoquait. Suit le même fond/rétractation que la
          barre (mêmes classes `scrolled`/`hidden`) : jamais visible
          seul quand elle est transparente ou rétractée. */}
      <div className={styles.ruleWrap} aria-hidden="true">
        <div className={styles.ruleInner}>
          <div
            data-nav-rule
            className={[styles.rule, scrolled ? styles.scrolled : "", navHidden ? styles.hidden : ""]
              .filter(Boolean)
              .join(" ")}
          />
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
