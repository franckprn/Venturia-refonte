"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VENTURIA_EASE } from "@/lib/ease";
import type { ServiceHeroChain } from "@/content/services/types";
import styles from "./ServiceHero.module.css";

gsap.registerPlugin(ScrollTrigger);

type ServiceHeroChainRevealProps = {
  chain: ServiceHeroChain;
};

/**
 * Chaîne du Hero (notification + 4 étapes 01-04) — seul élément animé
 * de ce bloc : h1, sous-titre et CTA restent statiques (CLAUDE.md,
 * « Pages services — gabarit » : rien d'animé sur l'élément LCP).
 *
 * Séquence UNIQUE, dans l'ordre : notification, 01, 02, 03, 04 —
 * stagger 350ms, chaque étape 300ms (opacity + y 8px→0), chaque
 * connecteur 250ms (scale 0→1, juste avant l'étape suivante — se
 * termine au moment où elle démarre). ≥1024px (chaîne horizontale) :
 * jouée au montage. <1024px (chaîne verticale) : ScrollTrigger
 * `top 80%`, une seule fois. `prefers-reduced-motion` : la fonction
 * s'arrête avant de rien poser, la chaîne reste dans son état final
 * tel que rendu par défaut (CSS) — jamais `autoAlpha`, uniquement
 * `opacity`/`transform` (aucun décalage de mise en page).
 *
 * Anti-flash (voir le <script> rendu ci-dessous + ServiceHero.module.css) :
 * un script inline pose `data-chain-anim="pending"` sur <html> AVANT
 * que ce bloc ne soit peint côté serveur — la chaîne est donc déjà
 * masquée (CSS) dès le premier rendu, jamais visible puis masquée.
 * `gsap.set` ci-dessous pose le MÊME état en JS, PUIS retire
 * l'attribut : la bascule CSS → GSAP n'est jamais visible.
 * `useLayoutEffect` (pas `useEffect`) : ces deux opérations doivent
 * être posées avant le prochain paint du client, pas après.
 *
 * Portée : le script est rendu PAR CE COMPOSANT (jamais dans le layout
 * racine) — il n'existe donc que sur les pages qui affichent réellement
 * la chaîne (Automatisation aujourd'hui, une future page service qui
 * réutiliserait ServiceHero demain), jamais sur la home ni sur une page
 * sans chaîne. Test de chemin (pathname) volontairement écarté : un
 * composant qui ne se rend que là où il est utilisé scope déjà
 * correctement, sans logique supplémentaire à maintenir.
 *
 * Filet de sécurité (script ci-dessous, délai 4s) : si l'hydratation
 * échoue ou traîne au-delà de ce délai, le script retire lui-même
 * l'attribut — la chaîne redevient visible à son état final. Si ce
 * composant s'hydrate APRÈS ce filet (attribut déjà retiré), il ne pose
 * PAS `gsap.set` et ne joue PAS la timeline : la chaîne, déjà visible,
 * resterait sinon visible → masquée → réanimée, un second flash que
 * rien ne justifie puisque le filet a déjà réglé le cas. Le garde-fou
 * `if (!document.documentElement.hasAttribute(...)) return;` plus bas
 * couvre exactement ce cas.
 */
type ReadyState = {
  root: HTMLDivElement;
  notification: HTMLDivElement;
  steps: HTMLDivElement[];
  connectors: HTMLSpanElement[];
  isDesktop: boolean;
  scaleProp: "scaleX" | "scaleY";
};

