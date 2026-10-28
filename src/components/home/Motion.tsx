"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Une seule île client par page. Le HTML rendu est l'état final, visible :
// sans JavaScript, tout est lisible. L'intro du hero est en CSS
// (home.module.css, @keyframes), les animations ci-dessous ne touchent
// que ce qui est encore sous la ligne de flottaison au montage, pour ne
// jamais faire disparaître un texte déjà affiché. Rien ne bouge sous
// prefers-reduced-motion.
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ease = "expo.out";
      const fold = window.innerHeight * 0.92;
      const belowFold = (el: Element) => el.getBoundingClientRect().top > fold;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(belowFold).forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 32,
          duration: 1,
          ease,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((path) => {
        const svg = path.ownerSVGElement!;
        if (!belowFold(svg)) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 85%", once: true } });
        tl.from(path, { strokeDashoffset: 1, duration: 1.6, ease: "power2.inOut" })
          .from(svg.querySelectorAll("[data-fade]"), { autoAlpha: 0, duration: 0.8 }, 0.6)
          .from(svg.querySelectorAll("[data-point]"), { autoAlpha: 0, duration: 0.3, stagger: 0.22 }, 0.1);
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