export function ServiceHeroChainReveal({ chain }: ServiceHeroChainRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connectorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Pont entre les deux effets ci-dessous — voir leurs commentaires.
  const readyRef = useRef<ReadyState | null>(null);

  const setStepRef = (index: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[index] = el;
  };
  const setConnectorRef = (index: number) => (el: HTMLSpanElement | null) => {
    connectorRefs.current[index] = el;
  };

  // Section CRITIQUE, avant paint : uniquement poser l'état masqué
  // (gsap.set) et retirer l'attribut anti-flash — rien d'autre. Garder
  // ce bloc minimal évite de retarder le premier paint post-hydratation
  // au point de chevaucher le swap de police (next/font, display:
  // "swap") du H1/sous-titre voisins : mesuré, construire la timeline
  // ET la lancer ICI (8 tweens + ScrollTrigger) ajoutait quelques ms
  // de travail synchrone qui faisaient parfois tomber ce swap de police
  // APRÈS le premier paint au lieu d'avant — un micro-CLS (~0,01) sur
  // `.bottom` (sous-titre+CTA), sans rapport avec la chaîne elle-même
  // (toujours opacity/transform pur, jamais de décalage de mise en
  // page). La construction de la timeline est donc déportée dans un
  // `useEffect` séparé, après le premier paint.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const notification = notificationRef.current;
    const steps = stepRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const connectors = connectorRefs.current.filter((el): el is HTMLSpanElement => el !== null);
    if (!root || !notification || steps.length !== 4 || connectors.length !== 3) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!document.documentElement.hasAttribute("data-chain-anim")) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const scaleProp: "scaleX" | "scaleY" = isDesktop ? "scaleX" : "scaleY";

    gsap.set(notification, { opacity: 0, y: 12 });
    gsap.set(steps, { opacity: 0, y: 8 });
    gsap.set(connectors, { [scaleProp]: 0 });

    // Même état que `html[data-chain-anim="pending"]`
    // (ServiceHero.module.css) : la bascule qui suit, CSS → GSAP,
    // est donc invisible.
    document.documentElement.removeAttribute("data-chain-anim");

    readyRef.current = { root, notification, steps, connectors, isDesktop, scaleProp };
  }, []);

  // Après le premier paint : construit la timeline et la lance (ou arme
  // le ScrollTrigger mobile). Les éléments sont déjà à l'état masqué
  // posé ci-dessus — ce décalage ne change que QUAND la timeline est
  // construite, jamais l'état visuel déjà peint.
  useEffect(() => {
    const ready = readyRef.current;
    if (!ready) return;
    const { root, notification, steps, connectors, isDesktop, scaleProp } = ready;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.to(notification, { opacity: 1, y: 0, duration: 0.3, ease: VENTURIA_EASE }, 0)
        .to(steps[0], { opacity: 1, y: 0, duration: 0.3, ease: VENTURIA_EASE }, 0.35)
        .to(connectors[0], { [scaleProp]: 1, duration: 0.25, ease: VENTURIA_EASE }, 0.45)
        .to(steps[1], { opacity: 1, y: 0, duration: 0.3, ease: VENTURIA_EASE }, 0.7)
        .to(connectors[1], { [scaleProp]: 1, duration: 0.25, ease: VENTURIA_EASE }, 0.8)
        .to(steps[2], { opacity: 1, y: 0, duration: 0.3, ease: VENTURIA_EASE }, 1.05)
        .to(connectors[2], { [scaleProp]: 1, duration: 0.25, ease: VENTURIA_EASE }, 1.15)
        .to(steps[3], { opacity: 1, y: 0, duration: 0.3, ease: VENTURIA_EASE }, 1.4);

      if (isDesktop) {
        tl.play();
      } else {
        ScrollTrigger.create({
          trigger: root,
          start: "top 80%",
          once: true,
          onEnter: () => tl.play(),
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Anti-flash — voir le commentaire du composant plus haut. Exécuté
          en parsant le HTML, AVANT que le <div ref={rootRef}> qui suit ne
          soit peint : pose `data-chain-anim="pending"` sur <html>, lu par
          `html[data-chain-anim="pending"]` (ServiceHero.module.css) pour
          masquer la chaîne dès le premier rendu — jamais en CSS pur par
          défaut (CLAUDE.md, « Animations » : rien ne doit rester à
          opacity 0 si le JS ne charge pas) : sans ce script (JS
          désactivé, ou prefers-reduced-motion), l'attribut n'existe
          jamais, la chaîne reste visible. Rendu par CE composant, jamais
          le layout racine : n'existe donc que sur les pages qui ont
          réellement une chaîne (portée automatique, pas de test de
          pathname). */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            '(function(){try{if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.setAttribute("data-chain-anim","pending");window.setTimeout(function(){document.documentElement.removeAttribute("data-chain-anim")},4000)}catch(e){}})();',
        }}
      />
      <div ref={rootRef} className={styles.chain}>
        <div ref={notificationRef} className={styles.notification}>
          <span className={styles.notificationDot} aria-hidden="true" />
          <span>
            <p className={styles.notificationLabel}>{chain.notification.label}</p>
            <p className={styles.notificationTitle}>{chain.notification.title}</p>
          </span>
        </div>
        <div className={styles.steps}>
          {chain.steps.flatMap((step, index) => {
            const nodes = [
              <div key={step.number} ref={setStepRef(index)} className={styles.step}>
                <p className={styles.stepNumber}>{step.number}</p>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepStatus}>{step.status}</p>
              </div>,
            ];
            if (index < chain.steps.length - 1) {
              nodes.push(
                <span
                  key={`connector-${step.number}`}
                  ref={setConnectorRef(index)}
                  className={styles.connector}
                  aria-hidden="true"
                />,
              );
            }
            return nodes;
          })}
        </div>
      </div>
    </>
  );
}
